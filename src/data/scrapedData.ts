import { cdn } from '../utils/image';

export interface StaffMember {
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  area_of_interest?: string;
  email: string;
  image_url: string;
  isTeaching?: boolean;
}

export interface CommitteeMember {
  role?: string;
  committee_role?: string;
  name: string;
  designation?: string;
  contact?: string;
}

export interface AchievementItem {
  title: string;
  image_url: string;
  date: string;
  description: string;
  students: string;
  hashtags: string;
}

export interface EventItem {
  title: string;
  image_url: string;
  date: string;
  venue_description: string;
  coordinators: string;
  document_link?: string;
}

export interface NewsItem {
  title: string;
  description: string;
  link: string;
  icon_image?: string;
}

// Teaching faculty, from the college's "LIST OF FACULTIES" document.
//
// Photographs live in public/images/faculty/. All sixteen have one.
//
// Only six email addresses were supplied. The rest are empty, and the card
// hides its Contact button when there is no address rather than rendering a
// dead mailto link. Fill these in as they are provided.

// Teaching faculty.
//
// The college supplied two documents: "LIST OF FACULTIES" (16 people, with
// designation, qualification and experience) and "PHOTO LIST OF FACULTIES"
// (20 people, names and photo codes only), overlapping by 9 — 26 distinct
// people once Mrs. Prakruti P. Gotawala's duplicate entry (listed as
// "Prakruti K. Jadav" in the older document) is merged.
//
// 16 entries are complete. The other 10 came only from the photo list and have
// no designation, qualification or experience on record; those fields are
// empty and the card omits them rather than showing placeholder text.
//
// Only six email addresses were supplied. The card hides its Contact button
// when there is no address rather than rendering a dead mailto link.

