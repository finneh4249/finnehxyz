/**
 * Neo-Brutalist Color Palette from Design Tokens
 * @const {string[]}
 */
const NEO_PALETTE = [
  "#FFE600", // neo-yellow
  "#FF006E", // neo-pink
  "#00B4D8", // neo-blue
  "#06FFA5", // neo-green
  "#B75CFF", // neo-purple
  "#FF6B35"  // neo-orange
];

/**
 * Returns a deterministic Neo-Brutalist color based on the input string.
 * Uses a simple djb2-like hash to map strings to palette indices.
 *
 * @param {string} input - The input string (e.g., skill name).
 * @returns {string} - A hex color code from the Neo-Brutalist palette.
 */
export function getNeoColor(input) {
  if (!input || typeof input !== 'string') {
    // Return the first color (neo-yellow) as default/fallback
    return NEO_PALETTE[0];
  }

  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    // hash * 33 + c
    hash = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  // Ensure positive index
  const index = Math.abs(hash) % NEO_PALETTE.length;
  return NEO_PALETTE[index];
}