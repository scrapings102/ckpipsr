import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/** A tile's colour, the same five the panel offers. */
export type IdpTone = "emerald" | "blue" | "purple" | "amber" | "rose";

export interface IdpStat {
  icon: string;
  tone: IdpTone;
  title: string;
  note: string;
}

/**
 * Accreditation → IDP.
 *
 * One plan and the years it covers. Six lines on the page named those years as
 * literals — the badge, a tile and its note, the chip, the plan's title and the
 * subtitle — and all six now arrive worked out from the two years stored, so
 * moving the plan moves them together.
 */
export interface IdpContent {
  pageTitle: string;
  pageSubtitle: string;
  horizon: {
    startYear: number;
    endYear: number;
    /** How long the plan runs. */
    years: number;
    /** "2025–2030". */
    range: string;
  };
  intro: {
    kicker: string;
    heading: string;
    badge: string;
    secondBadge: string;
    body: string;
    stats: IdpStat[];
  };
  plan: {
    kicker: string;
    heading: string;
    hint: string;
    title: string;
    yearChip: string;
    fileLabel: string;
    description: string;
    url: string;
    missingLabel: string;
    /** Whether the button links anywhere. */
    hasFile: boolean;
  };
  quick: { title: string; body: string };
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_IDP: IdpContent = {
  "pageTitle": "IDP",
  "pageSubtitle": "Institutional Development Plan (IDP) 2025-2030 – Strategic Roadmap for Academic & Institutional Excellence",
  "horizon": {
    "startYear": 2025,
    "endYear": 2030,
    "years": 5,
    "range": "2025–2030"
  },
  "intro": {
    "kicker": "Strategic Institutional Vision",
    "heading": "Institutional Development Plan (IDP)",
    "badge": "Vision 2025–2030",
    "secondBadge": "Official Document",
    "body": "The Institutional Development Plan (IDP) 2025-2030 outlines the comprehensive strategic roadmap of C.K. Pithawalla Institute of Pharmaceutical Science and Research. It sets key milestones for academic innovation, faculty advancement, state-of-the-art research infrastructure, industry collaborations, and holistic student development over the five-year trajectory.",
    "stats": [
      {
        "icon": "Calendar",
        "tone": "emerald",
        "title": "2025 – 2030 Horizon",
        "note": "5-Year Strategic Policy"
      },
      {
        "icon": "Target",
        "tone": "blue",
        "title": "Holistic Excellence",
        "note": "NEP 2020 & NAAC Aligned"
      },
      {
        "icon": "FileCheck",
        "tone": "purple",
        "title": "Authorized Report",
        "note": "Full Plan in PDF"
      }
    ]
  },
  "plan": {
    "kicker": "Official Strategic Plan",
    "heading": "Institutional Development Plan Document",
    "hint": "Click the button below to view the official PDF document",
    "title": "Institutional Development Plan (IDP):2025-2030",
    "yearChip": "2025–2030",
    "fileLabel": "Official IDP PDF",
    "description": "Comprehensive strategic plan encompassing academic development, institutional governance, resource mobilization, digital learning integration, research promotion, and student welfare initiatives for 2025-2030.",
    "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/6996e062b372b.pdf",
    "missingLabel": "Not published yet",
    "hasFile": true
  },
  "quick": {
    "title": "Direct Quick Access Link",
    "body": "Tap below to immediately open the complete Institutional Development Plan in a new tab:"
  }
};

function isUsable(value: unknown): value is IdpContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<IdpContent>;
  return (
    typeof c.plan?.title === "string" &&
    typeof c.intro?.heading === "string" &&
    typeof c.horizon?.startYear === "number"
  );
}

export function useIdpContent(): IdpContent {
  const [content, setContent] = useState<IdpContent>(DEFAULT_IDP);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/iqac/idp"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.idp)) setContent(body.idp);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
