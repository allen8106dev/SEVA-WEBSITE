/**
 * Centralized Typed Media Registry for SEVA Social Service Society.
 *
 * Sourced directly from official client archives:
 * - Pictures.zip (Programmes, collages, and field outreach photography)
 * - Founders.zip (Leadership portraits)
 * - Official branding assets
 *
 * Designed for future CMS integration and strict publication safeguards.
 */

export type MediaCategory =
  | "Education"
  | "Healthcare"
  | "Women Empowerment"
  | "Community Welfare"
  | "Rural Development"
  | "Relief Work"
  | "Leadership"
  | "Branding"
  | "Project Collages";

export type ProgrammeAssociation =
  | "Vidya Jyothi"
  | "CNEWA Non-Formal Education"
  | "SEVA Ruby Meal"
  | "Housing Project"
  | "Governance & Leadership"
  | "Institutional Identity"
  | "Jeevan Project"
  | "Sui Daga Tailoring"
  | "General Community Outreach";

export type PublicationApprovalStatus =
  | "approved_for_publication"
  | "pending_consent_verification"
  | "withheld_identity_discrepancy"
  | "requires_confirmation";

export type MediaAspectRatio =
  "portrait" | "landscape" | "cinematic" | "square";

export interface MediaAsset {
  id: string;
  sourceFilename: string;
  sourceArchive:
    | "Pictures.zip"
    | "Founders.zip"
    | "Official Branding"
    | "Provisional Baseline";
  publicUrl: string;
  thumbnailUrl?: string;
  description: string;
  altText: string;
  caption: string;
  width: number;
  height: number;
  aspectRatio: MediaAspectRatio;
  category: MediaCategory;
  programmeAssociation: ProgrammeAssociation;
  creditSource: string;
  approvalStatus: PublicationApprovalStatus;
  identityConfidence: "confirmed" | "unconfirmed" | "not_applicable";
  intendedPlacements: readonly string[];
  focalPoint?: string;
  notes?: string;
}

