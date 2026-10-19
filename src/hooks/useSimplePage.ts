import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The pages with no layout of their own: SSIP - Mentors, IIQA, Achievements
 * and the rest of the menu entries the college has not written yet.
 *
 * There is no bundled default here: until the API answers, the catch-all page
 * keeps rendering the scraped copy it always did, so a page with the API down
 * looks exactly as it did before it had an editor.
 */
export interface SimplePageSection {
  heading: string;
  /** Paragraphs split on blank lines. */
  body: string;
}

export interface SimplePageDocument {
  title: string;
  url: string;
}

export interface SimplePage {
  /** The page's address without the leading slash: "iqac/iiqa". */
  page: string;
  title: string;
  subtitle: string;
  sections: SimplePageSection[];
  documents: SimplePageDocument[];
}

function isUsable(value: unknown): value is { pages: SimplePage[] } {
  if (typeof value !== "object" || value === null) return false;
  const pages = (value as { pages?: unknown }).pages;
  return (
    Array.isArray(pages) &&
    pages.every(
      (p) =>
        typeof p?.page === "string" &&
        typeof p.title === "string" &&
        Array.isArray(p.sections) &&
        Array.isArray(p.documents),
    )
  );
}

/** "/IQAC/iiqa/" → "iqac/iiqa", the way the server names a page. */
const pageId = (pathname: string) => pathname.replace(/^\/+|\/+$/g, "").toLowerCase();

/**
 * The edited page at this address, or null when this is not one of these
 * pages, the API is not reachable, or it is still loading. Null always means "render what you had".
 */
export function useSimplePage(pathname: string): SimplePage | null {
  const [pages, setPages] = useState<SimplePage[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/simple"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.simplePages)) setPages(body.simplePages.pages);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  const id = pageId(pathname);
  return pages?.find((p) => p.page === id) ?? null;
}
