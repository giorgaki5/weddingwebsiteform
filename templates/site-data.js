/* =====================================================================
   site-data.js — THE ONLY FILE THAT CHANGES PER CLIENT.

   Everything here is example content for a couple who do not exist.
   Replace it wholesale from the client's intake JSON before you ship.
   If you can read the words "Nora" or "Ashfield" on a live site, this
   file was never swapped out.

   DATA is a verbatim instance of wedding.schema.json 1.0.0.
   PHOTOS is the image manifest — paths are relative to the HTML file.

   Must load BEFORE engine.js. Nothing in here renders on its own.
   ===================================================================== */

const DATA = {
  "schemaVersion": "1.0.0",

  "wedding": {
    "id": "wed_example",
    "slug": "nora-and-ellis",
    "customDomain": "example.com",
    "primaryDate": "2027-09-18",
    "timezone": "America/Chicago",
    "locales": ["en"],
    "visibility": "public",
    "status": "draft"
  },

  "couple": {
    "displayName": "Nora & Ellis",
    "partners": [
      {
        "id": "p1",
        "firstName": "Nora",
        "lastName": "Vance",
        "preferredName": "Nora",
        "bio": "A reluctant morning person."
      },
      {
        "id": "p2",
        "firstName": "Ellis",
        "lastName": "Marchetti",
        "preferredName": "Ellis",
        "bio": "An incurable list-maker."
      }
    ]
  },

  "story": {
    "headline": "Example headline goes here",
    "chapters": [
      {
        "id": "ch1",
        "date": "Spring 2018",
        "location": "Example City",
        "title": "The first chapter",
        "body": "Replace this paragraph with the couple's own words from the intake form. Chapters render in the order they appear here, and the section adapts to however many there are — two reads fine, six reads fine."
      },
      {
        "id": "ch2",
        "date": "A year later",
        "title": "The second chapter",
        "body": "The location field is optional. Leave it out and the chapter simply renders without it, which is the pattern for every optional field in the schema."
      },
      {
        "id": "ch3",
        "date": "Ever since",
        "title": "The third chapter",
        "body": "Keep bodies to a few sentences. Long chapters crowd the photography, and the story section is the one place where restraint reads as confidence."
      }
    ]
  },

  "venues": [
    {
      "id": "v_ceremony",
      "name": "St. Cecilia's Church",
      "address": {
        "line1": "100 Example Road",
        "city": "Ashfield",
        "region": "IL",
        "postalCode": "60000",
        "country": "US"
      },
      "parkingNotes": "Parking is available on site."
    },
    {
      "id": "v_reception",
      "name": "The Ashfield Club",
      "address": {
        "line1": "250 Example Avenue",
        "city": "Ashfield",
        "region": "IL",
        "postalCode": "60000",
        "country": "US"
      },
      "parkingNotes": "Valet parking from six o'clock."
    }
  ],

  "events": [
    {
      "id": "e_ceremony",
      "name": "Ceremony",
      "type": "ceremony",
      "description": "A short description of the ceremony.",
      "culturalNote": "Optional. Use this for a tradition that deserves explaining — it renders as a quiet aside inside the event, not as a section of its own. Delete the field entirely if there is nothing to say.",
      "startsAt": "2027-09-18T15:30:00-05:00",
      "venueId": "v_ceremony",
      "dressCode": {
        "label": "Formal",
        "notes": "Formal attire."
      },
      "rsvp": { "required": false }
    },
    {
      "id": "e_cocktails",
      "name": "Cocktail Hour",
      "type": "reception",
      "description": "Drinks and passed hors d'oeuvres.",
      "startsAt": "2027-09-18T17:30:00-05:00",
      "venueId": "v_reception",
      "dressCode": {
        "label": "Formal",
        "notes": "Formal attire."
      },
      "rsvp": { "required": false }
    },
    {
      "id": "e_reception",
      "name": "Reception",
      "type": "reception",
      "description": "Dinner, and dancing to follow.",
      "startsAt": "2027-09-18T18:30:00-05:00",
      "endsAt": "2027-09-19T00:00:00-05:00",
      "venueId": "v_reception",
      "dressCode": {
        "label": "Formal",
        "notes": "Formal attire."
      },
      "rsvp": {
        "required": false,
        "mealService": true,
        "childrenWelcome": false
      }
    }
  ],

  /* "honored" is not set here. engine.js decides it by matching "role"
     against HONOURED_ROLES, so the order of this list does not matter.
     Add a role to that list in engine.js if a client needs a new one. */
  "party": [
    { "id": "wp01", "firstName": "Example", "lastName": "Name", "role": "Maid of Honor",   "order": 1, "side": "partner1" },
    { "id": "wp02", "firstName": "Example", "lastName": "Name", "role": "Best Man",        "order": 2, "side": "partner2" },
    { "id": "wp03", "firstName": "Example", "lastName": "Name", "role": "Bridesmaid",      "order": 3, "side": "partner1" },
    { "id": "wp04", "firstName": "Example", "lastName": "Name", "role": "Bridesmaid",      "order": 4, "side": "partner1" },
    { "id": "wp05", "firstName": "Example", "lastName": "Name", "role": "Groomsman",       "order": 5, "side": "partner2" },
    { "id": "wp06", "firstName": "Example", "lastName": "Name", "role": "Groomsman",       "order": 6, "side": "partner2" },
    { "id": "wp07", "firstName": "Example", "lastName": "and Example Name", "role": "Flower Girls", "order": 7 }
  ],

  "faq": [
    {
      "id": "f_rsvp",
      "question": "How do we RSVP?",
      "answer": "Replace with the couple's actual instructions.",
      "category": "logistics"
    },
    {
      "id": "f1",
      "question": "Can I bring a date?",
      "answer": "Your invitation will indicate if you can bring guests."
    },
    {
      "id": "f2",
      "question": "Can I bring kids?",
      "answer": "Replace with the couple's actual answer."
    },
    {
      "id": "f3",
      "question": "Indoors or outdoors?",
      "answer": "Replace with the couple's actual answer."
    },
    {
      "id": "f4",
      "question": "Is there parking?",
      "answer": "Replace with the couple's actual answer."
    },
    {
      "id": "f5",
      "question": "What time does it end?",
      "answer": "Replace with the couple's actual answer."
    }
  ],

  "media": [],

  /* "directions" is boilerplate — it describes the three concepts you offer
     and is the same for every client. Fill "palette" per couple from their
     supplied colours; keep the palette to the colours they actually gave you
     and derive every other tone arithmetically. Set "selectedDirectionId"
     once they choose. Nothing in here renders; it is a record of the brief. */
  "design": {
    "vibeWords": [],
    "avoid": [],
    "directions": [
      {
        "id": "d_prospect",
        "name": "Prospect Avenue",
        "rationale": "The engraved-invitation direction. Formal, centred, restrained.",
        "palette": { "background": "#FBF6EA", "surface": "#FFFDF6", "ink": "#000000", "accent": "#D19D01", "muted": "#8A7F6A" },
        "typography": { "display": "Italiana", "body": "EB Garamond", "scale": "standard" },
        "layout": "single-page",
        "motifs": ["stationery-card", "double-rule", "gold-spine"]
      },
      {
        "id": "d_editorial",
        "name": "North Shore Editorial",
        "rationale": "A magazine spread. Photography leads, the type stays quiet.",
        "palette": { "background": "#FDFFF8", "surface": "#EDE6D6", "ink": "#000000", "accent": "#D19D01", "muted": "#6E675C" },
        "typography": { "display": "Instrument Serif", "body": "Archivo", "scale": "dramatic" },
        "layout": "editorial-grid",
        "motifs": ["sticky-heads", "crowned-panels", "chapter-focus"]
      },
      {
        "id": "d_refined",
        "name": "Marquee",
        "rationale": "Scale instead of ornament. Edge to edge, nothing enclosed.",
        "palette": { "background": "#FDFFF8", "surface": "#F8F5DE", "ink": "#000000", "accent": "#D19D01", "muted": "#656663" },
        "typography": { "display": "Bodoni Moda", "body": "Cardo", "scale": "dramatic" },
        "layout": "full-bleed",
        "motifs": ["monumental-type", "hairline-rules", "ledger-years"]
      }
    ],
    "selectedDirectionId": null
  },

  "guestExperience": {
    "personalizedLanding": false,
    "guestPhotoUpload": { "enabled": false },
    "guestbook": false,
    "liveSongRequests": false
  },

  "registry": {
    "intro": "",
    "links": []
  }
};

/* =====================================================================
   PHOTOS — the image manifest. Paths are relative to the HTML file.

   Every key is optional. Leave a key null or drop the file in and the
   section adapts: backgrounds simply do not paint, the gallery falls
   back to numbered empty frames, party members keep the silhouette.
   There are no broken-image boxes either way.
   ===================================================================== */

const PHOTOS = {

  /* Section backgrounds. Each sits behind a colour veil at low opacity.
     "story" takes an array — the backdrop crossfades between them as the
     reader moves through the chapters. Two or more, or it stays static. */
  hero:   null,   // e.g. "photos/gallery/11.jpg"
  story:  null,   // e.g. ["photos/gallery/01.jpg", "photos/gallery/02.jpg"]
  day:    null,
  footer: null,

  /* Gallery. Order here is the order shown; caption appears in the lightbox.
     Empty array draws GALLERY_PLACEHOLDERS numbered frames instead. */
  gallery: [
    // { src: "photos/gallery/01.jpg", caption: "" },
  ],

  /* Headshots, keyed by the name exactly as it renders — that is
     firstName + " " + lastName from the party array above. */
  party: {
    // "Example Name": "photos/party/example.jpg",
  }
};
