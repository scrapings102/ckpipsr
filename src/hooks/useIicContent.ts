import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → Institution's Innovation Council (IIC).
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down. Council members arrive with their name and designation
 * already worked out: a member linked to the Deans or Faculties page is named
 * from it.
 */
export interface IicMember {
  no: number;
  name: string;
  designation: string;
  role: string;
  responsibility: string;
  /** Draws the card in amber, for a member from outside the institute. */
  external: boolean;
}

export interface IicContent {
  pageTitle: string;
  pageSubtitle: string;
  tabs: { about: string; structure: string };
  about: {
    objectives: { kicker: string; heading: string; items: string[]; footer: string };
    roles: { kicker: string; heading: string; items: string[] };
  };
  structure: {
    kicker: string;
    heading: string;
    instituteId: string;
    /** The badge, with the member count already filled in. */
    countLabel: string;
    members: IicMember[];
  };
}

export const DEFAULT_IIC: IicContent = {
  pageTitle: "Institution's Innovation Council (IIC)",
  pageSubtitle: "Ministry of Education (MoE) Innovation Cell Initiative at CKPIPSR",
  tabs: { about: "About", structure: "Organizational Structure" },
  about: {
    objectives: {
      kicker: "Core Mandate",
      heading: "Objectives",
      items: [
        "Create and sustain innovation and entrepreneurship culture in campus.",
        "Streamline and strengthen innovation and entrepreneurship ecosystem in campus.",
      ],
      footer: "MoE's Innovation Cell (MIC) Certified",
    },
    roles: {
      kicker: "Operational Framework",
      heading: "Roles & Responsibilities",
      items: [
        "Establish Synergy and coherency among various departments and units and better mobile resources to support innovation and entrepreneurship.",
        "Plan, develop and support institution in formation and implementation of innovation and entrepreneurship policies at the institute level.",
        "Plan and conduct various time-bounded innovation and entrepreneurship promotion activities round the year to generate awareness on innovation and startup.",
        "Encourage, recognize and reward students, faculty members and staffs for their engagement, involvement and supporting innovation and entrepreneurship achievements.",
        "Facilitate intra-institutional and inter-institutional interactions and partnership to promote interdisciplinary and multi-disciplinary innovations and entrepreneurial teams.",
        "Network, collaborate, and partnership with ecosystem enablers at the regional, state and national level and support system development to provide easy access to resource to innovators and entrepreneurs.",
        "Plan, build, manage and mobilize resources for the pre-incubation and incubation facility and service support creation.",
        "Plan and conduct challenges, competitions, hackathons in the campus and encourage students to participate.",
        "Create innovation repository of ideas, innovations, startups at the Institute level (YUKTI) and provide support to them and connect/linkage with ecosystem enablers for incubation, investment, IP and technology transfer service support.",
        "Nominate faculty members of the IIC to undergo Innovation Ambassador Training and encourage them to perform post-training tasks such as delivering expert talks on innovation and startup, engage in mentoring role etc. as prescribed for the Innovation Ambassadors.",
        "Train and build capacity of faculty members in innovation and entrepreneurship to play a hybrid role as mentor, drive IIC activities, innovator and entrepreneur.",
        "Organize interactions with entrepreneurs, investors, ecosystem enablers and create a pool of experts to mentor student innovators & entrepreneurs.",
        "Extend mentoring support to other IIC institutions and encourage HEIs to join the IIC network.",
      ],
    },
  },
  structure: {
    kicker: "Council Governance",
    heading: "IIC Organizational Structure",
    instituteId: "Institute ID – IC202217445",
    countLabel: "10 Council Members",
    members: [
      { no: 1, name: "Dr. Dhiren P. Shah", designation: "Principal", role: "President", responsibility: "Govern all activities under IIC", external: false },
      { no: 2, name: "Dr. Bhumika C. Desai", designation: "Asso. Professor", role: "Vice president", responsibility: "Govern and coordinate all activities under IIC", external: false },
      { no: 3, name: "Dr. Vinod Ramani", designation: "Assoc. Professor", role: "Convener, IPR Activity Co-oridinator", responsibility: "1.Communicate all activities under IIC among faculty students, faculty and MIC 2.IPR Activity", external: false },
      { no: 4, name: "Mr. Dipayan Tarafder", designation: "Asst. Professor", role: "Innovation Activity Co-oridinator", responsibility: "Innovation Activity", external: false },
      { no: 5, name: "Dr. Devendra J. Vaishnav", designation: "Asst. Professor", role: "Start up activity Co-oridinator", responsibility: "Start up activity", external: false },
      { no: 6, name: "Mr. Moolla Yahya Ali", designation: "Asst. Professor", role: "Internship activity Co-oridinator", responsibility: "Internship activity", external: false },
      { no: 7, name: "Mr. Nirmal T. Mehta", designation: "Asst. Professor", role: "Social Media coordinator", responsibility: "Social media coordination", external: false },
      { no: 8, name: "Dr Praful D Bharadia", designation: "Professor, L.M. College Of Pharmacy, Coordinator, Student Startup and Innovation Policy (SSIP), LMCP Nodal Centre, Mentor, Atal Incubation Centre, LMCP- AIC Foundation, Ahmedabad College in Ahmedabad, Gujarat", role: "Incubation Center (External Member)", responsibility: "Provide mentoring, incubation guidance and business network support.", external: true },
      { no: 9, name: "Mr Kamlesh Zota", designation: "Director, Zota health care limited, Surat", role: "Expert from Industry (External Member)", responsibility: "As Technical Expert and mentor to the institute students", external: true },
      { no: 10, name: "Mr Nirmal Kumar shah", designation: "Debt Manager at ICICI Bank, Surat", role: "Bank / Investor (External member)", responsibility: "Educate students about loan schemes, grant, and investments regarding startup and entrepreneurship", external: true },
    ],
  },
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is IicContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<IicContent>;
  return (
    Array.isArray(c.structure?.members) &&
    c.structure.members.length > 0 &&
    Array.isArray(c.about?.roles?.items) &&
    Array.isArray(c.about?.objectives?.items)
  );
}

export function useIicContent(): IicContent {
  const [content, setContent] = useState<IicContent>(DEFAULT_IIC);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/research/iic"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.iic)) setContent(body.iic);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