export const mediaRegistry: readonly MediaAsset[] = [
  // --- BRANDING ---
  {
    id: "seva-emblem",
    sourceFilename: "seva-emblem.png",
    sourceArchive: "Official Branding",
    publicUrl: "/images/branding/seva-emblem.png",
    description:
      "Official SEVA emblem depicting compassionate care, restorative support, and protective community values.",
    altText: "Official emblem of SEVA Social Service Society",
    caption: "SEVA Social Service Society Official Emblem.",
    width: 361,
    height: 361,
    aspectRatio: "square",
    category: "Branding",
    programmeAssociation: "Institutional Identity",
    creditSource: "SEVA Directorate Archive",
    approvalStatus: "approved_for_publication",
    identityConfidence: "confirmed",
    intendedPlacements: [
      "SiteHeader",
      "SiteFooter",
      "MobileNavigation",
      "Favicon",
      "Metadata",
    ],
  },
  {
    id: "seva-logo-lockup",
    sourceFilename: "seva-logo.png",
    sourceArchive: "Official Branding",
    publicUrl: "/images/branding/seva-logo.png",
    description: "Official SEVA logo emblem artwork on transparent background.",
    altText: "SEVA Social Service Society official emblem",
    caption: "SEVA Social Service Society Official Logo.",
    width: 627,
    height: 552,
    aspectRatio: "square",
    category: "Branding",
    programmeAssociation: "Institutional Identity",
    creditSource: "SEVA Directorate Archive",
    approvalStatus: "approved_for_publication",
    identityConfidence: "confirmed",
    intendedPlacements: ["SiteHeader", "SiteFooter", "MobileNavigation"],
  },

  // --- LEADERSHIP PORTRAITS ---
  {
    id: "portrait-msgr-shaji",
    sourceFilename: "28 Msgr Shaji.png",
    sourceArchive: "Founders.zip",
    publicUrl: "/images/leadership/msgr-shaji-mathews-vazhayil.webp",
    description:
      "Official studio portrait of Rt Rev. Msgr. Dr. Shaji Mathews Vazhayil, Vicar General, in clerical vestment.",
    altText:
      "Official portrait of Rt Rev. Msgr. Dr. Shaji Mathews Vazhayil, Vicar General",
    caption: "Rt Rev. Msgr. Dr. Shaji Mathews Vazhayil · Vicar General.",
    width: 800,
    height: 1036,
    aspectRatio: "portrait",
    category: "Leadership",
    programmeAssociation: "Governance & Leadership",
    creditSource: "SEVA Directorate Archive",
    approvalStatus: "approved_for_publication",
    identityConfidence: "confirmed",
    intendedPlacements: ["Leadership Directory", "About / Governance Page"],
    focalPoint: "50% 30%",
  },
  {
    id: "portrait-fr-joshy",
    sourceFilename: "41 Fr Joshy.png",
    sourceArchive: "Founders.zip",
    publicUrl: "/images/leadership/fr-joshy-vazhappillethu.webp",
    description:
      "Official studio portrait of Very Rev. Dr. Joshy Vazhappillethu, Chancellor, in white clerical cassock.",
    altText:
      "Official portrait of Very Rev. Dr. Joshy Vazhappillethu, Chancellor",
    caption: "Very Rev. Dr. Joshy Vazhappillethu · Chancellor.",
    width: 800,
    height: 991,
    aspectRatio: "portrait",
    category: "Leadership",
    programmeAssociation: "Governance & Leadership",
    creditSource: "SEVA Directorate Archive",
    approvalStatus: "approved_for_publication",
    identityConfidence: "confirmed",
    intendedPlacements: ["Leadership Directory", "About / Governance Page"],
    focalPoint: "50% 30%",
  },
  {
    id: "portrait-bishop-pachomios",
    sourceFilename: "ChatGPT Image Sep 8, 2026, 02_28_12 PM.png",
    sourceArchive: "Founders.zip",
    publicUrl: "/images/leadership/mathews-mar-pachomios.webp",
    description:
      "Official portrait of H E Dr. Mathews Mar Pachomios OIC, Eparchial Bishop.",
    altText:
      "Official portrait of H E Dr. Mathews Mar Pachomios OIC, Eparchial Bishop",
    caption: "H E Dr. Mathews Mar Pachomios OIC · Eparchial Bishop.",
    width: 800,
    height: 1000,
    aspectRatio: "portrait",
    category: "Leadership",
    programmeAssociation: "Governance & Leadership",
    creditSource: "SEVA Directorate Archive",
    approvalStatus: "approved_for_publication",
    identityConfidence: "confirmed",
    intendedPlacements: ["Leadership Directory", "About / Governance Page"],
    focalPoint: "50% 30%",
    notes:
      "Confirmed official portrait of Bishop Mathews Mar Pachomios OIC. Text banner cropped per client directive.",
  },
  {
    id: "portrait-fr-abraham",
    sourceFilename: "32 fr santhosh.jpg.jpeg",
    sourceArchive: "Founders.zip",
    publicUrl: "/images/leadership/fr-abraham-thanuvelil.webp",
    description:
      "Official portrait of Rev. Fr. Abraham Thanuvelil, SEVA Director.",
    altText: "Official portrait of Rev. Fr. Abraham Thanuvelil, SEVA Director",
    caption: "Rev. Fr. Abraham Thanuvelil · SEVA Director.",
    width: 800,
    height: 1000,
    aspectRatio: "portrait",
    category: "Leadership",
    programmeAssociation: "Governance & Leadership",
    creditSource: "SEVA Directorate Archive",
    approvalStatus: "approved_for_publication",
    identityConfidence: "confirmed",
    intendedPlacements: ["Leadership Directory", "About / Governance Page"],
    focalPoint: "50% 30%",
    notes:
      "Confirmed official portrait for SEVA Director Rev. Fr. Abraham Thanuvelil per client confirmation.",
  },

  // --- PROGRAMME PHOTOGRAPHY: EDUCATION ---
  {
    id: "vidhya-jyothi-distribution",
    sourceFilename: "WhatsApp Image 2026-09-11 at 12.11.24 PM.jpeg",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/programmes/education/vidhya-jyothi-distribution.webp",
    description:
      "Catholic priest and SEVA team presenting academic backpacks and study supplies to children standing in a community hall.",
    altText:
      "SEVA Vidya Jyothi school bag distribution to students in a community centre",
    caption:
      "Vidya Jyothi Programme · Academic kit distribution to deserving students.",
    width: 1400,
    height: 1050,
    aspectRatio: "landscape",
    category: "Education",
    programmeAssociation: "Vidya Jyothi",
    creditSource: "SEVA Social Service Society Programme Documentation",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: [
      "PurposeSection",
      "FocusAreasSection",
      "Projects: Vidya Jyothi",
      "Homepage Hero Carousel",
    ],
    focalPoint: "50% 50%",
  },
  {
    id: "vidhya-jyothi-sisters",
    sourceFilename: "WhatsApp Image 2026-09-11 at 10.33.12 AM (2).jpeg",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/programmes/education/vidhya-jyothi-sisters.webp",
    description:
      "Religious sisters and volunteer handing school backpacks to smiling children in an underserved neighbourhood.",
    altText:
      "Religious sisters and SEVA volunteers distributing school bags to children",
    caption:
      "Love In Action · Educational support reaching children in rural communities.",
    width: 1280,
    height: 575,
    aspectRatio: "cinematic",
    category: "Education",
    programmeAssociation: "Vidya Jyothi",
    creditSource: "SEVA Social Service Society Programme Documentation",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: [
      "PurposeSection",
      "ClosingSection",
      "Education Initiatives",
      "Homepage Hero Carousel",
    ],
    focalPoint: "55% 45%",
  },
  {
    id: "tuition-vidyarambham-initiation",
    sourceFilename: "WhatsApp Image 2026-09-11 at 12.09.46 PM.jpeg (frame 2)",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/programmes/education/vidyarambham-initiation.webp",
    description:
      "Vidyarambham ceremony: Priest guiding a young child's finger to write initial letters in rice as mother holds the plate.",
    altText:
      "Vidyarambham foundational learning ceremony at a SEVA education centre",
    caption:
      "CNEWA Non-Formal Education · Guiding a young child's first steps into formal learning.",
    width: 899,
    height: 533,
    aspectRatio: "landscape",
    category: "Education",
    programmeAssociation: "CNEWA Non-Formal Education",
    creditSource: "SEVA Social Service Society Programme Documentation",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: [
      "FocusAreas: Education",
      "Projects: CNEWA Non-Formal Education",
    ],
    focalPoint: "45% 40%",
  },
  {
    id: "tuition-learning-session",
    sourceFilename: "WhatsApp Image 2026-09-11 at 12.09.46 PM.jpeg (frame 3)",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/programmes/education/tuition-learning-session.webp",
    description:
      "Children seated on mats with alphabet charts on corrugated walls during an educational assembly and blessing.",
    altText: "Students seated for study in a non-formal education classroom",
    caption:
      "SEVA Tuition Centre · Daily academic mentoring and foundational literacy classes.",
    width: 899,
    height: 533,
    aspectRatio: "landscape",
    category: "Education",
    programmeAssociation: "CNEWA Non-Formal Education",
    creditSource: "SEVA Social Service Society Programme Documentation",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: [
      "Projects: CNEWA Non-Formal Education",
      "Education Gallery",
    ],
    focalPoint: "50% 50%",
  },
  {
    id: "tuition-classroom-group",
    sourceFilename: "WhatsApp Image 2026-09-11 at 12.09.46 PM.jpeg (frame 1)",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/programmes/education/tuition-classroom-group.webp",
    description:
      "Group photo of students, educator, priest, and community volunteers in the non-formal education classroom.",
    altText:
      "Group of children and teachers celebrating education day at SEVA tuition centre",
    caption:
      "SEVA Non-Formal Education Centre · Students and teachers celebrating learning milestones.",
    width: 899,
    height: 533,
    aspectRatio: "landscape",
    category: "Education",
    programmeAssociation: "CNEWA Non-Formal Education",
    creditSource: "SEVA Social Service Society Programme Documentation",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: ["Education Gallery", "Annual Reporting"],
    focalPoint: "50% 50%",
  },

  // --- PROGRAMME PHOTOGRAPHY: COMMUNITY WELFARE / RUBY MEALS ---
  {
    id: "ruby-meals-service",
    sourceFilename: "WhatsApp Image 2026-09-11 at 12.20.06 PM.jpeg",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/programmes/community-welfare/ruby-meals-service.webp",
    description:
      "SEVA volunteer serving freshly cooked rice and meals into pots and bowls brought by community members in need.",
    altText:
      "SEVA volunteer serving warm meals to community members during the weekly food distribution",
    caption:
      "SEVA Ruby Meal · Weekly Friday food distribution serving vulnerable families in Khadki-Pune.",
    width: 960,
    height: 1280,
    aspectRatio: "portrait",
    category: "Community Welfare",
    programmeAssociation: "SEVA Ruby Meal",
    creditSource: "SEVA Social Service Society Programme Documentation",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: [
      "Homepage Hero Carousel",
      "ParticipationSection",
      "Projects: SEVA Ruby Meal",
    ],
    focalPoint: "50% 38%",
  },
  {
    id: "ruby-meals-outreach",
    sourceFilename: "WhatsApp Image 2026-09-11 at 10.35.21 AM.jpeg",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/programmes/community-welfare/ruby-meals-outreach.webp",
    description:
      "SEVA volunteer dishing hot meals from a large cooking pot to families living in temporary settlements under a Pune flyover.",
    altText: "Community food relief outreach under a flyover in Pune",
    caption:
      "SEVA Ruby Meal Outreach · Delivering hot nutrition to families residing in informal settlements.",
    width: 350,
    height: 466,
    aspectRatio: "portrait",
    category: "Community Welfare",
    programmeAssociation: "SEVA Ruby Meal",
    creditSource: "SEVA Social Service Society Programme Documentation",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: [
      "Projects: SEVA Ruby Meal",
      "Community Relief Documentation",
    ],
    focalPoint: "50% 50%",
  },

  // --- PROGRAMME PHOTOGRAPHY: RURAL AND TRIBAL DEVELOPMENT ---
  {
    id: "housing-project-paderu",
    sourceFilename: "WhatsApp Image 2026-09-11 at 10.32.55 AM (1).jpeg",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/programmes/rural-tribal/housing-project-paderu.webp",
    description:
      "Tribal housing structure under construction amidst lush agricultural fields and hills in Paderu, Andhra Pradesh.",
    altText:
      "New brick house under construction in the tribal agency area of Paderu, Andhra Pradesh",
    caption:
      "SEVA Tribal Housing Initiative · Durable housing construction in Paderu, Andhra Pradesh.",
    width: 1280,
    height: 924,
    aspectRatio: "landscape",
    category: "Rural Development",
    programmeAssociation: "Housing Project",
    creditSource: "SEVA Social Service Society Programme Documentation",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: [
      "FocusAreas: Rural & Tribal Development",
      "Regional Initiatives",
      "Homepage Hero Carousel",
    ],
    focalPoint: "50% 50%",
  },

  // --- OFFICIAL PROJECT COLLAGES ---
  {
    id: "collage-housing-project",
    sourceFilename: "1.png",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/collages/seva-housing-project-collage.webp",
    description:
      "Official SEVA Housing Project photo collage poster covering Paderu, Suryapet, and Khammam (Andhra Pradesh & Telangana).",
    altText:
      "SEVA Social Service Society Housing Project collage showing home construction across Andhra Pradesh and Telangana",
    caption:
      "SEVA Housing Project Documentation · Paderu, Suryapet, and Khammam tribal and rural development.",
    width: 2000,
    height: 1600,
    aspectRatio: "landscape",
    category: "Project Collages",
    programmeAssociation: "Housing Project",
    creditSource: "SEVA Social Service Society Official Report",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: [
      "Homepage Stories",
      "ImpactOverviewSection",
      "Rural Development Page",
      "Documentation Gallery",
    ],
  },
  {
    id: "collage-vidhya-jyothi",
    sourceFilename: "2.png",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/collages/seva-vidhya-jyothi-collage.webp",
    description:
      "Official SEVA Vidhya Jyothi photo collage poster covering educational interventions across Maharashtra, Tamil Nadu, Andhra Pradesh & Telangana.",
    altText:
      "SEVA Vidhya Jyothi collage showing school kit distributions, tuition centres, and students across four states",
    caption:
      "SEVA Vidhya Jyothi Documentation · Supporting children across Maharashtra, Tamil Nadu, Andhra Pradesh, and Telangana.",
    width: 2000,
    height: 1600,
    aspectRatio: "landscape",
    category: "Project Collages",
    programmeAssociation: "Vidya Jyothi",
    creditSource: "SEVA Social Service Society Official Report",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: [
      "Homepage Stories",
      "ImpactOverviewSection",
      "Education Page",
      "Documentation Gallery",
    ],
  },
  {
    id: "collage-ruby-meals",
    sourceFilename: "3.png",
    sourceArchive: "Pictures.zip",
    publicUrl: "/images/collages/seva-ruby-meals-collage.webp",
    description:
      "Official SEVA Ruby Meals photo collage poster from the Eparchy of St. Ephrem Khadki-Pune food distribution program.",
    altText:
      "SEVA Ruby Meals collage showing food preparation, street distribution, and community feeding in Pune",
    caption:
      "SEVA Ruby Meals Food Distribution Documentation · Serving daily nourishment to homeless and vulnerable individuals.",
    width: 2000,
    height: 1600,
    aspectRatio: "landscape",
    category: "Project Collages",
    programmeAssociation: "SEVA Ruby Meal",
    creditSource: "SEVA Social Service Society Official Report",
    approvalStatus: "approved_for_publication",
    identityConfidence: "not_applicable",
    intendedPlacements: [
      "Homepage Stories",
      "ImpactOverviewSection",
      "Community Welfare Page",
      "Documentation Gallery",
    ],
  },
] as const;

/**
 * Helper to retrieve a registered media asset by ID with strict typing.
 */
export function getMediaAsset(id: string): MediaAsset | undefined {
  return mediaRegistry.find((asset) => asset.id === id);
}

/**
 * Helper to retrieve approved media assets for a given category.
 */
export function getApprovedMediaByCategory(
  category: MediaCategory,
): readonly MediaAsset[] {
  return mediaRegistry.filter(
    (asset) =>
      asset.category === category &&
      asset.approvalStatus === "approved_for_publication",
  );
}

/**
 * Helper to retrieve approved media assets for a specific programme.
 */
export function getApprovedMediaByProgramme(
  programme: ProgrammeAssociation,
): readonly MediaAsset[] {
  return mediaRegistry.filter(
    (asset) =>
      asset.programmeAssociation === programme &&
      asset.approvalStatus === "approved_for_publication",
  );
}
