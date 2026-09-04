# alexandaileen.com

Wedding site for Alexander Leventis and Aileen Everitt — October 23, 2026.
Design direction: **Prospect Avenue** (Concept A). Italiana + EB Garamond.

## What's here

- `index.html` — the entire site. All content is inlined; there is no build step
  and no runtime data fetch. The only external dependency is Google Fonts.
- `photos/gallery/01.jpg`–`11.jpg` — `11.jpg` is the hero and the social card;
  `01`–`10` fill the gallery. Referenced from the `PHOTOS` object near the top
  of the script block in `index.html`.
- `photos/party/` — empty. Wedding party headshots go here, then get mapped in
  `PHOTOS.party` keyed by the person's name exactly as it appears in the data.
  Until then the party section renders silhouettes, which is intentional.
- `favicon.svg`, `apple-touch-icon.png` — gold ampersand on the ground cream.

## Cloudflare Pages settings

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `/` |
| Production branch | `main` |

Custom domain `alexandaileen.com` plus `www`, both added under the project's
Custom domains tab. DNS is managed in the same Cloudflare account, so the
records are created automatically.

## Making changes

Edit `index.html` directly, commit, push. Cloudflare rebuilds on every push to
`main`; pull requests get their own preview URL, which is the safe way to show
the couple a change before it goes live.

## Source

Built from `alex-and-aileen.json` against `wedding.schema.json` in the
`weddingwebsiteform` repo. That JSON is the source of truth — if content needs
to change in more than one place, change it there first.
