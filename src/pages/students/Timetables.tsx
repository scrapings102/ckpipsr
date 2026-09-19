import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Clock, 
  BookOpen, 
  Download, 
  ExternalLink, 
  Eye, 
  X, 
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
  subjects: {
    code: string;
    name: string;
    type: "Theory" | "Practical" | "Both";
  }[];
  scheduleOverview: {
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
    pdfUrl: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/645df68184c86.pdf",
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
    pdfUrl: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/645df68184c86.pdf",
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
    pdfUrl: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/645df68184c86.pdf",
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
    pdfUrl: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/645df68184c86.pdf",
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
  const [activeCardId, setActiveCardId] = useState<string>("tt-2022-23-even-sem-6");
  const [activeModalEntry, setActiveModalEntry] = useState<TimetableEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

        {/* ── CARD GRID EXACTLY MATCHING USER PROVIDED DESIGN ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredEntries.map((card) => {
            const isActive = activeCardId === card.id;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveCardId(card.id)}
                className={`relative bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col items-center justify-between text-center cursor-pointer select-none overflow-hidden ${
                  isActive
                    ? "border-slate-200/90 shadow-[0_12px_30px_rgba(0,0,0,0.08)] border-b-4 border-b-[#1a5d2e]"
                    : "border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300"
                }`}
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

                {/* Explore Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCardId(card.id);
                    setActiveModalEntry(card);
                  }}
                  className="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-xl border border-[#2e7d32] text-[#1a5d2e] hover:bg-[#1a5d2e] hover:text-white font-sans font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer group"
                >
                  <ExternalLink size={14} className="stroke-[2.2] group-hover:scale-110 transition-transform" />
                  <span>Explore</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* ── MODAL POPUP FOR DETAILED EXPLORE VIEW ── */}
        <AnimatePresence>
          {activeModalEntry && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalEntry(null)}
                className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
              >
                {/* Modal Header */}
                <div className="bg-[#1a5d2e] p-5 sm:p-6 text-white flex items-start justify-between gap-4 border-b border-emerald-700">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-white text-[#1a5d2e] font-mono text-xs font-bold uppercase tracking-wider">
                        Semester {activeModalEntry.semester}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-xs font-semibold uppercase">
                        {activeModalEntry.term} Term • {activeModalEntry.academicYear}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                      {activeModalEntry.yearLevel} Timetable
                    </h3>
                    <p className="text-xs text-white/80 font-sans">
                      {activeModalEntry.program} • {activeModalEntry.classroom}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModalEntry(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Scrollable Content */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-6 max-h-[calc(90vh-140px)]">
                  {/* Schedule Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                        <Clock size={16} className="text-[#1a5d2e]" />
                        <span>Weekly Class & Lab Schedule Routine</span>
                      </h4>
                      <span className="text-[11px] font-mono text-slate-500">Effective: {activeModalEntry.effectiveFrom}</span>
                    </div>

                    <div className="rounded-xl border border-slate-200 overflow-hidden text-xs font-sans">
                      <div className="grid grid-cols-12 bg-slate-100 p-2.5 font-mono font-bold text-slate-700 border-b border-slate-200 uppercase text-[11px]">
                        <div className="col-span-3">Time Slot</div>
                        <div className="col-span-5">Mon – Wed</div>
                        <div className="col-span-4">Thu – Sat</div>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {activeModalEntry.scheduleOverview.map((slot, sIdx) => {
                          const isBreak = slot.mondayToWednesday.includes("Lunch");
                          return (
                            <div
                              key={sIdx}
                              className={`grid grid-cols-12 p-2.5 items-center transition-colors ${
                                isBreak ? "bg-amber-50/60 font-medium text-amber-900" : sIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                              }`}
                            >
                              <div className="col-span-3 font-mono font-semibold text-slate-600 text-[11px]">
                                {slot.time}
                              </div>
                              <div className="col-span-5 text-slate-800 pr-2">
                                {slot.mondayToWednesday}
                              </div>
                              <div className="col-span-4 text-slate-700">
                                {slot.thursdayToSaturday}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Course Subjects */}
                  <div className="space-y-3">
                    <h4 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                      <BookOpen size={16} className="text-[#1a5d2e]" />
                      <span>Registered Course Modules (PCI / GTU Scheme)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeModalEntry.subjects.map((subject) => (
                        <div
                          key={subject.code}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="font-mono text-[10px] font-bold text-[#1a5d2e] bg-[#eaf5ec] px-1.5 py-0.5 rounded">
                              {subject.code}
                            </span>
                            <h5 className="font-serif font-bold text-xs text-slate-800 truncate mt-1">
                              {subject.name}
                            </h5>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700 text-[10px] font-mono font-semibold shrink-0">
                            {subject.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 font-mono">
                    Official Document ID: <span className="font-bold text-slate-700">CKPIPSR-TT-{activeModalEntry.academicYear}-S{activeModalEntry.semester}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalEntry(null)}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold transition-all border border-slate-300 cursor-pointer"
                    >
                      Close
                    </button>
                    <a
                      href={activeModalEntry.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a5d2e] hover:bg-[#144723] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download PDF</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </SubPageLayout>
  );
}
