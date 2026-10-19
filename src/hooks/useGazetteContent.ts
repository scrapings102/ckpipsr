import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The gazette board on the homepage, as edited in the admin panel. Events
 * marked for the board in the Events editor are added above these items.
 *
 * The defaults are what the board showed before it had an editor, so it looks
 * the same with the API down.
 */
/** One tab across the top of the board. Items are filed under its id. */
export interface GazetteTab {
  id: string;
  label: string;
}

export interface GazetteItemContent {
  /** The id of the tab it is filed under, or blank for none (off the homepage). */
  tab: string;
  /** news, event or notice. */
  kind: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  tag: string;
  summary: string;
  content: string;
  code: string;
  // Added later; content saved before has none, and each reads as its default.
  /** False keeps it off the homepage. Default true. */
  show?: boolean;
  /** Notices: the chip pulses red. Default false. */
  critical?: boolean;
  /** The opened item's banner picture. Without one it opens with no banner. */
  image?: string;
  imageAlt?: string;
  /** Events: the venue and speaker box. */
  venue?: string;
  speaker?: string;
}

/** Whether an item goes on the board: filed under a tab and switched on. */
export function onBoard(item: GazetteItemContent): boolean {
  return item.tab !== "" && item.show !== false;
}

/**
 * The board's fixed wording. Content saved before these could be edited has
 * none of them, so the board falls back to DEFAULT_GAZETTE one by one.
 */
export interface GazetteLabels {
  kicker: string;
  watermark: string;
  feedHeading: string;
  feedOrderLabel: string;
  rowShareLabel: string;
  rowCopiedLabel: string;
  rowShareTitle: string;
  emptyHeading: string;
  emptyMessage: string;
  noResultsHeading: string;
  noResultsMessage: string;
  clearSearchLabel: string;
  noticeBannerLabel: string;
  noticeBadgeLabel: string;
  codeLabel: string;
  archiveLabel: string;
  importantHeading: string;
  importantMessage: string;
  publishedLabel: string;
  shareLabel: string;
  copiedLabel: string;
  briefingHeading: string;
  speakerLabel: string;
  venueLabel: string;
  pressLabel: string;
  footerLeft: string;
  footerRight: string;
}

export interface GazetteContent extends Partial<GazetteLabels> {
  headingLead: string;
  headingAccent: string;
  intro: string;
  searchPlaceholder: string;
  /** In the order the board shows them. */
  tabs: GazetteTab[];
  items: GazetteItemContent[];
}

