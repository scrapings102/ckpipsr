/**
 * The homepage content contract. Shapes mirror what the components already consumed
 * as hardcoded data, so wiring a component to the CMS is a source swap, not a rewrite.
 */

export interface CtaLink {
  label: string;
  href: string;
}

export interface HeroContent {
  tagline: string;
  scrollHint: string;
  slideIntervalMs: number;
}

export interface AboutContent {
  badge: string;
  headingLead: string;
  headingHighlight: string;
  /** May carry inline <strong>/<em>/<u>/<a> markup; render with renderRichText. */
  bodyPrimary: string;
  bodySecondary: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  image: { url: string; crop?: ImageCrop | null; alt: string };
  imageOverlay: { tag: string; title: string; subtitle: string };
  floatingBadge: { iconName: string; title: string; subtitle: string };
}

export interface NewsBulletinContent {
  eyebrow: string;
  headingLead: string;
  headingHighlight: string;
  subheading: string;
  tabs: { id: string; label: string }[];
  /** The faint giant word behind the board, on wide screens. */
  watermark: string;
  /** The small grey label at the right of the list's header. */
  feedOrderLabel: string;
}

export interface PrincipalMessageContent {
  eyebrow: string;
  heading: string;
  principalName: string;
  principalRole: string;
  principalCredential: string;
  portraitUrl: string;
  /** The part of the portrait its 4:5 frame shows; absent, the middle. */
  portraitCrop?: ImageCrop | null;
  portraitAlt: string;
  paragraphs: string[];
  pullQuote: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export interface CoursesContent {
  eyebrow: string;
  heading: string;
  ctaLabel: string;
  defaultOpenIndex: number;
}

export interface CampusLifeContent {
  eyebrow: string;
  eyebrowSecondary: string;
  headingLead: string;
  headingHighlight: string;
  /** The heading over the photo marquee at the foot of the section. */
  archiveHeading: string;
  /** The line under it. */
  archiveSubline: string;
  /** The button that opens the gallery. */
  archiveButtonLabel: string;
}

export interface FacultyContent {
  eyebrow: string;
  headingLead: string;
  headingHighlight: string;
  headingTrail: string;
  watermark: string;
  cta: CtaLink;
}

export interface AdmissionsContent {
  eyebrow: string;
  statusBadge: string;
  headingLead: string;
  headingHighlight: string;
  body: string;
  primaryCta: CtaLink;
  prospectusCta: CtaLink;
  affiliationStrip: { line1: string; line2: string };
  faqEyebrow: string;
  faqHeading: string;
  faqSubheading: string;
  /** The faint photo behind the whole section. */
  backgroundImageUrl: string;
  /** The line under the questions. */
  feeQueryLine: string;
  /** The link under that line, followed by a colon and the address it emails. */
  contactLabel: string;
  /** That address. Empty means `site_info.email`. */
  contactEmail: string;
}

/** The strip above the navbar, on the homepage. */
export interface AnnouncementBarContent {
  isEnabled: boolean;
  trustName: string;
  affiliation: string;
  /** Its own switch: the strip outlives any one admissions cycle. */
  admissionsBadge: { isEnabled: boolean; label: string };
  phoneLabel: string;
  phoneNumber: string;
  email: string;
}

export interface AdmissionsPopupContent {
  isEnabled: boolean;
  autoOpenDelayMs: number;
  imageUrl: string;
  crop?: ImageCrop | null;
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  /** The picture's description, read by screen readers. */
  altText: string;
}

export interface SeoHomeContent {
  title: string;
  description: string;
  ogImage: string;
}

export interface HeroSlide {
  url: string;
  /** The part of the picture the editor framed; absent, the middle. */
  crop?: ImageCrop | null;
  alt: string;
}

export interface ValueCard {
  iconName: string;
  title: string;
  caption: string;
}

export interface CourseCard {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  imageUrl: string;
  /** The part of the picture the editor framed; absent, the middle. */
  crop?: ImageCrop | null;
}

/**
 * Same fields as the static `Pillar`, except `icon` (a React element) is replaced by
 * `iconName`; the component resolves it through the lucide registry.
 */
export interface PillarContent {
  id: string;
  num: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  primaryImage: string;
  primaryCrop?: ImageCrop | null;
  /** The gallery's square thumbnail of the side picture. */
  sideCrop?: ImageCrop | null;
  sideImage: string;
  iconName: string;
  accent: string;
  locationTag: string;
  stats: { label: string; value: string }[];
}

export interface PolaroidContent {
  url: string;
  /** The part of the picture the editor framed; absent, the middle. */
  crop?: ImageCrop | null;
  caption: string;
  tag: string;
  rotation: string;
}

export interface FaqContent {
  id: number;
  question: string;
  answer: string;
  isOpenByDefault: boolean;
}

export interface FeaturedStaffContent {
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  area_of_interest: string;
  email: string;
  image_url: string;
  /** The homepage card's framing (4:5). */
  crop?: ImageCrop | null;
  /** The staff pages' round photo's framing. */
  circleCrop?: ImageCrop | null;
  isTeaching: boolean;
  /** Decides the order the directory reads in; ties are allowed. */
  rank?: number;
}

/**
 * Copy for /staff/teaching and /staff/non-teaching. Both pages are the same
 * shape; the people themselves are the `staff` directory, split by `isTeaching`.
 */
export interface StaffPageSection {
  title: string;
  subtitle: string;
  directoryHeading: string;
}

/**
 * Records the Activities pages render. Shapes mirror the static data those pages
 * used, so the components change data source without changing markup.
 */
export interface ActivitiesContent {
  news: unknown[];
  events: unknown[];
  achievements: unknown[];
}

/** A timeline entry on /about/overview. Ordered by year, never by hand. */
export interface AboutMilestone {
  id: number;
  year: number;
  title: string;
  description: string;
}

export interface AboutCampusImage {
  url: string;
  /** The part of the picture the editor framed for its frame; absent, the middle. */
  crop?: ImageCrop | null;
  title: string;
  subtitle: string;
}

export interface AboutFeatureCard {
  iconName: string;
  title: string;
  description: string;
}

/** The repeating content of About → Who We Are → About Us. */
export interface AboutOverviewContent {
  milestones: AboutMilestone[];
  campusImages: AboutCampusImage[];
  featureCards: AboutFeatureCard[];
}

export interface AboutCoreValue {
  iconName: string;
  name: string;
  description: string;
}

export interface AboutVisionMissionContent {
  coreValues: AboutCoreValue[];
}

export interface AboutMissionPoint {
  title: string;
  description: string;
  badge: string;
  imageUrl: string;
  /** The part of the picture the editor framed for its frame; absent, the middle. */
  crop?: ImageCrop | null;
}

/**
 * The repeating content of About → Who We Are → Mission. Goals are bare strings:
 * every goal is drawn in the same card, so there is nothing else to carry.
 */
export interface AboutMissionContent {
  points: AboutMissionPoint[];
  goals: string[];
}

/**
 * One historical highlight on the Founder page. `year` is a string because the
 * page mixes decade labels ("1930s") with exact years ("1998").
 */
export interface AboutFounderHighlight {
  year: string;
  title: string;
  description: string;
}

export interface AboutFounderContent {
  highlights: AboutFounderHighlight[];
}

export interface AboutTrustInstitution {
  name: string;
  type: string;
  location: string;
  imageUrl: string;
  /** The part of the picture the editor framed for its frame; absent, the middle. */
  crop?: ImageCrop | null;
}

export interface AboutTrustContent {
  institutions: AboutTrustInstitution[];
}

export interface AboutTrusteeMember {
  name: string;
  role: string;
  /** May be empty — the card falls back to initials on a maroon tile. */
  imageUrl: string;
  /** The part of the picture the editor framed for its frame; absent, the middle. */
  crop?: ImageCrop | null;
}

/**
 * One box of ticked lines on /iqac/about. The page ships with "Objectives" and
 * "Responsibilities"; the heading is content, so a third box needs no code.
 */
export interface IqacAboutBox {
  heading: string;
  /** May carry inline markup, like a five-year goal. */
  points: string[];
}

/** One seat on a committee. */
export interface CommitteeMember {
  name: string;
  role: string;
  /** Nobody holds it yet, so the page prints "To Be Announced" in its place. */
  isTba?: boolean;
}

/**
 * Student Corner → Student Help Desk (`/help-desk`): the words around the form.
 * What the form does — which fields are required, the limits — stays in the
 * page, because those are rules rather than copy.
 */
export interface StudentHelpDeskContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  personalHeading: string;
  personalDescription: string;
  issueHeading: string;
  issueDescription: string;
  attachmentHeading: string;
  attachmentDescription: string;
  attachmentHint: string;
  consentText: string;
  /** The note above the submit button: what the ticket reference is for. */
  pendingNotice: string;
  submitLabel: string;
  statusLabel: string;
  /** The intro line of the ticket status panel. */
  statusNote: string;
  /** Status panel: the two field labels and the button (idle / while checking). */
  statusRollNoLabel: string;
  statusEmailLabel: string;
  statusCheckLabel: string;
  statusCheckingLabel: string;
  /** Under the reference on the success screen; left empty, the line is hidden. */
  statusKeepNote?: string;
  urgentNote: string;
  officeHours: string;
  successHeading: string;
  resetLabel: string;
  // The form's own words.
  labelFullName: string;
  labelEmail: string;
  labelPhone: string;
  labelStudentCode: string;
  labelCourse: string;
  labelSemester: string;
  labelIssueCategory: string;
  labelPriority: string;
  labelContactMethod: string;
  labelSubject: string;
  labelDescription: string;
  placeholderFullName: string;
  placeholderEmail: string;
  placeholderPhone: string;
  placeholderStudentCode: string;
  placeholderSubject: string;
  placeholderDescription: string;
  promptCourse: string;
  promptSemester: string;
  promptCategory: string;
  phoneHint: string;
  priorityHint: string;
  browseLabel: string;
  removeFileLabel: string;
  referenceLabel: string;
  // Switched on in the panel to make an optional field required; the server
  // enforces the same flags.
  requirePhone: boolean;
  requireCourse: boolean;
  requireSemester: boolean;
}

