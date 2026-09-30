import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * About Us → Governance & Leadership → Governing Body.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down.
 */
export interface GoverningMember {
  name: string;
  role: string;
  organisation: string;
  /** Empty means no photo; the page draws initials. */
  image: string;
  credentials: string;
  quote: string;
  bio: string;
}

export interface GoverningBodyContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: { badge: string; headingLead: string; headingAccent: string; body: string };
  members: GoverningMember[];
}

const NVB = "Navyug Vidyabhavan Trust";
const S3 = "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos";

export const DEFAULT_GOVERNING_BODY: GoverningBodyContent = {
  pageTitle: "Governing Body",
  pageSubtitle: "The supreme executive body of C. K. Pithawalla Institute of Pharmaceutical Science & Research.",
  intro: {
    badge: "Supreme Council",
    headingLead: "Governing Body &",
    headingAccent: "Executive Board",
    body: "CKPIPSR operates under the strategic guidance of a multi-disciplinary board comprising visionary philanthropists, industrial pioneers, and academic luminaries, ensuring adherence to PCI and GTU standards."
  },
  members: [
    {
      name: "Shri Mahesh C. Pithawalla",
      role: "Vice President / Trustee",
      organisation: "Navyug Vidyabhavan Trust",
      image: "https://ckpipsr.ac.in/images/trustees/mahesh-c-p.jpg",
      credentials: "Trustee, Navyug Vidyabhavan Trust",
      quote: "Guiding institutional expansion, infrastructural investments, and strategic corporate alliances across technical campuses.",
      bio: "Shri Mahesh C. Pithawalla provides executive governance for Navyug Vidyabhavan Trust institutions. His leadership ensures modern laboratory equipment, faculty development, and student welfare facilities across all campuses."
    },
    {
      name: "Shri Biren M. Pithawalla",
      role: "Trustee",
      organisation: "Navyug Vidyabhavan Trust",
      image: "https://ckpipsr.ac.in/images/trustees/biren-m-p.jpg",
      credentials: "Trustee, Navyug Vidyabhavan Trust",
      quote: "Spearheading digital learning initiatives, innovation nodal funding, and state-of-the-art research wing development.",
      bio: "Shri Biren M. Pithawalla oversees technology integration, SSIP startup grants, and research facility upgrades across the campus to empower pharmaceutical researchers."
    },
    {
      name: "Shri Rahul A. Pithawalla",
      role: "Trustee",
      organisation: "Navyug Vidyabhavan Trust",
      image: "https://ckpipsr.ac.in/images/trustees/rahul-a-p.jpg",
      credentials: "Trustee, Navyug Vidyabhavan Trust",
      quote: "Promoting entrepreneurial incubation, student startup policy (SSIP) grants, and industrial training placements.",
      bio: "Shri Rahul A. Pithawalla actively fosters the Institutional Innovation Council (IIC) and Training & Placement Cell, building strong pipelines with pharmaceutical industries."
    },
    {
      name: "Shri Ajit C. Pithawalla",
      role: "Trustee",
      organisation: "Navyug Vidyabhavan Trust",
      image: "https://ckpipsr.ac.in/images/trustees/ajit-c-p.jpg",
      credentials: "Trustee, Navyug Vidyabhavan Trust",
      quote: "Preserving organizational ethics, financial compliance, and community outreach healthcare initiatives.",
      bio: "Shri Ajit C. Pithawalla manages trust endowments, scholarship allocations, and community healthcare drives including blood donation and thalassemia campaigns."
    },
    {
      name: "Dr. Dhiren P. Shah",
      role: "Member Secretary / Principal",
      organisation: "CKPIPSR",
      image: "/images/faculty/dhiren-p-shah.jpg",
      credentials: "M.Pharm, MBA, PGDIPR, Ph.D. | Principal & Professor",
      quote: "Championing Outcome-Based Education (OBE), research publication, and student-centric academic rigor.",
      bio: "Dr. Dhiren P. Shah is Professor and Principal of CKPIPSR with 25+ years of academic and research leadership. He oversees PCI/GTU accreditations, curriculum enhancement, and research publications."
    },
    {
      name: "Dr. Bhumika Desai",
      role: "Member / Associate Professor",
      organisation: "CKPIPSR",
      image: "/images/faculty/bhumika-c-desai.jpg",
      credentials: "M.Pharm, Ph.D. | Associate Professor",
      quote: "Coordinating curriculum execution, statutory compliance filings, and pharmaceutical research projects.",
      bio: "Dr. Bhumika Desai is Associate Professor in Pharmaceutics and Member Secretary of the Academic Council at CKPIPSR. She manages academic planning, university documentation, and student research mentorship."
    },
    {
      name: "Dr. Vinod Ramani",
      role: "Member / Associate Professor",
      organisation: "CKPIPSR",
      image: "/images/faculty/vinod-d-ramani.jpg",
      credentials: "M.Pharm, Ph.D. | Associate Professor",
      quote: "Directing academic timetables, practical laboratory modules, and continuous internal assessment frameworks.",
      bio: "Dr. Vinod Ramani serves as Academic Coordinator and Associate Professor in Pharmaceutics at CKPIPSR, supervising core lab operations and course scheduling."
    },
    {
      name: "Dr. Kamlesh Zota",
      role: "Member (Industry Nominee)",
      organisation: "Pharmaceutical Industry Leader",
      image: "https://ckpipsr.ac.in/images/about/kamlesh-zota.png",
      credentials: "Pharma Industry Executive | Board Nominee",
      quote: "Bridging industrial pharmaceutical developments with academic curricula and student internships.",
      bio: "Dr. Kamlesh Zota represents the pharmaceutical industry on the governing body, guiding industrial visits, skill workshops, and placement pathways."
    },
    {
      name: "Shri Chandravadan C. Pithawalla",
      role: "Trustee",
      organisation: "Navyug Vidyabhavan Trust",
      image: "https://ckpipsr.ac.in/images/trustees/chandravadan-c-p.jpg",
      credentials: "Trustee, Navyug Vidyabhavan Trust",
      quote: "Guiding philanthropic missions, sustainable institution building, and higher education excellence.",
      bio: "Shri Chandravadan C. Pithawalla has served as a devoted trustee and visionary mentor across the Navyug and Pithawalla educational campuses."
    },
    {
      name: "Dr. Shailesh Shah",
      role: "Member (Regulatory Nominee)",
      organisation: "Pharmacy Council of India",
      image: "/images/faculty/shailesh-shah.jpg",
      credentials: "PCI Nominee | Regulatory Expert",
      quote: "Ensuring complete compliance with Pharmacy Council of India (PCI) norms and professional ethics.",
      bio: "Dr. Shailesh Shah advises the governing body on PCI regulatory guidelines, laboratory standards, and faculty-student intake ratios."
    }
  ]
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is GoverningBodyContent {
  if (typeof value !== "object" || value === null) return false;
  const g = value as Partial<GoverningBodyContent>;
  return !!g.intro?.headingLead && Array.isArray(g.members) && g.members.length > 0;
}

export function useGoverningBodyContent(): GoverningBodyContent {
  const [content, setContent] = useState<GoverningBodyContent>(DEFAULT_GOVERNING_BODY);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/governing-body"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.governingBody)) setContent(body.governingBody);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
