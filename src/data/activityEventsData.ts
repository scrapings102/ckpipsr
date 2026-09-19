// Events listed on /activities/events, read from the live site's card markup.
//
// SOURCE NOTE: Photographs are hosted on the trust's asset console
// (console-navyugtrust-org.s3.ap-south-1.amazonaws.com), not on ckpipsr.ac.in.
// Searching only the college domain will not find them.

export interface ActivityEvent {
  title: string;
  category?: string;
  conductedBy?: string;
  participants?: string;
  duration?: string;
  report?: string;
}

export const EVENT_CATEGORIES: string[] = ["Competition", "Extracurricular Activities", "Nss Events", "Seminar", "Sports", "Techfest", "Visit", "Workshop"];

export const ACTIVITY_EVENTS: ActivityEvent[] = [
  {
    "title": "World Pharmacist Day” and “Pharmacovigilance Week” celebrations",
    "category": "Competition",
    "conductedBy": "CKPIPSR",
    "duration": "25-09-24 09:30 to 25-09-24 17:00"
  },
  {
    "title": "NATIONAL LEVEL ONLINE QUIZ\" In Collaboration with APTI (Gujarat State Branch) & Pharma Vision (Gujarat Chapter) On \"Pharmacovigilance-ADR\" On occasion of 4th National Pharmacovigilance Week-2024 \"Building ADR Reporting Culture for Patient Safety\"",
    "category": "Competition",
    "conductedBy": "CKPIPSR",
    "participants": "292",
    "duration": "25-09-24 10:07 to 25-09-24 16:07",
    "report": "Report On National Level Quiz Pharmacovigilance –Adr 25-09-2024"
  },
  {
    "title": "Online Quiz \"Rising Above: Indian Women's Journey to Success\" On occasion of International Women's Day, 2024",
    "category": "Competition",
    "participants": "339",
    "duration": "08-03-24 09:37 to 08-03-24 10:37",
    "report": "Report On Online Quiz \"Rising Above: Indian Women's Journey To Success\" On Occasion Of International Women's Day, 2024"
  },
  {
    "title": "Online Quiz \"Rx Quiz Challenge: Unlocking Pharmaceutical Knowledge\" On occasion of National Pharmacy Education Day-2024 'Birth Anniversary' of Prof. Mahadeva Lal Schroff",
    "category": "Competition",
    "conductedBy": "CKPIPSR",
    "participants": "226",
    "duration": "06-03-24 12:30 to 06-03-24 13:30",
    "report": "Report On Online Quiz \"Rx Quiz Challenge: Unlocking Pharmaceutical Knowledge\""
  },
  {
    "title": "Elocution competition",
    "category": "Competition",
    "participants": "5",
    "duration": "16-01-24 12:17 to 16-01-24 13:17",
    "report": "Report On Elocution Competition"
  },
  {
    "title": "Online Quiz on Swami Vivekanand's Life On the occasion of National Youth Day",
    "category": "Competition",
    "duration": "12-01-24 16:19 to 12-01-24 17:19"
  },
  {
    "title": "National Energy Conservation Day celebration",
    "category": "Competition",
    "conductedBy": "C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat",
    "duration": "14-12-23 10:01 to 14-12-23 16:01",
    "report": "Report On_National Energy Conservation Day Celebration"
  },
  {
    "title": "Online quiz on \"cGMP\" to celebrate \"National cGMP Day-2023\"",
    "category": "Competition",
    "conductedBy": "C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat",
    "participants": "129",
    "duration": "10-10-23 15:15 to 10-10-23 16:15",
    "report": "Report On Online Quiz On \"Cgmp\" To Celebrate \"National Cgmp Day-2023\""
  },
  {
    "title": "World Pharmacist Day Celebration Report collaboration with APTI Gujarat Chapter",
    "category": "Competition",
    "conductedBy": "C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat",
    "participants": "83",
    "duration": "25-09-23 16:23 to 25-09-23 17:23"
  },
  {
    "title": "Online Quiz on \"Women’s Equality\"",
    "category": "Competition",
    "conductedBy": "C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat",
    "participants": "337",
    "duration": "26-08-23 12:24 to 26-08-23 13:24"
  },
  {
    "title": "Online Quiz on \"Entrepreneurship Journey\"",
    "category": "Competition",
    "conductedBy": "C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat",
    "participants": "820",
    "duration": "21-08-23 12:21 to 21-08-23 13:21"
  },
  {
    "title": "ONLINE QUIZ ON \"PHARMACOVIGILANCE\"",
    "category": "Competition",
    "conductedBy": "C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat",
    "participants": "134",
    "duration": "20-09-23 12:04 to 20-09-23 13:04"
  },
  {
    "title": "Poster Presentation Competition",
    "category": "Competition",
    "participants": "66",
    "duration": "05-09-22 14:03 to 05-09-22 16:33"
  }
];

export const ACTIVITY_EVENT_PHOTOS: string[] = [
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/684d5ad44c2fc.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/684d590d7b9db.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/6625e2fdd25cc.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/6623688917ff8.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/659e768a736b8.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/659e73082999a.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/653f81882016d.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/651e9735c5167.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/6517c67837f48.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/6517c5ec1fff2.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/6517c2394c161.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/activity/events/photos/638cd09e4f470.webp"
];
