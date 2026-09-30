import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Students Corner → Scholarships.
 *
 * Two tabs: the schemes students may apply for, and the register of what has
 * been awarded. The register is the interesting half — nearly two hundred rows
 * filtered four ways at once — and none of what surrounds it is stored: the
 * count on the tab, the year pills and their counts, the scheme and class
 * dropdowns, the span of years, the rupee totals and each amount's formatting
 * all arrive worked out, so a dropdown cannot offer a year with nothing in it.
 *
 * The shipped copy below is the page as it stood before it was editable.
 */
export interface ScholarshipOrg {
  id: string;
  organization: string;
  name: string;
  website: string;
  category: string;
  eligibility: string;
  degreeApplicable: string;
}

export interface ScholarshipNoticeCard {
  title: string;
  body: string;
}

export interface AwardedStudent {
  id: string;
  academicYear: string;
  studentName: string;
  classLevel: string;
  category: string;
  amount: number;
  /** The amount as the table prints it, worked out by the API. */
  amountFormatted: string;
  scholarshipAgency: string;
}

/** One option of a dropdown, with how many records it would show. */
export interface FilterOption {
  value: string;
  count: number;
}

export interface ScholarshipsContent {
  pageTitle: string;
  pageSubtitle: string;
  tabs: { organizations: string; awarded: string };
  organizations: {
    searchPlaceholder: string;
    filterLabel: string;
    allLabel: string;
    categories: string[];
    items: ScholarshipOrg[];
    /** Carries {query}, which the page fills in with what was searched for. */
    emptyMessage: string;
    notice: { heading: string; blurb: string; cards: ScholarshipNoticeCard[] };
  };
  awarded: {
    kicker: string;
    heading: string;
    blurb: string;
    yearFilterLabel: string;
    allYearsLabel: string;
    searchPlaceholder: string;
    allSchemesLabel: string;
    allClassesLabel: string;
    showingLabel: string;
    sumLabel: string;
    emptyMessage: string;
    resetLabel: string;
    highAmountFrom: number;
    items: AwardedStudent[];
    years: FilterOption[];
    schemes: FilterOption[];
    classes: FilterOption[];
    range: string;
    totalAmount: number;
    totalAmountFormatted: string;
  };
  /** What the tab strip shows beside the awarded tab. */
  awardedCount: number;
}

