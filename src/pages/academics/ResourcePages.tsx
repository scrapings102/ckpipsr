import React from "react";
import SubPageLayout from "../../components/SubPageLayout";
import { ResourceDetailLayout } from "../../components/AcademicsLayouts";
import { LeafTileGallery } from "../../components/LeafTileGallery";
import { LABORATORIES, LABORATORY_PHOTOS } from "../../data/laboratoriesData";
import { Beaker, Sparkles, CheckCircle } from "lucide-react";

const LIBRARY_PHOTOS = [
  "https://ckpipsr.ac.in/images/resources/library/1.jpg",
  "https://ckpipsr.ac.in/images/resources/library/2.jpg",
  "https://ckpipsr.ac.in/images/resources/library/3.jpg",
  "https://ckpipsr.ac.in/images/resources/library/4.jpg"
];

const HOSTEL_PHOTOS = [
  "https://ckpipsr.ac.in/images/resources/hostel/02.jpg",
  "https://ckpipsr.ac.in/images/resources/hostel/03.jpg",
  "https://ckpipsr.ac.in/images/resources/hostel/04.jpg",
  "https://ckpipsr.ac.in/images/resources/hostel/05.jpg",
  "https://ckpipsr.ac.in/images/resources/hostel/06.jpg",
  "https://ckpipsr.ac.in/images/resources/hostel/07.jpeg",
  "https://ckpipsr.ac.in/images/resources/hostel/08.jpeg"
];

const MEDICAL_PHOTOS = [
  "https://ckpipsr.ac.in/images/resources/medical/01.jpg",
  "https://ckpipsr.ac.in/images/resources/medical/02.jpg",
  "https://ckpipsr.ac.in/images/resources/medical/03.jpg",
  "https://ckpipsr.ac.in/images/resources/medical/04.jpg",
  "https://ckpipsr.ac.in/images/resources/medical/05.jpg",
  "https://ckpipsr.ac.in/images/resources/medical/06.jpg",
  "https://ckpipsr.ac.in/images/resources/medical/07.jpg"
];

const TRANSPORTATION_PHOTOS = [
  "https://ckpipsr.ac.in/images/resources/transportation/brts-map.jpg",
  "https://ckpipsr.ac.in/images/resources/transportation/bus.jpeg",
  "https://ckpipsr.ac.in/images/resources/transportation/colbus.jpeg",
  "https://ckpipsr.ac.in/images/resources/transportation/coltiming.jpeg",
  "https://ckpipsr.ac.in/images/resources/transportation/timing.jpg"
];

const SEMINAR_HALL_PHOTOS = [
  "https://ckpipsr.ac.in/images/resources/seminar-hall/1.jpg",
  "https://ckpipsr.ac.in/images/resources/seminar-hall/2.jpg",
  "https://ckpipsr.ac.in/images/resources/seminar-hall/3.jpg",
  "https://ckpipsr.ac.in/images/resources/seminar-hall/4.jpg",
  "https://ckpipsr.ac.in/images/resources/seminar-hall/5.jpg",
  "https://ckpipsr.ac.in/images/resources/seminar-hall/6.jpg"
];

const CAFETERIA_PHOTOS = [
  "https://ckpipsr.ac.in/images/resources/cafeteria/1.jpeg",
  "https://ckpipsr.ac.in/images/resources/cafeteria/2.jpeg",
  "https://ckpipsr.ac.in/images/resources/cafeteria/3.jpeg",
  "https://ckpipsr.ac.in/images/resources/cafeteria/4.jpeg",
  "https://ckpipsr.ac.in/images/resources/cafeteria/5.jpeg",
  "https://ckpipsr.ac.in/images/resources/cafeteria/6.jpeg"
];

const CENTRAL_FACILITIES_PHOTOS = [
  "https://ckpipsr.ac.in/images/resources/central/clp.jpg"
];

const EV_CHARGING_PHOTOS = [
  "https://ckpipsr.ac.in/images/resources/echarging.jpg"
];

const MEDICINAL_GARDEN_PHOTOS = [
  "https://ckpipsr.ac.in/images/resources/garden/garden-1.png",
  "https://ckpipsr.ac.in/images/resources/garden/garden-2.png",
  "https://ckpipsr.ac.in/images/resources/garden/garden-3.png",
  "https://ckpipsr.ac.in/images/resources/garden/garden-4.png"
];

