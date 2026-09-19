import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Phone, 
  Mail, 
  Check, 
  Copy,
  Search, 
  Scale, 
  ShieldCheck, 
  Sparkles,
  Send,
  CheckCircle2
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface GRCMember {
  role: string;
  name: string;
  designation: string;
  contact: string;
  email: string;
  category: "Leadership" | "Faculty" | "Student";
}

const grcMembers: GRCMember[] = [
  {
    role: "Chairman",
    name: "Dr. Dhiren P Shah",
    designation: "Principal & Professor",
    contact: "9099063116",
    email: "dhiren.shah@ckpipsr.ac.in",
    category: "Leadership"
  },
  {
    role: "Vice Chairman",
    name: "Dr. Bhumika C. Desai",
    designation: "Asso. Professor",
    contact: "9879229825",
    email: "bhumika.desai@ckpipsr.ac.in",
    category: "Leadership"
  },
  {
    role: "Member",
    name: "Dr. Vinod Ramani",
    designation: "Asso. Professor",
    contact: "9913792913",
    email: "vinod.ramani@ckpipsr.ac.in",
    category: "Faculty"
  },
  {
    role: "Member",
    name: "Mr. Dipayan Tarafder",
    designation: "Asst Professor",
    contact: "9909759524",
    email: "dipayan.tarafder@ckpipsr.ac.in",
    category: "Faculty"
  },
  {
    role: "Member",
    name: "Dr. Hema V. Badgujar",
    designation: "Asst. Professor",
    contact: "9574745153",
    email: "hema.kamlja@ckpipsr.ac.in",
    category: "Faculty"
  },
  {
    role: "Student Member",
    name: "Ms. Jinal Chandreshbhai Rana",
    designation: "Student of 2021-22 Adm. Batch",
    contact: "9408062794",
    email: "-",
    category: "Student"
  }
];

