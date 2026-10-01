/**
 * The site-wide search index — every page in the navigation, with its address.
 *
 * Built from ckpipsrNavigation (the same data the menus use), so anything in a
 * menu is findable, and a page added to the menus is searchable automatically.
 * Ported from CET/CMC; scoring and grouping are identical on all three sites.
 */
import { ckpipsrNavigation } from '../data/ckpipsrContent';

export interface SearchEntry {
  /** The submenu item label, as shown in the navbar. */
  label: string;
  /** The dropdown it sits under, e.g. "About Us", "Courses". */
  section: string;
  /** Internal route with a leading slash, or an absolute external URL. */
  path: string;
  /** True for Drive documents and other off-site links. */
  isExternal: boolean;
}

/** Nav labels with no entry in keyToHashSegment. Reported in dev only. */
export const unresolvedEntries: { label: string; section: string }[] = [];

function build(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const seen = new Set<string>();
  for (const [section, items] of Object.entries(ckpipsrNavigation)) {
    for (const { label, path } of items) {
      if (!path) { unresolvedEntries.push({ label, section }); continue; }
      const isExternal = path.startsWith('http://') || path.startsWith('https://');
      const clean = isExternal ? path : `/${path.replace(/^\/+/, '')}`;
      const key = `${section}|${label}|${clean}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ label, section, path: clean, isExternal });
    }
  }
  return entries;
}

export const searchIndex: SearchEntry[] = build();

/** Dropdown names, in navbar order. */
export const sectionNames: string[] = Object.keys(ckpipsrNavigation);

if (import.meta.env.DEV && unresolvedEntries.length > 0) {
  console.warn(
    `[search] ${unresolvedEntries.length} nav labels have no path ` +
      `and are absent from search results:`,
    unresolvedEntries,
  );
}

const normalise = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export interface ScoredEntry extends SearchEntry {
  score: number;
}

/**
 * Ranks entries against a query. Every whitespace-separated term must appear
 * in the label or its section, so a second word narrows rather than widens.
 */
export function searchSite(query: string): ScoredEntry[] {
  const terms = normalise(query).split(' ').filter(Boolean);
  if (terms.length === 0) return [];

  const results: ScoredEntry[] = [];

  for (const entry of searchIndex) {
    const label = normalise(entry.label);
    const section = normalise(entry.section);
    const haystack = `${label} ${section}`;

    if (!terms.every((t) => haystack.includes(t))) continue;

    const joined = terms.join(' ');
    let score = 0;

    if (label === joined) score = 100;
    else if (label.startsWith(joined)) score = 80;
    else if (label.includes(joined)) score = 60;
    else if (terms.every((t) => label.includes(t))) score = 40;
    else score = 20; // matched only through the section name

    // A shorter label containing the query is usually the more direct answer.
    score -= Math.min(label.length / 20, 5);

    results.push({ ...entry, score });
  }

  return results.sort(
    (a, b) => b.score - a.score || a.label.localeCompare(b.label),
  );
}

/** Groups ranked results under their dropdown, preserving navbar order. */
export function groupBySection(results: ScoredEntry[]) {
  const order = new Map(sectionNames.map((s, i) => [s, i]));
  const groups = new Map<string, ScoredEntry[]>();

  for (const r of results) {
    const list = groups.get(r.section);
    if (list) list.push(r);
    else groups.set(r.section, [r]);
  }

  return [...groups.entries()]
    .sort((a, b) => (order.get(a[0]) ?? 99) - (order.get(b[0]) ?? 99))
    .map(([section, items]) => ({ section, items }));
}

/**
 * Suggestions for the empty and no-result states, filtered against the index
 * so a dead suggestion can never be shown.
 */
export const suggestedTerms: string[] = [
  'B.Pharm',
  'M.Pharm',
  'Pharm.D',
  'Faculty',
  'Library',
  'Hostel',
  'Governing Body',
  'Events',
].filter((t) => searchSite(t).length > 0);
