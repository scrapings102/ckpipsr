export interface InstituteInfo {
  name: string;
  shortName: string;
  fullName: string;
  tagline: string;
  established: number;
  location: string;
  campusSize: string;
  address: string;
}

export interface ContactInfo {
  address: string;
  timings: string;
  phones: string[];
  emails: string[];
}

export const INSTITUTE: InstituteInfo = {
  name: "CKPIPSR",
  shortName: "CKPIPSR",
  fullName: "C. K. Pithawalla Institute of Pharmaceutical Science & Research",
  tagline: "Dedicated to Excellence in Pharmaceutical Education & Research",
  established: 2005,
  location: "Surat, Gujarat, India",
  campusSize: "100-Acre Educational Complex",
  address: "Opposite Surat Airport, Behind DPS School, Near Malvan Mandir, Dumas Road, Surat - 395007, Gujarat, India."
};

export const CONTACT: ContactInfo = {
  address: "Opposite Surat Airport, Behind DPS School, Near Malvan Mandir, Dumas Road, Surat - 395007, Gujarat, India.",
  timings: "09:30 AM – 05:00 PM (Mon-Sat)",
  phones: ["+91 63550 65636", "+91 90990 63116"],
  emails: ["ckpipsr@gmail.com"]
};
