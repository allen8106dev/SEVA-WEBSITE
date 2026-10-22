import { homeContent } from "@/content/home";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Arrow, LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { HomepageMedia } from "@/components/ui/homepage-media";
import { KineticClosing } from "@/components/animations/kinetic-closing";

export function ClosingSection() {
  const content = homeContent.closing;
  return (
    <Section
      id="next-chapter"
      className="closing-section"
      aria-labelledby="closing-title"
    >
      <KineticClosing>
        <Reveal variant="closing">
          <Container width="wide">
            <div className="closing-banner-kinetic" aria-hidden="true">
              <span className="closing-banner-kinetic__text">
                THE FUTURE IS COLLECTIVE · SEVA
              </span>
            </div>
            <div className="closing-wrapper">
              {content.media && (
                <div className="closing-media-col">
                  <div className="closing-photo-card">
                    <HomepageMedia
                      media={content.media}
                      className="closing-media"
                      sizes="(min-width: 768px) 46vw, 100vw"
                    />
                    <div className="closing-badge" aria-hidden="true">
                      <span>TOGETHER</span>
                      <span>CHAPTER 07</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="closing-content">
                <div
                  className="section-chapter-tag section-chapter-tag--closing"
                  aria-hidden="true"
                >
                  07 / 07 · CONCLUSION
                </div>
                <Eyebrow className="closing-eyebrow">{content.eyebrow}</Eyebrow>
                <Heading
                  id="closing-title"
                  size="large"
                  className="closing-heading"
                >
                  {content.heading}
                </Heading>
                <Text size="large" className="closing-lead">
                  {content.description}
                </Text>
                <div className="closing-action-wrapper">
                  <LinkButton
                    href={content.action.href}
                    className="button--closing"
                  >
                    {content.action.label}
                    <Arrow direction="up" />
                  </LinkButton>
                </div>
              </div>
            </div>
          </Container>
        </Reveal>
      </KineticClosing>
    </Section>
  );
}
