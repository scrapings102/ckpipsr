import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * About Us → Governance & Leadership → Principal.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down.
 */
export interface PrincipalCredential {
  /** Names an icon in PrincipalLayout's map. */
  icon: string;
  label: string;
  value: string;
}

export interface PrincipalContent {
  pageTitle: string;
  pageSubtitle: string;
  /** qualifications: the line under the badge on the profile card. */
  portrait: { image: string; name: string; badge: string; qualifications: string };
  quote: string;
  credentials: PrincipalCredential[];
  contact: { label: string; email: string };
  message: { title: string; eyebrow: string; body: string[] };
  signature: { name: string; role: string; note: string };
}

export const DEFAULT_PRINCIPAL: PrincipalContent = {
  pageTitle: "Principal",
  pageSubtitle: "Address and greetings from our Principal, Dr. Dhiren P. Shah.",
  portrait: {
    image: "/images/faculty/dhiren-p-shah.jpg",
    name: "Dr. Dhiren P. Shah",
    badge: "Principal",
    qualifications: "PhD, M.Pharm, MBA, PGDIPR"
  },
  quote: "We are dedicated to producing competent, ethical pharmacy professionals who lead with innovation.",
  credentials: [
    {
      icon: "Mail",
      label: "Official Email",
      value: "dhiren.shah@ckpipsr.ac.in"
    },
    {
      icon: "Award",
      label: "Experience",
      value: "25+ Years in Higher Academics"
    },
    {
      icon: "GraduationCap",
      label: "University",
      value: "Gujarat Technological University"
    }
  ],
  contact: {
    label: "Contact Principal Desk",
    email: "dhiren.shah@ckpipsr.ac.in"
  },
  message: {
    title: "Message from the Principal",
    eyebrow: "From the Desk of the Principal",
    body: [
      "C. K. Pithawala Institute of Pharmaceutical Science & Research was established in a year 2005 with the total intake of 60 students with glorious standing. Institute is successfully running in the field of Pharmacy Education under the leadership of our honorable president Shri. C. K. Pithawalla.",
      "Today it has grown to one of the premier institute of the state with total approved intake of 400 students.",
      "The Institute is located in peaceful environment at Surat-Dumas road in Surat city. The Institute provides disciplined, conducive and professional environment for academic and research with the team of qualified and experienced faculties.",
      "Along with the academic activities, institute is committed for overall development of the students. Industrial training, industrial visits, short term training programs, workshops, seminar, expert lectures have been organized as a part of academic calendar. Students are encouraged to organize and participate in sports activities, cultural programs and social welfare activities like blood donation, thalassemia awareness etc.",
      "We are committed to provide learning base academic environment to our students. This in turn will equipped the students with technical knowledge and skill to increase their competency and will transformed the students to qualified professionals. We understand the expectations of the society, government and affiliating university from us as being institute offering technical education and accordingly we are committed for continuous improvement in teaching learning process.",
      "To inculcate the culture of Innovation and Entrepreneurship in the students we have various platforms like Institutional Innovation Council (IIC), Student Startup and Innovation Policy (SSIP) nodal centre in place at the institute.",
      "Our aim is to make CKPIPSR globally renowned Pharma institute."
    ]
  },
  signature: {
    name: "Dr. Dhiren P. Shah",
    role: "Principal, CKPIPSR",
    note: "Gujarat Technological University Approved"
  }
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is PrincipalContent {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Partial<PrincipalContent>;
  return (
    !!p.portrait?.image &&
    Array.isArray(p.credentials) &&
    Array.isArray(p.message?.body) &&
    p.message.body.length > 0
  );
}

export function usePrincipalContent(): PrincipalContent {
  const [content, setContent] = useState<PrincipalContent>(DEFAULT_PRINCIPAL);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/principal"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.principal)) setContent(body.principal);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
