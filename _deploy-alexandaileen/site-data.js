/* =====================================================================
   site-data.js - Alexander Leventis & Aileen Everitt, 23 October 2026.

   THE ONLY FILE THAT CHANGES FOR THIS COUPLE. Edit content here, commit,
   push; Cloudflare redeploys. Never retype content into index.html.

   DATA is a verbatim instance of wedding.schema.json 1.0.0, generated
   from alex-and-aileen.json in the weddingwebsiteform repo. That file is
   the archived intake record; this is the working copy. If they change
   something, change it here.

   Must load BEFORE engine.js.
   ===================================================================== */

const DATA = {
  "schemaVersion": "1.0.0",
  "wedding": {
    "id": "wed_leventis_everitt",
    "slug": "alex-and-aileen",
    "customDomain": "alexandaileen.com",
    "primaryDate": "2026-10-23",
    "timezone": "America/Chicago",
    "locales": [
      "en"
    ],
    "visibility": "public",
    "status": "draft"
  },
  "couple": {
    "displayName": "Alexander & Aileen",
    "partners": [
      {
        "id": "p1",
        "firstName": "Alexander",
        "lastName": "Leventis",
        "preferredName": "Alexander",
        "bio": "A tenacious entrepreneur."
      },
      {
        "id": "p2",
        "firstName": "Aileen",
        "lastName": "Everitt",
        "preferredName": "Aileen",
        "bio": "A chocoholic."
      }
    ]
  },
  "story": {
    "headline": "A train, a platform, ten years",
    "chapters": [
      {
        "id": "ch1",
        "date": "Summer 2016",
        "location": "Libertyville, IL",
        "title": "The 6:30 to Chicago",
        "body": "Alexander and Aileen had both graduated college, were living at home with their parents, and were commuting into Chicago on the Milwaukee North line. Every morning they hauled themselves to the Libertyville station at the ungodly hour of 6:30. And while they stood on the platform, half asleep, waiting for the train to roll in, they noticed one another. The tall and handsome man. The beautiful blonde."
      },
      {
        "id": "ch2",
        "date": "Not long after",
        "location": "West Loop, Chicago",
        "title": "Three hours at Haymarket",
        "body": "They met at Haymarket Brewery in the West Loop for their first date, and bonded over a shared hometown and a shared high school, despite never having known each other back then. The date turned into three hours of talking, and the night ended with a first kiss."
      },
      {
        "id": "ch3",
        "date": "2020",
        "title": "A suitcase packed for two weeks",
        "body": "Aileen was living with roommates, one of them an ER nurse. When the lockdown began, Alexander drove over and picked her up with a suitcase packed for two weeks. Essentially, he saved her life. They have lived together ever since."
      },
      {
        "id": "ch4",
        "date": "Ever since",
        "title": "The perfect travel buddy",
        "body": "Both of them count their travels among the most significant parts of the relationship. Travel has a way of exposing every side of a person, and they have found in each other the ideal companion for it — through Mexico, Canada, Puerto Rico, Hawaii and Greece. The relationship has developed slowly over ten years. Some might say at a snail's pace. But the bond between them is strong and everlasting."
      }
    ]
  },
  "venues": [
    {
      "id": "v_church",
      "name": "Saints Peter and Paul Greek Orthodox Church",
      "address": {
        "line1": "1401 Wagner Rd",
        "city": "Glenview",
        "region": "IL",
        "postalCode": "60025",
        "country": "US"
      },
      "parkingNotes": "Parking is available on site."
    },
    {
      "id": "v_club",
      "name": "Park Ridge Country Club",
      "address": {
        "line1": "636 N Prospect Ave",
        "city": "Park Ridge",
        "region": "IL",
        "postalCode": "60068",
        "country": "US"
      },
      "parkingNotes": "Parking is available on site."
    }
  ],
  "events": [
    {
      "id": "e_ceremony",
      "name": "Ceremony",
      "type": "ceremony",
      "description": "A traditional Greek wedding ceremony.",
      "culturalNote": "The Greek Orthodox ceremony includes the Stefana, or crowning, a shared cup, and three walks around the altar — the couple's first steps together as husband and wife, and their promise to walk through the whole of life the same way. The three circles also represent the Holy Trinity, and the marriage being blessed under God.",
      "startsAt": "2026-10-23T15:30:00-05:00",
      "venueId": "v_church",
      "dressCode": {
        "label": "Formal",
        "notes": "Formal attire. Suit and tie for the gentlemen, a long or cocktail dress for the ladies."
      },
      "rsvp": {
        "required": false
      }
    },
    {
      "id": "e_cocktails",
      "name": "Cocktail Hour",
      "type": "reception",
      "description": "Drinks and passed hors d'oeuvres. Weather permitting, this will be held on the terrace overlooking the club grounds.",
      "startsAt": "2026-10-23T17:30:00-05:00",
      "venueId": "v_club",
      "dressCode": {
        "label": "Formal",
        "notes": "Formal attire. Suit and tie for the gentlemen, a long or cocktail dress for the ladies."
      },
      "rsvp": {
        "required": false
      }
    },
    {
      "id": "e_reception",
      "name": "Reception",
      "type": "reception",
      "description": "Dinner, and dancing to follow.",
      "startsAt": "2026-10-23T18:30:00-05:00",
      "endsAt": "2026-10-24T00:00:00-05:00",
      "venueId": "v_club",
      "dressCode": {
        "label": "Formal",
        "notes": "Formal attire. Suit and tie for the gentlemen, a long or cocktail dress for the ladies."
      },
      "rsvp": {
        "required": false,
        "mealService": true,
        "childrenWelcome": false
      }
    }
  ],
  "party": [
    {
      "id": "wp01",
      "firstName": "Penelope",
      "role": "Koumbara",
      "order": 1,
      "lastName": "Kokkinias",
      "side": "partner1"
    },
    {
      "id": "wp11",
      "firstName": "George",
      "role": "Koumbaro",
      "order": 2,
      "lastName": "Kokkinias",
      "side": "partner1"
    },
    {
      "id": "wp02",
      "firstName": "Kelli",
      "role": "Matron of Honor",
      "order": 3,
      "lastName": "Zorn",
      "side": "partner2"
    },
    {
      "id": "wp03",
      "firstName": "Tori",
      "role": "Maid of Honor",
      "order": 4,
      "lastName": "Johnson",
      "side": "partner2"
    },
    {
      "id": "wp04",
      "firstName": "Dean",
      "role": "Best Man",
      "order": 5,
      "lastName": "Leventis",
      "side": "partner1"
    },
    {
      "id": "wp05",
      "firstName": "Julia",
      "role": "Bridesmaid",
      "order": 6,
      "lastName": "Livesey",
      "side": "partner2"
    },
    {
      "id": "wp06",
      "firstName": "Paige",
      "role": "Bridesmaid",
      "order": 7,
      "lastName": "Leventis",
      "side": "partner2"
    },
    {
      "id": "wp07",
      "firstName": "Sam",
      "role": "Groomsman",
      "order": 8,
      "lastName": "Papas",
      "side": "partner1"
    },
    {
      "id": "wp08",
      "firstName": "Nicolas",
      "role": "Groomsman",
      "order": 9,
      "lastName": "Tasiopoulos",
      "side": "partner1"
    },
    {
      "id": "wp09",
      "firstName": "Dimitri",
      "role": "Groomsman",
      "order": 10,
      "lastName": "Dallas",
      "side": "partner1"
    },
    {
      "id": "wp10",
      "firstName": "Dino",
      "role": "Groomsman",
      "order": 11,
      "lastName": "Melitas",
      "side": "partner1"
    },
    {
      "id": "wp12",
      "firstName": "Zoe,",
      "role": "Flower girls",
      "order": 12,
      "lastName": "Lia and Selene Dallas"
    },
    {
      "id": "wp13",
      "firstName": "Dimitri",
      "role": "Ring Bearers",
      "order": 13,
      "lastName": "Kokkinias, Owen Itzi, Christian and Teddy Leventis"
    }
  ],
  "faq": [
    {
      "id": "f_rsvp",
      "question": "How do we RSVP?",
      "answer": "Please mail in the RSVP card promptly by the response date.",
      "category": "logistics"
    },
    {
      "id": "f1",
      "question": "Can I bring kids?",
      "answer": "We love all the kiddos but we have made the difficult decision to have our wedding be adults-only except for the bridal party."
    },
    {
      "id": "f2",
      "question": "Can I bring a date?",
      "answer": "Your invitation will indicate if you can bring guest(s)."
    },
    {
      "id": "f3",
      "question": "Indoors or outdoors?",
      "answer": "The ceremony and reception will be held indoors. Weather permitting, the cocktail hour may be held on an outdoor terrace. Please prepare accordingly."
    },
    {
      "id": "f4",
      "question": "Vegetarian / vegan / halal / kosher options?",
      "answer": "The venue is very accommodating of dietary restrictions. Please note what you need on your reply card when you return your invitation.",
      "category": "logistics"
    },
    {
      "id": "f5",
      "question": "What time does it end?",
      "answer": "Dancing will conclude at midnight."
    },
    {
      "id": "f6",
      "question": "Is there parking?",
      "answer": "There is parking on-site at both the church and country club. Lots may fill up fast so please plan accordingly."
    }
  ],
  "media": [],
  "design": {
    "vibeWords": [
      "timeless",
      "elegant",
      "warm",
      "north-shore",
      "editorial"
    ],
    "avoid": [
      "over the top",
      "ornate",
      "too detailed"
    ],
    "directions": [
      {
        "id": "d_prospect",
        "name": "Prospect Avenue",
        "rationale": "The engraved-invitation direction. Formal, centred, restrained.",
        "palette": {
          "background": "#FBF6EA",
          "surface": "#FFFDF6",
          "ink": "#000000",
          "accent": "#D19D01",
          "muted": "#8A7F6A"
        },
        "typography": {
          "display": "Italiana",
          "body": "EB Garamond",
          "scale": "standard"
        },
        "layout": "single-page",
        "motifs": [
          "stationery-card",
          "double-rule",
          "gold-spine"
        ]
      },
      {
        "id": "d_editorial",
        "name": "North Shore Editorial",
        "rationale": "A magazine spread. Photography leads, the type stays quiet.",
        "palette": {
          "background": "#FDFFF8",
          "surface": "#EDE6D6",
          "ink": "#000000",
          "accent": "#D19D01",
          "muted": "#6E675C"
        },
        "typography": {
          "display": "Instrument Serif",
          "body": "Archivo",
          "scale": "dramatic"
        },
        "layout": "editorial-grid",
        "motifs": [
          "sticky-heads",
          "crowned-panels",
          "chapter-focus",
          "matches-reference"
        ]
      },
      {
        "id": "d_refined",
        "name": "Marquee",
        "rationale": "Scale instead of ornament. Edge to edge, nothing enclosed.",
        "palette": {
          "background": "#FDFFF8",
          "surface": "#F8F5DE",
          "ink": "#000000",
          "accent": "#D19D01",
          "muted": "#656663"
        },
        "typography": {
          "display": "Bodoni Moda",
          "body": "Cardo",
          "scale": "dramatic"
        },
        "layout": "full-bleed",
        "motifs": [
          "monumental-type",
          "hairline-rules",
          "ledger-years"
        ]
      }
    ],
    "selectedDirectionId": "d_prospect"
  },
  "guestExperience": {
    "personalizedLanding": false,
    "guestPhotoUpload": {
      "enabled": false
    },
    "guestbook": false,
    "liveSongRequests": false
  },
  "registry": {
    "intro": "We are registered at Crate & Barrel.",
    "links": [
      {
        "name": "Crate & Barrel",
        "url": "https://www.crateandbarrel.com/gift-registry/aileen-everitt-and-alexander-leventis/r7627227"
      }
    ]
  }
};

