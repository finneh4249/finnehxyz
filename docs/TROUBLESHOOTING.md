# Troubleshooting Guide

## Common Issues

### 1. Build Failures

**Symptom:** `npm run build` fails with errors.
**Potential Causes:**

- **Missing Data Files:** Ensure `src/data/` contains all valid JSON files (skills, projects, etc.).
- **Broken Links:** Check if any local imports in `.astro` or `.mdx` files are pointing to non-existent files.
- **Type Errors:** If TypeScript is strict, check for mismatched types in component props.

**Fix:**
Run the build with verbose logging to identify the specific file causing the error.

```bash
npm run build -- --verbose
```

### 2. Styles Not Applying

**Symptom:** Tailwind classes aren't working, or the site looks unstyled.
**Potential Causes:**

- **Content Configuration:** Check `tailwind.config.js`. Ensure the `content` array includes all file extensions you are using (e.g., `./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`).
- **Missing Directives:** Ensure `src/index.css` includes `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;`.

### 3. Interactive Components Not Working

**Symptom:** Buttons (like the Navbar toggle) don't respond to clicks.
**Potential Causes:**

- **Missing Hydration Directive:** Interactive React components MUST be imported with a client directive in `.astro` files.
  - _Incorrect:_ `<Navbar />` (Renders static HTML only)
  - _Correct:_ `<Navbar client:load />` (Hydrates JavaScript on load)

### 4. "Module Not Found" Errors

**Symptom:** Error: `Cannot find module ...`
**Fix:**

1.  Delete `node_modules` and `package-lock.json`.
2.  Reinstall dependencies:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```

### 5. Astro Dev Server Issues

**Symptom:** Changes aren't reflecting or the server crashes.
**Fix:**

- Restart the server (`Ctrl+C` then `npm run dev`).
- Clear the Astro cache:
  ```bash
  npm run dev -- --force
  ```
