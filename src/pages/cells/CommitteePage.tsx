import React, { useState } from "react";
import { motion } from "motion/react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Rocket,
  Scale,
  Copy,
  ExternalLink,
  FileText,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import SubPageLayout from "../../components/SubPageLayout";
import { useCellCommittee, type PublicCommittee } from "../../hooks/useCellCommittee";
import { useCellsMenu } from "../../hooks/useCellsMenu";
import { DEFAULT_COMMITTEES } from "../../data/cellsDefaults";
import IncidentComplaint from "./IncidentComplaint";
import GrievanceComplaint from "./GrievanceComplaint";
import StudentGrievanceComplaint from "./StudentGrievanceComplaint";

type Tab = "committee" | "squad" | "circulars" | "complaint";

/** The label each page is listed under in the Cells menu. */
const MENU_LABEL: Record<string, string> = {
  arc: "ARC",
  wdc: "WDC",
  "sc-st-cell": "SC-ST Cell",
  grc: "GRC",
  adc: "ADC",
  edc: "EDC",
  gsc: "GSC",
};

/** The mandate icons the panel offers, by the name it stores. */
const MANDATE_ICON: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  handshake: HeartHandshake,
  scale: Scale,
  rocket: Rocket,
};

const TAB_META: Record<Tab, { label: string; icon: LucideIcon }> = {
  committee: { label: "Committee", icon: Users },
  squad: { label: "Squad", icon: ShieldCheck },
  circulars: { label: "Circulars", icon: FileText },
  complaint: { label: "Complaint", icon: ShieldAlert },
};

const telHref = (phone: string) => `tel:${phone.replace(/[^0-9]/g, "")}`;

/**
 * An address with no committee behind it. While the first request is still
 * out this says nothing rather than flashing "not found" at a page that is
 * about to load.
 */
function CommitteeMissing({ state }: { state: "loading" | "missing" }) {
  return (
    <SubPageLayout
      title="Cells"
      subtitle="Committees & Cells at CKPIPSR"
      category="cells"
      activeItemLabel="ARC"
    >
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4">
        {state === "loading" ? (
          <p className="text-sm text-slate-500 font-sans">Loading…</p>
        ) : (
          <>
            <ShieldAlert size={32} className="mx-auto text-slate-300" />
            <h2 className="text-xl font-serif font-bold text-slate-900">
              This cell is not available
            </h2>
            <p className="text-sm text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
              The page you are looking for has been moved or is no longer published. The cells we do
              have are listed under Cells in the menu above.
            </p>
            <Link
              to="/cells/arc"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1a5d2e] px-4 py-2.5 text-sm font-sans font-semibold text-white"
            >
              Go to Cells
            </Link>
          </>
        )}
      </div>
    </SubPageLayout>
  );
}

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };
  return { copied, copy };
}

