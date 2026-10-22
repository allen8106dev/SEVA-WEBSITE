/**
 * Official organizational contact information for SEVA Social Service Society.
 *
 * Sourced directly from official organizational records.
 * Provides normalized contact channels and accessible link targets.
 */

export interface ContactChannel {
  type: "phone" | "email" | "address" | "reference_url";
  label: string;
  value: string;
  href?: string;
  description?: string;
}

export interface ContactInformation {
  organizationName: string;
  contactPerson: string;
  role: string;
  phone: {
    display: string;
    href: string;
  };
  email: {
    display: string;
    href: string;
  };
  address: {
    premises: string;
    street: string;
    locality: string;
    city: string;
    pinCode: string;
    state: string;
    country: string;
    fullFormatted: string;
  };
  sourceReferenceWebsite: {
    display: string;
    href: string;
    note: string;
  };
  officeHours: string;
}

export const contactInfo: ContactInformation = {
  organizationName: "SEVA Social Service Society",
  contactPerson: "Rev. Fr. Abraham Thanuvelil",
  role: "Director",
  phone: {
    display: "+91 8856031349",
    href: "tel:+918856031349",
  },
  email: {
    display: "sevassspune@gmail.com",
    href: "mailto:sevassspune@gmail.com",
  },
  address: {
    premises: "St. Mary's Malankara Catholic Cathedral",
    street: "51 Bhau Patil Road",
    locality: "Bopodi",
    city: "Pune",
    pinCode: "411020",
    state: "Maharashtra",
    country: "India",
    fullFormatted:
      "St. Mary's Malankara Catholic Cathedral, 51 Bhau Patil Road, Bopodi, Pune – 411020, Maharashtra, India.",
  },
  sourceReferenceWebsite: {
    display: "www.sevasocial.in",
    href: "http://www.sevasocial.in/",
    note: "Archival domain referenced in organizational documents; not authorization to replace preview domain.",
  },
  officeHours: "Monday to Friday, 9:30 AM – 5:30 PM IST",
} as const;
