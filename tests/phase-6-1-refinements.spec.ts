import { expect, test } from "@playwright/test";
import { buildInquiryMailto } from "../src/components/layout/footer-inquiry-form";
import { responsiveViewports } from "./helpers/responsive-viewports";

test("header expands at the top, compacts on scroll, and keeps Donate at the desktop edge", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const header = page.locator(".site-header");
  const logo = page.locator(".wordmark-logo-emblem");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  const donate = navigation.getByRole("link", { name: "Donate", exact: true });

  await expect(header).toHaveAttribute("data-scrolled", "false");
  await expect(logo).toBeVisible();
  await expect(donate).toHaveAttribute("href", "/get-involved/donate");
  await expect(
    navigation.getByRole("link", { name: "Donate", exact: true }),
  ).toHaveCount(1);
  const expandedLogo = await logo.boundingBox();
  const logoRatio = await logo.evaluate((image) => {
    const logoImage = image as HTMLImageElement;
    return logoImage.naturalWidth / logoImage.naturalHeight;
  });
  expect(
    Math.abs(expandedLogo!.width / expandedLogo!.height - logoRatio),
  ).toBeLessThan(0.02);
  const navBounds = await navigation.boundingBox();
  const donateBounds = await donate.boundingBox();
  expect(donateBounds!.x + donateBounds!.width).toBeCloseTo(
    navBounds!.x + navBounds!.width,
    0,
  );

  await page.evaluate(() => window.scrollTo(0, 240));
  await expect(header).toHaveAttribute("data-scrolled", "true");
  await expect
    .poll(async () => (await logo.boundingBox())!.height)
    .toBeLessThan(expandedLogo!.height);
  const compactLogo = await logo.boundingBox();
  expect(compactLogo!.height).toBeGreaterThanOrEqual(46);
  expect(
    await header.evaluate((element) => element.getBoundingClientRect().height),
  ).toBeGreaterThanOrEqual(72);
});

test("mobile Donate stays in the accordion and the official logo remains visible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const logo = page.locator(".wordmark-logo-emblem");
  await expect(logo).toBeVisible();
  const logoBounds = await logo.boundingBox();
  expect(logoBounds!.x).toBeGreaterThanOrEqual(0);
  expect(logoBounds!.x + logoBounds!.width).toBeLessThanOrEqual(375);

  const toggle = page.locator('button[aria-controls="mobile-navigation"]');
  await toggle.click();
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  const getInvolved = nav.getByRole("button", { name: "Get Involved submenu" });
  await getInvolved.click();
  const donate = nav.getByRole("link", { name: "Donate", exact: true });
  await expect(donate).toHaveCount(1);
  await expect(donate).toHaveAttribute("href", "/get-involved/donate");
  await donate.focus();
  await expect(donate).toBeFocused();

  await toggle.click();
  await page.evaluate(() => window.scrollTo(0, 240));
  await expect(page.locator(".site-header")).toHaveAttribute(
    "data-scrolled",
    "true",
  );
  await expect
    .poll(async () => (await logo.boundingBox())!.height)
    .toBeLessThan(logoBounds!.height);
  expect((await logo.boundingBox())!.height).toBeGreaterThanOrEqual(46);
});

