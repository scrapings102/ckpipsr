import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → SSIP - About: the policy, its two committees and
 * who to contact, as the page's four tabs. Committee members arrive already
 * named — from the staff page when they are linked to it.
 */
export interface SsipCard {
  kicker: string;
  title: string;
  body: string;
  footer: string;
}

export interface SsipObjective {
  title: string;
  text: string;
  tag: string;
  /** A lucide icon name; unknown ones fall back to a light bulb. */
  icon: string;
}

export interface SsipMember {
  name: string;
  role: string;
  designation: string;
  emphasis: "chair" | "accent" | "none";
  responsibility: string;
}

export interface SsipCommittee {
  kicker: string;
  heading: string;
  countSuffix: string;
  body: string;
  members: SsipMember[];
}

export interface SsipContact {
  badge: string;
  name: string;
  designation: string;
  institution: string;
  officeNumber: string;
  mobileNo: string;
}

export interface SsipAboutContent {
  pageTitle: string;
  pageSubtitle: string;
  tabs: { about: string; core: string; scrutiny: string; contact: string };
  about: {
    kicker: string;
    /** `**bold**` is the only markup. */
    body: string;
    theme: SsipCard;
    focus: SsipCard;
    objectives: { kicker: string; heading: string; countSuffix: string; footer: string; items: SsipObjective[] };
    workflow: { kicker: string; heading: string; badge: string; steps: { title: string; text: string }[] };
  };
  core: SsipCommittee;
  scrutiny: SsipCommittee;
  contact: {
    kicker: string;
    heading: string;
    badge: string;
    body: string;
    people: SsipContact[];
    addressLabel: string;
    address: string;
  };
  note: { text: string; tagline: string };
}

