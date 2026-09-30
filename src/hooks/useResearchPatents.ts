import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → Research - Patents.
 *
 * Inventors arrive already worked out: a patent credited to a staff member
 * carries the name from the Deans and Faculty page, so this page never has to
 * know where the name came from. The filter buttons are `inventors`.
 */
export interface PatentItem {
  id: string;
  title: string;
  inventor: string;
  applicationNumber: string;
  dateOfFiling: string;
  publishedDate: string;
  status: "Granted" | "Published" | "Filed";
}

export interface ResearchPatentsContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    badgeSuffix: string;
    searchPlaceholder: string;
    filterLabel: string;
  };
  patents: PatentItem[];
  inventors: string[];
  grantedCount: number;
}

const patent = (
  id: string,
  title: string,
  inventor: string,
  applicationNumber: string,
  dateOfFiling: string,
  publishedDate: string,
): PatentItem => ({
  id,
  title,
  inventor,
  applicationNumber,
  dateOfFiling,
  publishedDate,
  status: "Granted",
});

/** What the page shipped with, and what it falls back to if the API is down. */
export const DEFAULT_PATENTS: ResearchPatentsContent = {
  pageTitle: "Patents",
  pageSubtitle:
    "Intellectual Property Rights, Patented Inventions & Pharmaceutical Technology Innovations",
  intro: {
    kicker: "Intellectual Property Rights",
    heading: "Patents Granted to Faculty & Researchers",
    badgeSuffix: "Granted Patents",
    searchPlaceholder: "Search patent title, inventor, app no...",
    filterLabel: "Inventor:",
  },
  patents: [
    patent(
      "a-mouth-dissolving-film-of-granisetron-hydrochloride",
      "A MOUTH DISSOLVING FILM OF GRANISETRON HYDROCHLORIDE",
      "DR. SHAH DHIREN PRAFULKUMAR",
      "202021042061",
      "28/09/2020",
      "30/01/2023",
    ),
    patent(
      "ultracentrifuge-laboratory-apparatus",
      "ULTRACENTRIFUGE LABORATORY APPARATUS FOR SEPARATION OF ANOPARTICLES",
      "DR.VINODKUMAR D. RAMANI",
      "385428-001",
      "02/05/2023",
      "12/09/2023",
    ),
    patent(
      "laboratory-rotary-evaporator-ramani",
      "LABORATORY ROTARY EVAPORATOR FOR EXTRACTION OF HERBAL DRUGS",
      "DR.VINODKUMAR D. RAMANI",
      "384767-001",
      "25/04/2023",
      "10/08/2023",
    ),
    patent(
      "laboratory-rotary-evaporator-jariwala",
      "LABORATORY ROTARY EVAPORATOR FOR EXTRACTION OF HERBAL DRUGS",
      "MR. JITESH JARIWALA",
      "384767-001",
      "25/04/2023",
      "10/08/2023",
    ),
    patent(
      "hptlc-method-for-phthalate-metabolites",
      "HPTLC METHOD FOR DETECTION OF PHTHALATE METABOLITES IN BIOLOGICAL MATERIAL",
      "DR. VAISHNAV DEVENDRA JAYANTILAL",
      "202021024529",
      "11/06/2020",
      "21/09/2023",
    ),
    patent(
      "portable-topical-device-for-ulcers",
      "PORTABLE TOPICAL DEVICE FOR ESTIMATION OF ULCERS IN STOMACH",
      "MR. NAISHADH SOLANKI",
      "394980-001",
      "13/09/2023",
      "30/10/2023",
    ),
  ],
  inventors: [
    "DR. SHAH DHIREN PRAFULKUMAR",
    "DR.VINODKUMAR D. RAMANI",
    "MR. JITESH JARIWALA",
    "DR. VAISHNAV DEVENDRA JAYANTILAL",
    "MR. NAISHADH SOLANKI",
  ],
  grantedCount: 6,
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ResearchPatentsContent {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Partial<ResearchPatentsContent>;
  return !!p.pageTitle && !!p.intro && Array.isArray(p.patents) && Array.isArray(p.inventors);
}

export function useResearchPatents(): ResearchPatentsContent {
  const [content, setContent] = useState<ResearchPatentsContent>(DEFAULT_PATENTS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/research/patents"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.patents)) setContent(body.patents);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
