# Portfolio Redesign Plan — "Quiet Precision"

> Handoff spec for implementing a full visual redesign of this portfolio.
> Scope: **reskin + markup simplification only.** No information-architecture changes,
> no copy changes, no data-layer changes. Section order stays:
> Hero → Projects → Experience → About → Skills → Pulse → Contact.

## 1. Diagnosis: what makes the current design extravagant

The current site is neo-brutalist/editorial: cream paper background, hard 1px ink
borders on everything, offset hard shadows (`box-shadow: 11px 11px 0`), and four loud
accent colors (cobalt `#2356f6`, lime `#d9ff57`, orange, plus a red `#fa2d55` and
sky-blue in Pulse). Specific offenders:

- Lime highlight-marker stroke under the hero headline, decorative circle, "+"-badge on the profile card
- Full-bleed **lime** Skills band, **cobalt** Contact section, **red/blue/cobalt** Pulse cards
- Spinning vinyl record, bouncing equalizer bars, squiggly route illustration, a 10rem `↗` glyph
- Oversized display type (up to 6.8rem) with rotated pseudo-elements
- Every card hover translates and grows a hard drop shadow

## 2. Target direction

**Dark, monochrome, engineered.** Think Linear/Vercel: near-black canvas, one type
family pair, hairline borders, generous whitespace, mono-spaced technical labels (a
motif the site already has — keep it, mute it). Restraint *is* the futurism:
precision hairlines, muted grays, a single live-status green dot. No gradients, no
glassmorphism, no 3D, no scroll-jacking.

## 3. Design tokens (replace `:root` in `src/app/globals.css` entirely)

```css
:root {
  /* Surfaces */
  --bg: #0a0a0a;            /* page canvas */
  --surface: #111113;       /* cards, elevated panels */
  --surface-hover: #16161a;

  /* Text */
  --text-primary: #ededed;
  --text-secondary: #a1a1aa; /* body copy, ≥4.5:1 on --bg */
  --text-tertiary: #70707a;  /* ONLY for decorative/mono labels ≥0.75rem or large text */

  /* Lines */
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16); /* hover state */

  /* The only non-neutral color on the site */
  --live: #34d399;           /* status dots, "Now" badge text */
  --live-bg: rgba(52, 211, 153, 0.10);

  /* Geometry */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-full: 999px;

  /* Motion */
  --ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --dur: 180ms;
}
```

Rules:

- **No other hex values may appear in the stylesheet.** Delete `--paper`, `--cobalt`,
  `--signal`, `--orange` and every hardcoded color (`#82dfd7`, `#fa2d55`, `#8ab4f8`,
  `#98c9df`, etc.).
- Shadows: none, or at most `0 1px 2px rgba(0,0,0,0.4)` on cards. Hard offset shadows are banned.
- `::selection`: `background: var(--text-primary); color: var(--bg);`
- Focus ring: `outline: 2px solid var(--text-primary); outline-offset: 3px;` (replace the lime outline).

## 4. Typography

**Fonts** — load via `next/font/google` in `src/app/layout.tsx` (the only place fonts
change; expose as CSS variables `--font-sans` / `--font-mono`):

- Sans: **Geist** (fallback if unavailable on Google Fonts at build time: **Inter**), weights 400/500/600
- Mono: **Geist Mono** (fallback: **JetBrains Mono**), weight 400

**Scale** — dramatically smaller and tighter than current:

| Role | Spec |
|---|---|
| Hero h1 | `clamp(2.5rem, 5.5vw, 4.25rem)`, weight 600, `letter-spacing: -0.03em`, `line-height: 1.05` |
| Section h2 | `clamp(1.6rem, 2.8vw, 2.25rem)`, weight 600, `-0.02em` |
| Card h3 | `1.125rem–1.375rem`, weight 500 |
| Body | `0.9375rem–1.0625rem`, `line-height: 1.65`, color `--text-secondary` |
| Mono label | `0.6875rem`, uppercase, `letter-spacing: 0.08em`, color `--text-tertiary` |

Max weight anywhere is 600 (current site uses 630–720). Body copy is always
`--text-secondary`; only headings and interactive elements get `--text-primary`.

## 5. Layout system

- Container: `width: min(100% - 48px, 1080px)` (down from 1240px) — keep the `.site-shell` class name.
- Section rhythm: `padding: 128px 0` desktop, `88px 0` mobile. Separate sections with
  a hairline `border-bottom: 1px solid var(--border)` — **no section background
  changes**; the whole page is `--bg`. (Delete the lime/cobalt/ink section backgrounds.)
