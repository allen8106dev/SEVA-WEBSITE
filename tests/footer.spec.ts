import { expect, test } from "@playwright/test";

test("footer keeps the official logo, contacts, inquiry, and developer credit", async ({
  page,
}) => {
  await page.goto("/");
  const footer = page.locator("footer.site-footer");

  await expect(
    footer.getByRole("link", { name: "SEVA Social Service Society home" }),
  ).toBeVisible();
  await expect(footer.locator(".footer-logo-image")).toBeVisible();
  await expect(footer.getByRole("navigation")).toHaveCount(0);
  await expect(footer.getByRole("heading", { name: "Explore" })).toHaveCount(0);
  await expect(footer.getByText("Love In Action", { exact: true })).toHaveCount(
    0,
  );
  await expect(
    footer.locator(".footer-contact-column .footer-brand-lockup"),
  ).toHaveCount(1);

  const mapSection = page.locator("main > .site-map");
  await expect(
    mapSection.getByRole("heading", { name: "Find us" }),
  ).toBeVisible();
  await expect(mapSection.locator("iframe")).toHaveAttribute(
    "src",
    /^https:\/\/maps\.google\.com\/maps\?q=.*&z=15&output=embed$/,
  );
  await expect(mapSection.locator("iframe")).toHaveAttribute("loading", "lazy");
  await expect(page.locator(".site-map + footer.site-footer")).toHaveCount(1);

  await expect(
    footer.getByRole("heading", { name: "Contact", exact: true }),
  ).toBeVisible();
  await expect(
    footer.getByRole("heading", { name: "Get in touch", exact: true }),
  ).toBeVisible();
  await expect(
    footer.getByRole("link", { name: "+91 8856031349" }),
  ).toHaveAttribute("href", "tel:+918856031349");
  await expect(
    footer.getByRole("link", { name: "sevassspune@gmail.com" }),
  ).toHaveAttribute("href", "mailto:sevassspune@gmail.com");
  await expect(
    footer.getByText("St. Mary's Malankara Catholic Cathedral"),
  ).toBeVisible();
  await expect(footer.getByText("51 Bhau Patil Road, Bopodi")).toBeVisible();

  const inquiry = footer.locator(".footer-inquiry");
  await expect(inquiry.getByLabel("Name")).toHaveAttribute("required", "");
  await expect(inquiry.getByLabel("Email")).toHaveAttribute("type", "email");
  await expect(inquiry.getByLabel("Message")).toHaveAttribute(
    "maxlength",
    "180",
  );
  await expect(inquiry.getByText("0 / 180")).toBeVisible();
  await expect(
    footer.getByRole("link", { name: "Allen Joseph" }),
  ).toHaveAttribute("href", "https://linktr.ee/allen8106.dev");
  await expect(
    footer.getByRole("link", { name: "Allen Joseph" }),
  ).toHaveAttribute("rel", "noopener noreferrer");
  await expect(
    footer.getByRole("link", { name: "Back to top" }),
  ).toHaveAttribute("href", "#top");
});

test("footer arrow returns to the top and follows reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const footer = page.locator("footer.site-footer");
  await footer.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await footer.getByRole("link", { name: "Back to top" }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("copyright and powered-by credit share a line on desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const footer = page.locator("footer.site-footer");
  const copyright = await footer.locator(".footer-copyright").boundingBox();
  const credit = await footer.locator(".footer-credit").boundingBox();

  expect(Math.abs(copyright!.y - credit!.y)).toBeLessThanOrEqual(1);
});
