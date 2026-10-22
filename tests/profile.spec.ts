import { expect, test } from "@playwright/test";
import { organization } from "../src/content/organization";
import { leadershipProfiles } from "../src/content/leadership";
import {
  historyMilestones,
  profileContent,
  type ProfilePageId,
} from "../src/content/profile";

const routes: readonly { id: ProfilePageId; path: string }[] = [
  { id: "profile", path: "/profile" },
  { id: "about", path: "/profile/about" },
  { id: "vision-mission", path: "/profile/vision-mission" },
  { id: "leadership", path: "/profile/leadership" },
  { id: "history", path: "/profile/history" },
];

for (const route of routes) {
  test(`${route.path} has polished responsive content, working media and safe metadata`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(90000);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route.path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(
      page.locator(`[data-profile-page="${route.id}"]`),
    ).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      profileContent[route.id].description,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    const breadcrumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumbs.locator('[aria-current="page"]')).toHaveCount(1);
    if (route.id !== "profile")
      await expect(
        breadcrumbs.getByRole("link", { name: "Profile", exact: true }),
      ).toHaveAttribute("href", "/profile");
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
      if (route.id === "profile") {
        const caption = await page
          .locator(".profile-photo figcaption")
          .boundingBox();
        const label = await page.locator(".profile-photo-note").boundingBox();
        expect(
          label!.y,
          `Unobscured photograph caption at ${width}px`,
        ).toBeGreaterThanOrEqual(caption!.y + caption!.height);
      }
      if ([375, 1440].includes(width))
        await page.screenshot({
          path: testInfo.outputPath(`profile-${route.id}-${width}.png`),
          fullPage: true,
        });
      else if (["profile", "leadership"].includes(route.id))
        await page.screenshot({
          path: testInfo.outputPath(`profile-${route.id}-${width}.png`),
        });
    }
    expect(errors).toEqual([]);
  });
}

test("official portraits map to the correct names and pending placeholders have no faces", async ({
  page,
}) => {
  await page.goto("/profile/leadership");
  await expect(page.locator(".leadership-feature")).toHaveCount(4);
  for (const leader of leadershipProfiles) {
    const feature = page.locator(`#leader-${leader.id}`);
    await expect(feature.getByRole("heading", { level: 2 })).toHaveText(
      leader.name,
    );
    await expect(
      feature.getByText(leader.title, { exact: true }),
    ).toBeVisible();
    if (leader.publicationStatus === "confirmed_official") {
      await expect(feature.locator("img")).toHaveAttribute(
        "alt",
        leader.image!.alt,
      );
      const src = new URL(
        (await feature.locator("img").getAttribute("src")) ?? "",
        "http://localhost",
      );
      expect(src.searchParams.get("url") ?? src.pathname).toBe(
        leader.image!.src,
      );
      await expect(feature.locator(".portrait-slot")).toHaveCount(0);
    } else {
      await expect(feature.locator("img")).toHaveCount(0);
      await expect(feature.locator(".portrait-slot__name")).toHaveText(
        leader.name,
      );
      await expect(feature.locator("figcaption")).toHaveText(
        "Official portrait pending confirmation.",
      );
    }
    await expect(feature.locator("a, button")).toHaveCount(0);
  }
  expect(await page.locator("main").innerHTML()).not.toMatch(
    /yoohanon|santhosh/i,
  );
});

test("vision values track native scrolling on desktop and mobile and reset for reduced motion", async ({
  page,
}, testInfo) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/profile/vision-mission");
    const values = page.locator(".profile-values");
    await expect(values).toHaveAttribute("data-values-active", "true");
    await expect(page.locator(".profile-value__word")).toHaveText([
      ...organization.vision.coreValues,
    ]);
    const lastRule = values.locator(".profile-value__rule").last();
    const scale = () =>
      lastRule.evaluate(
        (element) => new DOMMatrix(getComputedStyle(element).transform).a,
      );
    const before = await scale();
    await values.evaluate((element) =>
      scrollTo({
        top:
          element.getBoundingClientRect().bottom + scrollY - innerHeight * 0.25,
        behavior: "instant",
      }),
    );
    await expect.poll(scale).toBeGreaterThan(before + 0.2);
    await page.screenshot({
      path: testInfo.outputPath(`vision-progress-${width}.png`),
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(values).toHaveAttribute("data-values-active", "false");
    for (const word of await page.locator(".profile-value__word").all())
      await expect(word).toHaveCSS("transform", "none");
    await expect(page.locator(".profile-mission-pillars li")).toHaveCount(5);
    await expect(page.locator(".profile-vision blockquote")).toHaveText(
      organization.vision.statement,
    );
    await expect(page.locator(".profile-mission__statement")).toHaveText(
      organization.mission.statement,
    );
  }
});

test("history publishes one confirmed establishment milestone and expandable source notes", async ({
  page,
}) => {
  expect(historyMilestones).toHaveLength(1);
  expect(historyMilestones[0].year).toBe(organization.establishedYear);
  await page.goto("/profile/history");
  await expect(page.locator(".profile-timeline > li")).toHaveCount(1);
  await expect(page.locator(".profile-timeline__date")).toHaveText("2015");
  await page.getByText("About this record", { exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".profile-timeline details")).toHaveAttribute(
    "open",
    "",
  );
  await expect(
    page.getByText("Source: Official organizational records"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View organization-reported reach" }),
  ).toHaveAttribute("href", "/#website-status");
  await expect(page.locator(".profile-programmes a")).toHaveCount(7);
});

test("profile overview, cross-links, breadcrumbs and mobile navigation work together", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/profile");
  for (const label of [
    "About SEVA",
    "Vision & Mission",
    "Leadership",
    "Our History",
  ]) {
    await page
      .getByRole("navigation", { name: "Explore Profile" })
      .getByRole("link", { name: `Explore ${label}`, exact: true })
      .click();
    const toggle = page.locator('button[aria-controls="mobile-navigation"]');
    await toggle.click();
    const nav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(
      nav.getByRole("link", { name: "Profile", exact: true }),
    ).toHaveAttribute("aria-current", "location");
    await nav.getByRole("button", { name: "Profile submenu" }).click();
    await expect(
      nav.getByRole("link", { name: label, exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await page
      .getByRole("navigation", { name: "Breadcrumb" })
      .getByRole("link", { name: "Profile", exact: true })
      .click();
    await expect(page).toHaveURL(/\/profile$/);
  }
});

test("all five profile pages remain complete and readable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  test.setTimeout(60000);
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`${baseURL}${route.path}`);
    for (const heading of await page
      .locator("main h1, main h2, main h3")
      .all()) {
      await expect(heading).toBeVisible();
      await expect(heading).toHaveCSS("opacity", "1");
    }
    if (route.id === "vision-mission") {
      await expect(page.locator(".profile-values")).toHaveAttribute(
        "data-values-active",
        "false",
      );
      await expect(page.locator(".profile-value__word")).toHaveText([
        ...organization.vision.coreValues,
      ]);
    }
  }
  await context.close();
});
