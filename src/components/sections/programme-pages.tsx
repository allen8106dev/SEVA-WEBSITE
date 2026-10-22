import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { MediaFrame } from "@/components/ui/media-frame";
import { Breadcrumbs } from "@/components/layout/interior-page";
import { Reveal } from "@/components/animations/reveal";
import { ImageMaskReveal } from "@/components/animations/image-mask-reveal";
import { navigation, type NavigationItem } from "@/config/navigation";
import { focusAreas } from "@/content/focus-areas";
import { projects, type ProjectRecord } from "@/content/projects";
import { getMediaAsset } from "@/content/media";
import { programmesContent, type ProgrammePageId } from "@/content/programmes";

/**
 * Renders an approved photograph from the typed media registry with mask reveal.
 */
function ProgrammePhoto({
  id,
  ratio = "landscape",
  className = "",
}: {
  id: string;
  ratio?: "portrait" | "landscape" | "cinematic" | "square";
  className?: string;
}) {
  const asset = getMediaAsset(id);
  if (
    !asset?.publicUrl ||
    asset.approvalStatus !== "approved_for_publication"
  ) {
    return null;
  }
  return (
    <ImageMaskReveal>
      <MediaFrame
        className={`programme-photo ${className}`}
        ratio={ratio}
        image={{
          src: asset.publicUrl,
          alt: asset.altText,
          sizes: "(min-width: 1440px) 680px, (min-width: 768px) 50vw, 90vw",
        }}
        caption={asset.caption}
        focalPoint={asset.focalPoint}
      />
    </ImageMaskReveal>
  );
}

/**
 * Editorial Hero for Programme pages.
 */
