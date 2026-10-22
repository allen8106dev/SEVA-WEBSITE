import { test, expect } from "@playwright/test";
import { projects } from "../src/content/projects";
import { getProjectAssets } from "../src/content/route-media";
import { getGalleryAssets } from "../src/content/route-media";
import {
  expectHeadingsToFit,
  viewportsForProject,
} from "./helpers/responsive-viewports";

test.describe("Phase 5D.1 Media Section", () => {
  test("media overview page (/media) renders editorial hero, pathways, highlights and safe metadata", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/media");
    await expect(page).toHaveTitle(/Media/);

    // Hero title and introductory content
    const heading = page.locator("h1#media-overview-heading");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Documenting Hope.");

    // Breadcrumbs
    const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbs).toBeVisible();
    // Home > Media = 2 items
    await expect(breadcrumbs.locator("ol > li")).toHaveCount(2);

    // Check pathways to Gallery, Videos, and News & Events
    const pathways = page.locator(".media-pathway-card");
    await expect(pathways).toHaveCount(3);

    // Gallery pathway - verify card contains gallery heading link and action link
    const galleryPathway = pathways.filter({
      hasText: "Documentary Photo Gallery",
    });
    await expect(galleryPathway).toBeVisible();
    await expect(
      galleryPathway.getByRole("link", { name: "Documentary Photo Gallery" }),
    ).toHaveAttribute("href", "/media/gallery");

    // Videos pathway
    const videosPathway = pathways.filter({
      hasText: "Official Videos",
    });
    await expect(videosPathway).toBeVisible();
    await expect(
      videosPathway.getByRole("link", {
        name: "Official Videos & Documentaries",
      }),
    ).toHaveAttribute("href", "/media/videos");

    // News pathway
    const newsPathway = pathways.filter({ hasText: "Community News" });
    await expect(newsPathway).toBeVisible();
    await expect(
      newsPathway.getByRole("link", { name: "Community News & Events" }),
    ).toHaveAttribute("href", "/media/news-events");

    // Curated highlights section
    const highlights = page.locator(".media-highlight-item");
    await expect(highlights).toHaveCount(4);

    // Verify robots meta tag (noindex)
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute("content", "noindex, nofollow");

    expect(errors).toEqual([]);
  });

  test("photo gallery (/media/gallery) renders 11 authentic photographs with responsive categories", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/media/gallery");
    await expect(page).toHaveTitle(/Photo Gallery/);

    const h1 = page.locator("h1#gallery-page-title");
    await expect(h1).toContainText("Visual Chronicles of");

    // All approved assets must be present on initial load
    const galleryAssets = getGalleryAssets();
    expect(galleryAssets.length).toBe(11);

    const cards = page.locator(".gallery-card");
    await expect(cards).toHaveCount(11);
    await expect(page.locator("dialog.lightbox-dialog")).toHaveCount(0);
    await expect(page.locator("img.lightbox-img")).toHaveCount(0);
    await expect(cards.first().locator("img")).toHaveAttribute(
      "loading",
      "lazy",
    );

    // Filter controls check
    const filterNav = page.locator(
      'nav[aria-label="Filter gallery by category"]',
    );
    await expect(filterNav).toBeVisible();

    const allBtn = filterNav.getByRole("button", { name: /^All/ });
    const eduBtn = filterNav.getByRole("button", { name: /^Education/ });
    const commBtn = filterNav.getByRole("button", {
      name: /^Community Welfare/,
    });
    const ruralBtn = filterNav.getByRole("button", {
      name: /^Rural Development/,
    });
    const collBtn = filterNav.getByRole("button", {
      name: /^Project Collages/,
    });

    await expect(allBtn).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".gallery-count-text")).toContainText(
      "Showing 11 photographs",
    );

    // Filter by Education (5 items)
    await eduBtn.click();
    await expect(eduBtn).toHaveAttribute("aria-pressed", "true");
    await expect(allBtn).toHaveAttribute("aria-pressed", "false");
    await expect(cards).toHaveCount(5);
    await expect(page.locator(".gallery-count-text")).toContainText(
      "Showing 5 photographs in Education",
    );

    // Filter by Community Welfare (2 items)
    await commBtn.click();
    await expect(commBtn).toHaveAttribute("aria-pressed", "true");
    await expect(cards).toHaveCount(2);
    await expect(page.locator(".gallery-count-text")).toContainText(
      "Showing 2 photographs in Community Welfare",
    );

    // Filter by Rural Development (1 item)
    await ruralBtn.click();
    await expect(ruralBtn).toHaveAttribute("aria-pressed", "true");
    await expect(cards).toHaveCount(1);
    await expect(page.locator(".gallery-count-text")).toContainText(
      "Showing 1 photograph in Rural Development",
    );

    // Filter by Project Collages (3 items)
    await collBtn.click();
    await expect(collBtn).toHaveAttribute("aria-pressed", "true");
    await expect(cards).toHaveCount(3);
    await expect(page.locator(".gallery-count-text")).toContainText(
      "Showing 3 photographs in Project Collages",
    );

    // Reset back to All
    await allBtn.click();
    await expect(cards).toHaveCount(11);

    expect(errors).toEqual([]);
  });

  test("fullscreen image lightbox opens, navigates, and closes via Escape with focus restoration", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/media/gallery");

    const firstCardTrigger = page.locator(".gallery-card-trigger").first();

    // Focus and click to open lightbox
    await firstCardTrigger.focus();
    await firstCardTrigger.click();

    // Dialog should be open
    const dialog = page.locator("dialog.lightbox-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img.lightbox-img")).toBeVisible();
    await expect
      .poll(() =>
        dialog
          .locator("img.lightbox-img")
          .evaluate((image) => (image as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);

    // Verify counter and caption
    const counter = dialog.locator(".lightbox-counter");
    await expect(counter).toHaveText(/Photograph 1 of 11/);

    const caption = dialog.locator(".lightbox-caption");
    await expect(caption).toBeVisible();

    // Native top-layer modal blocks background focus and pointer interaction.
    expect(await dialog.evaluate((element) => element.matches(":modal"))).toBe(
      true,
    );
    await firstCardTrigger.evaluate((element) => element.focus());
    await expect(
      dialog.getByRole("button", { name: /Close image viewer/ }),
    ).toBeFocused();
    for (let index = 0; index < 5; index++) {
      await page.keyboard.press("Tab");
      expect(
        await dialog.evaluate(
          (element) =>
            // Chromium may move focus to browser chrome between modal controls.
            // No background page control may receive focus.
            document.activeElement === document.body ||
            element.contains(document.activeElement),
        ),
      ).toBe(true);
    }
    await expect(caption).toHaveText(getGalleryAssets()[0].caption);
    await expect(dialog.locator(".lightbox-source")).toContainText(
      getGalleryAssets()[0].creditSource,
    );

    // Navigate to next image using Next button
    const nextBtn = dialog.locator(".lightbox-nav-btn--next");
    await nextBtn.click();
    await expect(counter).toHaveText(/Photograph 2 of 11/);

    // Navigate to previous image using Left Arrow key
    await page.keyboard.press("ArrowLeft");
    await expect(counter).toHaveText(/Photograph 1 of 11/);

    // Navigate forward with Right Arrow key
    await page.keyboard.press("ArrowRight");
    await expect(counter).toHaveText(/Photograph 2 of 11/);

    // Close via Escape key
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    // Focus restoration
    await expect(firstCardTrigger).toBeFocused();

    // Reopen and test close button
    await firstCardTrigger.click();
    await expect(dialog).toBeVisible();
    const closeBtn = dialog.locator(".lightbox-close-btn");
    await closeBtn.click();
    await expect(dialog).toBeHidden();
    await expect(firstCardTrigger).toBeFocused();
    await expect(firstCardTrigger).toBeFocused();

    expect(errors).toEqual([]);
  });

  test("videos page (/media/videos) displays honest empty state with active pathways", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/media/videos");
    await expect(page).toHaveTitle(/Videos/);

    const h1 = page.locator("h1#videos-page-title");
    await expect(h1).toContainText("Official Video Archive");

    // Empty state card
    const emptyState = page.locator(".media-empty-state--videos");
    await expect(emptyState).toBeVisible();
    await expect(emptyState.locator("h2")).toContainText(
      "Documentary Video Archive",
    );

    // Verify pathways from empty state
    const galleryLink = emptyState.getByRole("link", {
      name: /Explore Verified Photo Gallery/,
    });
    await expect(galleryLink).toHaveAttribute("href", "/media/gallery");

    const programmesLink = emptyState.getByRole("link", {
      name: "View SEVA Core Programmes",
    });
    await expect(programmesLink).toHaveAttribute("href", "/programmes");

    expect(errors).toEqual([]);
  });

  test("news & events page (/media/news-events) displays honest empty state and editorial standards", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/media/news-events");
    await expect(page).toHaveTitle(/News/);

    const h1 = page.locator("h1#news-page-title");
    await expect(h1).toContainText("News");

    // Empty state card
    const emptyState = page.locator(".media-empty-state--news");
    await expect(emptyState).toBeVisible();
    await expect(emptyState.locator("h2")).toContainText("Official Dispatches");

    // Verify pathways
    const galleryLink = emptyState.getByRole("link", {
      name: /Browse Verified Field Photography/,
    });
    await expect(galleryLink).toHaveAttribute("href", "/media/gallery");

    expect(errors).toEqual([]);
  });

  test("unknown news article slugs return a clean 404 response", async ({
    page,
  }) => {
    const response = await page.goto(
      "/media/news-events/fictional-announcement",
    );
    expect(response?.status()).toBe(404);
  });

  test("media pages render across the responsive viewport matrix and respect reduced motion", async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.emulateMedia({ reducedMotion: "reduce" });

    for (const width of viewportsForProject(testInfo.project.name)) {
      await page.setViewportSize({ width, height: 900 });

      // Check every Media layout, not only the gallery.
      for (const route of [
        "/media",
        "/media/gallery",
        "/media/videos",
        "/media/news-events",
      ]) {
        await page.goto(route);
        const filterBtns = page.locator(".gallery-filter-btn");
        for (const btn of await filterBtns.all()) {
          const box = await btn.boundingBox();
          expect(box!.height).toBeGreaterThanOrEqual(46);
        }

        // Ensure no horizontal overflow
        const hasHorizontalScroll = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        );
        expect(
          hasHorizontalScroll,
          `Horizontal scroll detected at width ${width}`,
        ).toBe(false);
        await expectHeadingsToFit(page, `${route} headings at ${width}px`);
      }
    }

    expect(errors).toEqual([]);
  });
});

