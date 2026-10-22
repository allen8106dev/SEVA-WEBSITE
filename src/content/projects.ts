/**
 * Actual organizational projects and initiatives of SEVA Social Service Society.
 *
 * Sourced directly from official organizational records.
 * Reported metrics are organization-reported and awaiting final publication audit approval.
 * Figures are never presented as independently audited or mutually exclusive.
 *
 * Phase 5C.2B canonical data model for project detail pages.
 */

import type { MediaAspectRatio } from "./media";

export interface ProjectStat {
  metric: string;
  value: string;
  label: string;
  context?: string;
}

export interface ProjectParticipation {
  title: string;
  description: string;
  pathway: string;
  contactAction: string;
}

export interface ProjectRecord {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  focusAreaId: string;
  focusAreaName: string;
  secondaryFocusAreaId?: string;
  secondaryFocusAreaName?: string;
  headline: string;
  headlineEm?: string;
  description: string;
  introduction: string;
  objectives: readonly string[];
  activities: readonly string[];
  location?: string;
  reportedImpact: string;
  reportedStats?: readonly ProjectStat[];
  reportingPeriod?: string;
  approvedImages?: readonly string[];
  imagePlaceholder: {
    src: string;
    alt: string;
    caption: string;
    ratio: MediaAspectRatio;
  };
  relatedProjectIds?: readonly string[];
  participationInfo: ProjectParticipation;
  detailRoute: string;
  verificationStatus: "reported_pending_audit" | "verified";
  publicationStatus: "confirmed_official" | "reported_pending_audit";
  metaDescription: string;
  themeColor: "yellow" | "blue" | "coral" | "black";
  featuredOnHome?: boolean;
}

