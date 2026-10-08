import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Accreditation → MoMs and ATR.
 *
 * Neither number on this page is stored: how many documents there are, and the
 * span of years they cover, arrive worked out. The page carried both as
 * literals, so a sixth report would have left them wrong.
 *
 * A document with no link is still listed, with its button greyed, which
 * `hasFile` is what says.
 */
export type MomTone = "emerald" | "blue" | "purple" | "amber" | "rose";

export interface IqacMomStat {
  icon: string;
  tone: MomTone;
  /** Arrives with {range} already filled in. */
  title: string;
  note: string;
}

export interface IqacMomRecord {
  id: string;
  title: string;
  academicYear: string;
  year: number;
  description: string;
  /** Empty when the file is not up yet. */
  url: string;
  /** "Open IQAC Q1-2024", with the title already in it. */
  openLabel: string;
  hasFile: boolean;
}

export interface IqacMomsContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    /** Arrives with the number of documents in it. */
    countLabel: string;
    badge: string;
    body: string;
    stats: IqacMomStat[];
  };
  archive: {
    kicker: string;
    heading: string;
    hint: string;
    fileLabel: string;
    openLabel: string;
    missingLabel: string;
  };
  quick: { title: string; body: string };
  empty: { title: string; body: string };
  records: IqacMomRecord[];
  recordCount: number;
  fileCount: number;
  /** "2022 – 2024", or a single year, or empty. */
  yearRange: string;
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_IQAC_MOMS: IqacMomsContent = {
  "pageTitle": "MoMs and ATR",
  "pageSubtitle": "Minutes of Meetings (MoM) & Action Taken Reports (ATR) of the Internal Quality Assurance Cell",
  "intro": {
    "kicker": "Institutional Records & Audits",
    "heading": "Minutes of Meetings & Action Taken Reports",
    "countLabel": "5 Official Documents",
    "badge": "Verified Reports",
    "body": "Access the official proceedings, resolutions, and corresponding Action Taken Reports (ATR) from the periodic sessions of the Internal Quality Assurance Cell (IQAC) at C.K. Pithawalla Institute of Pharmaceutical Science and Research.",
    "stats": [
      {
        "icon": "Calendar",
        "tone": "emerald",
        "title": "2022 – 2024 Records",
        "note": "Quarterly Audits"
      },
      {
        "icon": "ShieldCheck",
        "tone": "blue",
        "title": "NAAC Compliance",
        "note": "AQAR Documentation"
      },
      {
        "icon": "FileText",
        "tone": "purple",
        "title": "Authorized PDFs",
        "note": "Official Institutional AWS"
      }
    ]
  },
  "archive": {
    "kicker": "Official Archives",
    "heading": "Available MoMs & ATR Reports",
    "hint": "Click on any button to open and view the PDF report",
    "fileLabel": "PDF Document",
    "openLabel": "Open {title}",
    "missingLabel": "Not published yet"
  },
  "quick": {
    "title": "Direct Quick Links",
    "body": "Tap below to immediately open the corresponding meeting report in a new tab:"
  },
  "empty": {
    "title": "No Reports Yet",
    "body": "Minutes and Action Taken Reports have not been published. Please check back soon."
  },
  "records": [
    {
      "id": "iqac-q1-2024",
      "title": "IQAC Q1-2024",
      "academicYear": "AY 2024-25",
      "year": 2024,
      "description": "Minutes of IQAC Meeting and Action Taken Report (ATR) - Quarter 1, 2024 session covering curriculum reviews, research seed initiatives, and academic progress.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/66e407764acd8.pdf",
      "openLabel": "Open IQAC Q1-2024",
      "hasFile": true
    },
    {
      "id": "iqac-q1-2023",
      "title": "IQAC Q1-2023",
      "academicYear": "AY 2023-24",
      "year": 2023,
      "description": "Minutes of IQAC Meeting and Action Taken Report (ATR) - Quarter 1, 2023 session focusing on semester planning, student mentoring reviews, and teaching innovations.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/646ef7ec109b6.pdf",
      "openLabel": "Open IQAC Q1-2023",
      "hasFile": true
    },
    {
      "id": "iqac-q2-2023",
      "title": "IQAC Q2-2023",
      "academicYear": "AY 2023-24",
      "year": 2023,
      "description": "Minutes of IQAC Meeting and Action Taken Report (ATR) - Quarter 2, 2023 session detailing mid-semester assessment analysis, industry collaborations, and faculty development.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/66e40799d1de9.pdf",
      "openLabel": "Open IQAC Q2-2023",
      "hasFile": true
    },
    {
      "id": "iqac-q4-2022",
      "title": "IQAC Q4-2022",
      "academicYear": "AY 2022-23",
      "year": 2022,
      "description": "Minutes of IQAC Meeting and Action Taken Report (ATR) - Quarter 4, 2022 session outlining annual academic audits, infrastructure enhancements, and stakeholder feedback actions.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/646ef7b70c5ee.pdf",
      "openLabel": "Open IQAC Q4-2022",
      "hasFile": true
    },
    {
      "id": "iqac-q3-2022",
      "title": "IQAC Q3-2022",
      "academicYear": "AY 2022-23",
      "year": 2022,
      "description": "Minutes of IQAC Meeting and Action Taken Report (ATR) - Quarter 3, 2022 session addressing course attainment metrics, library resource expansions, and eco-campus programs.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/646ef7999475f.pdf",
      "openLabel": "Open IQAC Q3-2022",
      "hasFile": true
    }
  ],
  "recordCount": 5,
  "fileCount": 5,
  "yearRange": "2022 – 2024"
};

function isUsable(value: unknown): value is IqacMomsContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<IqacMomsContent>;
  // An empty list is a real state — nothing published yet — so only the shape
  // is checked, not the count.
  return (
    Array.isArray(c.records) &&
    typeof c.archive?.openLabel === "string" &&
    typeof c.intro?.heading === "string"
  );
}

export function useIqacMomsContent(): IqacMomsContent {
  const [content, setContent] = useState<IqacMomsContent>(DEFAULT_IQAC_MOMS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/iqac/moms"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.iqacMoms)) setContent(body.iqacMoms);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
