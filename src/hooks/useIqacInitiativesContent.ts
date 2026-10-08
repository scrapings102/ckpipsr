import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Accreditation → IQAC Initiatives and Activities.
 *
 * Nothing the page can count is stored. The action-points badge, the number on
 * every filter pill, the numbering down the cards and the figure in the
 * closing banner arrive worked out — which the page needed, because it used to
 * carry those counts as literals and three of its five pills had drifted out
 * of step with the cards they filtered to.
 *
 * The copy below is the page as it shipped, with the counts corrected, so a
 * dead API leaves it reading right.
 */
export type InitiativeTone = "blue" | "purple" | "amber" | "rose" | "emerald";

export interface IqacStat {
  label: string;
  /** Arrives with {count} already filled in. */
  value: string;
}

export interface IqacInitiativeCategory {
  id: string;
  /** What a card's tag reads. */
  name: string;
  /** What the pill reads; the count sits beside it. */
  filterLabel: string;
  tone: InitiativeTone;
  count: number;
}

export interface IqacInitiative {
  text: string;
  category: string;
  /** Names a lucide icon the page knows how to draw. */
  icon: string;
  categoryName: string;
  tone: InitiativeTone;
  /** "01", "02" … counted down the list. */
  number: string;
}

export interface IqacInitiativesContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    /** Arrives with the number of initiatives in it. */
    countLabel: string;
    badge: string;
    overview: { kicker: string; body: string };
    stats: IqacStat[];
  };
  filters: {
    kicker: string;
    heading: string;
    allLabel: string;
    searchPlaceholder: string;
    categories: IqacInitiativeCategory[];
  };
  empty: { title: string; body: string; resetLabel: string };
  banner: { kicker: string; heading: string; body: string; stats: IqacStat[] };
  initiatives: IqacInitiative[];
  initiativeCount: number;
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_IQAC_INITIATIVES: IqacInitiativesContent = {
  "pageTitle": "IQAC Initiatives and Activities",
  "pageSubtitle": "Strategic Quality Sustenance, Continuous Enhancement, and Institutional Framework",
  "intro": {
    "kicker": "Quality Assurance & Sustenance",
    "heading": "IQAC Activities & Action Scope",
    "countLabel": "31 Action Points",
    "badge": "Institutional Quality",
    "overview": {
      "kicker": "Activities Overview",
      "body": "IQAC activities majorly includes periodical meetings, workshops, developing quality benchmarks, academic documentation, obtaining various stakeholder feedback along with analysing and taking action on feedback, training programs for non-teaching staff Members, etc."
    },
    "stats": [
      {
        "label": "Curriculum Delivery",
        "value": "OBE & PO/CO"
      },
      {
        "label": "Student Mentoring",
        "value": "Paced Learning"
      },
      {
        "label": "Audits & Reviews",
        "value": "AAA & AQAR"
      },
      {
        "label": "Green Practices",
        "value": "Eco-Restoration"
      }
    ]
  },
  "filters": {
    "kicker": "Comprehensive Action Matrix",
    "heading": "IQAC Initiatives",
    "allLabel": "All Initiatives",
    "searchPlaceholder": "Search initiative keywords...",
    "categories": [
      {
        "id": "academic",
        "name": "Academic & Curriculum",
        "filterLabel": "Academic & Curriculum",
        "tone": "blue",
        "count": 7
      },
      {
        "id": "mentorship",
        "name": "Student Mentorship & Support",
        "filterLabel": "Student Mentorship",
        "tone": "purple",
        "count": 7
      },
      {
        "id": "research",
        "name": "Research & Industry",
        "filterLabel": "Research & Industry",
        "tone": "amber",
        "count": 3
      },
      {
        "id": "skills",
        "name": "Skills, T&P & Staff",
        "filterLabel": "Skills, T&P & Staff",
        "tone": "rose",
        "count": 5
      },
      {
        "id": "governance",
        "name": "Governance & Sustainability",
        "filterLabel": "Governance & Green Initiatives",
        "tone": "emerald",
        "count": 9
      }
    ]
  },
  "empty": {
    "title": "No Initiatives Found",
    "body": "No IQAC initiatives matched your search keywords.",
    "resetLabel": "Reset Search Filters"
  },
  "banner": {
    "kicker": "Continuous Sustenance Cycle",
    "heading": "Institutional Quality Loop & Action Taken Reports (ATR)",
    "body": "Every IQAC initiative is systematically reviewed through periodic meetings, Academic & Administrative Audits (AAA), and formal Action Taken Reports submitted for NAAC AQAR compliance.",
    "stats": [
      {
        "label": "Active Initiatives",
        "value": "31"
      },
      {
        "label": "Quality Focus",
        "value": "100%"
      }
    ]
  },
  "initiatives": [
    {
      "text": "Introduction of new Courses and Postgraduate Courses.",
      "category": "academic",
      "icon": "GraduationCap",
      "categoryName": "Academic & Curriculum",
      "tone": "blue",
      "number": "01"
    },
    {
      "text": "Introduction of Certificate courses for bridging the gap and skill development.",
      "category": "academic",
      "icon": "Award",
      "categoryName": "Academic & Curriculum",
      "tone": "blue",
      "number": "02"
    },
    {
      "text": "Strategic planning and proper implementation of Academic Calendar for Effective delivery of Curriculum.",
      "category": "academic",
      "icon": "Calendar",
      "categoryName": "Academic & Curriculum",
      "tone": "blue",
      "number": "03"
    },
    {
      "text": "Semester wise teaching plan and research activities before start of semester.",
      "category": "academic",
      "icon": "BookOpen",
      "categoryName": "Academic & Curriculum",
      "tone": "blue",
      "number": "04"
    },
    {
      "text": "Special emphasis on Problem based, pace adjusted, Self-directed learning.",
      "category": "academic",
      "icon": "Target",
      "categoryName": "Academic & Curriculum",
      "tone": "blue",
      "number": "05"
    },
    {
      "text": "Mentors for motivating Fast, Average and Slow learners.",
      "category": "mentorship",
      "icon": "Users",
      "categoryName": "Student Mentorship & Support",
      "tone": "purple",
      "number": "06"
    },
    {
      "text": "Review of student’s attendance and performance on Continuous basis.",
      "category": "mentorship",
      "icon": "BarChart3",
      "categoryName": "Student Mentorship & Support",
      "tone": "purple",
      "number": "07"
    },
    {
      "text": "Orientation programme for First Year students.",
      "category": "mentorship",
      "icon": "Compass",
      "categoryName": "Student Mentorship & Support",
      "tone": "purple",
      "number": "08"
    },
    {
      "text": "Strengthening of Mentor Mentee program and ensuring efficient mentoring system.",
      "category": "mentorship",
      "icon": "HeartHandshake",
      "categoryName": "Student Mentorship & Support",
      "tone": "purple",
      "number": "09"
    },
    {
      "text": "Effective Grievance redressal system.",
      "category": "mentorship",
      "icon": "ShieldCheck",
      "categoryName": "Student Mentorship & Support",
      "tone": "purple",
      "number": "10"
    },
    {
      "text": "PO and CO attainment evaluation measures.",
      "category": "academic",
      "icon": "BarChart3",
      "categoryName": "Academic & Curriculum",
      "tone": "blue",
      "number": "11"
    },
    {
      "text": "Regular feedback mechanism and students satisfaction focus.",
      "category": "governance",
      "icon": "MessageSquare",
      "categoryName": "Governance & Sustainability",
      "tone": "emerald",
      "number": "12"
    },
    {
      "text": "Promotion of research culture and innovation ecosystem.",
      "category": "research",
      "icon": "Cpu",
      "categoryName": "Research & Industry",
      "tone": "amber",
      "number": "13"
    },
    {
      "text": "Strengthening industry institute partnership through MoUs.",
      "category": "research",
      "icon": "Briefcase",
      "categoryName": "Research & Industry",
      "tone": "amber",
      "number": "14"
    },
    {
      "text": "Strengthening of Library and its resources on regular basis.",
      "category": "academic",
      "icon": "BookOpen",
      "categoryName": "Academic & Curriculum",
      "tone": "blue",
      "number": "15"
    },
    {
      "text": "Continuous motivation for Students representation in committees.",
      "category": "mentorship",
      "icon": "Users",
      "categoryName": "Student Mentorship & Support",
      "tone": "purple",
      "number": "16"
    },
    {
      "text": "Increasing student’s participation in activities.",
      "category": "mentorship",
      "icon": "TrendingUp",
      "categoryName": "Student Mentorship & Support",
      "tone": "purple",
      "number": "17"
    },
    {
      "text": "Strengthening programs for inculcating Soft skills and Employability skills.",
      "category": "skills",
      "icon": "Sparkles",
      "categoryName": "Skills, T&P & Staff",
      "tone": "rose",
      "number": "18"
    },
    {
      "text": "Active Training and Placement.",
      "category": "skills",
      "icon": "Briefcase",
      "categoryName": "Skills, T&P & Staff",
      "tone": "rose",
      "number": "19"
    },
    {
      "text": "Non-Teaching Staff Training for quality management.",
      "category": "skills",
      "icon": "Users",
      "categoryName": "Skills, T&P & Staff",
      "tone": "rose",
      "number": "20"
    },
    {
      "text": "Sports activities.",
      "category": "skills",
      "icon": "Trophy",
      "categoryName": "Skills, T&P & Staff",
      "tone": "rose",
      "number": "21"
    },
    {
      "text": "Proactive Alumni Association.",
      "category": "skills",
      "icon": "GraduationCap",
      "categoryName": "Skills, T&P & Staff",
      "tone": "rose",
      "number": "22"
    },
    {
      "text": "Hosting Seminars/ Conferences/ Workshops/ Faculty Development Programs on regular basis.",
      "category": "research",
      "icon": "Layers",
      "categoryName": "Research & Industry",
      "tone": "amber",
      "number": "23"
    },
    {
      "text": "Staff and student welfare measures.",
      "category": "governance",
      "icon": "HeartHandshake",
      "categoryName": "Governance & Sustainability",
      "tone": "emerald",
      "number": "24"
    },
    {
      "text": "Internal and External auditing.",
      "category": "governance",
      "icon": "FileText",
      "categoryName": "Governance & Sustainability",
      "tone": "emerald",
      "number": "25"
    },
    {
      "text": "Regular meetings of IQAC to discuss various measures related to quality enhancement.",
      "category": "governance",
      "icon": "ShieldCheck",
      "categoryName": "Governance & Sustainability",
      "tone": "emerald",
      "number": "26"
    },
    {
      "text": "Promotion of environment ecosystem restoration awareness and activities.",
      "category": "governance",
      "icon": "Leaf",
      "categoryName": "Governance & Sustainability",
      "tone": "emerald",
      "number": "27"
    },
    {
      "text": "Strengthening Energy and Water conservation measures.",
      "category": "governance",
      "icon": "Zap",
      "categoryName": "Governance & Sustainability",
      "tone": "emerald",
      "number": "28"
    },
    {
      "text": "Celebration of national events/ Days/ Festivals.",
      "category": "governance",
      "icon": "Globe2",
      "categoryName": "Governance & Sustainability",
      "tone": "emerald",
      "number": "29"
    },
    {
      "text": "Website updation on continuous basis.",
      "category": "governance",
      "icon": "Globe2",
      "categoryName": "Governance & Sustainability",
      "tone": "emerald",
      "number": "30"
    },
    {
      "text": "Review the online and offline feedback received from the students and stakeholders with necessary action.",
      "category": "governance",
      "icon": "MessageSquare",
      "categoryName": "Governance & Sustainability",
      "tone": "emerald",
      "number": "31"
    }
  ],
  "initiativeCount": 31
};

function isUsable(value: unknown): value is IqacInitiativesContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<IqacInitiativesContent>;
  return (
    Array.isArray(c.initiatives) &&
    c.initiatives.length > 0 &&
    Array.isArray(c.filters?.categories) &&
    c.filters.categories.length > 0
  );
}

export function useIqacInitiativesContent(): IqacInitiativesContent {
  const [content, setContent] = useState<IqacInitiativesContent>(DEFAULT_IQAC_INITIATIVES);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/iqac/initiatives"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.iqacInitiatives)) setContent(body.iqacInitiatives);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
