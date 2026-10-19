import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * The Blogs & Magazine band on the homepage, as edited in the admin panel.
 *
 * The defaults are what the band showed before it had an editor, so it looks
 * the same with the API down.
 */
export interface BlogPostContent {
  title: string;
  subtitle: string;
  category: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string[];
}

export interface MagazineIssueContent {
  title: string;
  edition: string;
  year: string;
  coverImage: string;
  description: string;
  highlights: string[];
  totalPages: number;
  /** Empty hides the download button. */
  pdfUrl: string;
  /** Empty hides the flipbook button. */
  flipbookUrl: string;
  /** This edition's own wording, in place of the band's line of the same name. Missing means the band's line. */
  volumeLabel?: string;
  pagesLabel?: string;
  highlightsLabel?: string;
  previewLabel?: string;
  downloadLabel?: string;
  flipbookLabel?: string;
}

/** The band's fixed wording, edited in the panel. */
export interface BlogsLabels {
  searchPlaceholder: string;
  readLabel: string;
  noArticles: string;
  shareLabel: string;
  shareCopiedMessage: string;
  editorialLabel: string;
  articleFooter: string;
  volumeLabel: string;
  pagesLabel: string;
  highlightsLabel: string;
  previewLabel: string;
  downloadLabel: string;
  flipbookLabel: string;
  noEditions: string;
}

export interface BlogsContent {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  /** `**bold**` is the only markup. */
  intro: string;
  blogs: { title: string; kicker: string; text: string; allLabel: string; categories: string[]; posts: BlogPostContent[] };
  magazine: { title: string; kicker: string; text: string; issues: MagazineIssueContent[] };
  labels: BlogsLabels;
}

export const DEFAULT_BLOGS_LABELS: BlogsLabels = {
  searchPlaceholder: "Search articles, sports or authors...",
  readLabel: "Read",
  noArticles: "No articles to show.",
  shareLabel: "Share Article",
  shareCopiedMessage: "Article link copied to clipboard!",
  editorialLabel: "Editorial Division",
  articleFooter: "CKPIPSR",
  volumeLabel: "Vol.",
  pagesLabel: "Pages",
  highlightsLabel: "Highlights:",
  previewLabel: "Preview Flipbook",
  downloadLabel: "Download PDF",
  flipbookLabel: "Open Digital Flipbook",
  noEditions: "No editions to show.",
};

