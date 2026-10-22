# SEVA Content Architecture & Maintenance Guide

## Phase 5E participation and contact content

Edit volunteering categories, CSR alignment areas, and implementation/reporting statements in `src/content/partnerships.ts`; designated giving purposes in `src/content/donations.ts`; and all contact channels/address in `src/content/contact.ts`. The Get Involved pages render these records directly. Inquiry links use the central email and do not submit forms. Do not describe areas as open applications, add payment instructions, or publish donor benefits without explicit verification and authorization. The map link is derived from the approved postal address and does not encode guessed coordinates.

## Phase 5D.2: public documents

`src/content/resources.ts` owns `ResourceRecord`, the currently empty `resourceRegistry`, editorial archive copy, report-type labels and the published-record selector. `reportingYear` holds the financial/reporting year supplied with the document, without inventing missing years. Categories are annual reports, financial statements and compliance; financial report types distinguish audited statements, summaries and annual accounts. Records include a description, publication date, file format/size, verification, publication approval and public-version review status.

Publication requires all of: `verificationStatus: "verified"`, `approvalStatus: "approved_for_publication"`, `publicationStatus: "published"`, `publicVersionReview: "approved"`, a title/year, valid ISO date, positive integer byte size, PDF format and a same-origin `/documents/<lowercase-name>.pdf` path. Compliance records additionally reference an existing `complianceId` whose `publicDisplayAllowed` is true. Approval to publish a redacted certificate does not establish its current validity: that remains separately recorded in `compliance.ts`.

Before adding a file to `public/`, obtain explicit authorization for the intended public version, inspect identifiers and personal data, redact as required, and confirm that exact version is cleared. Preserve the original securely outside `public/` and the repository; do not put original paths, identifiers or approval correspondence in the content registry. Add only the reviewed derivative and its actual byte size. Run the model/filesystem tests and verify its download before release. The browser's `download` attribute requests a same-origin download with a descriptive title, format and size; browser settings may still offer PDF viewing.

The selector is a rendering safeguard, not protection for files already in `public/`: those are directly accessible. Remove a withdrawn public derivative as well as changing its status, and handle already-distributed copies/caches separately. `tests/resource-models.spec.ts` checks the public documents directory against the approved registry and file sizes. No document files were added in Phase 5D.2.

`getPublishedResources` supports category, year, report type and availability filtering. Public unavailable results are always empty and never include private record metadata. Filter controls are intentionally absent with no records; introduce them only when published records offer useful choices. The year-grouped archive renders only approved records, including supported financial types only. Future CMS loaders should validate external data into this interface on the server and preserve all gates and the secure-original/public-derivative separation. No CMS is configured.

This guide documents the centralized, strongly typed content architecture implemented for **SEVA Social Service Society** in Phase 5A.

---

## 1. Directory Structure

All content is structured as strongly typed TypeScript models under `src/content/`:

```
src/
└── content/
    ├── organization.ts     # Institutional profile, legal status, vision, mission, core values, branding
    ├── leadership.ts       # Governance profiles: Bishop, Vicar General, Chancellor, Director
    ├── focus-areas.ts      # 7 major operational focus areas and activities
    ├── projects.ts         # 6 official project records with reported metrics and activities
    ├── impact.ts           # Headline and project-level impact statistics, units, sources
    ├── partnerships.ts     # CSR collaboration models, reporting pillars, volunteering categories
    ├── contact.ts          # Centralized directorate contact details, office address, canonical links
    ├── compliance.ts       # Legal and regulatory documentation registry (FCRA, 80G, 12AC, PAN, audits)
    ├── donations.ts        # Designated account architecture (Seva Vidhya Jyothi, Society, Ruby Meal)
    ├── media.ts            # Typed media registry for all SEVA photographic assets (Phase 5A.1)
    └── home.ts             # Composition hub consuming modular content for the 7 homepage chapters
```

---

## 2. Content Models & Types

### Organization (`src/content/organization.ts`)

- **Legal Name**: `SEVA Social Service Society`
- **Short Name**: `SEVA`
- **Tagline**: `Love In Action`
- **Established**: `2015`
- **Legal Status**: `Registered Not-for-Profit Society`
- **Operational States**: `Maharashtra`, `Tamil Nadu`, `Andhra Pradesh`
- **Vision**: "To build a society founded on human and divine values: Love, Equality, Equity, and Peace."
- **Mission**: "Restore the dignity of marginalized communities through awareness, education, empowerment, community organization, and sustainable development."

### Leadership (`src/content/leadership.ts`)