/* =====================================================================
   PHOTOS - the image manifest. Paths are relative to index.html.
   Every key is optional; sections adapt when one is null or empty.
   ===================================================================== */

const PHOTOS = {

  /* 1. SECTION BACKGROUNDS — each sits behind a colour veil at low opacity. */
  hero:   "photos/gallery/11.jpg",
  story:  [
    "photos/gallery/01.jpg",
    "photos/gallery/02.jpg",
    "photos/gallery/05.jpg",
    "photos/gallery/08.jpg"
  ],
  day:    null,
  footer: "photos/gallery/09.jpg",

  /* 2. GALLERY — order here is the order shown; caption appears in the lightbox. */
  gallery: [
    { src: "photos/gallery/01.jpg", caption: "Year One" },
    { src: "photos/gallery/02.jpg", caption: "Year Two" },
    { src: "photos/gallery/03.jpg", caption: "Year Three" },
    { src: "photos/gallery/04.jpg", caption: "Year Four" },
    { src: "photos/gallery/05.jpg", caption: "Year Five" },
    { src: "photos/gallery/06.jpg", caption: "Year Six" },
    { src: "photos/gallery/07.jpg", caption: "Year Seven" },
    { src: "photos/gallery/08.jpg", caption: "Year Eight" },
    { src: "photos/gallery/09.jpg", caption: "Year Nine" },
    { src: "photos/gallery/10.jpg", caption: "Year Ten" },
  ],

  /* 3. HEADSHOTS — keyed by the name exactly as written in alex-and-aileen.json.
        Anyone left out keeps the silhouette. */
  party: {
    // "Penelope Kokkinias": "photos/party/penelope.jpg",
  }
};