const _STAFF_MEMBERS: StaffMember[] = [
  {
    name: "Dr. Dhiren P. Shah",
    designation: "Professor And Principal, Pharmaceutics",
    qualification: "M.PHARM, MBA, PGDIPR, Ph.D.",
    experience: "22 YEARS 06 MONTHS",
    email: "dhiren.shah@ckpipsr.ac.in",
    image_url: "/images/faculty/dhiren-p-shah.jpg",
    isTeaching: true
  },
  {
    name: "Dr. Bhumika C. Desai",
    designation: "Associate Professor, Pharmaceutics",
    qualification: "M.PHARM, Ph.D.",
    experience: "15 YEARS 08 MONTHS",
    email: "bhumika.desai@ckpipsr.ac.in",
    image_url: "/images/faculty/bhumika-c-desai.jpg",
    isTeaching: true
  },
  {
    name: "Dr. Vinodkumar D. Ramani",
    designation: "Associate Professor, Pharmaceutics",
    qualification: "M.PHARM, Ph.D.",
    experience: "10 YEARS 09 MONTHS",
    email: "vinod.ramani@ckpipsr.ac.in",
    image_url: "/images/faculty/vinod-d-ramani.jpg",
    isTeaching: true
  },
  {
    name: "Mr. Moolla Yahya Ali",
    designation: "Assistant Professor, Pharmaceutics",
    qualification: "M. PHARM, Ph.D. (Pursuing)",
    experience: "06 YEARS 01 MONTHS",
    email: "yahya.moolla@ckpipsr.ac.in",
    image_url: "/images/faculty/yahya-ali-moolla.jpg",
    isTeaching: true
  },
  {
    name: "Mr. Dipayan Tarafder",
    designation: "Assistant Professor, Pharmacology",
    qualification: "M. PHARM, Ph.D. (Pursuing)",
    experience: "13 YEARS 08 MONTHS",
    email: "dipayan.tarafder@ckpipsr.ac.in",
    image_url: "/images/faculty/dipayan-tarafder.jpg",
    isTeaching: true
  },
  {
    name: "Mrs. Prakruti P. Gotawala",
    designation: "Assistant Professor, Pharmacology",
    qualification: "M. PHARM, Ph.D. (Pursuing)",
    experience: "04 YEARS 08 MONTHS",
    email: "prakruti.jadav@ckpipsr.ac.in",
    image_url: "/images/faculty/prakruti-p-gotawala.jpg",
    isTeaching: true
  },
  {
    name: "Dr. Shuchi P. Desai",
    designation: "Assistant Professor, Pharmachemistry",
    qualification: "M.PHARM, Ph.D.",
    experience: "",
    email: "shuchi.desai@ckpipsr.ac.in",
    image_url: "/images/faculty/shuchi-p-desai.jpg",
    isTeaching: true
  },
  {
    name: "Dr. Monika Kyada",
    designation: "Assistant Professor, Pharmachemistry",
    qualification: "M.PHARM, Ph.D.",
    experience: "",
    email: "monika.kakadiya@ckpipsr.ac.in",
    image_url: "/images/faculty/monika-t-kyada.jpg",
    isTeaching: true
  },
  {
    name: "Dr. Naishadh Ishwarbhai Solanki",
    designation: "Assistant Professor, Pharmachemistry",
    qualification: "M. PHARM, Ph.D.",
    experience: "",
    email: "Naishadh.solanki@ckpipsr.ac.in",
    image_url: "/images/faculty/naishadh-i-solanki.jpg",
    isTeaching: true
  },
  {
    name: "Mr. Dhaval B. Joshi",
    designation: "Assistant Professor, Pharmacology",
    qualification: "M. PHARM, Ph.D. (Pursuing)",
    experience: "",
    email: "dhaval.joshi@ckpipsr.ac.in",
    image_url: "/images/faculty/dhaval-b-joshi.jpg",
    isTeaching: true
  },
  {
    name: "Ms. Kinjalkumari Sumanbhai Gamit",
    designation: "Assistant Professor, Pharmacology",
    qualification: "M. PHARM, Ph.D. (Pursuing)",
    experience: "02 YEARS 08 MONTHS",
    email: "kinjal.gamit@ckpipsr.ac.in",
    image_url: "/images/faculty/kinjalkumari-s-gamit.jpg",
    isTeaching: true
  },
  {
    name: "Mr. Nirmal T. Mehta",
    designation: "Assistant Professor, Pharmachemistry",
    qualification: "M. PHARM, Ph.D. (Pursuing)",
    experience: "01 YEAR 03 MONTHS",
    email: "nirmal.mehta@ckpipsr.ac.in",
    image_url: "/images/faculty/nirmal-t-mehta.jpg",
    isTeaching: true
  },
  {
    name: "Mrs. Kajal Chintan Solanki",
    designation: "Assistant Professor, Pharmachemistry",
    qualification: "M. PHARM, Ph.D. (Pursuing)",
    experience: "",
    email: "kajal.solanki@ckpipsr.ac.in",
    image_url: "/images/faculty/kajal-c-solanki.jpg",
    isTeaching: true
  },
  {
    name: "Ms. Zulekha S. Gamit",
    designation: "Assistant Professor, Pharmaceutics",
    qualification: "M. PHARM, Ph.D. (Pursuing)",
    experience: "",
    email: "Zulekha.gamit@ckpipsr.ac.in",
    image_url: "/images/faculty/zulekha-k-gamit.jpg",
    isTeaching: true
  },
  {
    name: "Dr. Hema V. Badgujar",
    designation: "Assistant Professor, Pharmachemistry",
    qualification: "M. PHARM, Ph.D.",
    experience: "03 YEARS 11 MONTHS",
    email: "hema.kamlja@ckpipsr.ac.in",
    image_url: "/images/faculty/hema-v-badgujar.jpg",
    isTeaching: true
  },
  {
    name: "Mrs. Shweta G. Vaghela",
    designation: "Assistant Professor, Pharmachemistry",
    qualification: "M. PHARM, Ph.D. (Pursuing)",
    experience: "01 YEAR 01 MONTH",
    email: "shweta.vaghela@ckpipsr.ac.in",
    image_url: "/images/faculty/shwetaba-g-vaghela.jpg",
    isTeaching: true
  },
  {
    name: "Mrs. Tarkeshwari T. Ahire",
    designation: "Assistant Professor, Pharmachemistry",
    qualification: "M. PHARM",
    experience: "",
    email: "tarkeshwari.ahire@ckpipsr.ac.in",
    image_url: "/images/faculty/tarkeshwari-t-ahire.jpg",
    isTeaching: true
  },
  {
    name: "Ms. Shivangi K. Shrivastav",
    designation: "Assistant Professor, Pharmaceutics",
    qualification: "M. PHARM",
    experience: "",
    email: "shivangi.shrivastav@ckpipsr.ac.in",
    image_url: "/images/faculty/shivangi-k-shrivastav.jpg",
    isTeaching: true
  },
  {
    name: "Ms. Richa Indravadan Champaneria",
    designation: "Assistant Professor, Pharmachemistry",
    qualification: "M. PHARM",
    experience: "",
    email: "richa.champaneria@ckpipsr.ac.in",
    image_url: "/images/faculty/richa-i-champaneria.jpg",
    isTeaching: true
  },
  {
    name: "Mrs. Hetvi R. Shah",
    designation: "Assistant Professor, Pharmaceutics",
    qualification: "M. PHARM",
    experience: "",
    email: "Hetvi.shah@ckpipsr.ac.in",
    image_url: "/images/faculty/hetvi-r-shah.jpg",
    isTeaching: true
  },
];