- **H E Dr. Mathews Mar Pachomios OIC** — Eparchial Bishop
- **Rt Rev. Msgr. Dr. Shaji Mathews Vazhayil** — Vicar General
- **Very Rev. Dr. Joshy Vazhappillethu** — Chancellor
- **Rev. Fr. Abraham Thanuvelil** — SEVA Director

_Policy_: No biographies are fabricated. Professional neutral placeholders are used until confirmed portrait photography is delivered.

### Seven Focus Areas (`src/content/focus-areas.ts`)

1. **Education**: Non-formal learning, tuition centres, scholarships, school supplies, education kits, support for children entering mainstream education.
2. **Healthcare**: Medical assistance, health camps, child monitoring, nutrition support, hygiene awareness, hospital referrals.
3. **Women Empowerment**: Self-help groups, tailoring training, financial literacy, leadership development, sustainable livelihoods.
4. **Community Welfare**: Weekly food distribution, elderly support, assistance to vulnerable communities, community counselling.
5. **Rural and Tribal Development**: Livelihood support, community governance, natural resource stewardship, sustainable community development.
6. **Skill Development**: Vocational training, income-generation skills, employment-related capacity building.
7. **Relief Works**: Disaster relief, distribution of essential supplies, medical assistance, rehabilitation support.

### Six Projects (`src/content/projects.ts`)

1. **CNEWA Non-Formal Education**: Foundational literacy, numeracy, bridge classes, tuition support, nutrition, parental engagement (75+ enrolled, ~65% daily attendance).
2. **Vidya Jyoti Scholarship Programme**: Tuition fees, textbooks, uniforms, school supplies, academic mentoring (~700 children assisted, 478 in tuition centres; 2025–26 cycle).
3. **Jeevan Project (Raigad District)**: Women's leadership, SHGs, financial literacy, governance, livelihood training (~75–100 women trained).
4. **Sui Daga Tailoring Project**: Vocational tailoring training, micro-enterprise mentoring (two active centres).
5. **SEVA Ruby Meal**: Weekly Friday hot meal distribution for homeless individuals, the elderly, daily-wage workers, and underserved families.
6. **Healthcare and Medical Outreach**: Preventive medical camps, child health monitoring, nutrition awareness, clinical partnerships.

### Impact Metrics (`src/content/impact.ts`)

- `annual-beneficiaries`: 1,000+ annual beneficiaries (headline)
- `annual-programs`: 15+ programs every year (headline)
- `states-of-operation`: 3 states: Maharashtra, Tamil Nadu, Andhra Pradesh (headline)
- `vidya-jyoti-children`: ~700 children receiving educational assistance
- `tuition-students`: 478 students in structured tuition centres
- `cnewa-children`: 75+ enrolled children
- `cnewa-attendance`: ~65% daily attendance
- `jeevan-women-trained`: ~75–100 women trained in Raigad

---

## 3. Approval Status Conventions

To maintain strict truth-in-advertising and prevent legal misrepresentation, all content entities carry explicit status flags:

| Status Value                        | Meaning                                                                  | Usage                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `confirmed_official`                | Formally confirmed from official SEVA documentation                      | Used for name, tagline, establishment year, leadership roster, registered address |
| `reported_pending_audit`            | Organization-reported operational metric awaiting external audit signoff | Applied to all numerical impact statistics and project reach figures              |
| `pending_photo`                     | Confirmed persona awaiting high-resolution management portrait asset     | Applied to leadership team profiles                                               |
| `awaiting_management_authorization` | Designated program structure created; transactional activation withheld  | Applied to banking accounts and donation channels                                 |
| `open_for_inquiries`                | Program areas welcoming CSR dialogue or volunteer engagement             | Applied to CSR partnerships and Friday Ruby Meal support                          |

---

## 4. How to Edit Organizational Information

1. **To update core organization details** (e.g. operational territory, vision, mission):
   Edit `src/content/organization.ts`. The changes will automatically propagate to the header, footer, hero, purpose, and closing sections.
2. **To update contact details**:
   Edit `src/content/contact.ts`. Updates will reflect in the footer, participation CTA, and contact navigation anchors.
3. **To update leadership**:
   Edit `src/content/leadership.ts`. When approved photographs arrive, update the `image` field with the corresponding asset path.

---

## 5. How to Update Statistics

All statistics must include a source and reporting period:

```typescript
{
  id: "annual-beneficiaries",
  metricLabel: "Annual beneficiaries",
  numericValue: 1200, // Update number here
  displayFormat: "1,200+",
  suffix: "+",
  source: "SEVA Annual Social Audit Report 2026", // Update source
  reportingPeriod: "2025–26 Financial Year",
  verificationStatus: "verified", // Update status when audited
  note: "Verified by independent third-party auditor.",
  isHeadline: true,
}
```

