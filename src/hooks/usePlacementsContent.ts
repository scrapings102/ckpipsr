import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Training & Placement → Placements.
 *
 * Nothing on this page is a number the panel typed. A drive carries who came,
 * who was taken, and the annual figure; a year carries only what no drive
 * knows. The four cards, both tables' CTC and rate columns, the span in the
 * trend heading and the year pills all arrive counted.
 *
 * The page used to hold seven years that repeated what its seventeen drives
 * already said — forty-nine numbers that happened to agree. One did not: the
 * average package card read ₹1.62 LPA where the drives average ₹1.58.
 */

export interface PlacementDrive {
  id: string;
  year: string;
  company: string;
  participated: number;
  recruited: number;
  packageRaw: number;
  /** Written from the figure unless the drive gave its own wording. */
  packageDisplay: string;
  interviewDate: string;
  isInternship: boolean;
  /** The name the chart axis uses. */
  shortName: string;
  /** Taken as a share of those who appeared. */
  rate: number;
  packageLpa: number;
}

export interface PlacementYear {
  year: string;
  totalStudents: number;
  higherStudies: number;
  entrepreneurs: number;
  keyRecruiter: string;
  /** All of these are counted from the drives filed under this year. */
  appeared: number;
  recruited: number;
  placementRate: number;
  minCTC: number;
  avgCTC: number;
  maxCTC: number;
  range: [number, number];
  driveCount: number;
  otherAspirants: number;
}

