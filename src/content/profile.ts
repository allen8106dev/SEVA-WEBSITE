import { organization } from "./organization";

export type ProfilePageId =
  "profile" | "about" | "vision-mission" | "leadership" | "history";

interface ProfileEditorial {
  eyebrow: string;
  heading: string;
  emphasis: string;
  description: string;
}

/** Editorial copy draws only on organization.ts, focus areas and the official roster. */
export const profileContent: Readonly<Record<ProfilePageId, ProfileEditorial>> =
  {
    profile: {
      eyebrow: "Our society / Our purpose",
      heading: "Love in action.",
      emphasis: "A shared purpose.",
      description: organization.introduction,
    },
    about: {
      eyebrow: "01 / About SEVA",
      heading: "Dignity at the",
      emphasis: "heart of service.",
      description:
        "Get to know SEVA Social Service Society: established in 2015, working alongside marginalized communities through education, healthcare, empowerment and sustainable development.",
    },
    "vision-mission": {
      eyebrow: "02 / Vision & Mission",
      heading: "A vision to believe in.",
      emphasis: "A mission to live.",
      description:
        "SEVA’s vision of Love, Equality, Equity and Peace, and its mission to restore dignity through awareness, education, empowerment, community organization and sustainable development.",
    },
    leadership: {
      eyebrow: "03 / Our leadership",
      heading: "Leadership",
      emphasis: "In service of dignity.",
      description:
        "Meet SEVA’s official leadership: the Eparchial Bishop, Vicar General, Chancellor and Director. Verified portraits are presented where available.",
    },
    history: {
      eyebrow: "04 / Our history",
      heading: "Rooted in purpose.",
      emphasis: `Since ${organization.establishedYear}.`,
      description:
        "SEVA Social Service Society was established in 2015. Explore its documented starting point, enduring purpose and current areas of community work.",
    },
  };

export function isProfilePageId(id: string): id is ProfilePageId {
  return Object.prototype.hasOwnProperty.call(profileContent, id);
}

export const profileMedia = {
  overview: "tuition-classroom-group",
  about: "ruby-meals-service",
  mission: "vidhya-jyothi-sisters",
} as const;

export const leadershipMonograms: Readonly<Record<string, string>> = {
  "mathews-mar-pachomios": "MP",
  "shaji-mathews-vazhayil": "SV",
  "joshy-vazhappillethu": "JV",
  "abraham-thanuvelil": "AT",
};

interface HistoryMilestone {
  id: string;
  year: number;
  title: string;
  description: string;
  source: string;
  status: "confirmed";
}

/** Append dated milestones only after organizational confirmation. */
export const historyMilestones: readonly HistoryMilestone[] = [
  {
    id: "establishment",
    year: organization.establishedYear,
    title: "The establishment of SEVA",
    description: `${organization.name} was established in ${organization.establishedYear}.`,
    source: "Official organizational records",
    status: "confirmed",
  },
];
