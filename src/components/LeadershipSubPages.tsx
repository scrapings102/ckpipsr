import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Users,
  Award,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Quote,
  Mail,
  ShieldCheck,
  Activity,
  FlaskConical,
  ChevronRight,
  Building,
  BookOpen,
  MapPin,
  Calendar,
  Contact,
  X,
  ExternalLink,
  Info,
  GraduationCap,
  FileText,
  ArrowLeft,
  Check
} from "lucide-react";
import { ContentPage } from "../data/ckpipsrContent";
import drShaileshShahImg from "../assets/images/regenerated_image_1789425199288.jpg";

// Define structured content for the Founder Page
const FOUNDER_CONTRIBUTIONS = [
  {
    category: "Higher Education Pioneers",
    desc: "Spearheaded the Navyug Vidyabhavan Trust in 1965 to address the severe shortage of academic facilities in South Gujarat, providing premium state-of-the-art infrastructure for young learners.",
    icon: Building,
  },
  {
    category: "Inclusive Educational Policy",
    desc: "Instilled and defended the core value of access to world-class learning regardless of caste, creed, gender, or religion.",
    icon: ShieldCheck,
  },
  {
    category: "Philanthropic Endowment",
    desc: "Contributed immense personal wealth and marathon organizational efforts to establish multiple specialized degree colleges in Surat.",
    icon: Award,
  },
  {
    category: "Holistic Welfare Support",
    desc: "Supported extensive community outreach initiatives across sports, medical relief camps, cultural preservation, and youth empowerment schemes.",
    icon: Activity,
  },
];

export function FounderLayout() {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Memorial Header Section */}
      <section className="relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group">
              <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-4 border-white shadow-xl relative bg-slate-100">
                <img
                  src="/images/hero/646efc827452b.webp"
                  alt="Late Shree Chhotubhai K Pithawalla"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-105 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hero/college_campus.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            <div className="mt-4 text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#8c6d12] text-[9px] font-bold uppercase tracking-wider border border-[#D4AF37]/20">
                Visionary Founder
              </div>
              <h2 className="text-xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Late Shree Chhotubhai K. Pithawalla
              </h2>
            </div>
          </div>

          {/* Vision Column */}
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-3 relative">
              <Quote size={36} className="text-[#D4AF37]/15 absolute -top-4 -left-4" />
              <p className="text-base sm:text-lg font-serif italic text-slate-800 leading-relaxed relative z-10 font-medium">
                "Our mission is to build a lighthouse of knowledge that illuminates the path for generations to come,
                bridging the gap between aspiration and achievement."
              </p>
              <div className="h-1 w-14 bg-[#D4AF37] rounded-full" />
            </div>

            <div className="space-y-3">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                Late Shree C. K. Pithawalla was the primary driving force behind the establishment of Navyug Vidyabhavan Trust in 1965.
                His visionary leadership and missionary zeal were instrumental in transforming the educational landscape of South Gujarat.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                His legacy is defined by a commitment to excellence, social inclusivity, and the belief that education is the most
                powerful tool for societal transformation. CKPIPSR stands as a proud testament to his benevolence and enduring vision.
              </p>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F3] border border-[#D4AF37]/20 rounded-xl">
                <Sparkles size={16} className="text-[#D4AF37] animate-pulse" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Enduring Legacy since 1965</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contributions Bento Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h4 className="text-xl font-serif font-bold text-slate-900">Foundational Pillars</h4>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">The Core Contributions of Our Founder</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FOUNDER_CONTRIBUTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#123a1a] group-hover:text-[#D4AF37] transition-all shrink-0">
                  <Icon size={18} />
                </div>
                <div className="space-y-2">
                  <h5 className="font-serif font-bold text-slate-900 text-sm leading-snug">
                    {item.category}
                  </h5>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Memorial Note */}
      <div className="bg-[#123a1a] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-3">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">"A Life of Service is a Life of Worth"</h3>
          <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            We carry forward the torch of knowledge lit by our founder, committed to maintaining the highest
            standards of integrity and academic rigor that he envisioned.
          </p>
          <div className="h-px w-24 bg-[#D4AF37]/40 mx-auto" />
          <p className="text-[9px] text-[#D4AF37] font-mono tracking-widest font-bold uppercase">Dedicated to Late Shree C. K. Pithawalla</p>
        </div>
      </div>
    </div>
  );
}

