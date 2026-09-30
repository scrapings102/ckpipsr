import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → Research - Ethics.
 *
 * Each code of ethics is a group with its own Display Mode button. The groups
 * are content: the API sends them in order, each with the count its button
 * prints, and the total the "all" button prints.
 */
export type EthicsTone = "emerald" | "blue" | "amber" | "purple";

export interface EthicsDirective {
  id: string;
  title: string;
  description: string;
  /** Optional boxed note under the text. */
  note: string;
  category: string;
  /** A lucide icon name; unknown ones fall back to a shield. */
  icon: string;
  highlight: boolean;
}

export interface EthicsGroup {
  id: string;
  buttonLabel: string;
  title: string;
  subtitle: string;
  icon: string;
  tone: EthicsTone;
  countSuffix: string;
  corner: "number" | "category";
  /** {n} is the directive's number. */
  footer: string;
  noteLabel: string;
  directives: EthicsDirective[];
  count: number;
}

export interface ResearchEthicsContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    badge: string;
    body: string;
    filterLabel: string;
    allLabel: string;
    allSuffix: string;
  };
  groups: EthicsGroup[];
  banner: { kicker: string; heading: string; badge: string; body: string };
  note: { text: string; tagline: string };
  total: number;
}

/** What the page shipped with, and what it falls back to if the API is down. */
export const DEFAULT_ETHICS: ResearchEthicsContent = {
  pageTitle: "Research Ethics",
  pageSubtitle: "Institutional Code of Ethics for Research, Organizational Commitments & Guidelines for Scientific Researchers",
  intro: {
    kicker: "Academic Integrity & Regulatory Standards",
    heading: "Code of Ethics for Research",
    badge: "PCI & GTU Compliant",
    body: "Following code of Ethics for Research provides major benefits to research organisations, researcher and general public. It helps to conduct research of the highest quality and standards.",
    filterLabel: "Display Mode:",
    allLabel: "All Code of Ethics",
    allSuffix: "Directives"
  },
  groups: [
    {
      id: "organization",
      buttonLabel: "Code for Organization",
      title: "Code of Ethics for Organization",
      subtitle: "Institutional governance mandates & infrastructure assurances",
      icon: "Building2",
      tone: "emerald",
      countSuffix: "Directives",
      corner: "number",
      footer: "Institutional Commitment",
      noteLabel: "Procedural Directive:",
      directives: [
        {
          id: "quality-excellence",
          title: "Quality & Academic Excellence",
          description: "Shall strive to disseminate work of the highest quality and excellence while conducting research.",
          note: "",
          category: "",
          icon: "Sparkles",
          highlight: false
        },
        {
          id: "dignity-rights-safety",
          title: "Dignity, Rights & Safety Assurance",
          description: "Shall ensure the dignity, rights, safety and wellbeing of all involved in research and avoid unreasonable risk or harm to research subjects, patients, participants, researchers and others.",
          note: "",
          category: "",
          icon: "HeartHandshake",
          highlight: false
        },
        {
          id: "health-safety-compliance",
          title: "Health & Safety Compliance",
          description: "Should ensure that all research is carried out keeping in mind the health, safety legislation and good laboratory practice (GLP).",
          note: "",
          category: "",
          icon: "Shield",
          highlight: false
        },
        {
          id: "good-practice-standards",
          title: "Integral Good Practice Standards",
          description: "Shall ensure that good practice forms an important and integral part of all institutional research endeavors.",
          note: "",
          category: "",
          icon: "BadgeCheck",
          highlight: false
        },
        {
          id: "clear-policies",
          title: "Clear Policies & Dissemination",
          description: "Shall establish clear policies and procedures that cover the principles of good practice in research and make researchers fully aware of these policies and procedures.",
          note: "",
          category: "",
          icon: "FileCheck2",
          highlight: false
        }
      ],
      count: 5
    },
    {
      id: "researcher",
      buttonLabel: "Code for Researcher",
      title: "Code of Ethics for Researcher",
      subtitle: "Faculty, Ph.D. scholars, and student researcher conduct protocols",
      icon: "UserCheck",
      tone: "blue",
      countSuffix: "Directives",
      corner: "category",
      footer: "Code Directive #{n}",
      noteLabel: "Procedural Directive:",
      directives: [
        {
          id: "open-knowledge-exchange",
          title: "Open Knowledge Exchange",
          description: "Shall promote the open exchange of ideas, research methods, data and results across the scientific community.",
          note: "",
          category: "Integrity",
          icon: "Share2",
          highlight: false
        },
        {
          id: "zero-tolerance-misconduct",
          title: "Zero Tolerance for Misconduct & Fraud",
          description: "Misconduct in academic research such as plagiarism, piracy, abuse of intellectual property and research resource, defamation, misinterpretation, fabrication and fraud must be avoided in carrying out research.",
          note: "",
          category: "Integrity",
          icon: "AlertTriangle",
          highlight: true
        },
        {
          id: "collegiality-integrity",
          title: "Collegiality & Experimental Integrity",
          description: "Shall not try to sabotage others from completing their work by either damaging or disrupting data or experiments of others; or wilfully failing to observe their terms and conditions.",
          note: "",
          category: "Integrity",
          icon: "Lock",
          highlight: false
        },
        {
          id: "public-accountability",
          title: "Public Accountability & Ethics Review",
          description: "Shall realize that by their work they are accountable to the general public and should act accordingly.",
          note: "Researcher must comply with all legal and ethical requirements and other guidelines that apply to their research and must submit research proposals for review before ethics committee where appropriate and abide by the outcome of that review.",
          category: "Accountability",
          icon: "Scale",
          highlight: true
        },
        {
          id: "protection-of-subjects",
          title: "Protection of Subjects & Risk Mitigation",
          description: "Shall not expose the animals or subjects to unnecessary harm when conducting studies and must try to anticipate any risks that the proposed research might produce to them.",
          note: "",
          category: "Animal Welfare",
          icon: "Heart",
          highlight: false
        },
        {
          id: "transparent-peer-review",
          title: "Transparent Peer Review & Editorial Disclosure",
          description: "Shall make research designs available to peer reviewers and journal editors when submitting research reports for publication.",
          note: "",
          category: "Compliance & Publishing",
          icon: "Eye",
          highlight: false
        },
        {
          id: "conflict-of-interest",
          title: "Conflict of Interest Declaration",
          description: "Shall try to identify conflict of interest, and must be declared and addressed in order to avoid poor practice in research.",
          note: "",
          category: "Integrity",
          icon: "UserCheck",
          highlight: false
        },
        {
          id: "three-rs-principle",
          title: "3Rs Principle (Reduction, Replacement, Refinement)",
          description: "Shall consider the opportunities for reduction, replacement and refinement of involving animals in research projects.",
          note: "",
          category: "Animal Welfare",
          icon: "Leaf",
          highlight: false
        },
        {
          id: "grant-terms-adherence",
          title: "Grant Terms & Regulatory Adherence",
          description: "Researchers should ensure that the terms and conditions of any grant or contract related to the research are strictly adhered to.",
          note: "",
          category: "Compliance & Publishing",
          icon: "FileText",
          highlight: false
        }
      ],
      count: 9
    }
  ],
  banner: {
    kicker: "Animal Welfare & Bio-Ethics Principle",
    heading: "The 3Rs Framework (Replacement, Reduction & Refinement)",
    badge: "CCSEA / CPCSEA Guidelines",
    body: "All preclinical protocols, animal testing investigations, and pharmacological assays conducted at CKPIPSR strictly follow the ethical principles of Replacement (alternative models), Reduction (minimal animal subject count), and Refinement (humane housing and analgesia) monitored under the Institutional Animal Ethics Committee (IAEC)."
  },
  note: {
    text: "Formally approved by the Academic Council, Research Committee, and Institutional Ethics Advisory Body at CKPIPSR.",
    tagline: "CKPIPSR Research Ethics Office"
  },
  total: 14
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ResearchEthicsContent {
  if (typeof value !== "object" || value === null) return false;
  const e = value as Partial<ResearchEthicsContent>;
  return !!e.pageTitle && Array.isArray(e.groups) && e.groups.every((g) => Array.isArray(g?.directives));
}

export function useResearchEthics(): ResearchEthicsContent {
  const [content, setContent] = useState<ResearchEthicsContent>(DEFAULT_ETHICS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/research/ethics"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.ethics)) setContent(body.ethics);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
