# BOCCA web

Astro frontend for the new BOCCA website.

## Design system

The current prototype is the visual source of truth. The Figma Design page is a
secondary reference for core tokens. Shared values live in
`src/styles/global.css`, while reusable low-level components live in
`src/components/ui`.

The local reference page is available at `/design-system/` and is marked
`noindex, nofollow`.

Use existing tokens and primitives before adding a page-specific value. New
colors, typography sizes, spacing values, aspect ratios, or motion curves should
be added to the shared system only when they represent a repeatable design rule.

## Commands

Run commands from the workspace root:

| Command             | Action                          |
| :------------------ | :------------------------------ |
| `pnpm dev:web`      | Start the Astro frontend        |
| `pnpm check`        | Type-check web and Studio       |
| `pnpm build`        | Build all workspace apps        |
| `pnpm format`       | Format the workspace            |
| `pnpm format:check` | Verify formatting without edits |
