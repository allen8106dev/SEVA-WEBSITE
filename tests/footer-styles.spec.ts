import { expect, test } from "@playwright/test";

const viewports = [
  { width: 320, height: 780 },
  { width: 375, height: 844 },
  { width: 390, height: 844 },
  { width: 428, height: 926 },
  { width: 768, height: 900 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

test("footer keeps the logo, contacts, and form visible at the page bottom", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const footer = page.locator("footer.site-footer");

  for (const { width, height } of viewports) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await expect(footer.locator(".footer-logo-image")).toBeVisible();
    await expect(
      footer.getByRole("heading", { name: "Contact", exact: true }),
    ).toBeVisible();
    await expect(
      footer.getByRole("heading", { name: "Get in touch", exact: true }),
    ).toBeVisible();
    await expect(footer.getByRole("navigation")).toHaveCount(0);

    const address = footer.locator(".footer-contact-address");
    const logo = footer.locator(".footer-logo-image");
    const addressBounds = await address.boundingBox();
    const logoBounds = await logo.boundingBox();
    expect(logoBounds!.y).toBeGreaterThanOrEqual(
      addressBounds!.y + addressBounds!.height,
    );

    const layout = await footer.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const header = document.querySelector<HTMLElement>(".site-header");
      const headerBounds = header?.getBoundingClientRect();
      const overlapsHeader = Boolean(
        headerBounds &&
        bounds.left < headerBounds.right &&
        bounds.right > headerBounds.left &&
        bounds.top < headerBounds.bottom &&
        bounds.bottom > headerBounds.top,
      );
      const hit = overlapsHeader
        ? document.elementFromPoint(
            (Math.max(bounds.left, headerBounds!.left) +
              Math.min(bounds.right, headerBounds!.right)) /
              2,
            (Math.max(bounds.top, headerBounds!.top) +
              Math.min(bounds.bottom, headerBounds!.bottom)) /
              2,
          )
        : null;
      const logo = element.querySelector(".footer-logo-image");
      const controls = Array.from(
        element.querySelectorAll<HTMLElement>(
          ".footer-contact-details a, .footer-inquiry__contact-fields input, .footer-inquiry__message textarea, .footer-inquiry__submit, .footer-back-to-top",
        ),
      ).map((control) => control.getBoundingClientRect().height);

      return {
        height: bounds.height,
        top: bounds.top,
        bottom: bounds.bottom,
        footerWidth: element.clientWidth,
        footerScrollWidth: element.scrollWidth,
        documentWidth: document.documentElement.scrollWidth,
        logoWidth: logo?.getBoundingClientRect().width ?? 0,
        controlHeights: controls,
        navbarCoversFooter: Boolean(header && hit && header.contains(hit)),
      };
    });

    expect(
      layout.documentWidth,
      `${width}px document horizontal overflow`,
    ).toBeLessThanOrEqual(width);
    expect(
      layout.footerScrollWidth,
      `${width}px footer horizontal overflow`,
    ).toBeLessThanOrEqual(layout.footerWidth);
    expect(
      layout.logoWidth,
      `${width}px footer logo is prominent`,
    ).toBeGreaterThanOrEqual(Math.min(180, width - 48));
    expect(
      layout.controlHeights.every((controlHeight) => controlHeight >= 46),
      `${width}px footer controls remain at least 46px tall`,
    ).toBe(true);
    expect(
      layout.navbarCoversFooter,
      `${width}px navbar does not cover the footer at the page bottom`,
    ).toBe(false);

    if (width >= 1366) {
      expect(
        layout.height,
        `${width}x${height}px complete footer height`,
      ).toBeLessThanOrEqual(height);
      expect(
        layout.top,
        `${width}px footer begins in the viewport`,
      ).toBeGreaterThanOrEqual(0);
      expect(
        layout.bottom,
        `${width}px footer ends in the viewport`,
      ).toBeLessThanOrEqual(height + 1);
    }

    if ([375, 768, 1366, 1440].includes(width)) {
      await page.locator(".skip-link").evaluate((element) => {
        (element as HTMLElement).blur();
      });
      await page.addStyleTag({
        content:
          ".skip-link, nextjs-portal { display: none !important; }",
      });
      await footer.screenshot({
        path: testInfo.outputPath(`footer-${width}-${height}.png`),
        animations: "disabled",
      });
    }
  }
});