// Define structured content for the Trust Page
const TRUST_VALUES = [
  {
    title: "Educational Inclusivity",
    desc: "Strictly dedicated to extending advanced learning access without barriers of caste, community, creed, sex, or economic status.",
    icon: ShieldCheck,
  },
  {
    title: "Exact & Social Sciences",
    desc: "Spearheading multi-disciplinary research wings and industrial applications to solve complex technological challenges.",
    icon: FlaskConical,
  },
  {
    title: "Demand-Supply Equilibrium",
    desc: "Constantly evaluating academic trends to introduce novel specialized and professional pharmacy courses in Surat.",
    icon: Activity,
  },
];

export function TrustLayout() {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Main Narrative Card */}
      <section className="relative group">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-5 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-black uppercase tracking-wider border border-[#123a1a]/10">
                    Legacy of Excellence
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#8c6d12] text-[9px] font-black uppercase tracking-wider border border-[#D4AF37]/20">
                    Est. 1965
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                  The Navyug Vidyabhavan <span className="text-[#123a1a]">Trust</span>
                </h3>
                <div className="h-1 w-16 bg-[#D4AF37] rounded-full" />
              </div>

              <div className="space-y-3">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Founded in February 1965, the <strong>Navyug Vidyabhavan Trust</strong> was established to bridge
                  the critical gap in higher professional education in South Gujarat. Over six decades, it has evolved
                  into a cornerstone of academic advancement.
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  As the governing pillar behind CKPIPSR, the Trust ensures a relentless focus on research excellence,
                  statutory compliance, and the holistic development of pharmaceutical leaders who serve with
                  integrity and innovation.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-video sm:aspect-square rounded-xl overflow-hidden shadow-lg border-2 border-white">
                <img
                  src="/images/hero/66e15283951b9.webp"
                  alt="Trust Legacy"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Mandates - Refined Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h4 className="text-xl font-serif font-bold text-slate-900">Foundational Mandates</h4>
          <p className="text-slate-500 max-w-xl mx-auto text-xs">
            Our objectives are etched in our constitution, guiding every academic and administrative decision.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {TRUST_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-[#123a1a] flex items-center justify-center group-hover:bg-[#123a1a] group-hover:text-[#D4AF37] transition-all shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="text-base font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors">
                      {val.title}
                    </h5>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                      {val.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Governing Body structured members
export interface GoverningMember {
  id: string;
  name: string;
  role: string;
  trustOrInstitute: string;
  image: string;
  fallbackImage?: string;
  quote: string;
  bio: string;
  credentials?: string;
  source: string;
}

const GOVERNING_MEMBERS: GoverningMember[] = [
  {
    id: "mahesh-pithawalla",
    name: "Shri Mahesh C. Pithawalla",
    role: "Vice President / Trustee",
    trustOrInstitute: "Navyug Vidyabhavan Trust",
    image: "https://ckpipsr.ac.in/images/trustees/mahesh-c-p.jpg",
    fallbackImage: "/images/hero/65efea4943a49.webp",
    quote: "Guiding institutional expansion, infrastructural investments, and strategic corporate alliances across technical campuses.",
    bio: "Shri Mahesh C. Pithawalla provides executive governance for Navyug Vidyabhavan Trust institutions. His leadership ensures modern laboratory equipment, faculty development, and student welfare facilities across all campuses.",
    credentials: "Trustee, Navyug Vidyabhavan Trust",
    source: "NVB Trust Board"
  },
  {
    id: "biren-pithawalla",
    name: "Shri Biren M. Pithawalla",
    role: "Trustee",
    trustOrInstitute: "Navyug Vidyabhavan Trust",
    image: "https://ckpipsr.ac.in/images/trustees/biren-m-p.jpg",
    quote: "Spearheading digital learning initiatives, innovation nodal funding, and state-of-the-art research wing development.",
    bio: "Shri Biren M. Pithawalla oversees technology integration, SSIP startup grants, and research facility upgrades across the campus to empower pharmaceutical researchers.",
    credentials: "Trustee, Navyug Vidyabhavan Trust",
    source: "NVB Trust Board"
  },
  {
    id: "rahul-pithawalla",
    name: "Shri Rahul A. Pithawalla",
    role: "Trustee",
    trustOrInstitute: "Navyug Vidyabhavan Trust",
    image: "https://ckpipsr.ac.in/images/trustees/rahul-a-p.jpg",
    quote: "Promoting entrepreneurial incubation, student startup policy (SSIP) grants, and industrial training placements.",
    bio: "Shri Rahul A. Pithawalla actively fosters the Institutional Innovation Council (IIC) and Training & Placement Cell, building strong pipelines with pharmaceutical industries.",
    credentials: "Trustee, Navyug Vidyabhavan Trust",
    source: "NVB Trust Board"
  },
  {
    id: "ajit-pithawalla",
    name: "Shri Ajit C. Pithawalla",
    role: "Trustee",
    trustOrInstitute: "Navyug Vidyabhavan Trust",
    image: "https://ckpipsr.ac.in/images/trustees/ajit-c-p.jpg",
    quote: "Preserving organizational ethics, financial compliance, and community outreach healthcare initiatives.",
    bio: "Shri Ajit C. Pithawalla manages trust endowments, scholarship allocations, and community healthcare drives including blood donation and thalassemia campaigns.",
    credentials: "Trustee, Navyug Vidyabhavan Trust",
    source: "NVB Trust Board"
  },
  {
    id: "dhiren-shah",
    name: "Dr. Dhiren P. Shah",
    role: "Member Secretary / Principal",
    trustOrInstitute: "CKPIPSR",
    image: "/images/faculty/dhiren-p-shah.jpg",
    fallbackImage: "https://ckpipsr.ac.in/images/about/dhiren-shah.png",
    quote: "Championing Outcome-Based Education (OBE), research publication, and student-centric academic rigor.",
    bio: "Dr. Dhiren P. Shah is Professor and Principal of CKPIPSR with 25+ years of academic and research leadership. He oversees PCI/GTU accreditations, curriculum enhancement, and research publications.",
    credentials: "M.Pharm, MBA, PGDIPR, Ph.D. | Principal & Professor",
    source: "Ex-Officio Institutional Head"
  },
  {
    id: "bhumika-desai",
    name: "Dr. Bhumika Desai",
    role: "Member / Associate Professor",
    trustOrInstitute: "CKPIPSR",
    image: "/images/faculty/bhumika-c-desai.jpg",
    fallbackImage: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/6a6308854a00a.webp",
    quote: "Coordinating curriculum execution, statutory compliance filings, and pharmaceutical research projects.",
    bio: "Dr. Bhumika Desai is Associate Professor in Pharmaceutics and Member Secretary of the Academic Council at CKPIPSR. She manages academic planning, university documentation, and student research mentorship.",
    credentials: "M.Pharm, Ph.D. | Associate Professor",
    source: "Faculty Representative"
  },
  {
    id: "vinod-ramani",
    name: "Dr. Vinod Ramani",
    role: "Member / Associate Professor",
    trustOrInstitute: "CKPIPSR",
    image: "/images/faculty/vinod-d-ramani.jpg",
    fallbackImage: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/staff_members/photos/63abcf6a28997.webp",
    quote: "Directing academic timetables, practical laboratory modules, and continuous internal assessment frameworks.",
    bio: "Dr. Vinod Ramani serves as Academic Coordinator and Associate Professor in Pharmaceutics at CKPIPSR, supervising core lab operations and course scheduling.",
    credentials: "M.Pharm, Ph.D. | Associate Professor",
    source: "Faculty Representative"
  },
  {
    id: "kamlesh-zota",
    name: "Dr. Kamlesh Zota",
    role: "Member (Industry Nominee)",
    trustOrInstitute: "Pharmaceutical Industry Leader",
    image: "https://ckpipsr.ac.in/images/about/kamlesh-zota.png",
    fallbackImage: "https://ui-avatars.com/api/?name=Kamlesh+Zota&background=123a1a&color=D4AF37&size=512",
    quote: "Bridging industrial pharmaceutical developments with academic curricula and student internships.",
    bio: "Dr. Kamlesh Zota represents the pharmaceutical industry on the governing body, guiding industrial visits, skill workshops, and placement pathways.",
    credentials: "Pharma Industry Executive | Board Nominee",
    source: "Industry Expert Nominee"
  },
  {
    id: "chandravadan-pithawalla",
    name: "Shri Chandravadan C. Pithawalla",
    role: "Trustee",
    trustOrInstitute: "Navyug Vidyabhavan Trust",
    image: "https://ckpipsr.ac.in/images/trustees/chandravadan-c-p.jpg",
    fallbackImage: "https://ui-avatars.com/api/?name=Chandravadan+Pithawalla&background=123a1a&color=D4AF37&size=512",
    quote: "Guiding philanthropic missions, sustainable institution building, and higher education excellence.",
    bio: "Shri Chandravadan C. Pithawalla has served as a devoted trustee and visionary mentor across the Navyug and Pithawalla educational campuses.",
    credentials: "Trustee, Navyug Vidyabhavan Trust",
    source: "NVB Trust Board"
  },
  {
    id: "shailesh-shah",
    name: "Dr. Shailesh Shah",
    role: "Member (Regulatory Nominee)",
    trustOrInstitute: "Pharmacy Council of India",
    image: drShaileshShahImg,
    fallbackImage: "https://ckpipsr.ac.in/images/about/shailesh-shah.jpg",
    quote: "Ensuring complete compliance with Pharmacy Council of India (PCI) norms and professional ethics.",
    bio: "Dr. Shailesh Shah advises the governing body on PCI regulatory guidelines, laboratory standards, and faculty-student intake ratios.",
    credentials: "PCI Nominee | Regulatory Expert",
    source: "Pharmacy Council of India"
  }
];

export function GoverningBodyLayout() {
  const [selectedMember, setSelectedMember] = useState<GoverningMember | null>(null);

  useEffect(() => {
    if (!selectedMember) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Intro section - Compact & Refined Banner */}
      <section className="relative group overflow-hidden rounded-2xl sm:rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#123a1a] to-[#1a4a25] transition-all duration-700 group-hover:scale-105" />
        <div className="absolute top-0 right-0 w-[24rem] h-[24rem] bg-[#D4AF37]/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-8 space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.15em]">
              <ShieldCheck size={12} />
              <span>Supreme Council</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
              Governing Body & <span className="text-[#D4AF37]">Executive Board</span>
            </h3>
            <div className="h-1 w-16 bg-[#D4AF37] rounded-full" />
          </div>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-3xl font-medium">
            CKPIPSR operates under the strategic guidance of a multi-disciplinary board comprising
            visionary philanthropists, industrial pioneers, and academic luminaries, ensuring
            adherence to PCI and GTU standards.
          </p>
        </div>
      </section>

      {/* Enhanced Member Grid - Compact & Structured */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {GOVERNING_MEMBERS.map((member, mIdx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: mIdx * 0.03 }}
            className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col justify-between w-full min-w-0"
          >
            <div className="space-y-3.5 min-w-0">
              {/* Image Container */}
              <div className="relative aspect-[4/3.8] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 group-hover:border-[#D4AF37]/50 shadow-inner">
                <img
                  src={member.image || member.fallbackImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=123a1a&color=D4AF37&size=512`}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const triedFallback = target.getAttribute("data-fallback-tried");
                    if (!triedFallback && member.fallbackImage) {
                      target.setAttribute("data-fallback-tried", "true");
                      target.src = member.fallbackImage;
                    } else {
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=123a1a&color=D4AF37&size=512`;
                    }
                  }}
                />
              </div>

              {/* Role Badge placed cleanly below image */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#123a1a] text-[#D4AF37] text-[10px] font-black uppercase tracking-wider shadow-sm">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse shrink-0" />
                  <span className="break-words">{member.role}</span>
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 min-w-0">
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors leading-snug break-words">
                    {member.name}
                  </h4>
                  {member.credentials && (
                    <p className="text-[10px] sm:text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider font-mono break-words">
                      {member.credentials}
                    </p>
                  )}
                </div>

                {/* Quote Snippet */}
                <div className="relative p-3 sm:p-3.5 bg-slate-50 rounded-xl border-l-2 border-[#D4AF37] group-hover:bg-[#FAF8F3] transition-all duration-300">
                  <Quote size={16} className="text-[#D4AF37]/20 absolute top-2 right-2 shrink-0" />
                  <p className="text-slate-600 text-xs italic font-serif leading-relaxed break-words relative z-10">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2 min-w-0">
              <div className="flex items-center gap-1.5 text-slate-500 min-w-0 flex-1">
                <Building size={13} className="text-[#D4AF37] shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider truncate text-slate-500">{member.trustOrInstitute}</span>
              </div>
              <button
                onClick={() => setSelectedMember(member)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#123a1a] text-[#D4AF37] font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all hover:bg-[#1a4a25] active:scale-95 shrink-0 cursor-pointer"
              >
                <span>Bio</span>
                <ChevronRight size={11} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Member Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedMember(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 shadow-2xl relative space-y-6" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left pt-2 min-w-0">
              <img
                src={selectedMember.image || selectedMember.fallbackImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=123a1a&color=D4AF37&size=512`}
                alt={selectedMember.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-[#D4AF37] object-cover object-top shadow-lg bg-slate-100 shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const triedFallback = target.getAttribute("data-fallback-tried");
                  if (!triedFallback && selectedMember.fallbackImage) {
                    target.setAttribute("data-fallback-tried", "true");
                    target.src = selectedMember.fallbackImage;
                  } else {
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=123a1a&color=D4AF37&size=512`;
                  }
                }}
              />
              <div className="space-y-2 min-w-0 flex-1">
                <span className="inline-block px-3.5 py-1 bg-[#D4AF37]/20 text-[#8c6d12] border border-[#D4AF37]/30 rounded-full font-mono font-bold text-xs uppercase tracking-wider max-w-full truncate">
                  {selectedMember.role}
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 leading-tight break-words">
                  {selectedMember.name}
                </h3>
                {selectedMember.credentials && (
                  <p className="font-mono text-xs sm:text-sm text-slate-600 font-bold break-words">
                    {selectedMember.credentials}
                  </p>
                )}
                <p className="font-mono text-xs text-[#D4AF37] font-bold break-words">
                  {selectedMember.trustOrInstitute}
                </p>
              </div>
            </div>

            {/* Modal Quote Callout */}
            <div className="p-4 bg-amber-50 rounded-2xl border-l-4 border-[#D4AF37] italic font-serif text-slate-800 text-sm sm:text-base leading-relaxed break-words">
              "{selectedMember.quote}"
            </div>

            {/* Modal Bio Body */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <h4 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Info size={18} className="text-[#D4AF37] shrink-0" />
                <span>Executive Bio & Leadership Profile</span>
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify font-sans font-medium">
                {selectedMember.bio}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-[#D4AF37] text-white hover:text-slate-950 font-mono text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close Bio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PrincipalLayout({ page }: { page?: ContentPage }) {
  const navigate = useNavigate();

  const principalMessageParagraphs = [
    "C. K. Pithawala Institute of Pharmaceutical Science & Research was established in a year 2005 with the total intake of 60 students with glorious standing. Institute is successfully running in the field of Pharmacy Education under the leadership of our honorable president Shri. C. K. Pithawalla.",
    "Today it has grown to one of the premier institute of the state with total approved intake of 400 students.",
    "The Institute is located in peaceful environment at Surat-Dumas road in Surat city. The Institute provides disciplined, conducive and professional environment for academic and research with the team of qualified and experienced faculties.",
    "Along with the academic activities, institute is committed for overall development of the students. Industrial training, industrial visits, short term training programs, workshops, seminar, expert lectures have been organized as a part of academic calendar. Students are encouraged to organize and participate in sports activities, cultural programs and social welfare activities like blood donation, thalassemia awareness etc.",
    "We are committed to provide learning base academic environment to our students. This in turn will equipped the students with technical knowledge and skill to increase their competency and will transformed the students to qualified professionals. We understand the expectations of the society, government and affiliating university from us as being institute offering technical education and accordingly we are committed for continuous improvement in teaching learning process.",
    "To inculcate the culture of Innovation and Entrepreneurship in the students we have various platforms like Institutional Innovation Council (IIC), Student Startup and Innovation Policy (SSIP) nodal centre in place at the institute.",
    "Our aim is to make CKPIPSR globally renowned Pharma institute."
  ];

  return (
    <div className="w-full animate-fadeIn">
      {/* Top Navigation Row matching screenshot */}
      <div className="flex flex-wrap items-center justify-between pb-6 mb-4 sm:mb-6 gap-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#C49A2C] hover:text-[#112815] transition-colors uppercase cursor-pointer"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
          <span>BACK TO HOME</span>
        </button>
        <div className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
          ABOUT US / PRINCIPAL'S MESSAGE
        </div>
      </div>

      {/* Main 2-Column Grid matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Profile Card Column */}
        <div className="lg:col-span-5 xl:col-span-4 bg-[#FAF7F0] border border-[#EAE3D2] rounded-3xl p-6 sm:p-8 shadow-2xs">
          {/* Circular Portrait Image with Double Ring Gold Border */}
          <div
            id="principal-portrait-container"
            className="w-52 h-52 sm:w-60 sm:h-60 mx-auto rounded-full overflow-hidden border-4 border-[#D4AF37] ring-8 ring-[#FAF7F0] shadow-md relative bg-slate-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl cursor-pointer group"
          >
            <img
              src="/images/faculty/dhiren-p-shah.jpg"
              alt="Dr. Dhiren P. Shah"
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== "https://ckpipsr.ac.in/images/about/dhiren-shah.png") {
                  target.src = "https://ckpipsr.ac.in/images/about/dhiren-shah.png";
                } else {
                  target.src = "https://ui-avatars.com/api/?name=Dhiren+Shah&background=123a1a&color=D4AF37&size=512";
                }
              }}
            />
          </div>

          {/* Name & Credentials */}
          <div className="text-center mt-6 mb-6 space-y-1">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#112815] tracking-tight">
              Dr. Dhiren P. Shah
            </h3>
            <p className="text-[#C49A2C] font-mono font-bold text-xs uppercase tracking-widest pt-0.5">
              PRINCIPAL
            </p>
            <p className="text-slate-500 font-sans text-xs pt-0.5">
              PhD, M.Pharm, MBA, PGDIPR
            </p>
          </div>

          {/* White Info Card at Bottom */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE3D2] space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-3 text-slate-700 text-xs font-medium min-w-0">
              <Mail size={16} className="text-[#C49A2C] shrink-0" />
              <a href="mailto:dhiren.shah@ckpipsr.ac.in" className="truncate hover:text-[#112815] transition-colors">
                dhiren.shah@ckpipsr.ac.in
              </a>
            </div>
            <div className="flex items-center gap-3 text-slate-700 text-xs font-medium">
              <Award size={16} className="text-[#C49A2C] shrink-0" />
              <span>25+ Years in Higher Academics</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 text-xs font-medium">
              <GraduationCap size={16} className="text-[#C49A2C] shrink-0" />
              <span>Gujarat Technological University</span>
            </div>
          </div>
        </div>

        {/* Right Message Column */}
        <div className="lg:col-span-7 xl:col-span-8 bg-[#FAF7F0] border border-[#EAE3D2] rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
          {/* Watermark Quote Icon in Top Right */}
          <div className="absolute top-4 right-6 sm:top-6 sm:right-8 select-none pointer-events-none text-right">
            <span className="text-7xl sm:text-8xl font-serif font-bold text-[#D4AF37]/20 leading-none inline-block">
              ”
            </span>
          </div>

          {/* Professional Heading */}
          <div className="relative z-10 mb-6 pr-12">
            <p className="text-[#C49A2C] font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider mb-2">
              From the Desk of the Principal
            </p>
            <h2
              id="principal-message-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-[#112815] tracking-tight leading-snug"
            >
              Message from the Principal
            </h2>
            <div className="h-0.5 w-16 bg-[#D4AF37] mt-3.5" />
          </div>

          {/* New Narrative Paragraphs provided by user */}
          <div className="space-y-4 text-slate-700 text-xs sm:text-sm md:text-[15px] font-sans leading-relaxed relative z-10">
            {principalMessageParagraphs.map((paragraph, idx) => (
              <p key={idx}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature Block at Bottom Right */}
          <div className="text-right pt-8 mt-6 border-t border-[#EAE3D2]/70 relative z-10">
            <h4 className="text-lg sm:text-xl font-serif font-bold text-[#112815]">
              Dr. Dhiren P. Shah
            </h4>
            <p className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase mt-0.5">
              PRINCIPAL, CKPIPSR
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// Structured Academic Council members for Deans and Faculty In-charges
const ACADEMIC_COUNCIL = [
  {
    name: "Dr. Dhiren Shah",
    role: "Chairperson & Principal",
    portfolio: "Professor of Pharmaceutics. Manages overall administrative directives, research boards, and university alignments.",
    qualification: "M.PHARM, MBA, PGDIPR, Ph.D.",
    email: "dhiren.shah@ckpipsr.ac.in",
    image: "/images/faculty/dhiren-p-shah.jpg",
  },
  {
    name: "Dr. Bhumika Desai",
    role: "Member Secretary",
    portfolio: "Associate Professor in Pharmaceutics. Formulates structural curricula plans, statutory agendas, and academic filings.",
    qualification: "M.PHARM, Ph.D.",
    email: "bhumika.desai@ckpipsr.ac.in",
    image: "/images/faculty/bhumika-c-desai.jpg",
  },
  {
    name: "Dr. Vinod Ramani",
    role: "Academic Coordinator",
    portfolio: "Associate Professor in Pharmaceutics. Spearheads daily class timetables, teaching matrices, and session planning.",
    qualification: "M.PHARM, Ph.D.",
    email: "vinod.ramani@ckpipsr.ac.in",
    image: "/images/faculty/vinod-d-ramani.jpg",
  },
  {
    name: "Dr. Dipayan Tarafder",
    role: "Examination In-charge",
    portfolio: "Assistant Professor in Pharmacology. Oversees internal evaluations, final examinations, and continuous grading models.",
    qualification: "M.PHARM, Ph.D. (Pursuing)",
    email: "dipayan.tarafder@ckpipsr.ac.in",
    image: "/images/faculty/dipayan-tarafder.jpg",
  },
  {
    name: "Mr. Yahya Moolla",
    role: "SSIP Coordinator",
    portfolio: "Assistant Professor in Pharmaceutics. Head coordinator for the Student Startup & Innovation Policy funding portal.",
    qualification: "M.PHARM",
    email: "yahya.moolla@ckpipsr.ac.in",
    image: "/images/faculty/yahya-ali-moolla.jpg",
  },
  {
    name: "Mrs. Prakruti Jadav",
    role: "IIC Coordinator",
    portfolio: "Assistant Professor in Pharmaceutics. Manages the Institutional Innovation Council (IIC) to nurture research ideas.",
    qualification: "M.PHARM",
    email: "prakruti.jadav@ckpipsr.ac.in",
    image: "/images/faculty/prakruti-p-gotawala.jpg",
  },
  {
    name: "Dr. Shuchi Desai",
    role: "Research Committee In-charge",
    portfolio: "Assistant Professor in Pharmachemistry. Overviews intellectual property filings, grants submissions, and patents.",
    qualification: "M.PHARM, Ph.D.",
    email: "shuchi.desai@ckpipsr.ac.in",
    image: "/images/faculty/shuchi-p-desai.jpg",
  },
  {
    name: "Mrs. Monika Kakadiya",
    role: "Women Development Coordinator",
    portfolio: "Assistant Professor in Pharmachemistry. Leads the Women Development Cell (WDC) and coordinates safety audits.",
    qualification: "M.PHARM",
    email: "monika.kakadiya@ckpipsr.ac.in",
    image: "/images/faculty/monika-t-kyada.jpg",
  },
  {
    name: "Dr. Naishadh Solanki",
    role: "Extracurricular Coordinator",
    portfolio: "Assistant Professor in Pharmachemistry. Guides the Hobby Club, annual sports tournament, and cultural festivals.",
    qualification: "M.PHARM, Ph.D.",
    email: "naishadh.solanki@ckpipsr.ac.in",
    image: "/images/faculty/naishadh-i-solanki.jpg",
  },
  {
    name: "Mrs. Mansi Gandhi",
    role: "Clinical Pharmacology In-charge",
    portfolio: "Assistant Professor in Pharmacology. Mentors clinical pharmacy modules, hospital ward practicals, and pharmacology labs.",
    qualification: "M.PHARM",
    email: "mansi.gandhi@ckpipsr.ac.in",
    image: "https://ckpipsr.ac.in/images/about/mansi-gandhi.png",
  }
];

export function DeansLayout() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Intro section - Premium Banner (Compact & Refined) */}
      <section className="relative group overflow-hidden rounded-2xl sm:rounded-3xl">
        <div className="absolute inset-0 bg-[#123a1a] group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute top-0 right-0 w-[24rem] h-[24rem] bg-[#D4AF37]/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-8 space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.15em]">
              <Users size={12} />
              <span>Academic Council</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
              Deans & Portfolio <span className="text-[#D4AF37]">In-charges</span>
            </h3>
            <div className="h-1 w-16 bg-[#D4AF37] rounded-full" />
          </div>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-3xl font-medium font-sans">
            The esteemed faculty members listed below form the core Academic Council for the year 2024-2025,
            overseeing research, regulatory compliance, and curricula excellence.
          </p>
        </div>
      </section>

      {/* Directory Grid - Refined Compact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {ACADEMIC_COUNCIL.map((faculty, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 4) * 0.06 }}
            className="group bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col justify-between w-full min-w-0"
          >
            <div className="space-y-3 min-w-0">
              {/* Compact Image Container */}
              <div className="relative aspect-[4/3.8] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 group-hover:border-[#D4AF37]/50 shadow-inner">
                <img
                  src={faculty.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=123a1a&color=D4AF37&size=512`}
                  alt={faculty.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=123a1a&color=D4AF37&size=512`;
                  }}
                />
              </div>

              {/* Role Badge placed cleanly below image */}
              <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#123a1a] text-[#D4AF37] text-[10px] font-black uppercase tracking-wider shadow-sm min-w-0">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse shrink-0" />
                  <span className="break-words leading-tight">{faculty.role}</span>
                </span>
              </div>

              {/* Details */}
              <div className="space-y-1 min-w-0">
                <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors leading-snug break-words">
                  {faculty.name}
                </h4>
                <p className="text-[10px] sm:text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider font-mono break-words">
                  {faculty.qualification}
                </p>
                {faculty.portfolio && (
                  <p className="text-xs text-slate-500 leading-relaxed pt-1 font-sans break-words">
                    {faculty.portfolio}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2 min-w-0">
              <a
                href={`mailto:${faculty.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#123a1a]/5 hover:bg-[#123a1a] text-[#123a1a] hover:text-[#D4AF37] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer min-w-0"
                title={`Email ${faculty.name}`}
              >
                <Mail size={13} className="shrink-0" />
                <span className="truncate">Contact Desk</span>
              </a>
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-mono text-[10px] font-bold shrink-0">
                {idx + 1}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
