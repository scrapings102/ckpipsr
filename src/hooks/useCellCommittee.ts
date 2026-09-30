import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * A Cells committee page — ARC, WDC, SC-ST Cell — as the API resolves it:
 * people and tags already filled in from the Cells directory, and squad staff
 * from the Deans and Faculty page.
 */
export interface CommitteeMember {
  role: string;
  name: string;
  designation: string;
  /** A phone number, or an address when `contactIsAddress`. */
  contact: string;
  contactIsAddress: boolean;
  email: string;
  /** A tag label; the filter chips are these. */
  tag: string;
}

export interface SquadMember {
  role: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
}

export interface PublicCommittee {
  slug: string;
  pageTitle: string;
  pageSubtitle: string;
  tabStyle: "pills" | "underline";
  banner: {
    enabled: boolean;
    badge: string;
    heading: string;
    body: string;
    helplineLabel: string;
    helplinePhone: string;
    reportLabel: string;
  };
  mandate: {
    badge: string;
    heading: string;
    /** May be empty when the mandate is a list of points. */
    body: string;
    tone: "green" | "rose";
    icon: "shield" | "handshake" | "scale" | "rocket";
    points: string[];
    /** Hidden when both texts are empty. */
    note: { label: string; body: string; icon: "scale" | "alert" };
  };
  roster: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    searchPlaceholder: string;
    noEmailText: string;
  };
  members: CommitteeMember[];
  /** Tag labels this committee uses, in the directory's order. */
  tags: string[];
  /** Null when the committee has no squad. */
  squad: null | {
    badge: string;
    body: string;
    eyebrow: string;
    heading: string;
    pill: string;
    members: SquadMember[];
  };
  circulars: { eyebrow: string; heading: string; body: string; links: { label: string; url: string }[] };
  complaint: "none" | "incident" | "grievance" | "student";
  footer: { enabled: boolean; text: string; highlight: string };
}

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is PublicCommittee {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<PublicCommittee>;
  return (
    !!c.pageTitle &&
    Array.isArray(c.members) &&
    Array.isArray(c.tags) &&
    !!c.roster &&
    !!c.mandate &&
    Array.isArray(c.circulars?.links)
  );
}

/**
 * One committee by its address.
 *
 * `fallback` is what the site shipped with for that address, if anything — a
 * committee added in the panel has none, so until the API answers there is
 * nothing to draw. `state` tells the two apart: still loading, or no such
 * committee, which is also what a committee switched off looks like.
 */
export function useCellCommittee(
  slug: string,
  fallback: PublicCommittee | undefined,
): { committee: PublicCommittee | null; state: "loading" | "ready" | "missing" } {
  const [content, setContent] = useState<PublicCommittee | null>(fallback ?? null);
  const [state, setState] = useState<"loading" | "ready" | "missing">(fallback ? "ready" : "loading");

  useEffect(() => {
    let cancelled = false;
    setContent(fallback ?? null);
    setState(fallback ? "ready" : "loading");

    fetch(withPreview(`/api/pages/cells/${slug}`))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled) return;
        if (isUsable(body?.committee)) {
          setContent(body.committee);
          setState("ready");
          return;
        }
        // The API answered and has no such committee. What shipped with the
        // site stands only if it is still published, so it is dropped here.
        setContent(null);
        setState("missing");
      })
      // A page that shipped with the site does not depend on the API being up.
      .catch(() => {
        if (cancelled) return;
        setState(fallback ? "ready" : "missing");
      });

    return () => {
      cancelled = true;
    };
    // The fallback is a constant per address; the address is what changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return { committee: content, state: state === "loading" ? "loading" : state };
}
