import { expect, test } from "@playwright/test";

test("hero choreography stays readable and immediately interactive", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const lines = page.locator(".home-hero h1 > :is(span, em)");
  await expect(lines).toHaveCount(3);
  const timings = await lines.evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element);
      return {
        delay: parseFloat(style.animationDelay),
        opacity: parseFloat(style.opacity),
        name: style.animationName,
      };
    }),
  );
  expect(
    timings.every(
      (line) => line.opacity === 1 && line.name === "hero-line-settle",
    ),
  ).toBe(true);
  expect(timings[0].delay).toBeLessThan(timings[1].delay);
  expect(timings[1].delay).toBeLessThan(timings[2].delay);
  await expect(
    page.getByRole("link", { name: "Explore the beginning", exact: true }),
  ).toBeEnabled();
  // Sample animation progress deterministically for review, without asserting exact raster frames.
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      if (
        animation instanceof CSSAnimation &&
        animation.animationName.startsWith("hero-")
      ) {
        animation.pause();
        const timing = animation.effect!.getTiming();
        animation.currentTime =
          Number(timing.delay) + Number(timing.duration) * 0.4;
      }
    }
  });
  await page.screenshot({ path: testInfo.outputPath("hero-in-progress.png") });
  await page
    .getByRole("link", { name: "Explore the beginning", exact: true })
    .click();
  await expect(page).toHaveURL(/#purpose$/);
});

test("rapid native scrolling leaves every chapter readable and story movement bounded", async ({
  page,
}, testInfo) => {
  test.setTimeout(60000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  for (const id of [
    "next-chapter",
    "purpose",
    "stories",
    "introduction",
    "participation",
    "impact-areas",
    "stories",
  ]) {
    await page.locator(`#${id}`).evaluate((element) =>
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 150,
        behavior: "instant",
      }),
    );
  }
  const capable = await page.evaluate(
    () =>
      matchMedia("(min-width: 48rem) and (hover: hover) and (pointer: fine)")
        .matches,
  );
  const layer = page.locator("[data-parallax-layer]");
  await expect(layer).toHaveAttribute(
    "data-motion-active",
    capable ? "true" : "false",
  );
  if (capable) {
    const read = () =>
      layer.evaluate((element) =>
        parseFloat(getComputedStyle(element).getPropertyValue("--parallax-y")),
      );
    // Scroll to the mid-point of the stories section to ensure parallax is in the
    // middle of its travel range, not clamped at an extreme end.
    await page.locator("#stories").evaluate((element) =>
      window.scrollTo({
        top:
          element.getBoundingClientRect().top +
          window.scrollY +
          element.getBoundingClientRect().height / 2 -
          window.innerHeight / 2,
        behavior: "instant",
      }),
    );
    await expect.poll(read).toBeGreaterThanOrEqual(-12);
    await expect.poll(read).toBeLessThanOrEqual(12);
    const before = await read();
    await page.evaluate(() =>
      window.scrollBy({ top: 200, behavior: "instant" }),
    );
    await expect
      .poll(async () => Math.abs((await read()) - before))
      .toBeGreaterThan(0.1);
    await expect(page.locator(".story-copy")).toHaveCSS("transform", "none");
  }
  await page.locator("#stories").screenshot({
    path: testInfo.outputPath("story-mid-scroll.png"),
    style: ".site-header, .skip-link { visibility: hidden; }",
  });
  for (const heading of await page.locator("main h1, main h2, main h3").all()) {
    await expect(heading).toBeVisible();
    expect(
      await heading.evaluate((element) =>
        parseFloat(getComputedStyle(element).opacity),
      ),
    ).toBeGreaterThan(0);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator("[data-count-value]")).toHaveCount(0);
  if (capable) {
    const area = page.locator(".impact-area").first();
    await area.hover();
    await expect(area.locator(".media-frame__visual > svg")).not.toHaveCSS(
      "transform",
      "none",
    );
    await expect(area.locator(".demo-note")).toBeVisible();
    await expect(area).not.toHaveAttribute("tabindex", /.+/);
    await area.screenshot({
      path: testInfo.outputPath("impact-hover.png"),
      style: ".site-header, .skip-link { visibility: hidden; }",
    });
  }
  expect(errors).toEqual([]);
});

test("changing reduced motion removes effects without breaking menu focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator("#stories").scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-parallax-layer]")).toHaveAttribute(
    "data-motion-active",
    "false",
  );
  for (const selector of [
    "[data-reveal]",
    ".hero-media-entrance",
    ".home-hero h1 > span",
    ".scroll-media__layer svg",
  ]) {
    for (const element of await page.locator(selector).all())
      await expect(element).toHaveCSS("transform", "none");
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  const toggle = page.locator("button[aria-controls='mobile-navigation']");
  await toggle.click();
  await page.keyboard.press("Tab");
  await expect(page.locator("#mobile-navigation a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(page.locator("#mobile-navigation")).toHaveAttribute("inert", "");
  await expect(page.locator("#mobile-navigation")).toBeHidden();
});

test("touch portrait and landscape retain content without parallax or hover dependency", async ({
  browser,
  baseURL,
}, testInfo) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 812, height: 375 },
  ]) {
    await page.setViewportSize(viewport);
    await page.locator("#impact-areas").scrollIntoViewIfNeeded();
    await expect(page.locator(".impact-area .demo-note")).toHaveCount(2);
    await expect(page.locator("[data-parallax-layer]")).toHaveAttribute(
      "data-motion-active",
      "false",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(`touch-${viewport.width}.png`),
    });
  }
  await context.close();
});
