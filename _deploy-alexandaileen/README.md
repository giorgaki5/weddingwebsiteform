# alexandaileen.com

Wedding site for Alexander Leventis and Aileen Everitt — October 23, 2026.
Design direction: **Prospect Avenue** (Concept A). Italiana + EB Garamond.

## Making changes

Edit `site-data.js`. Commit. Push. Cloudflare rebuilds on every push to `main`.

That is the whole workflow. Content lives in exactly one place, and nothing
gets retyped into the HTML. Pull requests get their own preview URL, which is
the safe way to show the couple a change before it reaches the live domain.

## What's here

| File | What it is |
| --- | --- |
| `site-data.js` | **Edit this one.** `DATA` (their content) + `PHOTOS` (image manifest) |
| `engine.js` | Shared runtime — dates, view model, dock, lightbox, motion. Same file as `templates/engine.js` |
| `index.html` | Concept A layout, CSS, and render code. Loads the two above, in that order |
| `photos/gallery/` | `11.jpg` is the hero and the social card; `01`–`10` fill the gallery |
| `photos/party/` | Empty. Headshots go here, then get mapped in `PHOTOS.party` |
| `favicon.svg`, `apple-touch-icon.png` | Gold ampersand on the ground cream |

Load order matters. `engine.js` builds its view model from `DATA` the moment it
runs, so `site-data.js` has to come first. It already does.

## The head is not driven by the data

Title, description, canonical URL, `og:` and `twitter:` tags are plain HTML in
`index.html`. If the date or the couple's names ever change, they need changing
there too — `site-data.js` will not do it for you. `og:image` points at
`https://alexandaileen.com/photos/gallery/11.jpg` and must stay an absolute URL
or link previews break.

## Cloudflare Pages settings

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `/` |
| Production branch | `main` |

Custom domains: `alexandaileen.com` and `www`, both added under the project's
Custom domains tab. DNS is in the same Cloudflare account, so records are
created automatically.

## Known

- The wedding party renders silhouettes until headshots land in `photos/party/`.
  That is deliberate, not broken.
- Gallery images are full resolution, roughly 5.7 MB in total, and are not
  resized or lazy-loaded beyond the browser default. Worth fixing before the
  invitations go out, since guests will open this on cellular.
- Source of truth for the couple's content is `site-data.js` in this repo. The
  original intake JSON is archived in the `weddingwebsiteform` repo as a record
  of what they submitted — do not edit both.
