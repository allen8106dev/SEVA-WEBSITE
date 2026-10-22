/**
 * Actual organizational projects and initiatives of SEVA Social Service Society.
 *
 * Sourced directly from official organizational records.
 * Reported metrics are organization-reported and awaiting final publication audit approval.
 * Figures are never presented as independently audited or mutually exclusive.
 */

export interface ProjectRecord {
  id: string;
  name: string;
  subtitle: string;
  focusAreaId: string;
  focusAreaName: string;
  description: string;
  activities: readonly string[];
  location?: string;
  reportedImpact: string;
  reportingPeriod?: string;
  imagePlaceholder: {
    src: string;
    alt: string;
    caption: string;
    ratio: "portrait" | "landscape" | "cinematic" | "square";
  };
  detailRoute: string;
  verificationStatus: "reported_pending_audit" | "verified";
  featuredOnHome?: boolean;
}

export const projects: readonly ProjectRecord[] = [
  {
    id: "cnewa-education",
    name: "CNEWA Non-Formal Education",
    subtitle: "Foundational learning for migrant & vulnerable children",
    focusAreaId: "education",
    focusAreaName: "Education",
    description:
      "Supports children from migrant and economically vulnerable families through bridge schooling, nutrition, and foundational academic learning to enable successful integration into formal education.",
    activities: [
      "Foundational literacy",
      "Numeracy",
      "Bridge classes",
      "Tuition support",
      "Nutrition",
      "Parental engagement",
    ],
    location: "Pune & Regional Centres",
    reportedImpact: "75+ enrolled children, ~65% daily attendance",
    reportingPeriod: "Organizational reported records",
    imagePlaceholder: {
      src: "/images/programmes/education/vidyarambham-initiation.webp",
      alt: "Vidyarambham foundational learning ceremony at a SEVA education centre",
      caption:
        "Authentic SEVA programme · CNEWA Non-Formal Education & Tuition Centre.",
      ratio: "landscape",
    },
    detailRoute: "/projects/cnewa-education",
    verificationStatus: "reported_pending_audit",
    featuredOnHome: false,
  },
  {
    id: "vidya-jyoti",
    name: "Vidya Jyoti Scholarship Programme",
    subtitle: "Comprehensive educational assistance & mentoring",
    focusAreaId: "education",
    focusAreaName: "Education",
    description:
      "Flagship education support program providing tuition assistance, study materials, uniforms, and dedicated academic mentoring for students in high-need communities.",
    activities: [
      "Tuition fees",
      "Textbooks",
      "Uniforms",
      "School supplies",
      "Academic mentoring",
    ],
    reportedImpact:
      "Approximately 700 children assisted, with 478 students in structured tuition centres",
    reportingPeriod: "2025–26 programme",
    imagePlaceholder: {
      src: "/images/programmes/education/vidhya-jyothi-distribution.webp",
      alt: "Vidya Jyothi school bag and educational kit distribution to children",
      caption:
        "Authentic SEVA programme · Vidya Jyothi educational distribution · Maharashtra and Regional Centres.",
      ratio: "landscape",
    },
    detailRoute: "/projects/vidya-jyoti",
    verificationStatus: "reported_pending_audit",
    featuredOnHome: true,
  },
  {
    id: "jeevan-project",
    name: "Jeevan Project",
    subtitle: "Women's empowerment & sustainable community governance",
    focusAreaId: "women-empowerment",
    focusAreaName: "Women Empowerment",
    description:
      "Grassroots initiative based in Raigad District dedicated to women's socio-economic empowerment through self-help groups, financial literacy, and community governance leadership.",
    activities: [
      "Leadership development",
      "Self-help groups",
      "Financial literacy",
      "Community governance",
      "Livelihood training",
    ],
    location: "Raigad District, Maharashtra",
    reportedImpact: "Approximately 75–100 women trained",
    reportingPeriod: "Organizational reported records",
    imagePlaceholder: {
      src: "/images/story-portrait.jpg",
      alt: "Dignified portrait reflecting women leadership and community resilience",
      caption:
        "Provisional documentary portrait · Ayo Ogunseinde (Unsplash) · Reserved for authentic voices from the Jeevan Project.",
      ratio: "portrait",
    },
    detailRoute: "/projects/jeevan-project",
    verificationStatus: "reported_pending_audit",
    featuredOnHome: true,
  },
  {
    id: "sui-daga-tailoring",
    name: "Sui Daga Tailoring Project",
    subtitle: "Vocational tailoring training & livelihood development",
    focusAreaId: "skill-development",
    focusAreaName: "Skill Development",
    description:
      "Dedicated vocational tailoring initiative equipping women with professional cutting, stitching, and garment construction skills to foster independent micro-enterprises.",
    activities: [
      "Vocational tailoring training",
      "Garment production skills",
      "Livelihood development",
      "Micro-enterprise mentoring",
    ],
    reportedImpact: "Two active tailoring centres established and operational",
    reportingPeriod: "Organizational reported records",
    imagePlaceholder: {
      src: "/images/impact-community.jpg",
      alt: "Tailoring training centre workspace with sewing machines and fabrics",
      caption:
        "Provisional documentary study · Hannah Busing (Unsplash) · Sui Daga vocational tailoring centres.",
      ratio: "square",
    },
    detailRoute: "/projects/sui-daga-tailoring",
    verificationStatus: "reported_pending_audit",
    featuredOnHome: false,
  },
  {
    id: "seva-ruby-meal",
    name: "SEVA Ruby Meal",
    subtitle: "Weekly Friday community nutrition initiative",
    focusAreaId: "community-welfare",
    focusAreaName: "Community Welfare",
    description:
      "A compassionate weekly feeding program organized every Friday to serve fresh, nutritious meals to homeless individuals, elderly people, daily-wage laborers, and vulnerable families.",
    activities: [
      "Weekly Friday hot meal preparation",
      "Nutritious food distribution",
      "Community outreach and elder support",
      "Relief assistance for daily-wage families",
    ],
    reportedImpact:
      "Regular Friday meal service for homeless persons, the elderly, daily-wage workers, and underserved families",
    reportingPeriod: "Weekly ongoing schedule",
    imagePlaceholder: {
      src: "/images/programmes/community-welfare/ruby-meals-service.webp",
      alt: "SEVA Ruby Meal food distribution serving fresh hot meals to community members",
      caption:
        "Authentic SEVA programme · Ruby Meal food distribution program · Khadki-Pune.",
      ratio: "portrait",
    },
    detailRoute: "/projects/seva-ruby-meal",
    verificationStatus: "reported_pending_audit",
    featuredOnHome: false,
  },
  {
    id: "healthcare-outreach",
    name: "Healthcare and Medical Outreach",
    subtitle: "Preventive health camps & medical assistance",
    focusAreaId: "healthcare",
    focusAreaName: "Healthcare",
    description:
      "Comprehensive healthcare initiatives delivering preventive medical checkup camps, child health monitoring, nutritional intervention, and medical assistance in underserved regions.",
    activities: [
      "Medical camps",
      "Preventive healthcare",
      "Child health monitoring",
      "Nutrition and hygiene awareness",
      "Medical assistance",
      "Community partnerships",
    ],
    reportedImpact:
      "Community health screenings, preventive hygiene guidance, and clinical referrals",
    reportingPeriod: "Organizational reported records",
    imagePlaceholder: {
      src: "/images/purpose-hands.jpg",
      alt: "Healthcare workers providing compassionate community care",
      caption:
        "Provisional documentary study · Joel Muniz (Unsplash) · Healthcare camps and medical outreach.",
      ratio: "landscape",
    },
    detailRoute: "/projects/healthcare-outreach",
    verificationStatus: "reported_pending_audit",
    featuredOnHome: false,
  },
] as const;
