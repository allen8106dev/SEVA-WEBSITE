# SEVA website · Phase 4

A preliminary seven-section homepage for SEVA’s future official website, built on the existing Next.js foundation and design system. All design and copy are provisional; demonstration themes, illustrations, pending statistics, and participation previews are explicitly labeled. No organizational activities or contact details have been assumed.

## Run locally

Prerequisites: Node.js 22 or newer (Node.js 24 LTS recommended), npm, and Git.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. On Windows PowerShell with script execution disabled, use `npm.cmd` in place of `npm`.

No environment variables are required for local development. To configure optional settings, copy `.env.example` to `.env.local`. `SITE_URL` must be the confirmed HTTP(S) origin without a path, credentials, query, or fragment. Leave it unset during initial development. `SITE_INDEXABLE` defaults to false. Never commit `.env.local` or secrets.

## Commands

```sh
npm run typecheck
npm run lint
npm run format:check
npm run format
npm run build
npm run start
npm run test:e2e
npm run test:styles:dev
```

`start` serves a completed production build. Browser tests start their own production server on port 3100 to avoid the normal development port; keep 3100 available. Tests use installed Microsoft Edge. On machines without Edge, install it with `npx playwright install msedge`, or change the test projects to an installed Playwright Chromium browser. Browser installation is a machine-level prerequisite, not a runtime app dependency.

## Structure

- `src/app`: routes, root layout, global styles, error page, and metadata endpoints.
- `src/components/layout`: shared header, mobile navigation, and footer.
- `src/components/sections`: starter page sections.
- `src/content/home.ts`: typed homepage copy, illustrative media, statistics, and previews.
- `src/styles/home.css`: homepage compositions extending shared design tokens.
- `src/components/ui`: reusable layout, typography, controls, media, and editorial panel.
- `src/components/animations`: the single reusable reveal used by the initial layout.
- `src/config/site.ts`: organization label, navigation, URL validation, indexing controls.
- `src/styles/tokens.css`: provisional palette, typography, spacing, and motion tokens.
- `src/config/motion.ts`: the shared CSS and Motion timing source.
- `src/assets/fonts`: local WOFF2 font assets, licenses, and provenance.
- `tests`: production browser checks for navigation, responsive overflow, SSR content, and SEO.

Add `features`, services, hooks, types, and public media folders only when real requirements need them. Future feature modules should own their domain logic while shared UI stays in components. MediaFrame supports `next/image`, reserved ratios, captions, and focal points for future verified imagery. The current illustration is decorative inline SVG, explicitly identified as provisional. Cormorant Garamond and Manrope are locally bundled using `next/font/local`; all three WOFF2 files total about 70 KB. Font licenses are included. No dependency or environment changes are needed for Phase 2.

Read [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) before extending the visual system. It documents the palette, type scale, component APIs, spacing, motion, imagery, accessibility, responsive conventions, and Phase 3 media/content replacement. The seven-section homepage and Phase 4 motion layer are implemented. No npm dependency or environment setting was added for these phases.

Phase 4 adds CSS hero choreography, editorial/media reveals, desktop-only bounded story parallax, control feedback, and accessible mobile-menu transitions using the existing Motion package. Current statistic placeholders remain static; sourced numeric values can opt into an accessible count-up. See [MOTION_SYSTEM.md](MOTION_SYSTEM.md) for tokens, lifecycle, reduced-motion/no-JavaScript behavior, and animation checks. Native scrolling and the styling repair remain intact. No dependency, backend, or environment setting was added for Phase 4.

## GitHub and Vercel

The local Git repository is initialized without a remote. Review changes and create a first commit before connecting your own GitHub repository. Do not commit environment files.

Import that repository into Vercel using the Next.js preset, the repository root, `npm ci`, and `npm run build`; use Node.js 24. No static export or custom server is required. Configure a confirmed `SITE_URL` in the production environment when available. Keep `SITE_INDEXABLE=false` until approved content is ready. Preview deployments are forced unindexable using `VERCEL_ENV`; noindex and robots rules are not access control. Use Vercel deployment protection if previews must be private.

Metadata and SEO routes are prerendered: rebuild after changing configuration. Only turn indexing on in production after checking canonical URLs, robots, sitemap, and final content. No hosting account, production domain, backend, or payment integration is configured by this phase.

See [SEVA_PROJECT_BLUEPRINT.md](SEVA_PROJECT_BLUEPRINT.md) for architecture, decisions, and next steps.

