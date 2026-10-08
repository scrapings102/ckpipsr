import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Training & Placement → Committee.
 *
 * Every officer is a link to the Deans or Faculties page, so the name and the
 * email arrive already resolved from whichever page the link names.
 *
 * Three things the page used to store are worked out: the badge counted its own
 * members ("3 Key Officers"), each member carried a `badgeColor` that was only
 * ever a function of their role, and the Chairperson's "Head of Cell" chip was
 * the role again. A fourth, `department`, was stored on every member and
 * rendered nowhere; it is gone.
 */

export type CommitteeRole = "Chairperson" | "Coordinator" | "Member";
export type PillarTone = "blue" | "amber" | "emerald" | "purple" | "rose";

export interface TnpCommitteePillar {
  icon: string;
  tone: PillarTone;
  title: string;
  body: string;
}

export interface TnpCommitteeMember {
  role: CommitteeRole;
  /** Where the name came from. */
  source: "deans" | "faculties" | "custom";
  name: string;
  designation: string;
  contactNo: string;
  email: string;
  /** What this role's badge draws as. */
  badgeColor: string;
  /** Whether this is the one who heads the cell. */
  isHead: boolean;
  /** The number as a dialable href, country code included. */
  telHref: string;
}

export interface TnpCommitteeContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    badge: string;
    countLabel: string;
    objectiveLabel: string;
    objective: string;
    pillars: TnpCommitteePillar[];
  };
  roster: {
    kicker: string;
    heading: string;
    headLabel: string;
    emailLabel: string;
    callLabel: string;
    emptyTitle: string;
    emptyBody: string;
  };
  office: { heading: string; body: string; facts: string[] };
  members: TnpCommitteeMember[];
  memberCount: number;
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_TNP_COMMITTEE: TnpCommitteeContent = {
    "intro": {
      "badge": "Constitutional Body",
      "kicker": "Training & Placement Cell",
      "heading": "T&P Executive Committee",
      "pillars": [
        {
          "body": "Guidance for GPAT, NIPER-JEE, master's programs (M.Pharm, MBA) and international studies.",
          "icon": "GraduationCap",
          "tone": "blue",
          "title": "Higher Education & Studies"
        },
        {
          "body": "Entrepreneurship mentoring, SSIP innovation grants, pharmacy retail & manufacturing setup.",
          "icon": "Lightbulb",
          "tone": "amber",
          "title": "Self-Employment & Startups"
        },
        {
          "body": "Placement drives, corporate recruiters liaison, resume building & mock interview sessions.",
          "icon": "Briefcase",
          "tone": "emerald",
          "title": "Job Opportunities & Campus Drives"
        }
      ],
      "objective": "The Training and Placement cell of the college functions with the objective of providing guidance and assistance for the students to achieve their career goals. It provides awareness on Higher Education or Studies,Self-employment and Job opportunities.",
      "countLabel": "3 Key Officers",
      "objectiveLabel": "Cell Objective & Mission"
    },
    "office": {
      "body": "Students seeking guidance regarding on-campus recruitment, industrial training, higher education counseling (GPAT / NIPER), or startup incubation support can reach out to the T&P Cell coordinators during institute working hours (Monday to Saturday, 9:00 AM to 5:00 PM).",
      "facts": [
        "Location: Ground Floor, Admin Block",
        "C.K. Pithawalla IP&SR Campus, Surat"
      ],
      "heading": "Training & Placement Cell Office"
    },
    "roster": {
      "kicker": "Committee Members",
      "heading": "Official Committee Composition",
      "callLabel": "Call",
      "emptyBody": "The committee has not been constituted yet. Please check back soon.",
      "headLabel": "Head of Cell",
      "emailLabel": "Send Email",
      "emptyTitle": "No Officers Listed"
    },
    "members": [
      {
        "role": "Chairperson",
        "source": "faculties",
        "name": "Dr. Dhiren P. Shah",
        "designation": "Principal",
        "contactNo": "9427474602",
        "email": "dhiren.shah@ckpipsr.ac.in",
        "badgeColor": "bg-[#1a5d2e] text-white",
        "isHead": true,
        "telHref": "tel:+919427474602"
      },
      {
        "role": "Coordinator",
        "source": "faculties",
        "name": "Dr. Naishadh Ishwarbhai Solanki",
        "designation": "Assistant Professor",
        "contactNo": "9033080481",
        "email": "naishadh.solanki@ckpipsr.ac.in",
        "badgeColor": "bg-emerald-100 text-emerald-900 border border-emerald-300",
        "isHead": false,
        "telHref": "tel:+919033080481"
      },
      {
        "role": "Member",
        "source": "faculties",
        "name": "Mr. Dhaval B. Joshi",
        "designation": "Assistant Professor",
        "contactNo": "9537482224",
        "email": "dhaval.joshi@ckpipsr.ac.in",
        "badgeColor": "bg-slate-100 text-slate-800 border border-slate-200",
        "isHead": false,
        "telHref": "tel:+919537482224"
      }
    ],
    "pageTitle": "Committee",
    "pageSubtitle": "Training & Placement Cell – Leadership, Coordinators & Career Guidance Committee",
    "memberCount": 3
  };

function isUsable(value: unknown): value is TnpCommitteeContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<TnpCommitteeContent>;
  // An empty committee is a real state, so only the shape is checked.
  return (
    Array.isArray(c.members) &&
    typeof c.roster?.headLabel === "string" &&
    typeof c.intro?.heading === "string"
  );
}

export function useTnpCommitteeContent(): TnpCommitteeContent {
  const [content, setContent] = useState<TnpCommitteeContent>(DEFAULT_TNP_COMMITTEE);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/tnp/committee"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.tnpCommittee)) setContent(body.tnpCommittee);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
