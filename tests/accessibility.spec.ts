import { expect, test } from "@playwright/test";
import { interiorNavigation } from "../src/config/navigation";
import { auditVisibleContent } from "./helpers/accessibility-audit";

test("public routes retain readable text, named controls, image alternatives and heading order", async ({
  page,
}) => {
  test.setTimeout(120000);
  const routes = Array.from(
    new Set(["/", ...interiorNavigation.map((item) => item.href)]),
  );

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes) {
      await page.goto(route);
      const audit = await auditVisibleContent(page);
      expect(audit.mainH1Count, `${route} at ${width}px h1 count`).toBe(1);
      expect(
        audit.contrastIssues,
        `${route} at ${width}px text contrast`,
      ).toEqual([]);
      expect(audit.missingAlt, `${route} image alternatives`).toEqual([]);
      expect(audit.unnamedControls, `${route} control names`).toEqual([]);
      expect(audit.headingSkips, `${route} heading hierarchy`).toEqual([]);
      expect(audit.duplicateIds, `${route} unique ids`).toEqual([]);
    }
  }
});
