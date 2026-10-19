export interface PillarStat {
  label: string;
  value: string;
}

export interface Pillar {
  id: string;
  num: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  accent: string;
  locationTag: string;
  stats: PillarStat[];
  primaryImage: string;
  tags: string[];
}

export interface LaneItem {
  url: string;
  caption: string;
  tag: string;
  originalId: string | number;
  rotation: string;
}

export interface GalleryItem {
  title: string;
  url: string;
  thumb: string;
  category?: string;
  caption?: string;
}

export const PILLARS: Pillar[] = [
  {
    id: "creative-arts",
    num: "01",
    category: "Creative Arts Guild",
    title: "Self-Expression & Aesthetic Confidence",
    headline: "Where academic diligence meets cultural vibrancy.",
    description: "At C.K. Pithawalla, analytical learning marries organic artistic expression. Our student-led creative guilds host acoustic music studios, photography workshops, fine arts galleries, and spirited dramatic theater clubs.",
    accent: "#D4AF37",
    locationTag: "Creative Quad & Open-Air Amphitheatre",
    stats: [
      { label: "Active Guilds", value: "8 Live Teams" },
      { label: "Annual Productions", value: "24+ Events" }
    ],
    primaryImage: "/media/unsplash/photo-1514525253161-7a46d19cd819-f082da.jpg",
    tags: ["Acoustic Suites", "Street Theatre", "Design Studio", "Annual Fest"]
  },
  {
    id: "house-culture",
    num: "02",
    category: "Student Houses",
    title: "Interdisciplinary Fellowship",
    headline: "Cohesive multi-departmental mentorship networks.",
    description: "Our campus operates with four spirited student houses that break disciplinary silos through fierce debate leagues, collegiate hackathons, festive rallies, and collaborative community outreach initiatives.",
    accent: "#182f1d",
    locationTag: "Central Student House Commons",
    stats: [
      { label: "Active Participation", value: "95% Student Body" },
      { label: "House Trophy", value: "Annual Cup" }
    ],
    primaryImage: "/media/unsplash/photo-1523240795612-9a054b0db644-15b263.jpg",
    tags: ["House Leagues", "Peer Mentoring", "Debate Forum", "Community Service"]
  },
  {
    id: "athletics",
    num: "03",
    category: "Sports Varsity",
    title: "Physical Mastery & Mindfulness",
    headline: "Nurturing daily resilience, coordination, and grit.",
    description: "Across our sprawling lush green grounds and tournament-grade floodlit courts, students train in competitive sports leagues like Khelutsav, alongside serene morning yoga, fitness training, and wellness drills.",
    accent: "#B8933E",
    locationTag: "Floodlit Sports Complex & Turf Ground",
    stats: [
      { label: "Sports Arena", value: "Multi-Sport Ground" },
      { label: "Tournaments", value: "12 Seasonal Cups" }
    ],
    primaryImage: "/media/unsplash/photo-1546519638-68e109498ffc-52ff02.jpg",
    tags: ["Cricket Turf", "Volleyball & Badminton", "Table Tennis", "Yoga & Wellness"]
  },
  {
    id: "incubation",
    num: "04",
    category: "Prayas Sandbox",
    title: "Real Innovation & Incubation Lab",
    headline: "Empowering student founders with seed grants and prototyping.",
    description: "In collaboration with the state SSIP Cell, our innovation sandbox provides student teams with advanced fabrication tools, experimental labs, mentorship from industry veterans, and startup seed grants.",
    accent: "#182f1d",
    locationTag: "SSIP Innovation & Prototyping Bay",
    stats: [
      { label: "Seeded Grants", value: "₹15+ Lakhs" },
      { label: "Student Ventures", value: "8+ Formed" }
    ],
    primaryImage: "/media/unsplash/photo-1485827404703-89b55fcc595e-0b8555.jpg",
    tags: ["SSIP Gujarat", "Hardware Prototyping", "IoT Labs", "Startup Incubation"]
  }
];

