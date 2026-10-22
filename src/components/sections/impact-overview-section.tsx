import { homeContent } from "@/content/home";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { EditorialCard } from "@/components/ui/editorial-card";
import { Statistics } from "@/components/ui/statistics";

export function ImpactOverviewSection() {
  const content = homeContent.overview;
  return (
    <Section
      id="website-status"
      className="overview-section"
      aria-labelledby="overview-title"
    >
      <Container width="wide">
        <div className="section-intro">
          <div>
            <div className="section-chapter-tag" aria-hidden="true">
              05 / 07 · TRANSPARENCY
            </div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <Heading id="overview-title" size="large">
              {content.heading}
            </Heading>
          </div>
          <Text size="large" className="section-intro__lead">
            {content.description}
          </Text>
        </div>
        <div className="statistics-wrapper">
          <Statistics items={content.statistics} />
        </div>
        <EditorialCard labelledBy="development-title">
          <div className="transparency-card-header">
            <span className="transparency-pill" aria-hidden="true">
              STATUS DISCLOSURE
            </span>
            <Eyebrow id="development-title">{content.noticeTitle}</Eyebrow>
          </div>
          <Text size="caption">{content.notice}</Text>
        </EditorialCard>
      </Container>
    </Section>
  );
}
