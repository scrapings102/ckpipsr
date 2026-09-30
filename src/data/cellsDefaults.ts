// Generated from backend/server/data/home.default.json by resolving each
// committee the way the API does. The committee pages fall back to this when
// the API is unavailable, so it is what they shipped with.
import type { PublicCommittee } from "../hooks/useCellCommittee";

export const DEFAULT_COMMITTEES: Record<string, PublicCommittee> = {
  arc: {
    slug: "arc",
    pageTitle: "Anti Ragging Committee",
    pageSubtitle: "Zero-Tolerance Safety Policy & Institutional Vigilance Mechanism",
    tabStyle: "pills",
    banner: {
      enabled: true,
      badge: "Zero Tolerance Campus",
      heading: "24x7 Anti-Ragging Helpline & Immediate Support",
      body: "Ragging is strictly prohibited by law inside the college campus, hostels, canteen, transit vehicles, and off-campus zones. Any student experiencing or witnessing ragging can contact the squad immediately or register an incident.",
      helplineLabel: "National Helpline: 1800-180-5522",
      helplinePhone: "1800-180-5522",
      reportLabel: "Report Incident"
    },
    mandate: {
      badge: "Institutional Charter & Mandate",
      heading: "",
      body: "This committee and its members will educate and ensure that our institute students will not indulge in any form of ragging, to make our institute and campus free of ragging, by regularly monitoring the students and through counseling of seniors.",
      tone: "green",
      icon: "shield",
      points: [],
      note: {
        label: "",
        body: "",
        icon: "scale"
      }
    },
    roster: {
      eyebrow: "",
      heading: "Anti Ragging Committee Members",
      subtitle: "Statutory multi-disciplinary committee comprising administration, faculty, counselor, civil & police authorities, media, students, and parents.",
      searchPlaceholder: "Search member, role, contact...",
      noEmailText: "Direct Official Contact"
    },
    circulars: {
      eyebrow: "Official Institutional Document",
      heading: "Anti-Ragging Circular",
      body: "Access the official statutory circular and notification issued by the institution regarding anti-ragging policies and compliance.",
      links: [
        {
          label: "Circular",
          url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/643e618a22187.pdf"
        }
      ]
    },
    complaint: "incident",
    footer: {
      enabled: true,
      text: "Anti-Ragging Committee constituted strictly in compliance with UGC & PCI statutory mandates",
      highlight: "Emergency Direct: +91 9427474602"
    },
    members: [
      {
        role: "Chairman",
        name: "Dr. Dhiren P. Shah",
        designation: "Principal",
        contact: "9427474602",
        contactIsAddress: false,
        email: "dhiren.shah@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Member secretary -Faculty",
        name: "Mrs. Prakruti K. Jadav",
        designation: "Asst. Prof. and Vice Chairman",
        contact: "7567684027",
        contactIsAddress: false,
        email: "prakruti.jadav@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Member - Non Teaching Staff",
        name: "Mr. Nirav Patel",
        designation: "Laboratory Technician",
        contact: "9427520001",
        contactIsAddress: false,
        email: "rx.neelpatel@gmail.com",
        tag: "Staff"
      },
      {
        role: "Member",
        name: "Dr. Mukesh P. Jagiwala",
        designation: "Psychiatrist and Professional counselor",
        contact: "9879221795",
        contactIsAddress: false,
        email: "mukeshjagiwala@yahoo.co.in",
        tag: "Counselor"
      },
      {
        role: "Member- Civil Administration",
        name: "Representative of Civil Administration",
        designation: "Civil Administration Official",
        contact: "0261-2665800",
        contactIsAddress: false,
        email: "",
        tag: "Administration"
      },
      {
        role: "Member-Representative of Police Administration",
        name: "Representative of Police administration",
        designation: "Police Administration Official",
        contact: "0261-2251010",
        contactIsAddress: false,
        email: "",
        tag: "Administration"
      },
      {
        role: "Member-Representative of NGO",
        name: "Representative of Non Government organization",
        designation: "Youth & Social Welfare NGO",
        contact: "0261-3917777",
        contactIsAddress: false,
        email: "",
        tag: "Administration"
      },
      {
        role: "Member-Representative Local Media",
        name: "Representative of local media",
        designation: "Press & Media Representative",
        contact: "0261-2465542",
        contactIsAddress: false,
        email: "",
        tag: "Administration"
      },
      {
        role: "Member Student",
        name: "Mr. Sheel Pushtiwala",
        designation: "Student",
        contact: "8733005400",
        contactIsAddress: false,
        email: "sheel27203@gmail.com",
        tag: "Student"
      },
      {
        role: "Member Student",
        name: "Mr. Priyam Patel",
        designation: "Student",
        contact: "9054775814",
        contactIsAddress: false,
        email: "priyam201006@gmail.com",
        tag: "Student"
      },
      {
        role: "Member - Parent",
        name: "Mr. Kalpak Pustiwala",
        designation: "Parent",
        contact: "9924863286",
        contactIsAddress: false,
        email: "kalpak3080@gmail.com",
        tag: "Parent"
      },
      {
        role: "Member - Parent",
        name: "Mr. Vijaykumar Patel",
        designation: "Parent",
        contact: "9898020106",
        contactIsAddress: false,
        email: "vapatel2374@gmail.com",
        tag: "Parent"
      }
    ],
    tags: [
      "Leadership",
      "Faculty",
      "Staff",
      "Counselor",
      "Administration",
      "Student",
      "Parent"
    ],
    squad: {
      badge: "Anti-Ragging Squad (ARS)",
      body: "Committee consisting the following member is framed to keep watch on \"Ragging\" inside or outside the campus",
      eyebrow: "Vigilance Squad",
      heading: "Squad Members",
      pill: "Active Campus Vigilance",
      members: [
        {
          role: "Squad member",
          name: "Dr. Bhumika Desai",
          designation: "Associate Professor",
          phone: "9879229825",
          email: "bhumika.desai@ckpipsr.ac.in"
        },
        {
          role: "Squad member",
          name: "Dr. Vinod Ramani",
          designation: "Associate Professor",
          phone: "9913792913",
          email: "vinod.ramani@ckpipsr.ac.in"
        },
        {
          role: "Squad member",
          name: "Mrs. Prakruti Jadav",
          designation: "Assistant Professor",
          phone: "7567684027",
          email: "prakruti.jadav@ckpipsr.ac.in"
        },
        {
          role: "Squad member",
          name: "Dr. Dipayan Tarafder",
          designation: "Assistant Professor",
          phone: "9909759524",
          email: "dipayan.tarafder@ckpipsr.ac.in"
        },
        {
          role: "Squad member",
          name: "Mr. Yahya Moolla",
          designation: "Assistant Professor",
          phone: "7201932423",
          email: "yahya.moolla@ckpipsr.ac.in"
        }
      ]
    }
  },
  wdc: {
    slug: "wdc",
    pageTitle: "Women Development Cell (WDC)",
    pageSubtitle: "Fostering Gender Equality, Empowerment & a Safe Academic Environment",
    tabStyle: "underline",
    banner: {
      enabled: false,
      badge: "",
      heading: "",
      body: "",
      helplineLabel: "",
      helplinePhone: "",
      reportLabel: ""
    },
    mandate: {
      badge: "Objectives & Mandate",
      heading: "Women Development Cell (WDC)",
      body: "WDC is framed to protect women’s right to gender equality and to provide a favourable environment for work/study and to provide a forum for women on the campus to share information and resources and exchange of ideas.",
      tone: "rose",
      icon: "handshake",
      points: [],
      note: {
        label: "",
        body: "",
        icon: "scale"
      }
    },
    roster: {
      eyebrow: "Committee Roster",
      heading: "Cell Members & Representatives",
      subtitle: "",
      searchPlaceholder: "Search by name, role, contact...",
      noEmailText: "Direct Official Contact"
    },
    circulars: {
      eyebrow: "",
      heading: "",
      body: "",
      links: []
    },
    complaint: "none",
    footer: {
      enabled: false,
      text: "",
      highlight: ""
    },
    members: [
      {
        role: "Chairperson",
        name: "Dr. Dhiren P. Shah",
        designation: "Principal",
        contact: "9427474602",
        contactIsAddress: false,
        email: "dhiren.shah@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Convener",
        name: "Dr. Bhumika C. Desai",
        designation: "Associate Professor",
        contact: "9879229825",
        contactIsAddress: false,
        email: "bhumika.desai@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Convener",
        name: "Ms. Kajal C. Solanki",
        designation: "Asst. Professor",
        contact: "7046555195",
        contactIsAddress: false,
        email: "kajal.solanki@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Non teaching Staff Member",
        name: "Mrs. Trupti C. Patel",
        designation: "Lab Technician",
        contact: "9904399573",
        contactIsAddress: false,
        email: "tcpatel2016@gmail.com",
        tag: "Staff"
      },
      {
        role: "Student Member",
        name: "Devanshi Modi",
        designation: "Student (Sem VII)",
        contact: "9427585549",
        contactIsAddress: false,
        email: "devu211104@gmail.com",
        tag: "Student"
      },
      {
        role: "Student Member",
        name: "Preksha Shah",
        designation: "Student (Sem VII)",
        contact: "9313704001",
        contactIsAddress: false,
        email: "prekshashah444@gmail.com",
        tag: "Student"
      },
      {
        role: "Student Member",
        name: "Fiona Amin",
        designation: "Student (Sem V)",
        contact: "6354380071",
        contactIsAddress: false,
        email: "fionaamin7@gmail.com",
        tag: "Student"
      },
      {
        role: "Student Member",
        name: "Saloni Rawal",
        designation: "Student (Sem V)",
        contact: "7016374724",
        contactIsAddress: false,
        email: "salonirawal53@gmail.com",
        tag: "Student"
      },
      {
        role: "Student Member",
        name: "Devanshi Patel",
        designation: "Student (Sem III)",
        contact: "9313259504",
        contactIsAddress: false,
        email: "devanship1208@gmail.com",
        tag: "Student"
      },
      {
        role: "Student Member",
        name: "Unnati Patel",
        designation: "Student (Sem III)",
        contact: "9510679594",
        contactIsAddress: false,
        email: "ptlunnati09@gmail.com",
        tag: "Student"
      }
    ],
    tags: [
      "Leadership",
      "Faculty",
      "Staff",
      "Student"
    ],
    squad: null
  },
  "sc-st-cell": {
    slug: "sc-st-cell",
    pageTitle: "SC-ST Cell",
    pageSubtitle: "Scheduled Castes and Scheduled Tribes Empowerment & Welfare Cell",
    tabStyle: "underline",
    banner: {
      enabled: false,
      badge: "",
      heading: "",
      body: "",
      helplineLabel: "",
      helplinePhone: "",
      reportLabel: ""
    },
    mandate: {
      badge: "Objectives & Mandate",
      heading: "SC-ST Cell",
      body: "The SC/ST cell of the college was established with the purpose to empower the SC/ST students in the college. The college takes special interest in facilitating financial support to students from these communities from government agencies and other sources.",
      tone: "green",
      icon: "shield",
      points: [],
      note: {
        label: "",
        body: "",
        icon: "scale"
      }
    },
    roster: {
      eyebrow: "Cell Representation",
      heading: "Committee Members",
      subtitle: "",
      searchPlaceholder: "Search by name, role, contact...",
      noEmailText: "Official Department Liaison"
    },
    circulars: {
      eyebrow: "Official Institutional Documents",
      heading: "SC-ST Cell Circulars",
      body: "Access the official statutory notifications and directives issued by UGC, GTU, and AICTE.",
      links: [
        {
          label: "UGC Circular",
          url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/643e5e7d7ed21.pdf"
        },
        {
          label: "GTU Circular",
          url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/643e5ea2cc27b.pdf"
        },
        {
          label: "AICTE Circular",
          url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/643e5efe7df27.pdf"
        }
      ]
    },
    complaint: "grievance",
    footer: {
      enabled: false,
      text: "",
      highlight: ""
    },
    members: [
      {
        role: "Chairman",
        name: "Dr. Dhiren P. Shah",
        designation: "Principal",
        contact: "9427474602",
        contactIsAddress: false,
        email: "dhiren.shah@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Member",
        name: "Dr. Bhumika C. Desai",
        designation: "Associate Professor",
        contact: "9879229825",
        contactIsAddress: false,
        email: "bhumika.desai@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Member",
        name: "Mr. Yahya A. Moolla",
        designation: "Asst. Prof.",
        contact: "7201932423",
        contactIsAddress: false,
        email: "yahya.moolla@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Member",
        name: "Ms. Kinjal S. Gamit",
        designation: "Asst. Prof.",
        contact: "9687198278",
        contactIsAddress: false,
        email: "kinjal.gamit@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Member - Representative of Government SC Office",
        name: "Representative of Government SC Office",
        designation: "District Welfare Representative",
        contact: "Jilla Panchayat Varg Kalyan Ashikari, C Block, 6th Floor, Bahumali Building, Athwalines, Surat",
        contactIsAddress: true,
        email: "",
        tag: "Government"
      },
      {
        role: "Member - Representative of Government ST Office",
        name: "Representative of Government ST Office",
        designation: "Takedari Adhikari (Tribal Development)",
        contact: "Takedari Adhikari, C Block, 6th Floor, Bahumali Builiding, Athwalines, Surat",
        contactIsAddress: true,
        email: "",
        tag: "Government"
      },
      {
        role: "Member - Representative of Gujarat Technological University",
        name: "Representative of Gujarat Technological University",
        designation: "GTU University Representative",
        contact: "Campus of Vishwakarma Government Engg. College, Sabarmati-Koba Highway, Nr. Visath Three Road, Chankheda, Ahmedabad",
        contactIsAddress: true,
        email: "",
        tag: "University"
      }
    ],
    tags: [
      "Leadership",
      "Faculty",
      "Government",
      "University"
    ],
    squad: null
  },
  grc: {
    slug: "grc",
    pageTitle: "Grievance Redressal Cell (GRC)",
    pageSubtitle: "Ensuring Transparency, Fairness & Swift Resolution of Student Concerns",
    tabStyle: "underline",
    banner: {
      enabled: false,
      badge: "",
      heading: "",
      body: "",
      helplineLabel: "",
      helplinePhone: "",
      reportLabel: ""
    },
    mandate: {
      badge: "Objectives & Mandate",
      heading: "Grievance Redressal Cell (GRC)",
      body: "Grievance Redressal Cell ( GRC) is framed to ensure transparency by Technical institutions imparting technical education, in admissions and with paramount objective of preventing unfair practices and to provide a mechanism to innocent students for redressal of their grievances.",
      tone: "green",
      icon: "scale",
      points: [],
      note: {
        label: "",
        body: "",
        icon: "scale"
      }
    },
    roster: {
      eyebrow: "Cell Representation",
      heading: "Committee Members",
      subtitle: "",
      searchPlaceholder: "Search by name, role, contact...",
      noEmailText: "-"
    },
    circulars: {
      eyebrow: "",
      heading: "",
      body: "",
      links: []
    },
    complaint: "student",
    footer: {
      enabled: false,
      text: "",
      highlight: ""
    },
    members: [
      {
        role: "Chairman",
        name: "Dr. Dhiren P. Shah",
        designation: "Principal & Professor",
        contact: "9427474602",
        contactIsAddress: false,
        email: "dhiren.shah@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Vice Chairman",
        name: "Dr. Bhumika C. Desai",
        designation: "Associate Professor",
        contact: "9879229825",
        contactIsAddress: false,
        email: "bhumika.desai@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Member",
        name: "Dr. Vinod D. Ramani",
        designation: "Associate Professor",
        contact: "9913792913",
        contactIsAddress: false,
        email: "vinod.ramani@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Member",
        name: "Mr. Dipayan Tarafder",
        designation: "Asst. Professor",
        contact: "9909759524",
        contactIsAddress: false,
        email: "dipayan.tarafder@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Member",
        name: "Dr. Hema V. Badgujar",
        designation: "Asst. Professor",
        contact: "9574745153",
        contactIsAddress: false,
        email: "hema.kamlja@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Student Member",
        name: "Ms. Jinal Chandreshbhai Rana",
        designation: "Student of 2021-22 Adm. Batch",
        contact: "9408062794",
        contactIsAddress: false,
        email: "",
        tag: "Student"
      }
    ],
    tags: [
      "Leadership",
      "Faculty",
      "Student"
    ],
    squad: null
  },
  adc: {
    slug: "adc",
    pageTitle: "Anti-Discrimination Cell (ADC)",
    pageSubtitle: "Ensuring Equal Opportunities & Zero Tolerance Towards Caste & Gender Discrimination",
    tabStyle: "underline",
    banner: {
      enabled: false,
      badge: "",
      heading: "",
      body: "",
      helplineLabel: "",
      helplinePhone: "",
      reportLabel: ""
    },
    mandate: {
      badge: "Objectives & Institutional Mandate",
      heading: "Anti-Discrimination Cell (ADC)",
      body: "Anti-Discrimination Cell provides everybody with equal opportunity into its fold irrespective of caste, religion, language or based on gender. The institute ensure that every individual inside the institute exercise equal rights and acquire in the process of offering or receiving education. Any act, speech, or intention ensures that perturb the harmony among the people is seriously regarded and dealt on immediate basis to restore the peace.",
      tone: "green",
      icon: "shield",
      points: [],
      note: {
        label: "UGC Directives Compliance",
        body: "In Compliance of UGC’s directives for prevention of caste based discrimination in Higher educational Institutions, a committee with the following members is hereby constituted to look into the complaints of any act of discrimination against SC/ST/ teachers/ non-teachers staff:",
        icon: "scale"
      }
    },
    roster: {
      eyebrow: "Committee Roster",
      heading: "Anti-Discrimination Cell Members",
      subtitle: "",
      searchPlaceholder: "Search by name, role, contact...",
      noEmailText: "-"
    },
    circulars: {
      eyebrow: "",
      heading: "",
      body: "",
      links: []
    },
    complaint: "none",
    footer: {
      enabled: false,
      text: "",
      highlight: ""
    },
    members: [
      {
        role: "Chairman",
        name: "Dr. Dhiren P. Shah",
        designation: "Principal",
        contact: "9427474602",
        contactIsAddress: false,
        email: "dhiren.shah@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Vice Chairman",
        name: "Dr. Bhumika C. Desai",
        designation: "Associate Professor",
        contact: "9879229825",
        contactIsAddress: false,
        email: "bhumika.desai@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Member",
        name: "Mrs. Prakruti K. Jadav",
        designation: "Asst. Prof.",
        contact: "7567684027",
        contactIsAddress: false,
        email: "prakruti.jadav@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Member (ADO)",
        name: "Mr. Yahya A. Moolla",
        designation: "Asst. Prof.",
        contact: "7201932423",
        contactIsAddress: false,
        email: "yahya.moolla@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Member",
        name: "Ms. Kinjal S. Gamit",
        designation: "Asst. Prof.",
        contact: "9687198278",
        contactIsAddress: false,
        email: "kinjal.gamit@ckpipsr.ac.in",
        tag: "Faculty"
      }
    ],
    tags: [
      "Leadership",
      "Faculty"
    ],
    squad: null
  },
  edc: {
    slug: "edc",
    pageTitle: "Entrepreneurship Development Cell (EDC)",
    pageSubtitle: "Fostering Innovation, Entrepreneurial Mindset & Professional Skill Development",
    tabStyle: "underline",
    banner: {
      enabled: false,
      badge: "",
      heading: "",
      body: "",
      helplineLabel: "",
      helplinePhone: "",
      reportLabel: ""
    },
    mandate: {
      badge: "Cell Mission & Vision",
      heading: "Objectives",
      body: "",
      tone: "green",
      icon: "rocket",
      points: [
        "To develop entrepreneurship awareness amongst students and faculties",
        "To organize Entrepreneurship Motivation Programs",
        "To organize Skill development programs",
        "To promote innovation and multiple skills in students"
      ],
      note: {
        label: "",
        body: "",
        icon: "scale"
      }
    },
    roster: {
      eyebrow: "Committee Roster",
      heading: "EDC Committee Members",
      subtitle: "",
      searchPlaceholder: "Search by name, role, contact...",
      noEmailText: "-"
    },
    circulars: {
      eyebrow: "",
      heading: "",
      body: "",
      links: []
    },
    complaint: "none",
    footer: {
      enabled: false,
      text: "",
      highlight: ""
    },
    members: [
      {
        role: "Convener",
        name: "Dr. Dhiren P. Shah",
        designation: "Principal",
        contact: "9427474602",
        contactIsAddress: false,
        email: "dhiren.shah@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Coordinator",
        name: "Dr. Vinod D. Ramani",
        designation: "Associate Professor",
        contact: "9913792913",
        contactIsAddress: false,
        email: "vinod.ramani@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Member",
        name: "Mr. Naishadh I. Solanki",
        designation: "Assistant Professor",
        contact: "9825809165",
        contactIsAddress: false,
        email: "naishadh.solanki@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Member",
        name: "Mr. Dhaval B. Joshi",
        designation: "Assistant Professor",
        contact: "9537482224",
        contactIsAddress: false,
        email: "dhaval.joshi@ckpipsr.ac.in",
        tag: "Faculty"
      }
    ],
    tags: [
      "Leadership",
      "Faculty"
    ],
    squad: null
  },
  gsc: {
    slug: "gsc",
    pageTitle: "Gender Sensitization Cell (GSC)",
    pageSubtitle: "Promoting Gender Equality, Inclusivity & Zero Tolerance for Harassment",
    tabStyle: "underline",
    banner: {
      enabled: false,
      badge: "",
      heading: "",
      body: "",
      helplineLabel: "",
      helplinePhone: "",
      reportLabel: ""
    },
    mandate: {
      badge: "Institutional Mandate & Mission",
      heading: "Gender Sensitization Cell (GSC)",
      body: "Gender Sensitization Cell has been instructed to spread the message of Gender Equality in order to eliminate gender bias and gender insensitivity.",
      tone: "green",
      icon: "handshake",
      points: [],
      note: {
        label: "Protection & Action Mandate",
        body: "The Cell has also been mainly entrusted with taking up cases of harassment and atrocities on female teachers, employees and girl students, enquire and take appropriate action against the culprits.",
        icon: "alert"
      }
    },
    roster: {
      eyebrow: "Committee Roster",
      heading: "GSC Committee Members",
      subtitle: "",
      searchPlaceholder: "Search by name, role, contact...",
      noEmailText: "-"
    },
    circulars: {
      eyebrow: "",
      heading: "",
      body: "",
      links: []
    },
    complaint: "none",
    footer: {
      enabled: false,
      text: "",
      highlight: ""
    },
    members: [
      {
        role: "Chairman",
        name: "Dr. Dhiren P. Shah",
        designation: "Principal",
        contact: "9427474602",
        contactIsAddress: false,
        email: "dhiren.shah@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Vice chairman",
        name: "Mr. Nirmal T. Mehta",
        designation: "Asst. Prof.",
        contact: "9978177944",
        contactIsAddress: false,
        email: "nirmal.mehta@ckpipsr.ac.in",
        tag: "Leadership"
      },
      {
        role: "Member",
        name: "Mrs. Prakruti K. Jadav",
        designation: "Asst. Prof.",
        contact: "7567684027",
        contactIsAddress: false,
        email: "prakruti.jadav@ckpipsr.ac.in",
        tag: "Faculty"
      },
      {
        role: "Member",
        name: "Mrs. Trupti C. Patel",
        designation: "Lab Technician",
        contact: "9904399573",
        contactIsAddress: false,
        email: "tcpatel2016@gmail.com",
        tag: "Technical Staff"
      },
      {
        role: "Member",
        name: "Mr. Nirav Patel",
        designation: "Laboratory Technician",
        contact: "9427520001",
        contactIsAddress: false,
        email: "rx.neelpatel@gmail.com",
        tag: "Technical Staff"
      },
      {
        role: "Member",
        name: "Ms. Hetvi Desai",
        designation: "Student",
        contact: "7096279409",
        contactIsAddress: false,
        email: "hetvidesai21258@gmai.com",
        tag: "Student"
      }
    ],
    tags: [
      "Leadership",
      "Faculty",
      "Technical Staff",
      "Student"
    ],
    squad: null
  }
};
