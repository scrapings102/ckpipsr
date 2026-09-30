import React from "react";
import { motion } from "motion/react";
import SubPageLayout from "../../components/SubPageLayout";
import { MapPin, Clock, Phone, Mail, Navigation, Building } from "lucide-react";
import { useContactContent } from "../../hooks/useContactContent";

/**
 * Links are built here from values the API has already checked: a `tel:` from
 * the digits of a printed number, a `mailto:` from a validated address. No
 * editor text is ever used as a scheme.
 */
const telHref = (number: string) => `tel:${number.replace(/[^\d+]/g, "")}`;

export default function ContactUs() {
  const content = useContactContent();

  const cards = [
    {
      title: content.address.title,
      icon: MapPin,
      content: content.address.text,
      accent: "text-[#123a1a]",
    },
    {
      title: content.timings.title,
      icon: Clock,
      content: content.timings.hours,
      sub: content.timings.days,
      note: content.timings.note,
      accent: "text-[#D4AF37]",
    },
    {
      title: content.phones.title,
      icon: Phone,
      links: content.phones.numbers.map((n) => ({ label: n, href: telHref(n) })),
      accent: "text-[#123a1a]",
    },
    {
      title: content.emails.title,
      icon: Mail,
      links: content.emails.addresses.map((e) => ({ label: e, href: `mailto:${e}` })),
      accent: "text-[#D4AF37]",
    },
  ];

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="about-us"
      activeItemLabel="Contact Us"
    >
      <div className="space-y-16">
        {/* CAMPUS IMAGE BANNER - Refined Bento Style */}
        <section className="relative group overflow-hidden rounded-[3rem] h-[300px] md:h-[400px]">
          <img
            src={content.banner.image}
            alt={content.banner.imageAlt}
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-1000 opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c2411] via-[#0c2411]/40 to-transparent" />

          <div className="absolute inset-0 p-10 flex flex-col justify-end">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                <Building size={14} />
                <span>{content.banner.badge}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {content.banner.headingLead} <br /><span className="text-[#D4AF37]">{content.banner.headingAccent}</span>
              </h2>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((item, iIdx) => (
            <motion.div
              key={iIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: iIdx * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all duration-500 group flex flex-col"
            >
              <div className="space-y-6 flex-1">
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-inner ${item.accent}`}>
                   <item.icon size={24} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif font-bold text-slate-900">{item.title}</h3>
                  {item.content && (
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {item.content}
                    </p>
                  )}
                  {item.sub && (
                    <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest block">
                      {item.sub}
                    </span>
                  )}
                  {item.note && (
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50/90 border border-amber-200/70 text-amber-900 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                        <span>Note: {item.note}</span>
                      </span>
                    </div>
                  )}
                  {item.links && (
                    <div className="space-y-2">
                       {item.links.map((link, lIdx) => (
                         <a key={lIdx} href={link.href} className="block text-sm font-bold text-slate-700 hover:text-[#123a1a] transition-colors font-mono break-all">
                           {link.label}
                         </a>
                       ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Embedded Map Section - Refined */}
        <section className="bg-white rounded-[3rem] p-4 md:p-8 border border-slate-100 shadow-2xl relative overflow-hidden group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-4">
            <div className="space-y-2">
               <div className="flex items-center gap-3">
                 <Navigation className="text-[#D4AF37]" size={24} />
                 <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight">{content.map.title}</h3>
               </div>
               {content.map.subtitle && (
                 <p className="text-slate-500 font-medium">{content.map.subtitle}</p>
               )}
            </div>
            <a
              href={content.map.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#123a1a] text-[#D4AF37] font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-[#123a1a]/10 hover:bg-[#1a4a25] transition-all"
            >
              {content.map.buttonLabel}
            </a>
          </div>

          <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-[2rem] overflow-hidden border border-slate-100 shadow-inner group-hover:shadow-2xl transition-all duration-700">
            {/* Only ever a Google Maps embed; the API refuses anything else. */}
            <iframe
              src={content.map.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${content.map.title} — map`}
              className="filter contrast-125 saturate-50 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
