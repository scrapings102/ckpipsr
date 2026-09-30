import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Users, 
  Award, 
  HeartHandshake, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Globe, 
  Building2, 
  Building,
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Send, 
  Sparkles, 
  Target, 
  Briefcase, 
  Calendar,
  CalendarDays,
  Layers,
  HelpCircle,
  Clock,
  ArrowRight,
  Scale,
  Landmark,
  Receipt,
  Vote,
  BookOpen,
  AlertCircle,
  Coins,
  ChevronRight,
  UserCheck
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useAlumniContent } from "../../hooks/useAlumniContent";

export default function Alumni() {
  const [activeTab, setActiveTab] = useState<"about" | "rules" | "managing" | "executive" | "registration">("about");

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "Male",
    degree: "",
    passingYear: "",
    enrollmentNo: "",
    currentDesignation: "",
    companyName: "",
    workCity: "",
    workCountry: "India",
    linkedinUrl: "",
    interests: [] as string[],
    message: ""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const content = useAlumniContent();
  const { about, rules, managing, executive, registration } = content;
  const objectives = about.objectives.items;
  const aimsAndObjectives = rules.aims.items;
  const membershipRules = rules.membership;
  const managingCommitteeRoles = rules.structure.roles;
  const managingCommitteePowers = rules.meetings.powers;
  const agmDuties = rules.agm.duties;
  const managingCommittee = managing.members;
  const executiveMembers = executive.members;

  // The years the form offers, newest first.
  const passingYears = useMemo(() => {
    const years: string[] = [];
    for (let year = registration.years.to; year >= registration.years.from; year -= 1) {
      years.push(String(year));
    }
    return years;
  }, [registration.years.from, registration.years.to]);

  // The two dropdowns start on the first thing the panel offers, once it has
  // arrived. Leaving them empty would post a blank degree.
  useEffect(() => {
    setFormData((prev) => {
      const degree = prev.degree || registration.degrees[0] || "";
      const passingYear = prev.passingYear || passingYears[0] || "";
      return degree === prev.degree && passingYear === prev.passingYear
        ? prev
        : { ...prev, degree, passingYear };
    });
  }, [registration.degrees, passingYears]);

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("/api/alumni/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registration: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            degree: formData.degree,
            passingYear: formData.passingYear,
            enrollmentNo: formData.enrollmentNo,
            designation: formData.currentDesignation,
            company: formData.companyName,
            workCity: formData.workCity,
            interests: formData.interests,
            message: formData.message,
          },
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        // 429 is the one-a-day limit; its message already says how long to wait.
        setFormError(body?.error ?? "That did not go through. Please try again.");
        return;
      }
      setFormSubmitted(true);
    } catch {
      setFormError("We could not reach the server. Please check your connection and try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="students-corner"
      activeItemLabel="Alumni"
    >
      <div className="space-y-8">
        
        {/* ── TOP HORIZONTAL NAV TABS (Matching User's Reference Layout) ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-1.5 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {[
            { id: "about", label: content.tabs.about, icon: GraduationCap },
            { id: "rules", label: content.tabs.rules, icon: ShieldCheck },
            { id: "managing", label: content.tabs.managing, icon: Users },
            { id: "executive", label: content.tabs.executive, icon: Layers },
            { id: "registration", label: content.tabs.registration, icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "text-[#1a5d2e] font-semibold bg-emerald-50/90 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon size={16} className={isActive ? "text-[#1a5d2e]" : "text-slate-400"} />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="alumniActiveUnderline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1a5d2e] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: ABOUT ALUMNI (EXACT CONTENT & OBJECTIVES FROM USER SCREENSHOT) ── */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* 2-Column Main Content Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                
                {/* Left Column: Vision & Narrative Statements */}
                <div className="lg:col-span-5 p-6 sm:p-9 space-y-6 bg-slate-50/30 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Ambassador Banner */}
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-semibold">
                        <Globe size={13} />
                        <span>{about.badge}</span>
                      </div>
                      <p className="text-slate-800 text-base sm:text-lg font-serif font-semibold leading-snug">
                        {about.lead}
                      </p>
                    </div>

                    {/* Mission Quote Box */}
                    <div className="relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                      <div className="absolute top-4 right-4 text-[#d4af37]/30 font-serif text-5xl select-none">
                        “
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed italic font-serif">
                        {about.quote}
                      </p>
                    </div>

                    {/* Purpose Statement */}
                    <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-slate-800 text-sm leading-relaxed space-y-2">
                      <div className="flex items-center gap-2 font-serif font-bold text-[#1a5d2e]">
                        <Target size={16} />
                        <span>{about.purpose.title}</span>
                      </div>
                      <p className="text-slate-700 text-xs sm:text-[13.5px] leading-relaxed">
                        {about.purpose.body}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  {about.highlights.length > 0 && (
                    <div className="pt-4 border-t border-slate-200/70 grid grid-cols-2 gap-3 text-center">
                      {about.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="p-3 bg-white rounded-xl border border-slate-200">
                          <div className="text-xl font-bold font-mono text-[#1a5d2e]">{highlight.value}</div>
                          <div className="text-[11px] text-slate-500 font-sans">{highlight.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Verbatim 10 Objectives */}
                <div className="lg:col-span-7 p-6 sm:p-9 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                        {about.objectives.kicker}
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-slate-900">
                        {about.objectives.heading}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                      {about.objectives.countLabel}
                    </span>
                  </div>

                  {/* Objective List Items */}
                  <div className="space-y-3.5">
                    {objectives.map((obj, index) => (
                      <div
                        key={index}
                        className="p-3.5 sm:p-4 rounded-xl bg-slate-50/60 hover:bg-emerald-50/40 border border-slate-100 hover:border-emerald-200 transition-all flex items-start gap-3.5 group"
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-100 group-hover:bg-[#1a5d2e] text-[#1a5d2e] group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                          <CheckCircle2 size={14} />
                        </div>
                        <p className="text-slate-800 text-xs sm:text-[13.5px] leading-relaxed font-sans font-medium">
                          {obj}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Action CTA Box */}
            <div className="bg-[#fbf9f4] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a5d2e]/10 text-[#1a5d2e] text-xs font-mono font-bold">
                  <Sparkles size={13} />
                  <span>{about.cta.badge}</span>
                </div>
                <h4 className="text-xl font-serif font-bold text-slate-900">
                  {about.cta.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-sans">
                  {about.cta.body}
                </p>
              </div>

              <button
                onClick={() => setActiveTab("registration")}
                className="px-6 py-3 rounded-xl bg-[#1a5d2e] text-white font-serif font-bold text-sm hover:bg-[#123a1a] transition-all shadow-md hover:shadow-lg flex items-center gap-2 shrink-0 group"
              >
                <span>{about.cta.buttonLabel}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: RULES & REGULATIONS (CONSTITUTION & BYE-LAWS) ── */}
        {activeTab === "rules" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Header / Intro Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {rules.kicker}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      {rules.heading}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] font-mono text-xs font-semibold">
                  <FileText size={14} />
                  <span>{rules.badge}</span>
                </div>
              </div>

              {/* 1. Name & 2. Office Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    <Landmark size={15} />
                    <span>{rules.name.kicker}</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900">
                    {rules.name.title}
                  </h4>
                  <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-sans">
                    {rules.name.body}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    <MapPin size={15} />
                    <span>{rules.office.kicker}</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900">
                    {rules.office.title}
                  </h4>
                  <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-sans">
                    {rules.office.body}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. The Aims and Objectives */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                  <Target size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    {rules.aims.kicker}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    {rules.aims.heading}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {aimsAndObjectives.map((aim, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50/60 hover:bg-emerald-50/30 border border-slate-100 hover:border-emerald-200 transition-all flex items-start gap-3.5 group"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#1a5d2e] group-hover:bg-[#1a5d2e] group-hover:text-white flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5 transition-colors">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-[13.5px] text-slate-800 leading-relaxed font-sans font-medium">
                      {aim}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Membership (Eligibility, Fees, Rights) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {rules.membership.kicker}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      {rules.membership.heading}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs font-bold">
                  {rules.membership.feeBadge}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 4.1 Eligibility */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#1a5d2e] font-serif font-bold text-base">
                      <GraduationCap size={18} />
                      <h4>{membershipRules.eligibility.title}</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {membershipRules.eligibility.items.map((item, i) => (
                        <li key={i} className="text-xs sm:text-[13px] text-slate-700 font-sans flex items-start gap-2">
                          <CheckCircle2 size={15} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-slate-200/70 text-[11.5px] font-mono text-slate-500">
                    {membershipRules.eligibility.note}
                  </div>
                </div>

                {/* 4.2 Fees */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#1a5d2e] font-serif font-bold text-base">
                      <Coins size={18} />
                      <h4>{membershipRules.fees.title}</h4>
                    </div>
                    <div className="space-y-3 text-xs sm:text-[13px] text-slate-700 font-sans leading-relaxed">
                      {membershipRules.fees.items.map((fee, fIdx) => (
                        <p key={fIdx} className="p-3 bg-white rounded-xl border border-slate-200/90">
                          {fee}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4.3 Rights */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#1a5d2e] font-serif font-bold text-base">
                      <Award size={18} />
                      <h4>{membershipRules.rights.title}</h4>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-[12.5px] text-slate-700 font-sans leading-relaxed">
                      {membershipRules.rights.items.map((right, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1a5d2e] shrink-0 mt-1.5" />
                          <span>{right}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Organization Structure of the Managing Committee */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                  <Users size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    {rules.structure.kicker}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    {rules.structure.heading}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-sans italic">
                {rules.structure.intro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {managingCommitteeRoles.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-3 ${
                      item.role === "Member Secretary"
                        ? "md:col-span-2 bg-emerald-50/30 border-emerald-200"
                        : "bg-slate-50/60 border-slate-200/80 hover:bg-white hover:border-[#1a5d2e]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg text-[#1a5d2e]">
                        {item.role}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-mono text-[11px] font-semibold">
                        Office Bearer
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-sans">
                      {item.responsibility}
                    </p>

                    {item.duties.length > 0 && (
                      <div className="pt-3 border-t border-emerald-100 space-y-2">
                        <div className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                          Statutory Secretarial Duties:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-sans">
                          {item.duties.map((duty, dIdx) => (
                            <div key={dIdx} className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-start gap-2">
                              <CheckCircle2 size={14} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                              <span className="leading-snug">{duty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Annual General Meeting & 7. Extraordinary Meeting */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AGM Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {rules.agm.kicker}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                      {rules.agm.heading}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-[13px] text-slate-700 font-sans leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 font-medium text-slate-800">
                    {rules.agm.highlight}
                  </div>
                  <p className="px-1">
                    {rules.agm.body}
                  </p>
                  
                  <div className="pt-2 space-y-2">
                    <div className="font-mono text-xs font-bold text-[#1a5d2e] uppercase">
                      {rules.agm.dutiesTitle}
                    </div>
                    <ul className="space-y-1.5">
                      {agmDuties.map((d, di) => (
                        <li key={di} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                          <CheckCircle2 size={14} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Extraordinary Meeting Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                        {rules.extraordinary.kicker}
                      </span>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                        {rules.extraordinary.heading}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/70 text-xs sm:text-[13.5px] text-slate-800 font-sans leading-relaxed space-y-3">
                    <p>
                      {rules.extraordinary.body}
                    </p>
                    <p className="p-3 bg-white rounded-xl border border-amber-200/80 font-medium">
                      {rules.extraordinary.highlight}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 flex items-center gap-2">
                  <Clock size={15} className="text-[#1a5d2e]" />
                  <span>{rules.extraordinary.note}</span>
                </div>
              </div>
            </div>

            {/* 8. Managing Committee Meeting */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <Vote size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {rules.meetings.kicker}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      {rules.meetings.heading}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#1a5d2e] font-mono text-xs font-bold border border-emerald-200">
                  {rules.meetings.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {managingCommitteePowers.map((power, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-[#1a5d2e]/30 transition-all flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-md bg-[#1a5d2e]/10 text-[#1a5d2e] flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                      {pIdx + 1}
                    </span>
                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans">
                      {power}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clauses 9 to 12: the small cards at the foot of the charter */}
            {rules.clauses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rules.clauses.map((clause, cIdx) => {
                  const amber = clause.tone === "amber";
                  return (
                    <div
                      key={cIdx}
                      className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3"
                    >
                      <div
                        className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider ${
                          amber ? "text-amber-800" : "text-[#1a5d2e]"
                        }`}
                      >
                        {amber ? <Scale size={16} /> : <Building size={16} />}
                        <span>{clause.kicker}</span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-slate-900">
                        {clause.title}
                      </h4>
                      <div
                        className={`text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans p-4 rounded-2xl border space-y-2 ${
                          amber ? "bg-amber-50/40 border-amber-200/60" : "bg-slate-50/70 border-slate-100"
                        }`}
                      >
                        {clause.paragraphs.map((paragraph, pIdx) => (
                          <p key={pIdx}>
                            {clause.paragraphs.length > 1 ? `• ${paragraph}` : paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Official Footer Banner */}
            <div className="bg-[#fbf9f4] border border-[#d4af37]/40 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#1a5d2e]" />
                <span>{rules.footer.left}</span>
              </div>
              <span className="font-bold text-[#1a5d2e]">{rules.footer.right}</span>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: MANAGING COMMITTEE ── */}
        {activeTab === "managing" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                    <Users size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {managing.kicker}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      {managing.heading}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] font-mono text-xs font-semibold">
                  <UserCheck size={14} />
                  <span>{managing.countLabel}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {managingCommittee.map((member, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Small Image */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-emerald-100 group-hover:border-[#1a5d2e]/40 shrink-0 bg-slate-100 shadow-2xs transition-colors">
                        <img
                          src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a5d2e&color=ffffff&size=200`}
                          alt={member.name}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a5d2e&color=ffffff&size=200`;
                          }}
                        />
                      </div>

                      {/* Role & Name */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-[#1a5d2e] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider max-w-full truncate">
                          {member.role}
                        </div>
                        <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#1a5d2e] transition-colors break-words">
                          {member.name}
                        </h4>
                      </div>
                    </div>

                    {/* Designation */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-start gap-2">
                      <Briefcase size={14} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-sans font-medium leading-relaxed">
                        {member.designation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Support Info */}
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#1a5d2e]" />
                <span>{managing.footer.left}</span>
              </div>
              <span className="font-bold text-[#1a5d2e]">{managing.footer.right}</span>
            </div>
          </motion.div>
        )}

        {/* ── TAB 4: EXECUTIVE COMMITTEE ── */}
        {activeTab === "executive" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                    <Layers size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {executive.kicker}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      {executive.heading}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] font-mono text-xs font-semibold">
                  <UserCheck size={14} />
                  <span>{executive.countLabel}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {executiveMembers.map((member, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Small Image */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-emerald-100 group-hover:border-[#1a5d2e]/40 shrink-0 bg-slate-100 shadow-2xs transition-colors">
                        <img
                          src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a5d2e&color=ffffff&size=200`}
                          alt={member.name}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a5d2e&color=ffffff&size=200`;
                          }}
                        />
                      </div>

                      {/* Role & Name */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-[#1a5d2e] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider max-w-full truncate">
                          {member.role}
                        </div>
                        <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#1a5d2e] transition-colors break-words">
                          {member.name}
                        </h4>
                      </div>
                    </div>

                    {/* Designation */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-start gap-2">
                      <Briefcase size={14} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-sans font-medium leading-relaxed">
                        {member.designation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Support Info */}
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#1a5d2e]" />
                <span>{executive.footer.left}</span>
              </div>
              <span className="font-bold text-[#1a5d2e]">{executive.footer.right}</span>
            </div>
          </motion.div>
        )}

        {/* ── TAB 5: REGISTRATION FORM ── */}
        {activeTab === "registration" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {registration.kicker}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      {registration.heading}
                    </h3>
                  </div>
                </div>
                {registration.badge && (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#1a5d2e] text-xs font-mono font-bold">
                    {registration.badge}
                  </span>
                )}
              </div>

              {formSubmitted ? (
                <div className="p-8 sm:p-12 text-center rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-4 max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-full bg-[#1a5d2e] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-serif font-bold text-2xl text-slate-900">
                    {registration.success.title}
                  </h4>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. {registration.success.body}
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormError("");
                      // Blank: the dropdowns fill themselves from the panel's
                      // lists again, as they did the first time.
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        gender: "Male",
                        degree: "",
                        passingYear: "",
                        enrollmentNo: "",
                        currentDesignation: "",
                        companyName: "",
                        workCity: "",
                        workCountry: "India",
                        linkedinUrl: "",
                        interests: [],
                        message: ""
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold hover:bg-slate-50 transition-all"
                  >
                    {registration.success.again}
                  </button>
                </div>
              ) : !registration.open ? (
                <div className="p-8 sm:p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-3 max-w-lg mx-auto">
                  <div className="w-14 h-14 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
                    <AlertCircle size={28} />
                  </div>
                  <p className="text-sm text-slate-700 font-sans leading-relaxed">
                    {registration.closedMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal & Academic Information */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <span>{registration.sections.personal}</span>
                      <div className="flex-1 h-px bg-slate-100" />
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Dr. Rajesh Patel"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/30 focus:border-[#1a5d2e]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. rajesh.patel@pharma.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/30 focus:border-[#1a5d2e]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/30 focus:border-[#1a5d2e]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                          Degree Completed *
                        </label>
                        <select
                          value={formData.degree}
                          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/30 focus:border-[#1a5d2e]"
                        >
                          {registration.degrees.map((degree) => (
                            <option key={degree} value={degree}>
                              {degree}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                          Year of Passing *
                        </label>
                        <select
                          value={formData.passingYear}
                          onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/30 focus:border-[#1a5d2e]"
                        >
                          {passingYears.map((yr) => (
                            <option key={yr} value={yr}>
                              {yr}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                          GTU Enrollment / Roll No (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.enrollmentNo}
                          onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
                          placeholder="e.g. 192540290001"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/30 focus:border-[#1a5d2e]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <span>{registration.sections.professional}</span>
                      <div className="flex-1 h-px bg-slate-100" />
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                          Current Designation *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.currentDesignation}
                          onChange={(e) => setFormData({ ...formData, currentDesignation: e.target.value })}
                          placeholder="e.g. Senior Research Scientist"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/30 focus:border-[#1a5d2e]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                          Organization / Company *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="e.g. Sun Pharma / Zydus / Torrent"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/30 focus:border-[#1a5d2e]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                          City & Country *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.workCity}
                          onChange={(e) => setFormData({ ...formData, workCity: e.target.value })}
                          placeholder="e.g. Ahmedabad, India / New Jersey, USA"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/30 focus:border-[#1a5d2e]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contribution & Engagement */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <span>{registration.sections.contribution}</span>
                      <div className="flex-1 h-px bg-slate-100" />
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {registration.interests.map((item) => {
                        const isChecked = formData.interests.includes(item);
                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() => handleInterestToggle(item)}
                            className={`p-3 rounded-xl border text-left text-xs font-sans transition-all flex items-start gap-2.5 ${
                              isChecked
                                ? "bg-emerald-50 border-[#1a5d2e] text-[#1a5d2e] font-semibold"
                                : "bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                              isChecked ? "bg-[#1a5d2e] border-[#1a5d2e] text-white" : "border-slate-300 bg-white"
                            }`}>
                              {isChecked && <CheckCircle2 size={12} />}
                            </div>
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* What went wrong, including the one-a-day limit */}
                  {formError && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-sans flex items-start gap-2.5">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="px-8 py-3.5 rounded-xl bg-[#1a5d2e] text-white font-serif font-bold text-sm hover:bg-[#123a1a] transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      {formSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={16} />
                          <span>{registration.submitLabel}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </SubPageLayout>
  );
}
