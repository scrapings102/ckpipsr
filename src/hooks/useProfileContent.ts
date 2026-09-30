import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * About Us → Who We Are → Profile.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down. The hook returns them immediately and swaps in the
 * fetched content when it arrives.
 */
export interface ProfileSlide {
  url: string;
  title: string;
  subtitle: string;
}

export interface ProfileHighlight {
  icon: string;
  tone: string;
  title: string;
  description: string;
}

export interface ProfileMilestone {
  year: string;
  title: string;
  description: string;
}

export interface ProfileContent {
  pageTitle: string;
  pageSubtitle: string;
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  body: string[];
  showcase: {
    rotationMs: number;
    captionLeft: string;
    captionRight: string;
    slides: ProfileSlide[];
  };
  highlights: ProfileHighlight[];
  milestonesHeading: { title: string; subtitle: string; watermark: string };
  milestones: ProfileMilestone[];
}

export const DEFAULT_PROFILE: ProfileContent = {
  pageTitle: "Profile",
  pageSubtitle:
    "Overview and profile of C. K. Pithawalla Institute of Pharmaceutical Science & Research.",
  eyebrow: "Institutional Overview",
  headingLead: "Excellence in",
  headingAccent: "Pharmaceutical Education",
  body: [
    "C. K. Pithawalla Institute of Pharmaceutical Science & Research (CKPIPSR) was established in 2005 and is being managed by the Navyug Vidyabhavan Trust, which was founded in February 1965.",
    "Within a short span of its operation, the college has provided all the necessary state-of-the-art facilities to empower students, including a well-established central library containing thousands of books, reference works, and technical journals.",
    "Honorable Late Shri C. K. Pithawalla has been the driving force for setting up this college named after him and continues to inspire generations of pharmacy students.",
  ],
  showcase: {
    rotationMs: 2500,
    captionLeft: "CKPIPSR Main Entrance",
    captionRight: "Surat, Gujarat",
    slides: [
      { url: "/images/hero/66e151f0d6a90.webp", title: "CKPIPSR Main Campus", subtitle: "C. K. Pithawalla Educational Complex, Surat" },
      { url: "/images/hero/66e153e687221.webp", title: "Advanced Pharmaceutical Labs", subtitle: "State-of-the-art Research & Practical Facilities" },
      { url: "https://ckpipsr.ac.in/images/about/founder.jpg", title: "Visionary Legacy", subtitle: "Honoring Late Shri Chhotubhai Pithawalla" },
      { url: "/images/hero/65efeaeece007.webp", title: "Academic Excellence", subtitle: "Nurturing Future Pharmacy Professionals" },
      { url: "/images/hero/66e15283951b9.webp", title: "Modern Infrastructure", subtitle: "Equipped with latest educational technology" },
      { url: "/images/hero/66e1522d09fc0.webp", title: "Campus Environment", subtitle: "Lush green surroundings for holistic development" },
    ],
  },
  highlights: [
    {
      icon: "GraduationCap", tone: "dark", title: "GTU Affiliated & PCI Approved",
      description: "Complete adherence to Pharmacy Council of India guidelines, GTU academic curriculum, Outcome-Based Education (OBE), and continuous assessment.",
    },
    {
      icon: "Building", tone: "gold", title: "Modern Research Ecosystem",
      description: "Well-equipped pharmaceutics and analysis labs, high-performance instruments, medicinal plant garden, smart classrooms, and digitized library.",
    },
  ],
  milestonesHeading: {
    title: "Institutional Milestones",
    subtitle: "A journey of dedication and academic excellence.",
    watermark: "History",
  },
  milestones: [
    { year: "1965", title: "Trust Foundation", description: "Navyug Vidyabhavan Trust was founded in February 1965 to democratize higher education in South Gujarat." },
    { year: "2005", title: "CKPIPSR Establishment", description: "C.K. Pithawalla Institute of Pharmaceutical Science & Research was founded to meet the growing need for pharmaceutical experts." },
    { year: "Today", title: "Leading Pharmacy Institute", description: "A premier educational center in Gujarat, producing skilled pharmacy professionals for the global healthcare industry." },
  ],
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ProfileContent {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Partial<ProfileContent>;
  return (
    typeof p.headingLead === "string" &&
    Array.isArray(p.body) &&
    p.body.length > 0 &&
    Array.isArray(p.milestones) &&
    Array.isArray(p.showcase?.slides) &&
    p.showcase.slides.length > 0
  );
}

export function useProfileContent(): ProfileContent {
  const [content, setContent] = useState<ProfileContent>(DEFAULT_PROFILE);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/profile"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.profile)) setContent(body.profile);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
