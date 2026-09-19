import scrapedDataRaw from "./ckpcet_scraped_data.json";

export interface ContentSection {
  heading: string | null;
  text: string;
}

export interface ContentPage {
  Page: string;
  Title: string;
  URL: string;
  Status: number;
  Sections: ContentSection[];
  Images: string[];
  Videos: string[];
  Documents: string[];
}

export interface ScrapedData {
  [key: string]: ContentPage[];
}

export const scrapedData = scrapedDataRaw as unknown as ScrapedData;

export const categoryDisplayNames: Record<string, string> = {
  "About": "About Us",
  "Academics": "Academics",
  "Students": "Students Corner",
  "Cells": "Cells",
  "Rni": "Research & Innovation",
  "Iqac": "IQAC",
  "Tnp": "T&P",
  "Activities": "Activities"
};

export const categoryUrlPrefixes: Record<string, string> = {
  "About": "about-us",
  "Academics": "academics",
  "Students": "students-corner",
  "Cells": "cells",
  "Rni": "research-and-innovation",
  "Iqac": "iqac",
  "Tnp": "training-and-placement",
  "Activities": "activities"
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Generate the dynamic navigation configuration
export const ckpipsrNavigation: Record<string, { label: string; path: string }[]> = {};

const PAGE_ORDER: Record<string, string[]> = {
  "About Us": [
    "Profile",
    "Vision and Mission",
    "PO and PEOs",
    "The Trust",
    "The Founder",
    "Governing Body",
    "Principal",
    "Deans and Faculty In-charges",
    "Campus Map",
    "Contact Us"
  ],
  "Academics": [
    "Courses Offered",
    "Courses Offered - D.Pharm",
    "Courses Offered - B.Pharm",
    "Courses Offered - M.Pharm",
    "Courses Offered - Short Term Certificate",
    "Approvals",
    "Faculties",
    "Resources",
    "Resources - Laboratories",
    "Resources - Library",
    "Resources - Sports",
    "Resources - Hostel",
    "Resources - Medical",
    "Resources - Transportation",
    "Resources - Seminar Hall",
    "Resources - Cafeteria",
    "Resources - Central Facilities",
    "Resources - EV Charging Station",
    "Resources - Medicinal Garden"
  ],
  "Students Corner": [
    "Timetables",
    "Courses",
    "Scholorships",
    "E-Library",
    "Educational Videos",
    "Hobby Club",
    "Alumni",
    "Student Help Desk"
  ],
  "Cells": [
    "ARC",
    "WDC",
    "SC-ST Cell",
    "GRC",
    "ADC",
    "EDC",
    "GSC"
  ],
  "Research & Innovation": [
    "Research - About",
    "Research - Publications",
    "Research - Patents",
    "Research - Books",
    "Research - Doctoral Studies",
    "Research - PG Projects",
    "Research - Grants",
    "Research - Consultancy",
    "Research - Ethics",
    "Research - MOUs",
    "SSIP - About",
    "SSIP - Mentors",
    "SSIP - Updates",
    "SSIP - Apply",
    "IIC"
  ],
  "IQAC": [
    "About IQAC",
    "IQAC Composition",
    "IQAC Initiatives and Activities",
    "MoMs and ATR",
    "Institution Distinctiveness",
    "Best Practices",
    "NIRF",
    "AISHE",
    "IIQA",
    "IDP",
    "RTI"
  ],
  "T&P": [
    "Placements",
    "Training",
    "Activity",
    "Visits",
    "Committee"
  ],
  "Activities": [
    "Events",
    "Achievements"
  ]
};

Object.keys(categoryDisplayNames).forEach((key) => {
  const label = categoryDisplayNames[key];
  const prefix = categoryUrlPrefixes[key];
  
  const pages = scrapedData[key] || [];
  let items = pages.map((page) => {
    const pageSlug = slugify(page.Page);
    return {
      label: page.Page,
      path: `/${prefix}/${pageSlug}`
    };
  });

  if (key === "About") {
    if (!items.some((i) => i.label === "Campus Map")) {
      items.push({
        label: "Campus Map",
        path: `/${prefix}/campus-map`
      });
    }
  }

  if (key === "Academics") {
    const staffPages = scrapedData["Staff"] || [];
    const staffItems = staffPages.map((page) => {
      const pageSlug = slugify(page.Page);
      return {
        label: page.Page,
        path: `/${prefix}/${pageSlug}`
      };
    });

    const resourcePages = scrapedData["Resources"] || [];
    const resourceItems = resourcePages.map((page) => {
      const fullLabel = page.Page.startsWith("Resources - ") ? page.Page : `Resources - ${page.Page}`;
      const pageSlug = slugify(fullLabel);
      return {
        label: fullLabel,
        path: `/${prefix}/${pageSlug}`
      };
    });
    items = [...items, ...staffItems, ...resourceItems];
  }

  const orderList = PAGE_ORDER[label] || [];
  items.sort((a, b) => {
    const idxA = orderList.indexOf(a.label);
    const idxB = orderList.indexOf(b.label);
    if (idxA === -1 && idxB === -1) return 0;
    if (idxA === -1) return 1;
    if (idxB === -1) return -1;
    return idxA - idxB;
  });
  
  ckpipsrNavigation[label] = items;
});

// Function to find page data from path
export function getCkpipsrPage(pathname: string): { page: ContentPage; categoryLabel: string } | null {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
  const parts = cleanPath.split("/");
  if (parts.length < 2) return null;

  const categorySlug = parts[0].toLowerCase();
  const pageSlug = parts.slice(1).join("/").toLowerCase();

  const jsonKey = Object.keys(categoryUrlPrefixes).find(
    (key) => categoryUrlPrefixes[key] === categorySlug
  );

  if (!jsonKey) return null;

  const pages = scrapedData[jsonKey] || [];
  const matchedPage = pages.find((page) => slugify(page.Page) === pageSlug);
  
  if (!matchedPage) return null;

  return {
    page: matchedPage,
    categoryLabel: categoryDisplayNames[jsonKey] || jsonKey
  };
}
