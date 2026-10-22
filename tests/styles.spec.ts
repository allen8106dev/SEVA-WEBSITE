import { expect, test } from "@playwright/test";
import path from "node:path";

for (const width of [375, 768, 1440]) {
  test(`rendered styles, resources, and visual baseline at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
    const failures: string[] = [];
    page.on("requestfailed", (request) =>
      failures.push(`${request.url()}: ${request.failure()?.errorText}`),
    );
    page.on("pageerror", (error) => failures.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") failures.push(message.text());
    });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const links = await page
      .locator('link[rel="stylesheet"]')
      .evaluateAll((items) =>
        items.map((item) => (item as HTMLLinkElement).href),
      );
    expect(links.length).toBeGreaterThan(0);
    const stylesheetBodies: string[] = [];
    for (const href of links) {
      const response = await page.request.get(href);
      expect(response.status(), href).toBe(200);
      expect(response.headers()["content-type"], href).toContain("text/css");
      stylesheetBodies.push(await response.text());
    }
    const css = stylesheetBodies.join("\n");
    expect(css).toContain("--color-background");
    expect(css).toContain(".button--primary");
    expect(css).toMatch(/@layer\s+utilities/);

    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)",
    );
    await expect(page.locator("body")).toHaveCSS("color", "rgb(41, 41, 41)");
    await expect(page.locator("h1")).toHaveCSS("color", "rgb(255, 255, 255)");
    const activePhotoControl = page.locator(
      '.home-hero-carousel__control[aria-current="true"]',
    );
    await expect(activePhotoControl).toHaveCount(1);
    expect(
      await activePhotoControl.evaluate(
        (element) => element.getBoundingClientRect().height,
      ),
    ).toBeGreaterThanOrEqual(46);
    await expect(page.locator(".desktop-nav")).toHaveCSS(
      "display",
      width < 768 ? "none" : "flex",
    );
    await expect(page.locator(".home-hero__grid")).toHaveCSS("display", "grid");
    await expect(
      page.locator(
        ".home-hero-carousel__slide[aria-hidden='false'] .home-hero-carousel__main-image",
      ),
    ).toHaveCSS("object-fit", "cover");
    await expect(page.locator(".home-hero h1 em")).toHaveCSS(
      "color",
      "rgb(255, 255, 255)",
    );
    const whatsapp = page.locator(".whatsapp-fab");
    await expect(whatsapp).toHaveCSS("position", "fixed");
    expect((await whatsapp.boundingBox())!.height).toBeGreaterThanOrEqual(46);
    const metrics = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const h1 = getComputedStyle(document.querySelector("h1")!);
      const body = getComputedStyle(document.body);
      const grid = getComputedStyle(
        document.querySelector(".home-hero__grid")!,
      );
      const hero = document
        .querySelector(".home-hero")!
        .getBoundingClientRect();
      const heroPhoto = document
        .querySelector(
          '.home-hero-carousel__slide[aria-hidden="false"] .home-hero-carousel__main-image',
        )!
        .getBoundingClientRect();
      const photoRightMargin = hero.right - heroPhoto.right;
      const areaColumns = getComputedStyle(
        document.querySelector(".impact-areas")!,
      ).gridTemplateColumns;
      // A known Tailwind utility also has to work in the browser, beyond our custom CSS.
      const probe = document.createElement("span");
      probe.className = "sr-only";
      document.body.append(probe);
      const utility = getComputedStyle(probe).position;
      probe.remove();
      return {
        background: root.getPropertyValue("--color-background").trim(),
        h1Font: h1.fontFamily,
        displayFont: root
          .getPropertyValue("--font-editorial")
          .trim()
          .split(",")[0]
          .replaceAll('"', ""),
        bodyFont: body.fontFamily,
        configuredBodyFont: root
          .getPropertyValue("--font-body")
          .trim()
          .split(",")[0]
          .replaceAll('"', ""),
        h1Size: parseFloat(h1.fontSize),
        sectionPadding: parseFloat(
          getComputedStyle(document.querySelector(".home-hero")!).paddingTop,
        ),
        columns: grid.gridTemplateColumns.split(" ").length,
        cardColumns: areaColumns.split(" ").length,
        photoLeft: heroPhoto.left,
        photoRightMargin,
        photoWidth: heroPhoto.width,
        heroWidth: hero.width,
        photoHeight: heroPhoto.height,
        heroHeight: hero.height,
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        utility,
      };
    });
    expect(["#fff", "#ffffff"]).toContain(metrics.background);
    expect(metrics.displayFont).not.toBe("");
    expect(metrics.h1Font).toContain(metrics.displayFont);
    expect(metrics.configuredBodyFont).not.toBe("");
    expect(metrics.bodyFont).toContain(metrics.configuredBodyFont);
    expect(metrics.h1Size).toBeGreaterThanOrEqual(43);
    expect(metrics.sectionPadding).toBe(0);
    expect(metrics.columns).toBe(1);
    expect(metrics.cardColumns).toBe(width >= 1200 ? 3 : width >= 768 ? 2 : 1);
    expect(metrics.photoLeft).toBeGreaterThan(0);
    expect(metrics.photoRightMargin).toBeGreaterThan(0);
    expect(metrics.photoWidth).toBeLessThan(metrics.heroWidth);
    expect(metrics.photoHeight).toBeLessThan(metrics.heroHeight);
    expect(metrics.utility).toBe("absolute");
    expect(metrics.overflow).toBe(false);

    // Computed family names alone can report an unloaded web font; confirm actual glyph rendering.
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("DOM.enable");
    await cdp.send("CSS.enable");
    const { root } = await cdp.send("DOM.getDocument");
    for (const [selector, family] of [
      ["h1", "Cormorant"],
      [".story-copy .body-text", "Manrope"],
    ]) {
      const { nodeId } = await cdp.send("DOM.querySelector", {
        nodeId: root.nodeId,
        selector,
      });
      const result = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
      expect(
        result.fonts.some(
          (font) => font.isCustomFont && font.familyName.includes(family),
        ),
        selector,
      ).toBe(true);
    }
    await cdp.detach();
    expect(failures).toEqual([]);
    await testInfo.attach("computed-styles", {
      body: JSON.stringify(metrics, null, 2),
      contentType: "application/json",
    });
    await expect(page).toHaveScreenshot(
      `phase6-1-refinements-homepage-${width}.png`,
      {
        animations: "disabled",
        scale: "css",
        caret: "initial",
        maxDiffPixelRatio: 0.005,
        stylePath: path.join(__dirname, "screenshot.css"),
      },
    );
    expect(failures).toEqual([]);
  });
}
