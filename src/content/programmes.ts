/**
 * Editorial content for the Programmes section of SEVA Social Service Society.
 *
 * Overview and per-programme editorial copy strictly sourced from official
 * organizational records (focus-areas.ts, projects.ts, and organization.ts).
 * No statistics, locations, or activities are invented.
 */

export type ProgrammePageId =
  | "programmes"
  | "education"
  | "healthcare"
  | "women-empowerment"
  | "community-welfare"
  | "rural-tribal-development"
  | "skill-development"
  | "relief-works";

export interface ProgrammeEditorial {
  id: ProgrammePageId;
  eyebrow: string;
  headline: string;
  headlineEm?: string;
  description: string;
  metaDescription: string;
  chapterTag: string;
  accentColor: "yellow" | "blue" | "coral" | "black" | "surface";
}

export const programmesContent: Readonly<
  Record<ProgrammePageId, ProgrammeEditorial>
> = {
  programmes: {
    id: "programmes",
    eyebrow: "Seven Focus Areas · Love In Action",
    headline: "Restoring Dignity",
    headlineEm: "Through Action.",
    description:
      "SEVA Social Service Society advances human dignity across Maharashtra, Tamil Nadu, and Andhra Pradesh through seven interconnected programmes: education, healthcare, women empowerment, community welfare, rural and tribal development, skill development, and emergency relief.",
    metaDescription:
      "Explore SEVA Social Service Society's seven core programme areas: Education, Healthcare, Women Empowerment, Community Welfare, Rural & Tribal Development, Skill Development, and Relief Works.",
    chapterTag: "01 · SEVA PROGRAMMES",
    accentColor: "yellow",
  },
  education: {
    id: "education",
    eyebrow: "01 / Education",
    headline: "Opening Doors",
    headlineEm: "To Learning.",
    description:
      "Nurturing potential through non-formal learning centres, structured tuition, scholarships, and bridge support for children from migrant and economically vulnerable families.",
    metaDescription:
      "SEVA's Education programme: non-formal learning centres, Vidya Jyoti scholarships, CNEWA non-formal education, bridge classes, tuition support, and school supplies.",
    chapterTag: "01 · EDUCATION",
    accentColor: "yellow",
  },
  healthcare: {
    id: "healthcare",
    eyebrow: "02 / Healthcare",
    headline: "Care for",
    headlineEm: "Every Person.",
    description:
      "Delivering preventive health camps, periodic screening, child nutrition monitoring, hygiene education, and critical medical assistance to underserved populations.",
    metaDescription:
      "SEVA's Healthcare programme: mobile medical assistance camps, child growth and nutrition monitoring, hygiene awareness campaigns, and hospital referrals.",
    chapterTag: "02 · HEALTHCARE",
    accentColor: "blue",
  },
  "women-empowerment": {
    id: "women-empowerment",
    eyebrow: "03 / Women Empowerment",
    headline: "Strength from",
    headlineEm: "Within.",
    description:
      "Building self-reliance through self-help groups (SHGs), vocational tailoring training centres, micro-enterprise mentoring, financial literacy, and community governance workshops.",
    metaDescription:
      "SEVA's Women Empowerment programme: Jeevan Project self-help groups in Raigad District, Sui Daga tailoring training centres, financial literacy, and community governance.",
    chapterTag: "03 · WOMEN EMPOWERMENT",
    accentColor: "coral",
  },
  "community-welfare": {
    id: "community-welfare",
    eyebrow: "04 / Community Welfare",
    headline: "Standing",
    headlineEm: "Together.",
    description:
      "Providing weekly hot meals through SEVA Ruby Meal, elder care, emergency food assistance, and compassionate outreach for vulnerable and homeless families.",
    metaDescription:
      "SEVA's Community Welfare programme: the weekly Friday Ruby Meal distribution in Khadki-Pune, elderly assistance, and compassionate support for vulnerable communities.",
    chapterTag: "04 · COMMUNITY WELFARE",
    accentColor: "black",
  },
  "rural-tribal-development": {
    id: "rural-tribal-development",
    eyebrow: "05 / Rural & Tribal Development",
    headline: "Rooted in",
    headlineEm: "Community.",
    description:
      "Fostering sustainable livelihoods, natural resource stewardship, participatory local governance, and durable housing across rural and indigenous settlements.",
    metaDescription:
      "SEVA's Rural and Tribal Development programme: housing construction, community governance, natural resource stewardship, and sustainable livelihoods in Andhra Pradesh and Telangana.",
    chapterTag: "05 · RURAL & TRIBAL",
    accentColor: "surface",
  },
  "skill-development": {
    id: "skill-development",
    eyebrow: "06 / Skill Development",
    headline: "Building",
    headlineEm: "Futures.",
    description:
      "Equipping youth and adults with market-relevant vocational trades, entrepreneurial capacity, tailoring skills, and income-generation avenues.",
    metaDescription:
      "SEVA's Skill Development programme: hands-on technical skills, vocational tailoring, employability training, and micro-enterprise mentoring.",
    chapterTag: "06 · SKILL DEVELOPMENT",
    accentColor: "blue",
  },
  "relief-works": {
    id: "relief-works",
    eyebrow: "07 / Relief Works",
    headline: "Ready When",
    headlineEm: "It Matters.",
    description:
      "Responding swiftly during floods, droughts, natural disasters, and crises with life-saving provisions, essential supplies, medical assistance, and rehabilitation support.",
    metaDescription:
      "SEVA's Relief Works programme: rapid humanitarian disaster response, essential supply lines, emergency medical aid, and rehabilitation assistance for affected families.",
    chapterTag: "07 · RELIEF WORKS",
    accentColor: "coral",
  },
};

export function isProgrammePageId(id: string): id is ProgrammePageId {
  return Object.prototype.hasOwnProperty.call(programmesContent, id);
}