export default function GRC() {
  const [activeTab, setActiveTab] = useState<"committee" | "complaint">("committee");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  // Complaint Form State
  const [complaintForm, setComplaintForm] = useState({
    name: "",
    enrollmentNo: "",
    program: "B.Pharm",
    semester: "Semester 1",
    contactNo: "",
    email: "",
    categoryType: "Academic",
    subject: "",
    description: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(text);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComplaintForm({
        name: "",
        enrollmentNo: "",
        program: "B.Pharm",
        semester: "Semester 1",
        contactNo: "",
        email: "",
        categoryType: "Academic",
        subject: "",
        description: ""
      });
    }, 4000);
  };

  const filteredMembers = grcMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.contact.includes(searchQuery) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Leadership", "Faculty", "Student"];

  return (
    <SubPageLayout
      title="Grievance Redressal Cell (GRC)"
      subtitle="Ensuring Transparency, Fairness & Swift Resolution of Student Concerns"
      category="cells"
      activeItemLabel="GRC"
    >
      <div className="space-y-8">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-center border-b border-slate-200">
          <div className="flex gap-2 sm:gap-6">
            <button
              onClick={() => setActiveTab("committee")}
              className={`pb-3.5 px-6 text-sm sm:text-base font-serif font-bold transition-all relative cursor-pointer ${
                activeTab === "committee"
                  ? "text-[#1a5d2e]"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>Committee</span>
              {activeTab === "committee" && (
                <motion.div
                  layoutId="grcTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("complaint")}
              className={`pb-3.5 px-6 text-sm sm:text-base font-serif font-bold transition-all relative cursor-pointer ${
                activeTab === "complaint"
                  ? "text-[#1a5d2e]"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>Complaint</span>
              {activeTab === "complaint" && (
                <motion.div
                  layoutId="grcTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]"
                />
              )}
            </button>
          </div>
        </div>

        {/* Tab 1: Committee */}
        {activeTab === "committee" && (
          <motion.div
            key="committee-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Purpose & Mandate Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-4 relative overflow-hidden">
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-2xs">
                  <Scale size={24} />
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#1a5d2e] text-xs font-mono font-bold tracking-wider uppercase">
                    <Sparkles size={13} className="text-[#1a5d2e]" />
                    <span>Objectives & Mandate</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Grievance Redressal Cell (GRC)
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed font-normal">
                    Grievance Redressal Cell ( GRC) is framed to ensure transparency by Technical institutions imparting technical education, in admissions and with paramount objective of preventing unfair practices and to provide a mechanism to innocent students for redressal of their grievances.
                  </p>
                </div>
              </div>
            </div>

            {/* Committee Members Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                    <Users size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      Cell Representation
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Committee Members
                    </h3>
                  </div>
                </div>

                {/* Quick Search */}
                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, role, contact..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#1a5d2e] focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#1a5d2e] text-white shadow-2xs"
                        : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Committee Members Cards Grid (3 Columns x 2 Rows = 6 Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group p-5 space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Card Top: Role Tag & Category Indicator */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-[#1a5d2e] font-mono text-[11px] font-bold tracking-tight">
                          {member.role}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
                          {member.category}
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
                      setSelectedCategory("All");
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

        {/* Tab 2: Complaint Form */}
        {activeTab === "complaint" && (
          <motion.div
            key="complaint-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-5">
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  Official Grievance Registration
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Submit Student Grievance
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Students can register academic, administrative, admission, or general grievances directly to the Grievance Redressal Cell for timely review and impartial redressal.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 px-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 size={44} className="mx-auto text-[#1a5d2e]" />
                  <h4 className="text-lg font-serif font-bold text-slate-900">Grievance Submitted Successfully</h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans max-w-md mx-auto">
                    Your grievance has been safely received by the GRC committee. An acknowledgement reference will be communicated within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-semibold text-slate-800">Student Full Name *</label>
                      <input
                        type="text"
                        required
                        value={complaintForm.name}
                        onChange={(e) => setComplaintForm({ ...complaintForm, name: e.target.value })}
                        placeholder="Enter student name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#1a5d2e]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-semibold text-slate-800">Enrollment / Batch / Roll No *</label>
                      <input
                        type="text"
                        required
                        value={complaintForm.enrollmentNo}
                        onChange={(e) => setComplaintForm({ ...complaintForm, enrollmentNo: e.target.value })}
                        placeholder="e.g. 21102010..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#1a5d2e]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-semibold text-slate-800">Nature of Grievance *</label>
                      <select
                        value={complaintForm.categoryType}
                        onChange={(e) => setComplaintForm({ ...complaintForm, categoryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#1a5d2e]"
                      >
                        <option value="Academic">Academic & Examination</option>
                        <option value="Admission">Admissions / Documents</option>
                        <option value="Administrative">Fee / Administrative</option>
                        <option value="Infrastructure">Infrastructure / Facilities</option>
                        <option value="Other">General / Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-semibold text-slate-800">Contact Number *</label>
                      <input
                        type="tel"
                        required
                        value={complaintForm.contactNo}
                        onChange={(e) => setComplaintForm({ ...complaintForm, contactNo: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#1a5d2e]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-semibold text-slate-800">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={complaintForm.email}
                        onChange={(e) => setComplaintForm({ ...complaintForm, email: e.target.value })}
                        placeholder="student@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#1a5d2e]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold text-slate-800">Subject / Matter *</label>
                    <input
                      type="text"
                      required
                      value={complaintForm.subject}
                      onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })}
                      placeholder="Brief topic of the grievance"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#1a5d2e]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold text-slate-800">Detailed Description *</label>
                    <textarea
                      required
                      rows={4}
                      value={complaintForm.description}
                      onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                      placeholder="Please explain the details of the issue or concern..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#1a5d2e]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a5d2e] hover:bg-emerald-800 text-white font-sans font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                    >
                      <Send size={15} />
                      <span>Submit Grievance</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </SubPageLayout>
  );
}
