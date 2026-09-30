import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lightbulb, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Building2, 
  Award, 
  Briefcase, 
  Network, 
  Rocket, 
  Share2, 
  Layers, 
  ShieldCheck, 
  GraduationCap, 
  FileText, 
  Compass, 
  ChevronRight,
  Globe2,
  Cpu,
  BookOpen
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useIicContent } from "../../hooks/useIicContent";

type TabType = "about" | "structure";

export default function IIC() {
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const content = useIicContent();
  const { objectives, roles } = content.about;
  const { structure } = content;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="research-and-innovation"
      activeItemLabel="IIC"
    >
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Sub-Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar bg-slate-50/80 p-1.5 gap-1.5 sm:gap-2">
            {[
              { id: "about", label: content.tabs.about, icon: FileText },
              { id: "structure", label: content.tabs.structure, icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold transition-all whitespace-nowrap cursor-pointer relative ${
                    isActive 
                      ? "text-[#1a5d2e] bg-white shadow-xs border border-slate-200" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-[#1a5d2e]" : "text-slate-400"} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeIICTabIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1a5d2e] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: About (Exact Content from Provided Snapshot) */}
        <AnimatePresence mode="wait">
          {activeTab === "about" && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Objectives */}
                <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-slate-50 to-white border border-emerald-200/80 shadow-xs space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#1a5d2e] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Target size={20} />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                          {objectives.kicker}
                        </span>
                        <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight">
                          {objectives.heading}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      {objectives.items.map((obj, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-emerald-100/90 shadow-2xs"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                            ✓
                          </div>
                          <p className="text-xs sm:text-sm font-sans font-medium text-slate-700 leading-relaxed">
                            {obj}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-emerald-100/80 text-[11px] font-sans text-slate-500 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#1a5d2e]" />
                      <span>{objectives.footer}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Roles & Responsibilities */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-900 border border-amber-200 flex items-center justify-center shrink-0">
                      <Lightbulb size={20} className="text-amber-700" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-amber-900 uppercase tracking-wider block">
                        {roles.kicker}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-tight">
                        {roles.heading}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {roles.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-4.5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-[#1a5d2e]/30 hover:shadow-xs transition-all duration-200 flex items-start gap-3.5"
                      >
                        <span className="font-mono text-xs font-bold text-[#1a5d2e] bg-emerald-50 border border-emerald-200/70 w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed font-normal">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Tab 2: Organizational Structure */}
          {activeTab === "structure" && (
            <motion.div
              key="structure-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {structure.kicker}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      {structure.heading}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                  {structure.instituteId && (
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                      {structure.instituteId}
                    </span>
                  )}
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                    {structure.countLabel}
                  </span>
                </div>
              </div>

              {/* Members Grid Cards (Image not required) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {structure.members.map((member) => {
                  const isPresident = member.role.toLowerCase() === "president";
                  const isVicePresident = member.role.toLowerCase().includes("vice");
                  const isConvener = member.role.toLowerCase().includes("convener");

                  return (
                    <div
                      key={member.no}
                      className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                        isPresident
                          ? "bg-gradient-to-br from-emerald-50/70 to-white border-emerald-300/80 shadow-xs hover:shadow-md"
                          : isVicePresident || isConvener
                          ? "bg-gradient-to-br from-blue-50/40 to-white border-blue-200/80 shadow-xs hover:shadow-md"
                          : member.external
                          ? "bg-gradient-to-br from-amber-50/40 to-white border-amber-200/80 shadow-xs hover:shadow-md"
                          : "bg-slate-50/60 hover:bg-white border-slate-200 hover:border-[#1a5d2e]/40 hover:shadow-md"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                              isPresident
                                ? "bg-[#1a5d2e] text-white border-[#1a5d2e]"
                                : isVicePresident || isConvener
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : member.external
                                ? "bg-amber-100 text-amber-900 border-amber-200"
                                : "bg-slate-200/80 text-slate-700 border-slate-300"
                            }`}
                          >
                            {member.role}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400">
                            #{member.no}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-snug">
                            {member.name}
                          </h4>
                          <div className="flex items-start gap-1.5 text-xs font-sans font-medium text-slate-600">
                            <Briefcase size={13} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{member.designation}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 space-y-1 text-xs font-sans">
                        <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                          Responsibility
                        </span>
                        <p className="text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                          {member.responsibility}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </SubPageLayout>
  );
}
