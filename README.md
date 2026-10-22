# SEVA website - Phase 6.1

The official website for **SEVA Social Service Society** ("Love In Action", Est. 2015), built on Next.js App Router with the management-approved Shreyas-inspired indigo and lavender design system.

Phase 5E completes Get Involved, Volunteer, CSR Partnerships, donation information, and Contact routes. Participation and donation inquiries use transparent email links; no application form, payment gateway, or bank instructions are published. See [PHASE_5E_REPORT.md](PHASE_5E_REPORT.md). All pages remain noindex/nofollow pending publication approval and a confirmed origin.

Phase 5C.2B delivers six complete, visually exceptional project detail pages with distinct editorial layouts, authentic approved photography, organization-reported metrics, and full ancestor breadcrumbs:

- `/programmes/education/cnewa` (CNEWA Non-Formal Education)
- `/programmes/education/vidya-jyoti` (Vidya Jyoti Scholarship Programme)
- `/programmes/women-empowerment/jeevan` (Jeevan Project)
- `/programmes/women-empowerment/sui-daga` (Sui Daga Tailoring Project)
- `/programmes/community-welfare/seva-ruby-meal` (SEVA Ruby Meal)
- `/programmes/healthcare/medical-outreach` (Healthcare and Medical Outreach)

Phase 5C.2A delivered the Programmes overview (`/programmes`) and all seven focus area editorial pages, and resolved all four official leadership portraits.

Phase 5A.1 integrates authentic SEVA photographic assets supplied by the organization into the website. 13 source images were inspected from two supplied archives (`Pictures.zip` and `Founders.zip`). 17 optimized WebP derivatives are published to `public/images/`. A typed media registry at `src/content/media.ts` centralizes all asset records. The official SEVA emblem powers the favicon and header lockups.

Phase 5A integrates the actual organizational identity, leadership directory, seven focus areas, six project initiatives, organization-reported impact data, CSR partnership frameworks, and centralized directorate contact information into strongly-typed content models.

For maintenance and editing instructions, see [CONTENT_GUIDE.md](CONTENT_GUIDE.md).

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
- `src/components/sections`: modular page sections for all seven homepage chapters.
- `src/content`: strongly typed, centralized content architecture:
  - `organization.ts`: core institutional identity, vision, mission, core values, branding assets.
  - `leadership.ts`: governance profiles (Bishop, Vicar General, Chancellor, Director).
  - `focus-areas.ts`: seven core operational focus areas and activities.
  - `projects.ts`: six official projects with reported metrics and activities.
  - `impact.ts`: sourced headline and initiative impact figures.
  - `partnerships.ts`: CSR collaboration pillars and volunteering categories.
  - `contact.ts`: directorate contact channels and canonical office address.
  - `compliance.ts`: regulatory and statutory document registry.
  - `donations.ts`: designated account architecture awaiting management authorization.
  - `media.ts`: typed registry of all SEVA photographic assets with publication status, alt text, dimensions, and programme associations.
  - `home.ts`: composition hub consuming modular content for homepage chapters.
- `public/images`: authenticated SEVA photographic assets organized by category:
  - `branding/`: official SEVA logo and emblem derivatives.
  - `leadership/`: confirmed leadership portraits (Msgr. Shaji, Fr. Joshy).
  - `programmes/education/`: education programme photographs (Vidhya Jyothi, CNEWA, tuition centres).
  - `programmes/community-welfare/`: Ruby Meals service photographs.
  - `programmes/rural-tribal/`: Housing project photographs (Paderu).
  - `collages/`: compressed programme collages.
- `src/styles/home.css`: homepage compositions extending shared design tokens.
- `src/components/ui`: reusable layout, typography, controls, media, and editorial panel.
- `src/components/animations`: the single reusable reveal used by the initial layout.
- `src/config/site.ts`: organization label, navigation, URL validation, indexing controls.
- `src/styles/tokens.css`: screenshot-derived semantic palette, typography, spacing, and elevation tokens.
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

## Phase 6 quality audit

Phase 6 adds a nine-width desktop and four-width touch responsive matrix, route-wide semantic/contrast checks, heading-fit assertions, reviewed Get Involved and Contact opening references, and contrast fixes using the existing brand palette. Gallery card images remain lazy; the lightbox and its eager image mount only after the visitor opens a photograph. No package was added. See [PHASE_6_REPORT.md](PHASE_6_REPORT.md) for production measurements, test results, scope and limitations. Phase 7 and deployment have not begun.

## Phase 6.1 visual redesign

