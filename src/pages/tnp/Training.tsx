import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Sparkles, 
  Target, 
  BookOpen, 
  Cpu, 
  Globe2, 
  Users, 
  TrendingUp, 
  Compass, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Check, 
  Layers, 
  ExternalLink,
  CheckCircle,
  FlaskConical,
  Microscope,
  Network
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface TrainingCommitteeMember {
  id: number;
  role: "Chairperson" | "Coordinator" | "Member";
  name: string;
  designation: string;
  contactNo: string;
  email: string;
  image: string;
  department: string;
  badgeClass: string;
}

const committeeMembers: TrainingCommitteeMember[] = [
  {
    id: 1,
    role: "Chairperson",
    name: "Dr. Dhiren P. Shah",
    designation: "Principal",
    contactNo: "9427474602",
    email: "dhiren.shah@ckpipsr.ac.in",
    image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a7d896865a1e.webp",
    department: "Institutional Leadership & Administration",
    badgeClass: "bg-[#1a5d2e] text-white"
  },
  {
    id: 2,
    role: "Coordinator",
    name: "Dr. Vinod D. Ramani",
    designation: "Associate Professor",
    contactNo: "9913792913",
    email: "vinod.ramani@ckpipsr.ac.in",
    image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/63abcf6a28997.webp",
    department: "Department of Pharmaceutics",
    badgeClass: "bg-emerald-100 text-emerald-900 border border-emerald-300"
  },
  {
    id: 3,
    role: "Member",
    name: "Dr. Suchi P. Desai",
    designation: "Assistant Professor",
    contactNo: "8733826684",
    email: "suchi.desai@ckpipsr.ac.in",
    image: "https://ckpipsr.ac.in/images/about/shuchi-desai.png",
    department: "Department of Pharmaceutical Chemistry",
    badgeClass: "bg-slate-100 text-slate-800 border border-slate-200"
  },
  {
    id: 4,
    role: "Member",
    name: "Mr. Yahya A. Moolla",
    designation: "Assistant Professor",
    contactNo: "7201932423",
    email: "yahya.moolla @ckpipsr.ac.in",
    image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/62d543b19366a.webp",
    department: "Department of Pharmaceutics",
    badgeClass: "bg-slate-100 text-slate-800 border border-slate-200"
  },
  {
    id: 5,
    role: "Member",
    name: "Ms. Kinjal S. Gamit",
    designation: "Assistant Professor",
    contactNo: "9687198278",
    email: "kinjal.gamit@ckpipsr.ac.in",
    image: "https://ui-avatars.com/api/?name=Kinjal+Gamit&background=1a5d2e&color=ffffff&size=256",
    department: "Department of Pharmacology",
    badgeClass: "bg-slate-100 text-slate-800 border border-slate-200"
  }
];

const trainingObjectives = [
  {
    id: 1,
    title: "Practical application of theoretical knowledge",
    description:
      "Industrial training aims to bridge the gap between theoretical learning and practical implementation. It allows students to apply the knowledge and skills they have acquired during their academic studies in a real work environment.",
    icon: FlaskConical,
    tag: "Theory to Practice",
    color: "from-blue-500/10 to-indigo-500/5",
    border: "border-blue-200",
    iconBg: "bg-blue-50 text-blue-700",
    image: "/images/hero/pharmacy_lab.jpg"
  },
  {
    id: 2,
    title: "Skill development",
    description:
      "The training provides an opportunity for students to develop and enhance their technical, professional, and interpersonal skills. They can learn new techniques, tools, and methodologies relevant to their field of study, and acquire valuable industry-specific skills.",
    icon: Cpu,
    tag: "Core Competency",
    color: "from-emerald-500/10 to-teal-500/5",
    border: "border-emerald-200",
    iconBg: "bg-emerald-50 text-[#1a5d2e]",
    image: "/images/hero/students_learning.jpg"
  },
  {
    id: 3,
    title: "Industry exposure and understanding",
    description:
      "Industrial training offers students the chance to gain exposure to the industry they are interested in. They can observe and understand the organizational structure, work processes, and culture of the industry, as well as the roles and responsibilities of different professionals.",
    icon: Building2,
    tag: "Corporate Culture",
    color: "from-purple-500/10 to-pink-500/5",
    border: "border-purple-200",
    iconBg: "bg-purple-50 text-purple-700",
    image: "/images/hero/66e153e687221.webp"
  },
  {
    id: 4,
    title: "Networking opportunities",
    description:
      "During industrial training, students can establish connections and build relationships with professionals in their field of interest. These connections can be beneficial for future career prospects, such as obtaining references or job opportunities.",
    icon: Network,
    tag: "Professional Connect",
    color: "from-amber-500/10 to-orange-500/5",
    border: "border-amber-200",
    iconBg: "bg-amber-50 text-amber-700",
    image: "/images/hero/66e151f0d6a90.webp"
  },
  {
    id: 5,
    title: "Employability and career readiness",
    description:
      "The overall objective of industrial training is to enhance the employability of students and prepare them for their future careers. By gaining practical experience and industry exposure, students become more attractive to potential employers and better equipped to enter the workforce.",
    icon: Briefcase,
    tag: "Workforce Readiness",
    color: "from-emerald-500/10 to-green-500/5",
    border: "border-emerald-200",
    iconBg: "bg-emerald-50 text-emerald-700",
    image: "/images/hero/66e154b724ef6.webp"
  },
  {
    id: 6,
    title: "Self-assessment and personal growth",
    description:
      "Industrial training provides a platform for students to assess their strengths, weaknesses, and areas for improvement. They can identify their interests and aptitudes, and gain valuable insights into their career preferences and goals.",
    icon: Compass,
    tag: "Personal Evolution",
    color: "from-rose-500/10 to-red-500/5",
    border: "border-rose-200",
    iconBg: "bg-rose-50 text-rose-700",
    image: "/images/hero/college_campus.jpg"
  }
];

