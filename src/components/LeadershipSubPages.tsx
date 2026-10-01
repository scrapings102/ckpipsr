import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Users, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  Quote, 
  Mail, 
  ShieldCheck, 
  Activity, 
  FlaskConical, 
  ChevronRight, 
  Building, 
  BookOpen, 
  MapPin, 
  Calendar,
  Contact,
  X,
  ExternalLink,
  Info,
  GraduationCap,
  FileText,
  ArrowLeft
} from "lucide-react";
import { ContentPage } from "../data/ckpipsrContent";
import {
  DEFAULT_GOVERNING_BODY,
  type GoverningBodyContent,
  type GoverningMember,
} from "../hooks/useGoverningBodyContent";
import { DEFAULT_PRINCIPAL, type PrincipalContent } from "../hooks/usePrincipalContent";
import { DEFAULT_DEANS, type DeansContent } from "../hooks/useDeansContent";
import { withEmphasis } from "../utils/emphasis";

// Define structured content for the Founder Page
const FOUNDER_CONTRIBUTIONS = [
  {
    category: "Higher Education Pioneers",
    desc: "Spearheaded the Navyug Vidyabhavan Trust in 1965 to address the severe shortage of academic facilities in South Gujarat, providing premium state-of-the-art infrastructure for young learners.",
    icon: Building,
  },
  {
    category: "Inclusive Educational Policy",
    desc: "Instilled and defended the core value of access to world-class learning regardless of caste, creed, gender, or religion.",
    icon: ShieldCheck,
  },
  {
    category: "Philanthropic Endowment",
    desc: "Contributed immense personal wealth and marathon organizational efforts to establish multiple specialized degree colleges in Surat.",
    icon: Award,
  },
  {
    category: "Holistic Welfare Support",
    desc: "Supported extensive community outreach initiatives across sports, medical relief camps, cultural preservation, and youth empowerment schemes.",
    icon: Activity,
  },
];

export function FounderLayout() {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Memorial Header Section */}
      <section className="relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group">
              <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-4 border-white shadow-xl relative bg-slate-100">
                <img 
                  src="/images/hero/646efc827452b.webp" 
                  alt="Late Shree Chhotubhai K Pithawalla"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-105 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hero/college_campus.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>
            
            <div className="mt-4 text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#8c6d12] text-[9px] font-bold uppercase tracking-wider border border-[#D4AF37]/20">
                Visionary Founder
              </div>
              <h2 className="text-xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Late Shree Chhotubhai K. Pithawalla
              </h2>
            </div>
          </div>

          {/* Vision Column */}
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-3 relative">
              <Quote size={36} className="text-[#D4AF37]/15 absolute -top-4 -left-4" />
              <p className="text-base sm:text-lg font-serif italic text-slate-800 leading-relaxed relative z-10 font-medium">
                "Our mission is to build a lighthouse of knowledge that illuminates the path for generations to come, 
                bridging the gap between aspiration and achievement."
              </p>
              <div className="h-1 w-14 bg-[#D4AF37] rounded-full" />
            </div>

            <div className="space-y-3">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                Late Shree C. K. Pithawalla was the primary driving force behind the establishment of Navyug Vidyabhavan Trust in 1965. 
                His visionary leadership and missionary zeal were instrumental in transforming the educational landscape of South Gujarat.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                His legacy is defined by a commitment to excellence, social inclusivity, and the belief that education is the most 
                powerful tool for societal transformation. CKPIPSR stands as a proud testament to his benevolence and enduring vision.
              </p>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F3] border border-[#D4AF37]/20 rounded-xl">
                 <Sparkles size={16} className="text-[#D4AF37] animate-pulse" />
                 <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Enduring Legacy since 1965</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contributions Bento Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h4 className="text-xl font-serif font-bold text-slate-900">Foundational Pillars</h4>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">The Core Contributions of Our Founder</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FOUNDER_CONTRIBUTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#123a1a] group-hover:text-[#D4AF37] transition-all shrink-0">
                  <Icon size={18} />
                </div>
                <div className="space-y-2">
                  <h5 className="font-serif font-bold text-slate-900 text-sm leading-snug">
                    {item.category}
                  </h5>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Memorial Note */}
      <div className="bg-[#123a1a] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-3">
           <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">"A Life of Service is a Life of Worth"</h3>
           <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
             We carry forward the torch of knowledge lit by our founder, committed to maintaining the highest 
             standards of integrity and academic rigor that he envisioned.
           </p>
           <div className="h-px w-24 bg-[#D4AF37]/40 mx-auto" />
           <p className="text-[9px] text-[#D4AF37] font-mono tracking-widest font-bold uppercase">Dedicated to Late Shree C. K. Pithawalla</p>
        </div>
      </div>
    </div>
  );
}

