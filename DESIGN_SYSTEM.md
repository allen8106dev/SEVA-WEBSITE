# SEVA design system

## Phase 5D.2: Resources presentation

`resources.css` scopes a yellow editorial overview, cream reporting archives and a blue transparency section. Numbered pathway links combine availability text, serif titles and a directional marker. Empty archives and compliance references prioritize reading order and explicit status labels. All colors, fonts, spacing and motion timings reuse existing semantic tokens. Year-grouped document lists use native descriptive download links, including format and byte-derived size. The original homepage/Profile/Media references remain unchanged; eight Resources opening references cover 375/1440px in both production and actual development tests, including CSS responses and actual font glyph checks.

Phase 4 motion and Phase 5 visual redesign extend this system without replacing its layout architecture or accessibility contracts. See MOTION_SYSTEM.md for the hero sequence, reveal variants, story parallax, scroll interactions, marquee, and accessibility rules. The styling baselines and repaired development cache configuration are retained.

Phase 6.1 establishes a professional, photography-led identity using the management-approved Shreyas screenshot palette. SEVA keeps its own logo, verified content, programme structure, and authentic local photography. The former Vibrant Humanism palette is retired; section notes from Phases 3–6 below are historical records.

## Tokens and palette

`src/styles/tokens.css` owns the semantic colors, type scale, spacing, containers, borders, radii, and elevation. Tailwind's static theme exposes every semantic token. Use semantic names rather than introducing component-specific hex values or hardcoding palette values across components.

### Management-approved screenshot palette

The supplied desktop screenshots show white navigation, a deep indigo brand surface, pale lavender page areas, and periwinkle impact panels. Pixel samples from flat areas refine the supplied approximate values. These are screenshot samples, not claims about Shreyas's computed CSS.

| Role             | Token                                                 | Value     | Reference use                                                                   |
| ---------------- | ----------------------------------------------------- | --------- | ------------------------------------------------------------------------------- |
| Primary indigo   | `--color-brand-primary` / `--color-primary`           | `#2B2469` | Navigation state, controls, mission panel, footer                               |
| Secondary indigo | `--color-brand-secondary` / `--color-accent`          | `#3D3182` | Emphasis, interactive hover, selected links                                     |
| Page             | `--color-page` / `--color-background`                 | `#FFFFFF` | Header, primary canvas, cards                                                   |
| Soft lavender    | `--color-surface-muted` / `--color-surface`           | `#EFEEFF` | Quiet section backgrounds and grouped content                                   |
| Pale periwinkle  | `--color-surface-highlight` / legacy `--color-yellow` | `#DEE1FF` | Impact panels, subtle emphasis, focus on dark surfaces                          |
| Dark surface     | `--color-dark-surface` / legacy `--color-black`       | `#2B2469` | Mission and footer backgrounds                                                  |
| Main text        | `--color-text-primary` / `--color-foreground`         | `#292929` | Body text and headings on light surfaces                                        |
| Secondary text   | `--color-text-secondary` / `--color-muted`            | `#5F5F5F` | Supporting copy; darkened from the screenshot estimate to pass AA on periwinkle |
| Border           | `--color-border-neutral` / `--color-border`           | `#D1D2E8` | Quiet separators and card boundaries                                            |
| On primary       | `--color-on-primary`                                  | `#FFFFFF` | Text and icons on indigo                                                        |

Measured screenshot samples: `#FFFFFF` in the navigation at (500,150) in screenshot 03; `#2B2469` in the indigo mission panel at (500,200); `#EFEEFF` in the lavender section at (500,600); and `#DEE1FF` in an impact card at (300,700). Coordinates refer to the supplied 1920 × 1200 PNGs and are flat-region pixel samples. They do not establish CSS declarations.

Contrast targets use WCAG AA normal-text minimum 4.5:1. Current representative token pairs are 13.47:1 for white on indigo, 11.31:1 for main text on periwinkle, 5.58:1 for secondary text on lavender, and 4.96:1 for secondary text on periwinkle. The audit in `tests/site.spec.ts` covers these combinations; page-level text is also checked in the accessibility suite. Do not communicate state only through color.

