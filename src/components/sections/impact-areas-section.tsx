import Link from "next/link";
import { homeContent, type ImpactAreaContent } from "@/content/home";
import { focusAreas } from "@/content/focus-areas";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { HomepageMedia } from "@/components/ui/homepage-media";
import { Arrow, LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

export function ImpactArea({
  area,
  order = 0,
}: {
  area: ImpactAreaContent;
  order?: number;
}) {
  const numberStr = String(order + 1).padStart(2, "0");
  return (
    <article
      className={`impact-area impact-area--${area.accent ?? "green"} impact-card-vibrant`}
      aria-labelledby={`${area.id}-title`}
    >
      <div className="impact-card-vibrant__header">
        <span className="impact-card-vibrant__num" aria-hidden="true">
          {numberStr}
        </span>
        {area.category && (
          <span className="impact-card-vibrant__badge">{area.category}</span>
        )}
      </div>
      <Reveal variant="media" order={order}>
        <div className="impact-media-wrapper">
          <HomepageMedia
            media={area.media}
            sizes="(min-width: 768px) 48vw, 100vw"
          />
        </div>
      </Reveal>
      <div className="impact-area__copy">
        <Heading as="h3" size="medium" id={`${area.id}-title`}>
          {area.title}
        </Heading>
        <Text>{area.description}</Text>
        <Text size="caption" className="demo-note">
          {area.note}
        </Text>
        {area.link && (
          <LinkButton
            variant="text"
            href={area.link.href}
            className="impact-card__link"
          >
            {area.link.label}
            <Arrow direction="right" />
          </LinkButton>
        )}
      </div>
    </article>
  );
}

export function ImpactAreasSection() {
  const content = homeContent.areas;
  return (
    <Section
      id="impact-areas"
      className="areas-section"
      aria-labelledby="areas-title"
    >
      <Container width="wide">
        <div className="section-intro">
          <div>
            <div className="section-chapter-tag" aria-hidden="true">
              03 / 07 · CORE FOCUS AREAS
            </div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <Heading id="areas-title" size="large">
              {content.heading}
            </Heading>
          </div>
          <Text size="large" className="section-intro__lead">
            {content.description}
          </Text>
        </div>
        <div className="impact-areas">
          {content.items.map((area, index) => (
            <ImpactArea key={area.id} area={area} order={index} />
          ))}
        </div>
        <nav className="focus-area-directory" aria-label="SEVA focus areas">
          <p className="eyebrow focus-area-directory__label">
            Explore all seven focus areas
          </p>
          <ul>
            {focusAreas.map((area, index) => (
              <li key={area.id}>
                <Link href={`/programmes/${area.id}`}>
                  <span
                    className="focus-area-directory__number"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{area.title}</span>
                  <Arrow direction="right" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
