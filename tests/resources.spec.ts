import { test, expect } from "@playwright/test";
import { complianceRegistry } from "../src/content/compliance";
import { headlineMetrics } from "../src/content/impact";
import {
  expectHeadingsToFit,
  viewportsForProject,
} from "./helpers/responsive-viewports";

const routes = [
  "/resources",
  "/resources/annual-reports",
  "/resources/financial-statements",
  "/resources/compliance",
];

test("Resources routes have honest availability, breadcrumbs and no download controls", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const route of routes) {
    expect((await page.goto(route))?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(
      page.locator('nav[aria-label="Breadcrumb"] [aria-current="page"]'),
    ).toHaveCount(1);
    await expect(page.getByLabel("Document availability")).toContainText(
      "No documents are currently approved",
    );
    await expect(
      page.locator(
        'main a[download], main a[href$=".pdf"], main select, main button',
      ),
    ).toHaveCount(0);
    expect(await page.locator("main").innerText()).not.toMatch(
      /\b[A-Z]{5}\d{4}[A-Z]\b|\b\d{9,18}\b/,
    );
    if (route !== "/resources")
      await expect(
        page.getByRole("link", { name: "All resources", exact: false }),
      ).toHaveAttribute("href", "/resources");
  }
  expect(errors).toEqual([]);
});

test("compliance categories distinguish reference, validity and public access", async ({
  page,
}) => {
  await page.goto("/resources/compliance");
  const rows = page.locator(".resource-reference-list > li");
  await expect(rows).toHaveCount(complianceRegistry.length);
  for (const record of complianceRegistry) {
    const row = rows.filter({
      has: page.getByRole("heading", { name: record.name, exact: true }),
    });
    await expect(row).toContainText("Referenced documentation");
    await expect(row).toContainText("Pending verification of current validity");
    await expect(row).toContainText("Not yet publicly available");
  }
});

test("transparency retains canonical figures, periods, sources and audit status", async ({
  page,
}) => {
  await page.goto("/resources");
  for (const metric of headlineMetrics) {
    const row = page.locator(".resource-metrics > li").filter({
      has: page.getByRole("heading", {
        name: metric.metricLabel,
        exact: true,
      }),
    });
    for (const value of [
      metric.displayFormat,
      metric.source,
      metric.reportingPeriod,
      "Organization reported · Audit pending",
    ])
      await expect(row).toContainText(value);
    await expect(row.locator("[data-count-value]")).toHaveCount(0);
  }
});

test("Resources keyboard navigation and active route work on desktop and mobile", async ({
  page,
  isMobile,
}) => {
  await page.goto("/resources/annual-reports");
  if (isMobile)
    await page.locator('button[aria-controls="mobile-navigation"]').click();
  const nav = page.getByRole("navigation", {
    name: isMobile ? "Mobile navigation" : "Main navigation",
    exact: true,
  });
  await expect(
    nav.getByRole("link", { name: "Resources", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  const trigger = nav.getByRole("button", { name: "Resources submenu" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(
    nav.getByRole("link", { name: "Annual Reports", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Tab");
  await expect(
    nav.getByRole("link", { name: "Annual Reports", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Enter");
  await nav
    .getByRole("link", { name: "Compliance Documents", exact: true })
    .click();
  await expect(page).toHaveURL(/\/resources\/compliance$/);
});

test("all Resources pages fit the responsive viewport matrix and preserve reduced motion", async ({
  page,
}, testInfo) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route);
    for (const width of viewportsForProject(testInfo.project.name)) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
      await expectHeadingsToFit(page, `${route} headings at ${width}px`);
      await expect(page.locator("h1")).toHaveCSS("opacity", "1");
      for (const link of await page
        .locator(".resource-pathway, .resource-link")
        .all())
        expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(46);
    }
    const link = page.locator(".resource-pathway").first();
    await expect(link).toHaveCSS("transition-duration", "0s");
    await link.scrollIntoViewIfNeeded();
    await expect(link.locator(".resource-pathway__arrow")).toHaveCSS(
      "transform",
      "none",
    );
  }
});

test("Resources remain readable with no JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`${baseURL}${route}`);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".resource-pathway").first()).toBeVisible();
    await expect(page.locator("main a[download]")).toHaveCount(0);
  }
  await context.close();
});
