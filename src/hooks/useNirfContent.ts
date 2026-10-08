import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";
import type { IqacMomsContent } from "./useIqacMomsContent";

/**
 * Accreditation → NIRF.
 *
 * The same shape as MoMs and ATR — a list of dated PDFs — so it reuses that
 * page's type rather than restating it.
 *
 * Three numbers were literals on this page, one more than on that one: the
 * badge over the list, the span in the first tile, and the count beside it.
 * All three arrive worked out.
 */
export type NirfContent = IqacMomsContent;

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_NIRF: NirfContent = {
  "pageTitle": "NIRF",
  "pageSubtitle": "National Institutional Ranking Framework (NIRF) Data Reports & Submissions",
  "intro": {
    "kicker": "Ministry of Education (MoE), Government of India",
    "heading": "National Institutional Ranking Framework (NIRF)",
    "countLabel": "6 Annual Reports",
    "badge": "MoE Framework",
    "body": "The National Institutional Ranking Framework (NIRF) was approved by the Ministry of Education (MoE) to rank institutions across India based on objective parameters including Teaching, Learning and Resources (TLR), Research and Professional Practices (RP), Graduation Outcomes (GO), Outreach and Inclusivity (OI), and Peer Perception (PR).",
    "stats": [
      {
        "icon": "Calendar",
        "tone": "emerald",
        "title": "2021 – 2026 Archive",
        "note": "6 Consecutive Cycles"
      },
      {
        "icon": "Award",
        "tone": "blue",
        "title": "Pharmacy Discipline",
        "note": "Institutional Ranking"
      },
      {
        "icon": "FileCheck",
        "tone": "purple",
        "title": "Verified Data",
        "note": "Authorized PDF Reports"
      }
    ]
  },
  "archive": {
    "kicker": "Official Submissions",
    "heading": "NIRF Annual Reports",
    "hint": "Click to view and inspect the official NIRF data report",
    "fileLabel": "MoE NIRF Data",
    "openLabel": "Open {title}",
    "missingLabel": "Not published yet"
  },
  "quick": {
    "title": "Direct Quick Access Links",
    "body": "Tap any year below to immediately open the NIRF report in a new tab:"
  },
  "empty": {
    "title": "No Reports Yet",
    "body": "NIRF data submissions have not been published. Please check back soon."
  },
  "records": [
    {
      "id": "nirf-2026",
      "title": "NIRF-2026",
      "academicYear": "AY 2025-2026",
      "year": 2026,
      "description": "Official National Institutional Ranking Framework (NIRF) 2026 data submission report, pharmacy discipline metrics, faculty profiles, research outputs, and institutional transparency data.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/69afe3a4bfebf.pdf",
      "openLabel": "Open NIRF-2026",
      "hasFile": true
    },
    {
      "id": "nirf-2025",
      "title": "NIRF-2025",
      "academicYear": "AY 2024-2025",
      "year": 2025,
      "description": "Official National Institutional Ranking Framework (NIRF) 2025 data submission report, teaching-learning resources, research publications, and graduate outcomes.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/67931ba18bc48.pdf",
      "openLabel": "Open NIRF-2025",
      "hasFile": true
    },
    {
      "id": "nirf-2024",
      "title": "NIRF-2024",
      "academicYear": "AY 2023-2024",
      "year": 2024,
      "description": "Official National Institutional Ranking Framework (NIRF) 2024 data submission report detailing academic achievements, placement statistics, and infrastructure benchmarks.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/65aa5112ec024.pdf",
      "openLabel": "Open NIRF-2024",
      "hasFile": true
    },
    {
      "id": "nirf-2023",
      "title": "NIRF-2023",
      "academicYear": "AY 2022-2023",
      "year": 2023,
      "description": "Official National Institutional Ranking Framework (NIRF) 2023 data submission report encompassing student strength, financial resources, and consultancy projects.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/64268088bf45f.pdf",
      "openLabel": "Open NIRF-2023",
      "hasFile": true
    },
    {
      "id": "nirf-2022",
      "title": "NIRF-2022",
      "academicYear": "AY 2021-2022",
      "year": 2022,
      "description": "Official National Institutional Ranking Framework (NIRF) 2022 data submission report outlining outreach, peer perception, and executive development metrics.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/6426806d3da45.pdf",
      "openLabel": "Open NIRF-2022",
      "hasFile": true
    },
    {
      "id": "nirf-2021",
      "title": "NIRF-2021",
      "academicYear": "AY 2020-2021",
      "year": 2021,
      "description": "Official National Institutional Ranking Framework (NIRF) 2021 data submission report covering comprehensive pharmacy institutional parameters and research output.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/642680441c5e4.pdf",
      "openLabel": "Open NIRF-2021",
      "hasFile": true
    }
  ],
  "recordCount": 6,
  "fileCount": 6,
  "yearRange": "2021 – 2026"
};

function isUsable(value: unknown): value is NirfContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<NirfContent>;
  // An empty list is a real state — nothing published yet — so only the shape
  // is checked, not the count.
  return (
    Array.isArray(c.records) &&
    typeof c.archive?.openLabel === "string" &&
    typeof c.intro?.heading === "string"
  );
}

export function useNirfContent(): NirfContent {
  const [content, setContent] = useState<NirfContent>(DEFAULT_NIRF);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/iqac/nirf"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.nirf)) setContent(body.nirf);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