/** One choice in the Help Desk's priority dropdown. */
export interface HelpDeskPriority {
  label: string;
  description: string;
  /** The level the form starts on; the first is used if none claims it. */
  isDefault: boolean;
}

/** The Help Desk form's four dropdowns. */
export interface HelpDeskOptions {
  categories: string[];
  courses: string[];
  semesters: string[];
  priorities: HelpDeskPriority[];
}

/**
 * The two headings the Committees menu puts above its columns. Editable on the
 * register's own screen, since they exist to group the rows listed there.
 */
export interface CommitteesIndexContent {
  statutoryLabel: string;
  councilsLabel: string;
}

/**
 * One committee as the menu shows it: what it is called, the line beneath the
 * name, which of the two columns it stands in, and where it leads.
 */
export interface CommitteeNavEntry {
  slug: string;
  name: string;
  tagline: string;
  group: 'statutory' | 'councils';
  iconName: string;
  /** The page's own heading, which need not be the shorter menu name. */
  title: string;
  subtitle: string;
}

/** One committee page's lists, keyed in `PagesContent.committees` by its slug. */
/**
 * The part of a picture to show, each side a percentage of the picture itself.
 *
 * Percentages rather than pixels, so the same crop holds however large the file
 * is served. Absent means the whole picture, centred — what every one of these
 * did before an editor could say otherwise.
 */
