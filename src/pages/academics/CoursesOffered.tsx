import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Award,
  Sparkles,
  Zap,
  Target
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

const COURSES = [
  {
    id: "d-pharm",
    title: "D.Pharm.",
    fullName: "Diploma in Pharmacy",
    duration: "2 Years",
    intake: "60 Seats",
    icon: GraduationCap,
    description: "Fundamental knowledge in pharmaceutical science and community pharmacy practice.",
    color: "from-blue-600 to-indigo-600",
    path: "/academics/courses-offered-d-pharm",
    tags: ["Entry Level", "Community Practice"]
  },
  {
    id: "b-pharm",
    title: "B.Pharm.",
    fullName: "Bachelor of Pharmacy",
    duration: "4 Years",
    intake: "100 Seats",
    icon: BookOpen,
    description: "Comprehensive undergraduate degree covering clinical and industrial pharmacy.",
    color: "from-emerald-600 to-teal-600",
    path: "/academics/courses-offered-b-pharm",
    tags: ["Undergraduate", "Research Oriented"]
  },
  {
    id: "m-pharm",
    title: "M.Pharm.",
    fullName: "Master of Pharmacy",
    duration: "2 Years",
    intake: "15 Seats",
    icon: Award,
    description: "Specialized postgraduate studies in advanced pharmaceutical research.",
    color: "from-amber-600 to-orange-600",
    path: "/academics/courses-offered-m-pharm",
    tags: ["Postgraduate", "Specialized"]
  },
  {
    id: "short-term",
    title: "Certificate",
    fullName: "Short Term Certificate",
    duration: "8 Weeks",
    intake: "100 Seats",
    icon: Zap,
    description: "Intensive online skill program for dossier preparation and filing.",
    color: "from-purple-600 to-pink-600",
    path: "/academics/courses-offered-short-term-certificate",
    tags: ["Skill Development", "Industry Focused"]
  }
];

export default function CoursesOffered() {
  const navigate = useNavigate();

  return (
    <SubPageLayout
      title="Courses Offered"
      subtitle="Excellence in pharmaceutical education through diverse and specialized programs."
      category="academics"
      activeItemLabel="Courses Offered"
    >
      <div className="space-y-10">
        {/* Intro Section */}
        <section className="relative">
          <div className="absolute -left-10 top-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-bold uppercase tracking-wider border border-[#123a1a]/10">
              Academic Excellence
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2411] tracking-tight">
              Shape Your Future in Pharmacy
            </h2>
            <div className="h-1 w-16 bg-[#D4AF37] rounded-full" />
            <p className="text-slate-600 max-w-3xl text-sm leading-relaxed font-medium">
              We offer a range of PCI-approved pharmacy programs designed to provide students with 
              the technical skills, ethical values, and research mindset required for a successful 
              career in the healthcare industry.
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 gap-4 relative">
          {COURSES.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              onClick={() => navigate(course.path)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${course.color} opacity-[0.03] group-hover:opacity-10 transition-opacity rounded-bl-[100%]`} />
              
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white shadow-md shadow-black/10 group-hover:scale-105 transition-transform duration-300`}>
                    <course.icon size={20} />
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {course.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
                    {course.fullName}
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 italic">
                    "{course.description}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center text-[#123a1a] shrink-0">
                      <Clock size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                      <p className="text-xs font-bold text-slate-800">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#123a1a]">
                      <Users size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Annual Intake</p>
                      <p className="text-xs font-bold text-slate-800">{course.intake}</p>
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
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-[#123a1a] rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 mix-blend-soft-light">
            <img src="/images/hero/students_learning.jpg" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-48 -mt-48" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">Academic Support & Holistic Learning</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Beyond the classroom, we provide a supportive ecosystem that encourages research, 
                  innovation, and professional development.
                </p>
              </div>
              
              <div className="grid gap-4">
                {[
                  "PCI & GTU Approved Curriculum",
                  "Expert Doctoral Faculty Mentorship",
                  "Industry-Linked Research Projects",
                  "Advanced Laboratory Infrastructure",
                  "Placement & Career Guidance"
                ].map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <CheckCircle2 size={18} className="text-[#D4AF37]" />
                    <span className="text-sm font-bold tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-[#D4AF37] rounded-[2.5rem] p-8 text-[#123a1a] shadow-xl">
                  <Sparkles size={32} className="mb-4" />
                  <h4 className="text-4xl font-serif font-bold">100%</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest mt-2">Compliance</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10">
                  <Target size={32} className="mb-4 text-[#D4AF37]" />
                  <h4 className="text-4xl font-serif font-bold">15+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest mt-2">Specializations</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10">
                  <Zap size={32} className="mb-4 text-[#D4AF37]" />
                  <h4 className="text-4xl font-serif font-bold">20+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest mt-2">Patents Filed</p>
                </div>
                <div className="bg-[#123a1a] border-2 border-[#D4AF37] rounded-[2.5rem] p-8 text-white shadow-xl">
                  <Users size={32} className="mb-4 text-[#D4AF37]" />
                  <h4 className="text-4xl font-serif font-bold">500+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest mt-2">Alumni Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
