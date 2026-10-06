# BOCCA platform

Astro website and Sanity Studio for the next BOCCA website. The static
prototype remains in the repository as a reference, but Netlify now builds
and publishes this Astro app instead.

## Apps

- `apps/web`: Astro frontend with Tailwind CSS and the Sanity Astro integration.
- `apps/studio`: Standalone Sanity Studio with Danish UI support.

Sanity includes singleton documents for site settings, the homepage, the case
overview, and Mød BOCCA. Cases and employees are reusable documents. The About
page uses four editable media slots and an ordered list of employee references;
until About media is uploaded, it displays the prototype photos stored locally.
The homepage logo ticker reads an ordered list of logos from Sanity and displays
neutral placeholders until those assets are supplied.
Analytics has not been added yet. The repository-root `netlify.toml` builds the
Astro site; the Studio is deployed separately through Sanity.

## Policy copy before launch

The cookie and privacy pages currently contain the visible text from the
[live cookie policy](https://bocca.dk/cookiepolitik/) and
[live privacy policy](https://bocca.dk/privatlivspolitik-bocca/) (retrieved
2026-10-01). Both routes are marked `noindex, nofollow` in `PolicyPage.astro`
until the wording is reviewed for this new site. Before removing that flag,
verify the address and contact email, the actual hosting/CMS and other data
processors, whether a contact form exists, the cookie inventory and consent
mechanism, and the Google Analytics setup. The source privacy policy's
bookkeeping legal-basis sentence is incomplete and also needs review.

## Requirements

- Node.js 22.12 or newer
- pnpm 10.33 or newer

## Setup

1. Install dependencies with `pnpm install`.
2. Copy each app's `.env.example` to `.env` after a Sanity project has been created.
3. Add the Sanity project ID and dataset to both `.env` files.
4. Add a Viewer-only `SANITY_API_READ_TOKEN` to `apps/web/.env` when the
   dataset is private. Never expose this value with a `PUBLIC_` prefix.
5. Keep `PUBLIC_SITE_ENV=staging` locally; only the public launch deployment
   should set it to `production`.

## Commands

```sh
pnpm dev          # Run the website and Studio together
pnpm dev:web      # Astro only
pnpm dev:studio   # Sanity Studio only
pnpm check        # Type and framework checks
pnpm build        # Production builds for both apps
pnpm format       # Format supported source files
```

The Astro app can run without Sanity credentials. The Studio requires a real Sanity project ID before it can connect to Content Lake.

## Staging deployment

The repository-root `netlify.toml` sets `bocca-platform` as Netlify's base
directory, builds only `@bocca/web`, and publishes `apps/web/dist` relative to
that base. It replaces the prototype's previous `publish = "."` configuration,
so the prototype source is not included in the deployed site.

Set these variables in the **existing BOCCA preview** Netlify project, with Build scope:

| Variable                   | Staging value                                                  |
| -------------------------- | -------------------------------------------------------------- |
| `PUBLIC_SITE_ENV`          | `staging`                                                      |
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project ID                                              |
| `PUBLIC_SANITY_DATASET`    | Dataset containing the launch content (currently `production`) |
| `SANITY_API_READ_TOKEN`    | Viewer-only token, only when the dataset is private            |

The deploy build fails when the project ID, dataset, or site environment is
missing. Staging pages include `noindex, nofollow`; this is not access control.
Use Netlify visitor protection if the site must not be publicly viewable.
Do not put real credentials in this repository or use a `PUBLIC_` prefix for
the read token.

The Studio is a separate app. Deploy it from `apps/studio` with
`pnpm --filter @bocca/studio deploy` after setting its `SANITY_STUDIO_*`
variables. Give editors access through Sanity project membership rather than
Netlify. The Astro site is static, so publishing content in Sanity requires a
new Netlify build; connect a Sanity webhook to a Netlify build hook after the
site is deployed.

At launch, use a separate production Netlify project built from this same code
and dataset, set `PUBLIC_SITE_ENV=production`, and point `bocca.dk` to it after
review. Keep `dev.bocca.dk` on staging. The policy pages retain their own
`noindex` setting until their text and the analytics setup have been reviewed.
