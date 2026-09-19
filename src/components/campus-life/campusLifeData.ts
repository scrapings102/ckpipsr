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
  sideImage: string;
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
    primaryImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
    sideImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop",
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
    primaryImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
    sideImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
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
    primaryImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1600&auto=format&fit=crop",
    sideImage: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
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
    primaryImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop",
    sideImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    tags: ["SSIP Gujarat", "Hardware Prototyping", "IoT Labs", "Startup Incubation"]
  }
];

export const ARCHIVE_ITEMS: LaneItem[] = [
  { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", caption: "Sunset chats at central lawns", tag: "Student Life", originalId: "01", rotation: "-rotate-1" },
  { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop", caption: "Shaam-E-Shaandar concert night", tag: "Music Club", originalId: "02", rotation: "rotate-2" },
  { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop", caption: "Creative arts guild oil studio", tag: "Fine Arts", originalId: "03", rotation: "-rotate-2" },
  { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", caption: "Night coding team sprint", tag: "Prayas Hub", originalId: "04", rotation: "rotate-1" },
  { url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop", caption: "Warmups before Khelutsav tournament", tag: "Varsity Sports", originalId: "05", rotation: "-rotate-1" },
  { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop", caption: "Senior-junior common room talks", tag: "Community", originalId: "06", rotation: "rotate-2" },
  { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop", caption: "Robotics testing & automation bay", tag: "Innovation Lab", originalId: "07", rotation: "rotate-2" },
  { url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop", caption: "Annual street drama rehearsals", tag: "Theatre Guild", originalId: "08", rotation: "-rotate-2" },
  { url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop", caption: "Quiet study sessions at central stack", tag: "Library Commons", originalId: "09", rotation: "rotate-1" },
  { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop", caption: "Tech fest prototype showcase", tag: "GTU Xitij", originalId: "10", rotation: "-rotate-1" },
  { url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop", caption: "Morning mindfulness & yoga quad", tag: "Wellness Club", originalId: "11", rotation: "rotate-2" },
  { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop", caption: "Farewell lantern release evening", tag: "Graduation", originalId: "12", rotation: "-rotate-2" }
];

export const LANE1_ITEMS: LaneItem[] = [
  { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", caption: "Sunset chats at central lawns", tag: "Student Life", originalId: "01", rotation: "-rotate-1" },
  { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop", caption: "Shaam-E-Shaandar concert night", tag: "Music Club", originalId: "02", rotation: "rotate-2" },
  { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop", caption: "Creative arts guild oil studio", tag: "Fine Arts", originalId: "03", rotation: "-rotate-2" },
  { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", caption: "Night coding team sprint", tag: "Prayas Hub", originalId: "04", rotation: "rotate-1" },
  { url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop", caption: "Warmups before Khelutsav tournament", tag: "Varsity Sports", originalId: "05", rotation: "-rotate-1" },
  { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop", caption: "Senior-junior common room talks", tag: "Community", originalId: "06", rotation: "rotate-2" },
  // Duplicate for seamless 50% translation marquee loop
  { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", caption: "Sunset chats at central lawns", tag: "Student Life", originalId: "01", rotation: "-rotate-1" },
  { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop", caption: "Shaam-E-Shaandar concert night", tag: "Music Club", originalId: "02", rotation: "rotate-2" },
  { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop", caption: "Creative arts guild oil studio", tag: "Fine Arts", originalId: "03", rotation: "-rotate-2" },
  { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", caption: "Night coding team sprint", tag: "Prayas Hub", originalId: "04", rotation: "rotate-1" },
  { url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop", caption: "Warmups before Khelutsav tournament", tag: "Varsity Sports", originalId: "05", rotation: "-rotate-1" },
  { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop", caption: "Senior-junior common room talks", tag: "Community", originalId: "06", rotation: "rotate-2" }
];

export const LANE2_ITEMS: LaneItem[] = [
  { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop", caption: "Robotics testing & automation bay", tag: "Innovation Lab", originalId: "07", rotation: "rotate-2" },
  { url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop", caption: "Annual street drama rehearsals", tag: "Theatre Guild", originalId: "08", rotation: "-rotate-2" },
  { url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop", caption: "Quiet study sessions at central stack", tag: "Library Commons", originalId: "09", rotation: "rotate-1" },
  { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop", caption: "Tech fest prototype showcase", tag: "GTU Xitij", originalId: "10", rotation: "-rotate-1" },
  { url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop", caption: "Morning mindfulness & yoga quad", tag: "Wellness Club", originalId: "11", rotation: "rotate-2" },
  { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop", caption: "Farewell lantern release evening", tag: "Graduation", originalId: "12", rotation: "-rotate-2" },
  // Duplicate for seamless 50% translation marquee loop
  { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop", caption: "Robotics testing & automation bay", tag: "Innovation Lab", originalId: "07", rotation: "rotate-2" },
  { url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop", caption: "Annual street drama rehearsals", tag: "Theatre Guild", originalId: "08", rotation: "-rotate-2" },
  { url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop", caption: "Quiet study sessions at central stack", tag: "Library Commons", originalId: "09", rotation: "rotate-1" },
  { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop", caption: "Tech fest prototype showcase", tag: "GTU Xitij", originalId: "10", rotation: "-rotate-1" },
  { url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop", caption: "Morning mindfulness & yoga quad", tag: "Wellness Club", originalId: "11", rotation: "rotate-2" },
  { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop", caption: "Farewell lantern release evening", tag: "Graduation", originalId: "12", rotation: "-rotate-2" }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { title: "Creative Arts Guild", url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=300" },
  { title: "Shaam-E-Shaandar Concert Night", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300" },
  { title: "Student Houses & Fellowship", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=300" },
  { title: "Senior-Junior Common Room Talks", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=300" },
  { title: "Sports Varsity & Khelutsav", url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=300" },
  { title: "Varsity Sports Training", url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=300" },
  { title: "Prayas Sandbox Robotics Testing", url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=300" },
  { title: "Hardware Prototyping & Incubation", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=300" },
  { title: "Night Coding Team Sprint", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=300" },
  { title: "Annual Street Drama Rehearsals", url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=300" },
  { title: "Quiet Study at Central Stack", url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=300" },
  { title: "Tech Fest Prototype Showcase", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=300" },
  { title: "Morning Mindfulness & Yoga Quad", url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=300" },
  { title: "Farewell Lantern Release Evening", url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200", thumb: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=300" }
];