### Color sequencing

Use white and lavender as the main page surfaces, periwinkle as a light supporting surface, and indigo for a small number of strong moments. The homepage pairs its copy with a registry-backed photo carousel on white. Photographs keep their source colors; use a separate neutral caption panel or a restrained black gradient only when text sits over an image. The mission section and compact footer use deep indigo, with white/lavender programme and story areas and light impact cards.

## Typography

Cormorant Garamond regular/italic at 400 gives headlines a literary quality. Manrope variable supports readable interfaces, using 400–800 in this design (heavier weights for punchy labels and pill badges). Three local Latin WOFF2 files total 71,372 bytes; licenses and provenance live in `src/assets/fonts`. `next/font/local` provides self-hosting, adjusted fallbacks, and swap behavior. No runtime Google Fonts request or font npm dependency is needed.

`Heading` separates semantic level (`as`) from visual scale (`size`). Use one h1 per page; never choose a level just to resize text. Display, large, medium, small, body large/regular, captions, labels, buttons, and navigation have explicit tokens. Headlines use responsive clamp sizes, tight tracking, balanced wrapping, and restrained weight. Body line height is 1.72, with bounded reading measures.

### Kinetic typography notes

The hero h1 headline is structured as three children: `span`, `em`, `span`. The existing reveal styling keeps this semantic shape; the emphasized phrase uses the secondary indigo against the light hero surface. Preserve the element types and count when changing the headline, and update its focused motion assertions with any intentional change.

The marquee in the hero section uses a CSS keyframe (`marquee-scroll`) applied via the `.kinetic-marquee` class, centralized in `globals.css`. Speed is controlled by `--motion-marquee: 40s` defined in `src/config/motion.ts`. The marquee pauses on hover and immediately stops when `prefers-reduced-motion: reduce` is set.

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

### Shared component patterns

New visual patterns introduced with the redesign:

- **Card elevation**: subtle token-based shadow, a quiet 1px border, and a restrained lift on fine-pointer hover.
- **Hero label**: compact white uppercase text over the full-width photo; no bright badge blocks.
- **Section chapter tag**: small eyebrow number/label in the section's top-left corner. The dark variant uses light text against indigo.
- **Wordmark & Logo**: The official SEVA emblem remains unchanged. The wordmark uses a restrained indigo accent dot and keeps its original proportions and clear space.
- **Mission rule**: a small periwinkle rule anchors the mission statement on its indigo surface.
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

The Media archive uses the approved registry and keeps empty video/news states explicit until publication material is approved. The footer inquiry form uses the canonical SEVA address to create a draft in the visitor's email app; it does not send or store messages. There is no direct-submission provider, newsletter, tracker, payment gateway, or donation processing. Keep future contact or giving workflows tied to an implemented, approved destination.

## Interaction, motion, and navigation

`src/config/motion.ts` is the single timing source for Motion and the CSS custom properties applied by the root layout. CSS handles link underlines, button states, menu entrance, and media treatment. Touch screens avoid hover-only effects. Reveal animates only once on entry; initial server HTML stays visible. CSS and Motion respect reduced motion. No scroll hijacking or animation-driven content visibility is used.

### Navigation behavior

The header (`site-header.tsx`) is a **client component** due to scroll state tracking. It starts expanded and transitions to a compact state after the existing 60px scroll threshold. The official image logo scales with the header; the crop is a transparent-space derivative of the original approved logo. Dark labels, indigo active/hover states, keyboard disclosures, sticky offsets, and the floating treatment remain. The scroll listener only changes state at the threshold. Reduced motion removes the transition.

The header links the logo image to Home with a descriptive accessible name. Desktop navigation ends with one indigo Donate link to `/get-involved/donate`; the mobile accordion exposes the same destination under Get Involved without a duplicate top-level button. Nav links use a quiet hover state and an indigo underline for the active location.

The mobile disclosure preserves Escape, outside dismissal, focus-leave, link selection, breakpoint cleanup, and native Tab order. It is nonmodal, so it does not trap focus or lock scrolling.

