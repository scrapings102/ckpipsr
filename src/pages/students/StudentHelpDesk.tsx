import React, { useState, useRef, useMemo } from 'react';
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

// ── Types ──
export interface TicketData {
    ticketId: string;
    fullName: string;
    email: string;
    phone: string;
    studentCode: string;
    course: string;
    semester: string;
    issueCategory: string;
    priority: string;
    contactMethod: 'Email' | 'Phone';
    subject: string;
    description: string;
    fileName: string | null;
    submittedAt: string;
    status: 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved';
    assignedOfficer: string;
    estimatedResolution: string;
    timeline: { title: string; date: string; completed: boolean; note?: string }[];
}

export interface FAQItem {
    id: string;
    category: 'Examination' | 'Scholarships & Fees' | 'Certificates' | 'Library' | 'General';
    question: string;
    answer: string;
    steps?: string[];
}

export interface FormDocument {
    id: string;
    title: string;
    category: string;
    size: string;
    description: string;
    fileName: string;
}

export interface NodalOfficer {
    name: string;
    designation: string;
    department: string;
    email: string;
    phone: string;
    office: string;
}

// ── Constant Options ──
const ISSUE_CATEGORIES = [
    'Examination & Results (GTU Re-checking, Marksheets)',
    'Fees & Payment Receipts',
    'Scholarship Verification (Digital Gujarat, MYSY, NSP)',
    'Certificates & Transcripts (Bonafide, NOC, Leaving Cert)',
    'Attendance & Academic Records',
    'Library & E-Resource Access',
    'Hostel & Campus Bus Transport',
    'Website & IT Portal Access',
    'Other General Enquiry',
];

const COURSE_OPTIONS = [
    'B.Pharm (Bachelor of Pharmacy)',
    'M.Pharm (Pharmaceutics)',
    'D.Pharm (Diploma in Pharmacy)',
];

const SEMESTER_OPTIONS = [
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4',
    'Semester 5',
    'Semester 6',
    'Semester 7',
    'Semester 8',
    'Passout / Alumni',
];

const PRIORITY_OPTIONS = [
    { value: 'Low', label: 'Low – General Query' },
    { value: 'Medium', label: 'Medium – Standard Inquiry' },
    { value: 'High', label: 'High – Needs Attention Soon' },
    { value: 'Urgent', label: 'Urgent – Exam / Scholarship Deadline' },
];

const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
];

