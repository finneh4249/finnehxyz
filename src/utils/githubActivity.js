export function resolvePushCommitCount(payload) {
  const arrayCount = Array.isArray(payload?.commits) ? payload.commits.length : null;
  const candidates = [payload?.size, payload?.distinct_size, arrayCount];
  const count = candidates.find((value) => Number.isInteger(value) && value > 0);
  return typeof count === "number" ? count : null;
}

export function getPushActionText(payload) {
  const commitCount = resolvePushCommitCount(payload);
  if (commitCount !== null) {
    return `pushed ${commitCount} commit${commitCount !== 1 ? "s" : ""} to`;
  }
  return "pushed Active changes to";
}

export function formatLastSuccessLabel(timestamp) {
  if (!timestamp || !Number.isFinite(timestamp)) return "";
  return `Last successful sync: ${new Date(timestamp).toLocaleString()}`;
}
