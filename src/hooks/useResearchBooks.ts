import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → Research - Books.
 *
 * Authors arrive already worked out, as patents' inventors do. The page
 * filters on `scope` and `kind`, both of which are set per work in the panel.
 */
export interface BookItem {
  id: string;
  title: string;
  /** Only a chapter has one. */
  chapterTitle: string;
  author: string;
  scope: "International" | "National";
  kind: "textbook" | "chapter";
  year: number;
  isbn: string;
  publisher: string;
}

export interface ResearchBooksContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: {
    kicker: string;
    heading: string;
    badgeSuffix: string;
    searchPlaceholder: string;
    scopeLabel: string;
    typeLabel: string;
  };
  books: BookItem[];
  worksCount: number;
}

/** What the page shipped with, and what it falls back to if the API is down. */
export const DEFAULT_BOOKS: ResearchBooksContent = {
  pageTitle: "Books & Chapters Published",
  pageSubtitle: "Scholarly Textbooks, Reference Monographs & Authored Book Chapters in Pharmaceutical Sciences",
  intro: {
    kicker: "Scholarly Publications",
    heading: "Authored Books & Chapters",
    badgeSuffix: "Authored Works",
    searchPlaceholder: "Search book, chapter, publisher, ISBN...",
    scopeLabel: "Scope:",
    typeLabel: "Type:",
  },
  books: [
    {
      id: "cystic-fibrosis-lipid-nanoparticles",
      title: "Cystic Fibrosis Disease Management and Advanced Drug Delivery Systems",
      chapterTitle: "Chapter-6-Lipid-Nanoparticles in Treating Cystic Fibrosis",
      author: "Dr Dhiren P. Shah",
      scope: "International",
      kind: "chapter",
      year: 2025,
      isbn: "9781779640406",
      publisher: "Apple Academic Press",
    },
    {
      id: "marine-biopolymers-cancer-therapeutics",
      title: "Marine Biopolymers Processing Functionality and Applications",
      chapterTitle: "Chapter- 15 - Marine biopolymers in cancer therapeutics",
      author: "Dr Dhiren P. Shah",
      scope: "International",
      kind: "chapter",
      year: 2025,
      isbn: "9780443156069 / 9780443156076",
      publisher: "Elsevier",
    },
    {
      id: "nanocarriers-drug-delivery-system",
      title: "Nanocarriers: Drug Delivery System:An Evidence Based Approach",
      chapterTitle: "Chapter 1: Fundamentals of Nanocarriers and Drug Targeting",
      author: "Dr Dhiren P. Shah",
      scope: "International",
      kind: "chapter",
      year: 2021,
      isbn: "978-981-33-4497-6",
      publisher: "SpringerNature©",
    },
    {
      id: "pharmaceutical-industrial-management",
      title: "Text book of Pharmaceutical Industrial Management",
      chapterTitle: "",
      author: "Dr Dhiren P. Shah",
      scope: "International",
      kind: "textbook",
      year: 2010,
      isbn: "978-81-312-2539-4",
      publisher: "©Elsevier",
    },
    {
      id: "experimental-pharmacognosy",
      title: "Experimental pharmacognosy",
      chapterTitle: "",
      author: "Dr Dhiren P. Shah",
      scope: "National",
      kind: "textbook",
      year: 2015,
      isbn: "978-93-832-9052-9",
      publisher: "S.Vikas & Company Jalandhar",
    },
  ],
  worksCount: 5,
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ResearchBooksContent {
  if (typeof value !== "object" || value === null) return false;
  const b = value as Partial<ResearchBooksContent>;
  return !!b.pageTitle && !!b.intro && Array.isArray(b.books);
}

export function useResearchBooks(): ResearchBooksContent {
  const [content, setContent] = useState<ResearchBooksContent>(DEFAULT_BOOKS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/research/books"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.books)) setContent(body.books);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
