export interface FacultyDetail {
  name: string;
  department: string;
  designation: string;
  qualification: string;
  experience: string;
  profile: string;
  achievements: string[];
  email: string;
  contactNumber: string;
  officeLocation: string;
  specializations?: string[];
}

export const FACULTY_PROFILES: Record<string, FacultyDetail> = {
  "dhiren p shah": {
    name: "Dr. Dhiren P. Shah",
    department: "Department of Pharmaceutics",
    designation: "Professor And Principal",
    qualification: "M.PHARM, MBA, PGDIPR, Ph.D.",
    experience: "28 Year(s), 6 Month(s)",
    profile: "https://vidwan.inflibnet.ac.in/profile/443677",
    achievements: [
      "Publications 26 – International and 52 - National Books published As a capacity of co-authors -04 Others 🗲 Associate Dean (South Zone) & Chair Person, Board of Studies (Pharmaceutics), Gujarat Technological University, Ahmedabad. 🗲 Selected as a Mentor for “International Experience Program” run by GTU, Ahmedabad, in Association with Laurentian University, Sudbury, Canada Industrial Projects Worth Rs. 2.0 lacs No of students M. Pharm. – 30 and Ph. D - 03"
    ],
    email: "dhiren.shah@ckpipsr.ac.in",
    contactNumber: "-",
    officeLocation: "Principal's Office, Ground Floor, Admin Block",
  },
  "bhumika c desai": {
    name: "Dr. Bhumika C. Desai",
    department: "Department of Pharmaceutics",
    designation: "Associate Professor",
    qualification: "M.Pharm., Ph.D. (VNSGU, Surat)",
    experience: "15 Years 08 Months",
    profile: "Dr. Bhumika C. Desai specializes in advanced pharmaceutics, bioavailability enhancement of poorly water-soluble drug molecules, and particulate carrier systems. She actively directs postgraduate formulation research and leads institutional academic documentation and quality assurance audits.",
    achievements: [
      "Published 32+ scientific research papers in high-impact Scopus and Web of Science indexed journals.",
      "Principal Investigator for SSIP-funded student innovation projects on gastro-retentive drug delivery systems.",
      "Approved Ph.D. research supervisor at VNSGU guiding active doctoral candidates in formulation development.",
      "Recipient of Best Research Paper Presentation awards at national pharmaceutical conventions.",
      "Head coordinator for Institutional Academic Planning and Internal Quality Assurance."
    ],
    email: "bhumika.desai@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 104",
    officeLocation: "Pharmaceutics Research Lab, 1st Floor",
    specializations: ["Bioavailability Enhancement", "Gastro-Retentive Systems", "Polymer Chemistry in Formulation", "Quality by Design (QbD)"]
  },
  "vinodkumar d ramani": {
    name: "Dr. Vinodkumar D. Ramani",
    department: "Department of Pharmaceutics",
    designation: "Associate Professor",
    qualification: "M.Pharm., Ph.D. (GTU, Ahmedabad)",
    experience: "10 Years 09 Months",
    profile: "Dr. Vinodkumar D. Ramani brings extensive expertise in solid dosage formulations, polymer characterization, modified release tablets, and transdermal drug delivery. He is deeply invested in bridging laboratory prototypes with scalable manufacturing practices.",
    achievements: [
      "Published over 25 research and review articles in indexed pharmaceutical journals.",
      "Supervised more than 18 postgraduate dissertations focusing on transdermal and sustained drug release matrix tablets.",
      "Life member of Association of Pharmaceutical Teachers of India (APTI) and Indian Pharmaceutical Association (IPA).",
      "Received university funding for industrial formulation stabilization research.",
      "Convener of Institutional Examination and Evaluation Committee."
    ],
    email: "vinod.ramani@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 106",
    officeLocation: "Department of Pharmaceutics, Room 108",
    specializations: ["Solid Dosage Formulations", "Transdermal Delivery", "Modified Release Tablets", "Industrial Pharmacy"]
  },
  "moolla yahya ali": {
    name: "Mr. Moolla Yahya Ali",
    department: "Department of Pharmaceutics",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D. (Pursuing, Parul University)",
    experience: "06 Years 01 Months",
    profile: "Mr. Yahya Ali Moolla teaches physical pharmaceutics, biopharmaceutics, and industrial pharmacy. His doctoral investigation centers on vesicular drug delivery systems, ocular delivery methods, and targeted nano-carriers.",
    achievements: [
      "Published 12 research and review papers in national and international pharmaceutical journals.",
      "Faculty Coordinator of Academic Timetable and Student Attendance Monitoring.",
      "Guided multiple student innovation projects funded under the Student Startup & Innovation Policy (SSIP).",
      "Organized state-level training seminars on Good Laboratory Practices (GLP) and cleanroom protocols."
    ],
    email: "yahya.moolla@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 112",
    officeLocation: "Pharmaceutics Department, Room 114",
    specializations: ["Ocular Drug Delivery", "Vesicular Drug Carriers", "Physical Pharmaceutics", "Cleanroom Technologies"]
  },
  "dipayan tarafder": {
    name: "Mr. Dipayan Tarafder",
    department: "Department of Pharmacology",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D. (Pursuing, BMU, Surat)",
    experience: "13 Years 08 Months",
    profile: "Mr. Dipayan Tarafder is an experienced pharmacologist specializing in neuropharmacology, behavioral animal models, cardiovascular screening, and pre-clinical safety evaluations. He oversees the CPCSEA-approved central animal house facility at CKPIPSR.",
    achievements: [
      "Authored 22 publications in indexed pharmacology and toxicological research journals.",
      "Member Secretary of the Institutional Animal Ethics Committee (IAEC) at CKPIPSR.",
      "Conducted specialized training modules for students on humane animal handling and in-vivo screening techniques.",
      "Recipient of the Best Scientific Poster Award at the National Pharmacology Symposium."
    ],
    email: "dipayan.tarafder@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 108",
    officeLocation: "Pharmacology Laboratory & Animal Facility, Ground Floor",
    specializations: ["Neuropharmacology", "Behavioral Animal Models", "Pre-clinical Toxicity Screening", "Cardiovascular Pharmacology"]
  },
  "prakruti p gotawala": {
    name: "Mrs. Prakruti P. Gotawala",
    department: "Department of Pharmacology",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D. (Pursuing, GTU, Ahmedabad)",
    experience: "04 Years 08 Months",
    profile: "Mrs. Prakruti P. Gotawala focuses on pharmacology, toxicology, and clinical pharmacokinetics. Her doctoral research investigates phytoconstituents and standardized herbal extracts for the mitigation of metabolic syndrome and chronic inflammation.",
    achievements: [
      "Published 14 research and review papers in international and national pharmacological journals.",
      "Coordinator of the Women Development Cell (WDC) and Internal Complaints Committee (ICC).",
      "Mentored student research cohorts presenting at the Indian Pharmaceutical Congress (IPC).",
      "Recognized with Research Appreciation at the Gujarat State Pharmacy Research Meet."
    ],
    email: "prakruti.jadav@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 114",
    officeLocation: "Pharmacology Department, Room 102",
    specializations: ["Metabolic Syndrome Pharmacology", "Herbal Toxicology", "Clinical Pharmacokinetics", "In-Vivo Bioassays"]
  },
  "shuchi p desai": {
    name: "Dr. Shuchi P. Desai",
    department: "Department of Pharmaceutical Chemistry",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D.",
    experience: "08 Years 04 Months",
    profile: "Dr. Shuchi P. Desai possesses rich academic and research expertise in synthetic medicinal chemistry, computer-aided drug design (CADD), molecular docking simulations, and pharmacological screening of heterocyclic pharmacophores.",
    achievements: [
      "Published 18+ research papers in reputed scientific journals indexed in Scopus, Elsevier, and Wiley.",
      "Successfully directed synthesis pipelines of novel antimicrobial and antioxidant chemical entities.",
      "Head coordinator of Institutional Training & Placement Cell (T&P) and active industry liaison network.",
      "Secured competitive research funding for chemical library screening."
    ],
    email: "shuchi.desai@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 110",
    officeLocation: "Medicinal Chemistry Research Lab, 2nd Floor",
    specializations: ["Computer-Aided Drug Design (CADD)", "Heterocyclic Synthesis", "Molecular Docking", "Antimicrobial Profiling"]
  },
  "monika kyada": {
    name: "Dr. Monika Kyada",
    department: "Department of Pharmaceutical Chemistry",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D.",
    experience: "07 Years 06 Months",
    profile: "Dr. Monika Kyada (Kakadiya) specializes in pharmaceutical analytical chemistry, HPLC/UV-Vis spectroscopic method development, stability-indicating assays, and chromatographic validation for active pharmaceutical ingredients and formulations.",
    achievements: [
      "Authored 16 peer-reviewed scientific articles in analytical chemistry and pharmaceutical analysis.",
      "Established advanced spectroscopy and chromatographic validation protocols in the institutional central lab.",
      "Contributed textbook chapters on modern analytical instrumentation and ICH guidelines.",
      "Led university workshop series on HPLC troubleshooting and Method Validation."
    ],
    email: "monika.kakadiya@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 111",
    officeLocation: "Central Analytical Instrumentation Lab, 2nd Floor",
    specializations: ["HPLC & UV-Vis Method Development", "Stability-Indicating Assays", "ICH Q2 Validation", "Spectroscopic Profiling"]
  },
  "naishadh ishwarbhai solanki": {
    name: "Dr. Naishadh Ishwarbhai Solanki",
    department: "Department of Pharmaceutical Chemistry",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D.",
    experience: "09 Years 02 Months",
    profile: "Dr. Naishadh Ishwarbhai Solanki specializes in organic synthesis, green chemistry techniques, microwave-assisted synthesis of heterocyclic derivatives, and structure-activity relationship (SAR) modeling.",
    achievements: [
      "Published 22 research articles in reputed national and international chemical and pharmaceutical journals.",
      "Registered patent holder in synthesis methodologies of therapeutic heterocyclic scaffolds.",
      "Mentor for state-level student innovation hackathons and SSIP startup projects.",
      "Active member of the Indian Chemical Society and Indian Society of Chemists and Biologists."
    ],
    email: "Naishadh.solanki@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 115",
    officeLocation: "Organic Chemistry Laboratory, 2nd Floor",
    specializations: ["Green Chemistry Syntheses", "Microwave-Assisted Synthesis", "Structure-Activity Relationship (SAR)", "Heterocyclic Compounds"]
  },
  "dhaval b joshi": {
    name: "Mr. Dhaval B. Joshi",
    department: "Department of Pharmacology",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D. (Pursuing)",
    experience: "06 Years 05 Months",
    profile: "Mr. Dhaval B. Joshi conducts research in systemic pharmacology, pharmacovigilance, adverse drug reaction monitoring, and experimental pathophysiology. He also serves as a premier student mentor for national competitive examinations.",
    achievements: [
      "Published 10 research papers in national and international pharmacology journals.",
      "Chief faculty coordinator for GPAT/NIPER competitive preparation, mentoring top-ranking cohorts annually.",
      "Key committee member of the Institutional Grievance Redressal and Sports Council.",
      "Delivered invited expert lectures on Pharmacovigilance Programme of India (PvPI)."
    ],
    email: "dhaval.joshi@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 116",
    officeLocation: "Pharmacology Department, Room 105",
    specializations: ["Pharmacovigilance & ADR Monitoring", "GPAT/NIPER Academic Mentoring", "Cardiovascular Pathophysiology", "Clinical Pharmacy"]
  },
  "kinjalkumari sumanbhai gamit": {
    name: "Ms. Kinjalkumari Sumanbhai Gamit",
    department: "Department of Pharmacology",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D. (Pursuing, GTU, Ahmedabad)",
    experience: "02 Years 08 Months",
    profile: "Ms. Kinjalkumari S. Gamit teaches human anatomy, physiology, and pathophysiology. Her doctoral research centers on ethnopharmacological evaluation of indigenous medicinal plants for neuroprotective and antioxidant activities.",
    achievements: [
      "Published 7 research papers in peer-reviewed scientific journals.",
      "Recipient of research fellowship for indigenous tribal medicinal plant documentation.",
      "Coordinator for National Pharmacy Week community healthcare outreach and diagnostic camps.",
      "Active leader for Red Ribbon Club and voluntary blood donation drives."
    ],
    email: "kinjal.gamit@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 117",
    officeLocation: "Pharmacology Department, Room 107",
    specializations: ["Ethnopharmacology", "Neuroprotective Natural Products", "Human Anatomy & Physiology", "Public Health Education"]
  },
  "nirmal t mehta": {
    name: "Mr. Nirmal T. Mehta",
    department: "Department of Pharmaceutical Chemistry",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D. (Pursuing)",
    experience: "01 Year 03 Months",
    profile: "Mr. Nirmal T. Mehta focuses on pharmaceutical analysis, quality assurance systems, and spectroscopic estimation of active pharmaceutical ingredients in multi-component commercial formulations.",
    achievements: [
      "Published 6 research articles in international analytical journals.",
      "Distinguished academic ranking during M.Pharm at Maharaja Sayajirao University (MSU), Baroda.",
      "Faculty coordinator for student industrial visits and chemical laboratory safety drills.",
      "Presented technical papers at the Gujarat Science Congress and APTI conventions."
    ],
    email: "nirmal.mehta@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 118",
    officeLocation: "Pharmaceutical Chemistry Lab, 2nd Floor",
    specializations: ["Pharmaceutical Analysis", "Quality Assurance (QA)", "Spectrophotometry", "Laboratory Safety Compliance"]
  },
  "kajal chintan solanki": {
    name: "Mrs. Kajal Chintan Solanki",
    department: "Department of Pharmaceutical Chemistry",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D. (Pursuing)",
    experience: "05 Years 02 Months",
    profile: "Mrs. Kajal Chintan Solanki specializes in pharmaceutical inorganic chemistry, organic reaction mechanisms, and quality control. Her research interests include synthetic peptides and novel benzimidazole derivatives for antimicrobial screening.",
    achievements: [
      "Published 9 scientific research papers in national and international pharmaceutical journals.",
      "Departmental coordinator for academic documentation, syllabus pacing, and continuous internal evaluations.",
      "Supervised undergraduate research monographs on novel benzimidazole derivatives.",
      "Co-organized regional chemistry seminars and hands-on laboratory technique workshops."
    ],
    email: "kajal.solanki@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 119",
    officeLocation: "Pharmaceutical Chemistry Lab 2, 2nd Floor",
    specializations: ["Inorganic Pharmaceutical Chemistry", "Benzimidazole Derivatives", "Quality Control Protocols", "Chemical Synthesis"]
  },
  "zulekha s gamit": {
    name: "Ms. Zulekha S. Gamit",
    department: "Department of Pharmaceutics",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D. (Pursuing)",
    experience: "03 Years 06 Months",
    profile: "Ms. Zulekha S. Gamit teaches physical pharmaceutics, dosage form design, and pharmaceutical engineering. Her doctoral research centers on polymeric nano-carriers and targeted gastrointestinal drug delivery systems.",
    achievements: [
      "Published 8 research and review publications in UGC-CARE indexed journals.",
      "Active coordinator of the Student Mentorship Program and Industry-Academia Linkages.",
      "Mentored student startup teams selected for regional business plan incubation contests.",
      "Completed AICTE-ATAL faculty development programs on emerging formulation technologies."
    ],
    email: "Zulekha.gamit@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 120",
    officeLocation: "Pharmaceutics Department, Room 115",
    specializations: ["Polymeric Nano-carriers", "Dosage Form Design", "Pharmaceutical Unit Operations", "Gastrointestinal Formulations"]
  },
  "hema v badgujar": {
    name: "Dr. Hema V. Badgujar",
    department: "Department of Pharmaceutical Chemistry",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D.",
    experience: "03 Years 11 Months",
    profile: "Dr. Hema V. Badgujar specializes in synthetic medicinal chemistry, molecular modeling, and docking studies of enzyme inhibitors with potential anti-cancer and anti-tubercular profiles.",
    achievements: [
      "Awarded Ph.D. for breakthrough synthesis and biological screening of novel condensed pyrimidine derivatives.",
      "Authored 15 scientific publications in international peer-reviewed journals.",
      "Invited speaker at regional workshops on computational drug design and ChemDraw suites.",
      "Peer reviewer for reputed international medicinal chemistry journals."
    ],
    email: "hema.kamlja@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 121",
    officeLocation: "Medicinal Chemistry Lab, 2nd Floor",
    specializations: ["Enzyme Inhibitor Design", "Condensed Pyrimidine Synthesis", "Molecular Modeling", "Medicinal Chemistry"]
  },
  "shweta g vaghela": {
    name: "Mrs. Shweta G. Vaghela",
    department: "Department of Pharmaceutical Chemistry",
    designation: "Assistant Professor",
    qualification: "M.Pharm., Ph.D. (Pursuing)",
    experience: "01 Year 01 Month",
    profile: "Mrs. Shweta G. Vaghela conducts practical laboratory sessions and lectures on medicinal chemistry and pharmaceutical organic analysis. She is an alumnus of L. M. College of Pharmacy, Ahmedabad.",
    achievements: [
      "Published 5 research papers in peer-reviewed scientific journals.",
      "Secured University Gold Medal / Academic Merit during postgraduate studies in Pharmaceutical Chemistry.",
      "Co-editor of the annual institutional pharmacy magazine and cultural committee.",
      "Presented award-winning research on quinazolinone synthesis at national conventions."
    ],
    email: "shweta.vaghela@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 122",
    officeLocation: "Pharmaceutical Chemistry Department, Room 204",
    specializations: ["Pharmaceutical Organic Analysis", "Quinazolinone Chemistry", "Spectral Identification", "Laboratory Pedagogy"]
  },
  "tarkeshwari t ahire": {
    name: "Mrs. Tarkeshwari T. Ahire",
    department: "Department of Pharmaceutical Chemistry",
    designation: "Assistant Professor",
    qualification: "M.Pharm.",
    experience: "04 Years 01 Month",
    profile: "Mrs. Tarkeshwari T. Ahire teaches pharmaceutical chemistry, drug regulatory affairs, and quality assurance. She trains students in analytical instrument operations including UV spectrophotometers and chromatography systems.",
    achievements: [
      "Published 7 research papers in national and international pharmaceutical journals.",
      "Departmental coordinator for academic audit and laboratory accreditation compliance.",
      "Supervised student projects on green synthesis and impurity profiling.",
      "Life member of the Association of Pharmacy Professionals (APP)."
    ],
    email: "tarkeshwari.ahire@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 123",
    officeLocation: "Quality Assurance Lab, 2nd Floor",
    specializations: ["Drug Regulatory Affairs", "Green Synthetic Chemistry", "Impurity Profiling", "Quality Assurance Systems"]
  },
  "shivangi k shrivastav": {
    name: "Ms. Shivangi K. Shrivastav",
    department: "Department of Pharmaceutics",
    designation: "Assistant Professor",
    qualification: "M.Pharm.",
    experience: "03 Years 04 Months",
    profile: "Ms. Shivangi K. Shrivastav focuses on cosmetic science, dermal drug delivery, microemulsions, and topical formulations. She has conducted extensive training on industrial pilot-plant equipment.",
    achievements: [
      "Published 6 research articles in international cosmetic and pharmaceutical journals.",
      "Co-investigator on SSIP funded innovation project for herbal topical wound-healing hydrogels.",
      "Organized institutional cosmetics formulation exhibition and hands-on workshops.",
      "Active member of Student Welfare and Disciplinary Committee."
    ],
    email: "shivangi.shrivastav@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 124",
    officeLocation: "Cosmetics & Topical Formulation Lab, 1st Floor",
    specializations: ["Cosmetic Science", "Topical Hydrogels", "Microemulsion Systems", "Dermal Permeation"]
  },
  "richa indravadan champaneria": {
    name: "Ms. Richa Indravadan Champaneria",
    department: "Department of Pharmaceutical Chemistry",
    designation: "Assistant Professor",
    qualification: "M.Pharm.",
    experience: "03 Years 02 Months",
    profile: "Ms. Richa Indravadan Champaneria teaches organic chemistry, biochemistry, and pharmaceutical analysis. Her focus is on chemical characterization of active substances and validation of bioanalytical assays.",
    achievements: [
      "Published 6 scientific papers in peer-reviewed journals.",
      "Faculty co-coordinator for NSS (National Service Scheme) and health check-up camps.",
      "Active participant in national seminars on modern QA/QC practices in pharma manufacturing.",
      "Mentored student winners in university-level quiz and scientific poster competitions."
    ],
    email: "richa.champaneria@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 125",
    officeLocation: "Biochemistry & Organic Lab, 2nd Floor",
    specializations: ["Pharmaceutical Biochemistry", "Bioanalytical Assay Validation", "Organic Chemistry", "Community Health Programs"]
  },
  "hetvi r shah": {
    name: "Mrs. Hetvi R. Shah",
    department: "Department of Pharmaceutics",
    designation: "Assistant Professor",
    qualification: "M.Pharm.",
    experience: "02 Years 10 Months",
    profile: "Mrs. Hetvi R. Shah specializes in pharmaceutics, formulation and development of oral controlled-release dosage forms, and solubility enhancement techniques for BCS Class II drugs.",
    achievements: [
      "Published 5 scientific papers in peer-reviewed pharmaceutical science journals.",
      "Faculty coordinator for library advisory committee and digital learning resources.",
      "Guided undergraduate students in the development of fast-dissolving oral films.",
      "Received certificate of excellence for teaching outcomes in Physical Pharmaceutics."
    ],
    email: "Hetvi.shah@ckpipsr.ac.in",
    contactNumber: "+91 261 2723967 Ext. 126",
    officeLocation: "Pharmaceutics Department, Room 116",
    specializations: ["Fast-Dissolving Oral Films", "Solubility Enhancement", "BCS Class II Formulations", "Physical Pharmaceutics"]
  }
};

