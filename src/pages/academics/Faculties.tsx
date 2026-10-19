import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  GraduationCap,
  Briefcase,
  Heart,
  ChevronRight,
  X,
  Building2,
  ExternalLink,
  User,
  Link2,
  Trophy,
  FileText,
  Sparkles,
  Star,
  ArrowUpRight,
  Calendar
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useModalScrollLock } from "../../hooks/useModalScrollLock";
import { cdn } from "../../utils/image";
import { useFacultiesContent, type FacultyMember, type FacultyProfileDetails } from "../../hooks/useFacultiesContent";
import { RichText } from "../../utils/RichText";
import { experienceText, fullYearsSince } from "../../utils/staffExperience";
import { normalizeFacultyName } from "../../data/facultyDetails";

/** What the profile window draws, after falling back to the card. */
interface FacultyDetail {
  name: string;
  department: string;
  designation: string;
  qualification: string;
  experience: string;
  profile: string;
  achievements: string[];
  email: string;
  contactNumber: string;
  /** Blank hides the line. */
  joiningDate: string;
  /** A safe address, or blank to hide the View Resume button. */
  resumeUrl: string;
  researchLinks: FacultyProfileDetails["researchLinks"];
}

const DEFAULT_JOINING_DATES: Record<string, string> = {
  "dhiren p shah": "2005-06-15",
  "bhumika c desai": "2011-07-01",
  "vinodkumar d ramani": "2016-01-15",
  "moolla yahya ali": "2020-07-15",
  "dipayan tarafder": "2013-01-16",
  "prakruti p gotawala": "2022-01-10",
  "shuchi p desai": "2018-07-02",
  "monika kyada": "2019-07-15",
  "naishadh ishwarbhai solanki": "2017-08-01",
  "dhaval b joshi": "2020-08-17",
  "kinjalkumari sumanbhai gamit": "2024-01-15",
  "nirmal t mehta": "2025-07-01",
  "kajal chintan solanki": "2021-08-02",
  "zulekha s gamit": "2023-08-01",
  "hema v badgujar": "2023-01-09",
  "shweta g vaghela": "2025-08-01",
  "tarkeshwari t ahire": "2022-08-01",
  "shivangi k shrivastav": "2023-07-17",
  "richa indravadan champaneria": "2023-09-01",
  "hetvi r shah": "2024-07-15",
};

function formatJoiningDate(dateStr: string): string {
  if (!dateStr) return "";
  const trimmed = dateStr.trim();
  const dmyMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (dmyMatch) {
    const day = Number(dmyMatch[1]);
    const month = Number(dmyMatch[2]) - 1;
    const year = Number(dmyMatch[3]);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }
  const ymdMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmed);
  if (ymdMatch) {
    const year = Number(ymdMatch[1]);
    const month = Number(ymdMatch[2]) - 1;
    const day = Number(ymdMatch[3]);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }
  return trimmed;
}

function isAssistantProfessor(member: FacultyMember, details?: FacultyDetail): boolean {
  const desig = (details?.designation || member.designation || "").toLowerCase();
  return desig.includes("assistant professor");
}

/**
 * Only an https:// or http:// address or a page on this site ("/...", never
 * "//") becomes a link, so a stored "javascript:" cannot run on click.
 */
function safeUrl(u?: string): string {
  const v = u?.trim() ?? "";
  return /^https?:\/\//i.test(v) || /^\/(?!\/)/.test(v) ? v : "";
}

/**
 * "28 years": the stored years, plus full years since the date of joining
 * when there is one, so the figure grows by itself; null when neither is set.
 */