test("programme and project filters intersect, count results and recover from empty selections", async ({
  page,
}) => {
  await page.goto("/media/gallery");
  const programme = page.getByLabel("Programme", { exact: true });
  const project = page.getByLabel("Project", { exact: true });
  const cards = page.locator(".gallery-card");
  for (const association of [
    ...new Set(getGalleryAssets().map((asset) => asset.programmeAssociation)),
  ]) {
    await programme.selectOption(association);
    const expected = getGalleryAssets().filter(
      (asset) => asset.programmeAssociation === association,
    );
    await expect(cards).toHaveCount(expected.length);
    await expect(page.locator(".gallery-count-text strong")).toHaveText(
      String(expected.length),
    );
    await expect(cards.locator(".gallery-card-caption")).toHaveText(
      expected.map((asset) => asset.caption),
    );
  }
  await programme.selectOption("All");
  for (const record of projects.filter(
    (entry) => getProjectAssets(entry).length,
  )) {
    await project.selectOption(record.id);
    await expect(cards).toHaveCount(getProjectAssets(record).length);
  }
  await programme.selectOption("CNEWA Non-Formal Education");
  await project.selectOption("seva-ruby-meal");
  await expect(cards).toHaveCount(0);
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(cards).toHaveCount(getGalleryAssets().length);
  await programme.selectOption("Housing Project");
  await cards.locator(".gallery-card-trigger").first().click();
  await expect(page.locator(".lightbox-counter")).toHaveText(
    "Photograph 1 of 2",
  );
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".lightbox-counter")).toHaveText(
    "Photograph 2 of 2",
  );
  await page.keyboard.press("Escape");
});

