import { homeContent } from "@/content/home";
import { getMediaAsset } from "@/content/media";
import { Container, Section } from "@/components/ui/layout";
import { Heading } from "@/components/ui/typography";
import { HomeHeroCarousel, type HomeHeroSlide } from "./home-hero-carousel";

const homepageHeroAssetIds = [
  "vidhya-jyothi-distribution",
  "tuition-vidyarambham-initiation",
  "housing-project-paderu",
];

const heroSlides: HomeHeroSlide[] = homepageHeroAssetIds.flatMap((id) => {
  const asset = getMediaAsset(id);
  if (
    !asset ||
    asset.approvalStatus !== "approved_for_publication" ||
    asset.width <= asset.height ||
    (asset.aspectRatio !== "landscape" && asset.aspectRatio !== "cinematic")
  ) {
    return [];
  }
  return [
    {
      id: asset.id,
      src: asset.publicUrl,
      alt: asset.altText,
      category: asset.programmeAssociation,
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
      <Container width="wide" className="home-hero__container">
        <div className="home-hero__grid">
          <div className="home-hero__copy">
            <Heading as="h1" size="display" id="intro-title">
              <span>{content.headline.opening}</span>{" "}
              <em>{content.headline.emphasis}</em>{" "}
              <span>{content.headline.ending}</span>
            </Heading>
          </div>
        </div>
      </Container>
      <HomeHeroCarousel slides={heroSlides} />
    </Section>
  );
}
