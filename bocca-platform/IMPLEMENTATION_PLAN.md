# BOCCA website implementation plan

## Product direction

The website will use Astro and Tailwind CSS for the frontend and Sanity for structured content. Public content and the editor-facing Studio will be Danish. Source code, component names, schema names, fields, and developer documentation will be English.

The homepage, About page, and Cases overview will have fixed, purpose-built layouts whose content is managed in Sanity. Individual case pages will use a constrained page builder made from approved media and content modules. Editors must be able to create and publish a case without writing code, while remaining inside the design system.

The frontend will initially use static generation. Interactive features will be progressively enhanced with minimal client-side JavaScript. A frontend framework should only be introduced if a component has requirements that Astro and small TypeScript modules cannot meet cleanly.

## Working principles

- Model content by meaning, not by its current visual position.
- Keep fixed pages intentionally fixed; do not build a universal page builder.
- Restrict case modules to approved layouts and validated options.
- Make accessible output the default, including in Sanity field requirements.
- Keep animation optional and respect `prefers-reduced-motion`.
- Optimize images and video before delivery; keep the media abstraction independent of its storage provider.
- Ship vertical slices that can be reviewed in the browser and in Sanity.
- Treat Figma as the visual reference and the coded design tokens as the implementation source of truth.

## Phase 1 — Project foundation

### Work

- Confirm Node and pnpm versions and track the new project in the existing BOCCA repository.
- Add linting for Astro and TypeScript.
- Add CI checks for install, formatting, type-checking, tests, and production builds.
- Define environment handling for local, preview, and production contexts.
- Create the Sanity project and connect both apps to its production dataset.
- Establish branch and deployment conventions; the Astro app replaces the prototype as the repository's Netlify deployment while prototype source remains for reference.

### Completion gate

- A clean checkout can be installed, checked, built, and run from documented commands.
- No secrets are committed.
- Pull requests cannot merge when required checks fail.

## Phase 2 — Design system foundation

### Work

- Translate the locked Figma foundations into Tailwind/CSS tokens:
  - Brand and functional colors
  - Typography families, weights, sizes, line heights, and tracking
  - Twelve-column grid, page gutters, and breakpoints
  - Spacing scale
  - Borders, corner treatments, and media aspect ratios
  - Motion durations and easing curves
- Self-host and subset licensed fonts where permitted.
- Build a small internal reference page for tokens and primitives.
- Create low-level primitives such as `Container`, `Grid`, `Section`, `Button`, `Link`, `Media`, and typography styles.

### Completion gate

- Desktop and mobile grid behaviour matches Figma.
- Components do not introduce one-off colors, type sizes, or spacing without an explicit reason.
- Focus, hover, active, and disabled states are defined.

## Phase 3 — Sanity content foundation

### Documents

- `siteSettings` singleton for organization data, navigation, contact information, social links, and default SEO.
- `homePage` singleton for the fixed homepage sections.
- `aboutPage` singleton for the fixed About page sections.
- `casesPage` singleton for Cases overview copy and settings.
- `caseStudy` document for individual cases.
- `person`, `service`, and `clientLogo` documents where reuse and independent editing are useful.

### Shared objects

- SEO metadata
- Internal/external links
- Accessible image with required alternative-text behaviour
- Direct-hosted video with poster, captions/transcript fields, playback behaviour, and media metadata
- CTA
- Portable text with a deliberately restricted style set

### Editorial experience

- Danish titles, descriptions, validation messages, previews, and structure labels.
- English schema and field identifiers.
- Required fields and sensible character guidance.
- Clear conditional fields so editors only see relevant controls.
- Initial document templates for the singleton pages and new cases.
- Add Sanity TypeGen immediately after the first schema is stable.

### Completion gate

- An editor can understand the Studio without developer guidance.
- Invalid or inaccessible content is blocked or clearly warned about.
- Generated Sanity types are used by frontend queries.

## Phase 4 — Global website shell

### Work

- Base HTML layout and per-page metadata API.
- Header and navigation, including active states and keyboard behaviour.
- Contact drawer and footer.
- Global responsive grid and section spacing.
- Error/404 page.
- Shared image and video rendering components.
- Shared reveal-animation utility with reduced-motion fallback.

### Completion gate

- Navigation and contact interactions work with keyboard, pointer, and touch.
- Landmarks and heading structure are valid.
- There is no layout shift from fonts or reserved media space.

## Phase 5 — Homepage vertical slices

Build and connect one section at a time:

1. Frontpage hero
2. Logo ticker
3. Featured cases
4. About teaser
5. Services accordion
6. Any remaining one-off homepage sections

Each slice includes its Sanity fields, query, generated types, Astro component, responsive styling, motion, accessibility behaviour, and review against Figma.

### Completion gate

- Every section is editable in Sanity without allowing layout-breaking choices.
- The accordion uses semantic controls, smooth reversible motion, and no default open item unless content requirements change.
- Off-screen animated media does not consume unnecessary bandwidth.

## Phase 6 — About page

### Work

- About hero and editorial story modules.
- Dual-media and text layouts.
- Employee grid with square portraits.
- BOCCA & Friends section.
- Any fixed calls to action or supporting sections.

### Completion gate

