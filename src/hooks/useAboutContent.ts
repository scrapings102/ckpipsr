import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The homepage About band's editable content.
 *
 * The defaults below are what the section rendered before it was editable, and
 * they stay the fallback: the homepage must render if the API is down. So the
 * hook returns them immediately and swaps in the fetched content when it
 * arrives — there is no loading state and no empty band.
 */
export interface AboutFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AboutButton {
  label: string;
  path: string;
}

export interface AboutContent {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  body: string[];
  features: AboutFeature[];
  primaryButton: AboutButton;
  secondaryButton: AboutButton;
  image: { src: string; alt: string };
  caption: { eyebrow: string; title: string; subtitle: string };
  badge: { title: string; subtitle: string };
}

export const DEFAULT_ABOUT: AboutContent = {
  eyebrow: "Established 2005 • GTU Affiliated • PCI Approved",
  headingLead: "Where Pharmaceutical Science Meets",
  headingAccent: "Future-Ready Innovation",
  body: [
    "**C.K. Pithawalla Institute of Pharmaceutical Science and Research (CKPIPSR)** is a premier higher education institution in Surat, Gujarat. Managed by the esteemed **Navyug Vidyabhavan Trust**, our campus is dedicated to nurturing future healthcare professionals, formulation scientists, clinical pharmacists, and pharmaceutical researchers.",
    "Situated along Dumas Road near Malvan Mandir, our institution blends rigorous academic curriculum with hands-on skill development, modern smart classrooms, high-tech instrumentation laboratories, and a rich botanical herbal garden."
  ],
  features: [
    {
      icon: "Award",
      title: "Legacy Trust",
      description: "Navyug Vidyabhavan Trust leadership"
    },
    {
      icon: "GraduationCap",
      title: "Pharma Programs",
      description: "D.Pharm, B.Pharm, M.Pharm (Pharmaceutics)"
    },
    {
      icon: "Building2",
      title: "Smart Campus",
      description: "Testing labs & herbal garden"
    },
    {
      icon: "ShieldCheck",
      title: "Placement Cell",
      description: "Active industry recruitment"
    }
  ],
  primaryButton: {
    label: "Read Full Overview",
    path: "/about/profile"
  },
  secondaryButton: {
    label: "Vision & Mission",
    path: "/about/vision-mission"
  },
  image: {
    src: "/images/hero/66e151f0d6a90.webp",
    alt: "CKPIPSR Campus Surat"
  },
  caption: {
    eyebrow: "Dumas Road, Surat Campus",
    title: "C. K. Pithawalla Educational Complex",
    subtitle: "Empowering students with knowledge, integrity, and future-ready skills."
  },
  badge: {
    title: "PCI Approved",
    subtitle: "GTU Affiliated"
  }
};

/** Enough of a check that a malformed response cannot empty the section. */
function isUsable(value: unknown): value is AboutContent {
  if (typeof value !== "object" || value === null) return false;
  const a = value as Partial<AboutContent>;
  return (
    typeof a.headingLead === "string" &&
    typeof a.headingAccent === "string" &&
    Array.isArray(a.body) &&
    a.body.length > 0 &&
    Array.isArray(a.features) &&
    !!a.image?.src
  );
}

export function useAboutContent(): AboutContent {
  const [about, setAbout] = useState<AboutContent>(DEFAULT_ABOUT);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/home/about"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.about)) setAbout(body.about);
      })
      // The homepage does not depend on the API being up, so a failure here is
      // not worth surfacing to a visitor.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return about;
}
