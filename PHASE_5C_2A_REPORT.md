# Phase 5C.2A: Programmes Overview & Focus Area Editorial Pages

Phase 5C.2A completes the eight Programmes routes in the official SEVA Social Service Society website: one comprehensive editorial overview (`/programmes`) and seven dedicated, visually distinct programme pages. In addition, this phase incorporates the client's confirmed portrait identification for both remaining leadership profiles.

All existing visual design, animations, responsive layouts, accessibility contracts, and SEO guards are preserved. No dependencies, backend systems, forms, or unauthorized financial transactions were added.

---

## 1. Executive Summary & Deliverables

| Deliverable | Route | Composition Highlights |
| :--- | :--- | :--- |
| **Programmes Overview** | `/programmes` | Sunshine yellow hero, commitment to restoring dignity, and an editorial directory (not an identical grid) featuring all 7 focus areas with large chapter indices (01–07), activity pills, authentic media thumbnails, and direct links. |
| **Education** | `/programmes/education` | Sunshine yellow hero, foundational literacy & bridge classes, approved field photography from tuition centres and Vidya Jyothi distributions, and project previews for CNEWA Non-Formal Education and Vidya Jyoti Scholarship Programme with reported metrics (~700 assisted, 478 in tuition centres; 75+ enrolled, ~65% daily attendance). |
| **Healthcare** | `/programmes/healthcare` | Royal blue hero with high-contrast text, mobile medical assistance camps, child health monitoring, hygiene education, project preview for Healthcare and Medical Outreach, and clear disclosure of ongoing photographic documentation curation. |
| **Women Empowerment** | `/programmes/women-empowerment` | Coral red hero, self-help groups, leadership development, financial literacy, community governance, project previews for the Jeevan Project in Raigad District (~75–100 women trained) and Sui Daga Tailoring Project (two active centres), with explicit conceptual links to skill development. |
| **Community Welfare** | `/programmes/community-welfare` | Near-black hero with warm cream typography, respectful and dignified weekly Ruby Meal food distribution documentation in Khadki-Pune, approved outreach photographs, and elderly assistance. |
| **Rural & Tribal Development** | `/programmes/rural-tribal-development` | Warm surface hero, community governance, natural resource stewardship, durable housing construction in Paderu (Andhra Pradesh), Suryapet, and Khammam (Telangana), and approved housing collage documentation. |
| **Skill Development** | `/programmes/skill-development` | Royal blue hero, vocational training, market-relevant trades, income-generation skills, and conceptual synergy with the Sui Daga Tailoring Project under Women Empowerment. |
| **Relief Works** | `/programmes/relief-works` | Coral red hero, rapid disaster response, essential supply lines, emergency medical aid, and rehabilitation assistance during natural disasters and humanitarian crises. |
| **Leadership Portraits** | `/profile/leadership` | Formal client verification of Bishop Mathews Mar Pachomios OIC and Director Rev. Fr. Abraham Thanuvelil; all four leadership profiles now render confirmed official portraits. |

---

## 2. Leadership Portrait Verification & Resolution

The client formally confirmed the identities of the two previously unassigned leadership portraits:

1. **H E Dr. Mathews Mar Pachomios OIC — Eparchial Bishop**:
   - **Source Archive**: `incoming-assets/Founders/ChatGPT Image Sep 8, 2026, 02_28_12 PM.png` (1024×1536).
   - **Resolution & Cropping**: The lower white banner containing hardcoded text referencing an auxiliary bishop of Trivandrum was cropped out completely (cropped from `y=78` to `y=1206`, ending 176px above the banner). The resulting portrait focuses exclusively on Bishop Mathews Mar Pachomios.
   - **Derivative**: `/images/leadership/mathews-mar-pachomios.webp` (800×1000px, 4:5 ratio, 54 KB WebP).
   - **Status**: Updated to `publicationStatus: "confirmed_official"` and `identityConfidence: "confirmed"`.

