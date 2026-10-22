import { homeContent } from "@/content/home";
import { Container, EditorialGrid, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Arrow, LinkButton } from "@/components/ui/button";

export function ParticipationSection() {
  const content = homeContent.participation;
  return (
    <Section
      id="participation"
      className="participation-section"
      aria-labelledby="participation-title"
    >
      <Container width="wide">
        <EditorialGrid className="participation-grid">
          <div className="participation-copy">
            <div
              className="section-chapter-tag section-chapter-tag--coral"
              aria-hidden="true"
            >
              06 / 07 · ACTION & ENGAGEMENT
            </div>
            <Eyebrow className="participation-eyebrow">
              {content.eyebrow}
            </Eyebrow>
            <Heading
              id="participation-title"
              size="large"
              className="participation-heading"
            >
              {content.heading}
            </Heading>
            <Text size="large" className="participation-description">
              {content.description}
            </Text>
            <div className="participation-cta-wrapper">
              <LinkButton
                variant="secondary"
                href={content.action.href}
                className="button--participation"
              >
                {content.action.label}
                <Arrow direction="right" />
              </LinkButton>
            </div>
          </div>
          <ul className="participation-options">
            {content.options.map((option, index) => (
              <li key={option.title} className="participation-card">
                <div className="participation-card__top">
                  <span className="participation-card__num" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="option-status">{option.status}</span>
                </div>
                <Heading
                  as="h3"
                  size="small"
                  className="participation-card__title"
                >
                  {option.title}
                </Heading>
                <Text size="caption" className="participation-card__desc">
                  {option.description}
                </Text>
              </li>
            ))}
          </ul>
        </EditorialGrid>
      </Container>
    </Section>
  );
}
