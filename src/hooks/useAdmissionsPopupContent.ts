import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The admissions popup on the homepage.
 *
 * This one hook reports whether it has heard back yet, which the others do not
 * need to. The popup's own settings decide whether it opens at all, so acting
 * on the shipped fallback would pop it up on a site where an editor had
 * switched it off — the page waits for the real answer before deciding.
 */
export interface AdmissionsPopupContent {
  isEnabled: boolean;
  /** Milliseconds after the intro finishes. */
  autoOpenDelayMs: number;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  /** Worked out on the server: whether the button leaves the site. */
  ctaIsExternal: boolean;
}

/** The popup as it shipped, and what it falls back to. */
export const DEFAULT_ADMISSIONS_POPUP: AdmissionsPopupContent = {
  isEnabled: true,
  autoOpenDelayMs: 1200,
  image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
  alt: "Admissions 2026-27",
  eyebrow: "Admissions Open 2026-27",
  title: "C.K. Pithawalla Institute",
  ctaLabel: "Apply Now",
  ctaHref: "https://gujacpc.admissions.nic.in/",
  ctaIsExternal: true,
};

function isUsable(value: unknown): value is AdmissionsPopupContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<AdmissionsPopupContent>;
  return (
    typeof c.isEnabled === "boolean" &&
    typeof c.autoOpenDelayMs === "number" &&
    typeof c.ctaLabel === "string"
  );
}

export interface AdmissionsPopupState {
  content: AdmissionsPopupContent;
  /** False until the API has answered, one way or the other. */
  isLoading: boolean;
}

export function useAdmissionsPopupContent(): AdmissionsPopupState {
  const [content, setContent] = useState<AdmissionsPopupContent>(DEFAULT_ADMISSIONS_POPUP);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/home/admissions-popup"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled) return;
        if (body && isUsable(body.admissionsPopup)) setContent(body.admissionsPopup);
      })
      // A dead API leaves the shipped settings in place rather than the popup
      // stuck shut, which is the kinder failure for a page nobody can edit.
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, isLoading };
}
