import { complianceRegistry } from "./compliance";

export type ResourceCategory =
  "annual-reports" | "financial-statements" | "compliance";
export interface ResourceRecord {
  id: string;
  title: string;
  category: ResourceCategory;
  reportingYear: string;
  description: string;
  reportType:
    | "annual_report"
    | "audited_statements"
    | "financial_summary"
    | "annual_accounts"
    | "compliance_document";
  complianceId?: string;
  filePath?: string;
  fileFormat?: "PDF";
  fileSizeBytes?: number;
  publicationDate?: string;
  verificationStatus: "pending_verification" | "verified";
  approvalStatus: "pending_approval" | "approved_for_publication" | "withheld";
  publicationStatus: "draft" | "published" | "withdrawn";
  publicVersionReview: "pending" | "approved";
}

// No approved public documents have been supplied. Never put private originals or
// their locations here: this registry describes intended public versions only.
export const resourceRegistry: readonly ResourceRecord[] = [];

export type PublishedResource = ResourceRecord & {
  filePath: string;
  fileFormat: "PDF";
  fileSizeBytes: number;
  publicationDate: string;
};

/** Defense in depth for rendering; public/ itself is never an access-control layer. */
export function isPublishedResource(
  record: ResourceRecord,
): record is PublishedResource {
  const compliance =
    record.category !== "compliance" ||
    complianceRegistry.some(
      (item) => item.id === record.complianceId && item.publicDisplayAllowed,
    );
  return (
    record.approvalStatus === "approved_for_publication" &&
    record.publicationStatus === "published" &&
    record.verificationStatus === "verified" &&
    record.publicVersionReview === "approved" &&
    compliance &&
    !!record.title.trim() &&
    !!record.reportingYear.trim() &&
    // Only reviewed, same-origin PDF derivatives; no query strings, traversal,
    // encoded paths, remote redirects, originals, or executable URL schemes.
    /^\/documents\/[a-z0-9][a-z0-9_-]*\.pdf$/.test(record.filePath ?? "") &&
    record.fileFormat === "PDF" &&
    Number.isSafeInteger(record.fileSizeBytes) &&
    (record.fileSizeBytes ?? 0) > 0 &&
    /^\d{4}-\d{2}-\d{2}$/.test(record.publicationDate ?? "") &&
    Number.isFinite(Date.parse(record.publicationDate ?? "")) &&
    new Date(record.publicationDate ?? "").toISOString().slice(0, 10) ===
      record.publicationDate
  );
}

export interface ResourceFilters {
  category?: ResourceCategory;
  year?: string;
  reportType?: ResourceRecord["reportType"];
  availability?: "available" | "unavailable";
}

export function getPublishedResources(
  filters: ResourceFilters = {},
  records: readonly ResourceRecord[] = resourceRegistry,
): PublishedResource[] {
  if (filters.availability === "unavailable") return [];
  return records
    .filter(isPublishedResource)
    .filter(
      (record) =>
        (!filters.category || record.category === filters.category) &&
        (!filters.year || record.reportingYear === filters.year) &&
        (!filters.reportType || record.reportType === filters.reportType),
    )
    .sort(
      (a, b) =>
        b.reportingYear.localeCompare(a.reportingYear) ||
        b.publicationDate.localeCompare(a.publicationDate),
    );
}

export const resourceCategories: readonly {
  id: ResourceCategory;
  number: string;
  title: string;
  description: string;
  intro: string;
  emptyTitle: string;
  emptyDescription: string;
}[] = [
  {
    id: "annual-reports",
    number: "01",
    title: "Annual Reports",
    description:
      "A year-wise record of service, programmes and organizational reporting.",
    intro:
      "An archive for SEVA’s approved annual publications, organized by reporting year.",
    emptyTitle: "A place for the year in review.",
    emptyDescription:
      "No annual reports are currently approved for public download. Published reports will appear here with their reporting year, summary, publication date and file details once approved public versions are supplied.",
  },
  {
    id: "financial-statements",
    number: "02",
    title: "Audited Financial Statements",
    description:
      "Financial reporting, with clear publication and document information.",
    intro:
      "A dedicated archive for approved financial reporting, organized by financial year and document type.",
    emptyTitle: "Financial reporting, clearly presented.",
    emptyDescription:
      "No financial statements are currently approved for public download. This archive will list audited statements, financial summaries or annual accounts only when approved records are available. No audit outcome or financial health assessment is asserted here.",
  },
  {
    id: "compliance",
    number: "03",
    title: "Compliance Documents",
    description:
      "Referenced documentation, its review status and public availability.",
    intro:
      "A clear distinction between documentation referenced in SEVA’s supplied material and documents approved for public access.",
    emptyTitle: "Referenced. Reviewed. Responsibly shared.",
    emptyDescription:
      "No compliance documents are currently approved for public download. References below do not establish current certificate validity, renewal status or eligibility.",
  },
];

export const resourcePageContent = {
  title: "Resources",
  headline: "Responsibility,",
  emphasis: "on the record.",
  introduction:
    "Explore SEVA’s reporting and referenced documentation. Clear availability information helps communities and partners understand what is public and what still awaits review.",
  transparencyTitle: "Service deserves a clear account.",
  transparencyIntro:
    "SEVA’s programmes and impact reporting are intended to support accountability and responsible partnerships. These figures come from the organization’s supplied material; they are not presented as independently audited results.",
  publicationNotice:
    "Only reviewed public versions with explicit publication approval will be linked here. Private identifiers and personal information must be removed or cleared before release.",
};

export const resourceTypeLabels: Record<ResourceRecord["reportType"], string> =
  {
    annual_report: "Annual report",
    audited_statements: "Audited financial statements",
    financial_summary: "Financial summary",
    annual_accounts: "Annual accounts",
    compliance_document: "Compliance document",
  };
