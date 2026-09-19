// Laboratory listings for /resources/laboratories, read from the live site.
//
// Photographs are hosted on the trust's asset console, not on ckpipsr.ac.in.
//
// Only 5 of the 12 labs publish a description; the rest list a name and photos
// only. Do not write descriptions for the ones that have none.

export interface Laboratory {
  name: string;
  descriptions: string[];
}

export const LABORATORIES: Laboratory[] = [
  {
    "name": "Pharmacognosy Lab",
    "descriptions": []
  },
  {
    "name": "Pharmacology Lab-Ii",
    "descriptions": [
      "Various experiments (Demonstration) are performed using Ex-Pharm software like, Effect of Autonomic drugs on Rabbit Eyes Effect of Hepatic microsomal enzyme inhibitors and inducers on pentobarbitone induced sleeping time,",
      "various instruments available are 1.Rota Rod Apparatus 2.Cook’s PoleClimbing Apparatus 3.Digital Photoactometer 4.Analgesiometer 5.Plethysmometer 6.Electro Convulsometer"
    ]
  },
  {
    "name": "Pharmacology Lab-I",
    "descriptions": [
      "Various In vitro experiments are performed using Chicken ileum, pA2 value, pD2 value Effect of various Spasmogenic and Spasmolytic drugs on chicken ileum Bio assay of various drugs (Agonist/Antagonist) using chicken ileum"
    ]
  },
  {
    "name": "Human Anatomy And Physiology Lab",
    "descriptions": [
      "Study of Blood and Urine related Experiments like Haemoglobin Content, Blood Group, RBC count, WBC Count, Estimation of Normal & Abnormal Constitute etc. Study of various body systems through charts and models. Various experiments to check the parameters like Blood Pressure, pulse rate, Heart rate , Lung Volume capacity"
    ]
  },
  {
    "name": "Instrument Room",
    "descriptions": []
  },
  {
    "name": "Pharmaceutical Analysis Lab",
    "descriptions": []
  },
  {
    "name": "Pharmaceutical Chemistry (Medicinal Chemistry) Lab-Ii",
    "descriptions": []
  },
  {
    "name": "Pharmaceutical Chemistry Lab-I",
    "descriptions": []
  },
  {
    "name": "Machine Room",
    "descriptions": [
      "Demonstration of formulation of tablets and capsules at industrial level All major evaluation parameter study of formulations More than 20 instruments permits formulation and characterization of almost all dosage forms."
    ]
  },
  {
    "name": "Pharmaceutical Microbiology & Biotechnology Lab",
    "descriptions": []
  },
  {
    "name": "Pharmaceutics-Ii Lab",
    "descriptions": []
  },
  {
    "name": "Pharmaceutics –I Lab",
    "descriptions": []
  }
];

export const LABORATORY_PHOTOS: string[] = [
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/6403216c64574.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/6479c163675d6.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/6479c1ae14eec.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/640321920e8de.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/640321c9d4148.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/6403268a865b0.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/6403224b51291.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/6479c1ef4d053.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/6403233970a5a.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/640322b0b1622.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/6403229476c50.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/6403245e4e03f.webp",
  "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/resource/lab/photos/6403242b359d7.webp"
];
