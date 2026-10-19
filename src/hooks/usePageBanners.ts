import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The picture behind the title band at the top of each sub page, chosen per
 * page in the admin panel. Keyed by the page's address, like
 * `/about-us/profile`. A page with no entry keeps the picture it shipped with.
 *
 * Every sub page reads this, so the list is fetched once and kept in a
 * module-level cache: moving from page to page should not ask again.
 */
export type PageBanners = Record<string, string>;

/** Nothing chosen yet, so every page shows its built-in picture. */
export const DEFAULT_PAGE_BANNERS: PageBanners = {};

/** Keeps only address-to-picture pairs, so one bad entry cannot break a page. */
function usable(value: unknown): PageBanners | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  return Object.fromEntries(
    Object.entries(value).filter(([, src]) => typeof src === "string" && src.trim() !== ""),
  ) as PageBanners;
}

let cache: PageBanners | null = null;
let inFlight: Promise<PageBanners | null> | null = null;

function load(): Promise<PageBanners | null> {
  if (cache) return Promise.resolve(cache);
  inFlight ??= fetch(withPreview("/api/pages/banners"))
    .then((res): Promise<{ banners?: unknown }> | null => {
      // A 404 (nothing published yet, or the section is hidden) is an answer:
      // no chosen pictures. It is kept, so other pages do not ask again.
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`banners: ${res.status}`);
      return res.json();
    })
    .then((body) => {
      cache = usable(body?.banners) ?? DEFAULT_PAGE_BANNERS;
      return cache;
    })
    // With the API down the pages keep their built-in pictures, and the next
    // page tries again.
    .catch(() => null)
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

export function usePageBanners(): PageBanners {
  const [banners, setBanners] = useState<PageBanners>(() => cache ?? DEFAULT_PAGE_BANNERS);

  useEffect(() => {
    let cancelled = false;
    void load().then((value) => {
      if (!cancelled && value) setBanners(value);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return banners;
}
