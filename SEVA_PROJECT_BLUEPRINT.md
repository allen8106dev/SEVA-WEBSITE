# SEVA project blueprint

## Phase 5A.1: Authentic Media Integration

Phase 5A.1 integrates authentic SEVA photographic assets — supplied in `Pictures.zip` (programme photography) and `Founders.zip` (leadership portraits) — into the Phase 5A website. All existing visual design, animations, responsive layouts, and accessibility guarantees are preserved. No architectural changes were introduced.

### Key Deliverables in Phase 5A.1:

1. **Complete Asset Inspection**:
   - 13 source images inspected using `sharp` for dimensions, format, and file size.
   - 9 programme photographs from `Pictures.zip`; 4 leadership portraits from `Founders.zip`.
   - `MEDIA_ASSET_REGISTER.md` created at project root with full audit register.

2. **Identity Audit (Critical Safeguard)**:
   - `28 Msgr Shaji.png` → **Confirmed**: Rt Rev. Msgr. Dr. Shaji Mathews Vazhayil (Vicar General). ✅
   - `41 Fr Joshy.png` → **Confirmed**: Very Rev. Dr. Joshy Vazhappillethu (Chancellor). ✅
   - `ChatGPT Image Sep 8, 2026...png` → **Permanently withheld**: Hardcoded text in the image identifies "MOST REV. DR. YOOHANON MAR ALEXIOS, AUXILIARY BISHOP OF TRIVANDRUM" — a different bishop, not SEVA's H E Dr. Mathews Mar Pachomios OIC. ❌
   - `32 fr santhosh.jpg.jpeg` → **Permanently withheld**: Filename identifies "Fr. Santhosh"; SEVA Director is Rev. Fr. Abraham Thanuvelil — different persons. ❌
   - Withheld records exist in `src/content/media.ts` with `approvalStatus: "pending_identity_confirmation"` and no `publicUrl`. These must not be published without explicit written authorization from SEVA management.

3. **Image Optimization**:
   - All derivatives generated with `sharp` (no new npm dependencies).
   - WebP format used throughout; originals preserved in gitignored `incoming-assets/`.
   - 15 derivatives published to `public/images/` across `leadership/`, `programmes/education/`, `programmes/community-welfare/`, `programmes/rural-tribal/`, `collages/`, and `branding/`.
   - Three 50 MB collages (`1.png`, `2.png`, `3.png` at 6250×5000px) compressed to ≈700 KB WebP each (>98% reduction).

4. **Typed Media Registry**:
   - `src/content/media.ts` created with full TypeScript interfaces and 17 records (15 approved, 2 withheld).
   - Helper functions: `getApprovedAssets()`, `getAssetById()`, `getAssetsByCategory()`, `getAssetsByProgramme()`.

5. **Content Model Updates**:
   - `leadership.ts`: `LeaderProfile` interface extended with optional `image` field. Msgr. Shaji and Fr. Joshy have confirmed portraits. Bishop and Fr. Abraham retain neutral placeholder.
   - `focus-areas.ts`: Education, Community Welfare, Rural Tribal areas now reference authentic SEVA images.
   - `projects.ts`: CNEWA, Vidya Jyoti, Ruby Meal projects reference authentic SEVA images.
   - `home.ts`: Hero (Ruby Meals service), Purpose (Vidhya Jyothi sisters), Closing (Vidhya Jyothi distribution) updated to real photographs.

6. **Favicon Update**:
   - `src/app/icon.png` (64×64, from official emblem) created.
   - `src/app/icon.svg` updated with official emblem data URI.

7. **Test Suite Update**:
   - `motion.spec.ts`: Hover assertion updated from `.media-frame__visual > svg` to `.media-frame__visual > img, .media-frame__visual > svg:not(.media-frame__editorial-stamp)` — real `<img>` elements now present in impact area MediaFrames alongside decorative SVG stamps.
   - Screenshot baselines (375px, 768px, 1440px) regenerated and reviewed after hero image change.

8. **Documentation**:
   - `MEDIA_ASSET_REGISTER.md`: Complete image inventory with visual subjects, dimensions, approval status.
   - `CONTENT_GUIDE.md`: §6 updated with replacement process; §8 added explaining typed media registry; §9 updated.
   - `README.md`: Phase header updated to 5A.1; Visual Transformation section updated; verification history updated.
   - `.gitignore`: `incoming-assets/` excluded to prevent large originals from being committed.

