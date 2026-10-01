import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ExternalLink, 
  CalendarDays
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

export interface TimetableEntry {
  id: string;
  academicYear: string;
  term: "Even" | "Odd";
  semester: number;
  program: string;
  yearLevel: string;
  classroom: string;
  effectiveFrom: string;
  pdfUrl: string;
  driveUrl?: string;
  subjects?: {
    code: string;
    name: string;
    type: "Theory" | "Practical" | "Both";
  }[];
  scheduleOverview?: {
    time: string;
    mondayToWednesday: string;
    thursdayToSaturday: string;
  }[];
}

// Ordered exactly as requested: Sem 6, Sem 8, Sem 4, Sem 2
const TIMETABLES_DATA: TimetableEntry[] = [
  {
    id: "tt-2022-23-even-sem-6",
    academicYear: "2022-23",
    term: "Even",
    semester: 6,
    program: "B.Pharm (Bachelor of Pharmacy)",
    yearLevel: "Third Year B.Pharm",
    classroom: "Classroom LH-03 (Second Floor)",
    effectiveFrom: "January 2023",
    pdfUrl: "https://drive.google.com/file/d/1XzSNb18w0mOWZh02uVllIeTEZgjZHRMy/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/1XzSNb18w0mOWZh02uVllIeTEZgjZHRMy/view?usp=sharing",
    subjects: [
      { code: "BP601T", name: "Medicinal Chemistry III", type: "Both" },
      { code: "BP602T", name: "Pharmacology III", type: "Both" },
      { code: "BP603T", name: "Herbal Drug Technology", type: "Both" },
      { code: "BP604T", name: "Biopharmaceutics & Pharmacokinetics", type: "Theory" },
      { code: "BP605T", name: "Pharmaceutical Biotechnology", type: "Theory" },
      { code: "BP606T", name: "Quality Assurance", type: "Theory" }
    ],
    scheduleOverview: [
      { time: "09:30 AM - 10:30 AM", mondayToWednesday: "Medicinal Chemistry III (BP601T)", thursdayToSaturday: "Pharmacology III (BP602T)" },
      { time: "10:30 AM - 11:30 AM", mondayToWednesday: "Herbal Drug Technology (BP603T)", thursdayToSaturday: "Biopharmaceutics & PK (BP604T)" },
      { time: "11:30 AM - 01:15 PM", mondayToWednesday: "Medicinal Chem III Lab (Batch A)", thursdayToSaturday: "Herbal Drug Tech Practical (Batch B)" },
      { time: "01:15 PM - 02:00 PM", mondayToWednesday: "Lunch & Recess Break", thursdayToSaturday: "Lunch & Recess Break" },
      { time: "02:00 PM - 03:00 PM", mondayToWednesday: "Pharmaceutical Biotechnology (BP605T)", thursdayToSaturday: "Quality Assurance (BP606T)" },
      { time: "03:00 PM - 05:00 PM", mondayToWednesday: "Pharmacology III Practical (Batch A)", thursdayToSaturday: "Journal Club & Research Project" }
    ]
  },
  {
    id: "tt-2022-23-even-sem-8",
    academicYear: "2022-23",
    term: "Even",
    semester: 8,
    program: "B.Pharm (Bachelor of Pharmacy)",
    yearLevel: "Final Year B.Pharm",
    classroom: "Classroom LH-04 (Second Floor)",
    effectiveFrom: "January 2023",
    pdfUrl: "https://drive.google.com/file/d/1aaxP_SeBZ7mn006x739cdG8y7qRHCoQ7/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/1aaxP_SeBZ7mn006x739cdG8y7qRHCoQ7/view?usp=sharing",
    subjects: [
      { code: "BP801T", name: "Biostatistics & Research Methodology", type: "Theory" },
      { code: "BP802T", name: "Social & Preventive Pharmacy", type: "Theory" },
      { code: "BP803ET", name: "Pharma Marketing Management", type: "Theory" },
      { code: "BP804ET", name: "Pharmacovigilance", type: "Theory" },
      { code: "BP813PW", name: "Project Work & Industrial Training", type: "Practical" }
    ],
    scheduleOverview: [
      { time: "09:30 AM - 10:30 AM", mondayToWednesday: "Biostatistics & Research Meth. (BP801T)", thursdayToSaturday: "Social & Preventive Pharmacy (BP802T)" },
      { time: "10:30 AM - 11:30 AM", mondayToWednesday: "Pharma Marketing Mgmt (BP803ET)", thursdayToSaturday: "Pharmacovigilance (BP804ET)" },
      { time: "11:30 AM - 01:15 PM", mondayToWednesday: "Final Year Capstone Project (Batch A)", thursdayToSaturday: "Industry Mentorship & Research Lab" },
      { time: "01:15 PM - 02:00 PM", mondayToWednesday: "Lunch & Recess Break", thursdayToSaturday: "Lunch & Recess Break" },
      { time: "02:00 PM - 03:00 PM", mondayToWednesday: "GPAT & Competitive Exam Coaching", thursdayToSaturday: "Seminar & Poster Presentation" },
      { time: "03:00 PM - 05:00 PM", mondayToWednesday: "Project Dissertation Review", thursdayToSaturday: "Placement & Soft Skills Training" }
    ]
  },
  {
    id: "tt-2022-23-even-sem-4",
    academicYear: "2022-23",
    term: "Even",
    semester: 4,
    program: "B.Pharm (Bachelor of Pharmacy)",
    yearLevel: "Second Year B.Pharm",
    classroom: "Classroom LH-02 (First Floor)",
    effectiveFrom: "January 2023",
    pdfUrl: "https://drive.google.com/file/d/1HGsLJ_SUIMG94BPV4Di9hwYbAtxiUart/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/1HGsLJ_SUIMG94BPV4Di9hwYbAtxiUart/view?usp=sharing",
    subjects: [
      { code: "BP401T", name: "Pharmaceutical Organic Chemistry III", type: "Theory" },
      { code: "BP402T", name: "Medicinal Chemistry I", type: "Both" },
      { code: "BP403T", name: "Physical Pharmaceutics II", type: "Both" },
      { code: "BP404T", name: "Pharmacology I", type: "Both" },
      { code: "BP405T", name: "Pharmacognosy & Phytochemistry I", type: "Both" }
    ],
    scheduleOverview: [
      { time: "09:30 AM - 10:30 AM", mondayToWednesday: "Medicinal Chemistry I (BP402T)", thursdayToSaturday: "Physical Pharmaceutics II (BP403T)" },
      { time: "10:30 AM - 11:30 AM", mondayToWednesday: "Pharmacology I (BP404T)", thursdayToSaturday: "Pharm. Organic Chemistry III (BP401T)" },
      { time: "11:30 AM - 01:15 PM", mondayToWednesday: "Medicinal Chem Practical (Batch A)", thursdayToSaturday: "Physical Pharmaceutics Lab (Batch B)" },
      { time: "01:15 PM - 02:00 PM", mondayToWednesday: "Lunch & Recess Break", thursdayToSaturday: "Lunch & Recess Break" },
      { time: "02:00 PM - 03:00 PM", mondayToWednesday: "Pharmacognosy & Phytochemistry I (BP405T)", thursdayToSaturday: "Library & Self Study Seminar" },
      { time: "03:00 PM - 05:00 PM", mondayToWednesday: "Pharmacology I Practical (Batch A)", thursdayToSaturday: "Pharmacognosy I Lab (Batch B)" }
    ]
  },
  {
    id: "tt-2022-23-even-sem-2",
    academicYear: "2022-23",
    term: "Even",
    semester: 2,
    program: "B.Pharm (Bachelor of Pharmacy)",
    yearLevel: "First Year B.Pharm",
    classroom: "Classroom LH-01 (Ground Floor)",
    effectiveFrom: "January 2023",
    pdfUrl: "https://drive.google.com/file/d/1ajpw8MLdAYk0ZHLp6inJNCCCjKYXkreN/view?usp=sharing",
    driveUrl: "https://drive.google.com/file/d/1ajpw8MLdAYk0ZHLp6inJNCCCjKYXkreN/view?usp=sharing",
    subjects: [
      { code: "BP201T", name: "Human Anatomy and Physiology II", type: "Both" },
      { code: "BP202T", name: "Pharmaceutical Organic Chemistry I", type: "Both" },
      { code: "BP203T", name: "Biochemistry", type: "Both" },
      { code: "BP204T", name: "Pathophysiology", type: "Theory" },
      { code: "BP205T", name: "Computer Applications in Pharmacy", type: "Both" },
      { code: "BP206T", name: "Environmental Sciences", type: "Theory" }
    ],
    scheduleOverview: [
      { time: "09:30 AM - 10:30 AM", mondayToWednesday: "Human Anatomy & Physiology II (BP201T)", thursdayToSaturday: "Pharmaceutical Organic Chem I (BP202T)" },
      { time: "10:30 AM - 11:30 AM", mondayToWednesday: "Biochemistry (BP203T)", thursdayToSaturday: "Pathophysiology (BP204T)" },
      { time: "11:30 AM - 01:15 PM", mondayToWednesday: "Laboratory Session (Batch A / B)", thursdayToSaturday: "Computer Applications Lab (BP205P)" },
      { time: "01:15 PM - 02:00 PM", mondayToWednesday: "Lunch & Recess Break", thursdayToSaturday: "Lunch & Recess Break" },
      { time: "02:00 PM - 03:00 PM", mondayToWednesday: "Environmental Sciences (BP206T)", thursdayToSaturday: "Tutorial & Remedial Mentorship" },
      { time: "03:00 PM - 05:00 PM", mondayToWednesday: "Biochemistry Practical (Batch A)", thursdayToSaturday: "Pharm. Organic Chemistry Practical (Batch B)" }
    ]
  }
];

