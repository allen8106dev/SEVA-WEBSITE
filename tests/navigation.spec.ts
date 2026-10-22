import { expect, test } from "@playwright/test";
import {
  navigation,
  interiorNavigation,
  isNavigationActive,
} from "../src/config/navigation";
import { mediaRegistry } from "../src/content/media";
import { getGalleryAssets, getProjectAssets } from "../src/content/route-media";

test("every configured route has real content, breadcrumbs and unique noindex metadata", async ({
  request,
}) => {
  const titles = new Set<string>();
  for (const item of interiorNavigation) {
    const response = await request.get(item.href);
    expect(response.status(), item.href).toBe(200);
    const html = await response.text();
    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).toContain("noindex");
    expect(html).toMatch(/<h1(?:\s[^>]*)?>/);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    expect(title, item.href).toBeTruthy();
    expect(titles.has(title!), item.href).toBe(false);
    titles.add(title!);
  }
  for (const route of [
    "/profile/unknown",
    "/programmes/education/unknown",
    "/media/unknown",
  ])
    expect((await request.get(route)).status()).toBe(404);
});

test("desktop disclosures support pointer, keyboard, focus, dismissal and parent navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  const trigger = nav.getByRole("button", { name: "Programmes submenu" });
  const panel = page.locator("#desktop-programmes");
  await trigger.hover();
  await expect(panel).toBeVisible();
  await panel.getByRole("link", { name: "Education", exact: true }).hover();
  await expect(panel).toBeVisible();
  await page.mouse.move(10, 700);
  await expect(panel).toBeHidden();
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    panel.getByRole("link", { name: "Education", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Space");
  await expect(panel).toBeVisible();
  await page.mouse.click(10, 700);
  await expect(panel).toBeHidden();
  await nav.getByRole("link", { name: "Programmes", exact: true }).click();
  await expect(page).toHaveURL(/\/programmes$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Restoring Dignity",
  );
  await page.goto("/programmes/education");
  await expect(
    nav.getByRole("link", { name: "Programmes", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await nav.getByRole("button", { name: "Programmes submenu" }).focus();
  await page.keyboard.press("Enter");
  await expect(
    panel.getByRole("link", { name: "Education", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.locator("header")).toHaveAttribute("data-scrolled", "true");
  await trigger.hover();
  await expect(panel).toBeVisible();
});

test("mobile accordion separates links from controls and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/programmes/education");
  const toggle = page.locator('button[aria-controls="mobile-navigation"]');
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await toggle.click();
  const trigger = nav.getByRole("button", { name: "Programmes submenu" });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    nav.getByRole("link", { name: "Education", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Tab");
  await expect(
    nav.getByRole("link", { name: "Education", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await trigger.click();
  await nav.getByRole("link", { name: "Healthcare", exact: true }).click();
  await expect(page).toHaveURL(/\/programmes\/healthcare$/);
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await nav.getByRole("link", { name: "Profile", exact: true }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await toggle.click();
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(nav).toBeHidden();
});

test("navigation panels fit six widths and respect reduced motion without browser errors", async ({
  page,
}, testInfo) => {
  test.setTimeout(60000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/profile/leadership");
  for (const width of [320, 375, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    if (width < 768)
      await page.locator('button[aria-controls="mobile-navigation"]').click();
    const nav = page.getByRole("navigation", {
      name: width < 768 ? "Mobile navigation" : "Main navigation",
    });
    const trigger = nav.getByRole("button", { name: "Programmes submenu" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    const panel = page.locator(
      width < 768 ? "#mobile-programmes" : "#desktop-programmes",
    );
    await expect(panel).toBeVisible();
    await expect(panel).toHaveCSS("transition-duration", "0s");
    const bounds = await panel.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const button of await nav.locator("button").all())
      expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(46);
    await page.screenshot({
      path: testInfo.outputPath(`navigation-${width}.png`),
    });
    await page.keyboard.press("Escape");
    if (width < 768) await page.keyboard.press("Escape");
  }
  expect(errors).toEqual([]);
});

test("archive approval, project arrays and leadership identity safeguards survive routing", async ({
  page,
  request,
}) => {
  const gallery = getGalleryAssets();
  expect(gallery.length).toBeGreaterThan(0);
  expect(gallery.map((asset) => asset.id)).toEqual(
    mediaRegistry
      .filter(
        (asset) =>
          asset.sourceArchive === "Pictures.zip" &&
          asset.approvalStatus === "approved_for_publication" &&
          asset.publicUrl,
      )
      .map((asset) => asset.id),
  );
  expect(getProjectAssets({ id: "cnewa-education" }).length).toBeGreaterThan(1);
  expect(getProjectAssets({ id: "vidya-jyoti" }).length).toBeGreaterThan(1);
  expect(getProjectAssets({ id: "jeevan-project" })).toEqual([]);
  for (const asset of gallery)
    expect((await request.get(asset.publicUrl)).status(), asset.id).toBe(200);
  await page.goto("/profile/leadership");
  await expect(page.locator(".leadership-directory > article")).toHaveCount(4);
  await expect(page.locator(".portrait-image")).toHaveCount(4);
  await expect(page.locator(".portrait-slot")).toHaveCount(0);
  expect(await page.locator("main").innerHTML()).not.toMatch(
    /yoohanon|santhosh/i,
  );
  await page.goto("/get-involved/donate");
  await expect(page.locator("main form, main input")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Contact SEVA about giving" }),
  ).toHaveAttribute("href", "/contact");
});

test("route matching respects segment boundaries", () => {
  const programmes = navigation.find((item) => item.id === "programmes")!;
  expect(
    isNavigationActive("/programmes/education/future-project", programmes),
  ).toBe(true);
  expect(isNavigationActive("/programmes-other", programmes)).toBe(false);
  expect(isNavigationActive("/profile", programmes)).toBe(false);
});

test("no JavaScript visitors can reach categories and child pages", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await page
    .getByRole("navigation", { name: "Navigation without JavaScript" })
    .getByRole("link", { name: "Profile", exact: true })
    .click();
  await page.getByRole("link", { name: "Explore Leadership" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Leadership",
  );
  await context.close();
});
