import { test, expect } from "@playwright/test";
import path from "node:path";

for (const width of [375, 1440]) {
  test(`Media styles, fonts and reviewed openings at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
    const failures: string[] = [];
    page.on("pageerror", (error) => failures.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") failures.push(message.text());
    });
    page.on("response", (response) => {
      if (
        response.request().resourceType() === "stylesheet" &&
        !response.ok() &&
        response.status() !== 304
      )
        failures.push(`CSS ${response.status()} ${response.url()}`);
    });
    for (const [slug, background] of [
      ["", "rgb(222, 225, 255)"],
      ["gallery", "rgb(222, 225, 255)"],
      ["videos", "rgb(43, 36, 105)"],
      ["news-events", "rgb(255, 255, 255)"],
    ]) {
      await page.goto(`/media${slug ? `/${slug}` : ""}`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator(".media-hero")).toHaveCSS(
        "background-color",
        background,
      );
      await expect(page.locator("h1")).toHaveCSS("opacity", "1");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const cdp = await page.context().newCDPSession(page);
      await cdp.send("DOM.enable");
      await cdp.send("CSS.enable");
      const { root } = await cdp.send("DOM.getDocument");
      for (const [selector, family] of [
        ["h1", "Cormorant"],
        [".media-hero__intro", "Manrope"],
      ]) {
        const { nodeId } = await cdp.send("DOM.querySelector", {
          nodeId: root.nodeId,
          selector,
        });
        const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", {
          nodeId,
        });
        expect(
          fonts.some(
            (font) => font.isCustomFont && font.familyName.includes(family),
          ),
          selector,
        ).toBe(true);
      }
      await cdp.detach();
      const screenshotName = `phase6-1-refinements-media-${slug || "overview"}-${width}.png`;
      await expect.soft(page).toHaveScreenshot(screenshotName, {
        animations: "disabled",
        scale: "css",
        caret: "initial",
        maxDiffPixelRatio: 0.005,
        stylePath: path.join(__dirname, "screenshot.css"),
      });
      await testInfo.attach(`${slug || "overview"}-full-page`, {
        body: await page.screenshot({
          fullPage: true,
          animations: "disabled",
          caret: "initial",
        }),
        contentType: "image/png",
      });
    }
    expect(failures).toEqual([]);
  });
}
