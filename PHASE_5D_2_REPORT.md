# Phase 5D.2 — Resources and organizational transparency

Implemented in the existing local checkout on 22 October 2026. Phase 5D.1's uncommitted implementation and documentation were preserved. Phase 5E was not started; no publishing, hosting, production origin, indexing, dependencies or lockfile changes were made.

## Completed routes and presentation

- `/resources`: yellow editorial introduction, three numbered reporting pathways, explicit document availability, publication approach, and blue transparency presentation.
- `/resources/annual-reports`: year-wise archive infrastructure and an honest empty state.
- `/resources/financial-statements`: financial-year archive infrastructure with typed audited-statement, financial-summary and annual-account records. Categories appear only on approved records.
- `/resources/compliance`: an honest empty archive plus seven referenced documentation categories from the existing compliance model, each distinguishing source reference, validity verification and public access.

All routes remain in the existing catch-all hierarchy, with shared breadcrumbs, accurate unique metadata and explicit noindex/nofollow. Navigation status `available` now means each page is implemented, not that its documents are downloadable. Desktop disclosure, mobile accordion, active route states, floating navigation and the 48rem breakpoint are preserved.

The composition uses existing Container, typography and Reveal primitives, semantic palette/spacing tokens and self-hosted fonts. Numbered pathway links settle into view, with fine-pointer hover feedback on decorative arrows; the transparency introduction uses statement reveal. Official document and compliance text remains static. Statistics use canonical `headlineMetrics` with their sources, reporting periods and verification status and never count up. Reduced motion disables motion; content remains readable without JavaScript. No new photos or fabricated document artwork were added.

## Registry and publication safeguards

`src/content/resources.ts` defines `ResourceRecord`, `PublishedResource`, `ResourceFilters`, report-type labels, category/editorial copy, and an empty `resourceRegistry`. Records support ID, title, category, reporting/financial year, description, report type, compliance reference, public file path, PDF format, byte size, publication date, verification status, publication approval, publication state and public-version review.

`isPublishedResource` and `getPublishedResources` require verification, explicit publication approval, published state, approved public-version review, complete file metadata and a valid calendar date. URLs are restricted to same-origin `/documents/<lowercase-name>.pdf` derivatives; protocols, external hosts, query strings, traversal and encoded paths fail closed. Compliance downloads also require a matching canonical compliance record with `publicDisplayAllowed: true`.

`ResourceDocuments` independently applies the gate to every input, groups published records by descending reporting year and renders descriptive native download links including title, PDF format, byte-derived KB size and publication date. Browser preferences may offer viewing instead of downloading. No viewer, fake PDF, disabled download button or dead link was added. Filtering supports category, year, type and availability; unpublished metadata is never returned, and no meaningless controls are shown with an empty registry.

These selectors cannot secure an unapproved file placed in `public/`. Before adding any derivative, management must authorize the exact public version, identifiers and personal information must be reviewed/redacted, and the intended public version must be confirmed. Originals must remain securely outside public assets and the repository. The registry must not contain sensitive identifiers, private original paths or authorization correspondence. Withdrawal requires removing public derivatives as well as changing statuses; previously distributed copies/caches require separate handling. The new filesystem regression checks `public/documents` against the approved registry and actual byte sizes. Inspection found no document/archive files in the current public asset tree.

Verification of a public document is separate from current certificate validity. The page does not assert tax eligibility, FCRA currency, registration numbers, audit outcomes or financial health. It does not render the older compliance notes that could imply an unsupported audit arrangement.

## Document availability and outstanding approvals

**Available public downloads: zero.** No annual reports or financial statements were supplied for public release. No actual document records, dates, years or financial figures were invented.

The supplied organizational model references Registration Certificate, PAN Card, 80G, 12AC, FCRA, Audited Financial Statements and CSR Compliance Documents. All seven currently remain `reported_available` with `publicDisplayAllowed: false`; their current validity is pending verification and their public versions are not yet available. These references are not seven supplied files waiting for a simple status toggle. Actual public versions, verification and explicit release authorization are still required.

## Files created and modified

Created:

- `src/content/resources.ts`
- `src/components/sections/resource-pages.tsx`
- `src/styles/resources.css`
- `tests/resource-models.spec.ts`
- `tests/resources.spec.ts`
- `tests/resources-styles.spec.ts`
- Eight separately named Resources opening references in `tests/resources-styles.spec.ts-snapshots/`
- `PHASE_5D_2_REPORT.md`

Modified for integration:

