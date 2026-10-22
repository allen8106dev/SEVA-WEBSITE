import { mediaPageContent } from "@/content/media-pages";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/layout/interior-page";
import type { NavigationItem } from "@/config/navigation";
import { getNewsFeaturedImage, getApprovedNewsArticles } from "@/content/news";

export function MediaNewsPage({ item }: { item: NavigationItem }) {
  const articles = getApprovedNewsArticles();

  return (
    <div className="media-page media-news-page">
      {/* Editorial Hero */}
      <section
        className="media-hero media-hero--news"
        aria-labelledby="news-page-title"
      >
        <Container width="wide">
          <Breadcrumbs item={item} />
          <div className="media-hero__header">
            <span className="media-badge">
              COMMUNITY DISPATCHES · OFFICIAL ANNOUNCEMENTS
            </span>
            <Eyebrow>Press Releases, Event Reports &amp; Field Updates</Eyebrow>
            <Heading
              as="h1"
              size="display"
              id="news-page-title"
              className="media-hero__title"
            >
              News &amp; <em className="accent-coral">Events Archive</em>
            </Heading>
            <Text size="large" className="media-hero__intro">
              {mediaPageContent.newsIntro}
            </Text>
          </div>
        </Container>
      </section>

      {/* Archive Listing or Honest Empty State */}
      <section
        className="media-news-content-section"
        aria-label="News and event archive"
      >
        <Container width="wide">
          {articles.length > 0 ? (
            <div className="media-news-grid">
              {articles.map((article) => {
                const featuredImage = getNewsFeaturedImage(article);
                return (
                  <article key={article.id} className="media-news-card">
                    {featuredImage && (
                      <div className="media-news-card__media">
                        <Image
                          src={featuredImage.publicUrl}
                          alt={featuredImage.altText}
                          width={featuredImage.width}
                          height={featuredImage.height}
                          className="media-news-card__img"
                        />
                      </div>
                    )}
                    <div className="media-news-card__body">
                      <div className="media-news-card__meta">
                        <span className="media-news-card__cat">
                          {article.category}
                        </span>
                        <time
                          dateTime={article.publishedDate}
                          className="media-news-card__date"
                        >
                          {new Date(article.publishedDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              timeZone: "Asia/Kolkata",
                            },
                          )}
                        </time>
                      </div>
                      <h2 className="media-news-card__title">
                        <Link href={`/media/news-events/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>
                      <p className="media-news-card__summary">
                        {article.summary}
                      </p>
                      <Link
                        href={`/media/news-events/${article.slug}`}
                        className="media-news-card__cta"
                      >
                        Read full dispatch <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="media-empty-state media-empty-state--news">
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
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>

              <div className="media-empty-state__content">
                <span className="media-empty-state__badge">NEWS & EVENTS</span>
                <Heading
                  as="h2"
                  size="display"
                  className="media-empty-state__title"
                >
                  Official Dispatches{" "}
                  <em className="accent-yellow">Awaiting approved articles</em>
                </Heading>
                <p className="media-empty-state__description">
                  {mediaPageContent.newsEmpty}
                </p>

                <div className="media-empty-state__actions">
                  <Link
                    href="/media/gallery"
                    className="button button--primary"
                  >
                    Browse Verified Field Photography →
                  </Link>
                  <Link href="/programmes" className="button button--secondary">
                    Explore SEVA Core Programmes
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