export const DEFAULT_BLOGS: BlogsContent = {
  "eyebrow": "Collegiate Publications & Editorial",
  "headingLead": "Blogs &",
  "headingAccent": "Campus Magazine",
  "intro": "Explore dedicated editorial sections: read scholarly articles and campus chronicles in **Pharma Blogs**, or browse our annual editions in **The College Newsletter**.",
  "blogs": {
    "title": "Pharma Blogs",
    "kicker": "Section 1 • Articles & Insights",
    "text": "Curated academic insights, pharmaceutical formulations, student research essays, sports chronicles, and campus life stories.",
    "allLabel": "All",
    "categories": [
      "Tech & AI",
      "Business & Finance",
      "Sports",
      "Campus Life",
      "Research & Innovation"
    ],
    "posts": [
      {
        "title": "Computational Pharmaceutics: How AI is Reshaping Drug Discovery",
        "subtitle": "An analysis by the Pharmaceutical Science & Research Guild",
        "category": "Research & Innovation",
        "authorName": "Dr. Smita Sen",
        "authorRole": "Head of Pharmaceutics",
        "authorAvatar": "/media/unsplash/photo-1573496359142-b8d87734a5a2-c66be8.jpg",
        "date": "July 18, 2026",
        "readTime": "6 min read",
        "coverImage": "/media/unsplash/photo-1618005182384-a83a8bd57fbe-a1a3b1.jpg",
        "excerpt": "Explore how quantitative modeling, deep learning, and molecular simulation are reinventing pharmaceutical formulation and speed-to-market.",
        "content": [
          "Pharmaceutical engineering is experiencing its most profound transformation since the advent of high-throughput screening. Deep learning models now predict molecular interactions and solubility parameters in seconds.",
          "At CKPIPSR, our students in B.Pharm and M.Pharm programs combine statistical modeling with active lab formulation to simulate drug release under dynamic physiological environments.",
          "Understanding both biochemical reaction pathways and computational pharmaceutics constructs gives our graduates an unparalleled edge in modern clinical and industrial research."
        ]
      },
      {
        "title": "Khel Mahotsav 2026: CKPIPSR Athletes Secure Regional Championship Trophies",
        "subtitle": "Victories across athletics, badminton & table tennis",
        "category": "Sports",
        "authorName": "Vikram Singh",
        "authorRole": "Sports Committee Coordinator",
        "authorAvatar": "/media/unsplash/photo-1500648767791-00dcc994a43e-97928c.jpg",
        "date": "July 14, 2026",
        "readTime": "4 min read",
        "coverImage": "/media/unsplash/photo-1461896836934-ffe607ba8211-e15f93.jpg",
        "excerpt": "CKPIPSR students dominated track and court events at VNSGU Inter-College Games, claiming 8 gold medals and overall team honors.",
        "content": [
          "This year’s annual sports fiesta showcased unparalleled athletic prowess. Our collegiate track team shattered three longstanding VNSGU meet records in the 400m relay and long jump.",
          "Dedicated coaching, daily morning practice sessions, and state-of-the-art gymkhana equipment played a decisive role in powering our athletes to victory.",
          "Congratulations to all student participants who represented the college with discipline and enthusiasm."
        ]
      },
      {
        "title": "Nanotechnology in Modern Drug Delivery: Active Formulations in 2026",
        "subtitle": "Behind the lab coats with Pharm.D and B.Pharm Research Teams",
        "category": "Research & Innovation",
        "authorName": "Prof. Rohan Patel",
        "authorRole": "Lead Mentor, Pharmaceutics Department",
        "authorAvatar": "/media/unsplash/photo-1534528741775-53994a69daeb-4f9d37.jpg",
        "date": "July 10, 2026",
        "readTime": "5 min read",
        "coverImage": "/media/unsplash/photo-1558494949-ef010cbdcc31-2b6141.jpg",
        "excerpt": "How student formulation scientists architected highly targeted bio-compatible liposomes for advanced therapy delivery.",
        "content": [
          "Modern therapeutic protocols demand target-specific drug delivery. In this year’s annual research showcase, our student teams synthesized bio-compatible nanoparticle vectors for cancer therapeutics.",
          "Key formulation highlights include steady-state in-vitro dissolution profiling and microscopic particle size distribution metrics."
        ]
      },
      {
        "title": "Inter-College Cricket Jubilee: Tactical Victories on the Dumas Pitch",
        "subtitle": "Highlighting our Cricket Squad’s undefeated tournament run",
        "category": "Sports",
        "authorName": "Karan Sharma",
        "authorRole": "Sports Captain",
        "authorAvatar": "/media/unsplash/photo-1507003211169-0a1dd7228f2d-bd5e12.jpg",
        "date": "July 02, 2026",
        "readTime": "5 min read",
        "coverImage": "/media/unsplash/photo-1531415074968-036ba1b575da-a29dfe.jpg",
        "excerpt": "A play-by-play analysis of how disciplined bowling and clutch batting partnerships sealed the championship cup.",
        "content": [
          "The finals of the Surat Inter-College Cricket League delivered edge-of-the-seat drama. Needing 18 runs off the final two overs, our middle-order batsmen held their nerve against formidable spin bowling.",
          "Sports at CKPIPSR cultivate teamwork, resilience, and strategic thinking under pressure: traits essential for both corporate boardrooms and cricket pitches."
        ]
      },
      {
        "title": "Sustainable Entrepreneurship: Navigating Seed Funding & Incubators",
        "subtitle": "Insights from the SSIP Entrepreneurship Cell",
        "category": "Business & Finance",
        "authorName": "Ananya Mehta",
        "authorRole": "Pharmacy Innovation Cell Lead",
        "authorAvatar": "/media/unsplash/photo-1580489944761-15a19d654956-757cf7.jpg",
        "date": "June 28, 2026",
        "readTime": "4 min read",
        "coverImage": "/media/unsplash/photo-1556761175-5973dc0f32e7-1ab9a7.jpg",
        "excerpt": "A practical roadmap for student founders leveraging SSIP Gujarat grants and regional angel investor networks.",
        "content": [
          "Starting a business while completing an undergraduate degree is no longer a pipedream. With dedicated incubation hubs and seed capital support, student entrepreneurs are validating ideas directly in the marketplace.",
          "Our recent business plan hackathon saw 12 student startups receive initial mentorship grants."
        ]
      },
      {
        "title": "Life at CKPIPSR: Cultural Jubilees, Sports Triumphs & Vibrant Campus Guilds",
        "subtitle": "A retrospective on student experiences and annual festivals",
        "category": "Campus Life",
        "authorName": "Karan Sharma",
        "authorRole": "Cultural Secretary",
        "authorAvatar": "/media/unsplash/photo-1507003211169-0a1dd7228f2d-bd5e12.jpg",
        "date": "June 15, 2026",
        "readTime": "4 min read",
        "coverImage": "/media/unsplash/photo-1523580494863-6f3031224c94-777a98.jpg",
        "excerpt": "Relive the energy of Inferno 2026, inter-college athletic championships, and student art collectives.",
        "content": [
          "Campus life at CKPIPSR extends far beyond the lecture hall. From night music galas to competitive cricket leagues and scientific quiz bowls, our student community thrives on creative expression."
        ]
      }
    ]
  },
  "magazine": {
    "title": "The College Newsletter",
    "kicker": "Section 2 • Campus Magazine & Publications",
    "text": "Flagship annual campus magazines, research digests, and institutional chronicles documenting milestones, honors, and student achievements.",
    "issues": [
      {
        "title": "VANGUARD 2026",
        "edition": "Annual Institutional Edition",
        "year": "2026",
        "coverImage": "/media/unsplash/photo-1544716278-ca5e3f4abd8c-023bcb.jpg",
        "description": "The definitive annual magazine capturing student research, creative literature, alumni milestones, and academic accolades across all departments.",
        "highlights": [
          "Special Feature: Healthcare Ethics in Pharmacy Practice",
          "Student Spotlight: 10 Breakout Innovations of 2026",
          "Photo Essay: Cultural Extravaganza & Khel Mahotsav",
          "Dean’s Address & Departmental Year in Review"
        ],
        "totalPages": 84,
        "pdfUrl": "",
        "flipbookUrl": ""
      },
      {
        "title": "THE PHARMA & RESEARCH GAZETTE",
        "edition": "Winter Edition",
        "year": "2025",
        "coverImage": "/media/unsplash/photo-1512820790803-83ca734da794-a70614.jpg",
        "description": "A special biannual edition focusing on pharmaceutical technology innovations, eco-friendly research practices, and faculty publications.",
        "highlights": [
          "Emerging Trends in Global Vaccine Formulation",
          "Faculty Research: Sustainable Synthesis in Gujarat Labs",
          "Campus Photography Winners"
        ],
        "totalPages": 62,
        "pdfUrl": "",
        "flipbookUrl": ""
      }
    ]
  },
  labels: DEFAULT_BLOGS_LABELS,
};

