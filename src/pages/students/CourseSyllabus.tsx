import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    ChevronDown,
    ExternalLink,
    FileText,
    FlaskConical,
    Atom,
    Pill,
    FlaskRound,
    Microscope,
    Sparkles,
    TestTubes,
    BookOpen
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { RichText } from "../../utils/RichText";
import {
    useCourseSyllabusContent,
    type CourseSyllabusContent,
    type SyllabusIcon,
    type SyllabusSemester,
} from "../../hooks/useCourseSyllabusContent";

/**
 * Standardized Lucide Icon Banner for Semester Cards.
 */
function SemesterBannerIllustration({ icon }: { icon: SyllabusIcon }) {
    const iconMap: Record<SyllabusIcon, { Icon: typeof BookOpen; label: string }> = {
        Beakers: { Icon: FlaskConical, label: "Pharmaceutical Chemistry" },
        Bonds: { Icon: Atom, label: "Molecular Analysis" },
        Capsules: { Icon: Pill, label: "Pharmaceutics" },
        Flask: { Icon: FlaskRound, label: "Formulation Science" },
        Microscope: { Icon: Microscope, label: "Pharmacognosy" },
        Mortar: { Icon: Sparkles, label: "Pharmacy Practice" },
        TestTubes: { Icon: TestTubes, label: "Pharmacology" },
        Books: { Icon: BookOpen, label: "Curriculum Studies" },
    };
    const { Icon, label } = iconMap[icon] || iconMap.Books;
    return (
        <div className="w-full h-full flex items-center justify-end pr-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-[#1C592F] shadow-xs">
                <Icon size={18} strokeWidth={2} className="text-[#1C592F] shrink-0" />
                <span className="text-[11px] font-semibold text-[#123a1a] font-sans tracking-tight">
                    {label}
                </span>
            </div>
        </div>
    );
}

