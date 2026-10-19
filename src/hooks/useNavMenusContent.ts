import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The navbar's menus, the full-screen menu, the homepage dock and the navbar's
 * own words: Navigation menus in the admin panel (section `nav.menus`).
 *
 * One document serves the whole navbar, which is on every page, so it is
 * fetched once and kept in a module-level cache. Two lists are not stored here
 * because they already have a home: the Cells menu's links come from the
 * committee register and the course links under Academics from the course
 * register. `utils/navMenus.ts` merges them in.
 */

/** The menus, in bar order. Fixed: they are the address prefixes of the pages under them. */
export const NAV_MENU_IDS = [
  "about-us",
  "academics",
  "students-corner",
  "cells",
  "research-and-innovation",
  "iqac",
  "training-and-placement",
  "activities",
] as const;
export type NavMenuId = (typeof NAV_MENU_IDS)[number];

/** The homepage parts the dock's pills scroll to, left to right. Fixed. */
export const NAV_DOCK_IDS = [
  "home",
  "about",
  "university-gazette",
  "principal-message",
  "courses",
  "campus-life",
  "blogs-magazine",
  "admissions",
] as const;
export type NavDockId = (typeof NAV_DOCK_IDS)[number];

export interface NavFeaturedImage {
  image: string;
  caption: string;
}

/** The three pictures down the right of a desktop dropdown, and the line at its foot. */
export interface NavMenuFeatured {
  accentText: string;
  tall1: NavFeaturedImage;
  tall2: NavFeaturedImage;
  landscape: NavFeaturedImage & { tag: string };
}

/** A link under a heading in a menu: "Library" under Resources. */
export interface NavMenuChild {
  /** Its name in the desktop dropdown. */
  label: string;
  /** Its name in the full-screen menu (the only menu on phones) and in search. Empty uses `label`. */
  overlayLabel: string;
  /** Its pill in the bar at the foot of inside pages. Empty uses `label`. */
  shortLabel: string;
  /** Where it goes: an address on this site, starting with `/`. */
  href: string;
  /** The line under the name in the desktop dropdown and the full-screen menu. May be empty. */
  description: string;
  /** A Lucide icon name: the icon on its pill at the foot of inside pages. */
  icon: string;
  /** Which column of the desktop dropdown it sits in, counting from 1. */
  column: number;
}

/** A link in a menu. With children it is a heading with links under it. */
export interface NavMenuLink extends NavMenuChild {
  /** May be empty only on a heading (a link with children, or the one that holds the courses). */
  href: string;
  /** The links under this one. Empty for a plain link. */
  children: NavMenuChild[];
  /**
   * Academics only, on exactly one link: its children are the courses from the
   * course register, in place of `children` here (which stays empty).
   */
  holdsCourses?: boolean;
}

export interface NavMenu {
  id: NavMenuId;
  /** Its name in the full-screen menu's list, the heading when it is opened there, and over its search results. */
  label: string;
  /** Its name on the desktop bar. Empty uses `label`. */
  barLabel: string;
  /** The desktop dropdown's column headings, left to right (1 to 3). */
  columns: { title: string }[];
  /** Its links, in the order the full-screen menu, the inside-page bar and search list them. Empty for Cells. */
  links: NavMenuLink[];
  featured: NavMenuFeatured;
}

/** The left half of the full-screen menu, and its Student Help Desk row. */
export interface NavFullScreen {
  /** The small heading over the suggested searches. */
  popularHeading: string;
  /** The searches offered under the search box. */
  popularTerms: NavSearchTerm[];
  /** The photo panel under the search box, on a tablet or computer, and its button. */
  photo: { image: string; alt: string; heading: string; text: string; buttonLabel: string; buttonHref: string };
  /** The Student Help Desk row in the full-screen menu, and the button in the strip under the desktop bar. */
  helpDesk: { label: string; badge: string };
}

/** A suggested search. With an `href` it opens that page; without, it searches the site for `label`. */
export interface NavSearchTerm {
  label: string;
  href: string;
}

