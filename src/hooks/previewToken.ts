/**
 * The preview token, taken from the URL.
 *
 * An editor opens the site from the admin panel with `?preview=<token>`, and
 * every content fetch on that page carries it so the API serves the unpublished
 * working copy instead of what is published.
 *
 * Read from the URL each time rather than stored: a preview is meant to end
 * when the tab is closed or the link is dropped, and stashing it would leave
 * someone silently browsing drafts days later.
 */
export function previewToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = new URLSearchParams(window.location.search).get("preview");
  return token && token.length > 0 ? token : null;
}

/** Appends the token to a content endpoint, when there is one. */
export function withPreview(path: string): string {
  const token = previewToken();
  if (!token) return path;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}preview=${encodeURIComponent(token)}`;
}
