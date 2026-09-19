import React from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  BookOpen, 
  Sparkles, 
  FileText, 
  Download, 
  Zap, 
  Target,
  ArrowRight
} from "lucide-react";
import { LeafTileGallery } from "./LeafTileGallery";

interface CourseDetailProps {
  title: string;
  fullName: string;
  intake: string;
  duration: string;
  eligibility: string;
  fees: string;
  overview: string;
  image: string;
}

export const CourseDetailLayout: React.FC<CourseDetailProps> = ({
  title,
  fullName,
  intake,
  duration,
  eligibility,
  fees,
  overview,
  image
}) => {
  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[220px] sm:h-[280px] shadow-xl border-2 border-white">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#123a1a] via-[#123a1a]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider border border-white/30">
            Professional Program
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {title}
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm font-medium max-w-2xl">
            {fullName} — Empowering the next generation of pharmacy leaders with specialized expertise.
          </p>
        </div>
      </section>

      {/* Quick Stats Bento */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Users, label: "Annual Intake", value: intake, color: "bg-blue-50" },
          { icon: Clock, label: "Duration", value: duration, color: "bg-emerald-50" },
          { icon: Target, label: "Eligibility", value: eligibility, color: "bg-amber-50" },
          { icon: Zap, label: "Fees (Approx.)", value: fees, color: "bg-purple-50" }
        ].map((stat, idx) => (
          <div key={idx} className={`${stat.color} p-4 rounded-xl border border-white shadow-sm flex flex-col gap-2 group hover:scale-[1.02] transition-transform`}>
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#123a1a] shadow-sm group-hover:rotate-6 transition-transform shrink-0">
              <stat.icon size={16} />
            </div>
            <div>
              <p className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug truncate">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Content Side */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <BookOpen className="text-[#D4AF37]" size={20} />
                Course Overview
              </h2>
              <div className="h-1 w-14 bg-[#D4AF37] rounded-full" />
              <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                "{overview}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold text-slate-800">Core Objectives</h3>
                <ul className="space-y-2">
                  {[
                    "Advanced drug development methodologies",
                    "Pharmacological testing & validation",
                    "Community pharmacy & patient care",
                    "Regulatory compliance & ethics"
                  ].map((item, iIdx) => (
                    <li key={iIdx} className="flex gap-2 items-center text-xs text-slate-600 font-medium">
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold text-slate-800">Career Paths</h3>
                <ul className="space-y-2">
                  {[
                    "Clinical Research Associate",
                    "Quality Control Manager",
                    "Regulatory Affairs Specialist",
                    "Hospital Pharmacist"
                  ].map((item, iIdx) => (
                    <li key={iIdx} className="flex gap-2 items-center text-xs text-slate-600 font-medium">
                      <ArrowRight size={13} className="text-[#D4AF37] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-[#123a1a] rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-2xl -mr-24 -mt-24 pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-serif font-bold tracking-tight">Academic Integrity & Research</h3>
                <Sparkles className="text-[#D4AF37]" size={20} />
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Our curriculum is strictly aligned with Pharmacy Council of India (PCI) standards and 
                Gujarat Technological University (GTU) guidelines, ensuring global acceptance and 
                academic rigour.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-md active:scale-95">
                  Download Full Syllabus
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-[#123a1a] text-[#D4AF37] border border-[#D4AF37]/20 font-bold text-xs hover:bg-[#1a4a25] transition-all shadow-md active:scale-95">
                  View Academic Calendar
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 tracking-tight">Fee Structure</h3>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Yearly Tuition</span>
                <span className="text-sm font-bold text-[#123a1a]">{fees}</span>
              </div>
              <p className="text-[9px] text-slate-400 font-medium">
                * Fees are subject to change as per FRC / PCI / State Government guidelines.
              </p>
            </div>
            <button className="w-full py-2.5 bg-[#123a1a] text-white rounded-xl font-bold text-xs shadow-md hover:bg-[#1a4a25] transition-all">
              Inquire for Admission
            </button>
          </div>

          <div className="bg-[#FAF8F3] rounded-2xl p-5 border border-[#D4AF37]/10 shadow-sm space-y-3">
            <h3 className="text-base font-serif font-bold text-slate-900 tracking-tight">Admission Notice</h3>
            <div className="flex gap-3 items-start">
              <div className="p-1.5 rounded-lg bg-amber-100 text-[#D4AF37] shrink-0">
                <FileText size={16} />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Candidates must have passed 10+2 with Physics, Chemistry and Biology/Maths from a 
                recognized board for undergraduate programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ResourceDetailProps {
  title: string;
  description: string;
  details: string[];
  image: string;
  features: string[];
  gallery?: string[];
  photos?: string[];
}

export const ResourceDetailLayout: React.FC<ResourceDetailProps> = ({
  title,
  description,
  details,
  image,
  features,
  gallery,
  photos
}) => {
  const displayPhotos = gallery || photos || [];

  return (
    <div className="space-y-10">
      {/* Featured Header */}
      <section className="relative">
        <div className="absolute -left-10 top-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-bold uppercase tracking-wider border border-[#123a1a]/10">
                Campus Facility
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0c2411] tracking-tight leading-snug">
                {title}
              </h2>
              <div className="h-1 w-16 bg-[#D4AF37] rounded-full" />
              <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                "{description}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                  <CheckCircle2 size={14} className="text-[#D4AF37] shrink-0" />
                  <span className="text-[10px] font-bold text-slate-700 tracking-wide uppercase truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border-2 border-white">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Details Bento */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-slate-900 tracking-tight">Key Infrastructure Details</h3>
          <div className="h-px flex-1 bg-slate-100 mx-4" />
        </div>
        
        <div className="grid sm:grid-cols-3 gap-3">
          {details.map((detail, dIdx) => (
            <motion.div 
              key={dIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: dIdx * 0.05 }}
              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#D4AF37]/20 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#123a1a] group-hover:text-white transition-all mb-3 shrink-0">
                <Zap size={14} />
              </div>
              <p className="text-xs font-bold text-slate-800 leading-relaxed uppercase tracking-wider">{detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leaf-Tile Photo Gallery */}
      {displayPhotos.length > 0 && (
        <LeafTileGallery
          photos={displayPhotos}
          title={`${title} Photo Archive`}
          subtitle={`Authentic photographs of the ${title} infrastructure and facilities at CKPIPSR.`}
          facilityName={title}
        />
      )}

      {/* CTA Section */}
      <div className="bg-[#123a1a] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-xl">
         <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <img src="/images/hero/college_campus.jpg" className="w-full h-full object-cover" />
         </div>
         
         <div className="relative z-10 space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">A Modern Academic Environment</h3>
              <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
                 We invest continuously in our infrastructure to provide the best possible learning 
                 and research environment for our students.
              </p>
            </div>
            <button className="px-6 py-3 rounded-xl bg-[#123a1a] text-[#D4AF37] border border-[#D4AF37]/30 font-bold text-xs hover:bg-[#1a4a25] transition-all shadow-md active:scale-95">
               Inquire About Facilities
            </button>
         </div>
      </div>
    </div>
  );
};
