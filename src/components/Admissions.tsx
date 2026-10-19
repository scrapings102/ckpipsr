import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import { useClipReveal } from '../hooks/useClipReveal';
import { useAdmissionsContent } from '../hooks/useAdmissionsContent';
import { useFooterContent } from '../hooks/useFooterContent';
import { withPreview } from '../hooks/previewToken';
import { RichText } from '../utils/RichText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AdmissionsProps {
  onOpenAdmissions?: () => void;
}

export default function Admissions({ onOpenAdmissions }: AdmissionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useClipReveal();
  const content = useAdmissionsContent();
  // Rows saved before the band had its own email show the first one on Contact Us.
  const contactEmail = useFooterContent().contact?.emails[0] ?? '';
  const email = content.email || contactEmail;
  const [openFaqId, setOpenFaqId] = useState<number | null>(0); // default open first item
  const hasFaqs = content.faqs.length > 0;
  const prospectusIsExternal = /^https?:\/\//i.test(content.prospectusUrl);
  const applyUrl = content.applyAction === 'link' ? content.applyUrl ?? '' : '';
  const applyIsExternal = /^https?:\/\//i.test(applyUrl);
  const applyClassName =
    'bg-[#D4AF37] text-[#0c2411] hover:bg-white hover:text-[#0c2411] px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_12px_30px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-95 transition-all duration-300 w-full sm:w-auto cursor-pointer select-none';

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section
      ref={(el) => {
        if (el) {
          (revealRef as React.MutableRefObject<HTMLElement>).current = el;
          (containerRef as React.MutableRefObject<HTMLDivElement>).current = el as HTMLDivElement;
        }
      }}
      id="admissions"
      className="py-24 md:py-36 bg-[#0c2411] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Decorative geometric patterns */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/10 pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/10 pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-20 items-center">

          {/* COLUMN A: Dynamic Call to Actions */}
          <div className={`lg:col-span-12 ${hasFaqs ? 'xl:col-span-5' : 'max-w-3xl'} flex flex-col items-start text-left`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              {/* Category indicator badge */}
              <div
                onClick={onOpenAdmissions}
                className="flex items-center gap-2.5 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="w-10 h-[1.5px] bg-[#D4AF37]" />
                <span className="font-mono text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
                  {content.eyebrow} {content.session}
                </span>
                {content.isOpen && (
                  <span className="font-sans text-[8.5px] font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full uppercase shadow-2xs">
                    OPEN
                  </span>
                )}
              </div>

              <h2 className="text-4xl md:text-5.5xl font-serif text-white font-bold leading-[1.12] tracking-tight mb-6">
                {content.heading.lead}
                {content.heading.accent ? (
                  <>
                    {' '}
                    {/* The ending sits inside the phone's own line, so a full stop does not drop below on its own. */}
                    <span className="block sm:inline">
                      <span className="italic font-light text-[#D4AF37] font-serif">{content.heading.accent}</span>
                      {content.heading.end}
                    </span>
                  </>
                ) : (
                  content.heading.end
                )}
              </h2>

              <p className="text-white/75 leading-relaxed text-[14.5px] md:text-base mb-10 font-sans font-light">
                <RichText text={content.body} linkClassName="text-[#D4AF37] underline hover:text-[#f3e098] transition-colors" />
              </p>

              {/* Action buttons stack */}
              <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                {/* The editor picks whether the button goes to the admission inquiry
                    page or to an address. Older rows say 'popup' or nothing, and
                    go to the page too; the popup still opens from the label above. */}
                {applyUrl ? (
                  <a
                    href={applyUrl}
                    {...(applyIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`${applyClassName} text-center`}
                  >
                    {content.applyLabel}
                  </a>
                ) : (
                  <Link to={withPreview('/admissions/inquiry')} className={`${applyClassName} text-center`}>
                    {content.applyLabel}
                  </Link>
                )}

                {/* No address means no prospectus to give, so no button that does nothing. */}
                {content.prospectusUrl && (
                  <a
                    href={content.prospectusUrl}
                    {...(prospectusIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-3.5 text-xs font-bold uppercase tracking-widest text-white hover:text-[#D4AF37] transition-all group w-full sm:w-auto justify-center cursor-pointer select-none"
                  >
                    <span>{content.prospectusLabel}</span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-transparent group-hover:text-[#0c2411] transition-all group-hover:scale-105">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* COLUMN B: FAQ Accordions Stack */}
          {hasFaqs && (
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0b1b0e] border border-white/10 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md relative"
            >
              <div className="mb-8 select-none">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
                  {content.faqTitle}
                </h3>
                {content.faqIntro && (
                  <p className="font-sans text-white/60 font-light text-[12.5px] md:text-[13px]">
                    {content.faqIntro}
                  </p>
                )}
              </div>

              {/* Accordion loop */}
              <div className="flex flex-col gap-3.5">
                {content.faqs.map((faq, id) => {
                  const isOpen = id === openFaqId;
                  return (
                    <div
                      key={id}
                      className={`rounded-2xl border transition-all duration-350 relative overflow-hidden select-none ${isOpen
                        ? 'bg-[#112815] border-[#D4AF37]/60 shadow-md ring-1 ring-[#D4AF37]/20'
                        : 'bg-[#112815]/40 border-white/10 hover:border-[#D4AF37]/40 hover:bg-[#112815]/60'
                        }`}
                    >
                      {/* Accordion Header */}
                      <button
                        onClick={() => toggleFaq(id)}
                        className="w-full text-left py-4.5 px-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle
                            size={16}
                            className={`shrink-0 transition-colors duration-300 ${isOpen ? 'text-[#D4AF37]' : 'text-white/40'}`}
                          />
                          <span className={`font-sans text-[13.5px] md:text-[14.5px] font-semibold tracking-wide transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/80'}`}>
                            {faq.question}
                          </span>
                        </div>

                        <div className={`p-1.5 rounded-full border shrink-0 transition-all duration-300 ${isOpen ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] rotate-180' : 'border-white/10 text-white/40'
                          }`}>
                          <ChevronDown size={14} className="stroke-[2.5]" />
                        </div>
                      </button>

                      {/* Collapsible content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-0 border-t border-white/10 font-sans font-light text-[13px] md:text-[14px] leading-relaxed text-white/80">
                              <p className="mt-3 bg-[#0c2411] p-4 rounded-xl border border-[#D4AF37]/20 text-white/90">
                                <RichText text={faq.answer} linkClassName="text-[#D4AF37] underline hover:text-[#f3e098] transition-colors" />
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}
              </div>

              {/* Support message */}
              {(content.contactLine || email) && (
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  {content.contactLine && (
                    <span className="font-sans text-[11px] font-light text-white/50">
                      {content.contactLine}
                    </span>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="font-mono text-[10px] font-bold text-[#D4AF37] hover:underline block mt-1 hover:text-white uppercase tracking-wider break-words"
                    >
                      {content.contactLabel ? `${content.contactLabel}: ${email}` : email}
                    </a>
                  )}
                </div>
              )}

            </motion.div>
          </div>
          )}

        </div>
      </div>
    </section>
  );
}
