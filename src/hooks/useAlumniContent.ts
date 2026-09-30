import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Students Corner → Alumni (CKPIPSRAA).
 *
 * Committee members arrive with their name and designation already worked
 * out: one linked to the Deans or Faculties page is named from it, and an
 * alumnus typed in here is printed as typed.
 *
 * The defaults are a skeleton, not the page's text: unlike the older pages
 * this one has no shipped copy to fall back on, so if the API is down the
 * tabs render empty rather than showing a stale constitution.
 */
export interface AlumniCommitteeMember {
  no: number;
  name: string;
  role: string;
  designation: string;
  image: string;
  category: string;
}

export interface AlumniCommittee {
  kicker: string;
  heading: string;
  /** The badge, with the number of members already filled in. */
  countLabel: string;
  members: AlumniCommitteeMember[];
  footer: { left: string; right: string };
}

export interface AlumniContent {
  pageTitle: string;
  pageSubtitle: string;
  tabs: { about: string; rules: string; managing: string; executive: string; registration: string };
  about: {
    badge: string;
    lead: string;
    quote: string;
    purpose: { title: string; body: string };
    highlights: { value: string; label: string }[];
    objectives: { kicker: string; heading: string; countLabel: string; items: string[] };
    cta: { badge: string; title: string; body: string; buttonLabel: string };
  };
  rules: {
    kicker: string;
    heading: string;
    badge: string;
    name: { kicker: string; title: string; body: string };
    office: { kicker: string; title: string; body: string };
    aims: { kicker: string; heading: string; items: string[] };
    membership: {
      kicker: string;
      heading: string;
      feeBadge: string;
      eligibility: { title: string; items: string[]; note: string };
      fees: { title: string; items: string[] };
      rights: { title: string; items: string[] };
    };
    structure: {
      kicker: string;
      heading: string;
      intro: string;
      roles: { role: string; responsibility: string; duties: string[] }[];
    };
    agm: {
      kicker: string;
      heading: string;
      highlight: string;
      body: string;
      dutiesTitle: string;
      duties: string[];
    };
    extraordinary: { kicker: string; heading: string; body: string; highlight: string; note: string };
    meetings: { kicker: string; heading: string; badge: string; powers: string[] };
    clauses: { kicker: string; title: string; paragraphs: string[]; tone: string }[];
    footer: { left: string; right: string };
  };
  managing: AlumniCommittee;
  executive: AlumniCommittee;
  registration: {
    kicker: string;
    heading: string;
    badge: string;
    sections: { personal: string; professional: string; contribution: string };
    degrees: string[];
    years: { from: number; to: number };
    interests: string[];
    submitLabel: string;
    success: { title: string; body: string; again: string };
    open: boolean;
    closedMessage: string;
  };
}

const EMPTY_COMMITTEE: AlumniCommittee = {
  kicker: "",
  heading: "",
  countLabel: "",
  members: [],
  footer: { left: "", right: "" },
};

export const DEFAULT_ALUMNI: AlumniContent = {
  pageTitle: "Alumni",
  pageSubtitle:
    "Connecting Graduates, Mentoring Future Pharmacists & Celebrating Global Achievements",
  tabs: {
    about: "About Alumni",
    rules: "Rules & Regulations",
    managing: "Managing Committee",
    executive: "Executive Committee",
    registration: "Registration",
  },
  about: {
    badge: "",
    lead: "",
    quote: "",
    purpose: { title: "", body: "" },
    highlights: [],
    objectives: { kicker: "", heading: "Objectives", countLabel: "", items: [] },
    cta: { badge: "", title: "", body: "", buttonLabel: "Register as Alumni" },
  },
  rules: {
    kicker: "",
    heading: "Rules & Regulations",
    badge: "",
    name: { kicker: "", title: "", body: "" },
    office: { kicker: "", title: "", body: "" },
    aims: { kicker: "", heading: "", items: [] },
    membership: {
      kicker: "",
      heading: "",
      feeBadge: "",
      eligibility: { title: "", items: [], note: "" },
      fees: { title: "", items: [] },
      rights: { title: "", items: [] },
    },
    structure: { kicker: "", heading: "", intro: "", roles: [] },
    agm: { kicker: "", heading: "", highlight: "", body: "", dutiesTitle: "", duties: [] },
    extraordinary: { kicker: "", heading: "", body: "", highlight: "", note: "" },
    meetings: { kicker: "", heading: "", badge: "", powers: [] },
    clauses: [],
    footer: { left: "", right: "" },
  },
  managing: EMPTY_COMMITTEE,
  executive: EMPTY_COMMITTEE,
  registration: {
    kicker: "",
    heading: "Alumni Membership Registration",
    badge: "",
    sections: { personal: "", professional: "", contribution: "" },
    degrees: [],
    years: { from: 2007, to: new Date().getFullYear() },
    interests: [],
    submitLabel: "Submit Alumni Registration",
    success: { title: "Registration Submitted!", body: "", again: "Submit Another Entry" },
    open: true,
    closedMessage: "",
  },
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is AlumniContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<AlumniContent>;
  return (
    !!c.registration?.heading &&
    Array.isArray(c.about?.objectives?.items) &&
    Array.isArray(c.managing?.members) &&
    Array.isArray(c.executive?.members)
  );
}

export function useAlumniContent(): AlumniContent {
  const [content, setContent] = useState<AlumniContent>(DEFAULT_ALUMNI);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/students/alumni"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.alumni)) setContent(body.alumni);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