export interface ImageCrop {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** One photograph in a Campus Life gallery. */
export interface CampusLifeImage {
  url: string;
  /** Empty falls back to the page's own name, as it did before the CMS. */
  alt: string;
  /** The part of it the tile shows. Absent, the tile shows the middle. */
  crop?: ImageCrop;
}

export interface CampusLifePageContent {
  images: CampusLifeImage[];
}

/**
 * A notice, event or achievement a committee has claimed as its own.
 *
 * Written on the record itself in the panel, not on the committee — one record
 * belongs to at most one cell, and the binding is optional, so most carry none.
 */
export interface CommitteeUpdate {
  slug: string;
  kind: 'news' | 'event' | 'notice' | 'achievement';
  title: string;
  date: string | null;
  excerpt: string | null;
  image: string | null;
  /** The part of the picture the editor framed; absent, the middle. */
  crop?: ImageCrop;
  link: string | null;
  location: string | null;
  categoryTag: string | null;
}

export interface CommitteeContent {
  boxes: IqacAboutBox[];
  members: CommitteeMember[];
  /**
   * Optional because the bundled copy carries none: a committee's records are
   * whatever the panel has bound to it, and with no API there are none to show.
   */
  updates?: CommitteeUpdate[];
}

export interface IqacAboutContent {
  boxes: IqacAboutBox[];
}

export interface AboutTrusteesContent {
  members: AboutTrusteeMember[];
}

export interface BcomStat {
  label: string;
  value: string;
  description: string;
}

export interface BcomCompetency {
  iconName: string;
  name: string;
  description: string;
}

/** One accordion panel, carrying the subjects taught inside it. */
export interface BcomTerm {
  title: string;
  subjects: string[];
}

export interface BcomCareer {
  role: string;
  company: string;
}

export interface CoursesBcomContent {
  stats: BcomStat[];
  competencies: BcomCompetency[];
  curriculum: BcomTerm[];
  careers: BcomCareer[];
}

/** Pages beyond the homepage travel in the same payload and the same publish. */
export interface PagesContent {
  aboutOverview: AboutOverviewContent;
  aboutVisionMission: AboutVisionMissionContent;
  aboutMission: AboutMissionContent;
  aboutFounder: AboutFounderContent;
  aboutTrust: AboutTrustContent;
  aboutTrustees: AboutTrusteesContent;
  coursesBcom: CoursesBcomContent;
  coursesBba: CoursesBcomContent;
  coursesBca: CoursesBcomContent;
  aboutPrincipalsMessage: { priorities: string[] };
  aboutHodsMessage: {
    snapshot: { label: string; value: string; detail: string }[];
    hods: AboutHod[];
    synergyCards: { title: string; description: string }[];
  };
  iqacAbout: IqacAboutContent;
  /** Keyed by the slug in the page's URL: `sedg-cell`, not `committees/sedg-cell`. */
  committees: Record<string, CommitteeContent>;
  /**
   * The register, in the order the Committees menu reads: down the Statutory
   * Cells column, then Development Councils. A list rather than a map because
   * that order is the point.
   */
  committeeNav: CommitteeNavEntry[];
  /** The Help Desk form's four dropdowns. */
  helpDesk: HelpDeskOptions;
  /** What the admission enquiry form offers to ask about. */
  inquiryBranches: InquiryBranch[];
  inquiryOptions: InquiryOptions;
  /** Keyed by the slug in the page's URL: `inter-college`, not the whole path. */
  campusLife: Record<string, CampusLifePageContent>;
  /**
   * Student Corner → Syllabus, keyed by course slug: `bcom`, `bba`, `bca`.
   *
   * Syllabus only. Assignment and Question Paper are the same viewer but a
   * different shape — their documents hang off a semester — and still read the
   * data compiled into the site.
   */
  syllabus: Record<string, SyllabusResource[]>;
  /**
   * Student Corner → Question Paper, keyed by course and then by semester:
   * `questionPaper.bcom['1']`, because the URL names both.
   */
  questionPaper: Record<string, Record<string, SyllabusResource[]>>;
  /**
   * Student Corner → Assignment, keyed the same way. A card here is a subject
   * rather than a document, so these carry `subject` where a question paper
   * carries `label`.
   */
  assignment: Record<string, Record<string, AssignmentResource[]>>;
}

/** One syllabus document: a label, and the Google Drive address it opens. */
export interface SyllabusResource {
  label: string;
  url: string;
}

/**
 * One assignment: the subject it belongs to, and the Google Drive address it
 * opens. The subject is typed in the panel rather than read from the course's
 * curriculum — see the migration for why — so nothing here guarantees it
 * matches /courses/<slug>; the admin help text asks for it.
 */
export interface AssignmentResource {
  subject: string;
  url: string;
  /**
   * What the badge over the card says, and what its button says. Both empty for
   * the ordinary case, where the page works them out from the address the way
   * it always did. An editor fills them in when a brief does not live on the
   * college's Google Drive.
   */
  badge: string;
  linkLabel: string;
}

/**
 * Copy for one course's Question Paper pages — its own screen, because six
 * semesters of lists per course is more than one screen can hold.
 */
export interface StudentCornerQuestionPaperSection {
  title: string;
  subtitle: string;
  description: string;
  selectorHeading: string;
  semesterHeading: string;
  documentNote: string;
  emptyMessage: string;
}

/**
 * Copy for one course's Assignment pages. The same seven fields as the question
 * paper above and, for the same reason, a screen of its own per course.
 */
export interface StudentCornerAssignmentSection {
  title: string;
  subtitle: string;
  description: string;
  selectorHeading: string;
  semesterHeading: string;
  documentNote: string;
  emptyMessage: string;
}

/**
 * Copy for /enquiry, the admission enquiry form. `ctaLabel` lives here rather
 * than with the navbar because renaming the button and rewording the page it
 * opens is one job.
 */
export interface AdmissionInquiryContent {
  badge: string;
  title: string;
  subtitle: string;
  contactHeading: string;
  contactDescription: string;
  courseHeading: string;
  courseDescription: string;
  enquiryHeading: string;
  enquiryDescription: string;
  topicsHeading: string;
  notePlaceholder: string;
  consentLabel: string;
  submitLabel: string;
  disclaimer: string;
  contactLine: string;
  officeHours: string;
  successHeading: string;
  successBody: string;
  ctaLabel: string;
  // The form's own words.
  labelFullName: string;
  labelEmail: string;
  labelPhone: string;
  labelCity: string;
  labelProgramme: string;
  labelAcademicYear: string;
  labelQualification: string;
  labelBoard: string;
  labelContactMethod: string;
  labelBestTime: string;
  labelHeardFrom: string;
  labelMessage: string;
  placeholderFullName: string;
  placeholderEmail: string;
  placeholderPhone: string;
  placeholderCity: string;
  placeholderBoard: string;
  promptProgramme: string;
  promptAcademicYear: string;
  promptQualification: string;
  promptBestTime: string;
  promptHeardFrom: string;
  phoneHint: string;
  topicsHint: string;
  errorEmail: string;
  errorPhone: string;
  referenceLabel: string;
  // Switched on in the panel to make an optional field required; the server
  // enforces the same flags.
  requireCity: boolean;
  requireBoard: boolean;
  requireBestTime: boolean;
  requireHeardFrom: boolean;
  requireMessage: boolean;
}

/** The enquiry form's six dropdowns, each a list of labels as shown. */
export interface InquiryOptions {
  topics: string[];
  qualifications: string[];
  bestTimes: string[];
  heardFrom: string[];
  contactMethods: string[];
  /**
   * A Lucide name per contact method, matched on `label`; beside the labels
   * rather than in them so older snapshots still read. Absent or an empty
   * `iconName` keeps the site's own icon for that method.
   */
  contactMethodIcons?: { label: string; iconName: string }[];
  academicYears: string[];
}

/** One programme the enquiry form offers to ask about. */
export interface InquiryBranch {
  label: string;
  description: string;
}

/** Copy for Student Corner → Syllabus, shared by all three course pages. */
export interface StudentCornerSyllabusSection {
  title: string;
  subtitle: string;
  description: string;
  selectorHeading: string;
  repositoryHeading: string;
  documentNote: string;
  emptyMessage: string;
}

/** Copy for one Campus Life gallery page. */
export interface CampusLifePageSection {
  title: string;
  subtitle: string;
  description: string;
  /**
   * The band across the top, where the page has been given one. Absent, the
   * band falls back to the first photograph in the gallery, as it always did.
   * `crop` is the part of the picture the band shows; without one it shows the
   * middle.
   */
  banner?: { imageUrl: string; alt: string; crop?: ImageCrop | null };
}

/**
 * Copy for /about/directors-message. Nothing on this page repeats, so unlike the
 * other About pages it has no entry under `pages`.
 */
export interface AboutDirectorsMessageSection {
  title: string;
  subtitle: string;
  portrait: {
    imageUrl: string;
    /** The part of the picture its frame shows; absent, the middle. */
    crop?: ImageCrop | null;
    imageAlt: string;
    name: string;
    role: string;
    credential: string;
  };
  contact: { email: string; officeHours: string; affiliation: string };
  letter: {
    salutation: string;
    heading: string;
    paragraphs: string[];
    signatureName: string;
    signatureRole: string;
  };
}

/**
 * Copy for /about/principals-message. The letter is one-off, but the priorities
 * under it repeat, so those come through `pages` like the other About lists.
 */
export interface AboutPrincipalsMessageSection {
  title: string;
  subtitle: string;
  portrait: {
    imageUrl: string;
    /** The part of the picture its frame shows; absent, the middle. */
    crop?: ImageCrop | null;
    imageAlt: string;
    name: string;
    role: string;
    credential: string;
  };
  contact: { email: string; experience: string; affiliation: string };
  letter: {
    salutation: string;
    heading: string;
    paragraphs: string[];
    prioritiesHeading: string;
    signatureName: string;
    signatureRole: string;
  };
}

/**
 * Copy for /about/hods-message. Only the wording shared by every HOD card lives
 * here; the heads of department and their own lists come through `pages`.
 */
export interface AboutHodsMessageSection {
  title: string;
  subtitle: string;
  intro: { eyebrow: string; heading: string; description: string; allFilterLabel: string };
  shared: {
    wingLabel: string;
    addressLabel: string;
    prioritiesHeading: string;
    signatureRole: string;
    contactLabel: string;
  };
  synergy: { eyebrow: string; heading: string; description: string };
}

/** One head of department, with the three lists they own. */
export interface AboutHod {
  id: string;
  department: string;
  departmentCode: string;
  filterLabel: string;
  name: string;
  role: string;
  credentials: string;
  experience: string;
  specialization: string;
  email: string;
  imageUrl: string;
  /** The part of the picture the editor framed for its frame; absent, the middle. */
  crop?: ImageCrop | null;
  iconName: string;
  message: string;
  programs: string[];
  links: { label: string; url: string }[];
  goals: string[];
}

/**
 * Copy for one Activities page.
 *
 * The cards beneath are bulletin items, shared with the homepage and edited
 * under News & activities; this is the page around them. `listHeading` is the
 * line they are listed under, which used to be written into the page itself.
 */
export interface ActivitiesPageSection {
  title: string;
  subtitle: string;
  description: string;
  listHeading: string;
}

/** Copy for /iqac/about: the banner, and nothing else — the boxes are a list. */
export interface IqacAboutSection {
  title: string;
  subtitle: string;
}

/** Copy for /about/trustees. */
export interface AboutTrusteesSection {
  title: string;
  subtitle: string;
  board: { eyebrow: string; heading: string; affiliationLabel: string };
}

/** Copy for /about/trust, grouped as the page reads. */
export interface AboutTrustSection {
  title: string;
  subtitle: string;
  hero: {
    imageUrl: string;
    /** The part of the picture its frame shows; absent, the middle. */
    crop?: ImageCrop | null;
    imageAlt: string;
    badge: string;
    heading: string;
    subtext: string;
  };
  genesis: {
    heading: string;
    /** Each may carry inline markup; render with renderRichText. */
    paragraphs: string[];
  };
  institutions: { eyebrow: string; heading: string; affiliationLabel: string };
}

/** Copy for a course page, grouped as the page reads. The three share a shape. */
export interface CoursesBcomSection {
  title: string;
  subtitle: string;
  intro: {
    eyebrow: string;
    heading: string;
    /** Each may carry inline markup; render with renderRichText. */
    paragraphs: string[];
    imageUrl: string;
    crop?: ImageCrop | null;
    imageAlt: string;
    imageBadge: string;
  };
  programDetails: { eyebrow: string; heading: string };
  competencies: { eyebrow: string; heading: string };
  laboratories: {
    heading: string;
    description: string;
    imageUrl: string;
    crop?: ImageCrop | null;
    imageAlt: string;
    admissionHeading: string;
    admissionText: string;
  };
  curriculum: { heading: string; description: string };
  placement: { eyebrow: string; heading: string; description: string };
}

/** Copy for /about/founder, grouped as the page reads. */
export interface AboutFounderSection {
  title: string;
  subtitle: string;
  /** `crop` is the part of the portrait its 3:4 frame shows; absent, the middle. */
  portrait: { imageUrl: string; crop?: ImageCrop | null; imageAlt: string; name: string; role: string };
  motto: { label: string; text: string };
  biography: {
    badge: string;
    heading: string;
    /** Each may carry inline markup; render with renderRichText. */
    paragraphs: string[];
    pullQuote: string;
  };
  highlights: { heading: string };
}

/** Copy for /about/mission, grouped as the page reads. */
export interface AboutMissionSection {
  title: string;
  subtitle: string;
  hero: {
    imageUrl: string;
    /** The part of the picture its frame shows; absent, the middle. */
    crop?: ImageCrop | null;
    imageAlt: string;
    badge: string;
    heading: string;
    subtext: string;
  };
  spheres: { eyebrow: string; heading: string };
  milestones: { eyebrow: string; heading: string };
}

/** Copy for /about/vision-mission, grouped as the page reads. */
export interface AboutVisionMissionSection {
  title: string;
  subtitle: string;
  hero: { imageUrl: string; crop?: ImageCrop | null; badge: string; heading: string; subtext: string };
  /** Each box's `crop` is the part of its picture the 16:10 frame shows. */
  /** `iconName` is a Lucide name picked in the panel; empty draws Eye (vision) or Rocket (mission). */
  vision: { imageUrl: string; crop?: ImageCrop | null; label: string; quote: string; footnote: string; iconName?: string };
  mission: { imageUrl: string; crop?: ImageCrop | null; label: string; quote: string; footnote: string; iconName?: string };
  atmosphere: {
    eyebrow: string;
    heading: string;
    text: string;
    leftImageUrl: string;
    leftCrop?: ImageCrop | null;
    leftImageAlt: string;
    rightImageUrl: string;
    rightCrop?: ImageCrop | null;
    rightImageAlt: string;
  };
  values: { eyebrow: string; heading: string };
}

/** The one-off copy of About → Who We Are → About Us. */
export interface AboutOverviewSection {
  title: string;
  subtitle: string;
  legacyHeading: string;
  paragraphs: string[];
  galleryFooterName: string;
  establishedLabel: string;
  timelineHeading: string;
  timelineIntro: string;
}

/**
 * The "Featured" collage down the right of a navbar mega menu.
 *
 * One section per menu, found through the menu's `id` (see `NavMenu`). The
 * menus' columns and links are the `nav_menu` section below.
 */
export interface NavFeaturedImage {
  imageUrl: string;
  crop?: ImageCrop | null;
  caption: string;
}

export interface NavFeaturedSection {
  accentText: string;
  tall1: NavFeaturedImage;
  tall2: NavFeaturedImage;
  landscape: NavFeaturedImage & { tag: string };
}

/**
 * One link in a navbar menu.
 *
 * Everything that lists the link — the desktop dropdown, the full-screen menu,
 * the dock on inside pages and the site search — reads this one entry, so a
 * rename here reaches all of them. The code looks links up by `path`, never by
 * `label`, which is what makes a rename safe.
 */
export interface NavMenuItem {
  /** The link's name: desktop dropdown, full-screen menu list, search results. */
  label: string;
  /** Where it goes: an address on this site, starting with `/`. Also picks its icon. */
  path: string;
  /** The line under the name in the desktop dropdown and the full-screen menu. */
  description: string;
  /** The dock's pill on inside pages, where there is room for a word or two. Empty uses `label`. */
  shortLabel: string;
  /** Which column of the desktop dropdown it sits in, counting from 1 (see `NavMenu.columns`). */
  column: number;
  /** A Lucide name picked in the panel; empty draws the icon its `path` has always had. */
  iconName?: string;
}

/** A column heading in a desktop dropdown. */
export interface NavMenuColumn {
  /** The small gold heading over the column. */
  title: string;
}

/** One top-level menu in the navbar. */
export interface NavMenu {
  /**
   * Stable key, never shown. Ties the menu to the part of the site it covers
   * (`about` for /about/…, which the dock uses), to its Featured collage
   * (`nav_featured_<id>`), and — for `committees` only — to the committee
   * register, which supplies that menu's links and columns in place of
   * `items` and `columns` here.
   */
  id: string;
  /** The name on the desktop bar. */
  label: string;
  /** The name in the full-screen menu's main list (the ☰ menu, and the only menu on phones). */
  overlayLabel: string;
  /** The heading when that menu is opened in the full-screen menu, and over its group of search results. */
  heading: string;
  /** Which side of the logo it sits on in the desktop bar. */
  side: 'left' | 'right';
  /** The desktop dropdown's column headings, left to right. */
  columns: NavMenuColumn[];
  /** Its links, in the order the full-screen menu, the dock and search list them. */
  items: NavMenuItem[];
}

/**
 * A third-level link: a course under Student Corner → Syllabus, and so on.
 * Hangs off the menu link whose `path` equals `parentPath`.
 */
export interface NavFlyoutEntry {
  /** The `path` of the menu link this sits under, e.g. `/student-corner/syllabus`. */
  parentPath: string;
  /** The course name in the fly-out, the desktop dropdown and the full-screen menu. */
  label: string;
  /** Where it goes, starting with `/`. */
  path: string;
  /** The line under the course name in the desktop Student Corner dropdown. */
  description: string;
}

/** A pill in the homepage dock, which scrolls to a part of the homepage. */
export interface NavDockItem {
  /** The `id` of the homepage part it scrolls to, e.g. `faculty`. Also picks its icon. */
  sectionId: string;
  /** The pill's text. */
  label: string;
}

/** The navbar's menus and the full-screen menu around them (`nav_menu`). */
export interface NavMenuContent {
  /** The top menus, left side then right side, each in list order. */
  menus: NavMenu[];
  /** Third-level links, grouped under their parent by `parentPath`. */
  flyouts: NavFlyoutEntry[];
  /** Full-screen menu, a fly-out opened: the small gold line over its links. */
  flyoutHeading: string;
  /** Full-screen menu, a fly-out opened: the line under every link. */
  flyoutLine: string;
  /** The homepage dock's pills, left to right. */
  dock: NavDockItem[];
  /** Full-screen menu, over the search box's suggestions. */
  popularTermsHeading: string;
  /** Full-screen menu: the terms offered under the search box. */
  popularTerms: { term: string }[];
  /** Full-screen menu, desktop: the photo panel under the search box. */
  promo: {
    imageUrl: string;
    imageAlt: string;
    /** The small gold line over the heading. */
    eyebrow: string;
    heading: string;
    text: string;
  };
  /** The Student Help Desk link: full-screen menu row, and the button in the strip under the desktop bar. */
  helpDesk: {
    label: string;
    /** The line under it in the full-screen menu. */
    line: string;
  };
}

/** The /search page's own words (`search_page`). */
export interface SearchPageContent {
  /** The small label over the page title. */
  badgeLabel: string;
  /** The page title, and its breadcrumb. */
  title: string;
  /** Shown before anything has been searched for. */
  emptyPrompt: string;
  /** Shown under "Nothing matched …". */
  noResultsHint: string;
  /** Offered as one-tap searches; a term that finds nothing is not shown. */
  suggestedTerms: { term: string }[];
}

/*
 * The site-wide sections below replaced literals in the components. Their
 * defaults live in `editableDefaults.ts`, which the backend also reads to seed
 * the database, so what is written there is what the site shows until edited.
 */

/** A phone number the college publishes. */
export interface SitePhone {
  /** Which line it is, for the admin; not shown on the site. */
  label: string;
  /**
   * As written on Contact Us and Campus Map ("+91 90234 37774"). The footer,
   * the chatbot and the search-engine data print its last ten digits instead.
   */
  number: string;
}

/** The college's shared facts, written once and read wherever they appear (`site_info`). */
export interface SiteInfoContent {
  /** The brand's first line, next to the logo in the navbar and the footer. */
  brandName: string;
  /** The line under it, in the navbar and the footer. */
  brandSubtitle: string;
  /** The full name: search-engine data (`og:site_name`, author, the organisation record). */
  officialName: string;
  /**
   * The postal address, in parts. The footer prints street, city - postcode,
   * state; Contact Us adds the country; the chatbot's `{address}` stops at the
   * postcode; the search-engine record uses each part on its own.
   */
  address: {
    street: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
  /** Contact Us lists every one; the footer, Campus Map and chatbot use the first. */
  phones: SitePhone[];
  /** Footer, Contact Us, the Admissions contact line, chatbot `{email}`, search-engine record. */
  email: string;
  /**
   * Contact Us "Institute Timings", Campus Map's visitor line and chatbot
   * `{hours}`. The footer shows it with an en dash for "to" and "IST" after it.
   */
  officeHours: string;
  /** Contact Us "Get Directions": a Google Maps directions link. */
  directionsUrl: string;
  /** Contact Us "View Larger Map" and Campus Map "Navigate via Google Maps". */
  mapUrl: string;
  /** Map coordinates, for search engines only (organisation record and geo tags). */
  geo: { latitude: string; longitude: string };
  /** The college's social profiles. Listed to search engines (`sameAs`); not shown on a page. */
  socials: { platform: string; label: string; url: string }[];
  /** The link at the right of the footer's bottom bar. */
  universityPortal: { label: string; url: string };
}

/** A link in a footer column. */
export interface FooterLink {
  label: string;
  /** An address on this site. One starting `/#` scrolls to that part of the homepage. */
  href: string;
}

/** The footer (`footer`). Its contact block reads `site_info`. */
export interface FooterContent {
  /**
   * The handwritten farewell over the facade, homepage only. Two halves
   * because phones break the line between them.
   */
  farewellLead: string;
  farewellTrail: string;
  /** The link columns, left to right, after the contact block. */
  columns: { heading: string; links: FooterLink[] }[];
  /** The bottom bar, after "© <this year>". */
  copyright: string;
}

/** One row of the Route 206 timetable on Contact Us. */
export interface BusTimetableRow {
  /** The time band, e.g. "06:10 - 09:30". */
  time: string;
  /** How often a bus runs in it, e.g. "20 Minute". */
  frequency: string;
}

/** A card in "For More Details" at the foot of Contact Us. */
export interface ReachUsSocialCard {
  /** The text under the picture. */
  label: string;
  /** Where the card goes. Empty makes a card that is not a link. */
  url: string;
  imageUrl: string;
  /** Shown if `imageUrl` fails to load. */
  fallbackImageUrl: string;
  imageAlt: string;
}

/**
 * The Contact Us page, /about/reach-us (`reach_us`). The address, phones,
 * email and timings in its left-hand card are `site_info`'s.
 */
export interface ReachUsContent {
  /** The page title and the line under it. */
  title: string;
  subtitle: string;
  /** The brown card under the contact details; its button emails `site_info.email`. */
  commitment: { heading: string; text: string; buttonLabel: string };
  /** The left map: heading, the embedded map, the badge on it, and its button (goes to `site_info.directionsUrl`). */
  routeMap: {
    heading: string;
    embedUrl: string;
    badgeTime: string;
    badgeDistance: string;
    buttonLabel: string;
  };
  /** The right map; its button goes to `site_info.mapUrl`. */
  locationMap: { heading: string; embedUrl: string; buttonLabel: string };
  /** The Transport card. */
  transport: {
    heading: string;
    intro: string;
    /** The notice over the City Bus tab. */
    busNotice: string;
    busPhotoUrl: string;
    busPhotoAlt: string;
    /** The timetable card's header: its title and the stop's name in English and Gujarati. */
    stopHeading: string;
    stopNameEn: string;
    stopNameGu: string;
    /** First half of the timetable: its heading and rows. */
    outboundHeading: string;
    outboundRows: BusTimetableRow[];
    /** Second half, the return journey. */
    returnHeading: string;
    returnRows: BusTimetableRow[];
    /** The link at the foot of the timetable card. */
    timetableLinkLabel: string;
    timetableLinkUrl: string;
    /** The BRTS tab's map; clicking it opens the same picture full size. */
    brtsMapUrl: string;
    brtsMapAlt: string;
  };
  /** "For More Details" at the foot of the page. */
  socialHeading: string;
  socialSubheading: string;
  socialCards: ReachUsSocialCard[];
}

/** A block in Campus Map's "Key Campus Zones & Facilities". Its icon follows its position. */
export interface CampusZone {
  /** Its filter button over the grid. */
  filterLabel: string;
  title: string;
  description: string;
  facilities: { name: string }[];
  /** A Lucide name picked in the panel; empty draws the icon of its position. */
  iconName?: string;
}

/** A card in Campus Map's "How to Reach the Campus". Its icon follows its position. */
export interface CampusTravelGuide {
  mode: string;
  /** The gold tag, e.g. "30-35 Mins (~16 km)". */
  time: string;
  detail: string;
  /** A Lucide name picked in the panel; empty draws the icon of its position. */
  iconName?: string;
}

/** The Campus Map page, /about/campus-map (`campus_map`). */
export interface CampusMapContent {
  title: string;
  subtitle: string;
  /** The dark card at the top. Its button goes to `site_info.mapUrl`. */
  banner: {
    badge: string;
    heading: string;
    text: string;
    buttonLabel: string;
    /** The address chip beside the button. */
    location: string;
  };
  /** "Campus Blueprint": the map picture, its link, and the picture shown if it fails. */
  blueprint: {
    heading: string;
    intro: string;
    linkLabel: string;
    imageUrl: string;
    imageAlt: string;
    fallbackImageUrl: string;
  };
  /** The embedded Google map. */
  satellite: { heading: string; intro: string; badge: string; embedUrl: string };
  zonesHeading: string;
  zonesIntro: string;
  /** The label on the filter button that shows every zone. */
  allZonesLabel: string;
  zones: CampusZone[];
  travelHeading: string;
  travelIntro: string;
  travelGuides: CampusTravelGuide[];
  /** The panel at the foot. `{hours}` in `text` becomes `site_info.officeHours`; the button rings the first phone. */
  visitors: { eyebrow: string; heading: string; text: string; buttonLabel: string };
}

/**
 * The faded photo behind every inner page's title, and the small gold word
 * over it (`inner_pages`). A page with a banner of its own (Campus Life) uses
 * that instead.
 */
export interface InnerPagesContent {
  /** Used where nothing else names a photo. */
  defaultImage: string;
  /** One per address, e.g. `/about/founder`. */
  banners: { path: string; imageUrl: string }[];
  /** The gold word over the title and in the breadcrumb, per part of the site (`about`, `courses`, …). */
  categoryNames: { category: string; name: string }[];
}

/** An article in the homepage's Blogs & Campus Magazine. */
export interface BlogsMagazinePost {
  title: string;
  subtitle: string;
  /** Must match one of `categories` to appear under that filter. */
  category: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  /** Shown as written, e.g. "Coming soon". */
  date: string;
  readTime: string;
  coverImage: string;
  /** The card's summary. */
  excerpt: string;
  /** The body in the reader, one entry per paragraph. */
  paragraphs: { text: string }[];
}

/** A magazine issue in the homepage's Blogs & Campus Magazine. */
export interface BlogsMagazineIssue {
  title: string;
  edition: string;
  year: string;
  coverImage: string;
  description: string;
  highlights: { text: string }[];
  totalPages: number;
  /** The issue's PDF. Empty or absent hides Download and the flipbook button. */
  pdfUrl?: string;
}

/** The homepage's Blogs & Campus Magazine block (`blogs_magazine`). Hidden when both lists are empty. */
export interface BlogsMagazineContent {
  /** The pill over the heading. */
  eyebrow: string;
  headingLead: string;
  /** The italic words after the lead. */
  headingHighlight: string;
  intro: string;
  blogsTabLabel: string;
  magazineTabLabel: string;
  /** The filters after "All", in order. */
  categories: { name: string }[];
  searchPlaceholder: string;
  posts: BlogsMagazinePost[];
  issues: BlogsMagazineIssue[];
}

/**
 * The chat assistant (`chatbot`). In any answer, `{phone}`, `{email}`,
 * `{address}` and `{hours}` are replaced with `site_info`'s, so a changed
 * number reaches the answers too.
 */
export interface ChatbotContent {
  /** The first message, shown when the chat opens. */
  welcome: string;
  /**
   * The chips over the text box. Tapping one sends `message` to the assistant;
   * if it can't be reached, the reply is `answers[topic]` (`admissions`,
   * `academics`, `scholarships` or `contact`). The topic also picks the chip's
   * icon unless `iconName` (a Lucide name picked in the panel) is set.
   */
  quickReplies: { label: string; message: string; topic: string; iconName?: string }[];
  /**
   * The answers given while the assistant can't be reached: a chip's topic
   * picks one, a bare greeting gets `greeting`, anything else `fallback`.
   */
  answers: {
    admissions: string;
    academics: string;
    scholarships: string;
    contact: string;
    /** For "hello", "hi" and the like. */
    greeting: string;
    /** When nothing else matches. */
    fallback: string;
  };
}

/** Search-engine text for one address. */
export interface SeoRoute {
  /** The address, e.g. `/courses/bba`. */
  path: string;
  /**
   * The tab title, shown exactly as written. Empty = use the page's own
   * heading (followed by "| CKPCMC Surat"). On `/` the Homepage SEO section's
   * title takes precedence.
   */
  title: string;
  /** The `description` meta tag. On `/` the Homepage SEO section's description takes precedence. */
  description: string;
  keywords: string;
  /** The `ai-content-summary` meta tag. */
  aiSummary: string;
}

/** Search-engine text: per address, and the organisation record every page carries (`seo_pages`). */
export interface SeoPagesContent {
  routes: SeoRoute[];
  /** The organisation record's other names. Its address, phone and email are `site_info`'s. */
  alternateNames: { name: string }[];
  foundingDate: string;
  organisationDescription: string;
  /** The `publisher` meta tag. */
  publisher: string;
}

export interface HomeContent {
  announcementBar: AnnouncementBarContent;
  hero: HeroContent;
  about: AboutContent;
  newsBulletin: NewsBulletinContent;
  principalMessage: PrincipalMessageContent;
  courses: CoursesContent;
  campusLife: CampusLifeContent;
  faculty: FacultyContent;
  admissions: AdmissionsContent;
  admissionsPopup: AdmissionsPopupContent;
  committeesIndex: CommitteesIndexContent;
  studentHelpDesk: StudentHelpDeskContent;
  admissionInquiry: AdmissionInquiryContent;
  seoHome: SeoHomeContent;
  /** Site-wide sections: their defaults are `editableDefaults.ts`. */
  siteInfo: SiteInfoContent;
  footer: FooterContent;
  reachUs: ReachUsContent;
  campusMap: CampusMapContent;
  innerPages: InnerPagesContent;
  blogsMagazine: BlogsMagazineContent;
  chatbot: ChatbotContent;
  seoPages: SeoPagesContent;