2. **Rev. Fr. Abraham Thanuvelil — SEVA Director**:
   - **Source Archive**: `incoming-assets/Founders/32 fr santhosh.jpg.jpeg` (1205×1280).
   - **Resolution & Display Name**: Client confirmed that the individual in the image represents Rev. Fr. Abraham Thanuvelil. Official display name is preserved strictly as **Rev. Fr. Abraham Thanuvelil** (never Fr. Santosh).
   - **Derivative**: `/images/leadership/fr-abraham-thanuvelil.webp` (800×1000px, 4:5 ratio, 52 KB WebP).
   - **Status**: Updated to `publicationStatus: "confirmed_official"` and `identityConfidence: "confirmed"`.

3. **Registry & Content Updates**:
   - `src/content/media.ts`: Both assets updated to `approved_for_publication` with confirmed metadata.
   - `src/content/leadership.ts`: `publicationStatus` updated to `confirmed_official`; image objects added with 800×1000 dimensions and `focalPoint: "50% 30%"`.
   - `tests/navigation.spec.ts`: Updated portrait assertion from 2 to 4 confirmed portrait images and 0 placeholder slots.
   - `tests/profile.spec.ts`: Automatically tests all four confirmed portraits on `/profile/leadership`.

---

## 3. Files Created & Modified

### Files Created:
- `src/content/programmes.ts`: Strongly typed editorial copy, headlines, meta descriptions, and chapter tags for all 8 routes.
- `src/styles/programmes.css`: Scoped editorial stylesheet implementing the Vibrant Humanism palette, asymmetric hero grids, activity tag pills, punchy project preview cards (6px offset shadows with hover translation), editorial directory layouts, and responsive 48rem/64rem layouts.
- `src/components/sections/programme-pages.tsx`: Server Component implementing `ProgrammePage` dispatch with distinct compositions for all 8 routes, reusing `MediaFrame`, `Reveal`, `ImageMaskReveal`, and `Breadcrumbs`.
- `tests/programmes.spec.ts`: 24 automated browser regression tests covering desktop and mobile Edge/Chromium.
- `public/images/leadership/mathews-mar-pachomios.webp`: Optimized 800×1000 WebP portrait derivative.
- `public/images/leadership/fr-abraham-thanuvelil.webp`: Optimized 800×1000 WebP portrait derivative.
- `PHASE_5C_2A_REPORT.md`: This comprehensive report.

### Files Modified:
- `src/content/leadership.ts`: Added portrait image configurations for Bishop and Director; updated `publicationStatus` to `confirmed_official`.
- `src/content/media.ts`: Updated leadership media records to `approved_for_publication` and `identityConfidence: "confirmed"`.
- `src/config/navigation.ts`: Updated `programmes` parent item and all 7 child items from `"foundation"` to `"available"`.
- `src/app/[...slug]/page.tsx`: Added `ProgrammePage` import, `isProgrammePageId` metadata generation, and page dispatch alongside `ProfilePage`.
- `src/app/layout.tsx`: Added `import "@/styles/programmes.css"`.
- `src/components/sections/interior-content.tsx`: Removed superseded foundation placeholder branches for programmes.
- `tests/navigation.spec.ts`: Updated leadership test assertions to expect 4 `.portrait-image` elements and 0 `.portrait-slot` elements.
- `MEDIA_ASSET_REGISTER.md`: Documented resolution of the two leadership portraits and derivative technical details.
- `CONTENT_GUIDE.md`: Updated leadership placeholder registers and policy descriptions.

---

## 4. Authentic Media & Project Integration

