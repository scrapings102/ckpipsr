import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * About Us → Governance & Leadership → Contact Us.
 *
 * Defaults are what the page shipped with and stay the fallback, so it renders
 * if the API is down.
 */
export interface ContactContent {
  pageTitle: string;
  pageSubtitle: string;
  banner: { image: string; imageAlt: string; badge: string; headingLead: string; headingAccent: string };
  address: { title: string; text: string };
  /** note: the amber pill under the days, e.g. 2nd and 4th Saturday off. */
  timings: { title: string; hours: string; days: string; note: string };
  phones: { title: string; numbers: string[] };
  emails: { title: string; addresses: string[] };
  map: { title: string; subtitle: string; buttonLabel: string; directionsUrl: string; embedUrl: string };
}

const PB =
  "pb=!1m14!1m8!1m3!1d5923.654116328731!2d72.71618443860855!3d21.13191122833264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be052ae998fda3d%3A0x23340ab807f12d7!2sC.K.%20Pthawalla%20Institute%20of%20Pharmaceutical%20Science%20and%20Research!5e0!3m2!1sen!2sin!4v1679122645038!5m2!1sen!2sin";

export const DEFAULT_CONTACT: ContactContent = {
  pageTitle: "Contact Us",
  pageSubtitle: "Reach out to C. K. Pithawalla Institute of Pharmaceutical Science & Research.",
  banner: {
    image: "/images/hero/65efeac7d49a3.webp",
    imageAlt: "CKPIPSR Campus",
    badge: "Modern Campus Infrastructure",
    headingLead: "Visit our Pharmaceutical",
    headingAccent: "Innovation Hub"
  },
  address: {
    title: "Campus Address",
    text: "Opposite Surat Airport, Behind DPS School, Near Malvan Mandir, Dumas Road, Surat - 395007, Gujarat, India."
  },
  timings: {
    title: "Institute Timings",
    hours: "09:30 AM – 05:00 PM",
    days: "Monday to Saturday",
    note: "2nd and 4th Saturday off"
  },
  phones: {
    title: "Direct Connect",
    numbers: [
      "+91 63550 65636",
      "+91 90990 63116"
    ]
  },
  emails: {
    title: "Official Email",
    addresses: [
      "ckpipsr@gmail.com"
    ]
  },
  map: {
    title: "Geographic Location",
    subtitle: "Strategically located near Surat International Airport.",
    buttonLabel: "Get Directions",
    directionsUrl: "https://goo.gl/maps/embed?pb=!1m14!1m8!1m3!1d5923.654116328731!2d72.71618443860855!3d21.13191122833264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be052ae998fda3d%3A0x23340ab807f12d7!2sC.K.%20Pthawalla%20Institute%20of%20Pharmaceutical%20Science%20and%20Research!5e0!3m2!1sen!2sin!4v1679122645038!5m2!1sen!2sin",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5923.654116328731!2d72.71618443860855!3d21.13191122833264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be052ae998fda3d%3A0x23340ab807f12d7!2sC.K.%20Pthawalla%20Institute%20of%20Pharmaceutical%20Science%20and%20Research!5e0!3m2!1sen!2sin!4v1679122645038!5m2!1sen!2sin"
  }
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ContactContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<ContactContent>;
  return (
    !!c.banner?.image &&
    !!c.map?.embedUrl &&
    Array.isArray(c.phones?.numbers) &&
    Array.isArray(c.emails?.addresses)
  );
}

export function useContactContent(): ContactContent {
  const [content, setContent] = useState<ContactContent>(DEFAULT_CONTACT);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/contact"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.contact)) setContent(body.contact);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
