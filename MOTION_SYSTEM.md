# SEVA motion system · Phases 4–6.1

## Phase 5D.2: Resources motion

Numbered resource pathways reuse bounded, once-only `Reveal` entrances. The transparency introduction uses the existing statement reveal; statistics remain static with canonical audit-pending labels. Fine-pointer card hover translates only a decorative arrow, using shared root timing/easing. Reduced motion removes this transform and transition and disables the existing entrance primitives. Official document listings and compliance details are static; server content and native scrolling remain visible and usable without JavaScript. No new animation library or subscription was added.

Motion connects the existing seven chapters without changing their content or accessibility contracts. The vocabulary covers a short CSS entrance sequence, editorial reveals, gentle media settling, bounded parallax, a CSS marquee, three signature scroll interactions, and immediate control feedback. Native scrolling remains in place. No GSAP, Lenis, new package, global animation provider, pinned scene, or loading screen is used.

## Tokens

`src/config/motion.ts` is the single source for CSS and Motion timings. The root layout already exports these settings as CSS variables; its import order and the repaired Next.js cache configuration are preserved.

- Fast feedback 180ms; standard interaction 300ms; reveal 550ms; entrance 600ms; media settle 750ms; verified count 900ms.
- Shared ease: cubic-bezier(0.22, 1, 0.36, 1).
- The former overshooting bounce token now uses the shared ease so hover feedback settles without a bounce.
- Hero line stagger 75ms; impact-area stagger 100ms, capped at 200ms.
- Entrance distance 8px, halved for the mobile hero. Purpose heading displacement is 8px.
- Viewport entry thresholds: 18% for editorial reveals and 22% for media.
- Media settle scale 1.015; hover emphasis 1.012; button press scale 0.99; menu movement 4px.
- Story parallax is bounded to ±8px with 1.06 overscan. Its spring uses stiffness 260, damping 40, and mass 0.8.
- **Marquee speed**: `--motion-marquee: 40s` — the CSS animation duration for the hero marquee strip.
- **Carousel slide transition**: `--motion-carousel: 650ms`, exported from `motionTokens.duration.carousel`.
- **Carousel interval**: six seconds, exported from `motionTokens.duration.carouselInterval`.

Adjust this vocabulary centrally rather than adding unrelated durations to sections. The homepage carousel is the sole new automatic slide movement; its controls and reduced-motion behavior are part of the component contract.

## Phase 6.1 header and homepage carousel

The sticky header changes between expanded and compact states at the existing 60px scroll threshold. CSS transitions the bounded header and logo sizes; reduced motion removes these transitions. The listener updates only when the state changes, and the logo remains linked and accessible in both states.

`HomeHeroCarousel` uses three publication-approved registry assets and CSS horizontal translation. The 650ms transition and six-second interval come from the shared motion tokens. Only slide one is preloaded; the remaining Next Images keep lazy-loading behavior. Pointer entry, focus, and manual navigation pause automatic movement. Visitors can resume it with the play control. Arrow keys move between slides without moving focus. The carousel disables autoplay and its transition for `prefers-reduced-motion: reduce`, while retaining manual controls. It does not announce timed changes or hide server-rendered slide content from assistive technology.

The carousel's 4:3 reserved frame prevents image loading from shifting layout. At mobile and narrow tablet widths the caption sits above the controls; at wider widths it uses a neutral caption panel beside the controls. Photograph pixels remain untinted.

## Hero choreography

CSS in `src/styles/home.css` animates the existing semantic headline spans, copy, actions, footnote, and media. Media begins immediately; headline lines follow at 55/130/205ms, copy at 160ms, actions at 220ms, and details at 280ms. All sequences finish within about one second. Text keeps full opacity and contrast throughout; fading is limited to decorative hero artwork, leaving captions intact. Critical content is fully present in server HTML and stays interactive. There is no artificial delay or initial invisible state awaiting hydration. CSS media queries disable the sequence for reduced motion. Mobile uses half the translation distance and a shorter media settle.

