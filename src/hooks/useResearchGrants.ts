import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → Research - Grants.
 *
 * The filter buttons are content, not a fixed list in this file: the API sends
 * them in order with the number of cards behind each, and every grant says
 * which one it answers to.
 */
export type GrantTone = "emerald" | "purple" | "blue" | "amber";

export interface GrantFilter {
  id: string;
  label: string;
  tone: GrantTone;
  count: number;
}

export interface GrantItem {
  id: string;
  filterId: string;
  badge: string;
  title: string;
  date: string;
  agency: string;
  /** Empty means the card prints `noAmountText` instead. */
  amount: string;
  coordinator: string;
  status: string;
}

export interface ResearchGrantsContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    badgeSuffix: string;
    body: string;
    filterLabel: string;
    allLabel: string;
  };
  noAmountText: string;
  filters: GrantFilter[];
  grants: GrantItem[];
  note: { text: string; tagline: string };
  total: number;
}

/** What the page shipped with, and what it falls back to if the API is down. */
export const DEFAULT_GRANTS: ResearchGrantsContent = {
  pageTitle: "Grants & Sponsored Programs",
  pageSubtitle: "Sponsored Seminars, Refresher Courses, Government Grants & Faculty Development Programs",
  intro: {
    kicker: "Funded Initiatives & Academic Programs",
    heading: "Seminar & Refresher Course Grants",
    badgeSuffix: "Sanctioned Programs",
    body: "Record of sponsored seminars, professional development programs, and certified pharmacist refresher courses conducted at C.K. Pithawalla Institute of Pharmaceutical Science & Research with financial and academic sponsorship from DST-GSBTM, GSPC, GTU, and AICTE.",
    filterLabel: "Filter by Type:",
    allLabel: "All Programs",
  },
  noAmountText: "Institutional / Council Sponsored",
  filters: [
    { id: "seminar", label: "Seminars / PDP", tone: "purple", count: 2 },
    { id: "refresher", label: "Refresher Courses", tone: "emerald", count: 3 },
  ],
  grants: [
    {
      id: "pharmaceutical-biotechnology-2025",
      filterId: "seminar",
      badge: "Seminar",
      title: "Recent advancement in Pharmaceutical Biotechnology: From drug discovery to drug delivery",
      date: "01-03-2025",
      agency: "DST - GSBTM",
      amount: "70,000",
      coordinator: "Dr. Shuchu M. Desai",
      status: "Completed",
    },
    {
      id: "refresher-course-2024",
      filterId: "refresher",
      badge: "Refresher Course - 2024",
      title: "Two days offline refresher course for registered pharmacist",
      date: "21/9/2024 - 22/9/2024",
      agency: "GSPC (Gujarat State Pharmacy Council)",
      amount: "",
      coordinator: "Mrs. Prakruti Jadav",
      status: "Completed",
    },
    {
      id: "refresher-course-2023",
      filterId: "refresher",
      badge: "Refresher Course - 2023",
      title: "Two days online refresher course for registered pharmacist",
      date: "2/9/2023 - 3/9/2023",
      agency: "GSPC (Gujarat State Pharmacy Council)",
      amount: "",
      coordinator: "Mrs. Prakruti Jadav",
      status: "Completed",
    },
    {
      id: "refresher-course-2022",
      filterId: "refresher",
      badge: "Refresher Course - 2022",
      title: "Refresher course for registered pharmacist",
      date: "2/07/2022 - 3/7/2022",
      agency: "GSPC (Gujarat State Pharmacy Council)",
      amount: "",
      coordinator: "Mrs. Prakruti Jadav",
      status: "Completed",
    },
    {
      id: "pdp-pioneer-2022",
      filterId: "seminar",
      badge: "Seminar / FDP",
      title: "Professional development programme (PDP) Pioneer for non teachers",
      date: "7/3/2022 - 22/3/2022",
      agency: "GTU-AICTE Jointly",
      amount: "3,00,000",
      coordinator: "Mr. Yahya A. Moollla",
      status: "Completed",
    },
  ],
  note: { text: "All academic programs and refresher courses are verified by regulatory bodies (AICTE, PCI, GSPC, and GTU).", tagline: "CKPIPSR Research Cell" },
  total: 5,
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ResearchGrantsContent {
  if (typeof value !== "object" || value === null) return false;
  const g = value as Partial<ResearchGrantsContent>;
  return !!g.pageTitle && Array.isArray(g.filters) && Array.isArray(g.grants);
}

export function useResearchGrants(): ResearchGrantsContent {
  const [content, setContent] = useState<ResearchGrantsContent>(DEFAULT_GRANTS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/research/grants"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.grants)) setContent(body.grants);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
