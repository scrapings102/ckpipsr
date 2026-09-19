import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Beaker, 
  BookOpen, 
  Trophy, 
  Home, 
  HeartPulse, 
  Bus, 
  Mic2, 
  Coffee, 
  Cpu, 
  Zap, 
  Leaf,
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle2
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

const RESOURCES = [
  {
    title: "Laboratories",
    icon: Beaker,
    description: "PCI-approved specialized labs for pharmaceutics, pharmacology, and research.",
    path: "/academics/resources-laboratories",
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "Library",
    icon: BookOpen,
    description: "Digital-ready knowledge hub with 7500+ books and global journal access.",
    path: "/academics/resources-library",
    color: "from-emerald-600 to-teal-600"
  },
  {
    title: "Sports",
    icon: Trophy,
    description: "Extensive grounds for cricket, football, and indoor sports facilities.",
    path: "/academics/resources-sports",
    color: "from-orange-600 to-red-600"
  },
  {
    title: "Hostel",
    icon: Home,
    description: "Safe and modern residential facilities for boys and girls with 24/7 security.",
    path: "/academics/resources-hostel",
    color: "from-purple-600 to-pink-600"
  },
  {
    title: "Medical",
    icon: HeartPulse,
    description: "On-campus healthcare center providing immediate medical aid and diagnostics.",
    path: "/academics/resources-medical",
    color: "from-red-600 to-rose-600"
  },
  {
    title: "Transportation",
    icon: Bus,
    description: "Excellent city-wide connectivity via BRTS and dedicated college bus services.",
    path: "/academics/resources-transportation",
    color: "from-amber-600 to-yellow-600"
  },
  {
    title: "Seminar Hall",
    icon: Mic2,
    description: "200-capacity AC hall equipped with modern audio-visual conferencing tools.",
    path: "/academics/resources-seminar-hall",
    color: "from-indigo-600 to-blue-600"
  },
  {
    title: "Cafeteria",
    icon: Coffee,
    description: "Hygienic vegetarian dining space offering a variety of nutritious cuisines.",
    path: "/academics/resources-cafeteria",
    color: "from-rose-600 to-orange-600"
  },
  {
    title: "Central Facilities",
    icon: Cpu,
    description: "Centers for language proficiency, personality development, and stationary.",
    path: "/academics/resources-central-facilities",
    color: "from-slate-600 to-slate-800"
  },
  {
    title: "EV Charging",
    icon: Zap,
    description: "Sustainable energy infrastructure supporting eco-friendly campus transportation.",
    path: "/academics/resources-ev-charging-station",
    color: "from-cyan-600 to-blue-600"
  },
  {
    title: "Medicinal Garden",
    icon: Leaf,
    description: "Vast collection of aromatic and medicinal plants for practical research.",
    path: "/academics/resources-medicinal-garden",
    color: "from-green-600 to-emerald-600"
  }
];

export default function Resources() {
  const navigate = useNavigate();

  return (
    <SubPageLayout
      title="Campus Resources"
      subtitle="Comprehensive infrastructure designed to support a holistic academic experience."
      category="academics"
      activeItemLabel="Resources"
    >
      <div className="space-y-24">
        {/* Intro Section */}
        <section className="relative">
          <div className="absolute -left-10 top-0 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[10px] font-bold uppercase tracking-widest border border-[#123a1a]/10">
              World-Class Infrastructure
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0c2411] tracking-tight">
              Campus Facilities & Infrastructure
            </h2>
            <div className="h-1.5 w-24 bg-[#D4AF37] rounded-full" />
            <p className="text-slate-600 max-w-3xl text-lg leading-relaxed font-medium">
              CKPIPSR provides a research-oriented atmosphere with modern laboratories, 
              a well-stocked library, and advanced facilities that create an ideal environment 
              for future healthcare leaders.
            </p>
          </div>
        </section>

        {/* Resources Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {RESOURCES.map((resource, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.05, duration: 0.5 }}
               onClick={() => navigate(resource.path)}
               className="group cursor-pointer bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[320px]"
             >
               {/* Background Glow */}
               <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
               
               <div className="space-y-6">
                 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <resource.icon size={28} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors">{resource.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-3 italic">
                       "{resource.description}"
                    </p>
                 </div>
               </div>

               <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-black text-[#123a1a] uppercase tracking-[0.2em]">
                     <span>View Facility</span>
                     <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <Building2 size={16} className="text-slate-200 group-hover:text-[#D4AF37] transition-colors" />
               </div>
             </motion.div>
           ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="bg-[#123a1a] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 opacity-10 mix-blend-overlay">
              <img src="/images/hero/college_campus.jpg" className="w-full h-full object-cover" />
           </div>
           
           <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">Experience CKPIPSR in Person</h3>
                <p className="text-slate-300 max-w-xl mx-auto text-lg leading-relaxed">
                   We invite prospective students and parents to visit our campus and explore these world-class facilities first-hand.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { label: "Modern Architecture", icon: Building2 },
                  { icon: CheckCircle2, label: "Safety Protocols" },
                  { icon: Sparkles, label: "Eco-Friendly Campus" }
                ].map((tag, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                     <tag.icon size={16} className="text-[#D4AF37]" />
                     <span className="text-[10px] font-bold text-white uppercase tracking-widest">{tag.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                 <button className="px-10 py-5 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-950/20 active:scale-95">
                    Schedule a Campus Tour
                 </button>
                 <button className="px-10 py-5 rounded-2xl bg-[#123a1a] text-[#D4AF37] border border-[#D4AF37]/20 font-bold text-sm hover:bg-[#1a4a25] transition-all shadow-xl shadow-black/30 active:scale-95">
                    Virtual Campus Tour
                 </button>
              </div>
           </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
