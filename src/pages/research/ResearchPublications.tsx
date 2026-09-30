import React from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  ExternalLink, 
  Download, 
  BookOpen, 
  Sparkles, 
  ArrowUpRight, 
  Calendar,
  CheckCircle2,
  FileCheck
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useResearchPublications } from "../../hooks/useResearchPublications";

export default function ResearchPublications() {
  const content = useResearchPublications();
  const publicationDocs = content.publications;

  const handleOpenPdf = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="research-and-innovation"
      activeItemLabel="Research - Publications"
    >
      <div className="space-y-8 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <BookOpen size={24} />
              </div>
              <div>
                {content.intro.kicker && (
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    {content.intro.kicker}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  {content.intro.heading}
                </h3>
              </div>
            </div>

            {content.intro.badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium">
                <FileCheck size={14} className="text-[#1a5d2e]" />
                <span>{content.intro.badge}</span>
              </div>
            )}
          </div>

          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mt-4">
            {content.intro.body}
          </p>
        </motion.div>

        {/* The report cards: whichever the panel says to show. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publicationDocs.map((doc, index) => {
            const isEmerald = doc.colorTheme === "emerald";
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#1a5d2e]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group p-6 sm:p-7 space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-bold">
                      <Calendar size={13} />
                      <span>{doc.academicYear}</span>
                    </span>

                    {doc.tag && (
                      <span
                        className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                          isEmerald
                            ? "bg-emerald-100 text-[#1a5d2e]"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {doc.tag}
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                      <FileText size={24} />
                    </div>
                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#1a5d2e] transition-colors leading-snug">
                      {doc.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                {/* Primary Button Trigger */}
                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenPdf(doc.pdfUrl);
                    }}
                    className="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-[#1a5d2e] hover:bg-[#124220] text-white font-sans text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group/btn"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={18} className="text-emerald-200" />
                      <span>{doc.title}</span>
                    </span>
                    <span className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Help & Note */}
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
