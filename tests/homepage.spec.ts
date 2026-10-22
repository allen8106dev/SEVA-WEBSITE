import { expect, test } from "@playwright/test";

test("homepage has seven accessible chapters and no misleading previews", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main > section")).toHaveCount(7);
  const labels = await page.locator("main > section").evaluateAll((sections) =>
    sections.map((section) => {
      const label = section.getAttribute("aria-labelledby");
      return label
        ? Boolean(document.getElementById(label)?.textContent?.trim())
        : false;
    }),
  );
  expect(labels.every(Boolean)).toBe(true);
  await expect(page.locator(".impact-area")).toHaveCount(2);
  await expect(page.locator(".impact-area .demo-note")).toHaveText([
    "Demonstration only — not a confirmed SEVA initiative.",
    "Demonstration only — not a confirmed SEVA initiative.",
  ]);
  await expect(page.locator(".statistics .statistic__pending")).toHaveCount(3);
  await expect(page.locator(".statistics .statistic__value")).toHaveCount(0);
  await expect(page.locator(".participation-options li")).toHaveCount(4);
  await expect(
    page.locator(".participation-options a, .participation-options button"),
  ).toHaveCount(0);
  await expect(page.locator("main form, video[autoplay]")).toHaveCount(0);
  expect(
    await page.locator('a[href*="#"]').evaluateAll((links) =>
      links.every((link) => {
        const url = new URL((link as HTMLAnchorElement).href);
        return (
          url.origin !== window.location.origin ||
          Boolean(document.getElementById(url.hash.slice(1)))
        );
      }),
    ),
  ).toBe(true);
});

test("participation actions reach real content and chapters retain mobile composition", async ({
  page,
}, testInfo) => {
  test.setTimeout(60000);
  await page.goto("/");
  await page
    .getByRole("link", { name: "Ways to take part", exact: true })
    .click();
  await expect(page).toHaveURL(/#participation$/);
  await page
    .getByRole("link", { name: "View the contact status", exact: true })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(
    page.getByText("Official contact details will be added once confirmed."),
  ).toBeVisible();
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const id of [
      "introduction",
      "purpose",
      "impact-areas",
      "stories",
      "website-status",
      "participation",
      "next-chapter",
    ]) {
      if (
        ![390, 1440].includes(width) &&
        !["introduction", "purpose", "participation"].includes(id)
      )
        continue;
      await page.locator(`#${id}`).screenshot({
        path: testInfo.outputPath(`${id}-${width}.png`),
        animations: "disabled",
        style: ".site-header { visibility: hidden; }",
      });
    }
  }
});