export const COMMITTEES_DATA = {
  anti_ragging: [
    { role: "I/C Principal", name: "Dr. Marteenkumar Patel", contact: "7383804620" },
    { role: "Civil Administration Rep.", name: "Member-Civil Administration", contact: "0261-2665800" },
    { role: "Police In-Charge Rep.", name: "Member-Police Administrative", contact: "0261-2251010" },
    { role: "Local Media Rep.", name: "Mr. Mihir Pathak", contact: "9327511695" },
    { role: "N.G.O Representative", name: "Ms. Janhvi Shah", contact: "9998776909" },
    { role: "Faculty Representatives", name: "Gaurang Joshi, Dr. Varsha Gondaliya, Dipan Naik, Krishna Khandwala, Khushi Bhajiwala", contact: "9106016234 / 9714679796 / 9429473536" },
    { role: "Parents Representative", name: "Pintubhai", contact: "7383804620" },
    { role: "Non-Teaching Rep.", name: "Mr. Pankaj Rajput", contact: "8460101665" },
    { role: "Student Representatives", name: "Patel Heer, Patel Richa", contact: "7043633921 / 9313243088" }
  ],
  st_sc_cell: [
    { name: "Prof. Jigisha Acharya", designation: "Asst. Professor" },
    { name: "Dr. Ami Desai", designation: "Asst. Professor" },
    { name: "Ambuj Mishra", designation: "Asst. Professor" },
    { name: "Pankaj Rajput", designation: "Head Clerk" },
    { name: "Vaishali Patel", designation: "Jr. Clerk" }
  ],
  sexual_harassment: [
    { name: "Prof. Gaurang Joshi", committee_role: "Member", designation: "Asst. Prof." },
    { name: "Dr. Ami Desai", committee_role: "Member", designation: "Asst. Prof." },
    { name: "Reshma D. Patel", committee_role: "Member", designation: "Asst. Prof." },
    { name: "Apexa S. Patel", committee_role: "Member", designation: "Asst. Prof." }
  ]
};

