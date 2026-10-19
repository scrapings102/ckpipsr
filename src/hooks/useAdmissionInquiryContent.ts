import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";
import { fillFieldText, fillRequired, type FieldText } from "../utils/requiredFields";

/**
 * Admissions → Admission inquiry page, as edited in the admin panel.
 *
 * Only the page's own wording. The session in the hero comes from the
 * Admissions band (useAdmissionsContent), the programmes from Courses Offered
 * (useCourses), and the phone, email and office hours from Contact Us
 * (useContactContent), so each is typed once.
 *
 * The defaults are what the page shipped with, so it renders and the form
 * still sends with the content API down.
 */
export interface AdmissionInquiryCard {
  title: string;
  line: string;
}

/** The inquiry form's boxes, by the name the API uses for each. */
export type AdmissionInquiryField =
  | "fullName"
  | "email"
  | "mobile"
  | "city"
  | "programme"
  | "academicYear"
  | "qualification"
  | "boardStream"
  | "topics"
  | "contactMethod"
  | "bestTime"
  | "heardFrom"
  | "message";

export interface AdmissionInquiryContent {
  heroLabel: string;
  title: string;
  subtitle: string;
  cards: { details: AdmissionInquiryCard; course: AdmissionInquiryCard; enquiry: AdmissionInquiryCard };
  topics: string[];
  yearOptions: string[];
  qualificationOptions: string[];
  /** None leaves the question off the form. */
  hearAboutOptions: string[];
  /** None leaves the question off the form. */
  bestTimeOptions: string[];
  consent: string;
  submitLabel: string;
  /** Rich text: <strong>, <em>, <u> and <a href>. */
  note: string;
  contactLine: string;
  officeHoursLabel: string;
  success: { heading: string; body: string };
  /** True where the form will not send with the box left empty (topics: at least one). */
  requiredFields: Record<AdmissionInquiryField, boolean>;
  /** What each box is called and the hint inside it. The form adds the required star or "(Optional)" itself. */
  fieldText: Record<AdmissionInquiryField, FieldText>;
}

export const DEFAULT_ADMISSION_INQUIRY: AdmissionInquiryContent = {
  heroLabel: "Admissions",
  title: "Admission Inquiry",
  subtitle:
    "Tell us which programme you are interested in and the admissions office will get in touch with you.",
  cards: {
    details: { title: "Your details", line: "So that the admissions office knows who to reply to." },
    course: { title: "Course of interest", line: "The programme and the year you are thinking about." },
    enquiry: { title: "Inquiry details", line: "What you would like to know and how we should contact you." },
  },
  topics: [
    "Eligibility",
    "Admission process",
    "Fees",
    "Scholarships",
    "Hostel",
    "Transport",
    "Documents required",
    "Campus visit",
  ],
  yearOptions: ["2026-27", "2027-28"],
  qualificationOptions: [
    "12th Science (studying)",
    "12th Science (passed)",
    "D.Pharm",
    "B.Pharm",
    "M.Pharm",
    "Other",
  ],
  hearAboutOptions: [
    "Friends or family",
    "School or teacher",
    "A current or former student",
    "Social media",
    "Newspaper",
    "Website or search engine",
    "Other",
  ],
  bestTimeOptions: ["Morning", "Afternoon", "Any time during office hours"],
  consent: "I agree that CKPIPSR may contact me by phone, WhatsApp or email about this inquiry.",
  submitLabel: "Send inquiry",
  note: 'Sending this inquiry is not an application for admission. Admissions to our D.Pharm, B.Pharm and M.Pharm (Pharmaceutics) programs are conducted according to the eligibility criteria, merit guidelines, and centralized admission committee for professional courses (<a href="https://gujacpc.admissions.nic.in/">ACPC</a>).',
  contactLine: "Prefer to talk to someone? Call or write to the institute.",
  officeHoursLabel: "Office hours",
  success: {
    heading: "Thank you, your inquiry has been sent.",
    body: "Please keep this reference. The admissions office will contact you in the way you chose.",
  },
  // What the form asked for before this could be set.
  requiredFields: {
    fullName: true,
    email: true,
    mobile: true,
    city: false,
    programme: true,
    academicYear: true,
    qualification: true,
    boardStream: false,
    topics: true,
    contactMethod: true,
    bestTime: false,
    heardFrom: false,
    message: false,
  },
  // The words each form showed before they were editable.
  fieldText: {
    fullName: { label: "Full name", placeholder: "" },
    email: { label: "Email", placeholder: "name@example.com" },
    mobile: { label: "Mobile number", placeholder: "" },
    city: { label: "City", placeholder: "" },
    programme: { label: "Programme", placeholder: "Choose a programme" },
    academicYear: { label: "Intended academic year", placeholder: "Choose a year" },
    qualification: { label: "Current qualification", placeholder: "Choose your qualification" },
    boardStream: { label: "Board or stream", placeholder: "For example GSEB, Science" },
    topics: { label: "What would you like to know about?", placeholder: "" },
    contactMethod: { label: "Preferred contact method", placeholder: "" },
    bestTime: { label: "Best time to reach you", placeholder: "No preference" },
    heardFrom: { label: "How did you hear about us?", placeholder: "Choose one" },
    message: { label: "Message", placeholder: "Anything else you would like to ask" }
  },
};

const isLines = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((line) => typeof line === "string");

const isCard = (value: unknown): value is AdmissionInquiryCard =>
  typeof (value as AdmissionInquiryCard | undefined)?.title === "string" &&
  typeof (value as AdmissionInquiryCard).line === "string";

function isUsable(value: unknown): value is AdmissionInquiryContent {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<AdmissionInquiryContent>;
  return (
    typeof v.heroLabel === "string" &&
    typeof v.title === "string" &&
    typeof v.subtitle === "string" &&
    isCard(v.cards?.details) &&
    isCard(v.cards?.course) &&
    isCard(v.cards?.enquiry) &&
    isLines(v.topics) &&
    v.topics.length > 0 &&
    isLines(v.yearOptions) &&
    isLines(v.qualificationOptions) &&
    isLines(v.hearAboutOptions) &&
    isLines(v.bestTimeOptions) &&
    typeof v.consent === "string" &&
    typeof v.submitLabel === "string" &&
    typeof v.note === "string" &&
    typeof v.success?.heading === "string"
  );
}

export function useAdmissionInquiryContent(): AdmissionInquiryContent {
  const [content, setContent] = useState<AdmissionInquiryContent>(DEFAULT_ADMISSION_INQUIRY);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/admissions/inquiry"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.admissionInquiry)) {
          setContent({
            ...body.admissionInquiry,
            requiredFields: fillRequired(
              DEFAULT_ADMISSION_INQUIRY.requiredFields,
              body.admissionInquiry.requiredFields,
            ),
            fieldText: fillFieldText(DEFAULT_ADMISSION_INQUIRY.fieldText, body.admissionInquiry.fieldText),
          });
        }
      })
      // The page does not depend on the content API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
