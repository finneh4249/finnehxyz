import { defineCollection, z } from "astro:content";
import { glob, type LoaderContext } from "astro/loaders";
import { getProjectSlug, projects as localProjects, type Project } from "./data/projects";

const githubOwner = "finneh4249";
const githubCacheKey = "github-projects-cache:v1";
const githubCacheTtlMs = 15 * 60 * 1000;

const schoolRepoPatterns = [/^T\dW\d+/i, /^T\dA\d+/i, /^T\diiW\d+/i];

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  detailedDescription: z.string().optional(),
  challenges: z.string().optional(),
  outcomes: z.string().optional(),
  image: z.string(),
  githubUrl: z.string().url().optional(),
  liveDemoUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  date: z.number(),
  technologies: z.array(z.string()).optional(),
  githubId: z.number().optional(),
  githubStars: z.number().optional(),
  githubForks: z.number().optional(),
  githubLanguage: z.string().optional(),
  githubTopics: z.array(z.string()).default([]),
  tags: z.array(
    z.object({
      name: z.string(),
      badgeClass: z.string(),
    })
  ),
});

type GitHubRepo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  created_at: string;
  pushed_at: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
};

type ProjectEntry = Project & {
  githubId?: number;
  githubStars?: number;
  githubForks?: number;
  githubLanguage?: string;
  githubTopics?: string[];
};

function getRepoNameFromUrl(url?: string) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    return pathParts[pathParts.length - 1]?.replace(/\.git$/i, "");
  } catch {
    return undefined;
  }
}

function isSchoolRepo(repoName: string) {
  return schoolRepoPatterns.some((pattern) => pattern.test(repoName));
}

function getGithubImage(repo: GitHubRepo) {
  return `https://opengraph.githubassets.com/${repo.id}/${repo.full_name}`;
}

function titleFromRepoName(repoName: string) {
  return repoName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function badgeClassForTopic(index: number) {
  return index === 0 ? "badge-primary" : index === 1 ? "badge-secondary" : "badge-neutral";
}

function githubRepoToProject(repo: GitHubRepo): ProjectEntry {
  const description = repo.description?.trim() || "GitHub repository";
  const technologies = [repo.language, ...repo.topics.slice(0, 3)].filter(Boolean) as string[];
  const tags = [
    ...(repo.language ? [{ name: repo.language, badgeClass: "badge-info" }] : []),
    ...repo.topics.slice(0, 3).map((topic, index) => ({ name: topic, badgeClass: badgeClassForTopic(index) })),
  ];

  return {
    title: titleFromRepoName(repo.name),
    description,
    detailedDescription: description,
    image: getGithubImage(repo),
    githubUrl: repo.html_url,
    featured: false,
    date: Date.parse(repo.created_at),
    technologies: technologies.length > 0 ? technologies : undefined,
    githubId: repo.id,
    githubStars: repo.stargazers_count,
    githubForks: repo.forks_count,
    githubLanguage: repo.language ?? undefined,
    githubTopics: repo.topics,
    tags: tags.length > 0 ? tags : [{ name: "GitHub", badgeClass: "badge-neutral" }],
  };
}

function mergeManualProject(project: ProjectEntry, repo?: GitHubRepo): ProjectEntry {
  return {
    ...project,
    githubId: repo?.id ?? project.githubId,
    githubStars: repo?.stargazers_count ?? project.githubStars,
    githubForks: repo?.forks_count ?? project.githubForks,
    githubLanguage: repo?.language ?? project.githubLanguage,
    githubTopics: repo?.topics ?? project.githubTopics,
    githubUrl: project.githubUrl ?? repo?.html_url,
    image: project.image,
    technologies:
      project.technologies?.length
        ? project.technologies
        : repo?.language
          ? [repo.language]
          : project.technologies,
  };
}

async function loadGithubRepos(context: Pick<LoaderContext, "meta" | "logger">) {
  const cachedRaw = context.meta.get(githubCacheKey);
  if (cachedRaw) {
    try {
      const cached = JSON.parse(cachedRaw) as { fetchedAt: number; repos: GitHubRepo[] };
      if (Date.now() - cached.fetchedAt < githubCacheTtlMs) {
        context.logger.info(`Using cached GitHub repo data for ${githubOwner}`);
        return cached.repos;
      }
    } catch {
      context.logger.warn("GitHub repo cache was invalid, refetching");
    }
  }

  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const repos: GitHubRepo[] = [];
  let page = 1;

  while (true) {
    const url = new URL(`https://api.github.com/users/${githubOwner}/repos`);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set("sort", "updated");
    url.searchParams.set("type", "owner");

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub repos (${response.status} ${response.statusText})`);
    }

    const batch = (await response.json()) as GitHubRepo[];
    repos.push(...batch);

    if (batch.length < 100) {
      break;
    }

    page += 1;
  }

  context.meta.set(githubCacheKey, JSON.stringify({ fetchedAt: Date.now(), repos }));
  return repos;
}

function shouldAutoIncludeRepo(repo: GitHubRepo) {
  if (repo.fork || repo.archived || repo.private) {
    return false;
  }

  if (isSchoolRepo(repo.name)) {
    return false;
  }

  return repo.topics.includes("portfolio-item") || repo.stargazers_count > 10;
}

async function buildProjects(context: Pick<LoaderContext, "meta" | "logger" | "parseData" | "store">) {
  let githubRepos: GitHubRepo[] = [];

  try {
    githubRepos = await loadGithubRepos(context);
  } catch (error) {
    context.logger.warn(`GitHub sync failed, falling back to local project manifest: ${(error as Error).message}`);
  }

  const reposByName = new Map(githubRepos.map((repo) => [repo.name.toLowerCase(), repo]));
  const projects: ProjectEntry[] = [];
  const seenRepoNames = new Set<string>();

  for (const project of localProjects as ProjectEntry[]) {
    const repoName = getRepoNameFromUrl(project.githubUrl)?.toLowerCase();
    const repo = repoName ? reposByName.get(repoName) : undefined;
    if (repo?.name) {
      seenRepoNames.add(repo.name.toLowerCase());
    }
    projects.push(mergeManualProject(project, repo));
  }

  for (const repo of githubRepos) {
    if (seenRepoNames.has(repo.name.toLowerCase())) {
      continue;
    }

    if (!shouldAutoIncludeRepo(repo)) {
      continue;
    }

    projects.push(githubRepoToProject(repo));
  }

  return projects
    .sort((a, b) => b.date - a.date)
    .map((project) => ({ id: getProjectSlug(project), ...project }));
}

const projects = defineCollection({
  loader: {
    name: "github-projects",
    async load(context: LoaderContext) {
      const loadedProjects = await buildProjects(context);

      context.store.clear();
      for (const project of loadedProjects) {
        const parsedProject = await context.parseData({ id: project.id, data: project });
        context.store.set({ id: project.id, data: parsedProject });
      }
    },
  },
  schema: projectSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const architecture = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/architecture",
  }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["PROPOSED", "ACCEPTED", "REJECTED", "DEPRECATED"]),
    date: z.coerce.date(),
    author: z.string().default("Ethan Cornwill"),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, architecture, projects };
