/**
 * Academics → Courses Offered: one course page's content, and what each of
 * the four courses shipped with. The pages are served inside the courses
 * collection — see useCourses.
 */
export interface CourseContent {
  pageTitle: string;
  pageSubtitle: string;
  banner: { image: string; badge: string; title: string; text: string };
  stats: { intake: string; duration: string; eligibility: string; fees: string };
  overview: string;
  objectives: { title: string; items: string[] };
  careers: { title: string; items: string[] };
  /** Blank links leave the buttons as plain, unlinked buttons. */
  integrity: {
    title: string;
    body: string;
    syllabusLabel: string;
    syllabusUrl: string;
    calendarLabel: string;
    calendarUrl: string;
  };
  feeCard: { title: string; label: string; note: string; buttonLabel: string; buttonUrl: string };
  notice: { title: string; body: string };
}

/** The sections every course page shipped with, word for word. */
export const SHARED_COURSE_SECTIONS: Pick<
  CourseContent,
  "objectives" | "careers" | "integrity" | "feeCard" | "notice"
> = {
  objectives: {
    title: "Core Objectives",
    items: [
      "Advanced drug development methodologies",
      "Pharmacological testing & validation",
      "Community pharmacy & patient care",
      "Regulatory compliance & ethics",
    ],
  },
  careers: {
    title: "Career Paths",
    items: ["Clinical Research Associate", "Quality Control Manager", "Regulatory Affairs Specialist", "Hospital Pharmacist"],
  },
  integrity: {
    title: "Academic Integrity & Research",
    body: "Our curriculum is strictly aligned with Pharmacy Council of India (PCI) standards and Gujarat Technological University (GTU) guidelines, ensuring global acceptance and academic rigour.",
    syllabusLabel: "Download Full Syllabus",
    syllabusUrl: "",
    calendarLabel: "View Academic Calendar",
    calendarUrl: "",
  },
  feeCard: {
    title: "Fee Structure",
    label: "Yearly Tuition",
    note: "Fees are subject to change as per FRC / PCI / State Government guidelines.",
    buttonLabel: "Inquire for Admission",
    buttonUrl: "",
  },
  notice: {
    title: "Admission Notice",
    body: "Candidates must have passed 10+2 with Physics, Chemistry and Biology/Maths from a recognized board for undergraduate programs.",
  },
};

export const DEFAULT_DPHARM: CourseContent = {
  pageTitle: "Diploma in Pharmacy",
  pageSubtitle: "D.Pharm — 2 Year Professional Diploma",
  banner: {
    image: "/images/hero/pharmacy_lab.jpg",
    badge: "Professional Program",
    title: "D.Pharm.",
    text: "Diploma in Pharmacy (Full Time) — Empowering the next generation of pharmacy leaders with specialized expertise.",
  },
  stats: {
    intake: "60 Seats",
    duration: "2 Years",
    eligibility: "Passed 10+2 examination with Physics, Chemistry and Biology/Mathematics",
    fees: "₹50,000 / Year",
  },
  overview:
    "The Diploma in Pharmacy (D.Pharm.) is a 2-year undergraduate diploma course designed to provide students with fundamental knowledge in pharmaceutical science, drug distribution, community pharmacy practice, and hospital pharmacy management.",
  ...SHARED_COURSE_SECTIONS,
};

const TAGLINE = " — Empowering the next generation of pharmacy leaders with specialized expertise.";

export const DEFAULT_BPHARM: CourseContent = {
  pageTitle: "Bachelor of Pharmacy",
  pageSubtitle: "B.Pharm — 4 Year Degree Program",
  banner: {
    image: "/images/hero/students_learning.jpg",
    badge: "Professional Program",
    title: "B.Pharm.",
    text: `Bachelor of Pharmacy (Full Time)${TAGLINE}`,
  },
  stats: {
    intake: "100 Seats",
    duration: "4 Years",
    eligibility: "As per ACPC / GTU Norms (10+2 Science with PCB/PCM)",
    fees: "₹85,995 (Subject to FRC)",
  },
  overview:
    "The B.Pharm course is an undergraduate degree program that provides comprehensive knowledge of pharmaceutical sciences, drug discovery, formulation, and clinical pharmacy, preparing students for diverse roles in the healthcare industry.",
  ...SHARED_COURSE_SECTIONS,
};

export const DEFAULT_MPHARM: CourseContent = {
  pageTitle: "Master of Pharmacy",
  pageSubtitle: "M.Pharm — 2 Year Postgraduate Research Program",
  banner: {
    image: "/images/hero/66e153e687221.webp",
    badge: "Professional Program",
    title: "M.Pharm.",
    text: `Master of Pharmacy (Full Time)${TAGLINE}`,
  },
  stats: {
    intake: "15 Seats",
    duration: "2 Years",
    eligibility: "B.Pharm with valid GPAT score / PGCET rank",
    fees: "₹1,31,250 (Subject to FRC)",
  },
  overview:
    "M.Pharm is a postgraduate program focused on advanced research and specialization. At CKPIPSR, we focus on producing researchers who can lead innovations in pharmaceutical formulation and quality assurance.",
  ...SHARED_COURSE_SECTIONS,
};

export const DEFAULT_CERTIFICATE: CourseContent = {
  pageTitle: "Short Term Certificate",
  pageSubtitle: "Industry Skill Development Program",
  banner: {
    image: "/images/hero/66e1522d09fc0.webp",
    badge: "Professional Program",
    title: "Certificate",
    text: `Pharmaceutical Dossier Preparation And Filing${TAGLINE}`,
  },
  stats: {
    intake: "100 Seats",
    duration: "60 Hours (8 weeks, Sat/Sun only, Online)",
    eligibility: "Pharmacy Students / Professionals",
    fees: "₹2,000 (Indian) / $50 USD (Overseas)",
  },
  overview:
    "A specialized intensive program focused on the regulatory aspects of drug filing, dossier preparation (CTD/eCTD formats), and international pharmaceutical compliance. Fees inclusive of certification and exam fees.",
  ...SHARED_COURSE_SECTIONS,
};

