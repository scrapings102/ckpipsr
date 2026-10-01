import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Accreditation & Ranking → IQAC Composition.
 *
 * The constituted committee. A member linked to the Deans and Faculty
 * In-charges page or the Faculties page arrives named from it; the industry
 * directors are on neither and are printed as typed.
 *
 * Nothing the page can count is stored. The badge over the grid, the number on
 * every filter pill, the counts in the summary tiles and the numbering on each
 * card arrive worked out, so a pill cannot promise four and show three.
 */
export type IqacTone = "emerald" | "blue" | "purple" | "amber";

export interface IqacCategory {
  id: string;
  /** What a member's card badge reads. */
  name: string;
  /** What the pill reads; the count sits beside it. */
  filterLabel: string;
  tone: IqacTone;
  count: number;
}

export interface IqacPillar {
  icon: string;
  tone: IqacTone;
  title: string;
  /** Arrives with its number already in it. */
  note: string;
  category: string;
}

export interface IqacMember {
  name: string;
  role: string;
  designation: string;
  category: string;
  categoryName: string;
  tone: IqacTone;
  /** "01", "02" … counted down the list. */
  number: string;
  position: number;
}

export interface IqacCompositionContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    /** Arrives with the number of members in it. */
    countLabel: string;
    badge: string;
    statement: { kicker: string; body: string };
    pillars: IqacPillar[];
  };
  filters: { allLabel: string; searchPlaceholder: string; categories: IqacCategory[] };
  card: {
    roleLabel: string;
    designationLabel: string;
    footerLeft: string;
    /** Holds {position}, which the page fills in per card. */
    memberLabel: string;
  };
  empty: { title: string; body: string; resetLabel: string };
  members: IqacMember[];
  memberCount: number;
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_IQAC_COMPOSITION: IqacCompositionContent = {
  "pageTitle": "IQAC Composition",
  "pageSubtitle": "Constituted Committee for Institutional Quality Assurance (QA) & Quality Enhancement (QE)",
  "intro": {
    "kicker": "NAAC Quality Framework",
    "heading": "IQAC Committee Composition",
    "countLabel": "10 Constituted Members",
    "badge": "QA & QE Mechanism",
    "statement": {
      "kicker": "Core Mechanism & Objectives",
      "body": "IQAC is conceived as a mechanism to build and ensure a quality culture at the institutional level. The IQAC is meant for planning, guiding and maintaining Quality Assurance (QA) and Quality Enhancement (QE) activities of the institution."
    },
    "pillars": [
      {
        "icon": "Building2",
        "tone": "emerald",
        "title": "Trustee Governance",
        "note": "2 Senior Management",
        "category": "management"
      },
      {
        "icon": "Target",
        "tone": "blue",
        "title": "Leadership & Head",
        "note": "Principal & Coordinator",
        "category": ""
      },
      {
        "icon": "GraduationCap",
        "tone": "purple",
        "title": "Faculty Voice",
        "note": "4 Teacher Representatives",
        "category": "faculty"
      },
      {
        "icon": "Award",
        "tone": "amber",
        "title": "Industry Advisory",
        "note": "2 Pharma Directors",
        "category": "industry"
      }
    ]
  },
  "filters": {
    "allLabel": "All Members",
    "searchPlaceholder": "Search member, role, designation...",
    "categories": [
      {
        "id": "management",
        "name": "Management & Governance",
        "filterLabel": "Trust & Management",
        "tone": "emerald",
        "count": 2
      },
      {
        "id": "leadership",
        "name": "Institutional Leadership",
        "filterLabel": "Leadership & Coordinator",
        "tone": "blue",
        "count": 2
      },
      {
        "id": "faculty",
        "name": "Faculty Representatives",
        "filterLabel": "Faculty Representatives",
        "tone": "purple",
        "count": 4
      },
      {
        "id": "industry",
        "name": "Industry Experts",
        "filterLabel": "External Industry Experts",
        "tone": "amber",
        "count": 2
      }
    ]
  },
  "card": {
    "roleLabel": "Role in IQAC",
    "designationLabel": "Designation",
    "footerLeft": "C.K.P.I.P.S.R. IQAC",
    "memberLabel": "Member #{position}"
  },
  "empty": {
    "title": "No Members Found",
    "body": "No committee members matched your search query.",
    "resetLabel": "Reset Search Filters"
  },
  "members": [
    {
      "name": "Shri Rameshchandra A. Mistry",
      "role": "Senior administrator",
      "designation": "Trustee / Secretary",
      "category": "management",
      "categoryName": "Management & Governance",
      "tone": "emerald",
      "number": "01",
      "position": 1
    },
    {
      "name": "Shri Birenbhai M. Pithawalla",
      "role": "Member from management",
      "designation": "Trustee",
      "category": "management",
      "categoryName": "Management & Governance",
      "tone": "emerald",
      "number": "02",
      "position": 2
    },
    {
      "name": "Dr. Dhiren Shah",
      "role": "Principal/Director of the concerned Technical Institution",
      "designation": "Principal",
      "category": "leadership",
      "categoryName": "Institutional Leadership",
      "tone": "blue",
      "number": "03",
      "position": 3
    },
    {
      "name": "Dr. Bhumika C. Desai",
      "role": "Senior teacher as coordinator",
      "designation": "Associate Professor",
      "category": "leadership",
      "categoryName": "Institutional Leadership",
      "tone": "blue",
      "number": "04",
      "position": 4
    },
    {
      "name": "Dr. Vinodkumar D. Ramani",
      "role": "Teacher Representative",
      "designation": "Associate Professor",
      "category": "faculty",
      "categoryName": "Faculty Representatives",
      "tone": "purple",
      "number": "05",
      "position": 5
    },
    {
      "name": "Mr. Dipayan Tarafder",
      "role": "Teacher Representative",
      "designation": "Assistant Professor",
      "category": "faculty",
      "categoryName": "Faculty Representatives",
      "tone": "purple",
      "number": "06",
      "position": 6
    },
    {
      "name": "Mr. Moolla Yahya Ali",
      "role": "Teacher Representative",
      "designation": "Assistant Professor",
      "category": "faculty",
      "categoryName": "Faculty Representatives",
      "tone": "purple",
      "number": "07",
      "position": 7
    },
    {
      "name": "Mrs. Prakruti P. Gotawala",
      "role": "Teacher Representative",
      "designation": "Assistant Professor",
      "category": "faculty",
      "categoryName": "Faculty Representatives",
      "tone": "purple",
      "number": "08",
      "position": 8
    },
    {
      "name": "Mr. Kamlesh Zota",
      "role": "External Industrial expert 1",
      "designation": "Director, Zota healthcare Ltd.",
      "category": "industry",
      "categoryName": "Industry Experts",
      "tone": "amber",
      "number": "09",
      "position": 9
    },
    {
      "name": "Dr. Bhanubhai Vaghasiya",
      "role": "External Industrial expert 2",
      "designation": "Director,Globela Pharma. Pvt. Ltd.",
      "category": "industry",
      "categoryName": "Industry Experts",
      "tone": "amber",
      "number": "10",
      "position": 10
    }
  ],
  "memberCount": 10
};

function isUsable(value: unknown): value is IqacCompositionContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<IqacCompositionContent>;
  return (
    Array.isArray(c.members) &&
    c.members.length > 0 &&
    Array.isArray(c.filters?.categories) &&
    c.filters.categories.length > 0 &&
    typeof c.card?.memberLabel === "string"
  );
}

export function useIqacCompositionContent(): IqacCompositionContent {
  const [content, setContent] = useState<IqacCompositionContent>(DEFAULT_IQAC_COMPOSITION);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/iqac/composition"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.iqacComposition)) setContent(body.iqacComposition);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