/** A pill in the homepage dock. Its `id` is the part of the homepage it scrolls to. */
export interface NavDockItem {
  id: NavDockId;
  label: string;
}

/** Words the navbar shows that are not menu content. */
export interface NavWording {
  /** The button at the top right of the full-screen menu, on a computer. */
  close: string;
  /** The heading over the full-screen menu's search box. */
  search: string;
  /** The grey words in that search box. */
  searchPlaceholder: string;
  /** The grey words in the phone's search box, over the main list. */
  phoneSearchPlaceholder: string;
  /** Under the search box after one or two letters. */
  keepTyping: string;
  /** Under the search box while it opens the results. */
  searching: string;
  /** The small line over the full-screen menu's list. */
  mainMenu: string;
  /** The link back out of an opened menu, in the full-screen menu. */
  back: string;
  /** The first pill in the bar at the foot of inside pages, from a tablet up. */
  dockHome: string;
}

export interface NavMenusContent {
  menus: NavMenu[];
  fullScreen: NavFullScreen;
  /** The gold enquiry button in the bar, on the homepage and on inside pages. */
  enquiry: { label: string; href: string };
  dock: NavDockItem[];
  wording: NavWording;
}

/** The pictures every menu without its own shipped with. */
const plainFeatured = (label: string): NavMenuFeatured => ({
  accentText: `Welcome to the ${label} section of CKPIPSR`,
  tall1: {
    image: "/media/unsplash/photo-1541339907198-e08756dedf3f-dfe9a1.jpg",
    caption: "College Campus",
  },
  tall2: {
    image: "/media/unsplash/photo-1517842645767-c639042777db-328461.jpg",
    caption: "Study & Research",
  },
  landscape: {
    image: "/media/unsplash/photo-1522202176988-66273c2fd55f-317ded.jpg",
    caption: `Explore our ${label} section`,
    tag: "CKPIPSR",
  },
});

/** A plain link; `extra` names the fields that differ from the usual. */
const link = (
  label: string,
  href: string,
  description: string,
  icon: string,
  column: number,
  extra: Partial<NavMenuLink> = {},
): NavMenuLink => ({
  label,
  overlayLabel: "",
  shortLabel: label,
  href,
  description,
  icon,
  column,
  children: [],
  ...extra,
});

const child = (
  label: string,
  href: string,
  description: string,
  icon: string,
  column: number,
  extra: Partial<NavMenuChild> = {},
): NavMenuChild => ({ label, overlayLabel: "", shortLabel: label, href, description, icon, column, ...extra });

const RI = "/research-and-innovation";

