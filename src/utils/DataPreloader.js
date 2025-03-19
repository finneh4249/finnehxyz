// Cache for storing preloaded data
const dataCache = new Map();

/**
 * Preloads JSON data and stores it in cache
 * @param {string} key - Unique identifier for the data
 * @param {string} path - Path to JSON file
 * @returns {Promise} Promise that resolves with the data
 */
export const preloadData = async (key, path) => {
  if (dataCache.has(key)) {
    return dataCache.get(key);
  }
  
  try {
    const data = await import(/* webpackPreload: true */ `../data/${path}`);
    dataCache.set(key, data.default);
    return data.default;
  } catch (error) {
    console.error(`Failed to preload data for ${key}:`, error);
    throw error;
  }
};

/**
 * Gets data from cache or loads it if not cached
 * @param {string} key - Unique identifier for the data
 * @param {string} path - Path to JSON file
 * @returns {Promise} Promise that resolves with the data
 */
export const getData = async (key, path) => {
  if (dataCache.has(key)) {
    return dataCache.get(key);
  }
  
  return preloadData(key, path);
};

/**
 * Preloads all essential data files
 */
export const preloadAllData = () => {
  return Promise.all([
    preloadData('education', 'education.json'),
    preloadData('experience', 'experience.json'),
    preloadData('skills', 'skills.json'),
    preloadData('projects', 'projects.json')
  ]);
};
