import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The Admissions band on the homepage, as edited in the admin panel. The top
 * bar of every page reads the session and the open switch from here too, so
 * the year is typed once. With no email of its own, the band shows the first
 * one on Contact Us (useFooterContent).
 *
 * The defaults are what the band showed before it had an editor, so it looks
 * the same with the API down.
 */
export interface AdmissionsFaq {
  question: string;
  /** Rich text: <strong>, <em>, <u> and <a href>. */
  answer: string;
}

export interface AdmissionsContent {
  eyebrow: string;
  session: string;
  isOpen: boolean;
  heading: { lead: string; accent: string; end: string };
  body: string;
  applyLabel: string;
  /**
   * 'page' goes to the admission inquiry page. Missing, or 'popup' (the
   * choice's old name), means the same.
   */
  applyAction?: "page" | "popup" | "link";
  /** Where the button goes with 'link'. */
  applyUrl?: string;
  prospectusLabel: string;
  /** Empty hides the prospectus button. */
  prospectusUrl: string;
  faqTitle: string;
  faqIntro: string;
  /** None hides the FAQ card. */
  faqs: AdmissionsFaq[];
  contactLine: string;
  contactLabel: string;
  /** Missing shows the first email on Contact Us. */
  email?: string;
}

export const DEFAULT_ADMISSIONS: AdmissionsContent = {
  eyebrow: "Admissions",
  session: "2026-27",
  isOpen: true,
  heading: { lead: "Begin your journey to", accent: "leadership", end: "." },
  body: "Join a legacy of pharmacy professionals, healthcare innovators, researchers, and industry leaders. Admissions through Gujarat Technological University (GTU) centralized admission systems, along with our dedicated institutional assistance desks, are now fully open.",
  applyLabel: "Inquiry Now",
  prospectusLabel: "Download Prospectus",
  prospectusUrl: "",
  faqTitle: "Frequently Asked Questions",
  faqIntro:
    "Find fast, authoritative admissions coordination references gathered directly from institute registry advisors.",
  faqs: [
    {
      question: "How do I secure admission to the Pharmacy program?",
      answer:
        'Admissions to our D.Pharm, B.Pharm and M.Pharm (Pharmaceutics) programs are conducted according to the eligibility criteria, merit guidelines, and centralized admission committee for professional courses (<a href="https://gujacpc.admissions.nic.in/">ACPC</a>).',
    },
    {
      question: "What scholarship assistance schemes are currently available?",
      answer:
        "Eligible Pharmacy students can benefit from various government and institutional scholarship schemes, including MYSY (Mukhyamantri Yuva Swavalamban Yojana), Digital Gujarat scholarships, category-based financial assistance, and other applicable merit and need-based scholarship provisions.",
    },
    {
      question: "Does the college provide hostel or residential facilities?",
      answer:
        "Yes, students can access secure residential facilities with essential amenities, hygienic dining options, recreational spaces, safety measures, and a supportive academic environment designed to provide a comfortable campus experience.",
    },
    {
      question: "Are internships and practical training available for Pharmacy students?",
      answer:
        "Yes, students receive hands-on laboratory training along with opportunities for industrial exposure, internships, hospital or community pharmacy experience, and professional learning activities to prepare them for real-world pharmaceutical careers.",
    },
  ],
  contactLine: "Have specific queries regarding fee structures or management seats?",
  contactLabel: "Contact Registry Desk",
};

function isUsable(value: unknown): value is AdmissionsContent {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<AdmissionsContent>;
  return (
    typeof v.session === "string" &&
    typeof v.isOpen === "boolean" &&
    typeof v.heading?.lead === "string" &&
    typeof v.body === "string" &&
    Array.isArray(v.faqs) &&
    v.faqs.every((f) => typeof f?.question === "string" && typeof f.answer === "string")
  );
}

export function useAdmissionsContent(): AdmissionsContent {
  const [content, setContent] = useState<AdmissionsContent>(DEFAULT_ADMISSIONS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/home/admissions"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.admissions)) setContent(body.admissions);
      })
      // The band does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
