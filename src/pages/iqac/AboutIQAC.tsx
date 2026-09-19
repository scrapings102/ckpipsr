import React from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Target, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  FileText, 
  BarChart3, 
  Users, 
  Search, 
  GraduationCap, 
  Database, 
  FileCheck2, 
  Compass, 
  Lightbulb,
  Building2,
  Cpu,
  TrendingUp,
  Share2
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

export default function AboutIQAC() {
  const objectives = [
    {
      id: "01",
      title: "Catalytic Action Plans",
      desc: "To develop a mechanism to promote conscious, consistent and catalytic action plans to improve the academic and administrative performance of the institution."
    },
    {
      id: "02",
      title: "Quality Enhancement & Best Practices",
      desc: "To promote institutional quality enhancement and sustenance through the internalization of quality culture and institutionalization of the best practices."
    },
    {
      id: "03",
      title: "Progressive Operations",
      desc: "Ensuring timely, efficient and progressive performance of academic, administrative and financial units;"
    },
    {
      id: "04",
      title: "Relevant Academic Programmes",
      desc: "Adoption of relevant and quality academic and research programmes;"
    },
    {
      id: "05",
      title: "Equitable Access & Affordability",
      desc: "Ensuring equitable access to and affordability of academic programmes for various sections of the society;"
    },
    {
      id: "06",
      title: "Modern Teaching & Learning",
      desc: "Optimization and integration of modern methods of teaching and learning;"
    },
    {
      id: "07",
      title: "Credible Evaluation Systems",
      desc: "Ensuring credible assessment and evaluation processes;"
    },
    {
      id: "08",
      title: "Support Structure & Services",
      desc: "Ensuring the proper allocation, adequacy and maintenance of support structure and services."
    }
  ];

  const functions = [
    {
      no: 1,
      title: "Quality Benchmarks",
      desc: "Development and application of quality benchmarks;",
      icon: Award
    },
    {
      no: 2,
      title: "Institutional Parameters",
      desc: "Setting parameters for various academic and administrative activities of the institution;",
      icon: Layers
    },
    {
      no: 3,
      title: "Learner-Centric Environment",
      desc: "Facilitating the creation of a learner-centric environment conducive to quality education and faculty development to adopt the required knowledge and technology for participatory teaching and learning process;",
      icon: GraduationCap
    },
    {
      no: 4,
      title: "Stakeholder Feedback",
      desc: "Collection and analysis of feedback from all the stakeholders on quality-related institutional processes;",
      icon: Users
    },
    {
      no: 5,
      title: "Information Dissemination",
      desc: "Dissemination of information on various quality parameters to all the stakeholders;",
      icon: Share2
    },
    {
      no: 6,
      title: "Workshops & Seminars",
      desc: "Organization of intra- and inter-institutional workshops and seminars on quality-related themes and promotion of quality circles;",
      icon: BookOpen
    },
    {
      no: 7,
      title: "Activity Documentation",
      desc: "Documentation of various programmes/activities leading to quality improvement;",
      icon: FileText
    },
    {
      no: 8,
      title: "Nodal Coordination Agency",
      desc: "Acting as a nodal agency of the institution for coordinating quality-related activities, including adoption and dissemination of the best practices;",
      icon: ShieldCheck
    },
    {
      no: 9,
      title: "MIS & Institutional Database",
      desc: "Development and maintenance of institutional database through MIS for the purpose of maintaining and enhancing institutional quality;",
      icon: Database
    },
    {
      no: 10,
      title: "Academic & Administrative Audits (AAA)",
      desc: "Periodical conduct of Academic and Administrative Audits along with their follow-up activities;",
      icon: Search
    },
    {
      no: 11,
      title: "AQAR Submission (NAAC)",
      desc: "Preparation and submission of the Annual Quality Assurance Report (AQAR) as per the guidelines and parameters of NAAC.",
      icon: FileCheck2
    }
  ];

  return (
    <SubPageLayout
      title="About IQAC"
      subtitle="Internal Quality Assurance Cell — Ensuring Continuous Academic & Institutional Excellence"
      category="iqac"
      activeItemLabel="About IQAC"
    >
      <div className="space-y-12 max-w-6xl mx-auto">
        
        {/* Top Hero & Overview Card with Campus Imagery */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 p-7 sm:p-9 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-[#1a5d2e]" />
                  <span>NAAC Quality Sustenance Measure</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight">
                  Internal Quality Assurance Cell (IQAC)
                </h2>

                <p className="text-slate-700 text-sm sm:text-base font-sans leading-relaxed">
                  As proposed by National Assessment and Accreditation Council (NAAC), C.K.Pithawalla Institute of Pharmaceutical Science and Research established Internal Quality Assurance Cell (IQAC) as a quality sustenance measure.
                </p>
              </div>

              {/* Quality Key Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-mono text-slate-400 block font-semibold">Established As</span>
                  <span className="text-xs sm:text-sm font-sans font-bold text-slate-800">Quality Measure</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-mono text-slate-400 block font-semibold">Guidelines</span>
                  <span className="text-xs sm:text-sm font-sans font-bold text-slate-800">NAAC Standards</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-mono text-slate-400 block font-semibold">Reporting</span>
                  <span className="text-xs sm:text-sm font-sans font-bold text-slate-800">Annual AQAR</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[360px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200">
              <img
                src="/images/hero/college_campus.jpg"
                alt="CKPIPSR Campus IQAC Quality Standards"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 mb-1">
                  <Building2 size={14} />
                  <span>CKPIPSR Surat Campus</span>
                </div>
                <p className="text-xs font-sans text-slate-200 font-medium">
                  Committed to academic rigor, outcome-based education, and continual quality enhancement.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* IQAC Vision Section */}
        <div className="bg-gradient-to-br from-[#1a5d2e] via-[#1e6f37] to-[#144723] rounded-3xl p-7 sm:p-9 text-white shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-xs font-mono font-bold uppercase tracking-wider text-emerald-100">
              <Sparkles size={14} className="text-amber-300" />
              <span>Visionary Statement</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              IQAC – Vision
            </h3>

            <blockquote className="text-base sm:text-lg lg:text-xl font-serif font-normal text-emerald-50 leading-relaxed italic border-l-3 border-amber-400 pl-4 py-1">
              "To promote quality culture as the prime concern through institutionalizing and internalizing all the quality-enhancing and sustaining initiatives taken with internal and external support."
            </blockquote>
          </div>
        </div>

        {/* Objectives Section with Image Card */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                <Target size={22} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  Institutional Goals
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Objectives
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-center">
              8 Core Objectives
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Image Showcase Card */}
            <div className="lg:col-span-4 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
              <div className="relative h-56 sm:h-64 lg:h-72 w-full bg-slate-100">
                <img
                  src="/images/hero/students_learning.jpg"
                  alt="Students Learning and Quality Education at CKPIPSR"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-mono font-bold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                    Learner-Centric Quality
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 bg-gradient-to-b from-white to-slate-50 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                    Excellence in Pharmaceutical Pedagogy
                  </h4>
                  <p className="text-xs font-sans text-slate-600 leading-relaxed">
                    IQAC systematically integrates modern pedagogical tools, objective outcome-based assessments, and infrastructure adequacy across pharmacy programmes.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2 text-xs font-sans text-[#1a5d2e] font-semibold">
                  <CheckCircle2 size={15} />
                  <span>Periodic Reviews & Continuous Improvement</span>
                </div>
              </div>
            </div>

            {/* Right Objectives Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {objectives.map((obj) => (
                <div
                  key={obj.id}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 space-y-2.5 flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#1a5d2e] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        Objective {obj.id}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-[#1a5d2e]/40 group-hover:bg-[#1a5d2e] transition-colors" />
                    </div>

                    <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                      {obj.title}
                    </h4>

                    <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed font-normal">
                      {obj.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-sans text-slate-400">
                    <CheckCircle2 size={12} className="text-[#1a5d2e]" />
                    <span>Quality Sustenance Benchmark</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Functions Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center font-bold">
                <Layers size={22} className="text-amber-800" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wider block">
                  Operational Responsibilities
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Functions
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 self-start sm:self-center">
              11 Key Functions
            </span>
          </div>

          {/* Functions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {functions.map((func) => {
              const Icon = func.icon;
              return (
                <div
                  key={func.no}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-emerald-50 text-slate-700 group-hover:text-[#1a5d2e] border border-slate-200 group-hover:border-emerald-200 flex items-center justify-center transition-colors">
                        <Icon size={18} />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#1a5d2e] transition-colors">
                        #{func.no < 10 ? `0${func.no}` : func.no}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-serif font-bold text-slate-900 text-base group-hover:text-[#1a5d2e] transition-colors">
                        {func.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed font-normal">
                        {func.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-sans text-slate-400">
                    <Sparkles size={12} className="text-amber-500" />
                    <span>Continuous Quality Assurance</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Laboratory & Research Infrastructure Supporting Quality Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 overflow-hidden relative border border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-mono font-bold border border-white/15 uppercase">
                <Cpu size={14} />
                <span>State-of-the-Art Research Ecosystem</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Quality Sustenance through Advanced Infrastructure
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed max-w-2xl">
                CKPIPSR maintains high standards in teaching laboratories, medicinal chemistry discovery facilities, animal research wings, and automated MIS databases to sustain NAAC quality parameters.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <BarChart3 size={18} />
                </div>
                <div className="text-xs font-sans">
                  <strong className="text-white block font-semibold">Academic Audits</strong>
                  <span className="text-slate-400">Periodic AAA reviews & action plans</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <FileCheck2 size={18} />
                </div>
                <div className="text-xs font-sans">
                  <strong className="text-white block font-semibold">NAAC AQAR Reports</strong>
                  <span className="text-slate-400">Timely institutional compliance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
