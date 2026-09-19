import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, HelpCircle, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { useClipReveal } from '../hooks/useClipReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "How do I secure admission to the Pharmacy program?",
    answer: "Admissions to our D.Pharm, B.Pharm and M Pharm programs are conducted according to the eligibility criteria, merit guidelines, and centralized admission procedures prescribed by the relevant state admission authorities and Pharmacy Council of India (PCI) regulations."
  },
  {
    id: 2,
    question: "What scholarship assistance schemes are currently available?",
    answer: "Eligible Pharmacy students can benefit from various government and institutional scholarship schemes, including MYSY (Mukhyamantri Yuva Swavalamban Yojana), Digital Gujarat scholarships, category-based financial assistance, and other applicable merit and need-based scholarship provisions."
  },
  {
    id: 3,
    question: "Does the college provide hostel or residential facilities?",
    answer: "Yes, students can access secure residential facilities with essential amenities, hygienic dining options, recreational spaces, safety measures, and a supportive academic environment designed to provide a comfortable campus experience."
  },
  {
    id: 4,
    question: "Are internships and practical training available for Pharmacy students?",
    answer: "Yes, students receive hands-on laboratory training along with opportunities for industrial exposure, internships, hospital or community pharmacy experience, and professional learning activities to prepare them for real-world pharmaceutical careers."
  }

];

interface AdmissionsProps {
  onOpenAdmissions?: () => void;
}

export default function Admissions({ onOpenAdmissions }: AdmissionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useClipReveal();
  const [openFaqId, setOpenFaqId] = useState<number | null>(1); // default open first item

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section 
      ref={(el) => {
        if (el) {
          (revealRef as React.MutableRefObject<HTMLElement>).current = el;
          (containerRef as React.MutableRefObject<HTMLDivElement>).current = el as HTMLDivElement;
        }
      }}
      id="admissions" 
      className="py-24 md:py-36 bg-[#0c2411] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Decorative overlay backgrounds */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
          alt="Students walking"
          className="w-full h-full absolute inset-0 object-cover opacity-5 filter grayscale mix-blend-screen"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c2411]/95 via-[#0c2411]/90 to-[#0c2411]" />
      </div>

      {/* Decorative geometric patterns */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/10 pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/10 pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-20 items-center">
          
          {/* COLUMN A: Dynamic Call to Actions */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              {/* Category indicator badge */}
              <div 
                onClick={onOpenAdmissions}
                className="flex items-center gap-2.5 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="w-10 h-[1.5px] bg-[#D4AF37]" />
                <span className="font-mono text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
                  ADMISSIONS 2026-27
                </span>
                <span className="font-sans text-[8.5px] font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full uppercase shadow-2xs">
                  OPEN
                </span>
              </div>

              <h2 className="text-4xl md:text-5.5xl font-serif text-white font-bold leading-[1.12] tracking-tight mb-6">
                Begin your journey to <span className="italic font-light text-[#D4AF37] font-serif block sm:inline">leadership</span>.
              </h2>
              
              <p className="text-white/75 leading-relaxed text-[14.5px] md:text-base mb-10 font-sans font-light">
                Join a legacy of pharmacy professionals, healthcare innovators, researchers, and industry leaders. Admissions through Gujarat Technological University (GTU) centralized admission systems, along with our dedicated institutional assistance desks, are now fully open.
              </p>

              {/* Action buttons stack */}
              <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                <button 
                  onClick={() => {
                    if (onOpenAdmissions) {
                      onOpenAdmissions();
                    }
                  }}
                  className="bg-[#D4AF37] text-[#0c2411] hover:bg-white hover:text-[#0c2411] px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_12px_30px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-95 transition-all duration-300 w-full sm:w-auto cursor-pointer select-none"
                >
                  Apply Online Now
                </button>
                
                <button className="flex items-center gap-3.5 text-xs font-bold uppercase tracking-widest text-white hover:text-[#D4AF37] transition-all group w-full sm:w-auto justify-center cursor-pointer select-none">
                  <span>Download Prospectus</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-transparent group-hover:text-[#0c2411] transition-all group-hover:scale-105">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </div>

              {/* Fast fact badges line */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-start">
                  <span className="font-sans text-[11px] font-semibold text-white/50 uppercase tracking-widest">GUJARAT GTU AFFILIATED</span>
                  <span className="font-serif text-[20px] font-bold text-[#D4AF37] tracking-wide mt-1">CKPIPSR - Surat</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-sans text-[11px] font-semibold text-white/50 uppercase tracking-widest">SSIP STARTUP AID</span>
                  <span className="font-serif text-[20px] font-bold text-emerald-400 tracking-wide mt-1">Industrial cell</span>
                </div>
              </div>

            </motion.div>
          </div>

          {/* COLUMN B: FAQ Accordions Stack */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0b1b0e] border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md relative"
            >
              {/* Floating micro accent */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-80">
                <Sparkles size={11} className="text-[#D4AF37]" />
                <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#D4AF37]">FAQ ENGINE</span>
              </div>

              <div className="mb-8 select-none">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="font-sans text-white/60 font-light text-[12.5px] md:text-[13px]">
                  Find fast, authoritative admissions coordination references gathered directly from university registry advisors.
                </p>
              </div>

              {/* Accordion loop */}
              <div className="flex flex-col gap-3.5">
                {FAQ_DATA.map((faq) => {
                  const isOpen = faq.id === openFaqId;
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-2xl border transition-all duration-350 relative overflow-hidden select-none ${
                        isOpen 
                          ? 'bg-[#112815] border-[#D4AF37]/60 shadow-md ring-1 ring-[#D4AF37]/20' 
                          : 'bg-[#112815]/40 border-white/10 hover:border-[#D4AF37]/40 hover:bg-[#112815]/60'
                      }`}
                    >
                      {/* Accordion Header */}
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left py-4.5 px-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle 
                            size={16} 
                            className={`shrink-0 transition-colors duration-300 ${isOpen ? 'text-[#D4AF37]' : 'text-white/40'}`} 
                          />
                          <span className={`font-sans text-[13.5px] md:text-[14.5px] font-semibold tracking-wide transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/80'}`}>
                            {faq.question}
                          </span>
                        </div>

                        <div className={`p-1.5 rounded-full border shrink-0 transition-all duration-300 ${
                          isOpen ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] rotate-180' : 'border-white/10 text-white/40'
                        }`}>
                          <ChevronDown size={14} className="stroke-[2.5]" />
                        </div>
                      </button>

                      {/* Collapsible content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-0 border-t border-white/10 font-sans font-light text-[13px] md:text-[14px] leading-relaxed text-white/80">
                              <p className="mt-3 bg-[#0c2411] p-4 rounded-xl border border-[#D4AF37]/20 text-white/90">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}
              </div>

              {/* Support message */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <span className="font-sans text-[11px] font-light text-white/50">
                  Have specific queries regarding fee structures or management seats?
                </span>
                <a 
                  href="mailto:info@ckpipsr.org"
                  className="font-mono text-[10px] font-bold text-[#D4AF37] hover:underline block mt-1 hover:text-white uppercase tracking-wider"
                >
                  Contact Registry Desk — info@ckpipsr.org
                </a>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