/** What the navbar shipped with: the site shows this when the section is missing, hidden or unusable. */
export const DEFAULT_NAV_MENUS: NavMenusContent = {
  menus: [
    {
      id: "about-us",
      label: "About Us",
      barLabel: "",
      columns: [{ title: "Who We Are" }, { title: "Governance & Campus" }],
      links: [
        link("Profile", "/about-us/profile", "Overview and background of CKPIPSR", "Info", 1),
        link("The Founder", "/about-us/the-founder", "Honoring Shri Chhotubhai Pithawalla", "Award", 1, { shortLabel: "Founder" }),
        link("Vision and Mission", "/about-us/vision-and-mission", "Our foundational pillars and goals", "Target", 1, { shortLabel: "Vision" }),
        link("About Trust", "/about-us/about-trust", "Navyug Vidyabhavan Trust history", "Sparkles", 1, { overlayLabel: "The Trust", shortLabel: "Trust" }),
        link("PO and PEOs", "/about-us/po-and-peos", "Program outcomes and educational objectives", "Target", 1, { shortLabel: "PO & PEO" }),
        link("Governing Body", "/about-us/governing-body", "Distinguished members of the governing council", "Users", 2),
        link("Campus Map", "/about-us/campus-map", "Interactive campus layout, blocks, and directions", "Compass", 2),
        link("Contact Us", "/about-us/contact-us", "Location, timings, and contact details", "Phone", 2, { shortLabel: "Contact" }),
        link("The Principal", "/about-us/the-principal", "Leadership message and vision from Dr. Dhiren Shah", "Sparkles", 2, { overlayLabel: "Principal", shortLabel: "Principal" }),
        link("Deans and Faculty In-charges", "/about-us/deans-and-faculty-in-charges", "Academic council and department heads", "Users", 2, { shortLabel: "Deans & Faculty" }),
      ],
      featured: {
        accentText: "A Legacy of Quality in Pharmaceutical Education & Scientific Research",
        tall1: {
          image: "/media/unsplash/photo-1541339907198-e08756dedf3f-dfe9a1.jpg",
          caption: "Vision & Goals",
        },
        tall2: {
          image: "/media/unsplash/photo-1573496359142-b8d87734a5a2-a2756b.jpg",
          caption: "Principal's Message",
        },
        landscape: {
          image: "/media/unsplash/photo-1581091226825-a6a2a5aee158-2b4329.jpg",
          caption: "C.K. Pithawalla Institute of Pharmaceutical Science & Research",
          tag: "Est. 2005",
        },
      },
    },
    {
      id: "academics",
      label: "Academics",
      barLabel: "",
      columns: [{ title: "Pharmacy Programs" }, { title: "Academics" }, { title: "Resources" }],
      links: [
        link("Courses Offered", "/academics/courses-offered", "D.Pharm, B.Pharm, and M.Pharm programs", "BookOpen", 1, {
          shortLabel: "Courses",
          holdsCourses: true,
        }),
        link("Approvals", "/academics/approvals", "", "Sparkles", 2),
        link("Faculties", "/academics/faculties", "Our qualified academic guides and researchers", "Users", 2),
        link("Resources", "", "Campus infrastructure and central facilities", "Building2", 3, {
          shortLabel: "",
          children: [
            child("Laboratories", "/academics/resources-laboratories", "", "Cpu", 3, { shortLabel: "Labs" }),
            child("Central Library", "/academics/resources-library", "Central collection of books and journals", "BookOpen", 3, { overlayLabel: "Library", shortLabel: "Library" }),
            child("Sports Facilities", "/academics/resources-sports", "Indoor-outdoor games & gymkhana", "Trophy", 3, { overlayLabel: "Sports", shortLabel: "Sports" }),
            child("Residential Hostels", "/academics/resources-hostel", "Secure residential boarding facilities", "Building2", 3, { overlayLabel: "Hostel", shortLabel: "Hostel" }),
            child("Medical Center", "/academics/resources-medical", "", "Shield", 3, { overlayLabel: "Medical", shortLabel: "Medical" }),
            child("Transportation & Parking", "/academics/resources-transportation", "", "Trophy", 3, { overlayLabel: "Transportation", shortLabel: "Transport" }),
            child("Seminar Hall", "/academics/resources-seminar-hall", "", "Laptop", 3),
            child("Cafeteria & Dining", "/academics/resources-cafeteria", "", "Coffee", 3, { overlayLabel: "Cafeteria", shortLabel: "Cafeteria" }),
            child("Central Facilities", "/academics/resources-central-facilities", "", "Building2", 3, { shortLabel: "Central Fac" }),
            child("EV Charging Station", "/academics/resources-ev-charging-station", "", "Cpu", 3, { shortLabel: "EV Station" }),
            child("Medicinal Garden", "/academics/resources-medicinal-garden", "", "Shield", 3, { shortLabel: "Garden" }),
          ],
        }),
      ],
      featured: {
        accentText: "Nurturing Competent, Ethical & Innovative Pharmacy Professionals",
        tall1: {
          image: "/media/unsplash/photo-1576086213369-97a306d36557-bea311.jpg",
          caption: "Formulation Lab",
        },
        tall2: {
          image: "/media/unsplash/photo-1582719508461-905c673771fd-e3c936.jpg",
          caption: "Library Hub",
        },
        landscape: {
          image: "/media/unsplash/photo-1507842217343-583bb7270b66-5f5c74.jpg",
          caption: "Advanced Research Instrumentation & Resources",
          tag: "PCI & GTU Approved",
        },
      },
    },
    {
      id: "students-corner",
      label: "Students Corner",
      barLabel: "Students",
      columns: [{ title: "Quick Links" }],
      links: [
        link("Timetables", "/students-corner/timetables", "Academic routine and semester class schedules", "Calendar", 1),
        link("Courses", "/students-corner/courses", "B.Pharm semester syllabus, subject codes & syllabus PDFs", "BookOpen", 1),
        // The address keeps the old spelling; the full-screen menu still shows it.
        link("Scholarships", "/students-corner/scholorships", "Government schemes, corporate foundations & awards", "Award", 1, { overlayLabel: "Scholorships" }),
        link("Alumni", "/students-corner/alumni", "CKPIPSRAA network, committee & alumni registration", "GraduationCap", 1),
      ],
      featured: plainFeatured("Students Corner"),
    },
    {
      id: "cells",
      label: "Cells",
      barLabel: "",
      columns: [{ title: "Quick Links" }],
      // From the committee register.
      links: [],
      featured: plainFeatured("Cells"),
    },
    {
      id: "research-and-innovation",
      label: "Research & Innovation",
      barLabel: "Research",
      columns: [{ title: "Research" }, { title: "Projects & Partnerships" }, { title: "SSIP & IIC" }],
      links: [
        link("Research", "", "", "Sparkles", 1, {
          shortLabel: "",
          children: [
            child("About Research", `${RI}/research-about`, "Research & Development Cell, Vision, Mission & Policy", "FlaskConical", 1, { overlayLabel: "About", shortLabel: "Research" }),
            child("Publications", `${RI}/research-publications`, "Annual research journals & publications", "FileText", 1),
            child("Patents", `${RI}/research-patents`, "Granted patents & innovative technology filings", "Award", 1),
            child("Books", `${RI}/research-books`, "Authored textbooks, monographs & book chapters", "BookOpen", 1),
            child("Doctoral Studies", `${RI}/research-doctoral-studies`, "Ph.D. research scholars, approved GTU guides & theses", "GraduationCap", 1, { shortLabel: "Ph.D. Studies" }),
            child("PG Projects", `${RI}/research-pg-projects`, "Post graduate dissertation projects & publications", "FlaskConical", 2),
            child("Grants", `${RI}/research-grants`, "Sponsored seminars, refresher courses & research funding", "Landmark", 2),
            child("Consultancy", `${RI}/research-consultancy`, "Funded minor research projects & investigator consultancies", "Briefcase", 2),
            child("Ethics", `${RI}/research-ethics`, "Code of ethics for research, organization & scientific investigators", "Shield", 2),
            child("MOUs", `${RI}/research-mous`, "Industrial partnerships, hospital linkages & academic MOUs", "HeartHandshake", 2),
          ],
        }),
        link("SSIP", "", "Student Start-up & Innovation Policy, IPIES ecosystem & pre-incubation", "Rocket", 3, {
          shortLabel: "",
          children: [
            child("About SSIP", `${RI}/ssip-about`, "Student Start-up & Innovation Policy, IPIES ecosystem & pre-incubation", "Rocket", 3, { overlayLabel: "About", shortLabel: "SSIP Cell" }),
            child("SSIP Mentors", `${RI}/ssip-mentors`, "", "Sparkles", 3, { overlayLabel: "Mentors" }),
            child("SSIP Updates", `${RI}/ssip-updates`, "", "Sparkles", 3, { overlayLabel: "Updates" }),
            child("Apply to SSIP", `${RI}/ssip-apply`, "", "Sparkles", 3, { overlayLabel: "Apply", shortLabel: "SSIP Apply" }),
          ],
        }),
        link("IIC", `${RI}/iic`, "", "Sparkles", 3, { shortLabel: "IIC Cell" }),
      ],
      featured: plainFeatured("Research & Innovation"),
    },
    {
      id: "iqac",
      label: "Accreditation & Ranking",
      barLabel: "Accreditation",
      columns: [{ title: "About the Cell" }, { title: "Quality & Disclosure" }],
      links: [
        link("About IQAC", "/iqac/about-iqac", "Quality assurance cell overview", "Shield", 1),
        link("IQAC Composition", "/iqac/iqac-composition", "", "Sparkles", 1, { shortLabel: "Composition" }),
        link("IQAC Initiatives and Activities", "/iqac/iqac-initiatives-and-activities", "", "Sparkles", 1, { shortLabel: "Initiatives" }),
        link("MoMs and ATR", "/iqac/moms-and-atr", "", "Sparkles", 1, { shortLabel: "Minutes & ATR" }),
        link("Institution Distinctiveness", "/iqac/institution-distinctiveness", "", "Sparkles", 2, { shortLabel: "Distinctiveness" }),
        link("Best Practices", "/iqac/best-practices", "", "Sparkles", 2),
        link("NIRF", "/iqac/nirf", "", "Sparkles", 2),
        link("AISHE", "/iqac/aishe", "", "Sparkles", 2),
        link("IIQA", "/iqac/iiqa", "", "Sparkles", 2),
        link("IDP", "/iqac/idp", "", "Sparkles", 2),
        link("RTI", "/iqac/rti", "", "Sparkles", 2),
      ],
      featured: plainFeatured("Accreditation & Ranking"),
    },
    {
      id: "training-and-placement",
      label: "T&P",
      barLabel: "",
      columns: [{ title: "Quick Links" }],
      links: [
        link("Placements", "/training-and-placement/placements", "", "Sparkles", 1),
        link("Training", "/training-and-placement/training", "", "Sparkles", 1),
        link("Activity", "/training-and-placement/activity", "", "Sparkles", 1),
        link("Visits", "/training-and-placement/visits", "", "Sparkles", 1),
        link("Committee", "/training-and-placement/committee", "", "Sparkles", 1),
      ],
      featured: plainFeatured("T&P"),
    },
    {
      id: "activities",
      label: "Activities",
      barLabel: "",
      columns: [{ title: "Quick Links" }],
      links: [
        link("Events", "/activities/events", "National conferences, webinars & workshops", "Calendar", 1),
        link("Achievements", "/activities/achievements", "Celebrations of rankers & medalists", "Trophy", 1),
      ],
      featured: plainFeatured("Activities"),
    },
  ],
  fullScreen: {
    popularHeading: "Popular search terms",
    popularTerms: ["Admissions", "B.Pharm", "M.Pharm", "D.Pharm", "Hostel", "Gallery"].map((label) => ({ label, href: "" })),
    photo: {
      image: "/media/unsplash/photo-1581091226825-a6a2a5aee158-7b32cb.jpg",
      alt: "Campus & Admissions",
      heading: "Embark on Your Academic Journey",
      text: "Join Surat's premier institution for pharmaceutical education, research, and healthcare innovation. Apply online today.",
      buttonLabel: "Inquiry Now",
      buttonHref: "/admissions/inquiry",
    },
    helpDesk: { label: "Student Help Desk", badge: "Portal" },
  },
  dock: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "university-gazette", label: "News" },
    { id: "principal-message", label: "Principal" },
    { id: "courses", label: "Courses" },
    { id: "campus-life", label: "Campus" },
    { id: "blogs-magazine", label: "Blogs & Magazine" },
    { id: "admissions", label: "Admissions" },
  ],
  wording: {
    close: "Close",
    search: "Search",
    searchPlaceholder: "Please enter a search term",
    phoneSearchPlaceholder: "Search website...",
    keepTyping: "Keep typing…",
    searching: "Searching…",
    mainMenu: "Main menu",
    back: "Back",
    dockHome: "Home",
  },
  enquiry: { label: "Inquiry Now", href: "/admissions/inquiry" },
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Enough of a check that a malformed menu cannot empty the navbar. */
function isUsableMenu(value: unknown): value is NavMenu {
  if (!isObject(value)) return false;
  return (
    typeof value.label === "string" &&
    Array.isArray(value.columns) &&
    value.columns.length > 0 &&
    Array.isArray(value.links) &&
    value.links.every((l) => isObject(l) && typeof l.label === "string" && Array.isArray(l.children))
  );
}

