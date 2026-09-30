import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The pictures beside each navbar menu — Featured in the admin panel.
 *
 * The navbar draws every menu, so all of them are fetched once and kept in a
 * module-level cache: the bar is on every page, and the menus are opened one
 * after another.
 */
export interface NavFeaturedImage {
  image: string;
  caption: string;
}

export interface NavFeaturedMenu {
  menu: string;
  accentText: string;
  tall1: NavFeaturedImage;
  tall2: NavFeaturedImage;
  landscape: NavFeaturedImage & { tag: string };
}

export type NavFeaturedByMenu = Record<string, NavFeaturedMenu>;

const byMenu = (menus: NavFeaturedMenu[]): NavFeaturedByMenu =>
  Object.fromEntries(menus.map((m) => [m.menu, m]));

/** Enough of a check that a malformed response cannot empty the menus. */
function isUsable(value: unknown): value is { menus: NavFeaturedMenu[] } {
  if (typeof value !== "object" || value === null) return false;
  const v = value as { menus?: unknown };
  return Array.isArray(v.menus) && v.menus.length > 0;
}

let cache: NavFeaturedByMenu | null = null;
let inFlight: Promise<NavFeaturedByMenu | null> | null = null;

function load(): Promise<NavFeaturedByMenu | null> {
  if (cache) return Promise.resolve(cache);
  inFlight ??= fetch(withPreview("/api/pages/nav/featured"))
    .then((res) => (res.ok ? res.json() : null))
    .then((body) => {
      if (!isUsable(body?.navFeatured)) return null;
      cache = byMenu(body.navFeatured.menus);
      return cache;
    })
    // The navbar keeps the pictures it shipped with if the API is down.
    .catch(() => null)
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

export function useNavFeatured(): NavFeaturedByMenu {
  const [featured, setFeatured] = useState<NavFeaturedByMenu>(() => cache ?? {});

  useEffect(() => {
    let cancelled = false;
    void load().then((value) => {
      if (!cancelled && value) setFeatured(value);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return featured;
}
