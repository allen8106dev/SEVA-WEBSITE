# Working on SEVA

- Read the blueprint, package scripts, and existing code before editing. Preserve working behavior and follow existing conventions.
- Keep this phase small. Do not invent organizational facts, contact details, impact claims, or donation mechanisms.
- Reuse existing components and tokens; avoid duplicate utilities, speculative abstractions, and unnecessary dependencies.
- Keep TypeScript strict. Prefer Server Components; introduce client boundaries only for interaction.
- Maintain semantic HTML, keyboard access, visible focus, responsive layouts, and reduced-motion support.
- Keep placeholder content identifiable. Documentary photography remains placeholder until authentic media is supplied. The official logo and organizational identity are integrated.
- Keep secrets out of source, logs, and browser bundles. Only expose explicitly public environment variables.
- Keep unfinished content unindexable. Enabling indexing requires approved content and a confirmed origin; previews remain unindexable.
- Do not configure a CMS, database, authentication, payments, or GSAP without a concrete requirement.
- Update relevant documentation and run typecheck, lint, formatting, production build, and available browser tests after changes. Report checks that could not run.
- Preserve npm and its lockfile. Do not publish, configure a production domain, or change hosting without user direction.
- Read DESIGN_SYSTEM.md before visual changes. Reuse the UI primitives, semantic colors, typography, and spacing tokens. Motion timing lives in src/config/motion.ts and is shared with CSS through the root layout.
- Keep the 48rem CSS navigation breakpoint aligned with mobile-navigation.tsx. Preserve active-anchor semantics, sticky-header offsets, and 46px controls.
- Fonts are self-hosted WOFF2 assets with included OFL licenses. Keep provenance and licenses when replacing them. Captions must clearly identify demonstration imagery.
- Organizational content lives in modular files under src/content/ (organization, leadership, focus-areas, projects, impact, partnerships, contact, compliance, donations, home). Sourced statistics require explicit sources and audit status flags. Participation previews stay noninteractive until real destinations exist; preserve the seven section IDs for links and animation work.
- Visual checks must cover the actual development server with test:styles:dev, as well as production. Keep reviewed screenshot baselines and computed-style/font checks. Never update snapshots merely to clear a failure; inspect stylesheet resources and computed styles first. Read STYLE_REPAIR.md for the prior stale-development-output failure.
- Read MOTION_SYSTEM.md for Phase 4 primitives. Keep server content visible, preserve native scrolling, disable parallax on coarse/small/reduced-motion devices, and never animate pending statistics. Reuse central timing and let Motion/hooks clean up subscriptions. Preserve the original reduced-motion screenshot baselines.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