test("approved homepage photographs slide horizontally, support controls, and pause on interaction", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile",
    "The timed carousel is verified once on desktop.",
  );
  test.setTimeout(30000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const carousel = page.getByRole("region", {
    name: "SEVA programme photographs",
  });
  const current = carousel.locator(
    '.home-hero-carousel__slide[aria-hidden="false"]',
  );

  await expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
  await expect(current).toHaveAttribute(
    "aria-label",
    "1 of 3: Community Welfare",
  );
  await expect(carousel.locator("img")).toHaveCount(3);
  const originalTransform = await carousel
    .locator(".home-hero-carousel__track")
    .evaluate((track) => getComputedStyle(track).transform);
  await carousel.getByRole("button", { name: "Next photograph" }).click();
  await expect(current).toHaveAttribute("aria-label", "2 of 3: Education");
  await expect
    .poll(() =>
      carousel
        .locator(".home-hero-carousel__track")
        .evaluate((track) => getComputedStyle(track).transform),
    )
    .not.toBe(originalTransform);
  await page.waitForTimeout(6200);
  await expect(current).toHaveAttribute("aria-label", "2 of 3: Education");

  await carousel
    .getByRole("button", { name: "Play automatic slide show" })
    .click();
  await expect(
    carousel.getByRole("button", { name: "Pause automatic slide show" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.waitForTimeout(6200);
  await expect(current).toHaveAttribute(
    "aria-label",
    "3 of 3: Rural Development",
  );
  await carousel.getByRole("button", { name: "Previous photograph" }).click();
  await expect(current).toHaveAttribute("aria-label", "2 of 3: Education");
});

test("reduced motion disables autoplay while keeping manual carousel controls", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const carousel = page.getByRole("region", {
    name: "SEVA programme photographs",
  });
  await expect(
    carousel.getByRole("button", { name: "Play automatic slide show" }),
  ).toBeDisabled();
  await expect(
    carousel.getByRole("button", { name: "Next photograph" }),
  ).toBeEnabled();
  await expect(carousel.locator(".home-hero-carousel__track")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await carousel.getByRole("button", { name: "Next photograph" }).click();
  await expect(
    carousel.locator('.home-hero-carousel__slide[aria-hidden="false"]'),
  ).toHaveAttribute("aria-label", "2 of 3: Education");
});

test("footer inquiry validates fields and builds an honest email-app draft", async ({
  page,
}) => {
  await page.goto("/");
  const form = page.locator(".footer-inquiry");
  await expect(form.getByLabel("Name")).toBeVisible();
  await expect(form.getByLabel("Email")).toBeVisible();
  await expect(form.getByLabel("Subject")).toBeVisible();
  await expect(form.getByLabel("Message")).toBeVisible();
  expect(
    await form.evaluate((element: HTMLFormElement) => element.checkValidity()),
  ).toBe(false);

  await form.getByLabel("Name").fill("A Visitor");
  await form.getByLabel("Email").fill("visitor@example.org");
  await form.getByLabel("Subject").fill("Question about volunteering");
  await form
    .getByLabel("Message")
    .fill("Please share the official contact route.");
  expect(
    await form.evaluate((element: HTMLFormElement) => element.checkValidity()),
  ).toBe(true);
  await expect(
    form.getByRole("button", { name: "Continue in email app" }),
  ).toBeVisible();
  await expect(form).toContainText(
    "The website does not send or store your inquiry",
  );

  const draft = new URL(
    buildInquiryMailto("sevassspune@gmail.com", {
      name: "A Visitor",
      email: "visitor@example.org",
      subject: "Question about volunteering",
      message: "Please share the official contact route.",
    }),
  );
  expect(draft.protocol).toBe("mailto:");
  expect(draft.pathname).toBe("sevassspune@gmail.com");
  expect(draft.searchParams.get("subject")).toBe(
    "Website inquiry: Question about volunteering",
  );
  expect(draft.searchParams.get("body")).toContain(
    "Email: visitor@example.org",
  );
  expect(draft.searchParams.get("body")).toContain(
    "Please share the official contact route.",
  );
});

test("homepage and media photographs have no recoloring filters or indigo overlays", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/profile/leadership",
    "/programmes/education/cnewa",
    "/media/gallery",
  ]) {
    await page.goto(route);
    const imageTreatments = await page
      .locator("main img")
      .evaluateAll((images) =>
        images.map((image) => {
          const style = getComputedStyle(image);
          return { filter: style.filter, blend: style.mixBlendMode };
        }),
      );
    for (const treatment of imageTreatments) {
      expect(treatment.filter, route).toBe("none");
      expect(treatment.blend, route).toBe("normal");
    }
    const galleryOverlay = page.locator(".gallery-card-overlay").first();
    if (await galleryOverlay.count()) {
      const gradient = await galleryOverlay.evaluate(
        (overlay) => getComputedStyle(overlay).backgroundImage,
      );
      expect(gradient).not.toMatch(/43\s*,\s*36\s*,\s*105/i);
      expect(gradient).toContain("0, 0, 0");
    }
  }
});

