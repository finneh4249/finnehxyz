/**
 * SEO utility functions for managing meta tags and structured data
 */

// Base site configuration
const siteMeta = {
  siteName: "Ethan Cornwill",
  baseTitle: "Ethan Cornwill | AI Engineer Building Production Systems",
  baseDescription:
    "AI Engineer shipping production systems. Built SPARC framework (75% faster dev). Training LLMs at DataAnnotation. Former ops manager turned systems architect. Open to opportunities.",
  siteUrl: "https://finneh.xyz",
  twitterHandle: "@melbPAT",
  language: "en",
  themeColor: "#FFE600", // Neo-brutalist yellow
  ogImage: "https://finneh.xyz/images/og-image.png", // We'll need to create this
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "SPARC Framework",
    "LLM Training",
    "Full Stack Developer",
    "Systems Architecture",
    "RAG",
    "AI Agents",
    "Production AI",
  ],
};

/**
 * Generates basic SEO meta tags
 * @param {Object} config - Configuration object
 * @returns {Object} Meta tags object
 */
export const getBasicMeta = ({
  title = siteMeta.baseTitle,
  description = siteMeta.baseDescription,
  canonical = siteMeta.siteUrl,
  noindex = false,
}) => {
  const fullTitle =
    title === siteMeta.baseTitle ? title : `${title} | ${siteMeta.siteName}`;

  return {
    title: fullTitle,
    meta: [
      { name: "description", content: description },
      { name: "keywords", content: siteMeta.keywords.join(", ") },
      { name: "author", content: "Ethan Cornwill" },
      {
        name: "robots",
        content: noindex ? "noindex, nofollow" : "index, follow",
      },
      { name: "language", content: siteMeta.language },
      { name: "theme-color", content: siteMeta.themeColor },

      // Open Graph (Facebook, LinkedIn)
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteMeta.siteName },
      { property: "og:image", content: siteMeta.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: siteMeta.twitterHandle },
      { name: "twitter:creator", content: siteMeta.twitterHandle },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: siteMeta.ogImage },
      {
        name: "twitter:image:alt",
        content: "Ethan Cornwill - AI Engineer Portfolio",
      },
    ],
    link: [{ rel: "canonical", href: canonical }],
  };
};

/**
 * Generates SEO meta tags for a specific section
 * @param {string} sectionId - The ID of the current section
 * @returns {Object} Section-specific meta tags
 */
export const getSectionMeta = (sectionId) => {
  // Define section-specific meta data
  const sectionMeta = {
    // Home section
    home: {
      title: siteMeta.baseTitle,
      description: siteMeta.baseDescription,
    },
    // About section
    about: {
      title: "About | AI Engineer & Systems Architect",
      description:
        "From managing Taco Bell's busiest store to building production AI systems. 10+ years ops experience meets cutting-edge AI development. Currently shipping SPARC framework and Nexus platform.",
    },
    // Professional Experience section
    professionalExperience: {
      title: "Experience | Training LLMs & Building AI Systems",
      description:
        "AI Code Analyst at DataAnnotation. Former Lead AI Engineer at MagnetLab. Built production agent systems, RAG pipelines, and the SPARC framework that cuts dev time by 75%.",
    },
    // Education section
    education: {
      title: "Education | Self-Taught AI Engineer",
      description:
        "Diploma of Information Technology. Self-taught AI/ML specialist. Learned by building—SPARC, Nexus, production agent systems. Continuously learning on the front lines of AI development.",
    },
    // Skills section
    skills: {
      title: "Skills | AI Systems, LLM Training, Full-Stack",
      description:
        "Production AI systems • RAG pipelines • LLM training & evaluation • React & Node.js • Agent orchestration • Prompt engineering • DevOps • Ethical AI practice",
    },
    // Projects section
    projects: {
      title: "Projects | SPARC Framework & AI Applications",
      description:
        "SPARC: AI development framework (75% faster builds). Nexus: RAG-powered FinTech platform. Plus 10+ open source projects. All production-ready, all on GitHub.",
    },
    // Contact section
    contact: {
      title: "Hire Me | AI Engineer Open to Opportunities",
      description:
        "Looking for an AI engineer who ships? I build production systems, train LLMs, and architect scalable solutions. Currently open to opportunities. Let's build something amazing.",
    },
    // Testimonials section
    testimonials: {
      title: "Testimonials | What People Say",
      description:
        "Coming soon: testimonials from colleagues and clients about working with Ethan on AI and full-stack projects.",
    },
    // Secret page (for easter egg hunters)
    secret: {
      title: "🎊 Secret Page | You Found Everything!",
      description:
        "Behind-the-scenes look at building this portfolio in 4 hours with SPARC. Real case studies, methodology breakdown, and actual hire-me value prop. Reward for the 0.1% who explore.",
    },
    // Blog index
    blog: {
      title: "Blog | AI Engineering & Prompt Architecture",
      description:
        "Thoughts on AI engineering, prompt architecture, and building production systems that actually ship. Lessons from 13+ years of software development and real-world AI deployments.",
    },
  };

  // Return meta data for the specified section or default meta
  return getBasicMeta(sectionMeta[sectionId] || {});
};

/**
 * Generates JSON-LD structured data
 * @param {string} type - Type of structured data
 * @param {Object} data - Additional data for structured data
 * @returns {Object} Structured data object
 */
export const getStructuredData = (type, data = {}) => {
  const baseData = {
    "@context": "https://schema.org",
  };

  switch (type) {
    case "Person":
      return {
        ...baseData,
        "@type": "Person",
        name: "Ethan Cornwill",
        url: siteMeta.siteUrl,
        jobTitle: "AI Engineer & Systems Architect",
        description:
          "AI Engineer building production systems, training LLMs, and architecting scalable AI solutions",
        email: "mail@finneh.xyz",
        sameAs: [
          "https://github.com/finneh4249",
          "https://linkedin.com/in/ethancornwill",
          "https://twitter.com/melbPAT",
        ],
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Large Language Models",
          "RAG Systems",
          "AI Agents",
          "Full Stack Development",
          "React",
          "Node.js",
          "Python",
          "System Architecture",
        ],
        ...data,
      };

    case "WebSite":
      return {
        ...baseData,
        "@type": "WebSite",
        name: siteMeta.siteName,
        url: siteMeta.siteUrl,
        description: siteMeta.baseDescription,
        author: {
          "@type": "Person",
          name: "Ethan Cornwill",
        },
        ...data,
      };

    case "SoftwareApplication":
      return {
        ...baseData,
        "@type": "SoftwareApplication",
        name: data.name || "SPARC Framework",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        ...data,
      };

    default:
      return baseData;
  }
};

/**
 * Generates a canonical URL for the current path
 * @param {string} path - Current path
 * @returns {string} Canonical URL
 */
export const getCanonicalUrl = (path = "") => {
  const baseUrl = siteMeta.siteUrl.replace(/\/$/, "");
  const pathWithoutLeadingSlash = path.replace(/^\//, "");
  return pathWithoutLeadingSlash
    ? `${baseUrl}/${pathWithoutLeadingSlash}`
    : baseUrl;
};

export default {
  siteMeta,
  getBasicMeta,
  getSectionMeta,
  getStructuredData,
  getCanonicalUrl,
};