export const DEFAULT_GAZETTE: GazetteContent & GazetteLabels = {
  "headingLead": "Institute",
  "headingAccent": "Gazette Portal",
  "intro": "Stay informed with premium notices, official announcements, schedules, and circulars certified by GTU boards.",
  "searchPlaceholder": "Search news, announcements, circulars...",
  "tabs": [
    { "id": "news", "label": "News Chronicles" },
    { "id": "events", "label": "Events & Seminars" },
    { "id": "sports", "label": "Sports News" },
    { "id": "admission", "label": "Admission Hub" },
    { "id": "student", "label": "Student Directives" }
  ],
  "kicker": "Chronicles & Declarations",
  "watermark": "GAZETTE",
  "feedHeading": "Gazette Bulletins",
  "feedOrderLabel": "Chronological Release",
  "rowShareLabel": "Share",
  "rowCopiedLabel": "Copied",
  "rowShareTitle": "Copy Link",
  "emptyHeading": "No articles matching your filters.",
  "emptyMessage": "Try selecting a different tab.",
  "noResultsHeading": "No articles matching",
  "noResultsMessage": "Try clearing your search query or switching categories.",
  "clearSearchLabel": "Clear Search",
  "noticeBannerLabel": "Official Notice Publication",
  "noticeBadgeLabel": "Official Notice",
  "codeLabel": "Code",
  "archiveLabel": "Gazette Archive",
  "importantHeading": "IMPORTANT NOTICE",
  "importantMessage": "",
  "publishedLabel": "Authorized Publication",
  "shareLabel": "Share Document",
  "copiedLabel": "Copied Link",
  "briefingHeading": "Venue & Speaker Briefing",
  "speakerLabel": "Distinguished Keynote Speaker",
  "venueLabel": "Official Venue",
  "pressLabel": "Press Division",
  "footerLeft": "RECORDS ARCHIVES DIVISION // CKPIPSR",
  "footerRight": "AUTHENTIC INSTITUTIONAL CHRONICLE",
  "items": [
    {
      "tab": "news",
      "kind": "notice",
      "title": "Employment Notice – Applications for the Position of Temporary Assistant Professor",
      "date": "2026-06-04",
      "tag": "general",
      "summary": "Applications are invited from eligible candidates for the appointment of Temporary Assistant Professors in various departments for academic session 2026-27.",
      "content": "Applications are invited from qualified and eligible candidates for pure temporary basis appointments as **Temporary Assistant Professors** in the department of Computer Science, Business Management, and Applied Sciences.\n\n### Position Details & Qualifications\n- **Remuneration:** Consolidated monthly salary aligned with state education board structures.\n- **Minimum Qualification:** Post-graduation in the respective discipline with at least 55% score and NET/SLET/Ph.D. credential.\n- **Duration:** 11-month fixed terminal tenure for the Academic Year 2026-27.\n\nInterested candidates are directed to download the syllabus checklist and application forms, compiling all credential certificates for the walk-in interviews scheduled on June 20, 2026.",
      "code": "N-2026-201"
    },
    {
      "tab": "news",
      "kind": "notice",
      "title": "Employment Notice - Application for the Position Temporary Associate Professor",
      "date": "2026-06-04",
      "tag": "general",
      "summary": "Official notifications regarding openings for Senior Temporary Associate Professors in the Departments of Pharmaceutics, Pharmacognosy, and Pharmacology.",
      "content": "The university administration opens recruitment cycles for **Temporary Associate Professor** positions to lead academic modules and supervisor reviews for the upcoming term.\n\n### Role Scope & Guidelines\n- **Department Allocation:** Pharmaceutics, Pharmacology, and Pharmaceutical Chemistry.\n- **Essential Experience:** Minimum of 8 years of active teaching, research, or executive industry exposure.\n- **Interview Location:** Vice Chancellor Conference Hall, Ground Floor, Academic Block A.\n\nApplicants should upload digital portfolios and submit physical dossiers by June 18, 2026, to the Registrar's Desk.",
      "code": "N-2026-202"
    },
    {
      "tab": "news",
      "kind": "notice",
      "title": "Circular Regarding B. Optometry (Sem 2, 4 & 6), Fourth Year B. Optometry Theory / Practical Winter 2026",
      "date": "2026-05-30",
      "tag": "academic",
      "summary": "Detailed timesheet and practical block allocations published for all state optometry examinations.",
      "content": "The Controller of Examinations has officially released the theory and laboratory block rosters for B. Optometry (Semesters 2, 4, 6) alongside Fourth Year B. Optometry Winter 2026 cycles.\n\n### Key Timelines\n- **Practical Viva Voce:** Commencing June 22 to June 28, 2026.\n- **Written Examinations:** Core theory test days scheduled between 10:00 AM and 1:00 PM starting July 2, 2026.\n- **Hall Tickets:** Secured digital admit cards can be extracted via student logins starting June 15.\n\nCandidates are directed to consult with program coordinators for batch timings of experimental lab assessments.",
      "code": "N-2026-203"
    },
    {
      "tab": "news",
      "kind": "notice",
      "title": "Circular Regarding Third MBBS Part-I & MD/MS Examination Forms submission",
      "date": "2026-05-30",
      "tag": "academic",
      "summary": "Mandatory timeline and document verification protocols for MBBS & MD/MS postgraduate examination forms.",
      "content": "All academic candidates appearing for the **Third MBBS Part-I & PG MD/MS** examination series must submit their signed registration forms.\n\n### Compliance Schedule\n1. **Regular Fee Window:** Forms submission closes on June 12, 2026.\n2. **Late Fee Window (With Rs. 500 penalty):** Closes on June 18, 2026.\n3. **Internal Approvals:** Verified attendance reports must exceed 75% to receive controller clearances.",
      "code": "N-2026-204"
    },
    {
      "tab": "news",
      "kind": "notice",
      "title": "વીર નર્મદ દક્ષિણ ગુજરાત યુનિવર્સિટી વિસ્તારમાં યુનિવર્સિટીની NOC / સંમતિ તથા રાજ્ય સરકારશ્રીની મંજૂરી મેળવ્યા સિવાય",
      "date": "2026-05-19",
      "tag": "general",
      "summary": "અધિકૃત મંજૂરી મેળવ્યા સિવાય કોઈપણ પ્રકારના ઉચ્ચ શિક્ષણ અભ્યાસક્રમો શરૂ કરવા અંગેની કડક ચેતવણી અને જાહેર નોટિસ.",
      "content": "વીર નર્મદ દક્ષિણ ગુજરાત યુનિવર્સિટી (VNSG) સત્તામંડળ દ્વારા તમામ સંસ્થાઓ અને સંચાલકો માટે અતિ અગત્યની જાહેર નોટિસ બહાર પાડવામાં આવી છે.\n\n### અગત્યના નિર્દેશો:\n- **NOC ની આવશ્યકતા:** યુનિવર્સિટીના નકશા અને મર્યાદા વિસ્તારમાં કોઈપણ નવી શૈક્ષણિક પ્રવૃત્તિ કે અભ્યાસક્રમ શરૂ કરતા પહેલાં યુનિવર્સિટીની કાયદેસરની સંમતિ (No Objection Certificate) લેવી અનિવાર્ય છે.\n- **રાજ્ય સરકારની મંજૂરી:** સક્ષમ સ્તરેથી મેળવેલ મંજૂરી પત્ર વિના શૈક્ષણિક સંસ્થાની સ્થાપના અથવા પ્રવેશ પ્રક્રિયા કરવી કાયદેસર ગુનો બને છે.\n- **કાર્યવાહી:** નિયમોનું ઉલ્લંઘન કરનાર કોઈપણ એકમ કે ટ્રસ્ટ સામે યુનિવર્સિટી રજિસ્ટ્રાર દ્વારા કડક કાઉન્સિલ કાર્યવાહી હાથ ધરવામાં આવશે.",
      "code": "N-2026-205"
    },
    {
      "tab": "news",
      "kind": "notice",
      "title": "લેબોરેટરી આસિસ્ટન્ટ (બાયોસાયન્સ)ની જગ્યા માટે સ્પર્ધાત્મક પરીક્ષાની રિવાઇઝ્ડ ફાઇનલ આન્સર કી",
      "date": "2026-05-13",
      "tag": "general",
      "summary": "બાયોસાયન્સ વિભાગમાં લેબોરેટરી આસિસ્ટન્ટની ભરતી પરીક્ષાની પરીક્ષિત અને સુધારેલી ફાઇનલ આન્સર કી પ્રસિદ્ધ કરવામાં આવી છે.",
      "content": "બાયોસાયન્સ વિભાગની લેબોરેટરી આસિસ્ટન્ટ જગ્યા માટે યોજાયેલી સ્પર્ધાત્મક પરીક્ષા અંગે સુધારેલ આન્સર કી (Revised Final Answer Key) જાહેર કરવામાં આવી છે.\n\n### કી હાઇલાઇટ્સ અને આંકડા:\n- **વાંધા અરજીઓનું નિરાકરણ:** ઉમેદવારો તરફથી મળેલા વાંધાઓની તજજ્ઞ સમિતિ દ્વારા યોગ્ય તપાસ બાદ આ અંતિમ ઉત્તરાવલિ જાહેર કરવામાં આવી છે.\n- **પરિણામ પ્રક્રિયા:** આપેલ રિવાઇઝ્ડ આન્સર કીના સ્કોર્સના આધારે જ મુખ્ય મેરિટ યાદી તૈયાર કરવામાં આવશે.\n- **ડાઉનલોડ લિંક:** આન્સર કી ડાઉનલોડ કરવા માટે રિક્રૂટમેન્ટ પોર્ટલની મુલાકાત લો અથવા યુનિવર્સિટીના નોટિસ સેક્શનમાંથી સીધી પીડીએફ મેળવો.",
      "code": "N-2026-206"
    },
    {
      "tab": "news",
      "kind": "notice",
      "title": "NOTICE: Regarding submission of Form-16 instead of Income Tax return of AY 2026-27",
      "date": "2026-04-23",
      "tag": "general",
      "summary": "Important circular for administrative, non-teaching, and academic staff regarding secure salary verification using Form-16 submissions.",
      "content": "To streamline compliance procedures for the assessment year 2026-27, all staff members are requested to consult the current accounting directives for income tax declaration.\n\n### Key Instructions\n- **Submission Document:** Employees may submit their official Form-16 issued by the state treasury ledger in lieu of active online draft filings for immediate payroll configurations.\n- **Deadline:** Physical signed documents must reach the finance officer on or before June 25, 2026.",
      "code": "N-2026-207"
    },
    {
      "tab": "news",
      "kind": "news",
      "title": "Fashion Show of Inferno’26: Celebrating Vogue Mania",
      "date": "2026-02-15",
      "tag": "Campus Event",
      "summary": "The grand celebration of style and creativity at Vogue Mania – Fashion Show, organized under Inferno’26, showcasing revolutionary sustainability-centric designs.",
      "content": "Vogue Mania, the absolute crown jewel of the annual Inferno'26 cultural showcase, concluded on a high note with breathtaking student runway exhibits. Built from the ground up by student committee directors, the collection focused heavily on zero-waste assembly and handloom textile production.\n\n### Key Highlights of the Show\n- **Sustainable Materials:** Real costumes assembled utilizing local Gujarati organic cottons and pure handloom fabrics.\n- **Cultural Sync:** Modern styling concepts merged seamlessly with regional block-printing methods.\n- **Student Leadership:** Mentored by advisory faculty, but executed entirely by creative student guilds.\n\nAn array of acclaimed clothing designers from Surat and Ahmedabad attended as external jury members, giving highest marks for styling cohesion and tailors.",
      "code": ""
    },
    {
      "tab": "news",
      "kind": "news",
      "title": "Press Coverage of Shaam Shaandar Sangeet | Featured in City Bhaskar",
      "date": "2026-02-14",
      "tag": "Media Release",
      "summary": "The vibrant cultural pre-event of Inferno’26, \"Shaam Shaandar – Sangeet Night\", organized by the student body, captured the attention of major local newspapers.",
      "content": "Leading vernacular news publication **Divya Bhaskar** highlighted the exceptional brilliance and student participation at \"Shaam Shaandar\" Sangeet under its *City Bhaskar* edition. \n\n### Key Points of Newspaper Mention\n- **Exceptional Gathering:** An estimated 2,000+ strong crowd including students, alumni, and honorable trustees.\n- **Creative Directing:** Highly synchronized musical choreography that bridged classical rhythms with contemporary beats.\n- **Regional Applause:** Appreciated by key regional columnists for setting new standards in collegiate event orchestration.",
      "code": ""
    },
    {
      "tab": "news",
      "kind": "news",
      "title": "Outstanding Performance in MMS Simulated business challenge",
      "date": "2026-02-10",
      "tag": "Achievement",
      "summary": "Our management students secured top positions and accolades in regional Master of Management Studies (MMS) business simulator challenges.",
      "content": "Our student contingent from the Department of Management won **top honors** at regional business simulator face-offs, competing with over 30 top tier institutes across the state.\n\n### Strategy Elements\n- **Resource Mastery:** Highly commended for demonstrating realistic capital allocations under simulated market recessions.\n- **Analytical Pitch:** The team proposed an optimization strategy which reduced mock operational expenses by 18%.\n- **Academic Pride:** Faculty coordinators noted this highlights the effectiveness of case-based learning.",
      "code": ""
    },
    {
      "tab": "events",
      "kind": "notice",
      "title": "Symposium on Sustainable Energy Solutions & Green Building Technology",
      "date": "2026-06-15",
      "tag": "academic",
      "summary": "An intensive full-day forum with clean tech executives, research scholars, and architects looking at modern solar panel microgrids.",
      "content": "Join lead researchers at the **Symposium on Sustainable Energy Solutions & Green Building Technology**. \n\n### Speaker List & Topics\n- **Keynote:** Dr. Helen Carter (National Green Tech Foundation) discussing resilient metropolitan battery arrays.\n- **Panel Discussion:** Implementation of zero-emission materials inside campus architectures.\n- **Time/Venue:** June 28, 2026 • 10:00 AM • Main Seminar Hall C.",
      "code": "N-2026-208"
    },
    {
      "tab": "events",
      "kind": "notice",
      "title": "Academic Seminar: New Horizons in Material Science & Polymer Chemistry",
      "date": "2026-06-10",
      "tag": "academic",
      "summary": "Exploring biodegradable composite sheets and nano-scale molecular bonds for aerospace structures.",
      "content": "Our postgraduate chemistry department invites faculty and research fellows to a premier academic seminar on polymer composites.\n\n- **Objective:** Discussion on commercial licensing of academic material discoveries.\n- **Featured Presenter:** Prof. Amit Varma (IIT Bombay Emeritus Professor).\n- **Registration:** Limited to 150 scholars. Check-in commences at 9:30 AM on July 5, 2026.",
      "code": "N-2026-209"
    },
    {
      "tab": "events",
      "kind": "notice",
      "title": "Industrial Expert Talk – Advancements in Cloud Infrastructure & Cyber Security",
      "date": "2026-06-02",
      "tag": "academic",
      "summary": "Veteran architects analyze modern container orchestration, Kubernetes ingress isolation, and edge-computing defense systems.",
      "content": "A high-level systems lecture detailing industry-best server operations. Recommended for Computer Science and IT scholars.\n\n- **Topic:** Distributed databases, container scaling under peak traffic loads, and real-time security scanning.\n- **Speaker:** Mr. Rajesh Deshpande (DevOps Director, TechScale Global).",
      "code": "N-2026-210"
    },
    {
      "tab": "events",
      "kind": "event",
      "title": "Expert Talk on Career Pathways for IT Graduates",
      "date": "2026-04-25",
      "tag": "Expert Talk",
      "summary": "Our college organized an informative guest session guiding young IT aspirants on industry-oriented toolchains, software engineering, and industry pathways.",
      "content": "This guest expert talk brought direct enterprise computing knowledge onto campus. Undergraduates interacted to understand market demands, modern developer stacks, and key preparation strategies.\n\n- **Technology Focus:** Enterprise system scaling, clean code best practices, API integrations, and cloud architectures.\n- **Interactive Q&A Session:** Over 250 students attended, holding deep discussions about building impressive developer resumes and selecting capstones.\n- **Resources Distributed:** Shared study material and a pathway to professional internships.",
      "code": ""
    },
    {
      "tab": "events",
      "kind": "event",
      "title": "Lakshya 2.0: Strategic Leadership on Modern Startups",
      "date": "2026-04-24",
      "tag": "Seminar",
      "summary": "The IQAC cell hosted 'Lakshya 2.0', a strategic campus-wide leadership seminar focusing on young entrepreneurship and small enterprise planning.",
      "content": "Lakshya 2.0 acted as a premier node for student entrepreneurs. The masterclass challenged traditional management paradigms, guiding scholars on real strategy formulation.\n\n- **Interactive Core:** Live simulation exercises where student teams drafted competitive business structures.\n- **Strategic Briefing:** Dr. Singh focused heavily on team dynamics, clear communications, and milestone mapping.\n- **Takeaway Guidelines:** Attendees received diagnostic tools for evaluating market-fit vectors.",
      "code": ""
    },
    {
      "tab": "events",
      "kind": "event",
      "title": "SSIP Hackathon 2026: Sustainable Municipal Innovations",
      "date": "2026-04-05",
      "tag": "SSIP Hackathon",
      "summary": "Student innovators designed clever local logistics networks and waste disposal management prototypes in a continuous 24-hour developer challenge.",
      "content": "An intense, 24-hour hackathon executed under the Student Start-up and Innovation Policy (SSIP) guidelines, targeting acute regional metropolitan challenges.\n\n- **Primary Pillars:** Smart traffic flow algorithms, solid waste management systems, and water quality validation.\n- **Feedback Loop:** Tech mentors sat side-by-side with young programmers to validate cloud architectures and telemetry models.\n- **Outstanding Concept:** Winner certificates went to the computerized grievance-dispatch system mockup for urban municipal wards.",
      "code": ""
    },
    {
      "tab": "sports",
      "kind": "news",
      "title": "CKPIPSR Annual Khel Mahotsav & Athletics Championship 2026 Concludes with Triumph",
      "date": "2026-03-28",
      "tag": "Athletics",
      "summary": "Over 800 student athletes competed in track events, volleyball, badminton, and martial arts during the 3-day annual collegiate sports festival.",
      "content": "The **CKPIPSR Annual Khel Mahotsav 2026** brought together student athletes across B.Pharm, M.Pharm, and Pharm.D departments in a display of sportsmanship and high energy.\n\n### Championship Highlights\n- **Individual Champions:** Outstanding Player trophy awarded to B.Pharm final-year sprinter Vivek Patel (Gold in 100m, 200m & Long Jump).\n- **Overall Department Shield:** Department of Pharmaceutics (M.Pharm) clinched the overall team trophy with 14 podium finishes.\n- **Women's Powerhouse:** B.Pharm female athletics contingent dominated relay and table tennis categories.\n\nTrustees and faculty directors commended the sports council for immaculate event execution and disciplined play throughout the tournament.",
      "code": ""
    },
    {
      "tab": "sports",
      "kind": "news",
      "title": "VNSGU Inter-College Cricket Tournament: CKPIPSR Team Lifts Champions Trophy",
      "date": "2026-03-20",
      "tag": "Cricket Victory",
      "summary": "In a thrilling final match against City Pharmacy College, CKPIPSR cricket XI secured victory by 34 runs to claim the South Gujarat university cup.",
      "content": "Our college cricket squad delivered an all-round masterclass performance in the **VNSGU Inter-College Cricket Championship Final** held at the Lalbhai Contractor Stadium, Surat.\n\n### Match Summary\n- **Batting Brilliance:** Opener Harshil Shah scored an unbeaten 82 off 54 balls, setting a competitive total of 178/5.\n- **Bowling Precision:** Off-spinner Rahul Varma took 4 wickets for 18 runs in his 4-over spell.\n- **University Honors:** The team was felicitated by VNSGU Sports Board officials with gold medals and a rotating winner trophy.",
      "code": ""
    },
    {
      "tab": "sports",
      "kind": "news",
      "title": "State Level Table Tennis & Badminton Championships: CKPIPSR Athletes Win Gold",
      "date": "2026-03-12",
      "tag": "State Honors",
      "summary": "CKPIPSR student players earned top podium finishes in Gujarat State Inter-University Table Tennis and Badminton matches.",
      "content": "Student athletes representing CKPIPSR achieved remarkable laurels at the **Gujarat State Collegiate Racket Sports Championship** in Vadodara.\n\n- **Badminton Singles:** Pooja Trivedi (B.Pharm 2nd Year) bagged Gold in Women's Singles without dropping a single set.\n- **Table Tennis Men's Doubles:** Rohan Patel & Jayesh Shah won Gold in a nail-biting 5-set final against MS University team.\n- **National Qualifiers:** Both gold winners have qualified for the All-India Inter-University Games representing VNSGU.",
      "code": ""
    },
    {
      "tab": "sports",
      "kind": "notice",
      "title": "Sports Council Circular: Trials for College Basketball, Volleyball & Football Teams",
      "date": "2026-03-05",
      "tag": "general",
      "summary": "Selection trials for varsity squads entering upcoming inter-collegiate summer league matches.",
      "content": "The Physical Education Department announces open selection trials for male and female students interested in representing the college team in Basketball, Volleyball, and Football.\n\n### Trial Schedule\n- **Volleyball (Men/Women):** March 12, 2026 • 7:30 AM at Campus Sports Ground.\n- **Basketball (Men/Women):** March 13, 2026 • 8:00 AM at Outdoor Basketball Court.\n- **Football (Men):** March 14, 2026 • 7:00 AM at Main Athletic Oval.\n\nCandidates must report in proper sports attire with college ID cards. Contact Coach R. S. Jadeja at the Sports Office for registrations.",
      "code": "N-2026-220"
    },
    {
      "tab": "admission",
      "kind": "notice",
      "title": "Admissions Open for Undergraduate & Postgraduate Programs Academic Year 2026-27",
      "date": "2026-06-01",
      "tag": "academic",
      "summary": "The official gateway is accepting digital registrations for admissions to Bachelor of Pharmacy (B.Pharm), Master of Pharmacy (M.Pharm), and Doctor of Pharmacy (Pharm.D).",
      "content": "Undergraduate and postgraduate application pipelines for academic session 2026-27 are now officially open.\n\n### Admission Phases\n1. **Online Form Filling:** Starts June 1, 2026.\n2. **Draft Merit List Announcement:** June 24, 2026.\n3. **Document Verification & Offline Fees Submission:** June 26 to July 5, 2026.\n\nApply securely on our admissions portal or contact academic counselors at terminal 3.",
      "code": "N-2026-211"
    },
    {
      "tab": "admission",
      "kind": "notice",
      "title": "Detailed Guidelines for Online Admission Registration, Eligibility Criteria and Merit List Schedules",
      "date": "2026-05-25",
      "tag": "academic",
      "summary": "Step-by-step documentation detailing course-wise minimum mark requirements, reservation seats, and admission metrics.",
      "content": "A comprehensive guidebook has been published outlining registration protocols, seat quotas, and reservation eligibility rules.\n\n- **Undergraduate Thresholds:** English & Mathematics standard criteria. Check official prospectus PDFs.\n- **Fee Reimbursements:** Under state government guidelines, EWS scholarship registration is integrated directly inside the main application form.",
      "code": "N-2026-212"
    },
    {
      "tab": "admission",
      "kind": "notice",
      "title": "Scholarship Opportunities and Financial Aid Schemes for Meritorious and EWS Students",
      "date": "2026-05-18",
      "tag": "academic",
      "summary": "A comprehensive financial support program designed to sponsor tuition fees, book stipends, and hostel expenses for deserving candidates.",
      "content": "The university trust announces over ₹50 Lakhs in financial aid pools for meritorious applicants who require financial support.\n\n### Programs Available\n- **Trustees merit award:** 100% tuition waiver for student board toppers scoring above 95% in terminal boards.\n- **EWS Financial Aid Scheme:** Complete scholars cover for materials and hostel boarding charges.",
      "code": "N-2026-213"
    },
    {
      "tab": "student",
      "kind": "notice",
      "title": "Student Council Election 2026 Guidelines, Codes of Conduct, and Nomination Procedures",
      "date": "2026-06-12",
      "tag": "general",
      "summary": "Elected council roles, submission deadlines for candidate campaigns, and rules governing code of ethics on campus grounds.",
      "content": "The collegiate election board has authorized the timeline for student body representative elections.\n\n- **Nomination Date:** June 15 to June 19, 2026.\n- **Campaign Manifestos:** Candidates are directed to review physical poster limits. No digital spam is permitted.\n- **Polling Day:** Online voting on the secure student registry portal on June 29, 2026.",
      "code": "N-2026-214"
    },
    {
      "tab": "student",
      "kind": "notice",
      "title": "Anti-Ragging Committee Guidelines, Internal Complaints Cell, and Student Immediate Helpline Numbers",
      "date": "2026-06-08",
      "tag": "general",
      "summary": "Establishing zero-tolerance safety structures and immediate telephone responders for student body guidelines.",
      "content": "Our institution champions an absolute **zero-tolerance policy** against ragging, harassment, or verbal misconduct.\n\n### Safety Resources\n- **Immediate Call Center:** Dial Toll-free 1800-420-2026 (Active 24/7).\n- **Dean's Help Desk:** Ground Floor, Block B Administration. Confidential reviews guaranteed.",
      "code": "N-2026-215"
    },
    {
      "tab": "student",
      "kind": "notice",
      "title": "Hostel Accommodation Re-allotment Rules / Mess Registration Guidelines for Odd Semesters",
      "date": "2026-05-20",
      "tag": "general",
      "summary": "Information regarding block availability, room choice rules, and food court dining coupons.",
      "content": "All residential students must re-confirm room bookings or apply for mess coupon registrations before June 30, 2026.\n\n- **Quota Allocations:** Senior pupils may select standard twin rooms or individual study suites based on general semester scores.\n- **Sanitary Compliance:** Mandatory medical fitness certificates must stay on record for hostel admission clearings.",
      "code": "N-2026-216"
    }
  ]
};

/**
 * The tabs as a list. A snapshot published before tabs could be added holds
 * them as a record of five fixed ids ({ news: "News Chronicles", ... }); that
 * is read in the order the board always showed them.
 */
function tabsOf(value: unknown): GazetteTab[] | null {
  if (Array.isArray(value)) {
    const ok = value.every((t) => typeof t?.id === "string" && typeof t.label === "string");
    return ok && value.length > 0 ? value : null;
  }
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  return DEFAULT_GAZETTE.tabs.map((t) => ({
    id: t.id,
    label: typeof record[t.id] === "string" && record[t.id] ? (record[t.id] as string) : t.label,
  }));
}

function isUsable(value: unknown): value is GazetteContent {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<GazetteContent>;
  return (
    typeof v.headingLead === "string" &&
    tabsOf(v.tabs) !== null &&
    Array.isArray(v.items) &&
    v.items.every((i) => typeof i?.date === "string" && typeof i.tab === "string")
  );
}

export function useGazetteContent(): GazetteContent {
  const [content, setContent] = useState<GazetteContent>(DEFAULT_GAZETTE);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/home/gazette"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.gazette)) setContent({ ...body.gazette, tabs: tabsOf(body.gazette.tabs)! });
      })
      // The board does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