const _GALLERY_IMAGES: Record<string, string[]> = {
  sports: [
    "https://ckpcmc.org/images/sport_01.jpeg",
    "https://ckpcmc.org/images/sport_02.jpeg",
    "https://ckpcmc.org/images/sport_03.jpeg",
    "https://ckpcmc.org/images/sport_04.jpeg",
    "https://ckpcmc.org/images/sport_05.jpeg",
    "https://ckpcmc.org/images/sport_06.jpeg",
    "https://ckpcmc.org/images/sport_07.jpeg",
    "https://ckpcmc.org/images/sport_08.jpeg",
    "https://ckpcmc.org/images/sport_09.jpeg",
    "https://ckpcmc.org/images/sport_10.jpeg",
    "https://ckpcmc.org/images/sport_11.jpeg"
  ],
  hostel: [
    "https://ckpcmc.org/images/stationary.jpg",
    "https://ckpcmc.org/images/stationary2.jpg"
  ],
  canteen: [
    "https://ckpcmc.org/images/canteen.jpg"
  ],
  classrooms: [
    "https://ckpcmc.org/images/classroom2.jpg",
    "https://ckpcmc.org/images/classrooms.jpg"
  ],
  "inter-college": [
    "https://ckpcmc.org/images/inter_01.jpeg",
    "https://ckpcmc.org/images/inter_02.jpeg",
    "https://ckpcmc.org/images/inter_03.jpeg",
    "https://ckpcmc.org/images/inter_04.jpeg",
    "https://ckpcmc.org/images/inter_05.jpeg",
    "https://ckpcmc.org/images/inter_06.jpeg",
    "https://ckpcmc.org/images/inter_07.jpeg",
    "https://ckpcmc.org/images/inter_08.jpeg",
    "https://ckpcmc.org/images/inter_09.jpeg",
    "https://ckpcmc.org/images/inter_10.jpeg",
    "https://ckpcmc.org/images/inter_11.jpeg",
    "https://ckpcmc.org/images/inter_12.jpeg",
    "https://ckpcmc.org/images/inter_13.jpeg",
    "https://ckpcmc.org/images/inter_14.jpeg",
    "https://ckpcmc.org/images/inter_15.jpeg",
    "https://ckpcmc.org/images/inter_16.jpeg"
  ],
  competitions: [
    "https://ckpcmc.org/images/comp_01.jpeg",
    "https://ckpcmc.org/images/comp_02.jpeg",
    "https://ckpcmc.org/images/comp_03.jpeg",
    "https://ckpcmc.org/images/comp_04.jpeg",
    "https://ckpcmc.org/images/comp_05.jpeg",
    "https://ckpcmc.org/images/comp_06.jpeg",
    "https://ckpcmc.org/images/comp_07.jpeg",
    "https://ckpcmc.org/images/comp_08.jpeg",
    "https://ckpcmc.org/images/comp_09.jpeg",
    "https://ckpcmc.org/images/comp_10.jpeg",
    "https://ckpcmc.org/images/comp_11.jpeg",
    "https://ckpcmc.org/images/comp_12.jpeg",
    "https://ckpcmc.org/images/comp_13.jpeg",
    "https://ckpcmc.org/images/comp_14.jpeg",
    "https://ckpcmc.org/images/comp_15.jpeg"
  ],
  gallery: [
    "https://ckpcmc.org/images/gal_01.jpeg",
    "https://ckpcmc.org/images/gal_02.jpeg",
    "https://ckpcmc.org/images/gal_03.jpeg",
    "https://ckpcmc.org/images/gal_04.jpeg",
    "https://ckpcmc.org/images/gal_05.jpeg",
    "https://ckpcmc.org/images/gal_06.jpeg",
    "https://ckpcmc.org/images/gal_07.jpeg",
    "https://ckpcmc.org/images/gal_08.jpeg",
    "https://ckpcmc.org/images/gal_09.jpeg",
    "https://ckpcmc.org/images/gal_10.jpeg",
    "https://ckpcmc.org/images/gal_11.jpeg",
    "https://ckpcmc.org/images/gal_12.jpeg",
    "https://ckpcmc.org/images/gal_13.jpeg",
    "https://ckpcmc.org/images/gal_14.jpeg",
    "https://ckpcmc.org/images/gal_15.jpeg"
  ],
  "media-appreciation": [
    "https://ckpcmc.org/images/med_01.jpeg",
    "https://ckpcmc.org/images/med_02.jpeg",
    "https://ckpcmc.org/images/med_03.jpeg",
    "https://ckpcmc.org/images/med_04.jpeg",
    "https://ckpcmc.org/images/med_05.jpeg",
    "https://ckpcmc.org/images/med_06.jpeg",
    "https://ckpcmc.org/images/med_07.jpeg",
    "https://ckpcmc.org/images/med_08.jpeg",
    "https://ckpcmc.org/images/med_09.jpeg",
    "https://ckpcmc.org/images/med_10.jpeg",
    "https://ckpcmc.org/images/med_11.jpeg",
    "https://ckpcmc.org/images/med_12.jpeg",
    "https://ckpcmc.org/images/med_13.jpeg",
    "https://ckpcmc.org/images/med_14.jpeg"
  ]
};

