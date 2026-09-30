import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Atom,
  GraduationCap,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Award,
  FlaskConical,
  HeartPulse,
  Leaf,
  Microscope,
  Pill,
  Sparkles,
  Stethoscope,
  Zap,
  Target
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { courseHref, useCourses, visibleCourses } from "../../hooks/useCourses";

/** The icons an editor can choose — the other half of COURSE_ICONS in the API. */
const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  GraduationCap,
  BookOpen,
  Award,
  Zap,
  FlaskConical,
  Microscope,
  Pill,
  Stethoscope,
  HeartPulse,
  Leaf,
  Sparkles,
  Atom,
};

/** Colour names to gradients — the other half of COURSE_COLORS in the API. */
const GRADIENTS: Record<string, string> = {
  blue: "from-blue-600 to-indigo-600",
  emerald: "from-emerald-600 to-teal-600",
  amber: "from-amber-600 to-orange-600",
  purple: "from-purple-600 to-pink-600",
  rose: "from-rose-600 to-red-600",
  cyan: "from-cyan-600 to-sky-600",
  slate: "from-slate-600 to-slate-800",
};

/** The support box's four figures keep their shipped icons and styles by position. */
const STAT_STYLES = [
  { icon: Sparkles, box: "bg-[#D4AF37] rounded-[2.5rem] p-8 text-[#123a1a] shadow-xl", iconClass: "mb-4" },
  { icon: Target, box: "bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10", iconClass: "mb-4 text-[#D4AF37]" },
  { icon: Zap, box: "bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10", iconClass: "mb-4 text-[#D4AF37]" },
  { icon: Users, box: "bg-[#123a1a] border-2 border-[#D4AF37] rounded-[2.5rem] p-8 text-white shadow-xl", iconClass: "mb-4 text-[#D4AF37]" },
];

export default function CoursesOffered() {
  const navigate = useNavigate();
  const { content } = useCourses();
  const courses = visibleCourses(content);

  const Stat = ({ index }: { index: number }) => {
    const stat = content.support.stats[index];
    const style = STAT_STYLES[index];
    if (!stat || !style) return null;
    return (
      <div className={style.box}>
        <style.icon size={32} className={style.iconClass} />
        <h4 className="text-4xl font-serif font-bold">{stat.value}</h4>
        <p className="text-[10px] font-black uppercase tracking-widest mt-2">{stat.label}</p>
      </div>
    );
  };

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="academics"
      activeItemLabel="Courses Offered"
    >
      <div className="space-y-10">
        {/* Intro Section */}
        <section className="relative">
          <div className="absolute -left-10 top-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-bold uppercase tracking-wider border border-[#123a1a]/10">
              {content.intro.badge}
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2411] tracking-tight">
              {content.intro.heading}
            </h2>
            <div className="h-1 w-16 bg-[#D4AF37] rounded-full" />
            <p className="text-slate-600 max-w-3xl text-sm leading-relaxed font-medium">
              {content.intro.body}
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500">
            Course details will be published soon.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 relative">
            {courses.map((course, idx) => {
              const Icon = ICONS[course.card.icon] ?? GraduationCap;
              const color = GRADIENTS[course.card.color] ?? GRADIENTS.slate;
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  onClick={() => navigate(courseHref(course.id))}
                  className="group cursor-pointer bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Background Accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-[0.03] group-hover:opacity-10 transition-opacity rounded-bl-[100%]`} />

                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md shadow-black/10 group-hover:scale-105 transition-transform duration-300`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {course.card.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors leading-snug">
                        {course.card.title}
                      </h3>
                      <p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
                        {course.card.fullName}
                      </p>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 italic">
                        "{course.card.description}"
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center text-[#123a1a] shrink-0">
                          <Clock size={12} />
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                          <p className="text-xs font-bold text-slate-800">{course.card.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#123a1a]">
                          <Users size={16} />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Annual Intake</p>
                          <p className="text-xs font-bold text-slate-800">{course.card.intake}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#123a1a]/5 text-[#123a1a] font-black text-[10px] uppercase tracking-[0.2em] group-hover:bg-[#123a1a] group-hover:text-[#D4AF37] transition-all duration-300">
                        <span>Course Details</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="h-0.5 w-12 bg-[#D4AF37]/30 group-hover:w-20 transition-all duration-500 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Why Choose Us Section */}
        <div className="bg-[#123a1a] rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 mix-blend-soft-light">
            <img src="/images/hero/students_learning.jpg" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-48 -mt-48" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">{content.support.title}</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {content.support.body}
                </p>
              </div>

              <div className="grid gap-4">
                {content.support.points.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <CheckCircle2 size={18} className="text-[#D4AF37]" />
                    <span className="text-sm font-bold tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Stat index={0} />
                <Stat index={1} />
              </div>
              <div className="space-y-4 pt-12">
                <Stat index={2} />
                <Stat index={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
