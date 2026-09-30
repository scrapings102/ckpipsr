import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Training & Placement → Training.
 *
 * The cell's vision, the objectives of industrial training, and the committee
 * that runs it.
 *
 * A committee member arrives already worked out: one linked to the Deans and
 * Faculty In-charges page or to Faculties is named, titled and pictured from
 * it, and a member typed into this page is printed as typed. The page never
 * sees the link itself — only the card.
 *
 * The objectives' badge arrives with its number filled in, and the cards are
 * numbered by their order, so neither is a figure anybody keeps in step.
 */
export interface TrainingHighlight {
  kicker: string;
  title: string;
  body: string;
  icon: string;
  tone: string;
}

export interface TrainingObjective {
  tag: string;
  title: string;
  description: string;
  icon: string;
  tone: string;
  image: string;
}

export interface TrainingCommitteeMember {
  name: string;
  role: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  image: string;
}

export interface TrainingContent {
  pageTitle: string;
  pageSubtitle: string;
  overview: {
    kicker: string;
    heading: string;
    badges: string[];
    vision: { kicker: string; body: string };
    highlights: TrainingHighlight[];
  };
  objectives: {
    kicker: string;
    heading: string;
    /** Arrives with the number already in it. */
    countLabel: string;
    footerLabel: string;
    items: TrainingObjective[];
  };
  committee: {
    kicker: string;
    heading: string;
    chairNote: string;
    emailLabel: string;
    callLabel: string;
    members: TrainingCommitteeMember[];
  };
  office: { heading: string; body: string; notes: string[] };
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_TRAINING: TrainingContent = {
  "pageTitle": "Training",
  "pageSubtitle": "Training & Placement Cell – Industrial Training, Student Internships & Professional Development",
  "overview": {
    "kicker": "Training & Placement Cell",
    "heading": "Industrial Training & Practical Experience",
    "badges": [
      "Est. 2005 • South Gujarat",
      "Industry-Aligned Learning"
    ],
    "vision": {
      "kicker": "Vision & Institutional Commitment",
      "body": "C. K. Pithawala Institute of Pharmaceutical Science and Research Being a leading and renowned Pharmacy institute in south Gujarat zone since 2005. We have a vision Committed to promote high- quality education, training, and research in pharmacy to meet the needs of tomorrow’s healthy society. We believe that the End product of our educational system is students and we are always having a strong desire to prepare our students as per requirement of the industry. Therefore, during the study period, our schedule comprised of industrial visits /Industrial Experience /Training and as well as encourage to take part in various seminars/conferences to update them with advancement in the pharma sector."
    },
    "highlights": [
      {
        "kicker": "Industrial Exposure",
        "title": "Plant Visits & In-Plant Training",
        "body": "Direct engagement with cGMP-certified manufacturing and formulation units.",
        "icon": "Building2",
        "tone": "emerald"
      },
      {
        "kicker": "Seminars & Conferences",
        "title": "Academic & Technical Forums",
        "body": "Continuous knowledge updating through national & state pharmaceutical symposia.",
        "icon": "Microscope",
        "tone": "blue"
      },
      {
        "kicker": "Career Readiness",
        "title": "Industry-Ready Graduates",
        "body": "Hands-on skillset matching contemporary requirements of pharmaceutical recruiters.",
        "icon": "Award",
        "tone": "purple"
      }
    ]
  },
  "objectives": {
    "kicker": "Pedagogical Framework",
    "heading": "Objectives of Industrial Training",
    "countLabel": "6 Core Pillars",
    "footerLabel": "CKPIPSR Curricular Goal",
    "items": [
      {
        "tag": "Theory to Practice",
        "title": "Practical application of theoretical knowledge",
        "description": "Industrial training aims to bridge the gap between theoretical learning and practical implementation. It allows students to apply the knowledge and skills they have acquired during their academic studies in a real work environment.",
        "icon": "FlaskConical",
        "tone": "blue",
        "image": "/images/hero/pharmacy_lab.jpg"
      },
      {
        "tag": "Core Competency",
        "title": "Skill development",
        "description": "The training provides an opportunity for students to develop and enhance their technical, professional, and interpersonal skills. They can learn new techniques, tools, and methodologies relevant to their field of study, and acquire valuable industry-specific skills.",
        "icon": "Cpu",
        "tone": "emerald",
        "image": "/images/hero/students_learning.jpg"
      },
      {
        "tag": "Corporate Culture",
        "title": "Industry exposure and understanding",
        "description": "Industrial training offers students the chance to gain exposure to the industry they are interested in. They can observe and understand the organizational structure, work processes, and culture of the industry, as well as the roles and responsibilities of different professionals.",
        "icon": "Building2",
        "tone": "purple",
        "image": "/images/hero/66e153e687221.webp"
      },
      {
        "tag": "Professional Connect",
        "title": "Networking opportunities",
        "description": "During industrial training, students can establish connections and build relationships with professionals in their field of interest. These connections can be beneficial for future career prospects, such as obtaining references or job opportunities.",
        "icon": "Network",
        "tone": "amber",
        "image": "/images/hero/66e151f0d6a90.webp"
      },
      {
        "tag": "Workforce Readiness",
        "title": "Employability and career readiness",
        "description": "The overall objective of industrial training is to enhance the employability of students and prepare them for their future careers. By gaining practical experience and industry exposure, students become more attractive to potential employers and better equipped to enter the workforce.",
        "icon": "Briefcase",
        "tone": "emerald",
        "image": "/images/hero/66e154b724ef6.webp"
      },
      {
        "tag": "Personal Evolution",
        "title": "Self-assessment and personal growth",
        "description": "Industrial training provides a platform for students to assess their strengths, weaknesses, and areas for improvement. They can identify their interests and aptitudes, and gain valuable insights into their career preferences and goals.",
        "icon": "Compass",
        "tone": "rose",
        "image": "/images/hero/college_campus.jpg"
      }
    ]
  },
  "committee": {
    "kicker": "Executive Leadership",
    "heading": "Committee Members",
    "chairNote": "Head of Cell",
    "emailLabel": "Send Email",
    "callLabel": "Call",
    "members": [
      {
        "role": "Chairperson",
        "designation": "Principal",
        "department": "Institutional Leadership & Administration",
        "phone": "9427474602",
        "email": "dhiren.shah@ckpipsr.ac.in",
        "image": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a7d896865a1e.webp",
        "name": "Dr. Dhiren P. Shah"
      },
      {
        "role": "Coordinator",
        "designation": "Associate Professor",
        "department": "Department of Pharmaceutics",
        "phone": "9913792913",
        "email": "vinod.ramani@ckpipsr.ac.in",
        "image": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/63abcf6a28997.webp",
        "name": "Dr. Vinod D. Ramani"
      },
      {
        "role": "Member",
        "designation": "Assistant Professor",
        "department": "Department of Pharmaceutical Chemistry",
        "phone": "8733826684",
        "email": "suchi.desai@ckpipsr.ac.in",
        "image": "https://ckpipsr.ac.in/images/about/shuchi-desai.png",
        "name": "Dr. Suchi P. Desai"
      },
      {
        "role": "Member",
        "designation": "Assistant Professor",
        "department": "Department of Pharmaceutics",
        "phone": "7201932423",
        "email": "yahya.moolla@ckpipsr.ac.in",
        "image": "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/62d543b19366a.webp",
        "name": "Mr. Yahya A. Moolla"
      },
      {
        "role": "Member",
        "designation": "Assistant Professor",
        "department": "Department of Pharmacology",
        "phone": "9687198278",
        "email": "kinjal.gamit@ckpipsr.ac.in",
        "image": "https://ui-avatars.com/api/?name=Kinjal+Gamit&background=1a5d2e&color=ffffff&size=256",
        "name": "Ms. Kinjal S. Gamit"
      }
    ]
  },
  "office": {
    "heading": "Industrial Training Coordination Office",
    "body": "The Industrial Training Committee coordinates with recognized pharmaceutical companies for mandatory student summer internships, plant visits, and hands-on skill development programs. Students can consult coordinator Dr. Vinod D. Ramani and committee members for training allotment and certificates.",
    "notes": [
      "Training Cell: C.K. Pithawalla IP&SR Campus",
      "Timings: Mon - Sat, 9:00 AM to 5:00 PM"
    ]
  }
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is TrainingContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<TrainingContent>;
  return (
    Array.isArray(c.objectives?.items) &&
    c.objectives.items.length > 0 &&
    Array.isArray(c.committee?.members) &&
    Array.isArray(c.overview?.highlights)
  );
}

export function useTrainingContent(): TrainingContent {
  const [content, setContent] = useState<TrainingContent>(DEFAULT_TRAINING);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/tnp/training"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.training)) setContent(body.training);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
