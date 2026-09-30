import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const EMPTY_FORM = {
  name: "",
  enrollmentNo: "",
  program: "B.Pharm",
  semester: "Semester 1",
  contactNo: "",
  email: "",
  categoryType: "Academic",
  subject: "",
  description: "",
};

/**
 * The student grievance form, as the Grievance Redressal Cell page has it:
 * academic, admission, fee or facility grievances. A committee picks this,
 * the incident form, the SC-ST grievance form, or none.
 */
export default function StudentGrievanceComplaint() {
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
  );
}
