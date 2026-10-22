import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Arrow, LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container>
      <Section className="not-found">
        <Eyebrow>Page not found</Eyebrow>
        <Heading as="h1">A different way forward.</Heading>
        <Text>We couldn’t find the page you’re looking for.</Text>
        <LinkButton href="/" variant="secondary">
          Return to SEVA <Arrow direction="right" />
        </LinkButton>
      </Section>
    </Container>
  );
}
