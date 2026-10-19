import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";
import campusMapImage from "../assets/images/campus_map.jpg";

/**
 * About Us, Campus Map, as edited in the admin panel. The embedded map comes
 * from the Contact Us page.
 *
 * The defaults are what the page showed before it had an editor, so it looks
 * the same with the API down.
 */
export interface CampusZone {
  tab: string;
  title: string;
  /** Names an icon. See CAMPUS_MAP_ICONS in the Campus Map page. */
  icon: string;
  description: string;
  facilities: string[];
}

export interface CampusRoute {
  mode: string;
  icon: string;
  time: string;
  detail: string;
}

export interface CampusMapContent {
  pageTitle: string;
  pageSubtitle: string;
  intro: { badge: string; heading: string; body: string; mapsLabel: string; mapsUrl: string; addressLine: string };
  layout: { title: string; text: string; image: string; buttonLabel: string };
  satellite: { title: string; text: string; badge: string };
  zones: { title: string; text: string; allLabel: string; items: CampusZone[] };
  travel: { title: string; text: string; items: CampusRoute[] };
  visitor: { badge: string; title: string; body: string; buttonLabel: string };
  /** From the Contact Us page. */
  mapEmbedUrl: string;
  /** The number the call button rings, typed in the Visitors box. */
  phone: string;
}

