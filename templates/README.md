# templates

The reusable system. Three design concepts that render any couple's wedding
from one data file. Nothing in this folder mentions a real client.

## The split

| File | Scope | Edit it? |
| --- | --- | --- |
| `site-data.js` | One client. `DATA` + `PHOTOS`. | Replace wholesale, every time |
| `engine.js` | All clients, all concepts | Rarely — a change here hits every site you have ever shipped |
| `concept-*.html` | One design direction | Only when changing that design |
| `index.html` | The chooser you send the couple | Never — it renders from the data |

`engine.js` reads the globals `DATA` and `PHOTOS`, derives the view model `W`,
and provides the shared runtime: scene backgrounds, scroll motion, the dock,
the lightbox, avatars, and the story backdrop. The concept files hold layout,
CSS, and their own render code — and nothing else.

Load order matters and is already wired into each concept:

```html
<script src="site-data.js"></script>   <!-- must come first: defines DATA -->
<script src="engine.js"></script>      <!-- derives W from DATA -->
<script> ...concept's own render code... </script>
```

`engine.js` builds `W` at load time, so it will throw if `DATA` is not already
defined. That is deliberate — a missing data file should fail loudly, not
render an empty site.

## Starting a new client

1. Copy this whole folder to a new one named for the couple.
2. Replace `site-data.js` with their content, generated from the intake JSON
   against `wedding.schema.json`. Do not hand-edit `DATA` — regenerate it.
3. Drop photos into `photos/gallery/` and `photos/party/`, then point the
   `PHOTOS` keys at them. Every key is optional; sections adapt when empty.
4. Set the palette per concept from the couple's supplied colours. Use only
   the colours they gave you and derive every other tone arithmetically.
5. Open all three concepts, send the chooser, let them pick.
6. Rename the chosen concept to `index.html`, delete the other two and the
   chooser, and deploy that folder as its own repo on Cloudflare Pages.

## The head is not templated

Title, description, canonical URL, theme-color, favicon, and the `og:` /
`twitter:` tags are plain HTML in each concept's `<head>`. They are marked
`REPLACE` and must be set by hand per client. `og:image` needs an absolute URL
on the client's own domain or the link preview will not render.

## Opening these locally

Double-clicking a concept works. Classic `<script src="...">` loads fine over
`file://`. Do not convert these to ES modules — `type="module"` is blocked
over `file://` and you would lose local preview.

## Known gaps

- `HONOURED_ROLES` in `engine.js` lists the roles that render in the honoured
  group. It currently includes Koumbara and Koumbaro. Add roles as clients
  need them; the list is a superset and unmatched roles fall through harmlessly.
- `W.party` is computed twice in `engine.js` — once inside the `W` literal by
  position, then immediately overwritten by role. The first is dead. Left in
  place so the extraction stayed byte-for-byte verifiable; safe to delete.
- The concept chooser renders its heading, cards, palette swatches, bullets,
  and "our pick" badge entirely from `DATA.design.directions`. Set
  `selectedDirectionId` to show the badge; leave it `null` to show none. The
  only thing to edit by hand is its `<title>`.
- Gallery images are not resized or lazy-loaded beyond the browser default.
  A full-resolution set runs several megabytes.
