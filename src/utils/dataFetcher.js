/**
 * Fetch data from a JSON file with environment-aware path handling
 * @param {string} path - The path to the JSON file (relative to public folder)
 * @returns {Promise<any>} - The parsed JSON data
 */
export async function fetchData(path) {
  try {
    // Strip leading slash if present for consistency
    const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
    
    // In development, point to the src/data folder as fallback if public file not found
    const isDevEnvironment = import.meta.env?.DEV || false;
    
    // First try the public folder path
    let response = await fetch(normalizedPath);
    
    // If that fails in development, try the src/data folder
    if (!response.ok && isDevEnvironment && normalizedPath.includes('data/')) {
      const srcDataPath = `/src/${normalizedPath}`;
      console.log(`Trying alternate dev path: ${srcDataPath}`);
      response = await fetch(srcDataPath);
    }
    
    // Check if the response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Expected JSON but got ${contentType} for ${path}`);
      throw new Error(`Resource at ${path} is not JSON (likely 404)`);
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error);
    throw error; // Let the error boundary handle it
  }
}