## Visual Transformation · "Humanity in Action"

A major visual redesign was implemented to transform the website from a wireframe-like prototype into a cinematic, editorial digital experience.

- **Theme**: "Humanity in Action" — combining documentary-style photography with contemporary literary editorial design.
- **Photography**: High-resolution curated documentary placeholder photographs from Unsplash in `public/images/`, with complete attributions and replacement instructions documented in [ATTRIBUTION.md](ATTRIBUTION.md).
- **Asymmetric & Alternating Chapters**: Light editorial spreads paired with deep evergreen and obsidian dark chapters (`#1e3629`, `#162019`).
- **Signature Visual Moments**: Hero-to-purpose transition, documentary bounded parallax on the Human Stories portrait, and high-contrast chapter rhythm.
- **Test Results**: All 31 automated Playwright browser tests, development server regression tests (`test:styles:dev`), TypeScript checks, ESLint, and production builds pass.

## Verification and dependency notes

See [STYLE_REPAIR.md](STYLE_REPAIR.md) for the reproduced development styling failure, recovery, and regression safeguards. `test:e2e` includes computed-style checks and screenshot comparisons at 375/768/1440px. `test:styles:dev` reuses the actual server on port 3000, or starts one if absent, so a healthy production build cannot conceal broken development CSS. Reviewed screenshot baselines are tracked under `tests/styles.spec.ts-snapshots`. Development filesystem caching is disabled after the observed stale-output failure; production configuration and dependencies are unchanged.

Phase 4 delivery passed TypeScript, ESLint, formatting, the production build, all 31 end-to-end browser tests (across desktop and emulated-mobile projects), and all three development styling regression checks. Motion verification covers readable hero entrance choreography, bounded story parallax, rapid native scrolling across all chapters, dynamic reduced-motion toggling, touch-device stability, and server-visible verified statistic fixtures.

Phase 3 delivery passed TypeScript, ESLint, formatting, the production build, and all 18 browser tests. Full-page and sectional screenshots were reviewed across all six target widths.

Phase 3 adds homepage structure, truthful-placeholder, internal-anchor, and participation-flow checks, bringing the suite to 18 tests across desktop and emulated-mobile projects. Full-page screenshots cover 320, 390, 768, 1024, 1440, and 1920px. Section captures inspect all seven chapters at 390/1440px, plus hero, purpose, and participation at the other widths. The sticky header is hidden only during section captures to prevent screenshot occlusion. Real video/caption playback, physical devices, and screen readers were not tested. No authentic SEVA photo/video assets were supplied.

Phase 2 verification covers TypeScript, ESLint, formatting, production build, and 14 browser tests (seven cases in desktop and emulated-mobile projects). Screenshots are captured at 320, 390, 768, 1024, 1440, and 1920px; all six layouts were reviewed. The expanded tests check semantic color contrast, native disabled/loading button states, active navigation from menu and content links, skip-link focus, mobile dismissal, reduced-motion transforms, overflow, browser/hydration errors, no-JavaScript content, robots, sitemap, and 404 responses. Device emulation is not a physical-device or screen-reader audit. No performance score is claimed.

The initial delivery passed TypeScript, ESLint, Prettier, the production build, and all eight Playwright checks in Microsoft Edge (desktop and emulated mobile). Screenshots at 390px and 1440px were reviewed; overflow checks cover 320–1920px. These are browser emulations, not physical-device or assistive-technology audits. Tests also check browser errors, mobile keyboard navigation, reduced-motion rendering, no-JavaScript content, SEO endpoints, and the 404 response.

The Phase 1 audit reported zero production vulnerabilities and five high-severity findings in the development-only Next.js ESLint → fast-glob → micromatch → braces chain, without a compatible patch at that delivery. Package inputs are unchanged in Phase 2; no fresh security audit is claimed. Do not run `npm audit fix --force`. Recheck advisories before deployment. ESLint 9 was retained for React lint-plugin compatibility even though npm marks it unsupported. Upgrade the lint toolchain together when compatible releases become available.

Configuration follows the official [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Next.js ESLint](https://nextjs.org/docs/app/api-reference/config/eslint), [Tailwind framework guides](https://tailwindcss.com/docs/installation/framework-guides), and [Motion reduced-motion](https://motion.dev/docs/react-use-reduced-motion) guidance.
