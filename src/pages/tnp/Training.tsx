import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Building2,
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  Target,
  BookOpen,
  Cpu,
  Globe2,
  Users,
  TrendingUp,
  Compass,
  Phone,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Check,
  Layers,
  ExternalLink,
  FlaskConical,
  Microscope,
  Network
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useTrainingContent } from "../../hooks/useTrainingContent";

type IconType = React.ComponentType<{ size?: number; className?: string }>;

/** The icons the panel offers, by name. */
const ICONS: Record<string, IconType> = {
  Building2,
  Microscope,
  Award,
  FlaskConical,
  Cpu,
  Network,
  Briefcase,
  Compass,
  GraduationCap,
  Target,
  BookOpen,
  Globe2,
  Users,
  TrendingUp,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2
};

/** A card's colour, as the highlight and objective cards use it. */
const TONES: Record<string, string> = {
  emerald: "bg-emerald-50 text-[#1a5d2e]",
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-purple-50 text-purple-700",
  amber: "bg-amber-50 text-amber-700",
  rose: "bg-rose-50 text-rose-700"
};

/** The badge a member's role is drawn with. Follows the role, never stored. */
const ROLE_BADGES: Record<string, string> = {
  Chairperson: "bg-[#1a5d2e] text-white",
  Coordinator: "bg-emerald-100 text-emerald-900 border border-emerald-300",
  Member: "bg-slate-100 text-slate-800 border border-slate-200"
};

