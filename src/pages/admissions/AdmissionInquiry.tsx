import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Check, CheckCircle2, Copy, Mail, Phone, Send } from 'lucide-react';
import SubPageLayout from '../../components/SubPageLayout';
import { Select } from '../../components/ui/Select';
import { useAdmissionInquiryContent, type AdmissionInquiryField } from '../../hooks/useAdmissionInquiryContent';
import { useAdmissionsContent } from '../../hooks/useAdmissionsContent';
import { useContactContent } from '../../hooks/useContactContent';
import { useCourses, visibleCourses } from '../../hooks/useCourses';
import { withPreview } from '../../hooks/previewToken';
import { RichText } from '../../utils/RichText';

/**
 * Admissions → Admission Inquiry.
 *
 * A prospective student says who they are, what they want to study and what
 * they want to know; the enquiry lands in the panel's Inbox › Admission
 * enquiries. The checks below mirror the server's (routes/admissionEnquiries.ts),
 * so a mistake is shown beside its box before anything is sent. The server
 * checks again, and its message is put beside the box it names.
 */

const MESSAGE_MAX = 500;
const CONTACT_METHODS = ['Call', 'WhatsApp', 'Email'] as const;
// The same test the server uses, so the two never disagree about an address.
const EMAIL_PATTERN = /^[^\s@<>"'():;,]+@[^\s@<>"'():;,]+\.[A-Za-z]{2,}$/;
const MOBILE_PATTERN = /^\d{10}$/;

type FieldName =
  | 'fullName'
  | 'email'
  | 'mobile'
  | 'city'
  | 'programme'
  | 'academicYear'
  | 'qualification'
  | 'boardStream'
  | 'topics'
  | 'contactMethod'
  | 'bestTime'
  | 'heardFrom'
  | 'message'
  | 'consent';

/** The order fields are checked and focused in: the order they appear. */
const FIELD_ORDER: FieldName[] = [
  'fullName',
  'email',
  'mobile',
  'city',
  'programme',
  'academicYear',
  'qualification',
  'boardStream',
  'topics',
  'contactMethod',
  'bestTime',
  'heardFrom',
  'message',
  'consent',
];

/**
 * The box a server refusal names. The server starts each message with the
 * box's label as the panel set it, so the live labels are matched, longest
 * first so that one label that begins another cannot win by accident.
 */
function fieldNamedIn(message: string, labels: Record<AdmissionInquiryField, { label: string }>): FieldName | undefined {
  const named: [string, FieldName][] = [
    ...(Object.keys(labels) as AdmissionInquiryField[]).map((f): [string, FieldName] => [labels[f].label, f]),
    // Two the server words for itself: one topic's text, and the consent box.
    ['Topic', 'topics'],
    ['Consent', 'consent'],
  ];
  named.sort((a, b) => b[0].length - a[0].length);
  return named.find(([label]) => label && message.startsWith(label))?.[1];
}


interface FormState {
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  programme: string;
  academicYear: string;
  qualification: string;
  boardStream: string;
  topics: string[];
  contactMethod: string;
  bestTime: string;
  heardFrom: string;
  message: string;
  consent: boolean;
  /** The hidden box only a bot fills in. */
  website: string;
}

const EMPTY_FORM: FormState = {
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  programme: '',
  academicYear: '',
  qualification: '',
  boardStream: '',
  topics: [],
  contactMethod: 'Call',
  bestTime: '',
  heardFrom: '',
  message: '',
  consent: false,
  website: '',
};

/** What each box says when the panel has made it required and it is left empty. */
const MISSING: Record<AdmissionInquiryField, string> = {
  fullName: 'Please enter your full name.',
  email: 'Please enter a valid email address.',
  mobile: 'Please enter a 10-digit mobile number.',
  city: 'Please enter your city.',
  programme: 'Please choose a programme.',
  academicYear: 'Please choose the year you want to join.',
  qualification: 'Please choose your current qualification.',
  boardStream: 'Please enter your board or stream.',
  topics: 'Please select at least one topic.',
  contactMethod: 'Please choose how we should contact you.',
  bestTime: 'Please choose the best time to reach you.',
  heardFrom: 'Please tell us how you heard about us.',
  message: 'Please write a message.',
};

/**
 * The panel decides which boxes must be filled in. A box left optional may
 * stay empty, but what is typed into it still has to be right. A question the
 * panel has left off the form (no options) is never asked for.
 */
function validate(
  form: FormState,
  required: Record<AdmissionInquiryField, boolean>,
  shownOnForm: (field: AdmissionInquiryField) => boolean,
): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  for (const field of Object.keys(MISSING) as AdmissionInquiryField[]) {
    const value = form[field];
    const empty = Array.isArray(value) ? value.length === 0 : !value.trim();
    if (required[field] && empty && shownOnForm(field)) errors[field] = MISSING[field];
  }
  if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) errors.email = MISSING.email;
  if (form.mobile && !MOBILE_PATTERN.test(form.mobile)) errors.mobile = MISSING.mobile;
  if (form.contactMethod && !(CONTACT_METHODS as readonly string[]).includes(form.contactMethod)) {
    errors.contactMethod = MISSING.contactMethod;
  }
  if (form.message.length > MESSAGE_MAX) errors.message = `Please keep the message to ${MESSAGE_MAX} characters.`;
  if (!form.consent) errors.consent = 'Please tick the box to agree before sending.';
  return errors;
}

