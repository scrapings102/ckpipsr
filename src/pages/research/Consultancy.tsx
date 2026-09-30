import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
  User,
  Calendar,
  Building2,
  IndianRupee,
  MapPin,
  CheckCircle2,
  FileText,
  BadgeCheck,
  Landmark,
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useResearchConsultancy, type ConsultancyTone } from "../../hooks/useResearchConsultancy";

/** The status pill colours a status can choose from. */
const PILL_CLASSES: Record<ConsultancyTone, string> = {
  emerald: "bg-emerald-50 text-[#1a5d2e] border border-emerald-200",
  purple: "bg-purple-50 text-purple-800 border border-purple-200",
  blue: "bg-blue-50 text-blue-800 border border-blue-200",
  amber: "bg-amber-50 text-amber-800 border border-amber-200",
};

const DOT_CLASSES: Record<ConsultancyTone, string> = {
  emerald: "bg-emerald-600",
  purple: "bg-purple-600",
  blue: "bg-blue-600",
  amber: "bg-amber-500",
};

/** The four figure boxes, left to right. */
const STAT_BOXES = [
  { box: "bg-emerald-50/60 border-emerald-100", label: "text-emerald-800", value: "text-[#1a5d2e]", caption: "text-emerald-700" },
  { box: "bg-blue-50/60 border-blue-100", label: "text-blue-800", value: "text-blue-950", caption: "text-blue-700" },
  { box: "bg-amber-50/60 border-amber-100", label: "text-amber-800", value: "text-amber-950", caption: "text-amber-800" },
  { box: "bg-purple-50/60 border-purple-100", label: "text-purple-800", value: "text-purple-950", caption: "text-purple-700" },
];

/** A figure — a count or a sum — is set large; a name reads better small. */
const isFigure = (value: string) => /^[₹\d]/.test(value.trim());

