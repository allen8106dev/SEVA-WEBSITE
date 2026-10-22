import Image from "next/image";
import { getMediaAsset } from "@/content/media";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/animations/reveal";
import { ScrollMedia } from "@/components/animations/scroll-media";

const storyAssetIds = [
  "collage-vidhya-jyothi",
  "collage-ruby-meals",
  "collage-housing-project",
];

const stories = storyAssetIds.flatMap((id) => {
  const asset = getMediaAsset(id);
  return asset?.approvalStatus === "approved_for_publication" ? [asset] : [];
});

export function StoriesSection() {
  return (
    <Section
      id="stories"
      className="stories-section"
      aria-labelledby="stories-title"
    >
      <Container width="wide">
        <Heading id="stories-title" size="large" className="stories-title">
          Our Stories
        </Heading>
        <div className="story-cards">
          {stories.map((story, index) => (
            <article className="story-card" key={story.id}>
              <Reveal variant="media" order={index}>
                <ScrollMedia mediaKind="image">
                  <figure className="story-card__figure">
                    <div className="story-card__image">
                      <Image
                        src={story.publicUrl}
                        alt={story.altText}
                        fill
                        sizes="(min-width: 75rem) 30vw, (min-width: 48rem) 45vw, 90vw"
                      />
                    </div>
                    <figcaption className="sr-only">{story.caption}</figcaption>
                  </figure>
                </ScrollMedia>
              </Reveal>
              <div className="story-card__copy story-copy">
                <Heading as="h3" size="medium">
                  {story.programmeAssociation}
                </Heading>
                <Text size="caption">{story.description}</Text>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
