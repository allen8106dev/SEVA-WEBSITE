import { expect, test } from "@playwright/test";
import path from "node:path";

const pages = [
  { id: "profile", route: "/profile", background: "rgb(222, 225, 255)" },
  { id: "about", route: "/profile/about", background: "rgb(255, 255, 255)" },
  {
    id: "vision-mission",
    route: "/profile/vision-mission",
    background: "rgb(43, 36, 105)",
  },
  {
    id: "leadership",
    route: "/profile/leadership",
    background: "rgb(43, 36, 105)",
  },
  {
    id: "history",
    route: "/profile/history",
    background: "rgb(255, 255, 255)",
  },
];

for (const width of [375, 1440]) {
  test(`Profile styles and reviewed page openings at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const item of pages) {
      await page.goto(item.route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator(".profile-opening")).toHaveCSS(
        "background-color",
        item.background,
      );
      await expect(page.locator(".profile-opening__grid")).toHaveCSS(
        "display",
        "grid",
      );
      await expect(page.locator("h1")).toHaveCSS("opacity", "1");
      const metrics = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        const heading = getComputedStyle(document.querySelector("h1")!);
        return {
          family: heading.fontFamily,
          configured: root
            .getPropertyValue("--font-editorial")
            .trim()
            .split(",")[0]
            .replaceAll('"', ""),
          size: parseFloat(heading.fontSize),
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      expect(metrics.configured).not.toBe("");
      expect(metrics.family).toContain(metrics.configured);
      expect(metrics.size).toBeGreaterThanOrEqual(width < 768 ? 36 : 54);
      expect(metrics.overflow).toBe(false);
      if (item.id === "vision-mission") {
        await expect(page.locator(".profile-values")).toHaveAttribute(
          "data-values-active",
          "false",
        );
        await expect(page.locator(".profile-value__word").first()).toHaveCSS(
          "color",
          "rgb(222, 225, 255)",
        );
      }
      await testInfo.attach(`${item.id}-computed-styles`, {
        body: JSON.stringify(metrics),
        contentType: "application/json",
      });
      await expect(page).toHaveScreenshot(
        `phase6-1-refinements-profile-${item.id}-${width}.png`,
        {
          animations: "disabled",
          scale: "css",
          caret: "initial",
          maxDiffPixelRatio: 0.005,
          stylePath: path.join(__dirname, "screenshot.css"),
        },
      );
    }
    expect(errors).toEqual([]);
  });
}
