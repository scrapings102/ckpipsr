import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * About Us → Who We Are → The Trust.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down.
 */
export interface TrustInstitute {
  name: string;
  intake: string;
}

export interface TrustCharterCard {
  icon: string;
  tone: string;
  title: string;
  description: string;
}

export interface TrustContent {
  pageTitle: string;
  pageSubtitle: string;
  banner: { image: string; imageAlt: string; badge: string; title: string; subtitle: string };
  narrative: { title: string; registration: string; body: string[] };
  institutes: {
    eyebrow: string;
    title: string;
    nameColumn: string;
    intakeColumn: string;
    items: TrustInstitute[];
  };
  charter: TrustCharterCard[];
}

export const DEFAULT_TRUST: TrustContent = {
  pageTitle: "Navyug Vidyabhavan Trust",
  pageSubtitle:
    "The parent governing educational board behind C.K. Pithawalla and Navyug institutions since 1965.",
  banner: {
    image: "/images/hero/65efea4943a49.webp",
    imageAlt: "Navyug Vidyabhavan Trust",
    badge: "Established 1965",
    title: "Navyug Vidyabhavan Trust",
    subtitle: "A legacy of over 55 years in serving the educational needs of South Gujarat.",
  },
  narrative: {
    title: "Genesis of Navyug Trust",
    registration: "Reg. No: 1268 (Bombay Public Trust Act 1950)",
    body: [
      "The **Navyug Vidyabhavan Trust** was established in February 1965 with the noble goal of democratizing higher education opportunities in South Gujarat. Founded by the visionary **Vashi Family**, the trust began its journey by establishing premier colleges to serve students from diverse socioeconomic backgrounds.",
      "The trust has been graced by distinguished leadership throughout its history. **Late Shri Morarji Desai**, the former Prime Minister of India, served as the President of the trust, guiding its early developmental phases with high moral and nationalistic values.",
      "**Shri C.K. Pithawalla** joined the trust as a Trustee on 2nd May 1990 and later took over the mantle of President. His dynamic leadership and benevolent contributions transformed the trust into a premier educational hub, establishing several professional colleges named in his honor.",
      "Over the decades, the trust has earned immense respect for its democratic, merit-based admission guidelines and premium infrastructure setup. Under its expert governing board, the trust ensures that all affiliate colleges maintain high academic standards.",
    ],
  },
  institutes: {
    eyebrow: "Sister Institutions",
    title: "Institutes Managed by the Trust",
    nameColumn: "Name of Institute",
    intakeColumn: "Approved Intake",
    items: [
      { name: "Navyug Arts College", intake: "685" },
      { name: "Navyug Science College", intake: "525" },
      { name: "Navyug Commerce College", intake: "150" },
      { name: "Maniben Pithawalla ITI", intake: "240" },
      { name: "C.K. Pithawalla College of Engineering & Technology", intake: "420" },
      { name: "C.K. Pithawalla Inst. of Pharmaceutical Science & Research", intake: "100" },
      { name: "C.K. Pithawalla College of Commerce-Management & Computer Application", intake: "860" },
    ],
  },
  charter: [
    {
      icon: "ShieldCheck", tone: "dark", title: "Registration & Compliance",
      description: "The Trust is registered under the Bombay Public Trust Act 1950, holding Registration Number 1268. We adhere to the highest standards of transparency and educational regulation.",
    },
    {
      icon: "Award", tone: "light", title: "Merit & Excellence",
      description: "Our institutions follow a democratic, merit-based admission policy, ensuring that quality education remains accessible to all deserving candidates across South Gujarat.",
    },
  ],
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is TrustContent {
  if (typeof value !== "object" || value === null) return false;
  const t = value as Partial<TrustContent>;
  return (
    !!t.banner?.image &&
    Array.isArray(t.narrative?.body) &&
    t.narrative.body.length > 0 &&
    Array.isArray(t.institutes?.items) &&
    Array.isArray(t.charter)
  );
}

export function useTrustContent(): TrustContent {
  const [content, setContent] = useState<TrustContent>(DEFAULT_TRUST);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/trust"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.trust)) setContent(body.trust);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