  heroSlides: HeroSlide[];
  valueCards: ValueCard[];
  courseCards: CourseCard[];
  pillars: PillarContent[];
  polaroids: PolaroidContent[];
  faqs: FaqContent[];
  featuredStaff: FeaturedStaffContent[];
  /** The whole directory: the two staff pages list it, the homepage shows four. */
  staff: FeaturedStaffContent[];
  /** Bulletin records keep the existing discriminated-union shape from newsData.ts. */
  bulletinItems: unknown[];
  /** News, events and achievements for the Activities pages. */
  activities: ActivitiesContent;

  /** Copy and lists for pages other than the homepage. */
  aboutOverview: AboutOverviewSection;
  aboutVisionMission: AboutVisionMissionSection;
  aboutMission: AboutMissionSection;
  aboutFounder: AboutFounderSection;
  aboutTrust: AboutTrustSection;
  aboutTrustees: AboutTrusteesSection;
  aboutDirectorsMessage: AboutDirectorsMessageSection;
  aboutPrincipalsMessage: AboutPrincipalsMessageSection;
  aboutHodsMessage: AboutHodsMessageSection;
  staffTeaching: StaffPageSection;
  staffNonTeaching: StaffPageSection;
  coursesBcom: CoursesBcomSection;
  coursesBba: CoursesBcomSection;
  coursesBca: CoursesBcomSection;
  iqacAbout: IqacAboutSection;
  // The five statutory cells carry the same banner copy as About IQAC.
  committee_anti_ragging: IqacAboutSection;
  committee_equal_opportunity: IqacAboutSection;
  committee_sedg_cell: IqacAboutSection;
  committee_sexual_harassment: IqacAboutSection;
  committee_national_task_force: IqacAboutSection;
  studentCornerSyllabus: StudentCornerSyllabusSection;
  question_paper_bcom: StudentCornerQuestionPaperSection;
  question_paper_bba: StudentCornerQuestionPaperSection;
  question_paper_bca: StudentCornerQuestionPaperSection;
  assignment_bcom: StudentCornerAssignmentSection;
  assignment_bba: StudentCornerAssignmentSection;
  assignment_bca: StudentCornerAssignmentSection;
  /** The navbar mega-menu collages — one per menu, all eight of them. */
  navFeaturedAbout: NavFeaturedSection;
  navFeaturedCourses: NavFeaturedSection;
  navFeaturedStaff: NavFeaturedSection;
  navFeaturedCommittees: NavFeaturedSection;
  navFeaturedIqac: NavFeaturedSection;
  navFeaturedCampusLife: NavFeaturedSection;
  navFeaturedStudentCorner: NavFeaturedSection;
  navFeaturedActivities: NavFeaturedSection;
  /** The navbar's menus, dock and full-screen menu (`nav_menu`). */
  navMenu: NavMenuContent;
  /** The /search page's words (`search_page`). */
  searchPage: SearchPageContent;
  committee_iqac: IqacAboutSection;
  committee_student_service_center: IqacAboutSection;
  committee_apprenticeship_internship: IqacAboutSection;
  committee_women_development: IqacAboutSection;
  committee_nss: IqacAboutSection;
  committee_iic: IqacAboutSection;
  // The eight Campus Life gallery pages.
  campus_life_hostel: CampusLifePageSection;
  campus_life_canteen: CampusLifePageSection;
  campus_life_classrooms: CampusLifePageSection;
  campus_life_sports: CampusLifePageSection;
  campus_life_inter_college: CampusLifePageSection;
  campus_life_competitions: CampusLifePageSection;
  campus_life_gallery: CampusLifePageSection;
  campus_life_media_appreciation: CampusLifePageSection;
  // The three Activities pages.
  activities_events: ActivitiesPageSection;
  activities_news: ActivitiesPageSection;
  activities_achievements: ActivitiesPageSection;
  pages: PagesContent;
  /**
   * Keys (`home_sections.key`) of the sections switched off with the panel's
   * Hide button. Absent in the bundled copy and in older snapshots: none hidden.
   */
  hiddenSections?: string[];
}