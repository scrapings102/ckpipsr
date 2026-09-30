import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Students Corner → Student Help Desk.
 *
 * The page is mostly a form, so most of what this returns is what the form
 * offers: the categories an issue may be filed under, the courses, the
 * semesters and the priorities. The shipped copy below is what the page held
 * before it was editable, so the desk still works with the API down — only the
 * sending of a ticket needs the server, and it says so when it cannot reach it.
 */
export interface HelpDeskPriority {
  value: string;
  label: string;
  /** What the confirmation screen promises at this priority. */
  sla: string;
}

export interface HelpDeskFaq {
  id: string;
  category: string;
  question: string;
  answer: string;
  steps: string[];
}

export interface HelpDeskForm {
  id: string;
  title: string;
  category: string;
  size: string;
  description: string;
  fileName: string;
  link: string;
  /** Worked out by the API: the link, or /documents/<file name>. */
  href: string;
}

export interface HelpDeskOfficer {
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  office: string;
}

/** One step of the tracking timeline: a ticket status, in the student's words. */
export interface HelpDeskStage {
  status: string;
  title: string;
  note: string;
}

export interface HelpDeskContent {
  pageTitle: string;
  pageSubtitle: string;
  form: {
    personal: { heading: string; blurb: string };
    issue: { heading: string; blurb: string };
    attachment: { heading: string; blurb: string; hint: string };
    categories: string[];
    courses: string[];
    semesters: string[];
    priorities: HelpDeskPriority[];
    defaultPriority: string;
    consent: string;
    submitLabel: string;
    trackLabel: string;
  };
  success: { heading: string; lead: string; note: string; defaultOfficer: string };
  track: {
    heading: string;
    blurb: string;
    referenceLabel: string;
    emailLabel: string;
    buttonLabel: string;
    stages: HelpDeskStage[];
  };
  faqs: { heading: string; blurb: string; items: HelpDeskFaq[] };
  forms: { heading: string; blurb: string; items: HelpDeskForm[] };
  directory: { heading: string; blurb: string; officers: HelpDeskOfficer[] };
  /** The categories the questions use, worked out by the API. */
  faqCategories: string[];
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_HELP_DESK: HelpDeskContent = {
  "pageTitle": "Student Help Desk Portal",
  "pageSubtitle": "Submit support requests, track ticket status, download official application forms, and search student FAQs.",
  "form": {
    "personal": {
      "heading": "Personal & Academic Details",
      "blurb": "Tell us who you are so our administrative section can reach you."
    },
    "issue": {
      "heading": "Issue Details & Priority",
      "blurb": "Describe your inquiry clearly so we can route it directly to the responsible section officer."
    },
    "attachment": {
      "heading": "Attach Supporting Document",
      "blurb": "Optional. Screenshots, GTU payment receipts, or fee slips help speed up verification.",
      "hint": "Supports PDF, JPG, PNG, WEBP up to 10 MB"
    },
    "categories": [
      "Examination & Results (GTU Re-checking, Marksheets)",
      "Fees & Payment Receipts",
      "Scholarship Verification (Digital Gujarat, MYSY, NSP)",
      "Certificates & Transcripts (Bonafide, NOC, Leaving Cert)",
      "Attendance & Academic Records",
      "Library & E-Resource Access",
      "Hostel & Campus Bus Transport",
      "Website & IT Portal Access",
      "Other General Enquiry"
    ],
    "courses": [
      "B.Pharm (Bachelor of Pharmacy)",
      "M.Pharm (Pharmaceutics)",
      "D.Pharm (Diploma in Pharmacy)"
    ],
    "semesters": [
      "Semester 1",
      "Semester 2",
      "Semester 3",
      "Semester 4",
      "Semester 5",
      "Semester 6",
      "Semester 7",
      "Semester 8",
      "Passout / Alumni"
    ],
    "priorities": [
      {
        "value": "Low",
        "label": "Low – General Query",
        "sla": "Within 3-4 Working Days"
      },
      {
        "value": "Medium",
        "label": "Medium – Standard Inquiry",
        "sla": "Within 24-48 Hours"
      },
      {
        "value": "High",
        "label": "High – Needs Attention Soon",
        "sla": "Within 24 Hours"
      },
      {
        "value": "Urgent",
        "label": "Urgent – Exam / Scholarship Deadline",
        "sla": "Same Working Day"
      }
    ],
    "defaultPriority": "Medium",
    "consent": "I confirm that the information provided is accurate and complete. I understand that submitting false or duplicate requests may delay response time.",
    "submitLabel": "Submit Support Ticket",
    "trackLabel": "Track Existing Ticket"
  },
  "success": {
    "heading": "Support Ticket Successfully Registered!",
    "lead": "Your ticket has been logged into the student portal system.",
    "note": "Keep this reference safe — you will need it, along with the email address above, to track your ticket.",
    "defaultOfficer": "Nodal Student Officer (Room 102)"
  },
  "track": {
    "heading": "Track Your Support Ticket",
    "blurb": "Enter the reference ID from your confirmation along with the email address the ticket was raised with.",
    "referenceLabel": "Ticket Reference ID",
    "emailLabel": "Email Used on the Ticket",
    "buttonLabel": "Check Status",
    "stages": [
      {
        "status": "Submitted",
        "title": "Ticket Submitted & Registered",
        "note": "Support ticket reference generated and logged into the helpdesk registry."
      },
      {
        "status": "Under Review",
        "title": "Verification by Department In-Charge",
        "note": "Ticket read and routed to the responsible section officer."
      },
      {
        "status": "In Progress",
        "title": "Processing & Resolution",
        "note": "The section is working on the request."
      },
      {
        "status": "Resolved",
        "title": "Resolved & Student Notified",
        "note": "The outcome has been recorded below."
      },
      {
        "status": "Closed",
        "title": "Ticket Closed",
        "note": "Nothing further is pending on this request."
      }
    ]
  },
  "faqs": {
    "heading": "Frequently Asked Questions",
    "blurb": "Search the knowledge base before raising a ticket — most routine requests are answered here.",
    "items": [
      {
        "id": "faq-1",
        "category": "Certificates",
        "question": "How do I obtain a Bonafide Certificate or Character Certificate?",
        "answer": "You can request a Bonafide or Character Certificate by submitting a ticket online or visiting the Student Section (Room 102). Processing takes 1 to 2 working days.",
        "steps": [
          "Fill out the online ticket form or download the Bonafide Application PDF from this page.",
          "Attach your latest semester fee receipt and Student ID card copy.",
          "Collect your stamped certificate from Room 102 during office hours (9 AM - 4 PM)."
        ]
      },
      {
        "id": "faq-2",
        "category": "Examination",
        "question": "What is the procedure for GTU Re-assessment / Re-checking of marks?",
        "answer": "GTU re-assessment forms must be submitted within 7 days of GTU result declaration via the GTU student portal.",
        "steps": [
          "Log into your GTU Student Portal (student.gtu.ac.in).",
          "Apply for Re-assessment / Re-checking and pay the GTU prescribed online fee.",
          "Submit a copy of the payment receipt to the CKPIPSR Exam Cell or raise a ticket here for confirmation."
        ]
      },
      {
        "id": "faq-3",
        "category": "Scholarships & Fees",
        "question": "How do I get my Digital Gujarat / MYSY Scholarship documents verified?",
        "answer": "Scholarship verification is handled by the Student Welfare Desk on the Ground Floor.",
        "steps": [
          "Complete your application on the Digital Gujarat portal or MYSY web portal.",
          "Print the completed application and attach required income, caste, and Marksheet photocopies.",
          "Submit physical copies at Room 102 for nodal officer digital sign verification."
        ]
      },
      {
        "id": "faq-4",
        "category": "Scholarships & Fees",
        "question": "My online fee payment failed but money was deducted. What should I do?",
        "answer": "Online payment gateways usually auto-reconcile failed transactions within 24 to 48 hours. If the status remains unpaid, raise a ticket under Fees & Payments with your Transaction Ref ID.",
        "steps": [
          "Check your bank statement for UTR / Reference Number.",
          "Do not make a double payment immediately if the bank account was debited.",
          "Raise a ticket with subject \"Payment Deducted but Receipt Pending\" attaching the bank screenshot."
        ]
      },
      {
        "id": "faq-5",
        "category": "Library",
        "question": "How do I reset my GTU E-Library / DELNET login credentials?",
        "answer": "E-Library access is managed by the Central Library. Send your Student Roll Code and official email to library@ckpipsr.ac.in or raise a ticket under Library & E-Resource Access.",
        "steps": [
          "Select \"Library & E-Resource Access\" in the ticket category.",
          "Provide your Roll Code, Course, and Semester.",
          "The librarian will dispatch reset credentials to your registered email within 24 hours."
        ]
      },
      {
        "id": "faq-6",
        "category": "General",
        "question": "What is the minimum GTU attendance requirement for appearing in end-sem exams?",
        "answer": "As per Gujarat Technological University (GTU) & PCI norms, a minimum of 75% attendance is compulsory in lectures and practicals to be eligible for term grant and university exams.",
        "steps": [
          "Students with medical emergencies must submit medical certificates within 3 days of resuming college.",
          "Submit medical leave applications approved by HOD to the Student Section."
        ]
      }
    ]
  },
  "forms": {
    "heading": "Official Student Application Forms",
    "blurb": "Download standard institutional application formats for bonafide certificates, transcripts, GTU re-assessment, and leaving clearances.",
    "items": [
      {
        "id": "form-1",
        "title": "Bonafide Certificate Application Form",
        "category": "Certificates",
        "size": "145 KB",
        "description": "Official application format for passport, bank account, or scholarship bonafide certificate.",
        "fileName": "CKPIPSR_Bonafide_Application_Form.pdf",
        "link": "",
        "href": "/documents/CKPIPSR_Bonafide_Application_Form.pdf"
      },
      {
        "id": "form-2",
        "title": "Academic Transcript & Verification Request",
        "category": "GTU & Academics",
        "size": "210 KB",
        "description": "Form for requesting official college transcripts for higher studies WES / Foreign evaluation.",
        "fileName": "CKPIPSR_Transcript_Request_Form.pdf",
        "link": "",
        "href": "/documents/CKPIPSR_Transcript_Request_Form.pdf"
      },
      {
        "id": "form-3",
        "title": "No Dues & Leaving Certificate Clearance Form",
        "category": "Administrative",
        "size": "180 KB",
        "description": "Clearance form for library, lab equipment, hostel, and fee accounts required for LC issuance.",
        "fileName": "CKPIPSR_NoDues_Clearance_Form.pdf",
        "link": "",
        "href": "/documents/CKPIPSR_NoDues_Clearance_Form.pdf"
      },
      {
        "id": "form-4",
        "title": "Duplicate Student ID Card Request Form",
        "category": "Student Welfare",
        "size": "120 KB",
        "description": "Application for re-issuance of lost or damaged smart RFID Student Identity Card.",
        "fileName": "CKPIPSR_Duplicate_ID_Card_Form.pdf",
        "link": "",
        "href": "/documents/CKPIPSR_Duplicate_ID_Card_Form.pdf"
      },
      {
        "id": "form-5",
        "title": "Medical Leave & Attendance Exemption Form",
        "category": "Academic Welfare",
        "size": "160 KB",
        "description": "Form to apply for medical leave approval along with doctor certificate and parent signature.",
        "fileName": "CKPIPSR_Medical_Leave_Form.pdf",
        "link": "",
        "href": "/documents/CKPIPSR_Medical_Leave_Form.pdf"
      },
      {
        "id": "form-6",
        "title": "GTU Exam Re-assessment Application",
        "category": "Examination",
        "size": "195 KB",
        "description": "Form for requesting institutional endorsement for GTU re-assessment and re-checking.",
        "fileName": "CKPIPSR_GTU_Reassessment_Form.pdf",
        "link": "",
        "href": "/documents/CKPIPSR_GTU_Reassessment_Form.pdf"
      }
    ]
  },
  "directory": {
    "heading": "Institutional Nodal Officers & Desk In-Charges",
    "blurb": "Direct contact directory for academic, examination, scholarship, and student grievance inquiries.",
    "officers": [
      {
        "name": "Dr. Dhiren P. Shah",
        "designation": "Principal & Appellate Grievance Officer",
        "department": "Institutional Administration",
        "email": "principal@ckpipsr.ac.in",
        "phone": "+91 (0261) 2727123 Ext. 101",
        "office": "Principal Office, 1st Floor, Main Academic Building"
      },
      {
        "name": "Prof. Exam In-Charge",
        "designation": "Controller of Examinations (GTU Cell)",
        "department": "Examination & University Evaluation Section",
        "email": "exam@ckpipsr.ac.in",
        "phone": "+91 (0261) 2727123 Ext. 104",
        "office": "Exam Control Room 104, Ground Floor"
      },
      {
        "name": "Head of Student Affairs",
        "designation": "Nodal Officer (Scholarships & Certificates)",
        "department": "Student Welfare Section",
        "email": "students@ckpipsr.ac.in",
        "phone": "+91 (0261) 2727123 Ext. 102",
        "office": "Student Helpdesk Wing, Room 102, Ground Floor"
      },
      {
        "name": "Accounts & Finance Officer",
        "designation": "Senior Accountant & Fee Manager",
        "department": "Accounts & Finance Department",
        "email": "accounts@ckpipsr.ac.in",
        "phone": "+91 (0261) 2727123 Ext. 103",
        "office": "Accounts Office, Room 103, Ground Floor"
      },
      {
        "name": "Central Librarian",
        "designation": "Head Librarian & E-Resource Administrator",
        "department": "Central Pharmacy Library",
        "email": "library@ckpipsr.ac.in",
        "phone": "+91 (0261) 2727123 Ext. 108",
        "office": "Central Library, 2nd Floor"
      },
      {
        "name": "Convenor, Grievance Cell (GRC)",
        "designation": "Head, Student Grievance Redressal Committee",
        "department": "GRC & Student Welfare",
        "email": "grc@ckpipsr.ac.in",
        "phone": "+91 (0261) 2727123 Ext. 105",
        "office": "GRC Office Room 105"
      }
    ]
  },
  "faqCategories": [
    "Certificates",
    "Examination",
    "Scholarships & Fees",
    "Library",
    "General"
  ]
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is HelpDeskContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<HelpDeskContent>;
  return (
    Array.isArray(c.form?.categories) &&
    c.form.categories.length > 0 &&
    Array.isArray(c.track?.stages) &&
    c.track.stages.length > 0 &&
    Array.isArray(c.faqs?.items)
  );
}

export function useStudentHelpDeskContent(): HelpDeskContent {
  const [content, setContent] = useState<HelpDeskContent>(DEFAULT_HELP_DESK);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/students/help-desk"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.helpDesk)) setContent(body.helpDesk);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