export default function Consultancy() {
  const content = useResearchConsultancy();
  // "" is the button that clears the filter; the rest are status ids.
  const [statusFilter, setStatusFilter] = useState("");

  const filteredProjects = statusFilter
    ? content.projects.filter((item) => item.filterId === statusFilter)
    : content.projects;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="research-and-innovation"
      activeItemLabel="Research - Consultancy"
    >
      <div className="space-y-8 max-w-5xl mx-auto">

        {/* Header Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <Briefcase size={24} />
              </div>
              <div>
                {content.intro.kicker && (
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    {content.intro.kicker}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                  {content.intro.heading}
                </h3>
              </div>
            </div>

            {content.intro.badge && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-bold">
                  <BadgeCheck size={14} />
                  <span>{content.intro.badge}</span>
                </span>
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          {content.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {content.stats.map((stat, i) => {
                const look = STAT_BOXES[i % STAT_BOXES.length];
                return (
                  <div key={i} className={`p-3.5 rounded-2xl border ${look.box}`}>
                    <span className={`text-[11px] font-mono uppercase font-bold block ${look.label}`}>
                      {stat.label}
                    </span>
                    {isFigure(stat.value) ? (
                      <p className={`text-xl sm:text-2xl font-serif font-bold mt-0.5 ${look.value}`}>{stat.value}</p>
                    ) : (
                      <p className={`text-sm font-serif font-bold mt-1 truncate ${look.value}`}>{stat.value}</p>
                    )}
                    {stat.caption && (
                      <span className={`text-[11px] font-sans ${look.caption}`}>{stat.caption}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Filter Pills — the panel decides which statuses these are. */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {content.intro.filterLabel && (
              <span className="text-xs font-mono font-semibold text-slate-400 mr-2">
                {content.intro.filterLabel}
              </span>
            )}
            <button
              onClick={() => setStatusFilter("")}
              className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                statusFilter === ""
                  ? "bg-[#1a5d2e] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {content.intro.allLabel} ({content.total})
            </button>
            {content.filters.map((item) => (
              <button
                key={item.id}
                onClick={() => setStatusFilter(item.id)}
                className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === item.id
                    ? "bg-[#1a5d2e] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Consultancy Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => {
            const status = content.filters.find((f) => f.id === project.filterId);
            const tone = status?.tone ?? "emerald";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#1a5d2e]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-7 space-y-6 group"
              >
                <div className="space-y-5">
                  {/* Top Status & S.No */}
                  <div className="flex items-center justify-between gap-2">
                    {status ? (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${PILL_CLASSES[tone]}`}
                      >
                        {status.marker === "pulse" ? (
                          <span className={`w-2 h-2 rounded-full animate-pulse ${DOT_CLASSES[tone]}`} />
                        ) : (
                          <CheckCircle2 size={13} />
                        )}
                        <span>{status.badge}</span>
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                      #{content.projects.indexOf(project) + 1}
                    </span>
                  </div>

                  {/* Principal Investigator */}
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200/60 font-bold">
                      <User size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                        Name of Principal Investigator
                      </span>
                      <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#1a5d2e] transition-colors">
                        {project.investigator}
                      </h4>
                      {project.designation && (
                        <p className="text-[11px] font-sans text-slate-500 mt-0.5">
                          {project.designation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Research Project Title */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#1a5d2e] flex items-center gap-1 tracking-wider">
                      <FileText size={11} />
                      <span>Title of Research Project</span>
                    </span>
                    <h5 className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                      {project.title}
                    </h5>
                  </div>

                  {/* Project Details Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs font-sans">

                    {/* Grant Date */}
                    <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-0.5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <Calendar size={11} />
                        <span>Grant Date</span>
                      </span>
                      <span className="font-semibold text-slate-900 font-mono text-xs block">
                        {project.grantDate}
                      </span>
                      <span className="text-[10px] font-sans text-slate-500">
                        Started: {project.startedYear}
                      </span>
                    </div>

                    {/* Sanctioned Cost / Outlay */}
                    <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/80 space-y-0.5">
                      <span className="text-[10px] font-mono uppercase text-emerald-800 flex items-center gap-1 font-bold">
                        <IndianRupee size={11} />
                        <span>Sanctioned Cost</span>
                      </span>
                      <span className="font-bold text-[#1a5d2e] font-mono text-sm block">
                        ₹ {project.cost}
                      </span>
                      <span className="text-[10px] font-sans text-emerald-700">
                        Total Project Layout
                      </span>
                    </div>

                    {/* Funding Agency */}
                    <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-0.5 col-span-2 sm:col-span-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <Building2 size={11} />
                        <span>Funding Agency</span>
                      </span>
                      <span className="font-bold text-slate-900 text-xs block">
                        {project.agency}
                      </span>
                      {project.agencyType && (
                        <span className="text-[10px] font-mono text-emerald-700 font-semibold uppercase">
                          Type: {project.agencyType}
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    {project.agencyLocation && (
                      <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-0.5 col-span-2 sm:col-span-1">
                        <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                          <MapPin size={11} />
                          <span>Agency Location</span>
                        </span>
                        <span className="font-semibold text-slate-900 text-xs block">
                          {project.agencyLocation}
                        </span>
                        <span className="text-[10px] font-sans text-slate-500">
                          State & Country
                        </span>
                      </div>
                    )}

                  </div>
                </div>

                {/* Card Footer: Agency Verification */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-sans text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                    {project.scheme && (
                      <>
                        <Landmark size={13} className="text-[#1a5d2e]" />
                        <span>{project.scheme}</span>
                      </>
                    )}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-700">
                    {project.startedYear} Cycle
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Institutional Note */}
        {(content.note.text || content.note.tagline) && (
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-sans text-slate-600">
            {content.note.text && (
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#1a5d2e] shrink-0" />
                <span>{content.note.text}</span>
              </div>
            )}
            {content.note.tagline && (
              <span className="font-mono text-slate-400">{content.note.tagline}</span>
            )}
          </div>
        )}

      </div>
    </SubPageLayout>
  );
}
