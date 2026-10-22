# Phase 5B navigation and route foundations

Phase 5B implements the requested organizational hierarchy, informed by the category grouping at [Shreyas](https://shreyas.org/). SEVA retains its own identity, content and assets. Detailed page development belongs to Phase 5C.

## Configuration and hierarchy

`src/config/navigation.ts` is the shared desktop, mobile, footer and no-JavaScript category source. Each item has an ID, label, href, description, visibility, implementation status and exact/subtree matching policy. Children use the same type. Status is editorial information, not permission to publish media or documents.

- Home: `/`
- Profile: `/profile`; `/profile/about`, `/profile/vision-mission`, `/profile/leadership`, `/profile/history`
- Programmes: `/programmes`; `/programmes/education`, `/programmes/healthcare`, `/programmes/women-empowerment`, `/programmes/community-welfare`, `/programmes/rural-tribal-development`, `/programmes/skill-development`, `/programmes/relief-works`
- Media: `/media`; `/media/gallery`, `/media/videos`, `/media/news-events`
- Resources: `/resources`; `/resources/annual-reports`, `/resources/financial-statements`, `/resources/compliance`
- Get Involved: `/get-involved`; `/get-involved/volunteer`, `/get-involved/csr`, `/get-involved/donate`
- Contact Us: `/contact`

There are 26 interior destinations, plus Home. Every configured interior route is statically generated through `src/app/[...slug]/page.tsx`. Unknown paths return 404; the catch-all does not turn arbitrary URLs into placeholder pages. Awaited route params follow the installed Next.js guide. Each route has a distinct title and description and explicitly remains noindex/nofollow.

## Interaction and accessibility

`RouteNavigation` renders ordinary navigation lists, links and disclosure buttons, with no ARIA menu roles. Parent links always navigate; adjacent buttons disclose children. Exact pages use `aria-current="page"`; active ancestors use `aria-current="location"`. Matching accepts an exact path or a slash-delimited descendant, never a loose substring. The original homepage anchors and their active-anchor tracking remain in the footer and mobile homepage chapter links.

Desktop opens on mouse hover or button activation. Panels touch their trigger row so the pointer can cross without a gap. Pointer leave closes only when focus is outside the group. Focus can move within each panel using Tab. Escape closes the panel and focuses its disclosure; outside pointer and focus leaving dismiss it. Opening another group closes the previous group. No keyboard navigation depends on hover.

Mobile retains the nonmodal Menu button and uses the same hierarchy as an accordion. Separate parent links and buttons avoid ambiguous taps. Escape first closes a focused child disclosure; a subsequent Escape closes the main panel and returns focus to Menu. Navigation closes the panel, outside interaction and focus departure dismiss it, and the 48rem breakpoint clears the open mobile menu. The panel is internally scrollable with bounded viewport height and contained overscroll; the page retains native scrolling. No modal focus trap or body scroll lock is needed for this nonmodal panel. Hidden panels are inert immediately.

The CSS and JavaScript navigation breakpoint remains 48rem. Between 48rem and 64rem, a second header row avoids squeezing seven categories. Controls remain at least 46px high, with 46px disclosure buttons. Sticky header offsets and the existing scroll listener are retained. Panels are positioned relative to their category and right-aligned for categories near the viewport edge.

Server-rendered footer categories, related-page links and a configuration-driven noscript navigation provide working routes without JavaScript. Breadcrumbs are a labeled nav and ordered list with a current-page marker. Interior content stays server rendered.

## Visuals and motion

`src/styles/navigation.css` extends existing cream, yellow, coral and royal-blue tokens. Dropdowns use a blue top rule, dark border, punchy shadow and clear link highlights. The header preserves its official logo, yellow top treatment and cream floating state after the existing 60px scroll threshold. Interior heroes use yellow and the existing editorial font; content uses existing containers and typography primitives.

CSS opening and closing uses `--motion-fast`, `--motion-menu-distance` and discrete display transitions. Indicators rotate and active underlines use existing timing. Focus and links work immediately. Reduced motion disables transitions. Browsers without discrete transitions close immediately. No timers, new animation dependency or GSAP are introduced.

## Extending the foundations

Add navigation records and genuine content together. `InteriorPage` supplies breadcrumbs, hero and related-page cards; `InteriorContent` consumes existing modular content records. A more detailed static App Router route can replace a catch-all destination without changing menu consumers. Preserve metadata and noindex until content and the origin are approved.

Future project details retain the existing `/projects/{id}` convention in `projects.ts`. Project names are currently informational, with no dead detail-page links. Add `src/app/projects/[project]/page.tsx` when detailed project development is authorized, validate IDs against `projects`, generate params from those records and reuse the category link `/programmes/{focusAreaId}` in breadcrumbs. No project page is claimed complete in this phase.

`src/content/route-media.ts` returns arrays of approved registry assets for gallery and project previews. `getGalleryAssets()` considers every approved `Pictures.zip` registry record, independent of homepage placement. `getProjectAssets()` uses explicit project-to-programme mappings; missing project photography returns an empty array. Extend mappings only after association is confirmed. Never guess associations from portraits or filename resemblance.

Leadership has four official profile slots with an approval and identity check against the existing registry. Two confirmed portraits render; two slots explicitly await confirmation. To add an authorized portrait, update both the leadership image reference and the registry with confirmed identity and publication approval. Do not map either withheld archive portrait to a different person.

## Pending content and media

See `MEDIA_ASSET_REGISTER.md` for the complete retained inventory and Phase 5B follow-up. Originals, registry records and existing derivatives are preserved. The tuition-centre composite derivative is documented but not in the typed registry; registering it and confirming whether to show it alongside its three extracts belongs to the media pass.

History milestones, leadership biographies, two verified portraits, detailed project stories, complete gallery curation, videos, news/events, public approved reports and certificates remain pending. Resources do not expose sensitive identifiers or downloads. Participation is informational; donation mechanisms remain awaiting authorization. Contact uses only the centralized directorate model. Homepage composition and participation previews remain unchanged.

## Verification

Run `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`, `npm run test:e2e -- --workers=2` and `npm run test:styles:dev`. `tests/navigation.spec.ts` covers routes, metadata, breadcrumbs, matching boundaries, pointer/keyboard dismissal, mobile behavior, approval filtering, no-JavaScript routes, reduced motion and screenshots at 320/375/768/1024/1440/1920px. Review screenshots and computed stylesheet/font evidence before changing any baseline. Phase 4/5A.1 `homepage-styled-*` reduced-motion baselines remain preserved; separately reviewed `homepage-navigation-*` Phase 5B baselines cover the intentional header changes with the same computed-style/font checks and pixel-difference tolerance.

## Phase 5C.1: Profile composition extension

The five Profile destinations now dispatch to `ProfilePage` from the existing route allowlist. They reuse the extracted `Breadcrumbs` component and canonical navigation configuration; Profile implementation statuses are now available. Editorial sibling links provide the same destinations without introducing a second menu hierarchy. Other categories retain their Phase 5B foundations. All original desktop/mobile behavior, active matching and no-JavaScript fallback routes remain. History is an implemented page with limited confirmed source material, not a claim that every historical record is available. See PHASE_5C_1_REPORT.md.