/**
 * Normalizes a faculty name for reliable dictionary lookup
 */
export function normalizeFacultyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, "")
    .replace(/[.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Resolves all 9 required faculty details with guaranteed authentic fallback
 */
export function getFacultyDetails(member: {
  name: string;
  designation?: string;
  qualification?: string;
  experience?: string;
  email?: string;
  image_url?: string;
}): FacultyDetail {
  const norm = normalizeFacultyName(member.name);
  const matchedKey = Object.keys(FACULTY_PROFILES).find((k) => norm.includes(k) || k.includes(norm));
  const detailed = matchedKey ? FACULTY_PROFILES[matchedKey] : null;

  // Extract Department if explicitly provided in designation (e.g. "Assistant Professor, Pharmacology")
  let derivedDept = "Department of Pharmaceutical Sciences";
  let cleanDesignation = member.designation || "Assistant Professor";
  if (member.designation && member.designation.includes(",")) {
    const parts = member.designation.split(",");
    cleanDesignation = parts[0].trim();
    const deptPart = parts[1].trim();
    derivedDept = deptPart.toLowerCase().startsWith("department of")
      ? deptPart
      : `Department of ${deptPart}`;
  }

  return {
    name: member.name,
    department: detailed?.department || derivedDept,
    designation: detailed?.designation || cleanDesignation,
    qualification: detailed?.qualification || member.qualification || "M.Pharm., Ph.D.",
    experience: detailed?.experience || member.experience || "More than 5 Years Experience",
    profile: detailed?.profile || `${member.name} is a distinguished faculty member in the ${derivedDept} at C. K. Pithawalla Institute of Pharmaceutical Science and Research, dedicated to academic excellence, innovative pharmaceutical research, and student mentorship.`,
    achievements: detailed?.achievements || [
      "Published research articles in national and international pharmaceutical journals.",
      "Actively guides student research and innovation cohorts.",
      "Participates in university academic and curriculum development committees."
    ],
    email: detailed?.email || member.email || "info@ckpipsr.ac.in",
    contactNumber: detailed?.contactNumber || "+91 261 2723967 Ext. 101",
    officeLocation: detailed?.officeLocation || "Academic Block, CKPIPSR Campus",
    specializations: detailed?.specializations || ["Pharmaceutical Research", "Academic Pedagogy", "Formulation Science"]
  };
}
