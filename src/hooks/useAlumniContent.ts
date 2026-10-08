import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Students Corner → Alumni (CKPIPSRAA).
 *
 * Committee members arrive with their name and designation already worked
 * out: one linked to the Deans or Faculties page is named from it, and an
 * alumnus typed in here is printed as typed.
 *
 * The defaults are a skeleton, not the page's text: unlike the older pages
 * this one has no shipped copy to fall back on, so if the API is down the
 * tabs render empty rather than showing a stale constitution.
 */
export interface AlumniCommitteeMember {
  no: number;
  name: string;
  role: string;
  designation: string;
  image: string;
  category: string;
}

export interface AlumniCommittee {
  kicker: string;
  heading: string;
  /** The badge, with the number of members already filled in. */
  countLabel: string;
  members: AlumniCommitteeMember[];
  footer: { left: string; right: string };
}

export interface AlumniContent {
  pageTitle: string;
  pageSubtitle: string;
  tabs: { about: string; rules: string; managing: string; executive: string; registration: string };
  about: {
    badge: string;
    lead: string;
    quote: string;
    purpose: { title: string; body: string };
    highlights: { value: string; label: string }[];
    objectives: { kicker: string; heading: string; countLabel: string; items: string[] };
    cta: { badge: string; title: string; body: string; buttonLabel: string };
  };
  rules: {
    kicker: string;
    heading: string;
    badge: string;
    name: { kicker: string; title: string; body: string };
    office: { kicker: string; title: string; body: string };
    aims: { kicker: string; heading: string; items: string[] };
    membership: {
      kicker: string;
      heading: string;
      feeBadge: string;
      eligibility: { title: string; items: string[]; note: string };
      fees: { title: string; items: string[] };
      rights: { title: string; items: string[] };
    };
    structure: {
      kicker: string;
      heading: string;
      intro: string;
      roles: { role: string; responsibility: string; duties: string[] }[];
    };
    agm: {
      kicker: string;
      heading: string;
      highlight: string;
      body: string;
      dutiesTitle: string;
      duties: string[];
    };
    extraordinary: { kicker: string; heading: string; body: string; highlight: string; note: string };
    meetings: { kicker: string; heading: string; badge: string; powers: string[] };
    clauses: { kicker: string; title: string; paragraphs: string[]; tone: string }[];
    footer: { left: string; right: string };
  };
  managing: AlumniCommittee;
  executive: AlumniCommittee;
  registration: {
    kicker: string;
    heading: string;
    badge: string;
    sections: { personal: string; professional: string; contribution: string };
    degrees: string[];
    years: { from: number; to: number };
    interests: string[];
    submitLabel: string;
    success: { title: string; body: string; again: string };
    open: boolean;
    closedMessage: string;
  };
}

const EMPTY_COMMITTEE: AlumniCommittee = {
  kicker: "",
  heading: "",
  countLabel: "",
  members: [],
  footer: { left: "", right: "" },
};

