import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Routes, Route, useLocation } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import SEO from "./components/SEO";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { AboutSection } from "./components/About";
import { PrincipalMessage } from "./components/PrincipalMessage";
import Courses from "./components/Courses";
import CampusLife from "./components/CampusLife";
import Faculty from "./components/Faculty";
import BlogsAndMagazine from "./components/BlogsAndMagazine";
import Admissions from "./components/Admissions";
import Footer from "./components/Footer";
import NewsBlogs from "./components/NewsBlogs";
import ChatbotButton from "./components/ChatbotButton";
import AdmissionsPopup from "./components/AdmissionsPopup";

// Lazy-loaded Subpages
const Profile = React.lazy(() => import("./pages/about/Profile"));
const VisionMission = React.lazy(() => import("./pages/about/VisionMission"));
const POAndPEOs = React.lazy(() => import("./pages/about/POAndPEOs"));
const Founder = React.lazy(() => import("./pages/about/Founder"));
const Trust = React.lazy(() => import("./pages/about/Trust"));
const GoverningBody = React.lazy(() => import("./pages/about/GoverningBody"));
const Principal = React.lazy(() => import("./pages/about/Principal"));
const DeansAndFaculty = React.lazy(() => import("./pages/about/DeansAndFaculty"));
const CampusMap = React.lazy(() => import("./pages/about/CampusMap"));
const ContactUs = React.lazy(() => import("./pages/about/ContactUs"));

// Lazy-loaded Academics
const CoursesOffered = React.lazy(() => import("./pages/academics/CoursesOffered"));
const DPharm = React.lazy(() => import("./pages/academics/CoursePages").then(m => ({ default: m.DPharm })));
const BPharm = React.lazy(() => import("./pages/academics/CoursePages").then(m => ({ default: m.BPharm })));
const MPharm = React.lazy(() => import("./pages/academics/CoursePages").then(m => ({ default: m.MPharm })));
const ShortTermCertificate = React.lazy(() => import("./pages/academics/CoursePages").then(m => ({ default: m.ShortTermCertificate })));

const Approvals = React.lazy(() => import("./pages/academics/Approvals"));
const Faculties = React.lazy(() => import("./pages/academics/Faculties"));
const Resources = React.lazy(() => import("./pages/academics/Resources"));

const Laboratories = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.Laboratories })));
const Library = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.Library })));
const Sports = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.Sports })));
const Hostel = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.Hostel })));
const Medical = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.Medical })));
const Transportation = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.Transportation })));
const SeminarHall = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.SeminarHall })));
const Cafeteria = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.Cafeteria })));
const CentralFacilities = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.CentralFacilities })));
const EVChargingStation = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.EVChargingStation })));
const MedicinalGarden = React.lazy(() => import("./pages/academics/ResourcePages").then(m => ({ default: m.MedicinalGarden })));

// Lazy-loaded Students Corner
const Timetables = React.lazy(() => import("./pages/students/Timetables"));
const Scholarships = React.lazy(() => import("./pages/students/Scholarships"));
const HobbyClub = React.lazy(() => import("./pages/students/HobbyClub"));
const Alumni = React.lazy(() => import("./pages/students/Alumni"));
const StudentHelpDesk = React.lazy(() => import("./pages/students/StudentHelpDesk"));

