/**
 * Seven core focus areas of SEVA Social Service Society.
 *
 * Sourced directly from official organizational records.
 * Provides concise summaries for homepage highlights and comprehensive descriptions
 * for future dedicated initiative pages.
 */

export interface FocusArea {
  id: string;
  title: string;
  category: string;
  homepageSummary: string;
  detailedDescription: string;
  activities: readonly string[];
  featuredOnHome: boolean;
  accent: "green" | "earth" | "coral" | "blue";
  iconName: string;
  media: {
    src: string;
    alt: string;
    caption: string;
    ratio: "portrait" | "landscape" | "cinematic" | "square";
  };
}

export const focusAreas: readonly FocusArea[] = [
  {
    id: "education",
    title: "Education",
    category: "Foundational Learning & Mentoring",
    homepageSummary:
      "Nurturing potential through non-formal learning centres, structured tuition, scholarships, and bridge support for children entering mainstream schools.",
    detailedDescription:
      "SEVA's educational initiatives focus on breaking generational poverty through structured learning interventions. We support children from migrant and economically vulnerable backgrounds through non-formal education centres, bridge courses, academic mentoring, tuition fee assistance, and essential learning kits.",
    activities: [
      "Non-formal learning",
      "Tuition centres",
      "Scholarships",
      "School supplies",
      "Education kits",
      "Support for children entering mainstream education",
    ],
    featuredOnHome: true,
    accent: "green",
    iconName: "book-open",
    media: {
      src: "/images/programmes/education/vidhya-jyothi-distribution.webp",
      alt: "SEVA Vidya Jyothi school bag distribution for students",
      caption:
        "Authentic SEVA programme · Vidya Jyothi educational distribution · Maharashtra & Regional Centres.",
      ratio: "landscape",
    },
  },
  {
    id: "healthcare",
    title: "Healthcare",
    category: "Community Health & Preventive Care",
    homepageSummary:
      "Delivering preventive health camps, child nutrition monitoring, hygiene education, and critical medical assistance to underserved populations.",
    detailedDescription:
      "Ensuring access to basic medical care and health dignity. SEVA conducts mobile medical assistance camps, periodic health screening, child growth and nutrition monitoring, hygiene awareness campaigns, and hospital referrals for specialized medical interventions.",
    activities: [
      "Medical assistance",
      "Health camps",
      "Child monitoring",
      "Nutrition support",
      "Hygiene awareness",
      "Referrals where appropriate",
    ],
    featuredOnHome: false,
    accent: "blue",
    iconName: "activity",
    media: {
      src: "/images/purpose-hands.jpg",
      alt: "Healthcare outreach and compassionate medical support in action",
      caption:
        "Provisional documentary study · Joel Muniz (Unsplash) · Restoring health and community dignity.",
      ratio: "landscape",
    },
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    category: "Livelihood & Leadership",
    homepageSummary:
      "Building self-reliance through self-help groups, financial literacy, tailoring skills, leadership training, and sustainable livelihood avenues.",
    detailedDescription:
      "Empowering women as catalysts of social change. Through community-based self-help groups (SHGs), vocational tailoring training centres, micro-enterprise mentoring, financial literacy, and community governance workshops, SEVA fosters sustainable economic and social independence.",
    activities: [
      "Self-help groups",
      "Tailoring training",
      "Financial literacy",
      "Leadership development",
      "Sustainable livelihoods",
    ],
    featuredOnHome: true,
    accent: "coral",
    iconName: "shield",
    media: {
      src: "/images/impact-community.jpg",
      alt: "Women gathered in community collaboration and livelihood leadership",
      caption:
        "Provisional documentary study · Hannah Busing (Unsplash) · Collective strength and economic independence.",
      ratio: "square",
    },
  },
  {
    id: "community-welfare",
    title: "Community Welfare",
    category: "Compassionate Support & Social Safety",
    homepageSummary:
      "Providing weekly hot meals, elderly care, counselling, and unconditional solidarity for the most vulnerable members of society.",
    detailedDescription:
      "Standing beside vulnerable community members in times of urgent need. Through initiatives like the Friday Ruby Meal distribution, elder care, emergency food assistance, and community psycho-social counselling, SEVA provides an enduring social safety net.",
    activities: [
      "Weekly food distribution",
      "Elderly support",
      "Assistance to vulnerable communities",
      "Community counselling",
    ],
    featuredOnHome: false,
    accent: "earth",
    iconName: "heart",
    media: {
      src: "/images/programmes/community-welfare/ruby-meals-service.webp",
      alt: "SEVA Ruby Meal food distribution serving fresh hot meals to community members",
      caption:
        "Authentic SEVA programme · Weekly Friday Ruby Meal distribution in Khadki-Pune.",
      ratio: "portrait",
    },
  },
  {
    id: "rural-tribal-development",
    title: "Rural and Tribal Development",
    category: "Indigenous Welfare & Stewardship",
    homepageSummary:
      "Fostering sustainable livelihoods, natural resource stewardship, and community governance across rural and indigenous settlements.",
    detailedDescription:
      "Strengthening grassroots resilience across tribal hamlets and remote rural villages. SEVA partners with local leadership to build sustainable agricultural and non-timber forest product livelihoods, support traditional water and soil stewardship, and strengthen participatory local governance.",
    activities: [
      "Livelihood support",
      "Community governance",
      "Natural resource stewardship",
      "Sustainable community development",
    ],
    featuredOnHome: false,
    accent: "green",
    iconName: "sun",
    media: {
      src: "/images/programmes/rural-tribal/housing-project-paderu.webp",
      alt: "Tribal housing construction in Paderu, Andhra Pradesh",
      caption:
        "Authentic SEVA programme · Rural & Tribal Housing Project · Paderu, Andhra Pradesh.",
      ratio: "landscape",
    },
  },
  {
    id: "skill-development",
    title: "Skill Development",
    category: "Vocational Training & Employability",
    homepageSummary:
      "Equipping youth and adults with market-relevant vocational trades, entrepreneurial capacity, and income-generation skills.",
    detailedDescription:
      "Bridging the opportunity gap through hands-on technical skills and employability training. From established tailoring and sewing centres to modern vocational modules, SEVA enables individuals to gain dignified employment or launch micro-enterprises.",
    activities: [
      "Vocational training",
      "Income-generation skills",
      "Employment-related capacity building",
    ],
    featuredOnHome: false,
    accent: "blue",
    iconName: "tool",
    media: {
      src: "/images/impact-learning.jpg",
      alt: "Vocational training and hands-on skill development session",
      caption:
        "Provisional documentary study · CDC (Unsplash) · Hands-on skills building sustainable futures.",
      ratio: "landscape",
    },
  },
  {
    id: "relief-works",
    title: "Relief Works",
    category: "Crisis Response & Humanitarian Aid",
    homepageSummary:
      "Responding swiftly during natural disasters and emergencies with life-saving provisions, medical aid, and rehabilitation.",
    detailedDescription:
      "Rapid humanitarian response during floods, cyclones, droughts, and civil crises. SEVA coordinates emergency disaster relief, supply lines for food and hygiene kits, emergency medical aid camps, and long-term rehabilitation for affected families.",
    activities: [
      "Disaster relief",
      "Distribution of essential supplies",
      "Medical assistance",
      "Rehabilitation support",
    ],
    featuredOnHome: false,
    accent: "coral",
    iconName: "alert-circle",
    media: {
      src: "/images/purpose-hands.jpg",
      alt: "Hands coordinating relief supplies and compassionate aid",
      caption:
        "Provisional documentary study · Joel Muniz (Unsplash) · Rapid emergency humanitarian relief.",
      ratio: "landscape",
    },
  },
] as const;

/** Selected focus areas featured on the cinematic homepage */
export const homepageFeaturedFocusAreas = focusAreas.filter(
  (area) => area.featuredOnHome,
);