/**
 * Takes each part from the response when it is usable and the shipped default
 * otherwise, so a row saved before a part existed still renders in full. The
 * menus and dock pills are fixed, so they are matched by id and kept in
 * shipped order.
 */
function merge(value: unknown): NavMenusContent | null {
  if (!isObject(value)) return null;
  const menus = Array.isArray(value.menus) ? value.menus : [];
  const dock = Array.isArray(value.dock) ? value.dock : [];
  const byId = <T,>(list: unknown[], id: string) =>
    list.find((item) => isObject(item) && item.id === id) as T | undefined;
  return {
    menus: DEFAULT_NAV_MENUS.menus.map((fallback) => {
      const stored = byId<NavMenu>(menus, fallback.id);
      if (!isUsableMenu(stored)) return fallback;
      return {
        ...fallback,
        ...stored,
        id: fallback.id,
        featured: isObject(stored.featured) ? stored.featured : fallback.featured,
      };
    }),
    fullScreen: isObject(value.fullScreen) ? mergeFullScreen(value.fullScreen) : DEFAULT_NAV_MENUS.fullScreen,
    dock: DEFAULT_NAV_MENUS.dock.map((fallback) => {
      const stored = byId<NavDockItem>(dock, fallback.id);
      return typeof stored?.label === "string" && stored.label ? { ...fallback, label: stored.label } : fallback;
    }),
    wording: isObject(value.wording)
      ? { ...DEFAULT_NAV_MENUS.wording, ...(value.wording as Partial<NavWording>) }
      : DEFAULT_NAV_MENUS.wording,
    enquiry: isObject(value.enquiry)
      ? { ...DEFAULT_NAV_MENUS.enquiry, ...(value.enquiry as Partial<NavMenusContent["enquiry"]>) }
      : DEFAULT_NAV_MENUS.enquiry,
  };
}