const _ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    title: "Chess Competition Victory",
    image_url: "https://ckpcmc.org/images/ch.jpg",
    date: "2024-09-03",
    description: "Organized in C. K. Pithawalla College of Commerce-Management-Computer Application for B.C.A, B.B.A, B.COM students.",
    students: "SHLOK SARANG, PATEL VATSAL, GOSWAMI NILESH, JIKADRA JEMISH, SNEH VASANI, VED THUMMER",
    hashtags: "#Chess #ckpcmc #Achievement #Competition #VNSGU"
  },
  {
    title: "Aluna Competition — Tattoo Art",
    image_url: "https://ckpcmc.org/images/WhatsApp%20Image%202024-07-19%20at%208.55.10%20AM%20(3).jpeg",
    date: "2024-09-03",
    description: "Traditional tattoo design competition organized in D4 Building on campus.",
    students: "Dhalaria Pranav (TYBBA)",
    hashtags: "#Tattoo #traditional #aluna #ckpcmc #achievement"
  },
  {
    title: "Aluna Competition — Nail Art",
    image_url: "https://ckpcmc.org/images/WhatsApp%20Image%202024-07-19%20at%208.55.12%20AM%20(1).jpeg",
    date: "2024-09-03",
    description: "Creative nail art showcase held during campus cultural festival.",
    students: "Dakhara Yami (TYBCA), Mithusu Sorathiya (FY), Palak Deladia (FY)",
    hashtags: "#NailArt #traditional #aluna #ckpcmc #achievement"
  },
  {
    title: "Aluna Competition — Traditional Wear",
    image_url: "https://ckpcmc.org/images/WhatsApp%20Image%202024-07-19%20at%208.55.11%20AM.jpeg",
    date: "2024-09-03",
    description: "Cultural traditional attire contest celebrating regional heritage.",
    students: "Tejas Solanki (TYBBA), Jariwala Jenisha (SYBCA), Payal Singh (SYBCA), Kabrawala Krishna (FYBBA)",
    hashtags: "#traditional #aluna #ckpcmc #achievement"
  },
  {
    title: "Aluna Competition — Mehendi",
    image_url: "https://ckpcmc.org/images/winer.jpg",
    date: "2024-09-03",
    description: "Traditional Mehendi artistry competition across all course batches.",
    students: "Patel Priya (FYBCA), Dakhara Yami (TYBCA), Kapadiya Khushi (FYBBA)",
    hashtags: "#mehendi #aluna #ckpcmc #winners"
  }
];