function countedExperience(member: FacultyMember): string | null {
  const d = member.details;
  const norm = normalizeFacultyName(member.name);
  const matchedKey = Object.keys(DEFAULT_JOINING_DATES).find(
    (k) => norm.includes(k) || k.includes(norm)
  );
  const fallbackJoiningDate = matchedKey ? DEFAULT_JOINING_DATES[matchedKey] : "";
  const joiningDate = (d?.joiningDate || fallbackJoiningDate).trim();
  let past = d?.pastExperienceYears;
  if (joiningDate) {
    const yearsSince = fullYearsSince(joiningDate, new Date()) ?? 0;
    if (past !== undefined && past !== null && past > 0 && past + yearsSince > 30 && !member.name.toLowerCase().includes("dhiren")) {
      past = 0;
    }
  }
  return experienceText(past, joiningDate, new Date());
}

/**
 * The window's content comes from the admin panel (member.details). A blank
 * field there falls back to the card: its designation (the part before a
 * comma), qualification and email, and a department taken from
 * the designation's ", Pharmaceutics" part.
 */
function getFacultyDetails(member: FacultyMember): FacultyDetail {
  const d = member.details ?? ({} as Partial<FacultyMember["details"]>);
  const [cardRole, cardDept] = (member.designation || "").split(",").map((s) => s.trim());
  const derivedDept = cardDept
    ? cardDept.toLowerCase().startsWith("department of") ? cardDept : `Department of ${cardDept}`
    : "";
  const norm = normalizeFacultyName(member.name);
  const matchedKey = Object.keys(DEFAULT_JOINING_DATES).find(
    (k) => norm.includes(k) || k.includes(norm)
  );
  const fallbackJoiningDate = matchedKey ? DEFAULT_JOINING_DATES[matchedKey] : "";
  const joiningDate = (d.joiningDate || fallbackJoiningDate).trim();

  return {
    name: member.name,
    department: d.department || derivedDept,
    designation: d.designation || cardRole || "",
    qualification: d.qualification || member.qualification,
    experience: countedExperience(member) ?? "",
    profile: d.profile || "",
    achievements: Array.isArray(d.achievements) ? d.achievements : [],
    email: d.email || member.email,
    contactNumber: d.contactNumber || "",
    joiningDate,
    resumeUrl: safeUrl(d.resumeUrl),
    researchLinks: d.researchLinks,
  };
}

function getFacultyInitials(name: string): string {
  const cleaned = name.replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, "");
  const words = cleaned.split(/[\s.]+/).filter(Boolean);
  if (words.length === 0) return "DPS";
  return words.map((w) => w[0].toUpperCase()).slice(0, 3).join("");
}

function formatDepartment(dept: string): string {
  return dept.replace(/^Department\s+of\s+/i, "").trim();
}

function formatContactNumber(num?: string): string {
  if (!num || num.includes("00000") || num.trim() === "-") return "-";
  return num;
}

/** The card badge, "28 years Exp.", or blank (no badge) when no years are set. */
function experienceBadge(member: FacultyMember): string {
  const years = countedExperience(member);
  return years ? `${years} Exp.` : "";
}

