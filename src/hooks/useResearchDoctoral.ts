import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → Research - Doctoral Studies.
 *
 * The API sends the table ready to draw: each guide with their name already
 * worked out — from the staff page when they are on it — and the scholars
 * registered under them.
 */
export interface DoctoralScholar {
  id: string;
  name: string;
  registrationYear: number;
  thesisTitle: string;
}

export interface DoctoralGuide {
  id: string;
  guide: string;
  university: string;
  scholars: DoctoralScholar[];
}

export interface ResearchDoctoralContent {
  pageTitle: string;
  pageSubtitle: string;
  banner: { heading: string; subheading: string; badge: string };
  columns: {
    no: string;
    guide: string;
    university: string;
    scholar: string;
    year: string;
    thesis: string;
  };
  guideCaption: string;
  note: { text: string; tagline: string };
  guides: DoctoralGuide[];
  scholarCount: number;
}

/** What the page shipped with, and what it falls back to if the API is down. */
export const DEFAULT_DOCTORAL: ResearchDoctoralContent = {
  pageTitle: "Doctoral Studies",
  pageSubtitle: "Ph.D. Research Scholars, Approved University Guides & Advanced Doctoral Dissertations",
  banner: {
    heading: "Doctoral Studies (Ph.D. Program)",
    subheading: "C.K. Pithawalla Institute of Pharmaceutical Science & Research",
    badge: "GTU Affiliated Research Center",
  },
  columns: {
    no: "No",
    guide: "Name of Full Time Teacher with Ph.D",
    university: "Recognized as Research Guide for Ph.D in University",
    scholar: "Name of Scholar",
    year: "Year of Registration of Scholar",
    thesis: "Title of Thesis",
  },
  guideCaption: "Approved Ph.D. Guide",
  note: { text: "Ph.D. Research Center approved by Gujarat Technological University (GTU), Ahmedabad.", tagline: "CKPIPSR Doctoral Registry" },
  guides: [
    {
      id: "dhiren-shah",
      guide: "Dr. Dhiren P. Shah",
      university: "Gujarat Technological University",
      scholars: [
        { id: "dps-1", name: "Mr. Jaynish Tailor", registrationYear: 2018, thesisTitle: "Artificial Arterial Model : A Quality Tool for Evaluation of Endovascular Dosage Forms" },
        { id: "dps-2", name: "Mr. Yash Dudhwala", registrationYear: 2022, thesisTitle: "Formulation Development & Optimization of Colon Targeted Drug Delivery System for Anticancer Drug" },
        { id: "dps-3", name: "Ms. Nikita Vaghela", registrationYear: 2022, thesisTitle: "Formulation & Evaluation of Topical Drug Delivery System by DoE Approach" },
        { id: "dps-4", name: "Ms. Bhumi Bhatt", registrationYear: 2023, thesisTitle: "Formulating & Evaluation of Nano Drug Delivery for Breast Cancer Therapy" },
        { id: "dps-5", name: "Ms. Raja Manali", registrationYear: 2023, thesisTitle: "Formulation & Optimization of Oral Film of Anti-Emetic Drug" },
        { id: "dps-6", name: "Ms. Zankruti Patel", registrationYear: 2023, thesisTitle: "Development & Characterization of Brain Targeted Nano Based Formulation via Nasal Route" },
      ],
    },
    {
      id: "vinod-ramani",
      guide: "Dr. Vinod D. Ramani",
      university: "Gujarat Technological University",
      scholars: [
        { id: "vdr-1", name: "Ms. Mehta Riya Kalpesh", registrationYear: 2025, thesisTitle: "Design And Optimization of Nanoparticle-Based Site-Specific Anticancer Therapy in Non-Hodgkin Lymphoma" },
        { id: "vdr-2", name: "Ms. Nirali Sharma", registrationYear: 2025, thesisTitle: "Formulation And Optimization of Nano-Carrier for Targeted Therapy in Skin Cancer" },
        { id: "vdr-3", name: "Ms. Siddique Iram Fatema Mohammed Faruk", registrationYear: 2025, thesisTitle: "Nano-Emulsion Gel of Luliconazole and Azelaic Acid for Recalcitrant Dermatophytosis & Sebo-Inflammatory Skin" },
      ],
    },
  ],
  scholarCount: 9,
};

/** Enough of a check that a malformed response cannot empty the table. */
function isUsable(value: unknown): value is ResearchDoctoralContent {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Partial<ResearchDoctoralContent>;
  return !!d.pageTitle && !!d.columns && Array.isArray(d.guides);
}

export function useResearchDoctoral(): ResearchDoctoralContent {
  const [content, setContent] = useState<ResearchDoctoralContent>(DEFAULT_DOCTORAL);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/research/doctoral"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.doctoral)) setContent(body.doctoral);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
