import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  GraduationCap,
  Briefcase,
  Heart,
  ChevronRight,
  X,
  Phone,
  Building2,
  ExternalLink,
  User,
  Link2,
  Trophy,
  FileText,
  Sparkles
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useModalScrollLock } from "../../hooks/useModalScrollLock";
import { STAFF_MEMBERS, StaffMember } from "../../data/scrapedData";
import { getFacultyDetails, FacultyDetail } from "../../data/facultyDetails";

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

export default function Faculties() {
  const [selectedFaculty, setSelectedFaculty] = useState<{
    member: StaffMember;
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

  const handleOpenModal = (member: StaffMember) => {
    const details = getFacultyDetails(member);
    setSelectedFaculty({ member, details });
  };

  // Deduplicate by normalized name to guarantee each faculty member appears exactly once
  const seenNames = new Set<string>();
  const teachingStaff = STAFF_MEMBERS.filter((member) => {
    if (!member.isTeaching) return false;
    const normalized = member.name.toLowerCase().trim();
    if (seenNames.has(normalized)) return false;
    seenNames.add(normalized);
    return true;
  });

  return (
    <SubPageLayout
      title="Our Faculties"
      subtitle="Meet the distinguished academic guides and researchers at CKPIPSR."
      category="academics"
      activeItemLabel="Faculties"
    >
      <div className="space-y-20">
        <section className="relative">
          <div className="absolute -left-10 top-0 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[10px] font-bold uppercase tracking-widest border border-[#123a1a]/10">
              <Sparkles size={12} className="text-[#D4AF37]" />
              <span>Expert Mentorship</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0c2411] tracking-tight">
              Our Academic Leaders
            </h2>
            <div className="h-1.5 w-24 bg-[#D4AF37] rounded-full" />
            <p className="text-slate-600 max-w-3xl text-lg leading-relaxed font-medium">
              Our faculty members are chosen for their expertise, dedication, and research orientation. They bring a wealth 
              of knowledge and experience from both industry and academia to provide a holistic learning experience.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-medium bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Click on any faculty card below to view their detailed academic profile, achievements, and contact details.</span>
            </div>
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
                    src={member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=123a1a&color=D4AF37&size=512`} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                       (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=123a1a&color=D4AF37&size=512`;
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
                  {/* Qualification & Experience Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                    {member.qualification && (
                    <span className="px-2 py-0.5 rounded-md bg-[#123a1a]/5 border border-[#123a1a]/10 text-[9px] sm:text-[10px] font-bold text-[#123a1a] uppercase tracking-wider font-mono break-words">
                      {member.qualification.split(',')[0]}
                    </span>
                    )}
                    {member.experience && (
                      <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[9px] sm:text-[10px] font-bold text-[#B8933E] uppercase tracking-wider font-mono shrink-0">
                        {member.experience} Exp
                      </span>
                    )}
                  </div>

                  {/* Name and Designation */}
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-snug group-hover:text-[#123a1a] transition-colors break-words">
                      {member.name}
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
                    {member.area_of_interest && (
                      <div className="flex items-start gap-2 text-slate-500 min-w-0">
                        <Heart size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        <p className="leading-relaxed text-[11px] sm:text-xs italic break-words min-w-0 flex-1">
                          {member.area_of_interest}
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
        <div className="bg-[#123a1a] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 opacity-10 mix-blend-soft-light">
              <img src="/images/hero/college_campus.jpg" alt="College Campus" className="w-full h-full object-cover" />
           </div>
           
           <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">Academic Integrity &amp; Research</h3>
                <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
                   Our faculty members are active researchers contributing to the global pharmaceutical 
                   knowledge base through publications and innovative patents.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                 {[
                   { val: "50+", label: "Scientific Publications" },
                   { val: "10+", label: "Industrial Patents" },
                   { val: "15+", label: "Academic Books" }
                 ].map((stat, sIdx) => (
                   <div key={sIdx} className="bg-white/5 backdrop-blur-md px-8 py-8 rounded-[2rem] border border-white/10 group hover:bg-white/10 transition-all">
                      <span className="block text-4xl font-serif font-bold text-[#D4AF37] mb-2">{stat.val}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{stat.label}</span>
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

              {/* Decorative Pharmacy Mortar & Pestle Watermark in Bottom Right */}
              <svg
                viewBox="0 0 200 200"
                fill="none"
                className="absolute -bottom-6 -right-6 w-52 h-52 sm:w-64 sm:h-64 text-[#9cd3b1]/30 pointer-events-none select-none z-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Mortar bowl */}
                <path
                  d="M40 100 C40 150 70 170 100 170 C130 170 160 150 160 100 L165 90 C167 85 163 80 158 80 L42 80 C37 80 33 85 35 90 Z"
                  fill="currentColor"
                />
                {/* Base */}
                <path
                  d="M75 170 L70 185 C69 188 71 190 74 190 L126 190 C129 190 131 188 130 185 L125 170 Z"
                  fill="currentColor"
                />
                {/* Pestle */}
                <path
                  d="M130 40 L160 15 C164 11 170 12 173 16 L184 27 C188 31 187 37 183 40 L120 100 C116 104 110 103 107 99 L96 88 C92 84 93 78 97 75 Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                {/* Herb leaf */}
                <path
                  d="M60 70 C50 45 70 30 95 35 C100 55 80 75 60 70 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
              </svg>

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
                          selectedFaculty.member.image_url ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedFaculty.details.name)}&background=123a1a&color=D4AF37&size=512`
                        }
                        alt={selectedFaculty.details.name}
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedFaculty.details.name)}&background=123a1a&color=D4AF37&size=512`;
                        }}
                      />
                    </div>

                    {/* Layered Green Wave Graphic */}
                    <div className="w-full overflow-hidden -mt-1 -mb-1">
                      <svg viewBox="0 0 300 70" className="w-full h-14 sm:h-16 block" preserveAspectRatio="none">
                        <path
                          d="M0,40 C80,65 140,15 220,42 C265,55 290,44 300,38 L300,70 L0,70 Z"
                          fill="#9cd3b1"
                          opacity="0.6"
                        />
                        <path
                          d="M0,28 C70,52 150,10 230,34 C270,44 292,35 300,30 L300,70 L0,70 Z"
                          fill="#247346"
                          opacity="0.85"
                        />
                        <path
                          d="M0,16 C85,40 160,2 240,24 C280,34 295,20 300,14 L300,70 L0,70 Z"
                          fill="#134e2c"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Contact Information (Email & Contact No) */}
                  <div className="p-3 pt-3 space-y-3">
                    {/* Email Row */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                        <Mail size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-500 font-normal">Email</p>
                        <a
                          href={`mailto:${selectedFaculty.details.email}`}
                          className="text-xs sm:text-[13px] font-semibold text-slate-800 hover:text-[#156f3e] break-all leading-snug transition-colors block"
                        >
                          {selectedFaculty.details.email}
                        </a>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-slate-100/90" />

                    {/* Contact No Row */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                        <Phone size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-500 font-normal">Contact No</p>
                        <p className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug">
                          {formatContactNumber(selectedFaculty.details.contactNumber)}
                        </p>
                      </div>
                    </div>
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
                        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#061d31] tracking-tight"
                      >
                        {selectedFaculty.details.name}
                      </h2>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#e3f4e9] text-[#156f3e] text-xs font-bold font-mono">
                        <GraduationCap size={15} />
                        <span>{getFacultyInitials(selectedFaculty.details.name)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Essential Overview Metrics in a Single Card */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:divide-x divide-slate-100">
                      {/* Department */}
                      <div className="flex items-center gap-3 lg:px-2 first:pl-0">
                        <div className="w-10 h-10 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                          <Building2 size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 font-medium">Department</p>
                          <p className="text-sm font-bold text-[#156f3e] truncate">
                            {formatDepartment(selectedFaculty.details.department)}
                          </p>
                        </div>
                      </div>

                      {/* Designation */}
                      <div className="flex items-center gap-3 lg:px-3">
                        <div className="w-10 h-10 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                          <User size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 font-medium">Designation</p>
                          <p className="text-sm font-bold text-[#156f3e] leading-snug">
                            {selectedFaculty.details.designation}
                          </p>
                        </div>
                      </div>

                      {/* Qualification */}
                      <div className="flex items-center gap-3 lg:px-3">
                        <div className="w-10 h-10 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                          <FileText size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 font-medium">Qualification</p>
                          <p className="text-sm font-bold text-[#156f3e] leading-snug">
                            {selectedFaculty.details.qualification}
                          </p>
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="flex items-center gap-3 lg:px-3">
                        <div className="w-10 h-10 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                          <Briefcase size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 font-medium">Experience</p>
                          <p className="text-sm font-bold text-[#156f3e] leading-snug">
                            {selectedFaculty.details.experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Card */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                        <Link2 size={17} />
                      </div>
                      <h3 className="text-base font-bold text-[#061d31]">Profile</h3>
                    </div>

                    <div className="bg-[#edf5f0] text-[#061d31] px-4 py-3 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm font-medium border border-emerald-50/60">
                      <span className="font-mono text-xs sm:text-[13px] text-slate-800 break-all">
                        {selectedFaculty.details.profile}
                      </span>
                      {selectedFaculty.details.profile.startsWith("http") && (
                        <a
                          href={selectedFaculty.details.profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-[#156f3e] p-1 rounded transition-colors shrink-0"
                          title="Open profile in new tab"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Achievements Card */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs space-y-3 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#e8f5ed] text-[#156f3e] flex items-center justify-center shrink-0">
                        <Trophy size={17} />
                      </div>
                      <h3 className="text-base font-bold text-[#061d31]">Achievements</h3>
                    </div>

                    <div className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal space-y-2">
                      {selectedFaculty.details.achievements.map((item, aIdx) => (
                        <p key={aIdx}>{item}</p>
                      ))}
                    </div>
                  </div>
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