export const ARCHIVE_ITEMS: LaneItem[] = [
  { url: "/media/unsplash/photo-1523240795612-9a054b0db644-825f0e.jpg", caption: "Sunset chats at central lawns", tag: "Student Life", originalId: "01", rotation: "-rotate-1" },
  { url: "/media/unsplash/photo-1514525253161-7a46d19cd819-da5bc0.jpg", caption: "Shaam-E-Shaandar concert night", tag: "Music Club", originalId: "02", rotation: "rotate-2" },
  { url: "/media/unsplash/photo-1460661419201-fd4cecdf8a8b-19606f.jpg", caption: "Creative arts guild oil studio", tag: "Fine Arts", originalId: "03", rotation: "-rotate-2" },
  { url: "/media/unsplash/photo-1504384308090-c894fdcc538d-6fde2b.jpg", caption: "Night coding team sprint", tag: "Prayas Hub", originalId: "04", rotation: "rotate-1" },
  { url: "/media/unsplash/photo-1546519638-68e109498ffc-0f748c.jpg", caption: "Warmups before Khelutsav tournament", tag: "Varsity Sports", originalId: "05", rotation: "-rotate-1" },
  { url: "/media/unsplash/photo-1517486808906-6ca8b3f04846-8ca7eb.jpg", caption: "Senior-junior common room talks", tag: "Community", originalId: "06", rotation: "rotate-2" },
  { url: "/media/unsplash/photo-1485827404703-89b55fcc595e-be6846.jpg", caption: "Robotics testing & automation bay", tag: "Innovation Lab", originalId: "07", rotation: "rotate-2" },
  { url: "/media/unsplash/photo-1507676184212-d03ab07a01bf-54a43a.jpg", caption: "Annual street drama rehearsals", tag: "Theatre Guild", originalId: "08", rotation: "-rotate-2" },
  { url: "/media/unsplash/photo-1521587760476-6c12a4b040da-2bb6dd.jpg", caption: "Quiet study sessions at central stack", tag: "Library Commons", originalId: "09", rotation: "rotate-1" },
  { url: "/media/unsplash/photo-1531482615713-2afd69097998-ea7c82.jpg", caption: "Tech fest prototype showcase", tag: "GTU Xitij", originalId: "10", rotation: "-rotate-1" },
  { url: "/media/unsplash/photo-1506126613408-eca07ce68773-0765d9.jpg", caption: "Morning mindfulness & yoga quad", tag: "Wellness Club", originalId: "11", rotation: "rotate-2" },
  { url: "/media/unsplash/photo-1513151233558-d860c5398176-b53096.jpg", caption: "Farewell lantern release evening", tag: "Graduation", originalId: "12", rotation: "-rotate-2" }
];

