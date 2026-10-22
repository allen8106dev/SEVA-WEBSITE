import { expect, test } from "@playwright/test";
import { projects } from "../src/content/projects";

test.describe("Phase 5C.2B: Project Detail Pages", () => {
  for (const project of projects) {
    test(`${project.detailRoute} has polished responsive content, valid media, and safe metadata`, async ({
      page,
    }) => {
      test.setTimeout(90000);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });

      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(project.detailRoute);
      await page.evaluate(() => document.fonts.ready);

      // Single semantic h1
      const h1 = page.locator("main h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toBeVisible();

      // Data attribute marker
      await expect(
        page.locator(`[data-project-page="${project.slug}"]`),
      ).toBeVisible();

      // SEO Metadata
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        project.metaDescription,
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );

      // Breadcrumb Hierarchy: Home -> Programmes -> Focus Area -> Project
      const breadcrumbs = page.getByRole("navigation", { name: "Breadcrumb" });
      await expect(breadcrumbs).toBeVisible();
      await expect(breadcrumbs.locator('[aria-current="page"]')).toHaveCount(1);
      await expect(breadcrumbs.locator('[aria-current="page"]')).toHaveText(
        project.name,
      );
      await expect(
        breadcrumbs.getByRole("link", { name: "Programmes", exact: true }),
      ).toHaveAttribute("href", "/programmes");
      await expect(
        breadcrumbs.getByRole("link", {
          name: project.focusAreaName,
          exact: true,
        }),
      ).toHaveAttribute("href", `/programmes/${project.focusAreaId}`);

      // Media loads without error and with valid alt
      const images = await page.locator("main img").all();
      for (const image of images) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (element) => (element as HTMLImageElement).naturalWidth,
            ),
          )
          .toBeGreaterThan(0);
        const alt = await image.getAttribute("alt");
        expect(alt).toBeTruthy();
        expect(alt!.length).toBeGreaterThan(5);
      }

      // Responsive checks across all required widths (320px to 1920px)
      for (const width of [320, 375, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${project.detailRoute} at ${width}px has no horizontal overflow`,
        ).toBe(true);

        for (const heading of await page
          .locator("main h1, main h2, main h3")
          .all()) {
          expect(
            await heading.evaluate(
              (element) => element.scrollWidth <= element.clientWidth + 1,
            ),
            `${project.detailRoute} heading at ${width}px`,
          ).toBe(true);
        }
      }

      // Zero console errors
      expect(errors, `${project.detailRoute} console errors`).toHaveLength(0);
    });
  }

  test("programme preview cards link correctly to their corresponding project detail pages", async ({
    page,
  }) => {
    test.setTimeout(60000);

    // 1. Education -> CNEWA & Vidya Jyoti
    await page.goto("/programmes/education");
    await page.evaluate(() => document.fonts.ready);
    const cnewaCard = page
      .locator(".prog-project-card")
      .filter({ hasText: "CNEWA Non-Formal Education" });
    await expect(
      cnewaCard.locator('a[href="/programmes/education/cnewa"]'),
    ).toBeVisible();

    const vjCard = page
      .locator(".prog-project-card")
      .filter({ hasText: "Vidya Jyoti Scholarship Programme" });
    await expect(
      vjCard.locator('a[href="/programmes/education/vidya-jyoti"]'),
    ).toBeVisible();

    // 2. Women Empowerment -> Jeevan & Sui Daga
    await page.goto("/programmes/women-empowerment");
    await page.evaluate(() => document.fonts.ready);
    const jeevanCard = page
      .locator(".prog-project-card")
      .filter({ hasText: "Jeevan Project" });
    await expect(
      jeevanCard.locator('a[href="/programmes/women-empowerment/jeevan"]'),
    ).toBeVisible();

    const suiCard = page
      .locator(".prog-project-card")
      .filter({ hasText: "Sui Daga Tailoring Project" });
    await expect(
      suiCard.locator('a[href="/programmes/women-empowerment/sui-daga"]'),
    ).toBeVisible();

    // 3. Community Welfare -> SEVA Ruby Meal
    await page.goto("/programmes/community-welfare");
    await page.evaluate(() => document.fonts.ready);
    const rubyCard = page
      .locator(".prog-project-card")
      .filter({ hasText: "SEVA Ruby Meal" });
    await expect(
      rubyCard.locator(
        'a[href="/programmes/community-welfare/seva-ruby-meal"]',
      ),
    ).toBeVisible();

    // 4. Healthcare -> Healthcare Outreach
    await page.goto("/programmes/healthcare");
    await page.evaluate(() => document.fonts.ready);
    const hcCard = page
      .locator(".prog-project-card")
      .filter({ hasText: "Healthcare and Medical Outreach" });
    await expect(
      hcCard.locator('a[href="/programmes/healthcare/medical-outreach"]'),
    ).toBeVisible();
  });

  test("CNEWA Non-Formal Education displays documented figures and classroom photography", async ({
    page,
  }) => {
    test.setTimeout(45000);
    await page.goto("/programmes/education/cnewa");
    await page.evaluate(() => document.fonts.ready);

    await expect(
      page.locator(".proj-stat-card__metric", { hasText: "75+" }),
    ).toBeVisible();
    await expect(
      page.getByText("Enrolled Children", { exact: true }),
    ).toBeVisible();
    await expect(
      page.locator(".proj-stat-card__metric", { hasText: "~65%" }),
    ).toBeVisible();
    await expect(
      page.getByText("Daily Attendance", { exact: true }),
    ).toBeVisible();

    // Key activities
    await expect(
      page.locator(".proj-activities", { hasText: "Foundational literacy" }),
    ).toBeVisible();
    await expect(
      page.locator(".proj-activities", { hasText: "Bridge classes" }),
    ).toBeVisible();

    // Sibling and parent navigation
    await expect(
      page.locator(
        '.proj-navigation a[href="/programmes/education/vidya-jyoti"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator('.proj-navigation a[href="/programmes/education"]'),
    ).toBeVisible();
  });

  test("Vidya Jyoti clearly distinguishes 700 assisted from 478 in tuition centres without confusion", async ({
    page,
  }) => {
    test.setTimeout(45000);
    await page.goto("/programmes/education/vidya-jyoti");
    await page.evaluate(() => document.fonts.ready);

    await expect(
      page.locator(".proj-distinction__num", { hasText: "~700" }),
    ).toBeVisible();
    await expect(
      page.getByText("Children Assisted", { exact: true }),
    ).toBeVisible();
    await expect(
      page.locator(".proj-distinction__num", { hasText: "478" }),
    ).toBeVisible();
    await expect(
      page.getByText("Tuition Centre Students", { exact: true }),
    ).toBeVisible();

    // Sibling link to CNEWA
    await expect(
      page.locator('.proj-navigation a[href="/programmes/education/cnewa"]'),
    ).toBeVisible();
  });

  test("Jeevan Project highlights Raigad District location and 75–100 women trained", async ({
    page,
  }) => {
    test.setTimeout(45000);
    await page.goto("/programmes/women-empowerment/jeevan");
    await page.evaluate(() => document.fonts.ready);

    await expect(
      page.locator(".proj-location-tag", {
        hasText: "Raigad District, Maharashtra",
      }),
    ).toBeVisible();
    await expect(
      page.locator(".proj-stat-card__metric", { hasText: "75–100" }),
    ).toBeVisible();
    await expect(
      page.getByText("Women Trained", { exact: true }),
    ).toBeVisible();

    // Sibling link to Sui Daga
    await expect(
      page.locator(
        '.proj-navigation a[href="/programmes/women-empowerment/sui-daga"]',
      ),
    ).toBeVisible();
  });

  test("Sui Daga Tailoring Project presents two active centres and vocational stages", async ({
    page,
  }) => {
    test.setTimeout(45000);
    await page.goto("/programmes/women-empowerment/sui-daga");
    await page.evaluate(() => document.fonts.ready);

    await expect(
      page.locator(".proj-stat-card__metric", { hasText: "2" }),
    ).toBeVisible();
    await expect(
      page.getByText("Active Centres", { exact: true }),
    ).toBeVisible();
    await expect(
      page.locator(".proj-activities", {
        hasText: "Tailoring training",
      }),
    ).toBeVisible();

    // Cross-link to Skill Development
    await expect(
      page.locator(
        '.proj-synergy-banner a[href="/programmes/skill-development"]',
      ),
    ).toBeVisible();
  });

  test("SEVA Ruby Meal features weekly Friday service in Khadki-Pune and authentic gallery", async ({
    page,
  }) => {
    test.setTimeout(45000);
    await page.goto("/programmes/community-welfare/seva-ruby-meal");
    await page.evaluate(() => document.fonts.ready);

    await expect(
      page.getByText("Every Friday", { exact: false }).first(),
    ).toBeVisible();
    await expect(
      page.getByText("Khadki-Pune, Maharashtra", { exact: false }),
    ).toBeVisible();

    // Parent link to Community Welfare
    await expect(
      page.locator('.proj-navigation a[href="/programmes/community-welfare"]'),
    ).toBeVisible();
  });

  test("Healthcare and Medical Outreach details clinical continuum without invented statistics", async ({
    page,
  }) => {
    test.setTimeout(45000);
    await page.goto("/programmes/healthcare/medical-outreach");
    await page.evaluate(() => document.fonts.ready);

    await expect(page.getByText("Preventive Care")).toBeVisible();
    await expect(page.getByText("Mobile Medical Camps:")).toBeVisible();
    await expect(
      page.getByText("Clinical Ethics & Documentation"),
    ).toBeVisible();

    // Parent link to Healthcare
    await expect(
      page.locator('.proj-navigation a[href="/programmes/healthcare"]'),
    ).toBeVisible();
  });
});
