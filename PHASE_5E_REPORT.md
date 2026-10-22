# Phase 5E implementation report

## Completed pages

- `/get-involved`: editorial pathways to volunteering, CSR, giving information, and contact.
- `/get-involved/volunteer`: the seven documented participation categories and an email expression-of-interest link. The page states that it is not an open application or placement confirmation.
- `/get-involved/csr`: eight documented CSR-aligned areas, the supplied implementation/monitoring/reporting/employee-engagement approach, and a corporate email inquiry link.
- `/get-involved/donate`: the three designated purposes, request-for-instructions email link, and explicit notice that payment instructions are not available here.
- `/contact`: centralized organization/director details, functional telephone and email links, postal address, address-based map search, and general email inquiry.

## Content, navigation and safeguards

Pages reuse `partnerships.ts`, `donations.ts`, and `contact.ts`. Inquiry links open the visitor's email application; no form or backend collects information. Only a short optional introduction is suggested for volunteer inquiries. No vacancies, schedules, age limits, deadlines, partner companies, coordinates, banking details, payment URLs, tax benefits, or guaranteed regulatory outcomes were introduced. All interior routes retain noindex/nofollow. Desktop dropdown, mobile accordion, active route, and breadcrumbs use the existing navigation system.

## Files added or changed

Added `src/components/sections/get-involved-pages.tsx`, `src/styles/involvement.css`, `tests/involvement.spec.ts`, and this report. Updated the route dispatcher, navigation statuses, root style imports, and project/content/navigation/design/motion documentation.

## Testing

TypeScript, ESLint, formatting, and the production build pass. `test:styles:dev -- --workers=2` passes 9/9. The production Playwright run exercised 181 desktop/mobile cases; 178 passed on the first run. Three existing assertions failed under concurrent resource pressure or expected the old placeholder donation link. The placeholder-link assertion was updated to verify the new mailto pathway; all three affected cases passed when rerun individually. The added Phase 5E responsive check passed at 320, 375, 768, 1024, 1440, and 1920px. No screenshot baselines were changed.

## Remaining approvals

Management must separately approve any live volunteer registration process, structured CSR intake, payment channel/banking instructions, receipts or acknowledgments, and publication/indexing. Those systems are not implemented. Phase 5E is complete; Phase 6 has not begun.