_Important Rules_:

- Never aggregate project populations without explicit statistical justification (populations overlap).
- Never remove the `source` field.

---

## 6. How to Replace Placeholder Images

Phase 5A.1 integrated authentic SEVA photography into the website. The following sections now use real SEVA photographs:

| Section         | Current image                                     | Content file     |
| --------------- | ------------------------------------------------- | ---------------- |
| Hero            | Ruby Meals service photograph                     | `home.ts`        |
| Purpose         | Vidhya Jyothi sisters photograph                  | `home.ts`        |
| Impact Areas    | Education, Community Welfare, Rural/Tribal images | `focus-areas.ts` |
| Projects        | CNEWA, Vidya Jyoti, Ruby Meal projects            | `projects.ts`    |
| Closing Section | Vidhya Jyothi distribution photograph             | `home.ts`        |

The following sections still use licensed documentary placeholders and require authentic replacements:

| Section                        | Placeholder type          | Required replacement                     |
| ------------------------------ | ------------------------- | ---------------------------------------- |
| Jeevan Project / Human Stories | Unsplash stock photograph | Authentic Raigad women empowerment photo |
| Healthcare                     | No image integrated yet   | Authentic healthcare outreach photo      |
| Women Empowerment              | No image integrated yet   | Authentic SHG/tailoring programme photo  |

_(Note: Official leadership portraits for Bishop Mathews Mar Pachomios OIC and Director Rev. Fr. Abraham Thanuvelil were confirmed by the client and integrated in Phase 5C.2A.)_

### Process for Replacing a Placeholder

1. Place the source photograph in `incoming-assets/` (this directory is gitignored — originals are preserved but not committed).
2. Generate an optimized WebP derivative using `sharp` or equivalent:
   ```sh
   node -e "require('sharp')('incoming-assets/photo.jpg').resize(1400).webp({quality:82}).toFile('public/images/category/filename.webp', console.log)"
   ```
3. Copy the derivative to `public/images/<category>/filename.webp`.
4. Register the asset in `src/content/media.ts` (see §8 below).
5. Update the relevant content model (`focus-areas.ts`, `projects.ts`, or `home.ts`) to reference the new `publicUrl`.
6. Provide:
   - `src`: Path relative to public (e.g., `"/images/education/classroom.webp"`)
   - `alt`: Descriptive, non-decorative alt text describing the scene and context.
   - `caption`: Credit information, project location, and subject identification.
   - `focalPoint`: Position coordinates (e.g. `"50% 35%"`).
7. Remove the provisional disclaimer notice once approved authentic media is in place.
8. Run `npm run build` and `npm run test:e2e -- --workers=2` to confirm nothing broke.

---

## 7. How Future CMS Integration Will Work

Because all content is centralized into clean TypeScript data structures and interfaces:

1. Create a data-fetching service layer (e.g. `src/lib/cms.ts`) that fetches from Sanity, Contentful, or Strapi.
2. Map the CMS JSON response to the existing TypeScript interfaces (`OrganizationIdentity`, `ProjectRecord`, `ImpactMetric`, etc.).
3. Replace direct static imports in `src/app/page.tsx` with `async` Server Component data loaders, with Next.js `revalidate` tags.
4. No JSX component changes are required; all UI components already consume structured props.

---

## 8. Typed Media Registry (`src/content/media.ts`)

Phase 5A.1 introduced a centralized, strongly typed media registry at `src/content/media.ts`. All SEVA photographic assets — whether published or withheld — are catalogued here.

### Registry Interfaces

```typescript
// Publication status for any media asset
type MediaPublicationStatus =
  | "confirmed_official" // Approved and live on the website
  | "pending_identity_confirmation" // Portrait with unresolved identity — withheld
  | "pending_management_approval" // Withheld until explicit authorization received
  | "placeholder_documentary"; // Licensed placeholder (Unsplash) pending replacement

// Asset category
type MediaCategory =
  | "leadership-portrait"
  | "education"
  | "healthcare"
  | "women-empowerment"
  | "community-welfare"
  | "rural-tribal"
  | "collage"
  | "branding"
  | "general";

// Full media record
interface MediaAsset {
  id: string;
  sourceFilename: string; // Original filename from supplied archive
  sourceArchive?: string; // Which ZIP archive supplied it
  publicUrl?: string; // Path relative to public/ (undefined = withheld)
  description: string;
  altText: string;
  width: number;
  height: number;
  category: MediaCategory;
  programmeAssociation?: string;
  credit?: string;
  approvalStatus: MediaPublicationStatus;
  identityConfirmed?: boolean; // For leadership portraits
  intendedPlacements: string[];
  notes?: string;
}
```

