import React from "react";
import { motion } from "motion/react";
import { Eye, Rocket, Heart, Compass, ShieldCheck, Sparkles, Award, Quote, Target } from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

export default function VisionMission() {
  const coreValues = [
    { name: "Academic Integrity", icon: ShieldCheck, desc: "Upholding the highest moral and ethical standards in all educational activities, examinations, research work, and social interactions." },
    { name: "Student Empowerment", icon: Rocket, desc: "Enabling students with robust computing, corporate, and manager skills, fostering independence and confidence." },
    { name: "Inclusivity & Equity", icon: Heart, desc: "Embracing diverse cultural and economic student backgrounds, nurturing an unbiased, supportive community." },
    { name: "Continuous Innovation", icon: Compass, desc: "Staying updated with industrial trends by regularly modernizing facilities, learning media, and training techniques." }
  ];

  return (
    <SubPageLayout
      title="Vision & Mission"
      subtitle="Guiding our academic directives, student governance, and daily campus endeavors."
      category="about-us"
      activeItemLabel="Vision and Mission"
    >
      <div className="space-y-12">
        {/* REFINED VISION & MISSION BENTO GRID */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-lg mx-auto lg:max-w-none w-full">
          
          {/* Vision Card - Refined */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative bg-[#123a1a] rounded-2xl p-5 sm:p-6 md:p-8 overflow-hidden shadow-lg flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -mr-24 -mt-24 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />
            
            <div className="relative z-10 space-y-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#D4AF37] mx-auto group-hover:scale-105 transition-transform duration-300">
                  <Eye size={22} />
                </div>
                <h2 className="text-xs font-black text-white/50 uppercase tracking-[0.25em] font-mono text-center">Our Vision</h2>
              </div>
              
              <blockquote className="relative px-2 sm:px-4">
                <p className="text-sm sm:text-base md:text-lg font-serif font-bold text-white leading-relaxed tracking-wide text-center uppercase">
                  "To develop pharmacy graduates with fundamental knowledge and professional competence to improve healthcare need of community and industry."
                </p>
              </blockquote>
            </div>
 
            <div className="relative z-10 pt-4 border-t border-white/10 mt-6 flex items-center justify-center gap-2.5">
               <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#123a1a] shrink-0">
                  <Award size={16} />
               </div>
               <p className="text-[9px] font-bold text-slate-300 uppercase tracking-wider leading-tight text-left">
                 Official Institutional <br /><span className="text-[#D4AF37]">Vision Statement</span>
               </p>
            </div>
          </motion.div>
 
          {/* Mission Card - Refined */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FAF8F3] rounded-2xl border border-[#D4AF37]/20 p-5 sm:p-6 md:p-8 shadow-md flex flex-col justify-between group"
          >
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#123a1a] flex items-center justify-center text-[#D4AF37] shadow-md shadow-[#123a1a]/10 mx-auto group-hover:scale-105 transition-transform duration-300">
                  <Rocket size={22} />
                </div>
                <h2 className="text-xs font-black text-[#123a1a]/40 uppercase tracking-[0.25em] font-mono text-center">Our Mission</h2>
              </div>
 
              <div className="space-y-4">
                {[
                  "To provide state-of-art teaching learning process.",
                  "To train students as technical/knowledgeable workforce.",
                  "To develop pharmacy professionals as responsible citizens."
                ].map((mission, mIdx) => (
                  <div key={mIdx} className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-center sm:items-start text-center sm:text-left group/item">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#D4AF37]/30 flex items-center justify-center shrink-0 font-bold font-mono text-[#123a1a] shadow-sm group-hover/item:bg-[#123a1a] group-hover/item:text-[#D4AF37] transition-all duration-300 text-xs">
                      {mIdx + 1}
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 font-serif font-bold leading-relaxed pt-0.5">
                      {mission}
                    </p>
                  </div>
                ))}
              </div>
            </div>
 
            <div className="pt-4 border-t border-slate-200 mt-6 flex items-center justify-center gap-2.5">
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <Target size={16} />
               </div>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-tight text-left">
                 Strategic Academic <br /><span className="text-[#123a1a]">Directives</span>
               </p>
            </div>
          </motion.div>
        </div>
 
        {/* REFINED CORE VALUES */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-bold uppercase tracking-wider border border-[#123a1a]/10">
              Ethical Foundation
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">Our Core Institutional Values</h3>
            <div className="h-1 w-16 bg-[#D4AF37] rounded-full mx-auto" />
          </div>
 
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-lg mx-auto sm:max-w-none w-full">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="p-4 rounded-xl bg-white border border-slate-100 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-105 transition-transform pointer-events-none" />
                  
                  <div className="space-y-3 relative z-10">
                    <div className="p-2.5 rounded-xl bg-slate-50 text-[#123a1a] w-10 h-10 flex items-center justify-center group-hover:bg-[#123a1a] group-hover:text-[#D4AF37] transition-all duration-300 shadow-inner shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-slate-900 text-sm group-hover:text-[#123a1a] transition-colors">{val.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
 
        {/* INSPIRATIONAL CTA */}
        <div className="bg-[#FAF8F3] rounded-2xl border border-[#D4AF37]/20 p-6 sm:p-10 relative overflow-hidden group text-center max-w-lg mx-auto lg:max-w-none w-full">
           <div className="absolute top-0 left-0 w-[24rem] h-[24rem] bg-[#D4AF37]/5 rounded-full blur-[80px] -ml-20 -mt-20 pointer-events-none" />
           
           <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <Sparkles className="text-[#D4AF37] w-8 h-8 mx-auto" />
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-tight tracking-tight">Committed to the <br /><span className="text-[#123a1a]">Future of Pharmacy</span></h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                At CKPIPSR, we don't just teach pharmacy; we nurture leaders who will revolutionize healthcare 
                through ethical research and technical excellence.
              </p>
           </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