// Lazy-loaded Cells
const ARC = React.lazy(() => import("./pages/cells/ARC"));
const WDC = React.lazy(() => import("./pages/cells/WDC"));
const SCSTCell = React.lazy(() => import("./pages/cells/SCSTCell"));
const GRC = React.lazy(() => import("./pages/cells/GRC"));
const ADC = React.lazy(() => import("./pages/cells/ADC"));
const EDC = React.lazy(() => import("./pages/cells/EDC"));
const GSC = React.lazy(() => import("./pages/cells/GSC"));
const AboutResearch = React.lazy(() => import("./pages/research/AboutResearch"));
const ResearchPublications = React.lazy(() => import("./pages/research/ResearchPublications"));
const Patents = React.lazy(() => import("./pages/research/Patents"));
const Books = React.lazy(() => import("./pages/research/Books"));
const DoctoralStudies = React.lazy(() => import("./pages/research/DoctoralStudies"));
const PGProjects = React.lazy(() => import("./pages/research/PGProjects"));
const Grants = React.lazy(() => import("./pages/research/Grants"));
const Consultancy = React.lazy(() => import("./pages/research/Consultancy"));
const Ethics = React.lazy(() => import("./pages/research/Ethics"));
const MOUs = React.lazy(() => import("./pages/research/MOUs"));
const AboutSSIP = React.lazy(() => import("./pages/research/AboutSSIP"));
const IIC = React.lazy(() => import("./pages/research/IIC"));
const AboutIQAC = React.lazy(() => import("./pages/iqac/AboutIQAC"));
const IQACComposition = React.lazy(() => import("./pages/iqac/IQACComposition"));
const IQACInitiatives = React.lazy(() => import("./pages/iqac/IQACInitiatives"));
const MoMsAndATR = React.lazy(() => import("./pages/iqac/MoMsAndATR"));
const AISHE = React.lazy(() => import("./pages/iqac/AISHE"));
const NIRF = React.lazy(() => import("./pages/iqac/NIRF"));
const IDP = React.lazy(() => import("./pages/iqac/IDP"));
const RTI = React.lazy(() => import("./pages/iqac/RTI"));
const Placements = React.lazy(() => import("./pages/tnp/Placements"));
const Visits = React.lazy(() => import("./pages/tnp/Visits"));
const Committee = React.lazy(() => import("./pages/tnp/Committee"));
const Training = React.lazy(() => import("./pages/tnp/Training"));

const DynamicSubPage = React.lazy(() => import("./pages/DynamicSubPage"));
const Events = React.lazy(() => import("./pages/activities/Events"));