The current website uses the management-supplied Shreyas screenshots as its visual reference. Flat screenshot areas sampled to indigo `#2B2469`, lavender `#EFEEFF`, and periwinkle `#DEE1FF`; SEVA keeps its official identity, verified content, and approved programme photography. The header scales between expanded and compact states, the desktop Donate action uses the existing information route, and the homepage carousel uses registry-approved photos without color tint. Interior heroes are content-sized. The compact footer form opens an honest email-app draft; no direct email provider or payment gateway is configured. See [PHASE_6_1_REPORT.md](PHASE_6_1_REPORT.md) for page coverage, responsive screenshots, accessibility checks, verification, and remaining requirements. Phase 7, indexing, and deployment remain out of scope.

## Historical Phase 5 visual notes Â· "Humanity in Action"

These notes describe a previous design iteration. Phase 6.1 supersedes its palette and visual treatment.

A major visual redesign was implemented to transform the website from a wireframe-like prototype into a cinematic, editorial digital experience.

- **Theme**: "Humanity in Action" â€” combining documentary-style photography with contemporary literary editorial design.
- **Photography**: Phase 5A.1 replaced prior Unsplash documentary placeholders with authentic SEVA organizational photographs. 13 source images were supplied in `Pictures.zip` (9 programme photos) and `Founders.zip` (4 portraits). 15 optimized WebP derivatives are published to `public/images/`. Two portraits are withheld pending identity confirmation. All asset records are in `src/content/media.ts` and the full audit register is at `MEDIA_ASSET_REGISTER.md`.
- **Asymmetric & Alternating Chapters**: Light editorial spreads paired with deep evergreen and obsidian dark chapters (`#1e3629`, `#162019`).
- **Signature Visual Moments**: Hero-to-purpose transition, documentary bounded parallax on the Human Stories portrait, and high-contrast chapter rhythm.
- **Test Results**: All 35 automated Playwright browser tests, development server regression tests (`test:styles:dev`), TypeScript checks, ESLint, and production builds pass.

## Verification and dependency notes

See [STYLE_REPAIR.md](STYLE_REPAIR.md) for the reproduced development styling failure, recovery, and regression safeguards. `test:e2e` includes computed-style checks and screenshot comparisons at 375/768/1440px. `test:styles:dev` reuses the actual server on port 3000, or starts one if absent, so a healthy production build cannot conceal broken development CSS. Reviewed screenshot baselines are tracked under `tests/styles.spec.ts-snapshots`. Development filesystem caching is disabled after the observed stale-output failure; production configuration and dependencies are unchanged.

Phase 5A.1 (Media Integration) delivery passed TypeScript, ESLint, formatting, the production build, all 35 end-to-end browser tests (across desktop and emulated-mobile projects with `--workers=2`), and all three development styling regression checks. Two leadership portraits (`ChatGPT Image Sep 8, 2026...png` identified as a different bishop; `32 fr santhosh.jpg.jpeg` identified as Fr. Santhosh not Fr. Abraham) are permanently withheld until the organization confirms identities in writing. A `[mobile] participation actions retain mobile composition` timeout flake pre-exists from Phase 5A and is an infrastructure-only issue; all tests pass with `--workers=2`.

Phase 5A delivery passed TypeScript, ESLint, formatting, the production build, all 35 end-to-end browser tests (across desktop and emulated-mobile projects), and all three development styling regression checks. Organization content, leadership directory, seven focus areas, six projects, sourced impact figures, CSR framework, compliance registry, and donation account architecture are fully integrated. Statistic count-up animations are active.

Phase 3 delivery passed TypeScript, ESLint, formatting, the production build, and all 18 browser tests. Full-page and sectional screenshots were reviewed across all six target widths.

Phase 3 adds homepage structure, truthful-placeholder, internal-anchor, and participation-flow checks, bringing the suite to 18 tests across desktop and emulated-mobile projects. Full-page screenshots cover 320, 390, 768, 1024, 1440, and 1920px. Section captures inspect all seven chapters at 390/1440px, plus hero, purpose, and participation at the other widths. The sticky header is hidden only during section captures to prevent screenshot occlusion. Real video/caption playback, physical devices, and screen readers were not tested. No authentic SEVA photo/video assets were supplied.

Phase 2 verification covers TypeScript, ESLint, formatting, production build, and 14 browser tests (seven cases in desktop and emulated-mobile projects). Screenshots are captured at 320, 390, 768, 1024, 1440, and 1920px; all six layouts were reviewed. The expanded tests check semantic color contrast, native disabled/loading button states, active navigation from menu and content links, skip-link focus, mobile dismissal, reduced-motion transforms, overflow, browser/hydration errors, no-JavaScript content, robots, sitemap, and 404 responses. Device emulation is not a physical-device or screen-reader audit. No performance score is claimed.

