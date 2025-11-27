# Maintenance Guide

This guide explains how to update content, manage the blog, and adjust the design system without needing deep knowledge of the underlying codebase.

## Updating Content (CMS)

Most site content is data-driven and separated from the code in the `src/data/` directory. You can update these JSON files to change text, add items, or reorder sections.

### Adding a Project

1.  Open `src/data/projects.json`.
2.  Add a new object to the array:
    ```json
    {
      "title": "Project Name",
      "description": "Brief description...",
      "tech": ["React", "Astro", "Tailwind"],
      "link": "https://github.com/username/project",
      "image": "/images/project-thumb.png"
    }
    ```
3.  Ensure any images referenced are placed in the `public/images/` directory.

### Updating Skills

1.  Open `src/data/skills.json`.
2.  Skills are categorized (e.g., "Frontend", "Backend"). Add strings to the respective arrays.

### Experience & Education

- **Experience:** Edit `src/data/experience.json`.
- **Education:** Edit `src/data/education.json`.

## Blog Workflow

The blog uses **MDX** (Markdown + JSX), allowing you to write posts with standard Markdown syntax while embedding React/Astro components if needed.

### Creating a New Post

1.  Create a new file in `src/pages/blog/` with the extension `.mdx` (e.g., `my-new-post.mdx`).
2.  Add the required Frontmatter at the top of the file:

    ```markdown
    ---
    layout: ../../layouts/BlogLayout.astro
    title: "My New Post Title"
    date: "2023-10-27"
    description: "A short summary for the card preview."
    author: "Your Name"
    image: "/images/blog/cover.jpg"
    tags: ["Tech", "Tutorial"]
    ---

    # Your Content Here

    Write standard markdown here...
    ```

## Design System Updates

The site follows a "Neo-Brutalist" aesthetic defined by strict design tokens.

### Colors & Tokens

- **Source of Truth:** `design_tokens.json` (Conceptual source)
- **Implementation:** `tailwind.config.js`
  - To change the primary "Neo-Green" or "Neo-Pink", edit the `colors.neo` object in `tailwind.config.js`.

### Global Styles

- `src/index.css`: Contains global font definitions, base Tailwind directives, and any custom utility classes that couldn't be handled by Tailwind config alone.

## Dependency Management

- **Update Astro:** `npm install astro@latest`
- **Update Tailwind:** `npm install tailwindcss@latest`
