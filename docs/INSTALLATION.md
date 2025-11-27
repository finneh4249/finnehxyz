# Installation & Development Guide

## Prerequisites

- **Node.js:** Version 18.14.1 or higher (Required for Astro v5).
- **npm:** Comes with Node.js.

## Quick Start

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd portfolio-astro
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:4321`.

## Build & Deployment

### Production Build

To create a production-ready build of the static site:

```bash
npm run build
```

This command will:

1.  Generate static HTML files in the `dist/` directory.
2.  Optimize assets and images.
3.  Bundle CSS and JavaScript.

### Preview Production Build

To preview the built site locally:

```bash
npm run preview
```

### Deployment

This project is configured as a static site (`output: 'static'` in Astro config). You can deploy the `dist/` folder to any static host:

- **Netlify / Vercel:** Connect your GitHub repository and set the build command to `npm run build` and publish directory to `dist`.
- **GitHub Pages:** Configure a workflow to build and push the `dist` folder.

## Environment Variables

Currently, this project does not require any `.env` file for local development or production. All configuration is handled via `astro.config.mjs` and `src/data/` files.