export default function Training() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <SubPageLayout
      title="Training"
      subtitle="Training & Placement Cell – Industrial Training, Student Internships & Professional Development"
      category="tnp"
      activeItemLabel="Training"
    >
      <div className="space-y-12 max-w-6xl mx-auto">
        
        {/* Section 1: Overview & Vision */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <Briefcase size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  Training & Placement Cell
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  Industrial Training & Practical Experience
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                Est. 2005 • South Gujarat
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                Industry-Aligned Learning
              </span>
            </div>
          </div>

          {/* User Provided Exact Introduction Content */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-slate-50 to-white border border-emerald-200/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Vision & Institutional Commitment</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-slate-800 leading-relaxed font-normal">
              C. K. Pithawala Institute of Pharmaceutical Science and Research Being a leading and renowned Pharmacy institute in south Gujarat zone since 2005. We have a vision Committed to promote high- quality education, training, and research in pharmacy to meet the needs of tomorrow’s healthy society. We believe that the End product of our educational system is students and we are always having a strong desire to prepare our students as per requirement of the industry. Therefore, during the study period, our schedule comprised of industrial visits /Industrial Experience /Training and as well as encourage to take part in various seminars/conferences to update them with advancement in the pharma sector.
            </p>
          </div>

          {/* Visual Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                <Building2 size={16} className="text-[#1a5d2e]" />
                <span>Industrial Exposure</span>
              </div>
              <strong className="text-base font-serif font-bold text-slate-900 block">
                Plant Visits & In-Plant Training
              </strong>
              <p className="text-xs text-slate-600 font-sans">
                Direct engagement with cGMP-certified manufacturing and formulation units.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                <Microscope size={16} className="text-blue-600" />
                <span>Seminars & Conferences</span>
              </div>
              <strong className="text-base font-serif font-bold text-slate-900 block">
                Academic & Technical Forums
              </strong>
              <p className="text-xs text-slate-600 font-sans">
                Continuous knowledge updating through national & state pharmaceutical symposia.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                <Award size={16} className="text-purple-600" />
                <span>Career Readiness</span>
              </div>
              <strong className="text-base font-serif font-bold text-slate-900 block">
                Industry-Ready Graduates
              </strong>
              <p className="text-xs text-slate-600 font-sans">
                Hands-on skillset matching contemporary requirements of pharmaceutical recruiters.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Objectives of Industrial Training with Images */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                Pedagogical Framework
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Objectives of Industrial Training
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200 self-start sm:self-auto">
              6 Core Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingObjectives.map((obj, idx) => {
              const IconComp = obj.icon;
              return (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  className="group bg-white hover:bg-gradient-to-b hover:from-emerald-50/30 hover:to-white rounded-3xl border border-slate-200 hover:border-[#1a5d2e]/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Card Image */}
                    <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                      <img
                        src={obj.image}
                        alt={obj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/hero/pharmacy_lab.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                        {obj.tag}
                      </span>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                        <div className="w-7 h-7 rounded-lg bg-[#1a5d2e] text-white flex items-center justify-center shadow-xs">
                          <IconComp size={15} />
                        </div>
                        <span className="text-xs font-mono font-bold tracking-wide">
                          Objective 0{obj.id}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-[#1a5d2e] transition-colors leading-snug">
                        {obj.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed font-normal">
                        {obj.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-[#1a5d2e] font-semibold">
                      <CheckCircle2 size={13} />
                      <span>CKPIPSR Curricular Goal</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Committee Members Cards with Small Image */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
              Executive Leadership
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Committee Members
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {committeeMembers.map((member, index) => {
              const phoneId = `phone-${member.id}`;
              const emailId = `email-${member.id}`;

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className={`group bg-white hover:bg-gradient-to-b hover:from-emerald-50/20 hover:to-white rounded-3xl border ${
                    member.role === "Chairperson"
                      ? "border-[#1a5d2e]/40 shadow-sm ring-1 ring-[#1a5d2e]/20"
                      : "border-slate-200 hover:border-[#1a5d2e]/40 shadow-xs"
                  } p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md`}
                >
                  <div className="space-y-4">
                    {/* Top Role Badge & Image */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full shadow-2xs ${member.badgeClass}`}>
                        {member.role}
                      </span>
                      {member.role === "Chairperson" && (
                        <span className="text-[11px] font-mono text-[#1a5d2e] font-semibold flex items-center gap-1">
                          <ShieldCheck size={13} />
                          <span>Head of Cell</span>
                        </span>
                      )}
                    </div>

                    {/* Small Member Image & Profile Information */}
                    <div className="flex items-center gap-3.5 pt-1">
                      {/* Small Image */}
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group-hover:border-[#1a5d2e]/40 shrink-0 shadow-2xs">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              member.name
                            )}&background=1a5d2e&color=ffffff&size=256`;
                          }}
                        />
                      </div>

                      <div className="space-y-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-[#1a5d2e] transition-colors leading-snug truncate">
                          {member.name}
                        </h4>
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                          {member.designation}
                        </span>
                      </div>
                    </div>

                    {/* Department */}
                    <div className="text-[11px] font-sans text-slate-500">
                      {member.department}
                    </div>

                    {/* Contact Channels */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      {/* Phone */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                        <a
                          href={`tel:${member.contactNo}`}
                          className="flex items-center gap-2 text-xs font-mono text-slate-800 hover:text-[#1a5d2e] font-semibold transition-colors"
                        >
                          <div className="w-6 h-6 rounded-md bg-white text-[#1a5d2e] flex items-center justify-center border border-slate-200 shadow-2xs">
                            <Phone size={12} />
                          </div>
                          <span>+91 {member.contactNo}</span>
                        </a>
                        <button
                          onClick={() => handleCopy(member.contactNo, phoneId)}
                          title="Copy Contact Number"
                          className="text-slate-400 hover:text-[#1a5d2e] p-1 rounded-md transition-colors cursor-pointer"
                        >
                          {copiedId === phoneId ? <Check size={14} className="text-[#1a5d2e]" /> : <Copy size={14} />}
                        </button>
                      </div>

                      {/* Email */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                        <a
                          href={`mailto:${member.email.trim()}`}
                          className="flex items-center gap-2 text-xs font-mono text-slate-800 hover:text-[#1a5d2e] font-medium transition-colors truncate"
                        >
                          <div className="w-6 h-6 rounded-md bg-white text-emerald-700 flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
                            <Mail size={12} />
                          </div>
                          <span className="truncate">{member.email}</span>
                        </a>
                        <button
                          onClick={() => handleCopy(member.email.trim(), emailId)}
                          title="Copy Email"
                          className="text-slate-400 hover:text-[#1a5d2e] p-1 rounded-md transition-colors shrink-0 cursor-pointer"
                        >
                          {copiedId === emailId ? <Check size={14} className="text-[#1a5d2e]" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`mailto:${member.email.trim()}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1a5d2e] hover:underline"
                    >
                      <span>Send Email</span>
                      <ExternalLink size={12} />
                    </a>
                    <a
                      href={`tel:${member.contactNo}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-[#1a5d2e]"
                    >
                      <span>Call</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Industrial Training Guidelines Summary Banner */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2 text-sm font-serif font-bold text-slate-900">
            <Building2 size={18} className="text-[#1a5d2e]" />
            <span>Industrial Training Coordination Office</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            The Industrial Training Committee coordinates with recognized pharmaceutical companies for mandatory student summer internships, plant visits, and hands-on skill development programs. Students can consult coordinator Dr. Vinod D. Ramani and committee members for training allotment and certificates.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#1a5d2e]" />
              <span>Training Cell: C.K. Pithawalla IP&SR Campus</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#1a5d2e]" />
              <span>Timings: Mon - Sat, 9:00 AM to 5:00 PM</span>
            </span>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
