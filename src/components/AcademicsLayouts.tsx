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
import type { CourseContent } from "../hooks/useCourseContent";
import { LeafTileGallery } from "./LeafTileGallery";

/**
 * A course button: a real link once the admin panel gives it one, otherwise
 * the plain button the page always had. Hrefs are checked by the API — a site
 * path or https — and external ones open in a new tab.
 */
function CourseAction({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return (
      <button type="button" className={className}>
        {children}
      </button>
    );
  }
  const external = /^https:\/\//i.test(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/** One course page, drawn from its full content. */
export const CourseDetail: React.FC<{ course: CourseContent }> = ({ course }) => {
  const stats = [
    { icon: Users, label: "Annual Intake", value: course.stats.intake, color: "bg-blue-50" },
    { icon: Clock, label: "Duration", value: course.stats.duration, color: "bg-emerald-50" },
    { icon: Target, label: "Eligibility", value: course.stats.eligibility, color: "bg-amber-50" },
    { icon: Zap, label: "Fees (Approx.)", value: course.stats.fees, color: "bg-purple-50" },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[220px] sm:h-[280px] shadow-xl border-2 border-white">
        <img
          src={course.banner.image}
          alt={course.banner.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#123a1a] via-[#123a1a]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider border border-white/30">
            {course.banner.badge}
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {course.banner.title}
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm font-medium max-w-2xl">
            {course.banner.text}
          </p>
        </div>
      </section>

      {/* Quick Stats Bento */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.color} p-4 rounded-xl border border-white shadow-sm flex flex-col gap-2 group hover:scale-[1.02] transition-transform`}>
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#123a1a] shadow-sm group-hover:rotate-6 transition-transform shrink-0">
              <stat.icon size={16} />
            </div>
            <div>
              <p className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              {/* Truncated to fit the tile; the full text is on hover. */}
              <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug truncate" title={stat.value}>{stat.value}</p>
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
                "{course.overview}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold text-slate-800">{course.objectives.title}</h3>
                <ul className="space-y-2">
                  {course.objectives.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex gap-2 items-center text-xs text-slate-600 font-medium">
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-serif font-bold text-slate-800">{course.careers.title}</h3>
                <ul className="space-y-2">
                  {course.careers.items.map((item, iIdx) => (
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
                <h3 className="text-lg font-serif font-bold tracking-tight">{course.integrity.title}</h3>
                <Sparkles className="text-[#D4AF37]" size={20} />
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {course.integrity.body}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <CourseAction
                  href={course.integrity.syllabusUrl}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-md active:scale-95"
                >
                  {course.integrity.syllabusLabel}
                </CourseAction>
                <CourseAction
                  href={course.integrity.calendarUrl}
                  className="px-5 py-2.5 rounded-xl bg-[#123a1a] text-[#D4AF37] border border-[#D4AF37]/20 font-bold text-xs hover:bg-[#1a4a25] transition-all shadow-md active:scale-95"
                >
                  {course.integrity.calendarLabel}
                </CourseAction>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 tracking-tight">{course.feeCard.title}</h3>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between items-center gap-3">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{course.feeCard.label}</span>
                <span className="text-sm font-bold text-[#123a1a] text-right">{course.stats.fees}</span>
              </div>
              {course.feeCard.note && (
                <p className="text-[9px] text-slate-400 font-medium">* {course.feeCard.note}</p>
              )}
            </div>
            <CourseAction
              href={course.feeCard.buttonUrl}
              className="block w-full py-2.5 bg-[#123a1a] text-white text-center rounded-xl font-bold text-xs shadow-md hover:bg-[#1a4a25] transition-all"
            >
              {course.feeCard.buttonLabel}
            </CourseAction>
          </div>

          <div className="bg-[#FAF8F3] rounded-2xl p-5 border border-[#D4AF37]/10 shadow-sm space-y-3">
            <h3 className="text-base font-serif font-bold text-slate-900 tracking-tight">{course.notice.title}</h3>
            <div className="flex gap-3 items-start">
              <div className="p-1.5 rounded-lg bg-amber-100 text-[#D4AF37] shrink-0">
                <FileText size={16} />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {course.notice.body}
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
  /** Editable on the pages that read their content from the panel. */
  badge?: string;
  detailsHeading?: string;
  gallery?: string[];
  photos?: string[];
}

export const ResourceDetailLayout: React.FC<ResourceDetailProps> = ({
  title,
  description,
  details,
  image,
  features,
  badge = "Campus Facility",
  detailsHeading = "Key Infrastructure Details",
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
              {badge && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-bold uppercase tracking-wider border border-[#123a1a]/10">
                  {badge}
                </div>
              )}
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
          <h3 className="text-lg font-serif font-bold text-slate-900 tracking-tight">{detailsHeading}</h3>
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