- `src/app/[...slug]/page.tsx`: Resources dispatch, retaining all inherited dispatch and metadata.
- `src/app/layout.tsx`: scoped Resources stylesheet import.
- `src/config/navigation.ts`: four Resources implementation flags.
- `playwright.config.ts`, `playwright.styles.config.ts`: desktop production and actual-development Resources visual checks.
- `README.md`, `CONTENT_GUIDE.md`, `NAVIGATION_GUIDE.md`, `DESIGN_SYSTEM.md`, `MOTION_SYSTEM.md`, `SEVA_PROJECT_BLUEPRINT.md`: phase status, architecture, publication process and extension conventions.

## Verification

The focused Resources run passed 20/20 cases, including isolated approved-document fixtures that never enter public registries. Coverage includes publication rejection, malformed dates, unsafe paths, missing metadata, canonical compliance permissions, category/year/type filters, descending archive order, accessible download labels, public file inventory, all four routes, no dead download controls, source/status preservation, privacy-pattern checks, desktop/mobile keyboard menus and no-JavaScript reading.

Responsive browser checks cover every Resources page at 320, 375, 768, 1024, 1440 and 1920px. They check overflow, readable headings, 46px links and reduced-motion behavior. Browser error listeners cover all four routes. Resources visual checks inspect stylesheet responses, computed hero backgrounds and actual Cormorant/Manrope glyph rendering before comparing eight new 375/1440px openings. Original screenshot references were not modified.

The first focused run completed all tests but its owned Next.js production server remained running during teardown. Stopping only the server PID printed by that run allowed Playwright to exit successfully with 20 passed; no assertion was skipped or weakened. This was a process-teardown issue, separate from page behavior or stylesheet correctness.

The first full production run passed 172/173 cases. The existing mobile homepage composition case exhausted its own unchanged 60-second limit while `locator.screenshot` waited for the purpose section to stabilize at 1920px; its participation/contact link checks and earlier viewport captures had completed. The trace and error context were inspected and retained under `test-results/homepage-participation-act-c319a-s-retain-mobile-composition-mobile/`. Development browser checks were running concurrently during that run. Resource contention is a possible contributor, not a proven root cause; this is not a claim that a product defect was repaired. No inherited test, assertion, timeout or screenshot baseline was changed.

Full-layout review also identified inherited muted paragraph coloring and an inconspicuous blue focus outline on the new blue transparency surface. Two scoped CSS rules now use light paragraph text and a yellow focus outline, with explicit computed-style checks. Typecheck, lint, formatting and a fresh production build passed after these refinements. The complete production suite is rerun against that final build without concurrent development browser checks; its artifacts use `test-results/phase-5d2-final/`, retaining the initial failure evidence.

The complete actual-development-server styling run passed **9/9**, including original homepage/Profile/Media references and the two Resources cases. All eight new opening references and desktop/mobile full compliance layouts were reviewed, followed by the corrected full overview and transparency layout on the actual development server. No stale development stylesheet output was observed.

The final complete production run passed **173/173** against the final build, using `npm run test:e2e -- --workers=2 --timeout=120000 --output=test-results/phase-5d2-final`. This includes all 20 new Resources cases. The unchanged mobile homepage composition case passed in 56.3 seconds; its proximity to its own 60-second limit remains a documented timing risk, rather than a claimed permanent fix. Only the test-owned production server was stopped after all results completed so Playwright could finish teardown. The pre-existing development server was preserved.

| Final check                                 | Result                                                                            |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| TypeScript (`next typegen && tsc --noEmit`) | Passed                                                                            |
| ESLint (`--max-warnings=0`)                 | Passed                                                                            |
| Prettier                                    | Passed                                                                            |
| Production build                            | Passed, 39 generated entries                                                      |
| Full production browser suite               | 173/173 passed                                                                    |
| Actual development-server style suite       | 9/9 passed                                                                        |
| Resources-specific coverage                 | 20/20 passed in the final complete run                                            |
| Responsive widths                           | 320, 375, 768, 1024, 1440, 1920px                                                 |
| Visual review                               | Eight new openings, full compliance layouts, corrected full overview/transparency |
| Git whitespace                              | Passed                                                                            |

No required check was omitted. Browser coverage uses installed Microsoft Edge desktop and an emulated iPhone configuration. The original screenshot references, content approval flags, package files and lockfile are unchanged.

## Remaining limits and Phase 5E readiness

The Resources architecture is ready for approved document intake and a separately scoped next phase. Phase 5E is not implemented. Real PDF download/viewing, document accessibility (tags, reading order and searchable text), exact redactions, certificate validity, external financial verification and publication authority cannot be validated without actual documents. No physical-device, dedicated screen-reader or numerical performance audit is claimed.

Future CMS integration should validate records on the server into the same interface and retain publication gates, public-version review and secure originals. It must not expose draft metadata through client props or rely on UI filtering to protect storage. No CMS, database, authentication, payment mechanism or speculative backend is configured.