export const Laboratories = () => (
  <SubPageLayout title="Laboratories" category="academics" activeItemLabel="Resources - Laboratories">
    <div className="space-y-16">
      {/* Intro Banner */}
      <div className="relative bg-[#123a1a] rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl border border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-md text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles size={12} className="animate-pulse" />
            <span>Research Infrastructure</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Scientific Laboratories
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
            CKPIPSR features state-of-the-art laboratory environments built to model modern pharmaceutical and clinical setups.
            These advanced workspaces empower students through intensive, hands-on experiential education.
          </p>
        </div>
      </div>

      {/* Lab List Grid */}
      <div className="space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
            Our Research & Experimental Laboratories
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Browse through our twelve specialized testing facilities and research wings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LABORATORIES.map((lab) => (
            <div
              key={lab.name}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Lab Name Header */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#123a1a]/5 text-[#123a1a] rounded-xl shrink-0 border border-[#123a1a]/10">
                    <Beaker size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-tight">
                      {lab.name}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-[#8c6d12] uppercase tracking-wider block mt-1">
                      Pharmacy Wing
                    </span>
                  </div>
                </div>

                {/* Laboratory Descriptions */}
                {lab.descriptions.length > 0 && (
                  <div className="space-y-3 pt-2">
                    {lab.descriptions.map((desc, dIdx) => (
                      <p
                        key={dIdx}
                        className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify"
                      >
                        {desc}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Status footer for alignment */}
              <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between text-[11px] text-slate-400 font-mono font-semibold">
                <span>LAB CONFIGURATION</span>
                <span className="text-[#123a1a] flex items-center gap-1 bg-[#123a1a]/5 px-2 py-0.5 rounded-md text-[10px]">
                  <CheckCircle size={10} className="text-[#D4AF37]" />
                  <span>ACTIVE</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Laboratory Photo Gallery */}
      <LeafTileGallery
        photos={LABORATORY_PHOTOS}
        title="Laboratory Photo Archive"
        subtitle="Visual highlights of the sophisticated equipment, sterile suites, and compound processing benches."
        facilityName="Laboratory"
      />
    </div>
  </SubPageLayout>
);

export const Library = () => (
  <SubPageLayout title="Library" category="academics" activeItemLabel="Resources - Library">
    <ResourceDetailLayout
      title="Central Library"
      description="A silent sanctuary of knowledge with thousands of volumes and digital resources."
      image="/images/hero/65efeac7d49a3.webp"
      features={["7500+ Books", "400+ Journals", "Digital Library", "DELNET Access"]}
      gallery={LIBRARY_PHOTOS}
      details={[
        "Enriched with latest Pharmacy collection covering all specializations",
        "Access to national & international peer-reviewed journals",
        "State-of-the-art digital information retrieval system",
        "E-media resources, CDs, and reference DVDs",
        "Spacious, silent reading area with individual study carrels",
        "Subscription to major online pharmaceutical databases",
        "Inter-library loan facility via DELNET network",
        "Dedicated reference section for competitive exam preparation"
      ]}
    />
  </SubPageLayout>
);

export const Sports = () => (
  <SubPageLayout title="Sports" category="academics" activeItemLabel="Resources - Sports">
    <ResourceDetailLayout
      title="Sports & Fitness"
      description="Fostering physical health and team spirit through comprehensive sports infrastructure."
      image="/images/hero/college_campus.jpg"
      features={["Cricket Ground", "Indoor Games", "Table Tennis", "Annual Sports Meet"]}
      details={[
        "Cricket ground spanning approximately 18,000 sq ft",
        "Multiple volleyball courts for team practice",
        "Dedicated kabaddi ground for traditional sports",
        "Table-tennis facility located in D2 Building",
        "Full-size badminton courts with proper flooring",
        "Carrom and chess facilities for indoor recreation",
        "Annual inter-departmental sports meet and tournaments",
        "Qualified sports coordinators for training and events"
      ]}
    />
  </SubPageLayout>
);

export const Hostel = () => (
  <SubPageLayout title="Hostel" category="academics" activeItemLabel="Resources - Hostel">
    <ResourceDetailLayout
      title="Residential Life"
      description="Safe, comfortable, and hygienic residential facilities for boys and girls."
      image="/images/hero/66e154b724ef6 (1).webp"
      features={["Separate Boys & Girls Wings", "24/7 Security", "Furnished Rooms", "Mess Facility"]}
      gallery={HOSTEL_PHOTOS}
      details={[
        "Separate, secure residential blocks for male and female students",
        "Round-the-clock security personnel and CCTV surveillance",
        "Furnished rooms with study tables, beds, and storage",
        "Hygienic mess facility with nutritious vegetarian meals",
        "24/7 water and power backup supply",
        "Common recreation room with television and indoor games",
        "High-speed Wi-Fi connectivity throughout hostel premises",
        "Resident warden available for student welfare and discipline"
      ]}
    />
  </SubPageLayout>
);

export const Medical = () => (
  <SubPageLayout title="Medical Center" category="academics" activeItemLabel="Resources - Medical">
    <ResourceDetailLayout
      title="Medical Center"
      description="Ensuring student and staff wellness through immediate on-campus medical aid."
      image="/images/hero/66e153e687221.webp"
      features={["On-Campus Clinic", "First Aid Trained Staff", "Tie-up Hospitals", "Health Check-ups"]}
      gallery={MEDICAL_PHOTOS}
      details={[
        "On-campus medical room for immediate first aid and consultation",
        "Trained nursing staff available during college hours",
        "Tie-up arrangements with nearby hospitals for emergencies",
        "Periodic health check-up camps for students and staff",
        "Awareness sessions on hygiene, wellness, and mental health",
        "Ambulance on-call facility for medical emergencies",
        "First-aid kits stationed across all academic blocks",
        "Confidential counseling support for student wellbeing"
      ]}
    />
  </SubPageLayout>
);

export const Transportation = () => (
  <SubPageLayout title="Transportation" category="academics" activeItemLabel="Resources - Transportation">
    <ResourceDetailLayout
      title="Transportation"
      description="Excellent connectivity to Surat city via public and dedicated transport systems."
      image="/images/hero/66e1522d09fc0.webp"
      features={["BRTS Connectivity", "College Bus Service", "Well-Connected Roads", "Parking Facility"]}
      gallery={TRANSPORTATION_PHOTOS}
      details={[
        "Direct connectivity via Surat's BRTS (Bus Rapid Transit System)",
        "Dedicated college bus service covering major city routes",
        "Located on Surat-Dumas Road with excellent road connectivity",
        "Ample two-wheeler and four-wheeler parking on campus",
        "Auto-rickshaw and cab availability just outside campus",
        "Safe pick-up and drop points for hostel and day-scholar students",
        "Proximity to Surat Airport and Surat Railway Station",
        "Well-lit internal campus roads for pedestrian safety"
      ]}
    />
  </SubPageLayout>
);

export const SeminarHall = () => (
  <SubPageLayout title="Seminar Hall" category="academics" activeItemLabel="Resources - Seminar Hall">
    <ResourceDetailLayout
      title="Seminar Hall"
      description="Spacious, air-conditioned venue for academic discourse and cultural events."
      image="/images/hero/65efea4943a49.webp"
      features={["200-Seat Capacity", "AC Hall", "AV Conferencing", "Guest Lecture Venue"]}
      gallery={SEMINAR_HALL_PHOTOS}
      details={[
        "Air-conditioned seminar hall with a seating capacity of 200",
        "Modern audio-visual conferencing and projection systems",
        "Regular venue for guest lectures by industry experts",
        "Hosts national and state-level seminars and workshops",
        "Equipped with wireless microphone and sound systems",
        "Used for faculty development programs and orientation sessions",
        "Backup power supply to ensure uninterrupted sessions",
        "Comfortable tiered seating for optimal visibility"
      ]}
    />
  </SubPageLayout>
);

export const Cafeteria = () => (
  <SubPageLayout title="Cafeteria" category="academics" activeItemLabel="Resources - Cafeteria">
    <ResourceDetailLayout
      title="Cafeteria"
      description="Hygienic and aesthetic dining space offering a variety of nutritious meals."
      image="/images/hero/66e154b724ef6.webp"
      features={["Hygienic Vegetarian Menu", "Affordable Pricing", "Spacious Seating", "Fresh Daily Meals"]}
      gallery={CAFETERIA_PHOTOS}
      details={[
        "Hygienic, purely vegetarian dining space for students and staff",
        "Wide variety of nutritious and affordable meal options",
        "Fresh snacks, beverages, and full meals prepared daily",
        "Spacious indoor and outdoor seating arrangements",
        "Clean drinking water stations throughout the premises",
        "Special menu options during festivals and college events",
        "Trained kitchen staff following strict hygiene protocols",
        "Convenient location adjacent to main academic blocks"
      ]}
    />
  </SubPageLayout>
);

export const CentralFacilities = () => (
  <SubPageLayout title="Central Facilities" category="academics" activeItemLabel="Resources - Central Facilities">
    <div className="space-y-8">
      <ResourceDetailLayout
        title="Central Facilities"
        description="Specialized centers for language, personality, and essential utilities."
        image="/images/hero/66e151f0d6a90.webp"
        features={["Language Lab", "Personality Development Cell", "Stationery Store", "Photocopy Services"]}
        gallery={CENTRAL_FACILITIES_PHOTOS}
        details={[
          "Dedicated language proficiency lab for communication skills training",
          "Personality development and soft-skills training sessions",
          "On-campus stationery store for academic essentials",
          "Photocopy and printing services available for students",
          "Centralized notice boards and student information kiosks",
          "Placement cell offering career counseling and interview prep",
          "Bank and ATM facility for financial convenience",
          "Common utility rooms for administrative and student services"
        ]}
      />
      <div className="bg-[#FAF8F3] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-200 pb-3">
          On-Campus Store & Amenities
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans text-justify">
          For the convenience of students, a stationary store has been set-up within the campus. All the daily utility items like stationery, cosmetics, record files, and textbooks are available in the stationary store. This helps the students to procure all their stationery requirements within the campus at reasonable rates.
        </p>
      </div>
    </div>
  </SubPageLayout>
);

export const EVChargingStation = () => (
  <SubPageLayout title="EV Charging" category="academics" activeItemLabel="Resources - EV Charging Station">
    <ResourceDetailLayout
      title="EV Charging Station"
      description="Promoting sustainable transportation and green energy on campus."
      image="/images/hero/pharmacy_lab.jpg"
      features={["Eco-Friendly Infrastructure", "Fast Charging", "Free for Students", "Sustainable Campus Initiative"]}
      gallery={EV_CHARGING_PHOTOS}
      details={[
        "Dedicated EV charging points supporting sustainable transportation",
        "Fast-charging capability for two-wheelers and four-wheelers",
        "Free access for students and staff commuting via electric vehicles",
        "Part of the institute's broader green-campus sustainability initiative",
        "Solar-assisted power supply reducing carbon footprint",
        "Well-marked, covered parking bays for electric vehicles",
        "Regular maintenance ensuring consistent charging availability",
        "Encourages eco-conscious commuting among the campus community"
      ]}
    />
  </SubPageLayout>
);

export const MedicinalGarden = () => (
  <SubPageLayout title="Medicinal Garden" category="academics" activeItemLabel="Resources - Medicinal Garden">
    <ResourceDetailLayout
      title="Medicinal Garden"
      description="A living laboratory of botanical biodiversity and therapeutic flora."
      image="/images/hero/66e15283951b9.webp"
      features={["500+ Medicinal Plants", "Practical Research Site", "Herbarium", "Pharmacognosy Training"]}
      gallery={MEDICINAL_GARDEN_PHOTOS}
      details={[
        "Vast collection of over 500 aromatic and medicinal plant species",
        "Dedicated site for practical pharmacognosy training and research",
        "Well-maintained herbarium for botanical specimen study",
        "Labeled plant beds organized by therapeutic classification",
        "Used extensively for undergraduate and postgraduate research projects",
        "Supports student projects on traditional and herbal medicine",
        "Guided garden tours as part of academic orientation",
        "Contributes to conservation of native medicinal flora"
      ]}
    />
  </SubPageLayout>
);