/** The page as it shipped, and what it falls back to. */
export const DEFAULT_SCHOLARSHIPS: ScholarshipsContent = {
  "pageTitle": "Scholarships",
  "pageSubtitle": "Comprehensive portal links, government welfare schemes, and institutional scholarship awards.",
  "tabs": {
    "organizations": "Scholarship Organizations",
    "awarded": "Scholarship Awarded"
  },
  "organizations": {
    "searchPlaceholder": "Search organization or scheme (e.g. MYSY, Digital Gujarat, AICTE)...",
    "filterLabel": "Filter:",
    "allLabel": "All Schemes",
    "categories": [
      "State Govt",
      "Central Govt",
      "Women / Girls",
      "Foundation / Corporate"
    ],
    "items": [
      {
        "id": "org-1",
        "organization": "Digital Gujarat,Government of Gujarat",
        "name": "Post Matric Scholarship for SC/ST/SEBC/OBC",
        "website": "https://www.digitalgujarat.gov.in/loginapp/CitizenLogin.aspx",
        "category": "State Govt",
        "eligibility": "SC, ST, SEBC, OBC domicile students of Gujarat",
        "degreeApplicable": "D.Pharm / B.Pharm / M.Pharm"
      },
      {
        "id": "org-2",
        "organization": "Education Department, Gujarat State.",
        "name": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "website": "https://mysy.guj.nic.in/",
        "category": "State Govt",
        "eligibility": "Securing >=80 percentile in 12th Sci / Diploma with family income <= ₹6.00 Lakh",
        "degreeApplicable": "D.Pharm / B.Pharm"
      },
      {
        "id": "org-3",
        "organization": "Glow & Lovely Careers",
        "name": "Glow & Lovely Foundation Scholarships (Girls)",
        "website": "https://www.glowandlovelycareers.in/en/scholarship-for-women",
        "category": "Women / Girls",
        "eligibility": "Female students pursuing higher education across recognized colleges",
        "degreeApplicable": "B.Pharm / Graduation"
      },
      {
        "id": "org-4",
        "organization": "L’Oréal India",
        "name": "L’oréal India for Young Women in Science Scholarships (Girls)",
        "website": "https://www.buddy4study.com/article/loreal-india-for-young-women-in-science-scholarship",
        "category": "Women / Girls",
        "eligibility": "Meritorious young women entering Science/Pharma higher education",
        "degreeApplicable": "B.Pharm (First Year)"
      },
      {
        "id": "org-5",
        "organization": "AICTE",
        "name": "Pragati & Saksham Scholarship (Girls)",
        "website": "https://www.aicte-pragati-saksham-gov.in/",
        "category": "Central Govt",
        "eligibility": "Girls / Specially-abled students admitted to AICTE approved technical programs",
        "degreeApplicable": "D.Pharm / B.Pharm"
      },
      {
        "id": "org-6",
        "organization": "AICTE",
        "name": "GPAT Scholarship for Masters",
        "website": "https://www.aicte-india.org/schemes/students-development-schemes/PG-Scholarship-Scheme",
        "category": "Central Govt",
        "eligibility": "GPAT qualified students admitted to AICTE approved M.Pharm degree",
        "degreeApplicable": "M.Pharm (All Specializations)"
      },
      {
        "id": "org-7",
        "organization": "ONGC Foundation",
        "name": "ONGC Foundation Scholarship Scheme for OBC Category Students",
        "website": "https://ongcscholar.org/#/fellowshipScheme",
        "category": "Foundation / Corporate",
        "eligibility": "Meritorious OBC category full-time students with income criteria",
        "degreeApplicable": "B.Pharm / Professional Degree"
      },
      {
        "id": "org-8",
        "organization": "Ministry of Social Justice & Empowerment, Govt. of India",
        "name": "NSP Top Class Education Scheme for SC Students",
        "website": "https://www.buddy4study.com/scholarship/top-class-education-scheme-for-sc-students",
        "category": "Central Govt",
        "eligibility": "SC category students meeting National Scholarship Portal (NSP) guidelines",
        "degreeApplicable": "B.Pharm / M.Pharm"
      },
      {
        "id": "org-9",
        "organization": "Ministry of Education, Govt. of India",
        "name": "Central Sector Scheme of Scholarship for College and University Students",
        "website": "https://www.education.gov.in/hi/scholarships-education-loan-0-hi",
        "category": "Central Govt",
        "eligibility": "Top 20th percentile students in 10+2 board examinations",
        "degreeApplicable": "Graduation / B.Pharm"
      },
      {
        "id": "org-10",
        "organization": "North South Foundation, India chapter",
        "name": "NSF Scholarship",
        "website": "https://northsouth.org/public/IndiaScholarships/Scholarships",
        "category": "Foundation / Corporate",
        "eligibility": "Financially challenged meritorious students entering professional degrees",
        "degreeApplicable": "B.Pharm"
      },
      {
        "id": "org-11",
        "organization": "Reliance Foundation",
        "name": "Dhirubhai Ambani Scholarship",
        "website": "https://das.reliancefoundation.org/",
        "category": "Foundation / Corporate",
        "eligibility": "CBSE / State board meritorious rankers & physically challenged scholars",
        "degreeApplicable": "Undergraduate Degrees"
      },
      {
        "id": "org-12",
        "organization": "Vidyadhan India",
        "name": "Vidyadhan Scholarship",
        "website": "https://www.vidyadhan.org/web/index.php",
        "category": "Foundation / Corporate",
        "eligibility": "Meritorious students from economically backward families",
        "degreeApplicable": "D.Pharm / B.Pharm"
      },
      {
        "id": "org-13",
        "organization": "HDFC Bank, India",
        "name": "HDFC Scholarship",
        "website": "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecs-scholarship",
        "category": "Foundation / Corporate",
        "eligibility": "Merit-cum-means assistance under HDFC Parivartan ECS initiative",
        "degreeApplicable": "Professional & Degree Courses"
      },
      {
        "id": "org-14",
        "organization": "UGC",
        "name": "Post Graduate Indira Gandhi Scholarship for Single Girl Child",
        "website": "https://www.ugc.ac.in/oldpdf/xiplanpdf/revisedig_sgc_guideline24aug09.pdf",
        "category": "Central Govt",
        "eligibility": "Single girl child enrolled in non-professional/professional master degrees",
        "degreeApplicable": "Postgraduate Studies / M.Pharm"
      },
      {
        "id": "org-15",
        "organization": "Sitaram Jindal Foundation",
        "name": "Sitaram Jindal Foundation Scholarship",
        "website": "https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php",
        "category": "Foundation / Corporate",
        "eligibility": "Students pursuing general or professional degrees across India",
        "degreeApplicable": "Diploma / Degree Pharmacy"
      }
    ],
    "emptyMessage": "No scholarship organization found matching \"{query}\".",
    "notice": {
      "heading": "Application Instructions & Institutional Support",
      "blurb": "Essential documents and verification steps for student scholarship applications.",
      "cards": [
        {
          "title": "MANDATORY DOCUMENTS",
          "body": "Aadhaar Card, Gujarat Domicile Certificate, Income Certificate, Caste Certificate, Previous Marksheets, and College Fee Receipts."
        },
        {
          "title": "BANK ACCOUNT SEEDING",
          "body": "The student's bank savings account must be in their own name and actively Aadhaar-seeded / NPCI mapped for direct DBT credit."
        },
        {
          "title": "COLLEGE SCHOLARSHIP DESK",
          "body": "Students must submit hard copies of online applications along with original documents to the college administration office for principal endorsement."
        }
      ]
    }
  },
  "awarded": {
    "kicker": "Official Disbursal Records",
    "heading": "Scholarship Awarded Student Registry",
    "blurb": "Complete institutional registry of verified scholarship grants disbursed to meritorious and eligible students across government, state, and foundation schemes.",
    "yearFilterLabel": "Filter Academic Year:",
    "allYearsLabel": "All Years ({count})",
    "searchPlaceholder": "Search student, scheme, class, or agency...",
    "allSchemesLabel": "All Scholarship Schemes ({count})",
    "allClassesLabel": "All Classes (F.Y., S.Y., T.Y., Final)",
    "showingLabel": "Showing {count} of {total} records",
    "sumLabel": "Filtered Disbursal Sum:",
    "emptyMessage": "No student records found matching your filters.",
    "resetLabel": "Reset all filters",
    "highAmountFrom": 50000,
    "items": [
      {
        "id": "aw-1",
        "academicYear": "2021-22",
        "studentName": "Khan Adanan Moh. Muteef",
        "classLevel": "S. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-2",
        "academicYear": "2021-22",
        "studentName": "Kachhadiya Gopi Vipulbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-3",
        "academicYear": "2021-22",
        "studentName": "Tamakuwala Tushar Mitulkumar",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-4",
        "academicYear": "2021-22",
        "studentName": "Khatrani Namrata Maheshbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 5000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹5,000"
      },
      {
        "id": "aw-5",
        "academicYear": "2021-22",
        "studentName": "Patel Vidhi Sunilkumar",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-6",
        "academicYear": "2021-22",
        "studentName": "Ansari Shayraparvin Kalamuddin",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-7",
        "academicYear": "2021-22",
        "studentName": "Raloliya Utsav Dhirubhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-8",
        "academicYear": "2021-22",
        "studentName": "Singh Saumya Rahulkumar",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-9",
        "academicYear": "2021-22",
        "studentName": "Sanghani Jency Pankajbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-10",
        "academicYear": "2021-22",
        "studentName": "Goti Bhautik Dineshbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-11",
        "academicYear": "2021-22",
        "studentName": "Sharma Anali Nirmalkumar",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-12",
        "academicYear": "2021-22",
        "studentName": "Patel Vishv Jitendrakumar",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-13",
        "academicYear": "2021-22",
        "studentName": "Patel Jenilkumar Jayeshbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-14",
        "academicYear": "2021-22",
        "studentName": "Shaikh Mohammed Hamza",
        "classLevel": "S. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-15",
        "academicYear": "2021-22",
        "studentName": "Naik Krishna Niketanbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-16",
        "academicYear": "2021-22",
        "studentName": "Shah Purav Nimeshbhai",
        "classLevel": "Final B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-17",
        "academicYear": "2021-22",
        "studentName": "Shaikh Ayaz Ahmed Riyaz",
        "classLevel": "S. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-18",
        "academicYear": "2021-22",
        "studentName": "Shaikh Noman Shahid",
        "classLevel": "Final B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-19",
        "academicYear": "2021-22",
        "studentName": "Hasmi Mo Ismail",
        "classLevel": "S. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-20",
        "academicYear": "2021-22",
        "studentName": "Swain Vishal Hemant",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-21",
        "academicYear": "2021-22",
        "studentName": "Sureja Nirmal Rajeshbhai",
        "classLevel": "Final B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 40000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹40,000"
      },
      {
        "id": "aw-22",
        "academicYear": "2021-22",
        "studentName": "Vaishnav Harshil Vipinkumar",
        "classLevel": "Final B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-23",
        "academicYear": "2021-22",
        "studentName": "Guna Siddharth Ketanbhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-24",
        "academicYear": "2020-21",
        "studentName": "Kaklotar Dhaval Popatbhai",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-25",
        "academicYear": "2020-21",
        "studentName": "Patel Sagar Vinodbhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 85350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹85,350"
      },
      {
        "id": "aw-26",
        "academicYear": "2020-21",
        "studentName": "Devganiya Rahul Hamabhai",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-27",
        "academicYear": "2020-21",
        "studentName": "Parmar Sanket Pravinbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-28",
        "academicYear": "2020-21",
        "studentName": "Ghantiwala Aditya Bakulbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-29",
        "academicYear": "2020-21",
        "studentName": "Sarvaiya Amit Bhupatbhai",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-30",
        "academicYear": "2020-21",
        "studentName": "Jariwala Sahil Vinodkumar",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-31",
        "academicYear": "2020-21",
        "studentName": "Malankiya Ravikumar Jayantibhai",
        "classLevel": "T.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-32",
        "academicYear": "2020-21",
        "studentName": "Maru Dipakkumar Jivrajbhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84500,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,500"
      },
      {
        "id": "aw-33",
        "academicYear": "2020-21",
        "studentName": "Gamit Rejinaben Sumanbhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 85350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹85,350"
      },
      {
        "id": "aw-34",
        "academicYear": "2020-21",
        "studentName": "Surati Nidhi Nandkishor",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 5830,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹5,830"
      },
      {
        "id": "aw-35",
        "academicYear": "2020-21",
        "studentName": "Katariya Roshniben Himmatbhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6000,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,000"
      },
      {
        "id": "aw-36",
        "academicYear": "2020-21",
        "studentName": "Sosa Himaxi Govindbhai",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 83000,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹83,000"
      },
      {
        "id": "aw-37",
        "academicYear": "2020-21",
        "studentName": "Chauhan Mihirkumar Balvantbhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 83830,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹83,830"
      },
      {
        "id": "aw-38",
        "academicYear": "2020-21",
        "studentName": "Parmar Ajay Chhaganbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 82240,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹82,240"
      },
      {
        "id": "aw-39",
        "academicYear": "2020-21",
        "studentName": "Jiyaviya Dhwani Jayeshbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 82240,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹82,240"
      },
      {
        "id": "aw-40",
        "academicYear": "2020-21",
        "studentName": "Kacha Jay Jagdishbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-41",
        "academicYear": "2020-21",
        "studentName": "Kachariya Vishal Maheshbhai",
        "classLevel": "T.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-42",
        "academicYear": "2020-21",
        "studentName": "Chandel Prince Kailas",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 50000,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹50,000"
      },
      {
        "id": "aw-43",
        "academicYear": "2020-21",
        "studentName": "Sisara Hardikbhai shamjibhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-44",
        "academicYear": "2020-21",
        "studentName": "Singh Mamta Kunwar Kalyan Singh",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-45",
        "academicYear": "2020-21",
        "studentName": "Patel Sachi Manishkumar",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-46",
        "academicYear": "2020-21",
        "studentName": "Khan Abdulkarim Masuralam",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-47",
        "academicYear": "2020-21",
        "studentName": "Jadav Jemishkumar Bharatbhai",
        "classLevel": "Final B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-48",
        "academicYear": "2020-21",
        "studentName": "Joshi Bharat Rughlalji",
        "classLevel": "Final B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-49",
        "academicYear": "2020-21",
        "studentName": "Sureja Nirmal Rajeshbhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 40000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹40,000"
      },
      {
        "id": "aw-50",
        "academicYear": "2020-21",
        "studentName": "Patel Minuben Sanjaybhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-51",
        "academicYear": "2020-21",
        "studentName": "Mehta Riya Kalpesh",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-52",
        "academicYear": "2020-21",
        "studentName": "Sanepara Rutvik Mansukhbhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-53",
        "academicYear": "2020-21",
        "studentName": "Padmani Jenishkumar Kalubhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-54",
        "academicYear": "2020-21",
        "studentName": "Nishad Vandna Ramratan",
        "classLevel": "Final B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-55",
        "academicYear": "2020-21",
        "studentName": "Jadiya Riddhi Viral",
        "classLevel": "Final B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-56",
        "academicYear": "2020-21",
        "studentName": "Patel Vishva Hasmukhbhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-57",
        "academicYear": "2020-21",
        "studentName": "Joshi Man Jaymitkumar",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-58",
        "academicYear": "2020-21",
        "studentName": "Viradiya Yagnik Arvindbhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-59",
        "academicYear": "2020-21",
        "studentName": "Patel Dhara Jitendrakumar",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-60",
        "academicYear": "2020-21",
        "studentName": "Ghoghari Ankush Arvindbhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-61",
        "academicYear": "2019-20",
        "studentName": "Patel Fenil Sanjaybhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-62",
        "academicYear": "2019-20",
        "studentName": "Ghoghari Ankush Arvindbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-63",
        "academicYear": "2019-20",
        "studentName": "Patel Sachi Manishkumar",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-64",
        "academicYear": "2019-20",
        "studentName": "Swain Vishal Hemant",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-65",
        "academicYear": "2019-20",
        "studentName": "Devda Roshan Sureshbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-66",
        "academicYear": "2019-20",
        "studentName": "Kaklotar Dhaval Popatbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-67",
        "academicYear": "2019-20",
        "studentName": "Devganiya Rahul Hamabhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-68",
        "academicYear": "2019-20",
        "studentName": "Sarvaiya Amit Bhupatbhai",
        "classLevel": "T.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-69",
        "academicYear": "2019-20",
        "studentName": "Chandel Prince Kailash",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 38000,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹38,000"
      },
      {
        "id": "aw-70",
        "academicYear": "2019-20",
        "studentName": "Nakum Jaydip Mukeshbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 4600,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹4,600"
      },
      {
        "id": "aw-71",
        "academicYear": "2019-20",
        "studentName": "Bhoga Dipakkumar Shrihari",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 2200,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹2,200"
      },
      {
        "id": "aw-72",
        "academicYear": "2019-20",
        "studentName": "Jariwala Sahil Vinodkumar",
        "classLevel": "T.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-73",
        "academicYear": "2019-20",
        "studentName": "Malankiya Ravikumar Jayantibhai",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 10000,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹10,000"
      },
      {
        "id": "aw-74",
        "academicYear": "2019-20",
        "studentName": "Patel Sagar Vinodbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 85500,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹85,500"
      },
      {
        "id": "aw-75",
        "academicYear": "2019-20",
        "studentName": "Joshi Man Jaymitkumar",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-76",
        "academicYear": "2019-20",
        "studentName": "Gamit Rejinaben Sumanbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 85500,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹85,500"
      },
      {
        "id": "aw-77",
        "academicYear": "2019-20",
        "studentName": "Viradiya Yagnik Arvindbhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-78",
        "academicYear": "2019-20",
        "studentName": "Joshi Bharat Rughlalji",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-79",
        "academicYear": "2019-20",
        "studentName": "Patel Vishva Hasmukhbhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-80",
        "academicYear": "2019-20",
        "studentName": "Sanepara Rutvik Mansukhbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-81",
        "academicYear": "2019-20",
        "studentName": "Katariya Roshniben Himmatbhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6000,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,000"
      },
      {
        "id": "aw-82",
        "academicYear": "2019-20",
        "studentName": "Ibrahim Mohamed Hafeji",
        "classLevel": "Final B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-83",
        "academicYear": "2019-20",
        "studentName": "Shaikh Noman Shahid",
        "classLevel": "T. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-84",
        "academicYear": "2019-20",
        "studentName": "Shah Rajan Yogeshbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-85",
        "academicYear": "2019-20",
        "studentName": "Hasmi Mo Ismail",
        "classLevel": "F. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-86",
        "academicYear": "2019-20",
        "studentName": "Khan Adanan Moh. Muteef",
        "classLevel": "F. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-87",
        "academicYear": "2019-20",
        "studentName": "Khan Abdulkarim Masuralam",
        "classLevel": "F. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 44000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-88",
        "academicYear": "2019-20",
        "studentName": "Jadav Jemishkumar Bharatbhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-89",
        "academicYear": "2019-20",
        "studentName": "Jadiya Riddhi Viral",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-90",
        "academicYear": "2019-20",
        "studentName": "Sureja Nirmal Rajeshbhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 40000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹40,000"
      },
      {
        "id": "aw-91",
        "academicYear": "2019-20",
        "studentName": "Patel Minuben Sanjaybhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-92",
        "academicYear": "2019-20",
        "studentName": "Mehta Riya Kalpesh",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-93",
        "academicYear": "2019-20",
        "studentName": "Singh Mamta Kunwar Kalyan Singh",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-94",
        "academicYear": "2019-20",
        "studentName": "Padmani Jenishkumar Kalubhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-95",
        "academicYear": "2019-20",
        "studentName": "Patel Dhara Jitendrakumar",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-96",
        "academicYear": "2019-20",
        "studentName": "Nishad Vandna Ramratan",
        "classLevel": "T. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 37500,
        "scholarshipAgency": "Education Department, Gujarat State",
        "amountFormatted": "₹37,500"
      },
      {
        "id": "aw-97",
        "academicYear": "2019-20",
        "studentName": "Surati Princi Chhotubhai",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 86210,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹86,210"
      },
      {
        "id": "aw-98",
        "academicYear": "2019-20",
        "studentName": "Sosa Himaxi Govindbhai",
        "classLevel": "T. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 86210,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹86,210"
      },
      {
        "id": "aw-99",
        "academicYear": "2019-20",
        "studentName": "Maru Dipakkumar Jivrajbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 85500,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹85,500"
      },
      {
        "id": "aw-100",
        "academicYear": "2018-19",
        "studentName": "Nishad Vandana Ramratan",
        "classLevel": "S.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 35500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹35,500"
      },
      {
        "id": "aw-101",
        "academicYear": "2018-19",
        "studentName": "Patel Nidhi Dineshkumar",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 83360,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹83,360"
      },
      {
        "id": "aw-102",
        "academicYear": "2018-19",
        "studentName": "Chauhan Mihirkumar Balvantbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84360,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,360"
      },
      {
        "id": "aw-103",
        "academicYear": "2018-19",
        "studentName": "Bagada Kishan Dineshbhai",
        "classLevel": "T. Y.B Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 83360,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹83,360"
      },
      {
        "id": "aw-104",
        "academicYear": "2018-19",
        "studentName": "Sosa Himaxi Govindbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84360,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,360"
      },
      {
        "id": "aw-105",
        "academicYear": "2018-19",
        "studentName": "Makwana Isha Girishchandra",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84360,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,360"
      },
      {
        "id": "aw-106",
        "academicYear": "2018-19",
        "studentName": "Surati Princi Chhotubhai",
        "classLevel": "T.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84360,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,360"
      },
      {
        "id": "aw-107",
        "academicYear": "2018-19",
        "studentName": "Surti Nidhi Nandkishor",
        "classLevel": "T.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6360,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,360"
      },
      {
        "id": "aw-108",
        "academicYear": "2018-19",
        "studentName": "Katariya Roshniben Himmatbhai",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84360,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,360"
      },
      {
        "id": "aw-109",
        "academicYear": "2018-19",
        "studentName": "Patel Nidhi Anilbhai",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84800,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,800"
      },
      {
        "id": "aw-110",
        "academicYear": "2018-19",
        "studentName": "Kachariya Vishal Maheshbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-111",
        "academicYear": "2018-19",
        "studentName": "Kanjariya Krunal Gordhanbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-112",
        "academicYear": "2018-19",
        "studentName": "Malankiya Ravikumar Jayantibhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-113",
        "academicYear": "2018-19",
        "studentName": "Jariwala Sahil Vinodkumar",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-114",
        "academicYear": "2018-19",
        "studentName": "Sarvaiya Amitkumar Bhupatbhai",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 6350,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹6,350"
      },
      {
        "id": "aw-115",
        "academicYear": "2018-19",
        "studentName": "Jadav Jemishkumar Bharatbhai",
        "classLevel": "S.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 35500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹35,500"
      },
      {
        "id": "aw-116",
        "academicYear": "2018-19",
        "studentName": "Patel Vishwa Hasmukhbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-117",
        "academicYear": "2018-19",
        "studentName": "Hafeji Ibrahim Mohamed",
        "classLevel": "T. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-118",
        "academicYear": "2018-19",
        "studentName": "Shaikh Zeeshan Mazhar",
        "classLevel": "Final B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-119",
        "academicYear": "2018-19",
        "studentName": "Shaikh Nazim Abdul Rauf",
        "classLevel": "Final B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 25000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹25,000"
      },
      {
        "id": "aw-120",
        "academicYear": "2018-19",
        "studentName": "Patil Bhumika Bharat",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 5000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹5,000"
      },
      {
        "id": "aw-121",
        "academicYear": "2018-19",
        "studentName": "Bhoga Dipakkumar Shrihari",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 5000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹5,000"
      },
      {
        "id": "aw-122",
        "academicYear": "2018-19",
        "studentName": "Singh Mamta Kunwar Singh",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-123",
        "academicYear": "2018-19",
        "studentName": "Patel Minuben Sanjaybhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-124",
        "academicYear": "2018-19",
        "studentName": "Viradiya Yagnik Arvindbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 44000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹44,000"
      },
      {
        "id": "aw-125",
        "academicYear": "2018-19",
        "studentName": "Guna Siddharth Ketanbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 56000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹56,000"
      },
      {
        "id": "aw-126",
        "academicYear": "2018-19",
        "studentName": "Padmani Jenishkumar Kalubhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 45000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹45,000"
      },
      {
        "id": "aw-127",
        "academicYear": "2018-19",
        "studentName": "Hakeem Safiya Javed",
        "classLevel": "T.Y.B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 38500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹38,500"
      },
      {
        "id": "aw-128",
        "academicYear": "2018-19",
        "studentName": "Joshi Bharat Shri Ruglal",
        "classLevel": "S.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 35500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹35,500"
      },
      {
        "id": "aw-129",
        "academicYear": "2018-19",
        "studentName": "Patel Nevil Jitendrakumar",
        "classLevel": "S.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 38200,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹38,200"
      },
      {
        "id": "aw-130",
        "academicYear": "2018-19",
        "studentName": "Jadiya Riddhi Viral",
        "classLevel": "S.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 33500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹33,500"
      },
      {
        "id": "aw-131",
        "academicYear": "2017-18",
        "studentName": "Sosa Himaxi Govindbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84240,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,240"
      },
      {
        "id": "aw-132",
        "academicYear": "2017-18",
        "studentName": "Surti Nidhi Nandkishor",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 5300,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹5,300"
      },
      {
        "id": "aw-133",
        "academicYear": "2017-18",
        "studentName": "Surati Princi Chhotubhai",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 85800,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹85,800"
      },
      {
        "id": "aw-134",
        "academicYear": "2017-18",
        "studentName": "Makwana Isha Girishchandra",
        "classLevel": "T. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 86330,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹86,330"
      },
      {
        "id": "aw-135",
        "academicYear": "2017-18",
        "studentName": "Bagada Kishan Dineshbhai",
        "classLevel": "T.Y.B Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 85330,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹85,330"
      },
      {
        "id": "aw-136",
        "academicYear": "2017-18",
        "studentName": "Chauhan Mihirkumar Balvantbhai",
        "classLevel": "F.Y.B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84240,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,240"
      },
      {
        "id": "aw-137",
        "academicYear": "2017-18",
        "studentName": "Patel Nidhi Dineshkumar",
        "classLevel": "T.Y..B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 85330,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹85,330"
      },
      {
        "id": "aw-138",
        "academicYear": "2017-18",
        "studentName": "Shaikh Mohammad Shoaib",
        "classLevel": "Final. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-139",
        "academicYear": "2017-18",
        "studentName": "Shaikh Quaratulain Maqsoodali",
        "classLevel": "Final. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-140",
        "academicYear": "2017-18",
        "studentName": "Katariya Roshniben Himmatbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84240,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,240"
      },
      {
        "id": "aw-141",
        "academicYear": "2017-18",
        "studentName": "Sarvaiya Amit Bhupatbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 4750,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹4,750"
      },
      {
        "id": "aw-142",
        "academicYear": "2017-18",
        "studentName": "Nishad Vandana Ramratan",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 47500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹47,500"
      },
      {
        "id": "aw-143",
        "academicYear": "2017-18",
        "studentName": "Parmar Pratik Ashokbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 4750,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹4,750"
      },
      {
        "id": "aw-144",
        "academicYear": "2017-18",
        "studentName": "Jadiya Riddhi Viral",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 47500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹47,500"
      },
      {
        "id": "aw-145",
        "academicYear": "2017-18",
        "studentName": "Jadav Jemishkumar Bharatbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 47500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹47,500"
      },
      {
        "id": "aw-146",
        "academicYear": "2017-18",
        "studentName": "Patel Nevil Jitendrakumar",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 47500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹47,500"
      },
      {
        "id": "aw-147",
        "academicYear": "2017-18",
        "studentName": "Joshi Bharat Shri Ruglal",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 47500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹47,500"
      },
      {
        "id": "aw-148",
        "academicYear": "2017-18",
        "studentName": "Mishra Chandni Harshuprasad",
        "classLevel": "S.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 47500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹47,500"
      },
      {
        "id": "aw-149",
        "academicYear": "2017-18",
        "studentName": "Patel Devanshi Rajnikant",
        "classLevel": "T.Y.B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 39000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹39,000"
      },
      {
        "id": "aw-150",
        "academicYear": "2017-18",
        "studentName": "Hakem Safiya Javed",
        "classLevel": "T.Y.B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 38500,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹38,500"
      },
      {
        "id": "aw-151",
        "academicYear": "2016-17",
        "studentName": "Shaikh Quaratulain Maqsoodali",
        "classLevel": "T. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-152",
        "academicYear": "2016-17",
        "studentName": "Patel Nidhi Dineshkumar",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 85860,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹85,860"
      },
      {
        "id": "aw-153",
        "academicYear": "2016-17",
        "studentName": "Bagda Kishan Dineshbhai",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 85860,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹85,860"
      },
      {
        "id": "aw-154",
        "academicYear": "2016-17",
        "studentName": "Surati Princi Chhotubhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 83680,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹83,680"
      },
      {
        "id": "aw-155",
        "academicYear": "2016-17",
        "studentName": "Surti Nidhi Nandkishor",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 5680,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹5,680"
      },
      {
        "id": "aw-156",
        "academicYear": "2016-17",
        "studentName": "Shaikh Zebabibi Zahir",
        "classLevel": "Final B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-157",
        "academicYear": "2016-17",
        "studentName": "Shaikh Zeeshan Mazhar Imam",
        "classLevel": "S. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-158",
        "academicYear": "2016-17",
        "studentName": "Shaikh Mohammad Shoaib",
        "classLevel": "T. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-159",
        "academicYear": "2016-17",
        "studentName": "Hakeem Safiya Javed",
        "classLevel": "S. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 43000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹43,000"
      },
      {
        "id": "aw-160",
        "academicYear": "2016-17",
        "studentName": "Patel Devanshi Rajnikant",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 43000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹43,000"
      },
      {
        "id": "aw-161",
        "academicYear": "2016-17",
        "studentName": "Mishra Chandni Harshuprasad",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 43000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹43,000"
      },
      {
        "id": "aw-162",
        "academicYear": "2016-17",
        "studentName": "Patel Riya Kirtikumar",
        "classLevel": "F. Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 43000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹43,000"
      },
      {
        "id": "aw-163",
        "academicYear": "2016-17",
        "studentName": "Vanecha Swati Ganpatbhai",
        "classLevel": "Final B. Pharm",
        "category": "Fair and Lovely Scholarship",
        "amount": 50000,
        "scholarshipAgency": "Fair & Lovely Foundation",
        "amountFormatted": "₹50,000"
      },
      {
        "id": "aw-164",
        "academicYear": "2015-16",
        "studentName": "Gamit Sharonkumari Gamanbhai",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 74440,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹74,440"
      },
      {
        "id": "aw-165",
        "academicYear": "2015-16",
        "studentName": "Saija Niki Pinak",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 2625,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹2,625"
      },
      {
        "id": "aw-166",
        "academicYear": "2015-16",
        "studentName": "Baria Niketaben Pratapsinh",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 2625,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹2,625"
      },
      {
        "id": "aw-167",
        "academicYear": "2015-16",
        "studentName": "Patel Rushika Prakashbhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 4725,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹4,725"
      },
      {
        "id": "aw-168",
        "academicYear": "2015-16",
        "studentName": "Patel Hetal Chimanbhai",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 4725,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹4,725"
      },
      {
        "id": "aw-169",
        "academicYear": "2015-16",
        "studentName": "Patel Nidhi Dineshkumar",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 83490,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹83,490"
      },
      {
        "id": "aw-170",
        "academicYear": "2015-16",
        "studentName": "Bagda Kishan Dineshbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 83490,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹83,490"
      },
      {
        "id": "aw-171",
        "academicYear": "2015-16",
        "studentName": "Makwana Isha Girishchndra",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 83490,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹83,490"
      },
      {
        "id": "aw-172",
        "academicYear": "2015-16",
        "studentName": "Parmar Akash Parimal",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 71060,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹71,060"
      },
      {
        "id": "aw-173",
        "academicYear": "2015-16",
        "studentName": "Baraiya Guavrav Keshavbhai",
        "classLevel": "S. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 78500,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹78,500"
      },
      {
        "id": "aw-174",
        "academicYear": "2015-16",
        "studentName": "Shaikh Aaminabibi Mohhmed Iqbal",
        "classLevel": "Final B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 7500,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹7,500"
      },
      {
        "id": "aw-175",
        "academicYear": "2015-16",
        "studentName": "Patel Nidhi Anilbhai",
        "classLevel": "F. Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84170,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,170"
      },
      {
        "id": "aw-176",
        "academicYear": "2015-16",
        "studentName": "Rathod Shivani Bhikhubhai",
        "classLevel": "S.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 84860,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹84,860"
      },
      {
        "id": "aw-177",
        "academicYear": "2015-16",
        "studentName": "Hafezi Fariha Kadir",
        "classLevel": "F.Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24141,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,141"
      },
      {
        "id": "aw-178",
        "academicYear": "2015-16",
        "studentName": "Hakeem Safiya Javed",
        "classLevel": "F.Y. B. Pharm",
        "category": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "amount": 43000,
        "scholarshipAgency": "Education Department, Gujarat State.",
        "amountFormatted": "₹43,000"
      },
      {
        "id": "aw-179",
        "academicYear": "2015-16",
        "studentName": "Shaikh Zebabibi Zahir",
        "classLevel": "T. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-180",
        "academicYear": "2015-16",
        "studentName": "Qadri Misbah Syednizamuddin",
        "classLevel": "T. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-181",
        "academicYear": "2015-16",
        "studentName": "Shaikh Quaratulain Maqsood Ali",
        "classLevel": "S. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-182",
        "academicYear": "2015-16",
        "studentName": "Shaikh Mohammad Shoaib",
        "classLevel": "F. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-183",
        "academicYear": "2015-16",
        "studentName": "Shaikh Zeesan Mazhar Imam",
        "classLevel": "F. Y. B. Pharm",
        "category": "NSP Post Matric Scholarships Scheme for Minorities",
        "amount": 24000,
        "scholarshipAgency": "Ministry of Minority Affairs Govt.of India",
        "amountFormatted": "₹24,000"
      },
      {
        "id": "aw-184",
        "academicYear": "2014-15",
        "studentName": "Patel Esha Mohanbhai",
        "classLevel": "Final B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 70790,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹70,790"
      },
      {
        "id": "aw-185",
        "academicYear": "2014-15",
        "studentName": "Patel Rushikaben Prakashbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 3500,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹3,500"
      },
      {
        "id": "aw-186",
        "academicYear": "2014-15",
        "studentName": "Sapariya Urvashi Maganbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 3500,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹3,500"
      },
      {
        "id": "aw-187",
        "academicYear": "2014-15",
        "studentName": "Sonagra Payal Kurji",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 3500,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹3,500"
      },
      {
        "id": "aw-188",
        "academicYear": "2014-15",
        "studentName": "Gamit Sharonkumari Gamanbhai",
        "classLevel": "T.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 74340,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹74,340"
      },
      {
        "id": "aw-189",
        "academicYear": "2014-15",
        "studentName": "Patel Hetal Chimanbhai",
        "classLevel": "T.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 4000,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹4,000"
      },
      {
        "id": "aw-190",
        "academicYear": "2014-15",
        "studentName": "Rathod Shivani Bhikhubhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 83020,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹83,020"
      },
      {
        "id": "aw-191",
        "academicYear": "2014-15",
        "studentName": "Shaikh Mohammedshoaib Abdulhalim",
        "classLevel": "F.Y. B. Pharm",
        "category": "Merit-cum-Means Scholarship",
        "amount": 28000,
        "scholarshipAgency": "Director, Developing Caste Welfare, Gujarat",
        "amountFormatted": "₹28,000"
      },
      {
        "id": "aw-192",
        "academicYear": "2014-15",
        "studentName": "Shaikh Quaratulain Maqsoodali",
        "classLevel": "F.Y. B. Pharm",
        "category": "Merit-cum-Means Scholarship",
        "amount": 28000,
        "scholarshipAgency": "Director, Developing Caste Welfare, Gujarat",
        "amountFormatted": "₹28,000"
      },
      {
        "id": "aw-193",
        "academicYear": "2014-15",
        "studentName": "Patel Anash Abbas Hasan",
        "classLevel": "Final B. Pharm",
        "category": "Merit-cum-Means Scholarship",
        "amount": 28000,
        "scholarshipAgency": "Director, Developing Caste Welfare, Gujarat",
        "amountFormatted": "₹28,000"
      },
      {
        "id": "aw-194",
        "academicYear": "2014-15",
        "studentName": "Vanecha Swati Ganpatbhai",
        "classLevel": "F.Y. B. Pharm",
        "category": "Fair and Lovely Scholarship",
        "amount": 60000,
        "scholarshipAgency": "Fair and Lovely Foundation",
        "amountFormatted": "₹60,000"
      },
      {
        "id": "aw-195",
        "academicYear": "2014-15",
        "studentName": "Baria Niketaben Pratapsinh",
        "classLevel": "F.Y. B. Pharm",
        "category": "Post Matric Scholarship for SC/ST/ SEBC",
        "amount": 3500,
        "scholarshipAgency": "Digital Gujarat,Government of Gujarat",
        "amountFormatted": "₹3,500"
      }
    ],
    "years": [
      {
        "value": "2021-22",
        "count": 23
      },
      {
        "value": "2020-21",
        "count": 37
      },
      {
        "value": "2019-20",
        "count": 39
      },
      {
        "value": "2018-19",
        "count": 31
      },
      {
        "value": "2017-18",
        "count": 20
      },
      {
        "value": "2016-17",
        "count": 13
      },
      {
        "value": "2015-16",
        "count": 20
      },
      {
        "value": "2014-15",
        "count": 12
      }
    ],
    "schemes": [
      {
        "value": "NSP Post Matric Scholarships Scheme for Minorities",
        "count": 28
      },
      {
        "value": "MYSY (Mukhyamantri Yuva Svavlamban Yojna)",
        "count": 78
      },
      {
        "value": "Post Matric Scholarship for SC/ST/ SEBC",
        "count": 84
      },
      {
        "value": "Fair and Lovely Scholarship",
        "count": 2
      },
      {
        "value": "Merit-cum-Means Scholarship",
        "count": 3
      }
    ],
    "classes": [
      {
        "value": "S. Y. B. Pharm",
        "count": 26
      },
      {
        "value": "F. Y. B. Pharm",
        "count": 38
      },
      {
        "value": "Final B. Pharm",
        "count": 27
      },
      {
        "value": "T. Y. B. Pharm",
        "count": 23
      },
      {
        "value": "S.Y. B. Pharm",
        "count": 21
      },
      {
        "value": "F.Y. B. Pharm",
        "count": 43
      },
      {
        "value": "T.Y. B. Pharm",
        "count": 8
      },
      {
        "value": "T. Y.B Pharm",
        "count": 1
      },
      {
        "value": "T.Y.B. Pharm",
        "count": 3
      },
      {
        "value": "T.Y.B Pharm",
        "count": 1
      },
      {
        "value": "F.Y.B. Pharm",
        "count": 1
      },
      {
        "value": "T.Y..B. Pharm",
        "count": 1
      },
      {
        "value": "Final. B. Pharm",
        "count": 2
      }
    ],
    "range": "2014-15 to 2021-22",
    "totalAmount": 7743171,
    "totalAmountFormatted": "₹77,43,171"
  },
  "awardedCount": 195
};

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ScholarshipsContent {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Partial<ScholarshipsContent>;
  return (
    Array.isArray(c.organizations?.items) &&
    c.organizations.items.length > 0 &&
    Array.isArray(c.organizations.categories) &&
    Array.isArray(c.awarded?.items) &&
    Array.isArray(c.awarded.years)
  );
}

export function useScholarshipsContent(): ScholarshipsContent {
  const [content, setContent] = useState<ScholarshipsContent>(DEFAULT_SCHOLARSHIPS);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/students/scholarships"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.scholarships)) setContent(body.scholarships);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
