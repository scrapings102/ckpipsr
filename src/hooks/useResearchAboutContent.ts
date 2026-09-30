import { useEffect, useState } from "react";
import { withPreview } from "./previewToken";

/**
 * Research & Innovation → Research - About.
 *
 * One document for the whole page: its four tabs are parts of the same content,
 * so they load together and a tab switch never waits on the network.
 */
export interface ResearchPhoto {
  image: string;
  alt: string;
  kicker: string;
  caption: string;
}

export type ResearchIcon = "coins" | "policy" | "collaboration" | "product" | "legal";

export interface RdcMember {
  name: string;
  designation: string;
  role: "Chairperson" | "Coordinator" | "Member";
  responsibility: string;
  contact: string;
  email: string;
}

export interface ResearchResponsibility {
  icon: ResearchIcon;
  title: string;
  body: string;
}

export interface ResearchActionPlan {
  title: string;
  points: string[];
}

export interface ResearchAboutContent {
  pageTitle: string;
  pageSubtitle: string;
  overview: {
    tag: string;
    heading: string;
    body: string;
    stats: { value: string; label: string }[];
    photo: ResearchPhoto;
  };
  vision: { kicker: string; heading: string; body: string };
  mission: { kicker: string; heading: string; points: string[] };
  photo: ResearchPhoto;
  responsibilities: { kicker: string; heading: string; items: ResearchResponsibility[] };
  structure: { kicker: string; instituteId: string; heading: string; members: RdcMember[] };
  objectives: { kicker: string; heading: string; items: string[] };
  actionPlans: { kicker: string; heading: string; items: ResearchActionPlan[] };
}