/** What the page shipped with, and what it falls back to if the API is down. */
export const DEFAULT_SSIP_ABOUT: SsipAboutContent = {
  pageTitle: "Student Start-up and Innovation (SSIP)",
  pageSubtitle: "Government of Gujarat Student Start-up & Innovation Policy Nodal Centre at CKPIPSR",
  tabs: {
    about: "About SSIP",
    core: "Core Committee",
    scrutiny: "Scrutiny Committee",
    contact: "Contact Us"
  },
  about: {
    kicker: "Innovation and Pre-incubation Ecosystem Support for Students (IPIES)",
    body: "The Student Startup & Innovation Policy (SSIP) of the Government of Gujarat is a first-of-its-kind, integrated, state-wide, university-based innovation policy in the country that shall create a much-needed **Innovation and Pre-incubation Ecosystem Support for Students (IPIES)** across the state, adding to the start-up ecosystem of Gujarat. The policy aims to create a culture of innovation and a spirit of entrepreneurship that the state of Gujarat already possesses.",
    theme: {
      kicker: "Guiding Philosophy",
      title: "Our Theme",
      body: "Burgeoning start-up eco-system to uplift and support a brand academia-led innovation, pre-incubation, scale-up, and marketing.",
      footer: "Academia-Led Innovation & Pre-Incubation"
    },
    focus: {
      kicker: "Institutional Execution",
      title: "Our Focus",
      body: "Constitution of Student start-up and innovation Cell, C. K. Pithawalla Institute of Pharmaceutical Science & Research, Surat.",
      footer: "CKPIPSR Nodal Innovation Cell"
    },
    objectives: {
      kicker: "Strategic Mandates",
      heading: "Objectives",
      countSuffix: "Core Pillars of SSIP",
      footer: "Actionable SSIP Outcome",
      items: [
        {
          title: "Facilitate & Pre-Incubate",
          text: "To facilitate and pre-incubate innovative ideas, to go through a stage of proof of concept, prototype, product, testing and trial, redesign, and development of utility.",
          tag: "Proof of Concept & Prototyping",
          icon: "Lightbulb"
        },
        {
          title: "Nurture Creative Environment",
          text: "To develop an environment for creativity to flourish and an end-to-end support system in educational institutions to allow ample support to innovative ideas for better execution.",
          tag: "End-to-End Support Ecosystem",
          icon: "Compass"
        },
        {
          title: "Mind to Market Pathways",
          text: "To create pathways for the mind to market by harnessing and hand-holding projects/research/innovation/ideas of students in Gujarat.",
          tag: "Commercialization & Hand-holding",
          icon: "TrendingUp"
        },
        {
          title: "Common Showcase Platform",
          text: "To create a common platform to showcase, support, and upscale innovations for motivating stakeholders as well as for an opportunity to create value for money and value for many.",
          tag: "Upscale & Value Creation",
          icon: "Award"
        }
      ]
    },
    workflow: {
      kicker: "Student Innovation Workflow",
      heading: "From Idea to Market Hand-Holding",
      badge: "Government Sponsored Grant Aid",
      steps: [
        {
          title: "Idea Formulation",
          text: "Identification of clinical & pharma unmet needs"
        },
        {
          title: "PoC & Prototype",
          text: "Laboratory testing, formulation trials & validation"
        },
        {
          title: "IPR & Patenting",
          text: "Prior art search, provisional filing & guidance"
        },
        {
          title: "Start-up & Market",
          text: "Company incorporation, scaling & commercialization"
        }
      ]
    }
  },
  core: {
    kicker: "Institutional Governance",
    heading: "SSIP Core Committee",
    countSuffix: "Executive Members",
    body: "The SSIP Core Committee guides the policy execution, monitors pre-incubation activities, reviews student innovation milestones, and allocates resources to student startups at CKPIPSR.",
    members: [
      {
        role: "Chairperson",
        designation: "Principal",
        emphasis: "chair",
        responsibility: "-",
        name: "Dr. Dhiren P. Shah"
      },
      {
        role: "Co-Ordinator",
        designation: "Assoc. Professor",
        emphasis: "accent",
        responsibility: "-",
        name: "Dr. Vinod D. Ramani"
      },
      {
        role: "Member",
        designation: "Assoc. Professor",
        emphasis: "none",
        responsibility: "-",
        name: "Dr. Bhumika C. Desai"
      },
      {
        role: "Member",
        designation: "Assis. Professor",
        emphasis: "none",
        responsibility: "-",
        name: "Mr. Dipayan Tarafder"
      },
      {
        role: "Member",
        designation: "Assis. Professor",
        emphasis: "none",
        responsibility: "-",
        name: "Mr. Yahya Moolla"
      }
    ]
  },
  scrutiny: {
    kicker: "Technical & Financial Evaluation",
    heading: "SSIP Scrutiny Committee",
    countSuffix: "Committee Members",
    body: "The Scrutiny Committee assesses all student project applications for Proof of Concept (PoC) grants, prototype fabrication funds, and patent filing subsidies according to Gujarat SSIP government norms.",
    members: [
      {
        role: "Chairperson",
        designation: "Educational Institutions Head",
        emphasis: "chair",
        responsibility: "-",
        name: "Dr. Dhiren P. Shah"
      },
      {
        role: "Member",
        designation: "Industry Expert (Industrialist/ innovator/ Investor)",
        emphasis: "none",
        responsibility: "-",
        name: "Mr. Kamlesh Zota"
      },
      {
        role: "Member",
        designation: "Industry Expert/ Alumni (having own Startup/Patent/ Innovation/ Industry)",
        emphasis: "none",
        responsibility: "-",
        name: "Mr. Haresh H. Korat"
      },
      {
        role: "Member",
        designation: "Finance Expert (CA/CS)",
        emphasis: "none",
        responsibility: "-",
        name: "Mr. Kamal Chapaneria"
      },
      {
        role: "Member",
        designation: "Academic Expert-1-Invited",
        emphasis: "none",
        responsibility: "-",
        name: "Dr. Vineet C. Jain"
      },
      {
        role: "Member",
        designation: "Academic Expert-2-Invited",
        emphasis: "none",
        responsibility: "-",
        name: "Dr. Hitesh Dalvadi"
      },
      {
        role: "Member",
        designation: "Technical Expert/ IPR Expert",
        emphasis: "none",
        responsibility: "-",
        name: "Dr. Anish Gandhi"
      },
      {
        role: "Member",
        designation: "IPR Expert",
        emphasis: "none",
        responsibility: "-",
        name: "Mr. Tejas Patel"
      },
      {
        role: "Member",
        designation: "Startup ecosystem expert",
        emphasis: "none",
        responsibility: "-",
        name: "Mr. Kalp Bhatt"
      },
      {
        role: "Member Secretory",
        designation: "Institutions SSIP Coordinator",
        emphasis: "accent",
        responsibility: "-",
        name: "Dr. Vinodkumar D. Ramani"
      }
    ]
  },
  contact: {
    kicker: "Direct Communication",
    heading: "SSIP Cell Contact Persons",
    badge: "Official SSIP Helpdesk",
    body: "For student startup mentorship, proof-of-concept grant queries, IPR assistance, and innovation cell coordination, please contact the designated institute officials below.",
    people: [
      {
        badge: "Institutional Head",
        name: "DR. DHIREN P. SHAH",
        designation: "Principal & Professor",
        institution: "C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat",
        officeNumber: "63550 65636",
        mobileNo: "9427474602"
      },
      {
        badge: "SSIP Coordinator",
        name: "DR. VINODKUMAR D. RAMANI",
        designation: "Associate Professor",
        institution: "C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat",
        officeNumber: "63550 65636",
        mobileNo: "9913792913"
      }
    ],
    addressLabel: "Campus Location:",
    address: "C. K. Pithawalla Institute of Pharmaceutical Science & Research, Near Malvan Mandir, Surat-Dumas Road, Surat - 395007, Gujarat."
  },
  note: {
    text: "Supported by Education Department, Government of Gujarat under Student Start-up and Innovation Policy.",
    tagline: "CKPIPSR SSIP Nodal Centre"
  }
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is SsipAboutContent {
  if (typeof value !== "object" || value === null) return false;
  const s = value as Partial<SsipAboutContent>;
  return (
    !!s.pageTitle &&
    !!s.tabs &&
    Array.isArray(s.about?.objectives?.items) &&
    Array.isArray(s.core?.members) &&
    Array.isArray(s.scrutiny?.members) &&
    Array.isArray(s.contact?.people)
  );
}

export function useSsipAbout(): SsipAboutContent {
  const [content, setContent] = useState<SsipAboutContent>(DEFAULT_SSIP_ABOUT);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/research/ssip-about"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.ssip)) setContent(body.ssip);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
