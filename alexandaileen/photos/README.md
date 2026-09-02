# Photos

Drop the couple's images in this folder, then switch them on in each concept.

## Expected files

| File | Used for | Shape |
|---|---|---|
| `hero.jpg` | Hero background, all three concepts | Landscape, wide. The two of them together. |
| `story.jpg` | Behind the story section | Anything. Sits at ~10% opacity. |
| `venue.jpg` | Behind the day section | Church or the country club. |
| `closing.jpg` | Behind the footer | Wide, works dark. |

## Switching them on

Each concept file has one block near the top of its second `<script>` tag.
Change `null` to a path and that background turns on. Nothing else changes.

```js
const PHOTOS = {
  hero:   "photos/hero.jpg",
  story:  null,
  day:    "photos/venue.jpg",
  footer: null
};
```

Edit this in all three concept files: `concept-a-prospect-avenue.html`,
`concept-b-editorial.html`, `concept-c-refined.html`.

Any key left as `null` falls back to a tonal wash from the palette, so a
missing photo never reads as a broken image.

## Notes

- Photos sit behind a colour veil at low opacity — they set mood, they are
  not the subject. Busy or high-contrast images work fine.
- Export at roughly 2000px on the long edge and compress. These are
  backgrounds; large files only slow the page down.
- Landscape crops best. Portrait images get centre-cropped.
