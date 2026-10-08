import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Students Corner → Timetables.
 *
 * One card per published timetable. A timetable with no link yet is still
 * listed, with its button greyed, so a semester can go up before its file is
 * ready — `hasFile` says which, worked out on the server.
 *
 * The copy below is the page as it shipped, so a dead API leaves it reading
 * exactly as it always did.
 */
export type TimetableTerm = "Even" | "Odd";

export interface TimetableEntry {
  id: string;
  academicYear: string;
  term: TimetableTerm;
  semester: number;
  /** Empty when the file is not up yet. */
  url: string;
  hasFile: boolean;
}

export interface TimetablesContent {
  pageTitle: string;
  pageSubtitle: string;
  heading: { title: string; intro: string };
  card: { semesterLabel: string; exploreLabel: string; missingLabel: string };
  empty: { title: string; body: string };
  entries: TimetableEntry[];
  entryCount: number;
  fileCount: number;
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_TIMETABLES: TimetablesContent = {
  "pageTitle": "Academic Timetables",
  "pageSubtitle": "Class schedules, laboratory sessions, and lecture timings for Bachelor of Pharmacy.",
  "heading": {
    "title": "Find Your Timetable",
    "intro": "Choose a semester to view or download the timetable."
  },
  "card": {
    "semesterLabel": "Semester",
    "exploreLabel": "Explore",
    "missingLabel": "Not published yet"
  },
  "empty": {
    "title": "No Timetables Yet",
    "body": "Timetables for this term have not been published. Please check back soon."
  },
  "entries": [
    {
      "id": "tt-2022-23-even-sem-6",
      "academicYear": "2022-23",
      "term": "Even",
      "semester": 6,
      "url": "https://drive.google.com/file/d/1XzSNb18w0mOWZh02uVllIeTEZgjZHRMy/view?usp=sharing",
      "hasFile": true
    },
    {
      "id": "tt-2022-23-even-sem-8",
      "academicYear": "2022-23",
      "term": "Even",
      "semester": 8,
      "url": "https://drive.google.com/file/d/1aaxP_SeBZ7mn006x739cdG8y7qRHCoQ7/view?usp=sharing",
      "hasFile": true
    },
    {
      "id": "tt-2022-23-even-sem-4",
      "academicYear": "2022-23",
      "term": "Even",
      "semester": 4,
      "url": "https://drive.google.com/file/d/1HGsLJ_SUIMG94BPV4Di9hwYbAtxiUart/view?usp=sharing",
      "hasFile": true
    },
    {
      "id": "tt-2022-23-even-sem-2",
      "academicYear": "2022-23",
      "term": "Even",
      "semester": 2,
      "url": "https://drive.google.com/file/d/1ajpw8MLdAYk0ZHLp6inJNCCCjKYXkreN/view?usp=sharing",
      "hasFile": true
    }
  ],
  "entryCount": 4,
  "fileCount": 4
};

function isUsable(value: unknown): value is TimetablesContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<TimetablesContent>;
  // An empty list is a real state here — a term with nothing published yet —
  // so only the shape is checked, not the count.
  return (
    Array.isArray(c.entries) &&
    typeof c.card?.exploreLabel === "string" &&
    typeof c.heading?.title === "string"
  );
}

export function useTimetablesContent(): TimetablesContent {
  const [content, setContent] = useState<TimetablesContent>(DEFAULT_TIMETABLES);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/students/timetables"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.timetables)) setContent(body.timetables);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
