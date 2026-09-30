import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * About Us → Governance & Leadership → Deans and Faculty In-charges.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down.
 */
export interface DeansFilter {
  id: string;
  label: string;
}

export interface DeansMember {
  name: string;
  role: string;
  qualification: string;
  portfolio: string;
  /** Empty hides the mail buttons. */
  email: string;
  /** Empty means no photo; the page draws initials. */
  image: string;
  /** Shows the award badge on the photo. */
  featured: boolean;
  /** Ids of the filter tabs this member appears under, besides All. */
  filters: string[];
  bio: string;
  officeHours: string;
  publications: string;
}

export interface DeansContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: { badge: string; title: string; body: string };
  allLabel: string;
  searchPlaceholder: string;
  filters: DeansFilter[];
  members: DeansMember[];
}

export const DEFAULT_DEANS: DeansContent = {
  pageTitle: "Deans and Faculty In-charges",
  pageSubtitle: "Academic and administrative leadership at C. K. Pithawalla Institute of Pharmaceutical Science & Research.",
  intro: {
    badge: "Academic Council",
    title: "Deans & Portfolio In-charges",
    body: "The esteemed faculty members listed below form the core Academic Council for the year 2024-2025, overseeing research, regulatory compliance, and curricula excellence."
  },
  allLabel: "All Council",
  searchPlaceholder: "Search council member...",
  filters: [
    {
      id: "admin",
      label: "Executive Admin"
    },
    {
      id: "research",
      label: "Research & SSIP"
    },
    {
      id: "welfare",
      label: "Welfare & Ops"
    }
  ],
  members: [
    {
      name: "Dr. Dhiren Shah",
      role: "Chairperson & Principal",
      qualification: "M.PHARM, MBA, PGDIPR, Ph.D.",
      portfolio: "Professor of Pharmaceutics. Manages overall administrative directives, research boards, and university alignments.",
      email: "dhiren.shah@ckpipsr.ac.in",
      image: "/images/faculty/dhiren-p-shah.jpg",
      featured: true,
      filters: [
        "admin"
      ],
      bio: "Dr. Dhiren P. Shah is a distinguished academic leader with over 25 years of profound teaching and research experience in Pharmaceutics. Under his principalship, CKPIPSR has obtained critical accreditations, outcome-based syllabus integration, and robust placement programs. He is an approved Ph.D. supervisor at Gujarat Technological University and has published over 90 papers in peer-reviewed journals.",
      officeHours: "Monday to Friday: 11:00 AM - 1:00 PM",
      publications: "95+ Peer Reviewed Publications | 3 Authored Textbooks"
    },
    {
      name: "Dr. Bhumika Desai",
      role: "Member Secretary",
      qualification: "M.PHARM, Ph.D.",
      portfolio: "Associate Professor in Pharmaceutics. Formulates structural curricula plans, statutory agendas, and academic filings.",
      email: "bhumika.desai@ckpipsr.ac.in",
      image: "/images/faculty/bhumika-c-desai.jpg",
      featured: false,
      filters: [
        "admin"
      ],
      bio: "Dr. Bhumika Desai oversees curriculum execution, university liaison, and continuous assessment schemes. With 16+ years of expertise in Pharmaceutics, she coordinates PCI compliance and serves as Member Secretary of the Academic Council, steering student-centric educational standards.",
      officeHours: "Tuesday and Thursday: 2:00 PM - 4:00 PM",
      publications: "18+ Research Papers | 1 Patent Filed"
    },
    {
      name: "Dr. Vinod Ramani",
      role: "Academic Coordinator",
      qualification: "M.PHARM, Ph.D.",
      portfolio: "Associate Professor in Pharmaceutics. Spearheads daily class timetables, teaching matrices, and session planning.",
      email: "vinod.ramani@ckpipsr.ac.in",
      image: "/images/faculty/vinod-d-ramani.jpg",
      featured: false,
      filters: [
        "admin"
      ],
      bio: "Dr. Vinod Ramani is a veteran in Pharmaceutics and academic administration. He directs the complex scheduling matrix, academic timetables, and resource distributions for D.Pharm, B.Pharm, and M.Pharm courses, assuring structured training programs.",
      officeHours: "Wednesday and Friday: 10:00 AM - 12:00 PM",
      publications: "12+ National Publications | 2 Research Grants"
    },
    {
      name: "Dr. Dipayan Tarafder",
      role: "Examination In-charge",
      qualification: "M.PHARM, Ph.D. (Pursuing)",
      portfolio: "Assistant Professor in Pharmacology. Oversees internal evaluations, final examinations, and continuous grading models.",
      email: "dipayan.tarafder@ckpipsr.ac.in",
      image: "/images/faculty/dipayan-tarafder.jpg",
      featured: false,
      filters: [
        "admin"
      ],
      bio: "Dr. Dipayan Tarafder supervises continuous evaluation structures, internal testing operations, and board examination coordination. In pharmacology, his research guides student safety profiles and experimental clinical models.",
      officeHours: "Monday to Wednesday: 3:00 PM - 5:00 PM",
      publications: "8+ International Papers | GTU Certified Examiner"
    },
    {
      name: "Mr. Yahya Moolla",
      role: "SSIP Coordinator",
      qualification: "M.PHARM",
      portfolio: "Assistant Professor in Pharmaceutics. Head coordinator for the Student Startup & Innovation Policy funding portal.",
      email: "yahya.moolla@ckpipsr.ac.in",
      image: "/images/faculty/yahya-ali-moolla.jpg",
      featured: false,
      filters: [
        "research"
      ],
      bio: "Mr. Yahya Moolla is a passionate promoter of student entrepreneurship. As the nodal officer for the Student Startup and Innovation Policy (SSIP), he manages government pre-incubation grants, prototype evaluation, and intellectual property awareness bootcamps.",
      officeHours: "Daily: 3:30 PM - 5:00 PM",
      publications: "5+ Research Presentations | 14 SSIP Startups Guided"
    },
    {
      name: "Mrs. Prakruti Jadav",
      role: "IIC Coordinator",
      qualification: "M.PHARM",
      portfolio: "Assistant Professor in Pharmaceutics. Manages the Institutional Innovation Council (IIC) to nurture research ideas.",
      email: "prakruti.jadav@ckpipsr.ac.in",
      image: "/images/faculty/prakruti-p-gotawala.jpg",
      featured: false,
      filters: [
        "research"
      ],
      bio: "Mrs. Prakruti Jadav directs the Ministry of Education's Institutional Innovation Council (IIC) at the campus. She specializes in design thinking, problem-solving workshops, and hackathons that inspire young minds to invent new medical technologies.",
      officeHours: "Tuesday and Thursday: 11:30 AM - 1:30 PM",
      publications: "4+ Academic Posters | 3 Ministry of Education Awards"
    },
    {
      name: "Dr. Shuchi Desai",
      role: "Research Committee In-charge",
      qualification: "M.PHARM, Ph.D.",
      portfolio: "Assistant Professor in Pharmachemistry. Overviews intellectual property filings, grants submissions, and patents.",
      email: "shuchi.desai@ckpipsr.ac.in",
      image: "/images/faculty/shuchi-p-desai.jpg",
      featured: false,
      filters: [
        "research"
      ],
      bio: "Dr. Shuchi Desai oversees the institutional scientific advisory and research publications committee. She specializes in pharmaceutical chemistry, supervising patent filings, thesis reviews, and external research grants from various public departments.",
      officeHours: "Monday and Thursday: 2:00 PM - 4:00 PM",
      publications: "22+ International Journals | 1 Granted Patent"
    },
    {
      name: "Mrs. Monika Kakadiya",
      role: "Women Development Coordinator",
      qualification: "M.PHARM",
      portfolio: "Assistant Professor in Pharmachemistry. Leads the Women Development Cell (WDC) and coordinates safety audits.",
      email: "monika.kakadiya@ckpipsr.ac.in",
      image: "/images/faculty/monika-t-kyada.jpg",
      featured: false,
      filters: [
        "welfare"
      ],
      bio: "Mrs. Monika Kakadiya handles critical gender equality policies and safety compliance as Women Development Coordinator. She designs defense workshops, health camps, and leadership courses tailored for women scholars.",
      officeHours: "Wednesday and Friday: 2:30 PM - 4:30 PM",
      publications: "6+ Specialized Pharmacognosy Presentations"
    },
    {
      name: "Dr. Naishadh Solanki",
      role: "Extracurricular Coordinator",
      qualification: "M.PHARM, Ph.D.",
      portfolio: "Assistant Professor in Pharmachemistry. Guides the Hobby Club, annual sports tournament, and cultural festivals.",
      email: "naishadh.solanki@ckpipsr.ac.in",
      image: "/images/faculty/naishadh-i-solanki.jpg",
      featured: false,
      filters: [
        "welfare"
      ],
      bio: "Dr. Naishadh Solanki coordinates student clubs, campus sports, and the prestigious annual youth festival. He ensures a thriving campus culture that balances intellectual rigor with creative, physical, and holistic team pursuits.",
      officeHours: "Daily: 4:00 PM - 5:00 PM",
      publications: "10+ Research Publications | 4 Sports Tournament Laurels"
    },
    {
      name: "Mrs. Mansi Gandhi",
      role: "Clinical Pharmacology In-charge",
      qualification: "M.PHARM",
      portfolio: "Assistant Professor in Pharmacology. Mentors clinical pharmacy modules, hospital ward practicals, and pharmacology labs.",
      email: "mansi.gandhi@ckpipsr.ac.in",
      image: "https://ckpipsr.ac.in/images/about/mansi-gandhi.png",
      featured: false,
      filters: [
        "welfare"
      ],
      bio: "Mrs. Mansi Gandhi mentors advanced pharmacology modules and hospital ward residencies. Her clinical instruction ensures that students transition seamlessly from theoretical pharmacology to direct patient care and medication safety audits.",
      officeHours: "Monday to Thursday: 10:00 AM - 12:00 PM",
      publications: "7+ Clinical Trial Studies | 2 Pharmacy Practice Guideline Monographs"
    }
  ]
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is DeansContent {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Partial<DeansContent>;
  return (
    Array.isArray(d.filters) &&
    Array.isArray(d.members) &&
    d.members.length > 0 &&
    d.members.every((m) => Array.isArray(m?.filters))
  );
}

export function useDeansContent(): DeansContent {
  const [content, setContent] = useState<DeansContent>(DEFAULT_DEANS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/deans"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.deans)) setContent(body.deans);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
