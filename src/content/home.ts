import { organization } from "./organization";
import { focusAreas } from "./focus-areas";
import { projects } from "./projects";
import { impactMetrics } from "./impact";
import { partnershipsContent } from "./partnerships";
import { contactInfo } from "./contact";

export type HomeMedia = {
  caption: string;
  ratio: "portrait" | "landscape" | "cinematic" | "square";
} & (
  | {
      kind: "illustration";
      artwork: "seed" | "learning" | "gathering" | "story";
    }
  | { kind: "image"; src: string; alt: string; focalPoint?: string }
  | {
      kind: "video";
      src: string;
      poster: string;
      alt: string;
      captionsSrc: string;
    }
);

export type ImpactAreaContent = {
  id: string;
  title: string;
  description: string;
  category?: string;
  note: string;
  media: HomeMedia;
  link?: { href: string; label: string };
  accent?: "green" | "earth";
};

export type StatisticContent =
  | { label: string; status: "pending" }
  | {
      label: string;
      status: "reported";
      value: string;
      source: string;
      reportingPeriod: string;
      note: string;
      auditStatus: "reported_pending_audit";
    }
  | {
      label: string;
      status: "verified";
      value: string | number;
      source: string;
      reportingPeriod: string;
      note: string;
      prefix?: string;
      suffix?: string;
      maximumFractionDigits?: number;
    };

const featuredProject =
  projects.find((p) => p.id === "jeevan-project") ?? projects[0];

const headlineStatistics: StatisticContent[] = impactMetrics
  .filter((metric) => metric.isHeadline)
  .map((metric) => {
    const shared = {
      label: metric.metricLabel,
      source: metric.source,
      reportingPeriod: metric.reportingPeriod,
      note: metric.note,
    };
    if (metric.verificationStatus === "verified") {
      return {
        ...shared,
        status: "verified",
        value: metric.numericValue,
        prefix: metric.prefix,
        suffix: metric.suffix,
      };
    }
    return {
      ...shared,
      status: "reported",
      value: metric.displayFormat,
      auditStatus: metric.verificationStatus,
    };
  });

