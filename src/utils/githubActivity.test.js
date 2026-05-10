import { describe, expect, it } from "vitest";
import { formatLastSuccessLabel, getPushActionText, resolvePushCommitCount } from "./githubActivity";

describe("githubActivity utilities", () => {
  it("uses payload size for push commit count when available", () => {
    expect(resolvePushCommitCount({ size: 4, commits: [] })).toBe(4);
  });

  it("falls back to distinct_size or commits array length", () => {
    expect(resolvePushCommitCount({ distinct_size: 2 })).toBe(2);
    expect(resolvePushCommitCount({ commits: [{}, {}] })).toBe(2);
  });

  it("returns Active fallback when commit count cannot be determined", () => {
    expect(getPushActionText({ commits: [] })).toBe("pushed active changes to");
    expect(getPushActionText({})).toBe("pushed active changes to");
  });

  it("formats a last-success label only for valid timestamps", () => {
    expect(formatLastSuccessLabel(Date.now())).toContain("Last successful sync:");
    expect(formatLastSuccessLabel(undefined)).toBe("");
  });
});