export interface PlacementsContent {
  pageTitle: string;
  pageSubtitle: string;
  kpis: {
    highestLabel: string;
    highestValue: string;
    highestNote: string;
    averageLabel: string;
    averageValue: string;
    averageNote: string;
    companiesLabel: string;
    companiesValue: number;
    companiesNote: string;
    placedLabel: string;
    placedValue: number;
    placedNote: string;
  };
  trend: {
    heading: string;
    blurb: string;
    minLabel: string;
    avgLabel: string;
    maxLabel: string;
  };
  charts: {
    pickerLabel: string;
    participationTitle: string;
    rateTitle: string;
    outcomesTitle: string;
    appearedLabel: string;
    selectedLabel: string;
    ctcTableHeading: string;
    statsTableHeading: string;
  };
  directory: {
    kicker: string;
    /** Holds {count}; the page fills it, since the search decides it. */
    heading: string;
    searchPlaceholder: string;
    intro: string;
    internshipLabel: string;
    emptyTitle: string;
    emptyBody: string;
  };
  recruiters: { heading: string; names: string[] };
  years: PlacementYear[];
  drives: PlacementDrive[];
  /** The year pills, newest first, from the years that have drives. */
  availableYears: string[];
  driveCount: number;
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_PLACEMENTS: PlacementsContent = {
    "kpis": {
      "highestLabel": "Highest Package",
      "highestValue": "₹2.32 LPA",
      "highestNote": "Concept Medical (2020-21)",
      "averageLabel": "Average Package",
      "averageValue": "₹1.58 LPA",
      "averageNote": "Across Recorded Drives",
      "companiesLabel": "Companies Recruiting",
      "companiesValue": 16,
      "companiesNote": "Active Placement Partners",
      "placedLabel": "Students Placed",
      "placedValue": 110,
      "placedNote": "Across 7 Recorded Batches"
    },
    "trend": {
      "blurb": "Historical minimum, maximum, and average CTC offered in LPA across 7 academic years",
      "heading": "Salary Package Trend (2014–2021)",
      "avgLabel": "Average CTC",
      "maxLabel": "Maximum CTC",
      "minLabel": "Minimum CTC"
    },
    "years": [
      {
        "year": "2014-15",
        "keyRecruiter": "Eris Life Science Pvt. Ltd.",
        "entrepreneurs": 3,
        "higherStudies": 18,
        "totalStudents": 100,
        "appeared": 94,
        "recruited": 9,
        "placementRate": 9.57,
        "minCTC": 1.44,
        "avgCTC": 1.8,
        "maxCTC": 2.16,
        "range": [
          1.44,
          2.16
        ],
        "driveCount": 2,
        "otherAspirants": 70
      },
      {
        "year": "2015-16",
        "keyRecruiter": "Lyka Labs Pvt. Ltd.",
        "entrepreneurs": 2,
        "higherStudies": 14,
        "totalStudents": 60,
        "appeared": 6,
        "recruited": 3,
        "placementRate": 50,
        "minCTC": 1.2,
        "avgCTC": 1.2,
        "maxCTC": 1.2,
        "range": [
          1.2,
          1.2
        ],
        "driveCount": 1,
        "otherAspirants": 41
      },
      {
        "year": "2016-17",
        "keyRecruiter": "Troikaa, Surat",
        "entrepreneurs": 3,
        "higherStudies": 16,
        "totalStudents": 60,
        "appeared": 34,
        "recruited": 9,
        "placementRate": 26.47,
        "minCTC": 1.2,
        "avgCTC": 1.44,
        "maxCTC": 1.68,
        "range": [
          1.2,
          1.68
        ],
        "driveCount": 2,
        "otherAspirants": 32
      },
      {
        "year": "2017-18",
        "keyRecruiter": "Biogen & Troikaa Pharma",
        "entrepreneurs": 5,
        "higherStudies": 24,
        "totalStudents": 100,
        "appeared": 103,
        "recruited": 42,
        "placementRate": 40.78,
        "minCTC": 1.4,
        "avgCTC": 1.69,
        "maxCTC": 2.2,
        "range": [
          1.4,
          2.2
        ],
        "driveCount": 7,
        "otherAspirants": 29
      },
      {
        "year": "2018-19",
        "keyRecruiter": "Fides Biocare",
        "entrepreneurs": 4,
        "higherStudies": 19,
        "totalStudents": 75,
        "appeared": 60,
        "recruited": 16,
        "placementRate": 26.67,
        "minCTC": 1.4,
        "avgCTC": 1.47,
        "maxCTC": 1.6,
        "range": [
          1.4,
          1.6
        ],
        "driveCount": 3,
        "otherAspirants": 36
      },
      {
        "year": "2019-20",
        "keyRecruiter": "Concept Medical lnc.",
        "entrepreneurs": 6,
        "higherStudies": 28,
        "totalStudents": 100,
        "appeared": 100,
        "recruited": 21,
        "placementRate": 21,
        "minCTC": 0.72,
        "avgCTC": 0.72,
        "maxCTC": 0.72,
        "range": [
          0.72,
          0.72
        ],
        "driveCount": 1,
        "otherAspirants": 45
      },
      {
        "year": "2020-21",
        "keyRecruiter": "Concept Medical lnc.",
        "entrepreneurs": 4,
        "higherStudies": 15,
        "totalStudents": 60,
        "appeared": 46,
        "recruited": 10,
        "placementRate": 21.74,
        "minCTC": 2.32,
        "avgCTC": 2.32,
        "maxCTC": 2.32,
        "range": [
          2.32,
          2.32
        ],
        "driveCount": 1,
        "otherAspirants": 31
      }
    ],
    "charts": {
      "rateTitle": "Placement Rate by Recruiter ({year})",
      "pickerLabel": "Select Academic Year for Breakdown",
      "appearedLabel": "Appeared",
      "outcomesTitle": "Graduate Outcomes Distribution ({year})",
      "selectedLabel": "Selected",
      "ctcTableHeading": "CTC Package Statistics (LPA)",
      "statsTableHeading": "Overall Placement Statistics",
      "participationTitle": "Participation & Selection ({year})"
    },
    "drives": [
      {
        "id": "2020-21-concept-medical-lnc",
        "year": "2020-21",
        "company": "Concept Medical lnc.",
        "recruited": 10,
        "packageRaw": 232097,
        "isInternship": false,
        "participated": 46,
        "interviewDate": "12.09.2020",
        "packageDisplay": "₹2,32,097 / annum",
        "shortName": "Concept Medical",
        "rate": 22,
        "packageLpa": 2.32
      },
      {
        "id": "2019-20-concept-medical-lnc-paid-internship",
        "year": "2019-20",
        "company": "Concept Medical lnc. (Paid Internship)",
        "recruited": 21,
        "packageRaw": 72000,
        "isInternship": true,
        "participated": 100,
        "interviewDate": "06.08.2019",
        "packageDisplay": "₹6,000 / month (Stipend)",
        "shortName": "Concept Medical",
        "rate": 21,
        "packageLpa": 0.72
      },
      {
        "id": "2018-19-fides-biocare-and-united-fides-pharmaceuticals",
        "year": "2018-19",
        "company": "Fides Biocare and United Fides Pharmaceuticals",
        "recruited": 4,
        "packageRaw": 160000,
        "isInternship": false,
        "participated": 8,
        "interviewDate": "26.04.2019",
        "packageDisplay": "₹1,60,000 / annum",
        "shortName": "Fides Biocare",
        "rate": 50,
        "packageLpa": 1.6
      },
      {
        "id": "2018-19-appollo-pharma",
        "year": "2018-19",
        "company": "Appollo Pharma.",
        "recruited": 8,
        "packageRaw": 140000,
        "isInternship": false,
        "participated": 25,
        "interviewDate": "20.04.2019",
        "packageDisplay": "₹1,40,000 / annum",
        "shortName": "Appollo Pharma.",
        "rate": 32,
        "packageLpa": 1.4
      },
      {
        "id": "2018-19-nano-therapeutics-pvt-ltd",
        "year": "2018-19",
        "company": "Nano Therapeutics Pvt. Ltd.",
        "recruited": 4,
        "packageRaw": 140000,
        "isInternship": false,
        "participated": 27,
        "interviewDate": "14.03.2019",
        "packageDisplay": "₹1,40,000 / annum",
        "shortName": "Nano Therapeu…",
        "rate": 15,
        "packageLpa": 1.4
      },
      {
        "id": "2017-18-advantmed",
        "year": "2017-18",
        "company": "Advantmed",
        "recruited": 10,
        "packageRaw": 160000,
        "isInternship": false,
        "participated": 26,
        "interviewDate": "25.01.2018",
        "packageDisplay": "₹1,60,000 / annum",
        "shortName": "Advantmed",
        "rate": 38,
        "packageLpa": 1.6
      },
      {
        "id": "2017-18-apollo-pharma",
        "year": "2017-18",
        "company": "Apollo Pharma.",
        "recruited": 20,
        "packageRaw": 140000,
        "isInternship": false,
        "participated": 21,
        "interviewDate": "25.01.2018",
        "packageDisplay": "₹1,40,000 / annum",
        "shortName": "Apollo Pharma.",
        "rate": 95,
        "packageLpa": 1.4
      },
      {
        "id": "2017-18-r-n-lab",
        "year": "2017-18",
        "company": "R. N. Lab",
        "recruited": 1,
        "packageRaw": 160000,
        "isInternship": false,
        "participated": 9,
        "interviewDate": "25.01.2018",
        "packageDisplay": "₹1,60,000 / annum",
        "shortName": "R. N. Lab",
        "rate": 11,
        "packageLpa": 1.6
      },
      {
        "id": "2017-18-biogen-pharmaceutical-co",
        "year": "2017-18",
        "company": "Biogen Pharmaceutical Co.",
        "recruited": 2,
        "packageRaw": 220000,
        "isInternship": false,
        "participated": 16,
        "interviewDate": "25.01.2018",
        "packageDisplay": "₹2,20,000 / annum",
        "shortName": "Biogen Pharma…",
        "rate": 13,
        "packageLpa": 2.2
      },
      {
        "id": "2017-18-zota-healthcare-ltd",
        "year": "2017-18",
        "company": "Zota Healthcare Ltd.",
        "recruited": 4,
        "packageRaw": 140000,
        "isInternship": false,
        "participated": 13,
        "interviewDate": "25.01.2018",
        "packageDisplay": "₹1,40,000 / annum",
        "shortName": "Zota Healthcare",
        "rate": 31,
        "packageLpa": 1.4
      },
      {
        "id": "2017-18-troikaa-pharma-surat",
        "year": "2017-18",
        "company": "Troikaa Pharma, Surat.",
        "recruited": 4,
        "packageRaw": 220000,
        "isInternship": false,
        "participated": 14,
        "interviewDate": "25.01.2018",
        "packageDisplay": "₹2,20,000 / annum",
        "shortName": "Troikaa Pharm…",
        "rate": 29,
        "packageLpa": 2.2
      },
      {
        "id": "2017-18-globela-pharma-pvt-ltd",
        "year": "2017-18",
        "company": "Globela Pharma Pvt. Ltd",
        "recruited": 1,
        "packageRaw": 140000,
        "isInternship": false,
        "participated": 4,
        "interviewDate": "25.01.2018",
        "packageDisplay": "₹1,40,000 / annum",
        "shortName": "Globela Pharma",
        "rate": 25,
        "packageLpa": 1.4
      },
      {
        "id": "2016-17-troikaa-surat",
        "year": "2016-17",
        "company": "Troikaa, Surat",
        "recruited": 1,
        "packageRaw": 168000,
        "isInternship": false,
        "participated": 5,
        "interviewDate": "05.03.2017",
        "packageDisplay": "₹1,68,000 / annum",
        "shortName": "Troikaa,",
        "rate": 20,
        "packageLpa": 1.68
      },
      {
        "id": "2016-17-appollo-pharma-surat",
        "year": "2016-17",
        "company": "Appollo Pharma. Surat",
        "recruited": 8,
        "packageRaw": 120000,
        "isInternship": false,
        "participated": 29,
        "interviewDate": "21.02.2017",
        "packageDisplay": "₹1,20,000 / annum",
        "shortName": "Appollo Pharma.",
        "rate": 28,
        "packageLpa": 1.2
      },
      {
        "id": "2015-16-lyka-labs-pvt-ltd-ankleshwar",
        "year": "2015-16",
        "company": "Lyka Labs Pvt. Ltd., Ankleshwar",
        "recruited": 3,
        "packageRaw": 120000,
        "isInternship": false,
        "participated": 6,
        "interviewDate": "13.03.2016",
        "packageDisplay": "₹1,20,000 / annum",
        "shortName": "Lyka Labs ,",
        "rate": 50,
        "packageLpa": 1.2
      },
      {
        "id": "2014-15-novo-nordisk-india-pvt-ltd-bangaluru",
        "year": "2014-15",
        "company": "Novo Nordisk India Pvt. Ltd. Bangaluru.",
        "recruited": 3,
        "packageRaw": 144000,
        "isInternship": false,
        "participated": 47,
        "interviewDate": "16.09.2015",
        "packageDisplay": "₹1,44,000 / annum",
        "shortName": "Novo Nordisk …",
        "rate": 6,
        "packageLpa": 1.44
      },
      {
        "id": "2014-15-eris-life-science-pvt-ltd",
        "year": "2014-15",
        "company": "Eris Life Science Pvt. Ltd.",
        "recruited": 6,
        "packageRaw": 216000,
        "isInternship": false,
        "participated": 47,
        "interviewDate": "10.09.2015",
        "packageDisplay": "₹2,16,000 / annum",
        "shortName": "Eris Life Sci…",
        "rate": 13,
        "packageLpa": 2.16
      }
    ],
    "directory": {
      "intro": "Campus recruitment is a process through which the corporate (employer) organization recruits the required talent pool from the institute campuses. The selection process takes place in the final year B Pharm students.",
      "kicker": "Campus Recruitment Records",
      "heading": "Individual Drive Records ({count})",
      "emptyBody": "No recruitment drive matches that search. Try a different recruiter or year.",
      "emptyTitle": "No Drives Found",
      "internshipLabel": "Internship",
      "searchPlaceholder": "Search recruiter or year..."
    },
    "pageTitle": "Placements",
    "recruiters": {
      "names": [
        "Concept Medical Inc.",
        "Novo Nordisk India",
        "Eris Life Science",
        "Troikaa Pharma",
        "Advantmed",
        "Apollo Pharma",
        "Zota Healthcare",
        "Biogen Pharmaceutical",
        "Fides Biocare",
        "Lyka Labs",
        "Globela Pharma",
        "Nano Therapeutics",
        "R. N. Lab"
      ],
      "heading": "Key Corporate Recruiters & Industrial Partners"
    },
    "pageSubtitle": "Training & Placement Cell – Campus Recruitment Drives & Career Opportunities",
    "availableYears": [
      "2020-21",
      "2019-20",
      "2018-19",
      "2017-18",
      "2016-17",
      "2015-16",
      "2014-15"
    ],
    "driveCount": 17
  };

function isUsable(value: unknown): value is PlacementsContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<PlacementsContent>;
  return (
    Array.isArray(c.drives) &&
    Array.isArray(c.years) &&
    Array.isArray(c.availableYears) &&
    typeof c.kpis?.highestValue === "string"
  );
}

export function usePlacementsContent(): PlacementsContent {
  const [content, setContent] = useState<PlacementsContent>(DEFAULT_PLACEMENTS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/tnp/placements"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.placements)) setContent(body.placements);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
