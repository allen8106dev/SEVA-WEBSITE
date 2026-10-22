import { expect, test } from "@playwright/test";
import path from "node:path";

for (const width of [375, 768, 1440]) {
  test(`rendered styles, resources, and visual baseline at ${width}px`, async ({
    page,
  }, testInfo) => {
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
      "rgb(255, 249, 235)",
    );
    await expect(page.locator("body")).toHaveCSS("color", "rgb(23, 23, 23)");
    await expect(page.locator("h1")).toHaveCSS("color", "rgb(23, 23, 23)");
    const button = page.locator(".home-hero .button--primary");
    await expect(button).toHaveCSS("background-color", "rgb(37, 65, 178)");
    await expect(button).toHaveCSS("color", "rgb(255, 255, 255)");
    expect(
      await button.evaluate(
        (element) => element.getBoundingClientRect().height,
      ),
    ).toBeGreaterThanOrEqual(46);
    await expect(page.locator(".desktop-nav")).toHaveCSS(
      "display",
      width < 768 ? "none" : "flex",
    );
    await expect(page.locator(".home-hero__grid")).toHaveCSS("display", "grid");
    const metrics = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const h1 = getComputedStyle(document.querySelector("h1")!);
      const body = getComputedStyle(document.body);
      const grid = getComputedStyle(
        document.querySelector(".home-hero__grid")!,
      );
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
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        utility,
      };
    });
    expect(metrics.background).toBe("#fff9eb");
    expect(metrics.displayFont).not.toBe("");
    expect(metrics.h1Font).toContain(metrics.displayFont);
    expect(metrics.configuredBodyFont).not.toBe("");
    expect(metrics.bodyFont).toContain(metrics.configuredBodyFont);
    expect(metrics.h1Size).toBeGreaterThanOrEqual(43);
    expect(metrics.sectionPadding).toBeGreaterThanOrEqual(32);
    expect(metrics.columns).toBe(width < 768 ? 1 : 2);
    expect(metrics.utility).toBe("absolute");
    expect(metrics.overflow).toBe(false);

    // Computed family names alone can report an unloaded web font; confirm actual glyph rendering.
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("DOM.enable");
    await cdp.send("CSS.enable");
    const { root } = await cdp.send("DOM.getDocument");
    for (const [selector, family] of [
      ["h1", "Cormorant"],
      [".hero-copy", "Manrope"],
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
    await expect(page).toHaveScreenshot(`homepage-navigation-${width}.png`, {
      animations: "disabled",
      scale: "css",
      caret: "hide",
      maxDiffPixelRatio: 0.005,
      stylePath: path.join(__dirname, "screenshot.css"),
    });
  });
}
