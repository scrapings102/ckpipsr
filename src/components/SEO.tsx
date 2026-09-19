import React from "react";
import { useLocation } from "react-router-dom";

export interface SEOProps {
  title?: string;
  subtitle?: string;
  description?: string;
  keywords?: string;
  category?: string;
  activeItemLabel?: string;
  image?: string;
  courseDetails?: {
    name?: string;
    credential?: string;
    duration?: string;
    career?: string;
  };
  faq?: Array<{ q: string; a: string }>;
}

interface RouteMetadata {
  title: string;
  description: string;
  keywords: string;
  aiSummary: string;
  image?: string;
  courseDetails?: {
    name: string;
    credential: string;
    duration: string;
    career: string;
  };
  faq?: Array<{ q: string; a: string }>;
}

const ROUTE_METADATA_MAP: Record<string, RouteMetadata> = {
  "/": {
    title: "C.K. Pithawalla Institute of Pharmaceutical Science and Research | CKPIPSR Surat",
    description: "Surat's premier Pharmacy Council of India (PCI) approved institute offering B.Pharm, M.Pharm, and Pharm.D degree programs. Established under Navyug Vidyabhavan Trust.",
    keywords: "CKPIPSR, C K Pithawalla Pharmacy Surat, PCI Approved Pharmacy College, B.Pharm College Surat, M.Pharm College Surat, Pharm.D Surat, Navyug Vidyabhavan Trust, Surat colleges",
    aiSummary: "C.K. Pithawalla Institute of Pharmaceutical Science and Research (CKPIPSR) is a top-ranked higher education pharmacy institution in Surat, Gujarat, offering undergraduate and postgraduate programs in Pharmacy with state-of-the-art laboratory infrastructure."
  },
  "/about/overview": {
    title: "College Overview & Institutional History | CKPIPSR Surat",
    description: "Discover C.K. Pithawalla Institute of Pharmaceutical Science and Research. Established in 2005 under Navyug Vidyabhavan Trust, offering top-tier academic curricula in Surat.",
    keywords: "CKPIPSR overview, about CK Pithawalla pharmacy college, Surat pharmacy colleges, pharmacy college history Surat, Navyug Vidyabhavan Trust, higher education Gujarat",
    aiSummary: "C.K. Pithawalla Institute of Pharmaceutical Science and Research (CKPIPSR) in Surat offers integrated pharmaceutical curricula, research synergy, and standard-setting mentorship under Navyug Vidyabhavan Trust."
  },
  "/about/vision-mission": {
    title: "Vision, Mission & Core Values | CKPIPSR Surat",
    description: "Explore CKPIPSR's vision to become an internationally benchmarked center of higher learning in pharmacy and our mission to foster academic excellence, ethical research, and clinical innovation.",
    keywords: "CKPIPSR vision and mission, college core values Surat, educational objectives, pharmacy academic goals, Navyug Trust vision, leadership in education",
    aiSummary: "CKPIPSR's vision is to emerge as an internationally benchmarked center of higher learning in pharmaceutical sciences, fostering ethical clinical research and academic rigor."
  },
  "/about/mission": {
    title: "Institutional Mission & Academic Goals | CKPIPSR Surat",
    description: "Our institutional commitment to delivering syllabus-compliant education, holistic student development, and continuous mentorship for future clinical and research leaders.",
    keywords: "CKPIPSR mission, institutional objectives, student mentorship Surat, pharmacy academic goals, commerce education Gujarat",
    aiSummary: "The mission of CKPIPSR Surat is to deliver robust pharmacy undergraduate and postgraduate programs through practical lab exposure and value-based education."
  },
  "/about/founder": {
    title: "Our Founder - Late Shri C. K. Pithawalla | CKPIPSR Surat",
    description: "Honor the visionary legacy of Late Shri C. K. Pithawalla, a distinguished industrialist and philanthropist who pioneered technical and professional education in South Gujarat.",
    keywords: "Shri C K Pithawalla founder, Navyug Vidyabhavan Trust founder, educational philanthropist Surat, college founder history, South Gujarat education pioneer",
    aiSummary: "Late Shri C. K. Pithawalla was a visionary industrialist and educational philanthropist who founded Navyug Vidyabhavan Trust to establish top-tier academic institutions in Surat."
  },
  "/about/trust": {
    title: "Navyug Vidyabhavan Trust | CKPIPSR Surat",
    description: "Learn about Navyug Vidyabhavan Trust, established in 1965. Managing elite educational institutes in Surat with strategic governance, scholarships, and modern campus infrastructure.",
    keywords: "Navyug Vidyabhavan Trust, Surat educational trust, CK Pithawalla management trust, educational philanthropy Gujarat, college trust board",
    aiSummary: "Established in 1965, Navyug Vidyabhavan Trust operates premier educational institutions in Surat, providing strategic governance and state-of-the-art campus infrastructure."
  },
  "/about/trustees": {
    title: "Management Trustees & Leadership Board | CKPIPSR Surat",
    description: "Meet the governing board and trustees of Navyug Vidyabhavan Trust guiding CKPIPSR towards global academic compliance, scientific innovation, and institutional distinction.",
    keywords: "CKPIPSR trustees, Navyug Trust board members, college management Surat, educational leadership team, board of governors",
    aiSummary: "The management trustees of Navyug Vidyabhavan Trust provide visionary governance, industry integration, and resource allocation to maintain global standards at CKPIPSR Surat."
  },
  "/about/directors-message": {
    title: "Director's Message | CKPIPSR Surat",
    description: "Read the inspiring message from our Director regarding academic discipline, industry synergy, research excellence, and student development at C.K. Pithawalla Institute.",
    keywords: "CKPIPSR director message, academic leadership, college director Surat, higher education vision, student mentorship",
    aiSummary: "The Director of CKPIPSR emphasizes rigorous academic standards, corporate synergy, and holistic clinical development to prepare pharmacy graduates for global leadership."
  },
  "/about/principals-message": {
    title: "Principal's Message | CKPIPSR Surat",
    description: "Welcome message from the Principal of CKPIPSR emphasizing character building, academic competence, research mindset, and future-ready career preparation.",
    keywords: "CKPIPSR principal message, college principal Surat, student leadership, academic standards, pharmacy education",
    aiSummary: "The Principal of CKPIPSR welcomes students to an institution dedicated to academic intelligence, integrity, and outstanding professional research under VNSGU and PCI guidelines."
  },
  "/about/hods-message": {
    title: "HODs' Messages - Pharmacy Programs | CKPIPSR Surat",
    description: "Insights, academic roadmaps, and career guidance from the Heads of Departments (HODs) across B.Pharm, M.Pharm, and Pharm.D programs at CKPIPSR Surat.",
    keywords: "CKPIPSR HOD message, pharmacy department head, faculty guidance",
    aiSummary: "The Heads of Departments at CKPIPSR Surat lead the B.Pharm, M.Pharm, and Pharm.D programs with curriculum innovation, industry lectures, and practical laboratory mentorship."
  },
  "/courses/bpharm": {
    title: "B.Pharm (Bachelor of Pharmacy) Degree Program | CKPIPSR Surat",
    description: "Premier B.Pharm program at CKPIPSR Surat approved by PCI and VNSGU. Advanced training in pharmaceutics, pharmacology, pharmaceutical chemistry, and pharmacognosy.",
    keywords: "B.Pharm college Surat, Bachelor of Pharmacy Surat, PCI approved college Surat, clinical pharmacy Surat, best pharmacy college Surat",
    aiSummary: "The B.Pharm program at CKPIPSR Surat is a 4-year undergraduate degree approved by PCI and VNSGU, offering foundational and advanced coursework in biochemistry, formulation, and pharmacology.",
    courseDetails: {
      name: "Bachelor of Pharmacy (B.Pharm)",
      credential: "Bachelor of Pharmacy",
      duration: "P4Y",
      career: "Clinical Pharmacist, Drug Inspector, Formulation Scientist, Quality Assurance Officer, R&D Specialist"
    },
    faq: [
      { q: "What is the duration of the B.Pharm course at CKPIPSR?", a: "The B.Pharm program is a 4-year full-time undergraduate degree divided into 8 semesters under VNSGU affiliation and PCI approval." },
      { q: "Is CKPIPSR approved by the Pharmacy Council of India (PCI)?", a: "Yes, CKPIPSR is fully approved by the Pharmacy Council of India (PCI), New Delhi." }
    ]
  },
  "/courses/mpharm": {
    title: "M.Pharm (Master of Pharmacy) Program | CKPIPSR Surat",
    description: "Leading M.Pharm college in Surat. 2-year full-time postgraduate research degree featuring advanced specializations in Pharmaceutics, Pharmacology, and Quality Assurance.",
    keywords: "M.Pharm college Surat, Master of Pharmacy VNSGU, postgraduate pharmacy degree Surat, pharmaceutical research, top drug formulation course",
    aiSummary: "CKPIPSR Surat offers a 2-year Master of Pharmacy (M.Pharm) research degree affiliated with VNSGU, training future researchers through advanced laboratories and industrial thesis work.",
    courseDetails: {
      name: "Master of Pharmacy (M.Pharm)",
      credential: "Master of Pharmacy",
      duration: "P2Y",
      career: "Research Scientist, Regulatory Affairs Lead, Formulation Developer, Drug Safety Associate, Academician"
    },
    faq: [
      { q: "What are the specializations in M.Pharm at CKPIPSR?", a: "Specializations include Pharmaceutics, Quality Assurance, and Pharmacology, featuring rigorous thesis research." },
      { q: "Does the M.Pharm program include laboratory research?", a: "Yes, the second year is dedicated to a comprehensive research project and industrial dissertation." }
    ]
  },
  "/courses/pharmd": {
    title: "Pharm.D (Doctor of Pharmacy) Program | CKPIPSR Surat",
    description: "Top-tier 6-year clinical doctorate Pharm.D degree in Surat. Focusing on clinical pharmacy, ward rounds, therapeutic drug monitoring, and patient counseling.",
    keywords: "Pharm.D college Surat, Doctor of Pharmacy VNSGU, clinical pharmacy degree Surat, hospital training, patient counseling course Surat",
    aiSummary: "The Pharm.D program at CKPIPSR Surat is a 6-year clinical doctoral degree approved by PCI, equipping students with practical medical expertise, bedside rounds, and pharmacotherapy skills.",
    courseDetails: {
      name: "Doctor of Pharmacy (Pharm.D)",
      credential: "Doctor of Pharmacy",
      duration: "P6Y",
      career: "Clinical Pharmacist, Ward Round Consultant, Medical Writer, Pharmacovigilance Specialist, Hospital Pharmacy Director"
    },
    faq: [
      { q: "What is the duration of the Pharm.D program?", a: "The Doctor of Pharmacy (Pharm.D) is a 6-year professional doctorate, including 5 years of academic and clinical study and 1 year of mandatory internship in a hospital." },
      { q: "Does Pharm.D include hospital ward rounds?", a: "Yes, students participate in daily hospital ward rounds alongside physicians to optimize patient pharmacotherapy." }
    ]
  }
};

