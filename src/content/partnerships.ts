/**
 * CSR Partnerships & Volunteering Framework for SEVA Social Service Society.
 *
 * Sourced directly from official organizational records.
 * Provides structured models for corporate collaboration and community engagement.
 * Does not make speculative compliance or tax exemption guarantees.
 * Registration forms and payment flows remain deferred until officially authorized.
 */

export interface CsrAlignmentArea {
  id: string;
  name: string;
  description: string;
}

export interface PartnershipPillar {
  title: string;
  description: string;
}

export interface VolunteeringCategory {
  id: string;
  title: string;
  focusArea: string;
  description: string;
  involvementType: "individual" | "corporate" | "both";
  status: "open_for_inquiries" | "preview";
}

export interface PartnershipsContent {
  headline: string;
  summary: string;
  csrAlignmentAreas: readonly CsrAlignmentArea[];
  pillars: readonly PartnershipPillar[];
  volunteeringOpportunities: readonly VolunteeringCategory[];
  disclaimer: string;
}

export const partnershipsContent: PartnershipsContent = {
  headline: "Partnering for Sustainable, Measurable Community Impact",
  summary:
    "SEVA Social Service Society works alongside corporate partners, institutions, and individuals through CSR-aligned initiatives that combine grassroots execution with accountability.",
  csrAlignmentAreas: [
    {
      id: "education",
      name: "Education & Tuition Centres",
      description:
        "Foundational literacy, bridging vulnerable children into schooling, and learning kit distribution.",
    },
    {
      id: "scholarships",
      name: "Scholarships & Academic Mentoring",
      description:
        "Vidya Jyoti academic sponsorship, uniforms, textbooks, and multi-year student mentoring.",
    },
    {
      id: "healthcare",
      name: "Healthcare & Preventive Camps",
      description:
        "Medical screening camps, essential medicine distribution, and specialized clinical referrals.",
    },
    {
      id: "nutrition",
      name: "Nutrition & Child Monitoring",
      description:
        "Targeted nutrition programs, child growth tracking, and health awareness in rural settlements.",
    },
    {
      id: "women-empowerment",
      name: "Women's Empowerment & Self-Help Groups",
      description:
        "Financial literacy, community leadership, and women-led community governance institutions.",
    },
    {
      id: "livelihood-development",
      name: "Livelihood Development & Vocational Training",
      description:
        "Tailoring training centres, technical trades, and micro-enterprise development for youth and women.",
    },
    {
      id: "rural-infrastructure",
      name: "Rural Infrastructure & Natural Resource Stewardship",
      description:
        "Water security, sustainable agriculture support, and rural community asset building.",
    },
    {
      id: "disaster-relief",
      name: "Disaster Relief & Rehabilitation",
      description:
        "Rapid humanitarian aid distribution, emergency healthcare, and resilient rehabilitation support.",
    },
  ],
  pillars: [
    {
      title: "Grassroots Implementation",
      description:
        "Direct community engagement through established field teams and local self-governing groups.",
    },
    {
      title: "Program Monitoring",
      description:
        "Regular monitoring of attendance, program milestones, and measurable community outcomes.",
    },
    {
      title: "Transparent Reporting",
      description:
        "Detailed periodic documentation and project status tracking for CSR governance teams.",
    },
    {
      title: "Employee Engagement",
      description:
        "Structured volunteer engagement days, mentoring sessions, and field outreach participation.",
    },
  ],
  volunteeringOpportunities: [
    {
      id: "vol-education",
      title: "Education & Tuition Centres",
      focusArea: "Education",
      description:
        "Assist in after-school tuition centres, teach foundational subjects, and mentor children.",
      involvementType: "both",
      status: "open_for_inquiries",
    },
    {
      id: "vol-health",
      title: "Health Camps & Medical Outreach",
      focusArea: "Healthcare",
      description:
        "Support medical camp logistics, registration, patient guidance, and health awareness.",
      involvementType: "both",
      status: "open_for_inquiries",
    },
    {
      id: "vol-tree-plantation",
      title: "Tree Plantation & Environmental Drives",
      focusArea: "Rural & Tribal Development",
      description:
        "Participate in ecological restoration, tree planting drives, and natural resource stewardship.",
      involvementType: "both",
      status: "preview",
    },
    {
      id: "vol-community",
      title: "Community Outreach & Elder Care",
      focusArea: "Community Welfare",
      description:
        "Engage with elderly residents, support community counselling, and aid vulnerable families.",
      involvementType: "individual",
      status: "preview",
    },
    {
      id: "vol-ruby-meal",
      title: "Weekly Ruby Meal Distribution",
      focusArea: "Community Welfare",
      description:
        "Assist in packing and serving nutritious Friday meals to daily-wage workers and homeless individuals.",
      involvementType: "both",
      status: "open_for_inquiries",
    },
    {
      id: "vol-relief",
      title: "Relief & Emergency Disaster Response",
      focusArea: "Relief Works",
      description:
        "Aid in packing and distributing emergency relief kits and provisions during humanitarian crises.",
      involvementType: "both",
      status: "preview",
    },
    {
      id: "vol-csr",
      title: "CSR Employee Engagement Programs",
      focusArea: "Cross-Disciplinary",
      description:
        "Customized corporate volunteering days, skill-sharing workshops, and interactive employee camps.",
      involvementType: "corporate",
      status: "open_for_inquiries",
    },
  ],
  disclaimer:
    "CSR collaborations are customized to partner objectives and regulatory norms. Figures and outcomes are documented per initiative.",
} as const;
