import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The hero's editable content, fetched from the admin API.
 *
 * The defaults below are what the hero rendered before it was editable, and
 * they stay the fallback: the homepage must render if the API is down, slow,
 * or simply not running on a developer's machine. So the hook returns the
 * defaults immediately and swaps in the fetched content when it arrives —
 * there is no loading state and no blank hero.
 */
export interface HeroImage {
  src: string;
  position: string;
  alt: string;
}

export interface HeroContent {
  tagline: string;
  scrollLabel: string;
  rotationMs: number;
  overlayOpacity: number;
  images: HeroImage[];
}

export const DEFAULT_HERO: HeroContent = {
  tagline:
    '"A legacy of academic and professional excellence in Surat. Inspiring and preparing the next generation of pharmacists, clinical researchers, and healthcare leaders since 2005."',
  scrollLabel: "Scroll to explore",
  rotationMs: 6000,
  overlayOpacity: 40,
  images: [
    { src: "/images/hero/65efeaeece007.webp", position: "center 15%", alt: "Students on the CKPIPSR campus" },
    { src: "/images/hero/646efc827452b.webp", position: "center 18%", alt: "College building exterior" },
    { src: "/images/hero/65efea4943a49.webp", position: "center 15%", alt: "Students at a campus gathering" },
    { src: "/images/hero/65efeac7d49a3.webp", position: "center 20%", alt: "Pharmacy students in the laboratory" },
    { src: "/images/hero/66e151f0d6a90.webp", position: "center 12%", alt: "Faculty and students at a college event" },
    { src: "/images/hero/66e1522d09fc0.webp", position: "center 15%", alt: "Students during a campus activity" },
    { src: "/images/hero/66e15283951b9.webp", position: "center 12%", alt: "College event on the campus grounds" },
    { src: "/images/hero/66e153e687221.webp", position: "center 12%", alt: "Students and staff at an institute programme" },
    { src: "/images/hero/66e154b724ef6 (1).webp", position: "center 15%", alt: "Tree plantation drive with students and faculty" },
    { src: "/images/hero/66e154b724ef6.webp", position: "center 15%", alt: "Students and faculty at a plantation drive" },
  ],
};

/** Enough of a check that a malformed response cannot blank the hero. */
function isUsable(value: unknown): value is HeroContent {
  if (typeof value !== "object" || value === null) return false;
  const hero = value as Partial<HeroContent>;
  return (
    typeof hero.tagline === "string" &&
    typeof hero.scrollLabel === "string" &&
    typeof hero.rotationMs === "number" &&
    Array.isArray(hero.images) &&
    hero.images.length > 0
  );
}

export function useHeroContent(): HeroContent {
  const [hero, setHero] = useState<HeroContent>(DEFAULT_HERO);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/home/hero"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.hero)) setHero(body.hero);
      })
      // The homepage does not depend on the API being up, so a failure here is
      // not worth surfacing to a visitor.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return hero;
}