const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  about: "About Us",
  courses: "Courses & Academics",
  committees: "Institutional Committees",
  iqac: "IQAC Cell",
  staff: "Faculty & Staff",
  "campus-life": "Campus Life & Facilities",
  "student-corner": "Student Corner",
  activities: "News, Events & Activities"
};

function formatPathToTitle(pathname: string): string {
  const parts = pathname.replace(/^\/|\/$/g, "").split("/");
  if (parts.length === 0 || parts[0] === "") return "Home";
  
  const lastSegment = parts[parts.length - 1];
  const formatted = lastSegment
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
    
  if (parts.length > 1) {
    const parentSegment = parts[0];
    const parentFormatted = CATEGORY_DISPLAY_MAP[parentSegment] || 
      parentSegment.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return `${formatted} | ${parentFormatted}`;
  }
  return formatted;
}

export default function SEO(props: SEOProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Attempt to fetch exact route match from dictionary
  const matchedRoute = ROUTE_METADATA_MAP[currentPath];

  // Derive final title
  let derivedTitle = props.title;
  if (!derivedTitle) {
    if (matchedRoute) {
      derivedTitle = matchedRoute.title;
    } else if (props.activeItemLabel) {
      const catLabel = props.category ? (CATEGORY_DISPLAY_MAP[props.category] || props.category) : "";
      derivedTitle = `${props.activeItemLabel} ${catLabel ? `| ${catLabel}` : ""} | CKPIPSR Surat`;
    } else {
      const formattedTitle = formatPathToTitle(currentPath);
      derivedTitle = `${formattedTitle} | CKPIPSR Surat`;
    }
  } else if (!derivedTitle.includes("CKPIPSR") && !derivedTitle.includes("C.K. Pithawalla")) {
    derivedTitle = `${derivedTitle} | CKPIPSR Surat`;
  }

  // Derive final description
  let derivedDesc = props.description || (matchedRoute ? matchedRoute.description : undefined);
  if (!derivedDesc) {
    const topic = props.activeItemLabel || props.title || formatPathToTitle(currentPath);
    derivedDesc = `Explore ${topic} at C.K. Pithawalla Institute of Pharmaceutical Science and Research (CKPIPSR), Surat. Approved by PCI and affiliated with VNSGU, offering premier education since 2005.`;
  }

  // Derive final keywords
  const baseKeywords = "CKPIPSR, C K Pithawalla Pharmacy Surat, VNSGU Pharmacy College, B.Pharm College Surat, M.Pharm College Surat, Navyug Vidyabhavan Trust, Surat education";
  let derivedKeywords = props.keywords || (matchedRoute ? matchedRoute.keywords : undefined);
  if (!derivedKeywords) {
    const topic = props.activeItemLabel || props.title || formatPathToTitle(currentPath);
    derivedKeywords = `${topic}, ${baseKeywords}`;
  } else if (!derivedKeywords.includes("CKPIPSR")) {
    derivedKeywords = `${derivedKeywords}, ${baseKeywords}`;
  }

  // Derive AI Summary for AEO (Answer Engine Optimization)
  let derivedAiSummary = matchedRoute ? matchedRoute.aiSummary : undefined;
  if (!derivedAiSummary) {
    const topic = props.activeItemLabel || props.title || formatPathToTitle(currentPath);
    derivedAiSummary = `${topic} is part of C.K. Pithawalla Institute of Pharmaceutical Science and Research (CKPIPSR) Surat, an esteemed VNSGU-affiliated and PCI-approved institution committed to academic excellence, student mentorship, and healthcare compliance.`;
  }

  // Derive Canonical URL and Image
  const canonicalUrl = `https://ckpipsr.ac.in${currentPath === "/" ? "" : currentPath}`;
  const defaultImage = "https://ckpipsr.ac.in/images/logo.png";
  const ogImage = props.image || (matchedRoute ? matchedRoute.image : undefined) || defaultImage;

  // Derive Course & FAQ Details
  const courseDetails = props.courseDetails || (matchedRoute ? matchedRoute.courseDetails : undefined);
  const faqList = props.faq || (matchedRoute ? matchedRoute.faq : undefined);

  // Construct JSON-LD Structured Schema Graph for SEO & AEO
  const schemaGraph: any[] = [
    {
      "@type": "CollegeOrUniversity",
      "@id": "https://ckpipsr.ac.in/#organization",
      "name": "C.K. Pithawalla Institute of Pharmaceutical Science and Research",
      "alternateName": ["CKPIPSR", "CK Pithawalla Pharmacy College", "C.K. Pithawalla Pharmacy Surat"],
      "url": "https://ckpipsr.ac.in",
      "logo": defaultImage,
      "foundingDate": "2005",
      "description": "Surat's premier PCI-approved pharmacy college offering VNSGU-affiliated B.Pharm, M.Pharm, and Pharm.D degree programs.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Near Malvan Temple, Surat-Dumas Road, Bharthana (Vesu)",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "postalCode": "395007",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.1444",
        "longitude": "72.7411"
      },
      "telephone": "+91-261-2728282",
      "email": "info@ckpipsr.ac.in",
      "sameAs": [
        "https://ckpipsr.ac.in",
        "https://www.facebook.com/ckpipsr",
        "https://www.linkedin.com/school/ckpipsr"
      ]
    }
  ];

  // Add Breadcrumb Schema
  const pathSegments = currentPath.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ckpipsr.ac.in"
    }
  ];

  let currentLink = "https://ckpipsr.ac.in";
  pathSegments.forEach((segment, idx) => {
    currentLink += `/${segment}`;
    const name = idx === 0 && CATEGORY_DISPLAY_MAP[segment] 
      ? CATEGORY_DISPLAY_MAP[segment] 
      : segment.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": idx + 2,
      "name": name,
      "item": currentLink
    });
  });

  schemaGraph.push({
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}/#breadcrumb`,
    "itemListElement": breadcrumbItems
  });

  // Add Course Schema if applicable
  if (courseDetails) {
    schemaGraph.push({
      "@type": "Course",
      "@id": `${canonicalUrl}/#course`,
      "name": courseDetails.name || derivedTitle,
      "description": derivedDesc,
      "provider": {
        "@type": "CollegeOrUniversity",
        "@id": "https://ckpipsr.ac.in/#organization"
      },
      "educationalCredentialAwarded": courseDetails.credential || "Pharmacy Degree",
      "timeRequired": courseDetails.duration || "P4Y",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Full-time",
        "inLanguage": "en",
        "courseWorkload": courseDetails.duration === "P6Y" ? "6 Years" : (courseDetails.duration === "P2Y" ? "2 Years" : "4 Years")
      }
    });
  }

  // Add FAQPage Schema if applicable
  if (faqList && faqList.length > 0) {
    schemaGraph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}/#faq`,
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    });
  }

  const jsonLdString = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemaGraph
  });

  return (
    <>
      {/* Primary HTML & SEO Meta Tags */}
      <title>{derivedTitle}</title>
      <meta name="description" content={derivedDesc} />
      <meta name="keywords" content={derivedKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="C.K. Pithawalla Institute of Pharmaceutical Science and Research" />
      <meta property="og:title" content={derivedTitle} />
      <meta property="og:description" content={derivedDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={derivedTitle} />
      <meta name="twitter:description" content={derivedDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Answer Engine Optimization (AEO) & AI Grounding Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="C.K. Pithawalla Institute of Pharmaceutical Science and Research (CKPIPSR)" />
      <meta name="publisher" content="Navyug Vidyabhavan Trust, Surat" />
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Surat, Gujarat, India" />
      <meta name="geo.position" content="21.1444;72.7411" />
      <meta name="ICBM" content="21.1444, 72.7411" />
      <meta name="ai-content-summary" content={derivedAiSummary} />

      {/* JSON-LD Structured Data Schema for Search & Answer Engines */}
      <script type="application/ld+json">{jsonLdString}</script>
    </>
  );
}