// ── Sample Pre-populated Tickets for Demo Lookup ──
const SAMPLE_TICKETS: Record<string, TicketData> = {
    'CKP-2026-1042': {
        ticketId: 'CKP-2026-1042',
        fullName: 'Rahul Sharma',
        email: 'rahul.sharma@ckpipsr.ac.in',
        phone: '9876543210',
        studentCode: 'UG240015',
        course: 'B.Pharm (Bachelor of Pharmacy)',
        semester: 'Semester 4',
        issueCategory: 'Examination & Results (GTU Re-checking, Marksheets)',
        priority: 'High',
        contactMethod: 'Email',
        subject: 'GTU Semester 3 Re-assessment Marksheet Status',
        description: 'Applied for GTU re-assessment in Organic Chemistry-II on August 15. Requesting updated mark sheet for scholarship submission.',
        fileName: 'gtu_receipt_1042.pdf',
        submittedAt: '2026-09-02T10:30:00Z',
        status: 'In Progress',
        assignedOfficer: 'Prof. Exam Coordinator (GTU Section)',
        estimatedResolution: 'Within 24 Hours',
        timeline: [
            { title: 'Ticket Submitted & Logged', date: 'Sept 02, 10:30 AM', completed: true, note: 'Ticket reference code assigned.' },
            { title: 'Assigned to GTU Exam Cell', date: 'Sept 02, 02:15 PM', completed: true, note: 'Assigned to Prof. Exam Coordinator.' },
            { title: 'GTU Portal Verification', date: 'Sept 03, 11:00 AM', completed: true, note: 'Re-assessment marks verified with GTU server.' },
            { title: 'Final Resolution & Updated Certificate', date: 'Pending', completed: false, note: 'Updated mark sheet will be emailed upon GTU dispatch.' }
        ]
    },
    'CKP-2026-1089': {
        ticketId: 'CKP-2026-1089',
        fullName: 'Priya Patel',
        email: 'priya.patel@ckpipsr.ac.in',
        phone: '9825012345',
        studentCode: 'PG250008',
        course: 'M.Pharm (Pharmaceutics)',
        semester: 'Semester 2',
        issueCategory: 'Scholarship Verification (Digital Gujarat, MYSY, NSP)',
        priority: 'Medium',
        contactMethod: 'Email',
        subject: 'Digital Gujarat Scholarship Verification Signature',
        description: 'Submitted physical copy of Digital Gujarat renewal form at Room 102. Requesting online portal approval status.',
        fileName: 'digital_gujarat_form.pdf',
        submittedAt: '2026-09-08T14:20:00Z',
        status: 'Resolved',
        assignedOfficer: 'Head of Student Section (Room 102)',
        estimatedResolution: 'Completed',
        timeline: [
            { title: 'Ticket Submitted', date: 'Sept 08, 02:20 PM', completed: true },
            { title: 'Document Verified by Student Cell', date: 'Sept 09, 11:00 AM', completed: true },
            { title: 'Approved on Digital Gujarat Portal', date: 'Sept 10, 04:30 PM', completed: true, note: 'Scholarship proposal approved and forwarded to Govt officer.' },
            { title: 'Ticket Closed', date: 'Sept 10, 05:00 PM', completed: true, note: 'Verification completed successfully.' }
        ]
    }
};

// ── FAQs Data ──
const FAQS_DATA: FAQItem[] = [
    {
        id: 'faq-1',
        category: 'Certificates',
        question: 'How do I obtain a Bonafide Certificate or Character Certificate?',
        answer: 'You can request a Bonafide or Character Certificate by submitting a ticket online or visiting the Student Section (Room 102). Processing takes 1 to 2 working days.',
        steps: [
            'Fill out the online ticket form or download the Bonafide Application PDF from this page.',
            'Attach your latest semester fee receipt and Student ID card copy.',
            'Collect your stamped certificate from Room 102 during office hours (9 AM - 4 PM).'
        ]
    },
    {
        id: 'faq-2',
        category: 'Examination',
        question: 'What is the procedure for GTU Re-assessment / Re-checking of marks?',
        answer: 'GTU re-assessment forms must be submitted within 7 days of GTU result declaration via the GTU student portal.',
        steps: [
            'Log into your GTU Student Portal (student.gtu.ac.in).',
            'Apply for Re-assessment / Re-checking and pay the GTU prescribed online fee.',
            'Submit a copy of the payment receipt to the CKPIPSR Exam Cell or raise a ticket here for confirmation.'
        ]
    },
    {
        id: 'faq-3',
        category: 'Scholarships & Fees',
        question: 'How do I get my Digital Gujarat / MYSY Scholarship documents verified?',
        answer: 'Scholarship verification is handled by the Student Welfare Desk on the Ground Floor.',
        steps: [
            'Complete your application on the Digital Gujarat portal or MYSY web portal.',
            'Print the completed application and attach required income, caste, and Marksheet photocopies.',
            'Submit physical copies at Room 102 for nodal officer digital sign verification.'
        ]
    },
    {
        id: 'faq-4',
        category: 'Scholarships & Fees',
        question: 'My online fee payment failed but money was deducted. What should I do?',
        answer: 'Online payment gateways usually auto-reconcile failed transactions within 24 to 48 hours. If the status remains unpaid, raise a ticket under Fees & Payments with your Transaction Ref ID.',
        steps: [
            'Check your bank statement for UTR / Reference Number.',
            'Do not make a double payment immediately if the bank account was debited.',
            'Raise a ticket with subject "Payment Deducted but Receipt Pending" attaching the bank screenshot.'
        ]
    },
    {
        id: 'faq-5',
        category: 'Library',
        question: 'How do I reset my GTU E-Library / DELNET login credentials?',
        answer: 'E-Library access is managed by the Central Library. Send your Student Roll Code and official email to library@ckpipsr.ac.in or raise a ticket under Library & E-Resource Access.',
        steps: [
            'Select "Library & E-Resource Access" in the ticket category.',
            'Provide your Roll Code, Course, and Semester.',
            'The librarian will dispatch reset credentials to your registered email within 24 hours.'
        ]
    },
    {
        id: 'faq-6',
        category: 'General',
        question: 'What is the minimum GTU attendance requirement for appearing in end-sem exams?',
        answer: 'As per Gujarat Technological University (GTU) & PCI norms, a minimum of 75% attendance is compulsory in lectures and practicals to be eligible for term grant and university exams.',
        steps: [
            'Students with medical emergencies must submit medical certificates within 3 days of resuming college.',
            'Submit medical leave applications approved by HOD to the Student Section.'
        ]
    }
];

