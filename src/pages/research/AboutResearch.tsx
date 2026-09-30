import { useState } from "react";
import { motion } from "motion/react";
import {
  FlaskConical,
  Target,
  Scale,
  Sparkles,
  Coins,
  Briefcase,
  Share2,
  Eye,
  Check,
  TrendingUp,
  Cpu,
  Phone,
  Mail,
  Copy,
  Search,
  Users,
  FileText,
  Layers,
  Hash
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import {
  useResearchAboutContent,
  type ResearchIcon
} from "../../hooks/useResearchAboutContent";

/** The symbols a responsibility can be drawn with; the panel picks one by name. */
const RESPONSIBILITY_ICONS: Record<ResearchIcon, typeof Coins> = {
  coins: Coins,
  policy: FileText,
  collaboration: Share2,
  product: Cpu,
  legal: Scale
};

export default function AboutResearch() {
  const content = useResearchAboutContent();
  const [activeTab, setActiveTab] = useState<"about" | "structure" | "objectives" | "action-plans">("about");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(text);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const filteredMembers = content.structure.members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.responsibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.contact.includes(searchQuery) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      selectedRole === "All" ||
      (selectedRole === "Chairperson" && m.role.toLowerCase().includes("chairperson")) ||
      (selectedRole === "Coordinator" && m.role.toLowerCase().includes("coordinator")) ||
      (selectedRole === "Member" && m.role.toLowerCase().includes("member"));

    return matchesSearch && matchesRole;
  });

  const tabs = [
    { id: "about", label: "About", icon: FlaskConical },
    { id: "structure", label: "Organizational Structure", icon: Layers },
    { id: "objectives", label: "Objectives", icon: Target },
    { id: "action-plans", label: "Action Plans", icon: TrendingUp }
  ];

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="research-and-innovation"
      activeItemLabel="Research - About"
    >
      <div className="space-y-8">

        {/* Interactive Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#1a5d2e] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <Icon size={16} className={isActive ? "text-white" : "text-slate-500"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: About */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Top Showcase Banner with Image & Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs overflow-hidden">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {content.overview.tag && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#1a5d2e] text-xs font-mono font-bold tracking-wider uppercase">
                      <Sparkles size={13} className="text-[#1a5d2e]" />
                      <span>{content.overview.tag}</span>
                    </div>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                    {content.overview.heading}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                    {content.overview.body}
                  </p>
                </div>

                {content.overview.stats.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                    {content.overview.stats.map((stat, index) => (
                      <div
                        key={index}
                        className={`bg-slate-50 rounded-xl p-3 border border-slate-100 ${
                          index === 2 ? "col-span-2 sm:col-span-1" : ""
                        }`}
                      >
                        <div className="text-lg sm:text-xl font-serif font-bold text-[#1a5d2e]">{stat.value}</div>
                        <div className="text-[11px] font-sans text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[280px] group shadow-inner border border-slate-100">
                <img
                  src={content.overview.photo.image}
                  alt={content.overview.photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                  {content.overview.photo.kicker && (
                    <span className="text-[11px] font-mono font-semibold uppercase text-emerald-300 tracking-wider">
                      {content.overview.photo.kicker}
                    </span>
                  )}
                  <p className="text-white text-sm font-sans font-medium">
                    {content.overview.photo.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Vision & Mission Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left Column: Vision & Mission */}
              <div className="lg:col-span-5 space-y-6">

                {/* Vision Box */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] border border-emerald-100 flex items-center justify-center font-bold">
                      <Eye size={20} />
                    </div>
                    <div>
                      {content.vision.kicker && (
                        <span className="text-[11px] font-mono uppercase font-bold text-[#1a5d2e] tracking-wider">
                          {content.vision.kicker}
                        </span>
                      )}
                      <h4 className="text-xl font-serif font-bold text-slate-900">
                        {content.vision.heading}
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/60">
                    {content.vision.body}
                  </p>
                </div>

                {/* Mission Box */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] border border-emerald-100 flex items-center justify-center font-bold">
                      <Target size={20} />
                    </div>
                    <div>
                      {content.mission.kicker && (
                        <span className="text-[11px] font-mono uppercase font-bold text-[#1a5d2e] tracking-wider">
                          {content.mission.kicker}
                        </span>
                      )}
                      <h4 className="text-xl font-serif font-bold text-slate-900">
                        {content.mission.heading}
                      </h4>
                    </div>
                  </div>

                  <ul className="space-y-3.5 pt-1">
                    {content.mission.points.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Research Visual Card */}
                <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs overflow-hidden">
                  <div className="relative rounded-2xl overflow-hidden h-48 group">
                    <img
                      src={content.photo.image}
                      alt={content.photo.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                      <p className="text-white text-xs font-sans font-medium">
                        {content.photo.caption}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Responsibilities */}
              <div className="lg:col-span-7 space-y-5">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      {content.responsibilities.kicker && (
                        <span className="text-[11px] font-mono uppercase font-bold text-[#1a5d2e] tracking-wider">
                          {content.responsibilities.kicker}
                        </span>
                      )}
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                        {content.responsibilities.heading}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {content.responsibilities.items.map((item, index) => {
                      const Icon = RESPONSIBILITY_ICONS[item.icon] ?? Coins;
                      return (
                        <div
                          key={index}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5 hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon size={18} className="text-[#1a5d2e] shrink-0" />
                            <h5 className="font-serif font-bold text-base text-slate-900">
                              {item.title}
                            </h5>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                            {item.body}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Tab 2: Organizational Structure */}
        {activeTab === "structure" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Institute ID & Header Banner */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                    <Layers size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {content.structure.kicker && (
                        <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                          {content.structure.kicker}
                        </span>
                      )}
                      {content.structure.instituteId && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-[#1a5d2e] text-[11px] font-mono font-bold">
                          <Hash size={12} />
                          <span>Institute ID: {content.structure.instituteId}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      {content.structure.heading}
                    </h3>
                  </div>
                </div>

                {/* Quick Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, role, responsibility..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#1a5d2e] focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Role Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {["All", "Chairperson", "Coordinator", "Member"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedRole === role
                        ? "bg-[#1a5d2e] text-white shadow-2xs"
                        : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* Committee Members Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMembers.map((member, index) => (
                  <div
                    key={`${member.name}-${index}`}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group p-5 space-y-4"
                  >
                    <div className="space-y-3.5">
                      {/* Top: Serial No Badge & Role Badge.
                          The number is the member's place in the list, so
                          reordering them in the panel renumbers the cards. */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center">
                          #{content.structure.members.indexOf(member) + 1}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md font-mono text-[11px] font-bold tracking-tight ${
                            member.role === "Chairperson"
                              ? "bg-emerald-100 text-[#1a5d2e] border border-emerald-200"
                              : member.role === "Coordinator"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {member.role}
                        </span>
                      </div>

                      {/* Member Info: Name & Designation */}
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-slate-900 text-base leading-snug group-hover:text-[#1a5d2e] transition-colors">
                          {member.name}
                        </h4>
                        <p className="text-xs text-slate-600 font-sans leading-relaxed">
                          {member.designation}
                        </p>
                      </div>

                      {/* Responsibility Box */}
                      <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs font-sans space-y-1">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                          Responsibility
                        </span>
                        <p className="font-medium text-slate-800 leading-snug">
                          {member.responsibility}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Direct Contact Actions */}
                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-sans">
                      {/* Phone */}
                      <div className="flex items-center justify-between text-slate-700">
                        <div className="flex items-center gap-2 min-w-0">
                          <Phone size={13} className="text-[#1a5d2e] shrink-0" />
                          {member.contact && member.contact !== "-" ? (
                            <a
                              href={`tel:${member.contact.replace(/[^0-9]/g, "")}`}
                              className="font-mono font-medium hover:text-[#1a5d2e] hover:underline truncate"
                            >
                              {member.contact}
                            </a>
                          ) : (
                            <span className="text-slate-400 font-mono">Not Available</span>
                          )}
                        </div>

                        {member.contact && member.contact !== "-" && (
                          <button
                            onClick={() => handleCopy(member.contact)}
                            title="Copy number"
                            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                          >
                            {copiedContact === member.contact ? (
                              <Check size={12} className="text-emerald-600" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-2 text-slate-700">
                        <Mail size={13} className="text-[#1a5d2e] shrink-0" />
                        {member.email && member.email !== "-" ? (
                          <a
                            href={`mailto:${member.email}`}
                            className="font-mono text-[11.5px] hover:text-[#1a5d2e] hover:underline truncate block"
                            title={member.email}
                          >
                            {member.email}
                          </a>
                        ) : (
                          <span className="text-slate-400 font-mono text-[11.5px]">-</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12 text-slate-500 font-sans space-y-2">
                  <Users size={32} className="mx-auto text-slate-300" />
                  <p className="text-sm font-medium">No committee members matched your search criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedRole("All");
                    }}
                    className="text-xs text-[#1a5d2e] font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Objectives */}
        {activeTab === "objectives" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                  <Target size={24} />
                </div>
                <div>
                  {content.objectives.kicker && (
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {content.objectives.kicker}
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    {content.objectives.heading}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {content.objectives.items.map((objective, index) => (
                  <div
                    key={index}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 flex items-start gap-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 font-bold font-mono text-sm group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pt-0.5">
                      {objective}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Action Plans */}
        {activeTab === "action-plans" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-8">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                  <TrendingUp size={24} />
                </div>
                <div>
                  {content.actionPlans.kicker && (
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {content.actionPlans.kicker}
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    {content.actionPlans.heading}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {content.actionPlans.items.map((plan, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/90 space-y-5 flex flex-col justify-between hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-300 group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] font-mono font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                          {plan.title}
                        </h4>
                      </div>

                      <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-sans pt-1">
                        {plan.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-2.5">
                            <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </SubPageLayout>
  );
}
