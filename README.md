# Astro Portfolio

![Astro](https://img.shields.io/badge/Astro-v5.15.7-orange?style=flat-square&logo=astro)
![React](https://img.shields.io/badge/React-v18-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3.3-38B2AC?style=flat-square&logo=tailwind-css)
![DaisyUI](https://img.shields.io/badge/DaisyUI-v5-5A0EF8?style=flat-square)

A modern, performant portfolio website built with **Astro v5**. This project utilizes a "Neo-Brutalist" design aesthetic and leverages the Island Architecture to deliver zero-JavaScript by default, hydrating only interactive components when necessary.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will launch at `http://localhost:4321`.

## 📂 Project Structure

```text
/
├── docs/               # Documentation
├── public/             # Static assets (images, fonts)
├── src/
│   ├── components/     # UI Components (.astro & .jsx)
│   ├── data/           # Content Data (JSON)
│   ├── layouts/        # Page Layouts
│   ├── pages/          # File-based Routing
│   └── utils/          # Helper functions
├── astro.config.mjs    # Astro configuration
└── tailwind.config.js  # Tailwind & Design Tokens
```

## 📚 Documentation

| Guide                                            | Description                                                      |
| :----------------------------------------------- | :--------------------------------------------------------------- |
| [**Architecture**](./docs/ARCHITECTURE.md)       | Deep dive into the Astro MPA structure and Islands architecture. |
| [**Installation**](./docs/INSTALLATION.md)       | Setup instructions, prerequisites, and build commands.           |
| [**Maintenance**](./docs/MAINTENANCE.md)         | How to update content, add projects, and write blog posts.       |
| [**Troubleshooting**](./docs/TROUBLESHOOTING.md) | Solutions for common build and runtime issues.                   |

---

_Built with Astro v5._
