import { expect, test } from "@playwright/test";

test("first visit shows the SEVA logo splash, then reveals the homepage", async ({
  page,
}) => {
  const response = await page.goto("/", { waitUntil: "commit" });
  expect(await response?.text()).toContain('class="brand-splash"');

  const splash = page.locator(".brand-splash");
  await expect(splash).toBeVisible();
  await expect(splash.locator("img")).toHaveAttribute(
    "src",
    /seva-logo-header/,
  );
  await expect(splash.locator(".brand-splash__loader")).toBeVisible();
  await expect(splash).toHaveClass(/brand-splash--hidden/, { timeout: 3000 });

  const headerLogo = page.locator(".wordmark-logo-emblem");
  await expect(headerLogo).toBeVisible();
  expect(
    await headerLogo.evaluate((image) => image.getBoundingClientRect().height),
  ).toBeGreaterThanOrEqual(100);

  const carousel = page.getByRole("region", {
    name: "SEVA programme photographs",
  });
  await expect(
    carousel.locator('.home-hero-carousel__slide[aria-hidden="false"]'),
  ).toHaveAttribute("aria-label", "1 of 4: Housing Project");
  await expect(
    carousel
      .locator('.home-hero-carousel__slide[aria-hidden="false"] img')
      .last(),
  ).toHaveAttribute(
    "alt",
    "Representatives presenting a ceremonial key at a housing project event",
  );
  await expect(
    carousel
      .locator('img[src*="vidhya-jyothi-distribution-faces-blurred"]')
      .first(),
  ).toHaveAttribute("src", /faces-blurred/);
});
