import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The committees under Cells, as the admin panel lists them.
 *
 * Committees are data: they can be added, renamed, reordered and switched off,
 * so the navbar and the committee pages read the live list rather than a fixed
 * one. It is fetched once and kept in a module-level cache, because the navbar
 * is on every page.
 */
export interface CellsMenuItem {
  slug: string;
  /** Short name — the key the menus and breadcrumbs use, e.g. ARC. */
  navLabel: string;
  /** The full name the menu prints. */
  menuTitle: string;
  /** The line under that name; may be empty. */
  menuDescription: string;
}

/** What the site shipped with, so the menu is never empty if the API is down. */
export const DEFAULT_CELLS_MENU: CellsMenuItem[] = [
  {
    slug: "arc",
    navLabel: "ARC",
    menuTitle: "Anti-Ragging Committee (ARC)",
    menuDescription: "Anti-Ragging Committee, Squad & Reporting",
  },
  {
    slug: "wdc",
    navLabel: "WDC",
    menuTitle: "Women Development Cell (WDC)",
    menuDescription: "Women Development Cell & Gender Equality",
  },
  {
    slug: "sc-st-cell",
    navLabel: "SC-ST Cell",
    menuTitle: "SC-ST Cell (Empowerment)",
    menuDescription: "Equal opportunities, empowerment & welfare resources",
  },
  {
    slug: "grc",
    navLabel: "GRC",
    menuTitle: "Grievance Redressal Cell (GRC)",
    menuDescription: "Grievance Redressal Cell & fair student resolution",
  },
  {
    slug: "adc",
    navLabel: "ADC",
    menuTitle: "Anti-Discrimination Cell (ADC)",
    menuDescription: "Anti-Discrimination Cell & Equal Opportunity",
  },
  {
    slug: "edc",
    navLabel: "EDC",
    menuTitle: "Entrepreneurship Development Cell (EDC)",
    menuDescription: "Entrepreneurship Development Cell & Innovation",
  },
  {
    slug: "gsc",
    navLabel: "GSC",
    menuTitle: "Gender Sensitization Cell (GSC)",
    menuDescription: "Gender Sensitization Cell & Equality Promotion",
  },
];

/** Enough of a check that a malformed response cannot empty the menu. */
function isUsable(value: unknown): value is CellsMenuItem[] {
  return Array.isArray(value) && value.length > 0 && value.every((c) => !!(c as CellsMenuItem)?.slug);
}

let cache: CellsMenuItem[] | null = null;
let inFlight: Promise<CellsMenuItem[] | null> | null = null;

function load(): Promise<CellsMenuItem[] | null> {
  if (cache) return Promise.resolve(cache);
  inFlight ??= fetch(withPreview("/api/pages/cells"))
    .then((res) => (res.ok ? res.json() : null))
    .then((body) => {
      if (!isUsable(body?.committees)) return null;
      cache = body.committees;
      return cache;
    })
    // The menu keeps what it shipped with if the API is down.
    .catch(() => null)
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

export function useCellsMenu(): CellsMenuItem[] {
  const [committees, setCommittees] = useState<CellsMenuItem[]>(() => cache ?? DEFAULT_CELLS_MENU);

  useEffect(() => {
    let cancelled = false;
    void load().then((value) => {
      if (!cancelled && value) setCommittees(value);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return committees;
}