const _EVENTS_DATA: EventItem[] = [
  {
    title: "Poetry Recitation Competition",
    image_url: "https://ckpcmc.org/images/WhatsApp%20Image%202024-09-09%20at%209.58.07%20PM.jpeg",
    date: "2024-09-09",
    venue_description: "J.Z. Shah Arts & H.P. Desai Commerce College, Amroli",
    coordinators: "Ms. Krishna Khandwala, Ms. Hetal Shrimali, Ms. Apexa Patel, Ms. Rashmi Nayak",
    document_link: "https://drive.google.com/file/d/1unteCvAMBXIeob8YwzEjohm4e3SoQ7XW/view?usp=sharing"
  },
  {
    title: "Teacher's Day Celebration",
    image_url: "https://ckpcmc.org/images/Picture1.jpg",
    date: "2024-09-05",
    venue_description: "CKPCMC Seminar hall. Acknowledging and honoring faculty contributions to quality higher education.",
    coordinators: "Dr. Tanvi Patel, Ms. Payal Mehta, Ms. Hetal Mehta, Ms. Himisha Kawedia, Ms. Ruchita Lodaliya, Ms. Khushi",
    document_link: "https://drive.google.com/file/d/1niCj5zjus5so8uanayppsqm2tcHeyfLo/view?usp=sharing"
  },
  {
    title: "Inter-College Boxing Competition",
    image_url: "https://ckpcmc.org/images/IMG_20240902_104824.jpg",
    date: "2024-09-02",
    venue_description: "Organized by V.N.S.G.U. Platform for students to show boxing skills in men's tournament.",
    coordinators: "Mr. Kalpesh Gupta",
    document_link: "https://drive.google.com/file/d/1CNY_UHMTDssG1GHcd8FYNgVk3MW_HqZ7/view?usp=sharing"
  },
  {
    title: "Debate Competition",
    image_url: "https://ckpcmc.org/images/WhatsApp%20Image%202024-08-31%20at%202.54.48%20PM.jpeg",
    date: "2024-08-31",
    venue_description: "In Campus. Enhances critical thinking, public speaking, poise, and structured argumentation.",
    coordinators: "Dr. Tanvi Patel, Ms. Payal Mehta, Ms. Hetal Mehta, Ms. Himisha Kawedia, Ms. Ruchita Lodaliya",
    document_link: "https://drive.google.com/file/d/1OSbn6xjtZZ4VrQf3VcxW7Gt_OrYQ5FOG/view?usp=sharing"
  }
];

const _NEWS_DATA: NewsItem[] = [
  {
    title: "Sanklan : Inter College Competition",
    description: "Inter College Competition event details & guidelines for participating teams.",
    link: "https://drive.google.com/file/d/1E5I625kpoGE0KNTlcV5G23pRlq8aBDqV/view?usp=sharing",
    icon_image: "https://ckpcmc.org/images/new.gif"
  },
  {
    title: "Application Form For Associate Professor",
    description: "Official recruitment notice and downloadable application form for Associate Professor positions.",
    link: "https://drive.google.com/file/d/1O7w1G-sUqDUZkg4NF5sSkxVyBLbWAJ1S/view",
    icon_image: "https://ckpcmc.org/images/new.gif"
  },
  {
    title: "Application Form for Assistant Professor",
    description: "Official recruitment notice and downloadable application form for Assistant Professor positions.",
    link: "https://drive.google.com/file/d/1T5bdugIxF3l5L1SqXJO24x-CBJBX7X9y/view",
    icon_image: "https://ckpcmc.org/images/new.gif"
  }
];

export const STAFF_MEMBERS: StaffMember[] = _STAFF_MEMBERS.map((member) => ({
  ...member,
  image_url: cdn(member.image_url, 800, 90),
}));

export const GALLERY_IMAGES: Record<string, string[]> = Object.fromEntries(
  Object.entries(_GALLERY_IMAGES).map(([key, urls]) => [
    key,
    urls.map((url) => cdn(url, 1000, 90)),
  ])
);

export const ACHIEVEMENTS_DATA: AchievementItem[] = _ACHIEVEMENTS_DATA.map((item) => ({
  ...item,
  image_url: cdn(item.image_url, 800, 90),
}));

export const EVENTS_DATA: EventItem[] = _EVENTS_DATA.map((item) => ({
  ...item,
  image_url: cdn(item.image_url, 800, 90),
}));

export const NEWS_DATA: NewsItem[] = _NEWS_DATA.map((item) => ({
  ...item,
  icon_image: item.icon_image ? cdn(item.icon_image, 200, 90) : undefined,
}));