// Define structured content for the Trust Page
const TRUST_VALUES = [
  {
    title: "Educational Inclusivity",
    desc: "Strictly dedicated to extending advanced learning access without barriers of caste, community, creed, sex, or economic status.",
    icon: ShieldCheck,
  },
  {
    title: "Exact & Social Sciences",
    desc: "Spearheading multi-disciplinary research wings and industrial applications to solve complex technological challenges.",
    icon: FlaskConical,
  },
  {
    title: "Demand-Supply Equilibrium",
    desc: "Constantly evaluating academic trends to introduce novel specialized and professional pharmacy courses in Surat.",
    icon: Activity,
  },
];

export function TrustLayout() {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Main Narrative Card */}
      <section className="relative group">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-5 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-black uppercase tracking-wider border border-[#123a1a]/10">
                    Legacy of Excellence
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#8c6d12] text-[9px] font-black uppercase tracking-wider border border-[#D4AF37]/20">
                    Est. 1965
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                  The Navyug Vidyabhavan <span className="text-[#123a1a]">Trust</span>
                </h3>
                <div className="h-1 w-16 bg-[#D4AF37] rounded-full" />
              </div>

              <div className="space-y-3">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Founded in February 1965, the <strong>Navyug Vidyabhavan Trust</strong> was established to bridge 
                  the critical gap in higher professional education in South Gujarat. Over six decades, it has evolved 
                  into a cornerstone of academic advancement.
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  As the governing pillar behind CKPIPSR, the Trust ensures a relentless focus on research excellence, 
                  statutory compliance, and the holistic development of pharmaceutical leaders who serve with 
                  integrity and innovation.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-video sm:aspect-square rounded-xl overflow-hidden shadow-lg border-2 border-white">
                <img 
                  src="/images/hero/66e15283951b9.webp" 
                  alt="Trust Legacy" 
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Mandates - Refined Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
           <h4 className="text-xl font-serif font-bold text-slate-900">Foundational Mandates</h4>
           <p className="text-slate-500 max-w-xl mx-auto text-xs">
             Our objectives are etched in our constitution, guiding every academic and administrative decision.
           </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {TRUST_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-[#123a1a] flex items-center justify-center group-hover:bg-[#123a1a] group-hover:text-[#D4AF37] transition-all shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="text-base font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors">
                      {val.title}
                    </h5>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                      {val.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Drawn for a member with no photo, or one whose photo fails to load. */
const avatarFor = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=123a1a&color=D4AF37&size=512`;

function swapToAvatar(e: React.SyntheticEvent<HTMLImageElement>, name: string) {
  const img = e.currentTarget;
  // Once only, so a failing avatar cannot loop.
  img.onerror = null;
  if (img.src !== avatarFor(name)) img.src = avatarFor(name);
}

/**
 * Content comes from the admin panel via GoverningBody.tsx. Called without it —
 * as DynamicSubPage does — it draws the shipped defaults.
 */
export function GoverningBodyLayout({ content = DEFAULT_GOVERNING_BODY }: { content?: GoverningBodyContent }) {
  const [selectedMember, setSelectedMember] = useState<GoverningMember | null>(null);

  useEffect(() => {
    if (!selectedMember) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Intro section - Compact & Refined Banner */}
      <section className="relative group overflow-hidden rounded-2xl sm:rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#123a1a] to-[#1a4a25] transition-all duration-700 group-hover:scale-105" />
        <div className="absolute top-0 right-0 w-[24rem] h-[24rem] bg-[#D4AF37]/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 p-5 sm:p-8 space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.15em]">
              <ShieldCheck size={12} />
              <span>{content.intro.badge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
              {content.intro.headingLead} <span className="text-[#D4AF37]">{content.intro.headingAccent}</span>
            </h3>
            <div className="h-1 w-16 bg-[#D4AF37] rounded-full" />
          </div>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-3xl font-medium">
            {content.intro.body}
          </p>
        </div>
      </section>

      {/* Enhanced Member Grid - Compact & Structured */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {content.members.map((member, mIdx) => (
          <motion.div
            key={`${mIdx}-${member.name}`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: mIdx * 0.03 }}
            className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col justify-between w-full min-w-0"
          >
            <div className="space-y-3.5 min-w-0">
              {/* Image Container */}
              <div className="relative aspect-[4/3.8] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 group-hover:border-[#D4AF37]/50 shadow-inner">
                <img
                  src={member.image || avatarFor(member.name)}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => swapToAvatar(e, member.name)}
                />
              </div>

              {/* Role Badge placed cleanly below image */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#123a1a] text-[#D4AF37] text-[10px] font-black uppercase tracking-wider shadow-sm">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse shrink-0" />
                  <span className="break-words">{member.role}</span>
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 min-w-0">
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors leading-snug break-words">
                    {member.name}
                  </h4>
                  {member.credentials && (
                    <p className="text-[10px] sm:text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider font-mono break-words">
                      {member.credentials}
                    </p>
                  )}
                </div>

                {/* Quote Snippet — skipped when blank rather than printing "" */}
                {member.quote && (
                  <div className="relative p-3 sm:p-3.5 bg-slate-50 rounded-xl border-l-2 border-[#D4AF37] group-hover:bg-[#FAF8F3] transition-all duration-300">
                    <Quote size={16} className="text-[#D4AF37]/20 absolute top-2 right-2 shrink-0" />
                    <p className="text-slate-600 text-xs italic font-serif leading-relaxed break-words relative z-10">
                      "{member.quote}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2 min-w-0">
              <div className="flex items-center gap-1.5 text-slate-500 min-w-0 flex-1">
                <Building size={13} className="text-[#D4AF37] shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider truncate text-slate-500">{member.organisation}</span>
              </div>
              <button 
                onClick={() => setSelectedMember(member)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#123a1a] text-[#D4AF37] font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all hover:bg-[#1a4a25] active:scale-95 shrink-0 cursor-pointer"
              >
                <span>Bio</span>
                <ChevronRight size={11} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Member Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedMember(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 shadow-2xl relative space-y-6" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left pt-2 min-w-0">
              <img
                src={selectedMember.image || avatarFor(selectedMember.name)}
                alt={selectedMember.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-[#D4AF37] object-cover object-top shadow-lg bg-slate-100 shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => swapToAvatar(e, selectedMember.name)}
              />
              <div className="space-y-2 min-w-0 flex-1">
                <span className="inline-block px-3.5 py-1 bg-[#D4AF37]/20 text-[#8c6d12] border border-[#D4AF37]/30 rounded-full font-mono font-bold text-xs uppercase tracking-wider max-w-full truncate">
                  {selectedMember.role}
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 leading-tight break-words">
                  {selectedMember.name}
                </h3>
                {selectedMember.credentials && (
                  <p className="font-mono text-xs sm:text-sm text-slate-600 font-bold break-words">
                    {selectedMember.credentials}
                  </p>
                )}
                <p className="font-mono text-xs text-[#D4AF37] font-bold break-words">
                  {selectedMember.organisation}
                </p>
              </div>
            </div>

            {/* Modal Quote Callout */}
            {selectedMember.quote && (
              <div className="p-4 bg-amber-50 rounded-2xl border-l-4 border-[#D4AF37] italic font-serif text-slate-800 text-sm sm:text-base leading-relaxed break-words">
                "{selectedMember.quote}"
              </div>
            )}

            {/* Modal Bio Body */}
            {selectedMember.bio && (
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <h4 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Info size={18} className="text-[#D4AF37] shrink-0" />
                  <span>Executive Bio & Leadership Profile</span>
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify font-sans font-medium">
                  {selectedMember.bio}
                </p>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedMember(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-[#D4AF37] text-white hover:text-slate-950 font-mono text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close Bio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * The icons an editor can choose for the fact cards — the other half of
 * PRINCIPAL_ICONS in the API's schema. User is the fallback, because a missing
 * icon should be a wrong picture rather than a crash.
 */
const PRINCIPAL_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  User,
  GraduationCap,
  Mail,
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  FlaskConical,
  Building,
  Calendar,
  MapPin,
  FileText,
};

/** The icon tints the four cards shipped with, repeated by position. */
const CREDENTIAL_TINTS = ["text-blue-600", "text-emerald-600", "text-red-600", "text-amber-600"];

/**
 * Content comes from the admin panel via Principal.tsx. Called without it — as
 * DynamicSubPage does — it draws the shipped defaults. `page` is accepted for
 * that caller and not used.
 *
 * The layout is the profile card and message column the site adopted in
 * September 2026: credentials become the rows of the card's white panel, and
 * one whose value is an email address links to it.
 */
export function PrincipalLayout({
  content = DEFAULT_PRINCIPAL,
}: {
  page?: ContentPage;
  content?: PrincipalContent;
}) {
  const { portrait, message, signature } = content;

  return (
    <div className="w-full animate-fadeIn">
      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Profile Card Column */}
        <div className="lg:col-span-5 xl:col-span-4 bg-[#FAF7F0] border border-[#EAE3D2] rounded-3xl p-6 sm:p-8 shadow-2xs">
          {/* Circular Portrait Image with Double Ring Gold Border */}
          <div
            id="principal-portrait-container"
            className="w-52 h-52 sm:w-60 sm:h-60 mx-auto rounded-full overflow-hidden border-4 border-[#D4AF37] ring-8 ring-[#FAF7F0] shadow-md relative bg-slate-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl cursor-pointer group"
          >
            <img
              src={portrait.image || avatarFor(portrait.name)}
              alt={portrait.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
              referrerPolicy="no-referrer"
              onError={(e) => swapToAvatar(e, portrait.name)}
            />
          </div>

          {/* Name & Credentials */}
          <div className="text-center mt-6 mb-6 space-y-1">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#112815] tracking-tight">
              {portrait.name}
            </h3>
            {portrait.badge && (
              <p className="text-[#C49A2C] font-mono font-bold text-xs uppercase tracking-widest pt-0.5">
                {portrait.badge}
              </p>
            )}
            {portrait.qualifications && (
              <p className="text-slate-500 font-sans text-xs pt-0.5">{portrait.qualifications}</p>
            )}
          </div>

          {/* White Info Card at Bottom */}
          {content.credentials.length > 0 && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE3D2] space-y-3.5 shadow-2xs">
              {content.credentials.map((item, idx) => {
                const Icon = PRINCIPAL_ICONS[item.icon] ?? User;
                const isEmail = /^[^\s@]+@[^\s@]+$/.test(item.value);
                return (
                  <div key={idx} className="flex items-center gap-3 text-slate-700 text-xs font-medium min-w-0" title={item.label}>
                    <span className="text-[#C49A2C] shrink-0">
                      <Icon size={16} />
                    </span>
                    {isEmail ? (
                      <a href={`mailto:${item.value}`} className="truncate hover:text-[#112815] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Message Column */}
        <div className="lg:col-span-7 xl:col-span-8 bg-[#FAF7F0] border border-[#EAE3D2] rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
          {/* Watermark Quote Icon in Top Right */}
          <div className="absolute top-4 right-6 sm:top-6 sm:right-8 select-none pointer-events-none text-right">
            <span className="text-7xl sm:text-8xl font-serif font-bold text-[#D4AF37]/20 leading-none inline-block">
              &ldquo;
            </span>
          </div>

          {/* Professional Heading */}
          <div className="relative z-10 mb-6 pr-12">
            {message.eyebrow && (
              <p className="text-[#C49A2C] font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider mb-2">
                {message.eyebrow}
              </p>
            )}
            <h2
              id="principal-message-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-[#112815] tracking-tight leading-snug"
            >
              {message.title}
            </h2>
            <div className="h-0.5 w-16 bg-[#D4AF37] mt-3.5" />
          </div>

          {/* The message itself */}
          <div className="space-y-4 text-slate-700 text-xs sm:text-sm md:text-[15px] font-sans leading-relaxed relative z-10">
            {message.body.map((paragraph, idx) => (
              <p key={idx}>{withEmphasis(paragraph, "font-bold text-slate-800")}</p>
            ))}
          </div>

          {/* Signature Block at Bottom Right */}
          <div className="text-right pt-8 mt-6 border-t border-[#EAE3D2]/70 relative z-10">
            <h4 className="text-lg sm:text-xl font-serif font-bold text-[#112815]">{signature.name}</h4>
            {signature.role && (
              <p className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase mt-0.5">
                {signature.role}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * Content comes from the admin panel via DeansAndFaculty.tsx. Called without
 * it — as DynamicSubPage does — it draws the shipped defaults.
 *
 * The layout is the site's September 2026 design: the green Academic Council
 * banner and a grid of cards. It has no filter tabs, search or bio window, so
 * the panel's stored tabs and bios are simply not drawn.
 */
export function DeansLayout({ content = DEFAULT_DEANS }: { content?: DeansContent }) {
  const pdfUrl = "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/66e2bf456dbbc.pdf";
  // "Deans & Portfolio In-charges": the last word is set in gold.
  const titleSplit = content.intro.title.lastIndexOf(" ");
  const titleLead = titleSplit > 0 ? content.intro.title.slice(0, titleSplit + 1) : content.intro.title;
  const titleAccent = titleSplit > 0 ? content.intro.title.slice(titleSplit + 1) : "";

  return (
    <div className="space-y-10 animate-fadeIn max-w-4xl mx-auto">
      {/* Intro section - Premium Banner */}
      <section className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-md">
        <div className="absolute inset-0 bg-[#123a1a] transition-transform duration-1000" />
        <div className="absolute top-0 right-0 w-[24rem] h-[24rem] bg-[#D4AF37]/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 space-y-4 text-center sm:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.15em]">
              <Users size={12} />
              <span>{content.intro.badge || "Academic Council"}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              {titleLead}
              {titleAccent && <span className="text-[#D4AF37]">{titleAccent}</span>}
            </h3>
            <div className="h-1 w-16 bg-[#D4AF37] rounded-full mx-auto sm:mx-0" />
          </div>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium font-sans">
            {content.intro.body || "Academic Council & Portfolio In-charges committee for the current academic session."}
          </p>
        </div>
      </section>

      {/* PDF View / Download Section */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg text-center space-y-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#123a1a]/5 border border-[#123a1a]/15 flex items-center justify-center text-[#123a1a] mx-auto">
          <FileText size={36} className="text-[#123a1a]" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Deans & Faculty In-Charges Document
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            Click the button below to view or download the official committee document for Deans and Faculty In-charges.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#123a1a] hover:bg-[#1a5d2e] text-[#D4AF37] hover:text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer group"
          >
            <FileText size={18} className="group-hover:scale-110 transition-transform" />
            <span>View Deans & Faculty PDF</span>
            <ExternalLink size={14} className="stroke-[2.2]" />
          </a>
        </div>
      </div>
    </div>
  );
}
