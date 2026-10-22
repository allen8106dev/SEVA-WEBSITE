import { test, expect } from "@playwright/test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  getApprovedNewsArticles,
  getNewsArticleBySlug,
  getNewsFeaturedImage,
  type NewsArticleRecord,
} from "../src/content/news";
import { getApprovedVideos, type VideoRecord } from "../src/content/videos";
import { VideoPlayer } from "../src/components/ui/video-player";
import { NewsArticlePage } from "../src/components/sections/news-article-page";

// Isolated rendering fixtures only: never added to the website's content registries.
const article: NewsArticleRecord = {
  id: "isolated-fixture",
  slug: "isolated-fixture",
  title: "Isolated article fixture",
  summary: "Fixture summary",
  content: ["Fixture paragraph"],
  category: "event",
  publishedDate: "2026-01-01",
  eventDate: "2026-01-02",
  publicationStatus: "draft",
  relatedProgramme: "Vidya Jyothi",
  relatedProgrammeHref: "/programmes/education",
  featuredMediaAssetId: "vidhya-jyothi-distribution",
};

test("empty public registries and approval-resolved article imagery", () => {
  expect(getApprovedNewsArticles()).toEqual([]);
  expect(getApprovedVideos()).toEqual([]);
  expect(getNewsArticleBySlug(article.slug)).toBeUndefined();
  expect(getNewsFeaturedImage(article)?.id).toBe(article.featuredMediaAssetId);
  expect(
    getNewsFeaturedImage({
      ...article,
      featuredMediaAssetId: "unknown-original",
    }),
  ).toBeUndefined();
});

test("article infrastructure renders dates, captions, body and full breadcrumbs", async ({
  page,
}) => {
  await page.setContent(
    renderToStaticMarkup(createElement(NewsArticlePage, { article })),
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    article.title,
  );
  await expect(page.locator('nav[aria-label="Breadcrumb"] li')).toHaveCount(4);
  await expect(page.locator("time").first()).toHaveAttribute(
    "datetime",
    article.publishedDate,
  );
  await expect(page.locator(".news-article-event-date")).toContainText(
    article.eventDate!,
  );
  await expect(page.locator(".news-article-prose")).toHaveText(
    article.content[0],
  );
  await expect(page.locator("figcaption")).toHaveText(
    getNewsFeaturedImage(article)!.caption,
  );
  await expect(
    page.getByRole("link", { name: /Explore Programme/ }),
  ).toHaveAttribute("href", article.relatedProgrammeHref!);
});

test("YouTube and hosted video fixtures render lightweight facades and transcripts without players", async ({
  page,
}) => {
  const details = {
    id: "fixture",
    slug: "fixture",
    title: "Isolated video fixture",
    description: "Fixture only",
    publicationStatus: "approved_for_publication" as const,
    publishedDate: "2026-01-01",
    hasTranscript: true,
    transcript: "Fixture transcript",
  };
  const records: VideoRecord[] = [
    { ...details, videoSource: "youtube", embedId: "fixture-id" },
    {
      ...details,
      videoSource: "self_hosted",
      videoUrl: "/fixture-only.mp4",
      captionTracks: [
        { src: "/fixture-only.vtt", language: "en", label: "English" },
      ],
    },
  ];
  for (const video of records) {
    const html = renderToStaticMarkup(createElement(VideoPlayer, { video }));
    await page.setContent(html);
    await expect(
      page.getByRole("button", { name: `Play video: ${video.title}` }),
    ).toBeVisible();
    await expect(page.locator("iframe, video")).toHaveCount(0);
    await expect(page.locator("time")).toHaveAttribute(
      "datetime",
      video.publishedDate!,
    );
    await expect(
      page.getByRole("button", { name: "View Transcript" }),
    ).toHaveAttribute("aria-expanded", "false");
  }
});
