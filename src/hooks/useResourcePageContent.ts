import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * A Resources page — Library, Sports and the other campus facilities that
 * share one layout.
 *
 * One hook for all of them: they differ only in which section they read and
 * what they shipped with, which stays the fallback so a page still renders if
 * the API is down.
 */
export interface ResourcePageContent {
  pageTitle: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  detailsHeading: string;
  details: string[];
  /** The photo archive under the details. */
  gallery: string[];
  /** Only Central Facilities has one; empty fields leave the box off. */
  note?: { heading: string; body: string };
}

export const DEFAULT_CENTRAL_FACILITIES: ResourcePageContent = {
  pageTitle: "Central Facilities",
  badge: "Campus Facility",
  title: "Central Facilities",
  description: "Specialized centers for language, personality, and essential utilities.",
  image: "/images/hero/66e151f0d6a90.webp",
  features: [
    "Language Lab",
    "Personality Development Cell",
    "Stationery Store",
    "Photocopy Services"
  ],
  detailsHeading: "Key Infrastructure Details",
  details: [
    "Dedicated language proficiency lab for communication skills training",
    "Personality development and soft-skills training sessions",
    "On-campus stationery store for academic essentials",
    "Photocopy and printing services available for students",
    "Centralized notice boards and student information kiosks",
    "Placement cell offering career counseling and interview prep",
    "Bank and ATM facility for financial convenience",
    "Common utility rooms for administrative and student services"
  ],
  note: {
    heading: "On-Campus Store & Amenities",
    body: "For the convenience of students, a stationary store has been set-up within the campus. All the daily utility items like stationery, cosmetics, record files, and textbooks are available in the stationary store. This helps the students to procure all their stationery requirements within the campus at reasonable rates."
  },
  gallery: [
    "https://ckpipsr.ac.in/images/resources/central/clp.jpg"
  ]
};

export const DEFAULT_LIBRARY: ResourcePageContent = {
  pageTitle: "Library",
  badge: "Campus Facility",
  title: "Central Library",
  description: "A silent sanctuary of knowledge with thousands of volumes and digital resources.",
  image: "/images/hero/65efeac7d49a3.webp",
  features: [
    "7500+ Books",
    "400+ Journals",
    "Digital Library",
    "DELNET Access"
  ],
  detailsHeading: "Key Infrastructure Details",
  details: [
    "Enriched with latest Pharmacy collection covering all specializations",
    "Access to national & international peer-reviewed journals",
    "State-of-the-art digital information retrieval system",
    "E-media resources, CDs, and reference DVDs",
    "Spacious, silent reading area with individual study carrels",
    "Subscription to major online pharmaceutical databases",
    "Inter-library loan facility via DELNET network",
    "Dedicated reference section for competitive exam preparation"
  ],
  gallery: [
    "https://ckpipsr.ac.in/images/resources/library/1.jpg",
    "https://ckpipsr.ac.in/images/resources/library/2.jpg",
    "https://ckpipsr.ac.in/images/resources/library/3.jpg",
    "https://ckpipsr.ac.in/images/resources/library/4.jpg"
  ]
};

export const DEFAULT_SPORTS: ResourcePageContent = {
  pageTitle: "Sports",
  badge: "Campus Facility",
  title: "Sports & Fitness",
  description: "Fostering physical health and team spirit through comprehensive sports infrastructure.",
  image: "/images/hero/college_campus.jpg",
  features: [
    "Cricket Ground",
    "Indoor Games",
    "Table Tennis",
    "Annual Sports Meet"
  ],
  detailsHeading: "Key Infrastructure Details",
  details: [
    "Cricket ground spanning approximately 18,000 sq ft",
    "Multiple volleyball courts for team practice",
    "Dedicated kabaddi ground for traditional sports",
    "Table-tennis facility located in D2 Building",
    "Full-size badminton courts with proper flooring",
    "Carrom and chess facilities for indoor recreation",
    "Annual inter-departmental sports meet and tournaments",
    "Qualified sports coordinators for training and events"
  ],
  gallery: []
};

export const DEFAULT_HOSTEL: ResourcePageContent = {
  pageTitle: "Hostel",
  badge: "Campus Facility",
  title: "Residential Life",
  description: "Safe, comfortable, and hygienic residential facilities for boys and girls.",
  image: "/images/hero/66e154b724ef6 (1).webp",
  features: [
    "Separate Boys & Girls Wings",
    "24/7 Security",
    "Furnished Rooms",
    "Mess Facility"
  ],
  detailsHeading: "Key Infrastructure Details",
  details: [
    "Separate, secure residential blocks for male and female students",
    "Round-the-clock security personnel and CCTV surveillance",
    "Furnished rooms with study tables, beds, and storage",
    "Hygienic mess facility with nutritious vegetarian meals",
    "24/7 water and power backup supply",
    "Common recreation room with television and indoor games",
    "High-speed Wi-Fi connectivity throughout hostel premises",
    "Resident warden available for student welfare and discipline"
  ],
  gallery: [
    "https://ckpipsr.ac.in/images/resources/hostel/02.jpg",
    "https://ckpipsr.ac.in/images/resources/hostel/03.jpg",
    "https://ckpipsr.ac.in/images/resources/hostel/04.jpg",
    "https://ckpipsr.ac.in/images/resources/hostel/05.jpg",
    "https://ckpipsr.ac.in/images/resources/hostel/06.jpg",
    "https://ckpipsr.ac.in/images/resources/hostel/07.jpeg",
    "https://ckpipsr.ac.in/images/resources/hostel/08.jpeg"
  ]
};

