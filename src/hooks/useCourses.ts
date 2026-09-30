import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";
import {
  DEFAULT_BPHARM,
  DEFAULT_CERTIFICATE,
  DEFAULT_DPHARM,
  DEFAULT_MPHARM,
  type CourseContent,
} from "./useCourseContent";

/**
 * Academics → Courses Offered: the listing page and every course on it.
 *
 * Courses are data. The listing, each course's page, the navbar's menus, the
 * course tab bar and the footer all read this one list, so a course added,
 * renamed or switched off in the admin panel changes all of them together.
 */
export interface CourseCard {
  title: string;
  fullName: string;
  duration: string;
  intake: string;
  description: string;
  icon: string;
  color: string;
  tags: string[];
}

export interface CourseEntry {
  /** URL slug: the page is at /academics/courses-offered-<id>. */
  id: string;
  /** Always true on the live site; a preview also carries disabled courses. */
  enabled: boolean;
  /** The course's name in menus: "Courses Offered - <navLabel>". */
  navLabel: string;
  card: CourseCard;
  page: CourseContent;
}

export interface CoursesContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: { badge: string; heading: string; body: string };
  support: { title: string; body: string; points: string[]; stats: { value: string; label: string }[] };
  courses: CourseEntry[];
}

/** Every course page's address begins with this. */
export const COURSE_SLUG_PREFIX = "courses-offered-";
export const courseHref = (id: string) => `/academics/${COURSE_SLUG_PREFIX}${id}`;
/** How a course is labelled in the site's navigation data. */
export const courseNavLabel = (course: CourseEntry) => `Courses Offered - ${course.navLabel}`;

export const DEFAULT_COURSES: CoursesContent = {
  pageTitle: "Courses Offered",
  pageSubtitle: "Excellence in pharmaceutical education through diverse and specialized programs.",
  intro: {
    badge: "Academic Excellence",
    heading: "Shape Your Future in Pharmacy",
    body: "We offer a range of PCI-approved pharmacy programs designed to provide students with the technical skills, ethical values, and research mindset required for a successful career in the healthcare industry.",
  },
  support: {
    title: "Academic Support & Holistic Learning",
    body: "Beyond the classroom, we provide a supportive ecosystem that encourages research, innovation, and professional development.",
    points: [
      "PCI & GTU Approved Curriculum",
      "Expert Doctoral Faculty Mentorship",
      "Industry-Linked Research Projects",
      "Advanced Laboratory Infrastructure",
      "Placement & Career Guidance",
    ],
    stats: [
      { value: "100%", label: "Compliance" },
      { value: "15+", label: "Specializations" },
      { value: "20+", label: "Patents Filed" },
      { value: "500+", label: "Alumni Network" },
    ],
  },
  courses: [
    {
      id: "d-pharm", enabled: true, navLabel: "D.Pharm",
      card: {
        title: "D.Pharm.", fullName: "Diploma in Pharmacy", duration: "2 Years", intake: "60 Seats",
        description: "Fundamental knowledge in pharmaceutical science and community pharmacy practice.",
        icon: "GraduationCap", color: "blue", tags: ["Entry Level", "Community Practice"],
      },
      page: DEFAULT_DPHARM,
    },
    {
      id: "b-pharm", enabled: true, navLabel: "B.Pharm",
      card: {
        title: "B.Pharm.", fullName: "Bachelor of Pharmacy", duration: "4 Years", intake: "100 Seats",
        description: "Comprehensive undergraduate degree covering clinical and industrial pharmacy.",
        icon: "BookOpen", color: "emerald", tags: ["Undergraduate", "Research Oriented"],
      },
      page: DEFAULT_BPHARM,
    },
    {
      id: "m-pharm", enabled: true, navLabel: "M.Pharm",
      card: {
        title: "M.Pharm.", fullName: "Master of Pharmacy", duration: "2 Years", intake: "15 Seats",
        description: "Specialized postgraduate studies in advanced pharmaceutical research.",
        icon: "Award", color: "amber", tags: ["Postgraduate", "Specialized"],
      },
      page: DEFAULT_MPHARM,
    },
    {
      id: "short-term-certificate", enabled: true, navLabel: "Short Term Certificate",
      card: {
        title: "Certificate", fullName: "Short Term Certificate", duration: "8 Weeks", intake: "100 Seats",
        description: "Intensive online skill program for dossier preparation and filing.",
        icon: "Zap", color: "purple", tags: ["Skill Development", "Industry Focused"],
      },
      page: DEFAULT_CERTIFICATE,
    },
  ],
};

/** Enough of a check that a malformed response cannot empty the site's menus. */
function isUsable(value: unknown): value is CoursesContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<CoursesContent>;
  return (
    !!c.intro &&
    !!c.support &&
    Array.isArray(c.courses) &&
    c.courses.every((course) => !!course?.id && !!course.card && !!course.page?.banner)
  );
}

interface CoursesState {
  content: CoursesContent;
  preview: boolean;
  /** False until the API has answered (or failed): a course missing from the defaults is not "not offered" yet. */
  loaded: boolean;
}

/**
 * One request per page load, shared: the navbar, footer and page all ask for
 * the same list at the same moment.
 */
let request: Promise<{ content: CoursesContent; preview: boolean } | null> | null = null;

function loadCourses() {
  if (!request) {
    request = fetch(withPreview("/api/pages/academics/courses"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => (body && isUsable(body.courses) ? { content: body.courses, preview: !!body.preview } : null))
      // The site does not depend on the API being up.
      .catch(() => null);
  }
  return request;
}

export function useCourses(): CoursesState {
  const [state, setState] = useState<CoursesState>({ content: DEFAULT_COURSES, preview: false, loaded: false });

  useEffect(() => {
    let cancelled = false;
    loadCourses().then((result) => {
      if (cancelled) return;
      setState(result ? { ...result, loaded: true } : { content: DEFAULT_COURSES, preview: false, loaded: true });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/**
 * The courses a visitor sees. The live API already leaves disabled ones out;
 * a preview includes them, and they stay out of the listing and menus there
 * too, so the preview shows what will actually publish.
 */
export const visibleCourses = (content: CoursesContent) => content.courses.filter((c) => c.enabled);
