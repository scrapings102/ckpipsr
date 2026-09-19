import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLenis } from "../context/LenisContext";
import { useModalScrollLock } from "../hooks/useModalScrollLock";
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import {
  X, Calendar, Clock, Share2, Check, ArrowUpRight, Search,
  MapPin, User, AlertCircle, Newspaper
} from 'lucide-react';

interface NewsItem {
  id: string;
  type: 'news';
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  categoryTag: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  bulletinCategory: 'news' | 'events' | 'sports' | 'admission' | 'student';
}

interface EventItem {
  id: string;
  type: 'event';
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  categoryTag: string;
  location: string;
  speaker: string;
  bulletinCategory: 'news' | 'events' | 'sports' | 'admission' | 'student';
}

interface NoticeItem {
  id: string;
  type: 'notice';
  title: string;
  description: string;
  month?: string;
  day?: string;
  content: string;
  typeTag: 'academic' | 'exam' | 'general';
  critical: boolean;
  code: string;
  date: string;
  bulletinCategory: 'news' | 'events' | 'sports' | 'admission' | 'student';
}

type ArticleUnion = NewsItem | EventItem | NoticeItem;

const ARCHIVE_REGISTRY: ArticleUnion[] = [
  {
    id: "bulletin-news-1",
    type: "notice",
    bulletinCategory: "news",
    date: "2026-06-04",
    month: "Jun",
    day: "04",
    typeTag: "general",
    critical: false,
    code: "N-2026-201",
    title: "Employment Notice – Applications for the Position of Temporary Assistant Professor",
    description: "Applications are invited from eligible candidates for the appointment of Temporary Assistant Professors in various departments for academic session 2026-27.",
    content: `
Applications are invited from qualified and eligible candidates for pure temporary basis appointments as **Temporary Assistant Professors** in the department of Computer Science, Business Management, and Applied Sciences.

### Position Details & Qualifications
- **Remuneration:** Consolidated monthly salary aligned with state education board structures.
- **Minimum Qualification:** Post-graduation in the respective discipline with at least 55% score and NET/SLET/Ph.D. credential.
- **Duration:** 11-month fixed terminal tenure for the Academic Year 2026-27.

Interested candidates are directed to download the syllabus checklist and application forms, compiling all credential certificates for the walk-in interviews scheduled on June 20, 2026.
    `
  },
  {
    id: "bulletin-news-2",
    type: "notice",
    bulletinCategory: "news",
    date: "2026-06-04",
    month: "Jun",
    day: "04",
    typeTag: "general",
    critical: false,
    code: "N-2026-202",
    title: "Employment Notice - Application for the Position Temporary Associate Professor",
    description: "Official notifications regarding openings for Senior Temporary Associate Professors in the Departments of Pharmaceutics, Pharmacognosy, and Pharmacology.",
    content: `
The university administration opens recruitment cycles for **Temporary Associate Professor** positions to lead academic modules and supervisor reviews for the upcoming term.

### Role Scope & Guidelines
- **Department Allocation:** Pharmaceutics, Pharmacology, and Pharmaceutical Chemistry.
- **Essential Experience:** Minimum of 8 years of active teaching, research, or executive industry exposure.
- **Interview Location:** Vice Chancellor Conference Hall, Ground Floor, Academic Block A.

Applicants should upload digital portfolios and submit physical dossiers by June 18, 2026, to the Registrar's Desk.
    `
  },
  {
    id: "bulletin-news-3",
    type: "notice",
    bulletinCategory: "news",
    date: "2026-05-30",
    month: "May",
    day: "30",
    typeTag: "academic",
    critical: false,
    code: "N-2026-203",
    title: "Circular Regarding B. Optometry (Sem 2, 4 & 6), Fourth Year B. Optometry Theory / Practical Winter 2026",
    description: "Detailed timesheet and practical block allocations published for all state optometry examinations.",
    content: `
The Controller of Examinations has officially released the theory and laboratory block rosters for B. Optometry (Semesters 2, 4, 6) alongside Fourth Year B. Optometry Winter 2026 cycles.

### Key Timelines
- **Practical Viva Voce:** Commencing June 22 to June 28, 2026.
- **Written Examinations:** Core theory test days scheduled between 10:00 AM and 1:00 PM starting July 2, 2026.
- **Hall Tickets:** Secured digital admit cards can be extracted via student logins starting June 15.

Candidates are directed to consult with program coordinators for batch timings of experimental lab assessments.
    `
  },
  {
    id: "bulletin-news-4",
    type: "notice",
    bulletinCategory: "news",
    date: "2026-05-30",
    month: "May",
    day: "30",
    typeTag: "academic",
    critical: false,
    code: "N-2026-204",
    title: "Circular Regarding Third MBBS Part-I & MD/MS Examination Forms submission",
    description: "Mandatory timeline and document verification protocols for MBBS & MD/MS postgraduate examination forms.",
    content: `
All academic candidates appearing for the **Third MBBS Part-I & PG MD/MS** examination series must submit their signed registration forms.

### Compliance Schedule
1. **Regular Fee Window:** Forms submission closes on June 12, 2026.
2. **Late Fee Window (With Rs. 500 penalty):** Closes on June 18, 2026.
3. **Internal Approvals:** Verified attendance reports must exceed 75% to receive controller clearances.
    `
  },
  {
    id: "bulletin-news-5",
    type: "notice",
    bulletinCategory: "news",
    date: "2026-05-19",
    month: "May",
    day: "19",
    typeTag: "general",
    critical: true,
    code: "N-2026-205",
    title: "વીર નર્મદ દક્ષિણ ગુજરાત યુનિવર્સિટી વિસ્તારમાં યુનિવર્સિટીની NOC / સંમતિ તથા રાજ્ય સરકારશ્રીની મંજૂરી મેળવ્યા સિવાય",
    description: "અધિકૃત મંજૂરી મેળવ્યા સિવાય કોઈપણ પ્રકારના ઉચ્ચ શિક્ષણ અભ્યાસક્રમો શરૂ કરવા અંગેની કડક ચેતવણી અને જાહેર નોટિસ.",
    content: `
વીર નર્મદ દક્ષિણ ગુજરાત યુનિવર્સિટી (VNSG) સત્તામંડળ દ્વારા તમામ સંસ્થાઓ અને સંચાલકો માટે અતિ અગત્યની જાહેર નોટિસ બહાર પાડવામાં આવી છે.

### અગત્યના નિર્દેશો:
- **NOC ની આવશ્યકતા:** યુનિવર્સિટીના નકશા અને મર્યાદા વિસ્તારમાં કોઈપણ નવી શૈક્ષણિક પ્રવૃત્તિ કે અભ્યાસક્રમ શરૂ કરતા પહેલાં યુનિવર્સિટીની કાયદેસરની સંમતિ (No Objection Certificate) લેવી અનિવાર્ય છે.
- **રાજ્ય સરકારની મંજૂરી:** સક્ષમ સ્તરેથી મેળવેલ મંજૂરી પત્ર વિના શૈક્ષણિક સંસ્થાની સ્થાપના અથવા પ્રવેશ પ્રક્રિયા કરવી કાયદેસર ગુનો બને છે.
- **કાર્યવાહી:** નિયમોનું ઉલ્લંઘન કરનાર કોઈપણ એકમ કે ટ્રસ્ટ સામે યુનિવર્સિટી રજિસ્ટ્રાર દ્વારા કડક કાઉન્સિલ કાર્યવાહી હાથ ધરવામાં આવશે.
    `
  },
  {
    id: "bulletin-news-6",
    type: "notice",
    bulletinCategory: "news",
    date: "2026-05-13",
    month: "May",
    day: "13",
    typeTag: "general",
    critical: false,
    code: "N-2026-206",
    title: "લેબોરેટરી આસિસ્ટન્ટ (બાયોસાયન્સ)ની જગ્યા માટે સ્પર્ધાત્મક પરીક્ષાની રિવાઇઝ્ડ ફાઇનલ આન્સર કી",
    description: "બાયોસાયન્સ વિભાગમાં લેબોરેટરી આસિસ્ટન્ટની ભરતી પરીક્ષાની પરીક્ષિત અને સુધારેલી ફાઇનલ આન્સર કી પ્રસિદ્ધ કરવામાં આવી છે.",
    content: `
બાયોસાયન્સ વિભાગની લેબોરેટરી આસિસ્ટન્ટ જગ્યા માટે યોજાયેલી સ્પર્ધાત્મક પરીક્ષા અંગે સુધારેલ આન્સર કી (Revised Final Answer Key) જાહેર કરવામાં આવી છે.

### કી હાઇલાઇટ્સ અને આંકડા:
- **વાંધા અરજીઓનું નિરાકરણ:** ઉમેદવારો તરફથી મળેલા વાંધાઓની તજજ્ઞ સમિતિ દ્વારા યોગ્ય તપાસ બાદ આ અંતિમ ઉત્તરાવલિ જાહેર કરવામાં આવી છે.
- **પરિણામ પ્રક્રિયા:** આપેલ રિવાઇઝ્ડ આન્સર કીના સ્કોર્સના આધારે જ મુખ્ય મેરિટ યાદી તૈયાર કરવામાં આવશે.
- **ડાઉનલોડ લિંક:** આન્સર કી ડાઉનલોડ કરવા માટે રિક્રૂટમેન્ટ પોર્ટલની મુલાકાત લો અથવા યુનિવર્સિટીના નોટિસ સેક્શનમાંથી સીધી પીડીએફ મેળવો.
    `
  },
  {
    id: "bulletin-news-7",
    type: "notice",
    bulletinCategory: "news",
    date: "2026-04-23",
    month: "Apr",
    day: "23",
    typeTag: "general",
    critical: false,
    code: "N-2026-207",
    title: "NOTICE: Regarding submission of Form-16 instead of Income Tax return of AY 2026-27",
    description: "Important circular for administrative, non-teaching, and academic staff regarding secure salary verification using Form-16 submissions.",
    content: `
To streamline compliance procedures for the assessment year 2026-27, all staff members are requested to consult the current accounting directives for income tax declaration.

### Key Instructions
- **Submission Document:** Employees may submit their official Form-16 issued by the state treasury ledger in lieu of active online draft filings for immediate payroll configurations.
- **Deadline:** Physical signed documents must reach the finance officer on or before June 25, 2026.
    `
  },
  {
    id: "news-1",
    type: "news",
    bulletinCategory: "news",
    date: "2026-02-15",
    title: "Fashion Show of Inferno’26: Celebrating Vogue Mania",
    excerpt: "The grand celebration of style and creativity at Vogue Mania – Fashion Show, organized under Inferno’26, showcasing revolutionary sustainability-centric designs.",
    categoryTag: "Campus Event",
    readTime: "3 min read",
    author: {
      name: "Prof. Smita Sen",
      role: "Cultural Committee Convener",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
    content: `
Vogue Mania, the absolute crown jewel of the annual Inferno'26 cultural showcase, concluded on a high note with breathtaking student runway exhibits. Built from the ground up by student committee directors, the collection focused heavily on zero-waste assembly and handloom textile production.

### Key Highlights of the Show
- **Sustainable Materials:** Real costumes assembled utilizing local Gujarati organic cottons and pure handloom fabrics.
- **Cultural Sync:** Modern styling concepts merged seamlessly with regional block-printing methods.
- **Student Leadership:** Mentored by advisory faculty, but executed entirely by creative student guilds.

An array of acclaimed clothing designers from Surat and Ahmedabad attended as external jury members, giving highest marks for styling cohesion and tailors.
    `
  },
  {
    id: "news-2",
    type: "news",
    bulletinCategory: "news",
    date: "2026-02-14",
    title: "Press Coverage of Shaam Shaandar Sangeet | Featured in City Bhaskar",
    excerpt: "The vibrant cultural pre-event of Inferno’26, \"Shaam Shaandar – Sangeet Night\", organized by the student body, captured the attention of major local newspapers.",
    categoryTag: "Media Release",
    readTime: "2 min read",
    author: {
      name: "Aditya Mehta",
      role: "Student Media Rep",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    content: `
Leading vernacular news publication **Divya Bhaskar** highlighted the exceptional brilliance and student participation at \"Shaam Shaandar\" Sangeet under its *City Bhaskar* edition. 

### Key Points of Newspaper Mention
- **Exceptional Gathering:** An estimated 2,000+ strong crowd including students, alumni, and honorable trustees.
- **Creative Directing:** Highly synchronized musical choreography that bridged classical rhythms with contemporary beats.
- **Regional Applause:** Appreciated by key regional columnists for setting new standards in collegiate event orchestration.
    `
  },
  {
    id: "news-3",
    type: "news",
    bulletinCategory: "news",
    date: "2026-02-10",
    title: "Outstanding Performance in MMS Simulated business challenge",
    excerpt: "Our management students secured top positions and accolades in regional Master of Management Studies (MMS) business simulator challenges.",
    categoryTag: "Achievement",
    readTime: "4 min read",
    author: {
      name: "Dr. K. R. Dave",
      role: "Faculty Coordinator, Business Studies",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    content: `
Our student contingent from the Department of Management won **top honors** at regional business simulator face-offs, competing with over 30 top tier institutes across the state.

### Strategy Elements
- **Resource Mastery:** Highly commended for demonstrating realistic capital allocations under simulated market recessions.
- **Analytical Pitch:** The team proposed an optimization strategy which reduced mock operational expenses by 18%.
- **Academic Pride:** Faculty coordinators noted this highlights the effectiveness of case-based learning.
    `
  },
  {
    id: "bulletin-event-1",
    type: "notice",
    bulletinCategory: "events",
    date: "2026-06-15",
    month: "Jun",
    day: "15",
    typeTag: "academic",
    critical: false,
    code: "N-2026-208",
    title: "Symposium on Sustainable Energy Solutions & Green Building Technology",
    description: "An intensive full-day forum with clean tech executives, research scholars, and architects looking at modern solar panel microgrids.",
    content: `
Join lead researchers at the **Symposium on Sustainable Energy Solutions & Green Building Technology**. 

### Speaker List & Topics
- **Keynote:** Dr. Helen Carter (National Green Tech Foundation) discussing resilient metropolitan battery arrays.
- **Panel Discussion:** Implementation of zero-emission materials inside campus architectures.
- **Time/Venue:** June 28, 2026 • 10:00 AM • Main Seminar Hall C.
    `
  },
  {
    id: "bulletin-event-2",
    type: "notice",
    bulletinCategory: "events",
    date: "2026-06-10",
    month: "Jun",
    day: "10",
    typeTag: "academic",
    critical: false,
    code: "N-2026-209",
    title: "Academic Seminar: New Horizons in Material Science & Polymer Chemistry",
    description: "Exploring biodegradable composite sheets and nano-scale molecular bonds for aerospace structures.",
    content: `
Our postgraduate chemistry department invites faculty and research fellows to a premier academic seminar on polymer composites.

- **Objective:** Discussion on commercial licensing of academic material discoveries.
- **Featured Presenter:** Prof. Amit Varma (IIT Bombay Emeritus Professor).
- **Registration:** Limited to 150 scholars. Check-in commences at 9:30 AM on July 5, 2026.
    `
  },
  {
    id: "bulletin-event-3",
    type: "notice",
    bulletinCategory: "events",
    date: "2026-06-02",
    month: "Jun",
    day: "02",
    typeTag: "academic",
    critical: false,
    code: "N-2026-210",
    title: "Industrial Expert Talk – Advancements in Cloud Infrastructure & Cyber Security",
    description: "Veteran architects analyze modern container orchestration, Kubernetes ingress isolation, and edge-computing defense systems.",
    content: `
A high-level systems lecture detailing industry-best server operations. Recommended for Computer Science and IT scholars.

- **Topic:** Distributed databases, container scaling under peak traffic loads, and real-time security scanning.
- **Speaker:** Mr. Rajesh Deshpande (DevOps Director, TechScale Global).
    `
  },
  {
    id: "event-1",
    type: "event",
    bulletinCategory: "events",
    date: "2026-04-25",
    title: "Expert Talk on Career Pathways for IT Graduates",
    excerpt: "Our college organized an informative guest session guiding young IT aspirants on industry-oriented toolchains, software engineering, and industry pathways.",
    categoryTag: "Expert Talk",
    location: "Main Auditorium, Sem-Hall A",
    speaker: "Rohan Shah (Senior Engineering Lead)",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
    content: `
This guest expert talk brought direct enterprise computing knowledge onto campus. Undergraduates interacted to understand market demands, modern developer stacks, and key preparation strategies.

- **Technology Focus:** Enterprise system scaling, clean code best practices, API integrations, and cloud architectures.
- **Interactive Q&A Session:** Over 250 students attended, holding deep discussions about building impressive developer resumes and selecting capstones.
- **Resources Distributed:** Shared study material and a pathway to professional internships.
    `
  },
  {
    id: "event-2",
    type: "event",
    bulletinCategory: "events",
    date: "2026-04-24",
    title: "Lakshya 2.0: Strategic Leadership on Modern Startups",
    excerpt: "The IQAC cell hosted 'Lakshya 2.0', a strategic campus-wide leadership seminar focusing on young entrepreneurship and small enterprise planning.",
    categoryTag: "Seminar",
    location: "Executive Seminar Block-B",
    speaker: "Dr. Arvinder Singh (Consultant)",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    content: `
Lakshya 2.0 acted as a premier node for student entrepreneurs. The masterclass challenged traditional management paradigms, guiding scholars on real strategy formulation.

- **Interactive Core:** Live simulation exercises where student teams drafted competitive business structures.
- **Strategic Briefing:** Dr. Singh focused heavily on team dynamics, clear communications, and milestone mapping.
- **Takeaway Guidelines:** Attendees received diagnostic tools for evaluating market-fit vectors.
    `
  },
  {
    id: "event-3",
    type: "event",
    bulletinCategory: "events",
    date: "2026-04-05",
    title: "SSIP Hackathon 2026: Sustainable Municipal Innovations",
    excerpt: "Student innovators designed clever local logistics networks and waste disposal management prototypes in a continuous 24-hour developer challenge.",
    categoryTag: "SSIP Hackathon",
    location: "Main Labs, Block-C",
    speaker: "Gujarat Incubation Cell Board",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
    content: `
An intense, 24-hour hackathon executed under the Student Start-up and Innovation Policy (SSIP) guidelines, targeting acute regional metropolitan challenges.

- **Primary Pillars:** Smart traffic flow algorithms, solid waste management systems, and water quality validation.
- **Feedback Loop:** Tech mentors sat side-by-side with young programmers to validate cloud architectures and telemetry models.
- **Outstanding Concept:** Winner certificates went to the computerized grievance-dispatch system mockup for urban municipal wards.
    `
  },
  {
    id: "sports-1",
    type: "news",
    bulletinCategory: "sports",
    date: "2026-03-28",
    title: "CKPIPSR Annual Khel Mahotsav & Athletics Championship 2026 Concludes with Triumph",
    excerpt: "Over 800 student athletes competed in track events, volleyball, badminton, and martial arts during the 3-day annual collegiate sports festival.",
    categoryTag: "Athletics",
    readTime: "3 min read",
    author: {
      name: "Coach R. S. Jadeja",
      role: "Sports Director & Physical Educator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
    content: `
The **CKPIPSR Annual Khel Mahotsav 2026** brought together student athletes across B.Pharm, M.Pharm, and Pharm.D departments in a display of sportsmanship and high energy.

### Championship Highlights
- **Individual Champions:** Outstanding Player trophy awarded to B.Pharm final-year sprinter Vivek Patel (Gold in 100m, 200m & Long Jump).
- **Overall Department Shield:** Department of Pharmaceutics (M.Pharm) clinched the overall team trophy with 14 podium finishes.
- **Women's Powerhouse:** B.Pharm female athletics contingent dominated relay and table tennis categories.

Trustees and faculty directors commended the sports council for immaculate event execution and disciplined play throughout the tournament.
    `
  },
  {
    id: "sports-2",
    type: "news",
    bulletinCategory: "sports",
    date: "2026-03-20",
    title: "VNSGU Inter-College Cricket Tournament: CKPIPSR Team Lifts Champions Trophy",
    excerpt: "In a thrilling final match against City Pharmacy College, CKPIPSR cricket XI secured victory by 34 runs to claim the South Gujarat university cup.",
    categoryTag: "Cricket Victory",
    readTime: "3 min read",
    author: {
      name: "Deepak Sharma",
      role: "College Cricket Captain",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop",
    content: `
Our college cricket squad delivered an all-round masterclass performance in the **VNSGU Inter-College Cricket Championship Final** held at the Lalbhai Contractor Stadium, Surat.

### Match Summary
- **Batting Brilliance:** Opener Harshil Shah scored an unbeaten 82 off 54 balls, setting a competitive total of 178/5.
- **Bowling Precision:** Off-spinner Rahul Varma took 4 wickets for 18 runs in his 4-over spell.
- **University Honors:** The team was felicitated by VNSGU Sports Board officials with gold medals and a rotating winner trophy.
    `
  },
  {
    id: "sports-3",
    type: "news",
    bulletinCategory: "sports",
    date: "2026-03-12",
    title: "State Level Table Tennis & Badminton Championships: CKPIPSR Athletes Win Gold",
    excerpt: "CKPIPSR student players earned top podium finishes in Gujarat State Inter-University Table Tennis and Badminton matches.",
    categoryTag: "State Honors",
    readTime: "2 min read",
    author: {
      name: "Prof. Ananya Roy",
      role: "Sports Advisory Committee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?q=80&w=800&auto=format&fit=crop",
    content: `
Student athletes representing CKPIPSR achieved remarkable laurels at the **Gujarat State Collegiate Racket Sports Championship** in Vadodara.

- **Badminton Singles:** Pooja Trivedi (B.Pharm 2nd Year) bagged Gold in Women's Singles without dropping a single set.
- **Table Tennis Men's Doubles:** Rohan Patel & Jayesh Shah won Gold in a nail-biting 5-set final against MS University team.
- **National Qualifiers:** Both gold winners have qualified for the All-India Inter-University Games representing VNSGU.
    `
  },
  {
    id: "sports-4",
    type: "notice",
    bulletinCategory: "sports",
    date: "2026-03-05",
    month: "Mar",
    day: "05",
    typeTag: "general",
    critical: false,
    code: "N-2026-220",
    title: "Sports Council Circular: Trials for College Basketball, Volleyball & Football Teams",
    description: "Selection trials for varsity squads entering upcoming inter-collegiate summer league matches.",
    content: `
The Physical Education Department announces open selection trials for male and female students interested in representing the college team in Basketball, Volleyball, and Football.

### Trial Schedule
- **Volleyball (Men/Women):** March 12, 2026 • 7:30 AM at Campus Sports Ground.
- **Basketball (Men/Women):** March 13, 2026 • 8:00 AM at Outdoor Basketball Court.
- **Football (Men):** March 14, 2026 • 7:00 AM at Main Athletic Oval.

Candidates must report in proper sports attire with college ID cards. Contact Coach R. S. Jadeja at the Sports Office for registrations.
    `
  },
  {
    id: "bulletin-adm-1",
    type: "notice",
    bulletinCategory: "admission",
    date: "2026-06-01",
    month: "Jun",
    day: "01",
    typeTag: "academic",
    critical: true,
    code: "N-2026-211",
    title: "Admissions Open for Undergraduate & Postgraduate Programs Academic Year 2026-27",
    description: "The official gateway is accepting digital registrations for admissions to Bachelor of Pharmacy (B.Pharm), Master of Pharmacy (M.Pharm), and Doctor of Pharmacy (Pharm.D).",
    content: `
Undergraduate and postgraduate application pipelines for academic session 2026-27 are now officially open.

### Admission Phases
1. **Online Form Filling:** Starts June 1, 2026.
2. **Draft Merit List Announcement:** June 24, 2026.
3. **Document Verification & Offline Fees Submission:** June 26 to July 5, 2026.

Apply securely on our admissions portal or contact academic counselors at terminal 3.
    `
  },
  {
    id: "bulletin-adm-2",
    type: "notice",
    bulletinCategory: "admission",
    date: "2026-05-25",
    month: "May",
    day: "25",
    typeTag: "academic",
    critical: false,
    code: "N-2026-212",
    title: "Detailed Guidelines for Online Admission Registration, Eligibility Criteria and Merit List Schedules",
    description: "Step-by-step documentation detailing course-wise minimum mark requirements, reservation seats, and admission metrics.",
    content: `
A comprehensive guidebook has been published outlining registration protocols, seat quotas, and reservation eligibility rules.

- **Undergraduate Thresholds:** English & Mathematics standard criteria. Check official prospectus PDFs.
- **Fee Reimbursements:** Under state government guidelines, EWS scholarship registration is integrated directly inside the main application form.
    `
  },
  {
    id: "bulletin-adm-3",
    type: "notice",
    bulletinCategory: "admission",
    date: "2026-05-18",
    month: "May",
    day: "18",
    typeTag: "academic",
    critical: false,
    code: "N-2026-213",
    title: "Scholarship Opportunities and Financial Aid Schemes for Meritorious and EWS Students",
    description: "A comprehensive financial support program designed to sponsor tuition fees, book stipends, and hostel expenses for deserving candidates.",
    content: `
The university trust announces over ₹50 Lakhs in financial aid pools for meritorious applicants who require financial support.

### Programs Available
- **Trustees merit award:** 100% tuition waiver for student board toppers scoring above 95% in terminal boards.
- **EWS Financial Aid Scheme:** Complete scholars cover for materials and hostel boarding charges.
    `
  },
  {
    id: "bulletin-std-1",
    type: "notice",
    bulletinCategory: "student",
    date: "2026-06-12",
    month: "Jun",
    day: "12",
    typeTag: "general",
    critical: false,
    code: "N-2026-214",
    title: "Student Council Election 2026 Guidelines, Codes of Conduct, and Nomination Procedures",
    description: "Elected council roles, submission deadlines for candidate campaigns, and rules governing code of ethics on campus grounds.",
    content: `
The collegiate election board has authorized the timeline for student body representative elections.

- **Nomination Date:** June 15 to June 19, 2026.
- **Campaign Manifestos:** Candidates are directed to review physical poster limits. No digital spam is permitted.
- **Polling Day:** Online voting on the secure student registry portal on June 29, 2026.
    `
  },
  {
    id: "bulletin-std-2",
    type: "notice",
    bulletinCategory: "student",
    date: "2026-06-08",
    month: "Jun",
    day: "08",
    typeTag: "general",
    critical: false,
    code: "N-2026-215",
    title: "Anti-Ragging Committee Guidelines, Internal Complaints Cell, and Student Immediate Helpline Numbers",
    description: "Establishing zero-tolerance safety structures and immediate telephone responders for student body guidelines.",
    content: `
Our institution champions an absolute **zero-tolerance policy** against ragging, harassment, or verbal misconduct.

### Safety Resources
- **Immediate Call Center:** Dial Toll-free 1800-420-2026 (Active 24/7).
- **Dean's Help Desk:** Ground Floor, Block B Administration. Confidential reviews guaranteed.
    `
  },
  {
    id: "bulletin-std-3",
    type: "notice",
    bulletinCategory: "student",
    date: "2026-05-20",
    month: "May",
    day: "20",
    typeTag: "general",
    critical: false,
    code: "N-2026-216",
    title: "Hostel Accommodation Re-allotment Rules / Mess Registration Guidelines for Odd Semesters",
    description: "Information regarding block availability, room choice rules, and food court dining coupons.",
    content: `
All residential students must re-confirm room bookings or apply for mess coupon registrations before June 30, 2026.

- **Quota Allocations:** Senior pupils may select standard twin rooms or individual study suites based on general semester scores.
- **Sanitary Compliance:** Mandatory medical fitness certificates must stay on record for hostel admission clearings.
    `
  }
];

export default function NewsBlogs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          yPercent: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (headerRef.current) {
        gsap.to(headerRef.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  const [selectedItem, setSelectedItem] = useState<ArticleUnion | null>(null);
  useModalScrollLock(selectedItem !== null);

  useEffect(() => {
    const handleClose = () => setSelectedItem(null);
    window.addEventListener('closeAllModals', handleClose);
    return () => window.removeEventListener('closeAllModals', handleClose);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bulletinTab, setBulletinTab] = useState<'news' | 'events' | 'sports' | 'admission' | 'student'>('news');

  const listContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Filter items based on active tab and search query
  const filteredItems = useMemo(() => {
    return ARCHIVE_REGISTRY.filter((item) => {
      // Check active bulletin category
      if (item.bulletinCategory !== bulletinTab) return false;

      // If no query, return true
      if (searchQuery.trim() === '') return true;

      const query = searchQuery.toLowerCase();
      const titleMatches = item.title.toLowerCase().includes(query);
      const descMatches = (item.type === 'notice' ? item.description : item.excerpt).toLowerCase().includes(query);
      const categoryMatches = (item.type === 'notice' ? item.typeTag : item.categoryTag).toLowerCase().includes(query);

      return titleMatches || descMatches || categoryMatches;
    });
  }, [bulletinTab, searchQuery]);

  const displayItems = useMemo(() => {
    if (filteredItems.length === 0) return [];
    // Repeat items 4 times to guarantee a seamless infinite scrolling buffer
    return [...filteredItems, ...filteredItems, ...filteredItems, ...filteredItems];
  }, [filteredItems]);

  useEffect(() => {
    const container = listContainerRef.current;
    if (!container || filteredItems.length === 0) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 32; // pixels per second smooth continuous auto-scroll

    const animateScroll = (time: number) => {
      if (!isHovered && listContainerRef.current) {
        const rawDelta = (time - lastTime) / 1000;
        const delta = Math.min(Math.max(rawDelta, 0), 0.1);
        const el = listContainerRef.current;

        const singleSetHeight = el.scrollHeight / 4;
        el.scrollTop += speed * delta;

        // Seamless loop rollover without visual jump or glitch
        if (el.scrollTop >= singleSetHeight * 2) {
          el.scrollTop -= singleSetHeight;
        }
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, filteredItems]); // depend on items to reset height when tab changes

  const handleShare = (item: ArticleUnion, e: React.MouseEvent) => {
    e.stopPropagation();
    const mockUrl = `${window.location.origin}#view-${item.id}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(mockUrl).catch(() => { });
    }
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to parse dates like "2026-06-18" to a nice 3-letter month
  const getMonthLabel = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const monthNum = parseInt(parts[1], 10);
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        if (monthNum >= 1 && monthNum <= 12) {
          return months[monthNum - 1];
        }
      }
    } catch (e) { }
    return 'JUN';
  };

  // Helper to get raw day string "18"
  const getDayLabel = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return parts[2];
      }
    } catch (e) { }
    return '18';
  };

  return (
    <section
      ref={containerRef}
      id="university-gazette"
      className="py-16 sm:py-20 bg-[#FAF8F5] text-[#3B3131] font-sans antialiased border-t border-slate-200/60 relative overflow-hidden"
    >
      {/* Editorial Watermark Background */}
      <div
        ref={bgTextRef}
        className="absolute right-0 top-32 text-[14rem] font-bold text-slate-100/10 leading-none select-none pointer-events-none font-sans tracking-tighter uppercase hidden xl:block"
      >
        GAZETTE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Title Block - Perfectly Centered & Compact */}
        <div
          ref={headerRef}
          className="flex flex-col items-center justify-center text-center pb-6 border-b border-slate-200/60 mb-10 w-full"
        >
          <div className="flex items-center gap-1.5 select-none mb-2">
            <span className="font-mono text-[9px] tracking-wider text-[#3B3131] font-bold uppercase">
              ✦ Chronicles &amp; Declarations
            </span>
            <span className="h-[1px] w-6 bg-[#3B3131]/20" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#3B3131] leading-tight uppercase font-sans">
            University <span className="text-[#123a1a]">Gazette Portal</span>
          </h2>
          <p className="font-sans text-slate-500 font-medium text-xs sm:text-sm leading-relaxed max-w-2xl pt-1">
            Stay informed with premium notices, official announcements, schedules, and circulars certified by VNSGU boards.
          </p>
        </div>

        {/* MODERN MINIMALIST NAV DECK - SYMMETRIC, MOOD FIRST, AND COMPACT */}
        <div className="flex flex-col items-center justify-center gap-6 mb-8 select-none w-full text-center">
          <div className="flex items-center justify-start md:justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 max-w-5xl border-b border-slate-200/50 pb-3 w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-2 sm:px-4">
            {[
              { id: 'news', label: 'News Chronicles' },
              { id: 'events', label: 'Events & Seminars' },
              { id: 'sports', label: 'Sports News' },
              { id: 'admission', label: 'Admission Hub' },
              { id: 'student', label: 'Student Directives' }
            ].map((tab) => {
              const isActive = bulletinTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setBulletinTab(tab.id as any);
                  }}
                  className="relative py-2 px-1 sm:px-2 text-[11px] sm:text-xs md:text-sm font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span className={isActive ? 'text-[#1e293b] font-bold' : 'text-slate-500 hover:text-slate-800'}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2563eb]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Bar - matching exact design in uploaded image */}
          <div className="w-full max-w-xl px-2">
            <div className="relative flex items-center">
              <Search
                size={17}
                className="absolute left-4 text-slate-400 pointer-events-none stroke-[1.75]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news, announcements, circulars..."
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* DYNAMIC PRESENTATION INTERFACES - CENTERED NEWS BULLETINS CONTAINER */}
        <div className="max-w-4xl mx-auto w-full flex flex-col justify-between">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center bg-white border border-slate-100 rounded-3xl shadow-xs px-4">
              <Newspaper className="mx-auto text-slate-300 mb-4 animate-bounce" size={40} />
              <p className="font-sans text-[#3B3131] text-xs font-bold uppercase tracking-widest">
                {searchQuery ? `No articles matching "${searchQuery}"` : 'No articles matching your filters.'}
              </p>
              <p className="font-sans text-slate-400 text-[11px] mt-1">
                {searchQuery ? 'Try clearing your search query or switching categories.' : 'Try selecting a different tab.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={13} />
                  <span>Clear Search</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">

              {/* Discrete Feed Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 select-none">
                <span className="font-mono text-[9px] text-[#3B3131] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#123a1a]" />
                  Gazette Bulletins [{filteredItems.length}]
                </span>
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                  Chronological Release
                </span>
              </div>

              {/* Minimal List Stack inside Elevator Container */}
              <div
                data-lenis-prevent="true"
                className="relative h-[380px] overflow-y-auto no-scrollbar pr-2 space-y-3"
                ref={listContainerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
              >
                {displayItems.map((item, index) => {
                  const originalIndex = (index % filteredItems.length) + 1;
                  const itemIndex = String(originalIndex).padStart(2, '0');

                  return (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10px" }}
                      onClick={() => setSelectedItem(item)}
                      className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-5 sm:px-8 bg-white hover:bg-slate-50/50 border border-slate-100 hover:border-slate-200/80 rounded-2xl transition-all duration-300 cursor-pointer text-left overflow-hidden shadow-xs hover:shadow-sm mx-1 mt-1"
                    >
                      {/* Interactive visual line on left margin */}
                      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#123a1a] scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-300" />

                      <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                        {/* Elite minimalist serial indicator */}
                        <span className="hidden sm:inline font-mono text-[10px] font-bold text-slate-300 group-hover:text-[#3B3131]/65 transition-colors">
                          {itemIndex}
                        </span>

                        {/* High-end design focused date display */}
                        <div className="flex flex-col text-left shrink-0 select-none min-w-[75px] pt-0.5 sm:pt-0">
                          <span className="font-mono text-[9.5px] uppercase font-bold text-[#3B3131] tracking-wider">
                            {getMonthLabel(item.date)}
                          </span>
                          <span className="font-sans text-base font-bold text-[#3B3131] leading-none mt-0.5">
                            {getDayLabel(item.date)}
                          </span>
                          <span className="font-mono text-[9px] text-slate-400 leading-none mt-1">
                            {item.date.split('-')[0]}
                          </span>
                        </div>

                        {/* Premium custom vertical border divide */}
                        <div className="h-10 w-[1.5px] bg-slate-100 shrink-0 hidden sm:block" />

                        {/* Title and Excerpt Core content */}
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 select-none">
                            <span className={`inline-block font-mono text-[7.5px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md border ${item.type === 'notice' && item.critical
                              ? 'bg-rose-50 text-rose-600 border-rose-100/60 animate-pulse'
                              : 'bg-slate-50 text-slate-500 border-slate-200/40'
                              }`}>
                              {item.type === 'notice' ? item.typeTag : (item as any).categoryTag || 'news'}
                            </span>
                            {item.type === 'notice' && (
                              <span className="font-mono text-[8px] text-slate-400 font-medium tracking-wider">
                                {item.code}
                              </span>
                            )}
                          </div>

                          <h4 className="font-sans text-[13px] sm:text-[14.5px] font-bold text-[#3B3131] leading-snug tracking-tight group-hover:text-[#123a1a] transition-colors uppercase line-clamp-1">
                            {item.title}
                          </h4>

                          <p className="font-sans text-[11px] sm:text-[11.5px] text-slate-400 font-medium leading-relaxed line-clamp-1">
                            {item.type === 'notice' ? item.description : (item as any).excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Quiet interaction state trigger on the right */}
                      <div className="flex items-center gap-3 shrink-0 z-10">
                        {/* Copy Link Action Button - small, nice and hidden slightly on desktop unless hovered */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleShare(item, e); }}
                          className="p-1 px-2 text-[10px] bg-slate-50 hover:bg-emerald-50 border border-slate-150 rounded text-slate-400 hover:text-[#123a1a] transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer flex items-center gap-1 shrink-0 font-mono"
                          title="Copy Link"
                        >
                          {copiedId === item.id ? <Check size={10} className="text-emerald-600 font-bold" /> : <Share2 size={10} />}
                          <span className="text-[9px] uppercase font-bold tracking-tight">{copiedId === item.id ? 'Copied' : 'Share'}</span>
                        </button>

                        {/* Hover visual cue circle */}
                        <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#3B3131] group-hover:border-[#3B3131] group-hover:text-white transition-all duration-300">
                          <ArrowUpRight size={11} className="group-hover:translate-x-[0.5px] group-hover:-translate-y-[0.5px] transition-transform duration-300" />
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ==========================================================
          THE LUXUS NO-AI EDITORIAL MODAL (PREMIUM READING SHEET)
          ========================================================== */}
      <AnimatePresence>
        {selectedItem && (
          <div data-lenis-prevent="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-20 sm:pb-24">

            {/* Glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#3B3131]/80 backdrop-blur-md cursor-pointer"
            />

            {/* Reading sheet paper overlay */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="bg-white border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative z-20 text-left rounded-3xl"
            >
              {/* Close floating bubble */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-40 w-10 h-10 rounded-xl bg-white hover:bg-slate-50 transition flex items-center justify-center border border-slate-200 text-slate-700 hover:scale-105 shadow-sm cursor-pointer"
                aria-label="Close panel"
              >
                <X size={16} />
              </button>

              <div data-lenis-prevent="true" className="overflow-y-auto flex-1 no-scrollbar">

                {/* Stunning Premium Hero Image (When clicked/inside) */}
                {('image' in selectedItem || selectedItem.type === 'notice') && (
                  <div className="w-full h-52 sm:h-64 relative overflow-hidden select-none bg-slate-100">
                    <img
                      src={'image' in selectedItem ? (selectedItem as any).image : "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

                    <div className="absolute bottom-4 left-6 sm:left-10 z-10 text-left">
                      <span className="font-mono text-[9px] font-bold tracking-widest text-[#3B3131] bg-amber-400 px-3 py-1.5 rounded uppercase border border-amber-500/20 shadow-lg">
                        {'categoryTag' in selectedItem ? (selectedItem as any).categoryTag : 'Official Notice Publication'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Refined Academic Gazette Header */}
                <div className="bg-gradient-to-br from-[#3B3131]/5 to-[#3B3131]/10 p-8 sm:p-10 border-b border-slate-200 relative">
                  <div className="flex flex-wrap items-center gap-2 mb-3 select-none text-[10px] font-sans font-bold tracking-widest">
                    <span className="bg-[#3B3131] text-amber-400 px-3 py-1.5 rounded uppercase inline-block font-sans font-bold">
                      {'categoryTag' in selectedItem ? (selectedItem as any).categoryTag : 'Official Notice'}
                    </span>
                    <span className="text-[#3B3131] uppercase font-mono font-bold">
                      {'code' in selectedItem ? `• Code: ${(selectedItem as any).code}` : '• Gazette Archive'}
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3.5xl font-bold text-[#3B3131] leading-tight tracking-tight uppercase">
                    {selectedItem.title}
                  </h3>
                </div>

                {/* Content block */}
                <div className="p-8 sm:p-12 flex flex-col gap-6 font-sans">

                  {/* Alert panel for critical circular notices */}
                  {selectedItem.type === 'notice' && (
                    <div className="bg-amber-50/70 border-l-4 border-amber-500 p-5 rounded-r-2xl space-y-1">
                      <div className="flex items-center gap-2 font-sans text-[11px] font-bold text-amber-800 select-none">
                        <AlertCircle size={14} className="text-amber-500" />
                        <span>VERIFIED BOARD COVENANT DIRECTIVE</span>
                      </div>
                      <p className="leading-relaxed font-sans text-slate-600 text-[12px] sm:text-[13px] font-medium">
                        This administrative circular serves as signed authentication regarding board schedules, enrollment listings, criteria checks, and general student frameworks.
                      </p>
                    </div>
                  )}

                  {/* Document date metadata block */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 text-[11px] text-slate-400">
                    <div className="flex items-center gap-5">
                      <span className="flex items-center gap-1.5 font-sans font-bold text-slate-700">
                        <Calendar size={14} className="text-amber-500" />
                        {selectedItem.date}
                      </span>
                      <span className="flex items-center gap-1.5 font-sans font-medium">
                        <Clock size={14} />
                        Authorized Publication
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleShare(selectedItem, e)}
                      className="text-[10px] font-sans font-bold text-[#3B3131] hover:text-[#3B3131] flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      {copiedId === selectedItem.id ? (
                        <>
                          <Check size={12} className="text-emerald-600" />
                          <span>Copied Link</span>
                        </>
                      ) : (
                        <>
                          <Share2 size={12} />
                          <span>Share Document</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* HTML formatted body text */}
                  <div className="text-slate-700 font-sans leading-relaxed text-sm sm:text-base space-y-6 antialiased font-normal">
                    {selectedItem.content ? (
                      selectedItem.content.trim().split('\n\n').map((paragraph, idx) => {
                        const str = paragraph.trim();
                        if (!str) return null;

                        if (str.startsWith('## ')) {
                          return (
                            <h4 key={idx} className="font-sans text-lg sm:text-xl font-bold text-[#3B3131] border-b border-slate-100 pb-2.5 pt-4 tracking-tight uppercase">
                              {str.replace('## ', '')}
                            </h4>
                          );
                        }
                        if (str.startsWith('### ')) {
                          return (
                            <h5 key={idx} className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400 pt-3 select-none">
                              {str.replace('### ', '')}
                            </h5>
                          );
                        }
                        if (str.startsWith('- ')) {
                          return (
                            <ul key={idx} className="list-disc pl-5 space-y-2.5 font-sans text-xs sm:text-[13.5px] my-4 text-slate-600 leading-relaxed font-semibold">
                              {str.split('\n').map((li, lIdx) => (
                                <li key={lIdx} className="text-slate-600">
                                  {li.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
                                </li>
                              ))}
                            </ul>
                          );
                        }

                        {/* First letter drop-cap for official documents */ }
                        return (
                          <p key={idx} className="text-slate-600 font-sans leading-relaxed text-[13.5px] sm:text-[15px] tracking-wide">
                            {idx === 0 && !('image' in selectedItem) ? (
                              <>
                                <span className="float-left text-5xl font-sans font-bold text-[#3B3131] mr-2.5 mt-1 leading-none select-none">
                                  {str.charAt(0)}
                                </span>
                                {str.slice(1).split(/\*\*(.*?)\*\*/g).map((part, pIdx) => {
                                  if (pIdx % 2 === 1) {
                                    return <strong key={pIdx} className="font-bold text-slate-800">{part}</strong>;
                                  }
                                  return part;
                                })}
                              </>
                            ) : (
                              str.split(/\*\*(.*?)\*\*/g).map((part, pIdx) => {
                                if (pIdx % 2 === 1) {
                                  return <strong key={pIdx} className="font-bold text-slate-800">{part}</strong>;
                                }
                                return part;
                              })
                            )}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
                        {selectedItem.type === 'notice'
                          ? (selectedItem as NoticeItem).description
                          : (selectedItem as NewsItem | EventItem).excerpt}
                      </p>
                    )}
                  </div>

                  {/* Speaker and location metadata (Events only) */}
                  {selectedItem.type === 'event' && (
                    <div className="bg-[#FAF9F5] p-6 border border-slate-200/60 rounded-2xl mt-5 select-none">
                      <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest block mb-3 px-0.5">
                        Venue &amp; Speaker Briefing
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
                        <div>
                          <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider">Distinguished Keynote Speaker</p>
                          <p className="font-sans font-bold text-[#3B3131] text-sm mt-1">{(selectedItem as EventItem).speaker}</p>
                        </div>
                        <div>
                          <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider">Official Venue</p>
                          <p className="font-sans font-bold text-[#3B3131] text-sm mt-1">{(selectedItem as EventItem).location}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Author detail block (News only) */}
                  {selectedItem.type === 'news' && (selectedItem as NewsItem).author && (
                    <div className="bg-[#FAF8F5] p-5 border border-slate-200 flex items-center justify-between gap-4 rounded-2xl mt-5 select-none animate-fade-in">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-[#3B3131]/10 text-[#3B3131] border border-[#3B3131]/15 flex items-center justify-center font-sans text-xs font-bold uppercase">
                          {(selectedItem as NewsItem).author.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="text-left font-sans">
                          <h5 className="text-[13px] font-bold text-slate-700">
                            {(selectedItem as NewsItem).author.name}
                          </h5>
                          <span className="text-[10px] text-slate-450 leading-none inline-block font-sans">
                            {(selectedItem as NewsItem).author.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] text-[#3B3131] font-sans font-bold tracking-widest bg-white border border-slate-200 shadow-xs px-3 py-1.5 rounded uppercase">
                        Press Division
                      </span>
                    </div>
                  )}

                </div>

              </div>

              {/* Seal details footer */}
              <div className="bg-[#FAF9F5] border-t border-slate-200 px-8 py-5 flex items-center justify-between text-[9.5px] font-mono text-slate-400 uppercase tracking-widest select-none">
                <span>RECORDS ARCHIVES DIVISION // VNSGU</span>
                <span>AUTHENTIC INSTITUTIONAL CHRONICLE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
