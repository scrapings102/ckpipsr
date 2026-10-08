import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";
import { STAFF_MEMBERS } from "../data/scrapedData";
import { getFacultyDetails, type ResearchLinks } from "../data/facultyDetails";

/**
 * Academics → Faculties.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down. They are built from the scraped staff list rather than
 * copied, so the two cannot drift apart.
 */
export interface FacultyMember {
  name: string;
  designation: string;
  qualification: string;
  /** Blank hides the gold badge. */
  experience: string;
  areaOfInterest: string;
  /** Blank hides the contact button. */
  email: string;
  /** Blank means the site draws initials instead. */
  image: string;
  /** The profile window the card opens. */
  details: FacultyProfileDetails;
}

/**
 * Blank fields fall back to the card's own; a blank profile or no
 * achievements hides that box.
 */
export interface FacultyProfileDetails {
  department: string;
  designation: string;
  qualification: string;
  experience: string;
  /** A link (https://…) or a short bio. */
  profile: string;
  achievements: string[];
  email: string;
  contactNumber: string;
  joiningDate?: string;
  researchLinks?: ResearchLinks;
}

export interface FacultiesContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: { badge: string; heading: string; body: string };
  members: FacultyMember[];
  research: { title: string; body: string; stats: { value: string; label: string }[] };
}

export const DEFAULT_FACULTIES: FacultiesContent = {
  pageTitle: "Our Faculties",
  pageSubtitle: "Meet the distinguished academic guides and researchers at CKPIPSR.",
  intro: {
    badge: "Expert Mentorship",
    heading: "Our Academic Leaders",
    body: "Our faculty members are chosen for their expertise, dedication, and research orientation. They bring a wealth of knowledge and experience from both industry and academia to provide a holistic learning experience.",
  },
  members: STAFF_MEMBERS.filter((member) => member.isTeaching).map((member) => {
    const d = getFacultyDetails(member);
    return {
      name: member.name,
      designation: member.designation,
      qualification: member.qualification || d.qualification,
      experience: member.experience || d.experience || "5+ Years Experience",
      areaOfInterest: member.area_of_interest,
      email: member.email,
      image: member.image_url,
      details: {
        department: d.department,
        designation: d.designation,
        qualification: d.qualification,
        experience: d.experience,
        profile: d.profile,
        achievements: d.achievements,
        email: d.email,
        contactNumber: d.contactNumber,
        joiningDate: d.joiningDate,
        researchLinks: d.researchLinks,
      },
    };
  }),
  research: {
    title: "Academic Integrity & Research",
    body: "Our faculty members are active researchers contributing to the global pharmaceutical knowledge base through publications and innovative patents.",
    stats: [
      { value: "50+", label: "Scientific Publications" },
      { value: "10+", label: "Industrial Patents" },
      { value: "15+", label: "Academic Books" },
    ],
  },
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is FacultiesContent {
  if (typeof value !== "object" || value === null) return false;
  const f = value as Partial<FacultiesContent>;
  return (
    Array.isArray(f.members) &&
    f.members.length > 0 &&
    Array.isArray(f.research?.stats) &&
    !!f.intro?.heading
  );
}

export function useFacultiesContent(): FacultiesContent {
  const [content, setContent] = useState<FacultiesContent>(DEFAULT_FACULTIES);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/academics/faculties"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.faculties)) setContent(body.faculties);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
