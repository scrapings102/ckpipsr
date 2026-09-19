import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Users, FileText, Clock, ExternalLink, Filter, HelpCircle, MapPin, Sparkles } from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { ACTIVITY_EVENTS, EVENT_CATEGORIES, ACTIVITY_EVENT_PHOTOS, ActivityEvent } from "../../data/activityEventsData";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredEvents = selectedCategory === "all"
    ? ACTIVITY_EVENTS
    : ACTIVITY_EVENTS.filter(event => event.category === selectedCategory);

  return (
    <SubPageLayout
      title="Campus Events"
      subtitle="Academic Portal — Activities"
      category="activities"
      activeItemLabel="Events"
    >
      <div className="space-y-16">
        {/* Intro Banner */}
        <div className="relative bg-[#123a1a] rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl border border-[#D4AF37]/20">
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-md text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles size={12} className="animate-pulse" />
              <span>Co-Curricular Hub</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Symposia, Contests & Initiatives
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
              CKPIPSR encourages an interactive environment with academic quizzes, healthcare campaigns, 
              awareness sessions, and collaborative national activities to shape professional pharmacy leaders.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-700 font-serif font-bold text-base">
            <Filter size={18} className="text-[#D4AF37]" />
            <span>Filter by Category</span>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-[#123a1a] text-[#D4AF37] border-transparent shadow-md"
                  : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              All ({ACTIVITY_EVENTS.length})
            </button>
            {EVENT_CATEGORIES.map(category => {
              const count = ACTIVITY_EVENTS.filter(e => e.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-[#123a1a] text-[#D4AF37] border-transparent shadow-md"
                      : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              {selectedCategory === "all" ? "All Activity Events" : `${selectedCategory}s`}
            </h3>
            <span className="text-xs font-mono font-bold text-slate-400">
              Showing {filteredEvents.length} of {ACTIVITY_EVENTS.length}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredEvents.map((event, idx) => (
                  <motion.div
                    layout
                    key={event.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      {/* Top metadata row */}
                      <div className="flex items-center justify-between gap-2">
                        {event.category && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#123a1a]/5 border border-[#123a1a]/15 text-[#123a1a] text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1 h-1 bg-[#D4AF37] rounded-full shrink-0 animate-pulse" />
                            <span>{event.category}</span>
                          </span>
                        )}
                        {event.participants && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <Users size={12} className="text-[#D4AF37]" />
                            <span>{event.participants} Participated</span>
                          </span>
                        )}
                      </div>

                      {/* Main Title */}
                      <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#123a1a] transition-colors line-clamp-3">
                        {event.title}
                      </h4>

                      {/* Conducted By */}
                      {event.conductedBy && (
                        <div className="flex gap-2 items-start text-xs text-slate-500 leading-relaxed bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                          <MapPin size={12} className="text-[#D4AF37] shrink-0 mt-0.5" />
                          <span className="font-medium">Conducted by: <strong className="text-slate-700">{event.conductedBy}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Metadata & Document Row */}
                    <div className="pt-4 border-t border-slate-100 mt-6 space-y-3">
                      {event.duration && (
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono font-semibold">
                          <Clock size={12} className="text-[#D4AF37]" />
                          <span>{event.duration}</span>
                        </div>
                      )}

                      {event.report && (
                        <a
                          href={`https://ckpipsr.ac.in/documents/activities/events/${encodeURIComponent(event.report)}.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#D4AF37] hover:text-[#123a1a] transition-colors group/link pt-1"
                        >
                          <FileText size={12} />
                          <span className="underline decoration-dotted">{event.report}</span>
                          <ExternalLink size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-slate-50/50 rounded-2xl border border-slate-200/60"
              >
                <HelpCircle size={44} className="mx-auto text-slate-300 mb-4" />
                <h4 className="text-lg font-serif font-bold text-slate-700">No Events Listed</h4>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto font-medium">
                  There are no current events registered under the selected category at this time.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Gallery Section */}
        <div className="space-y-6 pt-8 border-t border-slate-100">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-2xl text-slate-900">
              Campus Event Chronicles
            </h3>
            <p className="text-sm font-medium text-slate-500">
              A chronological photo feed documenting the interactive celebrations, workshops, and student assemblies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ACTIVITY_EVENT_PHOTOS.map((photoUrl, idx) => (
              <div 
                key={idx}
                className="group relative aspect-video sm:aspect-square bg-slate-100 rounded-2xl overflow-hidden border-[4px] border-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={photoUrl}
                  alt={`Campus Event Moment ${idx + 1}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                    Event Snapshot #{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
