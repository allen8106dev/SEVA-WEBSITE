/**
 * News and Events Content Model for SEVA Social Service Society.
 *
 * Sourced directly from official organizational reporting.
 * Designed for future CMS integration and strict publication safeguards.
 * Fictional news stories and speculative event schedules are strictly prohibited.
 */

import { mediaRegistry, type ProgrammeAssociation } from "./media";

export type NewsCategory = "news" | "event" | "programme-update";

export type NewsPublicationStatus =
  "approved_for_publication" | "draft" | "archived";

export interface NewsArticleRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: readonly string[];
  category: NewsCategory;
  eventDate?: string;
  publishedDate: string;
  location?: string;
  featuredMediaAssetId?: string;
  relatedProgramme?: ProgrammeAssociation;
  relatedProgrammeHref?: string;
  publicationStatus: NewsPublicationStatus;
  author?: string;
  metaDescription?: string;
}

/**
 * Official registry of news articles and event dispatches.
 * At this phase, no official press releases, event announcements, or news articles
 * have been formally approved for publication by the SEVA directorate.
 * To prevent misinformation, no simulated or fictional articles are published.
 */
export const newsArticles: readonly NewsArticleRecord[] = [];

/**
 * Retrieve all approved news articles for public listing.
 */
export function getApprovedNewsArticles(): readonly NewsArticleRecord[] {
  return newsArticles.filter(
    (article) => article.publicationStatus === "approved_for_publication",
  );
}

/**
 * Retrieve an approved article by its unique slug.
 */
export function getNewsArticleBySlug(
  slug: string,
): NewsArticleRecord | undefined {
  return getApprovedNewsArticles().find((article) => article.slug === slug);
}

/**
 * Retrieve approved articles by category.
 */
export function getApprovedArticlesByCategory(
  category: NewsCategory,
): readonly NewsArticleRecord[] {
  return getApprovedNewsArticles().filter(
    (article) => article.category === category,
  );
}

/**
 * Check if a given slug corresponds to an approved news article.
 */
export function isNewsArticleSlug(slug: string): boolean {
  return Boolean(getNewsArticleBySlug(slug));
}

/** Resolve imagery through publication approval rather than an arbitrary URL. */
export function getNewsFeaturedImage(article: NewsArticleRecord) {
  return mediaRegistry.find(
    (asset) =>
      asset.id === article.featuredMediaAssetId &&
      asset.approvalStatus === "approved_for_publication" &&
      Boolean(asset.publicUrl),
  );
}
