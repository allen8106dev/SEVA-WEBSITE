import { expect, test } from "@playwright/test";
import { focusAreas } from "../src/content/focus-areas";
import { projects } from "../src/content/projects";
import {
  programmesContent,
  type ProgrammePageId,
} from "../src/content/programmes";

const routes: readonly { id: ProgrammePageId; path: string }[] = [
  { id: "programmes", path: "/programmes" },
  { id: "education", path: "/programmes/education" },
  { id: "healthcare", path: "/programmes/healthcare" },
  { id: "women-empowerment", path: "/programmes/women-empowerment" },
  { id: "community-welfare", path: "/programmes/community-welfare" },
  {
    id: "rural-tribal-development",
    path: "/programmes/rural-tribal-development",
  },
  { id: "skill-development", path: "/programmes/skill-development" },
  { id: "relief-works", path: "/programmes/relief-works" },
];

for (const route of routes) {
  test(`${route.path} has polished responsive content, working media and safe metadata`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route.path);
    await page.evaluate(() => document.fonts.ready);

    // Single semantic h1
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h1")).toBeVisible();

    // Data attribute marker
    await expect(
      page.locator(`[data-programme-page="${route.id}"]`),
    ).toBeVisible();

    // SEO Metadata
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      programmesContent[route.id].metaDescription,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );

    // Breadcrumbs
    const breadcrumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumbs.locator('[aria-current="page"]')).toHaveCount(1);
    if (route.id !== "programmes") {
      await expect(
        breadcrumbs.getByRole("link", { name: "Programmes", exact: true }),
      ).toHaveAttribute("href", "/programmes");
    }

    // Media loads without error
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
      expect(await image.getAttribute("alt")).toBeTruthy();
    }

    // Responsive checks across all required widths
    for (const width of [320, 375, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route.path} at ${width}px`,
      ).toBe(true);

      for (const heading of await page
        .locator("main h1, main h2, main h3")
        .all()) {
        expect(
          await heading.evaluate(
            (element) => element.scrollWidth <= element.clientWidth + 1,
          ),
          `${route.path} heading at ${width}px`,
        ).toBe(true);
      }
    }

    expect(errors, `${route.path} console errors`).toHaveLength(0);
  });
}

test("/programmes overview presents all seven focus areas with links", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/programmes");
  await page.evaluate(() => document.fonts.ready);

  const entries = page.locator(".programme-entry");
  await expect(entries).toHaveCount(7);

  // All 7 programme links are present
  for (const area of focusAreas) {
    const link = page
      .locator(".programmes-directory")
      .locator(`a[href="/programmes/${area.id}"]`);
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
    await expect(link).toContainText(area.title);
  }
});

test("education page features CNEWA and Vidya Jyoti project previews", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/programmes/education");
  await page.evaluate(() => document.fonts.ready);

  const eduProjects = projects.filter((p) => p.focusAreaId === "education");
  for (const project of eduProjects) {
    const card = page
      .locator(".prog-project-card")
      .filter({ hasText: project.name });
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    if (project.reportedImpact) {
      await expect(card).toContainText(project.reportedImpact);
    }
  }

  // Check sibling navigation exists and does not link to /programmes/education
  const crossNav = page.locator(".prog-nav");
  await crossNav.scrollIntoViewIfNeeded();
  await expect(crossNav).toBeVisible();
  await expect(crossNav.locator('a[href="/programmes/education"]')).toHaveCount(
    0,
  );
  await expect(
    crossNav.locator('a[href="/programmes/healthcare"]'),
  ).toBeVisible();
});

test("community welfare page displays Ruby Meal outreach documentation", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/programmes/community-welfare");
  await page.evaluate(() => document.fonts.ready);

  const card = page.locator(".prog-project-card");
  await card.scrollIntoViewIfNeeded();
  await expect(card).toContainText("SEVA Ruby Meal");
  await expect(
    page.getByText("SEVA Ruby Meal", { exact: false }).first(),
  ).toBeVisible();
});

test("women empowerment links conceptually to skill development", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/programmes/women-empowerment");
  await page.evaluate(() => document.fonts.ready);

  const skillLink = page
    .locator("main .prog-cross-link")
    .locator('a[href="/programmes/skill-development"]');
  await skillLink.scrollIntoViewIfNeeded();
  await expect(skillLink).toBeVisible();
});
