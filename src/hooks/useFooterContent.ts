import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The footer on every page, as edited in the admin panel. The address, phone
 * numbers and email come from the Contact Us page.
 *
 * The defaults are what the footer showed before it had an editor, so the
 * footer looks the same with the API down.
 */
export interface FooterLink {
  label: string;
  /** A path on the site, a homepage anchor ("/#admissions") or an https address. */
  to: string;
}

export interface FooterContent {
  farewell: { lead: string; accent: string };
  programsTitle: string;
  columns: { title: string; links: FooterLink[] }[];
  copyright: string;
  bottomLink: FooterLink;
  contact: { address: string; phones: string[]; emails: string[] } | null;
}

const L = (label: string, to: string): FooterLink => ({ label, to });

export const DEFAULT_FOOTER: FooterContent = {
  farewell: { lead: "Until we meet", accent: "on campus" },
  programsTitle: "Pharmacy Programs",
  columns: [
    {
      title: "Institute",
      links: [
        L("Profile", "/about/profile"),
        L("Vision & Mission", "/about/vision-mission"),
        L("The Founder", "/about/founder"),
        L("Navyug Vidyabhavan Trust", "/about/trust"),
        L("PO and PEOs", "/about/po-peos"),
        L("Campus Map & Directions", "/about/campus-map"),
      ],
    },
    {
      title: "Governance",
      links: [
        L("Governing Body", "/about/governing-body"),
        L("The Principal", "/about/principal"),
        L("Deans & Faculty In-charges", "/about/deans-faculty"),
        L("Faculty", "/academics/faculties"),
        L("IQAC", "/about/iqac"),
        L("Contact Us", "/about/contact-us"),
      ],
    },
    {
      title: "Student Hub",
      links: [
        L("Gazette & Circulars", "/#university-gazette"),
        L("Pharma Blogs", "/#pharma-blogs"),
        L("The College Newsletter", "/#college-newsletter"),
        L("Research Labs & Herbal Garden", "/#campus-life"),
        L("Admissions FAQs", "/#admissions"),
      ],
    },
  ],
  copyright: "C. K. Pithawalla Institute of Pharmaceutical Science & Research",
  bottomLink: L("GTU Portal", "https://www.gtu.ac.in"),
  contact: {
    address:
      "Opposite Surat Airport, Behind DPS School, Near Malvan Mandir, Dumas Road, Surat - 395007, Gujarat, India",
    phones: ["+91 63550 65636", "+91 90990 63116"],
    emails: ["ckpipsr@gmail.com"],
  },
};

function isUsable(value: unknown): value is FooterContent {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<FooterContent>;
  return (
    typeof v.farewell?.lead === "string" &&
    Array.isArray(v.columns) &&
    v.columns.every((c) => Array.isArray(c?.links)) &&
    typeof v.bottomLink?.to === "string"
  );
}

export function useFooterContent(): FooterContent {
  const [content, setContent] = useState<FooterContent>(DEFAULT_FOOTER);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/home/footer"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body || !isUsable(body.footer)) return;
        // No contact details (Contact Us not published yet) keeps the ones shipped with the site.
        setContent({ ...body.footer, contact: body.footer.contact ?? DEFAULT_FOOTER.contact });
      })
      // The footer does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