export const DEFAULT_MEDICAL: ResourcePageContent = {
  pageTitle: "Medical Center",
  badge: "Campus Facility",
  title: "Medical Center",
  description: "Ensuring student and staff wellness through immediate on-campus medical aid.",
  image: "/images/hero/66e153e687221.webp",
  features: [
    "On-Campus Clinic",
    "First Aid Trained Staff",
    "Tie-up Hospitals",
    "Health Check-ups"
  ],
  detailsHeading: "Key Infrastructure Details",
  details: [
    "On-campus medical room for immediate first aid and consultation",
    "Trained nursing staff available during college hours",
    "Tie-up arrangements with nearby hospitals for emergencies",
    "Periodic health check-up camps for students and staff",
    "Awareness sessions on hygiene, wellness, and mental health",
    "Ambulance on-call facility for medical emergencies",
    "First-aid kits stationed across all academic blocks",
    "Confidential counseling support for student wellbeing"
  ],
  gallery: [
    "https://ckpipsr.ac.in/images/resources/medical/01.jpg",
    "https://ckpipsr.ac.in/images/resources/medical/02.jpg",
    "https://ckpipsr.ac.in/images/resources/medical/03.jpg",
    "https://ckpipsr.ac.in/images/resources/medical/04.jpg",
    "https://ckpipsr.ac.in/images/resources/medical/05.jpg",
    "https://ckpipsr.ac.in/images/resources/medical/06.jpg",
    "https://ckpipsr.ac.in/images/resources/medical/07.jpg"
  ]
};

export const DEFAULT_TRANSPORTATION: ResourcePageContent = {
  pageTitle: "Transportation",
  badge: "Campus Facility",
  title: "Transportation",
  description: "Excellent connectivity to Surat city via public and dedicated transport systems.",
  image: "/images/hero/66e1522d09fc0.webp",
  features: [
    "BRTS Connectivity",
    "College Bus Service",
    "Well-Connected Roads",
    "Parking Facility"
  ],
  detailsHeading: "Key Infrastructure Details",
  details: [
    "Direct connectivity via Surat's BRTS (Bus Rapid Transit System)",
    "Dedicated college bus service covering major city routes",
    "Located on Surat-Dumas Road with excellent road connectivity",
    "Ample two-wheeler and four-wheeler parking on campus",
    "Auto-rickshaw and cab availability just outside campus",
    "Safe pick-up and drop points for hostel and day-scholar students",
    "Proximity to Surat Airport and Surat Railway Station",
    "Well-lit internal campus roads for pedestrian safety"
  ],
  gallery: [
    "https://ckpipsr.ac.in/images/resources/transportation/brts-map.jpg",
    "https://ckpipsr.ac.in/images/resources/transportation/bus.jpeg",
    "https://ckpipsr.ac.in/images/resources/transportation/colbus.jpeg",
    "https://ckpipsr.ac.in/images/resources/transportation/coltiming.jpeg",
    "https://ckpipsr.ac.in/images/resources/transportation/timing.jpg"
  ]
};

export const DEFAULT_SEMINAR_HALL: ResourcePageContent = {
  pageTitle: "Seminar Hall",
  badge: "Campus Facility",
  title: "Seminar Hall",
  description: "Spacious, air-conditioned venue for academic discourse and cultural events.",
  image: "/images/hero/65efea4943a49.webp",
  features: [
    "200-Seat Capacity",
    "AC Hall",
    "AV Conferencing",
    "Guest Lecture Venue"
  ],
  detailsHeading: "Key Infrastructure Details",
  details: [
    "Air-conditioned seminar hall with a seating capacity of 200",
    "Modern audio-visual conferencing and projection systems",
    "Regular venue for guest lectures by industry experts",
    "Hosts national and state-level seminars and workshops",
    "Equipped with wireless microphone and sound systems",
    "Used for faculty development programs and orientation sessions",
    "Backup power supply to ensure uninterrupted sessions",
    "Comfortable tiered seating for optimal visibility"
  ],
  gallery: [
    "https://ckpipsr.ac.in/images/resources/seminar-hall/1.jpg",
    "https://ckpipsr.ac.in/images/resources/seminar-hall/2.jpg",
    "https://ckpipsr.ac.in/images/resources/seminar-hall/3.jpg",
    "https://ckpipsr.ac.in/images/resources/seminar-hall/4.jpg",
    "https://ckpipsr.ac.in/images/resources/seminar-hall/5.jpg",
    "https://ckpipsr.ac.in/images/resources/seminar-hall/6.jpg"
  ]
};