All imagery strictly adheres to the media registry:
- **Education**: `vidhya-jyothi-distribution.webp`, `tuition-vidyarambham-initiation.webp`, `tuition-classroom-group.webp`, `tuition-learning-session.webp`.
- **Community Welfare**: `ruby-meals-service.webp`, `ruby-meals-outreach.webp`, `seva-ruby-meals-collage.webp`.
- **Rural & Tribal Development**: `housing-project-paderu.webp`, `seva-housing-project-collage.webp`.
- **Programmes Overview**: `tuition-classroom-group.webp` as hero visual; authentic thumbnails embedded in the directory.
- **Projects Preview**:
  - `cnewa-education` (Education)
  - `vidya-jyoti` (Education)
  - `healthcare-outreach` (Healthcare)
  - `jeevan-project` (Women Empowerment)
  - `sui-daga-tailoring` (Skill Development / Women Empowerment)
  - `seva-ruby-meal` (Community Welfare)
  - All project preview cards clearly state that comprehensive detail pages are in preparation for Phase 5C.2B. No dead or broken links exist.

---

## 5. Visual Compositions & Motion

Each page features a distinct composition rooted in Vibrant Humanism:
- **Education**: Sunshine yellow (`#ffd93d`) hero with high energy, 3-frame photo gallery, and 2 project preview cards.
- **Healthcare**: Royal blue (`#2541b2`) hero with white text, structured clinical activities, and documentation status note.
- **Women Empowerment**: Coral red (`#ff4d4d`) hero with white text, self-help group emphasis, and cross-link callout to Skill Development.
- **Community Welfare**: Near-black (`#171717`) hero with warm cream text, 2-column portrait photo gallery of the Friday Ruby Meal outreach, and project preview.
- **Rural & Tribal Development**: Warm surface (`#f5f2e8`) hero with dark text, landscape construction photograph, and full-width housing project collage.
- **Skill Development**: Royal blue (`#2541b2`) hero, trade focus, and cross-reference callout to Sui Daga.
- **Relief Works**: Coral red (`#ff4d4d`) hero, humanitarian crisis response pillars, and transparent verification notice.
- **Motion Behavior**:
  - Scroll reveals use `Reveal` with `statement` and `media` variants.
  - Authentic photographs use `ImageMaskReveal` for smooth entrance.
  - Native scrolling is 100% preserved.
  - `prefers-reduced-motion: reduce` completely disables transitions and transforms.
  - No external animation libraries or scroll hijackers were introduced.

---

## 6. Verification Results

| Check | Tool / Scope | Result | Notes |
| :--- | :--- | :--- | :--- |
| **TypeScript** | `next typegen && tsc --noEmit` | **Passed** | 0 type errors, strict TypeScript. |
| **ESLint** | `eslint . --max-warnings=0` | **Passed** | 0 errors, 0 warnings. |
| **Prettier** | `prettier --check .` | **Passed** | All matched files use Prettier style. |
| **Production Build** | `next build` (Turbopack) | **Passed** | All 33 static pages generated cleanly. |
| **Programmes Tests** | Playwright (24 tests) | **Passed (24/24)** | Desktop & mobile Edge/Chromium: responsive widths (320px–1920px), media loading, SEO metadata, breadcrumbs, zero console errors. |
| **Leadership Tests** | Playwright (`profile.spec.ts` & `navigation.spec.ts`) | **Passed** | All 4 leadership portraits verified rendering with correct alt text and natural dimensions. |
| **Full Regression Suite** | Playwright (`--workers=2`) | **94/95 passed** | One intermittent mobile timeout in `homepage.spec.ts:43` (viewport screenshot loop timed out at 60 s under parallel load). Confirmed non-regression: isolated re-run passed 2/2 in 56 s. Desktop counterpart (#4) passed in 36.3 s. Pre-existing environment flakiness. |

---

## 7. Status & Readiness for Phase 5C.2B

Phase 5C.2A is fully complete. The Programmes overview and seven focus area pages provide a compelling, accessible, and truthful digital presence for SEVA Social Service Society.

The codebase is now fully prepared for **Phase 5C.2B (Individual Project Detail Pages)** when authorized.

