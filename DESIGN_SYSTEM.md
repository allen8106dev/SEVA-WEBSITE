# SEVA design system

Phase 4 motion and Phase 5 visual redesign extend this system without replacing its layout architecture or accessibility contracts. See MOTION_SYSTEM.md for the hero sequence, reveal variants, story parallax, scroll interactions, marquee, and accessibility rules. The styling baselines and repaired development cache configuration are retained.

The creative direction is **Vibrant Humanism**: bold editorial compositions, kinetic typography, expressive color sequencing, and documentary photography. The design communicates warmth, community, and credibility through energy and contrast rather than muted minimalism. Official branding, organizational stories, statistics, and participation destinations remain pending.

## Tokens and palette

`src/styles/tokens.css` owns the semantic colors, type scale, spacing, containers, borders, radii, and elevation. Tailwind's static theme exposes every semantic token. Use semantic names rather than introducing component-specific hex values or hardcoding palette values across components.

### Vibrant Humanism palette

| Role       | Token                | Value     | Intended use                                                           |
| ---------- | -------------------- | --------- | ---------------------------------------------------------------------- |
| Background | `--color-background` | `#fff9eb` | Warm cream page canvas                                                 |
| Foreground | `--color-foreground` | `#171717` | Near-black body text and headings                                      |
| Primary    | `--color-primary`    | `#2541b2` | Royal blue — controls, nav, editorial chapters                         |
| On primary | `--color-on-primary` | `#fffffe` | Text on royal blue (6-digit hex, prevents NaN in contrast test parser) |
| Accent     | `--color-accent`     | `#ce2a2a` | Deep coral — emphasis, section rules, wordmark dot                     |
| Yellow     | `--color-yellow`     | `#ffd93d` | Primary yellow — hero background, high-energy moments                  |
| Coral      | `--color-coral`      | `#ff4d4d` | Coral red — participation section bg, pill badges                      |
| Coral deep | `--color-coral-deep` | `#ce2a2a` | Deep coral — italic headline emphasis, accent rules                    |
| Blue       | `--color-blue`       | `#2541b2` | Royal blue alias                                                       |
| Blue dark  | `--color-blue-dark`  | `#162670` | Deeper blue for hover states                                           |
| Black      | `--color-black`      | `#171717` | Near-black for punchy borders and nav pill                             |
| Cream      | `--color-cream`      | `#fff9eb` | Warm cream alias                                                       |
| Muted      | `--color-muted`      | `#5a5a4a` | Secondary body text                                                    |
| Border     | `--color-border`     | `#e0ddd0` | Decorative separators                                                  |
| Surface    | `--color-surface`    | `#f5f2e8` | Card and panel backgrounds                                             |

> [!IMPORTANT]
> `--color-on-primary` must remain `#fffffe` (not `#ffffff`). The contrast test in `tests/site.spec.ts` reads CSS token values and parses them as 6-character hex strings. The CSS shorthand `#fff` resolves to only 3 characters after `slice(1)`, causing the hex luminance parser to return `NaN` and the ratio assertion to fail.

> [!NOTE]
> The new palette replaces the former olive/ivory/terracotta identity (`#f7f5ef`, `#292e29`, `#314f40`, `#995331`). Do not reintroduce muted green or earthy terracotta. All WCAG AA contrast pairs (≥ 4.5:1) have been verified by automated test and node script.

### Color sequencing

Do not make every section a different bright color. Use a deliberate sequence of high-energy and low-energy visual moments:

- **Hero** → yellow (`#ffd93d`) background — maximum energy, poster composition
- **Purpose** → royal blue (`#2541b2`) background — editorial contrast
- **Impact Areas** → white/cream surface — breathing space with punchy card borders
- **Stories** → near-black (`#171717`) background — cinematic, immersive
- **Impact Overview** → white surface — architectural clarity
- **Participation** → coral red (`#ff4d4d`) background — warm call-to-action energy
- **Closing** → warm cream — resolution and reflection

Automated contrast checks cover text pairs for every background in this sequence. Recheck any new pairing; semantic colors are not universally interchangeable. Do not communicate state only with color.

## Typography

Cormorant Garamond regular/italic at 400 gives headlines a literary quality. Manrope variable supports readable interfaces, using 400–800 in this design (heavier weights for punchy labels and pill badges). Three local Latin WOFF2 files total 71,372 bytes; licenses and provenance live in `src/assets/fonts`. `next/font/local` provides self-hosting, adjusted fallbacks, and swap behavior. No runtime Google Fonts request or font npm dependency is needed.

`Heading` separates semantic level (`as`) from visual scale (`size`). Use one h1 per page; never choose a level just to resize text. Display, large, medium, small, body large/regular, captions, labels, buttons, and navigation have explicit tokens. Headlines use responsive clamp sizes, tight tracking, balanced wrapping, and restrained weight. Body line height is 1.8, with bounded reading measures.

### Kinetic typography notes

The hero h1 headline is structured as three children: `span`, `em`, `span`. CSS assigns the `hero-line-settle` animation to all three with staggered delays (55 / 130 / 205 ms). The `em` element carries the coral-deep italic emphasis color. The test in `motion.spec.ts` asserts this exact structure and animation name — do not change the element types, count, or animation name without updating the test.