/**
 * The full-screen menu, part by part. A row published before the search terms
 * had addresses holds them as plain words, and its photo has no button yet, so
 * both are brought up to the current shape.
 */
function mergeFullScreen(stored: Record<string, unknown>): NavFullScreen {
  const fallback = DEFAULT_NAV_MENUS.fullScreen;
  const terms = Array.isArray(stored.popularTerms) ? stored.popularTerms : fallback.popularTerms;
  return {
    ...fallback,
    ...(stored as Partial<NavFullScreen>),
    popularTerms: terms
      .map((t) => (typeof t === "string" ? { label: t, href: "" } : (t as NavSearchTerm)))
      .filter((t) => isObject(t) && typeof t.label === "string" && t.label !== ""),
    photo: { ...fallback.photo, ...(isObject(stored.photo) ? (stored.photo as Partial<NavFullScreen["photo"]>) : {}) },
  };
}

let cache: NavMenusContent | null = null;
let inFlight: Promise<NavMenusContent | null> | null = null;

function load(): Promise<NavMenusContent | null> {
  if (cache) return Promise.resolve(cache);
  inFlight ??= fetch(withPreview("/api/pages/nav/menus"))
    .then((res) => (res.ok ? res.json() : null))
    .then((body) => {
      cache = merge(body?.navMenus);
      return cache;
    })
    // The navbar keeps what it shipped with if the API is down.
    .catch(() => null)
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

export function useNavMenusContent(): NavMenusContent {
  const [content, setContent] = useState<NavMenusContent>(() => cache ?? DEFAULT_NAV_MENUS);

  useEffect(() => {
    let cancelled = false;
    void load().then((value) => {
      if (!cancelled && value) setContent(value);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
