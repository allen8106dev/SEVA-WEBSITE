import { expect, test } from "@playwright/test";
import {
  expectHeadingsToFit,
  viewportsForProject,
} from "./helpers/responsive-viewports";

test("Get Involved pathways connect to the completed participation pages", async ({
  page,
}) => {
  await page.goto("/get-involved");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Be part of",
  );
  await expect(
    page.getByRole("link", { name: /Explore volunteering/ }),
  ).toHaveAttribute("href", "/get-involved/volunteer");
  await expect(
    page.getByRole("link", { name: /Explore partnerships/ }),
  ).toHaveAttribute("href", "/get-involved/csr");
  await expect(
    page.getByRole("link", { name: /Donation information/ }),
  ).toHaveAttribute("href", "/get-involved/donate");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
});

test("volunteer page uses an email inquiry and makes no open-application claim", async ({
  page,
}) => {
  await page.goto("/get-involved/volunteer");
  for (const text of [
    "Education & Tuition Centres",
    "Health Camps & Medical Outreach",
    "Community Outreach & Elder Care",
    "Tree Plantation & Environmental Drives",
    "Weekly Ruby Meal Distribution",
    "Relief & Emergency Disaster Response",
    "CSR Employee Engagement Programs",
  ])
    await expect(page.getByRole("heading", { name: text })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Email a volunteer inquiry/ }),
  ).toHaveAttribute("href", /^mailto:sevassspune@gmail\.com\?subject=/);
  await expect(page.getByText(/does not submit an application/)).toBeVisible();
});

test("CSR and donation pages use clear inquiry pathways without invented payment details", async ({
  page,
}) => {
  await page.goto("/get-involved/csr");
  for (const area of [
    "Education & Tuition Centres",
    "Scholarships & Academic Mentoring",
    "Healthcare & Preventive Camps",
    "Nutrition & Child Monitoring",
    "Women's Empowerment & Self-Help Groups",
    "Livelihood Development & Vocational Training",
    "Rural Infrastructure & Natural Resource Stewardship",
    "Disaster Relief & Rehabilitation",
  ])
    await expect(
      page.getByRole("heading", { name: area, exact: true }),
    ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Email a CSR inquiry/ }),
  ).toHaveAttribute("href", /^mailto:sevassspune@gmail\.com\?subject=/);
  await expect(
    page.locator(".csr-page .involvement-hero .body-text"),
  ).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(page.locator(".involvement-cta--blue .button")).toHaveCSS(
    "background-color",
    "rgb(222, 225, 255)",
  );
  await page.goto("/get-involved/donate");
  await expect(
    page.getByRole("heading", { name: "Seva Vidhya Jyothi" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Seva Social Service Society",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Seva Ruby Meal" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Request donation information/ }),
  ).toHaveAttribute("href", /^mailto:sevassspune@gmail\.com\?subject=/);
  const html = await page.locator("main").innerText();
  expect(html).not.toMatch(/\b\d{9,18}\b|IFSC|UPI ID|upi:\/\//i);
  await expect(
    page.getByRole("link", { name: /Donate now|Pay now/i }),
  ).toHaveCount(0);
});

test("Contact exposes verified channels, address, email pathway and map link", async ({
  page,
}) => {
  await page.goto("/contact");
  await expect(
    page.getByRole("heading", {
      name: "SEVA Social Service Society",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.locator("main").getByRole("link", { name: "+91 8856031349" }),
  ).toHaveAttribute("href", "tel:+918856031349");
  await expect(
    page.locator("main").getByRole("link", { name: "sevassspune@gmail.com" }),
  ).toHaveAttribute("href", "mailto:sevassspune@gmail.com");
  await expect(
    page.locator("main").getByText("51 Bhau Patil Road"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Open address in maps/ }),
  ).toHaveAttribute("href", /google\.com\/maps\/search/);
  await expect(page.locator(".contact-inquiry")).toHaveCount(0);
  const form = page.locator(".footer-inquiry");
  await expect(form.getByLabel("Name")).toHaveAttribute("required", "");
  await expect(form.getByLabel("Email")).toHaveAttribute("type", "email");
  await expect(form.getByLabel("Message")).toHaveAttribute("maxlength", "180");
  await expect(form.locator("input")).toHaveCount(2);
  await expect(form.getByRole("button", { name: "Submit" })).toBeVisible();
  await expect(page.locator("footer")).toContainText(
    "This website does not send messages",
  );
});

test("all Phase 5E routes fit target viewport widths and retain visible content", async ({
  page,
}, testInfo) => {
  for (const width of viewportsForProject(testInfo.project.name)) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of [
      "/get-involved",
      "/get-involved/volunteer",
      "/get-involved/csr",
      "/get-involved/donate",
      "/contact",
    ]) {
      await page.goto(route);
      await expect(page.locator("main h1")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow, `${route} at ${width}px`).toBe(false);
      await expectHeadingsToFit(page, `${route} headings at ${width}px`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, nofollow",
      );
    }
  }
});
