import { homeContent } from "@/content/home";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Statistics } from "@/components/ui/statistics";

export function PurposeSection() {
  const content = homeContent.purpose;
  return (
    <Section
      id="purpose"
      className="purpose-section"
      aria-labelledby="about-title"
    >
      <div className="purpose-section__main">
        <Container width="wide" className="purpose-container">
          <div className="purpose-layout">
            <article className="purpose-about">
              <Heading
                as="h2"
                id="about-title"
                size="large"
                className="purpose-title"
              >
                About
              </Heading>
              <Text>{content.about}</Text>
            </article>
            <div className="purpose-statements">
              <article className="purpose-card">
                <Heading as="h3" size="small">
                  Vision
                </Heading>
                <Text>{content.vision}</Text>
              </article>
              <article className="purpose-card">
                <Heading as="h3" size="small">
                  Mission
                </Heading>
                <Text>{content.mission}</Text>
              </article>
            </div>
          </div>
        </Container>
      </div>
      <div
        id="website-status"
        className="home-impact-statistics"
        role="group"
        aria-labelledby="impact-statistics-title"
      >
        <Container width="wide">
          <Heading as="h2" id="impact-statistics-title" className="sr-only">
            SEVA impact statistics
          </Heading>
          <Statistics items={homeContent.overview.statistics} presentation="compact" />
        </Container>
      </div>
    </Section>
  );
}
