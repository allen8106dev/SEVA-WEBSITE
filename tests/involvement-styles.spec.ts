import { test, expect } from "@playwright/test";
import path from "node:path";

const pages = [
  {
    route: "/get-involved",
    hero: ".involvement-hero",
    background: "rgb(222, 225, 255)",
    color: "rgb(41, 41, 41)",
    intro: ".involvement-hero__intro",
  },
  {
    route: "/get-involved/volunteer",
    hero: ".involvement-hero",
    background: "rgb(239, 238, 255)",
    color: "rgb(41, 41, 41)",
    intro: ".involvement-hero__intro",
  },
  {
    route: "/get-involved/csr",
    hero: ".involvement-hero",
    background: "rgb(43, 36, 105)",
    color: "rgb(255, 255, 255)",
    intro: ".involvement-hero__intro",
  },
  {
    route: "/get-involved/donate",
    hero: ".involvement-hero",
    background: "rgb(222, 225, 255)",
    color: "rgb(41, 41, 41)",
    intro: ".involvement-hero__intro",
  },
  {
    route: "/contact",
    hero: ".contact-hero",
    background: "rgb(222, 225, 255)",
    color: "rgb(41, 41, 41)",
    intro: ".contact-hero .body-text",
  },
] as const;

for (const width of [375, 1440]) {
  test(`Get Involved and Contact styles, fonts and reviewed openings at ${width}px`, async ({
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

    for (const entry of pages) {
      await page.goto(entry.route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator(entry.hero)).toHaveCSS(
        "background-color",
        entry.background,
      );
      await expect(page.locator(entry.hero)).toHaveCSS("color", entry.color);
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
        [entry.intro, "Manrope"],
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
          `${entry.route} ${selector}`,
        ).toBe(true);
      }
      await cdp.detach();
      await expect
        .soft(page)
        .toHaveScreenshot(
          `phase6-1-refinements-${entry.route.slice(1).replaceAll("/", "-")}-${width}.png`,
          {
            animations: "disabled",
            scale: "css",
            caret: "initial",
            maxDiffPixelRatio: 0.005,
            stylePath: path.join(__dirname, "screenshot.css"),
          },
        );
      await testInfo.attach(`${entry.route}-full-page`, {
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
