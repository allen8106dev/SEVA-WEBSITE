import { expect, test } from "@playwright/test";
import { viewportsForProject } from "./helpers/responsive-viewports";

test("homepage has seven accessible chapters and no misleading previews", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main > .home-page > section")).toHaveCount(7);
  const labels = await page
    .locator("main > .home-page > section")
    .evaluateAll((sections) =>
      sections.map((section) => {
        const label = section.getAttribute("aria-labelledby");
        return label
          ? Boolean(document.getElementById(label)?.textContent?.trim())
          : false;
      }),
    );
  expect(labels.every(Boolean)).toBe(true);
  await expect(page.locator(".impact-area")).toHaveCount(3);
  await expect(page.locator(".impact-area .demo-note")).toHaveText([
    "Official SEVA focus area · Encompasses Vidya Jyoti and CNEWA non-formal education programs.",
    "Official SEVA focus area · Encompasses the Jeevan Project (Raigad) and Sui Daga tailoring centres.",
    "Official SEVA focus area · Includes weekly Ruby Meal food distributions.",
  ]);
  await expect(page.locator(".statistics .statistic__pending")).toHaveCount(0);
  await expect(page.locator(".statistics .statistic__value")).toHaveCount(3);
  await expect(page.locator(".statistics .statistic__value")).toHaveText([
    "1,000+",
    "15+",
    "3",
  ]);
  await expect(
    page.locator('.statistic[data-statistic-status="reported"]'),
  ).toHaveCount(3);
  await expect(page.locator(".statistic__audit")).toHaveText([
    "Organization-reported · Audit pending",
    "Organization-reported · Audit pending",
    "Organization-reported · Audit pending",
  ]);
  await expect(page.locator(".areas-section__view-all")).toHaveCount(1);
  await expect(page.locator(".areas-section__view-all")).toHaveAttribute(
    "href",
    "/programmes",
  );
  await expect(page.locator("#impact-areas a")).toHaveCount(1);
  await expect(page.locator(".focus-area-directory")).toHaveCount(0);
  const whatsapp = page.getByRole("link", {
    name: "Chat with SEVA on WhatsApp at +91 8856031349",
  });
  await expect(whatsapp).toHaveAttribute(
    "href",
    "https://wa.me/918856031349",
  );
  await expect(whatsapp).toHaveAttribute("target", "_blank");
  await expect(whatsapp).toHaveCSS("position", "fixed");
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
  await expect(page.getByText("sevassspune@gmail.com")).toBeVisible();
  await expect(page.getByText("+91 8856031349")).toBeVisible();
  const widths = viewportsForProject(testInfo.project.name);
  for (const width of widths) {
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