// ── Downloadable Documents ──
const DOWNLOADABLE_FORMS: FormDocument[] = [
    {
        id: 'form-1',
        title: 'Bonafide Certificate Application Form',
        category: 'Certificates',
        size: '145 KB',
        description: 'Official application format for passport, bank account, or scholarship bonafide certificate.',
        fileName: 'CKPIPSR_Bonafide_Application_Form.pdf'
    },
    {
        id: 'form-2',
        title: 'Academic Transcript & Verification Request',
        category: 'GTU & Academics',
        size: '210 KB',
        description: 'Form for requesting official college transcripts for higher studies WES / Foreign evaluation.',
        fileName: 'CKPIPSR_Transcript_Request_Form.pdf'
    },
    {
        id: 'form-3',
        title: 'No Dues & Leaving Certificate Clearance Form',
        category: 'Administrative',
        size: '180 KB',
        description: 'Clearance form for library, lab equipment, hostel, and fee accounts required for LC issuance.',
        fileName: 'CKPIPSR_NoDues_Clearance_Form.pdf'
    },
    {
        id: 'form-4',
        title: 'Duplicate Student ID Card Request Form',
        category: 'Student Welfare',
        size: '120 KB',
        description: 'Application for re-issuance of lost or damaged smart RFID Student Identity Card.',
        fileName: 'CKPIPSR_Duplicate_ID_Card_Form.pdf'
    },
    {
        id: 'form-5',
        title: 'Medical Leave & Attendance Exemption Form',
        category: 'Academic Welfare',
        size: '160 KB',
        description: 'Form to apply for medical leave approval along with doctor certificate and parent signature.',
        fileName: 'CKPIPSR_Medical_Leave_Form.pdf'
    },
    {
        id: 'form-6',
        title: 'GTU Exam Re-assessment Application',
        category: 'Examination',
        size: '195 KB',
        description: 'Form for requesting institutional endorsement for GTU re-assessment and re-checking.',
        fileName: 'CKPIPSR_GTU_Reassessment_Form.pdf'
    }
];

