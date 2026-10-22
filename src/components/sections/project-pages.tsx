import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { MediaFrame } from "@/components/ui/media-frame";
import { Breadcrumbs } from "@/components/layout/interior-page";
import { Reveal } from "@/components/animations/reveal";
import { ImageMaskReveal } from "@/components/animations/image-mask-reveal";
import type { NavigationItem } from "@/config/navigation";
import { getRelatedProjects, type ProjectRecord } from "@/content/projects";
import { getMediaAsset } from "@/content/media";

/* ─────────────────────────────────────────────────────────────────────────────
   Shared Sub-components
───────────────────────────────────────────────────────────────────────────── */

function ProjectHeroHeader({
  item,
  project,
  badgeText,
  children,
}: {
  item: NavigationItem;
  project: ProjectRecord;
  badgeText?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={`proj-hero proj-hero--${project.slug}`}
      aria-labelledby="project-title"
    >
      <Container width="wide">
        <Breadcrumbs item={item} />
        <div className="proj-hero__grid">
          <div className="proj-hero__content">
            <span className="proj-badge">
              {badgeText ??
                `${project.focusAreaName.toUpperCase()} · PROJECT INITIATIVE`}
            </span>
            <Eyebrow>{project.subtitle}</Eyebrow>
            <Heading
              as="h1"
              size="display"
              id="project-title"
              className="proj-title"
            >
              {project.headline}{" "}
              {project.headlineEm && <em>{project.headlineEm}</em>}
            </Heading>
            <Text size="large" className="proj-intro">
              {project.description}
            </Text>
            {project.location && (
              <p className="proj-location-tag">
                <span className="proj-location-tag__icon" aria-hidden="true">
                  📍
                </span>
                <span>Location: {project.location}</span>
              </p>
            )}
          </div>
          {children && <div className="proj-hero__media">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

function ProjectStatCard({
  metric,
  label,
  context,
  reportingPeriod,
}: {
  metric: string;
  label: string;
  context?: string;
  reportingPeriod?: string;
}) {
  return (
    <div className="proj-stat-card">
      <div className="proj-stat-card__metric">{metric}</div>
      <div className="proj-stat-card__label">{label}</div>
      {context && <p className="proj-stat-card__context">{context}</p>}
      <div className="proj-stat-card__audit">
        <span className="proj-stat-card__dot" aria-hidden="true" />
        <span>
          Organization reported · Audit pending
          {reportingPeriod ? ` (${reportingPeriod})` : ""}
        </span>
      </div>
    </div>
  );
}

function ProjectStatsStrip({ project }: { project: ProjectRecord }) {
  if (!project.reportedStats || project.reportedStats.length === 0) return null;
  return (
    <section
      className="proj-stats-strip"
      aria-label="Documented project reach and metrics"
    >
      <Container width="wide">
        <div className="proj-stats-strip__grid">
          {project.reportedStats.map((stat) => (
            <ProjectStatCard
              key={stat.label}
              metric={stat.metric}
              label={stat.label}
              context={stat.context}
              reportingPeriod={project.reportingPeriod}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ObjectivesList({ objectives }: { objectives: readonly string[] }) {
  return (
    <section className="proj-objectives" aria-labelledby="proj-obj-heading">
      <Container width="narrow">
        <Reveal variant="statement">
          <Eyebrow>Strategic Objectives</Eyebrow>
          <Heading as="h2" size="large" id="proj-obj-heading">
            Purpose & Measurable Goals
          </Heading>
          <p className="proj-objectives__intro">
            Grounded in SEVA’s verified institutional mission, these core
            objectives guide ongoing project implementation:
          </p>
        </Reveal>
        <ul className="proj-objectives__list">
          {objectives.map((objective, index) => (
            <li key={objective} className="proj-objective-item">
              <span className="proj-objective-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="proj-objective-text">{objective}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ActivitiesPillList({ activities }: { activities: readonly string[] }) {
  return (
    <section className="proj-activities" aria-labelledby="proj-act-heading">
      <Container width="narrow">
        <Reveal variant="statement">
          <Eyebrow>Documented Operations</Eyebrow>
          <Heading as="h2" size="large" id="proj-act-heading">
            Key Operational Activities
          </Heading>
        </Reveal>
        <ul
          className="proj-activities__grid"
          aria-label="Documented project activities"
        >
          {activities.map((activity, idx) => (
            <li key={activity} className="proj-activity-card">
              <span className="proj-activity-card__num" aria-hidden="true">
                0{idx + 1}
              </span>
              <span className="proj-activity-card__title">{activity}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ParticipationPathway({ project }: { project: ProjectRecord }) {
  return (
    <section className="proj-participation" aria-labelledby="proj-part-heading">
      <Container width="narrow">
        <div className="proj-participation__card">
          <Eyebrow>Participation & Support</Eyebrow>
          <Heading as="h2" size="medium" id="proj-part-heading">
            {project.participationInfo.title}
          </Heading>
          <Text className="proj-participation__desc">
            {project.participationInfo.description}
          </Text>
          <div className="proj-participation__actions">
            <Link
              href={project.participationInfo.contactAction}
              className="proj-btn proj-btn--primary"
            >
              <span>{project.participationInfo.pathway}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={`/programmes/${project.focusAreaId}`}
              className="proj-btn proj-btn--secondary"
            >
              <span>Back to {project.focusAreaName}</span>
            </Link>
          </div>
          <p className="proj-participation__safeguard">
            Official inquiries are handled strictly through the central SEVA
            Directorate. No financial transactions are processed on this site.
          </p>
        </div>
      </Container>
    </section>
  );
}

function RelatedProjectNavigation({ project }: { project: ProjectRecord }) {
  const related = getRelatedProjects(project);
  return (
    <section className="proj-navigation" aria-labelledby="proj-nav-heading">
      <Container width="wide">
        <div className="proj-navigation__header">
          <Eyebrow>Explore Further</Eyebrow>
          <Heading as="h2" size="medium" id="proj-nav-heading">
            Related Initiatives in {project.focusAreaName}
          </Heading>
        </div>
        <div className="proj-navigation__grid">
          {related.map((rel) => (
            <article key={rel.id} className="proj-navigation__card">
              <span className="proj-navigation__card-area">
                {rel.focusAreaName}
              </span>
              <h3 className="proj-navigation__card-name">{rel.name}</h3>
              <p className="proj-navigation__card-subtitle">{rel.subtitle}</p>
              <p className="proj-navigation__card-desc">{rel.description}</p>
              <Link
                href={rel.detailRoute}
                className="proj-navigation__card-link"
              >
                <span>View {rel.name}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
          <article className="proj-navigation__card proj-navigation__card--parent">
            <span className="proj-navigation__card-area">Parent Programme</span>
            <h3 className="proj-navigation__card-name">
              {project.focusAreaName} Overview
            </h3>
            <p className="proj-navigation__card-desc">
              Discover SEVA’s complete strategy, historical background, and
              interconnected community programmes under {project.focusAreaName}.
            </p>
            <Link
              href={`/programmes/${project.focusAreaId}`}
              className="proj-navigation__card-link"
            >
              <span>Explore {project.focusAreaName} Programme</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   1. CNEWA Non-Formal Education
───────────────────────────────────────────────────────────────────────────── */

function CnewaProjectPage({
  item,
  project,
}: {
  item: NavigationItem;
  project: ProjectRecord;
}) {
  const vidyarambham = getMediaAsset("tuition-vidyarambham-initiation");
  const classroomGroup = getMediaAsset("tuition-classroom-group");
  const learningSession = getMediaAsset("tuition-learning-session");

  return (
    <article
      className="project-page project-page--cnewa"
      data-project-page="cnewa"
    >
      <ProjectHeroHeader
        item={item}
        project={project}
        badgeText="01 / EDUCATION · CNEWA NON-FORMAL EDUCATION"
      >
        {vidyarambham?.publicUrl && (
          <ImageMaskReveal>
            <MediaFrame
              ratio="landscape"
              image={{
                src: vidyarambham.publicUrl,
                alt: vidyarambham.altText,
                sizes:
                  "(min-width: 1440px) 680px, (min-width: 768px) 50vw, 90vw",
              }}
              caption={vidyarambham.caption}
              focalPoint={vidyarambham.focalPoint}
            />
          </ImageMaskReveal>
        )}
      </ProjectHeroHeader>

      <ProjectStatsStrip project={project} />

      <section
        className="proj-story proj-story--split"
        aria-labelledby="cnewa-story-heading"
      >
        <Container width="wide">
          <div className="proj-story__grid">
            <div className="proj-story__copy">
              <Reveal variant="statement">
                <Eyebrow>The Bridge to Formal Learning</Eyebrow>
                <Heading as="h2" size="large" id="cnewa-story-heading">
                  Education Designed Around Migrant Realities
                </Heading>
                <p className="proj-lead-text">{project.introduction}</p>
                <p className="proj-body-text">
                  Children of seasonal laborers and migrant workers frequently
                  face gaps in their formal schooling due to relocation and
                  economic hardship. SEVA’s CNEWA Non-Formal Education centre
                  acts as an adaptive bridge, providing remedial instruction in
                  reading, basic arithmetic, and social adaptation while
                  ensuring every child receives wholesome nutritional support.
                </p>
                <blockquote className="proj-quote">
                  <p>
                    “Every child deserves the dignity of literacy, regardless of
                    the migratory challenges faced by their families.”
                  </p>
                  <cite>— SEVA Education Directorate</cite>
                </blockquote>
              </Reveal>
            </div>
            <div className="proj-story__gallery-side">
              {classroomGroup?.publicUrl && (
                <div className="proj-gallery-card">
                  <ImageMaskReveal>
                    <MediaFrame
                      ratio="landscape"
                      image={{
                        src: classroomGroup.publicUrl,
                        alt: classroomGroup.altText,
                        sizes:
                          "(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 90vw",
                      }}
                      caption={classroomGroup.caption}
                    />
                  </ImageMaskReveal>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <ActivitiesPillList activities={project.activities} />

      {/* Classroom Gallery */}
      <section
        className="proj-photo-gallery"
        aria-labelledby="cnewa-gallery-heading"
      >
        <Container width="wide">
          <Reveal>
            <Eyebrow>Authentic Field Documentation</Eyebrow>
            <Heading as="h2" size="large" id="cnewa-gallery-heading">
              Inside the CNEWA Learning Centre
            </Heading>
          </Reveal>
          <div className="proj-gallery-grid proj-gallery-grid--3col">
            {vidyarambham?.publicUrl && (
              <figure className="proj-gallery-item">
                <div className="proj-gallery-item__img-wrap">
                  <Image
                    src={vidyarambham.publicUrl}
                    alt={vidyarambham.altText}
                    width={vidyarambham.width}
                    height={vidyarambham.height}
                    sizes="(min-width: 1024px) 30vw, 90vw"
                  />
                </div>
                <figcaption className="proj-gallery-item__caption">
                  {vidyarambham.caption}
                </figcaption>
              </figure>
            )}
            {classroomGroup?.publicUrl && (
              <figure className="proj-gallery-item">
                <div className="proj-gallery-item__img-wrap">
                  <Image
                    src={classroomGroup.publicUrl}
                    alt={classroomGroup.altText}
                    width={classroomGroup.width}
                    height={classroomGroup.height}
                    sizes="(min-width: 1024px) 30vw, 90vw"
                  />
                </div>
                <figcaption className="proj-gallery-item__caption">
                  {classroomGroup.caption}
                </figcaption>
              </figure>
            )}
            {learningSession?.publicUrl && (
              <figure className="proj-gallery-item">
                <div className="proj-gallery-item__img-wrap">
                  <Image
                    src={learningSession.publicUrl}
                    alt={learningSession.altText}
                    width={learningSession.width}
                    height={learningSession.height}
                    sizes="(min-width: 1024px) 30vw, 90vw"
                  />
                </div>
                <figcaption className="proj-gallery-item__caption">
                  {learningSession.caption}
                </figcaption>
              </figure>
            )}
          </div>
        </Container>
      </section>

      <ObjectivesList objectives={project.objectives} />
      <ParticipationPathway project={project} />
      <RelatedProjectNavigation project={project} />
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. Vidya Jyoti Scholarship Programme
───────────────────────────────────────────────────────────────────────────── */

function VidyaJyotiProjectPage({
  item,
  project,
}: {
  item: NavigationItem;
  project: ProjectRecord;
}) {
  const distribution = getMediaAsset("vidhya-jyothi-distribution");
  const sisters = getMediaAsset("vidhya-jyothi-sisters");
  const collage = getMediaAsset("seva-vidhya-jyothi-collage");

  return (
    <article
      className="project-page project-page--vidya-jyoti"
      data-project-page="vidya-jyoti"
    >
      <ProjectHeroHeader
        item={item}
        project={project}
        badgeText="01 / EDUCATION · VIDYA JYOTI SCHOLARSHIP PROGRAMME"
      >
        {distribution?.publicUrl && (
          <ImageMaskReveal>
            <MediaFrame
              ratio="landscape"
              image={{
                src: distribution.publicUrl,
                alt: distribution.altText,
                sizes:
                  "(min-width: 1440px) 680px, (min-width: 768px) 50vw, 90vw",
              }}
              caption={distribution.caption}
              focalPoint={distribution.focalPoint}
            />
          </ImageMaskReveal>
        )}
      </ProjectHeroHeader>

      {/* Dual Metric Comparison Section */}
      <section
        className="proj-distinction"
        aria-labelledby="vj-metrics-heading"
      >
        <Container width="wide">
          <div className="proj-distinction__card">
            <Eyebrow>2025–26 Reported Figures</Eyebrow>
            <Heading as="h2" size="large" id="vj-metrics-heading">
              Two Pillars of Educational Support
            </Heading>
            <p className="proj-distinction__lead">
              The Vidya Jyoti 2025–26 programme encompasses two clearly
              distinguished touchpoints. These figures represent focused
              modalities of care and are not additive:
            </p>
            <div className="proj-distinction__grid">
              <div className="proj-distinction__col">
                <span className="proj-distinction__num">~700</span>
                <h3 className="proj-distinction__title">Children Assisted</h3>
                <p className="proj-distinction__desc">
                  Total students receiving essential academic kit distributions,
                  textbooks, school bags, official uniforms, and direct fee
                  assistance across Maharashtra, Tamil Nadu, Andhra, and
                  Telangana.
                </p>
                <span className="proj-distinction__tag">
                  Broad Academic Outreach · 2025–26
                </span>
              </div>
              <div className="proj-distinction__col proj-distinction__col--highlight">
                <span className="proj-distinction__num">478</span>
                <h3 className="proj-distinction__title">
                  Tuition Centre Students
                </h3>
                <p className="proj-distinction__desc">
                  Students enrolled in structured evening tuition centres
                  delivering daily homework assistance, foundational subject
                  reinforcement, and continuous academic retention mentoring.
                </p>
                <span className="proj-distinction__tag">
                  Structured Tuition Centres · 2025–26
                </span>
              </div>
            </div>
            <p className="proj-distinction__disclaimer">
              Audit Context: All figures are organization-reported for the
              2025–26 academic period and are undergoing formal documentation
              review. Neither figure represents an independently audited census.
            </p>
          </div>
        </Container>
      </section>

      {/* Continuum of Support */}
      <section
        className="proj-continuum"
        aria-labelledby="vj-continuum-heading"
      >
        <Container width="wide">
          <Reveal variant="statement">
            <Eyebrow>Comprehensive Care</Eyebrow>
            <Heading as="h2" size="large" id="vj-continuum-heading">
              The Five Dimensions of Vidya Jyoti
            </Heading>
            <Text className="proj-continuum__intro">
              Vidya Jyoti provides a multi-layered safety net that surrounds
              each student with the material and academic tools needed to stay
              in school.
            </Text>
          </Reveal>
          <div className="proj-continuum__grid">
            <div className="proj-continuum__item">
              <span className="proj-continuum__icon">🎒</span>
              <h3>School Supplies & Bags</h3>
              <p>
                Durable backpacks and essential stationery so children attend
                class fully equipped.
              </p>
            </div>
            <div className="proj-continuum__item">
              <span className="proj-continuum__icon">📚</span>
              <h3>Prescribed Textbooks</h3>
              <p>
                Standard curriculum textbooks ensuring children never fall
                behind because of book shortages.
              </p>
            </div>
            <div className="proj-continuum__item">
              <span className="proj-continuum__icon">👔</span>
              <h3>Official Uniforms</h3>
              <p>
                Neat school uniforms that foster social belonging and remove
                visible economic distinctions.
              </p>
            </div>
            <div className="proj-continuum__item">
              <span className="proj-continuum__icon">🏫</span>
              <h3>Tuition Centres</h3>
              <p>
                Dedicated evening tutoring centres offering structured guidance
                and quiet study environments.
              </p>
            </div>
            <div className="proj-continuum__item">
              <span className="proj-continuum__icon">🤝</span>
              <h3>Academic Mentoring</h3>
              <p>
                Close guidance by educators and religious sisters to prevent
                dropouts and encourage higher study.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Multi-state Photo Collage Feature */}
      {collage?.publicUrl && (
        <section
          className="proj-poster-feature"
          aria-labelledby="vj-poster-heading"
        >
          <Container width="wide">
            <Reveal>
              <Eyebrow>Regional Reach Documentation</Eyebrow>
              <Heading as="h2" size="large" id="vj-poster-heading">
                Distribution Across Four States
              </Heading>
              <p className="proj-poster-feature__desc">
                Official SEVA organizational poster collage documenting Vidya
                Jyothi school kit and scholarship distributions across
                Maharashtra, Tamil Nadu, Andhra Pradesh, and Telangana.
              </p>
            </Reveal>
            <div className="proj-poster-feature__frame">
              <Image
                src={collage.publicUrl}
                alt={collage.altText}
                width={collage.width}
                height={collage.height}
                sizes="(min-width: 1440px) 1200px, 95vw"
                className="proj-poster-feature__img"
              />
              <p className="proj-poster-feature__caption">{collage.caption}</p>
            </div>
          </Container>
        </section>
      )}

      {sisters?.publicUrl && (
        <section
          className="proj-field-spotlight"
          aria-label="Distribution moment"
        >
          <Container width="wide">
            <div className="proj-field-spotlight__grid">
              <div className="proj-field-spotlight__img">
                <Image
                  src={sisters.publicUrl}
                  alt={sisters.altText}
                  width={sisters.width}
                  height={sisters.height}
                  sizes="(min-width: 1024px) 50vw, 90vw"
                />
              </div>
              <div className="proj-field-spotlight__body">
                <Eyebrow>Compassionate Solidarity</Eyebrow>
                <Heading as="h2" size="medium">
                  Hands of Care in Community Villages
                </Heading>
                <p>
                  SEVA’s field teams, collaborating with local religious sisters
                  and volunteer mentors, travel directly to underserved
                  settlements to ensure educational kits reach the students most
                  in need of support.
                </p>
                <p className="proj-field-spotlight__caption">
                  {sisters.caption}
                </p>
              </div>
            </div>
          </Container>
        </section>
      )}

      <ObjectivesList objectives={project.objectives} />
      <ParticipationPathway project={project} />
      <RelatedProjectNavigation project={project} />
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. Jeevan Project
───────────────────────────────────────────────────────────────────────────── */

function JeevanProjectPage({
  item,
  project,
}: {
  item: NavigationItem;
  project: ProjectRecord;
}) {
  return (
    <article
      className="project-page project-page--jeevan"
      data-project-page="jeevan"
    >
      <ProjectHeroHeader
        item={item}
        project={project}
        badgeText="03 / WOMEN EMPOWERMENT · JEEVAN PROJECT"
      >
        <div className="proj-hero__card-placeholder">
          <div className="proj-hero__card-placeholder-inner">
            <Image
              src={project.imagePlaceholder.src}
              alt={project.imagePlaceholder.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="proj-hero__card-placeholder-caption">
            {project.imagePlaceholder.caption}
          </p>
        </div>
      </ProjectHeroHeader>

      <ProjectStatsStrip project={project} />

      <section
        className="proj-story proj-story--raigad"
        aria-labelledby="jeevan-story-heading"
      >
        <Container width="wide">
          <div className="proj-story__grid">
            <div className="proj-story__copy">
              <Reveal variant="statement">
                <Eyebrow>Raigad District, Maharashtra</Eyebrow>
                <Heading as="h2" size="large" id="jeevan-story-heading">
                  Fostering Women’s Leadership & Governance
                </Heading>
                <p className="proj-lead-text">{project.introduction}</p>
                <p className="proj-body-text">
                  In rural Raigad District, women are often excluded from local
                  governance decision-making and household financial
                  stewardship. The Jeevan Project mobilizes women into Self-Help
                  Groups (SHGs) that serve as both financial savings collectives
                  and platforms for civic leadership. Participants learn
                  bookkeeping, banking procedures, legal rights, and
                  participatory representation in village Gram Sabhas.
                </p>
              </Reveal>
            </div>
            <div className="proj-story__highlight-box">
              <span className="proj-highlight-pill">GRASSROOTS COLLECTIVE</span>
              <h3>The Self-Help Group Model</h3>
              <ul className="proj-shg-pillars">
                <li>
                  <strong>Micro-Savings & Mutual Credit:</strong> Weekly thrift
                  savings build collective capital and reduce dependency on
                  exploitative local moneylenders.
                </li>
                <li>
                  <strong>Financial Familiarity:</strong> Hands-on training in
                  passbook management, bank account operations, and household
                  budgeting.
                </li>
                <li>
                  <strong>Gram Sabha Voice:</strong> Coaching women to voice
                  community priorities in village governance assemblies.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <ActivitiesPillList activities={project.activities} />

      {/* Documentary Provenance Notice */}
      <section
        className="proj-archive-notice"
        aria-label="Archive documentation status"
      >
        <Container width="narrow">
          <div className="proj-archive-notice__box">
            <span className="proj-archive-notice__tag">
              Authentic Media Notice
            </span>
            <h3>Field Photography in Curatorial Review</h3>
            <p>
              Under SEVA’s strict truth-in-advertising guidelines, all media
              must represent verified beneficiaries with explicit consent. Field
              photography from the Jeevan Project in Raigad District is
              currently undergoing archival curation and will be published upon
              formal signoff. The provisional portrait represents an approved
              documentary study honoring the leadership and resilience of rural
              women.
            </p>
          </div>
        </Container>
      </section>

      <ObjectivesList objectives={project.objectives} />
      <ParticipationPathway project={project} />
      <RelatedProjectNavigation project={project} />
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. Sui Daga Tailoring Project
───────────────────────────────────────────────────────────────────────────── */

function SuiDagaProjectPage({
  item,
  project,
}: {
  item: NavigationItem;
  project: ProjectRecord;
}) {
  return (
    <article
      className="project-page project-page--sui-daga"
      data-project-page="sui-daga"
    >
      <ProjectHeroHeader
        item={item}
        project={project}
        badgeText="03 / WOMEN EMPOWERMENT & SKILL DEVELOPMENT · SUI DAGA"
      >
        <div className="proj-hero__card-placeholder">
          <div className="proj-hero__card-placeholder-inner">
            <Image
              src={project.imagePlaceholder.src}
              alt={project.imagePlaceholder.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="proj-hero__card-placeholder-caption">
            {project.imagePlaceholder.caption}
          </p>
        </div>
      </ProjectHeroHeader>

      <ProjectStatsStrip project={project} />

      <section
        className="proj-story proj-story--craft"
        aria-labelledby="sui-story-heading"
      >
        <Container width="wide">
          <div className="proj-story__grid">
            <div className="proj-story__copy">
              <Reveal variant="statement">
                <Eyebrow>Vocational Independence</Eyebrow>
                <Heading as="h2" size="large" id="sui-story-heading">
                  Building Livelihoods Through Market-Relevant Skills
                </Heading>
                <p className="proj-lead-text">{project.introduction}</p>
                <p className="proj-body-text">
                  Operating across two active tailoring centres, the Sui Daga
                  Project teaches women practical cutting, stitching, and
                  garment production. By grounding vocational education in real
                  market demand—such as school uniform repairs, blouse
                  tailoring, and local garment contracts—the project transforms
                  trainees into independent micro-producers with sustained
                  household earning power.
                </p>
              </Reveal>
            </div>
            <div className="proj-skills-continuum">
              <Eyebrow>Instructional Curriculum</Eyebrow>
              <h3>Four Stages of Technical Mastery</h3>
              <ol className="proj-skills-steps">
                <li>
                  <span className="proj-skills-steps__idx">01</span>
                  <div>
                    <strong>Measurement & Pattern Drafting:</strong> Accurate
                    body measurements, cloth layout, and pattern drafting
                    fundamentals.
                  </div>
                </li>
                <li>
                  <span className="proj-skills-steps__idx">02</span>
                  <div>
                    <strong>Machine Operation & Maintenance:</strong> Sewing
                    machine setup, treadle operation, tension tuning, and care.
                  </div>
                </li>
                <li>
                  <span className="proj-skills-steps__idx">03</span>
                  <div>
                    <strong>Garment Construction:</strong> Assembling everyday
                    garments, school uniforms, and regional apparel.
                  </div>
                </li>
                <li>
                  <span className="proj-skills-steps__idx">04</span>
                  <div>
                    <strong>Micro-Enterprise Mentoring:</strong> Costing, fabric
                    sourcing, pricing, and handling community orders.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <ActivitiesPillList activities={project.activities} />

      <section
        className="proj-synergy-banner"
        aria-label="Skill Development synergy"
      >
        <Container width="narrow">
          <div className="proj-synergy-banner__box">
            <span className="proj-synergy-banner__tag">
              Inter-Programme Synergy
            </span>
            <h3>Bridging Women’s Empowerment and Skill Development</h3>
            <p>
              While administratively housed under Women Empowerment, the Sui
              Daga Tailoring Project embodies SEVA’s comprehensive{" "}
              <Link href="/programmes/skill-development">
                Skill Development
              </Link>{" "}
              philosophy: equipping individuals with concrete vocational tools
              that unlock lifelong economic self-sufficiency.
            </p>
          </div>
        </Container>
      </section>

      <ObjectivesList objectives={project.objectives} />
      <ParticipationPathway project={project} />
      <RelatedProjectNavigation project={project} />
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. SEVA Ruby Meal
───────────────────────────────────────────────────────────────────────────── */

function RubyMealProjectPage({
  item,
  project,
}: {
  item: NavigationItem;
  project: ProjectRecord;
}) {
  const service = getMediaAsset("ruby-meals-service");
  const outreach = getMediaAsset("ruby-meals-outreach");
  const collage = getMediaAsset("seva-ruby-meals-collage");

  return (
    <article
      className="project-page project-page--ruby-meal"
      data-project-page="seva-ruby-meal"
    >
      <ProjectHeroHeader
        item={item}
        project={project}
        badgeText="04 / COMMUNITY WELFARE · SEVA RUBY MEAL"
      >
        {service?.publicUrl && (
          <ImageMaskReveal>
            <MediaFrame
              ratio="portrait"
              image={{
                src: service.publicUrl,
                alt: service.altText,
                sizes:
                  "(min-width: 1440px) 540px, (min-width: 768px) 45vw, 90vw",
              }}
              caption={service.caption}
              focalPoint={service.focalPoint}
            />
          </ImageMaskReveal>
        )}
      </ProjectHeroHeader>

      <ProjectStatsStrip project={project} />

      <section
        className="proj-story proj-story--ruby"
        aria-labelledby="ruby-story-heading"
      >
        <Container width="wide">
          <div className="proj-story__grid">
            <div className="proj-story__copy">
              <Reveal variant="statement">
                <Eyebrow>Weekly Friday Tradition</Eyebrow>
                <Heading as="h2" size="large" id="ruby-story-heading">
                  The Table of Shared Dignity
                </Heading>
                <p className="proj-lead-text">{project.introduction}</p>
                <p className="proj-body-text">
                  In Khadki-Pune, every Friday marks an unbroken tradition of
                  compassionate hospitality. SEVA volunteers prepare hot,
                  freshly cooked, nutritious meals in large vessels and serve
                  individuals facing intense hardship: people experiencing
                  homelessness, destitute elders living without kin, daily-wage
                  laborers, and families from informal settlements.
                </p>
                <div className="proj-ruby-pillars">
                  <div className="proj-ruby-pillar">
                    <strong>Homeless Persons</strong>
                    <span>
                      Hot wholesome meals served with unconditional respect.
                    </span>
                  </div>
                  <div className="proj-ruby-pillar">
                    <strong>Destitute Elders</strong>
                    <span>Nutritional security and warm human connection.</span>
                  </div>
                  <div className="proj-ruby-pillar">
                    <strong>Daily-Wage Workers</strong>
                    <span>
                      Vital relief during intermittent employment periods.
                    </span>
                  </div>
                  <div className="proj-ruby-pillar">
                    <strong>Underserved Families</strong>
                    <span>
                      Family support addressing seasonal food vulnerability.
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="proj-story__gallery-side">
              {outreach?.publicUrl && (
                <div className="proj-gallery-card">
                  <ImageMaskReveal>
                    <MediaFrame
                      ratio="portrait"
                      image={{
                        src: outreach.publicUrl,
                        alt: outreach.altText,
                        sizes:
                          "(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 90vw",
                      }}
                      caption={outreach.caption}
                    />
                  </ImageMaskReveal>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Ruby Meals Gallery & Poster */}
      <section
        className="proj-photo-gallery"
        aria-labelledby="ruby-gallery-heading"
      >
        <Container width="wide">
          <Reveal>
            <Eyebrow>Field Documentation</Eyebrow>
            <Heading as="h2" size="large" id="ruby-gallery-heading">
              Friday Meal Distribution in Khadki-Pune
            </Heading>
          </Reveal>
          <div className="proj-gallery-grid proj-gallery-grid--2col">
            {service?.publicUrl && (
              <figure className="proj-gallery-item">
                <div className="proj-gallery-item__img-wrap">
                  <Image
                    src={service.publicUrl}
                    alt={service.altText}
                    width={service.width}
                    height={service.height}
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                </div>
                <figcaption className="proj-gallery-item__caption">
                  {service.caption}
                </figcaption>
              </figure>
            )}
            {outreach?.publicUrl && (
              <figure className="proj-gallery-item">
                <div className="proj-gallery-item__img-wrap">
                  <Image
                    src={outreach.publicUrl}
                    alt={outreach.altText}
                    width={outreach.width}
                    height={outreach.height}
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                </div>
                <figcaption className="proj-gallery-item__caption">
                  {outreach.caption}
                </figcaption>
              </figure>
            )}
          </div>
          {collage?.publicUrl && (
            <div className="proj-poster-feature proj-poster-feature--compact">
              <Image
                src={collage.publicUrl}
                alt={collage.altText}
                width={collage.width}
                height={collage.height}
                sizes="(min-width: 1440px) 1200px, 95vw"
                className="proj-poster-feature__img"
              />
              <p className="proj-poster-feature__caption">{collage.caption}</p>
            </div>
          )}
        </Container>
      </section>

      <ActivitiesPillList activities={project.activities} />
      <ObjectivesList objectives={project.objectives} />
      <ParticipationPathway project={project} />
      <RelatedProjectNavigation project={project} />
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. Healthcare and Medical Outreach
───────────────────────────────────────────────────────────────────────────── */

function HealthcareProjectPage({
  item,
  project,
}: {
  item: NavigationItem;
  project: ProjectRecord;
}) {
  return (
    <article
      className="project-page project-page--healthcare"
      data-project-page="medical-outreach"
    >
      <ProjectHeroHeader
        item={item}
        project={project}
        badgeText="02 / HEALTHCARE · MEDICAL OUTREACH"
      >
        <div className="proj-hero__card-placeholder">
          <div className="proj-hero__card-placeholder-inner">
            <Image
              src={project.imagePlaceholder.src}
              alt={project.imagePlaceholder.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="proj-hero__card-placeholder-caption">
            {project.imagePlaceholder.caption}
          </p>
        </div>
      </ProjectHeroHeader>

      <ProjectStatsStrip project={project} />

      <section
        className="proj-story proj-story--clinical"
        aria-labelledby="hc-story-heading"
      >
        <Container width="wide">
          <div className="proj-story__grid">
            <div className="proj-story__copy">
              <Reveal variant="statement">
                <Eyebrow>Primary & Preventive Healthcare</Eyebrow>
                <Heading as="h2" size="large" id="hc-story-heading">
                  Delivering Care Directly to Communities
                </Heading>
                <p className="proj-lead-text">{project.introduction}</p>
                <p className="proj-body-text">
                  In many rural and semi-urban localities, preventive healthcare
                  is out of reach due to geographical distance and out-of-pocket
                  medical expenses. SEVA bridges these gaps through community
                  medical camps, diagnostic screenings, child growth monitoring,
                  and referral linkages to specialized hospitals.
                </p>
              </Reveal>
            </div>
            <div className="proj-clinical-continuum">
              <Eyebrow>Clinical Outreach Continuum</Eyebrow>
              <h3>Six Core Healthcare Services</h3>
              <ul className="proj-clinical-services">
                <li>
                  <strong>Mobile Medical Camps:</strong> General clinical
                  checkups and doctor consultations conducted in parish and
                  community spaces.
                </li>
                <li>
                  <strong>Preventive Screenings:</strong> Early detection of
                  hypertension, diabetes, anemia, and common seasonal ailments.
                </li>
                <li>
                  <strong>Child Growth Monitoring:</strong> Weight, height, and
                  nutritional status tracking for infants and growing children.
                </li>
                <li>
                  <strong>Hygiene & Health Education:</strong> Community
                  workshops on clean drinking water, handwashing, and
                  sanitation.
                </li>
                <li>
                  <strong>Free Essential Medications:</strong> Dispensing
                  prescribed basic medicines free of cost to patients in need.
                </li>
                <li>
                  <strong>Hospital Referrals:</strong> Linking individuals
                  requiring advanced surgery or clinical diagnostic procedures
                  to partner hospitals.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <ActivitiesPillList activities={project.activities} />

      {/* Strict Truth-in-Advertising Medical Protocol Notice */}
      <section
        className="proj-clinical-protocol"
        aria-label="Clinical protocol and truth in reporting"
      >
        <Container width="narrow">
          <div className="proj-clinical-protocol__card">
            <span className="proj-clinical-protocol__badge">
              Clinical Ethics & Documentation
            </span>
            <h3>Documented Activities & Patient Dignity</h3>
            <p>
              SEVA adheres strictly to truth-in-advertising and patient dignity
              safeguards. Medical camps are conducted with volunteer doctors and
              parish healthcare teams. All reported participation metrics are
              logged after individual camp completions, and clinical photography
              is captured strictly with beneficiary consent. No clinical claims,
              hospital partnerships, or cure rates are published beyond verified
              records.
            </p>
          </div>
        </Container>
      </section>

      <ObjectivesList objectives={project.objectives} />
      <ParticipationPathway project={project} />
      <RelatedProjectNavigation project={project} />
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Dispatch Component
───────────────────────────────────────────────────────────────────────────── */

export function ProjectPage({
  item,
  project,
}: {
  item: NavigationItem;
  project: ProjectRecord;
}) {
  switch (project.slug) {
    case "cnewa":
      return <CnewaProjectPage item={item} project={project} />;
    case "vidya-jyoti":
      return <VidyaJyotiProjectPage item={item} project={project} />;
    case "jeevan":
      return <JeevanProjectPage item={item} project={project} />;
    case "sui-daga":
      return <SuiDagaProjectPage item={item} project={project} />;
    case "seva-ruby-meal":
      return <RubyMealProjectPage item={item} project={project} />;
    case "medical-outreach":
      return <HealthcareProjectPage item={item} project={project} />;
    default:
      return <CnewaProjectPage item={item} project={project} />;
  }
}