### Looking Up Assets

```typescript
import {
  mediaRegistry,
  getApprovedAssets,
  getAssetById,
} from "@/content/media";

// All approved assets (publicationStatus === "confirmed_official")
const approved = getApprovedAssets();

// Single asset by ID
const asset = getAssetById("ruby-meals-service");
if (asset?.publicUrl) {
  // safe to render
}
```

### Adding a New Photo

1. Copy the optimized WebP derivative to `public/images/<category>/filename.webp`.
2. Add a new record to the `mediaRegistry` array in `src/content/media.ts`:
   ```typescript
   {
     id: "your-asset-id",
     sourceFilename: "original-filename.jpg",
     sourceArchive: "Pictures.zip",
     publicUrl: "/images/category/filename.webp",
     description: "Human-readable description of the scene.",
     altText: "Accessible alt text for screen readers.",
     width: 1400,
     height: 1050,
     category: "education",
     programmeAssociation: "Vidya Jyoti Scholarship Programme",
     credit: "SEVA Social Service Society",
     approvalStatus: "confirmed_official",
     intendedPlacements: ["focus-areas", "gallery"],
   }
   ```
3. Reference `asset.publicUrl` in the relevant content model (`focus-areas.ts`, `projects.ts`, `home.ts`).
4. Never hardcode `/images/...` paths directly in components — always read from the registry or a content model that was populated from the registry.

### Leadership Portrait Resolution (Phase 5C.2A)

The two previously unassigned portraits from `Founders.zip` were formally confirmed by SEVA management in Phase 5C.2A:

- **H E Dr. Mathews Mar Pachomios OIC**: Confirmed by client from `ChatGPT Image Sep 8, 2026, 02_28_12 PM.png`. The non-official lower text banner was cropped out and the portrait published as `/images/leadership/mathews-mar-pachomios.webp`.
- **Rev. Fr. Abraham Thanuvelil**: Confirmed by client from `32 fr santhosh.jpg.jpeg`. Official display name is strictly preserved as Rev. Fr. Abraham Thanuvelil and the portrait published as `/images/leadership/fr-abraham-thanuvelil.webp`.
  Both records in `src/content/media.ts` now have `approvalStatus: "approved_for_publication"` and `identityConfidence: "confirmed"`. All four leadership profiles on `/profile/leadership` now feature confirmed authentic portraits.

---

## 9. Information Requiring Management Approval Before Publication

The following items are deliberately withheld or marked pending until official authorization:

- **Banking Account Details & IFSC Codes**: Designated accounts (`Seva Vidhya Jyothi`, `Seva Social Service Society`, `Seva Ruby Meal`) are architected in `src/content/donations.ts`, but account numbers, branch IFSC codes, and payment gateways will only be enabled after written management authorization.
- **Statutory Document Identifiers**: PAN numbers, 80G registration codes, 12AC codes, and FCRA certificate numbers remain unexposed in public markup.
- **Beneficiary Case Studies**: Individual testimonials and named quotes require signed informed consent protocols before publication.
- **Production Canonical Domain**: `SITE_URL` remains unset until the client approves the final DNS and domain cutover.

## Phase 5B route content and media

`src/config/navigation.ts` owns category/child labels, descriptions and route implementation status. `interior-content.tsx` consumes the existing modular organizational records; `InteriorPage` supplies breadcrumbs, hero and related routes. See NAVIGATION_GUIDE.md for the complete hierarchy and extension instructions. History milestones, detailed biographies, two verified portraits, videos, events and public document downloads remain pending. Giving mechanisms remain awaiting management authorization. Contact uses `contact.ts`. All interior previews explicitly remain noindex.

`src/content/route-media.ts` returns approved gallery and project image arrays independent of homepage use. Leadership additionally requires confirmed identity and a matching leadership record. Preserve every original, derivative and withheld registry record. See MEDIA_ASSET_REGISTER.md for the unused/pending inventory and subsequent integration work. Do not infer identities or new project associations.

## Phase 5C.1: editing Profile pages

`src/content/profile.ts` owns editorial headings, metadata descriptions, registered media IDs, placeholder monograms and the typed confirmed timeline. Canonical name, year, legal status, states, vision, mission and mission pillars remain in `organization.ts`; leadership names/titles and publication status remain in `leadership.ts`. `profile-pages.tsx` composes the five pages without duplicating the official vision or mission statements. `src/styles/profile.css` scopes page-specific presentation.

