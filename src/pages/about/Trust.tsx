import React from "react";
import {
  Award,
  BookOpen,
  Building,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useTrustContent } from "../../hooks/useTrustContent";
import { withEmphasis } from "../../utils/emphasis";

/**
 * The icons an editor can choose from for the charter cards — the other half of
 * TRUST_ICONS in the API's schema. ShieldCheck is the fallback, because a
 * missing icon should be a wrong picture rather than a crash.
 */
const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  ShieldCheck,
  Award,
  Landmark,
  Building,
  Scale,
  BookOpen,
  Users,
  Sparkles,
};

/** The two colourways the charter cards alternate between. */
const TONES: Record<string, { card: string; icon: string; title: string; body: string }> = {
  dark: {
    card: "p-6 rounded-2xl bg-[#0c2411] text-white space-y-4",
    icon: "w-12 h-12 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center",
    title: "text-xl font-serif font-bold",
    body: "text-slate-300 text-sm leading-relaxed",
  },
  light: {
    card: "p-6 rounded-2xl bg-[#FAF8F3] border border-[#D4AF37]/30 space-y-4",
    icon: "w-12 h-12 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center",
    title: "text-xl font-serif font-bold text-slate-900",
    body: "text-slate-600 text-sm leading-relaxed",
  },
};

export default function Trust() {
  const content = useTrustContent();

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="about-us"
      activeItemLabel="The Trust"
    >
      <div className="space-y-12 text-[#3B3131]">

        {/* HERO IMAGE FOCUS BANNER */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl group">
          <div className="aspect-[16/7] md:aspect-[21/8] w-full relative bg-slate-900 overflow-hidden">
            <img
              src={content.banner.image}
              alt={content.banner.imageAlt}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2411] via-[#0c2411]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c2411]/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase mb-3 w-fit">
                <Landmark size={14} />
                <span>{content.banner.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight max-w-2xl leading-tight">
                {content.banner.title}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-sans mt-2 max-w-xl leading-relaxed">
                {content.banner.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* NARRATIVE SECTION */}
        <section className="bg-[#FAF8F3] border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#7E1B1F] tracking-tight">
                {content.narrative.title}
              </h2>
              <div className="h-1 w-16 bg-[#D4AF37] rounded-full mt-2" />
            </div>
            <div className="px-4 py-2 rounded-xl bg-white border border-[#D4AF37]/30 shadow-xs font-mono text-xs font-bold text-slate-700">
              {content.narrative.registration}
            </div>
          </div>

          <div className="text-slate-700 leading-relaxed font-sans text-sm sm:text-base space-y-4">
            {content.narrative.body.map((paragraph, idx) => (
              <p key={idx}>{withEmphasis(paragraph, "font-bold")}</p>
            ))}
          </div>
        </section>

        {/* INSTITUTES TABLE */}
        <section className="space-y-6">
          <div className="text-center md:text-left space-y-1">
            <span className="text-[#7E1B1F] font-mono text-xs font-bold uppercase tracking-widest">
              {content.institutes.eyebrow}
            </span>
            <h3 className="text-2xl font-serif font-bold text-slate-800">
              {content.institutes.title}
            </h3>
          </div>

          {/* The table can outrun a narrow screen, so it scrolls inside its own
              box rather than widening the page. */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-900 text-white font-serif">
                  <th className="px-6 py-4 text-sm font-bold border-b border-slate-800">
                    {content.institutes.nameColumn}
                  </th>
                  <th className="px-6 py-4 text-sm font-bold border-b border-slate-800 text-center">
                    {content.institutes.intakeColumn}
                  </th>
                </tr>
              </thead>
              <tbody className="font-sans text-sm">
                {content.institutes.items.map((inst, idx) => (
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
          {content.charter.map((card, idx) => {
            const Icon = ICONS[card.icon] ?? ShieldCheck;
            const tone = TONES[card.tone] ?? TONES.dark;
            return (
              <div key={idx} className={tone.card}>
                <div className={tone.icon}>
                  <Icon size={24} />
                </div>
                <h4 className={tone.title}>{card.title}</h4>
                <p className={tone.body}>{card.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </SubPageLayout>
  );
}
