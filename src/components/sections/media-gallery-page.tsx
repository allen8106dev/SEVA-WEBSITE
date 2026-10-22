import { mediaPageContent } from "@/content/media-pages";
import { Container } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/layout/interior-page";
import type { NavigationItem } from "@/config/navigation";
import { projects } from "@/content/projects";
import { getProjectAssets } from "@/content/route-media";
import { getGalleryAssets } from "@/content/route-media";
import { MediaGalleryClient } from "./media-gallery-client";

export function MediaGalleryPage({ item }: { item: NavigationItem }) {
  const assets = getGalleryAssets();

  return (
    <div className="media-page media-gallery-page">
      {/* Editorial Hero */}
      <section
        className="media-hero media-hero--gallery"
        aria-labelledby="gallery-page-title"
      >
        <Container width="wide">
          <Breadcrumbs item={item} />
          <div className="media-hero__header">
            <span className="media-badge">
              DOCUMENTARY EXHIBITION · VERIFIED ARCHIVE
            </span>
            <Eyebrow>Field Photography from Grassroots India</Eyebrow>
            <Heading
              as="h1"
              size="display"
              id="gallery-page-title"
              className="media-hero__title"
            >
              Visual Chronicles of{" "}
              <em className="accent-yellow">Love In Action</em>
            </Heading>
            <Text size="large" className="media-hero__intro">
              Explore authentic documentary photography capturing SEVA Social
              Service Society&apos;s grassroots initiatives. Each image is
              sourced directly from SEVA programme archives, chronicling
              education programmes, hot meal nutrition distributions, and tribal
              housing projects across Maharashtra, Andhra Pradesh, and
              Telangana.
            </Text>
          </div>
        </Container>
      </section>

      {/* Interactive Gallery with Client-Side Filtering and Lightbox */}
      <section
        className="media-gallery-interactive-section"
        aria-label="Interactive photo gallery"
      >
        <Container width="wide">
          <MediaGalleryClient
            initialAssets={assets}
            projectFilters={projects
              .map((project) => ({
                id: project.id,
                label: project.name,
                assetIds: getProjectAssets(project).map((asset) => asset.id),
              }))
              .filter((project) => project.assetIds.length > 0)}
          />
        </Container>
      </section>

      {/* Gallery Editorial Footer Notice */}
      <section
        className="media-gallery-footer-notice"
        aria-label="Gallery archival policies"
      >
        <Container width="standard">
          <aside className="media-archival-note">
            <h2>About this archive</h2>
            <p>{mediaPageContent.archiveNotice}</p>
          </aside>
        </Container>
      </section>
    </div>
  );
}