function ProgrammeHero({
  item,
  id,
  children,
}: {
  item: NavigationItem;
  id: ProgrammePageId;
  children?: ReactNode;
}) {
  const copy = programmesContent[id];
  return (
    <section
      className={`prog-hero prog-hero--${id}`}
      aria-labelledby="programme-title"
    >
      <Container width="wide">
        <Breadcrumbs item={item} />
        <div className="prog-hero__grid">
          <div>
            <span className="prog-chapter-badge">{copy.chapterTag}</span>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <Heading
              as="h1"
              size="display"
              id="programme-title"
              className="prog-title"
            >
              {copy.headline} {copy.headlineEm && <em>{copy.headlineEm}</em>}
            </Heading>
            <Text size="large" className="prog-intro">
              {copy.description}
            </Text>
          </div>
          {children && <div className="prog-hero__media">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

/**
 * Tagged list of key operational activities.
 */
function ActivitiesList({ activities }: { activities: readonly string[] }) {
  return (
    <ul className="prog-activities__list" aria-label="Key programme activities">
      {activities.map((activity) => (
        <li key={activity} className="prog-activity-tag">
          {activity}
        </li>
      ))}
    </ul>
  );
}

/**
 * Project preview card showing documented initiatives and reported figures.
 * Acknowledges that individual detail pages will arrive in Phase 5C.2B.
 */
function ProjectPreviewCard({ project }: { project: ProjectRecord }) {
  return (
    <article className="prog-project-card" key={project.id}>
      <div className="prog-project-card__media">
        <div className="prog-project-card__img-wrap">
          <Image
            src={project.imagePlaceholder.src}
            alt={project.imagePlaceholder.alt}
            fill
            sizes="(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 90vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="prog-project-card__body">
        <span className="prog-project-card__area">{project.focusAreaName}</span>
        <h3 className="prog-project-card__name">{project.name}</h3>
        <p className="prog-project-card__subtitle">{project.subtitle}</p>
        <p className="prog-project-card__desc">{project.description}</p>
        <ul
          className="prog-project-card__activities"
          aria-label="Project activities"
        >
          {project.activities.map((act) => (
            <li key={act}>{act}</li>
          ))}
        </ul>
        {project.reportedImpact && (
          <div className="prog-project-card__impact">
            <span className="prog-project-card__impact-label">
              Reported Reach
            </span>
            <span className="prog-project-card__impact-value">
              {project.reportedImpact}
            </span>
            {project.reportingPeriod && (
              <span className="prog-project-card__impact-period">
                Reporting Context: {project.reportingPeriod} · Audit pending
              </span>
            )}
          </div>
        )}
        <div className="prog-project-card__footer">
          <p className="prog-project-card__notice">
            Comprehensive project detail page in preparation for Phase 5C.2B.
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * Cross-links to other SEVA focus areas.
 */
function ProgrammeNavigation({ currentId }: { currentId: string }) {
  const programmesGroup = navigation.find((g) => g.id === "programmes");
  const siblings = (programmesGroup?.children ?? []).filter(
    (c) =>
      c.visible &&
      c.href !== `/programmes/${currentId}` &&
      c.href !== "/programmes",
  );
  if (siblings.length === 0) return null;
  return (
    <nav className="prog-nav" aria-label="Other SEVA programmes">
      <Container>
        <Eyebrow>Explore All Focus Areas</Eyebrow>
        <h2 className="prog-nav__heading">Other SEVA Programmes</h2>
        <div className="prog-nav__grid">
          {siblings.map((item) => (
            <Link key={item.id} href={item.href} className="prog-nav__link">
              <span className="prog-nav__label">{item.label}</span>
              <span className="prog-nav__desc">{item.description}</span>
            </Link>
          ))}
        </div>
      </Container>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   1. Education Programme Page
───────────────────────────────────────────────────────────────────────────── */

function EducationPage({ item }: { item: NavigationItem }) {
  const area = focusAreas.find((a) => a.id === "education")!;
  const relatedProjects = projects.filter((p) => p.focusAreaId === "education");
  return (
    <div className="programme-page" data-programme-page="education">
      <ProgrammeHero item={item} id="education">
        <ProgrammePhoto id="vidhya-jyothi-distribution" ratio="landscape" />
      </ProgrammeHero>

      {/* Core Activities */}
      <section
        className="prog-activities"
        aria-labelledby="edu-activities-heading"
      >
        <Container width="narrow">
          <Reveal variant="statement">
            <Eyebrow>{area.category}</Eyebrow>
            <Heading as="h2" size="large" id="edu-activities-heading">
              Foundational Learning & Mentoring
            </Heading>
            <Text>{area.detailedDescription}</Text>
          </Reveal>
          <ActivitiesList activities={area.activities} />
        </Container>
      </section>

      {/* Field Photography Gallery */}
      <section
        className="prog-photo-section"
        aria-labelledby="edu-gallery-heading"
      >
        <Container width="wide">
          <Reveal variant="statement">
            <Eyebrow>Authentic Field Documentation</Eyebrow>
            <Heading as="h2" size="large" id="edu-gallery-heading">
              Learning in the Community
            </Heading>
          </Reveal>
          <div className="prog-photo-grid">
            <ProgrammePhoto
              id="tuition-vidyarambham-initiation"
              ratio="landscape"
            />
            <ProgrammePhoto id="tuition-classroom-group" ratio="landscape" />
            <ProgrammePhoto id="tuition-learning-session" ratio="landscape" />
          </div>
        </Container>
      </section>

      {/* Sourced Initiatives */}
      {relatedProjects.length > 0 && (
        <section
          className="prog-projects"
          aria-labelledby="edu-projects-heading"
        >
          <Container>
            <Reveal>
              <Eyebrow>Documented Initiatives</Eyebrow>
              <Heading as="h2" size="large" id="edu-projects-heading">
                Education Projects
              </Heading>
            </Reveal>
            <div className="prog-projects__grid">
              {relatedProjects.map((project) => (
                <Reveal key={project.id} variant="media">
                  <ProjectPreviewCard project={project} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Cross-Programme Links */}
      <ProgrammeNavigation currentId="education" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. Healthcare Programme Page
───────────────────────────────────────────────────────────────────────────── */

function HealthcarePage({ item }: { item: NavigationItem }) {
  const area = focusAreas.find((a) => a.id === "healthcare")!;
  const relatedProjects = projects.filter(
    (p) => p.focusAreaId === "healthcare",
  );
  return (
    <div className="programme-page" data-programme-page="healthcare">
      <ProgrammeHero item={item} id="healthcare">
        <MediaFrame
          ratio="landscape"
          image={{
            src: area.media.src,
            alt: area.media.alt,
            sizes: "(min-width: 1440px) 680px, (min-width: 768px) 50vw, 90vw",
          }}
          caption={area.media.caption}
        />
      </ProgrammeHero>

      <section
        className="prog-activities"
        aria-labelledby="hc-activities-heading"
      >
        <Container width="narrow">
          <Reveal variant="statement">
            <Eyebrow>{area.category}</Eyebrow>
            <Heading as="h2" size="large" id="hc-activities-heading">
              Community Health & Preventive Care
            </Heading>
            <Text>{area.detailedDescription}</Text>
          </Reveal>
          <ActivitiesList activities={area.activities} />
        </Container>
      </section>

      {relatedProjects.length > 0 && (
        <section
          className="prog-projects"
          aria-labelledby="hc-projects-heading"
        >
          <Container>
            <Reveal>
              <Eyebrow>Documented Initiatives</Eyebrow>
              <Heading as="h2" size="large" id="hc-projects-heading">
                Healthcare Outreach
              </Heading>
            </Reveal>
            <div className="prog-projects__grid">
              {relatedProjects.map((project) => (
                <Reveal key={project.id} variant="media">
                  <ProjectPreviewCard project={project} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section
        className="prog-notice"
        aria-label="Healthcare documentation notice"
      >
        <Container width="narrow">
          <aside className="content-notice">
            <strong>Field Documentation Note</strong>
            <p>
              Healthcare camps and medical assistance outreach records are
              documented from SEVA’s operational logs. Authentic clinical
              outreach photography will be integrated upon formal delivery from
              field teams. No outcomes or hospital affiliations are asserted
              beyond verified records.
            </p>
          </aside>
        </Container>
      </section>

      <ProgrammeNavigation currentId="healthcare" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. Women Empowerment Programme Page
───────────────────────────────────────────────────────────────────────────── */

function WomenEmpowermentPage({ item }: { item: NavigationItem }) {
  const area = focusAreas.find((a) => a.id === "women-empowerment")!;
  const relatedProjects = projects.filter(
    (p) => p.focusAreaId === "women-empowerment",
  );
  return (
    <div className="programme-page" data-programme-page="women-empowerment">
      <ProgrammeHero item={item} id="women-empowerment">
        <MediaFrame
          ratio="square"
          image={{
            src: area.media.src,
            alt: area.media.alt,
            sizes: "(min-width: 1440px) 540px, (min-width: 768px) 45vw, 90vw",
          }}
          caption={area.media.caption}
        />
      </ProgrammeHero>

      <section
        className="prog-activities"
        aria-labelledby="we-activities-heading"
      >
        <Container width="narrow">
          <Reveal variant="statement">
            <Eyebrow>{area.category}</Eyebrow>
            <Heading as="h2" size="large" id="we-activities-heading">
              Livelihood & Leadership
            </Heading>
            <Text>{area.detailedDescription}</Text>
          </Reveal>
          <ActivitiesList activities={area.activities} />
        </Container>
      </section>

      {relatedProjects.length > 0 && (
        <section
          className="prog-projects"
          aria-labelledby="we-projects-heading"
        >
          <Container>
            <Reveal>
              <Eyebrow>Documented Initiatives</Eyebrow>
              <Heading as="h2" size="large" id="we-projects-heading">
                Empowerment Projects
              </Heading>
            </Reveal>
            <div className="prog-projects__grid">
              {relatedProjects.map((project) => (
                <Reveal key={project.id} variant="media">
                  <ProjectPreviewCard project={project} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section
        className="prog-cross-link"
        aria-label="Skill development alignment"
      >
        <Container width="narrow">
          <p className="prog-cross-link__note">
            Vocational training under the{" "}
            <Link href="/programmes/skill-development">Skill Development</Link>{" "}
            programme coordinates closely with the Sui Daga Tailoring Project,
            equipping women with commercial garment fabrication and
            entrepreneurship skills.
          </p>
        </Container>
      </section>

      <section
        className="prog-notice"
        aria-label="Women Empowerment documentation notice"
      >
        <Container width="narrow">
          <aside className="content-notice">
            <strong>Authentic Photography Awaiting Delivery</strong>
            <p>
              Authentic field photographs from the Jeevan Project in Raigad
              District are currently in archival curation. The visual studies
              above are licensed demonstrations and do not depict individual
              SEVA participants.
            </p>
          </aside>
        </Container>
      </section>

      <ProgrammeNavigation currentId="women-empowerment" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. Community Welfare Programme Page
───────────────────────────────────────────────────────────────────────────── */

function CommunityWelfarePage({ item }: { item: NavigationItem }) {
  const area = focusAreas.find((a) => a.id === "community-welfare")!;
  const relatedProjects = projects.filter(
    (p) => p.focusAreaId === "community-welfare",
  );
  return (
    <div className="programme-page" data-programme-page="community-welfare">
      <ProgrammeHero item={item} id="community-welfare">
        <ProgrammePhoto id="ruby-meals-service" ratio="portrait" />
      </ProgrammeHero>

      <section
        className="prog-activities"
        aria-labelledby="cw-activities-heading"
      >
        <Container width="narrow">
          <Reveal variant="statement">
            <Eyebrow>{area.category}</Eyebrow>
            <Heading as="h2" size="large" id="cw-activities-heading">
              Compassionate Support & Social Safety
            </Heading>
            <Text>{area.detailedDescription}</Text>
          </Reveal>
          <ActivitiesList activities={area.activities} />
        </Container>
      </section>

      {/* Ruby Meal Photography */}
      <section
        className="prog-photo-section"
        aria-labelledby="cw-gallery-heading"
      >
        <Container width="wide">
          <Reveal variant="statement">
            <Eyebrow>Authentic Field Documentation</Eyebrow>
            <Heading as="h2" size="large" id="cw-gallery-heading">
              Weekly Ruby Meal Outreach
            </Heading>
          </Reveal>
          <div className="prog-photo-grid prog-photo-grid--duo">
            <ProgrammePhoto id="ruby-meals-outreach" ratio="portrait" />
            <ProgrammePhoto id="ruby-meals-service" ratio="portrait" />
          </div>
        </Container>
      </section>

      {relatedProjects.length > 0 && (
        <section
          className="prog-projects"
          aria-labelledby="cw-projects-heading"
        >
          <Container>
            <Reveal>
              <Eyebrow>Documented Initiatives</Eyebrow>
              <Heading as="h2" size="large" id="cw-projects-heading">
                Welfare Initiatives
              </Heading>
            </Reveal>
            <div className="prog-projects__grid">
              {relatedProjects.map((project) => (
                <Reveal key={project.id} variant="media">
                  <ProjectPreviewCard project={project} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ProgrammeNavigation currentId="community-welfare" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. Rural & Tribal Development Programme Page
───────────────────────────────────────────────────────────────────────────── */

function RuralTribalPage({ item }: { item: NavigationItem }) {
  const area = focusAreas.find((a) => a.id === "rural-tribal-development")!;
  return (
    <div
      className="programme-page"
      data-programme-page="rural-tribal-development"
    >
      <ProgrammeHero item={item} id="rural-tribal-development">
        <ProgrammePhoto id="housing-project-paderu" ratio="landscape" />
      </ProgrammeHero>

      <section
        className="prog-activities"
        aria-labelledby="rt-activities-heading"
      >
        <Container width="narrow">
          <Reveal variant="statement">
            <Eyebrow>{area.category}</Eyebrow>
            <Heading as="h2" size="large" id="rt-activities-heading">
              Indigenous Welfare & Stewardship
            </Heading>
            <Text>{area.detailedDescription}</Text>
          </Reveal>
          <ActivitiesList activities={area.activities} />
        </Container>
      </section>

      {/* Housing Project Documentation */}
      <section
        className="prog-photo-section"
        aria-labelledby="rt-gallery-heading"
      >
        <Container width="wide">
          <Reveal variant="statement">
            <Eyebrow>Official Programme Collage</Eyebrow>
            <Heading as="h2" size="large" id="rt-gallery-heading">
              Housing Project Documentation
            </Heading>
          </Reveal>
          <ProgrammePhoto id="collage-housing-project" ratio="landscape" />
        </Container>
      </section>

      <section
        className="prog-notice"
        aria-label="Rural Tribal documentation notice"
      >
        <Container width="narrow">
          <aside className="content-notice">
            <strong>Geographic Coverage & Initiative Scope</strong>
            <p>
              SEVA’s rural and tribal initiatives encompass durable housing
              construction, sustainable agriculture, and local resource
              governance across Paderu (Andhra Pradesh), Suryapet, and Khammam
              (Telangana). Full project dossiers and regional beneficiary
              summaries will be released in subsequent project phases.
            </p>
          </aside>
        </Container>
      </section>

      <ProgrammeNavigation currentId="rural-tribal-development" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. Skill Development Programme Page
───────────────────────────────────────────────────────────────────────────── */

function SkillDevelopmentPage({ item }: { item: NavigationItem }) {
  const area = focusAreas.find((a) => a.id === "skill-development")!;
  const relatedProjects = projects.filter(
    (p) => p.focusAreaId === "skill-development",
  );
  return (
    <div className="programme-page" data-programme-page="skill-development">
      <ProgrammeHero item={item} id="skill-development">
        <MediaFrame
          ratio="landscape"
          image={{
            src: area.media.src,
            alt: area.media.alt,
            sizes: "(min-width: 1440px) 680px, (min-width: 768px) 50vw, 90vw",
          }}
          caption={area.media.caption}
        />
      </ProgrammeHero>

      <section
        className="prog-activities"
        aria-labelledby="sd-activities-heading"
      >
        <Container width="narrow">
          <Reveal variant="statement">
            <Eyebrow>{area.category}</Eyebrow>
            <Heading as="h2" size="large" id="sd-activities-heading">
              Vocational Training & Employability
            </Heading>
            <Text>{area.detailedDescription}</Text>
          </Reveal>
          <ActivitiesList activities={area.activities} />
        </Container>
      </section>

      {relatedProjects.length > 0 && (
        <section
          className="prog-projects"
          aria-labelledby="sd-projects-heading"
        >
          <Container>
            <Reveal>
              <Eyebrow>Documented Initiatives</Eyebrow>
              <Heading as="h2" size="large" id="sd-projects-heading">
                Vocational Training Projects
              </Heading>
            </Reveal>
            <div className="prog-projects__grid">
              {relatedProjects.map((project) => (
                <Reveal key={project.id} variant="media">
                  <ProjectPreviewCard project={project} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section
        className="prog-cross-link"
        aria-label="Women empowerment synergy"
      >
        <Container width="narrow">
          <p className="prog-cross-link__note">
            The Sui Daga Tailoring Project operates as a shared initiative
            bridging{" "}
            <Link href="/programmes/women-empowerment">Women Empowerment</Link>{" "}
            and Skill Development, providing structured garment design
            instruction and micro-enterprise mentoring across two operational
            centres.
          </p>
        </Container>
      </section>

      <section className="prog-notice" aria-label="Skill Development notice">
        <Container width="narrow">
          <aside className="content-notice">
            <strong>Authentic Centre Photography in Preparation</strong>
            <p>
              Photographs from SEVA’s tailoring and technical instruction
              centres are currently in documentation. The imagery above serves
              as a demonstration study.
            </p>
          </aside>
        </Container>
      </section>

      <ProgrammeNavigation currentId="skill-development" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   7. Relief Works Programme Page
───────────────────────────────────────────────────────────────────────────── */

function ReliefWorksPage({ item }: { item: NavigationItem }) {
  const area = focusAreas.find((a) => a.id === "relief-works")!;
  return (
    <div className="programme-page" data-programme-page="relief-works">
      <ProgrammeHero item={item} id="relief-works">
        <MediaFrame
          ratio="landscape"
          image={{
            src: area.media.src,
            alt: area.media.alt,
            sizes: "(min-width: 1440px) 680px, (min-width: 768px) 50vw, 90vw",
          }}
          caption={area.media.caption}
        />
      </ProgrammeHero>

      <section
        className="prog-activities"
        aria-labelledby="rw-activities-heading"
      >
        <Container width="narrow">
          <Reveal variant="statement">
            <Eyebrow>{area.category}</Eyebrow>
            <Heading as="h2" size="large" id="rw-activities-heading">
              Crisis Response & Humanitarian Aid
            </Heading>
            <Text>{area.detailedDescription}</Text>
          </Reveal>
          <ActivitiesList activities={area.activities} />
        </Container>
      </section>

      <section className="prog-notice" aria-label="Relief Works notice">
        <Container width="narrow">
          <aside className="content-notice">
            <strong>Humanitarian Reporting Safeguards</strong>
            <p>
              SEVA mobilizes relief teams during seasonal floods, droughts, and
              emergency crises across operational states. Detailed historical
              relief logs, distribution registers, and emergency beneficiary
              figures will be presented as verified audited documentation is
              cleared for public presentation.
            </p>
          </aside>
        </Container>
      </section>

      <ProgrammeNavigation currentId="relief-works" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. Programmes Overview Page (/programmes)
───────────────────────────────────────────────────────────────────────────── */

function ProgrammesOverviewPage({ item }: { item: NavigationItem }) {
  const programmesNav = navigation.find((g) => g.id === "programmes");
  return (
    <div className="programme-page" data-programme-page="programmes">
      <ProgrammeHero item={item} id="programmes">
        <ProgrammePhoto id="tuition-classroom-group" ratio="landscape" />
      </ProgrammeHero>

      {/* Editorial Directory featuring all seven programmes */}
      <section
        className="programmes-overview"
        aria-labelledby="programmes-dir-heading"
      >
        <Container width="wide">
          <Reveal variant="statement">
            <Eyebrow>Seven Pillars of Service</Eyebrow>
            <Heading as="h2" size="large" id="programmes-dir-heading">
              Our Core Programmes
            </Heading>
          </Reveal>
          <div className="programmes-directory">
            {focusAreas.map((area, index) => {
              const navItem = programmesNav?.children?.find(
                (c) => c.id === area.id,
              );
              const numStr = String(index + 1).padStart(2, "0");
              return (
                <Reveal key={area.id} variant="media" order={index}>
                  <article
                    className={`programme-entry ${
                      index % 2 === 1 ? "programme-entry--even" : ""
                    }`}
                  >
                    <div className="programme-entry__accent">
                      <span className="programme-entry__num">{numStr}</span>
                    </div>
                    <div className="programme-entry__content">
                      <h3 className="programme-entry__title">{area.title}</h3>
                      <p className="programme-entry__category">
                        {area.category}
                      </p>
                      <p className="programme-entry__summary">
                        {area.detailedDescription}
                      </p>
                      <ul
                        className="programme-entry__activities"
                        aria-label={`${area.title} activities`}
                      >
                        {area.activities.slice(0, 4).map((act) => (
                          <li key={act}>{act}</li>
                        ))}
                      </ul>
                      {navItem && (
                        <Link
                          href={navItem.href}
                          className="programme-entry__link"
                        >
                          Explore {area.title} <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>
                    <div className="programme-entry__media">
                      <div
                        className={`programme-entry__img-wrap programme-entry__img-wrap--${area.media.ratio}`}
                      >
                        <Image
                          src={area.media.src}
                          alt={area.media.alt}
                          fill
                          sizes="(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 90vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <p className="programme-entry__caption">
                        {area.media.caption}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Page Dispatch
───────────────────────────────────────────────────────────────────────────── */

export function ProgrammePage({
  item,
  id,
}: {
  item: NavigationItem;
  id: ProgrammePageId;
}) {
  switch (id) {
    case "programmes":
      return <ProgrammesOverviewPage item={item} />;
    case "education":
      return <EducationPage item={item} />;
    case "healthcare":
      return <HealthcarePage item={item} />;
    case "women-empowerment":
      return <WomenEmpowermentPage item={item} />;
    case "community-welfare":
      return <CommunityWelfarePage item={item} />;
    case "rural-tribal-development":
      return <RuralTribalPage item={item} />;
    case "skill-development":
      return <SkillDevelopmentPage item={item} />;
    case "relief-works":
      return <ReliefWorksPage item={item} />;
  }
}