Append history entries only after confirmation, with an ID, year, source and confirmed status. The current timeline has one entry: establishment in 2015. Current programme links do not assert launch dates. Do not fill gaps with invented milestones or biographies. To approve a portrait, update both the leadership reference/status and the registry approval/identity fields; the page checks all of them. The Bishop and Director remain name-based placeholders until correctly identified portraits are approved.

Profile photography references `tuition-classroom-group`, `ruby-meals-service` and `vidhya-jyothi-sisters`; captions and alt text come from the unchanged registry. Original assets and all other gallery/project arrays are retained. Phase 5C.2 and full media curation remain separate. See PHASE_5C_1_REPORT.md for verification and limitations.

## Phase 5C.2B: Project Detail Pages Architecture

All factual content for SEVA's six project detail pages is centralized in `src/content/projects.ts`. No factual claims, statistics, or locations are hardcoded in JSX.

### Data Model (`ProjectRecord`)

Each project record supports:

- `id`: Unique identifier (e.g., `"cnewa-education"`, `"vidya-jyoti"`)
- `name`: Full project title
- `slug`: Destination slug (e.g., `"cnewa"`, `"vidya-jyoti"`)
- `parentProgrammeId` / `parentProgrammeName`: Parent programme association
- `secondaryFocusAreaId` / `secondaryFocusAreaName`: Optional cross-cutting programme synergy (e.g. Sui Daga bridging Women Empowerment and Skill Development)
- `headline` / `headlineEm`: Large editorial display typography
- `subtitle`: Descriptive role subtitle
- `description`: Overview summary
- `introduction`: In-depth project narrative
- `objectives`: Verified institutional goals
- `activities`: Documented field activities
- `location`: Confirmed operational geography (e.g., `"Raigad District, Maharashtra"`, `"Khadki-Pune, Maharashtra"`)
- `reportedImpact`: Formatted reach statement
- `reportedStats`: Sourced metrics with `metric`, `value`, `label`, `context`
- `reportingPeriod`: Verification period (e.g., `"2025–26 programme"`, `"Weekly ongoing schedule"`)
- `approvedImages`: Media asset IDs from `src/content/media.ts`
- `imagePlaceholder`: Documentary placeholder object for projects awaiting field photo curation
- `relatedProjectIds`: Sibling project references
- `participationInfo`: Pathway title, description, pathway label, and contact CTA
- `detailRoute`: Destination URL
- `verificationStatus` & `publicationStatus`: Strict audit status flags
- `metaDescription`: Page-specific SEO metadata
- `themeColor`: Vibrant Humanism theme token (`yellow`, `blue`, `coral`, `black`, `ochre`)

### Truth in Reporting Safeguards

- Reported figures carry explicit "Organization reported · Audit pending" disclosures.
- Vidya Jyoti clearly separates ~700 children assisted from 478 tuition centre students as non-additive touchpoints.
- Projects without authentic photographs (Jeevan, Sui Daga, Healthcare) carry explicit curatorial review notices and use licensed documentary studies. No stock photo is ever attributed as an authentic beneficiary.

## Phase 5D.1: Media publishing models

- `media-pages.ts` contains the shared Media introductions and empty-state copy. Do not promise production schedules or organizational consent policies without a supplied source.
- `media.ts` remains the photographic approval authority. `route-media.ts` selects the 11 eligible archive derivatives and defines existing confirmed project associations; gallery filters never infer association from appearance. Add an association only after confirmation.
- `videos.ts` holds `VideoRecord`: source-specific required playback data (embed ID for YouTube/Vimeo, URL for hosted video), optional thumbnail, title/description, publication date, programme, caption tracks and transcript. Only `approved_for_publication` entries appear. Both public video and news registries currently contain zero records. Supply approved local thumbnails/caption files; external images require explicit Next.js configuration review. Test actual playback and captions when real assets arrive.
- `news.ts` holds article ID/slug, title/summary, paragraphs, category, publication/event dates, location, programme link, publication status and metadata. `featuredMediaAssetId` resolves through approval checks; do not add free-form image URLs. Draft/archived articles do not enter static parameters or public lookup. Categories cover news, events and programme updates/activity reports. Dates must be ISO strings; display uses Asia/Kolkata. An approved article requires a rebuild to create its route.

Maintain caption accuracy and participant privacy. Gallery cards and lightbox use the exact registered captions and credits; internal registry notes are not shown in the viewer. The original tuition composite remains preserved and documented; its three separate scene extracts already appear, so no extra duplicate card was added. No CMS/admin/authentication configuration is installed.
