import { homeContent } from "@/content/home";
import { getMediaAsset } from "@/content/media";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Arrow, LinkButton } from "@/components/ui/button";
import { Marquee } from "@/components/animations/marquee";
import { HomeHeroCarousel, type HomeHeroSlide } from "./home-hero-carousel";

const homepageHeroAssetIds = [
  "ruby-meals-service",
  "vidhya-jyothi-sisters",
  "housing-project-paderu",
];

const heroSlides: HomeHeroSlide[] = homepageHeroAssetIds.flatMap((id) => {
  const asset = getMediaAsset(id);
  if (!asset || asset.approvalStatus !== "approved_for_publication") return [];
  return [
    {
      id: asset.id,
      src: asset.publicUrl,
      alt: asset.altText,
      caption: asset.caption,
      category: asset.category,
      focalPoint: asset.focalPoint,
    },
  ];
});

export function HeroSection() {
  const content = homeContent.hero;
  return (
    <Section
      id="introduction"
      className="home-hero"
      aria-labelledby="intro-title"
    >
      <Container width="wide">
        <div className="home-hero__grid">
          <div className="home-hero__copy">
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
            <p className="hero-footnote">{content.notice}</p>
          </div>
          <HomeHeroCarousel slides={heroSlides} />
        </div>
        <div className="hero-baseline">
          <span className="eyebrow hero-baseline__tagline">
            Maharashtra · Tamil Nadu · Andhra Pradesh
          </span>
          <a className="nav-link hero-baseline__link" href="#purpose">
            Continue the story <Arrow direction="down" />
          </a>
        </div>
      </Container>
      <Marquee className="hero-marquee">
        <span className="hero-marquee__item">LOVE IN ACTION</span>
        <span className="hero-marquee__sep" aria-hidden="true">
          ✦
        </span>
        <span className="hero-marquee__item">SEVA SOCIAL SERVICE SOCIETY</span>
        <span className="hero-marquee__sep" aria-hidden="true">
          ✦
        </span>
        <span className="hero-marquee__item">RESTORING DIGNITY</span>
        <span className="hero-marquee__sep" aria-hidden="true">
          ✦
        </span>
        <span className="hero-marquee__item">SUSTAINABLE DEVELOPMENT</span>
        <span className="hero-marquee__sep" aria-hidden="true">
          ✦
        </span>
        <span className="hero-marquee__item">EST. 2015</span>
        <span className="hero-marquee__sep" aria-hidden="true">
          ✦
        </span>
        <span className="hero-marquee__item">EDUCATION & HEALTHCARE</span>
        <span className="hero-marquee__sep" aria-hidden="true">
          ✦
        </span>
        <span className="hero-marquee__item">WOMEN EMPOWERMENT</span>
        <span className="hero-marquee__sep" aria-hidden="true">
          ✦
        </span>
      </Marquee>
    </Section>
  );
}
