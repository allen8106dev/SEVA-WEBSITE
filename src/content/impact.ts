/**
 * Impact metrics and reported figures for SEVA Social Service Society.
 *
 * Source: Official organizational records supplied by SEVA management.
 * Note: These figures represent organization-reported operational data and await
 * final external audit publication approval. Project populations are not presented
 * as mutually exclusive, and numbers are never aggregated without explicit audit justification.
 */

export interface ImpactMetric {
  id: string;
  metricLabel: string;
  numericValue: number;
  displayFormat: string;
  prefix?: string;
  suffix?: string;
  unit?: string;
  source: string;
  reportingPeriod: string;
  verificationStatus: "reported_pending_audit" | "verified";
  note: string;
  isHeadline: boolean;
}

export const impactMetrics: readonly ImpactMetric[] = [
  {
    id: "annual-beneficiaries",
    metricLabel: "Annual beneficiaries",
    numericValue: 1000,
    displayFormat: "1,000+",
    suffix: "+",
    unit: "beneficiaries",
    source: "SEVA organizational material (pending final audit approval)",
    reportingPeriod: "Annual recurring operations",
    verificationStatus: "reported_pending_audit",
    note: "Organization-reported total across multi-state program initiatives.",
    isHeadline: true,
  },
  {
    id: "annual-programs",
    metricLabel: "Programs every year",
    numericValue: 15,
    displayFormat: "15+",
    suffix: "+",
    unit: "programs",
    source: "SEVA organizational material (pending final audit approval)",
    reportingPeriod: "Annual active programs",
    verificationStatus: "reported_pending_audit",
    note: "Covering education, healthcare, livelihoods, relief, and welfare.",
    isHeadline: true,
  },
  {
    id: "states-of-operation",
    metricLabel: "States of operation",
    numericValue: 3,
    displayFormat: "3",
    suffix: " states",
    unit: "states",
    source: "SEVA organizational material (pending final audit approval)",
    reportingPeriod: "Active operational reach",
    verificationStatus: "reported_pending_audit",
    note: "Maharashtra, Tamil Nadu, and Andhra Pradesh.",
    isHeadline: true,
  },
  {
    id: "vidya-jyoti-children",
    metricLabel: "Vidya Jyoti children assisted",
    numericValue: 700,
    displayFormat: "~700",
    prefix: "~",
    unit: "children",
    source: "Vidya Jyoti program report (2025–26)",
    reportingPeriod: "2025–26 programme",
    verificationStatus: "reported_pending_audit",
    note: "Educational sponsorship, kits, textbooks, and tuition assistance.",
    isHeadline: false,
  },
  {
    id: "tuition-students",
    metricLabel: "Tuition centre students",
    numericValue: 478,
    displayFormat: "478",
    unit: "students",
    source: "Vidya Jyoti program report (2025–26)",
    reportingPeriod: "2025–26 programme",
    verificationStatus: "reported_pending_audit",
    note: "Enrolled in structured daily and weekly academic tuition centres.",
    isHeadline: false,
  },
  {
    id: "cnewa-children",
    metricLabel: "CNEWA enrolled children",
    numericValue: 75,
    displayFormat: "75+",
    suffix: "+",
    unit: "children",
    source: "CNEWA Non-Formal Education project report",
    reportingPeriod: "Active school term",
    verificationStatus: "reported_pending_audit",
    note: "Children from migrant and economically vulnerable families.",
    isHeadline: false,
  },
  {
    id: "cnewa-attendance",
    metricLabel: "CNEWA daily attendance",
    numericValue: 65,
    displayFormat: "~65%",
    prefix: "~",
    suffix: "%",
    unit: "percent",
    source: "CNEWA Non-Formal Education project report",
    reportingPeriod: "Active school term",
    verificationStatus: "reported_pending_audit",
    note: "Consistent daily participation in foundational bridge courses.",
    isHeadline: false,
  },
  {
    id: "jeevan-women-trained",
    metricLabel: "Women trained in Jeevan project",
    numericValue: 100,
    displayFormat: "75–100",
    unit: "women",
    source: "Jeevan Project Raigad report",
    reportingPeriod: "Project cycle",
    verificationStatus: "reported_pending_audit",
    note: "Self-help group leadership, financial literacy, and livelihood skills.",
    isHeadline: false,
  },
] as const;

export const headlineMetrics = impactMetrics.filter((m) => m.isHeadline);
