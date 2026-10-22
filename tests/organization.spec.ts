import { expect, test } from "@playwright/test";
import { organization } from "../src/content/organization";
import { leadershipProfiles } from "../src/content/leadership";
import { focusAreas } from "../src/content/focus-areas";
import { projects } from "../src/content/projects";
import { impactMetrics } from "../src/content/impact";
import { contactInfo } from "../src/content/contact";

test("centralized content models match official SEVA institutional records", () => {
  expect(organization.name).toBe("SEVA Social Service Society");
  expect(organization.shortName).toBe("SEVA");
  expect(organization.tagline).toBe("Love In Action");
  expect(organization.establishedYear).toBe(2015);
  expect(organization.operationalStates).toEqual([
    "Maharashtra",
    "Tamil Nadu",
    "Andhra Pradesh",
  ]);

  // Leadership profiles (4 official leaders)
  expect(leadershipProfiles).toHaveLength(4);
  expect(leadershipProfiles.map((l) => l.name)).toEqual([
    "H E Dr. Mathews Mar Pachomios OIC",
    "Rt Rev. Msgr. Dr. Shaji Mathews Vazhayil",
    "Very Rev. Dr. Joshy Vazhappillethu",
    "Rev. Fr. Abraham Thanuvelil",
  ]);

  // 7 Focus Areas
  expect(focusAreas).toHaveLength(7);
  const focusIds = focusAreas.map((f) => f.id);
  expect(focusIds).toContain("education");
  expect(focusIds).toContain("healthcare");
  expect(focusIds).toContain("women-empowerment");
  expect(focusIds).toContain("community-welfare");
  expect(focusIds).toContain("rural-tribal-development");
  expect(focusIds).toContain("skill-development");
  expect(focusIds).toContain("relief-works");

  // 6 Projects
  expect(projects).toHaveLength(6);
  const projectIds = projects.map((p) => p.id);
  expect(projectIds).toContain("cnewa-education");
  expect(projectIds).toContain("vidya-jyoti");
  expect(projectIds).toContain("jeevan-project");
  expect(projectIds).toContain("sui-daga-tailoring");
  expect(projectIds).toContain("seva-ruby-meal");
  expect(projectIds).toContain("healthcare-outreach");

  // Impact metrics
  expect(impactMetrics.length).toBeGreaterThanOrEqual(8);
  const headline = impactMetrics.filter((m) => m.isHeadline);
  expect(headline).toHaveLength(3);
  expect(headline[0].displayFormat).toBe("1,000+");
  expect(headline[1].displayFormat).toBe("15+");
  expect(headline[2].displayFormat).toBe("3");

  // Contact info
  expect(contactInfo.organizationName).toBe("SEVA Social Service Society");
  expect(contactInfo.contactPerson).toBe("Rev. Fr. Abraham Thanuvelil");
  expect(contactInfo.role).toBe("Director");
  expect(contactInfo.phone.display).toBe("+91 8856031349");
  expect(contactInfo.email.display).toBe("sevassspune@gmail.com");
  expect(contactInfo.address.city).toBe("Pune");
});

test("rendered homepage faithfully reflects SEVA organizational identity", async ({
  page,
}) => {
  await page.goto("/");

  // Check branding & tagline in header/hero
  await expect(page.locator(".home-hero h1")).toHaveText(
    "Love in action. Restoring dignity, transforming lives.",
  );
  await expect(page.locator(".home-hero")).toContainText("LOVE IN ACTION");
  await expect(page.locator(".home-hero")).toContainText("Established 2015");

  // No provisional 2026 references exist in the rendered markup
  const pageContent = await page.content();
  expect(pageContent).not.toContain("EST. 2026");
  expect(pageContent).not.toContain("SEVA 2026");

  // Check Purpose vision & mission
  await expect(page.locator("#purpose")).toContainText(
    "To build a society founded on human and divine values: Love, Equality, Equity, and Peace.",
  );
  await expect(page.locator("#purpose")).toContainText(
    "Restore the dignity of marginalized communities through awareness, education, empowerment, community organization, and sustainable development.",
  );

  // Check Focus areas
  await expect(page.locator("#impact-areas")).toContainText(
    "Foundational education and academic mentoring.",
  );
  await expect(page.locator("#impact-areas")).toContainText(
    "Sustainable livelihoods and women's leadership.",
  );

  // Check Story / Jeevan project
  await expect(page.locator("#stories")).toContainText("Jeevan Project");
  await expect(page.locator("#stories")).toContainText("Raigad District");

  // Check Impact statistics
  const stats = page.locator(".statistics .statistic__value");
  await expect(stats).toHaveCount(3);

  // Check Footer contact information
  await expect(page.locator("#contact")).toContainText(
    "SEVA Social Service Society",
  );
  await expect(page.locator("#contact")).toContainText(
    "Rev. Fr. Abraham Thanuvelil",
  );
  await expect(
    page.locator('#contact a[href="tel:+918856031349"]'),
  ).toBeVisible();
  await expect(
    page.locator('#contact a[href="mailto:sevassspune@gmail.com"]'),
  ).toBeVisible();
  await expect(page.locator("#contact")).toContainText("Bopodi, Pune");
});
