import Link from "next/link";
import { homeContent, type ImpactAreaContent } from "@/content/home";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
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
  const numberStr =
    area.number ??
    area.category?.match(/Focus Area (\d+)/)?.[1] ??
    String(order + 1).padStart(2, "0");

  return (
    <article
      className={`impact-area impact-area--${area.accent ?? "green"} impact-card-vibrant`}
      aria-labelledby={`${area.id}-title`}
    >
      <Link
        href={`/programmes/${area.id}`}
        className="impact-area__link"
        aria-labelledby={`${area.id}-title`}
      >
        <div className="impact-card-vibrant__header">
          <span className="impact-card-vibrant__num" aria-hidden="true">
            {numberStr}
          </span>
        </div>
        <Reveal variant="media" order={order}>
          <div className="impact-media-wrapper">
            <HomepageMedia
              media={area.media}
              sizes="(min-width: 75rem) 28vw, (min-width: 48rem) 44vw, 90vw"
            />
          </div>
        </Reveal>
        <div className="impact-area__copy">
          <Heading as="h3" size="medium" id={`${area.id}-title`}>
            {area.title}
          </Heading>
          <Text>{area.description}</Text>
        </div>
      </Link>
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
        <div className="areas-section__heading">
          <Heading id="areas-title" size="large">
            {content.heading}
          </Heading>
          <LinkButton href="/programmes" className="areas-section__view-all">
            View all seven areas
            <Arrow direction="right" />
          </LinkButton>
        </div>
        <div className="impact-areas">
          {content.items.map((area, index) => (
            <ImpactArea key={area.id} area={area} order={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
