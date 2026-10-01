import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Students Corner → Course Syllabus.
 *
 * The semesters of the programme and the subjects in each, every subject able
 * to link to the PDF of its syllabus. Nothing the page can count is stored: the
 * total in the subtitle and each semester's "7 Subjects • 5 PDFs" arrive worked
 * out, so a heading cannot disagree with the table under it.
 *
 * The copy below is the page as it shipped, so a dead API leaves it reading
 * exactly as it always did.
 */
export type SyllabusIcon =
  | "Beakers"
  | "Bonds"
  | "Capsules"
  | "Flask"
  | "Microscope"
  | "Mortar"
  | "TestTubes"
  | "Books";

export interface SyllabusSubject {
  code: string;
  name: string;
  /** Empty when the syllabus was never published; the row is still listed. */
  pdf: string;
}

export interface SyllabusSemester {
  number: number;
  title: string;
  icon: SyllabusIcon;
  subjects: SyllabusSubject[];
  /** "Semester 3", with the number already in it. */
  kicker: string;
  /** "5 Subjects • 3 PDFs", with both numbers already in it. */
  countLabel: string;
  subjectCount: number;
  pdfCount: number;
}

export interface CourseSyllabusContent {
  pageTitle: string;
  /** Arrives with the programme and both totals already in it. */
  pageSubtitle: string;
  programme: string;
  intro: string;
  table: { number: string; code: string; name: string; action: string; openLabel: string };
  counts: { subject: string; subjects: string; pdf: string; pdfs: string; separator: string };
  semesterKicker: string;
  semesters: SyllabusSemester[];
  subjectCount: number;
  semesterCount: number;
  pdfCount: number;
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_COURSE_SYLLABUS: CourseSyllabusContent = {
  "pageTitle": "Course Syllabus",
  "pageSubtitle": "B.Pharm syllabus, semester by semester — 45 subjects across 8 semesters.",
  "programme": "B.Pharm",
  "intro": "Tap any semester below to view its subjects. Click Open PDF to view or download the detailed syllabus module.",
  "table": {
    "number": "#",
    "code": "Subject Code",
    "name": "Subject Name",
    "action": "Action",
    "openLabel": "Open PDF"
  },
  "counts": {
    "subject": "{count} Subject",
    "subjects": "{count} Subjects",
    "pdf": "{count} PDF",
    "pdfs": "{count} PDFs",
    "separator": " • "
  },
  "semesterKicker": "Semester {number}",
  "semesters": [
    {
      "number": 1,
      "title": "Semester 1",
      "icon": "Beakers",
      "subjects": [
        {
          "code": "BP101TP",
          "name": "Human Anatomy and Physiology I",
          "pdf": "https://drive.google.com/file/d/1XzSNb18w0mOWZh02uVllIeTEZgjZHRMy/view"
        },
        {
          "code": "BP102TP",
          "name": "Pharmaceutical Analysis I",
          "pdf": "https://drive.google.com/file/d/1aaxP_SeBZ7mn006x739cdG8y7qRHCoQ7/view"
        },
        {
          "code": "BP103TP",
          "name": "Pharmaceutics I",
          "pdf": ""
        },
        {
          "code": "BP104TP",
          "name": "Pharmaceutical Inorganic Chemistry",
          "pdf": "https://drive.google.com/file/d/1HGsLJ_SUIMG94BPV4Di9hwYbAtxiUart/view"
        },
        {
          "code": "BP105TP",
          "name": "Communication Skills",
          "pdf": "https://drive.google.com/file/d/1ajpw8MLdAYk0ZHLp6inJNCCCjKYXkreN/view"
        },
        {
          "code": "BP106TP",
          "name": "Remedial Biology",
          "pdf": "https://drive.google.com/file/d/1H_2_VW1UxAnFHMjEDVmMXRwVrzxIR_tm/view"
        },
        {
          "code": "BP107TT",
          "name": "Remedial Mathematics",
          "pdf": ""
        }
      ],
      "kicker": "Semester 1",
      "countLabel": "7 Subjects • 5 PDFs",
      "subjectCount": 7,
      "pdfCount": 5
    },
    {
      "number": 2,
      "title": "Semester 2",
      "icon": "Bonds",
      "subjects": [
        {
          "code": "BP201TP",
          "name": "Human Anatomy and Physiology II",
          "pdf": "https://drive.google.com/file/d/1Y4dSb4zK50XL4Jwwus-4EI2U_IWb9feh/view"
        },
        {
          "code": "BP202TP",
          "name": "Pharmaceutical Organic Chemistry I",
          "pdf": "https://drive.google.com/file/d/1oQ579WM7OBDcZ18NrqCW7iIHfaUtoPQJ/view"
        },
        {
          "code": "BP203TP",
          "name": "Pharmaceutical Engineering",
          "pdf": "https://drive.google.com/file/d/19kw_Ke4B_jK7AqVlW9qTdHXdKg5Nwy8C/view"
        },
        {
          "code": "BP204TP",
          "name": "Computer Applications in Pharmacy",
          "pdf": "https://drive.google.com/file/d/1uL6C93ccHdiJQxR7KTvXEBmtmWWnhyoa/view"
        },
        {
          "code": "BP205TT",
          "name": "Environmental Sciences",
          "pdf": "https://drive.google.com/file/d/1_B1Pr7gA3lDhfPsbGYW4Pvph-Um9MZSi/view"
        }
      ],
      "kicker": "Semester 2",
      "countLabel": "5 Subjects • 5 PDFs",
      "subjectCount": 5,
      "pdfCount": 5
    },
    {
      "number": 3,
      "title": "Semester 3",
      "icon": "Capsules",
      "subjects": [
        {
          "code": "BP301TP",
          "name": "Pharmaceutical Organic Chemistry II",
          "pdf": "https://drive.google.com/file/d/13UzBZtYj2tVS2vNV-1VrHtpdQM3NHUbe/view"
        },
        {
          "code": "BP302TP",
          "name": "Physical Pharmaceutics I",
          "pdf": "https://drive.google.com/file/d/1vh0oJ22Ujipv-Ob-p9VzkglT5h6ZVeUo/view"
        },
        {
          "code": "BP303TP",
          "name": "Biochemistry",
          "pdf": "https://drive.google.com/file/d/1pisvVwEWTmDxL-iHqiHeneeNqJLdWV7G/view"
        },
        {
          "code": "BP304TT",
          "name": "Pathophysiology",
          "pdf": ""
        },
        {
          "code": "BP305TP",
          "name": "Pharmacognosy and Phytochemistry I",
          "pdf": ""
        }
      ],
      "kicker": "Semester 3",
      "countLabel": "5 Subjects • 3 PDFs",
      "subjectCount": 5,
      "pdfCount": 3
    },
    {
      "number": 4,
      "title": "Semester 4",
      "icon": "Flask",
      "subjects": [
        {
          "code": "BP401TT",
          "name": "Pharmaceutical Organic Chemistry III",
          "pdf": "https://drive.google.com/file/d/1wfrFWGwIC-LCQj6pIuUAyfsk197Hb8cO/view"
        },
        {
          "code": "BP402TP",
          "name": "Medicinal Chemistry I",
          "pdf": "https://drive.google.com/file/d/1qpCDLJjGGVIQLqa4s6Vzur53PAvwmDt8/view"
        },
        {
          "code": "BP403TP",
          "name": "Physical Pharmaceutics II",
          "pdf": "https://drive.google.com/file/d/1wH9tFhm8Nz0RgpW7-BaoXQtevNpLLzYw/view"
        },
        {
          "code": "BP404TP",
          "name": "Pharmacology I",
          "pdf": "https://drive.google.com/file/d/1q9S-RxwwpQw0G7tI-KcDKUGELitMhKtJ/view"
        },
        {
          "code": "BP405TT",
          "name": "Pharmaceutical Jurisprudence",
          "pdf": "https://drive.google.com/file/d/1RssBgCVne4dRv-s76-oy4hSjQd-sdzt_/view"
        }
      ],
      "kicker": "Semester 4",
      "countLabel": "5 Subjects • 5 PDFs",
      "subjectCount": 5,
      "pdfCount": 5
    },
    {
      "number": 5,
      "title": "Semester 5",
      "icon": "Microscope",
      "subjects": [
        {
          "code": "BP501TT",
          "name": "Medicinal Chemistry II",
          "pdf": "https://drive.google.com/file/d/1TZ_KJAAuhsMxpW7wZt_5MDlobFT0IdlX/view"
        },
        {
          "code": "BP502TP",
          "name": "Pharmacology II",
          "pdf": ""
        },
        {
          "code": "BP503TP",
          "name": "Pharmacognosy and Phytochemistry II",
          "pdf": ""
        },
        {
          "code": "BP504TP",
          "name": "Pharmaceutical Microbiology",
          "pdf": ""
        },
        {
          "code": "BP505TT",
          "name": "Pharmaceutical Biotechnology",
          "pdf": ""
        },
        {
          "code": "BP506TP",
          "name": "Contributor Personality Development Program",
          "pdf": ""
        },
        {
          "code": "BP507TP",
          "name": "Integrated Personality Development Course",
          "pdf": ""
        }
      ],
      "kicker": "Semester 5",
      "countLabel": "7 Subjects • 1 PDF",
      "subjectCount": 7,
      "pdfCount": 1
    },
    {
      "number": 6,
      "title": "Semester 6",
      "icon": "Mortar",
      "subjects": [
        {
          "code": "BP601TP",
          "name": "Medicinal Chemistry III",
          "pdf": "https://drive.google.com/file/d/1z_0I5213r2Lr3tTCm8_1Ub5wwlLYJUQx/view"
        },
        {
          "code": "BP602TP",
          "name": "Pharmacology III",
          "pdf": ""
        },
        {
          "code": "BP603TP",
          "name": "Herbal Drug Technology",
          "pdf": ""
        },
        {
          "code": "BP604TP",
          "name": "Biopharmaceutics and Pharmacokinetics",
          "pdf": "https://drive.google.com/file/d/10XDK48FzmBRp7bFuc_jClLHPQuAyGx-q/view"
        },
        {
          "code": "BP605TP",
          "name": "Industrial Pharmacy I",
          "pdf": ""
        }
      ],
      "kicker": "Semester 6",
      "countLabel": "5 Subjects • 2 PDFs",
      "subjectCount": 5,
      "pdfCount": 2
    },
    {
      "number": 7,
      "title": "Semester 7",
      "icon": "TestTubes",
      "subjects": [
        {
          "code": "BP701TP",
          "name": "Instrumental Methods of Analysis",
          "pdf": "https://drive.google.com/file/d/1UcS-xm-t1QZwrYltYJ0Fm_VqLAh2sez6/view"
        },
        {
          "code": "BP702TT",
          "name": "Industrial Pharmacy II",
          "pdf": "https://drive.google.com/file/d/1fySIVY--ZuRH55IgLZ7nEKYXbo549HAr/view"
        },
        {
          "code": "BP703TT",
          "name": "Pharmacy Practice",
          "pdf": ""
        },
        {
          "code": "BP704TT",
          "name": "Novel Drug Delivery System",
          "pdf": "https://drive.google.com/file/d/1tyikqxT-Zs65d368fJgzF0aVBkl9L3yT/view"
        },
        {
          "code": "BP705PP",
          "name": "Practice School",
          "pdf": ""
        },
        {
          "code": "BP706TT",
          "name": "Quality Assurance",
          "pdf": "https://drive.google.com/file/d/1VlPWOe9jpFKtdWOnPK3a7pxL7ksJbyEl/view"
        }
      ],
      "kicker": "Semester 7",
      "countLabel": "6 Subjects • 4 PDFs",
      "subjectCount": 6,
      "pdfCount": 4
    },
    {
      "number": 8,
      "title": "Semester 8",
      "icon": "Books",
      "subjects": [
        {
          "code": "BP801TT",
          "name": "Biostatistics and Research Methodology",
          "pdf": ""
        },
        {
          "code": "BP802TT",
          "name": "Social and Preventive Pharmacy",
          "pdf": ""
        },
        {
          "code": "BP809TT",
          "name": "Cosmetic Science",
          "pdf": ""
        },
        {
          "code": "BP812TT",
          "name": "Dietary Supplements and Nutraceuticals",
          "pdf": ""
        },
        {
          "code": "BP813PP",
          "name": "Project Work",
          "pdf": ""
        }
      ],
      "kicker": "Semester 8",
      "countLabel": "5 Subjects • 0 PDFs",
      "subjectCount": 5,
      "pdfCount": 0
    }
  ],
  "subjectCount": 45,
  "semesterCount": 8,
  "pdfCount": 25
};

function isUsable(value: unknown): value is CourseSyllabusContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<CourseSyllabusContent>;
  return (
    Array.isArray(c.semesters) &&
    c.semesters.length > 0 &&
    Array.isArray(c.semesters[0]?.subjects) &&
    typeof c.table?.openLabel === "string"
  );
}

export function useCourseSyllabusContent(): CourseSyllabusContent {
  const [content, setContent] = useState<CourseSyllabusContent>(DEFAULT_COURSE_SYLLABUS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/students/course-syllabus"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.courseSyllabus)) setContent(body.courseSyllabus);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
