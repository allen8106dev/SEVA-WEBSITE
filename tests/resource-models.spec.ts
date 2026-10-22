import { test, expect } from "@playwright/test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "node:fs";
import path from "node:path";
import { ResourceDocuments } from "../src/components/sections/resource-pages";
import {
  getPublishedResources,
  isPublishedResource,
  type ResourceRecord,
} from "../src/content/resources";

// Isolated fixtures, never website records or official-looking assets.
const fixture: ResourceRecord = {
  id: "test-only",
  title: "Isolated test fixture",
  category: "annual-reports",
  reportingYear: "2025–26",
  description: "Not a SEVA publication",
  reportType: "annual_report",
  filePath: "/documents/test-only.pdf",
  fileFormat: "PDF",
  fileSizeBytes: 2048,
  publicationDate: "2026-01-01",
  verificationStatus: "verified",
  approvalStatus: "approved_for_publication",
  publicationStatus: "published",
  publicVersionReview: "approved",
};

test("publication gate fails closed for incomplete, withheld, unsafe and unreviewed records", () => {
  expect(getPublishedResources()).toEqual([]);
  expect(isPublishedResource(fixture)).toBe(true);
  const mutations: Partial<ResourceRecord>[] = [
    { approvalStatus: "pending_approval" },
    { approvalStatus: "withheld" },
    { publicationStatus: "draft" },
    { publicationStatus: "withdrawn" },
    { publicVersionReview: "pending" },
    { verificationStatus: "pending_verification" },
    { filePath: undefined },
    { fileFormat: undefined },
    { fileSizeBytes: 0 },
    { fileSizeBytes: Number.NaN },
    { fileSizeBytes: 1.5 },
    { publicationDate: undefined },
    { publicationDate: "2026-99-99" },
    { publicationDate: "2026-02-30" },
    { title: " " },
    { reportingYear: "" },
    { category: "compliance", complianceId: "pan-card" },
    { category: "compliance", complianceId: "unknown" },
    ...[
      "https://example.com/file.pdf",
      "//example.com/file.pdf",
      "javascript:alert(1)",
      "/documents/../private.pdf",
      "/documents/%2e%2e/file.pdf",
      "/incoming-assets/private.pdf",
      "/documents/test.pdf?private=1",
    ].map((filePath) => ({ filePath })),
  ];
  for (const change of mutations) {
    const record = { ...fixture, ...change };
    expect(isPublishedResource(record), JSON.stringify(change)).toBe(false);
    expect(
      renderToStaticMarkup(
        createElement(ResourceDocuments, { records: [record] }),
      ),
    ).not.toContain("href=");
  }
});

test("approved archives sort and filter by year/type with accessible file details", () => {
  const older = { ...fixture, id: "older", reportingYear: "2024–25" };
  const records = [older, fixture];
  expect(getPublishedResources({}, records).map((record) => record.id)).toEqual(
    [fixture.id, older.id],
  );
  expect(
    getPublishedResources(
      {
        year: older.reportingYear,
        reportType: "annual_report",
        category: "annual-reports",
        availability: "available",
      },
      records,
    ),
  ).toEqual([older]);
  expect(
    getPublishedResources({ availability: "unavailable" }, records),
  ).toEqual([]);
  expect(
    getPublishedResources({ category: "financial-statements" }, records),
  ).toEqual([]);
  const html = renderToStaticMarkup(
    createElement(ResourceDocuments, { records }),
  );
  expect(html).toContain('download=""');
  expect(html).toContain("PDF, 2 KB");
  expect(html).toContain('dateTime="2026-01-01"');
});

test("public document directory contains only registry-approved files", () => {
  const directory = path.join(process.cwd(), "public", "documents");
  const approved = getPublishedResources();
  const files = fs.existsSync(directory)
    ? fs.readdirSync(directory, { recursive: true }).map(String)
    : [];
  expect(files.sort()).toEqual(
    approved.map((record) => record.filePath.replace("/documents/", "")).sort(),
  );
  for (const record of approved)
    expect(
      fs.statSync(path.join(process.cwd(), "public", record.filePath)).size,
    ).toBe(record.fileSizeBytes);
});
