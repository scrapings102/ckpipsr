import React, { useState } from "react";
import { CheckCircle2, Clock, Eye, EyeOff, Send, ShieldAlert, ShieldCheck, Upload } from "lucide-react";

/**
 * The anonymous incident-report form, as the Anti Ragging Committee page has
 * it. A committee picks this form, the grievance form, or none.
 */
export default function IncidentComplaint() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [complaintName, setComplaintName] = useState("");
  const [complaintEmail, setComplaintEmail] = useState("");
  const [complaintPhone, setComplaintPhone] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("Campus Premise");
  const [incidentDetails, setIncidentDetails] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `ARC-CKP-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold shadow-2xs">
            <ShieldAlert size={24} />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-rose-700 uppercase tracking-wider">
              Confidential & Anonymous Grievance Submission
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Online Incident Reporting Form
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 font-mono text-xs">
          <Clock size={13} className="text-[#1a5d2e]" />
          <span>Response Time: &lt;24 Hours</span>
        </div>
      </div>

      {isSubmitted ? (
        <div className="py-12 px-6 text-center space-y-5 bg-emerald-50/60 border border-emerald-200 rounded-3xl">
          <div className="w-16 h-16 rounded-full bg-[#1a5d2e] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 size={36} />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h4 className="text-2xl font-serif font-bold text-slate-900">
              Complaint Registered Successfully
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 font-sans">
              Your report has been securely dispatched to the Anti-Ragging Committee and Squad In-Charges for immediate preliminary review.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-emerald-200 max-w-xs mx-auto text-xs font-mono space-y-1">
            <div className="text-slate-500">Tracking Reference ID:</div>
            <div className="text-base font-bold text-[#1a5d2e]">{ticketId}</div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setIncidentDetails("");
                setFileName(null);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#1a5d2e] text-white font-sans text-xs font-semibold hover:bg-emerald-800 transition-all cursor-pointer"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmitComplaint} className="space-y-6">
          {/* Anonymous Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                {isAnonymous ? <EyeOff size={18} className="text-emerald-700" /> : <Eye size={18} />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900">
                  Submit Anonymously?
                </div>
                <div className="text-[11.5px] text-slate-500 font-sans">
                  {isAnonymous
                    ? "Your name, email, and phone will NOT be recorded."
                    : "Your details will be kept strictly confidential by the Chairman."}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                isAnonymous
                  ? "bg-emerald-700 text-white"
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {isAnonymous ? "Anonymous Mode Enabled" : "Enable Anonymous Mode"}
            </button>
          </div>

          {/* Personal Fields (if not anonymous) */}
          {!isAnonymous && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={complaintName}
                  onChange={(e) => setComplaintName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@ckpipsr.ac.in"
                  value={complaintEmail}
                  onChange={(e) => setComplaintEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={complaintPhone}
                  onChange={(e) => setComplaintPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
                />
              </div>
            </div>
          )}

          {/* Incident Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                Enrollment No. / Batch
              </label>
              <input
                type="text"
                placeholder="e.g. 21102021001 (Optional)"
                value={enrollmentNo}
                onChange={(e) => setEnrollmentNo(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                Date / Time of Incident *
              </label>
              <input
                type="date"
                required
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                Location of Incident *
              </label>
              <select
                value={incidentLocation}
                onChange={(e) => setIncidentLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
              >
                <option value="Hostel Premise">Hostel Premise</option>
                <option value="Campus Classrooms / Corridors">Campus Classrooms / Corridors</option>
                <option value="Laboratories">Laboratories</option>
                <option value="Canteen / Cafeteria">Canteen / Cafeteria</option>
                <option value="Central Library">Central Library</option>
                <option value="Bus / Transit Route">Bus / Transit Route</option>
                <option value="Outside Campus / Online Media">Outside Campus / Online Media</option>
              </select>
            </div>
          </div>

          {/* Incident Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
              Incident Details & Nature of Grievance *
            </label>
            <textarea
              required
              rows={5}
              placeholder="Please provide factual details of the incident, including names or descriptions of persons involved, witness names, and specifics of what took place..."
              value={incidentDetails}
              onChange={(e) => setIncidentDetails(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans resize-y"
            />
          </div>

          {/* File Upload Attachment */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
              Supporting Evidence / Document / Audio-Video (Optional)
            </label>
            <div className="relative border-2 border-dashed border-slate-200 hover:border-emerald-500/50 rounded-2xl p-4 sm:p-6 text-center bg-slate-50/50 hover:bg-emerald-50/20 transition-all">
              <input
                type="file"
                id="arc-file-upload"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                <Upload size={24} className="text-slate-400" />
                <div className="text-xs sm:text-sm font-medium text-slate-700">
                  {fileName ? (
                    <span className="text-[#1a5d2e] font-mono font-bold">{fileName}</span>
                  ) : (
                    <span>Drag and drop file here, or <strong className="text-[#1a5d2e]">browse</strong></span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  PDF, JPG, PNG, MP4, MP3 (Max 25MB)
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button & Emergency Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-sans">
              <ShieldCheck size={16} className="text-[#1a5d2e] shrink-0" />
              <span>Protected under the Whistleblower & Anti-Ragging Confidentiality Act</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#1a5d2e] hover:bg-emerald-800 text-white font-sans font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Send size={16} />
              <span>Submit Grievance Report</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
