import { getNewsFeaturedImage } from "@/content/news";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { Heading } from "@/components/ui/typography";
import type { NewsArticleRecord } from "@/content/news";

interface NewsArticlePageProps {
  article: NewsArticleRecord;
}

export function NewsArticlePage({ article }: NewsArticlePageProps) {
  const featuredImage = getNewsFeaturedImage(article);
  return (
    <article className="news-article-page" aria-labelledby="article-heading">
      {/* Article Hero */}
      <header className="news-article-hero">
        <Container width="standard">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/media">Media</Link>
              </li>
              <li>
                <Link href="/media/news-events">News &amp; Events</Link>
              </li>
              <li>
                <span aria-current="page">{article.title}</span>
              </li>
            </ol>
          </nav>

          <div className="news-article-meta-header">
            <span className="news-article-badge">{article.category}</span>
            <time
              dateTime={article.publishedDate}
              className="news-article-date"
            >
              Published:{" "}
              {new Date(article.publishedDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Kolkata",
              })}
            </time>
            {article.eventDate && (
              <span className="news-article-event-date">
                Event Date: {article.eventDate}
              </span>
            )}
            {article.location && (
              <span className="news-article-location">
                📍 {article.location}
              </span>
            )}
          </div>

          <Heading
            as="h1"
            size="display"
            id="article-heading"
            className="news-article-title"
          >
            {article.title}
          </Heading>

          <p className="news-article-summary">{article.summary}</p>
        </Container>
      </header>

      {/* Featured Photography */}
      {featuredImage && (
        <div className="news-article-featured-media">
          <Container width="wide">
            <figure className="news-article-figure">
              <Image
                src={featuredImage.publicUrl}
                alt={featuredImage.altText}
                width={featuredImage.width}
                height={featuredImage.height}
                className="news-article-img"
                priority
              />
              {featuredImage.caption && (
                <figcaption className="news-article-caption">
                  {featuredImage.caption}
                </figcaption>
              )}
            </figure>
          </Container>
        </div>
      )}

      {/* Article Content */}
      <div className="news-article-body">
        <Container width="standard">
          <div className="news-article-prose">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Related Programme Link if defined */}
          {article.relatedProgramme && (
            <aside className="news-article-programme-card">
              <div className="news-article-programme-content">
                <span className="news-article-programme-eyebrow">
                  RELATED SEVA PROGRAMME
                </span>
                <h3>{article.relatedProgramme}</h3>
                <p>
                  Learn more about the ongoing initiatives, operational metrics,
                  and field teams driving this programme.
                </p>
                {article.relatedProgrammeHref && (
                  <Link
                    href={article.relatedProgrammeHref}
                    className="button button--secondary"
                  >
                    Explore Programme Details →
                  </Link>
                )}
              </div>
            </aside>
          )}

          {/* Back Navigation */}
          <footer className="news-article-footer">
            <Link href="/media/news-events" className="news-article-back-link">
              ← Back to News &amp; Events Archive
            </Link>
          </footer>
        </Container>
      </div>
    </article>
  );
}