Both navigation versions mark the explicit current anchor with `aria-current="location"` and an underline. This tracks navigation, not the section nearest the viewport.

## Responsive and imagery rules

Use the spacing scale from 0.25rem through 6rem; section spacing and gutters are fluid. The single navigation/grid breakpoint is 48rem, mirrored in the mobile matchMedia query. Keep these aligned when changing breakpoints. Headlines may rewrap naturally on tablet and small phones; never force desktop line lengths using nowrap.

Use authentic, consented human moments when photography is supplied. The existing documentary photographs are visibly captioned provisional illustrations under the Unsplash license; they make no documentary claim about SEVA. Replace them with verified imagery using the same MediaFrame contract. Keep captions outside images for reliable contrast. Future media should preserve focal points and reserved ratios.

## Accessibility and extension

Preserve semantic landmarks, heading order, the skip link, 46px control targets, visible focus, keyboard navigation, and reduced-motion behavior. The indigo footer and mission panel override muted text and focus tokens for contrast. Stories use a light lavender surface. New backgrounds require checking all foreground pairs. Keep decorative SVGs hidden from assistive technology and name icon-only links/actions explicitly.

The header (`site-header.tsx`), mobile nav (`mobile-navigation.tsx`), and all animation components (`hero-scroll.tsx`, `image-mask-reveal.tsx`, `kinetic-closing.tsx`, `marquee.tsx`, `split-reveal.tsx`) are client components. All section components remain Server Components. No additional npm package was added for the Vibrant Humanism redesign. Keep SEO guards and unfinished content unindexable.

## Phase 3 homepage compositions and Vibrant Humanism redesign

The following phase summaries preserve historical implementation context. Their old color names are superseded by the Phase 6.1 palette above.

`src/styles/home.css` extends the existing tokens. Seven independent Server Components compose the page: HeroSection, PurposeSection, ImpactAreasSection, StoriesSection, ImpactOverviewSection, ParticipationSection, and ClosingSection. The hero uses an asymmetric first-viewport composition with actions before media in mobile reading order.

### Visual chapter sequence

The seven sections follow a deliberate alternating rhythm of high-energy and quiet moments:

| Chapter | Section ID       | Current surface                      | Visual treatment                         |
| ------- | ---------------- | ------------------------------------ | ---------------------------------------- |
| 01      | `introduction`   | Full-width photo with indigo overlay | Clear mission headline and actions       |
| 02      | `purpose`        | Deep indigo                          | Vision, mission, and one authentic photo |
| 03      | `impact-areas`   | White                                | Seven-area programme directory           |
| 04      | `stories`        | Soft lavender                        | Photo and editorial story content        |
| 05      | `website-status` | White                                | Static sourced impact figures and notes  |
| 06      | `participation`  | Pale periwinkle                      | Noninteractive participation previews    |
| 07      | `next-chapter`   | White                                | Restrained closing message and motion    |

`src/content/home.ts` holds all section copy and the typed `HomeMedia`, `ImpactAreaContent`, and `StatisticContent` contracts. ImpactArea supports optional category, link, and restrained color accent. Statistics renders a semantic definition list: pending entries show words rather than fabricated numbers; a verified entry requires both value and source. Participation previews are plain list content, with real anchor actions kept separate.

HomepageMedia reuses MediaFrame. Set kind to image with an approved local src, alt, caption, ratio, and optional focalPoint to replace illustrations. Below-the-fold images retain Next.js lazy-loading defaults; the hero alone may be preloaded. Set kind to video only when approved local media, a poster, descriptive label, and English caption track exist. Do not insert placeholders that trigger broken requests.

## Photography integration

Existing documentary photographs under the Unsplash license are in `public/images/`. Each file is attributed and licensed in `ATTRIBUTION.md`. MediaFrame renders `next/image` with responsive `sizes`, `objectFit: cover`, customizable `focalPoint`, and a reserved aspect ratio. Use authentic, consented human moments. Provisional photographs are captioned to clearly identify their demonstration status — do not imply they depict actual SEVA activities.

## Accessibility and standards

