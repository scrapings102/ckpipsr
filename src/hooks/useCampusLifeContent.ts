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
  title: string;
  headline: string;
  description: string;
  locationTag: string;
  stats: { label: string; value: string }[];
  primaryImage: string;
  /** Hex colour of the pillar's number badge; empty lets the page choose. */
  accent?: string;
  /** The chips under the stats. */
  tags?: string[];
}

export interface CampusPolaroid {
  url: string;
  caption: string;
  tag: string;
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
      title: "Self-Expression & Aesthetic Confidence",
      headline: "Where academic diligence meets cultural vibrancy.",
      description: "At C.K. Pithawalla, analytical learning marries organic artistic expression. Our student-led creative guilds host acoustic music studios, photography workshops, fine arts galleries, and spirited dramatic theater clubs.",
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
      primaryImage: "/media/unsplash/photo-1514525253161-7a46d19cd819-f082da.jpg",
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
      title: "Interdisciplinary Fellowship",
      headline: "Cohesive multi-departmental mentorship networks.",
      description: "Our campus operates with four spirited student houses that break disciplinary silos through fierce debate leagues, collegiate hackathons, festive rallies, and collaborative community outreach initiatives.",
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
      primaryImage: "/media/unsplash/photo-1523240795612-9a054b0db644-15b263.jpg",
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
      title: "Physical Mastery & Mindfulness",
      headline: "Nurturing daily resilience, coordination, and grit.",
      description: "Across our sprawling lush green grounds and tournament-grade floodlit courts, students train in competitive sports leagues like Khelutsav, alongside serene morning yoga, fitness training, and wellness drills.",
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
      primaryImage: "/media/unsplash/photo-1546519638-68e109498ffc-52ff02.jpg",
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
      title: "Real Innovation & Incubation Lab",
      headline: "Empowering student founders with seed grants and prototyping.",
      description: "In collaboration with the state SSIP Cell, our innovation sandbox provides student teams with advanced fabrication tools, experimental labs, mentorship from industry veterans, and startup seed grants.",
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
      primaryImage: "/media/unsplash/photo-1485827404703-89b55fcc595e-0b8555.jpg",
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
      url: "/media/unsplash/photo-1523240795612-9a054b0db644-825f0e.jpg",
      caption: "Sunset chats at central lawns",
      tag: "Student Life",
    },
    {
      url: "/media/unsplash/photo-1514525253161-7a46d19cd819-da5bc0.jpg",
      caption: "Shaam-E-Shaandar concert night",
      tag: "Music Club",
    },
    {
      url: "/media/unsplash/photo-1460661419201-fd4cecdf8a8b-19606f.jpg",
      caption: "Creative arts guild oil studio",
      tag: "Fine Arts",
    },
    {
      url: "/media/unsplash/photo-1504384308090-c894fdcc538d-6fde2b.jpg",
      caption: "Night coding team sprint",
      tag: "Prayas Hub",
    },
    {
      url: "/media/unsplash/photo-1546519638-68e109498ffc-0f748c.jpg",
      caption: "Warmups before Khelutsav tournament",
      tag: "Varsity Sports",
    },
    {
      url: "/media/unsplash/photo-1517486808906-6ca8b3f04846-8ca7eb.jpg",
      caption: "Senior-junior common room talks",
      tag: "Community",
    },
    {
      url: "/media/unsplash/photo-1485827404703-89b55fcc595e-be6846.jpg",
      caption: "Robotics testing & automation bay",
      tag: "Innovation Lab",
    },
    {
      url: "/media/unsplash/photo-1507676184212-d03ab07a01bf-54a43a.jpg",
      caption: "Annual street drama rehearsals",
      tag: "Theatre Guild",
    },
    {
      url: "/media/unsplash/photo-1521587760476-6c12a4b040da-2bb6dd.jpg",
      caption: "Quiet study sessions at central stack",
      tag: "Library Commons",
    },
    {
      url: "/media/unsplash/photo-1531482615713-2afd69097998-ea7c82.jpg",
      caption: "Tech fest prototype showcase",
      tag: "GTU Xitij",
    },
    {
      url: "/media/unsplash/photo-1506126613408-eca07ce68773-0765d9.jpg",
      caption: "Morning mindfulness & yoga quad",
      tag: "Wellness Club",
    },
    {
      url: "/media/unsplash/photo-1513151233558-d860c5398176-b53096.jpg",
      caption: "Farewell lantern release evening",
      tag: "Graduation",
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
