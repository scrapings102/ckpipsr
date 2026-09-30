import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * About Us → Who We Are → Vision and Mission.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down.
 */
export interface CoreValue {
  icon: string;
  name: string;
  description: string;
}

export interface VisionMissionContent {
  pageTitle: string;
  pageSubtitle: string;
  vision: { label: string; statement: string; footnoteLead: string; footnoteAccent: string };
  mission: { label: string; items: string[]; footnoteLead: string; footnoteAccent: string };
  values: { eyebrow: string; title: string; items: CoreValue[] };
  cta: { headingLead: string; headingAccent: string; body: string };
}

export const DEFAULT_VISION_MISSION: VisionMissionContent = {
  pageTitle: "Vision & Mission",
  pageSubtitle: "Guiding our academic directives, student governance, and daily campus endeavors.",
  vision: {
    label: "Our Vision",
    statement:
      '"To develop pharmacy graduates with fundamental knowledge and professional competence to improve healthcare need of community and industry."',
    footnoteLead: "Official Institutional",
    footnoteAccent: "Vision Statement",
  },
  mission: {
    label: "Our Mission",
    items: [
      "To provide state-of-art teaching learning process.",
      "To train students as technical/knowledgeable workforce.",
      "To develop pharmacy professionals as responsible citizens.",
    ],
    footnoteLead: "Strategic Academic",
    footnoteAccent: "Directives",
  },
  values: {
    eyebrow: "Ethical Foundation",
    title: "Our Core Institutional Values",
    items: [
      { icon: "ShieldCheck", name: "Academic Integrity", description: "Upholding the highest moral and ethical standards in all educational activities, examinations, research work, and social interactions." },
      { icon: "Rocket", name: "Student Empowerment", description: "Enabling students with robust computing, corporate, and manager skills, fostering independence and confidence." },
      { icon: "Heart", name: "Inclusivity & Equity", description: "Embracing diverse cultural and economic student backgrounds, nurturing an unbiased, supportive community." },
      { icon: "Compass", name: "Continuous Innovation", description: "Staying updated with industrial trends by regularly modernizing facilities, learning media, and training techniques." },
    ],
  },
  cta: {
    headingLead: "Committed to the",
    headingAccent: "Future of Pharmacy",
    body: "At CKPIPSR, we don't just teach pharmacy; we nurture leaders who will revolutionize healthcare through ethical research and technical excellence.",
  },
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is VisionMissionContent {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<VisionMissionContent>;
  return (
    typeof v.vision?.statement === "string" &&
    Array.isArray(v.mission?.items) &&
    v.mission.items.length > 0 &&
    Array.isArray(v.values?.items) &&
    v.values.items.length > 0
  );
}

export function useVisionMissionContent(): VisionMissionContent {
  const [content, setContent] = useState<VisionMissionContent>(DEFAULT_VISION_MISSION);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/vision-mission"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.visionMission)) setContent(body.visionMission);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
