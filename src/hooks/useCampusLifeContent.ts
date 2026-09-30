import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The homepage Campus Life band's editable content.
 *
 * Defaults are what the section shipped with and stay the fallback, so the
 * band renders if the API is down. The hook returns them immediately and swaps
 * in the fetched content when it arrives.
 */
export interface CampusEvent {
  num: string;
  category: string;
  year: string;
  title: string;
  headline: string;
  description: string;
  icon: string;
  locationTag: string;
  stats: { label: string; value: string }[];
  primaryImage: string;
  sideImage: string;
  /** Hex colour of the pillar's number badge; empty lets the page choose. */
  accent?: string;
  /** The chips under the stats. */
  tags?: string[];
}

export interface CampusPolaroid {
  url: string;
  caption: string;
  tag: string;
  category: string;
  year: string;
  pinColor: string;
  rot: number;
}

export interface CampusLifeContent {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  archiveTitle: string;
  archiveSubtitle: string;
  events: CampusEvent[];
  polaroids: CampusPolaroid[];
}

export const DEFAULT_CAMPUS_LIFE: CampusLifeContent = {
  eyebrow: "The Living Ecosystem · Interactive Campus Trail",
  headingLead: "Life Outside",
  headingAccent: "The Classroom",
  archiveTitle: "Campus Memory Archive",
  events: [
    {
      num: "01",
      category: "Creative Arts Guild",
      year: "2025",
      title: "Self-Expression & Aesthetic Confidence",
      headline: "Where academic diligence meets cultural vibrancy.",
      description: "At C.K. Pithawalla, analytical learning marries organic artistic expression. Our student-led creative guilds host acoustic music studios, photography workshops, fine arts galleries, and spirited dramatic theater clubs.",
      icon: "Palette",
      locationTag: "Creative Quad & Open-Air Amphitheatre",
      stats: [
        {
          label: "Active Guilds",
          value: "8 Live Teams"
        },
        {
          label: "Annual Productions",
          value: "24+ Events"
        }
      ],
      primaryImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
      sideImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop",
      accent: "#D4AF37",
      tags: [
        "Acoustic Suites",
        "Street Theatre",
        "Design Studio",
        "Annual Fest"
      ]
    },
    {
      num: "02",
      category: "Student Houses",
      year: "2025",
      title: "Interdisciplinary Fellowship",
      headline: "Cohesive multi-departmental mentorship networks.",
      description: "Our campus operates with four spirited student houses that break disciplinary silos through fierce debate leagues, collegiate hackathons, festive rallies, and collaborative community outreach initiatives.",
      icon: "Users",
      locationTag: "Central Student House Commons",
      stats: [
        {
          label: "Active Participation",
          value: "95% Student Body"
        },
        {
          label: "House Trophy",
          value: "Annual Cup"
        }
      ],
      primaryImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
      sideImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
      accent: "#182f1d",
      tags: [
        "House Leagues",
        "Peer Mentoring",
        "Debate Forum",
        "Community Service"
      ]
    },
    {
      num: "03",
      category: "Sports Varsity",
      year: "2025",
      title: "Physical Mastery & Mindfulness",
      headline: "Nurturing daily resilience, coordination, and grit.",
      description: "Across our sprawling lush green grounds and tournament-grade floodlit courts, students train in competitive sports leagues like Khelutsav, alongside serene morning yoga, fitness training, and wellness drills.",
      icon: "Trophy",
      locationTag: "Floodlit Sports Complex & Turf Ground",
      stats: [
        {
          label: "Sports Arena",
          value: "Multi-Sport Ground"
        },
        {
          label: "Tournaments",
          value: "12 Seasonal Cups"
        }
      ],
      primaryImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1600&auto=format&fit=crop",
      sideImage: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
      accent: "#B8933E",
      tags: [
        "Cricket Turf",
        "Volleyball & Badminton",
        "Table Tennis",
        "Yoga & Wellness"
      ]
    },
    {
      num: "04",
      category: "Prayas Sandbox",
      year: "2025",
      title: "Real Innovation & Incubation Lab",
      headline: "Empowering student founders with seed grants and prototyping.",
      description: "In collaboration with the state SSIP Cell, our innovation sandbox provides student teams with advanced fabrication tools, experimental labs, mentorship from industry veterans, and startup seed grants.",
      icon: "Lightbulb",
      locationTag: "SSIP Innovation & Prototyping Bay",
      stats: [
        {
          label: "Seeded Grants",
          value: "₹15+ Lakhs"
        },
        {
          label: "Student Ventures",
          value: "8+ Formed"
        }
      ],
      primaryImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop",
      sideImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      accent: "#182f1d",
      tags: [
        "SSIP Gujarat",
        "Hardware Prototyping",
        "IoT Labs",
        "Startup Incubation"
      ]
    }
  ],
  polaroids: [
    {
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
      caption: "Sunset chats at central lawns",
      tag: "Student Life",
      category: "Student Life",
      year: "2025",
      pinColor: "gold",
      rot: -2.8
    },
    {
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      caption: "Shaam-E-Shaandar concert night",
      tag: "Music Club",
      category: "Music & Arts",
      year: "2025",
      pinColor: "red",
      rot: 2.5
    },
    {
      url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop",
      caption: "Creative arts guild oil studio",
      tag: "Fine Arts",
      category: "Music & Arts",
      year: "2024",
      pinColor: "blue",
      rot: -1.8
    },
    {
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
      caption: "Night coding team sprint",
      tag: "Prayas Hub",
      category: "Tech & Labs",
      year: "2025",
      pinColor: "silver",
      rot: 3.2
    },
    {
      url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
      caption: "Warmups before Khelutsav tournament",
      tag: "Varsity Sports",
      category: "Sports & Fitness",
      year: "2024",
      pinColor: "red",
      rot: -2.4
    },
    {
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
      caption: "Senior-junior common room talks",
      tag: "Community",
      category: "Student Life",
      year: "2025",
      pinColor: "gold",
      rot: 2.1
    },
    {
      url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
      caption: "Robotics testing & automation bay",
      tag: "Innovation Lab",
      category: "Tech & Labs",
      year: "2025",
      pinColor: "blue",
      rot: -3
    },
    {
      url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop",
      caption: "Annual street drama rehearsals",
      tag: "Theatre Guild",
      category: "Music & Arts",
      year: "2024",
      pinColor: "gold",
      rot: 1.9
    },
    {
      url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
      caption: "Quiet study sessions at central stack",
      tag: "Library Commons",
      category: "Student Life",
      year: "2025",
      pinColor: "silver",
      rot: -1.6
    },
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
      caption: "Tech fest prototype showcase",
      tag: "GTU Xitij",
      category: "Tech & Labs",
      year: "2024",
      pinColor: "red",
      rot: 2.7
    },
    {
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
      caption: "Morning mindfulness & yoga quad",
      tag: "Wellness Club",
      category: "Sports & Fitness",
      year: "2025",
      pinColor: "gold",
      rot: -2.2
    },
    {
      url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop",
      caption: "Farewell lantern release evening",
      tag: "Graduation",
      category: "Student Life",
      year: "2024",
      pinColor: "blue",
      rot: 3
    }
  ],
  archiveSubtitle: "Real moments, real friendships, and unforgettable memories captured throughout our vibrant campus life."
};

/** Enough of a check that a malformed response cannot empty the section. */
function isUsable(value: unknown): value is CampusLifeContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<CampusLifeContent>;
  return (
    typeof c.headingLead === "string" &&
    Array.isArray(c.events) &&
    c.events.length > 0 &&
    Array.isArray(c.polaroids) &&
    c.polaroids.length >= 4
  );
}

export function useCampusLifeContent(): CampusLifeContent {
  const [content, setContent] = useState<CampusLifeContent>(DEFAULT_CAMPUS_LIFE);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/home/campus-life"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.campusLife)) setContent(body.campusLife);
      })
      // The homepage does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
