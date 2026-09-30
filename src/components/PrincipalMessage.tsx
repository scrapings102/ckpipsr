import React, { useState } from 'react';
import { Quote, Feather, User, ArrowRight, Landmark, X, FileText, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PrincipalMessage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string } | null>(null);

  const principalData = {
    name: "Dr. Dhiren P. Shah",
    role: "PRINCIPAL & PROFESSOR (PHARMACEUTICS)",
    credentials: "M.PHARM, MBA, PGDIPR, PH.D.",
    image: "/images/faculty/dhiren-p-shah.jpg",
    quote: "Our vision is to establish CKPIPSR as a globally recognized centre of excellence in pharmaceutical education, research, innovation, entrepreneurship, and professional development by producing competent, ethical, and socially responsible pharmacy professionals.",
    paragraphs: [
      "C. K. Pithawalla Institute of Pharmaceutical Science & Research (CKPIPSR) was established in 2005 with an initial intake of 60 students and a commitment to academic excellence. Since its inception, the institute has earned a distinguished reputation in pharmaceutical education under the visionary leadership of our Honorable President, Shri C. K. Pithawalla. Today, CKPIPSR has evolved into a well-recognized pharmacy institution in Gujarat, offering Diploma in Pharmacy (D.Pharm.), Bachelor of Pharmacy (B.Pharm.), and Master of Pharmacy (M.Pharm.) programmes.",
      "Located in a serene and pollution-free environment on Surat–Dumas Road, Surat, the institute provides a disciplined, professional, and research-oriented atmosphere conducive to academic excellence. Modern infrastructure, well-equipped laboratories, a well-stocked library, and a team of highly qualified and experienced faculty members create an ideal environment for teaching, learning, and research.",
      "The institute is committed to the holistic development of its students through a balanced blend of academic, professional, and co-curricular activities. Industrial training, industrial visits, short-term training programmes, workshops, seminars, expert lectures, and skill-development initiatives are regularly organized. Students are also encouraged to actively participate in sports, cultural events, and community outreach programmes, including blood donation drives and thalassemia awareness campaigns.",
      "CKPIPSR strives to provide a learner-centric academic environment that equips students with strong technical knowledge, practical skills, professional ethics, and leadership qualities through Outcome-Based Education (OBE) and digital learning practices.",
      "To nurture a culture of innovation, research, and entrepreneurship, the institute has established dedicated platforms such as the Institutional Innovation Council (IIC) and the Student Startup and Innovation Policy (SSIP) Nodal Centre, encouraging students to develop innovative ideas and pursue entrepreneurial ventures."
    ]
  };

  return (
    <section id="principal-message" className="py-16 sm:py-24 bg-[#f2f2f0] relative overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#123a1a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Main Card Container */}
        <div className="max-w-6xl mx-auto bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_24px_60px_rgba(0,0,0,0.08)] border border-slate-200/80 relative overflow-hidden flex flex-col md:flex-row items-stretch">

          {/* ── TOP-LEFT HANGING RIBBON ── */}
          <div
            className="absolute top-0 left-6 sm:left-12 z-30 w-12 sm:w-14 h-24 sm:h-28 bg-[#123b1a] flex flex-col items-center pt-4 shadow-md pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%)'
            }}
          >
            <Landmark size={20} className="text-[#D4AF37]" />
            <div className="w-5 h-[2px] bg-[#D4AF37] mt-2" />
            <div className="w-3 h-[1px] bg-[#D4AF37]/60 mt-1" />
          </div>

          {/* ── BOTTOM-RIGHT GEOMETRIC CORNER ACCENT ── */}
          <div className="absolute bottom-0 right-0 z-0 w-44 h-44 sm:w-60 sm:h-60 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0 bg-[#123b1a]"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            />
            {/* Parallel decorative gold lines across bottom right */}
            <svg className="absolute inset-0 w-full h-full stroke-[#D4AF37]/40" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="30" y1="100" x2="100" y2="30" strokeWidth="1" />
              <line x1="45" y1="100" x2="100" y2="45" strokeWidth="1" />
              <line x1="60" y1="100" x2="100" y2="60" strokeWidth="1" />
              <line x1="75" y1="100" x2="100" y2="75" strokeWidth="1.5" />
            </svg>
          </div>

          {/* ───────── LEFT COLUMN: CIRCULAR PORTRAIT & WATERMARK ───────── */}
          <div className="w-full md:w-[38%] lg:w-[36%] flex flex-col items-center justify-center relative p-8 sm:p-12 md:py-16 md:border-r border-slate-200/70 shrink-0">

            {/* Faint Architectural Line-Art Watermark Background */}
            <svg
              className="absolute inset-0 w-full h-full opacity-6 text-slate-400 pointer-events-none p-6"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M20 180 H180 M30 180 V90 L100 30 L170 90 V180 M60 180 V100 M100 180 V100 M140 180 V100 M30 90 H170" />
            </svg>

            {/* Circular Photo Container */}
            <div className="relative z-10 my-4 sm:my-6">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-full p-1.5 bg-gradient-to-b from-[#123b1a]/15 via-slate-200 to-[#123b1a]/40 shadow-[0_16px_36px_rgba(0,0,0,0.12)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#123b1a] relative border-4 border-white">
                  <img
                    src={principalData.image}
                    alt={principalData.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== "https://ckpipsr.ac.in/images/about/dhiren-shah.png") {
                        target.src = "https://ckpipsr.ac.in/images/about/dhiren-shah.png";
                      } else {
                        target.src = "https://ui-avatars.com/api/?name=Dhiren+Shah&background=123a1a&color=D4AF37&size=512";
                      }
                    }}
                  />
                </div>
              </div>

              {/* Gold Quote Badge Pinned to Bottom of Circle */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#251E1C] border-2 border-[#D4AF37] w-10 h-10 rounded-full flex items-center justify-center text-[#D4AF37] shadow-lg z-20">
                <Quote size={18} className="fill-[#D4AF37]" />
              </div>
            </div>

          </div>

          {/* ───────── RIGHT COLUMN: MESSAGE & PRINCIPAL INFO ───────── */}
          <div className="w-full md:w-[62%] lg:w-[64%] p-8 sm:p-12 lg:p-14 flex flex-col justify-center relative z-10 space-y-6 sm:space-y-8">

            {/* Header Badge & Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
                <Feather size={16} />
              </div>
              <div>
                <span className="text-[#251E1C] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] block">
                  Message from the Principal
                </span>
                <div className="h-[2px] w-10 bg-[#D4AF37] mt-1" />
              </div>
            </div>

            {/* Featured Quote */}
            <div className="relative pl-1 sm:pl-2">
              <p className="font-serif italic text-slate-800 text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium">
                <span className="text-[#D4AF37] text-2xl sm:text-3xl font-serif mr-1">“</span>
                {principalData.quote}
                <span className="text-[#D4AF37] text-2xl sm:text-3xl font-serif ml-1">”</span>
              </p>
            </div>

            {/* Horizontal Ornamental Line */}
            <div className="flex items-center gap-3 w-full my-2">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-white flex items-center justify-center shrink-0">
                <div className="w-1 h-1 bg-[#D4AF37]" />
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />
            </div>

            {/* Principal Name & Role */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#251E1C] text-white flex items-center justify-center shrink-0 shadow-sm">
                <User size={20} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-slate-900 text-xl sm:text-2xl tracking-tight leading-tight">
                  {principalData.name}
                </h4>
                <p className="text-slate-500 font-mono text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-wider mt-0.5">
                  {principalData.role} <span className="text-[#D4AF37] font-normal">|</span> {principalData.credentials}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ───────── FULL MESSAGE READABLE MODAL ───────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#251E1C] text-white p-6 sm:p-8 flex items-center justify-between shrink-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none" />
                <div className="relative z-10">
                  <span className="text-[#D4AF37] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] block mb-1">
                    Complete Address
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Message from the Principal
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-sans mt-1">
                    {principalData.name} — {principalData.role}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#251E1C] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 z-10"
                >
                  <X size={18} className="stroke-[2.5]" />
                </button>
              </div>

              {/* Modal Body - Scrollable Text */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-slate-700 font-sans text-base leading-relaxed antialiased">
                <div className="p-5 bg-amber-50/80 border-l-4 border-[#D4AF37] rounded-r-2xl mb-6">
                  <p className="font-serif italic text-slate-900 text-lg font-semibold leading-relaxed">
                    "{principalData.quote}"
                  </p>
                </div>

                {principalData.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-justify leading-relaxed">
                    {index === 0 ? (
                      <span className="float-left text-5xl font-serif font-bold text-[#251E1C] mr-3 mt-1 leading-none">
                        {paragraph.charAt(0)}
                      </span>
                    ) : null}
                    {index === 0 ? paragraph.slice(1) : paragraph}
                  </p>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Award size={14} className="text-[#D4AF37]" />
                  <span>CKPIPSR Academic Leadership</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 bg-[#251E1C] hover:bg-[#D4AF37] text-white hover:text-[#251E1C] rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-[9999] bg-[#251E1C] text-white border border-[#D4AF37]/30 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm"
          >
            <Sparkles size={16} className="shrink-0 text-[#D4AF37] animate-pulse" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
