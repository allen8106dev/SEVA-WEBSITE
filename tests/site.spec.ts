import { expect, test } from "@playwright/test";

test("home is readable, responsive, and free of browser errors", async ({
  page,
}, testInfo) => {
  // Six full-page captures of the long homepage need more time on shared hosts and mobile emulators.
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Love in action. Restoring dignity, transforming lives.",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    if ([320, 390, 768, 1024, 1440, 1920].includes(width)) {
      await page.screenshot({
        path: testInfo.outputPath(`home-${width}.png`),
        fullPage: true,
      });
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const reveal of await page.locator("[data-reveal]").all())
    await expect(reveal).toHaveCSS("transform", "none");
  expect(errors).toEqual([]);
});

test("mobile menu supports links, Escape, and keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator('button[aria-controls="mobile-navigation"]');
  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    navigation.getByRole("link", { name: "Home", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await navigation.getByRole("link", { name: "Website status" }).click();
  await expect(navigation).toBeHidden();
  await expect(page).toHaveURL(/#website-status$/);
  await expect(
    page.locator('#mobile-navigation a[href="/#website-status"]'),
  ).toHaveAttribute("aria-current", "location");
  await toggle.click();
  await page.mouse.click(10, 500);
  await expect(navigation).toBeHidden();
});

test("desktop navigation tracks anchors and the skip link works", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const navigation = page.getByRole("navigation", {
    name: "Homepage chapters",
  });
  await navigation.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(
    navigation.getByRole("link", { name: "Contact", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await page
    .getByRole("link", { name: "Back to introduction", exact: true })
    .click();
  await expect(page).toHaveURL(/#introduction$/);
  await expect(
    navigation.getByRole("link", { name: "Introduction", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await page
    .getByRole("link", { name: "Explore the beginning", exact: true })
    .click();
  await expect(
    navigation.getByRole("link", { name: "Our approach", exact: true }),
  ).toHaveAttribute("aria-current", "location");
});

test("semantic text and control colors meet contrast targets", async ({
  page,
}) => {
  await page.goto("/");
  const pairs = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    function luminance(token: string) {
      const hex = styles.getPropertyValue(`--color-${token}`).trim();
      const rgb = hex
        .slice(1)
        .match(/.{2}/g)!
        .map((part) => parseInt(part, 16) / 255)
        .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
      return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    }
    return [
      ["foreground", "background"],
      ["muted", "background"],
      ["primary", "background"],
      ["accent", "background"],
      ["on-primary", "primary"],
      ["inverse-muted", "primary"],
      ["muted", "surface"],
      ["success", "background"],
      ["error", "background"],
      ["focus", "background"],
    ].map(([foreground, background]) => {
      const a = luminance(foreground),
        b = luminance(background);
      return {
        pair: `${foreground}/${background}`,
        ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
      };
    });
  });
  for (const pair of pairs)
    expect(pair.ratio, pair.pair).toBeGreaterThanOrEqual(4.5);
});

test("development SEO endpoints and missing pages are safe", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Disallow: /");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("<loc>");
  const missing = await request.get("/missing-page");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain("noindex");
});

test("essential content remains available without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Organization-reported reach across 3 states.",
    }),
  ).toBeVisible();
  for (const heading of await page.locator("main h1, main h2, main h3").all()) {
    await expect(heading).toBeVisible();
    expect(
      await heading.evaluate((element) =>
        parseFloat(getComputedStyle(element).opacity),
      ),
    ).toBeGreaterThan(0);
  }
  await context.close();
});
