import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";
import type { IqacMomsContent } from "./useIqacMomsContent";

/**
 * Accreditation → AISHE.
 *
 * The same shape as MoMs and ATR and NIRF — a list of dated PDFs — so it
 * reuses that type rather than restating it.
 *
 * Three numbers were literals on this page: the badge over the list, the span
 * in the first tile and the count beside it. All three arrive worked out, the
 * span read in academic years so 2024-25 carries it to 2025.
 */
export type AisheContent = IqacMomsContent;

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_AISHE: AisheContent = {
  "pageTitle": "AISHE",
  "pageSubtitle": "All India Survey on Higher Education (AISHE) Official Certificates & Survey Compliance",
  "intro": {
    "kicker": "Ministry of Education, Govt. of India",
    "heading": "AISHE Certificates & Compliance",
    "countLabel": "6 Annual Reports",
    "badge": "MoE Verified",
    "body": "The All India Survey on Higher Education (AISHE) is conducted by the Ministry of Education, Government of India, to portray the status of higher education in the country. C.K. Pithawalla Institute of Pharmaceutical Science and Research consistently submits complete institutional data and maintains annual compliance certificates.",
    "stats": [
      {
        "icon": "Calendar",
        "tone": "emerald",
        "title": "2019 – 2025 Data",
        "note": "6 Consecutive Years"
      },
      {
        "icon": "ShieldCheck",
        "tone": "blue",
        "title": "MoE Certified",
        "note": "National Database"
      },
      {
        "icon": "FileCheck",
        "tone": "purple",
        "title": "Direct Access",
        "note": "Official PDF Reports"
      }
    ]
  },
  "archive": {
    "kicker": "Certificate Repository",
    "heading": "Annual AISHE Certificates",
    "hint": "Click to view and download the official PDF certificate",
    "fileLabel": "Official Certificate",
    "openLabel": "Open {title}",
    "missingLabel": "Not submitted yet"
  },
  "quick": {
    "title": "Direct Quick Access Links",
    "body": "Tap any year below to immediately open the AISHE certificate in a new tab:"
  },
  "empty": {
    "title": "No Certificates Yet",
    "body": "AISHE compliance certificates have not been published. Please check back soon."
  },
  "records": [
    {
      "id": "aishe-2024-25",
      "title": "AISHE 2024-25",
      "academicYear": "AY 2024-2025",
      "year": 2024,
      "description": "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2024-25.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/68f072aa648f6.pdf",
      "openLabel": "Open AISHE 2024-25",
      "hasFile": true
    },
    {
      "id": "aishe-2023-24",
      "title": "AISHE 2023-24",
      "academicYear": "AY 2023-2024",
      "year": 2023,
      "description": "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2023-24.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/68f07292237b3.pdf",
      "openLabel": "Open AISHE 2023-24",
      "hasFile": true
    },
    {
      "id": "aishe-2022-23",
      "title": "AISHE 2022-23",
      "academicYear": "AY 2022-2023",
      "year": 2022,
      "description": "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2022-23.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/66e4082ea3964.pdf",
      "openLabel": "Open AISHE 2022-23",
      "hasFile": true
    },
    {
      "id": "aishe-2021-22",
      "title": "AISHE 2021-22",
      "academicYear": "AY 2021-2022",
      "year": 2021,
      "description": "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2021-22.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/642680143b2b4.pdf",
      "openLabel": "Open AISHE 2021-22",
      "hasFile": true
    },
    {
      "id": "aishe-2020-21",
      "title": "AISHE 2020-21",
      "academicYear": "AY 2020-2021",
      "year": 2020,
      "description": "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2020-21.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/64267ff401721.pdf",
      "openLabel": "Open AISHE 2020-21",
      "hasFile": true
    },
    {
      "id": "aishe-2019-20",
      "title": "AISHE 2019-20",
      "academicYear": "AY 2019-2020",
      "year": 2019,
      "description": "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2019-20.",
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/64267fd8890a9.pdf",
      "openLabel": "Open AISHE 2019-20",
      "hasFile": true
    }
  ],
  "recordCount": 6,
  "fileCount": 6,
  "yearRange": "2019 – 2025"
};

function isUsable(value: unknown): value is AisheContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<AisheContent>;
  // An empty list is a real state — nothing submitted yet — so only the shape
  // is checked, not the count.
  return (
    Array.isArray(c.records) &&
    typeof c.archive?.openLabel === "string" &&
    typeof c.intro?.heading === "string"
  );
}

export function useAisheContent(): AisheContent {
  const [content, setContent] = useState<AisheContent>(DEFAULT_AISHE);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/iqac/aishe"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.aishe)) setContent(body.aishe);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