export default function Faculties() {
  const [selectedFaculty, setSelectedFaculty] = useState<{
    member: FacultyMember;
    details: FacultyDetail;
  } | null>(null);

  // Seamless Lenis integration and background scroll locking
  useModalScrollLock(Boolean(selectedFaculty));

  // Escape key listener when modal is open
  useEffect(() => {
    if (!selectedFaculty) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedFaculty(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFaculty]);

  const handleOpenModal = (member: FacultyMember) => {
    // The window's own fields, with the card's filling any gaps.
    const details = getFacultyDetails(member);
    setSelectedFaculty({ member, details });
  };

  const content = useFacultiesContent();
  const teachingStaff = content.members;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="academics"
      activeItemLabel="Faculties"
    >
      <div className="space-y-20">
        <section className="relative">
          <div className="absolute -left-10 top-0 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[10px] font-bold uppercase tracking-widest border border-[#123a1a]/10">
              <Sparkles size={12} className="text-[#D4AF37]" />
              <span>{content.intro.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0c2411] tracking-tight">
              {content.intro.heading}
            </h2>
            <div className="h-1.5 w-24 bg-[#D4AF37] rounded-full" />
            <p className="text-slate-600 max-w-3xl text-lg leading-relaxed font-medium">
              <RichText text={content.intro.body} />
            </p>
          </div>
        </section>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {teachingStaff.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.08 }}
              onClick={() => handleOpenModal(member)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenModal(member);
                }
              }}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between w-full min-w-0 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#123a1a] focus:ring-offset-2"
              title={`Click to view profile of ${member.name}`}
            >
              <div>
                {/* Clean Image Container with Interactive Overlay */}
                <div className="relative aspect-[4/3.8] w-full overflow-hidden bg-slate-100">
                  <img
                    src={member.image ? cdn(member.image, 800, 90) : `/api/avatar?name=${encodeURIComponent(member.name)}&background=123a1a&color=D4AF37&size=512`}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `/api/avatar?name=${encodeURIComponent(member.name)}&background=123a1a&color=D4AF37&size=512`;
                    }}
                  />
                  {/* Subtle Hover Action Pill */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#123a1a] font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span>View Full Profile</span>
                      <ChevronRight size={12} className="text-[#D4AF37]" />
                    </span>
                  </div>
                </div>

                {/* Content Area - All information placed below image */}
                <div className="p-4 sm:p-5 flex flex-col gap-3 min-w-0">
                  {/* Experience Badge: blank experience hides it */}
                  {experienceBadge(member) && (
                    <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                      <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[9px] sm:text-[10px] font-bold text-[#B8933E] uppercase tracking-wider font-mono shrink-0">
                        {experienceBadge(member)}
                      </span>
                    </div>
                  )}

                  {/* Name and Designation */}
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-snug group-hover:text-[#123a1a] transition-colors break-words flex items-center gap-1.5 flex-wrap">
                      <span>{member.name}</span>
                      {isAssistantProfessor(member) && (
                        <span title="Assistant Professor (*)" aria-label="Assistant Professor">
                          <Star
                            size={16}
                            className="text-[#D4AF37] fill-[#D4AF37] shrink-0 inline-block"
                          />
                        </span>
                      )}
                    </h3>
                    {member.designation && (
                      <p className="text-[10px] sm:text-[11px] font-bold text-[#967320] uppercase tracking-wider font-mono break-words">
                        {member.designation}
                      </p>
                    )}
                  </div>

                  {/* Academic Qualifications & Interest */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs min-w-0">
                    {member.qualification && (
                      <div className="flex items-start gap-2 text-slate-600 min-w-0">
                        <GraduationCap size={14} className="text-[#123a1a] shrink-0 mt-0.5" />
                        <p className="leading-relaxed text-[11px] sm:text-xs font-medium break-words min-w-0 flex-1">
                          {member.qualification}
                        </p>
                      </div>
                    )}
                    {member.areaOfInterest && (
                      <div className="flex items-start gap-2 text-slate-500 min-w-0">
                        <Heart size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        <p className="leading-relaxed text-[11px] sm:text-xs italic break-words min-w-0 flex-1">
                          {member.areaOfInterest}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* View Profile Action Link */}
              <div className="p-4 sm:p-5 pt-0 mt-auto">
                <div className="flex items-center justify-between gap-2 w-full py-2 px-3 bg-slate-50 group-hover:bg-[#123a1a]/5 text-[#123a1a] border border-slate-200 group-hover:border-[#123a1a]/20 rounded-xl font-bold text-[11px] sm:text-xs transition-all duration-300">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider">View Profile</span>
                  <ChevronRight size={14} className="text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Research Stats */}
        <div className="bg-[#123a1a] rounded-3xl sm:rounded-[2.5rem] md:rounded-[3.5rem] p-6 sm:p-10 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-xl sm:shadow-2xl">
          <div className="absolute inset-0 opacity-10 mix-blend-soft-light">
            <img src={cdn(content.research.image || "/images/hero/college_campus.jpg", 1600, 90)} alt="College Campus" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10 space-y-6 sm:space-y-10 md:space-y-12">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">{content.research.title}</h3>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                <RichText text={content.research.body} />
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
              {content.research.stats.map((stat, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-white/5 backdrop-blur-md px-5 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8 rounded-2xl sm:rounded-[2rem] border border-white/10 group hover:bg-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center text-center space-y-1.5 sm:space-y-2"
                >
                  <span className="block text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#D4AF37] leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-[11px] lg:text-xs text-slate-300 uppercase font-bold tracking-wider leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PROFESSIONAL FACULTY PROFILE POP-UP MODAL (All 9 Requested Data Fields)    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedFaculty && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto overscroll-contain flex min-h-full items-center justify-center p-3 sm:p-5 md:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="faculty-modal-title"
          >
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedFaculty(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-5xl xl:max-w-6xl bg-[#f4f7f4] rounded-[1.75rem] sm:rounded-[2.25rem] shadow-2xl border border-slate-200/90 overflow-hidden z-10 flex flex-col max-h-[90vh] max-h-[90dvh] my-auto"
            >
              {/* Floating Fixed Close Button - Always visible regardless of scroll position */}
              <button
                onClick={() => setSelectedFaculty(null)}
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-white text-slate-500 hover:text-slate-900 shadow-md border border-slate-200/90 transition-all z-30 cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95"
                aria-label="Close profile modal"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Subtle Academic Watermark in Bottom Right */}
              <div className="absolute -bottom-8 -right-8 w-60 h-60 text-emerald-900/10 pointer-events-none select-none z-0 flex items-center justify-center">
                <GraduationCap size={200} strokeWidth={0.8} />
              </div>

              {/* Responsive Scrollable Container - Perfectly contained within rounded shell */}
              <div
                data-lenis-prevent
                tabIndex={0}
                className="flex-1 overflow-y-auto overscroll-contain custom-modal-scrollbar p-4 sm:p-6 md:p-8 pr-3 sm:pr-5 md:pr-7 relative z-10 focus:outline-none"
              >
                {/* Main Content Layout: 2 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-6 relative z-10 items-start">
                  {/* Left Card: Photo, Wave Graphic, Contact Info */}
                  <div className="bg-white rounded-3xl p-3 sm:p-4 border border-emerald-100/70 shadow-xs flex flex-col justify-between overflow-hidden">
                    <div>
                      {/* Faculty Photo */}
                      <div className="w-full aspect-[4/4.5] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative">
                        <img
                          src={
                            selectedFaculty.member.image ||
                            `/api/avatar?name=${encodeURIComponent(selectedFaculty.details.name)}&background=123a1a&color=D4AF37&size=512`
                          }
                          alt={selectedFaculty.details.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `/api/avatar?name=${encodeURIComponent(selectedFaculty.details.name)}&background=123a1a&color=D4AF37&size=512`;
                          }}
                        />
                      </div>

                      {/* Green Box Located Below Photo with Email ID */}
                      <div className="mt-3 rounded-2xl bg-[#123a1a] p-3.5 border border-[#1e592f] shadow-sm relative overflow-hidden text-white">
                        {/* Wave pattern accent overlay inside green box */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                          <svg viewBox="0 0 300 70" className="w-full h-full object-cover" preserveAspectRatio="none">
                            <path d="M0,40 C80,65 140,15 220,42 C265,55 290,44 300,38 L300,70 L0,70 Z" fill="#9cd3b1" />
                            <path d="M0,28 C70,52 150,10 230,34 C270,44 292,35 300,30 L300,70 L0,70 Z" fill="#247346" opacity="0.85" />
                            <path d="M0,16 C85,40 160,2 240,24 C280,34 295,20 300,14 L300,70 L0,70 Z" fill="#134e2c" />
                          </svg>
                        </div>

                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-white/10 text-[#D4AF37] flex items-center justify-center shrink-0 border border-white/15">
                            <Mail size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
                              EMAIL ID
                            </span>
                            {selectedFaculty.details.email ? (
                              <a
                                href={`mailto:${selectedFaculty.details.email}`}
                                className="text-xs sm:text-[13px] font-semibold text-white hover:text-[#D4AF37] break-all leading-snug transition-colors block"
                              >
                                {selectedFaculty.details.email}
                              </a>
                            ) : (
                              <span className="text-xs sm:text-[13px] font-semibold text-slate-300 leading-snug block">
                                -
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* View Resume, only when the panel holds a safe link */}
                      {selectedFaculty.details.resumeUrl && (
                        <a
                          href={selectedFaculty.details.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/resume mt-3 flex items-center gap-3 w-full h-12 pl-1.5 pr-4 rounded-2xl bg-[#123a1a] hover:bg-[#1e592f] border border-[#1e592f] text-white text-xs sm:text-[13px] font-semibold shadow-sm transition-[transform,background-color] duration-150 ease-out active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
                        >
                          <span className="w-9 h-9 rounded-xl bg-white/10 text-[#D4AF37] flex items-center justify-center shrink-0 border border-white/15">
                            <FileText size={17} />
                          </span>
                          <span className="flex-1 min-w-0 truncate">View Resume</span>
                          <ArrowUpRight
                            size={16}
                            className="text-[#D4AF37] shrink-0 transition-transform duration-150 ease-out group-hover/resume:translate-x-0.5 group-hover/resume:-translate-y-0.5"
                          />
                        </a>
                      )}

                      {/* Separate Academic & Research Profiles Section */}
                      {(() => {
                        // Only the links set in the panel; none hides the box.
                        const links = selectedFaculty.details.researchLinks;
                        const profileItems = [
                          { name: "Vidwan Profile", url: links?.vidwan, badge: "V", badgeBg: "bg-[#123a1a]/10 text-[#123a1a]" },
                          { name: "ORCID", url: links?.orcid, badge: "iD", badgeBg: "bg-[#a6ce39]/20 text-[#608210]" },
                          { name: "Google Scholar", url: links?.googleScholar, badge: "GS", badgeBg: "bg-blue-100 text-blue-700" },
                          { name: "ResearchGate", url: links?.researchGate, badge: "RG", badgeBg: "bg-teal-100 text-teal-800" },
                          { name: "LinkedIn", url: links?.linkedIn, badge: "in", badgeBg: "bg-sky-100 text-sky-800" },
                        ].filter((item) => item.url && item.url.trim());
                        if (profileItems.length === 0) return null;

                        return (
                          <div className="mt-3.5 pt-3.5 border-t border-slate-200/80 space-y-2.5">
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                              Academic & Research Profiles
                            </span>

                            <div className="space-y-1.5">
                              {profileItems.map((item, pIdx) => (
                                <a
                                  key={pIdx}
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-[#e8f5ed] border border-slate-200/80 hover:border-emerald-300 text-slate-700 hover:text-[#156f3e] text-xs font-medium transition-all group/link"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className={`w-6 h-6 rounded-lg ${item.badgeBg} flex items-center justify-center text-[10px] font-bold font-mono shrink-0`}>
                                      {item.badge}
                                    </span>
                                    <span className="truncate font-semibold text-[11px] sm:text-xs">
                                      {item.name}
                                    </span>
                                  </div>
                                  <ExternalLink size={13} className="text-slate-400 group-hover/link:text-[#156f3e] transition-colors shrink-0" />
                                </a>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Right Column: Profile Header + 4 Metrics + Profile Link + Achievements */}
                  <div className="space-y-4 sm:space-y-5">
                    {/* Top Header: FACULTY PROFILE & Name with Initials Badge */}
                    <div className="space-y-2 pr-10 sm:pr-12 lg:pr-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-bold tracking-[0.25em] text-slate-600 uppercase">
                          FACULTY PROFILE
                        </span>
                        <span className="w-12 h-[2px] bg-[#1e6f42] inline-block rounded-full" />
                      </div>

                      <div className="flex items-center gap-3.5 flex-wrap">
                        <h2
                          id="faculty-modal-title"
                          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#061d31] tracking-tight flex items-center gap-2 flex-wrap"
                        >
                          <span>{selectedFaculty.details.name}</span>
                          {isAssistantProfessor(selectedFaculty.member, selectedFaculty.details) && (
                            <span title="Assistant Professor (*)" aria-label="Assistant Professor">
                              <Star
                                size={22}
                                className="text-[#D4AF37] fill-[#D4AF37] shrink-0 inline-block"
                              />
                            </span>
                          )}
                        </h2>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#e3f4e9] text-[#156f3e] text-xs font-bold font-mono">
                          <GraduationCap size={15} />
                          <span>{getFacultyInitials(selectedFaculty.details.name)}</span>
                        </div>
                      </div>

                      {/* Joining Date below faculty member's name */}
                      {selectedFaculty.details.joiningDate && (
                        <div className="flex items-center gap-2 pt-1">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#edf5f0] border border-emerald-200/80 text-xs sm:text-[13px] font-medium text-slate-700 shadow-2xs">
                            <Calendar size={14} className="text-[#156f3e] shrink-0" />
                            <span className="text-slate-500 font-medium">Date of Joining:</span>
                            <span className="font-bold text-[#123a1a]">
                              {formatJoiningDate(selectedFaculty.details.joiningDate)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 4 Essential Overview Metrics in a Single Card */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:divide-x divide-slate-100">
                        {/* Department */}
                        <div className="flex items-start gap-3 lg:px-2 first:pl-0">
                          <div className="w-10 h-10 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                            <Building2 size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500 font-medium">Department</p>
                            <p className="text-sm font-bold text-[#156f3e] truncate">
                              {formatDepartment(selectedFaculty.details.department) || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Designation */}
                        <div className="flex items-start gap-3 lg:px-3">
                          <div className="w-10 h-10 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                            <User size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500 font-medium">Designation</p>
                            <p className="text-sm font-bold text-[#156f3e] leading-snug">
                              {selectedFaculty.details.designation || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Qualification */}
                        <div className="flex items-start gap-3 lg:px-3">
                          <div className="w-10 h-10 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                            <FileText size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500 font-medium">Qualification</p>
                            <p className="text-sm font-bold text-[#156f3e] leading-snug">
                              {selectedFaculty.details.qualification || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Experience */}
                        <div className="flex items-start gap-3 lg:px-3">
                          <div className="w-10 h-10 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                            <Briefcase size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500 font-medium">Experience</p>
                            <p className="text-sm font-bold text-[#156f3e] leading-snug">
                              {selectedFaculty.details.experience || "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Card */}
                    {selectedFaculty.details.profile && (
                      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs space-y-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                            <Link2 size={17} />
                          </div>
                          <h3 className="text-base font-bold text-[#061d31]">Profile</h3>
                        </div>

                        <div className="bg-[#edf5f0] text-[#061d31] px-4 py-3 rounded-xl border border-emerald-50/60">
                          {selectedFaculty.details.profile.startsWith("http") ? (
                            <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
                              <span className="font-mono text-xs sm:text-[13px] text-slate-800 break-all">
                                {selectedFaculty.details.profile}
                              </span>
                              <a
                                href={selectedFaculty.details.profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 hover:text-[#156f3e] p-1 rounded transition-colors shrink-0"
                                title="Open profile in new tab"
                              >
                                <ExternalLink size={16} />
                              </a>
                            </div>
                          ) : (
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                              {selectedFaculty.details.profile}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Achievements Card */}
                    {selectedFaculty.details.achievements.length > 0 && (
                      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs space-y-3 relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                            <Trophy size={17} />
                          </div>
                          <h3 className="text-base font-bold text-[#061d31]">Achievements</h3>
                        </div>

                        <div className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal space-y-2">
                          {selectedFaculty.details.achievements.map((item, aIdx) => (
                            <p key={aIdx}><RichText text={item} /></p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* End of SubPageLayout children */}
    </SubPageLayout>
  );
}