- People content is reusable and ordered from Sanity.
- Portraits and editorial media retain their intended aspect ratios at all breakpoints.
- Decorative and meaningful imagery have the correct alternative-text treatment.

## Phase 7 — Cases overview

### Work

- Cases intro and overview grid.
- Case-card component shared with Featured Cases where the design overlaps.
- Sanity-driven ordering, featured selection, year, client, and preview media.
- Video-thumbnail playback rules and static fallbacks.
- About teaser after the case grid.

### Completion gate

- Cards have consistent hover/focus motion and corner transitions.
- Video cards remain understandable when autoplay is unavailable or reduced motion is enabled.
- Case URLs are stable and derived from editor-managed slugs with validation.

## Phase 8 — Case page builder

### Fixed case fields

- Title and slug
- Client
- Year
- Services
- Introductory copy
- Hero media
- Overview thumbnail media
- SEO and social-sharing data
- Contact person or case CTA configuration

### Initial module set

- Full-width media
- 50/50 media split
- Media plus text
- Two-media plus text composition
- Three-media editorial composition
- Rich text section where genuinely required
- Case contact section, if it needs case-specific content

Modules will be implemented as a discriminated array in Sanity and as an exhaustive component mapping in Astro. Layout controls will be named by editorial intent rather than raw CSS values. Editors will choose from approved variants rather than arbitrary columns, colors, or aspect ratios.

### Completion gate

- A nontechnical editor can create, preview, reorder, and publish a complete case.
- Every module has a clear Studio preview and validation.
- Unknown module types fail safely during development and never silently disappear.
- The Danish Minies case is rebuilt as the first end-to-end reference case.

## Phase 9 — Media delivery and performance

### Direct video approach

- Define accepted codecs, maximum dimensions, duration guidance, and file-size budgets.
- Require poster images for content video.
- Add optional caption and transcript fields for meaningful audio.
- Use lazy loading and viewport-aware playback below the fold.
- Avoid preloading multiple case videos on overview pages.
- Pause media when it leaves the viewport where appropriate.
- Provide reduced-motion and autoplay-disabled fallbacks.
- Document the export presets used by the creative team.

Keep the frontend video interface provider-neutral. Reconsider Mux when real case volume, editorial workflow, playback performance, or video analytics justify it.

### Performance targets

- Core Web Vitals in the “good” range on representative mobile hardware.
- No unexpected cumulative layout shift.
- Minimal client-side JavaScript and no frontend framework by default.
- Explicit budgets for initial page weight, hero media, fonts, and below-fold media.

## Phase 10 — SEO and accessibility hardening

### SEO

- Unique titles and descriptions.
- Canonical URLs.
- Open Graph and social images.
- XML sitemap and robots configuration.
- Organization, WebSite, Person, Breadcrumb, and CreativeWork/Article structured data where appropriate.
- Redirect map from the existing website.
- Search Console verification and post-launch indexing checks.

### Accessibility

- Automated Playwright and axe checks for key routes.
- Manual keyboard, screen-reader, zoom, contrast, and reduced-motion review.
- Visible focus states and reliable skip navigation.
- Correct labels, names, landmarks, headings, and live-region behaviour.
- Captions/transcripts and pause controls where required.
- Sanity validation for accessibility-critical editorial fields.

### Completion gate

- No known high-impact WCAG 2.2 AA failures.
- Automated checks pass in CI, with manual review documented.
- Metadata and structured data validate on representative pages.

## Phase 11 — Editorial QA and launch preparation

- Add preview/presentation workflows for drafts.
- Seed the fixed pages and migrate approved content.
- Run an editor usability test with someone who did not build the schemas.
- Add role-appropriate Sanity access.
- Configure preview and production environments.
- Add redirects, headers, caching, security policy, and error monitoring.
- Create backup/export and rollback procedures.
- Run cross-browser and device testing.

## Phase 12 — Analytics and launch

- Agree on a measurement plan before adding tags.
- Decide the consent-management approach and document which events require consent.
- Add GA4 or Google Tag Manager only after those decisions.
- Exclude internal and preview traffic where practical.
- Launch with a monitored redirect and rollback plan.
- Review Core Web Vitals, errors, form delivery, indexing, and analytics after launch.

## Recommended delivery order

The safest implementation order is:

1. Foundation and design tokens
2. Sanity project and shared content objects
3. Global shell
4. Homepage sections as vertical slices
5. About page
6. Cases overview
7. Case schema and module renderer
8. Danish Minies reference case
9. Remaining content and cases
10. Hardening, editorial QA, analytics, and launch

This order validates the fixed-page content pattern before introducing the more complex case builder.

## Decisions needed before their related phase

- Sanity project ownership, plan, and initial editor list
- Final font files and webfont licensing
- Production domain and preferred URL structure
- Final inventory of approved case modules
- Contact-form handling and recipient workflow
- Video export specification and maximum upload policy
- Existing-content migration and redirect scope
- Preview/staging access requirements
- Analytics events and consent-management approach

## Initial effort guide

For one focused developer with timely design/content review, the technical build is likely four to six development weeks, excluding bulk content entry and unpredictable approval delays. The case builder, media handling, accessibility review, and editorial testing should not be compressed into the final days; they carry most of the implementation risk.