### h1 structure constraint

The hero headline must remain three children: `<span>`, `<em>`, `<span>`. CSS applies the `hero-line-settle` keyframe animation to `.home-hero h1 > :is(span, em)` with staggered delays. The `motion.spec.ts` test asserts:

- Exactly 3 elements matching `.home-hero h1 > :is(span, em)`
- All three have `animationName === "hero-line-settle"`
- All three have `opacity === 1`
- `delay[0] < delay[1] < delay[2]`

Do not change the element types, count, or animation name without updating the test.

## Existing shared scroll interactions

The existing scroll-driven components retain the signature interactions:

### Signature 1: HeroScroll (`src/components/animations/hero-scroll.tsx`)

Uses Motion `useScroll` + `useSpring` + `useTransform` to create subtle parallax on the hero wrapper as the user scrolls. The hero content gently moves upward and slightly fades as the next section enters view. Only activates on fine-pointer, non-reduced-motion, wide-viewport devices. Unmounts cleanly on capability change.

### Signature 2: ImageMaskReveal (`src/components/animations/image-mask-reveal.tsx`)

Used in the Purpose section. Animates `clip-path: inset(...)` from a cropped state to fully revealed as the element enters the viewport. The image begins visually contained and expands as the user scrolls to it. Synchronized with the adjacent typography enter animation. Respects `prefers-reduced-motion`.

### Signature 3: KineticClosing (`src/components/animations/kinetic-closing.tsx`)

The closing section kinetic banner. Uses `useScroll` + `useTransform` to horizontally shift oversized text as the section scrolls into view, creating a dramatic cinematic sweep effect. Bounded to a controlled translate range. Reduced-motion users see static text.

## Marquee (`src/components/animations/marquee.tsx`)

A horizontal CSS marquee strip at the base of the hero section. Uses the `kinetic-marquee` CSS class defined in `globals.css` with the `marquee-scroll` keyframe animation. Speed is controlled by `--motion-marquee: 40s` from `src/config/motion.ts`. Behaviour:

- Pauses on hover (CSS `animation-play-state: paused`)
- Immediately stops when `prefers-reduced-motion: reduce` is set (via `@media` rule)
- Has `role="region"` and `aria-label` for screen reader identification
- Duplicates content internally to create seamless looping

## SplitReveal (`src/components/animations/split-reveal.tsx`)

A word-by-word masked reveal component. Available for future use — not currently wired into any section. It splits a heading string into individual `<span>` words, each animated with `clipPath` mask reveals and staggered delays using Motion `whileInView`. Respects reduced motion.

## Reveal primitive

`Reveal` in `components/animations/reveal.tsx` passes server-rendered children through a small client boundary. `initial={false}` keeps server content visible. Entry runs once with a threshold from the shared configuration:

- `statement`: small horizontal whole-heading movement and gentle emphasis; the Purpose heading remains one accessible heading, with no word/line splitting. A static editorial rule provides a visual anchor.
- `media`: a restrained scale settle; used for staggered impact media and the story entrance.
- `closing`: a quiet scale settle tying the conclusion to the hero.
- `rise`: retained for a future genuinely appropriate use, rather than applied to every section.

Motion manages viewport observation and animation teardown. Reduced-motion preferences prevent new keyframes; CSS also immediately restores static transform/opacity if the preference changes during a running effect. No text remains hidden when scrolling rapidly past a chapter.

## Story scroll architecture

`ScrollMedia` enhances a server-rendered media frame. A useSyncExternalStore subscription watches the combined capability query: at least 48rem wide, fine pointer, hover available, and no reduced-motion request. Only qualifying devices mount `ActiveScrollMedia`, which uses Motion useScroll/useSpring/useTransform. Unmounting it removes the scroll subscription, including when preferences, device capabilities, or viewport size change. This also works under React Strict Mode.