The marquee in the hero section uses a CSS keyframe (`marquee-scroll`) applied via the `.kinetic-marquee` class, centralized in `globals.css`. Speed is controlled by `--motion-marquee: 28s` defined in `src/config/motion.ts`. The marquee pauses on hover and immediately stops when `prefers-reduced-motion: reduce` is set.

## Component conventions

Import directly from `src/components/ui`; do not add duplicate variants or a generic component framework.

- `Container`: standard (72rem), narrow (43rem), wide (86rem), or full width. Responsive gutters protect content edges; full width deliberately removes gutters.
- `Section`: semantic section with consistent responsive vertical padding; pass an accessible heading association when appropriate.
- `EditorialGrid`: one mobile column, an asymmetric two-column layout from 48rem. Add a named composition class when actual content needs a different column ratio.
- `Divider`: native horizontal rule for a real section boundary.
- `Heading`, `Eyebrow`, `Text`: shared hierarchy; Text supports large, regular, and caption sizes. Eyebrows are supporting text, not replacement headings.
- `Button`: native action with primary, secondary, text, and icon variants. Defaults to type button. Supports disabled and loading; loading prevents interaction and exposes aria-busy while keeping the label. Give icon controls an aria-label. Add a live status message when an actual asynchronous workflow needs one.
- `LinkButton`: navigation with the same four visual variants, using Next.js Link. Disabled or loading navigation is not exposed as a misleading link.
- `LoadingIndicator`: small decorative spinner used by Button. Reduced motion leaves it static; busy semantics remain.
- `EditorialCard`: quiet article panel with a required heading association; no implied click target or invented article content.
- `MediaFrame`: figure with required caption, explicit ratio (portrait 4:5, landscape 3:2, cinematic 16:9, square), and either placeholder children or a real image. Real imagery uses Next.js Image fill, reserved aspect ratio, responsive sizes, cover fitting, and an optional focalPoint such as `60% 35%`. Supply meaningful alt text or empty alt when decorative. Preload only an actual above-the-fold LCP image when justified.

### Vibrant Humanism component patterns

New visual patterns introduced with the redesign:

- **Punchy shadow**: `box-shadow: 6px 6px 0px var(--color-black)` — used on impact cards and key CTAs. Hover translates the card `(-2px, -2px)` to increase the shadow depth.
- **Pill badge**: rounded pill with tight uppercase label, 1.5px black border. Variants: `hero-pill--coral` (coral bg, white text) and `hero-pill--dark` (black bg, yellow text).
- **Section chapter tag**: small eyebrow number/label in the section's top-left corner (e.g. `01 / 07 · HUMAN VOICES`). Dark variant for light-on-dark sections.
- **Wordmark & Logo**: Official SEVA emblem paired with `SEVA` in bold Manrope + a coral circle accent dot rendered via `wordmark__dot` pseudo-element. Lives in `site-header.tsx` and `site-footer.tsx`. Maintains original proportions and clear space.
- **Coral stamp**: a rotated block-letter accent beside section headings in the Purpose section.
- **Kinetic banner**: oversized horizontally-scrolling text strip in the Closing section, driven by `KineticClosing` component.
- **Transparency pill**: status indicator in the Impact Overview section.

Example composition for an approved future section:

```tsx
<Section aria-labelledby="section-title">
  <Container width="narrow">
    <Eyebrow>Approved section label</Eyebrow>
    <Heading id="section-title">Approved heading</Heading>
    <Text>Approved content.</Text>
  </Container>
</Section>
```

No generic empty-state component is needed yet: the current site has no search or data failure workflow. Image overlays, galleries, and social/newsletter/donation controls are deferred until there is approved content or an implemented workflow. HomepageMedia supports a native user-controlled video when actual assets are approved; no video is currently loaded. Extend the footer grid when real destinations exist, without dead links or fictional profiles.

## Interaction, motion, and navigation

`src/config/motion.ts` is the single timing source for Motion and the CSS custom properties applied by the root layout. CSS handles link underlines, button states, menu entrance, and media treatment. Touch screens avoid hover-only effects. Reveal animates only once on entry; initial server HTML stays visible. CSS and Motion respect reduced motion. No scroll hijacking or animation-driven content visibility is used.

### Navigation behavior

The header (`site-header.tsx`) is now a **client component** due to scroll state tracking. At the top of the page it presents as a full yellow-accented bar integrated with the hero. As the user scrolls past ~80px, it acquires the `site-header--floating` class: a compact cream bar with `backdrop-filter: blur(12px)` and a subtle border. This transition is smooth and does not cause layout shifts.

The SEVA wordmark uses bold Manrope with a coral accent dot (the `wordmark__dot` element). Nav links use a pill hover treatment and an animated coral underline scale on active state.

The mobile disclosure preserves Escape, outside dismissal, focus-leave, link selection, breakpoint cleanup, and native Tab order. It is nonmodal, so it does not trap focus or lock scrolling.

Both navigation versions mark the explicit current anchor with `aria-current="location"` and an underline. This tracks navigation, not the section nearest the viewport.

