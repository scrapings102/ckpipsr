import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Academics, Resources: the overview page with a tile for each campus
 * resource, as edited in the admin panel.
 *
 * The defaults are what the page showed before it had an editor, so it looks
 * the same with the API down.
 */
export interface ResourceTile {
  title: string;
  description: string;
  path: string;
  /** Names an icon. See RESOURCE_ICONS in the Resources page. */
  icon: string;
  /** A Tailwind gradient pair, such as "from-blue-600 to-indigo-600". */
  color: string;
}

export interface ResourceButton {
  label: string;
  /** Empty leaves the button without a link, as it always was. */
  url: string;
}

export interface ResourcesOverviewContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: { eyebrow: string; heading: string; body: string };
  tileLinkLabel: string;
  tiles: ResourceTile[];
  cta: { heading: string; body: string; image: string; tags: string[]; primary: ResourceButton; secondary: ResourceButton };
}

export const DEFAULT_RESOURCES_OVERVIEW: ResourcesOverviewContent = {
  "pageTitle": "Campus Resources",
  "pageSubtitle": "Comprehensive infrastructure designed to support a holistic academic experience.",
  "intro": {
    "eyebrow": "World-Class Infrastructure",
    "heading": "Campus Facilities & Infrastructure",
    "body": "CKPIPSR provides a research-oriented atmosphere with modern laboratories, a well-stocked library, and advanced facilities that create an ideal environment for future healthcare leaders."
  },
  "tileLinkLabel": "View Facility",
  "tiles": [
    {
      "title": "Laboratories",
      "description": "PCI-approved specialized labs for pharmaceutics, pharmacology, and research.",
      "path": "/academics/resources-laboratories",
      "icon": "Beaker",
      "color": "from-blue-600 to-indigo-600"
    },
    {
      "title": "Library",
      "description": "Digital-ready knowledge hub with 7500+ books and global journal access.",
      "path": "/academics/resources-library",
      "icon": "BookOpen",
      "color": "from-emerald-600 to-teal-600"
    },
    {
      "title": "Sports",
      "description": "Extensive grounds for cricket, football, and indoor sports facilities.",
      "path": "/academics/resources-sports",
      "icon": "Trophy",
      "color": "from-orange-600 to-red-600"
    },
    {
      "title": "Hostel",
      "description": "Safe and modern residential facilities for boys and girls with 24/7 security.",
      "path": "/academics/resources-hostel",
      "icon": "Home",
      "color": "from-purple-600 to-pink-600"
    },
    {
      "title": "Medical",
      "description": "On-campus healthcare center providing immediate medical aid and diagnostics.",
      "path": "/academics/resources-medical",
      "icon": "HeartPulse",
      "color": "from-red-600 to-rose-600"
    },
    {
      "title": "Transportation",
      "description": "Excellent city-wide connectivity via BRTS and dedicated college bus services.",
      "path": "/academics/resources-transportation",
      "icon": "Bus",
      "color": "from-amber-600 to-yellow-600"
    },
    {
      "title": "Seminar Hall",
      "description": "200-capacity AC hall equipped with modern audio-visual conferencing tools.",
      "path": "/academics/resources-seminar-hall",
      "icon": "Mic2",
      "color": "from-indigo-600 to-blue-600"
    },
    {
      "title": "Cafeteria",
      "description": "Hygienic vegetarian dining space offering a variety of nutritious cuisines.",
      "path": "/academics/resources-cafeteria",
      "icon": "Coffee",
      "color": "from-rose-600 to-orange-600"
    },
    {
      "title": "Central Facilities",
      "description": "Centers for language proficiency, personality development, and stationary.",
      "path": "/academics/resources-central-facilities",
      "icon": "Cpu",
      "color": "from-slate-600 to-slate-800"
    },
    {
      "title": "EV Charging",
      "description": "Sustainable energy infrastructure supporting eco-friendly campus transportation.",
      "path": "/academics/resources-ev-charging-station",
      "icon": "Zap",
      "color": "from-cyan-600 to-blue-600"
    },
    {
      "title": "Medicinal Garden",
      "description": "Vast collection of aromatic and medicinal plants for practical research.",
      "path": "/academics/resources-medicinal-garden",
      "icon": "Leaf",
      "color": "from-green-600 to-emerald-600"
    }
  ],
  "cta": {
    "heading": "Experience CKPIPSR in Person",
    "body": "We invite prospective students and parents to visit our campus and explore these world-class facilities first-hand.",
    "image": "/images/hero/college_campus.jpg",
    "tags": [
      "Modern Architecture",
      "Safety Protocols",
      "Eco-Friendly Campus"
    ],
    "primary": {
      "label": "Schedule a Campus Tour",
      "url": ""
    },
    "secondary": {
      "label": "Virtual Campus Tour",
      "url": ""
    }
  }
};

function isUsable(value: unknown): value is ResourcesOverviewContent {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<ResourcesOverviewContent>;
  return (
    typeof v.intro?.heading === "string" &&
    Array.isArray(v.tiles) &&
    v.tiles.length > 0 &&
    Array.isArray(v.cta?.tags) &&
    typeof v.cta?.primary?.label === "string"
  );
}

export function useResourcesOverviewContent(): ResourcesOverviewContent {
  const [content, setContent] = useState<ResourcesOverviewContent>(DEFAULT_RESOURCES_OVERVIEW);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/academics/resources-overview"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.resourcesOverview)) setContent(body.resourcesOverview);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