export default function Timetables() {
  const [searchQuery] = useState<string>("");

  const filteredEntries = TIMETABLES_DATA.filter((entry) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      entry.academicYear.toLowerCase().includes(q) ||
      entry.term.toLowerCase().includes(q) ||
      `semester ${entry.semester}`.includes(q) ||
      `sem ${entry.semester}`.includes(q) ||
      entry.program.toLowerCase().includes(q) ||
      entry.yearLevel.toLowerCase().includes(q)
    );
  });

  return (
    <SubPageLayout
      title="Academic Timetables"
      subtitle="Class schedules, laboratory sessions, and lecture timings for Bachelor of Pharmacy."
      category="students-corner"
      activeItemLabel="Timetables"
    >
      <div className="space-y-12 max-w-6xl mx-auto py-2">
        {/* ── HERO / FIND YOUR TIMETABLE HEADER SECTION ── */}
        <div className="text-center space-y-3">
          {/* Decorative Heading with Ornamental Green Accents */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 text-[#1a5d2e]">
            <span className="w-6 sm:w-10 h-[2px] bg-[#1a5d2e] rounded-full inline-block" />
            <span className="w-1.5 h-1.5 bg-[#1a5d2e] rounded-full inline-block" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Find Your Timetable
            </h2>
            <span className="w-1.5 h-1.5 bg-[#1a5d2e] rounded-full inline-block" />
            <span className="w-6 sm:w-10 h-[2px] bg-[#1a5d2e] rounded-full inline-block" />
          </div>

          <p className="text-slate-600 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Choose a semester to view or download the timetable.
          </p>
        </div>

        {/* ── CARD GRID MATCHING DESIGN ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredEntries.map((card) => {
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 p-6 sm:p-7 flex flex-col items-center justify-between text-center select-none overflow-hidden"
              >
                {/* Top Calendar Icon in Pale Mint Circle */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#eaf5ec] border border-[#d2ead7] flex items-center justify-center text-[#1a5d2e] mb-4 shadow-2xs">
                  <CalendarDays size={26} className="text-[#1a5d2e] stroke-[1.8]" />
                </div>

                {/* Academic Year Dark Green Pill Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-[#1a5d2e] text-white font-semibold text-xs sm:text-[13px] font-sans px-4 py-1 rounded-full shadow-2xs tracking-wide">
                    {card.academicYear}
                  </span>
                </div>

                {/* Term with horizontal divider lines */}
                <div className="w-full flex items-center justify-center gap-3 my-2 text-slate-800 font-medium text-sm sm:text-base">
                  <span className="h-[1px] bg-slate-200 flex-1 max-w-[45px] sm:max-w-[55px]" />
                  <span className="font-sans font-medium text-slate-800 text-sm sm:text-[15px]">
                    {card.term}
                  </span>
                  <span className="h-[1px] bg-slate-200 flex-1 max-w-[45px] sm:max-w-[55px]" />
                </div>

                {/* "Semester" label */}
                <div className="text-slate-500 text-xs sm:text-sm font-sans my-1">
                  Semester
                </div>

                {/* Semester Number in Thin Green Ring */}
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-[#52a468] text-[#1a5d2e] font-serif font-bold text-lg sm:text-xl flex items-center justify-center bg-[#f4faf5] my-3">
                  {card.semester}
                </div>

                {/* Explore Action Button: Opens Google Drive File in New Tab */}
                <a
                  href={card.driveUrl || card.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-xl border border-[#2e7d32] text-[#1a5d2e] hover:bg-[#1a5d2e] hover:text-white font-sans font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer group"
                >
                  <ExternalLink size={14} className="stroke-[2.2] group-hover:scale-110 transition-transform" />
                  <span>Explore</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SubPageLayout>
  );
}

