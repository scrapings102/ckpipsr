import React from "react";
import SubPageLayout from "../../components/SubPageLayout";
import { CourseDetailLayout } from "../../components/AcademicsLayouts";

export const DPharm = () => (
  <SubPageLayout
    title="Diploma in Pharmacy"
    subtitle="D.Pharm — 2 Year Professional Diploma"
    category="academics"
    activeItemLabel="Courses Offered - D.Pharm"
  >
    <CourseDetailLayout
      title="D.Pharm."
      fullName="Diploma in Pharmacy (Full Time)"
      intake="60 Seats"
      duration="2 Years"
      eligibility="Passed 10+2 examination with Physics, Chemistry and Biology/Mathematics"
      fees="₹50,000 / Year"
      overview="The Diploma in Pharmacy (D.Pharm.) is a 2-year undergraduate diploma course designed to provide students with fundamental knowledge in pharmaceutical science, drug distribution, community pharmacy practice, and hospital pharmacy management."
      image="/images/hero/pharmacy_lab.jpg"
    />
  </SubPageLayout>
);

export const BPharm = () => (
  <SubPageLayout
    title="Bachelor of Pharmacy"
    subtitle="B.Pharm — 4 Year Degree Program"
    category="academics"
    activeItemLabel="Courses Offered - B.Pharm"
  >
    <CourseDetailLayout
      title="B.Pharm."
      fullName="Bachelor of Pharmacy (Full Time)"
      intake="100 Seats"
      duration="4 Years"
      eligibility="As per ACPC / GTU Norms (10+2 Science with PCB/PCM)"
      fees="₹85,995 (Subject to FRC)"
      overview="The B.Pharm course is an undergraduate degree program that provides comprehensive knowledge of pharmaceutical sciences, drug discovery, formulation, and clinical pharmacy, preparing students for diverse roles in the healthcare industry."
      image="/images/hero/students_learning.jpg"
    />
  </SubPageLayout>
);

export const MPharm = () => (
  <SubPageLayout
    title="Master of Pharmacy"
    subtitle="M.Pharm — 2 Year Postgraduate Research Program"
    category="academics"
    activeItemLabel="Courses Offered - M.Pharm"
  >
    <CourseDetailLayout
      title="M.Pharm."
      fullName="Master of Pharmacy (Full Time)"
      intake="15 Seats"
      duration="2 Years"
      eligibility="B.Pharm with valid GPAT score / PGCET rank"
      fees="₹1,31,250 (Subject to FRC)"
      overview="M.Pharm is a postgraduate program focused on advanced research and specialization. At CKPIPSR, we focus on producing researchers who can lead innovations in pharmaceutical formulation and quality assurance."
      image="/images/hero/66e153e687221.webp"
    />
  </SubPageLayout>
);

export const ShortTermCertificate = () => (
  <SubPageLayout
    title="Short Term Certificate"
    subtitle="Industry Skill Development Program"
    category="academics"
    activeItemLabel="Courses Offered - Short Term Certificate"
  >
    <CourseDetailLayout
      title="Certificate"
      fullName="Pharmaceutical Dossier Preparation And Filing"
      intake="100 Seats"
      duration="60 Hours (8 weeks, Sat/Sun only, Online)"
      eligibility="Pharmacy Students / Professionals"
      fees="₹2,000 (Indian) / $50 USD (Overseas)"
      overview="A specialized intensive program focused on the regulatory aspects of drug filing, dossier preparation (CTD/eCTD formats), and international pharmaceutical compliance. Fees inclusive of certification and exam fees."
      image="/images/hero/66e1522d09fc0.webp"
    />
  </SubPageLayout>
);
