import React from "react";
import { motion } from "motion/react";
import SubPageLayout from "../../components/SubPageLayout";
import { CheckCircle2, Target, ShieldCheck } from "lucide-react";
import { usePoPeosContent } from "../../hooks/usePoPeosContent";

/**
 * The objectives and outcomes are edited in the admin panel under
 * About Us → Who We Are → PO and PEOs. `usePoPeosContent` falls back to the
 * values this file used to hold if the API is unreachable.
 *
 * Both lists are numbered from position — "PEO 1" here, "PO1" from the stored
 * `num`, which the API derives the same way — so reordering never leaves the
 * labels disagreeing with the order.
 */
export default function POAndPEOs() {
  const content = usePoPeosContent();

  const pageTitle =
    !content.pageTitle || content.pageTitle === "PO And PEO's" || content.pageTitle === "PO and PEOs"
      ? "Program Educational Objectives & Outcomes (PO & PEOs)"
      : content.pageTitle;

  return (
    <SubPageLayout
      title={pageTitle}
      subtitle={content.pageSubtitle}
      category="about-us"
      activeItemLabel="PO and PEOs"
    >
      <div className="space-y-24">
        {/* PEOs Section - Refined Bento Grid */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[10px] font-black uppercase tracking-widest border border-[#123a1a]/10">
              {content.peos.eyebrow}
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              {content.peos.headingLead} <span className="text-[#123a1a]">{content.peos.headingAccent}</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-lg font-medium">
              {content.peos.intro}
            </p>
            <div className="h-1.5 w-24 bg-[#D4AF37] rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {content.peos.items.map((peo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-[#FAF8F3] p-6 sm:p-8 lg:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-[#D4AF37]/20 shadow-sm hover:shadow-2xl hover:bg-[#123a1a] transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                <div className="space-y-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#D4AF37]/30 flex items-center justify-center text-[#123a1a] group-hover:bg-[#D4AF37] group-hover:rotate-6 transition-all duration-500 shadow-sm">
                    <Target size={24} />
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">PEO {idx + 1}</div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-white transition-colors">
                      {peo.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                      {peo.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#D4AF37]/10 relative z-10">
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">
                    {content.peos.footnote}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* POs Section - Refined List with Icons */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                {content.pos.eyebrow}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                {content.pos.headingLead} <span className="text-[#123a1a]">{content.pos.headingAccent}</span>
              </h2>
              <p className="text-slate-500 font-medium italic text-xs sm:text-sm">{content.pos.note}</p>
            </div>
            <div className="text-right hidden md:block">
              <span className="text-5xl lg:text-6xl font-black text-slate-100 uppercase tracking-tighter">
                {content.pos.watermark}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {content.pos.items.map((po, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white p-6 sm:p-8 rounded-[1.75rem] sm:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex gap-5 sm:gap-6 items-start group hover:border-[#123a1a]/20"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 text-slate-400 font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-inner group-hover:bg-[#123a1a] group-hover:text-[#D4AF37] transition-all duration-500">
                  {po.num}
                </div>
                <div className="space-y-2.5">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#123a1a] transition-colors leading-tight">
                    {po.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                    {po.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* OUTCOME BASED EDUCATION CTA */}
        <div className="bg-[#123a1a] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 md:p-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#D4AF37]/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <h4 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                {content.cta.headingLead} <br />
                <span className="text-[#D4AF37]">{content.cta.headingAccent}</span>
              </h4>
              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                {content.cta.body}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center relative animate-spin-slow">
                <div className="absolute inset-0 flex items-center justify-center rotate-45">
                  <CheckCircle2 size={36} className="text-[#D4AF37] sm:w-[40px] sm:h-[40px]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                  <ShieldCheck size={36} className="text-white/20 sm:w-[40px] sm:h-[40px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
