import React, { useState } from "react";
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

export default function Alumni() {
  const [activeTab, setActiveTab] = useState<"about" | "rules" | "managing" | "executive" | "registration">("about");

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "Male",
    degree: "B.Pharm",
    passingYear: "2023",
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

  // Verbatim Objectives from User Screenshot
  const objectives = [
    "To promote and provide services for its alumni, especially encouraging their continuing growth, personally and professionally, and a spirit of fraternity among alumni.",
    "To assist in placement of students.",
    "To create awareness about institute and its alumni.",
    "To collect/publish useful information to members of CKPIPSRAA.",
    "To recognize the distinguished services of its alumni through awards.",
    "To collect and maintain funds for development.",
    "To foster a spirit of loyalty in the Alumni to both for GTU and the graduating Institute.",
    "To strengthen the ties between alumni, the community, and the organization, where the alumni may be working.",
    "To help alumni in their need.",
    "To organize cultural and social activities, to set up facilities, which can help bring together the alumni and the CKPIPSR community."
  ];

  // Comprehensive Constitution, Rules & Regulations from Official CKPIPSRAA Charter
  const aimsAndObjectives = [
    "To start, promote and maintain interaction amongst alumni as well as between the alumni and present students of CKPIPSR, Surat for their mutual benefit.",
    "To encourage and appeal the alumni to take active interest in the activities leading to the progress of the institute",
    "To generate and organize the funds for the benefit of the students which may be partially utilized for scholarship to the needy and deserving students, book banks, loans and co-curricular activities",
    "To invest and maintain accounts of the funds of the CKPIPSRAA.",
    "To organize the social welfare activities for the benefit of the society as a part of nation building.",
    "To motivate the alumni and students by recognizing and awarding for their outstanding contribution/performance in (i) research, (ii) technical events, (iii) sports, and (iv) social services.",
    "To organize get-together of all members to provide the common platform for interaction and sharing of the expertise, experience and views of the members leading to mutual development.",
    "To take up all those activities which are directly or indirectly helping the students in their (i) training and placement, (ii) entrepreneurial skill development and (iii) higher studies in India and abroad",
    "To take-up all other lawful activities leading to the attainment of the above stated objectives and/or beneficial to the institute, its students and its alumni"
  ];

  const membershipRules = {
    eligibility: [
      "Any past student of CKPIPSR, Surat",
      "All the students of CKPIPSR, Surat passing their final semester examination"
    ],
    fees: [
      "For the official life membership of the CKPIPSRAA, eligible candidates are required to submit duly filled membership form to the member secretary along with the one time life membership fees of; Rupees 1000/- for the current and past students.",
      "From the New Entrants to the institute, Rs. 1000/- will be collected towards the alumni association fees by CKPIPSRAA. After passing the final year examinations, student will automatically become life member of the CKPIPSR, on submission of the registration form."
    ],
    rights: [
      "Members and are entitled to receive all announcements and news letters related to the CKPIPSRAA activities.",
      "Members are entitled to receive annual e-magazine of institute.",
      "Members are entitled to attend and participate in the get-togethers organized by CKPIPSRAA.",
      "Members are entitled to take an advantage of any schemes and programs administered by CKPIPSRAA.",
      "With the wide spread and easy access of the Internet, website for the CKPIPSR should be updated to include CKPIPSRAA portal and all the announcement and publication on CKPIPSRAA portal shall be considered as official circulation amongst all the members of CKPIPSRAA."
    ]
  };

  const managingCommitteeRoles = [
    {
      role: "Chairman",
      responsibility: "Trust’s Chairman’s Representative will be the ex-officio Chairman of the CKPIPSRAA. The chairman will be responsible for policy formation in consultation with other members of the Managing Committee."
    },
    {
      role: "President",
      responsibility: "President is responsible for implementation of all the policy matters of the CKPIPSRAA. President will also act as an administrator, coordinator and supervisor for the activities and programs of CKPIPSRAA. Specifically, President will act as a facilitator for the Member Secretary for smooth conductance of the Managing Committee activities."
    },
    {
      role: "Vice President",
      responsibility: "Chairman shall appoint Distinguished Alumnus as a Vice President in consultation with other members of the Managing Committee. Vice President will not have any administrative responsibility but he will act as a consultant for CKPIPSRAA. Vice President Term will be of three-years at a time."
    },
    {
      role: "Member Secretary",
      responsibility: "Secretary shall perform the following statutory duties:",
      duties: [
        "Register the eligible candidates for CKPIPSRAA",
        "Maintain the records of registration forms",
        "Maintain and update the registration records",
        "To maintain administrative control over the CKPIPSRAA office",
        "To correspond with stakeholders on behalf of CKPIPSRAA",
        "To issue the notice of all the managing committee meeting along with agenda on time (at least 15 days before the schedule of meeting)",
        "To keep the prepare, circulate and maintain the minutes of all the meetings of managing committee of CKPIPSRAA",
        "To act as a medium of communication between the members and office bearers of the managing committee",
        "To look after the maintenance and updating of web portal of CKPIPSRAA for which he will be provided the manpower from the concern department"
      ]
    },
    {
      role: "Treasurer",
      responsibility: "Treasurer shall prepare the books of accounts of CKPIPSRAA at the end of the every financial year and present the same to the Managing Committee. Treasurer will manage for collection of all the dues and issue of out standings on behalf of CKPIPSRAA. In addition, he will act as a liaison officer with bankers and auditors on behalf of CKPIPSRAA."
    },
    {
      role: "Student Representative",
      responsibility: "Student representative will have a vote in the activities of managing committee. Student representative is responsible for the wide spread of the objective of the CKPIPSRAA amongst the new entrants. As a General Secretary of the student council of the institute, he shall act a initiator and leader for planning of the various activities in line with the objectives of CKPIPSRAA and in communication with the Chairman, President and Member Secretary of the CKPIPSRAA. Student Representative shall take active participation in formation of students’ organizing committees for the various activities of CKPIPSRAA and also act as a motivator for these committees."
    },
    {
      role: "General Body",
      responsibility: "General body shall consist of all the members of the association as defined in clause 4."
    }
  ];

  const managingCommitteePowers = [
    "Member secretary shall call Managing Committee meeting at least two times every year.",
    "Managing committee shall prepare activity plan for the every year well in advance",
    "Managing committee shall allocate the budget for the activities mentioned in the planned",
    "Authorized signatories of the Managing Committee shall carryout financial transactions with banks or any other statutory bodies",
    "Any member of the managing committee in power is authorized to make new members based on the clause 4",
    "Managing committee shall frame sub committees for any specific programs or project from time to time",
    "Managing committee may discontinue any member from CKPIPSRAA if found doing the activities against the interest or prestige of the CKPIPSRAA or institute",
    "Managing committee has a power to modify or remove any rules specified in this document or to frame new rules from time to time, if found appropriate for effective working of CKPIPSRAA",
    "Managing committee has a power to take up the purchase/contracting procedures as well as to decide and pay the fees for the services rendered by the person or organizations within the rules of the institution."
  ];

  const agmDuties = [
    "To present and review the report of the managing committee",
    "To elect the vice president for the term of three years",
    "Approve the previous year’s account",
    "Introducing and adopting office bearers",
    "To take up any other matters included in notice of the meeting"
  ];

  // Managing Committee Members
  const managingCommittee = [
    {
      role: "Chairman",
      name: "Shri Rahulbhai Pithawalla",
      designation: "Trustee, Navyug Vidyabhavan Trust",
      image: "https://ckpipsr.ac.in/images/trustees/rahul-a-p.jpg",
      category: "Trust Management"
    },
    {
      role: "President",
      name: "Dr. Dhiren P Shah",
      designation: "Principal, CKPIPSR",
      image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a7d896865a1e.webp",
      category: "Institutional Head"
    },
    {
      role: "Member Secretary",
      name: "Dr. Bhumika Desai",
      designation: "Assoc. Prof., CKPIPSR",
      image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a6308854a00a.webp",
      category: "Secretariat"
    },
    {
      role: "Vice President",
      name: "Bansari Patel",
      designation: "Alumni, CKPIPSR",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      category: "Alumni Leadership"
    },
    {
      role: "Treasurer",
      name: "Mr. Paresh G Shah",
      designation: "Senior Clerk",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      category: "Administration & Finance"
    },
    {
      role: "Ex-Officio Member",
      name: "Dr. Vinod Ramani",
      designation: "Assoc. Prof., CKPIPSR",
      image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/63abcf6a28997.webp",
      category: "Academic Faculty"
    },
    {
      role: "Faculty Coordinators",
      name: "Mrs. Kajal Solanki",
      designation: "Asst. Prof. CKPIPSR",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=400",
      category: "Faculty Coordination"
    },
    {
      role: "Faculty Coordinators",
      name: "Mrs. Tarkeshwari Ahire",
      designation: "Asst. Prof. CKPIPSR",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
      category: "Faculty Coordination"
    },
    {
      role: "Representative from student Council",
      name: "Mitali Patel",
      designation: "Alumni, CKPIPSR",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      category: "Student Council Rep"
    },
    {
      role: "Representative from student Council",
      name: "Madhu Hardik",
      designation: "Alumni, CKPIPSR",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      category: "Student Council Rep"
    },
    {
      role: "Representative from student Council",
      name: "Jayswal Vibha",
      designation: "Alumni, CKPIPSR",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      category: "Student Council Rep"
    }
  ];

  // Executive Committee Members
  const executiveMembers = [
    {
      role: "President",
      name: "Dr. Dhiren P Shah",
      designation: "Principal, CKPIPSR",
      image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a7d896865a1e.webp",
      category: "Institutional Head"
    },
    {
      role: "Vice President",
      name: "Feral Modi",
      designation: "Alumni, CKPIPSR",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      category: "Alumni Leadership"
    },
    {
      role: "Secretary",
      name: "Manish Solanki",
      designation: "Alumni, CKPIPSR,",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      category: "Alumni Secretariat"
    },
    {
      role: "Treasurer",
      name: "Hiren Thakkar",
      designation: "Alumni, CKPIPSR",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      category: "Finance & Accounts"
    },
    {
      role: "Program Committee",
      name: "Jaya Indave",
      designation: "Alumni, CKPIPSR",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      category: "Programs & Events"
    },
    {
      role: "Campaigning Committee",
      name: "Dipayan Tarafder",
      designation: "Asst. Prof. CKPIPSR",
      image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/62d678047de6f.webp",
      category: "Campaigning & Outreach"
    },
    {
      role: "Alumni Talk series Committee",
      name: "Ms. Shivangi Shrivastav",
      designation: "Asst. Prof. CKPIPSR",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      category: "Talk Series & Webinars"
    },
    {
      role: "Alumni Talk series Committee",
      name: "Mrs. Shweta Vaghela",
      designation: "Asst. Prof. CKPIPSR",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
      category: "Talk Series & Webinars"
    },
    {
      role: "Alumni membership and networking drive",
      name: "Dr. Bhumika Desai",
      designation: "Assoc. Prof., CKPIPSR",
      image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a6308854a00a.webp",
      category: "Membership & Networking"
    },
    {
      role: "Fund Raising Committee",
      name: "Dr. Vinod Ramani",
      designation: "Assoc. Prof., CKPIPSR",
      image: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/63abcf6a28997.webp",
      category: "Fund Raising"
    }
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 800);
  };

  return (
    <SubPageLayout
      title="Alumni"
      subtitle="Connecting Graduates, Mentoring Future Pharmacists & Celebrating Global Achievements"
      category="students-corner"
      activeItemLabel="Alumni"
    >
      <div className="space-y-8">
        
        {/* ── TOP HORIZONTAL NAV TABS (Matching User's Reference Layout) ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-1.5 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {[
            { id: "about", label: "About Alumni", icon: GraduationCap },
            { id: "rules", label: "Rules & Regulations", icon: ShieldCheck },
            { id: "managing", label: "Managing Committee", icon: Users },
            { id: "executive", label: "Executive Committee", icon: Layers },
            { id: "registration", label: "Registration", icon: FileText },
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
                        <span>Global Ambassador Network</span>
                      </div>
                      <p className="text-slate-800 text-base sm:text-lg font-serif font-semibold leading-snug">
                        Alumni are ambassadors of the Institute in the society and industry scattered over the world.
                      </p>
                    </div>

                    {/* Mission Quote Box */}
                    <div className="relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                      <div className="absolute top-4 right-4 text-[#d4af37]/30 font-serif text-5xl select-none">
                        “
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed italic font-serif">
                        "CKPIPSR aims to serve the needs of its alumni by helping them advance in their careers through working for satisfying their needs for knowledge inputs and through networking, to develop synergistic plans to support the institutions for achieving their mission, and to enable the institutes to add value to all its stake holders through the membership of CKPIPSR."
                      </p>
                    </div>

                    {/* Purpose Statement */}
                    <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-slate-800 text-sm leading-relaxed space-y-2">
                      <div className="flex items-center gap-2 font-serif font-bold text-[#1a5d2e]">
                        <Target size={16} />
                        <span>Purpose of Establishment</span>
                      </div>
                      <p className="text-slate-700 text-xs sm:text-[13.5px] leading-relaxed">
                        The purpose of establishing this Association is to help our alumni and to get the best out of creating network of all alumni.
                      </p>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="pt-4 border-t border-slate-200/70 grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="text-xl font-bold font-mono text-[#1a5d2e]">1500+</div>
                      <div className="text-[11px] text-slate-500 font-sans">Graduated Pharmacists</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="text-xl font-bold font-mono text-[#1a5d2e]">100%</div>
                      <div className="text-[11px] text-slate-500 font-sans">Placement Guidance</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Verbatim 10 Objectives */}
                <div className="lg:col-span-7 p-6 sm:p-9 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                        CKPIPSRAA Charter
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-slate-900">
                        Objectives
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                      10 Key Goals
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
                  <span>Join The Alumni Community</span>
                </div>
                <h4 className="text-xl font-serif font-bold text-slate-900">
                  Are You a CKPIPSR Graduate?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-sans">
                  Register with the C. K. Pithawalla Institute of Pharmaceutical Science and Research Alumni Association to stay connected with your batchmates, receive the e-bulletin, and mentor junior students.
                </p>
              </div>

              <button
                onClick={() => setActiveTab("registration")}
                className="px-6 py-3 rounded-xl bg-[#1a5d2e] text-white font-serif font-bold text-sm hover:bg-[#123a1a] transition-all shadow-md hover:shadow-lg flex items-center gap-2 shrink-0 group"
              >
                <span>Register as Alumni</span>
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
                      Official Institutional Constitution & Bye-Laws
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Rules & Regulations of CKPIPSRAA
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] font-mono text-xs font-semibold">
                  <FileText size={14} />
                  <span>Governing Charter</span>
                </div>
              </div>

              {/* 1. Name & 2. Office Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    <Landmark size={15} />
                    <span>1. Official Name</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900">
                    Association Nomenclature
                  </h4>
                  <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-sans">
                    The association shall be named as <strong className="text-slate-900 font-semibold">“C. K. Pithawalla Institute of Pharmaceutical Science and research Alumni Association”</strong>, hereafter referred to as <strong className="text-[#1a5d2e] font-mono">“CKPIPSRAA”</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    <MapPin size={15} />
                    <span>2. Registered Office</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900">
                    Location & Secretariat
                  </h4>
                  <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-sans">
                    Office of the CKPIPSRAA shall be located at <strong className="text-slate-900 font-semibold">C.K.Pithawalla Institute of Pharmaceutical Science & Research, Surat</strong>.
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
                    Clause 3
                  </span>
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    The Aims and Objectives
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
                      Clause 4
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      Membership Framework
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs font-bold">
                  ₹1,000/- One-Time Life Fee
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 4.1 Eligibility */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#1a5d2e] font-serif font-bold text-base">
                      <GraduationCap size={18} />
                      <h4>Eligibility</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {membershipRules.eligibility.map((item, i) => (
                        <li key={i} className="text-xs sm:text-[13px] text-slate-700 font-sans flex items-start gap-2">
                          <CheckCircle2 size={15} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-slate-200/70 text-[11.5px] font-mono text-slate-500">
                    Open to all CKPIPSR degree & diploma alumni.
                  </div>
                </div>

                {/* 4.2 Fees */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#1a5d2e] font-serif font-bold text-base">
                      <Coins size={18} />
                      <h4>Fees Structure</h4>
                    </div>
                    <div className="space-y-3 text-xs sm:text-[13px] text-slate-700 font-sans leading-relaxed">
                      <p className="p-3 bg-white rounded-xl border border-slate-200/90">
                        {membershipRules.fees[0]}
                      </p>
                      <p className="p-3 bg-white rounded-xl border border-slate-200/90">
                        {membershipRules.fees[1]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4.3 Rights */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#1a5d2e] font-serif font-bold text-base">
                      <Award size={18} />
                      <h4>Member Rights</h4>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-[12.5px] text-slate-700 font-sans leading-relaxed">
                      {membershipRules.rights.map((right, rIdx) => (
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
                    Clause 5
                  </span>
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    Organization Structure of the Managing Committee
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-sans italic">
                The method of election/selection of the office bearers and their responsibilities are defined in the following sub sections:
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

                    {item.duties && (
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
                      Clause 6
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                      Annual General Meeting (AGM)
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-[13px] text-slate-700 font-sans leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 font-medium text-slate-800">
                    Annual general meeting of the general body of CKPIPSRAA shall be called <strong>on or before 30th June</strong> of every year by member secretary.
                  </div>
                  <p className="px-1">
                    Member present will constitute the quorum and there will not be restriction on minimum/maximum number of members for the quorum.
                  </p>
                  
                  <div className="pt-2 space-y-2">
                    <div className="font-mono text-xs font-bold text-[#1a5d2e] uppercase">
                      Meeting shall statutorily consider the following:
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
                        Clause 7
                      </span>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                        Extra ordinary Meeting
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/70 text-xs sm:text-[13.5px] text-slate-800 font-sans leading-relaxed space-y-3">
                    <p>
                      Member secretary of CKPIPSRAA shall call an extra ordinary meeting upon receipt of request from the president of CKPIPSRAA or from <strong>at least 10 percent of the members</strong> of the CKPIPSRAA.
                    </p>
                    <p className="p-3 bg-white rounded-xl border border-amber-200/80 font-medium">
                      Such a meeting shall be called <strong>within 45 days</strong> from the date of receipt of such a request and shall discuss only for agenda stated in the request. However, any other agenda may be taken up with the permission of the chairperson of the meeting.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 flex items-center gap-2">
                  <Clock size={15} className="text-[#1a5d2e]" />
                  <span>Notice Timelines: Minimum 15 days written notification for meetings</span>
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
                      Clause 8
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      Managing Committee Meetings & Executive Powers
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#1a5d2e] font-mono text-xs font-bold border border-emerald-200">
                  Minimum 2 Meetings / Year
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

            {/* 9. Infrastructure, 10. Accounts, 11. Chairperson & 12. Winding-up Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 9. Infrastructure */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  <Building size={16} />
                  <span>Clause 9: Infrastructure</span>
                </div>
                <h4 className="text-base font-serif font-bold text-slate-900">
                  Institutional Facilities & Secretariat
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                  Managing committee will request the management of C. K. Pithawalla Institute of Pharmaceutical Science and Research for providing the office space with necessary facilities for communication and record storage and space for meeting for administering the CKPIPSRAA.
                </p>
              </div>

              {/* 10. Accounts */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  <Receipt size={16} />
                  <span>Clause 10: Accounts</span>
                </div>
                <h4 className="text-base font-serif font-bold text-slate-900">
                  Bank Account & Financial Auditing
                </h4>
                <div className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <p>
                    • Separate account should be open-up in any nationalized bank and maintained in the name of <strong className="text-slate-900">"C. K. Pithawalla Institute of Pharmaceutical Science and research Alumni Association"</strong>.
                  </p>
                  <p>
                    • All the financial transaction shall be carryout as per the institute norms.
                  </p>
                  <p>
                    • Treasurer shall maintain the book of accounts of CKPIPSRAA and shall present the same to the managing committee at the end of each financial year for its approval.
                  </p>
                  <p>
                    • The managing committee is responsible for the books of accounts of the CKPIPSRAA, in case of any query, dispute or legal matters, managing committee members are jointly responsible.
                  </p>
                </div>
              </div>

              {/* 11. Chairperson at Meeting */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  <Users size={16} />
                  <span>Clause 11: Chairperson at Meeting</span>
                </div>
                <h4 className="text-base font-serif font-bold text-slate-900">
                  Meeting Presiding Authority & Decision Making
                </h4>
                <div className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <p>
                    • President of CKPIPSRAA or his or her nominee shall act as a chairperson at all the meetings of the CKPIPSRAA.
                  </p>
                  <p>
                    • All the decision in the AGM/Special Meeting should be taken by the simple majority of the members present in the meeting. In case of tie, President will have casting vote.
                  </p>
                </div>
              </div>

              {/* 12. Winding-up of CKPIPSRAA */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                  <Scale size={16} />
                  <span>Clause 12: Winding-up of CKPIPSRAA</span>
                </div>
                <h4 className="text-base font-serif font-bold text-slate-900">
                  Asset Transfer & Dissolution
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans bg-amber-50/40 p-4 rounded-2xl border border-amber-200/60">
                  In case of the winding-up of the CKPIPSRAA upon decision of the Chairman of CKPIPSRAA, any surplus fund or properties after meeting all the liabilities of the CKPIPSRAA shall be automatically comes under the ownership of the <strong className="text-slate-900">C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat</strong> to be utilized for the objectives inline with the objectives of the CKPIPSRAA.
                </p>
              </div>
            </div>

            {/* Official Footer Banner */}
            <div className="bg-[#fbf9f4] border border-[#d4af37]/40 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#1a5d2e]" />
                <span>CKPIPSRAA Registered Bye-Laws • Navyug Vidyabhavan Trust</span>
              </div>
              <span className="font-bold text-[#1a5d2e]">Registered Secretariat: Surat, Gujarat, India</span>
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
                      Institutional Governance & Office Bearers
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      CKPIPSRAA Managing Committee
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] font-mono text-xs font-semibold">
                  <UserCheck size={14} />
                  <span>11 Committee Members</span>
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
                <span>Executive Managing Body formed as per Clause 5 of CKPIPSRAA Constitution</span>
              </div>
              <span className="font-bold text-[#1a5d2e]">Secretariat: alumni@ckpipsr.ac.in</span>
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
                      Operational Body & Portfolio Committees
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Alumni Executive Committee
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] font-mono text-xs font-semibold">
                  <UserCheck size={14} />
                  <span>10 Executive Members</span>
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
                <span>Executive Operations & Event Wings • CKPIPSRAA</span>
              </div>
              <span className="font-bold text-[#1a5d2e]">Contact: alumni@ckpipsr.ac.in</span>
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
                      CKPIPSRAA Directory
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Alumni Membership Registration
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#1a5d2e] text-xs font-mono font-bold">
                  Free Lifetime
                </span>
              </div>

              {formSubmitted ? (
                <div className="p-8 sm:p-12 text-center rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-4 max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-full bg-[#1a5d2e] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-serif font-bold text-2xl text-slate-900">
                    Registration Submitted!
                  </h4>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your alumni record has been registered with the CKPIPSR Alumni Association (CKPIPSRAA). We will contact you regarding upcoming alumni reunions, bulletins, and mentorship drives.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        gender: "Male",
                        degree: "B.Pharm",
                        passingYear: "2023",
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
                    Submit Another Entry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal & Academic Information */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <span>1. Personal & Academic Details</span>
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
                          <option value="B.Pharm">Bachelor of Pharmacy (B.Pharm)</option>
                          <option value="M.Pharm - Pharmaceutics">M.Pharm (Pharmaceutics)</option>
                          <option value="M.Pharm - Pharmacology">M.Pharm (Pharmacology)</option>
                          <option value="M.Pharm - QA">M.Pharm (Quality Assurance)</option>
                          <option value="D.Pharm">Diploma in Pharmacy (D.Pharm)</option>
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
                          {Array.from({ length: 20 }, (_, i) => 2026 - i).map((yr) => (
                            <option key={yr} value={yr.toString()}>
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
                      <span>2. Current Professional Status</span>
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
                      <span>3. How Would You Like to Contribute to CKPIPSR?</span>
                      <div className="flex-1 h-px bg-slate-100" />
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Conducting Expert Talks & Webinars",
                        "Mentoring Final Year Students",
                        "Campus Placement & Internship Referrals",
                        "Industry Visits & Industrial Projects",
                        "GPAT / Higher Study Guidance",
                        "Sponsoring Student Awards & Scholarships"
                      ].map((item) => {
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
                          <span>Submit Alumni Registration</span>
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
