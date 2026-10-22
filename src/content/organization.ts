/**
 * Central organizational identity and institutional profile for SEVA Social Service Society.
 *
 * Sourced directly from official organizational records.
 * All rights reserved. Registered not-for-profit society.
 */

export interface OrganizationIdentity {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  establishedYear: number;
  legalStatus: string;
  operationalStates: readonly string[];
  introduction: string;
  vision: {
    statement: string;
    coreValues: readonly string[];
  };
  mission: {
    statement: string;
    pillars: readonly string[];
  };
  branding: {
    logoOriginal: string;
    logoTransparent: string;
    emblem: string;
    alt: string;
    wordmark: string;
  };
}

export const organization: OrganizationIdentity = {
  name: "SEVA Social Service Society",
  legalName: "SEVA Social Service Society",
  shortName: "SEVA",
  tagline: "Love In Action",
  establishedYear: 2015,
  legalStatus: "Registered Not-for-Profit Society",
  operationalStates: ["Maharashtra", "Tamil Nadu", "Andhra Pradesh"],
  introduction:
    "SEVA Social Service Society works with communities across Maharashtra, Tamil Nadu, and Andhra Pradesh through CSR-aligned community development initiatives. Its programs focus on education, healthcare, women's empowerment, livelihoods, community welfare, and sustainable development.",
  vision: {
    statement:
      "To build a society founded on human and divine values: Love, Equality, Equity, and Peace.",
    coreValues: ["Love", "Equality", "Equity", "Peace"],
  },
  mission: {
    statement:
      "Restore the dignity of marginalized communities through awareness, education, empowerment, community organization, and sustainable development.",
    pillars: [
      "Awareness",
      "Education",
      "Empowerment",
      "Community Organization",
      "Sustainable Development",
    ],
  },
  branding: {
    logoOriginal: "/images/seva-logo.jpg",
    logoTransparent: "/images/seva-logo.png",
    emblem: "/images/seva-emblem.png",
    alt: "SEVA Social Service Society — Love In Action logo",
    wordmark: "SEVA",
  },
} as const;