function CopyButton({ text, copied, onCopy }: { text: string; copied: string | null; onCopy: (t: string) => void }) {
  return (
    <button
      onClick={() => onCopy(text)}
      title="Copy number"
      className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
    >
      {copied === text ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
    </button>
  );
}

function Banner({ banner, onReport }: { banner: PublicCommittee["banner"]; onReport?: () => void }) {
  return (
    <div className="bg-gradient-to-r from-red-900 via-[#8a1c1c] to-rose-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
      <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
        <ShieldAlert size={260} />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          {banner.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-white text-xs font-mono font-bold tracking-wider uppercase">
              <AlertTriangle size={14} className="text-amber-300" />
              <span>{banner.badge}</span>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">{banner.heading}</h2>
          {banner.body && (
            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">{banner.body}</p>
          )}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
          {banner.helplinePhone && (
            <a
              href={telHref(banner.helplinePhone)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white text-red-900 hover:bg-amber-50 font-sans font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
            >
              <PhoneCall size={18} className="text-red-700 animate-pulse" />
              <span>{banner.helplineLabel || banner.helplinePhone}</span>
            </a>
          )}
          {onReport && banner.reportLabel && (
            <button
              onClick={onReport}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-black/30 hover:bg-black/40 border border-white/20 text-white font-sans font-semibold text-xs sm:text-sm transition-all"
            >
              <ShieldAlert size={16} className="text-amber-300" />
              <span>{banner.reportLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TabBar({
  tabs,
  active,
  style,
  onChange,
}: {
  tabs: Tab[];
  active: Tab;
  style: PublicCommittee["tabStyle"];
  onChange: (t: Tab) => void;
}) {
  if (style === "underline") {
    return (
      <div className="flex items-center justify-center border-b border-slate-200">
        <div className="flex gap-2 sm:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={`pb-3.5 px-4 text-sm sm:text-base font-serif font-bold transition-all relative cursor-pointer ${
                active === tab ? "text-[#1a5d2e]" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>{TAB_META[tab].label}</span>
              {active === tab && (
                <motion.div layoutId="committeeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-1.5 sm:p-2 border border-slate-200 shadow-2xs flex items-center justify-start overflow-x-auto gap-1 sm:gap-2">
      {tabs.map((tab) => {
        const Icon = TAB_META[tab].icon;
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`flex-1 min-w-[120px] sm:min-w-[140px] py-2.5 sm:py-3 px-4 rounded-xl font-sans font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isActive ? "bg-[#1a5d2e] text-white shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
            <span>{TAB_META[tab].label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** With a heading: the pill style. Without one: the short label style. */
function Mandate({ mandate }: { mandate: PublicCommittee["mandate"] }) {
  if (!mandate.heading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-1 font-bold">
            <ShieldCheck size={22} />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">{mandate.badge}</span>
            <p className="text-sm sm:text-base text-slate-800 font-sans leading-relaxed font-medium">{mandate.body}</p>
          </div>
        </div>
      </div>
    );
  }

  const rose = mandate.tone === "rose";
  const Icon = MANDATE_ICON[mandate.icon] ?? ShieldCheck;
  const note = mandate.note;
  const hasNote = !!note && (!!note.label || !!note.body);
  const NoteIcon = note?.icon === "alert" ? ShieldAlert : Scale;
  const points = mandate.points ?? [];
  return (
    <div
      className={`bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs relative overflow-hidden ${
        hasNote ? "space-y-6" : "space-y-4"
      }`}
    >
      <div className="flex items-start gap-4 relative z-10">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-2xs border ${
            rose ? "bg-rose-50 text-[#9b2246] border-rose-100" : "bg-emerald-50 text-[#1a5d2e] border-emerald-100"
          }`}
        >
          <Icon size={24} />
        </div>
        <div className={`flex-1 ${hasNote || points.length ? "space-y-3" : "space-y-2"}`}>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase ${
              rose ? "bg-rose-50 border-rose-100 text-[#9b2246]" : "bg-emerald-50 border-emerald-100 text-[#1a5d2e]"
            }`}
          >
            <Sparkles size={13} className={rose ? "text-[#9b2246]" : "text-[#1a5d2e]"} />
            <span>{mandate.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{mandate.heading}</h3>
          {mandate.body && (
            <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed font-normal">{mandate.body}</p>
          )}
          {points.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {points.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100/70 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={15} />
                  </div>
                  <p className="text-xs sm:text-sm font-sans font-medium text-slate-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {hasNote && (
        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 sm:p-5 flex items-start gap-3 text-slate-700">
          <NoteIcon size={20} className="text-[#1a5d2e] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-sans leading-relaxed">
            {note.label && <strong className="font-semibold text-slate-900">{note.label}: </strong>}
            {note.body}
          </p>
        </div>
      )}
    </div>
  );
}

function Roster({ committee }: { committee: PublicCommittee }) {
  const { roster, members, tags, tabStyle } = committee;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const { copied, copy } = useCopy();

  const q = searchQuery.toLowerCase();
  const filtered = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.designation.toLowerCase().includes(q) ||
      m.contact.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q);
    return matchesSearch && (selectedTag === "All" || m.tag === selectedTag);
  });

  const labelled = !!roster.eyebrow;
  const chips = ["All", ...tags];

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6 ${labelled ? "p-6 sm:p-9" : "p-5 sm:p-8"}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        {labelled ? (
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
              <Users size={22} />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">{roster.eyebrow}</span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{roster.heading}</h3>
              {roster.subtitle && (
                <p className="text-xs sm:text-[13px] text-slate-500 font-sans mt-0.5">{roster.subtitle}</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{roster.heading}</h3>
            {roster.subtitle && (
              <p className="text-xs sm:text-[13px] text-slate-500 font-sans mt-0.5">{roster.subtitle}</p>
            )}
          </div>
        )}

        <div className={`relative w-full ${labelled ? "md:w-72" : "sm:w-64"}`}>
          <Search size={labelled ? 16 : 15} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${labelled ? "left-3.5" : "left-3"}`} />
          <input
            type="text"
            placeholder={roster.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={
              labelled
                ? "w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#1a5d2e] focus:bg-white transition-all placeholder:text-slate-400"
                : "w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
            }
          />
        </div>
      </div>

      {/* Tag filter chips: only the tags this committee uses. */}
      <div className={`flex items-center overflow-x-auto pb-1 ${tabStyle === "pills" ? "gap-1.5" : "gap-2"}`}>
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => setSelectedTag(chip)}
            className={
              tabStyle === "pills"
                ? `px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                    selectedTag === chip ? "bg-[#1a5d2e] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                  }`
                : `px-3.5 py-1.5 rounded-xl font-sans text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedTag === chip
                      ? "bg-[#1a5d2e] text-white shadow-2xs"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                  }`
            }
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((member, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group p-5 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-[#1a5d2e] font-mono text-[11px] font-bold tracking-tight">
                  {member.role}
                </span>
                {member.tag && (
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
                    {member.tag}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-slate-900 text-base leading-snug group-hover:text-[#1a5d2e] transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">{member.designation || "Committee Member"}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-sans">
              <div className="flex items-start justify-between text-slate-700 gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  {member.contactIsAddress ? (
                    <MapPin size={14} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                  ) : (
                    <Phone size={13} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                  )}
                  {!member.contact ? (
                    <span className="text-slate-400 font-mono">Not Available</span>
                  ) : member.contactIsAddress ? (
                    <p className="text-[11.5px] text-slate-600 font-sans leading-relaxed">{member.contact}</p>
                  ) : (
                    <a
                      href={telHref(member.contact)}
                      className="font-mono font-medium hover:text-[#1a5d2e] hover:underline truncate"
                    >
                      {member.contact}
                    </a>
                  )}
                </div>
                {member.contact && !member.contactIsAddress && (
                  <CopyButton text={member.contact} copied={copied} onCopy={copy} />
                )}
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <Mail size={13} className="text-[#1a5d2e] shrink-0" />
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="font-mono text-[11.5px] hover:text-[#1a5d2e] hover:underline truncate block"
                    title={member.email}
                  >
                    {member.email}
                  </a>
                ) : (
                  <span className="text-slate-400 font-mono text-[11.5px]">{roster.noEmailText}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500 font-sans space-y-2">
          <Users size={32} className="mx-auto text-slate-300" />
          <p className="text-sm font-medium">No committee members matched your search criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("All");
            }}
            className="text-xs text-[#1a5d2e] font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

function Squad({ squad, noEmailText }: { squad: NonNullable<PublicCommittee["squad"]>; noEmailText: string }) {
  const { copied, copy } = useCopy();
  return (
    <>
      {(squad.badge || squad.body) && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-1 font-bold">
              <ShieldCheck size={22} />
            </div>
            <div className="space-y-2">
              {squad.badge && (
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">{squad.badge}</span>
              )}
              {squad.body && (
                <p className="text-sm sm:text-base text-slate-800 font-sans leading-relaxed font-medium">{squad.body}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
              <Users size={20} />
            </div>
            <div>
              {squad.eyebrow && (
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">{squad.eyebrow}</span>
              )}
              <h3 className="text-xl font-serif font-bold text-slate-900">{squad.heading || "Squad Members"}</h3>
            </div>
          </div>
          {squad.pill && (
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] font-mono text-xs font-semibold w-fit">
              {squad.pill}
            </span>
          )}
        </div>

        {squad.members.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs font-mono">Squad members will be announced soon.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {squad.members.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group p-5 space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-[#1a5d2e] font-mono text-[11px] font-bold tracking-tight">
                      {member.role}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-slate-900 text-base leading-snug group-hover:text-[#1a5d2e] transition-colors">
                      {member.name}
                    </h4>
                    {member.designation && (
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">{member.designation}</p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between text-slate-700">
                    <div className="flex items-center gap-2 min-w-0">
                      <Phone size={13} className="text-[#1a5d2e] shrink-0" />
                      {member.phone ? (
                        <a
                          href={telHref(member.phone)}
                          className="font-mono font-medium hover:text-[#1a5d2e] hover:underline truncate"
                        >
                          {member.phone}
                        </a>
                      ) : (
                        <span className="text-slate-400 font-mono">Not Available</span>
                      )}
                    </div>
                    {member.phone && <CopyButton text={member.phone} copied={copied} onCopy={copy} />}
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={13} className="text-[#1a5d2e] shrink-0" />
                    {member.email ? (
                      <a
                        href={`mailto:${member.email}`}
                        className="font-mono text-[11.5px] hover:text-[#1a5d2e] hover:underline truncate block"
                        title={member.email}
                      >
                        {member.email}
                      </a>
                    ) : (
                      <span className="text-slate-400 font-mono text-[11.5px]">{noEmailText}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Circulars({ circulars }: { circulars: PublicCommittee["circulars"] }) {
  const single = circulars.links.length === 1;
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs text-center flex flex-col items-center justify-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shadow-2xs">
        <FileText size={32} />
      </div>
      <div className="space-y-2 max-w-md">
        {circulars.eyebrow && (
          <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">{circulars.eyebrow}</span>
        )}
        {circulars.heading && <h3 className="text-2xl font-serif font-bold text-slate-900">{circulars.heading}</h3>}
        {circulars.body && <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">{circulars.body}</p>}
      </div>
      <div className={single ? "" : "flex flex-wrap items-center justify-center gap-4 pt-2"}>
        {circulars.links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
            className={`inline-flex items-center gap-2.5 rounded-2xl bg-[#1a5d2e] hover:bg-emerald-800 text-white font-sans font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer ${
              single ? "px-8 py-4" : "px-6 py-3.5"
            }`}
          >
            <FileText size={18} />
            <span>{link.label}</span>
            <ExternalLink size={single ? 16 : 15} />
          </a>
        ))}
      </div>
    </div>
  );
}

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25 },
};

/**
 * One Cells committee page, drawn from what the admin panel publishes: the
 * committee tab always; Squad, Circulars and Complaint when the committee has
 * them. With only the committee tab there is no tab bar at all.
 */
export default function CommitteePage({ slug: fixedSlug }: { slug?: string } = {}) {
  // Either a page that names its committee — the old addresses keep those —
  // or /cells/<address>, which is how a committee added in the panel arrives.
  const routeSlug = useParams().slug;
  const slug = fixedSlug ?? routeSlug ?? "";
  const { committee, state } = useCellCommittee(slug, DEFAULT_COMMITTEES[slug]);
  const menu = useCellsMenu();
  const [activeTab, setActiveTab] = useState<Tab>("committee");

  // Nothing shipped with this address and the API has none either: the
  // committee was deleted, switched off, or never existed.
  if (!committee) return <CommitteeMissing state={state === "loading" ? "loading" : "missing"} />;

  const tabs: Tab[] = ["committee"];
  if (committee.squad) tabs.push("squad");
  if (committee.circulars.links.length > 0) tabs.push("circulars");
  if (committee.complaint !== "none") tabs.push("complaint");
  // A tab switched off while open falls back to the committee.
  const tab = tabs.includes(activeTab) ? activeTab : "committee";

  return (
    <SubPageLayout
      title={committee.pageTitle}
      subtitle={committee.pageSubtitle}
      category="cells"
      activeItemLabel={
        menu.find((c) => c.slug === slug)?.navLabel ?? MENU_LABEL[slug] ?? committee.pageTitle
      }
    >
      <div className="space-y-8">
        {committee.banner.enabled && (
          <Banner
            banner={committee.banner}
            onReport={committee.complaint !== "none" ? () => setActiveTab("complaint") : undefined}
          />
        )}

        {tabs.length > 1 && (
          <TabBar tabs={tabs} active={tab} style={committee.tabStyle} onChange={setActiveTab} />
        )}

        {tab === "committee" && (
          <motion.div key="committee" {...fadeIn} className="space-y-6">
            <Mandate mandate={committee.mandate} />
            <Roster committee={committee} />
            {committee.footer.enabled && (
              <div className="bg-[#fbf9f4] border border-[#d4af37]/40 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#1a5d2e]" />
                  <span>{committee.footer.text}</span>
                </div>
                {committee.footer.highlight && (
                  <span className="font-bold text-[#1a5d2e]">{committee.footer.highlight}</span>
                )}
              </div>
            )}
          </motion.div>
        )}

        {tab === "squad" && committee.squad && (
          <motion.div key="squad" {...fadeIn} className="space-y-6">
            <Squad squad={committee.squad} noEmailText={committee.roster.noEmailText} />
          </motion.div>
        )}

        {tab === "circulars" && (
          <motion.div key="circulars" {...fadeIn} className="space-y-6">
            <Circulars circulars={committee.circulars} />
          </motion.div>
        )}

        {tab === "complaint" && (
          <motion.div key="complaint" {...fadeIn} className="space-y-6">
            {committee.complaint === "incident" ? (
              <IncidentComplaint />
            ) : committee.complaint === "student" ? (
              <StudentGrievanceComplaint />
            ) : (
              <GrievanceComplaint />
            )}
          </motion.div>
        )}
      </div>
    </SubPageLayout>
  );
}