export default function Training() {
  const content = useTrainingContent();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const { overview, objectives, committee, office } = content;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="tnp"
      activeItemLabel="Training"
    >
      <div className="space-y-12 max-w-6xl mx-auto">

        {/* Section 1: Overview & Vision */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <Briefcase size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  {overview.kicker}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  {overview.heading}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {overview.badges.map((badge, index) => (
                <span
                  key={index}
                  className={
                    index === 0
                      ? "text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs"
                      : "text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200"
                  }
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Vision & Institutional Commitment */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-slate-50 to-white border border-emerald-200/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
              <Sparkles size={14} />
              <span>{overview.vision.kicker}</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-slate-800 leading-relaxed font-normal">
              {overview.vision.body}
            </p>
          </div>

          {/* Visual Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {overview.highlights.map((item, index) => {
              const IconComp = ICONS[item.icon] ?? Building2;
              const tone = TONES[item.tone] ?? TONES.emerald;
              return (
                <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                    <IconComp size={16} className={tone.split(" ").pop()} />
                    <span>{item.kicker}</span>
                  </div>
                  <strong className="text-base font-serif font-bold text-slate-900 block">
                    {item.title}
                  </strong>
                  <p className="text-xs text-slate-600 font-sans">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Objectives of Industrial Training with Images */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                {objectives.kicker}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {objectives.heading}
              </h3>
            </div>
            {/* Counted from the objectives themselves. */}
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200 self-start sm:self-auto">
              {objectives.countLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.items.map((obj, idx) => {
              const IconComp = ICONS[obj.icon] ?? Target;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  className="group bg-white hover:bg-gradient-to-b hover:from-emerald-50/30 hover:to-white rounded-3xl border border-slate-200 hover:border-[#1a5d2e]/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Card Image */}
                    <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                      <img
                        src={obj.image}
                        alt={obj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/hero/pharmacy_lab.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                        {obj.tag}
                      </span>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                        <div className="w-7 h-7 rounded-lg bg-[#1a5d2e] text-white flex items-center justify-center shadow-xs">
                          <IconComp size={15} />
                        </div>
                        {/* Numbered by their order in the panel. */}
                        <span className="text-xs font-mono font-bold tracking-wide">
                          Objective {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-[#1a5d2e] transition-colors leading-snug">
                        {obj.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed font-normal">
                        {obj.description}
                      </p>
                    </div>
                  </div>

                  {objectives.footerLabel && (
                    <div className="p-5 pt-0">
                      <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-[#1a5d2e] font-semibold">
                        <CheckCircle2 size={13} />
                        <span>{objectives.footerLabel}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Committee Members Cards with Small Image */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
              {committee.kicker}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              {committee.heading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {committee.members.map((member, index) => {
              const phoneId = `phone-${index}`;
              const emailId = `email-${index}`;
              const badge = ROLE_BADGES[member.role] ?? ROLE_BADGES.Member;
              const email = member.email.trim();

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className={`group bg-white hover:bg-gradient-to-b hover:from-emerald-50/20 hover:to-white rounded-3xl border ${
                    member.role === "Chairperson"
                      ? "border-[#1a5d2e]/40 shadow-sm ring-1 ring-[#1a5d2e]/20"
                      : "border-slate-200 hover:border-[#1a5d2e]/40 shadow-xs"
                  } p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md`}
                >
                  <div className="space-y-4">
                    {/* Top Role Badge & Image */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full shadow-2xs ${badge}`}>
                        {member.role}
                      </span>
                      {member.role === "Chairperson" && committee.chairNote && (
                        <span className="text-[11px] font-mono text-[#1a5d2e] font-semibold flex items-center gap-1">
                          <ShieldCheck size={13} />
                          <span>{committee.chairNote}</span>
                        </span>
                      )}
                    </div>

                    {/* Small Member Image & Profile Information */}
                    <div className="flex items-center gap-3.5 pt-1">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group-hover:border-[#1a5d2e]/40 shrink-0 shadow-2xs">
                        <img
                          src={
                            member.image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              member.name
                            )}&background=1a5d2e&color=ffffff&size=256`
                          }
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              member.name
                            )}&background=1a5d2e&color=ffffff&size=256`;
                          }}
                        />
                      </div>

                      <div className="space-y-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-[#1a5d2e] transition-colors leading-snug truncate">
                          {member.name}
                        </h4>
                        {member.designation && (
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                            {member.designation}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Department */}
                    {member.department && (
                      <div className="text-[11px] font-sans text-slate-500">
                        {member.department}
                      </div>
                    )}

                    {/* Contact Channels */}
                    {(member.phone || email) && (
                      <div className="space-y-2.5 pt-2 border-t border-slate-100">
                        {member.phone && (
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                            <a
                              href={`tel:${member.phone}`}
                              className="flex items-center gap-2 text-xs font-mono text-slate-800 hover:text-[#1a5d2e] font-semibold transition-colors"
                            >
                              <div className="w-6 h-6 rounded-md bg-white text-[#1a5d2e] flex items-center justify-center border border-slate-200 shadow-2xs">
                                <Phone size={12} />
                              </div>
                              <span>+91 {member.phone}</span>
                            </a>
                            <button
                              onClick={() => handleCopy(member.phone, phoneId)}
                              title="Copy Contact Number"
                              className="text-slate-400 hover:text-[#1a5d2e] p-1 rounded-md transition-colors cursor-pointer"
                            >
                              {copiedId === phoneId ? <Check size={14} className="text-[#1a5d2e]" /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {email && (
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                            <a
                              href={`mailto:${email}`}
                              className="flex items-center gap-2 text-xs font-mono text-slate-800 hover:text-[#1a5d2e] font-medium transition-colors truncate"
                            >
                              <div className="w-6 h-6 rounded-md bg-white text-emerald-700 flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
                                <Mail size={12} />
                              </div>
                              <span className="truncate">{email}</span>
                            </a>
                            <button
                              onClick={() => handleCopy(email, emailId)}
                              title="Copy Email"
                              className="text-slate-400 hover:text-[#1a5d2e] p-1 rounded-md transition-colors shrink-0 cursor-pointer"
                            >
                              {copiedId === emailId ? <Check size={14} className="text-[#1a5d2e]" /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1a5d2e] hover:underline"
                      >
                        <span>{committee.emailLabel}</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-[#1a5d2e]"
                      >
                        <span>{committee.callLabel}</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Industrial Training Guidelines Summary Banner */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2 text-sm font-serif font-bold text-slate-900">
            <Building2 size={18} className="text-[#1a5d2e]" />
            <span>{office.heading}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            {office.body}
          </p>
          {office.notes.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600">
              {office.notes.map((note, index) => (
                <span key={index} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#1a5d2e]" />
                  <span>{note}</span>
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </SubPageLayout>
  );
}
