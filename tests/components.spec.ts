import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "@playwright/test";
import { Button } from "../src/components/ui/button";
import { Statistics } from "../src/components/ui/statistics";

test("button states preserve native semantics and accessible names", async ({
  page,
}) => {
  const html = renderToStaticMarkup(
    createElement(
      "div",
      null,
      createElement(Button, { loading: true }, "Saving changes"),
      createElement(
        Button,
        { disabled: true, variant: "secondary" },
        "Unavailable",
      ),
      createElement(
        Button,
        { variant: "icon", "aria-label": "Open navigation" },
        "+",
      ),
    ),
  );
  await page.setContent(html);
  await expect(
    page.getByRole("button", { name: "Saving changes" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Saving changes" }),
  ).toHaveAttribute("aria-busy", "true");
  await expect(
    page.getByRole("button", { name: "Unavailable" }),
  ).toBeDisabled();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
});

test("verified numeric fixtures render their complete accessible value in server HTML", async ({
  page,
}) => {
  const html = renderToStaticMarkup(
    createElement(Statistics, {
      items: [
        {
          label: "Test fixture only",
          status: "verified",
          value: 1250,
          suffix: "+",
          source: "Isolated test fixture",
        },
        { label: "Pending fixture", status: "pending" },
      ],
    }),
  );
  await page.setContent(html);
  await expect(page.locator(".statistic__value .sr-only")).toHaveText("1,250+");
  await expect(
    page.locator('.statistic__value [aria-hidden="true"]'),
  ).toHaveText("1,250+");
  await expect(page.locator(".statistic__pending")).toHaveText("To be shared");
});
