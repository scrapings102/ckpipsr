import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The intro animation's editable content.
 *
 * The images are chosen in the admin panel from the hero's own list, so the
 * final one can zoom into the hero without a seam. The defaults below are what
 * the loader shipped with and stay the fallback: the animation must play if the
 * API is down or slow.
 *
 * Unlike the hero, the loader plays once and immediately — it cannot swap its
 * images mid-run without restarting the timeline. So `ready` reports whether
 * the fetch has settled, and the loader waits for it before starting.
 */
export interface PreloaderContent {
  enabled: boolean;
  speed: number;
  images: string[];
}

export const DEFAULT_PRELOADER: PreloaderContent = {
  enabled: true,
  speed: 1.15,
  images: [
    "/images/hero/646efc827452b.webp",
    "/images/hero/65efea4943a49.webp",
    "/images/hero/65efeac7d49a3.webp",
    "/images/hero/65efeaeece007.webp",
  ],
};

/** Enough of a check that a malformed response cannot break the animation. */
function isUsable(value: unknown): value is PreloaderContent {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Partial<PreloaderContent>;
  return (
    typeof p.speed === "number" &&
    p.speed > 0 &&
    Array.isArray(p.images) &&
    p.images.length >= 2 &&
    p.images.every((s) => typeof s === "string")
  );
}

/**
 * One request, however many components ask.
 *
 * Both the loader and the hero need this — the hero to know which image the
 * loader will finish on — and they mount together. Without sharing, that is two
 * identical requests, and worse, two answers that could disagree if an edit
 * landed between them.
 */
let inFlight: Promise<PreloaderContent> | null = null;

function fetchPreloader(): Promise<PreloaderContent> {
  if (inFlight) return inFlight;
  inFlight = fetch(withPreview("/api/home/preloader"))
    .then((res) => (res.ok ? res.json() : null))
    .then((body) => (body && isUsable(body.preloader) ? body.preloader : DEFAULT_PRELOADER))
    .catch(() => DEFAULT_PRELOADER);
  return inFlight;
}

export function usePreloaderContent(): { content: PreloaderContent; ready: boolean } {
  const [content, setContent] = useState<PreloaderContent>(DEFAULT_PRELOADER);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // The loader is the first thing a visitor sees, so it cannot wait on a slow
    // API. Past this, the shipped defaults play and a late response is ignored.
    const giveUp = setTimeout(() => {
      if (!cancelled) setReady(true);
    }, 1500);

    fetchPreloader().then((fetched) => {
      if (cancelled) return;
      clearTimeout(giveUp);
      setContent(fetched);
      setReady(true);
    });

    return () => {
      cancelled = true;
      clearTimeout(giveUp);
    };
  }, []);

  return { content, ready };
}
