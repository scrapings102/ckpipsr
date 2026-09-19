import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Palette, 
  Camera, 
  Heart, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Users, 
  Award, 
  Compass, 
  Target, 
  Layers,
  HeartHandshake,
  Lightbulb,
  Music,
  Smile,
  ArrowRight,
  Cpu
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

export default function HobbyClub() {
  const [activeTab, setActiveTab] = useState<"about" | "clubs" | "rules">("about");

  const aimsAndObjectives = [
    {
      id: 1,
      text: "To provide a platform to convert passion into profession for the students.",
      icon: Target,
      highlight: "Passion to Profession"
    },
    {
      id: 2,
      text: "To reenergize students",
      icon: Sparkles,
      highlight: "Rejuvenation & Focus"
    },
    {
      id: 3,
      text: "To explore the hidden talents of students",
      icon: Compass,
      highlight: "Talent Discovery"
    },
    {
      id: 4,
      text: "To nurture imagination and creativity among students",
      icon: Lightbulb,
      highlight: "Creative Nurturing"
    },
    {
      id: 5,
      text: "To rediscover interests and strength of students.",
      icon: HeartHandshake,
      highlight: "Self Discovery"
    },
    {
      id: 6,
      text: "To Improve practical skills",
      icon: Layers,
      highlight: "Practical Skillset"
    },
    {
      id: 7,
      text: "To provide break from strenuous Life",
      icon: Smile,
      highlight: "Work-Life Balance"
    },
    {
      id: 8,
      text: "To widen friend circle among having similar interests .",
      icon: Users,
      highlight: "Peer Networking"
    },
    {
      id: 9,
      text: "To add strength in Curriculum vitae of students",
      icon: Award,
      highlight: "CV Enhancement"
    }
  ];

  const variousClubsData = [
    {
      id: "science-club",
      title: "Science Club",
      badge: "Innovation & Prototypes",
      icon: Cpu,
      image: "https://ckpipsr.ac.in/images/students/hobbyclub/science.png",
      description: "The main intention of the Science Club is to encourage, inspire and nurture young students by supporting them to work on new innovative ideas and transform them to prototypes for applicable manner. The students will get mentorship from industry experts, patent experts and alumni of the institution. There will be opportunity for the students to showcase their talents in Competitions."
    },
    {
      id: "arts-and-crafts-club",
      title: "Arts and Crafts Club",
      badge: "Creative & Performing Arts",
      icon: Palette,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
      description: "The purpose of the Performing Art Club is to make all round development of students. Through this club, students increase their confidence and expose them to different types of arts. Through the medium of this club, the quality of leadership comes to the student. Here mime, drama and poetry, story writing, debate, group discussion are connected in many ways."
    },
    {
      id: "photography-club",
      title: "Photography Club",
      badge: "Visual Storytelling",
      icon: Camera,
      image: "https://ckpipsr.ac.in/images/students/hobbyclub/photography.png",
      description: "Photography club is committed to promote photography skills among young generation. A world without photography is hard to imagine; photography is a beautiful way to express one's art and feelings. This photography needs passion and required lot of maturity like golden ager and child like curiosity. Indeed, photography is an art and science. The aim of the club is to nurture the talent among students to see the things differently. The club ethos is to provide a platform where the like- minded students to enjoy, share and advance their photographic skills and explore the beauty of the world."
    },
    {
      id: "charity-club",
      title: "Charity Club",
      badge: "Social Service & Humanity",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
      description: "Charity is the act of extending love and kindness to others unconditionally, which is a conscious act but the decision is made by the heart, without expecting a reward. When Charity is carried out selflessly, it is a one-way act where a person gives but asks for nothing in return.Charity Club helps raise awareness amongst students about the situation of people and their well being. It helps them serve society and the less fortunate. It develops in them a heart for the poor and needy. The Charity Club functions as a humanitarian organization which conducts various programmes to help improve the society. Student volunteers and teacher co-ordinators arrange frequent visits to non-profitable organizations or needy people of nearby community /village These visits help in instilling a sense of humanness in the club members and encourages them to take up various societal issues."
    },
    {
      id: "music-and-dance-club",
      title: "Music and Dance Club",
      badge: "Harmony & Cultural Expression",
      icon: Music,
      image: "https://ckpipsr.ac.in/images/students/hobbyclub/music.png",
      description: "Music and Dance are very important disciplines for a constructive sublimation of instincts and expression of inner sentiments. The Music and Dance club provides them with training in instrumental & vocal music. In addition to it, students learn to dance on Indian & Western tunes. It helps them synchronise their body, mind and soul. The Music and Dance enable the students to promote sense of unity and love as our nation is diverse in its music and arts. While providing knowledge of different forms of Music and Dances of our country, it also enables the students to nurture and identify the talents in music and dance."
    }
  ];

  const rulesAndRegulations = [
    {
      id: 1,
      rule: "Students may join different clubs as per their choice.",
      highlight: "Club Selection",
      icon: Users
    },
    {
      id: 2,
      rule: "The club will be managed by the students, under the guidance of faculty members.",
      highlight: "Student Management & Mentorship",
      icon: ShieldCheck
    },
    {
      id: 3,
      rule: "Each club will have student in charge who will report to the faculty in-charges.",
      highlight: "Leadership & Reporting",
      icon: Target
    },
    {
      id: 4,
      rule: "The entire club will hold regular meetings to discuss and plan their activities.",
      highlight: "Regular Meetings & Planning",
      icon: Lightbulb
    },
    {
      id: 5,
      rule: "Each club activities will be published in CKPIPSR E-bulletin, which will provide a forum for discussions on various topics related to the clubs and also give an account of the activities organized by the club.",
      highlight: "CKPIPSR E-Bulletin Publication",
      icon: FileText
    },
    {
      id: 6,
      rule: "Each club can organize competitive activities, at intra and inter college levels periodically.",
      highlight: "Competitions & Events",
      icon: Award
    },
    {
      id: 7,
      rule: "Rules for individual activities being organized by the clubs will be decided by the coordinators and respective faculty in-charges.",
      highlight: "Activity Guidelines",
      icon: Layers
    },
    {
      id: 8,
      rule: "Competition between the clubs should be healthy and clubs should not attempt to disrupt the activities of other clubs.",
      highlight: "Healthy Atmosphere & Ethics",
      icon: HeartHandshake
    }
  ];

  return (
    <SubPageLayout
      title="Hobby Club"
      subtitle="Holistic development, creative self-expression, and leadership beyond classroom boundaries."
      category="students-corner"
      activeItemLabel="Hobby Club"
    >
      <div className="space-y-8 max-w-7xl mx-auto py-2">
        {/* ── TOP THREE-TAB NAVIGATOR ── */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="inline-flex gap-6 sm:gap-12">
            <button
              type="button"
              onClick={() => setActiveTab("about")}
              className={`relative pb-3 text-sm sm:text-base font-sans font-semibold transition-all cursor-pointer ${
                activeTab === "about"
                  ? "text-[#1a5d2e]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>About</span>
              {activeTab === "about" && (
                <motion.div
                  layoutId="hobbyTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("clubs")}
              className={`relative pb-3 text-sm sm:text-base font-sans font-semibold transition-all cursor-pointer ${
                activeTab === "clubs"
                  ? "text-[#1a5d2e]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Various Clubs</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#1a5d2e] text-[11px] font-mono font-bold">
                  {variousClubsData.length}
                </span>
              </div>
              {activeTab === "clubs" && (
                <motion.div
                  layoutId="hobbyTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("rules")}
              className={`relative pb-3 text-sm sm:text-base font-sans font-semibold transition-all cursor-pointer ${
                activeTab === "rules"
                  ? "text-[#1a5d2e]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>Rules and Regulations</span>
              {activeTab === "rules" && (
                <motion.div
                  layoutId="hobbyTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* ── TAB 1: ABOUT TAB (VERBATIM CONTENT FROM USER SCREENSHOT) ── */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Primary Overview Box */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-9 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <Compass size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      Student Life & Holistic Development
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Why Hobby Clubs Matter
                    </h3>
                  </div>
                </div>

                {/* Verbatim Intro Paragraph */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify font-sans bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-100">
                  Hobby Clubs enable the students to relax and do something they enjoy and act as small breaks in between stress-filled and hectic academic life. Hobbies helps in all round development of the students and are also capable of learning things that the four walls of the classroom cannot. It will encourage students in extracurricular activities to refine their leadership and organizational management experience, explore interests and make friendship that will last a lifetime and make campus life fun. It will play important roles in building character and create opportunities to enhance leadership skills, encourage teamwork and instigate planning and strategies to overcome challenges and fair play all qualities one needs in day-to-day life.
                </p>

                {/* Aims and Objectives Section */}
                <div className="pt-4 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-6 bg-[#1a5d2e] rounded-full" />
                      <h4 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                        Aims and Objectives
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      9 Key Pillars
                    </span>
                  </div>

                  {/* 9 Numbered Points Displayed in a Professional Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                    {aimsAndObjectives.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={item.id}
                          className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-3"
                        >
                          <div className="flex items-start gap-3.5">
                            <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-[#1a5d2e] group-hover:text-white text-slate-700 font-mono font-bold text-sm flex items-center justify-center shrink-0 transition-colors">
                              {item.id}
                            </span>
                            <div className="space-y-1">
                              <span className="text-[10.5px] font-mono uppercase font-bold text-[#1a5d2e] tracking-wider">
                                {item.highlight}
                              </span>
                              <p className="text-xs sm:text-[13.5px] font-medium text-slate-800 leading-snug group-hover:text-slate-900">
                                {item.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="bg-gradient-to-r from-[#0c2411] to-[#1a5d2e] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-[#D4AF37]/30">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#D4AF37] text-xs font-mono uppercase font-bold">
                  Open to All Semesters
                </span>
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  Ready to explore your passion?
                </h4>
                <p className="text-white/80 text-xs sm:text-sm max-w-xl">
                  Check out the full list of active clubs or consult the enrollment guidelines to get started.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab("clubs")}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-slate-950 text-xs sm:text-sm font-sans font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Clubs</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("rules")}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-sans font-bold border border-white/20 transition-colors cursor-pointer"
                >
                  View Regulations
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: VARIOUS CLUBS DIRECTORY (EXACT CONTENT FROM USER'S SCREENSHOT) ── */}
        {activeTab === "clubs" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* 2-Column Professional Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {variousClubsData.map((club) => {
                const IconComp = club.icon;
                return (
                  <div
                    key={club.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#1a5d2e]/30 transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    {/* Card Header with Title, Icon & Badge */}
                    <div className="p-6 sm:p-7 pb-4 flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/40">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1a5d2e] shadow-2xs group-hover:scale-105 transition-transform">
                          <IconComp size={22} />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#1a5d2e] transition-colors">
                            {club.title}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                            Student Interest Circle
                          </span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-semibold shrink-0">
                        {club.badge}
                      </span>
                    </div>

                    {/* Card Body with Framed Image and Verbatim Text */}
                    <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col">
                      {/* Image Container with high quality styling */}
                      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950/5 border border-slate-200 shadow-inner">
                        <img
                          src={club.image}
                          alt={club.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                        <div className="absolute bottom-3 left-3 text-white text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/20">
                          {club.title}
                        </div>
                      </div>

                      {/* Verbatim Description Paragraph */}
                      <p className="text-slate-700 text-sm leading-relaxed font-sans text-justify md:text-left flex-1">
                        {club.description}
                      </p>
                    </div>

                    {/* Bottom Status Ribbon */}
                    <div className="px-6 sm:px-7 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
                      <div className="flex items-center gap-1.5 text-[#1a5d2e] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Active Academic Year 2026-27</span>
                      </div>
                      <span className="text-slate-500">Free Registration</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: RULES AND REGULATIONS ── */}
        {activeTab === "rules" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    Institutional Code of Governance
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Hobby Club Rules & Regulations
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rulesAndRegulations.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-[#1a5d2e] text-slate-700 group-hover:text-white flex items-center justify-center shrink-0 font-mono font-bold text-sm transition-colors shadow-2xs">
                        {item.id}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono uppercase font-bold text-[#1a5d2e] tracking-wider">
                            {item.highlight}
                          </span>
                          <IconComponent size={15} className="text-slate-400 group-hover:text-[#1a5d2e] transition-colors" />
                        </div>
                        <p className="text-xs sm:text-[13.5px] text-slate-800 leading-relaxed font-sans font-medium">
                          {item.rule}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Support Desk Box */}
            <div className="bg-[#fbf9f4] border border-[#d4af37]/40 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1a5d2e] text-[#d4af37] flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-sm text-slate-900">
                    Club Proposal & Student Representation
                  </h5>
                  <p className="text-xs text-slate-600 font-sans">
                    Have an idea for a new special-interest club or want to become a student club coordinator? Reach out to the Student Welfare In-charge.
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono font-bold text-[#1a5d2e] shrink-0 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                Email: studentwelfare@ckpipsr.ac.in
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </SubPageLayout>
  );
}
