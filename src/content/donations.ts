/**
 * Donation structure and designated account architecture for SEVA Social Service Society.
 *
 * Source: Official organizational records.
 * Important: Bank account numbers, IFSC codes, UPI handles, and payment forms are
 * strictly withheld until formal management authorization and banking protocol review.
 */

export interface DesignatedDonationAccount {
  id: string;
  accountDesignation: string;
  purpose: string;
  focusInitiative: string;
  status: "awaiting_management_authorization" | "active";
}

export interface DonationsContent {
  title: string;
  subtitle: string;
  description: string;
  designatedAccounts: readonly DesignatedDonationAccount[];
  authorizationNotice: string;
}

export const donationsContent: DonationsContent = {
  title: "Support SEVA's Grassroots Work",
  subtitle: "Transparent Giving Pathways",
  description:
    "SEVA Social Service Society maintains dedicated accounts to ensure donor contributions directly reach designated community initiatives.",
  designatedAccounts: [
    {
      id: "seva-vidhya-jyothi",
      accountDesignation: "Seva Vidhya Jyothi",
      purpose:
        "Scholarships, school kits, and tuition centres for deserving children.",
      focusInitiative: "Vidya Jyoti Educational Support",
      status: "awaiting_management_authorization",
    },
    {
      id: "seva-social-service-society",
      accountDesignation: "Seva Social Service Society",
      purpose:
        "General community development, women's empowerment, healthcare, and emergency relief.",
      focusInitiative: "General Mission & Institutional Programs",
      status: "awaiting_management_authorization",
    },
    {
      id: "seva-ruby-meal",
      accountDesignation: "Seva Ruby Meal",
      purpose:
        "Nutritional supplies and weekly Friday meal distribution for vulnerable populations.",
      focusInitiative: "Weekly Community Feeding Initiative",
      status: "awaiting_management_authorization",
    },
  ],
  authorizationNotice:
    "Direct electronic contributions and payment channels are currently awaiting management authorization. Bank details and payment gateways will be activated following institutional compliance review.",
} as const;
