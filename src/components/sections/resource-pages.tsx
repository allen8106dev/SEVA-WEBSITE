import Link from "next/link";
import type { NavigationItem } from "@/config/navigation";
import { Breadcrumbs } from "@/components/layout/interior-page";
import { Container } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/animations/reveal";
import { complianceRegistry } from "@/content/compliance";
import { headlineMetrics } from "@/content/impact";
import {
  getPublishedResources,
  resourceCategories,
  resourcePageContent,
  resourceTypeLabels,
  type ResourceRecord,
} from "@/content/resources";

/** Revalidates every input; callers cannot accidentally render withheld URLs. */
export function ResourceDocuments({
  records,
}: {
  records: readonly ResourceRecord[];
}) {
  const published = getPublishedResources({}, records);
  const years = [...new Set(published.map((record) => record.reportingYear))];
  return (
    <div className="resource-documents">
      {years.map((year) => (
        <section key={year} aria-label={`Reporting year ${year}`}>
          <Heading as="h2" size="medium">
            {year}
          </Heading>
          <ul className="resource-document-list">
            {published
              .filter((record) => record.reportingYear === year)
              .map((record) => (
                <li key={record.id} className="resource-document">
                  <span className="resource-status">
                    Approved public document
                  </span>
                  <h3>{record.title}</h3>
                  <p>{record.description}</p>
                  <p>
                    {resourceTypeLabels[record.reportType]} · Published{" "}
                    <time dateTime={record.publicationDate}>
                      {record.publicationDate}
                    </time>
                  </p>
                  <a className="resource-link" href={record.filePath} download>
                    Download {record.title} ({record.fileFormat},{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 1,
                    }).format(record.fileSizeBytes / 1024)}{" "}
                    KB)
                    <span aria-hidden="true"> ↓</span>
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function ResourcePathways({ current }: { current?: string }) {
  return (
    <nav className="resource-pathways" aria-label="Resource categories">
      {resourceCategories
        .filter((category) => category.id !== current)
        .map((category) => {
          const count = getPublishedResources({ category: category.id }).length;
          return (
            <Reveal key={category.id} order={Number(category.number) - 1}>
              <Link
                className="resource-pathway"
                href={`/resources/${category.id}`}
              >
                <span className="resource-pathway__number" aria-hidden="true">
                  {category.number}
                </span>
                <span className="resource-pathway__body">
                  <span className="resource-status">
                    {count
                      ? `${count} approved public document${count === 1 ? "" : "s"}`
                      : "No public downloads yet"}
                  </span>
                  <span className="resource-pathway__title">
                    {category.title}
                  </span>
                  <span>{category.description}</span>
                </span>
                <span className="resource-pathway__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </Reveal>
          );
        })}
    </nav>
  );
}

function TransparencySection() {
  return (
    <section
      className="resource-transparency"
      aria-labelledby="transparency-title"
    >
      <Container width="wide">
        <Reveal variant="statement">
          <Eyebrow>Accountability &amp; responsible partnerships</Eyebrow>
          <Heading as="h2" size="large" id="transparency-title">
            {resourcePageContent.transparencyTitle}
          </Heading>
          <Text size="large">{resourcePageContent.transparencyIntro}</Text>
        </Reveal>
        <ul className="resource-metrics">
          {headlineMetrics.map((metric) => (
            <li key={metric.id}>
              <strong className="resource-metric-value">
                {metric.displayFormat}
              </strong>
              <h3>{metric.metricLabel}</h3>
              <p>{metric.note}</p>
              <dl>
                <dt>Reporting period</dt>
                <dd>{metric.reportingPeriod}</dd>
                <dt>Source</dt>
                <dd>{metric.source}</dd>
                <dt>Status</dt>
                <dd>
                  {metric.verificationStatus === "verified"
                    ? "Verified"
                    : "Organization reported · Audit pending"}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
        <Link className="resource-link" href="/programmes">
          Explore SEVA’s programmes <span aria-hidden="true">↗</span>
        </Link>
      </Container>
    </section>
  );
}

function ComplianceReferences() {
  return (
    <section
      className="resource-compliance"
      aria-labelledby="compliance-references-title"
    >
      <Eyebrow>Documentation referenced by SEVA</Eyebrow>
      <Heading as="h2" size="large" id="compliance-references-title">
        Reference is a starting point.
      </Heading>
      <Text>
        These categories are referenced in the organization’s supplied material.
        A reference is distinct from verification of current validity or
        permission to publish a document.
      </Text>
      <ul className="resource-reference-list">
        {complianceRegistry
          .filter((record) => record.reportedAvailability)
          .map((record, index) => {
            const documents = getPublishedResources({
              category: "compliance",
            }).filter((document) => document.complianceId === record.id);
            return (
              <li key={record.id}>
                <span className="resource-reference-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{record.name}</h3>
                  <dl>
                    <dt>Source status</dt>
                    <dd>Referenced documentation</dd>
                    <dt>Verification</dt>
                    <dd>
                      {record.status === "verified_active"
                        ? "Verified active in organizational records"
                        : "Pending verification of current validity"}
                    </dd>
                    <dt>Public access</dt>
                    <dd>
                      {documents.length
                        ? "Available approved documentation — listed in the archive"
                        : "Not yet publicly available"}
                    </dd>
                  </dl>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export function ResourcePage({ item }: { item: NavigationItem }) {
  const category = resourceCategories.find(
    (entry) => `/resources/${entry.id}` === item.href,
  );
  const records = category
    ? getPublishedResources({ category: category.id })
    : [];
  return (
    <div className="resource-page">
      <header
        className={`resource-hero${category ? " resource-hero--archive" : ""}`}
      >
        <Container width="wide">
          <Breadcrumbs item={item} />
          <div className="resource-hero__grid">
            <div>
              <Eyebrow>
                SEVA · Resources{" "}
                {category ? ` / ${category.number}` : " / Public information"}
              </Eyebrow>
              <Heading as="h1" size="display" className="resource-hero__title">
                {category ? (
                  category.title
                ) : (
                  <>
                    {resourcePageContent.headline}
                    <br />
                    <em>{resourcePageContent.emphasis}</em>
                  </>
                )}
              </Heading>
              <Text size="large" className="resource-hero__intro">
                {category?.intro ?? resourcePageContent.introduction}
              </Text>
            </div>
            <aside
              className="resource-hero__note"
              aria-label="Document availability"
            >
              <span className="resource-hero__mark" aria-hidden="true">
                ↗
              </span>
              <strong>Clarity builds trust.</strong>
              <p>
                {getPublishedResources().length
                  ? "Approved public documents are listed with their publication details."
                  : "No documents are currently approved for public download."}
              </p>
              <span>
                Publication approval and current validity are separate checks.
              </span>
            </aside>
          </div>
        </Container>
      </header>
      <section
        className="resource-body"
        aria-label={
          category ? `${category.title} archive` : "Explore resources"
        }
      >
        <Container width="wide">
          {category ? (
            <>
              {records.length ? (
                <ResourceDocuments records={records} />
              ) : (
                <div className="resource-empty">
                  <span className="resource-status">
                    Not yet publicly available
                  </span>
                  <Heading as="h2" size="large">
                    {category.emptyTitle}
                  </Heading>
                  <Text size="large">{category.emptyDescription}</Text>
                  <Link className="resource-link" href="/contact">
                    Contact the SEVA directorate{" "}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              )}
              {category.id === "compliance" && <ComplianceReferences />}
            </>
          ) : (
            <ResourcePathways />
          )}
          <aside
            className="resource-publication-note"
            aria-label="Publication approach"
          >
            <strong>Responsible publication</strong>
            <p>{resourcePageContent.publicationNotice}</p>
          </aside>
        </Container>
      </section>
      {!category && <TransparencySection />}
      {category && (
        <section className="resource-related" aria-label="More resources">
          <Container width="wide">
            <Eyebrow>Continue exploring</Eyebrow>
            <ResourcePathways current={category.id} />
            <Link className="resource-link" href="/resources">
              All resources <span aria-hidden="true">↗</span>
            </Link>
          </Container>
        </section>
      )}
    </div>
  );
}
