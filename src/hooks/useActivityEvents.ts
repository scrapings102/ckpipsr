import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";
import {
  ACTIVITY_EVENTS,
  ACTIVITY_EVENT_PHOTOS,
  EVENT_CATEGORIES,
} from "../data/activityEventsData";

/**
 * Activities → Events.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down. They are built from the scraped event list rather than
 * copied, so the two cannot drift apart.
 *
 * Cards arrive with their category's name and report link already worked out,
 * and `counts` holds how many events sit in each category, for the filter bar.
 */
/** One line the homepage gazette board draws for an event. */
export interface GazetteEntry {
  id: string;
  title: string;
  /** yyyy-mm-dd. */
  date: string;
  excerpt: string;
  categoryTag: string;
  content: string;
  location: string;
  reportUrl: string;
}

export interface ActivityEventCard {
  title: string;
  /** A category id; blank means the card draws no pill. */
  categoryId: string;
  /** A tab of the homepage gazette board, or blank to stay off it. */
  gazetteTab: string;
  /** yyyy-mm-dd, the date the board prints. */
  gazetteDate: string;
  /** The category's name, as the pill prints it. */
  category: string;
  conductedBy: string;
  participants: string;
  duration: string;
  report: string;
  reportUrl: string;
}

export interface EventCategory {
  id: string;
  label: string;
}

export interface ActivityEventsContent {
  pageTitle: string;
  pageSubtitle: string;
  banner: { badge: string; heading: string; body: string };
  filter: { label: string; allLabel: string };
  categories: EventCategory[];
  list: { allHeading: string; filteredHeading: string; showingLabel: string };
  events: ActivityEventCard[];
  empty: { title: string; body: string };
  gallery: { heading: string; subtitle: string; photos: string[] };
  counts: Record<string, number>;
  /**
   * The events an editor put on the homepage gazette board, by tab, at most
   * gazetteLimit of each and in the order they are listed on the page.
   */
  gazette: Record<string, GazetteEntry[]>;
  gazetteLimit: number;
}

const idFor = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const DEFAULT_CATEGORIES: EventCategory[] = EVENT_CATEGORIES.map((label) => ({
  id: idFor(label),
  label,
}));

const DEFAULT_EVENTS: ActivityEventCard[] = ACTIVITY_EVENTS.map((event) => ({
  title: event.title,
  categoryId: event.category ? idFor(event.category) : "",
  // Nothing shipped on the board; an editor puts it there.
  gazetteTab: "",
  gazetteDate: "",
  category: event.category ?? "",
  conductedBy: event.conductedBy ?? "",
  participants: event.participants ?? "",
  duration: event.duration ?? "",
  report: event.report ?? "",
  reportUrl: event.report
    ? `https://ckpipsr.ac.in/documents/activities/events/${encodeURIComponent(event.report)}.pdf`
    : "",
}));

export const DEFAULT_ACTIVITY_EVENTS: ActivityEventsContent = {
  pageTitle: "Campus Events",
  pageSubtitle: "Academic Portal — Activities",
  banner: {
    badge: "Co-Curricular Hub",
    heading: "Symposia, Contests & Initiatives",
    body: "CKPIPSR encourages an interactive environment with academic quizzes, healthcare campaigns, awareness sessions, and collaborative national activities to shape professional pharmacy leaders.",
  },
  filter: { label: "Filter by Category", allLabel: "All" },
  categories: DEFAULT_CATEGORIES,
  list: {
    allHeading: "All Activity Events",
    filteredHeading: "{category}s",
    showingLabel: "Showing {count} of {total}",
  },
  events: DEFAULT_EVENTS,
  empty: {
    title: "No Events Listed",
    body: "There are no current events registered under the selected category at this time.",
  },
  gallery: {
    heading: "Campus Event Chronicles",
    subtitle:
      "A chronological photo feed documenting the interactive celebrations, workshops, and student assemblies.",
    photos: ACTIVITY_EVENT_PHOTOS,
  },
  counts: Object.fromEntries(
    DEFAULT_CATEGORIES.map((c) => [c.id, DEFAULT_EVENTS.filter((e) => e.categoryId === c.id).length]),
  ),
  gazette: {},
  gazetteLimit: 6,
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ActivityEventsContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<ActivityEventsContent>;
  return (
    Array.isArray(c.events) &&
    Array.isArray(c.categories) &&
    !!c.list?.showingLabel &&
    !!c.banner?.heading
  );
}

export function useActivityEvents(): ActivityEventsContent {
  const [content, setContent] = useState<ActivityEventsContent>(DEFAULT_ACTIVITY_EVENTS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/activities/events"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.events)) setContent({ counts: {}, gazette: {}, gazetteLimit: 6, ...body.events });
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