/** Scrolls to an element through Lenis when the site has it, so the two do not fight. */
function bringIntoView(el: HTMLElement | null) {
  if (!el) return;
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement, o: object) => void } }).lenis;
  if (lenis) lenis.scrollTo(el, { offset: -120, duration: 0.5 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

const LABEL = 'block font-sans text-xs font-bold uppercase tracking-wider text-[#2D2424]/80 mb-2';
const OPTIONAL = 'text-slate-500 text-[10px] font-normal normal-case';
const INPUT =
  'w-full px-4 py-3 rounded-xl bg-white border text-[#2D2424] text-sm placeholder:text-slate-500 outline-none transition-[border-color,box-shadow] duration-150 shadow-xs focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40';
/** The red star for a required box, the grey "(optional)" note otherwise. */
function FieldMark({ required, note }: { required: boolean; note?: string }) {
  return required ? (
    <>
      <span className="text-rose-600" aria-hidden>*</span>
      {note && (
        <>
          {' '}
          <span className={OPTIONAL}>({note})</span>
        </>
      )}
    </>
  ) : (
    <span className={OPTIONAL}>(optional{note ? `, ${note}` : ''})</span>
  );
}

const inputBorder = (error?: string) =>
  error ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-300 focus:border-[#D4AF37]';

function ErrorLine({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-xs text-rose-700 mt-1.5 flex items-center gap-1 font-medium">
      <AlertCircle size={13} aria-hidden className="shrink-0" />
      <span>{message}</span>
    </p>
  );
}

function Card({
  number,
  title,
  line,
  children,
}: {
  number: number;
  title: string;
  line: string;
  children: React.ReactNode;
}) {
  const headingId = `inquiry-card-${number}`;
  return (
    <section
      aria-labelledby={headingId}
      className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-5 sm:p-8 md:p-10 shadow-xs"
    >
      <div className="flex items-start gap-4 mb-6 pb-4 border-b border-slate-200/60">
        <span
          aria-hidden
          className="w-8 h-8 rounded-full bg-[#2D2424] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0"
        >
          {number}
        </span>
        <div>
          <h2 id={headingId} className="font-serif font-bold text-xl sm:text-2xl text-[#2D2424]">
            {title}
          </h2>
          {line && <p className="text-xs sm:text-sm text-[#2D2424]/70 mt-1">{line}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function AdmissionInquiry() {
  const content = useAdmissionInquiryContent();
  const admissions = useAdmissionsContent();
  const contact = useContactContent();
  const { content: courses } = useCourses();
  const programmes = useMemo(() => visibleCourses(courses), [courses]);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [triedToSend, setTriedToSend] = useState(false);
  const [serverError, setServerError] = useState<{ field?: FieldName; message: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ reference: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});
  const successRef = useRef<HTMLHeadingElement>(null);
  const generalErrorRef = useRef<HTMLDivElement>(null);

  const required = content.requiredFields;
  const text = content.fieldText;
  const errors = validate(form, required, (field) =>
    field === 'bestTime'
      ? content.bestTimeOptions.length > 0
      : field === 'heardFrom'
        ? content.hearAboutOptions.length > 0
        : true,
  );
  const shown = (field: FieldName): string | undefined => {
    if (serverError?.field === field) return serverError.message;
    return triedToSend || touched[field] ? errors[field] : undefined;
  };

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((cur) => ({ ...cur, [key]: value }));
    if (serverError?.field === key) setServerError(null);
  };
  const touch = (field: FieldName) => setTouched((cur) => ({ ...cur, [field]: true }));
  const register = (field: FieldName) => (el: HTMLElement | null) => {
    fieldRefs.current[field] = el;
  };
  const describedBy = (field: FieldName) => (shown(field) ? `${field}-error` : undefined);

  const toggleTopic = (topic: string) => {
    set('topics', form.topics.includes(topic) ? form.topics.filter((t) => t !== topic) : [...form.topics, topic]);
    touch('topics');
  };

  const focusField = (field: FieldName) => {
    const el = fieldRefs.current[field];
    bringIntoView(el ?? null);
    el?.focus({ preventScroll: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setTriedToSend(true);
    setServerError(null);

    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/admission-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          mobile: form.mobile,
          city: form.city.trim(),
          programme: form.programme,
          academicYear: form.academicYear,
          qualification: form.qualification,
          boardStream: form.boardStream.trim(),
          topics: form.topics,
          contactMethod: form.contactMethod,
          bestTime: form.bestTime,
          heardFrom: form.heardFrom,
          message: form.message.trim(),
          consent: form.consent,
          website: form.website,
        }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        const message: string =
          payload?.error ?? 'Your inquiry could not be sent. Please try again in a moment.';
        // A refusal that names a field is shown beside it; anything else above the button.
        const field = res.status === 422 ? fieldNamedIn(message, text) : undefined;
        setServerError({ field, message });
        if (field) focusField(field);
        else {
          bringIntoView(generalErrorRef.current);
        }
        return;
      }
      setSent({ reference: payload.enquiry.reference });
      // The panel replaces a long form, so the reader is taken to it and told.
      requestAnimationFrame(() => {
        bringIntoView(successRef.current);
        successRef.current?.focus({ preventScroll: true });
      });
    } catch {
      setServerError({ message: 'Your inquiry could not be sent. Check your connection and try again.' });
      requestAnimationFrame(() => bringIntoView(generalErrorRef.current));
    } finally {
      setSending(false);
    }
  };

  const startAgain = () => {
    setForm(EMPTY_FORM);
    setTouched({});
    setTriedToSend(false);
    setServerError(null);
    setSent(null);
    setCopied(false);
  };

  const copyReference = (reference: string) => {
    navigator.clipboard
      ?.writeText(reference)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => undefined);
  };

  const phones = contact.phones.numbers.filter(Boolean);
  const officeEmail = contact.emails.addresses[0] ?? '';
  const hours = [contact.timings.days, contact.timings.hours].filter(Boolean).join(', ');
  const hoursLine = hours ? `${hours}${contact.timings.note ? ` (${contact.timings.note})` : ''}` : '';
  const generalError = serverError && !serverError.field ? serverError.message : null;
  const messageError = shown('message');

  return (
    <SubPageLayout
      title={content.title}
      subtitle={content.subtitle}
      eyebrow={`${content.heroLabel} ${admissions.session}`.trim()}
      description={`Ask CKPIPSR, Surat about admission to its pharmacy programmes. Send an inquiry and the admissions office will contact you by phone, WhatsApp or email.`}
      category="admissions"
      activeItemLabel="Admission Inquiry"
      hideDefaultBackBar
    >
      <div className="max-w-4xl mx-auto font-sans">
        <div className="mb-8 border-b border-slate-100 pb-4">
          <Link
            to={withPreview('/')}
            className="group inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest text-[#8a6d1f] hover:text-[#123a1a] transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            <ArrowLeft size={14} aria-hidden className="stroke-[3] transition-transform group-hover:-translate-x-1" />
            <span>Back to home</span>
          </Link>
        </div>

        {sent ? (
          <div className="bg-[#FAF8F3] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-12 text-center shadow-md">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={38} aria-hidden className="text-[#96771d]" />
            </div>
            <h2
              ref={successRef}
              tabIndex={-1}
              className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2424] mb-6 outline-none"
            >
              {content.success.heading}
            </h2>

            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-white border border-[#D4AF37]/40 px-5 sm:px-6 py-3.5 rounded-2xl shadow-sm mb-6 max-w-full">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Reference</span>
              <span className="font-mono font-bold text-xl sm:text-2xl text-[#123a1a]" data-testid="inquiry-reference">
                {sent.reference}
              </span>
              <button
                type="button"
                onClick={() => copyReference(sent.reference)}
                className="p-2 text-[#96771d] hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                aria-label="Copy the reference"
              >
                {copied ? <Check size={18} aria-hidden className="text-emerald-600" /> : <Copy size={18} aria-hidden />}
              </button>
              <span role="status" className="sr-only">
                {copied ? 'Reference copied' : ''}
              </span>
            </div>

            {content.success.body && (
              <p className="text-sm text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">{content.success.body}</p>
            )}

            <button
              type="button"
              onClick={startAgain}
              className="px-6 py-3.5 rounded-xl bg-[#123a1a] hover:bg-[#1a4f23] text-[#D4AF37] font-bold text-xs uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-md active:scale-[0.97] cursor-pointer"
            >
              Send another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-8 sm:space-y-10">
            {/* Kept out of sight and out of the tab order: only a bot fills it in. */}
            <div aria-hidden="true" className="absolute -left-[10000px] top-auto w-px h-px overflow-hidden">
              <label htmlFor="inquiry-website">Website</label>
              <input
                id="inquiry-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => set('website', e.target.value)}
              />
            </div>

            <Card number={1} title={content.cards.details.title} line={content.cards.details.line}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className={LABEL}>
                    {text.fullName.label} <FieldMark required={required.fullName} />
                  </label>
                  <input
                    id="fullName"
                    ref={register('fullName')}
                    type="text"
                    autoComplete="name"
                    required={required.fullName}
                    maxLength={120}
                    value={form.fullName}
                    onChange={(e) => set('fullName', e.target.value)}
                    placeholder={text.fullName.placeholder || undefined}
                    onBlur={() => touch('fullName')}
                    aria-invalid={!!shown('fullName')}
                    aria-describedby={describedBy('fullName')}
                    className={`${INPUT} ${inputBorder(shown('fullName'))}`}
                  />
                  <ErrorLine id="fullName-error" message={shown('fullName')} />
                </div>

                <div>
                  <label htmlFor="email" className={LABEL}>
                    {text.email.label} <FieldMark required={required.email} />
                  </label>
                  <input
                    id="email"
                    ref={register('email')}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required={required.email}
                    maxLength={120}
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    onBlur={() => touch('email')}
                    placeholder={text.email.placeholder}
                    aria-invalid={!!shown('email')}
                    aria-describedby={describedBy('email')}
                    className={`${INPUT} ${inputBorder(shown('email'))}`}
                  />
                  <ErrorLine id="email-error" message={shown('email')} />
                </div>

                <div>
                  <label htmlFor="mobile" className={LABEL}>
                    {text.mobile.label} <FieldMark required={required.mobile} note="10 digits" />
                  </label>
                  <div className="relative">
                    <span
                      aria-hidden
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 select-none"
                    >
                      +91
                    </span>
                    <input
                      id="mobile"
                      ref={register('mobile')}
                      type="tel"
                      autoComplete="tel-national"
                      inputMode="numeric"
                      required={required.mobile}
                      maxLength={10}
                      value={form.mobile}
                      onChange={(e) => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder={text.mobile.placeholder || undefined}
                      onBlur={() => touch('mobile')}
                      aria-invalid={!!shown('mobile')}
                      aria-describedby={describedBy('mobile')}
                      className={`${INPUT} pl-12 ${inputBorder(shown('mobile'))}`}
                    />
                  </div>
                  <ErrorLine id="mobile-error" message={shown('mobile')} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className={LABEL}>
                    {text.city.label} <FieldMark required={required.city} />
                  </label>
                  <input
                    id="city"
                    ref={register('city')}
                    required={required.city}
                    type="text"
                    autoComplete="address-level2"
                    maxLength={80}
                    value={form.city}
                    onChange={(e) => set('city', e.target.value)}
                    placeholder={text.city.placeholder || undefined}
                    aria-invalid={!!shown('city')}
                    aria-describedby={describedBy('city')}
                    className={`${INPUT} ${inputBorder(shown('city'))}`}
                  />
                  <ErrorLine id="city-error" message={shown('city')} />
                </div>
              </div>
            </Card>

            <Card number={2} title={content.cards.course.title} line={content.cards.course.line}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label htmlFor="programme" className={LABEL}>
                    {text.programme.label} <FieldMark required={required.programme} />
                  </label>
                  <Select
                    id="programme"
                    ref={register('programme')}
                    required={required.programme}
                    value={form.programme}
                    onChange={(value) => {
                      set('programme', value);
                      touch('programme');
                    }}
                    onBlur={() => touch('programme')}
                    aria-invalid={!!shown('programme')}
                    aria-describedby={describedBy('programme')}
                    tone="gold"
                    placeholder={text.programme.placeholder}
                    options={programmes.map((course) => {
                      const full = course.card.fullName.trim();
                      return {
                        value: course.navLabel,
                        label: full && full !== course.navLabel ? `${course.navLabel} (${full})` : course.navLabel,
                      };
                    })}
                    className={`${INPUT} cursor-pointer ${inputBorder(shown('programme'))}`}
                  />
                  <ErrorLine id="programme-error" message={shown('programme')} />
                </div>

                <div>
                  <label htmlFor="academicYear" className={LABEL}>
                    {text.academicYear.label} <FieldMark required={required.academicYear} />
                  </label>
                  <Select
                    id="academicYear"
                    ref={register('academicYear')}
                    required={required.academicYear}
                    value={form.academicYear}
                    onChange={(value) => {
                      set('academicYear', value);
                      touch('academicYear');
                    }}
                    onBlur={() => touch('academicYear')}
                    aria-invalid={!!shown('academicYear')}
                    aria-describedby={describedBy('academicYear')}
                    tone="gold"
                    placeholder={text.academicYear.placeholder}
                    options={content.yearOptions.map((year) => ({ value: year, label: year }))}
                    className={`${INPUT} cursor-pointer ${inputBorder(shown('academicYear'))}`}
                  />
                  <ErrorLine id="academicYear-error" message={shown('academicYear')} />
                </div>

                <div>
                  <label htmlFor="qualification" className={LABEL}>
                    {text.qualification.label} <FieldMark required={required.qualification} />
                  </label>
                  <Select
                    id="qualification"
                    ref={register('qualification')}
                    required={required.qualification}
                    value={form.qualification}
                    onChange={(value) => {
                      set('qualification', value);
                      touch('qualification');
                    }}
                    onBlur={() => touch('qualification')}
                    aria-invalid={!!shown('qualification')}
                    aria-describedby={describedBy('qualification')}
                    tone="gold"
                    placeholder={text.qualification.placeholder}
                    options={content.qualificationOptions.map((q) => ({ value: q, label: q }))}
                    className={`${INPUT} cursor-pointer ${inputBorder(shown('qualification'))}`}
                  />
                  <ErrorLine id="qualification-error" message={shown('qualification')} />
                </div>

                <div>
                  <label htmlFor="boardStream" className={LABEL}>
                    {text.boardStream.label} <FieldMark required={required.boardStream} />
                  </label>
                  <input
                    id="boardStream"
                    ref={register('boardStream')}
                    required={required.boardStream}
                    type="text"
                    maxLength={120}
                    value={form.boardStream}
                    onChange={(e) => set('boardStream', e.target.value)}
                    placeholder={text.boardStream.placeholder}
                    aria-invalid={!!shown('boardStream')}
                    aria-describedby={describedBy('boardStream')}
                    className={`${INPUT} ${inputBorder(shown('boardStream'))}`}
                  />
                  <ErrorLine id="boardStream-error" message={shown('boardStream')} />
                </div>
              </div>
            </Card>

            <Card number={3} title={content.cards.enquiry.title} line={content.cards.enquiry.line}>
              <div className="space-y-7">
                <fieldset aria-describedby={describedBy('topics')}>
                  <legend className={LABEL}>
                    {text.topics.label}{' '}
                    <FieldMark required={required.topics} note={required.topics ? 'select at least one' : undefined} />
                  </legend>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
                    {content.topics.map((topic, i) => {
                      const checked = form.topics.includes(topic);
                      return (
                        <label
                          key={topic}
                          className={`flex items-center gap-2.5 px-3 sm:px-3.5 py-3 rounded-xl border bg-white cursor-pointer select-none text-[13px] sm:text-sm transition-colors duration-150 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#D4AF37]/50 ${
                            checked
                              ? 'border-[#123a1a] bg-[#123a1a]/[0.04] text-[#123a1a] font-semibold'
                              : shown('topics')
                                ? 'border-rose-300 text-[#2D2424]/85 hover:border-slate-400'
                                : 'border-slate-300 text-[#2D2424]/85 hover:border-slate-400'
                          }`}
                        >
                          <input
                            ref={i === 0 ? register('topics') : undefined}
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleTopic(topic)}
                            className="w-4 h-4 rounded border-slate-400 accent-[#123a1a] cursor-pointer shrink-0"
                          />
                          <span className="leading-snug">{topic}</span>
                        </label>
                      );
                    })}
                  </div>
                  <ErrorLine id="topics-error" message={shown('topics')} />
                </fieldset>

                <fieldset aria-describedby={describedBy('contactMethod')}>
                  <legend className={LABEL}>
                    {text.contactMethod.label} <FieldMark required={required.contactMethod} />
                  </legend>
                  <div className="flex flex-wrap gap-2.5">
                    {CONTACT_METHODS.map((method, i) => {
                      const checked = form.contactMethod === method;
                      return (
                        <label
                          key={method}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border cursor-pointer select-none text-sm font-semibold transition-colors duration-150 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#D4AF37]/50 ${
                            checked
                              ? 'bg-[#123a1a] border-[#123a1a] text-white'
                              : 'bg-white border-slate-300 text-[#2D2424]/85 hover:border-slate-400'
                          }`}
                        >
                          <input
                            ref={i === 0 ? register('contactMethod') : undefined}
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={checked}
                            onChange={() => set('contactMethod', method)}
                            className="sr-only"
                          />
                          {method === 'Email' ? (
                            <Mail size={15} aria-hidden />
                          ) : (
                            <Phone size={15} aria-hidden />
                          )}
                          {method}
                        </label>
                      );
                    })}
                  </div>
                  <ErrorLine id="contactMethod-error" message={shown('contactMethod')} />
                </fieldset>

                {(content.bestTimeOptions.length > 0 || content.hearAboutOptions.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {content.bestTimeOptions.length > 0 && (
                      <div>
                        <label htmlFor="bestTime" className={LABEL}>
                          {text.bestTime.label} <FieldMark required={required.bestTime} />
                        </label>
                        <Select
                          id="bestTime"
                          ref={register('bestTime')}
                          required={required.bestTime}
                          value={form.bestTime}
                          onChange={(value) => set('bestTime', value)}
                          aria-invalid={!!shown('bestTime')}
                          aria-describedby={describedBy('bestTime')}
                          tone="gold"
                          placeholder={text.bestTime.placeholder}
                          options={content.bestTimeOptions.map((t) => ({ value: t, label: t }))}
                          className={`${INPUT} cursor-pointer ${inputBorder(shown('bestTime'))}`}
                        />
                        <ErrorLine id="bestTime-error" message={shown('bestTime')} />
                      </div>
                    )}
                    {content.hearAboutOptions.length > 0 && (
                      <div>
                        <label htmlFor="heardFrom" className={LABEL}>
                          {text.heardFrom.label} <FieldMark required={required.heardFrom} />
                        </label>
                        <Select
                          id="heardFrom"
                          ref={register('heardFrom')}
                          required={required.heardFrom}
                          value={form.heardFrom}
                          onChange={(value) => set('heardFrom', value)}
                          aria-invalid={!!shown('heardFrom')}
                          aria-describedby={describedBy('heardFrom')}
                          tone="gold"
                          placeholder={text.heardFrom.placeholder}
                          options={content.hearAboutOptions.map((h) => ({ value: h, label: h }))}
                          className={`${INPUT} cursor-pointer ${inputBorder(shown('heardFrom'))}`}
                        />
                        <ErrorLine id="heardFrom-error" message={shown('heardFrom')} />
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor="message" className={LABEL}>
                      {text.message.label} <FieldMark required={required.message} />
                    </label>
                    <span
                      className={`text-xs tabular-nums mb-2 ${
                        form.message.length > MESSAGE_MAX ? 'text-rose-700 font-semibold' : 'text-slate-500'
                      }`}
                      aria-hidden
                    >
                      {form.message.length}/{MESSAGE_MAX}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    ref={register('message')}
                    required={required.message}
                    rows={4}
                    maxLength={MESSAGE_MAX}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    onBlur={() => touch('message')}
                    placeholder={text.message.placeholder}
                    aria-invalid={!!messageError}
                    aria-describedby={['message-count', describedBy('message')].filter(Boolean).join(' ')}
                    className={`${INPUT} resize-y min-h-[110px] ${inputBorder(messageError)}`}
                  />
                  <span id="message-count" className="sr-only">
                    Up to {MESSAGE_MAX} characters.
                  </span>
                  <ErrorLine id="message-error" message={messageError} />
                </div>
              </div>
            </Card>

            <div className="space-y-5">
              <div>
                <label className="flex items-start gap-3 cursor-pointer select-none group">
                  <input
                    ref={register('consent')}
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => {
                      set('consent', e.target.checked);
                      touch('consent');
                    }}
                    aria-invalid={!!shown('consent')}
                    aria-describedby={describedBy('consent')}
                    className="mt-0.5 w-4 h-4 rounded border-slate-400 accent-[#123a1a] cursor-pointer shrink-0"
                  />
                  <span className="text-sm text-[#2D2424]/85 group-hover:text-[#2D2424] leading-relaxed">
                    {content.consent}
                    <span className="text-rose-600" aria-hidden>
                      &nbsp;*
                    </span>
                  </span>
                </label>
                <ErrorLine id="consent-error" message={shown('consent')} />
              </div>

              <div ref={generalErrorRef}>
                {generalError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                  >
                    <AlertCircle size={16} aria-hidden className="shrink-0 mt-0.5" />
                    <span>{generalError}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C19A20] text-[#1a1208] font-bold text-xs uppercase tracking-wider transition-[background-color,transform] duration-150 shadow-md disabled:opacity-60 disabled:cursor-wait cursor-pointer active:scale-[0.97] inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123a1a]"
              >
                <Send size={16} aria-hidden />
                <span>{sending ? 'Sending…' : content.submitLabel}</span>
              </button>

              {content.note && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  <RichText text={content.note} linkClassName="text-[#123a1a] underline hover:text-[#8a6d1f]" />
                </p>
              )}

              {(content.contactLine || phones.length > 0 || officeEmail || hoursLine) && (
                <div className="rounded-2xl border border-slate-200/80 bg-[#FAF8F3] px-5 py-4 text-sm text-[#2D2424]/85 space-y-1.5">
                  {content.contactLine && <p className="font-semibold text-[#2D2424]">{content.contactLine}</p>}
                  <p className="flex flex-wrap gap-x-5 gap-y-1">
                    {phones.map((number) => (
                      <a
                        key={number}
                        href={`tel:${number.replace(/[^\d+]/g, '')}`}
                        className="inline-flex items-center gap-1.5 text-[#123a1a] hover:underline underline-offset-4"
                      >
                        <Phone size={14} aria-hidden />
                        {number}
                      </a>
                    ))}
                    {officeEmail && (
                      <a
                        href={`mailto:${officeEmail}`}
                        className="inline-flex items-center gap-1.5 text-[#123a1a] hover:underline underline-offset-4 break-all"
                      >
                        <Mail size={14} aria-hidden />
                        {officeEmail}
                      </a>
                    )}
                  </p>
                  {hoursLine && (
                    <p className="text-slate-600">
                      {content.officeHoursLabel ? `${content.officeHoursLabel}: ` : ''}
                      {hoursLine}
                    </p>
                  )}
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </SubPageLayout>
  );
}
