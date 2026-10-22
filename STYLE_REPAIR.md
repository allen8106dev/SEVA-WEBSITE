# Styling diagnosis and repair

The reported failure was reproduced in Microsoft Edge against the existing development server at http://localhost:3000 before any source changes. The page returned HTTP 200 and its CSS returned HTTP 200, but the generated development stylesheet was incomplete. The generated chunk labeled `src/app/globals.css` contained the homepage rules instead of the shared global stylesheet. Theme tokens, base layout, controls, and font-family application were missing. Fonts were downloaded but not used for the page glyphs.

| Browser evidence     | Broken development output   | Clean development output                  |
| -------------------- | --------------------------- | ----------------------------------------- |
| Body background      | transparent                 | `rgb(247, 245, 239)`                      |
| Body text            | black, Times New Roman      | charcoal, Manrope                         |
| `--color-background` | empty                       | `#f7f5ef`                                 |
| Hero heading         | Times New Roman, 16px       | Cormorant Garamond, 93.6px at 1440px      |
| Primary link         | browser blue, transparent   | ivory text on deep green                  |
| Desktop navigation   | block                       | flex                                      |
| Hero grid            | block                       | two-column grid                           |
| Served CSS           | 14,653 characters, no theme | 28,840 characters, theme and shared rules |

The source imports in layout.tsx and globals.css were correct. Installed Tailwind CSS and @tailwindcss/postcss are both 4.3.3, using the valid v4 import/plugin configuration. Production rendering had been styled; the live development server's generated state was broken. No Tailwind v3 configuration, extra CSS loader, font download, or design rewrite was needed.

## Recovery and containment

The identified Next.js development process was stopped. Its generated `.next/dev` output was preserved as `.next/dev-broken-styles`, and the server was restarted on port 3000 with a clean generated directory. Without changing any design CSS, browser computed styles and actual font glyphs returned to their intended values. The exact event that corrupted the compiler state was not determined; this is not a claim that an upstream compiler defect has been permanently fixed.

`next.config.ts` now disables Turbopack filesystem caching for development to avoid restoring stale generated state across sessions. This affects warm development startup performance; production caching/configuration is unchanged. The installed Next.js type declaration and [official filesystem-cache documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopackFileSystemCache) support this option. The broken generated cache is ignored by Git and may be removed later once its diagnostic value is no longer needed.

## Why earlier tests missed it

The earlier suite launched a separate production server on port 3100. It did not inspect the user's long-running development process on port 3000. Contrast checks read root variables rather than checking actual controls and glyphs. Screenshots were captured as artifacts without an asserted visual baseline. DOM, accessibility, and overflow tests alone cannot establish that a page's styles have loaded.

## New safeguards

`tests/styles.spec.ts` checks 375px, 768px, and 1440px rendering, stylesheet responses/content, Tailwind utilities, resolved design tokens, actual body/heading/control styling, minimum button height, navigation layout, grid columns, section padding, and horizontal overflow. Chromium's font inspection confirms that Cormorant and Manrope glyphs actually render rather than merely appearing in a CSS font-family list. Browser request/console/page errors are collected.

Three viewport screenshot baselines under `tests/styles.spec.ts-snapshots` use reduced motion, loaded fonts, a CSS-pixel scale, hidden development chrome, and a small pixel-difference allowance. They compare the first viewport, avoiding a brittle whole-page image of changing provisional copy. Existing full-page/section captures continue to inspect the rest of the homepage. Baselines are Microsoft Edge/Windows specific; intentionally regenerate and review them on other browser/platform combinations.

```powershell
# Production regression suite, after a completed build:
npm.cmd run build
npm.cmd run test:e2e

# Check the actual development server, reusing localhost:3000 if already running:
npm.cmd run test:styles:dev
```

When styles regress, run the development check before restarting the server so the broken state is captured. Do not automatically update screenshot baselines to make a failure disappear. For intentional visual changes, generate new baselines with `npm.cmd run test:e2e -- tests/styles.spec.ts --project desktop --update-snapshots`, inspect all three images, then run both suites without update mode. Production and development compare against the same baselines.

The repaired page retains the existing ivory/charcoal/green/terracotta system, editorial type, clear controls, illustration captions, and seven distinct sections. No Phase 4 animations or speculative features were added. Real media, content approval, physical-device testing, screen-reader testing, and a full performance audit remain separate work.

Verification passed: TypeScript, ESLint, Prettier, production build, all 21 production browser tests, and the three live-development style/screenshot checks. The reviewed 375/768/1440px baselines match both servers. CSS resources return successfully, tokens resolve, actual custom fonts render, and mobile navigation/reduced motion remain covered by the passing suite. The development server is restored at http://localhost:3000. The styling foundation is ready for a separately requested Phase 4; production content approval is still pending.
