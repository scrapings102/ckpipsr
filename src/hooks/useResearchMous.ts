import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → Research - MOUs.
 *
 * The Sector buttons are content, not a fixed list in this file: the API sends
 * them in order with the number of cards behind each, every MOU says which
 * sector it is filed under, and the figures arrive with their counts filled in.
 */
export type MouTone = "emerald" | "rose" | "blue" | "amber" | "teal" | "purple" | "slate";

export interface MouSector {
  id: string;
  label: string;
  /** A lucide icon name; unknown ones fall back to a handshake. */
  icon: string;
  tone: MouTone;
  count: number;
}

export interface MouItem {
  id: string;
  sectorId: string;
  organization: string;
  location: string;
  purpose: string;
  effectiveFrom: string;
  highlights: string[];
  status: string;
}

export interface MouStat {
  label: string;
  value: string;
  caption: string;
}

export interface ResearchMousContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    badgeSuffix: string;
    searchPlaceholder: string;
    filterLabel: string;
    allLabel: string;
  };
  stats: MouStat[];
  sectors: MouSector[];
  mous: MouItem[];
  note: { text: string; tagline: string };
  total: number;
}

/** What the page shipped with, and what it falls back to if the API is down. */
export const DEFAULT_MOUS: ResearchMousContent = {
  pageTitle: "Memorandums of Understanding (MOUs)",
  pageSubtitle: "Strategic Partnerships with Leading Pharmaceutical Industries, Healthcare Institutions & Academic Centers",
  intro: {
    kicker: "Industry-Academia Linkages & Collaborations",
    heading: "Institutional MOUs & Alliances",
    badgeSuffix: "Active MOUs",
    searchPlaceholder: "Search organization, purpose, location...",
    filterLabel: "Sector:",
    allLabel: "All Sectors"
  },
  stats: [
    {
      label: "Pharma Industries",
      value: "06",
      caption: "R&D & Training Partners"
    },
    {
      label: "Hospitals & Medical",
      value: "03",
      caption: "Clinical & Health Services"
    },
    {
      label: "Academic Colleges",
      value: "02",
      caption: "Interdisciplinary Collabs"
    },
    {
      label: "Innovation & Campus",
      value: "02",
      caption: "SSIP & Green Tech EV"
    }
  ],
  sectors: [
    {
      id: "pharma-industry",
      label: "Pharma Industry",
      icon: "Building2",
      tone: "emerald",
      count: 6
    },
    {
      id: "hospital-healthcare",
      label: "Hospital & Healthcare",
      icon: "Hospital",
      tone: "rose",
      count: 3
    },
    {
      id: "academic",
      label: "Academic",
      icon: "GraduationCap",
      tone: "blue",
      count: 2
    },
    {
      id: "skill-innovation",
      label: "Skill & Innovation",
      icon: "Sparkles",
      tone: "amber",
      count: 1
    },
    {
      id: "campus-sustainability",
      label: "Campus Sustainability",
      icon: "Zap",
      tone: "teal",
      count: 1
    }
  ],
  mous: [
    {
      id: "cd-pachchigar-homoeopathic",
      sectorId: "academic",
      organization: "C. D. Pachchigar College of Homoeopathic Medicine and Hospital, Surat",
      location: "Surat, Gujarat",
      purpose: "Interdisciplinary academic collaboration and Research",
      effectiveFrom: "06.01.2026",
      highlights: [
        "Interdisciplinary Research",
        "Academic Exchange",
        "Healthcare Synergy"
      ],
      status: "Active Partner"
    },
    {
      id: "snlp-college-umrakh",
      sectorId: "academic",
      organization: "Shree Naranjibhai Lalbhai Patel College of Pharmacy, Umrakh",
      location: "Umrakh, Gujarat",
      purpose: "Research Consultancy and Training",
      effectiveFrom: "18.12.2024",
      highlights: [
        "Faculty & Student Training",
        "Joint Research",
        "Consultancy"
      ],
      status: "Active Partner"
    },
    {
      id: "asg-hospital-jodhpur",
      sectorId: "hospital-healthcare",
      organization: "ASG HOSPITAL PVT. LTD., JODHPUR, RAJASTHAN",
      location: "Jodhpur, Rajasthan",
      purpose: "For Rendering Medical Facilities For Ophthalmology",
      effectiveFrom: "29.07.2023",
      highlights: [
        "Ophthalmology Facilities",
        "Clinical Services",
        "Medical Support"
      ],
      status: "Active Partner"
    },
    {
      id: "elektropod-bangalore",
      sectorId: "campus-sustainability",
      organization: "ELEKTROPOD TECHNOLOGIES, BANGALORE",
      location: "Bangalore, Karnataka",
      purpose: "Providing Electric vehicle Recharge facility",
      effectiveFrom: "10.04.2023",
      highlights: [
        "EV Green Infrastructure",
        "Campus Sustainability",
        "Clean Energy"
      ],
      status: "Active Partner"
    },
    {
      id: "mvue-hospital-vesu",
      sectorId: "hospital-healthcare",
      organization: "MVUE HOSPITAL, VESU, SURAT",
      location: "Vesu, Surat, Gujarat",
      purpose: "Scientific Exchange, Hospital Services, Training and Collaborative Research Projects.",
      effectiveFrom: "20.03.2023",
      highlights: [
        "Scientific Exchange",
        "Hospital Services",
        "Collaborative Projects"
      ],
      status: "Active Partner"
    },
    {
      id: "ydpa-ahmedabad",
      sectorId: "skill-innovation",
      organization: "YOUTH DEVELOPMENT PHARMACEUTICAL ASSOCIATION (YDPA), AHMEDABAD",
      location: "Ahmedabad, Gujarat",
      purpose: "Promotion of Entrepreneurship activities among students",
      effectiveFrom: "30.09.2022",
      highlights: [
        "Student Entrepreneurship",
        "SSIP Incubation",
        "Leadership Bootcamps"
      ],
      status: "Active Partner"
    },
    {
      id: "pure-chem-ankleshwar",
      sectorId: "pharma-industry",
      organization: "PURE CHEM PRIVATE LIMITED, ANKLESHWAR",
      location: "Ankleshwar, Gujarat",
      purpose: "Research, Consultancy and Training.",
      effectiveFrom: "18.02.2022",
      highlights: [
        "Chemical Synthesis",
        "Industrial Training",
        "R&D Consultancy"
      ],
      status: "Active Partner"
    },
    {
      id: "ojas-charitable-trust",
      sectorId: "hospital-healthcare",
      organization: "OJAS CHARITABLE TRUST, SURAT",
      location: "Surat, Gujarat",
      purpose: "Providing medical facility to students",
      effectiveFrom: "15.09.2020",
      highlights: [
        "Student Healthcare",
        "Medical Checkups",
        "Community Welfare"
      ],
      status: "Active Partner"
    },
    {
      id: "concept-medica-surat",
      sectorId: "pharma-industry",
      organization: "CONCEPT MEDICA INC., SURAT",
      location: "Surat, Gujarat",
      purpose: "Promotion of advance skill based training, internship, research and development, placement, industry expert sessions",
      effectiveFrom: "22.07.2019",
      highlights: [
        "Skill Training",
        "Internships",
        "Placements & Expert Sessions"
      ],
      status: "Active Partner"
    },
    {
      id: "fides-biocare-kamrej",
      sectorId: "pharma-industry",
      organization: "FIDES BIOCARE AD UNITED FIDES PHARMACEUTICAL PVT. LTD, KAMREJ, SURAT",
      location: "Kamrej, Surat, Gujarat",
      purpose: "Training and Consultancy Projects",
      effectiveFrom: "18.02.2019",
      highlights: [
        "Formulation Consultancy",
        "Industrial Exposure",
        "Hands-on Training"
      ],
      status: "Active Partner"
    },
    {
      id: "globela-pharma-surat",
      sectorId: "pharma-industry",
      organization: "GLOBELA PHARMA PVT. LTD, SURAT",
      location: "Surat, Gujarat",
      purpose: "Research, Consultancy and Training",
      effectiveFrom: "18.02.2018",
      highlights: [
        "Pharma Manufacturing",
        "Quality Assurance",
        "R&D Projects"
      ],
      status: "Active Partner"
    },
    {
      id: "cubic-analytical-ankleshwar",
      sectorId: "pharma-industry",
      organization: "CUBIC ANALYTICAL SOLUTION, ANKLESHWAR",
      location: "Ankleshwar, Gujarat",
      purpose: "Research, Consultancy and Training",
      effectiveFrom: "18.02.2018",
      highlights: [
        "Analytical Testing",
        "Instrumentation",
        "Method Validation"
      ],
      status: "Active Partner"
    },
    {
      id: "biogen-pharmaceutical-surat",
      sectorId: "pharma-industry",
      organization: "BIOGEN PHARMACEUTICAL CO., SURAT",
      location: "Surat, Gujarat",
      purpose: "Training and Consultancy Projects",
      effectiveFrom: "18.02.2018",
      highlights: [
        "Pharmaceutical Production",
        "Industrial Internships",
        "Consultancy"
      ],
      status: "Active Partner"
    }
  ],
  note: {
    text: "All Memorandums of Understanding are executed with legal endorsement and managed under the Industry-Institute Interaction (III) Cell.",
    tagline: "CKPIPSR R&D Cell"
  },
  total: 13
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ResearchMousContent {
  if (typeof value !== "object" || value === null) return false;
  const m = value as Partial<ResearchMousContent>;
  return !!m.pageTitle && Array.isArray(m.sectors) && Array.isArray(m.mous) && Array.isArray(m.stats);
}

export function useResearchMous(): ResearchMousContent {
  const [content, setContent] = useState<ResearchMousContent>(DEFAULT_MOUS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/research/mous"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.mous)) setContent(body.mous);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