During parallax, only the image/SVG inside the reserved frame moves; the frame, caption, adjacent copy, and reading order stay fixed. A separate once-only media settle introduces the story. Existing ratios, focal points, and future photograph configuration remain intact. The modest overscan covers frame edges. Video is explicitly excluded so controls/captions are not moved by parallax. Phones, coarse-pointer tablets, reduced-motion users, and no-JavaScript clients receive static media plus an optional short entrance. MotionValues update the visual without React state updates on every scroll frame. The spring is bounded by the output mapping, so rapid scrolling cannot send the media beyond ±8px.

## Controls, impact areas, and navigation

Impact imagery scales very slightly on fine-pointer hover and focus-within. The information and demonstration labels remain visible. Cards without links have no pointer cursor or added tab stop. Touch users get the same content and a small once-only entrance, with no essential hover state.

Buttons retain their existing color/focus behavior and receive subtle press feedback. This also enhances the participation and closing CTAs without creating registration/payment flows. The header keeps its stable sticky height; focus changes its border subtly, without another scroll listener or resize. Active link underlines remain in place.

The mobile disclosure uses native hidden state, inert, and aria-hidden immediately on close. Focus restoration never waits for animation. Modern browsers animate opacity/translate/display with @starting-style and allow-discrete; older browsers can close immediately. Reduced motion disables the transition. No body scroll locking, focus trap, animation timer, or AnimatePresence controller is required.

## Verified numbers

Current homepage statistics remain pending text. No count-up runs for those entries. The typed verified branch now accepts a string or number with a required source; optional prefix/suffix/fraction settings apply to numeric values only. Strings remain static.

`CountValue` renders the complete formatted final value in server HTML. Screen readers get that stable value; only an aria-hidden visual span counts on first entry. Animation uses a Motion scalar with direct text updates, avoiding React renders per frame. Cleanup stops it and restores the final value. Reduced motion, JavaScript failure, and server-only rendering retain the final value. Numeric data must be finite, validated, approved, and sourced by the future integration. The automated numeric fixture is isolated test data, never homepage content.

## Accessibility and performance

Keep all content readable before enhancement. Use transforms/opacity and small composited regions; do not animate document geometry, large blurs, or shadows. No scroll hijacking, scroll snapping, autoplay video, repeated flashing, or hidden reading content is introduced. The homepage's controlled image carousel is the only automatic slide movement. Native links, browser history, hash navigation, focus indicators, and normal touch scrolling remain authoritative. Active scenes use no global state store and no custom per-frame scroll event handler.

No numerical Core Web Vitals or frame-rate score is claimed. Real documentary media, lower-powered devices, other browsers, and physical-device/screen-reader testing still need evaluation before launch.

## Extending and verifying

Compose the primitives around actual sections or media rather than making entire pages client components. Pass server content as children. Choose one appropriate effect, keep reserved dimensions and captions, and check keyboard/touch/reduced-motion/no-JavaScript behavior. Keep the seven section IDs unchanged. Use new dependencies only when a concrete animation exceeds these tools.

`tests/motion.spec.ts` checks readable hero choreography, rapid native scrolling, bounded story motion, inert menu focus/dismissal, dynamic reduced motion, touch portrait/landscape, and unchanged pending statistics. It captures a paused intermediate hero frame, story/hover scenes, and touch views without brittle exact-time raster assertions. Component tests verify that numeric fixtures include the final accessible value in server HTML; real-data count-up playback awaits an approved numeric integration.

> [!IMPORTANT]
> **Run the full test suite with `--workers=2`** to avoid resource contention timeouts:
>
> ```
> npx playwright test --workers=2 --timeout=120000
> ```
>
> The default `npm run test:e2e` (7 workers) can produce infrastructure-only timeouts on this machine when all workers share a cold production server startup. All 31 tests pass with 2 workers. Individual test files also pass when run in isolation.

