import React from "react";
import { motion } from "motion/react";
import { 
  GraduationCap, 
  Building2, 
  User, 
  FileText, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface ScholarRecord {
  id: string;
  scholarName: string;
  registrationYear: number;
  thesisTitle: string;
}

interface GuideRecord {
  guideId: number;
  guideName: string;
  university: string;
  scholars: ScholarRecord[];
}

const doctoralData: GuideRecord[] = [
  {
    guideId: 1,
    guideName: "Dr. Dhiren P. Shah",
    university: "Gujarat Technological University",
    scholars: [
      {
        id: "dps-1",
        scholarName: "Mr. Jaynish Tailor",
        registrationYear: 2018,
        thesisTitle: "Artificial Arterial Model : A Quality Tool for Evaluation of Endovascular Dosage Forms"
      },
      {
        id: "dps-2",
        scholarName: "Mr. Yash Dudhwala",
        registrationYear: 2022,
        thesisTitle: "Formulation Development & Optimization of Colon Targeted Drug Delivery System for Anticancer Drug"
      },
      {
        id: "dps-3",
        scholarName: "Ms. Nikita Vaghela",
        registrationYear: 2022,
        thesisTitle: "Formulation & Evaluation of Topical Drug Delivery System by DoE Approach"
      },
      {
        id: "dps-4",
        scholarName: "Ms. Bhumi Bhatt",
        registrationYear: 2023,
        thesisTitle: "Formulating & Evaluation of Nano Drug Delivery for Breast Cancer Therapy"
      },
      {
        id: "dps-5",
        scholarName: "Ms. Raja Manali",
        registrationYear: 2023,
        thesisTitle: "Formulation & Optimization of Oral Film of Anti-Emetic Drug"
      },
      {
        id: "dps-6",
        scholarName: "Ms. Zankruti Patel",
        registrationYear: 2023,
        thesisTitle: "Development & Characterization of Brain Targeted Nano Based Formulation via Nasal Route"
      }
    ]
  },
  {
    guideId: 2,
    guideName: "Dr. Vinod D. Ramani",
    university: "Gujarat Technological University",
    scholars: [
      {
        id: "vdr-1",
        scholarName: "Ms. Mehta Riya Kalpesh",
        registrationYear: 2025,
        thesisTitle: "Design And Optimization of Nanoparticle-Based Site-Specific Anticancer Therapy in Non-Hodgkin Lymphoma"
      },
      {
        id: "vdr-2",
        scholarName: "Ms. Nirali Sharma",
        registrationYear: 2025,
        thesisTitle: "Formulation And Optimization of Nano-Carrier for Targeted Therapy in Skin Cancer"
      },
      {
        id: "vdr-3",
        scholarName: "Ms. Siddique Iram Fatema Mohammed Faruk",
        registrationYear: 2025,
        thesisTitle: "Nano-Emulsion Gel of Luliconazole and Azelaic Acid for Recalcitrant Dermatophytosis & Sebo-Inflammatory Skin"
      }
    ]
  }
];

export default function DoctoralStudies() {
  return (
    <SubPageLayout
      title="Doctoral Studies"
      subtitle="Ph.D. Research Scholars, Approved University Guides & Advanced Doctoral Dissertations"
      category="research-and-innovation"
      activeItemLabel="Research - Doctoral Studies"
    >
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Main Doctoral Studies Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-slate-900 text-white px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/10 text-emerald-400 flex items-center justify-center font-bold border border-white/15">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                  Doctoral Studies (Ph.D. Program)
                </h3>
                <p className="text-xs font-sans text-slate-300 mt-0.5">
                  C.K. Pithawalla Institute of Pharmaceutical Science & Research
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-medium self-start sm:self-center">
              <Building2 size={13} />
              <span>GTU Affiliated Research Center</span>
            </span>
          </div>

          {/* Official Formatted Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-800 font-serif">
                  <th className="py-4 px-4 font-bold text-center w-14 text-slate-900">
                    No
                  </th>
                  <th className="py-4 px-5 font-bold w-52 text-slate-900 border-l border-slate-200">
                    Name of Full Time Teacher with Ph.D
                  </th>
                  <th className="py-4 px-5 font-bold w-52 text-slate-900 border-l border-slate-200">
                    Recognized as Research Guide for Ph.D in University
                  </th>
                  <th className="py-4 px-5 font-bold w-52 text-slate-900 border-l border-slate-200">
                    Name of Scholar
                  </th>
                  <th className="py-4 px-4 font-bold text-center w-36 text-slate-900 border-l border-slate-200">
                    Year of Registration of Scholar
                  </th>
                  <th className="py-4 px-5 font-bold text-slate-900 border-l border-slate-200">
                    Title of Thesis
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {doctoralData.map((guide, gIdx) => (
                  <React.Fragment key={guide.guideId}>
                    {guide.scholars.map((scholar, sIdx) => {
                      const isFirstRowOfGuide = sIdx === 0;
                      return (
                        <tr 
                          key={scholar.id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          {/* S.No column (grouped or individual) */}
                          {isFirstRowOfGuide ? (
                            <td 
                              rowSpan={guide.scholars.length} 
                              className="py-4 px-4 font-mono font-bold text-slate-800 text-center align-top bg-slate-50/40 border-r border-slate-200"
                            >
                              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1a5d2e] border border-emerald-200 font-mono text-xs font-bold inline-flex items-center justify-center">
                                {guide.guideId}
                              </span>
                            </td>
                          ) : null}

                          {/* Guide Name column (Rowspan across all scholars under this guide) */}
                          {isFirstRowOfGuide ? (
                            <td 
                              rowSpan={guide.scholars.length}
                              className="py-4 px-5 align-top bg-white border-r border-slate-200"
                            >
                              <div className="flex items-start gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-slate-100 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5">
                                  <User size={16} />
                                </div>
                                <div>
                                  <span className="font-serif font-bold text-slate-900 text-sm block">
                                    {guide.guideName}
                                  </span>
                                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                                    Approved Ph.D. Guide
                                  </span>
                                </div>
                              </div>
                            </td>
                          ) : null}

                          {/* University column (Rowspan across all scholars under this guide) */}
                          {isFirstRowOfGuide ? (
                            <td 
                              rowSpan={guide.scholars.length}
                              className="py-4 px-5 align-top bg-white border-r border-slate-200"
                            >
                              <div className="flex items-center gap-2 text-slate-700 font-medium text-xs sm:text-sm">
                                <Building2 size={15} className="text-[#1a5d2e] shrink-0" />
                                <span>{guide.university}</span>
                              </div>
                            </td>
                          ) : null}

                          {/* Scholar Name */}
                          <td className="py-4 px-5 font-semibold text-slate-900 align-top border-r border-slate-200">
                            <span className="text-slate-900 block font-medium">
                              {scholar.scholarName}
                            </span>
                          </td>

                          {/* Year of Registration */}
                          <td className="py-4 px-4 font-mono font-bold text-slate-700 text-center align-top border-r border-slate-200">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono">
                              <Calendar size={12} className="text-slate-400" />
                              <span>{scholar.registrationYear}</span>
                            </span>
                          </td>

                          {/* Title of Thesis */}
                          <td className="py-4 px-5 text-slate-700 font-medium leading-relaxed align-top">
                            <div className="flex items-start gap-2">
                              <FileText size={15} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm font-sans text-slate-800">
                                {scholar.thesisTitle}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer Institutional Note */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-sans text-slate-600">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#1a5d2e] shrink-0" />
            <span>Ph.D. Research Center approved by Gujarat Technological University (GTU), Ahmedabad.</span>
          </div>
          <span className="font-mono text-slate-400">CKPIPSR Doctoral Registry</span>
        </div>

      </div>
    </SubPageLayout>
  );
}
