import { homeContent } from "@/content/home";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/animations/reveal";
import { HomepageMedia } from "@/components/ui/homepage-media";
import { ImageMaskReveal } from "@/components/animations/image-mask-reveal";

export function PurposeSection() {
  const content = homeContent.purpose;
  return (
    <Section
      id="purpose"
      className="purpose-section"
      aria-labelledby="purpose-title"
    >
      <Container width="wide">
        <div className="purpose-composition">
          <div className="purpose-copy">
            <div className="purpose-eyebrow-row">
              <span className="section-chapter-tag" aria-hidden="true">
                02 / 07 · VISION & MISSION
              </span>
              <Eyebrow className="purpose-eyebrow">{content.eyebrow}</Eyebrow>
            </div>
            <Reveal variant="statement">
              <Heading
                id="purpose-title"
                size="large"
                className="purpose-heading"
              >
                {content.heading}
              </Heading>
            </Reveal>
            <div className="purpose-notes">
              <Text size="large" className="purpose-lead">
                {content.description}
              </Text>
              <Text size="caption" className="purpose-disclaimer">
                {content.note}
              </Text>
            </div>
          </div>
          {content.media && (
            <div className="purpose-media-col">
              <ImageMaskReveal>
                <div className="purpose-media-frame">
                  <HomepageMedia
                    media={content.media}
                    className="purpose-media"
                    sizes="(min-width: 768px) 46vw, 100vw"
                  />
                  <div className="purpose-stamp" aria-hidden="true">
                    LOVE IN ACTION
                  </div>
                </div>
              </ImageMaskReveal>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
