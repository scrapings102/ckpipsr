import React from "react";
import { Award, Sparkles } from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useFounderContent } from "../../hooks/useFounderContent";
import { withEmphasis } from "../../utils/emphasis";

/**
 * The first paragraph opens on a drop cap. It is only taken when the paragraph
 * starts with a plain character — splitting "**Shri…**" there would break the
 * bold markers and print a stray asterisk.
 */
function Opening({ text }: { text: string }) {
  if (!/^[\p{L}\p{N}]/u.test(text)) return <p>{withEmphasis(text, "font-bold")}</p>;
  return (
    <p>
      <span className="float-left text-6xl font-serif font-bold text-[#D4AF37] mr-3 mt-1 leading-[0.8]">
        {text[0]}
      </span>
      {withEmphasis(text.slice(1), "font-bold")}
    </p>
  );
}

export default function Founder() {
  const content = useFounderContent();
  const [opening, ...rest] = content.body;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="about-us"
      activeItemLabel="The Founder"
    >
      <div className="space-y-12 text-[#3B3131]">
        
        {/* HERO FOUNDER PORTRAIT & BIOGRAPHY */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#FAF8F3] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden">
          
          {/* Main Portrait Frame - Takes prominent 5 cols with much larger portrait */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative p-3 bg-white border-2 border-[#D4AF37]/50 shadow-2xl rounded-3xl group max-w-sm mx-auto lg:max-w-none flex flex-col gap-3">
              <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37] z-20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#0c2411] z-20 pointer-events-none" />
              
              <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src={content.portrait.image}
                  alt={content.portrait.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title & Role placed below the image */}
              <div className="p-4 rounded-xl bg-[#0c2411] border border-[#D4AF37]/40 text-center shadow-md">
                <span className="font-serif font-bold text-white text-lg block">{content.portrait.name}</span>
                <span className="font-mono text-xs tracking-widest text-[#D4AF37] uppercase font-bold block mt-1">{content.portrait.role}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm max-w-sm mx-auto lg:max-w-none">
              <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold block">{content.motto.label}</span>
              <p className="text-xs text-slate-700 italic mt-1 font-serif leading-relaxed">
                "{content.motto.text}"
              </p>
            </div>
          </div>

          {/* Biography & Vision */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7E1B1F]/10 border border-[#7E1B1F]/20 text-[#7E1B1F] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles size={14} />
              <span>{content.eyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0c2411] leading-tight">
              {content.heading}
            </h2>

            <div className="text-slate-700 leading-relaxed font-sans text-sm sm:text-base space-y-4">
              {opening && <Opening text={opening} />}
              {rest.map((paragraph, idx) => (
                <p key={idx}>{withEmphasis(paragraph, "font-bold")}</p>
              ))}
            </div>

            <div className="border-l-4 border-[#D4AF37] bg-white p-5 rounded-r-2xl italic font-serif text-sm sm:text-base leading-relaxed text-slate-800 shadow-sm">
              "{content.quote}"
            </div>
          </div>

        </div>

        {/* VIDEOS SECTION — hidden when there are none. The embed URL is built
            here from a validated id, so no editor text becomes an iframe src. */}
        {content.media.videos.length > 0 && (
          <section className="pt-6 border-t border-slate-200 space-y-6">
            <div className="flex items-center gap-2">
              <Award className="text-[#D4AF37]" size={20} />
              <h3 className="text-xl font-serif font-bold text-slate-800">{content.media.title}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {content.media.videos.map((video, idx) => (
                <div key={idx} className="aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${encodeURIComponent(video.youtubeId)}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* HISTORICAL TIMELINE */}
        <section className="pt-6 border-t border-slate-200 space-y-6">
          <h3 className="text-xl font-serif font-bold text-slate-800">{content.timeline.title}</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.timeline.items.map((item, idx) => (
              <div key={idx} className="bg-[#FAF8F3] border border-slate-200 p-6 rounded-2xl relative flex flex-col justify-between hover:border-[#D4AF37] transition-colors shadow-sm">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#D4AF37] block mb-1">{item.year}</span>
                  <h4 className="font-serif font-bold text-slate-800 text-base leading-tight">{item.title}</h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-sans">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </SubPageLayout>
  );
}
