import React from "react";
import { useLocation } from "react-router-dom";
import { HelpCircle, ExternalLink, Video, CheckCircle2, FileText, Download, Image as ImageIcon, Quote, Sparkles, Mail, Phone, MapPin, Clock } from "lucide-react";
import SubPageLayout from "../components/SubPageLayout";
import { getCkpipsrPage } from "../data/ckpipsrContent";
import { 
  FounderLayout, 
  TrustLayout, 
  GoverningBodyLayout, 
  PrincipalLayout, 
  DeansLayout 
} from "../components/LeadershipSubPages";

export default function DynamicSubPage() {
  const location = useLocation();
  const pageInfo = getCkpipsrPage(location.pathname);

  if (!pageInfo) {
    return (
      <SubPageLayout
        title="Page Not Found"
        subtitle="The requested page could not be located."
        category="about"
        activeItemLabel="Not Found"
      >
        <div className="text-center py-20 space-y-4">
          <HelpCircle size={48} className="mx-auto text-slate-400" />
          <h2 className="text-xl font-bold font-serif text-slate-800">Page Not Found</h2>
          <p className="text-slate-600 max-w-md mx-auto">
            Please use the navigation menus above or click on one of the items to browse the academic portal.
          </p>
        </div>
      </SubPageLayout>
    );
  }

  const { page, categoryLabel } = pageInfo;

  return (
    <SubPageLayout
      title={page.Title || page.Page}
      subtitle={`Academic Portal — ${categoryLabel}`}
      category={categoryLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      activeItemLabel={page.Page}
    >
      <div className="space-y-12">
        {/* Tailored Governance & Leadership Layouts */}
        {page.Page === "The Founder" && (
          <FounderLayout />
        )}
        {page.Page === "The Trust" && (
          <TrustLayout />
        )}
        {page.Page === "Governing Body" && (
          <GoverningBodyLayout />
        )}
        {page.Page === "Principal" && (
          <PrincipalLayout page={page} />
        )}
        {page.Page === "Deans and Faculty In-charges" && (
          <DeansLayout />
        )}

        {/* 1. Page sections and Top Images (Fallback for standard pages) */}
        {!["The Founder", "The Trust", "Governing Body", "Principal", "Deans and Faculty In-charges"].includes(page.Page) && (page.Sections?.length > 0 || page.Images?.length > 0) && (
          <div className="space-y-12">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className={`space-y-12 ${page.Images?.length > 0 ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-12'}`}>
                {page.Sections?.map((section, idx) => {
                  const paragraphs = section.text
                    .split("\n")
                    .map((p) => p.trim())
                    .filter((p) => p.length > 0);

                  return (
                    <div key={idx} className="space-y-6">
                      {section.heading && (
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                          <div className="w-1.5 h-6 bg-[#D4AF37] rounded-full shrink-0" />
                          <h3 className="font-serif font-bold text-2xl text-slate-900 leading-tight">
                            {section.heading}
                          </h3>
                        </div>
                      )}
                      <div className="space-y-4 max-w-none">
                        {paragraphs.map((p, pIdx) => {
                          const pLower = p.toLowerCase();
                          
                          // 1. Skip if it's just repeating the page title exactly
                          if (pLower === page.Page.toLowerCase() || (pLower === "vision and mission" && page.Page === "Vision and Mission")) {
                            return null;
                          }

                          // 2. Entirely UPPERCASE statement (Vision statement, etc.)
                          if (p.length > 20 && p === p.toUpperCase()) {
                            return (
                              <div key={pIdx} className="my-8 p-6 sm:p-8 rounded-2xl bg-[#FAF8F3] border-l-4 border-[#D4AF37] border border-[#D4AF37]/10 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-4 right-4 text-[#D4AF37]/10 pointer-events-none">
                                  <Quote size={56} className="stroke-[3]" />
                                </div>
                                <div className="relative z-10 flex gap-4 items-start">
                                  <div className="p-2 rounded-xl bg-amber-100/50 text-[#D4AF37] shrink-0 mt-1">
                                    <Sparkles size={18} className="animate-pulse" />
                                  </div>
                                  <p className="font-serif italic text-base sm:text-lg text-slate-800 leading-relaxed tracking-wide font-medium">
                                    {p}
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          // 3. Known Contact Info fields
                          if (pLower.includes("address") && p.length < 15) {
                            return (
                              <h4 key={pIdx} className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold mt-8 mb-2 flex items-center gap-2">
                                <MapPin size={14} />
                                <span>{p}</span>
                              </h4>
                            );
                          }
                          if (pLower.includes("timings") && p.length < 20) {
                            return (
                              <h4 key={pIdx} className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold mt-8 mb-2 flex items-center gap-2">
                                <Clock size={14} />
                                <span>{p}</span>
                              </h4>
                            );
                          }
                          if ((pLower.includes("call us") || pLower.includes("phone")) && p.length < 15) {
                            return (
                              <h4 key={pIdx} className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold mt-8 mb-2 flex items-center gap-2">
                                <Phone size={14} />
                                <span>{p}</span>
                              </h4>
                            );
                          }
                          if (pLower.includes("email") && p.length < 15) {
                            return (
                              <h4 key={pIdx} className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold mt-8 mb-2 flex items-center gap-2">
                                <Mail size={14} />
                                <span>{p}</span>
                              </h4>
                            );
                          }

                          // 4. Detect actual phone numbers or email addresses in the text to style them as buttons
                          if (p.includes("@") && p.toLowerCase().includes(".com")) {
                            return (
                              <div key={pIdx} className="my-2">
                                <a 
                                  href={`mailto:${p.trim()}`} 
                                  className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 border border-slate-200 hover:border-[#D4AF37] hover:bg-amber-50/20 rounded-xl font-mono text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#D4AF37] transition-all shadow-sm"
                                >
                                  <Mail size={14} />
                                  <span>{p}</span>
                                </a>
                              </div>
                            );
                          }

                          const phoneRegex = /(?:\+?\d{1,3}[- ]?)?\(?\d{3,4}\)?[- ]?\d{3,4}[- ]?\d{3,4}/;
                          if (phoneRegex.test(p) && p.length < 30) {
                            const match = p.match(phoneRegex);
                            const cleanPhone = match ? match[0].replace(/[^0-9+]/g, '') : '';
                            return (
                              <div key={pIdx} className="my-2">
                                <a 
                                  href={`tel:${cleanPhone}`} 
                                  className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 border border-slate-200 hover:border-[#D4AF37] hover:bg-amber-50/20 rounded-xl font-mono text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#D4AF37] transition-all shadow-sm"
                                >
                                  <Phone size={14} />
                                  <span>{p}</span>
                                </a>
                              </div>
                            );
                          }

                          // 5. Short heading/labels (e.g. "PEOs", "POs", "Vision", "Mission", "President", "Trustee")
                          const isShortLabel = p.length < 50 && (
                            pLower === "vision" || 
                            pLower === "mission" || 
                            pLower === "peos" || 
                            pLower === "pos" ||
                            pLower === "president" ||
                            pLower === "trustee" ||
                            pLower === "trustee/secretary" ||
                            pLower === "committee" ||
                            p.endsWith(":")
                          );
                          
                          if (isShortLabel) {
                            const cleanText = p.endsWith(":") ? p.slice(0, -1) : p;
                            return (
                              <div key={pIdx} className="mt-8 mb-4 border-l-4 border-[#D4AF37] pl-3.5 py-0.5">
                                <h4 className="font-serif font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-none uppercase">
                                  {cleanText}
                                </h4>
                              </div>
                            );
                          }

                          // 6. Styled Bullet List Item (starts with bullet, or starts with common list verbs / "To provide", "To train", "To develop", etc.)
                          const isBulletLike = p.startsWith('- ') || p.startsWith('• ') || p.startsWith('* ') || 
                            (p.length < 200 && (
                              p.startsWith("To ") || 
                              p.startsWith("Possess ") || 
                              p.startsWith("Demonstrate ") || 
                              p.startsWith("Utilize ")
                            ));

                          if (isBulletLike) {
                            const cleanP = p.replace(/^[-•*]\s*/, '');
                            return (
                              <div 
                                key={pIdx} 
                                className="flex gap-3 items-start my-3 bg-slate-50/50 hover:bg-amber-50/10 border border-slate-100 hover:border-[#D4AF37]/20 p-4 rounded-xl transition-all shadow-sm"
                              >
                                <div className="p-1 rounded-full bg-amber-50 text-[#D4AF37] mt-0.5 shrink-0">
                                  <CheckCircle2 size={14} className="stroke-[2.5]" />
                                </div>
                                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans font-medium">
                                  {cleanP}
                                </p>
                              </div>
                            );
                          }

                          // 7. Standard paragraphs (with beautiful styling, and full justification)
                          return (
                            <p 
                              key={pIdx} 
                              className="mb-6 text-justify text-slate-600 font-sans text-sm sm:text-base leading-relaxed"
                            >
                              {p}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Featured Images Side Column */}
              {page.Images && page.Images.filter(Boolean).length > 0 && (
                <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-32">
                  {page.Images.filter(Boolean).map((imgUrl, idx) => (
                    <div 
                      key={idx}
                      className="rounded-2xl overflow-hidden border-[4px] border-white shadow-xl bg-slate-100 relative group"
                    >
                      <img 
                        src={imgUrl}
                        alt={`${page.Title || page.Page} image ${idx + 1}`}
                        className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const pLower = page.Page.toLowerCase();
                          if (pLower.includes("lab")) target.src = "/images/hero/pharmacy_lab.jpg";
                          else if (pLower.includes("campus") || pLower.includes("profile")) target.src = "/images/hero/college_campus.jpg";
                          else if (pLower.includes("student") || pLower.includes("activity")) target.src = "/images/hero/students_learning.jpg";
                          else target.src = "/images/hero/66e153e687221.webp";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. Documents Section */}
        {page.Documents && page.Documents.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h4 className="font-serif font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
              <FileText className="text-[#D4AF37]" size={20} />
              <span>Reference Documents</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {page.Documents.map((docUrl, idx) => {
                const docName = docUrl.split("/").pop() || `Document ${idx + 1}`;
                return (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow group flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                          <FileText size={16} />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider">PDF Resource</span>
                      </div>
                      <h5 className="font-sans font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                        {docName}
                      </h5>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-4">
                      <a 
                        href={docUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white hover:bg-[#D4AF37] text-slate-800 hover:text-white border border-slate-200 rounded-xl font-mono text-xs font-bold transition-all shadow-2xs"
                      >
                        <Download size={14} />
                        <span>Download Circular</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {page.Videos && page.Videos.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h4 className="font-serif font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
              <Video className="text-[#D4AF37]" size={20} />
              <span>Video Gallery</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {page.Videos.map((videoUrl, idx) => {
                const isYoutube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
                let embedUrl = "";
                if (isYoutube) {
                  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                  const match = videoUrl.match(regExp);
                  if (match && match[2].length === 11) {
                    embedUrl = `https://www.youtube.com/embed/${match[2]}`;
                  }
                }

                return (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden p-4 space-y-4 shadow-xs">
                    {embedUrl ? (
                      <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200">
                        <iframe
                          src={embedUrl}
                          title={`${page.Title || page.Page} Video ${idx + 1}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-3 relative group">
                        <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-[#0c2411] transition-all shadow-md">
                          <Video size={24} className="ml-0.5" />
                        </div>
                        <div>
                          <span className="text-white font-serif font-bold block text-sm">Play Video Stream</span>
                          <span className="text-white/40 text-[11px] font-mono select-none block truncate max-w-xs">{videoUrl}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span className="text-xs font-mono font-bold text-slate-500">Video #{idx + 1}</span>
                      <a 
                        href={videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#D4AF37] hover:text-slate-900 transition-colors"
                      >
                        <span>Open Video Link</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. Highlights */}
        <div className="bg-[#FAF8F3] p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-4">
          <h4 className="font-serif font-bold text-lg text-slate-800">Campus Information Checklist</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex gap-3 items-start text-xs sm:text-sm text-slate-700 font-sans font-medium bg-white p-4 rounded-xl border border-slate-100">
              <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Affiliated to Gujarat Technological University</span>
            </div>
            <div className="flex gap-3 items-start text-xs sm:text-sm text-slate-700 font-sans font-medium bg-white p-4 rounded-xl border border-slate-100">
              <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Approved by Pharmacy Council of India (PCI)</span>
            </div>
            <div className="flex gap-3 items-start text-xs sm:text-sm text-slate-700 font-sans font-medium bg-white p-4 rounded-xl border border-slate-100">
              <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Managed by Navyug Vidyabhavan Trust</span>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