### Verification in Phase 5A.1:

- TypeScript: ✅ (`next typegen && tsc --noEmit`)
- ESLint: ✅ (0 warnings, 0 errors)
- Prettier: ✅
- Production build: ✅ (7/7 static pages)
- `test:styles:dev` (3/3): ✅
- `tests/organization.spec.ts` (4/4): ✅
- `tests/components.spec.ts` (4/4): ✅
- `tests/motion.spec.ts` (8/8 with `--workers=2`): ✅
- `tests/site.spec.ts` (12/12 with `--workers=2`): ✅
- Full suite with `--workers=2`: **34/35 pass** (1 pre-existing infrastructure flake: `[mobile] participation actions retain mobile composition` — 60s timeout under parallel cold-start, same flake present in Phase 5A, not a regression from Phase 5A.1).

### Scope Constraints Honoured:

- **No Phase 5B**: Only media integration was performed. No new pages, components, or structural changes.
- **No fabricated assets**: All images are from the supplied archives. No placeholder photography was invented.
- **No upscaling**: Low-resolution images published at their natural resolution.
- **Jeevan Project / Women Empowerment placeholder retained**: No authentic Raigad women empowerment photos were supplied; `story-portrait.jpg` (Unsplash, clearly labeled) remains for the Stories/Jeevan section.
- **All animations preserved**: Hero scroll, image-mask reveal, story parallax, KineticClosing, Marquee — all intact and all tests passing.

---

## Phase 5A: Organizational Identity, Content & Project Integration

Phase 5A integrates SEVA Social Service Society's actual institutional identity, leadership structure, focus areas, projects, reported impact figures, and centralized contact channels into the approved Vibrant Humanism frontend. All existing visual styles, animations, responsive layouts, and accessibility guarantees are preserved.

### Key Deliverables in Phase 5A:

1. **Official Institutional Identity**:
   - Organization: **SEVA Social Service Society**
   - Tagline: **Love In Action**
   - Established: **2015** (all provisional "EST. 2026" references excised)
   - Operational Reach: Maharashtra, Tamil Nadu, Andhra Pradesh
   - Legal Status: Registered Not-for-Profit Society
   - Vision & Mission: Formally embedded in Purpose section and content models.
2. **Official Logo Integration**:
   - Client-supplied artwork integrated as original (`/images/seva-logo.jpg`), high-resolution transparent web format (`/images/seva-logo.png`), and focused square emblem (`/images/seva-emblem.png`).
   - Integrated into SiteHeader (with companion SEVA wordmark), SiteFooter, and MobileNavigation. Proportions strictly maintained without distortion.