export const DEFAULT_ALUMNI: AlumniContent = {
  pageTitle: "Alumni",
  pageSubtitle:
    "Connecting Graduates, Mentoring Future Pharmacists & Celebrating Global Achievements",
  tabs: {
    about: "About Alumni",
    rules: "Rules & Regulations",
    managing: "Managing Committee",
    executive: "Executive Committee",
    registration: "Registration",
  },
  about: {
    badge: "Global Ambassador Network",
    lead: "Alumni are ambassadors of the Institute in the society and industry scattered over the world.",
    quote: "CKPIPSR aims to serve the needs of its alumni by helping them advance in their careers through working for satisfying their needs for knowledge inputs and through networking, to develop synergistic plans to support the institutions for achieving their mission, and to enable the institutes to add value to all its stake holders through the membership of CKPIPSR.",
    purpose: {
      title: "Purpose of Association",
      body: "The purpose of establishing this Association is to help our alumni and to get the best out by creating network of all alumni.",
    },
    highlights: [
      { value: "1500+", label: "Graduated Pharmacists" },
      { value: "100%", label: "Placement Guidance" },
    ],
    objectives: {
      kicker: "CKPIPSRAA Charter",
      heading: "Objectives",
      countLabel: "10 Key Goals",
      items: [
        "To promote and provide services for its alumni, especially encouraging their continuing growth, personally and professionally, and a spirit of fraternity among alumni.",
        "To assist in placement of students.",
        "To create awareness about institute and its alumni.",
        "To collect/publish useful information to members of CKPIPSRAA.",
        "To recognize the distinguished services of its alumni through awards.",
        "To collect and maintain funds for development.",
        "To foster a spirit of loyalty in the Alumni to both for GTU and the graduating Institute.",
        "To strengthen the ties between alumni, the community, and the organization, where the alumni may be working.",
        "To help alumni in their need.",
        "To organize cultural and social activities, to set up facilities, which can help bring together the alumni and the CKPIPSR community.",
      ],
    },
    cta: {
      badge: "Join The Alumni Community",
      title: "Are You a CKPIPSR Graduate?",
      body: "Register with the C. K. Pithawalla Institute of Pharmaceutical Science and Research Alumni Association to stay connected with your batchmates, receive the e-bulletin, and mentor junior students.",
      buttonLabel: "Register as Alumni",
    },
  },
  rules: {
    kicker: "Official Institutional Constitution & Bye-Laws",
    heading: "Rules & Regulations of CKPIPSRAA",
    badge: "Governing Charter",
    name: {
      kicker: "1. Official Name",
      title: "Association Nomenclature",
      body: "The association shall be named as “C. K. Pithawalla Institute of Pharmaceutical Science and research Alumni Association”, hereafter referred to as “CKPIPSRAA”",
    },
    office: {
      kicker: "2. Registered Office",
      title: "Location & Secretariat",
      body: "Office of the CKPIPSRAA shall be located at C.K.Pithawalla Institute of Pharmaceutical Science & Research, Surat.",
    },
    aims: {
      kicker: "Clause 3",
      heading: "The Aims and Objectives",
      items: [
        "To start, promote and maintain interaction amongst alumni as well as between the alumni and present students of CKPIPSR, Surat for their mutual benefit.",
        "To encourage and appeal the alumni to take active interest in the activities leading to the progress of the institute",
        "To generate and organize the funds for the benefit of the students which may be partially utilized for scholarship to the needy and deserving students, book banks, loans and co-curricular activities",
        "To invest and maintain accounts of the funds of the CKPIPSRAA.",
        "To organize the social welfare activities for the benefit of the society as a part of nation building.",
        "To motivate the alumni and students by recognizing and awarding for their outstanding contribution/performance in (i) research, (ii) technical events, (iii) sports, and (iv) social services.",
        "To organize get-together of all members to provide the common platform for interaction and sharing of the expertise, experience and views of the members leading to mutual development.",
        "To take up all those activities which are directly or indirectly helping the students in their (i) training and placement, (ii) entrepreneurial skill development and (iii) higher studies in India and abroad",
        "To take-up all other lawful activities leading to the attainment of the above stated objectives and/or beneficial to the institute, its students and its alumni",
      ],
    },
    membership: {
      kicker: "Clause 4",
      heading: "Membership Framework",
      feeBadge: "₹1,000/- One-Time Life Fee",
      eligibility: {
        title: "Eligibility",
        items: [
          "Any past student of CKPIPSR, Surat",
          "All the students of CKPIPSR, Surat passing their final semester examination",
        ],
        note: "Open to all CKPIPSR degree & diploma alumni.",
      },
      fees: {
        title: "Fees Structure",
        items: [
          "For the official life membership of the CKPIPSRAA, eligible candidates are required to submit duly filled membership form to the member secretary along with the one time life membership fees of; Rupees 1000/- for the current and past students.",
          "From the New Entrants to the institute, Rs. 1000/- will be collected towards the alumni association fees by CKPIPSRAA. After passing the final year examinations, student will automatically become life member of the CKPIPSR, on submission of the registration form.",
        ],
      },
      rights: {
        title: "Member Rights",
        items: [
          "Members and are entitled to receive all announcements and news letters related to the CKPIPSRAA activities.",
          "Members are entitled to receive annual e-magazine of institute.",
          "Members are entitled to attend and participate in the get-togethers organized by CKPIPSRAA.",
          "Members are entitled to take an advantage of any schemes and programs administered by CKPIPSRAA.",
          "With the wide spread and easy access of the Internet, website for the CKPIPSR should be updated to include CKPIPSRAA portal and all the announcement and publication on CKPIPSRAA portal shall be considered as official circulation amongst all the members of CKPIPSRAA.",
        ],
      },
    },
    structure: {
      kicker: "Clause 5",
      heading: "Organization Structure of the Managing Committee",
      intro: "The method of election/selection of the office bearers and their responsibilities are defined in the following sub sections;",
      roles: [
        {
          role: "Chairman",
          responsibility: "Trust’s Chairman’s Representative will be the ex-officio Chairman of the CKPIPSRAA. The chairman will be responsible for policy formation in consultation with other members of the Managing Committee.",
          duties: [],
        },
        {
          role: "President",
          responsibility: "President is responsible for implementation of all the policy matters of the CKPIPSRAA. President will also act as an administrator, coordinator and supervisor for the activities and programs of CKPIPSRAA. Specifically, President will act as a facilitator for the Member Secretary for smooth conductance of the Managing Committee activities.",
          duties: [],
        },
        {
          role: "Vice President",
          responsibility: "Chairman shall appoint Distinguished Alumnus as a Vice President in consultation with other members of the Managing Committee. Vice President will not have any administrative responsibility but he will act as a consultant for CKPIPSRAA. Vice President Term will be of three-years at a time.",
          duties: [],
        },
        {
          role: "Member Secretary",
          responsibility: "Secretary shall perform the following duties;",
          duties: [
            "Register the eligible candidates for CKPIPSRAA",
            "Maintain the records of registration forms",
            "Maintain and update the registration records",
            "To maintain administrative control over the CKPIPSRAA office",
            "To correspond with stakeholders on behalf of CKPIPSRAA",
            "To issue the notice of all the managing committee meeting along with agenda on time (at least 15 days before the schedule of meeting)",
            "To keep the prepare, circulate and maintain the minutes of all the meetings of managing committee of CKPIPSRAA",
            "To act as a medium of communication between the members and office bearers of the managing committee",
            "To look after the maintenance and updating of web portal of CKPIPSRAA for which he will be provided the manpower from the concern department",
          ],
        },
        {
          role: "Treasurer",
          responsibility: "Treasurer shall prepare the books of accounts of CKPIPSRAA at the end of the every financial year and present the same to the Managing Committee. Treasurer will manage for collection of all the dues and issue of out standings on behalf of CKPIPSRAA. In addition, he will act as a liaison officer with bankers and auditors on behalf of CKPIPSRAA.",
          duties: [],
        },
        {
          role: "Student Representative",
          responsibility: "Student representative will have a vote in the activities of managing committee. Student representative is responsible for the wide spread of the objective of the CKPIPSRAA amongst the new entrants. As a General Secretary of the student council of the institute, he shall act a initiator and leader for planning of the various activities in line with the objectives of CKPIPSRAA and in communication with the Chairman, President and Member Secretary of the CKPIPSRAA. Student Representative shall take active participation in formation of students’ organizing committees for the various activities of CKPIPSRAA and also act as a motivator for these committees.",
          duties: [],
        },
        {
          role: "General Body",
          responsibility: "General body shall consist of all the members of the association as defined in clause 4.",
          duties: [],
        },
      ],
    },
    agm: {
      kicker: "Clause 6",
      heading: "Annual General Meeting",
      highlight: "Annual general meeting of the general body of CKPIPSRAA shall be called on or before 30th June of every year by member secretary.",
      body: "Member present will constitute the quorum and there will not be restriction on minimum/maximum number of members for the quorum.",
      dutiesTitle: "Meeting shall statutorily consider the following;",
      duties: [
        "To present and review the report of the managing committee",
        "To elect the vice president for the term of three years",
        "Approve the previous year’s account",
        "Introducing and adopting office bearers",
        "To take up any other matters included in notice of the meeting",
      ],
    },
    extraordinary: {
      kicker: "Clause 7",
      heading: "Extra ordinary Meeting",
      body: "Member secretary of CKPIPSRAA shall call an extra ordinary meeting upon receipt of request from the president of CKPIPSRAA or from at least 10 percent of the members of the CKPIPSRAA.",
      highlight: "Such a meeting shall be called within 45 days from the date of receipt of such a request and shall discuss only for agenda stated in the request. However, any other agenda may be taken up with the permission of the chairperson of the meeting.",
      note: "Notice Timelines: Minimum 15 days written notification for meetings",
    },
    meetings: {
      kicker: "Clause 8",
      heading: "Managing Committee Meeting",
      badge: "Minimum 2 Meetings / Year",
      powers: [
        "Member secretary shall call Managing Committee meeting at least two times every year.",
        "Managing committee shall prepare activity plan for the every year well in advance",
        "Managing committee shall allocate the budget for the activities mentioned in the planned",
        "Authorized signatories of the Managing Committee shall carryout financial transactions with banks or any other statutory bodies",
        "Any member of the managing committee in power is authorized to make new members based on the clause 4",
        "Managing committee shall frame sub committees for any specific programs or project from time to time",
        "Managing committee may discontinue any member from CKPIPSRAA if found doing the activities against the interest or prestige of the CKPIPSRAA or institute",
        "Managing committee has a power to modify or remove any rules specified in this document or to frame new rules from time to time, if found appropriate for effective working of CKPIPSRAA",
        "Managing committee has a power to take up the purchase/contracting procedures as well as to decide and pay the fees for the services rendered by the person or organizations within the rules of the institution.",
      ],
    },
    clauses: [
      {
        kicker: "Clause 9: Infrastructure",
        title: "Institutional Facilities & Secretariat",
        paragraphs: [
          "Managing committee will request the management of C. K. Pithawalla Institute of Pharmaceutical Science and Research for providing the office space with necessary facilities for communication and record storage and space for meeting for administering the CKPIPSRAA.",
        ],
        tone: "plain",
      },
      {
        kicker: "Clause 10: Accounts",
        title: "Bank Account & Financial Auditing",
        paragraphs: [
          "Separate account should be open-up in any nationalized bank and maintained in the name of \"C. K. Pithawalla Institute of Pharmaceutical Science and research Alumni Association\" .",
          "All the financial transaction shall be carryout as per the institute norms.",
          "Treasurer shall maintain the book of accounts of CKPIPSRAA and shall present the same to the managing committee at the end of each financial year for its approval.",
        ],
        tone: "plain",
      },
      {
        kicker: "Clause 11: Chairperson at Meeting",
        title: "Meeting Presiding Authority",
        paragraphs: [
          "President of CKPIPSRAA or his or her nominee shall act as a chairperson at all the meetings of the CKPIPSRAA",
        ],
        tone: "plain",
      },
      {
        kicker: "Clause 12: Winding-up of CKPIPSRAA",
        title: "Asset Transfer & Dissolution",
        paragraphs: [
          "In case of the winding-up of the CKPIPSRAA upon decision of the Chairman of CKPIPSRAA, any surplus fund or properties after meeting all the liabilities of the CKPIPSRAA shall be automatically comes under the ownership of the C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat to be utilized for the objectives inline with the objectives of the CKPIPSRAA.",
        ],
        tone: "amber",
      },
    ],
    footer: {
      left: "CKPIPSRAA Registered Bye-Laws • Navyug Vidyabhavan Trust",
      right: "Registered Secretariat: Surat, Gujarat, India",
    },
  },
  managing: {
    kicker: "Institutional Governance & Office Bearers",
    heading: "CKPIPSRAA Managing Committee",
    countLabel: "11 Committee Members",
    members: [
      {
        no: 1,
        name: "Shri Rahulbhai Pithawalla",
        role: "Chairman",
        designation: "Trustee, Navyug Vidyabhavan Trust",
        image: "https://ckpipsr.ac.in/images/trustees/rahul-a-p.jpg",
        category: "Trust Management",
      },
      {
        no: 2,
        name: "Dr. Dhiren P Shah",
        role: "President",
        designation: "Principal, CKPIPSR",
        image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a7d896865a1e.webp",
        category: "Institutional Head",
      },
      {
        no: 3,
        name: "Dr. Bhumika Desai",
        role: "Member Secretary",
        designation: "Assoc. Prof., CKPIPSR",
        image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a6308854a00a.webp",
        category: "Secretariat",
      },
      {
        no: 4,
        name: "Bansari Patel",
        role: "Vice President",
        designation: "Alumni, CKPIPSR",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        category: "Alumni Leadership",
      },
      {
        no: 5,
        name: "Mr. Paresh G Shah",
        role: "Treasurer",
        designation: "Senior Clerk",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        category: "Administration & Finance",
      },
      {
        no: 6,
        name: "Dr. Vinod Ramani",
        role: "Ex-Officio Member",
        designation: "Assoc. Prof., CKPIPSR",
        image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/63abcf6a28997.webp",
        category: "Academic Faculty",
      },
      {
        no: 7,
        name: "Mrs. Kajal Solanki",
        role: "Faculty Coordinators",
        designation: "Asst. Prof. CKPIPSR",
        image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=400",
        category: "Faculty Coordination",
      },
      {
        no: 8,
        name: "Mrs. Tarkeshwari Ahire",
        role: "Faculty Coordinators",
        designation: "Asst. Prof. CKPIPSR",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
        category: "Faculty Coordination",
      },
      {
        no: 9,
        name: "Mitali Patel",
        role: "Representative from student Council",
        designation: "Alumni, CKPIPSR",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        category: "Student Council Rep",
      },
      {
        no: 10,
        name: "Madhu Hardik",
        role: "Representative from student Council",
        designation: "Alumni, CKPIPSR",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        category: "Student Council Rep",
      },
      {
        no: 11,
        name: "Jayswal Vibha",
        role: "Representative from student Council",
        designation: "Alumni, CKPIPSR",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
        category: "Student Council Rep",
      },
    ],
    footer: {
      left: "CKPIPSRAA Managing Committee • Navyug Vidyabhavan Trust",
      right: "Official Term: 2024–2027",
    },
  },
  executive: {
    kicker: "Operational Body & Portfolio Committees",
    heading: "Alumni Executive Committee",
    countLabel: "10 Executive Members",
    members: [
      {
        no: 1,
        name: "Dr. Dhiren P Shah",
        role: "President",
        designation: "Principal, CKPIPSR",
        image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a7d896865a1e.webp",
        category: "Institutional Head",
      },
      {
        no: 2,
        name: "Feral Modi",
        role: "Vice President",
        designation: "Alumni, CKPIPSR",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        category: "Alumni Leadership",
      },
      {
        no: 3,
        name: "Manish Solanki",
        role: "Secretary",
        designation: "Alumni, CKPIPSR",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        category: "Alumni Secretariat",
      },
      {
        no: 4,
        name: "Hiren Thakkar",
        role: "Treasurer",
        designation: "Alumni, CKPIPSR",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        category: "Finance & Accounts",
      },
      {
        no: 5,
        name: "Jaya Indave",
        role: "Program Committee",
        designation: "Alumni, CKPIPSR",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        category: "Programs & Events",
      },
      {
        no: 6,
        name: "Dipayan Tarafder",
        role: "Campaigning Committee",
        designation: "Asst. Prof. CKPIPSR",
        image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/62d678047de6f.webp",
        category: "Campaigning & Outreach",
      },
      {
        no: 7,
        name: "Ms. Shivangi Shrivastav",
        role: "Alumni Talk series Committee",
        designation: "Asst. Prof. CKPIPSR",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        category: "Talk Series & Webinars",
      },
      {
        no: 8,
        name: "Mrs. Shweta Vaghela",
        role: "Alumni Talk series Committee",
        designation: "Asst. Prof. CKPIPSR",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
        category: "Talk Series & Webinars",
      },
      {
        no: 9,
        name: "Dr. Bhumika Desai",
        role: "Alumni membership and networking drive",
        designation: "Assoc. Prof., CKPIPSR",
        image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a6308854a00a.webp",
        category: "Membership & Networking",
      },
      {
        no: 10,
        name: "Dr. Vinod Ramani",
        role: "Fund Raising Committee",
        designation: "Assoc. Prof., CKPIPSR",
        image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/63abcf6a28997.webp",
        category: "Fund Raising",
      },
    ],
    footer: {
      left: "Executive Operations & Event Wings • CKPIPSRAA",
      right: "Contact: alumni@ckpipsr.ac.in",
    },
  },
  registration: {
    kicker: "",
    heading: "Alumni Membership Registration",
    badge: "",
    sections: { personal: "", professional: "", contribution: "" },
    degrees: [],
    years: { from: 2007, to: new Date().getFullYear() },
    interests: [],
    submitLabel: "Submit Alumni Registration",
    success: { title: "Registration Submitted!", body: "", again: "Submit Another Entry" },
    open: true,
    closedMessage: "",
  },
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is AlumniContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<AlumniContent>;
  return (
    !!c.registration?.heading &&
    Array.isArray(c.about?.objectives?.items) &&
    Array.isArray(c.managing?.members) &&
    Array.isArray(c.executive?.members)
  );
}

export function useAlumniContent(): AlumniContent {
  const [content, setContent] = useState<AlumniContent>(DEFAULT_ALUMNI);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/students/alumni"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.alumni)) setContent(body.alumni);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
