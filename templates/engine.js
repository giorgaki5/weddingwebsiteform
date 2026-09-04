/* =====================================================================
   engine.js - shared by every concept. Do not put client content here.

   Reads the globals DATA and PHOTOS, which site-data.js must define
   first. Derives the view model W, then provides the shared runtime:
   scenes, motion, the dock, the lightbox, avatars, story backdrop.

   Load order in every concept file:
     <script src="site-data.js"></script>
     <script src="engine.js"></script>
     <script> ...the concept's own render code... </script>
   ===================================================================== */

const ONES = ["twelve","one","two","three","four","five","six","seven","eight","nine","ten","eleven"];
const ORD  = ["","first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth",
              "eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth","seventeenth",
              "eighteenth","nineteenth","twentieth","twenty-first","twenty-second","twenty-third",
              "twenty-fourth","twenty-fifth","twenty-sixth","twenty-seventh","twenty-eighth",
              "twenty-ninth","thirtieth","thirty-first"];
const DAYS   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["January","February","March","April","May","June","July","August","September",
                "October","November","December"];

const _p = iso => {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  return { y:+m[1], mo:+m[2], d:+m[3], h:+m[4], min:+m[5] };
};
const _dow = (y,mo,d) => DAYS[new Date(Date.UTC(y, mo-1, d)).getUTCDay()];
const meridiemOf = h => h < 12 ? "in the morning" : (h < 17 ? "in the afternoon" : "in the evening");
const clockOf = p => ((p.h % 12) || 12) + ":" + String(p.min).padStart(2,"0") + (p.h < 12 ? "am" : "pm");
const spokenTime = p =>
  (p.min === 0 ? ONES[p.h % 12] + " o'clock" : "half past " + ONES[p.h % 12]) + " " + meridiemOf(p.h);
const formalWhen = iso => {
  const p = _p(iso);
  return _dow(p.y,p.mo,p.d) + ", the " + ORD[p.d] + " of " + MONTHS[p.mo-1] + " at " + spokenTime(p);
};

const venueById = Object.fromEntries(DATA.venues.map(v => [v.id, v]));
const addrOf = v => v.address.line1 + ", " + v.address.city + ", " +
                    v.address.region + " " + v.address.postalCode;
const mapsUrl = a => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(a);

/* Year spelled out, for the engraved-invitation date line. Covers 2000-2099,
   which is the only range a wedding date will plausibly fall in. Was hardcoded
   to "two thousand twenty-six" before this became shared code. */
const CARDINAL = ["","one","two","three","four","five","six","seven","eight","nine","ten",
                  "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen",
                  "eighteen","nineteen"];
const DECADES  = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
const yearWords = y => {
  if (y < 2000 || y > 2099) return String(y);
  const r = y - 2000;
  if (r === 0) return "two thousand";
  if (r < 20)  return "two thousand " + CARDINAL[r];
  const t = Math.floor(r / 10), o = r % 10;
  return "two thousand " + DECADES[t] + (o ? "-" + CARDINAL[o] : "");
};

const _wd = (() => {
  const [y, mo, d] = DATA.wedding.primaryDate.split("-").map(Number);
  return {
    dow: _dow(y,mo,d),
    long: _dow(y,mo,d) + ", the " + ORD[d] + " of " + MONTHS[mo-1] + ", " + yearWords(y),
    medium: _dow(y,mo,d) + ", " + MONTHS[mo-1] + " " + d + ", " + y,
    short: MONTHS[mo-1] + " " + d + ", " + y,
    numeric: String(mo).padStart(2,"0") + "." + String(d).padStart(2,"0") + "." + y,
    monthDay: MONTHS[mo-1] + " " + ORD[d]
  };
})();

const CEREMONY = DATA.events.find(e => e.type === "ceremony");

