import React from "react";
import { Landmark, Building, Check, Award, ShieldCheck, Sparkles } from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

export default function Trust() {
  const institutes = [
    { name: "Navyug Arts College", intake: "685" },
    { name: "Navyug Science College", intake: "525" },
    { name: "Navyug Commerce College", intake: "150" },
    { name: "Maniben Pithawalla ITI", intake: "240" },
    { name: "C.K. Pithawalla College of Engineering & Technology", intake: "420" },
    { name: "C.K. Pithawalla Inst. of Pharmaceutical Science & Research", intake: "100" },
    { name: "C.K. Pithawalla College of Commerce-Management & Computer Application", intake: "860" }
  ];

  return (
    <SubPageLayout
      title="Navyug Vidyabhavan Trust"
      subtitle="The parent governing educational board behind C.K. Pithawalla and Navyug institutions since 1965."
      category="about-us"
      activeItemLabel="The Trust"
    >
      <div className="space-y-12 text-[#3B3131]">
        
        {/* HERO IMAGE FOCUS BANNER */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl group">
          <div className="aspect-[16/7] md:aspect-[21/8] w-full relative bg-slate-900 overflow-hidden">
            <img 
              src="/images/hero/65efea4943a49.webp" 
              alt="Navyug Vidyabhavan Trust" 
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2411] via-[#0c2411]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c2411]/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase mb-3 w-fit">
                <Landmark size={14} />
                <span>Established 1965</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight max-w-2xl leading-tight">
                Navyug Vidyabhavan Trust
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-sans mt-2 max-w-xl leading-relaxed">
                A legacy of over 55 years in serving the educational needs of South Gujarat.
              </p>
            </div>
          </div>
        </div>

        {/* NARRATIVE SECTION */}
        <section className="bg-[#FAF8F3] border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#7E1B1F] tracking-tight">Genesis of Navyug Trust</h2>
              <div className="h-1 w-16 bg-[#D4AF37] rounded-full mt-2" />
            </div>
            <div className="px-4 py-2 rounded-xl bg-white border border-[#D4AF37]/30 shadow-xs font-mono text-xs font-bold text-slate-700">
              Reg. No: 1268 (Bombay Public Trust Act 1950)
            </div>
          </div>
          
          <div className="text-slate-700 leading-relaxed font-sans text-sm sm:text-base space-y-4">
            <p>
              The <strong>Navyug Vidyabhavan Trust</strong> was established in February 1965 with the noble goal of democratizing higher education opportunities in South Gujarat. Founded by the visionary <strong>Vashi Family</strong>, the trust began its journey by establishing premier colleges to serve students from diverse socioeconomic backgrounds.
            </p>
            <p>
              The trust has been graced by distinguished leadership throughout its history. <strong>Late Shri Morarji Desai</strong>, the former Prime Minister of India, served as the President of the trust, guiding its early developmental phases with high moral and nationalistic values.
            </p>
            <p>
              <strong>Shri C.K. Pithawalla</strong> joined the trust as a Trustee on 2nd May 1990 and later took over the mantle of President. His dynamic leadership and benevolent contributions transformed the trust into a premier educational hub, establishing several professional colleges named in his honor.
            </p>
            <p>
              Over the decades, the trust has earned immense respect for its democratic, merit-based admission guidelines and premium infrastructure setup. Under its expert governing board, the trust ensures that all affiliate colleges maintain high academic standards.
            </p>
          </div>
        </section>

        {/* INSTITUTES TABLE */}
        <section className="space-y-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-[#7E1B1F] font-mono text-xs font-bold uppercase tracking-widest">Sister Institutions</span>
            <h3 className="text-2xl font-serif font-bold text-slate-800">Institutes Managed by the Trust</h3>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-900 text-white font-serif">
                  <th className="px-6 py-4 text-sm font-bold border-b border-slate-800">Name of Institute</th>
                  <th className="px-6 py-4 text-sm font-bold border-b border-slate-800 text-center">Approved Intake</th>
                </tr>
              </thead>
              <tbody className="font-sans text-sm">
                {institutes.map((inst, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                    <td className="px-6 py-4 text-slate-800 font-medium">{inst.name}</td>
                    <td className="px-6 py-4 text-slate-600 text-center font-mono font-bold">{inst.intake}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* TRUST CHARTER */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#0c2411] text-white space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h4 className="text-xl font-serif font-bold">Registration & Compliance</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              The Trust is registered under the Bombay Public Trust Act 1950, holding Registration Number 1268. We adhere to the highest standards of transparency and educational regulation.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#D4AF37]/30 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
              <Award size={24} />
            </div>
            <h4 className="text-xl font-serif font-bold text-slate-900">Merit & Excellence</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our institutions follow a democratic, merit-based admission policy, ensuring that quality education remains accessible to all deserving candidates across South Gujarat.
            </p>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