// ── Nodal Officers ──
const NODAL_OFFICERS: NodalOfficer[] = [
    {
        name: 'Dr. Dhiren P. Shah',
        designation: 'Principal & Appellate Grievance Officer',
        department: 'Institutional Administration',
        email: 'principal@ckpipsr.ac.in',
        phone: '+91 (0261) 2727123 Ext. 101',
        office: 'Principal Office, 1st Floor, Main Academic Building'
    },
    {
        name: 'Prof. Exam In-Charge',
        designation: 'Controller of Examinations (GTU Cell)',
        department: 'Examination & University Evaluation Section',
        email: 'exam@ckpipsr.ac.in',
        phone: '+91 (0261) 2727123 Ext. 104',
        office: 'Exam Control Room 104, Ground Floor'
    },
    {
        name: 'Head of Student Affairs',
        designation: 'Nodal Officer (Scholarships & Certificates)',
        department: 'Student Welfare Section',
        email: 'students@ckpipsr.ac.in',
        phone: '+91 (0261) 2727123 Ext. 102',
        office: 'Student Helpdesk Wing, Room 102, Ground Floor'
    },
    {
        name: 'Accounts & Finance Officer',
        designation: 'Senior Accountant & Fee Manager',
        department: 'Accounts & Finance Department',
        email: 'accounts@ckpipsr.ac.in',
        phone: '+91 (0261) 2727123 Ext. 103',
        office: 'Accounts Office, Room 103, Ground Floor'
    },
    {
        name: 'Central Librarian',
        designation: 'Head Librarian & E-Resource Administrator',
        department: 'Central Pharmacy Library',
        email: 'library@ckpipsr.ac.in',
        phone: '+91 (0261) 2727123 Ext. 108',
        office: 'Central Library, 2nd Floor'
    },
    {
        name: 'Convenor, Grievance Cell (GRC)',
        designation: 'Head, Student Grievance Redressal Committee',
        department: 'GRC & Student Welfare',
        email: 'grc@ckpipsr.ac.in',
        phone: '+91 (0261) 2727123 Ext. 105',
        office: 'GRC Office Room 105'
    }
];

