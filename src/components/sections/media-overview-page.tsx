import { mediaPageContent } from "@/content/media-pages";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/layout/interior-page";
import { SplitReveal } from "@/components/animations/split-reveal";
import { Reveal } from "@/components/animations/reveal";
import { ImageMaskReveal } from "@/components/animations/image-mask-reveal";
import type { NavigationItem } from "@/config/navigation";
import { getGalleryAssets } from "@/content/route-media";

export function MediaOverviewPage({ item }: { item: NavigationItem }) {
  const galleryAssets = getGalleryAssets();
  const highlightAssets = galleryAssets.slice(0, 4);

  return (
    <div className="media-page media-overview-page">
      {/* Editorial Hero */}
      <section className="media-hero" aria-labelledby="media-overview-heading">
        <Container width="wide">
          <Breadcrumbs item={item} />
          <div className="media-hero__grid">
            <div className="media-hero__content">
              <span className="media-badge">
                DOCUMENTARY ARCHIVE · LOVE IN ACTION
              </span>
              <Eyebrow>Witnessing Grassroots Transformation</Eyebrow>
              <h1 id="media-overview-heading" className="media-hero__title">
                <SplitReveal text="Documenting Hope." />{" "}
                <em className="media-hero__em">Sharing Truth.</em>
              </h1>
              <Text size="large" className="media-hero__intro">
                {mediaPageContent.overviewIntro}
              </Text>
              <div className="media-hero__actions">
                <Link
                  href="/media/gallery"
                  className="button button--primary media-hero__cta"
                >
                  Explore Photo Gallery ({galleryAssets.length} Photos)
                </Link>
                <Link
                  href="/media/news-events"
                  className="button button--secondary media-hero__cta"
                >
                  View News & Dispatches
                </Link>
              </div>
            </div>

            <div className="media-hero__visual">
              {highlightAssets[0] && (
                <div className="media-hero__spotlight">
                  <ImageMaskReveal>
                    <Image
                      src={highlightAssets[0].publicUrl}
                      alt={highlightAssets[0].altText}
                      width={highlightAssets[0].width}
                      height={highlightAssets[0].height}
                      className="media-hero__img"
                      priority
                    />
                  </ImageMaskReveal>
                  <p className="media-hero__spotlight-caption">
                    <span className="media-hero__spotlight-programme">
                      {highlightAssets[0].programmeAssociation}
                    </span>{" "}
                    — {highlightAssets[0].caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Primary Section Pathways */}
      <section
        className="media-pathways-section"
        aria-labelledby="pathways-heading"
      >
        <Container width="wide">
          <div className="media-section-header">
            <span className="media-section-badge">SECTIONS & DESTINATIONS</span>
            <Heading as="h2" size="display" id="pathways-heading">
              Explore the <em className="accent-coral">Media Archive</em>
            </Heading>
            <Text size="regular" className="media-section-sub">
              Access curated visual documentation, project collages, field
              recordings, and official updates.
            </Text>
          </div>

          <div className="media-pathways-grid">
            {/* Pathway 1: Photo Gallery */}
            <article className="media-pathway-card media-pathway-card--gallery">
              <div className="media-pathway-card__header">
                <span className="media-pathway-card__tag">
                  {galleryAssets.length} Approved Photographs
                </span>
                <span className="media-pathway-card__status media-pathway-card__status--live">
                  Active Gallery
                </span>
              </div>
              <h3 className="media-pathway-card__title">
                <Link href="/media/gallery">Documentary Photo Gallery</Link>
              </h3>
              <p className="media-pathway-card__desc">
                High-resolution field photography covering educational
                distributions, daily nutritional outreach, tribal housing
                construction, and foundational learning centres across
                Maharashtra, Andhra Pradesh, and Telangana.
              </p>
              <div
                className="media-pathway-card__thumbnails"
                aria-hidden="true"
              >
                {galleryAssets.slice(0, 3).map((asset) => (
                  <div key={asset.id} className="media-pathway-card__thumb">
                    <Image
                      src={asset.publicUrl}
                      alt=""
                      width={200}
                      height={140}
                      className="media-pathway-card__thumb-img"
                    />
                  </div>
                ))}
              </div>
              <Link href="/media/gallery" className="media-pathway-card__link">
                Browse Photo Gallery <span aria-hidden="true">→</span>
              </Link>
            </article>

            {/* Pathway 2: Videos */}
            <article className="media-pathway-card media-pathway-card--videos">
              <div className="media-pathway-card__header">
                <span className="media-pathway-card__tag">Video Archive</span>
                <span className="media-pathway-card__status media-pathway-card__status--notice">
                  Awaiting approved videos
                </span>
              </div>
              <h3 className="media-pathway-card__title">
                <Link href="/media/videos">
                  Official Videos & Documentaries
                </Link>
              </h3>
              <p className="media-pathway-card__desc">
                {mediaPageContent.videoPathway}
              </p>
              <div className="media-pathway-card__preview-box">
                <div className="media-pathway-card__icon" aria-hidden="true">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="media-pathway-card__preview-note">
                  Video archive
                </span>
              </div>
              <Link href="/media/videos" className="media-pathway-card__link">
                Explore Video Archive <span aria-hidden="true">→</span>
              </Link>
            </article>

            {/* Pathway 3: News & Events */}
            <article className="media-pathway-card media-pathway-card--news">
              <div className="media-pathway-card__header">
                <span className="media-pathway-card__tag">News & Events</span>
                <span className="media-pathway-card__status media-pathway-card__status--notice">
                  Awaiting approved articles
                </span>
              </div>
              <h3 className="media-pathway-card__title">
                <Link href="/media/news-events">Community News & Events</Link>
              </h3>
              <p className="media-pathway-card__desc">
                {mediaPageContent.newsPathway}
              </p>
              <div className="media-pathway-card__preview-box">
                <div className="media-pathway-card__icon" aria-hidden="true">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <span className="media-pathway-card__preview-note">
                  News and event archive
                </span>
              </div>
              <Link
                href="/media/news-events"
                className="media-pathway-card__link"
              >
                View News & Events <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </Container>
      </section>

      {/* Curated Highlights Showcase */}
      <section
        className="media-highlights-section"
        aria-labelledby="highlights-heading"
      >
        <Container width="wide">
          <div className="media-highlights-header">
            <div>
              <span className="media-section-badge">CURATED EXHIBITION</span>
              <Heading as="h2" size="display" id="highlights-heading">
                Moments of <em className="accent-blue">Service & Dignity</em>
              </Heading>
            </div>
            <Link
              href="/media/gallery"
              className="button button--secondary media-highlights-all-btn"
            >
              View All {galleryAssets.length} Photographs →
            </Link>
          </div>

          <div className="media-highlights-mosaic">
            {galleryAssets.slice(0, 4).map((asset, idx) => (
              <figure
                key={asset.id}
                className={`media-highlight-item media-highlight-item--${idx}`}
              >
                <Reveal variant="media" order={idx}>
                  <div className="media-highlight-media">
                    <Image
                      src={asset.publicUrl}
                      alt={asset.altText}
                      width={asset.width}
                      height={asset.height}
                      className="media-highlight-img"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="media-highlight-overlay">
                      <span className="media-highlight-prog">
                        {asset.programmeAssociation}
                      </span>
                    </div>
                  </div>
                  <figcaption className="media-highlight-caption">
                    <strong>{asset.caption}</strong>
                    <span className="media-highlight-cat">
                      {asset.category}
                    </span>
                  </figcaption>
                </Reveal>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Media Ethics & Governance Safeguard Notice */}
      <section
        className="media-ethics-section"
        aria-label="Media publication safeguards"
      >
        <Container width="standard">
          <div className="media-ethics-card">
            <span className="media-ethics-icon" aria-hidden="true">
              🛡️
            </span>
            <div className="media-ethics-content">
              <h3>About the photographs</h3>
              <p>{mediaPageContent.archiveNotice}</p>
              <p className="media-ethics-cite">
                SEVA Social Service Society - Love In Action
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
