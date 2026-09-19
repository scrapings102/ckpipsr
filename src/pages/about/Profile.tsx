import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Building, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { cdn } from "../../utils/image";

const CAMPUS_IMAGES = [
  {
    url: "/images/hero/66e151f0d6a90.webp",
    title: "CKPIPSR Main Campus",
    subtitle: "C. K. Pithawalla Educational Complex, Surat",
  },
  {
    url: "/images/hero/66e153e687221.webp",
    title: "Advanced Pharmaceutical Labs",
    subtitle: "State-of-the-art Research & Practical Facilities",
  },
  {
    url: "https://ckpipsr.ac.in/images/about/founder.jpg",
    title: "Visionary Legacy",
    subtitle: "Honoring Late Shri Chhotubhai Pithawalla",
  },
  {
    url: "/images/hero/65efeaeece007.webp",
    title: "Academic Excellence",
    subtitle: "Nurturing Future Pharmacy Professionals",
  },
  {
    url: "/images/hero/66e15283951b9.webp",
    title: "Modern Infrastructure",
    subtitle: "Equipped with latest educational technology",
  },
  {
    url: "/images/hero/66e1522d09fc0.webp",
    title: "Campus Environment",
    subtitle: "Lush green surroundings for holistic development",
  },
];

export default function Profile() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CAMPUS_IMAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + CAMPUS_IMAGES.length) % CAMPUS_IMAGES.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % CAMPUS_IMAGES.length);
  };

  const milestones = [
    { year: "1965", title: "Trust Foundation", desc: "Navyug Vidyabhavan Trust was founded in February 1965 to democratize higher education in South Gujarat." },
    { year: "2005", title: "CKPIPSR Establishment", desc: "C.K. Pithawalla Institute of Pharmaceutical Science & Research was founded to meet the growing need for pharmaceutical experts." },
    { year: "Today", title: "Leading Pharmacy Institute", desc: "A premier educational center in Gujarat, producing skilled pharmacy professionals for the global healthcare industry." }
  ];

  return (
    <SubPageLayout
      title="Profile"
      subtitle="Overview and profile of C. K. Pithawalla Institute of Pharmaceutical Science & Research."
      category="about-us"
      activeItemLabel="Profile"
    >
      <div className="space-y-20">
        {/* EDITORIAL INTRODUCTION SECTION */}
        <section className="relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[10px] font-black uppercase tracking-[0.2em] border border-[#123a1a]/10">
                Institutional Overview
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight tracking-tight">
                Excellence in <br /><span className="text-[#123a1a]">Pharmaceutical Education</span>
              </h2>
              <div className="h-1.5 w-24 bg-[#D4AF37] rounded-full" />
              
              <div className="text-slate-600 leading-relaxed font-medium text-lg space-y-6">
                <p>
                  <span className="float-left text-7xl font-serif font-bold text-[#D4AF37] mr-4 mt-2 leading-[0.6]">C</span>
                  . K. Pithawalla Institute of Pharmaceutical Science & Research (CKPIPSR) was established in 2005 and is being managed by the Navyug Vidyabhavan Trust, which was founded in February 1965.
                </p>
                <p>
                  Within a short span of its operation, the college has provided all the necessary state-of-the-art facilities to empower students, including a well-established central library containing thousands of books, reference works, and technical journals.
                </p>
                <p>
                  Honorable Late Shri C. K. Pithawalla has been the driving force for setting up this college named after him and continues to inspire generations of pharmacy students.
                </p>
              </div>
            </div>

            {/* Auto-scrolling Campus Image Showcase - Refined Bento Style */}
            <div className="lg:sticky lg:top-24">
              <section 
                className="relative rounded-[3rem] overflow-hidden border border-slate-200 group shadow-2xl bg-[#FAF8F3] transform hover:scale-[1.02] transition-all duration-700"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="aspect-[4/5] w-full relative overflow-hidden bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={CAMPUS_IMAGES[currentImageIndex].url}
                      alt={CAMPUS_IMAGES[currentImageIndex].title}
                      initial={{ opacity: 0, scale: 1.15 }}
                      animate={{ opacity: 1, scale: 1.0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2411] via-[#0c2411]/20 to-transparent pointer-events-none" />

                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <span className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-xl text-[10px] font-black tracking-widest text-[#D4AF37] uppercase border border-white/20 shadow-2xl">
                      Showcase {currentImageIndex + 1} / {CAMPUS_IMAGES.length}
                    </span>
                    
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="w-10 h-10 rounded-full bg-black/30 hover:bg-[#D4AF37] backdrop-blur-xl text-white hover:text-[#123a1a] transition-all border border-white/20 cursor-pointer flex items-center justify-center shadow-2xl"
                    >
                      {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                    </button>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 text-white z-10 space-y-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-1"
                      >
                        <h4 className="font-serif font-bold text-2xl leading-tight text-white drop-shadow-2xl">
                          {CAMPUS_IMAGES[currentImageIndex].title}
                        </h4>
                        <p className="text-sm text-[#D4AF37] font-bold uppercase tracking-widest">
                          {CAMPUS_IMAGES[currentImageIndex].subtitle}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="absolute bottom-8 right-8 flex gap-2">
                    <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-black/30 hover:bg-[#D4AF37] backdrop-blur-xl text-white hover:text-[#123a1a] transition-all border border-white/20 flex items-center justify-center shadow-2xl cursor-pointer"><ChevronLeft size={20} /></button>
                    <button onClick={handleNext} className="w-10 h-10 rounded-full bg-black/30 hover:bg-[#D4AF37] backdrop-blur-xl text-white hover:text-[#123a1a] transition-all border border-white/20 flex items-center justify-center shadow-2xl cursor-pointer"><ChevronRight size={20} /></button>
                  </div>
                </div>

                <div className="p-6 text-xs font-black uppercase tracking-widest text-[#123a1a] bg-white border-t border-slate-100 flex items-center justify-between">
                  <span>CKPIPSR Main Entrance</span>
                  <span className="text-[#D4AF37]">Surat, Gujarat</span>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* KEY HIGHLIGHTS SECTION */}
        <section className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "GTU Affiliated & PCI Approved",
              icon: GraduationCap,
              desc: "Complete adherence to Pharmacy Council of India guidelines, GTU academic curriculum, Outcome-Based Education (OBE), and continuous assessment.",
              color: "bg-[#123a1a] text-[#D4AF37]"
            },
            {
              title: "Modern Research Ecosystem",
              icon: Building,
              desc: "Well-equipped pharmaceutics and analysis labs, high-performance instruments, medicinal plant garden, smart classrooms, and digitized library.",
              color: "bg-[#D4AF37] text-[#123a1a]"
            }
          ].map((feature, fIdx) => (
            <motion.div 
              key={fIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: fIdx * 0.1 }}
              className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 space-y-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6 ${feature.color}`}>
                   <feature.icon size={28} />
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors">{feature.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium italic">
                    "{feature.desc}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* MILESTONES TIMELINE - REFINED */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-2">
               <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">Institutional Milestones</h3>
               <p className="text-slate-500 font-medium">A journey of dedication and academic excellence.</p>
            </div>
            <div className="text-right">
               <span className="text-5xl font-black text-slate-100 uppercase tracking-tighter">History</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {milestones.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative p-8 rounded-3xl bg-[#FAF8F3] border border-[#D4AF37]/20 flex flex-col gap-6 group hover:bg-[#123a1a] transition-all duration-500"
              >
                <div className="space-y-1">
                  <span className="text-4xl font-black font-serif text-[#D4AF37] group-hover:text-white transition-colors">{item.year}</span>
                  <h4 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#D4AF37] transition-colors">{item.title}</h4>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                  {item.desc}
                </p>
                <div className="h-1.5 w-12 bg-[#D4AF37] rounded-full group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
