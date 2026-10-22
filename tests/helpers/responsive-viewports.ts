import { expect, type Page } from "@playwright/test";

export const responsiveViewports = [
  320, 375, 390, 428, 768, 1024, 1280, 1440, 1920,
] as const;

const touchViewports = [320, 375, 390, 428] as const;

export function viewportsForProject(projectName: string) {
  return projectName === "mobile" ? touchViewports : responsiveViewports;
}

export async function expectHeadingsToFit(page: Page, context: string) {
  const overflowingHeadings = await page
    .locator("main h1, main h2, main h3")
    .evaluateAll((headings) =>
      headings
        .filter((heading) => heading.scrollWidth > heading.clientWidth + 1)
        .map((heading) => heading.textContent?.trim() ?? "(empty heading)"),
    );
  expect(overflowingHeadings, context).toEqual([]);
}