test("every eligible photograph loads with the recorded caption and no extra assets", async ({
  page,
}) => {
  await page.goto("/media/gallery");
  const assets = getGalleryAssets();
  const cards = page.locator(".gallery-card");
  await expect(cards).toHaveCount(assets.length);
  for (let index = 0; index < assets.length; index++) {
    const card = cards.nth(index);
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator(".gallery-card-caption")).toHaveText(
      assets[index].caption,
    );
    await expect(card.locator("img")).toHaveAttribute(
      "alt",
      assets[index].altText,
    );
    await expect
      .poll(() =>
        card
          .locator("img")
          .evaluate(
            (image) =>
              image instanceof HTMLImageElement &&
              image.complete &&
              image.naturalWidth > 0,
          ),
      )
      .toBe(true);
    await expect(card.locator("a")).toHaveAttribute(
      "href",
      assets[index].publicUrl,
    );
  }
});

test("Media navigation works on desktop and mobile with exact and ancestor active states", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/media/gallery");
  const desktop = page.getByRole("navigation", { name: "Main navigation" });
  await expect(
    desktop.getByRole("link", { name: "Media", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await desktop.getByRole("button", { name: "Media submenu" }).click();
  const panel = page.locator("#desktop-media");
  await expect(
    panel.getByRole("link", { name: "Photo Gallery", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await panel.getByRole("link", { name: "Videos", exact: true }).click();
  await expect(page).toHaveURL(/\/media\/videos$/);
  await expect(page.locator('nav[aria-label="Breadcrumb"] li')).toHaveCount(3);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator('button[aria-controls="mobile-navigation"]').click();
  const mobile = page.getByRole("navigation", { name: "Mobile navigation" });
  await mobile.getByRole("button", { name: "Media submenu" }).click();
  await expect(
    mobile.getByRole("link", { name: "Videos", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await mobile
    .getByRole("link", { name: "News & Events", exact: true })
    .click();
  await expect(page).toHaveURL(/\/media\/news-events$/);
  await expect(mobile).toBeHidden();
});

test("Media remains readable without JavaScript and photographs retain working full-size links", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of [
    "/media",
    "/media/gallery",
    "/media/videos",
    "/media/news-events",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.goto("/media/gallery");
  await expect(page.locator(".gallery-card")).toHaveCount(
    getGalleryAssets().length,
  );
  await page.locator(".gallery-card-trigger").first().click();
  await expect(page).toHaveURL(
    new RegExp(getGalleryAssets()[0].publicUrl.replaceAll(".", "\\.")),
  );
  await context.close();
});

test("archive empty states load no players and reduced motion leaves the modal static", async ({
  page,
}) => {
  for (const route of ["/media/videos", "/media/news-events"]) {
    await page.goto(route);
    await expect(page.locator(".media-empty-state")).toContainText(
      "approved for publication yet",
    );
    await expect(
      page.locator("iframe, video, .video-play-button, .media-news-card"),
    ).toHaveCount(0);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/media/gallery");
  await page.locator(".gallery-card-trigger").first().focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    await page
      .locator(".lightbox-image-stage")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await page.keyboard.press("Escape");
  await expect(page.locator(".gallery-card-trigger").first()).toBeFocused();
});