export default function App() {
  const location = useLocation();
  const isSubPage = location.pathname !== "/";

  const [showPreloader, setShowPreloader] = useState(!isSubPage);
  const [heroLoaded, setHeroLoaded] = useState(isSubPage);
  const [navbarReady, setNavbarReady] = useState(isSubPage);
  const [showAdmissionsPopup, setShowAdmissionsPopup] = useState(false);
  const hasShownAutoPopupRef = useRef(false);

  const handlePreloaderExitStart = () => {
    setHeroLoaded(true);
    setNavbarReady(true);
  };

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setHeroLoaded(true);
    setNavbarReady(true);
    if (!hasShownAutoPopupRef.current && !isSubPage) {
      hasShownAutoPopupRef.current = true;
      setTimeout(() => {
        setShowAdmissionsPopup(true);
      }, 1200);
    }
  };

  const handleQuotesComplete = () => {
    setNavbarReady(true);
  };

  // Reset navbar visibility if switching back to subpages/home, and safety fallback
  useEffect(() => {
    if (isSubPage) {
      setShowPreloader(false);
      setHeroLoaded(true);
      setNavbarReady(true);
    } else if (!showPreloader) {
      setHeroLoaded(true);
      setNavbarReady(true);
    }
  }, [isSubPage, showPreloader]);

  // Scroll to top on route change & recalculate scroll bounds
  useEffect(() => {
    if (!location.state?.scrollTo) {
      window.scrollTo(0, 0);
      if (typeof window !== 'undefined' && (window as any).lenis) {
        const lenis = (window as any).lenis;
        lenis.scrollTo(0, { immediate: true });
      }
    }
    if (typeof window !== 'undefined' && (window as any).lenis) {
      const lenis = (window as any).lenis;
      const timer = setTimeout(() => {
        lenis.resize();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.state]);

  return (
    <>
      {showPreloader && !isSubPage && (
        <Preloader 
          onExitStart={handlePreloaderExitStart} 
          onComplete={handlePreloaderComplete} 
        />
      )}

      <SmoothScroll>
        <SEO />
        <ChatbotButton />

        {/* Header bar container with animations */}
        <Navbar isReady={navbarReady} onOpenAdmissions={() => setShowAdmissionsPopup(true)} />

        {!isSubPage ? (
          <>
            <Hero 
              loaded={heroLoaded} 
              isSubPage={false} 
              onQuotesComplete={handleQuotesComplete}
              onOpenAdmissions={() => setShowAdmissionsPopup(true)}
            />
            <main>
              <AboutSection />
              <NewsBlogs />
              <PrincipalMessage />
              <Courses />
              <CampusLife />
              <Faculty />
              <BlogsAndMagazine />
              <Admissions onOpenAdmissions={() => setShowAdmissionsPopup(true)} />
            </main>
          </>
        ) : (
          <main className="pt-0 min-h-screen bg-[#FCFAF7]">
            <React.Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#123a1a] border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <Routes>
                <Route path="/about/profile" element={<Profile />} />
                <Route path="/about-us/profile" element={<Profile />} />
                
                <Route path="/about/vision-mission" element={<VisionMission />} />
                <Route path="/about-us/vision-and-mission" element={<VisionMission />} />
                
                <Route path="/about/po-peos" element={<POAndPEOs />} />
                <Route path="/about-us/po-peos" element={<POAndPEOs />} />
                
                <Route path="/about/founder" element={<Founder />} />
                <Route path="/about-us/the-founder" element={<Founder />} />
                
                <Route path="/about/trust" element={<Trust />} />
                <Route path="/about-us/the-trust" element={<Trust />} />
                <Route path="/about/about-trust" element={<Trust />} />
                <Route path="/about-us/about-trust" element={<Trust />} />
                
                <Route path="/about/governing-body" element={<GoverningBody />} />
                <Route path="/about-us/governing-body" element={<GoverningBody />} />
                
                <Route path="/about/principal" element={<Principal />} />
                <Route path="/about-us/principal" element={<Principal />} />
                
                <Route path="/about/deans-faculty" element={<DeansAndFaculty />} />
                <Route path="/about-us/deans-and-faculty-in-charges" element={<DeansAndFaculty />} />

                <Route path="/about/campus-map" element={<CampusMap />} />
                <Route path="/about-us/campus-map" element={<CampusMap />} />

                <Route path="/about/contact-us" element={<ContactUs />} />
                <Route path="/about-us/contact-us" element={<ContactUs />} />

                {/* Academics */}
                <Route path="/academics/courses-offered" element={<CoursesOffered />} />
                <Route path="/academics/courses-offered-d-pharm" element={<DPharm />} />
                <Route path="/academics/courses-offered-b-pharm" element={<BPharm />} />
                <Route path="/academics/courses-offered-m-pharm" element={<MPharm />} />
                <Route path="/academics/courses-offered-short-term-certificate" element={<ShortTermCertificate />} />
                <Route path="/academics/approvals" element={<Approvals />} />
                <Route path="/academics/faculties" element={<Faculties />} />
                <Route path="/academics/resources" element={<Resources />} />
                
                {/* Resource detailed routes */}
                <Route path="/resources/laboratories" element={<Laboratories />} />
                <Route path="/academics/resources-laboratories" element={<Laboratories />} />
                <Route path="/academics/resources-library" element={<Library />} />
                <Route path="/academics/resources-sports" element={<Sports />} />
                <Route path="/academics/resources-hostel" element={<Hostel />} />
                <Route path="/academics/resources-medical" element={<Medical />} />
                <Route path="/academics/resources-transportation" element={<Transportation />} />
                <Route path="/academics/resources-seminar-hall" element={<SeminarHall />} />
                <Route path="/academics/resources-cafeteria" element={<Cafeteria />} />
                <Route path="/academics/resources-central-facilities" element={<CentralFacilities />} />
                <Route path="/academics/resources-ev-charging-station" element={<EVChargingStation />} />
                <Route path="/academics/resources-medicinal-garden" element={<MedicinalGarden />} />
                
                {/* Students Corner */}
                <Route path="/students-corner/timetables" element={<Timetables />} />
                <Route path="/students/timetables" element={<Timetables />} />
                <Route path="/students-corner/timetable" element={<Timetables />} />
                <Route path="/students/timetable" element={<Timetables />} />
                <Route path="/students-corner/scholorships" element={<Scholarships />} />
                <Route path="/students-corner/scholarships" element={<Scholarships />} />
                <Route path="/students/scholorships" element={<Scholarships />} />
                <Route path="/students/scholarships" element={<Scholarships />} />
                <Route path="/students-corner/hobby-club" element={<HobbyClub />} />
                <Route path="/students-corner/hobbyclub" element={<HobbyClub />} />
                <Route path="/students/hobby-club" element={<HobbyClub />} />
                <Route path="/students/hobbyclub" element={<HobbyClub />} />
                <Route path="/students-corner/alumni" element={<Alumni />} />
                <Route path="/students/alumni" element={<Alumni />} />
                <Route path="/students-corner/alumni-association" element={<Alumni />} />
                <Route path="/students/alumni-association" element={<Alumni />} />
                <Route path="/student-help-desk" element={<StudentHelpDesk />} />
                <Route path="/students-corner/student-help-desk" element={<StudentHelpDesk />} />
                <Route path="/students/student-help-desk" element={<StudentHelpDesk />} />
                <Route path="/students-corner/help-desk" element={<StudentHelpDesk />} />
                <Route path="/students/help-desk" element={<StudentHelpDesk />} />
                <Route path="/students/helpdesk" element={<StudentHelpDesk />} />
                <Route path="/help-desk" element={<StudentHelpDesk />} />
                <Route path="/helpdesk" element={<StudentHelpDesk />} />
                
                {/* Cells & Committees */}
                <Route path="/cells/arc" element={<ARC />} />
                <Route path="/cells/anti-ragging-committee" element={<ARC />} />
                <Route path="/cells/anti-ragging" element={<ARC />} />
                <Route path="/cells/anti-ragging-cell" element={<ARC />} />
                <Route path="/about/anti-ragging-committee" element={<ARC />} />
                <Route path="/about-us/anti-ragging-committee" element={<ARC />} />
                <Route path="/cells/wdc" element={<WDC />} />
                <Route path="/cells/women-cell" element={<WDC />} />
                <Route path="/cells/women-development-cell" element={<WDC />} />
                <Route path="/cells/wdc-women-development-cell" element={<WDC />} />
                <Route path="/about/women-cell" element={<WDC />} />
                <Route path="/about-us/women-cell" element={<WDC />} />
                <Route path="/about/women-development-cell" element={<WDC />} />
                <Route path="/about-us/women-development-cell" element={<WDC />} />
                <Route path="/cells/sexual-harassment-committee" element={<WDC />} />
                <Route path="/cells/sc-st-cell" element={<SCSTCell />} />
                <Route path="/cells/st-sc-cell" element={<SCSTCell />} />
                <Route path="/cells/sc-st" element={<SCSTCell />} />
                <Route path="/about/sc-st-cell" element={<SCSTCell />} />
                <Route path="/about-us/sc-st-cell" element={<SCSTCell />} />
                <Route path="/cells/grc" element={<GRC />} />
                <Route path="/cells/grievance-redressal-cell" element={<GRC />} />
                <Route path="/cells/grievance" element={<GRC />} />
                <Route path="/about/grievance-redressal-cell" element={<GRC />} />
                <Route path="/about-us/grievance-redressal-cell" element={<GRC />} />
                <Route path="/cells/adc" element={<ADC />} />
                <Route path="/cells/anti-discrimination-cell" element={<ADC />} />
                <Route path="/cells/anti-discrimination" element={<ADC />} />
                <Route path="/about/anti-discrimination-cell" element={<ADC />} />
                <Route path="/about-us/anti-discrimination-cell" element={<ADC />} />
                <Route path="/cells/edc" element={<EDC />} />
                <Route path="/cells/entrepreneurship-development-cell" element={<EDC />} />
                <Route path="/cells/entrepreneurship-cell" element={<EDC />} />
                <Route path="/about/entrepreneurship-development-cell" element={<EDC />} />
                <Route path="/about-us/entrepreneurship-development-cell" element={<EDC />} />
                <Route path="/cells/gsc" element={<GSC />} />
                <Route path="/cells/gender-sensitization-cell" element={<GSC />} />
                <Route path="/cells/gender-sensitization" element={<GSC />} />
                <Route path="/about/gender-sensitization-cell" element={<GSC />} />
                <Route path="/about-us/gender-sensitization-cell" element={<GSC />} />
                
                {/* Research & Innovation */}
                <Route path="/research-and-innovation/research-about" element={<AboutResearch />} />
                <Route path="/research-and-innovation/about-research" element={<AboutResearch />} />
                <Route path="/research-and-innovation/about" element={<AboutResearch />} />
                <Route path="/research/about" element={<AboutResearch />} />
                <Route path="/research/about-research" element={<AboutResearch />} />
                <Route path="/rni/research/about" element={<AboutResearch />} />
                <Route path="/rni/about" element={<AboutResearch />} />
                
                <Route path="/research-and-innovation/research-publications" element={<ResearchPublications />} />
                <Route path="/research-and-innovation/publications" element={<ResearchPublications />} />
                <Route path="/research-and-innovation/research/publications" element={<ResearchPublications />} />
                <Route path="/research/publications" element={<ResearchPublications />} />
                <Route path="/research/research-publications" element={<ResearchPublications />} />
                <Route path="/rni/research/publications" element={<ResearchPublications />} />
                <Route path="/rni/publications" element={<ResearchPublications />} />
                <Route path="/rni/research-publications" element={<ResearchPublications />} />
                
                <Route path="/research-and-innovation/research-patents" element={<Patents />} />
                <Route path="/research-and-innovation/patents" element={<Patents />} />
                <Route path="/research-and-innovation/research/patents" element={<Patents />} />
                <Route path="/research/patents" element={<Patents />} />
                <Route path="/research/research-patents" element={<Patents />} />
                <Route path="/rni/research/patents" element={<Patents />} />
                <Route path="/rni/patents" element={<Patents />} />
                <Route path="/rni/research-patents" element={<Patents />} />
                
                <Route path="/research-and-innovation/research-books" element={<Books />} />
                <Route path="/research-and-innovation/books" element={<Books />} />
                <Route path="/research-and-innovation/research/books" element={<Books />} />
                <Route path="/research/books" element={<Books />} />
                <Route path="/research/research-books" element={<Books />} />
                <Route path="/rni/research/books" element={<Books />} />
                <Route path="/rni/books" element={<Books />} />
                <Route path="/rni/research-books" element={<Books />} />
                
                <Route path="/research-and-innovation/research-doctoral-studies" element={<DoctoralStudies />} />
                <Route path="/research-and-innovation/doctoral-studies" element={<DoctoralStudies />} />
                <Route path="/research-and-innovation/research/doctoral-studies" element={<DoctoralStudies />} />
                <Route path="/research/doctoral-studies" element={<DoctoralStudies />} />
                <Route path="/research/research-doctoral-studies" element={<DoctoralStudies />} />
                <Route path="/rni/research/doctoral-studies" element={<DoctoralStudies />} />
                <Route path="/rni/doctoral-studies" element={<DoctoralStudies />} />
                <Route path="/rni/research-doctoral-studies" element={<DoctoralStudies />} />
                
                <Route path="/research-and-innovation/research-pg-projects" element={<PGProjects />} />
                <Route path="/research-and-innovation/pg-projects" element={<PGProjects />} />
                <Route path="/research-and-innovation/research/pg-projects" element={<PGProjects />} />
                <Route path="/research/pg-projects" element={<PGProjects />} />
                <Route path="/research/research-pg-projects" element={<PGProjects />} />
                <Route path="/rni/research/pg-projects" element={<PGProjects />} />
                <Route path="/rni/pg-projects" element={<PGProjects />} />
                <Route path="/rni/research-pg-projects" element={<PGProjects />} />
                
                <Route path="/research-and-innovation/research-grants" element={<Grants />} />
                <Route path="/research-and-innovation/grants" element={<Grants />} />
                <Route path="/research-and-innovation/research/grants" element={<Grants />} />
                <Route path="/research/grants" element={<Grants />} />
                <Route path="/research/research-grants" element={<Grants />} />
                <Route path="/rni/research/grants" element={<Grants />} />
                <Route path="/rni/grants" element={<Grants />} />
                <Route path="/rni/research-grants" element={<Grants />} />
                
                <Route path="/research-and-innovation/research-consultancy" element={<Consultancy />} />
                <Route path="/research-and-innovation/consultancy" element={<Consultancy />} />
                <Route path="/research-and-innovation/research/consultancy" element={<Consultancy />} />
                <Route path="/research/consultancy" element={<Consultancy />} />
                <Route path="/research/research-consultancy" element={<Consultancy />} />
                <Route path="/rni/research/consultancy" element={<Consultancy />} />
                <Route path="/rni/consultancy" element={<Consultancy />} />
                <Route path="/rni/research-consultancy" element={<Consultancy />} />
                
                <Route path="/research-and-innovation/research-ethics" element={<Ethics />} />
                <Route path="/research-and-innovation/ethics" element={<Ethics />} />
                <Route path="/research-and-innovation/research/ethics" element={<Ethics />} />
                <Route path="/research/ethics" element={<Ethics />} />
                <Route path="/research/research-ethics" element={<Ethics />} />
                <Route path="/rni/research/ethics" element={<Ethics />} />
                <Route path="/rni/ethics" element={<Ethics />} />
                <Route path="/rni/research-ethics" element={<Ethics />} />
                
                <Route path="/research-and-innovation/research-mous" element={<MOUs />} />
                <Route path="/research-and-innovation/mous" element={<MOUs />} />
                <Route path="/research-and-innovation/research/mous" element={<MOUs />} />
                <Route path="/research/mous" element={<MOUs />} />
                <Route path="/research/research-mous" element={<MOUs />} />
                <Route path="/rni/research/mous" element={<MOUs />} />
                <Route path="/rni/mous" element={<MOUs />} />
                <Route path="/rni/research-mous" element={<MOUs />} />
                
                <Route path="/research-and-innovation/ssip-about" element={<AboutSSIP />} />
                <Route path="/research-and-innovation/about-ssip" element={<AboutSSIP />} />
                <Route path="/research-and-innovation/ssip" element={<AboutSSIP />} />
                <Route path="/research-and-innovation/ssip/about" element={<AboutSSIP />} />
                <Route path="/research/ssip/about" element={<AboutSSIP />} />
                <Route path="/research/about-ssip" element={<AboutSSIP />} />
                <Route path="/research/ssip" element={<AboutSSIP />} />
                <Route path="/rni/ssip/about" element={<AboutSSIP />} />
                <Route path="/rni/ssip" element={<AboutSSIP />} />
                <Route path="/rni/about-ssip" element={<AboutSSIP />} />
                <Route path="/rni/ssip-about" element={<AboutSSIP />} />
                <Route path="/ssip/about" element={<AboutSSIP />} />
                <Route path="/ssip" element={<AboutSSIP />} />
                <Route path="/about-ssip" element={<AboutSSIP />} />
                
                <Route path="/research-and-innovation/iic" element={<IIC />} />
                <Route path="/research/iic" element={<IIC />} />
                <Route path="/rni/iic" element={<IIC />} />
                <Route path="/iic" element={<IIC />} />
                
                <Route path="/iqac/about" element={<AboutIQAC />} />
                <Route path="/iqac/about-iqac" element={<AboutIQAC />} />
                <Route path="/iqac" element={<AboutIQAC />} />
                <Route path="/about-iqac" element={<AboutIQAC />} />
                <Route path="/about/iqac" element={<AboutIQAC />} />
                
                <Route path="/iqac/composition" element={<IQACComposition />} />
                <Route path="/iqac/iqac-composition" element={<IQACComposition />} />
                <Route path="/composition" element={<IQACComposition />} />
                
                <Route path="/iqac/initiatives" element={<IQACInitiatives />} />
                <Route path="/iqac/iqac-initiatives" element={<IQACInitiatives />} />
                <Route path="/iqac/iqac-initiatives-and-activities" element={<IQACInitiatives />} />
                <Route path="/initiatives" element={<IQACInitiatives />} />
                
                <Route path="/iqac/moms" element={<MoMsAndATR />} />
                <Route path="/iqac/moms-and-atr" element={<MoMsAndATR />} />
                <Route path="/iqac/mom" element={<MoMsAndATR />} />
                <Route path="/iqac/atr" element={<MoMsAndATR />} />
                <Route path="/iqac/minutes-and-atr" element={<MoMsAndATR />} />
                <Route path="/moms-and-atr" element={<MoMsAndATR />} />
                <Route path="/moms" element={<MoMsAndATR />} />
                
                <Route path="/iqac/aishe" element={<AISHE />} />
                <Route path="/aishe" element={<AISHE />} />
                
                <Route path="/iqac/nirf" element={<NIRF />} />
                <Route path="/nirf" element={<NIRF />} />
                
                <Route path="/iqac/idp" element={<IDP />} />
                <Route path="/idp" element={<IDP />} />
                <Route path="/iqac/institutional-development-plan" element={<IDP />} />
                <Route path="/institutional-development-plan" element={<IDP />} />
                
                <Route path="/iqac/rti" element={<RTI />} />
                <Route path="/rti" element={<RTI />} />
                <Route path="/iqac/right-to-information" element={<RTI />} />
                <Route path="/right-to-information" element={<RTI />} />
                
                <Route path="/tnp/placements" element={<Placements />} />
                <Route path="/placements" element={<Placements />} />
                <Route path="/tnp/placement" element={<Placements />} />
                <Route path="/placement" element={<Placements />} />
                <Route path="/training-and-placement/placements" element={<Placements />} />
                <Route path="/training-and-placement/placement" element={<Placements />} />
                
                <Route path="/tnp/visits" element={<Visits />} />
                <Route path="/visits" element={<Visits />} />
                <Route path="/training-and-placement/visits" element={<Visits />} />
                <Route path="/tnp/industrial-visits" element={<Visits />} />
                <Route path="/industrial-visits" element={<Visits />} />
                
                <Route path="/tnp/committee" element={<Committee />} />
                <Route path="/training-and-placement/committee" element={<Committee />} />
                <Route path="/tnp-committee" element={<Committee />} />
                
                <Route path="/tnp/training" element={<Training />} />
                <Route path="/training" element={<Training />} />
                <Route path="/training-and-placement/training" element={<Training />} />
                <Route path="/tnp/industrial-training" element={<Training />} />
                <Route path="/industrial-training" element={<Training />} />
                
                {/* Activities / Events */}
                <Route path="/activities/events" element={<Events />} />

                {/* All other dynamic routes handled by DynamicSubPage */}
                <Route path="*" element={<DynamicSubPage />} />
              </Routes>
            </React.Suspense>
          </main>
        )}
        
        {/* Render Footer always */}
        <Footer />
      </SmoothScroll>

      <AdmissionsPopup isOpen={showAdmissionsPopup && !showPreloader} onClose={() => setShowAdmissionsPopup(false)} />
    </>
  );
}
