import type { Page } from "@playwright/test";

export interface AccessibilityAudit {
  mainH1Count: number;
  contrastIssues: { text: string; ratio: number; required: number }[];
  missingAlt: string[];
  unnamedControls: string[];
  headingSkips: [number, number][];
  duplicateIds: string[];
}

export async function auditVisibleContent(
  page: Page,
): Promise<AccessibilityAudit> {
  return page.evaluate(() => {
    type Color = [number, number, number, number];
    const parseColor = (value: string): Color | null => {
      const values = value.match(/[\d.]+/g)?.map(Number) ?? [];
      return values.length < 3
        ? null
        : [values[0], values[1], values[2], values[3] ?? 1];
    };
    const composite = (foreground: Color, background: Color): Color => {
      const alpha = foreground[3];
      return [
        foreground[0] * alpha + background[0] * (1 - alpha),
        foreground[1] * alpha + background[1] * (1 - alpha),
        foreground[2] * alpha + background[2] * (1 - alpha),
        1,
      ];
    };
    const luminance = (color: Color) => {
      const linear = color.slice(0, 3).map((value) => {
        const channel = value / 255;
        return channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    };
    const contrastRatio = (first: Color, second: Color) => {
      const a = luminance(first);
      const b = luminance(second);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    };
    const nameOf = (element: Element) => {
      const labelledBy = element.getAttribute("aria-labelledby");
      if (labelledBy) {
        const name = labelledBy
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent ?? "")
          .join(" ")
          .trim();
        if (name) return name;
      }
      const ariaLabel = element.getAttribute("aria-label")?.trim();
      if (ariaLabel) return ariaLabel;
      if (element instanceof HTMLInputElement) {
        if (element.labels?.length)
          return Array.from(element.labels)
            .map((label) => label.textContent ?? "")
            .join(" ")
            .trim();
        if (["submit", "reset", "button"].includes(element.type))
          return element.value.trim();
      }
      if (
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
      ) {
        if (element.labels?.length)
          return Array.from(element.labels)
            .map((label) => label.textContent ?? "")
            .join(" ")
            .trim();
      }
      const alt = element.querySelector("img[alt]")?.getAttribute("alt");
      return (
        element.textContent?.replace(/\s+/g, " ").trim() ||
        alt ||
        element.getAttribute("title")?.trim() ||
        ""
      );
    };

    const contrastIssues: AccessibilityAudit["contrastIssues"] = [];
    for (const element of document.querySelectorAll("main *")) {
      if (
        !Array.from(element.childNodes).some(
          (node) =>
            node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
        ) ||
        element.closest('[aria-hidden="true"]') ||
        element.closest(".sr-only") ||
        element.getClientRects().length === 0
      )
        continue;

      const chain: HTMLElement[] = [];
      let current: HTMLElement | null = element as HTMLElement;
      while (current) {
        chain.unshift(current);
        current = current.parentElement;
      }
      let background: Color = [255, 249, 235, 1];
      let hasImageBackground = false;
      for (const item of chain) {
        const style = getComputedStyle(item);
        if (style.backgroundImage !== "none") hasImageBackground = true;
        const parsed = parseColor(style.backgroundColor);
        if (parsed && parsed[3] > 0) background = composite(parsed, background);
      }
      if (hasImageBackground) continue;

      const style = getComputedStyle(element);
      const foreground = parseColor(style.color);
      if (!foreground) continue;
      const fontSize = Number.parseFloat(style.fontSize);
      const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
      const large = fontSize >= 24 || (fontWeight >= 700 && fontSize >= 18.67);
      const required = large ? 3 : 4.5;
      const ratio = contrastRatio(
        composite(foreground, background),
        background,
      );
      if (ratio < required)
        contrastIssues.push({
          text:
            element.textContent?.replace(/\s+/g, " ").trim().slice(0, 90) ?? "",
          ratio: Number(ratio.toFixed(2)),
          required,
        });
    }

    const missingAlt = Array.from(document.images)
      .filter((image) => !image.hasAttribute("alt"))
      .map((image) => image.currentSrc || image.src);
    const unnamedControls = Array.from(
      document.querySelectorAll(
        'a[href],button,input:not([type="hidden"]),select,textarea,[role="button"],[role="link"]',
      ),
    )
      .filter((element) => element.getClientRects().length > 0)
      .filter((element) => !nameOf(element))
      .map((element) => element.outerHTML.slice(0, 180));
    const headings = Array.from(
      document.querySelectorAll(
        "main h1,main h2,main h3,main h4,main h5,main h6",
      ),
    ).map((heading) => Number(heading.tagName.slice(1)));
    const headingSkips: [number, number][] = [];
    for (let index = 1; index < headings.length; index += 1)
      if (headings[index] > headings[index - 1] + 1)
        headingSkips.push([headings[index - 1], headings[index]]);

    const idCounts = new Map<string, number>();
    for (const element of document.querySelectorAll("[id]"))
      idCounts.set(element.id, (idCounts.get(element.id) ?? 0) + 1);

    return {
      mainH1Count: document.querySelectorAll("main h1").length,
      contrastIssues,
      missingAlt,
      unnamedControls,
      headingSkips,
      duplicateIds: Array.from(idCounts)
        .filter(([, count]) => count > 1)
        .map(([id]) => id),
    };
  });
}
