import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Rocket,
  Lightbulb,
  Target,
  CheckCircle2,
  Compass,
  Users,
  FileText,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Award,
  TrendingUp,
  Building2,
  Briefcase,
  GraduationCap,
  Layers,
  Cpu,
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useSsipAbout, type SsipCommittee } from "../../hooks/useSsipAbout";
import { withEmphasis } from "../../utils/emphasis";

type TabType = "about" | "core-committee" | "scrutiny-committee" | "contact";
type IconType = React.ComponentType<{ size?: number; className?: string }>;

/** The icons the panel offers an objective, by name. */
const OBJECTIVE_ICONS: Record<string, IconType> = {
  Lightbulb,
  Compass,
  TrendingUp,
  Award,
  Rocket,
  Target,
  Sparkles,
  Cpu,
  Layers,
  GraduationCap,
  Users,
  ShieldCheck,
};

/** How each committee tab dresses its heading and its plain members. */
const COMMITTEE_LOOKS = {
  core: {
    icon: Users,
    tile: "bg-emerald-50 text-[#1a5d2e]",
    kicker: "text-[#1a5d2e]",
    badge: "bg-emerald-50 text-[#1a5d2e] border-emerald-200",
    plainCard: "bg-slate-50/60 hover:bg-white border-slate-200 hover:border-[#1a5d2e]/40 hover:shadow-md",
    plainRole: "bg-slate-100 text-slate-700 border-slate-200",
    briefcase: "text-[#1a5d2e]",
  },
  scrutiny: {
    icon: ShieldCheck,
    tile: "bg-amber-50 text-amber-800",
    kicker: "text-amber-800",
    badge: "bg-amber-50 text-amber-900 border-amber-200",
    plainCard: "bg-slate-50/60 hover:bg-white border-slate-200 hover:border-amber-500/40 hover:shadow-md",
    plainRole: "bg-amber-50 text-amber-900 border-amber-200",
    briefcase: "text-amber-700",
  },
} as const;

