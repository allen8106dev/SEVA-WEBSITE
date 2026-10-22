# Phase 5C.1: Profile editorial pages

This phase completes the five Profile compositions inside the existing website. Programmes, Media, Resources, Get Involved and Contact retain their Phase 5B foundations. Phase 5C.2 has not begun. No dependencies, hosting changes, forms or payment mechanisms were introduced.

## Pages completed

| Route                     | Composition                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/profile`                | Yellow editorial introduction, official emblem seal, asymmetric documentary photo/story pairing, three-state reach strip and an unequal editorial index into the four Profile pages        |
| `/profile/about`          | Cream introduction, establishment-year feature, Ruby Meal photograph, blue three-state chapter, yellow approach chapter and seven programme links                                          |
| `/profile/vision-mission` | Blue vision chapter, canonical vision statement and scroll-responsive values; contrasting mission chapter with documentary photography and five typographic pillars                        |
| `/profile/leadership`     | Dark introduction and four alternating portrait/name features; two confirmed portraits and two name-based placeholders                                                                     |
| `/profile/history`        | Oversized 2015 establishment feature, extensible typed timeline with one confirmed entry and expandable source notes, purpose statement and links to current programmes and reported reach |

All five pages have working breadcrumbs, Profile cross-links, existing desktop/mobile navigation integration, unique metadata and explicit noindex/nofollow. A canonical is emitted for these pages only when the existing site configuration supplies an origin. No production origin was invented.

## Files created

- `src/content/profile.ts`: typed editorial copy, media IDs, placeholder monograms and confirmed historical records. Mission, vision, states, identity and leadership remain canonical in their existing modules.
- `src/components/sections/profile-pages.tsx`: five distinct Server Component compositions with small local helpers for the shared opening, editorial index, approved photograph and closing.
- `src/components/animations/value-emphasis.tsx`: the sole new client animation, with native-scroll values emphasis and reduced-motion cleanup.
- `src/styles/profile.css`: scoped responsive compositions, colors, typography, editorial index, timeline and portrait treatments.
- `tests/profile.spec.ts`: responsive routes, image loading, accurate identities, history, values scrolling, mobile cross-navigation and no-JavaScript checks.
- `tests/profile-styles.spec.ts` and its screenshots: computed-style/font checks and separate reviewed 375/1440px openings for all five pages, shared by development and production verification.
- This delivery report.

## Existing files modified

- `src/app/[...slug]/page.tsx`: dispatches the five existing allowlisted Profile destinations to their completed compositions; uses Profile metadata and optional configured canonicals.
- `src/app/layout.tsx`: imports the scoped Profile stylesheet.
- `src/components/layout/interior-page.tsx`: extracts its existing breadcrumb markup into a reusable `Breadcrumbs` export, preserving other route foundations.
- `src/components/sections/interior-content.tsx`: removes the superseded Profile placeholder branches, keeping other categories unchanged.
- `src/components/animations/split-reveal.tsx`: reuses central distance, viewport and bounded stagger tokens; text remains fully opaque during its masked word settle.
- `src/config/navigation.ts`: marks the five implemented Profile routes available; destinations and other categories are unchanged.
- `tests/navigation.spec.ts`: preserves heading/roster assertions against the actual new semantic markup, including all four leadership records.
- `playwright.config.ts` and `playwright.styles.config.ts`: include Profile styling checks in desktop production and the actual development-server checks, matching the existing style-test convention.
- README, blueprint, content, design, motion, navigation and media documentation record this phase without deleting prior reports.

## Source content and media

`organization.ts` supplies the official name, tagline, 2015 establishment, registered not-for-profit identity, three states, introduction, vision and mission. `focus-areas.ts` supplies all seven programme destinations. `leadership.ts` supplies names, titles, ordering and candidate portrait references. `media.ts` remains unchanged and is the publication approval gate. No new biographies, field offices, dates, awards, achievements, metrics or programmes were invented.

| Placement                    | Registered asset                                    |
| ---------------------------- | --------------------------------------------------- |
| Profile overview             | `tuition-classroom-group`                           |
| About documentary photograph | `ruby-meals-service`                                |
| Mission chapter              | `vidhya-jyothi-sisters`                             |
| Vicar General portrait       | `portrait-msgr-shaji`                               |
| Chancellor portrait          | `portrait-fr-joshy`                                 |
| Overview seal                | Official emblem from `organization.branding.emblem` |

Images retain registry captions, descriptive alt text, reserved ratios/dimensions and responsive Next.js Image sizing. Confirmed portraits use their full natural framing so faces are not cropped or covered. Documentary frames reuse the existing image-mask component. No original, derivative or registry record was overwritten or discarded, and the homepage photo selection is unchanged.

## Leadership and historical safeguards

All four official names retain source-provided spelling. Portrait rendering requires the leadership record to be `confirmed_official`, a matching approved registry URL and confirmed identity. The Bishop and Director receive monograms and name-based placeholders with explicit pending captions. Neither withheld source portrait is published or assigned by facial resemblance. Full biographies and two verified portraits remain awaiting approval.

The timeline includes only the confirmed 2015 establishment entry, with a source and confirmation status. Further records can be appended after organizational confirmation; no programme launch dates are implied by the separately labeled current-work links.

## Motion and accessibility

Existing SplitReveal provides bounded word-mask settling for editorial openings, with full-opacity text and no hidden server state. Existing Reveal provides statement and portrait entrances. ImageMaskReveal enhances approved documentary frames only on the existing fine-pointer, wide-screen, non-reduced-motion capability query.

ValueEmphasis progresses four decorative underlines and moves value labels by at most the central 8px statement distance as native scrolling passes the values. It uses Motion values and the shared spring without React state updates on each scroll frame. Unlike photographic parallax, this small typographic emphasis remains available on mobile. The preference subscription and active Motion subtree unmount when reduced motion is enabled. Static words and full rules remain visible with reduced motion or without JavaScript. No scroll locking, pinning, artificial scrolling or layout-dependent animation is introduced.

Native links/details, 46px control minimums, heading hierarchy, semantic lists, visible keyboard focus and truthful image captions remain. Leadership entries have no pointer cursor, button or artificial tab stop. Responsive grids collapse to deliberate reading sequences at the existing 48rem breakpoint.

## Verification and limitations

Full-page desktop/mobile screenshots for all five pages were inspected, including portrait framing, typography and page-specific contrast. Responsive overflow checks cover every page at 320, 375, 768, 1024, 1440 and 1920px. Additional opening captures cover those widths for Profile and Leadership.

| Verification                                              | Result                                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| TypeScript                                                | Passed                                                                               |
| ESLint                                                    | Passed, zero warnings                                                                |
| Prettier                                                  | Passed                                                                               |
| Production build                                          | Passed, all existing static destinations generated                                   |
| Complete production Playwright suite, two workers         | 71/71 passed in 4.4 minutes                                                          |
| Profile browser checks after the final caption adjustment | 20/20 passed across desktop and mobile                                               |
| Final production Profile style checks                     | 2/2 passed without snapshot-update mode                                              |
| Actual development-server checks, one worker              | 5/5 passed: two Profile checks covering all five openings plus three homepage checks |
| Git whitespace check                                      | Passed                                                                               |

The full suite passed before the final caption refinement. Visual review then caught the overview's decorative label overlapping its photo caption, despite the earlier functional checks passing. The label now has its own space below the caption. A browser assertion verifies that separation at all six widths. All 20 Profile browser checks passed again after the fix; the changed 1440px overview reference was updated only after reviewing its screenshot/diff and confirming computed styles. The final two production Profile style checks and all five development checks then passed against the same references. No snapshot tolerance, assertion or timeout was weakened.

The previously intermittent mobile participation test passed in 51.5 seconds, below its unchanged 60-second timeout; it did not recur as a failure. Windows left the owned production test server alive after test completion, so only that run's known server PID was stopped for runner teardown. The existing development server was reused and left running.

All existing homepage and Phase 5B screenshot baselines are preserved. Profile opening references use a separate snapshot directory; computed styles were checked and screenshots inspected before introducing them. Tests verify real browser rendering, not just server HTML. Physical-device, dedicated screen-reader and performance audits are not claimed.

## Remaining work and next phase

Pending content: two correctly identified official portraits, approved biographies, further dated historical records, and the previously documented later media curation. Existing withheld assets remain private. These content limits are clearly represented on the pages.

The five Profile pages and their reusable foundations are ready for review. Phase 5C.2 can build on the existing programme routes and media arrays when separately authorized. This phase does not enable indexing, publication or deployment.
