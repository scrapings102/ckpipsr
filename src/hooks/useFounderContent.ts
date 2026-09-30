import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * About Us → Governance & Leadership → The Founder.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down.
 */
export interface FounderVideo {
  /** An 11-character YouTube id; the page builds the embed URL. */
  youtubeId: string;
  title: string;
}

export interface FounderMilestone {
  year: string;
  title: string;
  description: string;
}

export interface FounderContent {
  pageTitle: string;
  pageSubtitle: string;
  portrait: { image: string; name: string; role: string };
  motto: { label: string; text: string };
  eyebrow: string;
  heading: string;
  body: string[];
  quote: string;
  media: { title: string; videos: FounderVideo[] };
  timeline: { title: string; items: FounderMilestone[] };
}

export const DEFAULT_FOUNDER: FounderContent = {
  pageTitle: "Our Visionary Founder",
  pageSubtitle:
    "Late Shri Chhotubhai Pithawalla — the benevolent industrialist and reformer behind C.K. Pithawalla institutions.",
  portrait: {
    image: "https://ckpipsr.ac.in/images/about/founder.jpg",
    name: "Late Shri Chhotubhai Pithawalla",
    role: "Visionary Founder & Benefactor",
  },
  motto: {
    label: "Philanthropic Motto",
    text: "Education is the highest form of service to humanity and nation building.",
  },
  eyebrow: "A Legacy of Philanthropy",
  heading: "A Life Dedicated to Educational Upliftment in South Gujarat",
  body: [
    "Shri Chhotubhai Pithawalla was an exceptional industrialist, philanthropist, and visionary educational reformer. Born into a modest family, he went on to build prominent industrial business lines in Gujarat, but his heart remained dedicated to social welfare and educational upliftment.",
    "He firmly believed that sustainable regional progress begins in classrooms. Guided by this principle, he channeled substantial parts of his wealth, assets, and time into supporting the **Navyug Vidyabhavan Trust**, Surat, establishing world-class educational institutions.",
    "In 2005, Shri Chhotubhai played a pivotal role in establishing **C.K. Pithawalla Institute of Pharmaceutical Science and Research**, providing prime educational infrastructure on the Surat-Dumas Road.",
    'He is very much religious and believes in "Karma". He believes that we have to work in the direction to improve the quality of human life and to help the down-trodden people in their upliftment.',
  ],
  quote:
    "To sow the seeds of an educational institution under whose shade future generations may thrive is the noble legacy one can leave behind.",
  media: {
    title: "Legacy in Media",
    videos: [
      { youtubeId: "WdZUswHH5uY", title: "Legacy of Shri C.K. Pithawalla - Video 1" },
      { youtubeId: "EvKkq81l18k", title: "Legacy of Shri C.K. Pithawalla - Video 2" },
    ],
  },
  timeline: {
    title: "Key Historical Highlights",
    items: [
      { year: "1930s", title: "Early Life & Values", description: "Born into a modest environment, developing a lifelong passion for social welfare and educational upliftment." },
      { year: "1960s", title: "Industrial Leadership", description: "Recognized that Gujarat's rapid industrialization required ethically grounded commerce, tech, and administrative professionals." },
      { year: "1970s", title: "Trust Endowments", description: "Began supporting the Navyug Vidyabhavan Trust with prime land endowments and funds to build higher educational colleges." },
      { year: "2005", title: "CKPIPSR Inception", description: "Donated prime Dumas Road land and capital to establish C.K. Pithawalla Institute of Pharmaceutical Science and Research." },
    ],
  },
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is FounderContent {
  if (typeof value !== "object" || value === null) return false;
  const f = value as Partial<FounderContent>;
  return (
    !!f.portrait?.image &&
    Array.isArray(f.body) &&
    f.body.length > 0 &&
    Array.isArray(f.media?.videos) &&
    Array.isArray(f.timeline?.items)
  );
}

export function useFounderContent(): FounderContent {
  const [content, setContent] = useState<FounderContent>(DEFAULT_FOUNDER);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/founder"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.founder)) setContent(body.founder);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
