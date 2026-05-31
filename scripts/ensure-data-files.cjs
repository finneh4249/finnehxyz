/**
 * This script copies data files from src/data to public/data to ensure
 * both locations have the files during development
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const SRC_DATA_DIR = path.join(__dirname, "../src/data");
const PUBLIC_DATA_DIR = path.join(__dirname, "../public/data");
const SRC_IMAGES_DIR = path.join(__dirname, "../src/assets/images");
const PUBLIC_IMAGES_DIR = path.join(__dirname, "../public/assets/images");

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

// Download axion-logo.png
const logoUrl = "https://axionventures.com.au/images/axion-logo.png";
const srcLogoPath = path.join(SRC_IMAGES_DIR, "axion-logo.png");
const publicLogoPath = path.join(PUBLIC_IMAGES_DIR, "axion-logo.png");

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (fs.existsSync(dest)) {
      console.log(`File already exists at ${dest}, skipping download.`);
      return resolve();
    }

    console.log(`Downloading ${url} to ${dest}...`);
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      file.close();
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
      reject(err);
    });
  });
}

(async () => {
  try {
    await downloadFile(logoUrl, srcLogoPath);
    // Copy the downloaded file to public folder as well
    const publicLogoDir = path.dirname(publicLogoPath);
    if (!fs.existsSync(publicLogoDir)) {
      fs.mkdirSync(publicLogoDir, { recursive: true });
    }
    fs.copyFileSync(srcLogoPath, publicLogoPath);
    console.log("Axion logo download and sync complete!");
  } catch (err) {
    console.error("Error downloading Axion logo:", err.message);
  }
  console.log("Data files sync complete!");
})();

