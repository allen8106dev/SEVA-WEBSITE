/**
 * Official leadership directory for SEVA Social Service Society.
 *
 * Sourced directly from official organizational records.
 * Full biographical profiles and photo assets will be incorporated in Phase 5B.
 * Professional neutral placeholders are used until confirmed portrait photography is supplied.
 */

export interface LeadershipProfile {
  id: string;
  name: string;
  title: string;
  role: string;
  order: number;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
    focalPoint?: string;
  };
  imagePlaceholder?: {
    kind: "neutral-placeholder";
    label: string;
    caption: string;
  };
  publicationStatus: "confirmed_official" | "pending_photo";
}

export const leadershipProfiles: readonly LeadershipProfile[] = [
  {
    id: "mathews-mar-pachomios",
    name: "H E Dr. Mathews Mar Pachomios OIC",
    title: "Eparchial Bishop",
    role: "Eparchial Bishop",
    order: 1,
    imagePlaceholder: {
      kind: "neutral-placeholder",
      label: "H E Dr. Mathews Mar Pachomios OIC",
      caption:
        "Official portrait awaiting verified high-resolution management asset delivery.",
    },
    publicationStatus: "pending_photo",
  },
  {
    id: "shaji-mathews-vazhayil",
    name: "Rt Rev. Msgr. Dr. Shaji Mathews Vazhayil",
    title: "Vicar General",
    role: "Vicar General",
    order: 2,
    image: {
      src: "/images/leadership/msgr-shaji-mathews-vazhayil.webp",
      alt: "Official portrait of Rt Rev. Msgr. Dr. Shaji Mathews Vazhayil, Vicar General",
      width: 800,
      height: 1036,
      caption: "Rt Rev. Msgr. Dr. Shaji Mathews Vazhayil · Vicar General.",
      focalPoint: "50% 30%",
    },
    publicationStatus: "confirmed_official",
  },
  {
    id: "joshy-vazhappillethu",
    name: "Very Rev. Dr. Joshy Vazhappillethu",
    title: "Chancellor",
    role: "Chancellor",
    order: 3,
    image: {
      src: "/images/leadership/fr-joshy-vazhappillethu.webp",
      alt: "Official portrait of Very Rev. Dr. Joshy Vazhappillethu, Chancellor",
      width: 800,
      height: 991,
      caption: "Very Rev. Dr. Joshy Vazhappillethu · Chancellor.",
      focalPoint: "50% 30%",
    },
    publicationStatus: "confirmed_official",
  },
  {
    id: "abraham-thanuvelil",
    name: "Rev. Fr. Abraham Thanuvelil",
    title: "SEVA Director",
    role: "Director",
    order: 4,
    imagePlaceholder: {
      kind: "neutral-placeholder",
      label: "Rev. Fr. Abraham Thanuvelil",
      caption:
        "Official portrait awaiting verified high-resolution management asset delivery.",
    },
    publicationStatus: "pending_photo",
  },
] as const;
