/**
 * This script copies data files from src/data to public/data to ensure
 * both locations have the files during development
 */
const fs = require("fs");
const path = require("path");

const SRC_DATA_DIR = path.join(__dirname, "../src/data");
const PUBLIC_DATA_DIR = path.join(__dirname, "../public/data");

// Create public/data directory if it doesn't exist
if (!fs.existsSync(PUBLIC_DATA_DIR)) {
  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
  console.log("Created public/data directory");
}

// Copy all JSON files from src/data to public/data
if (fs.existsSync(SRC_DATA_DIR)) {
  const files = fs.readdirSync(SRC_DATA_DIR);
  files.forEach((file) => {
    if (path.extname(file) === ".json") {
      const srcFile = path.join(SRC_DATA_DIR, file);
      const destFile = path.join(PUBLIC_DATA_DIR, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`Copied ${file} to public/data/`);
    }
  });
} else {
  console.log("src/data directory not found");
}

console.log("Data files sync complete!");
