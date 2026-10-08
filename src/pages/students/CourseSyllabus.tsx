import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import {
    useCourseSyllabusContent,
    type CourseSyllabusContent,
    type SyllabusIcon,
    type SyllabusSemester,
} from "../../hooks/useCourseSyllabusContent";

/**
 * 3D/Pharma Graphic Banner Illustrations for Semester Cards.
 *
 * Which one a semester gets is chosen in the panel, not fixed to its number, so
 * a ninth semester is as well drawn as the first.
 */
function SemesterBannerIllustration({ icon }: { icon: SyllabusIcon }) {
    switch (icon) {
        case "Beakers": // Beakers & Molecules
            return (
                <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-85">
                    <circle cx="160" cy="40" r="30" fill="url(#blue-grad-1)" opacity="0.15" />
                    <path d="M140 55L155 30V15H150V10H170V15H165V30L180 55C183 60 179 66 173 66H147C141 66 137 60 140 55Z" stroke="#3B82F6" strokeWidth="2" fill="url(#glass-grad-1)" strokeLinejoin="round" />
                    <path d="M143 50C150 48 160 52 177 50V62C177 64 175 66 173 66H147C145 66 143 64 143 62V50Z" fill="#93C5FD" fillOpacity="0.4" />
                    <circle cx="152" cy="56" r="2" fill="#2563EB" />
                    <circle cx="165" cy="58" r="3" fill="#2563EB" />
                    <circle cx="160" cy="48" r="2.5" fill="#2563EB" />
                    <circle cx="105" cy="25" r="5" fill="#60A5FA" />
                    <circle cx="125" cy="38" r="4" fill="#3B82F6" />
                    <circle cx="100" cy="52" r="6" fill="#2563EB" />
                    <line x1="105" y1="25" x2="125" y2="38" stroke="#93C5FD" strokeWidth="2" />
                    <line x1="125" y1="38" x2="100" y2="52" stroke="#93C5FD" strokeWidth="2" />
                    <defs>
                        <linearGradient id="blue-grad-1" x1="130" y1="10" x2="190" y2="70">
                            <stop stopColor="#3B82F6" />
                            <stop offset="1" stopColor="#1E40AF" />
                        </linearGradient>
                        <linearGradient id="glass-grad-1" x1="140" y1="10" x2="180" y2="66">
                            <stop stopColor="#EFF6FF" stopOpacity="0.8" />
                            <stop offset="1" stopColor="#DBEAFE" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                </svg>
            );
        case "Bonds": // Chemical Bonds & Molecules
            return (
                <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-85">
                    <circle cx="150" cy="40" r="32" fill="#E0F2FE" opacity="0.4" />
                    <path d="M130 30L150 18L170 30L170 50L150 62L130 50Z" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" fill="#BAE6FD" fillOpacity="0.2" />
                    <circle cx="130" cy="30" r="5" fill="#0369A1" />
                    <circle cx="150" cy="18" r="6" fill="#0284C7" />
                    <circle cx="170" cy="30" r="5" fill="#0369A1" />
                    <circle cx="170" cy="50" r="6" fill="#0284C7" />
                    <circle cx="150" cy="62" r="5" fill="#0369A1" />
                    <circle cx="130" cy="50" r="6" fill="#0284C7" />
                    <circle cx="105" cy="40" r="4" fill="#38BDF8" />
                    <line x1="110" y1="40" x2="124" y2="32" stroke="#7DD3FC" strokeWidth="2" />
                    <line x1="110" y1="40" x2="124" y2="48" stroke="#7DD3FC" strokeWidth="2" />
                </svg>
            );
        case "Capsules": // Capsules & Pills
            return (
                <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-85">
                    <circle cx="155" cy="40" r="32" fill="#FFE4E6" opacity="0.5" />
                    <g transform="rotate(-30 145 35)">
                        <rect x="125" y="27" width="40" height="18" rx="9" fill="#E11D48" />
                        <path d="M145 27H156C161 27 165 31 165 36C165 41 161 45 156 45H145V27Z" fill="#FDA4AF" />
                        <line x1="145" y1="27" x2="145" y2="45" stroke="#FFF" strokeWidth="1.5" />
                    </g>
                    <g transform="rotate(25 170 48)">
                        <rect x="150" y="40" width="36" height="16" rx="8" fill="#F43F5E" />
                        <path d="M168 40H178C182.4 40 186 43.6 186 48C186 52.4 182.4 56 178 56H168V40Z" fill="#FFE4E6" />
                        <line x1="168" y1="40" x2="168" y2="56" stroke="#FFF" strokeWidth="1.5" />
                    </g>
                </svg>
            );
        case "Flask": // Laboratory Flasks & Green Leaves
            return (
                <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-85">
                    <circle cx="150" cy="42" r="30" fill="#DCFCE7" opacity="0.5" />
                    <path d="M135 56L145 34V18H142V14H158V18H155V34L165 56C167 60 164 65 159 65H141C136 65 133 60 135 56Z" stroke="#16A34A" strokeWidth="2" fill="#F0FDF4" />
                    <path d="M137 52C143 50 152 54 163 52V61C163 63 161 65 159 65H141C139 65 137 63 137 61V52Z" fill="#86EFAC" fillOpacity="0.5" />
                    <path d="M165 35C175 30 182 35 180 48C170 46 168 38 165 35Z" fill="#22C55E" />
                    <path d="M165 35C168 42 174 46 180 48" stroke="#15803D" strokeWidth="1.5" />
                    <path d="M168 25C175 18 185 20 185 32C176 33 170 27 168 25Z" fill="#4ADE80" />
                </svg>
            );
        case "Microscope": // Microscope
            return (
                <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-85">
                    <circle cx="150" cy="40" r="30" fill="#F1F5F9" opacity="0.6" />
                    <path d="M130 64H170V68H130V64Z" fill="#334155" />
                    <path d="M158 64V40C158 32 152 25 142 25H138" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                    <rect x="132" y="16" width="12" height="24" rx="3" transform="rotate(15 138 28)" fill="#0F172A" />
                    <rect x="135" y="38" width="6" height="10" fill="#64748B" />
                    <rect x="130" y="48" width="24" height="4" fill="#1E293B" />
                </svg>
            );
        case "Mortar": // Mortar & Pestle with Herbal Leaves
            return (
                <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-85">
                    <circle cx="150" cy="42" r="30" fill="#FEF3C7" opacity="0.5" />
                    <path d="M128 36C128 36 130 62 150 62C170 62 172 36 172 36H128Z" fill="#F59E0B" fillOpacity="0.2" stroke="#D97706" strokeWidth="2.5" />
                    <ellipse cx="150" cy="36" rx="22" ry="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
                    <path d="M156 20L142 44" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
                    <path d="M166 26C176 22 182 28 178 38C170 36 168 30 166 26Z" fill="#16A34A" />
                    <path d="M172 38C180 34 186 40 184 48C176 46 174 42 172 38Z" fill="#4ADE80" />
                </svg>
            );
        case "TestTubes": // Test Tubes with Leaves
            return (
                <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-85">
                    <circle cx="150" cy="40" r="30" fill="#E0F2FE" opacity="0.5" />
                    <rect x="125" y="55" width="50" height="6" rx="2" fill="#0284C7" opacity="0.3" />
                    <rect x="133" y="20" width="10" height="36" rx="5" stroke="#0284C7" strokeWidth="2" fill="#F0F9FF" />
                    <path d="M134 38C137 36 140 40 142 38V51C142 53.8 139.8 56 137 56C134.2 56 132 53.8 132 51V38H134Z" fill="#38BDF8" fillOpacity="0.6" />
                    <rect x="148" y="16" width="10" height="40" rx="5" stroke="#0284C7" strokeWidth="2" fill="#F0F9FF" />
                    <path d="M149 32C152 30 155 34 157 32V51C157 53.8 154.8 56 152 56C149.2 56 147 53.8 147 51V32H149Z" fill="#0284C7" fillOpacity="0.5" />
                    <rect x="163" y="22" width="10" height="34" rx="5" stroke="#0284C7" strokeWidth="2" fill="#F0F9FF" />
                    <path d="M164 40C167 38 170 42 172 40V51C172 53.8 169.8 56 167 56C164.2 56 162 53.8 162 51V40H164Z" fill="#7DD3FC" fillOpacity="0.6" />
                    <path d="M172 20C180 14 188 18 184 28C176 27 174 22 172 20Z" fill="#16A34A" />
                </svg>
            );
        case "Books": // Stack of Textbooks & Leaves
        default:
            return (
                <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-85">
                    <circle cx="150" cy="40" r="30" fill="#FEF3C7" opacity="0.4" />
                    <path d="M125 54H175V62H125V54Z" fill="#1E3A8A" />
                    <path d="M127 56H173V60H127V56Z" fill="#3B82F6" />
                    <rect x="123" y="54" width="4" height="8" rx="1" fill="#1E40AF" />
                    <path d="M128 44H172V52H128V44Z" fill="#D97706" />
                    <path d="M130 46H170V50H130V46Z" fill="#F59E0B" />
                    <rect x="126" y="44" width="4" height="8" rx="1" fill="#B45309" />
                    <path d="M132 34H168V42H132V34Z" fill="#059669" />
                    <path d="M134 36H166V40H134V36Z" fill="#10B981" />
                    <rect x="130" y="34" width="4" height="8" rx="1" fill="#047857" />
                    <path d="M165 18C175 12 184 18 180 30C170 28 168 22 165 18Z" fill="#15803D" />
                    <path d="M174 28C182 24 188 30 185 38C177 36 175 32 174 28Z" fill="#4ADE80" />
                </svg>
            );
    }
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
            <div className="max-w-4xl mx-auto py-2 space-y-6">
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
                            B. Pharm
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
                            D. Pharm
                        </button>
                    </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">{content.intro}</p>

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