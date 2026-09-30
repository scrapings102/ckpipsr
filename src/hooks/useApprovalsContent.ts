import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Academics → Approvals.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down.
 */
export interface ApprovalLetter {
  name: string;
  /** Empty means the letter is listed but not published yet. */
  url: string;
}

export interface ApprovalEntry {
  body: string;
  status: string;
  validity: string;
  color: string;
  description: string;
  letters: ApprovalLetter[];
}

export interface ApprovalsContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: { badge: string; heading: string; body: string };
  approvals: ApprovalEntry[];
  compliance: {
    title: string;
    body: string;
    stats: { icon: string; value: string; label: string }[];
  };
}

const DOCS = "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs";

export const DEFAULT_APPROVALS: ApprovalsContent = {
  pageTitle: "Regulatory Approvals",
  pageSubtitle: "Ensuring global standards through national and state-level accreditation.",
  intro: {
    badge: "Quality Assurance",
    heading: "Accreditations & Affiliations",
    body: "CKPIPSR is committed to providing pharmaceutical education that meets the highest statutory and academic benchmarks. Our programs are approved by the leading regulatory bodies of India.",
  },
  approvals: [
    {
      body: "Pharmacy Council of India (PCI), New Delhi",
      status: "Approved",
      validity: "2024-25",
      color: "blue",
      description:
        "Statutory body regulated by the Government of India for the regulation of Pharmacy Education in the country.",
      letters: [{ name: "Latest Approval Letter", url: `${DOCS}/63f5f6fb749d2.pdf` }],
    },
    {
      body: "Gujarat Technological University (GTU), Gandhinagar",
      status: "Affiliated",
      validity: "Continuous",
      color: "emerald",
      description: "Affiliating university for technical and professional programs in Gujarat.",
      letters: [{ name: "GTU Affiliation Letter", url: `${DOCS}/66e2c74f855a9.pdf` }],
    },
    {
      body: "AICTE, New Delhi",
      status: "Approved",
      validity: "2022-23",
      color: "orange",
      description:
        "National-level council for technical education, under the Department of Higher Education.",
      letters: [{ name: "AICTE EOA Letter", url: `${DOCS}/66e2c80a7a232.pdf` }],
    },
    {
      body: "Fee Regulatory Committee (FRC), Gujarat",
      status: "Sanctioned",
      validity: "2026-27 to 2028-29",
      color: "purple",
      description:
        "Regulatory body ensuring transparent and reasonable fee structures for professional technical courses.",
      letters: [{ name: "FRC Order Letter", url: `${DOCS}/69d87ef327173.pdf` }],
    },
  ],
  compliance: {
    title: "Committed to Compliance",
    body: "Our institution maintains 100% transparency with all regulatory requirements, regularly undergoing audits and inspections to ensure the highest academic standards.",
    stats: [
      { icon: "Building2", value: "GTU", label: "Affiliated" },
      { icon: "Award", value: "PCI", label: "Approved" },
      { icon: "Sparkles", value: "AISHE", label: "Registered" },
      { icon: "Zap", value: "FRC", label: "Sanctioned" },
    ],
  },
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ApprovalsContent {
  if (typeof value !== "object" || value === null) return false;
  const a = value as Partial<ApprovalsContent>;
  return (
    Array.isArray(a.approvals) &&
    a.approvals.length > 0 &&
    Array.isArray(a.compliance?.stats) &&
    !!a.intro?.heading
  );
}

export function useApprovalsContent(): ApprovalsContent {
  const [content, setContent] = useState<ApprovalsContent>(DEFAULT_APPROVALS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/academics/approvals"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.approvals)) setContent(body.approvals);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
