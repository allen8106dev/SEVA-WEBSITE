# Phase 6: Responsive, accessibility and performance audit

**Status:** Complete for the current design system. Phase 6.1 has not started.

Phase 6 audited the existing SEVA site without changing its organizational content, route set, identity, or motion system. The final production regression suite passed after correcting a narrow-screen heading overflow. A broad visual redesign is intentionally deferred to Phase 6.1.

## Scope and changes

- Expanded responsive coverage to nine desktop widths (320–1920px) and four touch widths (320–428px), with heading-fit checks on key page groups.
- Added a production accessibility regression scan across 33 public routes at 390px and 1440px. It checks visible text contrast, image alternatives, named controls, main headings, heading order, and duplicate IDs.
- Corrected low-contrast text on coral and other audited surfaces; retained the existing semantic palette and typography. At widths up to 360px, Get Involved pathway headings use the existing medium heading token so “Community collaboration” fits its column.
- Kept gallery card images lazy-loaded. The closed lightbox renders no modal image; opening a photograph mounts the dialog and loads its image on demand.
- Made the gallery section heading explicit and added reviewed opening references for Get Involved and Contact pages.
- Improved the hero choreography test to wait for exact settled styles before checking stagger order. Animation behavior is unchanged.
- Updated the design, motion, blueprint, and project README documentation. No dependency, route, or image asset was added or replaced.

## Passed checks

| Check                                                                                                      | Result                                                                                  |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `npm.cmd run typecheck`                                                                                    | Passed                                                                                  |
| `npm.cmd run lint`                                                                                         | Passed with zero warnings                                                               |
| `npm.cmd run format:check`                                                                                 | Passed                                                                                  |
| `npm.cmd run build`                                                                                        | Passed; Next.js generated 39 static entries                                             |
| `npm.cmd run test:e2e -- --workers=2 --timeout=120000 --output=test-results/phase6-final-rerun`            | **186 passed, 0 failed** in 6.6 minutes, using the established production configuration |
| `npm.cmd run test:styles:dev -- --workers=1 --timeout=90000 --output=test-results/phase6-dev-styles-final` | 11 passed in the actual development server run                                          |
| Production accessibility scan                                                                              | Passed across all 33 routes at 390px and 1440px                                         |

The development style run preceded the final 320px heading adjustment. Its reviewed captures are at 375px and 1440px, outside that adjustment's `max-width: 360px` breakpoint. The final production regression run includes the adjustment and passed the 320px checks in both desktop and touch projects.

### Test history and failures

The first Phase 6 full run had **184 passed and 2 failed**. Both failures were the same newly added heading-fit assertion for “Community collaboration” on `/get-involved` at 320px, repeated once in each Playwright project. The 44px heading exceeded its grid column. The narrow breakpoint fix described above addressed it; the single full rerun after the fix finished with **186 passed and no failed tests**.

An earlier Phase 5E report records a separate 181-test run with three failures but does not preserve the failing test names or traces. Those historical failures cannot be mapped to this Phase 6 run, and this report does not claim they were resolved by Phase 6.

## Production performance sample

The before/after comparison used the local production build in Edge, with three measurements for each of eight routes at desktop and mobile widths. Reported figures are per-route medians. This is a small local lab sample, not field Core Web Vitals.

| Measure                         |                                                         Before |                  After | Result                              |
| ------------------------------- | -------------------------------------------------------------: | ---------------------: | ----------------------------------- |
| Gallery, desktop image transfer |                                           451 KiB / 8 requests |   354 KiB / 7 requests | 97 KiB and one request lower        |
| Gallery, mobile image transfer  |                                           320 KiB / 4 requests |   320 KiB / 4 requests | Unchanged                           |
| Typical JavaScript transfer     |                                                        207 KiB |                207 KiB | No material change                  |
| Typical CSS transfer            |                                                         23 KiB |                 23 KiB | No material change                  |
| CLS                             | 0 on nearly all route/view pairs; 0.002 on the desktop gallery | 0 on all sampled pairs | Stable; gallery sample reduced to 0 |

LCP did not improve broadly in this sample. Desktop home improved from 352ms to 284ms; the other seven desktop routes increased by 12–148ms. All eight mobile routes increased by 28–144ms. Some long-task and synthetic interaction estimates also increased. Treat these small-run local measurements as mixed and variable, not as evidence of real-user regression or improvement. A repeatable browser lab and field data are not available in this project. The raw ignored artifacts are `test-results/phase6-performance-baseline.json` and `test-results/phase6-performance-final.json`.

## Outstanding items and Phase 6.1

- The local performance sample is inconclusive for LCP and shows no JavaScript or CSS transfer reduction. No further performance tuning was undertaken in this phase.
- The automated contrast scan checks directly rendered text and excludes text drawn over image or gradient backgrounds. It is a regression heuristic, not a complete WCAG audit or conformance claim.
- No Lighthouse or axe tooling is installed. A physical-device and screen-reader review was not performed.
- No severe responsive or interaction issue remains in the final automated suite. Broader visual work—new colors, type, spacing, and page compositions inspired by Shreyas.org—is reserved for Phase 6.1, as requested. Existing documentary demonstration photography remains identified as such until authentic approved media is supplied.
- Indexing, deployment, hosting, donation processing, and Phase 7 were not started.
