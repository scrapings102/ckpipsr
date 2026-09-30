import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → Research - Consultancy.
 *
 * The status buttons are content, not a fixed list in this file: the API sends
 * them in order with the number of cards behind each, every project says which
 * one it answers to, and the figures arrive with their counts filled in.
 */
export type ConsultancyTone = "emerald" | "purple" | "blue" | "amber";

export interface ConsultancyFilter {
  id: string;
  label: string;
  /** The pill on each card, e.g. "Status: Going on". */
  badge: string;
  tone: ConsultancyTone;
  /** A pulsing dot for work still running, a tick for work finished. */
  marker: "pulse" | "check";
  count: number;
}

export interface ConsultancyProject {
  id: string;
  filterId: string;
  investigator: string;
  designation: string;
  title: string;
  grantDate: string;
  startedYear: string;
  agency: string;
  agencyType: string;
  agencyLocation: string;
  cost: string;
  scheme: string;
}

export interface ConsultancyStat {
  label: string;
  value: string;
  caption: string;
}

export interface ResearchConsultancyContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    badge: string;
    filterLabel: string;
    allLabel: string;
  };
  stats: ConsultancyStat[];
  filters: ConsultancyFilter[];
  projects: ConsultancyProject[];
  note: { text: string; tagline: string };
  total: number;
}

/** What the page shipped with, and what it falls back to if the API is down. */
export const DEFAULT_CONSULTANCY: ResearchConsultancyContent = {
  pageTitle: "Consultancy & Sponsored Projects",
  pageSubtitle: "Funded Research Projects, Principal Investigators, Institutional Grants & Scientific Consultancies",
  intro: {
    kicker: "Sponsored Research & Consultancy",
    heading: "Institutional Minor Research Projects (MRP)",
    badge: "GTU-ICQC Sanctioned",
    filterLabel: "Filter by Status:",
    allLabel: "All Projects",
  },
  stats: [
    { label: "Sanctioned Projects", value: "02", caption: "RPS-MRP Grants" },
    { label: "Funding Agency", value: "GTU-ICQC-RPS-MRP", caption: "Gujarat Tech. University" },
    { label: "Agency Type", value: "Government", caption: "State / Autonomous" },
    { label: "Total Outlay", value: "₹ 90,000", caption: "Sanctioned Budget" },
  ],
  filters: [
    { id: "going-on", label: "Going On / Active", badge: "Status: Going on", tone: "blue", marker: "pulse", count: 1 },
    { id: "completed", label: "Completed", badge: "Status: Completed", tone: "emerald", marker: "check", count: 1 },
  ],
  projects: [
    {
      id: "quinoline-ulk1-inhibitors",
      filterId: "going-on",
      investigator: "Dr. Naishadh I. Solanki",
      designation: "Principal Investigator & Faculty of Pharmacy",
      title: "Quinoline-Based ULK1 Inhibitors: A Comprehensive Study from Computational Design to In Vitro Anticancer Activity",
      grantDate: "01-04-2025",
      startedYear: "2025",
      agency: "GTU-ICQC-RPS-MRP",
      agencyType: "Government",
      agencyLocation: "Gujarat, India",
      cost: "50,000/-",
      scheme: "GTU-ICQC MRP Grant",
    },
    {
      id: "surfactant-free-antifungal-emulsions",
      filterId: "completed",
      investigator: "Dr. Vinod D. Ramani",
      designation: "Principal Investigator & Associate Professor",
      title: "Next-Generation Antifungal Emulsions: A Surfactant-Free Approach",
      grantDate: "15-04-2024",
      startedYear: "2024",
      agency: "GTU-ICQC-RPS-MRP",
      agencyType: "Government",
      agencyLocation: "Gujarat, India",
      cost: "40,000/-",
      scheme: "GTU-ICQC MRP Grant",
    },
  ],
  note: {
    text: "Research Promotion Scheme (RPS) - Minor Research Projects (MRP) approved by Gujarat Technological University (GTU) Innovation & Quality Council (ICQC).",
    tagline: "CKPIPSR R&D Cell",
  },
  total: 2,
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ResearchConsultancyContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<ResearchConsultancyContent>;
  return !!c.pageTitle && Array.isArray(c.filters) && Array.isArray(c.projects) && Array.isArray(c.stats);
}

export function useResearchConsultancy(): ResearchConsultancyContent {
  const [content, setContent] = useState<ResearchConsultancyContent>(DEFAULT_CONSULTANCY);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/research/consultancy"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.consultancy)) setContent(body.consultancy);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
