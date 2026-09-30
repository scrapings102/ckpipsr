import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const EMPTY_FORM = {
  name: "",
  enrollmentNo: "",
  program: "B.Pharm",
  semester: "Semester 1",
  categoryType: "SC",
  contactNo: "",
  email: "",
  subject: "",
  description: "",
  fileAttached: false,
};

/**
 * The grievance / assistance-request form, as the SC-ST Cell page has it. A
 * committee picks this form, the incident form, or none.
 */
export default function GrievanceComplaint() {
  const [complaintForm, setComplaintForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComplaintForm(EMPTY_FORM);
    }, 4000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
          Confidential Redressal Portal
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
          Register Grievance / Assistance Request
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
          Students belonging to SC/ST categories can submit complaints or scholarship assistance requests directly to the Cell Convener and Principal.
        </p>
      </div>

      {submitted ? (
        <div className="py-12 px-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
          <CheckCircle2 size={44} className="mx-auto text-[#1a5d2e]" />
          <h4 className="text-lg font-serif font-bold text-slate-900">Grievance Registered Successfully</h4>
          <p className="text-xs sm:text-sm text-slate-700 font-sans max-w-md mx-auto">
            Your submission has been logged securely. The SC-ST Cell committee members will review the report confidentially within 48 hours.
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
                placeholder="Enter full name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#1a5d2e]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-800">Enrollment / Roll No *</label>
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
              <label className="block font-semibold text-slate-800">Category *</label>
              <select
                value={complaintForm.categoryType}
                onChange={(e) => setComplaintForm({ ...complaintForm, categoryType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#1a5d2e]"
              >
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
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
              placeholder="Brief topic of the matter (e.g. Scholarship Disbursal, Caste Grievance, Mentoring)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#1a5d2e]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-800">Detailed Statement *</label>
            <textarea
              required
              rows={4}
              value={complaintForm.description}
              onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
              placeholder="Please describe the incident or requirement in detail..."
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
  );
}