The unchanged style baselines use reduced motion and must still match development and production. Keep running `npm run test:e2e` after a completed build and `npm run test:styles:dev` against the actual development server. Do not replace visual baselines simply to accommodate a motion regression. Official references: [Motion scroll](https://motion.dev/docs/react-use-scroll), [viewport detection](https://motion.dev/docs/react-use-in-view), and [reduced motion](https://motion.dev/docs/react-use-reduced-motion).

## Phase 5B navigation motion

Route disclosures use existing `--motion-fast`, `--motion-menu-distance` and underline timings. CSS discrete display transitions provide short opacity/translation entrances and exits; panels become inert immediately when closed. Browsers without discrete transitions close immediately. Indicators rotate with fast timing. Focus and links remain immediately usable. Reduced motion removes transitions. No GSAP, timers, body scroll locking, scroll hijacking or new dependency is introduced. Homepage Motion primitives and original reduced-motion screenshot references remain preserved.

## Phase 5C.1: Profile motion

Profile pages reuse SplitReveal, Reveal and ImageMaskReveal. SplitReveal now takes distance, viewport threshold and bounded word stagger from the central motion tokens; it keeps text fully opaque during its word-mask settle. No essential text starts hidden in server HTML. Documentary mask enhancement retains the existing wide/fine-pointer/non-reduced-motion gating. Portrait entrances use the existing modest media settle; hover adds a small lift/shadow only on suitable devices.

`ValueEmphasis` uses Motion useScroll/useSpring/useTransform to progress decorative rules beneath Love, Equality, Equity and Peace and translate labels by at most `motionTokens.statement.distance`. The shared spring drives native-scroll progress; there is no per-frame React state update. This small typographic interaction also works on mobile without enabling photographic parallax. A cleaned-up media-query subscription switches to a static list when reduced motion changes; unmounting the active subtree releases Motion subscriptions. Static words and complete rules remain readable without JavaScript or with reduced motion. All motion timings remain centralized; no new library, scroll hijacking, pinning or body scroll lock is introduced.

`tests/profile.spec.ts` checks the native-scroll progression at mobile/desktop widths, dynamic reduced-motion teardown, server-visible content and no-JavaScript reading. Separate Profile opening references are used by production and actual-development style checks; homepage references remain unchanged.

## Phase 5D.1: Media interaction motion

The Media overview reuses SplitReveal for the editorial heading and ImageMaskReveal for the approved lead image. Highlight and gallery images use the existing staggered Reveal media settle. Gallery card insertion/filter changes use a short translate settle; hover emphasizes the image. The native modal uses a brief image scale settle. CSS durations/distances/easing come from the root layout's central motion variables; no timing constants, dependencies, scroll interception or new parallax were added.

All server content is visible before enhancement. Reduced motion disables Media CSS entrances and existing primitives retain their preference handling. Modal focus/inertness uses browser behavior, never a hand-written focus trap. Browser chrome can receive focus between native modal controls; background page controls remain inert. Production and actual-development Media styles use the same reduced-motion references; original references are unchanged.

## Phase 5E

The participation pages use the established Reveal primitive to introduce volunteer list entries. No new motion library or scroll behavior was added. Server HTML contains all content and links; the reveal utility preserves visibility without JavaScript and honors reduced-motion preferences.

## Phase 6 motion verification

The hero choreography remains unchanged. Its browser assertion now waits for all three lines to reach the exact settled opacity and animation name before checking their stagger order, avoiding a transient style read during concurrent browser load. Reduced-motion, touch-layout, native-scroll and bounded parallax checks remain in the production suite.

## Phase 6.1 visual refresh

The hero now places the SEVA photograph behind the headline with an indigo overlay; captions and actions remain readable in the server-rendered layout. The existing staggered text entrance, image settle, reveal primitives, story parallax, and slow marquee remain. Shared easing, distances, scale, and timing were softened in `src/config/motion.ts`. Reduced motion still shows the complete static scene, and pending reported statistics remain unanimated.