- Keep the existing two-column section-heading grid (mono label left, h2 right) — it's
  a good editorial device. Change label column to 160px, mono label in `--text-tertiary`.
- Optional single flourish (hero only): a fine dot grid,
  `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)` at
  `background-size: 32px 32px`, fading out with a mask toward the bottom. Skip anything more.

## 6. Section-by-section spec

### Header (`src/components/layout/Header.tsx`)

Keep structure. Height 64px, `background: rgba(10,10,10,0.8)` +
`backdrop-filter: blur(12px)`, hairline bottom border. Wordmark: drop the black-box
`TV` mark — plain text `Tejas Vermani`, 0.875rem, weight 500. Nav links: sans (not
mono), 0.875rem, `--text-secondary` → `--text-primary` on hover, no underline
animation (simple color transition). Right side: replace "Let's talk ↗" underlined
text with a small pill button — `--text-primary` border-only ("ghost") or
white-filled at implementer's discretion, height 34px, radius-full, label "Contact".

### Hero (`src/components/sections/Hero.tsx`)

Biggest structural change — go single-column, left-aligned:

1. **Delete** the profile card (cobalt bg, hard shadow, "+" badge, figcaption) and the
   decorative circle (`.hero::before`).
2. Status row: small avatar (headshot from `site.headshot`, 40px,
   `border-radius: var(--radius-full)`, hairline border) + mono label with a `--live`
   pulsing dot: `SDE I @ Amazon · Atlanta / New York`.
3. H1 unchanged in copy but **remove the `<span>` highlight wrapper** — no marker stroke.
4. Intro paragraph: `--text-secondary`, max-width 560px.
5. Buttons: primary = white fill (`background: var(--text-primary); color: var(--bg)`),
   radius-full, height 44px; secondary = ghost with `--border-strong` border. Hover:
   slight brightness shift only (`opacity`/`background` transition) — no translate, no shadow.
6. Stats strip (`.hero-proof`): keep the 3 facts, restyle as a quiet row — top hairline
   only, number in `--text-primary` weight 500 at 1.25rem, label in mono
   `--text-tertiary`. No cell borders/boxes.

### Projects (`src/components/sections/Projects.tsx`)

Keep featured + 2-up grid. Card: `background: var(--surface)`,
`border: 1px solid var(--border)`, `border-radius: var(--radius-md)`,
`overflow: hidden`. Hover: `border-color: var(--border-strong)` + image
`scale(1.02)` — **no translate, no shadow**.

- **Delete** the colored visual backgrounds (`.project-visual-music` teal, `-credit`
  cream, `-network` lime, `mix-blend-mode`). All visuals sit on `--surface` (or a
  slightly lighter `#141417`) with images `object-fit: contain` and padding as now.
  Optionally `filter: grayscale(1) opacity(0.85)` → full color on card hover (nice,
  cheap, on-theme).
- `SimulatorVisual`: rebuild as a monochrome chart — thin bars in
  `rgba(255,255,255,0.12)` with one bar in `--text-primary`, hairline baseline, mono
  axis labels in `--text-tertiary`. No lime, no cobalt, no bar shadows.
- Project number: plain mono text `01` in `--text-tertiary`, top-left — remove the bordered box.
- Kicker: mono `--text-tertiary` (currently cobalt).
- Tags: radius-full pills, hairline border, mono 0.6875rem, `--text-tertiary`.
- Links: `--text-secondary` → `--text-primary` on hover, keep `↗`.

### Experience (`src/components/sections/Experience.tsx`)

Structure is already right. Hairline row dividers (`--border`, not ink). Dates: mono
`--text-tertiary`. Company logos: 64px → 44px, `border-radius: var(--radius-sm)`,
hairline border, `filter: grayscale(1)` at `opacity: 0.7`, full color on row hover.
Role h3 → 1.25rem weight 500. Company line: `--text-secondary` sans (not cobalt
mono). "Now" pill → `color: var(--live); background: var(--live-bg); border: none`,
radius-full. Highlight list: keep the `+` prefix but in `--text-tertiary`.

### About (`src/components/sections/About.tsx`)

