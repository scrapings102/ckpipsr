import { useNavigate } from 'react-router-dom';
import { Quote, Feather, User, ArrowRight, Landmark } from 'lucide-react';
import { DEFAULT_PRINCIPAL, usePrincipalContent } from '../hooks/usePrincipalContent';

/** Shown in the circle when the photo fails to load. */
const avatarFor = (name: string) =>
  `/api/avatar?name=${encodeURIComponent(name)}&background=123a1a&color=D4AF37&size=512`;

/**
 * The home page card. The photo, name, badge and qualifications are the
 * Principal page's own, so they are edited once; the heading, quote and button
 * wording are the card's, and a blank one falls back to what the card shipped with.
 */
export const PrincipalMessage = () => {
  const navigate = useNavigate();
  const { portrait, quote: pageQuote, homeCard } = usePrincipalContent();
  const fallback = DEFAULT_PRINCIPAL.homeCard;
  const heading = homeCard.heading || fallback.heading;
  const quote = homeCard.quote || pageQuote || fallback.quote;
  const buttonLabel = homeCard.buttonLabel || fallback.buttonLabel;
  // A page on this site, or another site in a new tab, as set in the panel.
  const buttonHref = homeCard.buttonHref || "/about-us/principal";

  return (
    <section id="principal-message" className="py-16 sm:py-24 bg-[#f2f2f0] relative overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#123a1a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Main Card Container */}
        <div className="max-w-6xl mx-auto bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_24px_60px_rgba(0,0,0,0.08)] border border-slate-200/80 relative overflow-hidden flex flex-col md:flex-row items-stretch">

          {/* ── TOP-LEFT HANGING RIBBON ── */}
          <div
            className="absolute top-0 left-6 sm:left-12 z-30 w-12 sm:w-14 h-24 sm:h-28 bg-[#123b1a] flex flex-col items-center pt-4 shadow-md pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%)'
            }}
          >
            <Landmark size={20} className="text-[#D4AF37]" />
            <div className="w-5 h-[2px] bg-[#D4AF37] mt-2" />
            <div className="w-3 h-[1px] bg-[#D4AF37]/60 mt-1" />
          </div>

          {/* ── BOTTOM-RIGHT GEOMETRIC CORNER ACCENT ── */}
          <div className="absolute bottom-0 right-0 z-0 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0 bg-[#123b1a]"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            />
            {/* Parallel decorative gold lines across bottom right */}
            <svg className="absolute inset-0 w-full h-full stroke-[#D4AF37]/40" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="30" y1="100" x2="100" y2="30" strokeWidth="1" />
              <line x1="45" y1="100" x2="100" y2="45" strokeWidth="1" />
              <line x1="60" y1="100" x2="100" y2="60" strokeWidth="1" />
              <line x1="75" y1="100" x2="100" y2="75" strokeWidth="1.5" />
            </svg>
          </div>

          {/* ───────── LEFT COLUMN: CIRCULAR PORTRAIT & WATERMARK ───────── */}
          <div className="w-full md:w-[38%] lg:w-[36%] flex flex-col items-center justify-center relative p-6 sm:p-12 md:py-16 md:border-r border-slate-200/70 shrink-0">

            {/* Faint Architectural Line-Art Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-6 text-slate-400 pointer-events-none p-6">
              <Landmark size={140} strokeWidth={1} />
            </div>

            {/* Circular Photo Container */}
            <div className="relative z-10 my-4 sm:my-6">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-full p-1.5 bg-gradient-to-b from-[#123b1a]/15 via-slate-200 to-[#123b1a]/40 shadow-[0_16px_36px_rgba(0,0,0,0.12)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#123b1a] relative border-4 border-white">
                  <img
                    src={portrait.image || avatarFor(portrait.name)}
                    alt={portrait.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const img = e.currentTarget;
                      // Once only, so a failing avatar cannot loop.
                      img.onerror = null;
                      if (img.src !== avatarFor(portrait.name)) img.src = avatarFor(portrait.name);
                    }}
                  />
                </div>
              </div>

              {/* Gold Quote Badge Pinned to Bottom of Circle */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#251E1C] border-2 border-[#D4AF37] w-10 h-10 rounded-full flex items-center justify-center text-[#D4AF37] shadow-lg z-20">
                <Quote size={18} className="fill-[#D4AF37]" />
              </div>
            </div>

          </div>

          {/* ───────── RIGHT COLUMN: MESSAGE & PRINCIPAL INFO ───────── */}
          <div className="w-full md:w-[62%] lg:w-[64%] p-5 sm:p-10 lg:p-14 flex flex-col justify-center relative z-10 space-y-6 sm:space-y-8">

            {/* Header Badge & Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
                <Feather size={16} />
              </div>
              <div>
                <span className="text-[#251E1C] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] block">
                  {heading}
                </span>
                <div className="h-[2px] w-10 bg-[#D4AF37] mt-1" />
              </div>
            </div>

            {/* Featured Quote */}
            <div className="relative pl-1 sm:pl-2">
              <p className="font-serif italic text-slate-800 text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium">
                <span className="text-[#D4AF37] text-2xl sm:text-3xl font-serif mr-1">“</span>
                {quote}
                <span className="text-[#D4AF37] text-2xl sm:text-3xl font-serif ml-1">”</span>
              </p>
            </div>

            {/* Horizontal Ornamental Line */}
            <div className="flex items-center gap-3 w-full my-2">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-white flex items-center justify-center shrink-0">
                <div className="w-1 h-1 bg-[#D4AF37]" />
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />
            </div>

            {/* Principal Name & Role */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#251E1C] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-900 text-xl sm:text-2xl tracking-tight leading-tight">
                    {portrait.name}
                  </h4>
                  {(portrait.badge || portrait.qualifications) && (
                    <p className="text-slate-500 font-mono text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-wider mt-0.5">
                      {portrait.badge}
                      {portrait.badge && portrait.qualifications && <span className="text-[#D4AF37] font-normal"> | </span>}
                      {portrait.qualifications}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button: Open Principal Subpage */}
              <button
                type="button"
                onClick={() =>
                  buttonHref.startsWith("/")
                    ? navigate(buttonHref)
                    : window.open(buttonHref, "_blank", "noopener,noreferrer")
                }
                className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 bg-[#123b1a] hover:bg-[#1b4d24] text-white rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group cursor-pointer border border-[#D4AF37]/30 shrink-0 self-start sm:self-auto mt-2 sm:mt-0"
              >
                <span>{buttonLabel}</span>
                <ArrowRight size={15} className="text-[#D4AF37] group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
