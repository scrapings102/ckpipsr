import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Students Corner → Hobby Club.
 *
 * Three tabs of copy, and three lists the panel keeps: the aims, the clubs and
 * the rules. Nothing the page can count is stored — the number beside the
 * clubs tab, the aims badge and both lists' numbering arrive worked out, so
 * the strip cannot promise five clubs and show four.
 *
 * The shipped copy below is the page as it stood before it was editable, so a
 * dead API leaves it reading exactly as it always did.
 */
export interface HobbyAim {
  highlight: string;
  text: string;
  icon: string;
}

export interface HobbyClubEntry {
  id: string;
  title: string;
  badge: string;
  icon: string;
  image: string;
  description: string;
}

export interface HobbyRule {
  highlight: string;
  rule: string;
  icon: string;
}

export interface HobbyClubContent {
  pageTitle: string;
  pageSubtitle: string;
  tabs: { about: string; clubs: string; rules: string };
  about: {
    kicker: string;
    heading: string;
    intro: string;
    /** countLabel arrives with the number already in it. */
    aims: { heading: string; countLabel: string; items: HobbyAim[] };
    banner: {
      badge: string;
      heading: string;
      body: string;
      exploreLabel: string;
      rulesLabel: string;
    };
  };
  clubs: {
    cardKicker: string;
    ribbon: { left: string; right: string };
    items: HobbyClubEntry[];
  };
  rules: {
    kicker: string;
    heading: string;
    items: HobbyRule[];
    support: { title: string; body: string; email: string };
  };
  /** What the tab strip shows beside the clubs tab. */
  clubCount: number;
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_HOBBY_CLUB: HobbyClubContent = {
  "pageTitle": "Hobby Club",
  "pageSubtitle": "Holistic development, creative self-expression, and leadership beyond classroom boundaries.",
  "tabs": {
    "about": "About",
    "clubs": "Various Clubs",
    "rules": "Rules and Regulations"
  },
  "about": {
    "kicker": "Student Life & Holistic Development",
    "heading": "Why Hobby Clubs Matter",
    "intro": "Hobby Clubs enable the students to relax and do something they enjoy and act as small breaks in between stress-filled and hectic academic life. Hobbies helps in all round development of the students and are also capable of learning things that the four walls of the classroom cannot. It will encourage students in extracurricular activities to refine their leadership and organizational management experience, explore interests and make friendship that will last a lifetime and make campus life fun. It will play important roles in building character and create opportunities to enhance leadership skills, encourage teamwork and instigate planning and strategies to overcome challenges and fair play all qualities one needs in day-to-day life.",
    "aims": {
      "heading": "Aims and Objectives",
      "countLabel": "9 Key Pillars",
      "items": [
        {
          "highlight": "Passion to Profession",
          "text": "To provide a platform to convert passion into profession for the students.",
          "icon": "Target"
        },
        {
          "highlight": "Rejuvenation & Focus",
          "text": "To reenergize students",
          "icon": "Sparkles"
        },
        {
          "highlight": "Talent Discovery",
          "text": "To explore the hidden talents of students",
          "icon": "Compass"
        },
        {
          "highlight": "Creative Nurturing",
          "text": "To nurture imagination and creativity among students",
          "icon": "Lightbulb"
        },
        {
          "highlight": "Self Discovery",
          "text": "To rediscover interests and strength of students.",
          "icon": "HeartHandshake"
        },
        {
          "highlight": "Practical Skillset",
          "text": "To Improve practical skills",
          "icon": "Layers"
        },
        {
          "highlight": "Work-Life Balance",
          "text": "To provide break from strenuous Life",
          "icon": "Smile"
        },
        {
          "highlight": "Peer Networking",
          "text": "To widen friend circle among having similar interests .",
          "icon": "Users"
        },
        {
          "highlight": "CV Enhancement",
          "text": "To add strength in Curriculum vitae of students",
          "icon": "Award"
        }
      ]
    },
    "banner": {
      "badge": "Open to All Semesters",
      "heading": "Ready to explore your passion?",
      "body": "Check out the full list of active clubs or consult the enrollment guidelines to get started.",
      "exploreLabel": "Explore Clubs",
      "rulesLabel": "View Regulations"
    }
  },
  "clubs": {
    "cardKicker": "Student Interest Circle",
    "ribbon": {
      "left": "Active Academic Year 2026-27",
      "right": "Free Registration"
    },
    "items": [
      {
        "id": "science-club",
        "title": "Science Club",
        "badge": "Innovation & Prototypes",
        "icon": "Cpu",
        "image": "https://ckpipsr.ac.in/images/students/hobbyclub/science.png",
        "description": "The main intention of the Science Club is to encourage, inspire and nurture young students by supporting them to work on new innovative ideas and transform them to prototypes for applicable manner. The students will get mentorship from industry experts, patent experts and alumni of the institution. There will be opportunity for the students to showcase their talents in Competitions."
      },
      {
        "id": "arts-and-crafts-club",
        "title": "Arts and Crafts Club",
        "badge": "Creative & Performing Arts",
        "icon": "Palette",
        "image": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
        "description": "The purpose of the Performing Art Club is to make all round development of students. Through this club, students increase their confidence and expose them to different types of arts. Through the medium of this club, the quality of leadership comes to the student. Here mime, drama and poetry, story writing, debate, group discussion are connected in many ways."
      },
      {
        "id": "photography-club",
        "title": "Photography Club",
        "badge": "Visual Storytelling",
        "icon": "Camera",
        "image": "https://ckpipsr.ac.in/images/students/hobbyclub/photography.png",
        "description": "Photography club is committed to promote photography skills among young generation. A world without photography is hard to imagine; photography is a beautiful way to express one's art and feelings. This photography needs passion and required lot of maturity like golden ager and child like curiosity. Indeed, photography is an art and science. The aim of the club is to nurture the talent among students to see the things differently. The club ethos is to provide a platform where the like- minded students to enjoy, share and advance their photographic skills and explore the beauty of the world."
      },
      {
        "id": "charity-club",
        "title": "Charity Club",
        "badge": "Social Service & Humanity",
        "icon": "Heart",
        "image": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
        "description": "Charity is the act of extending love and kindness to others unconditionally, which is a conscious act but the decision is made by the heart, without expecting a reward. When Charity is carried out selflessly, it is a one-way act where a person gives but asks for nothing in return.Charity Club helps raise awareness amongst students about the situation of people and their well being. It helps them serve society and the less fortunate. It develops in them a heart for the poor and needy. The Charity Club functions as a humanitarian organization which conducts various programmes to help improve the society. Student volunteers and teacher co-ordinators arrange frequent visits to non-profitable organizations or needy people of nearby community /village These visits help in instilling a sense of humanness in the club members and encourages them to take up various societal issues."
      },
      {
        "id": "music-and-dance-club",
        "title": "Music and Dance Club",
        "badge": "Harmony & Cultural Expression",
        "icon": "Music",
        "image": "https://ckpipsr.ac.in/images/students/hobbyclub/music.png",
        "description": "Music and Dance are very important disciplines for a constructive sublimation of instincts and expression of inner sentiments. The Music and Dance club provides them with training in instrumental & vocal music. In addition to it, students learn to dance on Indian & Western tunes. It helps them synchronise their body, mind and soul. The Music and Dance enable the students to promote sense of unity and love as our nation is diverse in its music and arts. While providing knowledge of different forms of Music and Dances of our country, it also enables the students to nurture and identify the talents in music and dance."
      }
    ]
  },
  "rules": {
    "kicker": "Institutional Code of Governance",
    "heading": "Hobby Club Rules & Regulations",
    "items": [
      {
        "highlight": "Club Selection",
        "rule": "Students may join different clubs as per their choice.",
        "icon": "Users"
      },
      {
        "highlight": "Student Management & Mentorship",
        "rule": "The club will be managed by the students, under the guidance of faculty members.",
        "icon": "ShieldCheck"
      },
      {
        "highlight": "Leadership & Reporting",
        "rule": "Each club will have student in charge who will report to the faculty in-charges.",
        "icon": "Target"
      },
      {
        "highlight": "Regular Meetings & Planning",
        "rule": "The entire club will hold regular meetings to discuss and plan their activities.",
        "icon": "Lightbulb"
      },
      {
        "highlight": "CKPIPSR E-Bulletin Publication",
        "rule": "Each club activities will be published in CKPIPSR E-bulletin, which will provide a forum for discussions on various topics related to the clubs and also give an account of the activities organized by the club.",
        "icon": "FileText"
      },
      {
        "highlight": "Competitions & Events",
        "rule": "Each club can organize competitive activities, at intra and inter college levels periodically.",
        "icon": "Award"
      },
      {
        "highlight": "Activity Guidelines",
        "rule": "Rules for individual activities being organized by the clubs will be decided by the coordinators and respective faculty in-charges.",
        "icon": "Layers"
      },
      {
        "highlight": "Healthy Atmosphere & Ethics",
        "rule": "Competition between the clubs should be healthy and clubs should not attempt to disrupt the activities of other clubs.",
        "icon": "HeartHandshake"
      }
    ],
    "support": {
      "title": "Club Proposal & Student Representation",
      "body": "Have an idea for a new special-interest club or want to become a student club coordinator? Reach out to the Student Welfare In-charge.",
      "email": "studentwelfare@ckpipsr.ac.in"
    }
  },
  "clubCount": 5
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is HobbyClubContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<HobbyClubContent>;
  return (
    Array.isArray(c.clubs?.items) &&
    c.clubs.items.length > 0 &&
    Array.isArray(c.about?.aims?.items) &&
    Array.isArray(c.rules?.items)
  );
}

export function useHobbyClubContent(): HobbyClubContent {
  const [content, setContent] = useState<HobbyClubContent>(DEFAULT_HOBBY_CLUB);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/students/hobby-club"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.hobbyClub)) setContent(body.hobbyClub);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