/* ---------- view model ---------- */
const W = {
  names: DATA.couple.partners.map(p => p.preferredName || p.firstName),
  display: DATA.couple.displayName,
  legalNames: DATA.couple.partners.map(p => [p.firstName, p.lastName].filter(Boolean).join(" ")),
  traits: DATA.couple.partners
    .filter(p => p.bio)
    .map(p => ({ who: p.preferredName || p.firstName, bio: p.bio })),

  date: _wd,
  locality: [...new Set(DATA.venues.map(v => v.address.city))].join(" & ") +
            ", " + DATA.venues[0].address.region,

  storyHeadline: DATA.story.headline,
  chapters: DATA.story.chapters,

  events: DATA.events.map(e => {
    const v = venueById[e.venueId];
    const p = _p(e.startsAt);
    return {
      id: e.id,
      name: e.name,
      clock: clockOf(p),
      meridiem: meridiemOf(p.h),
      formal: formalWhen(e.startsAt),
      venue: v.name,
      address: addrOf(v),
      maps: mapsUrl(v.name + ", " + addrOf(v)),
      about: e.description,
      tradition: e.culturalNote || null,
      note: (v.parkingNotes || "")
    };
  }),

  attire: CEREMONY.dressCode.notes,

  party: DATA.party.map(m => ({
    name: [m.firstName, m.lastName].filter(Boolean).join(" "),
    role: m.role,
    honored: m.order <= 4
  })),

  faq: DATA.faq.map(f => ({ q: f.question, a: f.answer })),

};

const esc = s => String(s).replace(/[&<>"]/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ===================================================================
   PHOTOGRAPHY
   Photos are used as background layers behind whole sections at low
   opacity, not as inline boxes. To switch them on, paste a URL into
   PHOTOS at the top of the concept file — nothing else changes.
   Mirrors media[] in wedding.schema.json.
   =================================================================== */
function scene(key, opacity, position, zoom) {
  const val = (typeof PHOTOS !== "undefined" && PHOTOS[key]) || null;
  const src = Array.isArray(val) ? val[0] : val;
  const pos = position || "center";
  return '<div class="scene' + (src ? "" : " scene--empty") + '" aria-hidden="true">' +
         (src ? '<div class="scene__img" style="background-image:url(&quot;' +
                encodeURI(src).replace(/"/g, "%22") +
                '&quot;);opacity:' + (opacity || .14) +
                ';background-position:' + pos +
                ';--zoom:' + (zoom || "1.05") + '"></div>' : "") +
         '<div class="scene__veil"></div></div>';
}

function paintScenes() {
  document.querySelectorAll("[data-scene]").forEach(host => {
    const key = host.dataset.scene;
    const op = parseFloat(host.dataset.sceneOpacity || ".14");
    host.insertAdjacentHTML("afterbegin", scene(key, op, host.dataset.scenePosition, host.dataset.sceneZoom));
  });
}

/* ---------- shared runtime ---------- */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function daysUntil() {
  const [y, m, d] = DATA.wedding.primaryDate.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86400000);
}

/* Scroll reveals + progress hairline + gentle parallax on image plates. */
function initMotion() {
  const bar = document.getElementById("progress");
  if (bar) {
    let ticking = false;
    const draw = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
      ticking = false;
    };
    addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(draw); }
    }, { passive: true });
    draw();
  }

  const targets = document.querySelectorAll("[data-reveal], .divider, .timeline");
  if (REDUCED || !("IntersectionObserver" in window)) {
    targets.forEach(t => t.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      obs.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
  targets.forEach(t => io.observe(t));

  /* Parallax: background layers drift slower than the page. */
  const plates = [...document.querySelectorAll(".scene__img")];
  if (!plates.length) return;
  let raf = false;
  const shift = () => {
    plates.forEach(p => {
      const r = p.getBoundingClientRect();
      if (r.bottom < -300 || r.top > innerHeight + 300) return;
      const mid = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      const z = p.style.getPropertyValue("--zoom") || "1.05";
      p.style.transform = "scale(" + z + ") translateY(" + (mid * -28).toFixed(1) + "px)";
    });
    raf = false;
  };
  addEventListener("scroll", () => {
    if (!raf) { raf = true; requestAnimationFrame(shift); }
  }, { passive: true });
  shift();
}

/* ===================================================================
   DOCK — the navigation used by every concept. A floating segmented
   control at the bottom of the viewport. Styles are injected here so
   all three concepts stay identical; each file supplies the colours
   through the --dock-* variables in its own :root.
   =================================================================== */
const DOCK_CSS = `
.dock{position:fixed;left:50%;bottom:max(env(safe-area-inset-bottom),.85rem);z-index:100;
  transform:translateX(-50%) translateY(180%);transition:transform .8s var(--ease,ease);
  background:var(--dock-bg,rgba(255,255,255,.85));
  -webkit-backdrop-filter:blur(18px) saturate(1.4);backdrop-filter:blur(18px) saturate(1.4);
  border:1px solid var(--dock-rule,rgba(0,0,0,.15));border-radius:999px;
  box-shadow:0 18px 44px -26px rgba(0,0,0,.5);padding:.3rem;
  max-width:calc(100vw - 1.5rem);}
.dock.is-up{transform:translateX(-50%) translateY(0)}
.dock__scroll{overflow-x:auto;overflow-y:hidden;scrollbar-width:none;-ms-overflow-style:none;
  border-radius:999px;-webkit-overflow-scrolling:touch}
.dock__scroll::-webkit-scrollbar{display:none}
.dock__inner{position:relative;display:flex;align-items:center;gap:.1rem;width:max-content;margin:0 auto}
.dock__marker{position:absolute;top:0;bottom:0;left:0;width:0;border-radius:999px;
  background:var(--dock-active-bg,#000);z-index:0;opacity:0;
  transition:transform .55s var(--ease,ease),width .55s var(--ease,ease),opacity .35s}
.dock.has-marker .dock__marker{opacity:1}
.dock a{position:relative;z-index:1;display:flex;align-items:center;text-decoration:none;
  min-height:2.75rem;padding:0 clamp(.85rem,3vw,1.15rem);border-radius:999px;
  font-family:inherit;font-size:.8125rem;letter-spacing:.01em;white-space:nowrap;
  color:var(--dock-muted,#666);transition:color .4s var(--ease,ease)}
.dock a:hover{color:var(--dock-ink,#000)}
.dock a[aria-current="true"]{color:var(--dock-active-ink,#fff)}
.dock__rail{position:absolute;left:1rem;right:1rem;bottom:-1px;height:1px;
  background:var(--dock-accent,#D19D01);transform:scaleX(0);transform-origin:0 50%;
  transition:transform .12s linear;border-radius:1px}
@media (max-width:480px){
  .dock{max-width:calc(100vw - 1rem);padding:.25rem}
  .dock a{font-size:.75rem;padding:0 .8rem}
}
`;

function initDock(sectionIds) {
  const style = document.createElement("style");
  style.textContent = DOCK_CSS;
  document.head.appendChild(style);

  const bar = document.getElementById("dock");
  if (!bar) return;
  const marker = bar.querySelector(".dock__marker");
  const rail   = bar.querySelector(".dock__rail");
  const scroll = bar.querySelector(".dock__scroll");
  const links  = [...bar.querySelectorAll("a[data-target]")];

  const moveTo = a => {
    if (!a) return;
    marker.style.width = a.offsetWidth + "px";
    marker.style.transform = "translateX(" + a.offsetLeft + "px)";
    bar.classList.add("has-marker");
    if (scroll && scroll.scrollWidth > scroll.clientWidth) {
      scroll.scrollTo({
        left: a.offsetLeft - (scroll.clientWidth - a.offsetWidth) / 2,
        behavior: REDUCED ? "auto" : "smooth"
      });
    }
  };
  const activate = id => {
    const a = links.find(x => x.dataset.target === id);
    if (!a || a.getAttribute("aria-current") === "true") return;
    links.forEach(x => x.removeAttribute("aria-current"));
    a.setAttribute("aria-current", "true");
    moveTo(a);
  };

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    bar.classList.toggle("is-up", y > window.innerHeight * 0.4);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (rail) rail.style.transform = "scaleX(" + (h > 0 ? Math.min(y / h, 1) : 0) + ")";
    ticking = false;
  };
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  addEventListener("resize", () =>
    moveTo(links.find(x => x.getAttribute("aria-current") === "true")));
  onScroll();

  if (!("IntersectionObserver" in window)) { activate(sectionIds[0]); return; }
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) activate(e.target.id); });
  }, { rootMargin: "-42% 0px -48% 0px" });
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });
  activate(sectionIds[0]);
}


