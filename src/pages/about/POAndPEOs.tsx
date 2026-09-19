import React from "react";
import { motion } from "motion/react";
import SubPageLayout from "../../components/SubPageLayout";
import { CheckCircle2, Target, BookOpen, Award, ShieldCheck, HeartPulse } from "lucide-react";

const PEOS = [
  {
    title: "Knowledge",
    desc: "To produce pharmacists with strong basics and high technical knowledge of pharmacy to cater the various areas of the pharmaceutical industry and healthcare profession."
  },
  {
    title: "Core Competency",
    desc: "To provide the required training in all aspects to the graduates to work as health care professionals in community and hospital pharmacies."
  },
  {
    title: "Professionalism",
    desc: "To provide professional and dedicated pharmacists to the society with skill and will to formulate and serve quality medicine in line with counseling."
  }
];

const POS = [
  {
    num: "PO1",
    title: "Pharmacy Knowledge",
    desc: "Possess knowledge and comprehension of the core and basic knowledge associated with the profession of pharmacy, including biomedical sciences; pharmaceutical sciences; behavioral, social, and administrative pharmacy sciences; and manufacturing practices."
  },
  {
    num: "PO2",
    title: "Planning Abilities",
    desc: "Demonstrate effective planning abilities including time management, resource management, delegation skills and organizational skills. Develop and implement plans and organize work to meet deadlines."
  },
  {
    num: "PO3",
    title: "Problem Analysis",
    desc: "Utilize the principles of scientific enquiry, thinking analytically, clearly and critically, while solving problems and making decisions during daily practice."
  },
  {
    num: "PO4",
    title: "Modern Tool Usage",
    desc: "Learn, select, and apply appropriate methods and procedures, resources, and modern pharmacy-related computing tools with an understanding of the limitations."
  },
  {
    num: "PO5",
    title: "Leadership Skills",
    desc: "Understand and consider the human reaction to change, motivation issues, leadership and team building when planning changes required for fulfillment of core, professional and societal responsibilities."
  },
  {
    num: "PO6",
    title: "Professional Identity",
    desc: "Understand, analyze and communicate the value of their professional roles (e.g. educators, health promoters, clinicians, employers, employees)."
  },
  {
    num: "PO7",
    title: "Pharmaceutical Ethics",
    desc: "Honor personal values and apply ethical principles in decision making, enable professional and personal development, and respect cultural and personal diversity."
  },
  {
    num: "PO8",
    title: "Communication",
    desc: "Communicate effectively with the pharmacy community and with society at large, such as being able to comprehend and write effective reports, design documentation, make effective presentations and give and receive clear instructions."
  },
  {
    num: "PO9",
    title: "The Pharmacist and Society",
    desc: "Apply reasoning informed by contextual knowledge to assess societal, health, safety and legal issues and the consequent responsibilities relevant to the professional pharmacy practice."
  },
  {
    num: "PO10",
    title: "Environment and Sustainability",
    desc: "Understand the impact of professional pharmacy solutions in societal and environmental contexts and demonstrate knowledge of and need for sustainable development."
  },
  {
    num: "PO11",
    title: "Life-long Learning",
    desc: "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change."
  }
];

export default function POAndPEOs() {
  return (
    <SubPageLayout
      title="PO and PEOs"
      subtitle="Program Educational Objectives (PEOs) & Program Outcomes (POs) defining our Outcome-Based Education (OBE) framework."
      category="about-us"
      activeItemLabel="PO and PEOs"
    >
      <div className="space-y-24">
        {/* PEOs Section - Refined Bento Grid */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[10px] font-black uppercase tracking-widest border border-[#123a1a]/10">
               Strategic Goals
             </div>
             <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
               Program Educational <span className="text-[#123a1a]">Objectives</span>
             </h2>
             <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-lg font-medium">
               Core objectives describing the professional accomplishments graduates are expected to attain within 3 to 5 years after graduation.
             </p>
             <div className="h-1.5 w-24 bg-[#D4AF37] rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PEOS.map((peo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-[#FAF8F3] p-10 rounded-[2.5rem] border border-[#D4AF37]/20 shadow-sm hover:shadow-2xl hover:bg-[#123a1a] transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="space-y-6 relative z-10">
                   <div className="w-14 h-14 rounded-2xl bg-white border border-[#D4AF37]/30 flex items-center justify-center text-[#123a1a] group-hover:bg-[#D4AF37] group-hover:rotate-6 transition-all duration-500 shadow-sm">
                      <Target size={24} />
                   </div>
                   <div className="space-y-3">
                      <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">PEO {idx + 1}</div>
                      <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-white transition-colors">
                        {peo.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                        {peo.desc}
                      </p>
                   </div>
                </div>

                <div className="pt-8 mt-8 border-t border-[#D4AF37]/10 relative z-10">
                   <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Institutional Mandate</span>
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
                  Graduate Attributes
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                  Program <span className="text-[#123a1a]">Outcomes</span>
                </h2>
                <p className="text-slate-500 font-medium italic">"Defining the core competencies and skills of our pharmacy graduates."</p>
             </div>
             <div className="text-right hidden md:block">
                <span className="text-6xl font-black text-slate-50 uppercase tracking-tighter">PO Matrix</span>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {POS.map((po, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex gap-8 items-start group hover:border-[#123a1a]/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-inner group-hover:bg-[#123a1a] group-hover:text-[#D4AF37] transition-all duration-500">
                  {po.num}
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-[#123a1a] transition-colors leading-tight">
                    {po.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    {po.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* OUTCOME BASED EDUCATION CTA */}
        <div className="bg-[#123a1a] rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#D4AF37]/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
           <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6 text-center lg:text-left">
                 <h4 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">Our Commitment to <br /><span className="text-[#D4AF37]">Outcome-Based Education</span></h4>
                 <p className="text-slate-300 text-lg leading-relaxed font-medium">
                    We continuously measure and refine our academic processes to ensure every student 
                    reaches their full potential as a pharmaceutical professional.
                 </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                 <div className="w-48 h-48 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center relative animate-spin-slow">
                    <div className="absolute inset-0 flex items-center justify-center rotate-45">
                       <CheckCircle2 size={40} className="text-[#D4AF37]" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                       <ShieldCheck size={40} className="text-white/20" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
