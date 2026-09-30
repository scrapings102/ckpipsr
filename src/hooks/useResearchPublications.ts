import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → Research - Publications.
 *
 * The API sends only the reports the page should draw, already in order —
 * which ones that is, the newest few or a chosen few, is settled in the admin
 * panel — so this page just draws what it is given.
 */
export interface ResearchPublication {
  id: string;
  title: string;
  academicYear: string;
  year: number;
  description: string;
  pdfUrl: string;
  tag: string;
  colorTheme: "emerald" | "blue";
}

export interface ResearchPublicationsContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: { kicker: string; heading: string; badge: string; body: string };
  note: { text: string; tagline: string };
  publications: ResearchPublication[];
}

/** What the page shipped with, and what it falls back to if the API is down. */
export const DEFAULT_PUBLICATIONS: ResearchPublicationsContent = {
  pageTitle: "Research Publications",
  pageSubtitle:
    "Comprehensive Reports of Peer-Reviewed Scientific Journals, Research Papers & Academic Publications",
  intro: {
    kicker: "Official Document Repository",
    heading: "Annual Research Publications",
    badge: "Official PDF Records",
    body: "Access and download the official academic year reports documenting research papers, review articles, and scientific manuscripts authored by faculty members and research scholars at C.K. Pithawalla Institute of Pharmaceutical Science & Research.",
  },
  note: {
    text: "Documents are stored in PDF format for direct viewing, printing, and reference.",
    tagline: "CKPIPSR Research Portal",
  },
  publications: [
    {
      id: "ay-2024-2025",
      title: "Research Publication AY 2024-2025",
      academicYear: "AY 2024 - 2025",
      year: 2024,
      description:
        "Official compilation of scientific research papers, review articles, and journal publications published by faculty members and research scholars of CKPIPSR.",
      pdfUrl:
        "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/68f0d2dceabfa.pdf",
      tag: "Latest Compilation",
      colorTheme: "emerald",
    },
    {
      id: "ay-2022-2023",
      title: "Research Publication AY 2022-2023",
      academicYear: "AY 2022 - 2023",
      year: 2022,
      description:
        "Compendium of peer-reviewed journal publications, research achievements, and pharmaceutical science manuscripts published during the academic year 2022-2023.",
      pdfUrl:
        "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/64c1fc24f3171.pdf",
      tag: "Archived Report",
      colorTheme: "blue",
    },
  ],
};

/** What PG Projects shipped with; it is the same page as Publications. */
export const DEFAULT_PG_PROJECTS: ResearchPublicationsContent = {
  pageTitle: "PG Projects",
  pageSubtitle: "Post Graduate (M.Pharm) Research Projects, Thesis Dissertations & Academic Reports",
  intro: {
    kicker: "Post Graduate Studies",
    heading: "PG Projects & Research Documentation",
    badge: "Official PDF Records",
    body: "Access and download the official academic year reports documenting Post Graduate (M.Pharm) dissertation projects, research findings, and scientific project publications guided by faculty members at C.K. Pithawalla Institute of Pharmaceutical Science & Research.",
  },
  note: { text: "Official Post Graduate project records are preserved in PDF format for academic reference and verification.", tagline: "CKPIPSR PG Repository" },
  publications: [
    {
      id: "ay-2024-2025",
      title: "Research Publication AY 2024-2025",
      academicYear: "AY 2024 - 2025",
      year: 2024,
      description: "Official documentation and compilation of Post Graduate (M.Pharm) dissertation projects, experimental studies, and research publications for the academic year 2024-2025.",
      pdfUrl: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/68c24ee48d6ad.pdf",
      tag: "AY 2024-2025 Report",
      colorTheme: "emerald",
    },
    {
      id: "ay-2025-2026",
      title: "Research Publication AY 2025-2026",
      academicYear: "AY 2025 - 2026",
      year: 2025,
      description: "Compendium and official repository of ongoing and completed Post Graduate research initiatives, thesis manuscripts, and scientific publications for AY 2025-2026.",
      pdfUrl: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/69e33b71b7b8b.pdf",
      tag: "AY 2025-2026 Report",
      colorTheme: "blue",
    },
  ],
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ResearchPublicationsContent {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Partial<ResearchPublicationsContent>;
  return !!p.pageTitle && !!p.intro && Array.isArray(p.publications);
}

/**
 * One of the yearly-report pages: Publications, or PG Projects, which is the
 * same page with different words. Each names its own section and what it
 * shipped with.
 */
export function useResearchPublications(
  section = "publications",
  fallback: ResearchPublicationsContent = DEFAULT_PUBLICATIONS,
): ResearchPublicationsContent {
  const [content, setContent] = useState<ResearchPublicationsContent>(fallback);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview(`/api/pages/research/${section}`))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.publications)) setContent(body.publications);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [section]);

  return content;
}