/* Honoured roles are named, not counted, so adding a fifth (Koumbaro)
   does not depend on where it happens to sit in the list. */
const HONOURED_ROLES = ["Koumbara","Koumbaro","Matron of Honor","Maid of Honor","Best Man"];
W.party = DATA.party.map(m => ({
  name: [m.firstName, m.lastName].filter(Boolean).join(" "),
  role: m.role,
  honored: HONOURED_ROLES.indexOf(m.role) !== -1
}));
W.registry = {
  intro: (DATA.registry && DATA.registry.intro) || "",
  links: (DATA.registry && DATA.registry.links) || []
};

/* How many empty frames the gallery draws before photographs exist. */
const GALLERY_PLACEHOLDERS = 8;
function galleryItems() {
  const list = (typeof PHOTOS !== "undefined" && Array.isArray(PHOTOS.gallery)) ? PHOTOS.gallery : [];
  if (list.length) return list.map((g, i) => ({ src: g.src || null, caption: g.caption || "", n: i + 1 }));
  return Array.from({ length: GALLERY_PLACEHOLDERS }, (_, i) => ({ src: null, caption: "", n: i + 1 }));
}
function frame(item) {
  if (item.src) return '<img src="' + esc(item.src) + '" alt="' + esc(item.caption || W.display) + '" loading="lazy">';
  return '<span class="frame__empty"><b>' + String(item.n).padStart(2,"0") + '</b>Photograph</span>';
}
function registryHTML() {
  if (!W.registry.links.length) {
    return '<p class="registry__soon">A registry is on the way. The link will appear here as soon as it is ready.</p>';
  }
  return '<div class="registry__links">' + W.registry.links.map(l =>
    '<a class="registry__link" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.name) + '</a>').join("") + '</div>';
}
function initLightbox(root) {
  if (!root) return;
  const items = galleryItems().filter(i => i.src);
  if (!items.length) return;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = '<button class="lightbox__close" aria-label="Close">&times;</button>' +
    '<button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&#8249;</button>' +
    '<figure class="lightbox__stage"><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lightbox__nav lightbox__nav--next" aria-label="Next">&#8250;</button>';
  document.body.appendChild(box);
  const img = box.querySelector("img"), cap = box.querySelector("figcaption");
  let at = 0;
  const show = i => { at = (i + items.length) % items.length; img.src = items[at].src;
    img.alt = items[at].caption || W.display; cap.textContent = items[at].caption || ""; };
  const close = () => { box.classList.remove("is-open"); document.body.style.overflow = ""; };
  root.addEventListener("click", e => {
    const cell = e.target.closest("[data-shot]");
    if (cell) { show(+cell.dataset.shot); box.classList.add("is-open"); document.body.style.overflow = "hidden"; }
  });
  box.querySelector(".lightbox__close").addEventListener("click", close);
  box.querySelector(".lightbox__nav--prev").addEventListener("click", () => show(at - 1));
  box.querySelector(".lightbox__nav--next").addEventListener("click", () => show(at + 1));
  box.addEventListener("click", e => { if (e.target === box) close(); });
  addEventListener("keydown", e => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(at - 1);
    if (e.key === "ArrowRight") show(at + 1);
  });
}

