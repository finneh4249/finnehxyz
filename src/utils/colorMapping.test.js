import { describe, it, expect } from 'vitest';
import { getNeoColor } from './colorMapping';
import designTokens from '../../design_tokens.json';

const NEO_PALETTE = Object.values(designTokens.theme.colors.palette);

describe('getNeoColor Utility', () => {
  it('should return a valid Neo-Brutalist color from the design tokens', () => {
    const result = getNeoColor('React');
    expect(NEO_PALETTE).toContain(result);
  });

  it('should be deterministic (same input returns same color)', () => {
    const input = 'Astro Framework';
    const run1 = getNeoColor(input);
    const run2 = getNeoColor(input);
    expect(run1).toBe(run2);
  });

  it('should handle empty or null inputs gracefully by returning a valid color', () => {
    expect(NEO_PALETTE).toContain(getNeoColor(''));
    expect(NEO_PALETTE).toContain(getNeoColor(null));
    expect(NEO_PALETTE).toContain(getNeoColor(undefined));
  });

  it('should distribute colors across different inputs (simple hash verification)', () => {
    const inputs = ['React', 'Vue', 'Svelte', 'Angular', 'Python', 'Rust', 'Go', 'Java'];
    const results = new Set(inputs.map(getNeoColor));
    // We expect at least 2 different colors to be chosen from the 6 available options
    // to prove it's not just hardcoded to one value.
    expect(results.size).toBeGreaterThan(1);
  });
});