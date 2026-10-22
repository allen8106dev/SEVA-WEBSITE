import { organization } from "./organization";
import { focusAreas } from "./focus-areas";
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
  number?: string;
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
      numericValue?: number;
      prefix?: string;
      suffix?: string;
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
      numericValue: metric.numericValue,
      prefix: metric.prefix,
      suffix:
        metric.suffix && metric.displayFormat.endsWith(metric.suffix)
          ? metric.suffix
          : undefined,
      auditStatus: metric.verificationStatus,
    };
  });

export const homeContent = {
  hero: {
    headline: {
      opening: "Love in action.",
      emphasis: "Restoring dignity,",
      ending: "transforming lives.",
    },
  },
  purpose: {
    vision: organization.vision.statement,
    mission: organization.mission.statement,
    about: organization.introduction,
  },
  areas: {
    heading: "Areas of community work",
    items: [
      {
        id: focusAreas[0].id,
        number: "01",
        title: "Education",
        category: `Focus Area 01 / ${focusAreas[0].title}`,
        description: "Tuition centres, scholarships, and learning support.",
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
        number: "03",
        title: "Women Empowerment",
        category: `Focus Area 03 / ${focusAreas[2].title}`,
        description: "Self-help groups, tailoring, and livelihood skills.",
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
      {
        id: focusAreas[3].id,
        number: "04",
        title: "Community Welfare",
        category: `Focus Area 04 / ${focusAreas[3].title}`,
        description: "Weekly Ruby Meals and support for vulnerable people.",
        note: "Official SEVA focus area · Includes weekly Ruby Meal food distributions.",
        accent: "earth",
        media: {
          kind: "image",
          src: focusAreas[3].media.src,
          alt: focusAreas[3].media.alt,
          ratio: focusAreas[3].media.ratio,
          caption: focusAreas[3].media.caption,
          focalPoint: "50% 50%",
        },
      },
    ] satisfies ImpactAreaContent[],
  },
  overview: {
    eyebrow: "05 / Reported Impact & Transparency",
    heading: "Organization-reported reach across 3 states.",
    description:
      "SEVA Social Service Society tracks program reach across Maharashtra, Tamil Nadu, and Andhra Pradesh. These headline figures reflect active operational reporting from official records, pending final publication audit approval.",
    statistics: headlineStatistics,
    noticeTitle: "Reported data awaiting final external audit approval",
    notice:
      "Figures are sourced directly from SEVA organizational records (2025–26 cycle). Project counts and beneficiary numbers are not presented as mutually exclusive. Formal third-party audit reports will be published upon management authorization.",
  },
  participation: {
    eyebrow: "06 / Get Involved",
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
  },
  contact: contactInfo,
  partnerships: partnershipsContent,
};