export default function StudentHelpDesk() {
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
    const [priority, setPriority] = useState('Medium');
    const [contactMethod, setContactMethod] = useState<'Email' | 'Phone'>('Email');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [submitState, setSubmitState] = useState<'idle' | 'submitted'>('idle');
    const [generatedTicket, setGeneratedTicket] = useState<TicketData | null>(null);
    const [copiedRef, setCopiedRef] = useState(false);

    // ── Track Ticket State ──
    const [searchTicketId, setSearchTicketId] = useState('');
    const [trackedTicket, setTrackedTicket] = useState<TicketData | null>(null);
    const [trackError, setTrackError] = useState<string | null>(null);

    // ── FAQ Search State ──
    const [faqSearchQuery, setFaqSearchQuery] = useState('');
    const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');
    const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

    // ── User Submitted Local Ticket Storage ──
    const [userTickets, setUserTickets] = useState<Record<string, TicketData>>(SAMPLE_TICKETS);

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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const refId = `CKP-2026-${randomNum}`;

        const newTicket: TicketData = {
            ticketId: refId,
            fullName,
            email,
            phone: phone || 'N/A',
            studentCode: studentCode || 'N/A',
            course: course || 'Not Specified',
            semester: semester || 'Not Specified',
            issueCategory,
            priority,
            contactMethod,
            subject,
            description,
            fileName: file?.name ?? null,
            submittedAt: new Date().toISOString(),
            status: 'Submitted',
            assignedOfficer: 'Nodal Student Officer (Room 102)',
            estimatedResolution: 'Within 24-48 Hours',
            timeline: [
                {
                    title: 'Ticket Submitted & Registered',
                    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    completed: true,
                    note: 'Support ticket reference generated and logged into helpdesk registry.'
                },
                {
                    title: 'Verification by Department In-Charge',
                    date: 'Pending',
                    completed: false,
                    note: 'Ticket queued for review by nodal section officer.'
                },
                {
                    title: 'Processing & Resolution',
                    date: 'Pending',
                    completed: false
                },
                {
                    title: 'Final Notification & Ticket Closure',
                    date: 'Pending',
                    completed: false
                }
            ]
        };

        // Save into local ticket registry for instant live tracking
        setUserTickets(prev => ({ ...prev, [refId]: newTicket }));
        setGeneratedTicket(newTicket);
        setSubmitState('submitted');
    };

    const handleReset = () => {
        setFullName('');
        setEmail('');
        setPhone('');
        setStudentCode('');
        setCourse('');
        setSemester('');
        setIssueCategory('');
        setPriority('Medium');
        setContactMethod('Email');
        setSubject('');
        setDescription('');
        setFile(null);
        setFileError(null);
        setIsConfirmed(false);
        setTouched({});
        setSubmitState('idle');
        setGeneratedTicket(null);
        setCopiedRef(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // ── Handle Track Ticket Lookup ──
    const handleTrackSearch = (e?: React.FormEvent, customId?: string) => {
        if (e) e.preventDefault();
        const idToSearch = (customId || searchTicketId).trim().toUpperCase();
        setTrackError(null);

        if (!idToSearch) {
            setTrackError('Please enter a valid ticket reference ID (e.g. CKP-2026-1042).');
            setTrackedTicket(null);
            return;
        }

        if (userTickets[idToSearch]) {
            setTrackedTicket(userTickets[idToSearch]);
        } else {
            setTrackError(`No support ticket found for reference ID "${idToSearch}". Please check the ID or raise a new ticket.`);
            setTrackedTicket(null);
        }
    };

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
            title="Student Help Desk Portal"
            subtitle="Submit support requests, track ticket status, download official application forms, and search student FAQs."
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
                                    Support Ticket Successfully Registered!
                                </h2>

                                <p className="text-[#2D2424]/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6">
                                    Thank you, <span className="font-semibold text-[#2D2424]">{generatedTicket.fullName}</span>. Your ticket has been logged into the student portal system.
                                </p>

                                {/* Ticket Reference Code Highlight */}
                                <div className="inline-flex items-center gap-3 bg-white border border-[#D4AF37]/40 px-6 py-3.5 rounded-2xl shadow-sm mb-8">
                                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Reference ID:</span>
                                    <span className="font-mono font-bold text-xl sm:text-2xl text-[#123a1a]">{generatedTicket.ticketId}</span>
                                    <button
                                        onClick={() => copyTicketId(generatedTicket.ticketId)}
                                        className="p-2 text-[#96771d] hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                        title="Copy Ticket Reference ID"
                                    >
                                        {copiedRef ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
                                    </button>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 text-left max-w-2xl mx-auto mb-8 shadow-xs space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-slate-100 pb-4">
                                        <div>
                                            <span className="text-slate-400 uppercase tracking-wider block font-mono text-[10px]">Category</span>
                                            <span className="font-semibold text-[#2D2424] text-sm mt-0.5 block">{generatedTicket.issueCategory}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 uppercase tracking-wider block font-mono text-[10px]">Priority &amp; SLA</span>
                                            <span className="font-semibold text-[#2D2424] text-sm mt-0.5 block">{generatedTicket.priority} ({generatedTicket.estimatedResolution})</span>
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

                                    {generatedTicket.fileName && (
                                        <div>
                                            <span className="text-slate-400 uppercase tracking-wider block font-mono text-[10px] mb-1">Attached File</span>
                                            <span className="font-medium text-slate-700 text-xs flex items-center gap-1.5">
                                                <FileText size={14} className="text-[#D4AF37]" />
                                                {generatedTicket.fileName}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <button
                                        onClick={() => {
                                            setActiveTab('track');
                                            handleTrackSearch(undefined, generatedTicket.ticketId);
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
                                                Personal &amp; Academic Details
                                            </h2>
                                            <p className="text-xs sm:text-sm text-[#2D2424]/70 mt-1">
                                                Tell us who you are so our administrative section can reach you.
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
                                                Issue Details &amp; Priority
                                            </h2>
                                            <p className="text-xs sm:text-sm text-[#2D2424]/70 mt-1">
                                                Describe your inquiry clearly so we can route it directly to the responsible section officer.
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
                                                Priority Level <span className="text-slate-400 text-[10px] font-normal normal-case">(Defaults to Medium)</span>
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
                                                Attach Supporting Document
                                            </h2>
                                            <p className="text-xs sm:text-sm text-[#2D2424]/70 mt-1">
                                                Optional. Screenshots, GTU payment receipts, or fee slips help speed up verification.
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
                                                Supports PDF, JPG, PNG, WEBP up to 10 MB
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
                                            I confirm that the information provided is accurate and complete. I understand that submitting false or duplicate requests may delay response time.
                                        </span>
                                    </label>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                                        <button
                                            type="submit"
                                            disabled={!isValid}
                                            className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C19A20] text-[#1a1208] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer active:scale-98 text-center flex items-center justify-center gap-2"
                                        >
                                            <Send size={16} />
                                            <span>Submit Support Ticket</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('track')}
                                            className="px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Search size={16} />
                                            <span>Track Existing Ticket</span>
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
                                Track Support Ticket Progress
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 mb-6">
                                Enter your unique Ticket Reference ID (e.g. <span className="font-mono font-bold text-[#123a1a]">CKP-2026-1042</span> or <span className="font-mono font-bold text-[#123a1a]">CKP-2026-1089</span>) to check real-time resolution status.
                            </p>

                            <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                                <div className="relative flex-1">
                                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        value={searchTicketId}
                                        onChange={(e) => setSearchTicketId(e.target.value)}
                                        placeholder="Enter Ticket Reference ID (e.g. CKP-2026-1042)"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#D4AF37] font-mono text-sm uppercase text-[#2D2424] outline-none shadow-xs"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-xl bg-[#123a1a] hover:bg-[#1a4f23] text-[#D4AF37] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                                >
                                    <Search size={15} />
                                    <span>Check Status</span>
                                </button>
                            </form>

                            {/* Demo Shortcut Chips */}
                            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                <span>Try Demo Tickets:</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchTicketId('CKP-2026-1042');
                                        handleTrackSearch(undefined, 'CKP-2026-1042');
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-amber-100/60 hover:bg-amber-200/80 text-amber-900 font-mono text-xs font-bold transition-colors cursor-pointer"
                                >
                                    CKP-2026-1042 (In Progress)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchTicketId('CKP-2026-1089');
                                        handleTrackSearch(undefined, 'CKP-2026-1089');
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-100/60 hover:bg-emerald-200/80 text-emerald-900 font-mono text-xs font-bold transition-colors cursor-pointer"
                                >
                                    CKP-2026-1089 (Resolved)
                                </button>
                            </div>

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
                                            <span className="font-mono font-bold text-xl text-[#123a1a]">{trackedTicket.ticketId}</span>
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
                                        <div>SLA Target: <span className="font-bold text-slate-800">{trackedTicket.estimatedResolution}</span></div>
                                    </div>
                                </div>

                                {/* Ticket Progress Timeline */}
                                <div>
                                    <h4 className="font-serif font-bold text-base text-slate-900 mb-6 flex items-center gap-2">
                                        <Clock size={18} className="text-[#D4AF37]" />
                                        <span>Live Progress Timeline</span>
                                    </h4>

                                    <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                                        {trackedTicket.timeline.map((step, idx) => (
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
                                        <span className="font-bold text-slate-800 text-sm mt-0.5 block">{trackedTicket.course} ({trackedTicket.semester})</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 uppercase font-mono text-[10px] block">Assigned Nodal Officer</span>
                                        <span className="font-bold text-slate-800 text-sm mt-0.5 block">{trackedTicket.assignedOfficer}</span>
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
                                    Student Knowledge Base &amp; FAQs
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600">
                                    Search common administrative, examination, scholarship, and certificate queries.
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
                                {['All', 'Certificates', 'Examination', 'Scholarships & Fees', 'Library', 'General'].map((cat) => (
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
                                Official Student Application Forms
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600">
                                Download standard institutional application formats for bonafide certificates, transcripts, GTU re-assessment, and leaving clearances.
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
                                            href={`/documents/${form.fileName}`}
                                            download={form.fileName}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                alert(`Downloading ${form.title} (${form.fileName}).`);
                                            }}
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
                                Institutional Nodal Officers &amp; Desk In-Charges
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600">
                                Direct contact directory for academic, examination, scholarship, and student grievance inquiries.
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