export const DEFAULT_CAFETERIA: ResourcePageContent = {
  pageTitle: "Cafeteria",
  badge: "Campus Facility",
  title: "Cafeteria",
  description: "Hygienic and aesthetic dining space offering a variety of nutritious meals.",
  image: "/images/hero/66e154b724ef6.webp",
  features: [
    "Hygienic Vegetarian Menu",
    "Affordable Pricing",
    "Spacious Seating",
    "Fresh Daily Meals"
  ],
  detailsHeading: "Key Infrastructure Details",
  details: [
    "Hygienic, purely vegetarian dining space for students and staff",
    "Wide variety of nutritious and affordable meal options",
    "Fresh snacks, beverages, and full meals prepared daily",
    "Spacious indoor and outdoor seating arrangements",
    "Clean drinking water stations throughout the premises",
    "Special menu options during festivals and college events",
    "Trained kitchen staff following strict hygiene protocols",
    "Convenient location adjacent to main academic blocks"
  ],
  gallery: [
    "https://ckpipsr.ac.in/images/resources/cafeteria/1.jpeg",
    "https://ckpipsr.ac.in/images/resources/cafeteria/2.jpeg",
    "https://ckpipsr.ac.in/images/resources/cafeteria/3.jpeg",
    "https://ckpipsr.ac.in/images/resources/cafeteria/4.jpeg",
    "https://ckpipsr.ac.in/images/resources/cafeteria/5.jpeg",
    "https://ckpipsr.ac.in/images/resources/cafeteria/6.jpeg"
  ]
};

export const DEFAULT_EV_CHARGING: ResourcePageContent = {
  pageTitle: "EV Charging",
  badge: "Campus Facility",
  title: "EV Charging Station",
  description: "Promoting sustainable transportation and green energy on campus.",
  image: "/images/hero/pharmacy_lab.jpg",
  features: [
    "Eco-Friendly Infrastructure",
    "Fast Charging",
    "Free for Students",
    "Sustainable Campus Initiative"
  ],
  detailsHeading: "Key Infrastructure Details",
  details: [
    "Dedicated EV charging points supporting sustainable transportation",
    "Fast-charging capability for two-wheelers and four-wheelers",
    "Free access for students and staff commuting via electric vehicles",
    "Part of the institute's broader green-campus sustainability initiative",
    "Solar-assisted power supply reducing carbon footprint",
    "Well-marked, covered parking bays for electric vehicles",
    "Regular maintenance ensuring consistent charging availability",
    "Encourages eco-conscious commuting among the campus community"
  ],
  gallery: [
    "https://ckpipsr.ac.in/images/resources/echarging.jpg"
  ]
};

export const DEFAULT_MEDICINAL_GARDEN: ResourcePageContent = {
  pageTitle: "Medicinal Garden",
  badge: "Campus Facility",
  title: "Medicinal Garden",
  description: "A living laboratory of botanical biodiversity and therapeutic flora.",
  image: "/images/hero/66e15283951b9.webp",
  features: [
    "500+ Medicinal Plants",
    "Practical Research Site",
    "Herbarium",
    "Pharmacognosy Training"
  ],
  detailsHeading: "Key Infrastructure Details",
  details: [
    "Vast collection of over 500 aromatic and medicinal plant species",
    "Dedicated site for practical pharmacognosy training and research",
    "Well-maintained herbarium for botanical specimen study",
    "Labeled plant beds organized by therapeutic classification",
    "Used extensively for undergraduate and postgraduate research projects",
    "Supports student projects on traditional and herbal medicine",
    "Guided garden tours as part of academic orientation",
    "Contributes to conservation of native medicinal flora"
  ],
  gallery: [
    "https://ckpipsr.ac.in/images/resources/garden/garden-1.png",
    "https://ckpipsr.ac.in/images/resources/garden/garden-2.png",
    "https://ckpipsr.ac.in/images/resources/garden/garden-3.png",
    "https://ckpipsr.ac.in/images/resources/garden/garden-4.png"
  ]
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ResourcePageContent {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Partial<ResourcePageContent>;
  return !!p.title && !!p.image && Array.isArray(p.features) && Array.isArray(p.details);
}

export function useResourcePageContent(
  section: string,
  fallback: ResourcePageContent,
): ResourcePageContent {
  const [content, setContent] = useState<ResourcePageContent>(fallback);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview(`/api/pages/academics/${section}`))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body[section])) setContent(body[section]);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [section]);

  return content;
}