The initial delivery passed TypeScript, ESLint, Prettier, the production build, and all eight Playwright checks in Microsoft Edge (desktop and emulated mobile). Screenshots at 390px and 1440px were reviewed; overflow checks cover 320â€“1920px. These are browser emulations, not physical-device or assistive-technology audits. Tests also check browser errors, mobile keyboard navigation, reduced-motion rendering, no-JavaScript content, SEO endpoints, and the 404 response.

The Phase 1 audit reported zero production vulnerabilities and five high-severity findings in the development-only Next.js ESLint â†’ fast-glob â†’ micromatch â†’ braces chain, without a compatible patch at that delivery. Package inputs are unchanged in Phase 2; no fresh security audit is claimed. Do not run `npm audit fix --force`. Recheck advisories before deployment. ESLint 9 was retained for React lint-plugin compatibility even though npm marks it unsupported. Upgrade the lint toolchain together when compatible releases become available.

Configuration follows the official [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Next.js ESLint](https://nextjs.org/docs/app/api-reference/config/eslint), [Tailwind framework guides](https://tailwindcss.com/docs/installation/framework-guides), and [Motion reduced-motion](https://motion.dev/docs/react-use-reduced-motion) guidance.

## Phase 5B navigation architecture

Phase 5B adds seven navigation categories, animated desktop disclosures, accessible mobile accordions and 26 statically generated interior route foundations with breadcrumbs and unique noindex metadata. [NAVIGATION_GUIDE.md](NAVIGATION_GUIDE.md) documents the hierarchy, interactions and extension conventions. Detailed Phase 5C pages, forms, payment mechanisms and hosting are not included.

Phase 5B verification passed typecheck, lint, formatting, production build, all 49 production browser tests and all three checks against the existing development server. See [PHASE_5B_REPORT.md](PHASE_5B_REPORT.md) for files, results, limitations and readiness for detailed page work.

All original photographs, derivatives and the existing media registry are preserved. Leadership has four profile slots: two approved portraits and two pending confirmation. Gallery and project previews use approved arrays independently of homepage placement. See MEDIA_ASSET_REGISTER.md for unused and pending media. The original reduced-motion baselines are retained alongside separately named Phase 5B references.

## Phase 5C.1: completed Profile section

The Profile overview, About, Vision & Mission, Leadership and History pages now have distinct editorial compositions, approved documentary photography and accessible motion. The official vision/mission and leadership identities remain canonical in the existing content modules. Two portraits are confirmed; two remain explicitly pending. History contains only the documented 2015 establishment milestone. Preview noindex safeguards, homepage behavior and other route foundations remain preserved. See [PHASE_5C_1_REPORT.md](PHASE_5C_1_REPORT.md) for the full delivery report. Phase 5C.2 has not begun.

`test:styles:dev` now runs both the original homepage styling checks and Profile opening/font/palette checks against the actual development server. Separately named Profile references cover all five pages at 375/1440px. Existing homepage references are unchanged.

Verification passed TypeScript, lint, formatting and the production build. The full production suite passed 71/71; after a final caption-spacing refinement, all 20 Profile browser checks and both production Profile styling checks passed again. The expanded actual-development-server suite passed 5/5. See PHASE_5C_1_REPORT.md for the results and pending content approvals.

## Phase 5D.1: Media recovery and completion

Media now has an editorial overview, an interactive gallery of 11 approved registry assets, and truthful empty video and news archives. Routes: `/media`, `/media/gallery`, `/media/videos`, `/media/news-events`; approved future articles dispatch through `/media/news-events/[slug]` in the existing catch-all route. Unknown and unpublished slugs return 404.

The gallery supports category, recorded programme and confirmed project filters, result counts, an empty-state reset, native modal viewing, arrow-key navigation, Escape and focus restoration. Without JavaScript, photographs remain readable and link to their full-size derivatives. News imagery resolves through the media approval registry. Videos use a typed playback-source union and user-initiated facades, with caption-track/transcript fields. No approved videos or articles have been supplied; none were invented.

See [PHASE_5D_1_REPORT.md](PHASE_5D_1_REPORT.md) for the recovery inventory, files and verification. New Media opening references are separate from existing homepage/Profile references and run against production and the actual development server. Use `npm run test:e2e -- --workers=2 --timeout=120000` for the documented complete regression run. No dependencies or hosting settings changed. Phase 5D.2 is documented above.