test("refined header, carousel, footer, and headings fit the required viewport widths", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of responsiveViewports) {
    await page.setViewportSize({ width, height: 900 });
    const pageWidth = await page.evaluate(() => {
      const offenders = Array.from(document.body.querySelectorAll("*"))
        .filter((element) => {
          const bounds = element.getBoundingClientRect();
          if (
            bounds.width === 0 ||
            (bounds.left >= 0 && bounds.right <= innerWidth)
          ) {
            return false;
          }
          for (
            let parent = element.parentElement;
            parent;
            parent = parent.parentElement
          ) {
            const style = getComputedStyle(parent);
            const parentBounds = parent.getBoundingClientRect();
            if (
              ["hidden", "clip"].includes(style.overflowX) &&
              parentBounds.left >= 0 &&
              parentBounds.right <= innerWidth
            ) {
              return false;
            }
          }
          return true;
        })
        .slice(0, 8)
        .map((element) => {
          const bounds = element.getBoundingClientRect();
          return {
            element: `${element.tagName.toLowerCase()}.${String(element.className)}`,
            left: Math.round(bounds.left),
            right: Math.round(bounds.right),
          };
        });
      return {
        width: document.documentElement.scrollWidth,
        offenders,
      };
    });
    expect(
      pageWidth.width,
      `${width}px horizontal overflow: ${JSON.stringify(pageWidth.offenders)}`,
    ).toBeLessThanOrEqual(width);
    await expect(page.locator(".wordmark-logo-emblem")).toBeVisible();
    await expect(page.locator(".home-hero-carousel__control")).toHaveCount(3);
    const controls = await page.locator(".home-hero-carousel__control").all();
    for (const control of controls) {
      expect(
        (await control.boundingBox())!.height,
        `${width}px control`,
      ).toBeGreaterThanOrEqual(46);
    }
    const caption = await page
      .locator(
        '.home-hero-carousel__slide[aria-hidden="false"] .home-hero-carousel__caption',
      )
      .boundingBox();
    const carouselControls = await page
      .locator(".home-hero-carousel__controls")
      .boundingBox();
    const overlapsControls =
      caption!.x < carouselControls!.x + carouselControls!.width &&
      caption!.x + caption!.width > carouselControls!.x &&
      caption!.y < carouselControls!.y + carouselControls!.height &&
      caption!.y + caption!.height > carouselControls!.y;
    expect(overlapsControls, `${width}px caption and controls`).toBe(false);
    const desktopNav = width >= 768;
    await expect(page.locator(".desktop-nav")).toHaveCSS(
      "display",
      desktopNav ? "flex" : "none",
    );
  }
});

test("interior page heroes reveal their content without viewport-height panels", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const routes = [
    "/profile",
    "/profile/about",
    "/profile/vision-mission",
    "/profile/leadership",
    "/profile/history",
    "/programmes",
    "/programmes/education",
    "/programmes/education/cnewa",
    "/media",
    "/media/gallery",
    "/media/videos",
    "/media/news-events",
    "/resources",
    "/resources/annual-reports",
    "/resources/financial-statements",
    "/resources/compliance",
    "/get-involved",
    "/get-involved/volunteer",
    "/get-involved/csr",
    "/get-involved/donate",
    "/contact",
  ];
  const heroSelector = [
    ".interior-hero",
    ".profile-opening",
    ".prog-hero",
    ".proj-hero",
    ".resource-hero",
    ".media-hero",
    ".involvement-hero",
    ".contact-hero",
    ".news-article-hero",
  ].join(", ");

  for (const route of routes) {
    await page.goto(route);
    const hero = page.locator(heroSelector).first();
    await expect(hero, route).toBeVisible();
    const bounds = await hero.boundingBox();
    expect(bounds!.height, `${route} hero height`).toBeLessThan(600);
    expect(bounds!.y + bounds!.height, `${route} content start`).toBeLessThan(
      900,
    );
    await expect(page.locator("main h1")).toBeVisible();
  }
});