/** What the page shipped with, and what it falls back to if the API is down. */
export const DEFAULT_RESEARCH_ABOUT: ResearchAboutContent = {
    "pageTitle": "About Research",
    "pageSubtitle": "Fostering Innovation, Discovery & Translational Pharmaceutical Research (NEP-2020 Aligned)",
    "overview": {
      "tag": "Research & Development Cell (RDC)",
      "heading": "Empowering Next-Generation Pharmaceutical Discoveries",
      "body": "C. K. Pithawalla Institute of Pharmaceutical Science & Research is committed to cultivating an ecosystem of cutting-edge research, scientific inquiry, and technological translation in accordance with the national priorities articulated in the National Education Policy (NEP-2020).",
      "stats": [
        {
          "value": "NEP-2020",
          "label": "Aligned Guidelines"
        },
        {
          "value": "5 Pillars",
          "label": "RDC Committees"
        },
        {
          "value": "100%",
          "label": "Ethical Compliance"
        }
      ],
      "photo": {
        "image": "/images/hero/pharmacy_lab.jpg",
        "alt": "CKPIPSR Advanced Pharmaceutical Research Lab",
        "kicker": "CKPIPSR Laboratories",
        "caption": "State-of-the-Art Pharmaceutical Formulation & Analytical Instrumentation"
      }
    },
    "vision": {
      "kicker": "Guiding Light",
      "heading": "Vision",
      "body": "To put in place a robust mechanism for developing and strengthening the research ecosystem within HEIs, aligned with the provisions of NEP-2020."
    },
    "mission": {
      "kicker": "Core Objectives",
      "heading": "Mission",
      "points": [
        "To create a conducive environment for enhanced research productivity.",
        "To encourage collaboration across industry, government, community-based organizations, and agencies at the local, national, and international levels.",
        "To facilitate greater access to research through mobilization of resources and funding."
      ]
    },
    "photo": {
      "image": "/images/hero/students_learning.jpg",
      "alt": "Research scholars collaborating",
      "kicker": "",
      "caption": "Scholars engaging in pharmaceutical research projects"
    },
    "responsibilities": {
      "kicker": "Operational Framework",
      "heading": "Responsibilities",
      "items": [
        {
          "icon": "coins",
          "title": "Finance and infrastructure",
          "body": "The Finance and Infrastructure Committee provides an assurance on the development and delivery of key elements to facilitate research. It is responsible for overseeing the development and implementation of the financial, estates and digital infrastructure objectives of the RDC. Its aim is to ensure that the RDC is operating in line with strategic objectives of the Institute."
        },
        {
          "icon": "policy",
          "title": "Research Program & Policy Development",
          "body": "This committee provides impetus to the research and development activities and to provide guidance, directions to the research community within the Institute. It has representation from all departments. The committee is a vibrant entity to discuss and propose R&D policy issues. The members highlight shortcomings in procedural matters and thus sharpen the performance of the RDC."
        },
        {
          "icon": "collaboration",
          "title": "Collaboration & Community",
          "body": "The main responsibility of this committee is to establish collaboration with other universities, public and private sectors and identify R&D projects including consultancy services which could be undertaken at the institution. This committee will foster collaborations for mutual benefits and to maximize industrial connectivity."
        },
        {
          "icon": "product",
          "title": "Product Development, Monitoring & Commercialization",
          "body": "The committee is a hub for strategic partnerships/ collaborations, industry-institute interface, sponsored or contract research, new knowledge generation, technology transfer, and commercialization of research to facilitate innovation, incubation, entrepreneurship and start-up ventures."
        },
        {
          "icon": "legal",
          "title": "IPR, Legal & Ethical Matters",
          "body": "This committee will function with the prime focus of enabling researchers to identify, generate and protect their intellectual property (IP) through filing procedures for rights like patents, copyrights, trademarks, designs, etc. This committee envision creating an environment for acquiring new knowledge through innovation, developing an attitude of prudent IP management practices and promoting an IPR culture compatible with the educational mission of the academic institution. This committee also provide advice and guidance to the academic community on all matters pertaining to academic research ethics."
        }
      ]
    },
    "structure": {
      "kicker": "Governance & Leadership",
      "instituteId": "IC202217445",
      "heading": "R&D Cell Organizational Structure",
      "members": [
        {
          "name": "Dr. Dhiren P. Shah",
          "designation": "Principal",
          "role": "Chairperson",
          "responsibility": "Convenor",
          "contact": "9427474602",
          "email": "dhiren.shah@ckpipsr.ac.in"
        },
        {
          "name": "Dr. Vinod D. Ramani",
          "designation": "Associate Professor",
          "role": "Coordinator",
          "responsibility": "Product Development Monitoring & Commercialization",
          "contact": "9913792913",
          "email": "vinod.ramani@ckpipsr.ac.in"
        },
        {
          "name": "Mr. Naishadh Solanki",
          "designation": "Associate Professor",
          "role": "Member",
          "responsibility": "Finance and infrastructure",
          "contact": "9099063116",
          "email": "bhumika.desai@ckpipsr.ac.in"
        },
        {
          "name": "Dr. Devendra Vaishnav",
          "designation": "Assistant Professor",
          "role": "Member",
          "responsibility": "Research Program & Policy Development",
          "contact": "8320813998",
          "email": "devendra.vaishnav@ckpipsr.ac.in"
        },
        {
          "name": "Mr. Jitesh P. Jariwala",
          "designation": "Assistant Professor",
          "role": "Member",
          "responsibility": "Collaboration & Community",
          "contact": "9327588060",
          "email": "dipayan.tarafdar@ckpipsr.ac.in"
        },
        {
          "name": "Dr. Suchi Desai",
          "designation": "Assistant Professor",
          "role": "Member",
          "responsibility": "Product Development Monitoring & Commercialization",
          "contact": "8733826684",
          "email": "suchi.desai@ckpipsr.ac.in"
        },
        {
          "name": "Dr. Monika Kakadia",
          "designation": "Assistant Professor",
          "role": "Member",
          "responsibility": "Product Development Monitoring & Commercialization",
          "contact": "9409164609",
          "email": "monika.kakadiya@ckpipsr.ac.in"
        },
        {
          "name": "Mr. Dhaval B. Joshi",
          "designation": "Assistant Professor",
          "role": "Member",
          "responsibility": "IPR Legal & Ethical Matters",
          "contact": "953748224",
          "email": "dhaval.joshi@ckpipsr.ac.in"
        }
      ]
    },
    "objectives": {
      "kicker": "Institutional Goals & Mandate",
      "heading": "Objectives of Research & Development Cell",
      "items": [
        "To create an organizational structure with role-based functions of RDC, formulate Research Policy for the HEIs, identify thrust areas of research, and form related cluster groups/frontline teams/consortia of researchers.",
        "To create enabling provisions in Research Policies for recruitment of research personnel, procurement of equipment, and financial management with adequate autonomy to the Principal Investigator(s) and disseminate research outcomes to stakeholders and the public at large.",
        "To establish a special purpose vehicle to promote researchers and innovators, identify potential collaborators from industry, research organizations, academic institutions & other stakeholders for cooperation and synergistic partnerships.",
        "To act as a liaison between researchers & relevant research funding agencies, extend guidance in preparation & submission of project proposals and post-sanctioning of the grants to oversee adherence to timelines.",
        "To have better coordination among other cells/centers dealing with institute-Industry Inter Linkage, Incubation, Innovation and Entrepreneurship Development and Intellectual Property Rights (IPR).",
        "To develop an Institutional Research Information System for sharing the status of ongoing/ completed research projects/Programmes, expertise & resources, etc., making effective use of Information & Communication Technology (ICT) for preparing the database of in-house experts to provide industrial consultancy and services.",
        "To engage & utilize the services of superannuated active faculty/scientists in research capacity building of talented young minds and promote mobility of researchers across institutions and R&D Labs.",
        "To serve as nodal center for ideation and conceptualization of research topics/themes by organizing workshops and training programs and ensuring the integrity and ethical practices in research activities including clearance of bioethical committee wherever required."
      ]
    },
    "actionPlans": {
      "kicker": "Execution Framework & Initiatives",
      "heading": "Action Plans of Research & Development Cell",
      "items": [
        {
          "title": "To sensitize faculty and students regarding project work based on market needs",
          "points": [
            "Organize guest lectures of entrepreneurship by intrapreneurs",
            "Organize round table discussion with different industrialists to gage about current market demands and industrial problems",
            "Organize workshop on market analysis for product viability",
            "Organize workshop and seminars for product development and product life cycles",
            "Organize Ideathon, Hackathon for current industrial challenges"
          ]
        },
        {
          "title": "To create inhouse facility for product development in diverse technical filed",
          "points": [
            "To make aware about available facility in our campus",
            "To collect project-based facility requirement form students and faculty members",
            "To propose collaboration between various institutes and laboratories to share their lab facility and expertise",
            "To propose centralized facility for R&D work"
          ]
        },
        {
          "title": "To schedule and monitor progress of ongoing project work in our institute",
          "points": [
            "To list out department wise ongoing project works",
            "To review progress of ongoing project work",
            "To address the challenges and huddles faced by researchers in their current work",
            "To establish reward and recognition mechanism for accomplishment of each research work"
          ]
        },
        {
          "title": "To organize meeting between researcher and investor/industry for commercialization of developed technology",
          "points": [
            "Advertise about currently developed product or services to appropriate industry/investors.",
            "Schedule a regular meeting with our industrial collaborators",
            "To arrange invited talks of investors from divers filed of technology",
            "To monitor progress and renumeration of sold/leased technology"
          ]
        }
      ]
    }
  };

/** Enough of a check that a malformed response cannot empty the page. */
function isUsable(value: unknown): value is ResearchAboutContent {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Partial<ResearchAboutContent>;
  return (
    !!p.pageTitle &&
    Array.isArray(p.structure?.members) &&
    Array.isArray(p.objectives?.items) &&
    Array.isArray(p.actionPlans?.items) &&
    Array.isArray(p.responsibilities?.items)
  );
}

export function useResearchAboutContent(): ResearchAboutContent {
  const [content, setContent] = useState<ResearchAboutContent>(DEFAULT_RESEARCH_ABOUT);

  useEffect(() => {
    let cancelled = false;

    fetch(withPreview("/api/pages/research/about"))
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        if (isUsable(body.researchAbout)) setContent(body.researchAbout);
      })
      // The page does not depend on the API being up.
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