function isUsable(value: unknown): value is BlogsContent {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<BlogsContent>;
  return (
    typeof v.headingLead === "string" &&
    Array.isArray(v.blogs?.categories) &&
    Array.isArray(v.blogs?.posts) &&
    v.blogs.posts.every((p) => Array.isArray(p?.content)) &&
    Array.isArray(v.magazine?.issues) &&
    v.magazine.issues.every((m) => Array.isArray(m?.highlights))
  );
}

export function useBlogsContent(): BlogsContent {
  const [content, setContent] = useState<BlogsContent>(DEFAULT_BLOGS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/home/blogs"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (!isUsable(body.blogs)) return;
        // Content published before the wording and the edition links existed lacks them;
        // an empty line, or a missing link, falls back to the wording shipped here, or no button.
        const labels: Partial<BlogsLabels> = body.blogs.labels ?? {};
        setContent({
          ...body.blogs,
          magazine: {
            ...body.blogs.magazine,
            issues: body.blogs.magazine.issues.map((m) => ({ ...m, pdfUrl: m.pdfUrl ?? "", flipbookUrl: m.flipbookUrl ?? "" })),
          },
          labels: Object.fromEntries(
            (Object.keys(DEFAULT_BLOGS_LABELS) as (keyof BlogsLabels)[]).map((k) => [k, labels[k] || DEFAULT_BLOGS_LABELS[k]]),
          ) as unknown as BlogsLabels,
        });
      })
      // The band does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