export const LANE1_ITEMS: LaneItem[] = [
  { url: "/media/unsplash/photo-1523240795612-9a054b0db644-825f0e.jpg", caption: "Sunset chats at central lawns", tag: "Student Life", originalId: "01", rotation: "-rotate-1" },
  { url: "/media/unsplash/photo-1514525253161-7a46d19cd819-da5bc0.jpg", caption: "Shaam-E-Shaandar concert night", tag: "Music Club", originalId: "02", rotation: "rotate-2" },
  { url: "/media/unsplash/photo-1460661419201-fd4cecdf8a8b-19606f.jpg", caption: "Creative arts guild oil studio", tag: "Fine Arts", originalId: "03", rotation: "-rotate-2" },
  { url: "/media/unsplash/photo-1504384308090-c894fdcc538d-6fde2b.jpg", caption: "Night coding team sprint", tag: "Prayas Hub", originalId: "04", rotation: "rotate-1" },
  { url: "/media/unsplash/photo-1546519638-68e109498ffc-0f748c.jpg", caption: "Warmups before Khelutsav tournament", tag: "Varsity Sports", originalId: "05", rotation: "-rotate-1" },
  { url: "/media/unsplash/photo-1517486808906-6ca8b3f04846-8ca7eb.jpg", caption: "Senior-junior common room talks", tag: "Community", originalId: "06", rotation: "rotate-2" },
  // Duplicate for seamless 50% translation marquee loop
  { url: "/media/unsplash/photo-1523240795612-9a054b0db644-825f0e.jpg", caption: "Sunset chats at central lawns", tag: "Student Life", originalId: "01", rotation: "-rotate-1" },
  { url: "/media/unsplash/photo-1514525253161-7a46d19cd819-da5bc0.jpg", caption: "Shaam-E-Shaandar concert night", tag: "Music Club", originalId: "02", rotation: "rotate-2" },
  { url: "/media/unsplash/photo-1460661419201-fd4cecdf8a8b-19606f.jpg", caption: "Creative arts guild oil studio", tag: "Fine Arts", originalId: "03", rotation: "-rotate-2" },
  { url: "/media/unsplash/photo-1504384308090-c894fdcc538d-6fde2b.jpg", caption: "Night coding team sprint", tag: "Prayas Hub", originalId: "04", rotation: "rotate-1" },
  { url: "/media/unsplash/photo-1546519638-68e109498ffc-0f748c.jpg", caption: "Warmups before Khelutsav tournament", tag: "Varsity Sports", originalId: "05", rotation: "-rotate-1" },
  { url: "/media/unsplash/photo-1517486808906-6ca8b3f04846-8ca7eb.jpg", caption: "Senior-junior common room talks", tag: "Community", originalId: "06", rotation: "rotate-2" }
];