Remove `--soft-white` section bg, blue hard shadow, lime figcaption badge. Photo:
`radius-md`, hairline border, optional slight desaturation (`saturate(0.8)`). Caption
moves below the image as plain mono `--text-tertiary` text. Lead paragraph →
`1.375rem` weight 500 `--text-primary`; body `--text-secondary`. "Currently focused
on" block: keep, but border-left becomes `2px solid var(--border-strong)`.

### Skills (`src/components/sections/Skills.tsx`)

**Delete the lime band entirely** — this section becomes a normal dark section.
Simple 4-column grid (intro + 3 groups), no cell borders; each group: mono label
header in `--text-tertiary`, skill list items separated by hairlines in
`--text-secondary`. Intro line "Tools change. Systems thinking travels." at 1.25rem
`--text-primary`.

### Pulse (`src/components/sections/Pulse.tsx`)

**Do not touch `src/lib/activity.ts` or any data plumbing** — this is a pure reskin.
Three uniform cards, same treatment as project cards (`--surface`, hairline,
radius-md, min-height ~300px, not 540px). Delete: vinyl animation, equalizer, route
illustration, giant `↗` glyph, all card background colors.

- Card header: mono source name (`Apple Music`, `Google Health`, `Now`) left, status
  right with a `--live` dot when `connected` (gray dot otherwise).
- Music card: album art 96px radius-sm with hairline border (fallback: a neutral
  `--surface-hover` square with a music-note or `♪` mono glyph), track title
  1.125rem, artist `--text-secondary`.
- Health card: title + the existing `dl` stat grid, hairline-separated, mono `dt` /
  500-weight `dd`.
- Now card: mono `Summer 2026`, title, copy — text only.
- Integration note: keep, mono `--text-tertiary`, left-aligned.

### Contact (`src/components/sections/Contact.tsx`)

Remove cobalt background — same `--bg` as everything. Generous padding (160px
top/bottom desktop). Keep the label/heading grid. Email link: large
(`clamp(1.25rem, 2.5vw, 1.75rem)`), `--text-primary`, underline
`1px solid var(--border-strong)` that transitions to `--text-primary` on hover.
Below it, a small mono row of secondary links (GitHub / LinkedIn / Résumé) — pulls
the résumé link back in since the hero button set stays two-wide.

### Footer (`src/components/layout/Footer.tsx`)

Remove the black band (page is already dark). Top hairline, ~72px height, mono
0.6875rem `--text-tertiary` throughout, same three-part layout. Keep the tagline
("Designed as a living record…") — it's charming and now quiet.

## 7. Motion rules

- Allowed: `color`, `background`, `border-color`, `opacity`, `transform: scale`
  transitions at `var(--dur) var(--ease)`; the hero status dot may pulse
  (`box-shadow` ripple, 2s, subtle); one entrance fade on hero copy (`opacity` +
  `translateY(12px)`, 500ms).
- Banned: spinning, bouncing, translate-on-hover cards, rotated pseudo-elements,
  scroll-triggered animation libraries.
- **Keep** the existing `prefers-reduced-motion` block verbatim.

## 8. Implementation notes

**Files to change:**

- `src/app/globals.css` — full rewrite. Keep class names where this spec says "keep"
  so component diffs stay small.
- `src/app/layout.tsx` — fonts via `next/font/google`, `themeColor: "#0a0a0a"`,
  `colorScheme: "dark"`.
- All 7 section components in `src/components/sections/`, plus
  `src/components/layout/Header.tsx` and `src/components/layout/Footer.tsx`.

**Files NOT to change:**

- `src/lib/activity.ts`
- `src/app/page.tsx`
- `.env.example`
- All content configs: `src/content/config/site.ts`, `projects.ts`, `experience.ts`,
  `skills.ts`. One exception: the `visual` field in `projects.ts` becomes purely a
  placeholder-picker; leave the type as-is.

**Suggested order:**

1. Tokens + fonts + base/layout styles
2. Header / Footer
3. Hero
4. Projects
5. Experience / About / Skills
6. Pulse
7. Contact
8. Responsive pass at 375 / 768 / 1280
9. `npm run lint && npm run build`

**Constraints & guardrails:**

- No new dependencies except the font import.
- Contrast: `--text-tertiary` fails AA for small body text on `--bg` — use it only
  for mono labels/decoration; body copy must be `--text-secondary` or lighter.
- All copy stays exactly as written. This is a visual redesign only.
- `public/og.png` reflects the old design and should eventually be regenerated to
  match — separate task, not part of this implementation.
