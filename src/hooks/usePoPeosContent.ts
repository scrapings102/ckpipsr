import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * About Us → Who We Are → PO and PEOs.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down.
 */
export interface ProgramObjective {
  title: string;
  description: string;
}

export interface ProgramOutcome {
  num: string;
  title: string;
  description: string;
}

export interface PoPeosContent {
  pageTitle: string;
  pageSubtitle: string;
  peos: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    intro: string;
    footnote: string;
    items: ProgramObjective[];
  };
  pos: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    note: string;
    watermark: string;
    items: ProgramOutcome[];
  };
  cta: { headingLead: string; headingAccent: string; body: string };
}

const OUTCOMES: [string, string][] = [
  ["Pharmacy Knowledge", "Possess knowledge and comprehension of the core and basic knowledge associated with the profession of pharmacy, including biomedical sciences; pharmaceutical sciences; behavioral, social, and administrative pharmacy sciences; and manufacturing practices."],
  ["Planning Abilities", "Demonstrate effective planning abilities including time management, resource management, delegation skills and organizational skills. Develop and implement plans and organize work to meet deadlines."],
  ["Problem Analysis", "Utilize the principles of scientific enquiry, thinking analytically, clearly and critically, while solving problems and making decisions during daily practice."],
  ["Modern Tool Usage", "Learn, select, and apply appropriate methods and procedures, resources, and modern pharmacy-related computing tools with an understanding of the limitations."],
  ["Leadership Skills", "Understand and consider the human reaction to change, motivation issues, leadership and team building when planning changes required for fulfillment of core, professional and societal responsibilities."],
  ["Professional Identity", "Understand, analyze and communicate the value of their professional roles (e.g. educators, health promoters, clinicians, employers, employees)."],
  ["Pharmaceutical Ethics", "Honor personal values and apply ethical principles in decision making, enable professional and personal development, and respect cultural and personal diversity."],
  ["Communication", "Communicate effectively with the pharmacy community and with society at large, such as being able to comprehend and write effective reports, design documentation, make effective presentations and give and receive clear instructions."],
  ["The Pharmacist and Society", "Apply reasoning informed by contextual knowledge to assess societal, health, safety and legal issues and the consequent responsibilities relevant to the professional pharmacy practice."],
  ["Environment and Sustainability", "Understand the impact of professional pharmacy solutions in societal and environmental contexts and demonstrate knowledge of and need for sustainable development."],
  ["Life-long Learning", "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change."],
];

export const DEFAULT_PO_PEOS: PoPeosContent = {
  pageTitle: "Program Educational Objectives & Outcomes (PO & PEOs)",
  pageSubtitle:
    "Defining the core Program Educational Objectives (PEOs) and Program Outcomes (POs) under our Outcome-Based Education (OBE) framework.",
  peos: {
    eyebrow: "Strategic Goals",
    headingLead: "Program Educational",
    headingAccent: "Objectives (PEOs)",
    intro:
      "Core objectives describing the professional accomplishments graduates are expected to attain within 3 to 5 years after graduation.",
    footnote: "Institutional Mandate",
    items: [
      { title: "Knowledge", description: "To produce pharmacists with strong basics and high technical knowledge of pharmacy to cater the various areas of the pharmaceutical industry and healthcare profession." },
      { title: "Core Competency", description: "To provide the required training in all aspects to the graduates to work as health care professionals in community and hospital pharmacies." },
      { title: "Professionalism", description: "To provide professional and dedicated pharmacists to the society with skill and will to formulate and serve quality medicine in line with counseling." },
    ],
  },
  pos: {
    eyebrow: "Graduate Attributes",
    headingLead: "Program Outcomes",
    headingAccent: "(POs)",
    note: '"Defining the core competencies and skills of our pharmacy graduates."',
    watermark: "PO Matrix",
    items: OUTCOMES.map(([title, description], i) => ({ num: `PO${i + 1}`, title, description })),
  },
  cta: {
    headingLead: "Commitment to Excellence in",
    headingAccent: "Outcome-Based Education",
    body: "We continuously measure and refine our academic processes to ensure every student reaches their full potential as a pharmaceutical professional.",
  },
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is PoPeosContent {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Partial<PoPeosContent>;
  return (
    Array.isArray(p.peos?.items) &&
    p.peos.items.length > 0 &&
    Array.isArray(p.pos?.items) &&
    p.pos.items.length > 0
  );
}

export function usePoPeosContent(): PoPeosContent {
  const [content, setContent] = useState<PoPeosContent>(DEFAULT_PO_PEOS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/po-peos"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.poPeos)) {
          const data = { ...body.poPeos };
          if (!data.pageTitle || data.pageTitle === "PO And PEO's" || data.pageTitle === "PO and PEOs") {
            data.pageTitle = "Program Educational Objectives & Outcomes (PO & PEOs)";
          }
          if (!data.peos?.headingLead || data.peos.headingLead === "PO And PEO's") {
            data.peos = {
              ...data.peos,
              headingLead: "Program Educational",
              headingAccent: "Objectives (PEOs)",
            };
          }
          if (!data.pos?.headingLead || data.pos.headingLead === "PO And PEO's") {
            data.pos = {
              ...data.pos,
              headingLead: "Program Outcomes",
              headingAccent: "(POs)",
            };
          }
          setContent(data);
        }
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
