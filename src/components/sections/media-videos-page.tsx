import { mediaPageContent } from "@/content/media-pages";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/layout/interior-page";
import type { NavigationItem } from "@/config/navigation";
import { getApprovedVideos } from "@/content/videos";
import { VideoPlayer } from "@/components/ui/video-player";

export function MediaVideosPage({ item }: { item: NavigationItem }) {
  const approvedVideos = getApprovedVideos();

  return (
    <div className="media-page media-videos-page">
      {/* Editorial Hero */}
      <section
        className="media-hero media-hero--videos"
        aria-labelledby="videos-page-title"
      >
        <Container width="wide">
          <Breadcrumbs item={item} />
          <div className="media-hero__header">
            <span className="media-badge">
              MOTION &amp; VOICE · DOCUMENTARY ARCHIVE
            </span>
            <Eyebrow>Grassroots Voices &amp; Field Documentaries</Eyebrow>
            <Heading
              as="h1"
              size="display"
              id="videos-page-title"
              className="media-hero__title"
            >
              Official Video <em className="accent-blue">Archive</em>
            </Heading>
            <Text size="large" className="media-hero__intro">
              {mediaPageContent.videoIntro}
            </Text>
          </div>
        </Container>
      </section>

      {/* Video Content Grid or Intentional Empty State */}
      <section
        className="media-videos-content-section"
        aria-label="Video archive catalog"
      >
        <Container width="wide">
          {approvedVideos.length > 0 ? (
            <div className="media-videos-grid">
              {approvedVideos.map((video) => (
                <VideoPlayer key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="media-empty-state media-empty-state--videos">
              <div className="media-empty-state__icon-wrap" aria-hidden="true">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>

              <div className="media-empty-state__content">
                <span className="media-empty-state__badge">VIDEO ARCHIVE</span>
                <Heading
                  as="h2"
                  size="display"
                  className="media-empty-state__title"
                >
                  Documentary Video Archive{" "}
                  <em className="accent-coral">Awaiting approved videos</em>
                </Heading>
                <p className="media-empty-state__description">
                  {mediaPageContent.videoEmpty}
                </p>
                <div className="media-empty-state__actions">
                  <Link
                    href="/media/gallery"
                    className="button button--primary"
                  >
                    Explore Verified Photo Gallery →
                  </Link>
                  <Link href="/programmes" className="button button--secondary">
                    View SEVA Core Programmes
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
