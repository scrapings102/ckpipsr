import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  UserCheck, 
  Phone, 
  Mail, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Compass, 
  Sparkles, 
  Lightbulb, 
  TrendingUp, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface CommitteeMember {
  id: number;
  role: "Chairperson" | "Coordinator" | "Member";
  name: string;
  designation: string;
  contactNo: string;
  email: string;
  department?: string;
  badgeColor: string;
}

const committeeMembers: CommitteeMember[] = [
  {
    id: 1,
    role: "Chairperson",
    name: "Dr. Dhiren P. Shah",
    designation: "Principal",
    contactNo: "9427474602",
    email: "dhiren.shah@ckpipsr.ac.in",
    department: "Institutional Leadership & Administration",
    badgeColor: "bg-[#1a5d2e] text-white"
  },
  {
    id: 2,
    role: "Coordinator",
    name: "Mr. Naishadh I. Solanki",
    designation: "Assistant Professor",
    contactNo: "9033080481",
    email: "Naishadh.solanki@ckpipsr.ac.in",
    department: "Training & Placement Cell Operations",
    badgeColor: "bg-emerald-100 text-emerald-900 border border-emerald-300"
  },
  {
    id: 3,
    role: "Member",
    name: "Mr. Dhaval B. Joshi",
    designation: "Assistant Professor",
    contactNo: "9537482224",
    email: "dhaval.joshi@ckpipsr.ac.in",
    department: "Corporate Liaison & Student Career Counseling",
    badgeColor: "bg-slate-100 text-slate-800 border border-slate-200"
  }
];

export default function Committee() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <SubPageLayout
      title="Committee"
      subtitle="Training & Placement Cell – Leadership, Coordinators & Career Guidance Committee"
      category="tnp"
      activeItemLabel="Committee"
    >
      <div className="space-y-10 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <Users size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  Training & Placement Cell
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  T&P Executive Committee
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                Constitutional Body
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                3 Key Officers
              </span>
            </div>
          </div>

          {/* User Provided Exact Introduction Paragraph */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-slate-50 to-white border border-emerald-200/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Cell Objective & Mission</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-slate-800 leading-relaxed font-normal">
              The Training and Placement cell of the college functions with the objective of providing guidance and assistance for the students to achieve their career goals. It provides awareness on Higher Education or Studies,Self-employment and Job opportunities.
            </p>
          </div>

          {/* 3 Core Pillars Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-emerald-300 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <GraduationCap size={18} />
              </div>
              <strong className="text-sm font-serif font-bold text-slate-900 block">
                Higher Education & Studies
              </strong>
              <p className="text-xs text-slate-600 font-sans leading-normal">
                Guidance for GPAT, NIPER-JEE, master's programs (M.Pharm, MBA) and international studies.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-emerald-300 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Lightbulb size={18} />
              </div>
              <strong className="text-sm font-serif font-bold text-slate-900 block">
                Self-Employment & Startups
              </strong>
              <p className="text-xs text-slate-600 font-sans leading-normal">
                Entrepreneurship mentoring, SSIP innovation grants, pharmacy retail & manufacturing setup.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-emerald-300 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center">
                <Briefcase size={18} />
              </div>
              <strong className="text-sm font-serif font-bold text-slate-900 block">
                Job Opportunities & Campus Drives
              </strong>
              <p className="text-xs text-slate-600 font-sans leading-normal">
                Placement drives, corporate recruiters liaison, resume building & mock interview sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Committee Members Cards Section Header */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
              Committee Members
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Official Committee Composition
            </h3>
          </div>

          {/* Professional Card Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {committeeMembers.map((member, index) => {
              const phoneId = `phone-${member.id}`;
              const emailId = `email-${member.id}`;

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`group bg-white hover:bg-gradient-to-b hover:from-emerald-50/20 hover:to-white rounded-3xl border ${
                    member.role === "Chairperson"
                      ? "border-[#1a5d2e]/40 shadow-sm ring-1 ring-[#1a5d2e]/20"
                      : "border-slate-200 hover:border-[#1a5d2e]/40 shadow-xs"
                  } p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md`}
                >
                  <div className="space-y-4">
                    {/* Top Role Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full shadow-2xs ${member.badgeColor}`}>
                        {member.role}
                      </span>
                      {member.role === "Chairperson" && (
                        <span className="text-[11px] font-mono text-[#1a5d2e] font-semibold flex items-center gap-1">
                          <ShieldCheck size={13} />
                          <span>Head of Cell</span>
                        </span>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="space-y-1.5 pt-1">
                      <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900 group-hover:text-[#1a5d2e] transition-colors leading-snug">
                        {member.name}
                      </h4>
                      <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                        {member.designation}
                      </div>
                    </div>

                    {/* Contact Channels */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      {/* Phone Number */}
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

                      {/* Email Address */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-xs font-mono text-slate-800 hover:text-[#1a5d2e] font-medium transition-colors truncate"
                        >
                          <div className="w-6 h-6 rounded-md bg-white text-emerald-700 flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
                            <Mail size={12} />
                          </div>
                          <span className="truncate">{member.email}</span>
                        </a>
                        <button
                          onClick={() => handleCopy(member.email, emailId)}
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
                      href={`mailto:${member.email}`}
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

        {/* Office & Cell Assistance Box */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2 text-sm font-serif font-bold text-slate-900">
            <Building2 size={18} className="text-[#1a5d2e]" />
            <span>Training & Placement Cell Office</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            Students seeking guidance regarding on-campus recruitment, industrial training, higher education counseling (GPAT / NIPER), or startup incubation support can reach out to the T&P Cell coordinators during institute working hours (Monday to Saturday, 9:00 AM to 5:00 PM).
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#1a5d2e]" />
              <span>Location: Ground Floor, Admin Block</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#1a5d2e]" />
              <span>C.K. Pithawalla IP&SR Campus, Surat</span>
            </span>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
