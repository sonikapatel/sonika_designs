# Porcelain Lift

## Essence
Quiet, tactile and native-feeling. Surfaces are white "porcelain" cards that float a few millimeters above a soft, cool-grey ground. There are no borders anywhere; depth comes from long, diffuse shadows. Type is heavy and confident at the top of the screen, then steps back into calm grey for everything supporting it. Each screen holds a single idea: an icon badge, a bold greeting, one or two inputs, and a weighty pill button at the bottom. The feel is unhurried and reassuring.

*Source: a single static screenshot, so all values are inferred by eye, not measured.*

## Color Palette

### Backgrounds
- Ground: a very light cool grey with a subtle top-to-bottom gradient (near `#F4F4F6` at the top to about `#ECECEF` at the bottom). It is never flat white.
- Surface: pure or near-white (`#FBFBFC`) for inputs and picker cards.
- Recessed tint: a mid-light grey (around `#E4E4E7`) for the icon badge and the picker's selection band.

### Text
- Primary: near-black (`#0A0A0A`) for headings and entered values.
- Secondary: mid grey (around `#8A8A8F`) for the subtitle, field labels and right-aligned meta.
- Tertiary: light grey (around `#B5B5BA`) for picker values away from the selection.

### Accents
- No hue accent in the screen. Emphasis comes only from contrast and weight.
- The primary action is a black-to-graphite vertical gradient.

### Semantic
- None visible. Errors can be inferred to use a single saturated red at small sizes.

### Borders and dividers
- None. Separation comes from shadow and whitespace only.

## Typography

### Families
- One neo-grotesque system sans (iOS system style) for everything. Weights used: Bold (headline), Medium (labels, button), Regular (body, values).

### Scale
| Level | Approx. size | Weight | Line height | Usage |
|---|---|---|---|---|
| Display | 34–36px | 700 | 1.1 | Screen greeting / question |
| Body large | 17–18px | 400 | 1.35 | Subtitle under heading |
| Input value | 18px | 400 | 1 | Typed text |
| Picker selected | 22px | 500 | 1 | Wheel center value |
| Label | 15px | 500 | 1.2 | Field label, meta on the right |
| Button | 18px | 500 | 1 | Primary action |

### Treatments
- Tight negative tracking on the display heading.
- Labels sit **above** fields, not inside them. A secondary value such as a computed age sits flush right on the same baseline as the label.
- Numbers use tabular figures in the picker.

## Spacing

### Base unit
8px rhythm, with generous vertical breathing room.

### Common values
- xs 8 · sm 12 · md 16–20 (input inner padding) · lg 24 (screen gutter) · xl 32–40 (between heading block and first field) · section gap ~28 between label/field pairs.
- The button sits low on the screen, with a large empty area above it. The content block does not stretch to fill the height.

## Elevation

### Shadows
- Card: very soft and wide. Roughly a 1px contact shadow plus a large blur (24–32px) with a negative spread, at low opacity. It reads as lift, not outline.
- Button: a stronger, tighter drop shadow under the dark pill that anchors it.

### Border radii
- Input / picker card: large, ~22–24px.
- Selection band: ~14px inside the card.
- Button: full pill.
- Icon badge: full circle (~64px).

## Interactive States

### Buttons
- Default: dark vertical gradient, white label, drop shadow, faint top highlight.
- Active (inferred): slight scale-down.
- Disabled (inferred): reduced opacity, shadow removed.

### Form inputs
- Default: white card, no border, soft shadow, value in primary text.
- Focus (inferred): keep the card. Add a thin ring rather than changing the fill.

### Picker (wheel)
- Values scroll vertically and snap to a center selection band.
- Values shrink and fade with distance from the center, with about two visible above and two below.

## Motion

### Principles
Physical and native. Momentum scrolling with snap on the wheel. Buttons press down rather than flash. Nothing bounces.

### Patterns
- Wheel: scroll-snap, values scale/fade continuously by distance.
- Button press: quick scale to ~0.97, ease-out.
- Screen change: gentle horizontal push.

## Design Principles
- **Depth over lines.** Cards lift with shadow; nothing is outlined.
- **One idea per screen.** Badge, heading, and the fewest fields that answer it.
- **Labels outside, meaning alongside.** Static labels with live, right-aligned context such as an age.
- **Heavy top, calm body.** Bold heading, grey everything else.
- **Weighty primary action.** A single dark pill sitting low on the screen.

## Implementation Notes
- Tokens worth keeping: `--bg-top`, `--bg-bot`, `--surface`, `--shadow-card`, `--cta-top`, `--cta-bot`, `--cta-shadow`, `--wheel-band`, `--badge-bg`.
- The wheel works with CSS `scroll-snap-type: y mandatory` columns, 44px rows, two rows of padding top and bottom, a `mask-image` fade, and a rAF-throttled scroll handler that sets each row's `opacity`/`transform` directly.

---

## Adaptation to the intake app

How the system was mapped onto the existing palette (mist `#D5FFFF`, aqua `#B9F3F2`, cherry `#B21B1D`, snow `#FBFFFF`, sea `#83C3C4`):

| Primitive | Source system | In the intake app |
|---|---|---|
| Ground | Cool grey gradient | Snow → faint sea-tinted gradient (`#FBFFFF` → `#ECF7F7`) |
| Surface cards | White, borderless, diffuse shadow | Same, with a teal-ink shadow tint. Applied to inputs, choice rows, chips, tiles, consents and review cards |
| Selection | Grey band | Mist fill + deep-teal ring for choices; pale aqua band for the wheel |
| Icon badge | Grey circle, black glyph | Aqua circle, deep-teal glyph, one icon per intake section |
| Heading | Bold, tight tracking | Outfit 600, −0.025em |
| Labels | Static above field, meta right | Same. Right-side meta shows the age, "From card" or "Optional" |
| Primary button | Black→graphite gradient pill | Deep ink → slate-teal gradient pill. In dark mode it flips to mist → aqua |
| Picker | Year wheel | Month / Day / Year wheel for date of birth, with the age shown in the label row |
| Brand red | n/a | Kept for progress, emergency/allergy markers and errors only |