function CommitteeTab({ committee, look }: { committee: SsipCommittee; look: (typeof COMMITTEE_LOOKS)[keyof typeof COMMITTEE_LOOKS] }) {
  const HeadingIcon = look.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${look.tile}`}>
              <HeadingIcon size={26} />
            </div>
            <div>
              {committee.kicker && (
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${look.kicker}`}>
                  {committee.kicker}
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                {committee.heading}
              </h3>
            </div>
          </div>

          {committee.countSuffix && (
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border self-start sm:self-center ${look.badge}`}>
              {committee.members.length} {committee.countSuffix}
            </span>
          )}
        </div>

        {committee.body && (
          <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">{committee.body}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {committee.members.map((member, idx) => {
            const isChair = member.emphasis === "chair";
            const isAccent = member.emphasis === "accent";

            return (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 relative ${
                  isChair
                    ? "bg-gradient-to-br from-emerald-50/60 to-white border-emerald-300/80 shadow-xs hover:shadow-md hover:border-[#1a5d2e]"
                    : isAccent
                    ? "bg-gradient-to-br from-blue-50/40 to-white border-blue-200/80 shadow-xs hover:shadow-md hover:border-blue-500"
                    : look.plainCard
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                        isChair
                          ? "bg-[#1a5d2e] text-white border-[#1a5d2e]"
                          : isAccent
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : look.plainRole
                      }`}
                    >
                      {member.role}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">#{idx + 1}</span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">{member.name}</h4>
                    {member.designation && (
                      <div className="flex items-start gap-1.5 text-xs font-sans font-medium text-slate-600">
                        <Briefcase size={13} className={`shrink-0 mt-0.5 ${look.briefcase}`} />
                        <span className="leading-snug">{member.designation}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-sans text-slate-500">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Responsibility</span>
                  <span className="font-mono font-medium text-slate-600">{member.responsibility || "-"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSSIP() {
  const content = useSsipAbout();
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const { about, contact } = content;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="research-and-innovation"
      activeItemLabel="SSIP - About"
    >
      <div className="space-y-8 max-w-6xl mx-auto">

        {/* Tab Navigation Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar bg-slate-50/80 p-1.5 gap-1.5 sm:gap-2">
            {[
              { id: "about", label: content.tabs.about, icon: FileText },
              { id: "core-committee", label: content.tabs.core, icon: Users },
              { id: "scrutiny-committee", label: content.tabs.scrutiny, icon: ShieldCheck },
              { id: "contact", label: content.tabs.contact, icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold transition-all whitespace-nowrap cursor-pointer relative ${
                    isActive
                      ? "text-[#1a5d2e] bg-white shadow-xs border border-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-[#1a5d2e]" : "text-slate-400"} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeSSIPTabIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1a5d2e] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: About SSIP */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >

            {/* Top Overview Narrative Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
              <div className="space-y-4">
                {about.kicker && (
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    <Sparkles size={14} />
                    <span>{about.kicker}</span>
                  </div>
                )}
                <p className="text-slate-700 text-sm sm:text-base font-sans leading-relaxed">
                  {withEmphasis(about.body, "")}
                </p>
              </div>
            </div>

            {/* Two Column Grid: Theme & Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Left (green) card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <Rocket size={24} />
                  </div>
                  <div>
                    {about.theme.kicker && (
                      <span className="text-[11px] font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                        {about.theme.kicker}
                      </span>
                    )}
                    <h3 className="text-xl font-serif font-bold text-slate-900 mt-0.5">{about.theme.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-medium">
                    {about.theme.body}
                  </p>
                </div>

                {about.theme.footer && (
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-emerald-800">
                    <CheckCircle2 size={15} className="text-[#1a5d2e]" />
                    <span>{about.theme.footer}</span>
                  </div>
                )}
              </div>

              {/* Right (blue) card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-blue-500/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Target size={24} />
                  </div>
                  <div>
                    {about.focus.kicker && (
                      <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                        {about.focus.kicker}
                      </span>
                    )}
                    <h3 className="text-xl font-serif font-bold text-slate-900 mt-0.5">{about.focus.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-medium">
                    {about.focus.body}
                  </p>
                </div>

                {about.focus.footer && (
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-blue-800">
                    <Building2 size={15} className="text-blue-700" />
                    <span>{about.focus.footer}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Objectives Section */}
            {about.objectives.items.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                      <Compass size={22} />
                    </div>
                    <div>
                      {about.objectives.kicker && (
                        <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                          {about.objectives.kicker}
                        </span>
                      )}
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                        {about.objectives.heading}
                      </h3>
                    </div>
                  </div>

                  {about.objectives.countSuffix && (
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 self-start sm:self-center">
                      {about.objectives.items.length} {about.objectives.countSuffix}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {about.objectives.items.map((obj, idx) => {
                    const Icon = OBJECTIVE_ICONS[obj.icon] ?? Lightbulb;
                    return (
                      <div
                        key={idx}
                        className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50/70 to-white hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-100 text-slate-700">
                              <Icon size={13} className="text-[#1a5d2e]" />
                              {obj.tag && <span>{obj.tag}</span>}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-400">
                              #{String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">{obj.title}</h4>

                          <p className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">{obj.text}</p>
                        </div>

                        {about.objectives.footer && (
                          <div className="pt-2 flex items-center gap-1.5 text-xs font-sans text-[#1a5d2e] font-semibold">
                            <CheckCircle2 size={14} />
                            <span>{about.objectives.footer}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* SSIP Support Lifecycle Card */}
            {about.workflow.heading && (
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-5">
                  <div>
                    {about.workflow.kicker && (
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                        {about.workflow.kicker}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                      {about.workflow.heading}
                    </h3>
                  </div>
                  {about.workflow.badge && (
                    <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-emerald-300">
                      {about.workflow.badge}
                    </div>
                  )}
                </div>

                {about.workflow.steps.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {about.workflow.steps.map((st, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <span className="text-xs font-mono font-bold text-amber-400 block">
                          {String(idx + 1).padStart(2, "0")}. STEP
                        </span>
                        <h5 className="font-serif font-bold text-white text-base">{st.title}</h5>
                        {st.text && <p className="text-xs font-sans text-slate-300 leading-relaxed">{st.text}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </motion.div>
        )}

        {/* Tab 2: Core Committee */}
        {activeTab === "core-committee" && <CommitteeTab committee={content.core} look={COMMITTEE_LOOKS.core} />}

        {/* Tab 3: Scrutiny Committee */}
        {activeTab === "scrutiny-committee" && (
          <CommitteeTab committee={content.scrutiny} look={COMMITTEE_LOOKS.scrutiny} />
        )}

        {/* Tab 4: Contact Us */}
        {activeTab === "contact" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <Mail size={26} />
                  </div>
                  <div>
                    {contact.kicker && (
                      <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                        {contact.kicker}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      {contact.heading}
                    </h3>
                  </div>
                </div>

                {contact.badge && (
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200 self-start sm:self-center">
                    {contact.badge}
                  </span>
                )}
              </div>

              {contact.body && (
                <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">{contact.body}</p>
              )}

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {contact.people.map((person, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50/70 to-white hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 space-y-5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        {person.badge ? (
                          <span className="text-xs font-mono font-bold text-[#1a5d2e] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100 uppercase tracking-wider">
                            {person.badge}
                          </span>
                        ) : (
                          <span />
                        )}
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                          {person.name}
                        </h4>
                        {person.designation && (
                          <p className="text-xs sm:text-sm font-sans font-semibold text-[#1a5d2e] mt-0.5">
                            {person.designation}
                          </p>
                        )}
                      </div>

                      {person.institution && (
                        <div className="flex items-start gap-2 text-xs font-sans text-slate-600 pt-1">
                          <Building2 size={15} className="text-slate-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{person.institution}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-200/80 space-y-2.5">
                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-100/70 border border-slate-200/60">
                        <div className="flex items-center gap-2 text-xs font-sans text-slate-700">
                          <Phone size={14} className="text-[#1a5d2e]" />
                          <span className="font-medium">Office Number:</span>
                        </div>
                        <a
                          href={`tel:${person.officeNumber.replace(/[^\d+]/g, "")}`}
                          className="font-mono text-xs font-bold text-slate-900 hover:text-[#1a5d2e] hover:underline"
                        >
                          {person.officeNumber}
                        </a>
                      </div>

                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                        <div className="flex items-center gap-2 text-xs font-sans text-emerald-900">
                          <Phone size={14} className="text-[#1a5d2e]" />
                          <span className="font-medium">Mobile No.:</span>
                        </div>
                        <a
                          href={`tel:${person.mobileNo.replace(/[^\d+]/g, "")}`}
                          className="font-mono text-xs font-bold text-[#1a5d2e] hover:text-[#144723] hover:underline"
                        >
                          +91 {person.mobileNo}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Campus Address Footnote */}
              {contact.address && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start sm:items-center gap-3 text-xs font-sans text-slate-600">
                  <MapPin size={16} className="text-[#1a5d2e] shrink-0 mt-0.5 sm:mt-0" />
                  <span>
                    {contact.addressLabel && <strong>{contact.addressLabel}</strong>} {contact.address}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Institutional Affiliation & Policy Footer Note */}
        {(content.note.text || content.note.tagline) && (
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-sans text-slate-600">
            {content.note.text && (
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-[#1a5d2e] shrink-0" />
                <span>{content.note.text}</span>
              </div>
            )}
            {content.note.tagline && <span className="font-mono text-slate-400">{content.note.tagline}</span>}
          </div>
        )}

      </div>
    </SubPageLayout>
  );
}
