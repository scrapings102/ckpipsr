import React from "react";
import { motion } from "motion/react";
import { ExternalLink, CalendarDays } from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useTimetablesContent } from "../../hooks/useTimetablesContent";

export default function Timetables() {
  const content = useTimetablesContent();
  const { heading, card, empty } = content;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
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
              {heading.title}
            </h2>
            <span className="w-1.5 h-1.5 bg-[#1a5d2e] rounded-full inline-block" />
            <span className="w-6 sm:w-10 h-[2px] bg-[#1a5d2e] rounded-full inline-block" />
          </div>

          <p className="text-slate-600 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            {heading.intro}
          </p>
        </div>

        {/* ── CARD GRID MATCHING DESIGN ── */}
        {content.entries.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <CalendarDays size={32} className="mx-auto text-slate-300" />
            <h4 className="text-base font-serif font-bold text-slate-800">{empty.title}</h4>
            <p className="text-xs text-slate-500">{empty.body}</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {content.entries.map((entry) => {
            return (
              <motion.div
                key={entry.id}
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
                    {entry.academicYear}
                  </span>
                </div>

                {/* Term with horizontal divider lines */}
                <div className="w-full flex items-center justify-center gap-3 my-2 text-slate-800 font-medium text-sm sm:text-base">
                  <span className="h-[1px] bg-slate-200 flex-1 max-w-[45px] sm:max-w-[55px]" />
                  <span className="font-sans font-medium text-slate-800 text-sm sm:text-[15px]">
                    {entry.term}
                  </span>
                  <span className="h-[1px] bg-slate-200 flex-1 max-w-[45px] sm:max-w-[55px]" />
                </div>

                {/* "Semester" label */}
                <div className="text-slate-500 text-xs sm:text-sm font-sans my-1">
                  {card.semesterLabel}
                </div>

                {/* Semester Number in Thin Green Ring */}
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-[#52a468] text-[#1a5d2e] font-serif font-bold text-lg sm:text-xl flex items-center justify-center bg-[#f4faf5] my-3">
                  {entry.semester}
                </div>

                {/* Explore Action Button: Opens Google Drive File in New Tab */}
                {entry.hasFile ? (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-xl border border-[#2e7d32] text-[#1a5d2e] hover:bg-[#1a5d2e] hover:text-white font-sans font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer group"
                  >
                    <ExternalLink size={14} className="stroke-[2.2] group-hover:scale-110 transition-transform" />
                    <span>{card.exploreLabel}</span>
                  </a>
                ) : (
                  <span className="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-xl border border-slate-200 text-slate-400 font-sans font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 select-none">
                    <ExternalLink size={14} className="stroke-[2.2]" />
                    <span>{card.missingLabel}</span>
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
        )}
      </div>
    </SubPageLayout>
  );
}

