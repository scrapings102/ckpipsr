import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  UserCheck, 
  Phone, 
  Mail, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Compass, 
  Sparkles, 
  Lightbulb, 
  TrendingUp, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import {
  useTnpCommitteeContent,
  type PillarTone
} from "../../hooks/useTnpCommitteeContent";

/** A pillar card's icon tile colour; the panel offers these same names. */
const PILLAR_TILE: Record<PillarTone, string> = {
  blue: "bg-blue-50 text-blue-700",
  amber: "bg-amber-50 text-amber-700",
  emerald: "bg-emerald-50 text-[#1a5d2e]",
  purple: "bg-purple-50 text-purple-700",
  rose: "bg-rose-50 text-rose-700",
};

/** The icons a pillar card can carry. */
const PILLAR_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  GraduationCap,
  Lightbulb,
  Briefcase,
  Users,
  Sparkles,
  ShieldCheck,
  Building2,
  CheckCircle2,
};
export default function Committee() {
  const content = useTnpCommitteeContent();
  const { intro, roster, office } = content;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="tnp"
      activeItemLabel="Committee"
    >
      <div className="space-y-10 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <Users size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  {intro.kicker}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  {intro.heading}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                {intro.badge}
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                {intro.countLabel}
              </span>
            </div>
          </div>

          {/* User Provided Exact Introduction Paragraph */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-slate-50 to-white border border-emerald-200/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
              <Sparkles size={14} />
              <span>{intro.objectiveLabel}</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-slate-800 leading-relaxed font-normal">
              {intro.objective}
            </p>
          </div>

          {/* The highlight cards, as many as the panel lists */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            {intro.pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[pillar.icon];
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-emerald-300 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-xl ${PILLAR_TILE[pillar.tone]} flex items-center justify-center`}>
                    {Icon && <Icon size={18} />}
                  </div>
                  <strong className="text-sm font-serif font-bold text-slate-900 block">
                    {pillar.title}
                  </strong>
                  <p className="text-xs text-slate-600 font-sans leading-normal">
                    {pillar.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Committee Members Cards Section Header */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
              {roster.kicker}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              {roster.heading}
            </h3>
          </div>

          {/* Professional Card Design */}
          {content.members.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Users size={30} className="mx-auto text-slate-300" />
              <h4 className="text-base font-serif font-bold text-slate-800">{roster.emptyTitle}</h4>
              <p className="text-xs text-slate-500">{roster.emptyBody}</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {content.members.map((member, index) => {
              const phoneId = `phone-${index}`;
              const emailId = `email-${index}`;

              return (
                <motion.div
                  key={`${member.email}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`group bg-white hover:bg-gradient-to-b hover:from-emerald-50/20 hover:to-white rounded-3xl border ${
                    member.isHead
                      ? "border-[#1a5d2e]/40 shadow-sm ring-1 ring-[#1a5d2e]/20"
                      : "border-slate-200 hover:border-[#1a5d2e]/40 shadow-xs"
                  } p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md`}
                >
                  <div className="space-y-4">
                    {/* Top Role Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full shadow-2xs ${member.badgeColor}`}>
                        {member.role}
                      </span>
                      {member.isHead && (
                        <span className="text-[11px] font-mono text-[#1a5d2e] font-semibold flex items-center gap-1">
                          <ShieldCheck size={13} />
                          <span>{roster.headLabel}</span>
                        </span>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="space-y-1.5 pt-1">
                      <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900 group-hover:text-[#1a5d2e] transition-colors leading-snug">
                        {member.name}
                      </h4>
                      <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                        {member.designation}
                      </div>
                    </div>

                    {/* Contact Channels */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      {/* Phone Number */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                        <a
                          href={member.telHref}
                          className="flex items-center gap-2 text-xs font-mono text-slate-800 hover:text-[#1a5d2e] font-semibold transition-colors"
                        >
                          <div className="w-6 h-6 rounded-md bg-white text-[#1a5d2e] flex items-center justify-center border border-slate-200 shadow-2xs">
                            <Phone size={12} />
                          </div>
                          <span>+91 {member.contactNo}</span>
                        </a>
                        <button
                          onClick={() => handleCopy(member.contactNo, phoneId)}
                          title="Copy Contact Number"
                          className="text-slate-400 hover:text-[#1a5d2e] p-1 rounded-md transition-colors cursor-pointer"
                        >
                          {copiedId === phoneId ? <Check size={14} className="text-[#1a5d2e]" /> : <Copy size={14} />}
                        </button>
                      </div>

                      {/* Email Address */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-xs font-mono text-slate-800 hover:text-[#1a5d2e] font-medium transition-colors truncate"
                        >
                          <div className="w-6 h-6 rounded-md bg-white text-emerald-700 flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
                            <Mail size={12} />
                          </div>
                          <span className="truncate">{member.email}</span>
                        </a>
                        <button
                          onClick={() => handleCopy(member.email, emailId)}
                          title="Copy Email"
                          className="text-slate-400 hover:text-[#1a5d2e] p-1 rounded-md transition-colors shrink-0 cursor-pointer"
                        >
                          {copiedId === emailId ? <Check size={14} className="text-[#1a5d2e]" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1a5d2e] hover:underline"
                    >
                      <span>{roster.emailLabel}</span>
                      <ExternalLink size={12} />
                    </a>
                    <a
                      href={member.telHref}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-[#1a5d2e]"
                    >
                      <span>{roster.callLabel}</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
          )}
        </div>

        {/* Office & Cell Assistance Box */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2 text-sm font-serif font-bold text-slate-900">
            <Building2 size={18} className="text-[#1a5d2e]" />
            <span>{office.heading}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            {office.body}
          </p>
          {office.facts.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600">
              {office.facts.map((fact, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#1a5d2e]" />
                  <span>{fact}</span>
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </SubPageLayout>
  );
}
