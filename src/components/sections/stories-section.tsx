import { homeContent } from "@/content/home";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { HomepageMedia } from "@/components/ui/homepage-media";
import { Arrow, LinkButton } from "@/components/ui/button";
import { ScrollMedia } from "@/components/animations/scroll-media";
import { Reveal } from "@/components/animations/reveal";

export function StoriesSection() {
  const content = homeContent.story;
  return (
    <Section
      id="stories"
      className="stories-section"
      aria-labelledby="stories-title"
    >
      <Container width="wide">
        <div
          className="section-chapter-tag section-chapter-tag--dark"
          aria-hidden="true"
        >
          04 / 07 · INITIATIVES IN FOCUS
        </div>
        <Eyebrow className="stories-eyebrow">{content.eyebrow}</Eyebrow>
        <div className="story-layout">
          <Reveal variant="media">
            <div className="story-frame-outer">
              <ScrollMedia mediaKind={content.media.kind}>
                <HomepageMedia
                  media={content.media}
                  sizes="(min-width: 768px) 58vw, 100vw"
                />
              </ScrollMedia>
              <div className="story-soundwave-tag" aria-hidden="true">
                <span className="soundwave-bar" />
                <span className="soundwave-bar" />
                <span className="soundwave-bar" />
                <span className="soundwave-bar" />
                <span>JEEVAN PROJECT · RAIGAD</span>
              </div>
            </div>
          </Reveal>
          <div className="story-copy">
            <span className="story-mark" aria-hidden="true">
              Grassroots
              <br />
              Dignity.
            </span>
            <Heading id="stories-title" size="medium">
              {content.heading}
            </Heading>
            <Text>{content.description}</Text>
            <Text size="caption" className="demo-note">
              {content.note}
            </Text>
            {content.link && (
              <LinkButton variant="text" href={content.link.href}>
                {content.link.label}
                <Arrow direction="right" />
              </LinkButton>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