export const projects: readonly ProjectRecord[] = [
  {
    id: "cnewa-education",
    name: "CNEWA Non-Formal Education",
    slug: "cnewa",
    subtitle: "Foundational learning for migrant & vulnerable children",
    focusAreaId: "education",
    focusAreaName: "Education",
    headline: "Foundations of Hope",
    headlineEm: "For Every Child.",
    description:
      "Supports children from migrant and economically vulnerable families through bridge schooling, nutrition, and foundational academic learning to enable successful integration into formal education.",
    introduction:
      "SEVA's CNEWA Non-Formal Education initiative provides bridging academic instruction, foundational literacy, numeracy, and daily nutritional support to children from migrant and economically vulnerable families across Pune and regional centres. By creating a safe, encouraging learning environment, the project helps children who have experienced disrupted schooling rebuild foundational competencies and transition into formal educational institutions.",
    objectives: [
      "Provide foundational literacy and numeracy to children unable to access mainstream schooling.",
      "Bridge educational gaps for children of seasonal and migrant laborer families.",
      "Ensure regular nutritional support to strengthen health, focus, and classroom retention.",
      "Foster active parental engagement and dialogue regarding children's educational rights.",
      "Facilitate transition into formal schooling systems as families achieve regional stability.",
    ],
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
    reportedStats: [
      {
        metric: "75+",
        value: "75+",
        label: "Enrolled Children",
        context:
          "Children from migrant and vulnerable families actively enrolled in foundational learning.",
      },
      {
        metric: "~65%",
        value: "65%",
        label: "Daily Attendance",
        context:
          "Average regular daily attendance maintained across active centre bridge sessions.",
      },
    ],
    reportingPeriod: "Organizational reported records",
    approvedImages: [
      "tuition-vidyarambham-initiation",
      "tuition-classroom-group",
      "tuition-learning-session",
      "tuition-centre-composite",
    ],
    imagePlaceholder: {
      src: "/images/programmes/education/vidyarambham-initiation.webp",
      alt: "Vidyarambham foundational learning ceremony at a SEVA education centre",
      caption:
        "Authentic SEVA programme · CNEWA Non-Formal Education & Tuition Centre.",
      ratio: "landscape",
    },
    relatedProjectIds: ["vidya-jyoti"],
    participationInfo: {
      title: "Support Foundational Learning",
      description:
        "SEVA welcomes volunteer educators, instructional supplies, and educational mentors to support bridge classes and foundational tutoring for migrant children.",
      pathway: "Volunteer Teaching & Learning Supplies",
      contactAction: "/contact",
    },
    detailRoute: "/programmes/education/cnewa",
    verificationStatus: "reported_pending_audit",
    publicationStatus: "confirmed_official",
    metaDescription:
      "CNEWA Non-Formal Education by SEVA Social Service Society: foundational literacy, numeracy, bridge classes, and nutrition for 75+ enrolled migrant children in Pune.",
    themeColor: "yellow",
    featuredOnHome: false,
  },
  {
    id: "vidya-jyoti",
    name: "Vidya Jyoti Scholarship Programme",
    slug: "vidya-jyoti",
    subtitle: "Comprehensive educational assistance & mentoring",
    focusAreaId: "education",
    focusAreaName: "Education",
    headline: "Light on the Path",
    headlineEm: "Of Learning.",
    description:
      "Flagship education support program providing tuition assistance, study materials, uniforms, and dedicated academic mentoring for students in high-need communities.",
    introduction:
      "Vidya Jyoti is SEVA's comprehensive educational assistance initiative, providing vital tuition aid, school bags, notebooks, textbooks, uniforms, and structured evening tuition centres for students across high-need communities in Maharashtra, Tamil Nadu, Andhra Pradesh, and Telangana. The programme addresses the critical financial and academic barriers that force vulnerable students out of the educational pipeline.",
    objectives: [
      "Remove financial barriers preventing deserving children from completing their formal education.",
      "Equip students with essential learning kits, including uniforms, school bags, and textbooks.",
      "Operate structured evening tuition centres for homework support and academic reinforcement.",
      "Provide sustained academic mentoring to prevent student dropout during transitional grades.",
      "Support vulnerable families across rural, urban, and tribal settlements in four states.",
    ],
    activities: [
      "Tuition assistance",
      "Textbooks",
      "Uniforms",
      "Educational supplies",
      "Academic mentoring",
    ],
    location: "Maharashtra, Tamil Nadu, Andhra & Telangana",
    reportedImpact:
      "Approximately 700 children assisted, with 478 students in structured tuition centres",
    reportedStats: [
      {
        metric: "~700",
        value: "700",
        label: "Children Assisted",
        context:
          "Total children provided with educational kits, uniforms, textbooks, or tuition fee assistance in 2025–26.",
      },
      {
        metric: "478",
        value: "478",
        label: "Tuition Centre Students",
        context:
          "Students participating in structured evening tuition centres for focused academic guidance.",
      },
    ],
    reportingPeriod: "2025–26 programme",
    approvedImages: [
      "vidhya-jyothi-distribution",
      "vidhya-jyothi-sisters",
      "seva-vidhya-jyothi-collage",
    ],
    imagePlaceholder: {
      src: "/images/programmes/education/vidhya-jyothi-distribution.webp",
      alt: "Vidya Jyothi school bag and educational kit distribution to children",
      caption:
        "Authentic SEVA programme · Vidya Jyothi educational distribution · Maharashtra and Regional Centres.",
      ratio: "landscape",
    },
    relatedProjectIds: ["cnewa-education"],
    participationInfo: {
      title: "Sponsor a Student's Education",
      description:
        "Support educational equity through corporate CSR sponsorships, academic kit donations, and student mentoring coordinated directly through the SEVA directorate.",
      pathway: "CSR Partnerships & Educational Sponsorship",
      contactAction: "/contact",
    },
    detailRoute: "/programmes/education/vidya-jyoti",
    verificationStatus: "reported_pending_audit",
    publicationStatus: "confirmed_official",
    metaDescription:
      "Vidya Jyoti Scholarship Programme by SEVA Social Service Society: educational assistance, textbooks, uniforms, and mentoring for ~700 children and 478 tuition centre students in 2025–26.",
    themeColor: "blue",
    featuredOnHome: true,
  },
  {
    id: "jeevan-project",
    name: "Jeevan Project",
    slug: "jeevan",
    subtitle: "Women's empowerment & sustainable community governance",
    focusAreaId: "women-empowerment",
    focusAreaName: "Women Empowerment",
    headline: "Strength in Community,",
    headlineEm: "Voice in Governance.",
    description:
      "Grassroots initiative based in Raigad District dedicated to women's socio-economic empowerment through self-help groups, financial literacy, and community governance leadership.",
    introduction:
      "Based in Raigad District, Maharashtra, the Jeevan Project mobilizes women from marginalized rural households into active Self-Help Groups (SHGs). By fostering collective savings, practical financial literacy, and participatory village governance leadership, the project equips women to take an active, influential role in local decision-making and sustainable household livelihoods.",
    objectives: [
      "Mobilize and sustain women's Self-Help Groups (SHGs) for micro-savings and mutual credit support.",
      "Deliver practical financial literacy, banking familiarity, and household budgeting workshops.",
      "Build women's leadership capacities for meaningful participation in gram sabhas and village councils.",
      "Facilitate access to sustainable livelihood opportunities and agricultural or trade skills.",
      "Strengthen community solidarity, social cohesion, and grassroots problem-solving networks.",
    ],
    activities: [
      "Women's leadership development",
      "Self-help groups",
      "Financial literacy",
      "Community governance",
      "Livelihood training",
    ],
    location: "Raigad District, Maharashtra",
    reportedImpact: "Approximately 75–100 women trained",
    reportedStats: [
      {
        metric: "75–100",
        value: "75–100",
        label: "Women Trained",
        context:
          "Women trained across Self-Help Groups, financial literacy modules, and community governance workshops in Raigad.",
      },
    ],
    reportingPeriod: "Organizational reported records",
    approvedImages: [],
    imagePlaceholder: {
      src: "/images/story-portrait.jpg",
      alt: "Dignified documentary portrait reflecting women leadership and community resilience",
      caption:
        "Provisional documentary portrait · Ayo Ogunseinde (Unsplash) · Reserved for authentic voices from the Jeevan Project in Raigad District.",
      ratio: "portrait",
    },
    relatedProjectIds: ["sui-daga-tailoring"],
    participationInfo: {
      title: "Partner with Women's Collectives",
      description:
        "Collaborate with SEVA to support women's Self-Help Groups with financial tools, livelihood resources, and leadership workshop sponsorships in Raigad District.",
      pathway: "Grassroots Development Partnership",
      contactAction: "/contact",
    },
    detailRoute: "/programmes/women-empowerment/jeevan",
    verificationStatus: "reported_pending_audit",
    publicationStatus: "confirmed_official",
    metaDescription:
      "Jeevan Project in Raigad District, Maharashtra: women's empowerment through Self-Help Groups, financial literacy, community governance, and leadership training for 75–100 women.",
    themeColor: "coral",
    featuredOnHome: true,
  },
  {
    id: "sui-daga-tailoring",
    name: "Sui Daga Tailoring Project",
    slug: "sui-daga",
    subtitle: "Vocational tailoring training & livelihood development",
    focusAreaId: "women-empowerment",
    focusAreaName: "Women Empowerment",
    secondaryFocusAreaId: "skill-development",
    secondaryFocusAreaName: "Skill Development",
    headline: "Crafting Dignity,",
    headlineEm: "Stitch by Stitch.",
    description:
      "Dedicated vocational tailoring initiative equipping women with professional cutting, stitching, and garment construction skills to foster independent micro-enterprises.",
    introduction:
      "The Sui Daga Tailoring Project operates community-based vocational training centres that equip women with professional garment cutting, machine stitching, pattern design, and micro-business management skills. Bridging Women Empowerment and Skill Development, the project provides practical technical training that translates directly into household income generation, local garment production, and economic self-reliance.",
    objectives: [
      "Equip women with market-relevant pattern cutting, measuring, and sewing machine operation skills.",
      "Maintain equipped, accessible vocational tailoring centres in high-need community locations.",
      "Foster home-based micro-enterprises, garment alterations, and community stitching contracts.",
      "Provide micro-enterprise guidance covering material sourcing, pricing, and client management.",
      "Empower women to achieve independent income streams that enhance family financial security.",
    ],
    activities: [
      "Tailoring training",
      "Skills development",
      "Livelihood opportunities",
      "Income-generation capacity building",
    ],
    location: "Pune Regional Centres",
    reportedImpact: "Two active tailoring centres established and operational",
    reportedStats: [
      {
        metric: "2",
        value: "2",
        label: "Active Centres",
        context:
          "Two fully operational community tailoring centres equipped with sewing machines and structured instruction.",
      },
    ],
    reportingPeriod: "Organizational reported records",
    approvedImages: [],
    imagePlaceholder: {
      src: "/images/impact-community.jpg",
      alt: "Tailoring training centre workspace with sewing machines and fabrics",
      caption:
        "Provisional documentary study · Hannah Busing (Unsplash) · Sui Daga vocational tailoring centres.",
      ratio: "square",
    },
    relatedProjectIds: ["jeevan-project"],
    participationInfo: {
      title: "Sponsor Vocational Equipment",
      description:
        "Contribute sewing machines, tailoring fabrics, and training materials, or sponsor a vocational student batch through SEVA's verified skill development channels.",
      pathway: "Vocational Equipment & Training Sponsorship",
      contactAction: "/contact",
    },
    detailRoute: "/programmes/women-empowerment/sui-daga",
    verificationStatus: "reported_pending_audit",
    publicationStatus: "confirmed_official",
    metaDescription:
      "Sui Daga Tailoring Project by SEVA Social Service Society: vocational cutting and stitching training across two active centres, building women's livelihood capacity.",
    themeColor: "yellow",
    featuredOnHome: false,
  },
  {
    id: "seva-ruby-meal",
    name: "SEVA Ruby Meal",
    slug: "seva-ruby-meal",
    subtitle: "Weekly Friday community nutrition initiative",
    focusAreaId: "community-welfare",
    focusAreaName: "Community Welfare",
    headline: "The Friday Table,",
    headlineEm: "Shared in Compassion.",
    description:
      "A compassionate weekly feeding program organized every Friday to serve fresh, nutritious meals to homeless individuals, elderly people, daily-wage laborers, and vulnerable families.",
    introduction:
      "SEVA Ruby Meal is an enduring community nutrition initiative conducted every Friday under the auspices of the Eparchy of St. Ephrem Khadki-Pune. The programme prepares and distributes hot, wholesome meals to individuals experiencing homelessness, elderly persons without social safety nets, daily-wage workers facing acute food insecurity, and economically vulnerable families in informal settlements.",
    objectives: [
      "Provide guaranteed, nutritious hot meals every Friday to community members facing severe hunger.",
      "Uphold unconditional dignity and respect for every participant without social distinction.",
      "Offer compassionate outreach and support for destitute elderly residents in Khadki-Pune.",
      "Alleviate weekly food vulnerability for daily-wage laborers and families living in informal settlements.",
      "Foster an enduring tradition of community solidarity and shared responsibility.",
    ],
    activities: [
      "Weekly Friday hot meal preparation",
      "Nutritious food distribution",
      "Community outreach and elder support",
      "Relief assistance for daily-wage families",
      "Dignified service to people experiencing homelessness",
    ],
    location: "Khadki-Pune, Maharashtra",
    reportedImpact:
      "Regular Friday meal service for homeless persons, the elderly, daily-wage workers, and underserved families",
    reportedStats: [
      {
        metric: "Weekly",
        value: "Every Friday",
        label: "Regular Service",
        context:
          "Consistent, unbroken weekly hot meal preparation and outreach schedule in Khadki-Pune.",
      },
    ],
    reportingPeriod: "Weekly ongoing schedule",
    approvedImages: [
      "ruby-meals-service",
      "ruby-meals-outreach",
      "seva-ruby-meals-collage",
    ],
    imagePlaceholder: {
      src: "/images/programmes/community-welfare/ruby-meals-service.webp",
      alt: "SEVA Ruby Meal food distribution serving fresh hot meals to community members",
      caption:
        "Authentic SEVA programme · Ruby Meal food distribution program · Khadki-Pune.",
      ratio: "portrait",
    },
    relatedProjectIds: [],
    participationInfo: {
      title: "Join the Friday Distribution",
      description:
        "Volunteer hands are warmly welcomed for food preparation and meal distribution, alongside donations of staple food grains coordinated through the SEVA directorate.",
      pathway: "Friday Volunteer Service & Food Grain Support",
      contactAction: "/contact",
    },
    detailRoute: "/programmes/community-welfare/seva-ruby-meal",
    verificationStatus: "reported_pending_audit",
    publicationStatus: "confirmed_official",
    metaDescription:
      "SEVA Ruby Meal: weekly Friday hot meal distribution in Khadki-Pune serving homeless persons, elderly individuals, daily-wage workers, and underserved families.",
    themeColor: "black",
    featuredOnHome: false,
  },
  {
    id: "healthcare-outreach",
    name: "Healthcare and Medical Outreach",
    slug: "medical-outreach",
    subtitle: "Preventive health camps & medical assistance",
    focusAreaId: "healthcare",
    focusAreaName: "Healthcare",
    headline: "Preventive Care,",
    headlineEm: "Restoring Wellness.",
    description:
      "Comprehensive healthcare initiatives delivering preventive medical checkup camps, child health monitoring, nutritional intervention, and medical assistance in underserved regions.",
    introduction:
      "SEVA's Healthcare and Medical Outreach initiative brings essential preventive healthcare, early diagnosis, and nutritional guidance to underserved rural and semi-urban communities across Maharashtra. Through mobile medical checkup camps, child health monitoring, hygiene education workshops, and essential medicine support, the project addresses preventable health complications and bridges clinical access gaps.",
    objectives: [
      "Conduct community medical camps delivering free doctor consultations and general checkups.",
      "Perform periodic health and nutritional status screenings for infants and young children.",
      "Educate families on preventive hygiene, safe sanitation practices, and disease prevention.",
      "Supply essential prescribed medications free of cost to patients in financial hardship.",
      "Establish clinical referral pathways with hospitals for individuals requiring specialized medical care.",
    ],
    activities: [
      "Medical camps",
      "Preventive healthcare",
      "Child health monitoring",
      "Nutrition and hygiene awareness",
      "Medical assistance",
      "Community partnerships",
      "Hospital referrals",
    ],
    location: "Maharashtra & Regional Outreach Camps",
    reportedImpact:
      "Community health screenings, preventive hygiene guidance, and clinical referrals",
    reportedStats: [
      {
        metric: "Primary",
        value: "Preventive Care",
        label: "Clinical Focus",
        context:
          "Early screening, child growth monitoring, hygiene awareness, and specialized clinical referrals.",
      },
    ],
    reportingPeriod: "Organizational reported records",
    approvedImages: [],
    imagePlaceholder: {
      src: "/images/purpose-hands.jpg",
      alt: "Healthcare workers providing compassionate community care",
      caption:
        "Provisional documentary study · Joel Muniz (Unsplash) · Healthcare camps and medical outreach.",
      ratio: "landscape",
    },
    relatedProjectIds: [],
    participationInfo: {
      title: "Support Community Health Outreach",
      description:
        "Volunteer medical practitioners, nurses, optometrists, and pharmaceutical partners are invited to collaborate on upcoming preventive health camps.",
      pathway: "Medical Professional Collaboration & Supply Support",
      contactAction: "/contact",
    },
    detailRoute: "/programmes/healthcare/medical-outreach",
    verificationStatus: "reported_pending_audit",
    publicationStatus: "confirmed_official",
    metaDescription:
      "Healthcare and Medical Outreach by SEVA Social Service Society: preventive health camps, child health monitoring, nutrition and hygiene education, and clinical referrals.",
    themeColor: "blue",
    featuredOnHome: false,
  },
] as const;

export function getProjectById(id: string): ProjectRecord | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectByRoute(route: string): ProjectRecord | undefined {
  return projects.find((p) => p.detailRoute === route);
}

export function isProjectRoute(route: string): boolean {
  return projects.some((p) => p.detailRoute === route);
}

export function getRelatedProjects(
  project: ProjectRecord,
): readonly ProjectRecord[] {
  if (project.relatedProjectIds && project.relatedProjectIds.length > 0) {
    return projects.filter((p) => project.relatedProjectIds!.includes(p.id));
  }
  // Fallback to other projects in the same parent programme
  return projects.filter(
    (p) => p.id !== project.id && p.focusAreaId === project.focusAreaId,
  );
}
