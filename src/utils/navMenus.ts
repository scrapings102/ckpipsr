import { useMemo } from 'react';
import {
  useNavMenusContent,
  type NavMenu,
  type NavMenuChild,
  type NavMenuLink,
  type NavMenusContent,
} from '../hooks/useNavMenusContent';
import { courseHref, useCourses, visibleCourses, type CourseEntry } from '../hooks/useCourses';
import { useCellsMenu, type CellsMenuItem } from '../hooks/useCellsMenu';

/**
 * The navbar's menus with the two registers merged in: the committees become
 * the Cells menu's links, and the courses become the children of the Academics
 * link marked `holdsCourses`. Everything that lists menu links (the navbar,
 * search, page banners) reads this, so they all show the same thing.
 */

/**
 * The inside-page pill of a committee, which the committee register does not
 * hold. Keyed by the committee's address; a new committee gets its short name
 * and the shield.
 */
const COMMITTEE_PILLS: Record<string, { shortLabel: string; icon: string }> = {
  arc: { shortLabel: 'Anti-Ragging', icon: 'Shield' },
  wdc: { shortLabel: 'Women Cell', icon: 'HeartHandshake' },
  'sc-st-cell': { shortLabel: 'SC-ST Cell', icon: 'UserCheck' },
  grc: { shortLabel: 'Grievance', icon: 'Scale' },
  adc: { shortLabel: 'Discipline', icon: 'ShieldCheck' },
  edc: { shortLabel: 'Equal Opp', icon: 'Rocket' },
  gsc: { shortLabel: 'Gender Cell', icon: 'HeartHandshake' },
};

/** The same for courses, keyed by course id; others get their menu name and the book. */
const COURSE_PILLS: Record<string, { shortLabel?: string; icon: string }> = {
  'm-pharm': { icon: 'Sparkles' },
  'short-term-certificate': { shortLabel: 'Certificate', icon: 'Award' },
};

/** A long Cells menu splits into two columns under the same heading, as it always has. */
const CELLS_PER_COLUMN = 8;

function cellsMenu(menu: NavMenu, committees: CellsMenuItem[]): NavMenu {
  const title = menu.columns[0]?.title ?? '';
  const split = committees.length > CELLS_PER_COLUMN;
  const half = Math.ceil(committees.length / 2);
  return {
    ...menu,
    columns: split ? [{ title }, { title }] : [{ title }],
    links: committees.map((c, i) => ({
      label: c.menuTitle || c.navLabel,
      overlayLabel: c.navLabel,
      shortLabel: COMMITTEE_PILLS[c.slug]?.shortLabel ?? c.navLabel,
      href: `/cells/${c.slug}`,
      description: c.menuDescription,
      icon: COMMITTEE_PILLS[c.slug]?.icon ?? 'Shield',
      column: split && i >= half ? 2 : 1,
      children: [],
    })),
  };
}

function courseChildren(parent: NavMenuLink, courses: CourseEntry[]): NavMenuChild[] {
  return courses.map((course) => ({
    label: course.navLabel,
    overlayLabel: '',
    shortLabel: COURSE_PILLS[course.id]?.shortLabel ?? course.navLabel,
    href: courseHref(course.id),
    description: `${course.card.fullName} (${course.card.duration})`,
    icon: COURSE_PILLS[course.id]?.icon ?? 'BookOpen',
    column: parent.column,
  }));
}

export function resolveNavMenus(
  menus: NavMenu[],
  courses: CourseEntry[],
  committees: CellsMenuItem[],
): NavMenu[] {
  return menus.map((menu) => {
    if (menu.id === 'cells') return cellsMenu(menu, committees);
    if (!menu.links.some((l) => l.holdsCourses)) return menu;
    return {
      ...menu,
      links: menu.links.map((l) => (l.holdsCourses ? { ...l, children: courseChildren(l, courses) } : l)),
    };
  });
}

/** A link's name in the full-screen menu and search. */
export const overlayName = (l: NavMenuChild) => l.overlayLabel || l.label;

/** One page a menu leads to, in list order. */
export interface NavPage {
  /** "Profile", or "Resources - Library" for a link under a heading: the name search shows. */
  label: string;
  href: string;
  shortLabel: string;
  icon: string;
}

/**
 * The pages behind a list of links, headings without an address left out.
 * This is the list the inside-page bar shows and search indexes.
 */
export function navPages(links: NavMenuLink[]): NavPage[] {
  const pages: NavPage[] = [];
  for (const l of links) {
    if (l.href) pages.push({ label: overlayName(l), href: l.href, shortLabel: l.shortLabel || l.label, icon: l.icon });
    for (const c of l.children)
      pages.push({
        label: `${overlayName(l)} - ${overlayName(c)}`,
        href: c.href,
        shortLabel: c.shortLabel || c.label,
        icon: c.icon,
      });
  }
  return pages;
}

/** The navbar's content with the registers merged in. */
export function useSiteNav(): NavMenusContent {
  const content = useNavMenusContent();
  const { content: courses } = useCourses();
  const committees = useCellsMenu();
  return useMemo(
    () => ({ ...content, menus: resolveNavMenus(content.menus, visibleCourses(courses), committees) }),
    [content, courses, committees],
  );
}
