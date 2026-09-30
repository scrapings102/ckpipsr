import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";
import { LABORATORIES, LABORATORY_PHOTOS } from "../data/laboratoriesData";

/**
 * Academics → Resources → Laboratories.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down. They are built from the scraped lab list rather than
 * copied, so the two cannot drift apart.
 */
export interface LaboratoryEntry {
  name: string;
  /** The small gold line under the name. */
  wing: string;
  /** The badge in the card's footer. */
  status: string;
  /** A lab with none shows its name alone. */
  descriptions: string[];
}

export interface LaboratoriesContent {
  pageTitle: string;
  banner: { badge: string; heading: string; body: string };
  list: { heading: string; subtitle: string };
  labs: LaboratoryEntry[];
  gallery: { heading: string; subtitle: string; photos: string[] };
}

export const DEFAULT_LABORATORIES: LaboratoriesContent = {
  pageTitle: "Laboratories",
  banner: {
    badge: "Research Infrastructure",
    heading: "Scientific Laboratories",
    body: "CKPIPSR features state-of-the-art laboratory environments built to model modern pharmaceutical and clinical setups. These advanced workspaces empower students through intensive, hands-on experiential education.",
  },
  list: {
    heading: "Our Research & Experimental Laboratories",
    subtitle: "Browse through our twelve specialized testing facilities and research wings.",
  },
  labs: LABORATORIES.map((lab) => ({
    name: lab.name,
    wing: "Pharmacy Wing",
    status: "Active",
    descriptions: lab.descriptions,
  })),
  gallery: {
    heading: "Laboratory Photo Archive",
    subtitle:
      "Visual highlights of the sophisticated equipment, sterile suites, and compound processing benches.",
    photos: LABORATORY_PHOTOS,
  },
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is LaboratoriesContent {
  if (typeof value !== "object" || value === null) return false;
  const l = value as Partial<LaboratoriesContent>;
  return (
    Array.isArray(l.labs) &&
    l.labs.length > 0 &&
    Array.isArray(l.gallery?.photos) &&
    !!l.banner?.heading
  );
}

export function useLaboratoriesContent(): LaboratoriesContent {
  const [content, setContent] = useState<LaboratoriesContent>(DEFAULT_LABORATORIES);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/academics/laboratories"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.laboratories)) setContent(body.laboratories);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