## Responsive and imagery rules

Use the spacing scale from 0.25rem through 6rem; section spacing and gutters are fluid. The single navigation/grid breakpoint is 48rem, mirrored in the mobile matchMedia query. Keep these aligned when changing breakpoints. Headlines may rewrap naturally on tablet and small phones; never force desktop line lengths using nowrap.

Use authentic, consented human moments when photography is supplied. The existing documentary photographs are visibly captioned provisional illustrations under the Unsplash license; they make no documentary claim about SEVA. Replace them with verified imagery using the same MediaFrame contract. Keep captions outside images for reliable contrast. Future media should preserve focal points and reserved ratios.

## Accessibility and extension

Preserve semantic landmarks, heading order, the skip link, 46px control targets, visible focus, keyboard navigation, and reduced-motion behavior. The near-black footer and dark Stories section override muted text and focus tokens for contrast. New backgrounds require checking all foreground pairs. Keep decorative SVGs hidden from assistive technology and name icon-only links/actions explicitly.

The header (`site-header.tsx`), mobile nav (`mobile-navigation.tsx`), and all animation components (`hero-scroll.tsx`, `image-mask-reveal.tsx`, `kinetic-closing.tsx`, `marquee.tsx`, `split-reveal.tsx`) are client components. All section components remain Server Components. No additional npm package was added for the Vibrant Humanism redesign. Keep SEO guards and unfinished content unindexable.

## Phase 3 homepage compositions and Vibrant Humanism redesign

`src/styles/home.css` extends the existing tokens. Seven independent Server Components compose the page: HeroSection, PurposeSection, ImpactAreasSection, StoriesSection, ImpactOverviewSection, ParticipationSection, and ClosingSection. The hero uses an asymmetric first-viewport composition with actions before media in mobile reading order.

### Visual chapter sequence

The seven sections follow a deliberate alternating rhythm of high-energy and quiet moments:

| Chapter | Section ID       | Background           | Visual treatment                                  |
| ------- | ---------------- | -------------------- | ------------------------------------------------- |
| 01      | `introduction`   | Yellow `#ffd93d`     | Poster hero, editorial grid, marquee strip        |
| 02      | `purpose`        | Royal blue `#2541b2` | Mask-reveal photo, coral rule, asymmetric copy    |
| 03      | `impact-areas`   | White / cream        | Punchy shadow cards, hover translate effect       |
| 04      | `stories`        | Near-black `#171717` | Cinematic portrait, parallax, italic display mark |
| 05      | `website-status` | White / cream        | Architectural stat grid, transparency pill        |
| 06      | `participation`  | Coral red `#ff4d4d`  | Warm CTA energy, numbered option cards            |
| 07      | `next-chapter`   | Warm cream `#fff9eb` | Kinetic closing banner, reflection                |

`src/content/home.ts` holds all section copy and the typed `HomeMedia`, `ImpactAreaContent`, and `StatisticContent` contracts. ImpactArea supports optional category, link, and restrained color accent. Statistics renders a semantic definition list: pending entries show words rather than fabricated numbers; a verified entry requires both value and source. Participation previews are plain list content, with real anchor actions kept separate.

HomepageMedia reuses MediaFrame. Set kind to image with an approved local src, alt, caption, ratio, and optional focalPoint to replace illustrations. Below-the-fold images retain Next.js lazy-loading defaults; the hero alone may be preloaded. Set kind to video only when approved local media, a poster, descriptive label, and English caption track exist. Do not insert placeholders that trigger broken requests.

## Photography integration

Existing documentary photographs under the Unsplash license are in `public/images/`. Each file is attributed and licensed in `ATTRIBUTION.md`. MediaFrame renders `next/image` with responsive `sizes`, `objectFit: cover`, customizable `focalPoint`, and a reserved aspect ratio. Use authentic, consented human moments. Provisional photographs are captioned to clearly identify their demonstration status — do not imply they depict actual SEVA activities.

## Accessibility and standards

All text pairs maintain WCAG AA contrast (≥ 4.5:1). Interactive targets maintain ≥ 46px touch heights. Reduced motion preferences immediately disable all animations. All 31 automated tests pass with `--workers=2`; the `--workers=7` parallel run produces timeout failures due to resource contention on this machine, not code issues. Run `npm run test:e2e` for the standard suite.

## Phase 5B navigation and interiors

`src/styles/navigation.css` extends existing semantic colors, type, spacing, containers and elevation. Cream dropdowns use a royal-blue top rule, dark border, yellow highlights and existing punchy shadow. Interior heroes reuse yellow and editorial typography; informational cards use the surface token. No token or font asset changed.

Separate parent links and 46px disclosure buttons preserve clear interaction. The CSS/JavaScript breakpoint stays 48rem; 48-64rem uses two header rows to accommodate seven categories. The existing 60px scroll threshold and floating cream treatment remain. Exact page and active ancestor states share the coral underline. See NAVIGATION_GUIDE.md for controls, breadcrumbs and template conventions. Original reduced-motion screenshots remain preserved; separately named Phase 5B baselines record the intentional header changes.
