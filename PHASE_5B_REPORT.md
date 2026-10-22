# Phase 5B delivery report

Phase 5B implements navigation and route foundations inside the existing SEVA website. Detailed Phase 5C page development has not begun. No deployment, domain change, dependency addition, form, payment mechanism, CMS or database was introduced.

## Navigation and routes

Home, Profile, Programmes, Media, Resources, Get Involved and Contact Us now form the shared primary hierarchy. All requested child routes are implemented as useful content foundations or clearly labeled preparation states. There are 26 interior routes plus the original homepage. The full path inventory is in [NAVIGATION_GUIDE.md](NAVIGATION_GUIDE.md).

Desktop dropdowns support hover, click, Enter/Space, Tab, Escape, outside pointer dismissal and focus departure. Parent landing pages remain independent links. Mobile uses separate parent links and accordion buttons, with internal scrolling, route-close behavior, breakpoint cleanup and focus restoration. Escape first closes a child disclosure and then the outer menu. Exact routes and slash-delimited ancestor routes receive distinct accessible active states.

The official logo, yellow hero header and original floating treatment after 60px scroll remain. At 48-64rem the header uses two rows; wider desktop uses one row. The shared 48rem breakpoint and 46px controls remain. Navigation works without JavaScript through server-rendered category links, landing cards and footer links. Original homepage chapter anchors and active-anchor semantics remain available in the footer and mobile homepage panel.

CSS uses the existing motion timing and distance tokens for short panel entrances/exits, rotating disclosure indicators and active underlines. Reduced motion disables transitions. No animation delays interaction or focus.

## Files

Created:

- `src/config/navigation.ts`: typed shared hierarchy, implementation status and active matching.
- `src/components/layout/route-navigation.tsx`: shared desktop/mobile interaction.
- `src/components/layout/interior-page.tsx`: server-rendered hero, breadcrumbs, preparation notice and related routes.
- `src/components/sections/interior-content.tsx`: available organizational content for all route foundations.
- `src/app/[...slug]/page.tsx`: static route allowlist, awaited params, metadata and 404 handling.
- `src/content/route-media.ts`: approved gallery/project photo arrays.
- `src/styles/navigation.css`: responsive navigation and interior styling.
- `tests/navigation.spec.ts`: route, interaction, accessibility, media safeguard and responsive checks.
- `tests/styles.spec.ts-snapshots/homepage-navigation-{375,768,1440}-desktop-win32.png`: separately reviewed Phase 5B references.
- `NAVIGATION_GUIDE.md` and this report.

Modified:

- `src/app/layout.tsx`: navigation stylesheet and configuration-driven noscript links.
- `src/components/layout/site-header.tsx`, `mobile-navigation.tsx`, `site-footer.tsx`: shared category navigation and retained chapter links.
- `tests/site.spec.ts`: anchor coverage follows chapter links to the footer; mobile first focus follows the new Home link.
- `tests/styles.spec.ts`: uses separately named Phase 5B references with all existing style, font and pixel tolerance checks retained.
- `README.md`, `SEVA_PROJECT_BLUEPRINT.md`, `DESIGN_SYSTEM.md`, `MOTION_SYSTEM.md`, `CONTENT_GUIDE.md`, `MEDIA_ASSET_REGISTER.md`: architecture, editing and media follow-up documentation.

`package.json`, `package-lock.json`, the existing media registry, original media, existing derivatives and original reduced-motion screenshot baselines are unchanged.

## Media and pending content

Leadership renders four official profile slots. Only the two registry-approved, identity-confirmed portraits render; two slots explicitly await confirmation. Neither withheld source portrait is assigned to another person. The gallery preview can display all approved Pictures.zip registry records, including those absent from the homepage. Project previews support multiple photographs through explicit associations, without unrelated fallback photography.

The full retained inventory and unused/pending follow-up are documented in MEDIA_ASSET_REGISTER.md. The existing tuition-centre composite is preserved but needs a typed registry record and curation alongside its extracts. No photograph was forced onto the homepage.

Further biographies, two verified portraits, historical milestones, detailed project stories, gallery curation, videos, news/events, approved downloadable reports and compliance material remain pending. Payment and registration mechanisms remain unimplemented. Interior previews explicitly remain noindex/nofollow, and no production origin was invented.

## Verification

Typecheck, ESLint with zero warnings, formatting and the production build pass. The build generates all 26 interior paths. Browser checks cover desktop and mobile Edge/Chromium, keyboard navigation, Escape and outside dismissal, current-route indicators, parent links, unknown-route 404s, unique metadata, no-JavaScript navigation, approved media filtering and reduced motion.

Screenshots were reviewed at 320, 375, 768, 1024, 1440 and 1920px. Production checks confirmed stylesheet responses, computed colors/layout, actual local font glyph rendering and no horizontal overflow. The initial 768px screenshot difference came from the intentional second header row; original references remain preserved alongside the separately named reviewed Phase 5B baselines. A detected nested Escape handling defect was fixed before final verification.

Final execution results:

| Check                                    | Result                                                |
| ---------------------------------------- | ----------------------------------------------------- |
| `npm run typecheck`                      | Passed                                                |
| `npm run lint`                           | Passed, zero warnings                                 |
| `npm run format:check`                   | Passed                                                |
| `npm run build`                          | Passed; all 26 interior routes generated              |
| `npm run test:e2e -- --workers=2`        | 49/49 passed in 3.1 minutes                           |
| `npm run test:styles:dev -- --workers=1` | 3/3 passed against the existing localhost:3000 server |
| `git diff --check`                       | Passed                                                |

The previously intermittent mobile participation test passed on both production runs (55.3s initially and 52.8s on the final suite), below its existing 60s limit. Its screenshot-heavy work remains relatively close to that limit; no timeout recurred, no assertions or timeouts were weakened, and no infrastructure-only diagnosis is claimed. The production test server stayed alive after tests completed on this Windows host; stopping only the server PID launched by the test run allowed normal successful runner teardown. The existing development server was reused and left running.

Physical-device and assistive-technology audits remain outside the automated emulation coverage. No performance score is claimed.

## Readiness for Phase 5C

The navigation and data-driven route foundations are ready for detailed page work. Add substantive pages without changing menu consumers, retain the existing `/projects/{id}` convention for future project details, and reuse approved media arrays. Content and media approvals remain prerequisites for publication-ready page development; this delivery does not authorize indexing or deployment.
