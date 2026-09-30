import React from "react";
import SubPageLayout from "../../components/SubPageLayout";
import { ResourceDetailLayout } from "../../components/AcademicsLayouts";
import { LeafTileGallery } from "../../components/LeafTileGallery";
import { useLaboratoriesContent } from "../../hooks/useLaboratoriesContent";
import {
  DEFAULT_CAFETERIA,
  DEFAULT_CENTRAL_FACILITIES,
  DEFAULT_EV_CHARGING,
  DEFAULT_HOSTEL,
  DEFAULT_LIBRARY,
  DEFAULT_MEDICAL,
  DEFAULT_MEDICINAL_GARDEN,
  DEFAULT_SEMINAR_HALL,
  DEFAULT_SPORTS,
  DEFAULT_TRANSPORTATION,
  useResourcePageContent,
  type ResourcePageContent,
} from "../../hooks/useResourcePageContent";
import { Beaker, Sparkles, CheckCircle } from "lucide-react";

export const Laboratories = () => {
  const content = useLaboratoriesContent();

  return (
  <SubPageLayout title={content.pageTitle} category="academics" activeItemLabel="Resources - Laboratories">
    <div className="space-y-16">
      {/* Intro Banner */}
      <div className="relative bg-[#123a1a] rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl border border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-md text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles size={12} className="animate-pulse" />
            <span>{content.banner.badge}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {content.banner.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
            {content.banner.body}
          </p>
        </div>
      </div>

      {/* Lab List Grid */}
      <div className="space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
            {content.list.heading}
          </h3>
          {content.list.subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {content.list.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.labs.map((lab, labIdx) => (
            <div
              key={labIdx}
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
                    {lab.wing && (
                      <span className="text-[10px] font-mono font-bold text-[#8c6d12] uppercase tracking-wider block mt-1">
                        {lab.wing}
                      </span>
                    )}
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
                {lab.status && (
                  <span className="text-[#123a1a] flex items-center gap-1 bg-[#123a1a]/5 px-2 py-0.5 rounded-md text-[10px]">
                    <CheckCircle size={10} className="text-[#D4AF37]" />
                    <span>{lab.status}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Laboratory Photo Gallery */}
      {content.gallery.photos.length > 0 && (
        <LeafTileGallery
          photos={content.gallery.photos}
          title={content.gallery.heading}
          subtitle={content.gallery.subtitle}
          facilityName="Laboratory"
        />
      )}
    </div>
  </SubPageLayout>
  );
};

/** A Resources page whose words come from the panel. */
const EditableResourcePage = ({
  section,
  fallback,
  activeItemLabel,
}: {
  section: string;
  fallback: ResourcePageContent;
  activeItemLabel: string;
}) => {
  const content = useResourcePageContent(section, fallback);

  const note = content.note;
  const showNote = !!note && (!!note.heading || !!note.body);

  return (
    <SubPageLayout title={content.pageTitle} category="academics" activeItemLabel={activeItemLabel}>
      <div className="space-y-8">
        <ResourceDetailLayout
          title={content.title}
          description={content.description}
          image={content.image}
          features={content.features}
          details={content.details}
          badge={content.badge}
          detailsHeading={content.detailsHeading}
          gallery={content.gallery}
        />
        {showNote && (
          <div className="bg-[#FAF8F3] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            {note.heading && (
              <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-200 pb-3">
                {note.heading}
              </h4>
            )}
            {note.body && (
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans text-justify">
                {note.body}
              </p>
            )}
          </div>
        )}
      </div>
    </SubPageLayout>
  );
};

export const Library = () => (
  <EditableResourcePage
    section="library"
    fallback={DEFAULT_LIBRARY}
    activeItemLabel="Resources - Library"
  />
);

export const Sports = () => (
  <EditableResourcePage
    section="sports"
    fallback={DEFAULT_SPORTS}
    activeItemLabel="Resources - Sports"
  />
);

export const Hostel = () => (
  <EditableResourcePage
    section="hostel"
    fallback={DEFAULT_HOSTEL}
    activeItemLabel="Resources - Hostel"
  />
);

export const Medical = () => (
  <EditableResourcePage
    section="medical"
    fallback={DEFAULT_MEDICAL}
    activeItemLabel="Resources - Medical"
  />
);

export const Transportation = () => (
  <EditableResourcePage
    section="transportation"
    fallback={DEFAULT_TRANSPORTATION}
    activeItemLabel="Resources - Transportation"
  />
);

export const SeminarHall = () => (
  <EditableResourcePage
    section="seminarHall"
    fallback={DEFAULT_SEMINAR_HALL}
    activeItemLabel="Resources - Seminar Hall"
  />
);

export const Cafeteria = () => (
  <EditableResourcePage
    section="cafeteria"
    fallback={DEFAULT_CAFETERIA}
    activeItemLabel="Resources - Cafeteria"
  />
);

export const CentralFacilities = () => (
  <EditableResourcePage
    section="centralFacilities"
    fallback={DEFAULT_CENTRAL_FACILITIES}
    activeItemLabel="Resources - Central Facilities"
  />
);

export const EVChargingStation = () => (
  <EditableResourcePage
    section="evCharging"
    fallback={DEFAULT_EV_CHARGING}
    activeItemLabel="Resources - EV Charging Station"
  />
);

export const MedicinalGarden = () => (
  <EditableResourcePage
    section="medicinalGarden"
    fallback={DEFAULT_MEDICINAL_GARDEN}
    activeItemLabel="Resources - Medicinal Garden"
  />
);