All text pairs maintain WCAG AA contrast (≥ 4.5:1). Interactive targets maintain ≥ 46px touch heights. Reduced motion preferences immediately disable all animations. All 31 automated tests pass with `--workers=2`; the `--workers=7` parallel run produces timeout failures due to resource contention on this machine, not code issues. Run `npm run test:e2e` for the standard suite.

## Phase 5B navigation and interiors

`src/styles/navigation.css` extends existing semantic colors, type, spacing, containers and elevation. Cream dropdowns use a royal-blue top rule, dark border, yellow highlights and existing punchy shadow. Interior heroes reuse yellow and editorial typography; informational cards use the surface token. No token or font asset changed.

Separate parent links and 46px disclosure buttons preserve clear interaction. The CSS/JavaScript breakpoint stays 48rem; 48-64rem uses two header rows to accommodate seven categories. The existing 60px scroll threshold and floating cream treatment remain. Exact page and active ancestor states share the coral underline. See NAVIGATION_GUIDE.md for controls, breadcrumbs and template conventions. Original reduced-motion screenshots remain preserved; separately named Phase 5B baselines record the intentional header changes.

## Phase 5C.1: Profile editorial compositions

`src/styles/profile.css` is scoped to Profile pages. Five compositions share the existing colors, Cormorant/Manrope typography, containers, spacing and controls: yellow overview/emblem seal; cream About with royal-blue geography and yellow approach; blue vision with contrasting cream mission; near-black leadership introduction and alternating portrait/name features; cream History with a large yellow establishment year and dark purpose chapter.

The editorial Profile index uses unequal regions rather than four identical cards; smaller cross-link sets avoid empty grid regions. Native text remains readable over strong color blocks. Documentary images use the existing MediaFrame and mask reveal; official portraits retain natural framing and unobscured faces. Pending portraits use typographic monograms plus the official name and an explicit pending caption. Grids become a clear mobile reading sequence below the existing 48rem breakpoint. No logo, font, palette token, homepage composition or existing screenshot baseline was replaced.

## Phase 5D.1: Media compositions

The scoped `media.css` extends the existing palette and typography: yellow overview/gallery, near-black video hero, cream news hero, bordered photographic cards and intentional archive empty states. Existing Container, Heading/Eyebrow/Text, button classes and motion primitives are reused. Shared brand colors resolve through semantic tokens; scoped dark-hero/modal focus indicators use yellow. Filter selects have explicit labels, a 46px minimum height and constrained mobile widths. Gallery links remain keyboard accessible and useful without JavaScript; the enhanced viewer uses a native modal dialog. New separately reviewed Media opening baselines cover all four pages at 375/1440px and include real rendered-font checks. Existing homepage and Profile references are preserved.

## Phase 5E participation pages

The involvement compositions continue Vibrant Humanism through a yellow overview, coral volunteer chapter, royal-blue CSR editorial page, warm giving information, and a clear contact layout. Pathways use numbered editorial rows; volunteer categories and CSR areas are lists rather than repeated generic cards. `involvement.css` uses the existing semantic palette, type scale, spacing and 48rem breakpoint. Approved programme photography retains its registry caption. Motion is limited to the existing Reveal primitive; server-rendered content remains visible, and reduced motion is respected.

## Phase 6.1 management-approved visual system

This Phase 6.1 design system supersedes the earlier color sequencing. Shreyas's supplied screenshots were visually reviewed; sampled flat regions yielded `#2B2469` (indigo), `#EFEEFF` (lavender), and `#DEE1FF` (periwinkle), with white navigation and cards. The homepage pairs the approved editorial copy with an automatically advancing horizontal carousel of publication-approved SEVA photos. Images are not color-filtered or brand-tinted; captions use a separate neutral dark panel. Only the first carousel image is preloaded. Interior templates use content-led compact heroes; the logo, Donate action, footer, and mailto inquiry behavior follow the conventions above.

The previous screenshot references remain intact. Refinement-specific baselines use `phase6-1-refinements-*` names for the homepage and styled interiors at mobile and desktop widths. See `PHASE_6_1_REPORT.md` for reviewed routes, contrast values, verification, and remaining limitations.
