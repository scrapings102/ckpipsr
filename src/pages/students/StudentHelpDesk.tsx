import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    LifeBuoy,
    UploadCloud,
    FileText,
    X,
    CheckCircle2,
    AlertCircle,
    Clock,
    Phone,
    Mail,
    HelpCircle,
    Sparkles,
    Search,
    Download,
    ExternalLink,
    Building2,
    UserCheck,
    ShieldCheck,
    FileCheck,
    Send,
    RefreshCw,
    ChevronDown,
    ChevronUp,
    MapPin,
    Calendar,
    Copy,
    Check,
    Headset,
    Award,
    BookOpen,
    Filter
} from 'lucide-react';
import SubPageLayout from '../../components/SubPageLayout';
import { useStudentHelpDeskContent } from '../../hooks/useStudentHelpDeskContent';

// ── Types ──
/**
 * A ticket as the API hands it back, on the confirmation screen and on the
 * tracking tab. Everything else this page shows is content.
 */
export interface TrackedTicket {
    reference: string;
    submittedAt: string;
    updatedAt: string;
    fullName: string;
    course: string;
    semester: string;
    issueCategory: string;
    priority: string;
    subject: string;
    description: string;
    attachmentName: string;
    status: string;
    assignedOfficer: string;
    /** What the desk wants the student to read. */
    resolutionNote: string;
}

/** One line of the tracking timeline, worked out from the stages and a status. */
interface TimelineStep {
    title: string;
    date: string;
    completed: boolean;
    note?: string;
}

// The three limits the server also holds. They are here so the page can say no
// before a 10 MB upload travels, not so that it decides on its own.
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
];