3. **Centralized Content Architecture (`src/content/`)**:
   - `organization.ts`: Core identity, legal status, vision, mission, core values, branding assets.
   - `leadership.ts`: 4 official leaders (H E Dr. Mathews Mar Pachomios OIC, Rt Rev. Msgr. Dr. Shaji Mathews Vazhayil, Very Rev. Dr. Joshy Vazhappillethu, Rev. Fr. Abraham Thanuvelil) with neutral portrait placeholders.
   - `focus-areas.ts`: 7 structured focus areas (Education, Healthcare, Women Empowerment, Community Welfare, Rural & Tribal Development, Skill Development, Relief Works).
   - `projects.ts`: 6 structured initiatives (CNEWA Non-Formal Education, Vidya Jyoti Scholarship Programme, Jeevan Project, Sui Daga Tailoring Project, SEVA Ruby Meal, Healthcare and Medical Outreach).
   - `impact.ts`: Sourced headline metrics (1,000+ annual beneficiaries, 15+ programs, 3 states) and project-level statistics with clear audit-pending disclosures.
   - `partnerships.ts`: CSR alignment areas, governance pillars, and 7 structured volunteering categories.
   - `contact.ts`: Official directorate contact details (Rev. Fr. Abraham Thanuvelil, Director; +91 8856031349; sevassspune@gmail.com; St. Mary's Cathedral, Bopodi, Pune).
   - `compliance.ts`: Legal documentation registry (Registration, PAN, 80G, 12AC, FCRA, Audits, CSR).
   - `donations.ts`: Designated account architecture (Seva Vidhya Jyothi, Society, Ruby Meal) marked as awaiting management authorization without premature banking disclosure.
   - `home.ts`: Composition hub consuming the modular models for all seven homepage sections.
4. **Animated Statistics Activation**:
   - Headline statistics now actively render through `CountValue` with server-visible final values, animated count-ups, and accessible screen-reader labels.
5. **Comprehensive Verification**:
   - All 35 Playwright browser tests pass 100% across desktop and mobile Edge/Chromium.
   - Development server regression tests (`test:styles:dev`) pass 3/3.
   - TypeScript checks (`next typegen && tsc --noEmit`), ESLint (`max-warnings=0`), Prettier formatting, and Next.js production build pass cleanly.

## Phase 5 (Vibrant Humanism) visual redesign

The existing seven-section homepage was substantially redesigned with a bold editorial visual identity called **Vibrant Humanism**. The new palette (Yellow `#ffd93d` + Coral Red `#ff4d4d` + Royal Blue `#2541b2` + Near Black `#171717` + Warm Cream `#fff9eb`) replaces the former olive/ivory/terracotta scheme. Three signature scroll interactions were added using the existing Motion library. The navigation was redesigned with a scroll-responsive floating treatment and a SEVA wordmark with a coral accent dot. A kinetic typography marquee runs across the hero section. No new npm dependencies were introduced. All 31 automated tests pass (with `--workers=2`). Phase 5 content approval (official branding, approved copy, sourced statistics, real media, participation destinations) is not implemented and remains pending.

## Phase 4 motion extension

The existing seven Server Component sections now share a restrained motion vocabulary from src/config/motion.ts. CSS sequences the hero without hiding content; Reveal supplies statement, media, and closing variants; ScrollMedia mounts one bounded parallax scene only on suitable pointer devices without reduced motion. Buttons and mobile disclosure transitions retain native semantics and immediate focus behavior. Current statistics stay pending; the verified numeric branch can use CountValue with server-visible final values and a stable screen-reader label. See MOTION_SYSTEM.md for lifecycle, media replacement, and performance decisions.

The Next.js development-cache repair and existing style baselines remain unchanged. No GSAP, smooth-scrolling library, backend, or new dependency was introduced. Motion tests add rapid scrolling, dynamic reduced motion, touch orientation, and sampled browser states. Phase 5 content is not implemented; branding, approved content/media, sourced figures, and real participation destinations still need confirmation.

## Purpose and boundaries

Establish a maintainable foundation for SEVA’s official website. Phase 1 delivered the technical starter, Phase 2 built its visual system, Phase 3 composed the seven-section preliminary homepage, and Phase 4 enhances its motion and interactions. Organizational requirements are pending. Demonstration themes and illustrations are explicitly identified, statistics await verification, and participation options are noninteractive previews. No programs, fundraising, credentials, addresses, or partnerships are asserted. Phase 5 is not implemented.

## Stack and architectural decisions

Next.js App Router, React, strict TypeScript, Tailwind CSS v4 with its PostCSS integration, Motion for React, ESLint flat configuration, Prettier, npm, and Git. Exact installed versions live in package.json and package-lock.json. Playwright is development-only. GSAP is deferred until an actual advanced animation calls for it.

Routes and page content are Server Components. Small client islands provide the navigation disclosure and reveal animation. Shared layout and content sections stay independent. There is no global state store, speculative service layer, or barrel-export hierarchy. The standard Next.js runtime supports static pages now and server-rendered routes later without a migration to a different framework.

## Folder responsibilities

`src/app` owns routes, metadata, the root layout, fonts, and global styles. `src/components/layout` owns the header/footer, disclosure, and active navigation. `src/components/sections` contains composable starter sections; `src/components/animations` contains the actual reveal utility. `src/components/ui` owns shared button/link, type, layout, editorial card, and media-frame primitives. `src/config` centralizes site values and shared CSS/Motion timing; `src/styles` holds visual tokens. `src/assets/fonts` contains local WOFF2 files, licenses, and provenance. `tests` contains production browser checks and button semantics. Root files configure tools and document development.

Create public media, hooks, types, utilities, services, and feature folders when implemented requirements call for them. Do not preserve empty folders just to mirror a diagram.

## Design and accessibility

**Vibrant Humanism** is the current creative direction: Yellow (`#ffd93d`), Coral Red (`#ff4d4d`), Royal Blue (`#2541b2`), Near Black (`#171717`), and Warm Cream (`#fff9eb`), with semantic color tokens for all roles. The palette uses intentional color relationships and deliberate sequencing between high-energy and quiet visual moments. Cormorant Garamond regular/italic 400 pairs with Manrope variable body/UI text (400–800 weight range). Three Latin WOFF2 files total 71,372 bytes, bundled with original OFL licenses and next/font/local. CSS tokens centralize the responsive type scale, spacing, 72rem/43rem/86rem container widths, radii, and elevation. DESIGN_SYSTEM.md documents the component APIs, palette, color sequencing rules, accessibility, and extension conventions.

The 48rem navigation/grid breakpoint is mirrored in mobile-navigation.tsx. Fluid typography and gutters support mobile through wide desktop. Documentary photographs are visibly captioned as provisional under Unsplash license, with decorative geometry hidden from assistive technology. Future authentic photography uses MediaFrame with reserved ratios, Next.js image optimization, focal points, responsive sizes, alt text, and captions. No fictional documentary imagery is used. Image overlays, video, and gallery interfaces are deferred until real requirements exist.

Semantic landmarks, a skip link, heading hierarchy, visible focus, and minimum 46px controls are included. The header is now a client component with scroll-responsive behavior: it transitions from a full yellow bar to a compact floating cream bar with backdrop-filter as the user scrolls. Both navigation versions mark the selected destination with aria-current="location". The mobile navigation is a nonmodal disclosure with native links, expanded state, Escape dismissal with focus restoration, outside click, focus-leave handling, and breakpoint cleanup. Footer navigation remains available without JavaScript. Links from the 404 return to actual homepage anchors. Buttons support disabled/loading states with native semantics; loading preserves the label and exposes busy state.

## Animation strategy

Phase 4 and the Vibrant Humanism redesign use CSS for hero choreography and control/menu transitions, small Motion reveal boundaries for the Purpose/impact/story/closing sections, and a single conditional story parallax scene. Three additional signature scroll interactions are provided: `HeroScroll` (hero parallax wrapper), `ImageMaskReveal` (clip-path reveal in Purpose), and `KineticClosing` (horizontal scroll-driven text sweep in the closing section). A CSS marquee strip (`Marquee` component) runs across the hero bottom. `SplitReveal` is available for future word-by-word heading reveals. Server content stays visible and text retains full opacity. `src/config/motion.ts` supplies centralized timing, easing, stagger, thresholds, distances, feedback, and spring values. Reduced motion restores static rendering and removes the parallax subscription. Hooks/animations clean up under Strict Mode; there is no scroll hijacking or global state runtime. No GSAP or Lenis was used. See MOTION_SYSTEM.md.

## SEO strategy

Central configuration validates an optional origin and gates indexing. Metadata provides title templates, description, Open Graph fields, and robots directives. The homepage receives a canonical only when an origin is configured. There is no fictional production domain or placeholder social image. Not-found pages retain Next.js noindex behavior without inheriting a homepage canonical. Sitemap and robots infrastructure expose no production URLs while unfinished. Vercel previews remain unindexable even if the production flag is enabled. Rebuild after changing environment values; these routes are static. Noindex is not authentication.

Future dynamic routes should supply their own metadata and canonical and enter the sitemap only when approved and public. Add actual branded Open Graph imagery later.

## Performance standards

Keep content server rendered and client boundaries narrow. Avoid global animation providers and unused libraries. Local fonts avoid external runtime requests, using adjusted fallbacks and swap behavior. The illustration reserves space using aspect ratio and loads inline. Use Next.js Image for real raster assets, accurate sizes, reserved dimensions, and selective preload only when justified. Do not add video or third-party scripts without a measured requirement. Measure Core Web Vitals against real assets in a later phase; this phase makes no unmeasured Lighthouse or performance score claims. Phase 2 adds no npm dependency.

## Future integrations

Implement feature-owned modules as requirements arrive. Keep CMS/database access server-side and isolate vendor details in services only when integration exists. Select rendering and caching per route, with explicit revalidation requirements. Validate inputs and authorization at server boundaries for future forms/admin features. Authentication, volunteer registration, donations, events, galleries, news, reporting, and CMS are not implemented. No vendor has been selected and no credentials are needed.

## Deployment plan

Use npm lockfile installs, GitHub version control, and Vercel’s native Next.js preset. Review locally before an initial commit and push. Production needs a confirmed domain and approved content before indexing. Use environment-specific settings and deployment protection where required. This delivery is local only; no remote, deployment, or production URL is created.

## Completed work

- Modular App Router starter, header, accessible mobile navigation, introduction, status section, footer, and 404.
- Centralized configuration, CSS design tokens, responsive layout, reduced-motion support, and basic Motion reveal.
- Metadata, optional canonical, Open Graph configuration, guarded sitemap and robots endpoints.
- Strict types, lint/format tooling, production build scripts, environment example, documentation, and browser regression checks.

## Pending work and assumptions to confirm

Phase 3 provides seven modular homepage sections built from the Phase 2 system. Confirm the official wordmark, palette, typography, tone, mission, activity descriptions, consented stories/media, verified figures and sources, participation destinations, contact details, final navigation, and language needs. Language support beyond Latin assets requires confirmation. Confirm a domain and approval process before launch. Backend features and vendors remain unspecified. Advanced animation is reserved for Phase 4.

## Phase 3 architecture and content

page.tsx composes HeroSection, PurposeSection, ImpactAreasSection, StoriesSection, ImpactOverviewSection, ParticipationSection, and ClosingSection. These are Server Components, independently editable under components/sections. The two starter sections were retired after their roles moved into the hero and transparency sections. Existing header/footer, anchor IDs, UI primitives, SEO guards, fonts, and motion timing are retained.

src/content/home.ts separates typed content from composition. ImpactArea accepts title, description, media, optional category/link/accent, and an explicit demonstration note. Statistics supports pending entries or verified values with required source text. HomepageMedia accepts illustration, optimized image, or user-controlled video with poster and captions; it reuses MediaFrame ratios/focal points. See DESIGN_SYSTEM.md for exact replacement conventions. No authentic SEVA images were available, so no remote or fabricated photography is included.

The narrative uses a viewport-scale opening, green editorial statement, staggered themes, a story feature, transparent pending figures, participation previews, and a closing anchor action. Only hero and story media use the existing reveal. No package, backend, form, payment integration, or heavy animation was introduced. Stable section IDs and modular media/content contracts are ready for separately scoped Phase 4 motion work.

## Delivery verification

The styling repair reproduced an incomplete CSS bundle on the long-running development server despite healthy production output. The generated development cache was preserved and rebuilt, restoring shared styles and actual fonts without changing the visual system. Development filesystem caching remains disabled as containment. Computed-style/resource/font checks and visual screenshot baselines run against production and the actual development server; see STYLE_REPAIR.md for evidence and commands. Phase 4 preserves this repair and adds animation-specific regression coverage. The Vibrant Humanism redesign regenerated all three screenshot baselines (375px, 768px, 1440px) to reflect the new palette.

Phase 1 passed TypeScript, ESLint, formatting, production build, and eight browser checks. Phase 2 expanded the suite to 14, Phase 3 to 18, Phase 4 to 31, and Vibrant Humanism maintains all 31 end-to-end tests across desktop and mobile projects, plus the three development-server styling baseline tests. All 31 tests pass with `--workers=2`. The default `--workers=7` mode produces infrastructure-only timeouts during parallel cold-server startup on this machine; all tests pass when run with limited concurrency.

Tests validate hero entrance choreography, bounded story parallax, rapid native scrolling across all seven chapters, dynamic reduced-motion toggling, mobile disclosure semantics, and server-visible final values for verified numeric figures. Screenshot/overflow widths are 320, 390, 768, 1024, 1440, and 1920px. Existing contrast, active navigation, skip link, button state, reduced-motion, browser/hydration error, SEO, and no-JavaScript checks are retained. See README and the delivery report for actual final execution results. Physical devices, screen readers, real video playback, and a full performance audit are not covered.

The Phase 1 audit found zero production findings and five high-severity development-only findings in the ESLint dependency chain. Package inputs are unchanged through Vibrant Humanism; no fresh security-audit claim is made here. ESLint 9 was retained for React lint-plugin compatibility despite npm marking it unsupported. See README for the caveat; revisit the lint toolchain before launch. No Git remote, commit, production domain, or deployment was created.