export const homeContent = {
  hero: {
    eyebrow: `${organization.name.toUpperCase()} · ${organization.tagline.toUpperCase()}`,
    headline: {
      opening: "Love in action.",
      emphasis: "Restoring dignity,",
      ending: "transforming lives.",
    },
    description: organization.introduction,
    primary: { href: "#purpose", label: "Explore the beginning" },
    secondary: { href: "#participation", label: "Ways to take part" },
    notice: `Official identity · Established ${organization.establishedYear} · ${organization.legalStatus}`,
  },
  purpose: {
    eyebrow: "01 / Vision & Mission",
    heading: organization.vision.statement,
    description: organization.mission.statement,
    note: `Official institutional commitment of ${organization.name}. Serving communities across ${organization.operationalStates.join(", ")}.`,
    media: {
      kind: "image",
      src: "/images/programmes/education/vidhya-jyothi-sisters.webp",
      alt: "Religious sisters and SEVA volunteers distributing school bags to children in community outreach",
      ratio: "landscape",
      caption:
        "Authentic SEVA outreach · Vidya Jyothi educational distribution · Maharashtra & Regional Centres.",
      focalPoint: "50% 50%",
    } satisfies HomeMedia,
  },
  areas: {
    eyebrow: "02 / Core Focus Areas",
    heading: "Seven areas of community work.",
    description:
      "SEVA Social Service Society leads seven comprehensive development programs. Below are featured initiatives, with all seven areas detailed across our mission documentation.",
    items: [
      {
        id: focusAreas[0].id,
        title: "Foundational education and academic mentoring.",
        category: `Focus Area 01 / ${focusAreas[0].title}`,
        description: focusAreas[0].homepageSummary,
        note: "Official SEVA focus area · Encompasses Vidya Jyoti and CNEWA non-formal education programs.",
        accent: "green",
        media: {
          kind: "image",
          src: focusAreas[0].media.src,
          alt: focusAreas[0].media.alt,
          ratio: focusAreas[0].media.ratio,
          caption: focusAreas[0].media.caption,
          focalPoint: "50% 40%",
        },
      },
      {
        id: focusAreas[2].id,
        title: "Sustainable livelihoods and women's leadership.",
        category: `Focus Area 03 / ${focusAreas[2].title}`,
        description: focusAreas[2].homepageSummary,
        note: "Official SEVA focus area · Encompasses the Jeevan Project (Raigad) and Sui Daga tailoring centres.",
        accent: "earth",
        media: {
          kind: "image",
          src: focusAreas[2].media.src,
          alt: focusAreas[2].media.alt,
          ratio: focusAreas[2].media.ratio,
          caption: focusAreas[2].media.caption,
          focalPoint: "50% 50%",
        },
      },
    ] satisfies ImpactAreaContent[],
  },
  story: {
    eyebrow: "03 / Grassroots Initiatives",
    heading: `${featuredProject.name}: ${featuredProject.subtitle}.`,
    description: `${featuredProject.description} In Raigad District, self-help groups and leadership training empower women to lead community governance and build durable livelihoods. Reported reach: ${featuredProject.reportedImpact}.`,
    note: `Project profile: ${featuredProject.name} (${featuredProject.location}) · Reported figures pending final audit approval. Authentic beneficiary case studies will be published with formal consent.`,
    media: {
      kind: "image",
      src: featuredProject.imagePlaceholder.src,
      alt: featuredProject.imagePlaceholder.alt,
      ratio: featuredProject.imagePlaceholder.ratio,
      caption: featuredProject.imagePlaceholder.caption,
      focalPoint: "50% 30%",
    } satisfies HomeMedia,
    link: undefined as { href: string; label: string } | undefined,
  },
  overview: {
    eyebrow: "04 / Reported Impact & Transparency",
    heading: "Organization-reported reach across 3 states.",
    description:
      "SEVA Social Service Society tracks program reach across Maharashtra, Tamil Nadu, and Andhra Pradesh. These headline figures reflect active operational reporting from official records, pending final publication audit approval.",
    statistics: headlineStatistics,
    noticeTitle: "Reported data awaiting final external audit approval",
    notice:
      "Figures are sourced directly from SEVA organizational records (2025–26 cycle). Project counts and beneficiary numbers are not presented as mutually exclusive. Formal third-party audit reports will be published upon management authorization.",
  },
  participation: {
    eyebrow: "05 / Get Involved",
    heading: "Stand with SEVA: Action, partnership, and solidarity.",
    description:
      "Whether through corporate CSR partnerships, structured community volunteering, or designated project support, your engagement directly uplifts marginalized communities.",
    options: [
      {
        title: "CSR Partnerships",
        description:
          "Grassroots implementation, transparent monitoring, and CSR-aligned reporting across education, healthcare, and livelihoods.",
        status: "CSR Aligned",
      },
      {
        title: "Community Volunteering",
        description:
          "Join Friday Ruby Meal distributions, tuition centre mentoring, health camps, and environmental tree drives.",
        status: "Open for Inquiry",
      },
      {
        title: "Designated Giving",
        description:
          "Support Seva Vidhya Jyothi scholarships, Seva Ruby Meal feeding, or general community relief initiatives.",
        status: "Awaiting Auth",
      },
      {
        title: "Directorate Dialogue",
        description:
          "Direct institutional collaboration with SEVA leadership for strategic community development programs.",
        status: "Active Dialogue",
      },
    ],
    action: { href: "#contact", label: "View the contact status" },
  },
  closing: {
    eyebrow: "Restore dignity. Empower communities.",
    heading: "Join us in turning love into enduring action.",
    description: `Since ${organization.establishedYear}, ${organization.name} has walked alongside underserved families across Maharashtra, Tamil Nadu, and Andhra Pradesh. Together, we build a future founded on love, equality, equity, and peace.`,
    action: { href: "#introduction", label: "Return to the beginning" },
    media: {
      kind: "image",
      src: "/images/programmes/education/vidhya-jyothi-distribution.webp",
      alt: "SEVA workers presenting educational kits to students gathered in unity",
      ratio: "landscape",
      caption:
        "Authentic SEVA programme · Vidya Jyothi educational support reaching children across four states.",
      focalPoint: "50% 40%",
    } satisfies HomeMedia,
  },
  contact: contactInfo,
  partnerships: partnershipsContent,
};
