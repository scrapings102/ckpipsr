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
  "Iqac": "Accreditation & Ranking",
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

// Function to find page data from path
export function getCkpipsrPage(pathname: string): { page: ContentPage; categoryLabel: string } | null {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
  const parts = cleanPath.split("/");
  
  let categorySlug = "";
  let pageSlug = "";

  if (parts.length < 2) {
    categorySlug = "about-us";
    pageSlug = cleanPath.toLowerCase();
  } else {
    categorySlug = parts[0].toLowerCase();
    pageSlug = parts.slice(1).join("/").toLowerCase();
  }

  // Handle common alias slugs for Principal
  if (["principal", "the-principal", "principal-message", "principal-s-message", "principals-message"].includes(pageSlug)) {
    const page = scrapedData["About"]?.find((p) => p.Page === "Principal");
    if (page) {
      return {
        page,
        categoryLabel: categoryDisplayNames["About"] || "About Us"
      };
    }
  }

  const jsonKey = Object.keys(categoryUrlPrefixes).find(
    (key) => categoryUrlPrefixes[key] === categorySlug || key.toLowerCase() === categorySlug
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