export const DEFAULT_CAMPUS_MAP: CampusMapContent = {
  "pageTitle": "Campus Map & Location",
  "pageSubtitle": "Explore our sprawling educational complex located on Surat-Dumas Road opposite Surat Airport.",
  "intro": {
    "badge": "Surat-Dumas Road Campus",
    "heading": "100-Acre Lush Green Educational Complex",
    "body": "Situated in the clean, green coastal belt of Dumas, Surat, C. K. Pithawalla Institute of Pharmaceutical Science & Research offers a world-class environment with modern academic blocks, advanced engineering workshops, digital library facilities, and peaceful residential quarters.",
    "mapsLabel": "Navigate via Google Maps",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=C.+K.+Pithawalla+Institute+of+Pharmaceutical+Science+and+Research+Surat",
    "addressLine": "Near Gujarat Maritime Board, Via Magdalla Port, Surat - 395007"
  },
  "layout": {
    "title": "CKPIPSR Campus Layout & Facilities",
    "text": "Geographical map showing location of academic departments, laboratories, library, hostels, and sports grounds.",
    "image": campusMapImage,
    "buttonLabel": "View Full Campus View"
  },
  "satellite": {
    "title": "Interactive Satellite Location",
    "text": "Explore real-time directions, surrounding landmarks, and transit options on Google Maps.",
    "badge": "Surat-Dumas Road (Opp. Airport)"
  },
  "zones": {
    "title": "Key Campus Zones & Facilities",
    "text": "Structured layout of departments, laboratories, hostels, and sports infrastructure.",
    "allLabel": "All Zones",
    "items": [
      {
        "tab": "Academic",
        "title": "Academic & Laboratory Blocks",
        "icon": "Building2",
        "description": "State-of-the-art department blocks housing lecture halls, high-tech pharmaceutical science laboratories, and research units.",
        "facilities": [
          "Main Administrative & Academic Building",
          "Pharmaceutics & Formulation Research Labs",
          "Pharmaceutical Chemistry & Synthesis Laboratory",
          "Pharmacology & Animal Simulation (CAL) Lab",
          "Pharmacognosy & Phytochemistry Research Wing",
          "Central Instrumentation Room (HPLC, FTIR, UV-Vis)"
        ]
      },
      {
        "tab": "Central",
        "title": "Central Facilities & Research",
        "icon": "BookOpen",
        "description": "Core institutional resources supporting academic research, digital learning, and institute administration.",
        "facilities": [
          "Central Pharmacy Library with Digital E-Resources",
          "Computer Center & High-Speed Wi-Fi Research Hub",
          "Air-Conditioned Central Seminar Hall (Auditorium)",
          "Student Startup & Innovation Policy (SSIP) Cell",
          "Institutional Innovation Council (IIC) Ideation Room",
          "Training & Placement Cell Office"
        ]
      },
      {
        "tab": "Amenities",
        "title": "Student Life & Amenities",
        "icon": "Coffee",
        "description": "Vibrant spaces dedicated to recreation, sports, dining, and overall student wellness.",
        "facilities": [
          "Medicinal Plants Botanical Garden",
          "Hygienic Multi-Cuisine Student Cafeteria",
          "Cricket & Sports Playing Grounds",
          "Volleyball & Badminton Courts",
          "Indoor Sports Arena (Table Tennis, Chess, Carrom)",
          "First-Aid Medical & Health Observation Center"
        ]
      },
      {
        "tab": "Hostels",
        "title": "Hostels & Residential Complex",
        "icon": "Home",
        "description": "Safe, comfortable, and well-equipped residential quarters for students, faculty, and visiting scholars.",
        "facilities": [
          "In-Campus Boys Hostel Complex",
          "Secure Girls Hostel Complex with 24/7 Warden",
          "Faculty & Staff Residential Quarters",
          "Institutional Guest House for Visiting Scholars",
          "Solar Water Heating & RO Drinking Water Stations",
          "Campus Security Control & CCTV Surveillance"
        ]
      }
    ]
  },
  "travel": {
    "title": "How to Reach the Campus",
    "text": "Convenient connectivity from Surat railway junction and city bus transit hubs.",
    "items": [
      {
        "mode": "By Train (Surat Railway Station)",
        "icon": "Train",
        "time": "30-35 Mins (~15 km)",
        "detail": "Surat Railway Junction (ST) connects to all major Indian cities. Direct city buses, auto-rickshaws, and cab services operate frequently to Dumas Road."
      },
      {
        "mode": "By City Bus / BRTS Transit",
        "icon": "Bus",
        "time": "Direct Connectivity",
        "detail": "Surat City Bus and BRTS routes have dedicated stops directly at the C. K. Pithawalla Educational Complex gate on Dumas Road."
      }
    ]
  },
  "visitor": {
    "badge": "Visitor Entry & Campus Timings",
    "title": "Campus Operating Hours & Security Registration",
    "body": "Visitors, parents, and alumni may enter the campus after registering at the main security gate. Official visiting hours are Monday to Saturday, 09:30 AM – 05:00 PM (2nd and 4th Saturday off).",
    "buttonLabel": "Contact Security / Reception"
  },
  "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5923.654116328731!2d72.71618443860855!3d21.13191122833264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be052ae998fda3d%3A0x23340ab807f12d7!2sC.K.%20Pthawalla%20Institute%20of%20Pharmaceutical%20Science%20and%20Research!5e0!3m2!1sen!2sin!4v1679122645038!5m2!1sen!2sin",
  "phone": "+91 63550 65636"
};

function isUsable(value: unknown): value is CampusMapContent {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<CampusMapContent>;
  return (
    typeof v.intro?.body === "string" &&
    typeof v.layout?.image === "string" &&
    Array.isArray(v.zones?.items) &&
    v.zones.items.length > 0 &&
    v.zones.items.every((z) => Array.isArray(z?.facilities)) &&
    Array.isArray(v.travel?.items) &&
    typeof v.visitor?.body === "string"
  );
}

export function useCampusMapContent(): CampusMapContent {
  const [content, setContent] = useState<CampusMapContent>(DEFAULT_CAMPUS_MAP);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/about/campus-map"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body || !isUsable(body.campusMap)) return;
        const live = body.campusMap as CampusMapContent;
        // Nothing published for either yet: keep the map and phone shipped with the site.
        setContent({
          ...live,
          mapEmbedUrl: live.mapEmbedUrl || DEFAULT_CAMPUS_MAP.mapEmbedUrl,
          phone: live.phone || DEFAULT_CAMPUS_MAP.phone,
        });
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
