import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * About Us → Governance & Leadership → Deans and Faculty In-charges.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down. The page is the Academic Council banner and the
 * committee document; the people themselves are on the Faculties page, which
 * every other page links to.
 */

/** The committee document card under the banner. An empty url hides the card. */
export interface DeansDocument {
  title: string;
  text: string;
  buttonLabel: string;
  url: string;
}

export interface DeansContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: { badge: string; title: string; body: string };
  /** Always set here: a stored page without one gets the default below. */
  document: DeansDocument;
}

export const DEFAULT_DEANS: DeansContent = {
  pageTitle: "Deans and Faculty In-charges",
  pageSubtitle: "Academic and administrative leadership at C. K. Pithawalla Institute of Pharmaceutical Science & Research.",
  document: {
    title: "Deans & Faculty In-Charges Document",
    text: "Click the button below to view or download the official committee document for Deans and Faculty In-charges.",
    buttonLabel: "View Deans & Faculty PDF",
    url: "/media/trust/app/institutes/102/departments/docs/66e2bf456dbbc.pdf",
  },
  intro: {
    badge: "Academic Council",
    title: "Deans & Portfolio In-charges",
    body: "The esteemed faculty members listed below form the core Academic Council for the year 2024-2025, overseeing research, regulatory compliance, and curricula excellence."
  },
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is DeansContent {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Partial<DeansContent>;
  return (
    typeof d.pageTitle === "string" &&
    typeof d.intro?.title === "string" &&
    typeof d.intro.body === "string"
  );
}

export function useDeansContent(): DeansContent {
  const [content, setContent] = useState<DeansContent>(DEFAULT_DEANS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/deans"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        // A page saved before the document card was editable has none, so it
        // keeps the card it always had.
        if (isUsable(body.deans)) setContent({ ...body.deans, document: body.deans.document ?? DEFAULT_DEANS.document });
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