function SemesterTimelineCard({
    sem,
    table,
    open,
    onToggle,
}: {
    sem: SyllabusSemester;
    table: CourseSyllabusContent["table"];
    open: boolean;
    onToggle: () => void;
}) {
    const panelId = `syllabus-sem-${sem.number}`;

    return (
        <div className="relative flex items-start gap-3 sm:gap-6 group">
            {/* ── Left Timeline Number Circle ── */}
            <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-sans font-bold text-base sm:text-lg shrink-0 transition-all duration-300 shadow-sm z-10 select-none ${
                    open
                        ? "bg-[#0c2411] text-white ring-4 ring-[#FCFAF7] shadow-md"
                        : "bg-[#F7F3E8] text-slate-800 border border-amber-200/80 hover:bg-[#F0EADA]"
                }`}
            >
                {sem.number}
            </div>

            {/* ── Right Semester Card ── */}
            <section className="flex-1 min-w-0 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                {/* Header Button */}
                <h2>
                    <button
                        type="button"
                        onClick={onToggle}
                        aria-expanded={open}
                        aria-controls={panelId}
                        className="w-full relative flex items-center justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 text-left transition-colors hover:bg-slate-50/50 cursor-pointer"
                    >
                        {/* Title & Metadata */}
                        <div className="min-w-0 z-10 py-0.5">
                            <span className="block text-[11px] font-bold tracking-[0.18em] text-[#B8933E] uppercase mb-1">
                                {sem.kicker}
                            </span>
                            <span className="block font-serif font-bold text-xl sm:text-2xl text-slate-900 leading-tight">
                                {sem.title}
                            </span>
                            <span className="block text-xs text-slate-500 font-medium mt-1">
                                {sem.countLabel}
                            </span>
                        </div>

                        {/* Right Decorative Graphic & Expand Chevron */}
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0 z-10">
                            <div className="hidden sm:block w-36 sm:w-44 h-14 sm:h-16 pointer-events-none overflow-hidden rounded-xl">
                                <SemesterBannerIllustration icon={sem.icon} />
                            </div>
                            <motion.div
                                animate={{ rotate: open ? 180 : 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200/80 flex items-center justify-center text-slate-600 transition-colors shrink-0"
                            >
                                <ChevronDown size={20} />
                            </motion.div>
                        </div>
                    </button>
                </h2>

                {/* Smooth Animated Accordion Height Content */}
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            id={panelId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="border-t border-slate-200/70 overflow-hidden"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[580px]">
                                    <thead>
                                        <tr className="bg-slate-100/70 border-b border-slate-200/80 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                                            <th className="py-3 px-4 sm:px-6 w-12 text-center">{table.number}</th>
                                            <th className="py-3 px-4 sm:px-6 w-36 sm:w-44">{table.code}</th>
                                            <th className="py-3 px-4 sm:px-6">{table.name}</th>
                                            <th className="py-3 px-4 sm:px-6 w-36 sm:w-44 text-right sm:text-center">{table.action}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-sans text-sm">
                                        {sem.subjects.map((sub, idx) => (
                                            <tr
                                                key={sub.code}
                                                className="hover:bg-slate-50/80 transition-colors group"
                                            >
                                                <td className="py-3.5 px-4 sm:px-6 text-center font-mono text-xs text-slate-400 font-semibold">
                                                    {idx + 1}
                                                </td>
                                                <td className={`py-3.5 px-4 sm:px-6 font-mono text-xs sm:text-[13px] font-bold tracking-wide ${sub.pdf ? "text-slate-900" : "text-slate-400"}`}>
                                                    {sub.code}
                                                </td>
                                                <td className={`py-3.5 px-4 sm:px-6 font-medium leading-relaxed ${sub.pdf ? "text-slate-800 group-hover:text-[#123a1a]" : "text-slate-400"}`}>
                                                    {sub.name}
                                                </td>
                                                <td className="py-3.5 px-4 sm:px-6 text-right sm:text-center">
                                                    {sub.pdf ? (
                                                        <a
                                                            href={sub.pdf}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                                        >
                                                            <FileText size={15} className="text-red-500 shrink-0" />
                                                            <span>{table.openLabel}</span>
                                                            <ExternalLink size={13} className="text-blue-500 shrink-0" />
                                                        </a>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 opacity-60 select-none">
                                                            <FileText size={15} className="text-slate-400 shrink-0" />
                                                            <span>{table.openLabel}</span>
                                                            <ExternalLink size={13} className="text-slate-300 shrink-0" />
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}

export default function CourseSyllabus() {
    const { bPharm, dPharm } = useCourseSyllabusContent();
    const [selectedCourse, setSelectedCourse] = useState<"B.Pharm" | "D.Pharm">("B.Pharm");

    const content = selectedCourse === "B.Pharm" ? bPharm : dPharm;

    // Accordion state per course
    const [openMap, setOpenMap] = useState<Record<string, Set<number>>>({});
    const currentOpenSet = openMap[selectedCourse] ?? new Set([content.semesters[0]?.number ?? 1]);

    const toggle = (n: number) => {
        setOpenMap((prev) => {
            const nextSet = new Set(currentOpenSet);
            if (nextSet.has(n)) nextSet.delete(n);
            else nextSet.add(n);
            return {
                ...prev,
                [selectedCourse]: nextSet,
            };
        });
    };

    return (
        <SubPageLayout
            title={content.pageTitle}
            subtitle={content.pageSubtitle}
            category="students-corner"
            activeItemLabel="Course Syllabus"
        >
            <div className="w-full py-2 space-y-6">
                {/* ── COURSE SELECTION BUTTONS ── */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-inner gap-1">
                        <button
                            type="button"
                            onClick={() => setSelectedCourse("B.Pharm")}
                            className={`px-6 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                                selectedCourse === "B.Pharm"
                                    ? "bg-[#0c2411] text-white shadow-md"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                            }`}
                        >
                            {bPharm.programme}
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedCourse("D.Pharm")}
                            className={`px-6 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                                selectedCourse === "D.Pharm"
                                    ? "bg-[#0c2411] text-white shadow-md"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                            }`}
                        >
                            {dPharm.programme}
                        </button>
                    </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6"><RichText text={content.intro} /></p>

                {/* ── Timeline Container with Vertical Line ── */}
                <div className="relative space-y-6 sm:space-y-7">
                    {/* Vertical connecting line running down behind step numbers */}
                    <div className="absolute left-[19px] sm:left-[21px] top-6 bottom-6 w-[2px] bg-amber-200/60 pointer-events-none" />

                    {content.semesters.map((sem) => (
                        <SemesterTimelineCard
                            key={`${selectedCourse}-${sem.number}`}
                            sem={sem}
                            table={content.table}
                            open={currentOpenSet.has(sem.number)}
                            onToggle={() => toggle(sem.number)}
                        />
                    ))}
                </div>
            </div>
        </SubPageLayout>
    );
}