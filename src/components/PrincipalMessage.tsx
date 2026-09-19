import React, { useState, useEffect } from 'react';
import { Quote, FileText, ArrowUpRight, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cdn } from '../utils/image';

export const PrincipalMessage = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [toast, setToast] = useState<{ message: string } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(isNaN(progress) ? 0 : progress);
    }
  };

  return (
    <section id="principal-message" className="py-28 bg-[#FAF8F5] relative overflow-hidden">
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-brand-accent/3 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle background graticule pattern for academic gravitas */}
      <div className="absolute inset-0 bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Premium Editorial Portrait & Official Insignia (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Portrait Frame */}
              <div className="relative w-full max-w-[340px] select-none group">
                
                {/* Mathematical double-border with elegant alignment */}
                <div className="absolute -inset-4 rounded-3xl border border-gold/25 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                <div className="absolute -inset-2 rounded-2xl border border-gold/15 pointer-events-none" />
                
                {/* Main image container */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#FAF8F5] shadow-[0_24px_48px_-12px_rgba(59,49,49,0.12)] border border-slate-200">
                  <img 
                    src="/images/faculty/dhiren-p-shah.jpg" 
                    alt="Dr. Dhiren P. Shah - Principal" 
                    className="w-full h-full object-cover object-top scale-102 group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== "https://ckpipsr.ac.in/images/about/dhiren-shah.png") {
                        target.src = "https://ckpipsr.ac.in/images/about/dhiren-shah.png";
                      } else {
                        target.src = "https://ui-avatars.com/api/?name=Dhiren+Shah&background=123a1a&color=D4AF37&size=512";
                      }
                    }}
                  />
                  {/* Subtle editorial vignette gradient overlay */}
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#0c2411]/30 via-transparent to-transparent opacity-80" />
                </div>

                {/* Overlapping Luxury Badge with gold-like accent - placed below image on mobile, absolute on sm+ */}
                <div className="mt-3 sm:mt-0 flex sm:absolute sm:-bottom-4 sm:-right-4 bg-[#0c2411] text-[#D4AF37] p-3 sm:p-4 rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.15)] border border-white/10 items-center justify-center transition-transform duration-300 hover:scale-110 w-fit mx-auto sm:mx-0">
                  <Quote className="fill-[#D4AF37] text-[#D4AF37]" size={18} />
                </div>
              </div>

              {/* Official Credentials & Seal */}
              <div className="w-full max-w-[340px] mt-8 text-center lg:text-left space-y-4">
                <div className="border-b border-slate-200 pb-4">
                  <h4 className="font-serif text-slate-900 font-bold text-xl tracking-tight leading-tight">
                    Dr. Dhiren P. Shah
                  </h4>
                  <p className="text-[#D4AF37] font-mono text-[10px] font-bold uppercase tracking-[0.2em] mt-1.5">
                    Professor & Principal (Pharmaceutics)
                  </p>
                  <p className="text-slate-500 text-xs font-serif italic mt-1">
                    M.Pharm, MBA, PGDIPR, Ph.D.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: The Academic Open Letter (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Header Title with fine lines */}
              <div className="space-y-2 text-center lg:text-left">
                <span className="text-[#D4AF37] font-mono text-[11px] font-bold uppercase tracking-[0.3em] block">
                  Leadership Address
                </span>
                <h3 className="text-[#3B3131] font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-none">
                  Message from the Principal
                </h3>
                <div className="h-[1px] w-16 bg-[#D4AF37] mx-auto lg:mx-0 mt-4" />
              </div>

              {/* Unique Scrollable Editorial Reader Pane */}
              <div className="relative border border-slate-200/80 bg-white rounded-2xl shadow-[0_16px_32px_rgba(59,49,49,0.02)] p-6 md:p-8 overflow-hidden">
                
                {/* Visual Reading progress line thread on the left margin */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-slate-100">
                  <div 
                    className="w-full bg-[#D4AF37] transition-all duration-100 ease-out"
                    style={{ height: `${scrollProgress * 100}%` }}
                  />
                </div>

                {/* Top/Bottom gradient fade masks to hint at scrollability */}
                <div className="pointer-events-none absolute left-[3px] right-0 top-0 h-10 bg-gradient-to-b from-white to-transparent z-10 opacity-90" />
                <div className="pointer-events-none absolute left-[3px] right-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent z-10 opacity-90" />

                <div 
                  ref={scrollRef}
                  onScroll={handleScroll}
                  data-lenis-prevent="true"
                  className="h-[320px] md:h-[380px] overflow-y-auto pr-2 space-y-6 text-slate-700 font-sans text-[14.5px] sm:text-[15.5px] leading-relaxed antialiased font-normal text-justify select-text no-scrollbar scroll-smooth"
                >
                  <p>
                    <span className="float-left text-6xl font-serif font-bold text-[#0c2411] mr-3 mt-1.5 leading-none select-none">
                      C
                    </span>
                    . K. Pithawalla Institute of Pharmaceutical Science & Research (CKPIPSR) was established in 2005 with an initial intake of 60 students and a commitment to academic excellence. Since its inception, the institute has earned a distinguished reputation in pharmaceutical education under the visionary leadership of our Honorable President, Shri C. K. Pithawalla. Today, CKPIPSR has evolved into a well-recognized pharmacy institution in Gujarat, offering Diploma in Pharmacy (D.Pharm.), Bachelor of Pharmacy (B.Pharm.), and Master of Pharmacy (M.Pharm.) programmes.
                  </p>

                  <p>
                    Located in a serene and pollution-free environment on Surat–Dumas Road, Surat, the institute provides a disciplined, professional, and research-oriented atmosphere conducive to academic excellence. Modern infrastructure, well-equipped laboratories, a well-stocked library, and a team of highly qualified and experienced faculty members create an ideal environment for teaching, learning, and research.
                  </p>

                  <div className="my-6 py-6 px-6 sm:px-8 border-l-4 border-[#D4AF37] bg-amber-50/60 rounded-r-2xl shadow-2xs">
                    <p className="font-serif italic text-base sm:text-lg text-slate-900 font-semibold leading-relaxed">
                      "Our vision is to establish CKPIPSR as a globally recognized centre of excellence in pharmaceutical education, research, innovation, entrepreneurship, and professional development by producing competent, ethical, and socially responsible pharmacy professionals."
                    </p>
                  </div>

                  <p>
                    The institute is committed to the holistic development of its students through a balanced blend of academic, professional, and co-curricular activities. Industrial training, industrial visits, short-term training programmes, workshops, seminars, expert lectures, and skill-development initiatives are regularly organized. Students are also encouraged to actively participate in sports, cultural events, and community outreach programmes, including blood donation drives and thalassemia awareness campaigns.
                  </p>

                  <p>
                    CKPIPSR strives to provide a learner-centric academic environment that equips students with strong technical knowledge, practical skills, professional ethics, and leadership qualities through Outcome-Based Education (OBE) and digital learning practices.
                  </p>

                  <p>
                    To nurture a culture of innovation, research, and entrepreneurship, the institute has established dedicated platforms such as the Institutional Innovation Council (IIC) and the Student Startup and Innovation Policy (SSIP) Nodal Centre, encouraging students to develop innovative ideas and pursue entrepreneurial ventures.
                  </p>
                </div>
              </div>

              {/* Call-to-actions (CTA) panel */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setToast({ message: "Opening Academic Vision Prospectus..." })}
                  className="w-full sm:w-auto px-6 py-3 bg-[#123a1a] hover:bg-[#D4AF37] text-white hover:text-[#123a1a] rounded-xl font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer select-none shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-transparent"
                >
                  <Award size={14} />
                  <span>Academic Vision</span>
                  <ArrowUpRight size={14} />
                </button>

                <button 
                  onClick={() => setToast({ message: "Loading Institutional Annual Report..." })}
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-[#3B3131] border-2 border-slate-200 hover:border-slate-300 rounded-xl font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer select-none shadow-sm flex items-center justify-center gap-2"
                >
                  <FileText size={14} className="text-[#D4AF37]" />
                  <span>Annual Report</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
      {/* Symmetrical luxury toast notification banner compatible with iframe/sandboxed modes */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-[9999] bg-[#0c2411] text-white border border-[#D4AF37]/30 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm"
          >
            <Sparkles size={16} className="shrink-0 text-[#D4AF37] animate-pulse" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

