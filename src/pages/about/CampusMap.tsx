import React, { useState } from "react";
import { 
  MapPin, 
  ExternalLink, 
  Navigation, 
  Building2, 
  BookOpen, 
  Coffee, 
  Home, 
  Bus, 
  Train, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Compass
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { CONTACT, INSTITUTE } from "../../data/institute";
import { cdn } from "../../utils/image";

export default function CampusMap() {
  const [activeZone, setActiveZone] = useState<"all" | "academic" | "central" | "amenities" | "hostel">("all");

  const mapImageUrl = "/images/hero/college_campus.jpg";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=C.+K.+Pithawalla+Institute+of+Pharmaceutical+Science+and+Research+Surat";

  const campusZones = [
    {
      id: "academic",
      title: "Academic & Laboratory Blocks",
      icon: Building2,
      description: "State-of-the-art department blocks housing lecture halls, high-tech pharmaceutical science laboratories, and research units.",
      facilities: [
        "Main Administrative & Academic Building",
        "Pharmaceutics & Formulation Research Labs",
        "Pharmaceutical Chemistry & Synthesis Laboratory",
        "Pharmacology & Animal Simulation (CAL) Lab",
        "Pharmacognosy & Phytochemistry Research Wing",
        "Central Instrumentation Room (HPLC, FTIR, UV-Vis)"
      ]
    },
    {
      id: "central",
      title: "Central Facilities & Research",
      icon: BookOpen,
      description: "Core institutional resources supporting academic research, digital learning, and university administration.",
      facilities: [
        "Central Pharmacy Library with Digital E-Resources",
        "Computer Center & High-Speed Wi-Fi Research Hub",
        "Air-Conditioned Central Seminar Hall (Auditorium)",
        "Student Startup & Innovation Policy (SSIP) Cell",
        "Institutional Innovation Council (IIC) Ideation Room",
        "Training & Placement Cell Office"
      ]
    },
    {
      id: "amenities",
      title: "Student Life & Amenities",
      icon: Coffee,
      description: "Vibrant spaces dedicated to recreation, sports, dining, and overall student wellness.",
      facilities: [
        "Medicinal Plants Botanical Garden",
        "Hygienic Multi-Cuisine Student Cafeteria",
        "Cricket & Sports Playing Grounds",
        "Volleyball & Badminton Courts",
        "Indoor Sports Arena (Table Tennis, Chess, Carrom)",
        "First-Aid Medical & Health Observation Center"
      ]
    },
    {
      id: "hostel",
      title: "Hostels & Residential Complex",
      icon: Home,
      description: "Safe, comfortable, and well-equipped residential quarters for students, faculty, and visiting scholars.",
      facilities: [
        "In-Campus Boys Hostel Complex",
        "Secure Girls Hostel Complex with 24/7 Warden",
        "Faculty & Staff Residential Quarters",
        "Institutional Guest House for Visiting Scholars",
        "Solar Water Heating & RO Drinking Water Stations",
        "Campus Security Control & CCTV Surveillance"
      ]
    }
  ];

  const travelGuides = [
    {
      mode: "By Train (Surat Railway Station)",
      icon: Train,
      time: "30-35 Mins (~15 km)",
      detail: "Surat Railway Junction (ST) connects to all major Indian cities. Direct city buses, auto-rickshaws, and cab services operate frequently to Dumas Road."
    },
    {
      mode: "By City Bus / BRTS Transit",
      icon: Bus,
      time: "Direct Connectivity",
      detail: "Surat City Bus and BRTS routes have dedicated stops directly at the C. K. Pithawalla Educational Complex gate on Dumas Road."
    }
  ];

  const filteredZones = activeZone === "all" 
    ? campusZones 
    : campusZones.filter(z => z.id === activeZone);

  return (
    <SubPageLayout
      title="Campus Map & Location"
      subtitle="Explore our sprawling educational complex located on Surat-Dumas Road opposite Surat Airport."
      category="about-us"
      activeItemLabel="Campus Map"
    >
      <div className="space-y-12 text-[#3B3131]">
        
        {/* Banner Card */}
        <div className="bg-[#182f1d] text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
              <Compass size={14} />
              <span>Surat-Dumas Road Campus</span>
            </div>
            
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
              100-Acre Lush Green Educational Complex
            </h2>
            
            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-3xl">
              Situated in the clean, green coastal belt of Dumas, Surat, {INSTITUTE.fullName} offers a world-class environment with modern academic blocks, advanced engineering workshops, digital library facilities, and peaceful residential quarters.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/30 hover:bg-black/45 text-white border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <Navigation size={14} />
                <span>Navigate via Google Maps</span>
                <ExternalLink size={14} className="opacity-80" />
              </a>

              <div className="flex items-center gap-2 text-xs text-white/90 bg-white/15 px-3.5 py-2 rounded-xl border border-white/20">
                <MapPin size={14} className="text-white" />
                <span>Near Gujarat Maritime Board, Via Magdalla Port, Surat - 395007</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Campus Map Image Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900">CKPIPSR Campus Layout &amp; Facilities</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Geographical map showing location of academic departments, laboratories, library, hostels, and sports grounds.
              </p>
            </div>
            <a
              href={mapImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold transition-all shrink-0"
            >
              <span>View Full Campus View</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2 shadow-inner flex items-center justify-center">
            <img
              src={mapImageUrl}
              alt="CKPIPSR Campus Layout"
              className="w-full h-auto max-h-[650px] object-cover rounded-xl"
              decoding="async" loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/hero/college_campus.jpg";
              }}
            />
          </div>
        </div>

        {/* Interactive Google Map Embed */}
        <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Interactive Satellite Location</h3>
              <p className="text-xs text-slate-500 mt-0.5">Explore real-time directions, surrounding landmarks, and transit options on Google Maps.</p>
            </div>
            <span className="text-xs font-semibold text-[#00509d] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 self-start sm:self-auto">
              Surat-Dumas Road (Opp. Airport)
            </span>
          </div>
          <div className="w-full h-[420px] bg-slate-100 relative">
            <iframe
              title="CKPIPSR Location Google Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5923.654116328731!2d72.71618443860855!3d21.13191122833264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be052ae998fda3d%3A0x23340ab807f12d7!2sC.K.%20Pthawalla%20Institute%20of%20Pharmaceutical%20Science%20and%20Research!5e0!3m2!1sen!2sin!4v1679122645038!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Key Campus Zones Breakdown */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">Key Campus Zones & Facilities</h3>
              <p className="text-xs sm:text-sm text-slate-600">Structured layout of departments, laboratories, hostels, and sports infrastructure.</p>
            </div>

            {/* Zone filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Zones" },
                { id: "academic", label: "Academic" },
                { id: "central", label: "Central" },
                { id: "amenities", label: "Amenities" },
                { id: "hostel", label: "Hostels" }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveZone(btn.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeZone === btn.id
                      ? "bg-[#00509d] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredZones.map((zone) => {
              const ZoneIcon = zone.icon;
              return (
                <div 
                  key={zone.id}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#00509d] flex items-center justify-center font-bold">
                        <ZoneIcon size={20} />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-slate-900">{zone.title}</h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {zone.description}
                    </p>

                    <div className="pt-2 grid sm:grid-cols-2 gap-2">
                      {zone.facilities.map((fac, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 size={14} className="text-[#00509d] shrink-0 mt-0.5" />
                          <span>{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Reach / Connectivity Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">How to Reach the Campus</h3>
            <p className="text-xs sm:text-sm text-slate-600">Convenient connectivity from Surat railway junction and city bus transit hubs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {travelGuides.map((guide, idx) => {
              const GuideIcon = guide.icon;
              return (
                <div key={idx} className="bg-[#182f1d] text-white rounded-2xl p-6 space-y-3 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold">
                      <GuideIcon size={20} />
                    </div>
                    <h4 className="font-bold text-base text-white">{guide.mode}</h4>
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-white bg-black/20 px-2.5 py-0.5 rounded-md border border-white/20">
                      {guide.time}
                    </span>
                    <p className="text-xs text-white/90 leading-relaxed pt-1">
                      {guide.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visitor Information & Gate Timings */}
        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00509d]">
              <Clock size={16} />
              <span>Visitor Entry & Campus Timings</span>
            </div>
            <h4 className="font-serif font-bold text-lg text-slate-900">
              Campus Operating Hours & Security Registration
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Visitors, parents, and alumni may enter the campus after registering at the main security gate. Official visiting hours are Monday to Saturday, 9:00 AM to 5:00 PM ({CONTACT.timings}).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={`tel:${CONTACT.phones[0]}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#00509d] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#003d7a] transition-all shadow-sm"
            >
              <ShieldCheck size={16} />
              <span>Contact Security / Reception</span>
            </a>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}