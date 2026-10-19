import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The Courses band on the homepage, as edited in the admin panel.
 *
 * The defaults are what the band showed before it had an editor, so it looks
 * the same with the API down.
 *
 * The band picks courses from Courses Offered: each tile arrives with the
 * course's menu name (`title`), full name (`subtitle`) and the duration from
 * its course page already filled in. Only the description and picture are
 * the band's own.
 */
export interface HomeCourseItem {
  /** The course's id on Courses Offered. */
  courseId: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
}

export interface HomeCoursesContent {
  eyebrow: string;
  heading: string;
  mobileHint: string;
  buttonLabel: string;
  /** Where the button goes; blank or missing scrolls down to the admissions band. */
  buttonHref?: string;
  items: HomeCourseItem[];
}

export const DEFAULT_HOME_COURSES: HomeCoursesContent = {
  eyebrow: "Offered Courses",
  heading: "Academic Programmes",
  mobileHint:
    "Tap on any course box below to view detailed program curriculum, eligibility criteria, and admission guidance.",
  buttonLabel: "Apply for Admission",
  items: [
    {
      courseId: "d-pharm",
      title: "D.Pharm",
      subtitle: "Diploma in Pharmacy",
      description:
        "A 2-year foundational PCI-approved program in pharmaceutical sciences, hospital pharmacy operations, dispensing, and community healthcare practice.",
      image: "/media/unsplash/photo-1584308666744-24d5c474f2ae-ff9b65.jpg",
      duration: "2 Years",
    },
    {
      courseId: "b-pharm",
      title: "B.Pharm",
      subtitle: "Bachelor of Pharmacy",
      description:
        "A comprehensive 4-year undergraduate degree which includes pharmaceutical chemistry, pharmaceutics, pharmacology, and pharmacognosy with full industrial training.",
      image: "/media/unsplash/photo-1581091226825-a6a2a5aee158-724325.jpg",
      duration: "4 Years",
    },
    {
      courseId: "m-pharm",
      title: "M.Pharm",
      subtitle: "Master of Pharmacy",
      description:
        "A 2-year specialized post-graduate research degree in Pharmaceutics to foster advanced formulation design, drug delivery, and regulatory science.",
      image: "/media/unsplash/photo-1584308666744-24d5c474f2ae-ff9b65.jpg",
      duration: "2 Years",
    },
    {
      courseId: "short-term-certificate",
      title: "Short Term Certificate",
      subtitle: "Short Term Certificate",
      description:
        "Specialized professional certificate program in Pharmaceutical Dossier Preparation & Filing (CTD / eCTD format) for regulatory affairs careers.",
      image: "/media/unsplash/photo-1532187863486-abf9dbad1b69-4f4df6.jpg",
      duration: "60 Hours (8 weeks, Sat/Sun only, Online)",
    },
  ],
};

function isUsable(value: unknown): value is HomeCoursesContent {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<HomeCoursesContent>;
  return (
    typeof v.heading === "string" &&
    Array.isArray(v.items) &&
    v.items.length > 0 &&
    v.items.every((i) => typeof i?.image === "string" && typeof i.duration === "string")
  );
}

export function useHomeCoursesContent(): HomeCoursesContent {
  const [content, setContent] = useState<HomeCoursesContent>(DEFAULT_HOME_COURSES);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/home/courses"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.courses)) setContent(body.courses);
      })
      // The band does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
