import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/** A tile's colour, the same five the panel offers. */
export type RtiTone = "emerald" | "blue" | "purple" | "amber" | "rose";

export interface RtiStat {
  icon: string;
  tone: RtiTone;
  title: string;
  note: string;
}

export interface RtiNote {
  icon: string;
  /** The green treatment, as against the plain one. */
  highlighted: boolean;
  label: string;
  body: string;
}

/**
 * Accreditation → RTI.
 *
 * The officer's name arrives already resolved: the panel holds a link to the
 * Deans or Faculties page, so a rename there follows here, and the line under
 * the name is filled in rather than repeating it.
 *
 * The portal address was written out five times on this page — the tile note,
 * the "Portal URL:" line, the button, the shortcut and the href. It is stored
 * once now and filled into all five.
 */
export interface RtiContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    badge: string;
    secondBadge: string;
    notes: RtiNote[];
    stats: RtiStat[];
  };
  officer: {
    kicker: string;
    heading: string;
    /** Where the name came from. */
    source: "deans" | "faculties" | "custom";
    name: string;
    /** Over the name on the card. */
    cardKicker: string;
    roleLabel: string;
    designation: string;
    organisation: string;
    /** Already filled in with the name. */
    line: string;
    badge: string;
    address: string;
  };
  portal: {
    kicker: string;
    heading: string;
    pill: string;
    cardHeading: string;
    body: string;
    url: string;
    urlLabel: string;
    buttonLabel: string;
    /** The address without the https, for anything that says it short. */
    host: string;
  };
  quick: { title: string; body: string; label: string };
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_RTI: RtiContent = {
  "pageTitle": "RTI",
  "pageSubtitle": "Right to Information (RTI) Act, 2005 – Statutory Public Authority Obligations & Mandatory Disclosures",
  "intro": {
    "kicker": "Government of India Statutory Act",
    "heading": "Right to Information (RTI)",
    "badge": "Act 2005",
    "secondBadge": "Section 4(1)(b)",
    "notes": [
      {
        "icon": "Info",
        "highlighted": true,
        "label": "Statutory Enactment & Purpose",
        "body": "The Right to Information Act, 2005 and obligations of public authorities [under Section 4(1)(b)] has been enacted by the Govt. of India and has come into force from 15 June, 2005. This Act provides access to information under the control of public authorities in order to promote transparency and accountability in the working of every public authority."
      },
      {
        "icon": "CheckCircle2",
        "highlighted": false,
        "label": "Mandatory Disclosure & Compliance",
        "body": "All relevant statutory information and mandatory disclosure of college pertaining to PCI and GTU has been uploaded on the institute website from time to time."
      }
    ],
    "stats": [
      {
        "icon": "Calendar",
        "tone": "emerald",
        "title": "15 June, 2005",
        "note": "Date of Enactment"
      },
      {
        "icon": "ShieldCheck",
        "tone": "blue",
        "title": "PCI & GTU Aligned",
        "note": "Mandatory Disclosures"
      },
      {
        "icon": "Globe",
        "tone": "purple",
        "title": "Govt. RTI Portal",
        "note": "rtionline.gov.in"
      }
    ]
  },
  "officer": {
    "kicker": "Authority Contact",
    "heading": "Office In-charge Details",
    "cardKicker": "Office In-charge Details",
    "source": "faculties",
    "name": "Dr. Dhiren P. Shah",
    "roleLabel": "Office In-charge",
    "designation": "Principal",
    "organisation": "C.K Pithawalla Institute Of Pharmaceutical Science & Research",
    "line": "Office In-charge: Dr. Dhiren P. Shah",
    "badge": "Statutory Officer",
    "address": "Surat-Dumas Road, Surat, Gujarat"
  },
  "portal": {
    "kicker": "National Online Portal",
    "heading": "Online RTI Application & Information",
    "pill": "Govt. of India Portal",
    "cardHeading": "For More Details Visit RTI Online",
    "body": "Citizens can file RTI applications, submit first appeals, and track status online through the Government of India RTI Online portal.",
    "url": "https://rtionline.gov.in/",
    "urlLabel": "Portal URL: https://rtionline.gov.in/",
    "buttonLabel": "Visit rtionline.gov.in",
    "host": "rtionline.gov.in"
  },
  "quick": {
    "title": "Direct Quick Access Link",
    "body": "Tap below to open the official Government of India RTI Online portal in a new tab:",
    "label": "https://rtionline.gov.in/"
  }
};

function isUsable(value: unknown): value is RtiContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<RtiContent>;
  return (
    typeof c.officer?.name === "string" &&
    typeof c.portal?.url === "string" &&
    Array.isArray(c.intro?.notes)
  );
}

export function useRtiContent(): RtiContent {
  const [content, setContent] = useState<RtiContent>(DEFAULT_RTI);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/iqac/rti"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.rti)) setContent(body.rti);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