export const LANE2_ITEMS: LaneItem[] = [
  { url: "/media/unsplash/photo-1485827404703-89b55fcc595e-be6846.jpg", caption: "Robotics testing & automation bay", tag: "Innovation Lab", originalId: "07", rotation: "rotate-2" },
  { url: "/media/unsplash/photo-1507676184212-d03ab07a01bf-54a43a.jpg", caption: "Annual street drama rehearsals", tag: "Theatre Guild", originalId: "08", rotation: "-rotate-2" },
  { url: "/media/unsplash/photo-1521587760476-6c12a4b040da-2bb6dd.jpg", caption: "Quiet study sessions at central stack", tag: "Library Commons", originalId: "09", rotation: "rotate-1" },
  { url: "/media/unsplash/photo-1531482615713-2afd69097998-ea7c82.jpg", caption: "Tech fest prototype showcase", tag: "GTU Xitij", originalId: "10", rotation: "-rotate-1" },
  { url: "/media/unsplash/photo-1506126613408-eca07ce68773-0765d9.jpg", caption: "Morning mindfulness & yoga quad", tag: "Wellness Club", originalId: "11", rotation: "rotate-2" },
  { url: "/media/unsplash/photo-1513151233558-d860c5398176-b53096.jpg", caption: "Farewell lantern release evening", tag: "Graduation", originalId: "12", rotation: "-rotate-2" },
  // Duplicate for seamless 50% translation marquee loop
  { url: "/media/unsplash/photo-1485827404703-89b55fcc595e-be6846.jpg", caption: "Robotics testing & automation bay", tag: "Innovation Lab", originalId: "07", rotation: "rotate-2" },
  { url: "/media/unsplash/photo-1507676184212-d03ab07a01bf-54a43a.jpg", caption: "Annual street drama rehearsals", tag: "Theatre Guild", originalId: "08", rotation: "-rotate-2" },
  { url: "/media/unsplash/photo-1521587760476-6c12a4b040da-2bb6dd.jpg", caption: "Quiet study sessions at central stack", tag: "Library Commons", originalId: "09", rotation: "rotate-1" },
  { url: "/media/unsplash/photo-1531482615713-2afd69097998-ea7c82.jpg", caption: "Tech fest prototype showcase", tag: "GTU Xitij", originalId: "10", rotation: "-rotate-1" },
  { url: "/media/unsplash/photo-1506126613408-eca07ce68773-0765d9.jpg", caption: "Morning mindfulness & yoga quad", tag: "Wellness Club", originalId: "11", rotation: "rotate-2" },
  { url: "/media/unsplash/photo-1513151233558-d860c5398176-b53096.jpg", caption: "Farewell lantern release evening", tag: "Graduation", originalId: "12", rotation: "-rotate-2" }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { title: "Creative Arts Guild", url: "/media/unsplash/photo-1460661419201-fd4cecdf8a8b-faa3c5.jpg", thumb: "/media/unsplash/photo-1460661419201-fd4cecdf8a8b-1db7e7.jpg" },
  { title: "Shaam-E-Shaandar Concert Night", url: "/media/unsplash/photo-1514525253161-7a46d19cd819-3aa391.jpg", thumb: "/media/unsplash/photo-1514525253161-7a46d19cd819-37c66a.jpg" },
  { title: "Student Houses & Fellowship", url: "/media/unsplash/photo-1523240795612-9a054b0db644-0a01ed.jpg", thumb: "/media/unsplash/photo-1523240795612-9a054b0db644-2201e4.jpg" },
  { title: "Senior-Junior Common Room Talks", url: "/media/unsplash/photo-1517486808906-6ca8b3f04846-37fc3c.jpg", thumb: "/media/unsplash/photo-1517486808906-6ca8b3f04846-391a53.jpg" },
  { title: "Sports Varsity & Khelutsav", url: "/media/unsplash/photo-1546519638-68e109498ffc-c87156.jpg", thumb: "/media/unsplash/photo-1546519638-68e109498ffc-bb9ebe.jpg" },
  { title: "Varsity Sports Training", url: "/media/unsplash/photo-1502680390469-be75c86b636f-dd6a14.jpg", thumb: "/media/unsplash/photo-1502680390469-be75c86b636f-fac152.jpg" },
  { title: "Prayas Sandbox Robotics Testing", url: "/media/unsplash/photo-1485827404703-89b55fcc595e-8c07e1.jpg", thumb: "/media/unsplash/photo-1485827404703-89b55fcc595e-83c6f0.jpg" },
  { title: "Hardware Prototyping & Incubation", url: "/media/unsplash/photo-1581092160607-ee22621dd758-6ba819.jpg", thumb: "/media/unsplash/photo-1581092160607-ee22621dd758-89e7da.jpg" },
  { title: "Night Coding Team Sprint", url: "/media/unsplash/photo-1504384308090-c894fdcc538d-c4abc1.jpg", thumb: "/media/unsplash/photo-1504384308090-c894fdcc538d-3fe955.jpg" },
  { title: "Annual Street Drama Rehearsals", url: "/media/unsplash/photo-1507676184212-d03ab07a01bf-6e61f3.jpg", thumb: "/media/unsplash/photo-1507676184212-d03ab07a01bf-d22c35.jpg" },
  { title: "Quiet Study at Central Stack", url: "/media/unsplash/photo-1521587760476-6c12a4b040da-2401c0.jpg", thumb: "/media/unsplash/photo-1521587760476-6c12a4b040da-f87180.jpg" },
  { title: "Tech Fest Prototype Showcase", url: "/media/unsplash/photo-1531482615713-2afd69097998-9d0f8e.jpg", thumb: "/media/unsplash/photo-1531482615713-2afd69097998-58e4d2.jpg" },
  { title: "Morning Mindfulness & Yoga Quad", url: "/media/unsplash/photo-1506126613408-eca07ce68773-eb5b86.jpg", thumb: "/media/unsplash/photo-1506126613408-eca07ce68773-febaed.jpg" },
  { title: "Farewell Lantern Release Evening", url: "/media/unsplash/photo-1513151233558-d860c5398176-8f3286.jpg", thumb: "/media/unsplash/photo-1513151233558-d860c5398176-83d5ba.jpg" }
];
