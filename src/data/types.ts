export interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export interface Trustee {
  name: string;
  role: string;
  focus: string;
}

export interface Disclosure {
  title: string;
  doc: string;
  status: string;
}

export interface SyllabusModule {
  title: string;
  desc: string;
}

export interface PlacementPartner {
  name: string;
  role: string;
}

export interface Patent {
  title: string;
  reg: string;
  status: string;
}

export interface SportsEvent {
  title: string;
  date: string;
  venue: string;
  status: string;
}

export interface BentoItem {
  title: string;
  subtitle: string;
  category: string;
  theme: "dark" | "gray" | "white";
}

export interface VisitLog {
  site: string;
  industry: string;
  date: string;
}
