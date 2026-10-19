/**
 * The site-wide search index — every page in the navigation, with its address.
 *
 * Built from the navbar's menus (useSiteNav), so anything in a menu is
 * findable, including the courses and cell committees merged in from their
 * registers: a link, course or committee that is added, renamed or switched
 * off is searchable as soon as the menus show it.
 * Ported from CET/CMC; scoring and grouping are identical on all three sites.
 */
import { useMemo } from 'react';
import type { NavMenu } from '../hooks/useNavMenusContent';
import { navPages, useSiteNav } from './navMenus';

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

/**
 * Pages that have their own route but no entry in the scraped menu data, so
 * they would otherwise never turn up in a search.
 */
const EXTRA_PAGES: Record<string, { label: string; path: string }[]> = {
  academics: [{ label: 'Admission Inquiry', path: '/admissions/inquiry' }],
  'students-corner': [
    { label: 'Course Syllabus', path: '/students-corner/course-syllabus' },
    { label: 'Student Help Desk', path: '/students-corner/student-help-desk' },
    { label: 'Hobby Club', path: '/students-corner/hobby-club' },
  ],
};

/** The pages one menu leads to, as search lists them. */
function sectionItems(menu: NavMenu): { label: string; path: string }[] {
  // A committee is found by its full name, which is what the Cells menu shows.
  if (menu.id === 'cells') return menu.links.map((l) => ({ label: l.label, path: l.href }));
  return [
    ...navPages(menu.links).map((page) => ({ label: page.label, path: page.href })),
    ...(EXTRA_PAGES[menu.id] ?? []),
  ];
}

export function buildSearchIndex(menus: NavMenu[]): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const seen = new Set<string>();
  unresolvedEntries.length = 0;
  for (const menu of menus) {
    const section = menu.label;
    for (const { label, path } of sectionItems(menu)) {
      if (!path) { unresolvedEntries.push({ label, section }); continue; }
      const isExternal = path.startsWith('http://') || path.startsWith('https://');
      const clean = isExternal ? path : `/${path.replace(/^\/+/, '')}`;
      const key = `${section}|${label}|${clean}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ label, section, path: clean, isExternal });
    }
  }
  if (import.meta.env.DEV && unresolvedEntries.length > 0) {
    console.warn(
      `[search] ${unresolvedEntries.length} nav labels have no path ` +
        `and are absent from search results:`,
      unresolvedEntries,
    );
  }
  return entries;
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
export function searchSite(index: SearchEntry[], query: string): ScoredEntry[] {
  const terms = normalise(query).split(' ').filter(Boolean);
  if (terms.length === 0) return [];

  const results: ScoredEntry[] = [];

  for (const entry of index) {
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

/** Groups ranked results under their dropdown, preserving navbar order (`sectionNames`). */
export function groupBySection(results: ScoredEntry[], sectionNames: string[]) {
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
const SUGGESTED_TERMS = [
  'B.Pharm',
  'M.Pharm',
  'Faculty',
  'Library',
  'Hostel',
  'Governing Body',
  'Events',
];

/** The search index, its suggestions and the menu names in navbar order, kept in step with the live menus. */
export function useSearchIndex() {
  const { menus } = useSiteNav();
  return useMemo(() => {
    const index = buildSearchIndex(menus);
    const suggestedTerms = SUGGESTED_TERMS.filter((t) => searchSite(index, t).length > 0);
    const sectionNames = menus.map((m) => m.label);
    return { index, suggestedTerms, sectionNames };
  }, [menus]);
}