/** A time as the timeline prints it. */
const stamp = (iso: string) => {
    const date = new Date(iso);
    return Number.isNaN(date.getTime())
        ? iso
        : date.toLocaleString([], { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};

export default function StudentHelpDesk() {
    const content = useStudentHelpDeskContent();

    // Named as the constants they replaced, so the markup below is unchanged:
    // these lists are now the panel’s, and a ticket is offered whatever it says.
    const ISSUE_CATEGORIES = content.form.categories;
    const COURSE_OPTIONS = content.form.courses;
    const SEMESTER_OPTIONS = content.form.semesters;
    const PRIORITY_OPTIONS = content.form.priorities;
    const FAQS_DATA = content.faqs.items;
    const DOWNLOADABLE_FORMS = content.forms.items;
    const NODAL_OFFICERS = content.directory.officers;
    const FAQ_CATEGORIES = ['All', ...content.faqCategories];

    // ── Active Tab ──
    const [activeTab, setActiveTab] = useState<'raise' | 'track' | 'faqs' | 'forms' | 'directory'>('raise');

    // ── Form State ──
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [studentCode, setStudentCode] = useState('');
    const [course, setCourse] = useState('');
    const [semester, setSemester] = useState('');

    const [issueCategory, setIssueCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [contactMethod, setContactMethod] = useState<'Email' | 'Phone'>('Email');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [submitState, setSubmitState] = useState<'idle' | 'submitted' | 'sending'>('idle');
    const [generatedTicket, setGeneratedTicket] = useState<TrackedTicket | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [copiedRef, setCopiedRef] = useState(false);

    // ── Track Ticket State ──
    //
    // Both the reference and the email are asked for: references run in
    // sequence, so a reference on its own would let anyone read anyone’s ticket.
    const [searchTicketId, setSearchTicketId] = useState('');
    const [trackEmail, setTrackEmail] = useState('');
    const [trackedTicket, setTrackedTicket] = useState<TrackedTicket | null>(null);
    const [trackError, setTrackError] = useState<string | null>(null);
    const [trackBusy, setTrackBusy] = useState(false);

    // ── FAQ Search State ──
    const [faqSearchQuery, setFaqSearchQuery] = useState('');
    const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');
    const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');


    // The panel picks which priority is selected to begin with, and the page
    // renders before the answer arrives — so it is filled in when it does, and
    // only while the student has not chosen for themselves.
    useEffect(() => {
        setPriority((current) =>
            current && PRIORITY_OPTIONS.some((p) => p.value === current)
                ? current
                : content.form.defaultPriority,
        );
    }, [content.form.defaultPriority, PRIORITY_OPTIONS]);

    // ── Touched States for Blur Validation ──
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const markTouched = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    // ── Field Validation ──
    const isEmailValid = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    const isPhoneValid = (val: string) => val.trim() === '' || /^\d{10}$/.test(val.trim());

    const nameError = touched.fullName && fullName.trim().length === 0
        ? 'Full name is required.'
        : null;

    const emailError = touched.email && (
        email.trim().length === 0
            ? 'Email address is required.'
            : !isEmailValid(email)
                ? 'Please enter a valid email address.'
                : null
    );

    const phoneError = touched.phone && !isPhoneValid(phone)
        ? 'Phone number must be exactly 10 digits.'
        : null;

    const categoryError = touched.issueCategory && issueCategory === ''
        ? 'Please select an issue category.'
        : null;

    const subjectError = touched.subject && subject.trim().length === 0
        ? 'Subject / Short title is required.'
        : null;

    const descriptionError = touched.description && (
        description.trim().length === 0
            ? 'Detailed description is required.'
            : description.length > MAX_DESCRIPTION_LENGTH
                ? `Description exceeds ${MAX_DESCRIPTION_LENGTH} characters.`
                : null
    );

    // ── Overall Form Validity ──
    const isValid =
        fullName.trim().length > 0 &&
        email.trim().length > 0 &&
        isEmailValid(email) &&
        isPhoneValid(phone) &&
        issueCategory !== '' &&
        subject.trim().length > 0 &&
        description.trim().length > 0 &&
        description.length <= MAX_DESCRIPTION_LENGTH &&
        fileError === null &&
        isConfirmed;

    // ── File Handlers ──
    const validateAndSetFile = (selectedFile: File | null) => {
        setFileError(null);
        if (!selectedFile) {
            setFile(null);
            return;
        }

        if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
            setFileError('Invalid file type. Only PDF, JPG, PNG, and WEBP are accepted.');
            setFile(null);
            return;
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setFileError('File size exceeds the 10 MB limit.');
            setFile(null);
            return;
        }

        setFile(selectedFile);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null;
        validateAndSetFile(selected);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files?.[0] || null;
        validateAndSetFile(droppedFile);
    };

    const removeFile = () => {
        setFile(null);
        setFileError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    // ── Submission Handler ──
    //
    // Sent as multipart, because the ticket may carry a file. The reference on
    // the confirmation screen is the one the database generated — nothing here
    // invents one, so what the student quotes always names a row.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid || submitState === 'sending') return;

        setSubmitState('sending');
        setSubmitError(null);

        const body = new FormData();
        const fields: Record<string, string> = {
            fullName,
            email,
            phone,
            studentCode,
            course,
            semester,
            issueCategory,
            priority,
            contactMethod,
            subject,
            description,
        };
        Object.entries(fields).forEach(([key, value]) => body.append(key, value.trim()));
        if (file) body.append('attachment', file);

        try {
            const res = await fetch('/api/help-desk/tickets', { method: 'POST', body });
            const payload = await res.json().catch(() => null);
            if (!res.ok) {
                throw new Error(payload?.error ?? 'Your ticket could not be sent. Please try again.');
            }
            setGeneratedTicket({
                reference: payload.ticket.reference,
                submittedAt: payload.ticket.submittedAt,
                updatedAt: payload.ticket.submittedAt,
                fullName,
                course,
                semester,
                issueCategory,
                priority,
                subject,
                description,
                attachmentName: payload.ticket.attachmentName ?? '',
                status: payload.ticket.status,
                assignedOfficer: payload.ticket.assignedOfficer || content.success.defaultOfficer,
                resolutionNote: '',
            });
            setSubmitState('submitted');
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Your ticket could not be sent.');
            setSubmitState('idle');
        }
    };

    const handleReset = () => {
        setFullName('');
        setEmail('');
        setPhone('');
        setStudentCode('');
        setCourse('');
        setSemester('');
        setIssueCategory('');
        setPriority(content.form.defaultPriority);
        setContactMethod('Email');
        setSubject('');
        setDescription('');
        setFile(null);
        setFileError(null);
        setIsConfirmed(false);
        setTouched({});
        setSubmitState('idle');
        setGeneratedTicket(null);
        setSubmitError(null);
        setCopiedRef(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // ── Handle Track Ticket Lookup ──
    const runTrack = async (reference: string, emailUsed: string) => {
        setTrackError(null);
        if (!reference.trim() || !emailUsed.trim()) {
            setTrackError('Enter both your ticket reference and the email address you raised it with.');
            setTrackedTicket(null);
            return;
        }

        setTrackBusy(true);
        try {
            const res = await fetch('/api/help-desk/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference: reference.trim(), email: emailUsed.trim() }),
            });
            const payload = await res.json().catch(() => null);
            if (!res.ok) throw new Error(payload?.error ?? 'That ticket could not be found.');
            setTrackedTicket(payload.ticket);
        } catch (err) {
            setTrackError(err instanceof Error ? err.message : 'That ticket could not be found.');
            setTrackedTicket(null);
        } finally {
            setTrackBusy(false);
        }
    };

    const handleTrackSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        void runTrack(searchTicketId, trackEmail);
    };

    /**
     * The timeline: the stages the panel wrote, marked off against the status
     * the desk has set. Everything up to it is done, the rest is still to come,
     * and the desk’s own note replaces the stage’s wording where it has left one.
     */
    const timelineFor = (ticket: TrackedTicket): TimelineStep[] => {
        const current = content.track.stages.findIndex((stage) => stage.status === ticket.status);
        return content.track.stages.map((stage, index) => ({
            title: stage.title,
            date:
                index === 0
                    ? stamp(ticket.submittedAt)
                    : index === current
                        ? stamp(ticket.updatedAt)
                        : index < current
                            ? ''
                            : 'Pending',
            completed: current >= 0 && index <= current,
            note: index === current && ticket.resolutionNote ? ticket.resolutionNote : stage.note,
        }));
    };

    /** What the page promises for a ticket at the priority chosen. */
    const slaFor = (value: string) =>
        content.form.priorities.find((p) => p.value === value)?.sla ?? '';

    const copyTicketId = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedRef(true);
        setTimeout(() => setCopiedRef(false), 2000);
    };

    // ── Filtered FAQs ──
    const filteredFaqs = useMemo(() => {
        return FAQS_DATA.filter((faq) => {
            const matchesCategory = selectedFaqCategory === 'All' || faq.category === selectedFaqCategory;
            const matchesSearch =
                faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [faqSearchQuery, selectedFaqCategory]);

    return (
        <SubPageLayout
            title={content.pageTitle}
            subtitle={content.pageSubtitle}
            category="students-corner"
            activeItemLabel="Student Help Desk"
        >
            <div className="max-w-6xl mx-auto font-sans space-y-10">

                {/* ── TAB 1: RAISE TICKET FORM ── */}
                {activeTab === 'raise' && (
                    <div className="animate-in fade-in duration-300">
                        {submitState === 'submitted' && generatedTicket ? (
                            /* ── Success Confirmation Screen ── */
                            <div className="bg-[#FAF8F3] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 text-center shadow-md">
                                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={38} className="text-[#96771d]" />
                                </div>

                                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2424] mb-2">
                                    {content.success.heading}
                                </h2>

                                <p className="text-[#2D2424]/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6">
                                    Thank you, <span className="font-semibold text-[#2D2424]">{generatedTicket.fullName}</span>. {content.success.lead}
                                </p>

                                {/* Ticket Reference Code Highlight */}
                                <div className="inline-flex items-center gap-3 bg-white border border-[#D4AF37]/40 px-6 py-3.5 rounded-2xl shadow-sm mb-8">
                                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Reference ID:</span>
                                    <span className="font-mono font-bold text-xl sm:text-2xl text-[#123a1a]">{generatedTicket.reference}</span>
                                    <button
                                        onClick={() => copyTicketId(generatedTicket.reference)}
                                        className="p-2 text-[#96771d] hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                        title="Copy Ticket Reference ID"
                                    >
                                        {copiedRef ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
                                    </button>
                                </div>

                                {content.success.note && (
                                    <p className="text-xs text-slate-500 max-w-xl mx-auto -mt-5 mb-8">
                                        {content.success.note}
                                    </p>
                                )}

                                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 text-left max-w-2xl mx-auto mb-8 shadow-xs space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-slate-100 pb-4">
                                        <div>
                                            <span className="text-slate-400 uppercase tracking-wider block font-mono text-[10px]">Category</span>
                                            <span className="font-semibold text-[#2D2424] text-sm mt-0.5 block">{generatedTicket.issueCategory}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 uppercase tracking-wider block font-mono text-[10px]">Priority &amp; SLA</span>
                                            <span className="font-semibold text-[#2D2424] text-sm mt-0.5 block">{generatedTicket.priority}{slaFor(generatedTicket.priority) ? ` (${slaFor(generatedTicket.priority)})` : ''}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 uppercase tracking-wider block font-mono text-[10px]">Course &amp; Sem</span>
                                            <span className="font-medium text-slate-700 text-xs mt-0.5 block">{generatedTicket.course} - {generatedTicket.semester}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 uppercase tracking-wider block font-mono text-[10px]">Assigned Section</span>
                                            <span className="font-medium text-slate-700 text-xs mt-0.5 block">{generatedTicket.assignedOfficer}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-slate-400 uppercase tracking-wider block font-mono text-[10px] mb-1">Subject</span>
                                        <p className="font-semibold text-[#2D2424] text-sm">{generatedTicket.subject}</p>
                                    </div>

                                    {generatedTicket.attachmentName && (
                                        <div>
                                            <span className="text-slate-400 uppercase tracking-wider block font-mono text-[10px] mb-1">Attached File</span>
                                            <span className="font-medium text-slate-700 text-xs flex items-center gap-1.5">
                                                <FileText size={14} className="text-[#D4AF37]" />
                                                {generatedTicket.attachmentName}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <button
                                        onClick={() => {
                                            setActiveTab('track');
                                            setSearchTicketId(generatedTicket.reference);
                                            setTrackEmail(email);
                                            void runTrack(generatedTicket.reference, email);
                                        }}
                                        className="px-6 py-3.5 rounded-xl bg-[#123a1a] hover:bg-[#1a4f23] text-[#D4AF37] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
                                    >
                                        <Search size={16} />
                                        <span>Track Status Live</span>
                                    </button>

                                    <button
                                        onClick={handleReset}
                                        className="px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C19A20] text-[#1a1208] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                                    >
                                        Raise Another Ticket
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* ── Main Help Desk Form ── */
                            <form onSubmit={handleSubmit} noValidate className="space-y-10">
                                {/* ── Section 1: Personal & Academic Details ── */}
                                <section className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
                                    <div className="flex items-start gap-4 mb-6 pb-4 border-b border-slate-200/60">
                                        <span className="w-8 h-8 rounded-full bg-[#2D2424] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0">
                                            1
                                        </span>
                                        <div>
                                            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2D2424]">
                                                {content.form.personal.heading}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-[#2D2424]/70 mt-1">
                                                {content.form.personal.blurb}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                                        {/* Full Name */}
                                        <div className="sm:col-span-2">
                                            <label htmlFor="fullName" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2">
                                                Full Name <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="fullName"
                                                type="text"
                                                required
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                onBlur={() => markTouched('fullName')}
                                                placeholder="Enter your full legal name as per college record"
                                                className={`w-full px-4 py-3 rounded-xl bg-white border ${nameError ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200 focus:border-[#D4AF37]'
                                                    } text-[#2D2424] text-sm placeholder:text-slate-400 outline-none transition-all shadow-xs`}
                                            />
                                            {nameError && (
                                                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                                                    <AlertCircle size={13} />
                                                    <span>{nameError}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Email Address */}
                                        <div>
                                            <label htmlFor="email" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2">
                                                Email Address <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onBlur={() => markTouched('email')}
                                                placeholder="your.email@example.com"
                                                className={`w-full px-4 py-3 rounded-xl bg-white border ${emailError ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200 focus:border-[#D4AF37]'
                                                    } text-[#2D2424] text-sm placeholder:text-slate-400 outline-none transition-all shadow-xs`}
                                            />
                                            {emailError && (
                                                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                                                    <AlertCircle size={13} />
                                                    <span>{emailError}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone Number */}
                                        <div>
                                            <label htmlFor="phone" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2">
                                                Phone Number <span className="text-slate-400 text-[10px] font-normal normal-case">(Optional, 10 digits)</span>
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                maxLength={10}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                                onBlur={() => markTouched('phone')}
                                                placeholder="10-digit mobile number"
                                                className={`w-full px-4 py-3 rounded-xl bg-white border ${phoneError ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200 focus:border-[#D4AF37]'
                                                    } text-[#2D2424] text-sm placeholder:text-slate-400 outline-none transition-all shadow-xs`}
                                            />
                                            {phoneError && (
                                                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                                                    <AlertCircle size={13} />
                                                    <span>{phoneError}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Student Code / Roll No */}
                                        <div>
                                            <label htmlFor="studentCode" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2">
                                                Student Roll Code / Enrollment No <span className="text-slate-400 text-[10px] font-normal normal-case">(Optional)</span>
                                            </label>
                                            <input
                                                id="studentCode"
                                                type="text"
                                                value={studentCode}
                                                onChange={(e) => setStudentCode(e.target.value)}
                                                placeholder="e.g. UG240015 or GTU Enrollment No"
                                                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#D4AF37] text-[#2D2424] text-sm placeholder:text-slate-400 outline-none transition-all shadow-xs"
                                            />
                                        </div>

                                        {/* Course Options (Pharmacy specific) */}
                                        <div>
                                            <label htmlFor="course" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2">
                                                Academic Program / Course <span className="text-slate-400 text-[10px] font-normal normal-case">(Optional)</span>
                                            </label>
                                            <select
                                                id="course"
                                                value={course}
                                                onChange={(e) => setCourse(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#D4AF37] text-[#2D2424] text-sm outline-none transition-all shadow-xs cursor-pointer"
                                            >
                                                <option value="">Select Pharmacy Program...</option>
                                                {COURSE_OPTIONS.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Semester */}
                                        <div className="sm:col-span-2">
                                            <label htmlFor="semester" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2">
                                                Current Semester <span className="text-slate-400 text-[10px] font-normal normal-case">(Optional)</span>
                                            </label>
                                            <select
                                                id="semester"
                                                value={semester}
                                                onChange={(e) => setSemester(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#D4AF37] text-[#2D2424] text-sm outline-none transition-all shadow-xs cursor-pointer"
                                            >
                                                <option value="">Select Semester...</option>
                                                {SEMESTER_OPTIONS.map((s) => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                {/* ── Section 2: Issue Details ── */}
                                <section className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
                                    <div className="flex items-start gap-4 mb-6 pb-4 border-b border-slate-200/60">
                                        <span className="w-8 h-8 rounded-full bg-[#2D2424] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0">
                                            2
                                        </span>
                                        <div>
                                            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2D2424]">
                                                {content.form.issue.heading}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-[#2D2424]/70 mt-1">
                                                {content.form.issue.blurb}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                                        {/* Issue Category */}
                                        <div>
                                            <label htmlFor="issueCategory" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2">
                                                Issue Category <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                id="issueCategory"
                                                required
                                                value={issueCategory}
                                                onChange={(e) => setIssueCategory(e.target.value)}
                                                onBlur={() => markTouched('issueCategory')}
                                                className={`w-full px-4 py-3 rounded-xl bg-white border ${categoryError ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200 focus:border-[#D4AF37]'
                                                    } text-[#2D2424] text-sm outline-none transition-all shadow-xs cursor-pointer`}
                                            >
                                                <option value="">Select Category...</option>
                                                {ISSUE_CATEGORIES.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                            {categoryError && (
                                                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                                                    <AlertCircle size={13} />
                                                    <span>{categoryError}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Priority Level */}
                                        <div>
                                            <label htmlFor="priority" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2">
                                                Priority Level <span className="text-slate-400 text-[10px] font-normal normal-case">(Defaults to {content.form.defaultPriority})</span>
                                            </label>
                                            <select
                                                id="priority"
                                                value={priority}
                                                onChange={(e) => setPriority(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#D4AF37] text-[#2D2424] text-sm outline-none transition-all shadow-xs cursor-pointer"
                                            >
                                                {PRIORITY_OPTIONS.map((p) => (
                                                    <option key={p.value} value={p.value}>
                                                        {p.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Preferred Contact Method */}
                                        <div className="sm:col-span-2">
                                            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2">
                                                Preferred Contact Method
                                            </label>
                                            <div className="flex gap-3 max-w-xs">
                                                <button
                                                    type="button"
                                                    onClick={() => setContactMethod('Email')}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${contactMethod === 'Email'
                                                        ? 'bg-[#2D2424] text-white border-[#2D2424] shadow-xs'
                                                        : 'bg-white text-[#2D2424] border-slate-200 hover:border-slate-300'
                                                        }`}
                                                >
                                                    <Mail size={14} className={contactMethod === 'Email' ? 'text-[#D4AF37]' : ''} />
                                                    <span>Email</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setContactMethod('Phone')}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${contactMethod === 'Phone'
                                                        ? 'bg-[#2D2424] text-white border-[#2D2424] shadow-xs'
                                                        : 'bg-white text-[#2D2424] border-slate-200 hover:border-slate-300'
                                                        }`}
                                                >
                                                    <Phone size={14} className={contactMethod === 'Phone' ? 'text-[#D4AF37]' : ''} />
                                                    <span>Phone</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subject / Short Title */}
                                        <div className="sm:col-span-2">
                                            <label htmlFor="subject" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2">
                                                Subject / Short Title <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="subject"
                                                type="text"
                                                required
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                onBlur={() => markTouched('subject')}
                                                placeholder="Brief summary of your inquiry or issue (e.g. GTU Marksheet Verification)"
                                                className={`w-full px-4 py-3 rounded-xl bg-white border ${subjectError ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200 focus:border-[#D4AF37]'
                                                    } text-[#2D2424] text-sm placeholder:text-slate-400 outline-none transition-all shadow-xs`}
                                            />
                                            {subjectError && (
                                                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                                                    <AlertCircle size={13} />
                                                    <span>{subjectError}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Detailed Description */}
                                        <div className="sm:col-span-2">
                                            <div className="flex items-center justify-between mb-2">
                                                <label htmlFor="description" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80">
                                                    Detailed Description <span className="text-rose-500">*</span>
                                                </label>
                                                <span className={`font-mono text-[11px] ${description.length > MAX_DESCRIPTION_LENGTH ? 'text-rose-600 font-bold' : 'text-slate-400'
                                                    }`}>
                                                    {description.length}/{MAX_DESCRIPTION_LENGTH}
                                                </span>
                                            </div>
                                            <textarea
                                                id="description"
                                                rows={5}
                                                required
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                onBlur={() => markTouched('description')}
                                                placeholder="Please describe what happened, dates, GTU enrollment number, semester, or error messages encountered."
                                                className={`w-full px-4 py-3 rounded-xl bg-white border ${descriptionError ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200 focus:border-[#D4AF37]'
                                                    } text-[#2D2424] text-sm placeholder:text-slate-400 outline-none transition-all shadow-xs resize-y leading-relaxed`}
                                            />
                                            {descriptionError && (
                                                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                                                    <AlertCircle size={13} />
                                                    <span>{descriptionError}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                {/* ── Section 3: Attach Supporting Document ── */}
                                <section className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
                                    <div className="flex items-start gap-4 mb-6 pb-4 border-b border-slate-200/60">
                                        <span className="w-8 h-8 rounded-full bg-[#2D2424] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0">
                                            3
                                        </span>
                                        <div>
                                            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2D2424]">
                                                {content.form.attachment.heading}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-[#2D2424]/70 mt-1">
                                                {content.form.attachment.blurb}
                                            </p>
                                        </div>
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />

                                    {!file ? (
                                        <div
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${isDragging
                                                ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                                                : 'border-slate-300 bg-white hover:border-[#D4AF37] hover:bg-[#FAF8F3]'
                                                }`}
                                        >
                                            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 text-[#96771d] flex items-center justify-center mx-auto mb-3">
                                                <UploadCloud size={24} />
                                            </div>
                                            <p className="font-sans font-bold text-sm text-[#2D2424] mb-1">
                                                Drag and drop document here, or <span className="text-[#96771d] underline">browse files</span>
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {content.form.attachment.hint}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 flex items-center justify-between shadow-xs">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#96771d] flex items-center justify-center shrink-0">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-sm text-[#2D2424] truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400 font-mono">
                                                        {formatFileSize(file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                                aria-label="Remove attached file"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    )}

                                    {fileError && (
                                        <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium">
                                            <AlertCircle size={13} />
                                            <span>{fileError}</span>
                                        </p>
                                    )}
                                </section>

                                {/* ── Section 4: Confirmation & Actions ── */}
                                <div className="pt-2 space-y-6">
                                    {/* Checkbox Confirmation */}
                                    <label className="flex items-start gap-3 cursor-pointer select-none group">
                                        <input
                                            type="checkbox"
                                            checked={isConfirmed}
                                            onChange={(e) => setIsConfirmed(e.target.checked)}
                                            className="mt-1 w-4 h-4 rounded border-slate-300 text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
                                        />
                                        <span className="text-xs sm:text-sm text-[#2D2424]/80 group-hover:text-[#2D2424] leading-relaxed">
                                            {content.form.consent}
                                        </span>
                                    </label>

                                    {submitError && (
                                        <p className="text-xs text-rose-600 flex items-start gap-1.5 font-medium">
                                            <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                            <span>{submitError}</span>
                                        </p>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                                        <button
                                            type="submit"
                                            disabled={!isValid || submitState === 'sending'}
                                            className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C19A20] text-[#1a1208] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer active:scale-98 text-center flex items-center justify-center gap-2"
                                        >
                                            <Send size={16} />
                                            <span>{submitState === 'sending' ? 'Sending…' : content.form.submitLabel}</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('track')}
                                            className="px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Search size={16} />
                                            <span>{content.form.trackLabel}</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {/* ── TAB 2: TRACK TICKET STATUS ── */}
                {activeTab === 'track' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Search Card */}
                        <div className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
                            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2D2424] mb-2">
                                {content.track.heading}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 mb-6">
                                {content.track.blurb}
                            </p>

                            <form onSubmit={handleTrackSearch} className="flex flex-col gap-3 max-w-xl">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            value={searchTicketId}
                                            onChange={(e) => setSearchTicketId(e.target.value)}
                                            aria-label={content.track.referenceLabel}
                                            placeholder={content.track.referenceLabel}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#D4AF37] font-mono text-sm uppercase text-[#2D2424] outline-none shadow-xs"
                                        />
                                    </div>

                                    <div className="relative flex-1">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            value={trackEmail}
                                            onChange={(e) => setTrackEmail(e.target.value)}
                                            aria-label={content.track.emailLabel}
                                            placeholder={content.track.emailLabel}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#D4AF37] text-sm text-[#2D2424] outline-none shadow-xs"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={trackBusy}
                                    className="px-6 py-3 rounded-xl bg-[#123a1a] hover:bg-[#1a4f23] text-[#D4AF37] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 sm:self-start"
                                >
                                    <Search size={15} />
                                    <span>{trackBusy ? 'Checking…' : content.track.buttonLabel}</span>
                                </button>
                            </form>

                            {trackError && (
                                <p className="text-xs text-rose-600 mt-3 flex items-center gap-1.5 font-medium">
                                    <AlertCircle size={14} />
                                    <span>{trackError}</span>
                                </p>
                            )}
                        </div>

                        {/* Tracked Ticket Results Card */}
                        {trackedTicket && (
                            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-in fade-in zoom-in duration-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs font-bold text-slate-400 uppercase">Ticket ID:</span>
                                            <span className="font-mono font-bold text-xl text-[#123a1a]">{trackedTicket.reference}</span>
                                            <span className={`px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${trackedTicket.status === 'Resolved'
                                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                                : trackedTicket.status === 'In Progress'
                                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                                    : 'bg-blue-100 text-blue-900 border border-blue-300'
                                                }`}>
                                                {trackedTicket.status}
                                            </span>
                                        </div>
                                        <h3 className="font-serif font-bold text-lg text-slate-900 mt-1">{trackedTicket.subject}</h3>
                                    </div>

                                    <div className="text-left sm:text-right text-xs text-slate-500 font-mono">
                                        <div>Submitted: {new Date(trackedTicket.submittedAt).toLocaleDateString()}</div>
                                        <div>SLA Target: <span className="font-bold text-slate-800">{slaFor(trackedTicket.priority) || 'As scheduled'}</span></div>
                                    </div>
                                </div>

                                {/* Ticket Progress Timeline */}
                                <div>
                                    <h4 className="font-serif font-bold text-base text-slate-900 mb-6 flex items-center gap-2">
                                        <Clock size={18} className="text-[#D4AF37]" />
                                        <span>Live Progress Timeline</span>
                                    </h4>

                                    <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                                        {timelineFor(trackedTicket).map((step, idx) => (
                                            <div key={idx} className="relative group">
                                                <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white ${step.completed
                                                    ? 'border-emerald-600 bg-emerald-500'
                                                    : 'border-slate-300'
                                                    }`} />
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                    <span className={`font-sans text-sm font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                                                        {step.title}
                                                    </span>
                                                    <span className="font-mono text-xs text-slate-400">{step.date}</span>
                                                </div>
                                                {step.note && (
                                                    <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                                        {step.note}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="bg-[#FAF8F3] rounded-2xl p-5 border border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                                    <div>
                                        <span className="text-slate-400 uppercase font-mono text-[10px] block">Student Name</span>
                                        <span className="font-bold text-slate-800 text-sm mt-0.5 block">{trackedTicket.fullName}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 uppercase font-mono text-[10px] block">Course &amp; Semester</span>
                                        <span className="font-bold text-slate-800 text-sm mt-0.5 block">{[trackedTicket.course, trackedTicket.semester].filter(Boolean).join(' · ') || 'Not specified'}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 uppercase font-mono text-[10px] block">Assigned Nodal Officer</span>
                                        <span className="font-bold text-slate-800 text-sm mt-0.5 block">{trackedTicket.assignedOfficer || content.success.defaultOfficer}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── TAB 3: FAQS & KNOWLEDGE BASE ── */}
                {activeTab === 'faqs' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Search & Filter Header */}
                        <div className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                            <div>
                                <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2D2424] mb-2">
                                    {content.faqs.heading}
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600">
                                    {content.faqs.blurb}
                                </p>
                            </div>

                            {/* FAQ Search Bar */}
                            <div className="relative max-w-xl">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={faqSearchQuery}
                                    onChange={(e) => setFaqSearchQuery(e.target.value)}
                                    placeholder="Search questions (e.g. Bonafide, GTU Marksheet, Re-checking)..."
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#D4AF37] text-sm text-[#2D2424] outline-none shadow-xs"
                                />
                            </div>

                            {/* Category Filter Pills */}
                            <div className="flex flex-wrap items-center gap-2">
                                {FAQ_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedFaqCategory(cat)}
                                        className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${selectedFaqCategory === cat
                                            ? 'bg-[#123a1a] text-[#D4AF37] shadow-xs'
                                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Accordion FAQ Items */}
                        <div className="space-y-4">
                            {filteredFaqs.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-6">
                                    <HelpCircle size={36} className="mx-auto text-slate-400 mb-2" />
                                    <p className="font-serif font-bold text-slate-700 text-base">No matching FAQs found</p>
                                    <p className="text-xs text-slate-500 mt-1">Try refining your search terms or raise a direct support ticket.</p>
                                </div>
                            ) : (
                                filteredFaqs.map((faq) => {
                                    const isOpen = expandedFaqId === faq.id;
                                    return (
                                        <div
                                            key={faq.id}
                                            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
                                        >
                                            <button
                                                onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                                                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/50 cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100/70 text-amber-900 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0">
                                                        {faq.category}
                                                    </span>
                                                    <span className="font-serif font-bold text-base text-[#2D2424]">
                                                        {faq.question}
                                                    </span>
                                                </div>
                                                {isOpen ? <ChevronUp size={20} className="text-[#D4AF37] shrink-0" /> : <ChevronDown size={20} className="text-slate-400 shrink-0" />}
                                            </button>

                                            {isOpen && (
                                                <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-sm text-slate-600 space-y-4 animate-in fade-in duration-200">
                                                    <p className="leading-relaxed font-sans">{faq.answer}</p>
                                                    {faq.steps && faq.steps.length > 0 && (
                                                        <div className="bg-[#FAF8F3] rounded-xl p-4 border border-amber-200/50 space-y-2">
                                                            <span className="text-xs font-mono font-bold uppercase text-amber-900 block">Step-by-Step Procedure:</span>
                                                            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 font-medium">
                                                                {faq.steps.map((step, sIdx) => (
                                                                    <li key={sIdx}>{step}</li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}

                {/* ── TAB 4: DOWNLOADABLE FORMS ── */}
                {activeTab === 'forms' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
                            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2D2424] mb-2">
                                {content.forms.heading}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600">
                                {content.forms.blurb}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {DOWNLOADABLE_FORMS.map((form) => (
                                <div key={form.id} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-mono font-bold text-xs">
                                                PDF
                                            </div>
                                            <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">{form.size}</span>
                                        </div>

                                        <h3 className="font-serif font-bold text-base text-[#2D2424] leading-snug">
                                            {form.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            {form.description}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-slate-100">
                                        <a
                                            href={form.href}
                                            download={form.fileName}
                                            className="w-full py-2.5 px-4 rounded-xl bg-[#123a1a] hover:bg-[#1a4f23] text-[#D4AF37] font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                                        >
                                            <Download size={14} />
                                            <span>Download PDF</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── TAB 5: NODAL OFFICERS DIRECTORY ── */}
                {activeTab === 'directory' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
                            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#2D2424] mb-2">
                                {content.directory.heading}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600">
                                {content.directory.blurb}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {NODAL_OFFICERS.map((officer, idx) => (
                                <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#2D2424] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-lg shrink-0">
                                            {officer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-serif font-bold text-lg text-[#2D2424]">{officer.name}</h3>
                                            <span className="text-xs font-bold text-[#96771d] block mt-0.5">{officer.designation}</span>
                                            <span className="text-[11px] text-slate-400 font-mono block">{officer.department}</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-xs space-y-2 font-mono">
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Mail size={14} className="text-[#D4AF37] shrink-0" />
                                            <a href={`mailto:${officer.email}`} className="hover:underline font-bold text-[#123a1a]">
                                                {officer.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Phone size={14} className="text-[#D4AF37] shrink-0" />
                                            <span>{officer.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <MapPin size={14} className="text-[#D4AF37] shrink-0" />
                                            <span className="font-sans text-slate-600">{officer.office}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </SubPageLayout>
    );
}