import { homeContent } from "@/content/home";
import { Container, EditorialGrid, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Arrow, LinkButton } from "@/components/ui/button";
import { HomepageMedia } from "@/components/ui/homepage-media";
import { HeroScroll } from "@/components/animations/hero-scroll";
import { Marquee } from "@/components/animations/marquee";

export function HeroSection() {
  const content = homeContent.hero;
  return (
    <Section
      id="introduction"
      className="home-hero"
      aria-labelledby="intro-title"
    >
      <HeroScroll>
        <Container width="wide">
          <EditorialGrid className="home-hero__grid">
            <div className="home-hero__copy">
              <div className="hero-badge-row">
                <span className="hero-pill hero-pill--coral">
                  <span className="status-dot" aria-hidden="true" />
                  <span>LOVE IN ACTION</span>
                </span>
                <span className="hero-pill hero-pill--dark">
                  EST. 2015 · REGISTERED SOCIETY
                </span>
              </div>
              <Eyebrow className="hero-kicker">{content.eyebrow}</Eyebrow>
              <Heading as="h1" size="display" id="intro-title">
                <span>{content.headline.opening}</span>{" "}
                <em>{content.headline.emphasis}</em>{" "}
                <span>{content.headline.ending}</span>
              </Heading>
              <Text size="large" className="hero-copy">
                {content.description}
              </Text>
              <div className="hero-actions">
                <LinkButton
                  href={content.primary.href}
                  className="button--punchy"
                >
                  {content.primary.label}
                  <Arrow direction="down" />
                </LinkButton>
                <LinkButton
                  variant="secondary"
                  href={content.secondary.href}
                  className="button--hero-secondary"
                >
                  {content.secondary.label}
                </LinkButton>
              </div>
              <div className="hero-meta-strip">
                <Text size="caption" className="hero-footnote">
                  <span className="status-dot" aria-hidden="true" />
                  {content.notice}
                </Text>
                <span className="hero-geo-tag" aria-hidden="true">
                  CHAPTER 01 / 07
                </span>
              </div>
            </div>
            <div className="hero-media-col">
              <div className="hero-media-frame-wrapper">
                <div className="hero-media-entrance">
                  <HomepageMedia
                    className="home-hero__media"
                    media={content.media}
                    preload
                    sizes="(min-width: 768px) 46vw, 100vw"
                  />
                </div>
                <div className="hero-photo-badge" aria-hidden="true">
                  <span className="hero-photo-badge__number">01</span>
                  <span className="hero-photo-badge__text">
                    DOCUMENTARY
                    <br />
                    MOMENT
                  </span>
                </div>
              </div>
            </div>
          </EditorialGrid>
          <div className="hero-baseline">
            <span className="eyebrow hero-baseline__tagline">
              Maharashtra · Tamil Nadu · Andhra Pradesh
            </span>
            <a className="nav-link hero-baseline__link" href="#purpose">
              Continue the story <Arrow direction="down" />
            </a>
          </div>
        </Container>
      </HeroScroll>
      <Marquee className="hero-marquee">
        <span className="hero-marquee__item">LOVE IN ACTION</span>
        <span className="hero-marquee__sep">✦</span>
        <span className="hero-marquee__item">SEVA SOCIAL SERVICE SOCIETY</span>
        <span className="hero-marquee__sep">✦</span>
        <span className="hero-marquee__item">RESTORING DIGNITY</span>
        <span className="hero-marquee__sep">✦</span>
        <span className="hero-marquee__item">SUSTAINABLE DEVELOPMENT</span>
        <span className="hero-marquee__sep">✦</span>
        <span className="hero-marquee__item">EST. 2015</span>
        <span className="hero-marquee__sep">✦</span>
        <span className="hero-marquee__item">EDUCATION & HEALTHCARE</span>
        <span className="hero-marquee__sep">✦</span>
        <span className="hero-marquee__item">WOMEN EMPOWERMENT</span>
        <span className="hero-marquee__sep">✦</span>
      </Marquee>
    </Section>
  );
}
