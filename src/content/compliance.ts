/**
 * Compliance and legal documentation registry for SEVA Social Service Society.
 *
 * Source: Official organizational records.
 * Policy: Sensitive registration numbers, PAN identifiers, or certificates are NOT published
 * without verified management authorization. No automated direct download links are exposed.
 */

export interface ComplianceDocument {
  id: string;
  name: string;
  category:
    "registration" | "tax_exemption" | "foreign_contribution" | "audit" | "csr";
  reportedAvailability: boolean;
  status: "reported_available" | "verified_active" | "under_review";
  notes: string;
  publicDisplayAllowed: boolean;
}

export const complianceRegistry: readonly ComplianceDocument[] = [
  {
    id: "registration-cert",
    name: "Registration Certificate",
    category: "registration",
    reportedAvailability: true,
    status: "reported_available",
    notes:
      "Societies Registration Act document referenced in organizational files.",
    publicDisplayAllowed: false,
  },
  {
    id: "pan-card",
    name: "PAN Card",
    category: "registration",
    reportedAvailability: true,
    status: "reported_available",
    notes: "Official institutional Permanent Account Number.",
    publicDisplayAllowed: false,
  },
  {
    id: "80g-certificate",
    name: "80G Tax Exemption Certificate",
    category: "tax_exemption",
    reportedAvailability: true,
    status: "reported_available",
    notes: "Income Tax exemption status referenced in source material.",
    publicDisplayAllowed: false,
  },
  {
    id: "12ac-certificate",
    name: "12AC Certificate",
    category: "tax_exemption",
    reportedAvailability: true,
    status: "reported_available",
    notes: "Tax registration under Income Tax Act Section 12AC.",
    publicDisplayAllowed: false,
  },
  {
    id: "fcra-registration",
    name: "FCRA Registration",
    category: "foreign_contribution",
    reportedAvailability: true,
    status: "reported_available",
    notes: "Foreign Contribution (Regulation) Act documentation.",
    publicDisplayAllowed: false,
  },
  {
    id: "audited-statements",
    name: "Audited Financial Statements",
    category: "audit",
    reportedAvailability: true,
    status: "reported_available",
    notes:
      "Annual audited accounts maintained by certified chartered accountants.",
    publicDisplayAllowed: false,
  },
  {
    id: "csr-compliance",
    name: "CSR Compliance Documents",
    category: "csr",
    reportedAvailability: true,
    status: "reported_available",
    notes: "CSR-1 and ministry compliance documents referenced in records.",
    publicDisplayAllowed: false,
  },
] as const;
