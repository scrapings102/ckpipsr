import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Accreditation & Ranking → About IQAC.
 *
 * The cell's own page. Nothing the page can count is stored: the badge over
 * the objectives, the one over the functions and the numbering down both lists
 * arrive worked out, so a badge cannot promise eight and show seven.
 *
 * The copy below is the page as it shipped, so a dead API leaves it reading
 * exactly as it always did.
 */
export interface IqacFact {
  label: string;
  value: string;
}

export interface IqacObjective {
  title: string;
  description: string;
  /** "01", "02" … counted down the list. */
  number: string;
}

export interface IqacFunction {
  title: string;
  description: string;
  /** Names a lucide icon the page knows how to draw. */
  icon: string;
  number: string;
}

export interface IqacBannerCard {
  title: string;
  description: string;
  icon: string;
  tone: "emerald" | "amber";
}

export interface IqacAboutContent {
  pageTitle: string;
  pageSubtitle: string;
  overview: {
    badge: string;
    heading: string;
    body: string;
    facts: IqacFact[];
    photo: { src: string; alt: string; badge: string; caption: string };
  };
  vision: { badge: string; heading: string; quote: string };
  objectives: {
    kicker: string;
    heading: string;
    /** Arrives with the number already in it. */
    countLabel: string;
    showcase: {
      src: string;
      alt: string;
      badge: string;
      title: string;
      body: string;
      footnote: string;
    };
    footnote: string;
    items: IqacObjective[];
  };
  functions: {
    kicker: string;
    heading: string;
    countLabel: string;
    footnote: string;
    items: IqacFunction[];
  };
  banner: { badge: string; heading: string; body: string; cards: IqacBannerCard[] };
  objectiveCount: number;
  functionCount: number;
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_IQAC_ABOUT: IqacAboutContent = {
  "pageTitle": "About IQAC",
  "pageSubtitle": "Internal Quality Assurance Cell — Ensuring Continuous Academic & Institutional Excellence",
  "overview": {
    "badge": "NAAC Quality Sustenance Measure",
    "heading": "Internal Quality Assurance Cell (IQAC)",
    "body": "As proposed by National Assessment and Accreditation Council (NAAC), C.K.Pithawalla Institute of Pharmaceutical Science and Research established Internal Quality Assurance Cell (IQAC) as a quality sustenance measure.",
    "facts": [
      {
        "label": "Established As",
        "value": "Quality Measure"
      },
      {
        "label": "Guidelines",
        "value": "NAAC Standards"
      },
      {
        "label": "Reporting",
        "value": "Annual AQAR"
      }
    ],
    "photo": {
      "src": "/images/hero/college_campus.jpg",
      "alt": "CKPIPSR Campus IQAC Quality Standards",
      "badge": "CKPIPSR Surat Campus",
      "caption": "Committed to academic rigor, outcome-based education, and continual quality enhancement."
    }
  },
  "vision": {
    "badge": "Visionary Statement",
    "heading": "IQAC – Vision",
    "quote": "\"To promote quality culture as the prime concern through institutionalizing and internalizing all the quality-enhancing and sustaining initiatives taken with internal and external support.\""
  },
  "objectives": {
    "kicker": "Institutional Goals",
    "heading": "Objectives",
    "countLabel": "8 Core Objectives",
    "showcase": {
      "src": "/images/hero/students_learning.jpg",
      "alt": "Students Learning and Quality Education at CKPIPSR",
      "badge": "Learner-Centric Quality",
      "title": "Excellence in Pharmaceutical Pedagogy",
      "body": "IQAC systematically integrates modern pedagogical tools, objective outcome-based assessments, and infrastructure adequacy across pharmacy programmes.",
      "footnote": "Periodic Reviews & Continuous Improvement"
    },
    "footnote": "Quality Sustenance Benchmark",
    "items": [
      {
        "title": "Catalytic Action Plans",
        "description": "To develop a mechanism to promote conscious, consistent and catalytic action plans to improve the academic and administrative performance of the institution.",
        "number": "01"
      },
      {
        "title": "Quality Enhancement & Best Practices",
        "description": "To promote institutional quality enhancement and sustenance through the internalization of quality culture and institutionalization of the best practices.",
        "number": "02"
      },
      {
        "title": "Progressive Operations",
        "description": "Ensuring timely, efficient and progressive performance of academic, administrative and financial units;",
        "number": "03"
      },
      {
        "title": "Relevant Academic Programmes",
        "description": "Adoption of relevant and quality academic and research programmes;",
        "number": "04"
      },
      {
        "title": "Equitable Access & Affordability",
        "description": "Ensuring equitable access to and affordability of academic programmes for various sections of the society;",
        "number": "05"
      },
      {
        "title": "Modern Teaching & Learning",
        "description": "Optimization and integration of modern methods of teaching and learning;",
        "number": "06"
      },
      {
        "title": "Credible Evaluation Systems",
        "description": "Ensuring credible assessment and evaluation processes;",
        "number": "07"
      },
      {
        "title": "Support Structure & Services",
        "description": "Ensuring the proper allocation, adequacy and maintenance of support structure and services.",
        "number": "08"
      }
    ]
  },
  "functions": {
    "kicker": "Operational Responsibilities",
    "heading": "Functions",
    "countLabel": "11 Key Functions",
    "footnote": "Continuous Quality Assurance",
    "items": [
      {
        "title": "Quality Benchmarks",
        "description": "Development and application of quality benchmarks;",
        "icon": "Award",
        "number": "01"
      },
      {
        "title": "Institutional Parameters",
        "description": "Setting parameters for various academic and administrative activities of the institution;",
        "icon": "Layers",
        "number": "02"
      },
      {
        "title": "Learner-Centric Environment",
        "description": "Facilitating the creation of a learner-centric environment conducive to quality education and faculty development to adopt the required knowledge and technology for participatory teaching and learning process;",
        "icon": "GraduationCap",
        "number": "03"
      },
      {
        "title": "Stakeholder Feedback",
        "description": "Collection and analysis of feedback from all the stakeholders on quality-related institutional processes;",
        "icon": "Users",
        "number": "04"
      },
      {
        "title": "Information Dissemination",
        "description": "Dissemination of information on various quality parameters to all the stakeholders;",
        "icon": "Share2",
        "number": "05"
      },
      {
        "title": "Workshops & Seminars",
        "description": "Organization of intra- and inter-institutional workshops and seminars on quality-related themes and promotion of quality circles;",
        "icon": "BookOpen",
        "number": "06"
      },
      {
        "title": "Activity Documentation",
        "description": "Documentation of various programmes/activities leading to quality improvement;",
        "icon": "FileText",
        "number": "07"
      },
      {
        "title": "Nodal Coordination Agency",
        "description": "Acting as a nodal agency of the institution for coordinating quality-related activities, including adoption and dissemination of the best practices;",
        "icon": "ShieldCheck",
        "number": "08"
      },
      {
        "title": "MIS & Institutional Database",
        "description": "Development and maintenance of institutional database through MIS for the purpose of maintaining and enhancing institutional quality;",
        "icon": "Database",
        "number": "09"
      },
      {
        "title": "Academic & Administrative Audits (AAA)",
        "description": "Periodical conduct of Academic and Administrative Audits along with their follow-up activities;",
        "icon": "Search",
        "number": "10"
      },
      {
        "title": "AQAR Submission (NAAC)",
        "description": "Preparation and submission of the Annual Quality Assurance Report (AQAR) as per the guidelines and parameters of NAAC.",
        "icon": "FileCheck2",
        "number": "11"
      }
    ]
  },
  "banner": {
    "badge": "State-of-the-Art Research Ecosystem",
    "heading": "Quality Sustenance through Advanced Infrastructure",
    "body": "CKPIPSR maintains high standards in teaching laboratories, medicinal chemistry discovery facilities, animal research wings, and automated MIS databases to sustain NAAC quality parameters.",
    "cards": [
      {
        "icon": "BarChart3",
        "tone": "emerald",
        "title": "Academic Audits",
        "description": "Periodic AAA reviews & action plans"
      },
      {
        "icon": "FileCheck2",
        "tone": "amber",
        "title": "NAAC AQAR Reports",
        "description": "Timely institutional compliance"
      }
    ]
  },
  "objectiveCount": 8,
  "functionCount": 11
};

function isUsable(value: unknown): value is IqacAboutContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<IqacAboutContent>;
  return (
    Array.isArray(c.objectives?.items) &&
    c.objectives.items.length > 0 &&
    Array.isArray(c.functions?.items) &&
    c.functions.items.length > 0 &&
    typeof c.overview?.heading === "string"
  );
}

export function useIqacAboutContent(): IqacAboutContent {
  const [content, setContent] = useState<IqacAboutContent>(DEFAULT_IQAC_ABOUT);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/iqac/about"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.iqacAbout)) setContent(body.iqacAbout);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
