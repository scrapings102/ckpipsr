import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";
import type { IdpContent, IdpTone } from "./useIdpContent";

/**
 * Training & Placement → Visits.
 *
 * The same shape as Accreditation → IDP — one document and the years it covers
 * — so it reuses that type rather than restating it.
 *
 * Seven lines named the span as a literal: the subtitle, the badge, a tile and
 * its note, the year chip, the report's own title, and the shortcut under it.
 * All seven arrive worked out from the two years stored. The title abbreviates
 * the end year ("Industrial Visit 2016-22"), which is what {toShort} is for.
 */
export type TnpVisitsContent = IdpContent;
export type { IdpTone as TnpVisitsTone };

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_TNP_VISITS: TnpVisitsContent = {
    "plan": {
      "url": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/6475bc9ca8d32.pdf",
      "hint": "Click the button below to view the official PDF document",
      "title": "Industrial Visit 2016-22",
      "kicker": "Official Report Document",
      "heading": "Industrial Visit Reports & Documentation",
      "yearChip": "2016–2022",
      "fileLabel": "Official PDF Record",
      "description": "Detailed summary and compilation of student industrial visits conducted between 2016 and 2022, covering manufacturing plant tours, R&D facility exposures, and regulatory compliance demonstrations.",
      "missingLabel": "Not published yet",
      "hasFile": true
    },
    "intro": {
      "body": "Industrial visits are an integral part of the pharmaceutical curriculum at C.K. Pithawalla Institute of Pharmaceutical Science and Research. They provide students with practical insights into large-scale drug manufacturing, cGMP compliant facilities, advanced analytical instrumentation, Quality Assurance (QA) and Quality Control (QC) operations in leading pharmaceutical corporations.",
      "badge": "Archive 2016–2022",
      "stats": [
        {
          "icon": "Calendar",
          "note": "6-Year Industrial Tours",
          "tone": "emerald",
          "title": "2016 – 2022 Archive"
        },
        {
          "icon": "Building2",
          "note": "cGMP & Formulation Units",
          "tone": "blue",
          "title": "Pharma Manufacturing"
        },
        {
          "icon": "FileCheck",
          "note": "Comprehensive PDF Record",
          "tone": "purple",
          "title": "Authorized Report"
        }
      ],
      "kicker": "Training & Placement Cell",
      "heading": "Industrial Visits & Plant Tours",
      "secondBadge": "Official Report"
    },
    "quick": {
      "title": "Direct Quick Access Link",
      "body": "Tap below to immediately open the Industrial Visit 2016-22 PDF in a new tab:"
    },
    "horizon": {
      "startYear": 2016,
      "endYear": 2022,
      "years": 6,
      "range": "2016–2022"
    },
    "pageTitle": "Visits",
    "pageSubtitle": "Training & Placement Cell – Industrial Visits, Practical Exposure & Industry Connect (2016–2022)"
  };

function isUsable(value: unknown): value is TnpVisitsContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<TnpVisitsContent>;
  return (
    typeof c.plan?.title === "string" &&
    typeof c.intro?.heading === "string" &&
    typeof c.horizon?.startYear === "number"
  );
}

export function useTnpVisitsContent(): TnpVisitsContent {
  const [content, setContent] = useState<TnpVisitsContent>(DEFAULT_TNP_VISITS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/tnp/visits"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.tnpVisits)) setContent(body.tnpVisits);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