/* ---------- headshots ---------- */
/* PHOTOS.party is keyed by the name exactly as it appears in the JSON.
   Until a file is supplied, an inline silhouette is drawn instead. */
function silhouette() {
  return '<svg class="avatar__mark" viewBox="0 0 100 100" role="img" aria-hidden="true">' +
         '<circle cx="50" cy="37" r="16"/>' +
         '<path d="M50 58c-16.5 0-30 11.8-32 27.5h64C80 69.8 66.5 58 50 58z"/>' +
         '</svg>';
}
function avatar(m) {
  const src = (typeof PHOTOS !== "undefined" && PHOTOS.party && PHOTOS.party[m.name]) || null;
  return '<span class="avatar">' +
         (src ? '<img src="' + esc(src) + '" alt="' + esc(m.name) + '" loading="lazy">'
              : silhouette()) +
         '</span>';
}


/* ---------- story backdrop ----------
   When PHOTOS.story is an array, the story background changes as you move
   through the chapters, crossfading between two stacked layers. Runs off its
   own observer so it needs no hook into the chapter-focus code. */
function initStoryBackdrop() {
  const list = (typeof PHOTOS !== "undefined" && Array.isArray(PHOTOS.story)) ? PHOTOS.story : null;
  if (!list || list.length < 2) return;
  const host = document.querySelector("#story .scene");
  if (!host) return;
  const base = host.querySelector(".scene__img");
  if (!base) return;

  const op = base.style.opacity || "0.3";
  const alt = base.cloneNode(false);
  alt.style.opacity = "0";
  host.insertBefore(alt, base.nextSibling);

  let front = base, back = alt, at = 0;
  const show = i => {
    i = ((i % list.length) + list.length) % list.length;
    if (i === at) return;
    at = i;
    back.style.backgroundImage = 'url("' + encodeURI(list[i]) + '")';
    back.style.opacity = op;
    front.style.opacity = "0";
    const t = front; front = back; back = t;
  };

  const items = [...document.querySelectorAll("#story .chapter, #story .year")];
  if (!items.length || REDUCED || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) show(items.indexOf(e.target));
  }), { rootMargin: "-45% 0px -45% 0px" });
  items.forEach(el => io.observe(el));
}

