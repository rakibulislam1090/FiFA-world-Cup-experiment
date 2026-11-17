# Claude Design: Bangladesh 2050 FIFA World Cup deck

How to use it:
1. Open claude.ai/design and create a new **Design System**. Paste **PART A** into its README.
2. Upload your real photos into the same project (see **PART C**).
3. Start a new **Slide deck** project, select that design system, and paste **PART B** into the chat.

---

## PART A: Design System README (paste into the Design System)

```markdown
# Bangladesh 2050 · Bid Design System

## Identity
A bold, colourful editorial ("sports magazine") look for a national FIFA World Cup 2050 hosting proposal.
Voice: confident, factual, hopeful. Never hype numbers; every figure carries its source.

## Colour tokens
- --night:   #0B1440  (deep navy, main background, 60%)
- --violet:  #5B2BD6  (energy colour, large blocks and gradients, 25%)
- --pitch:   #00B26B  (Bangladesh green, positive data, success)
- --sun:     #F42A41  (Bangladesh red, one hero accent per slide only)
- --gold:    #FFC83D  (key numbers and highlights)
- --sky:     #3FC1FF  (secondary data series)
- --paper:   #FFFFFF  (text on dark)
- --muted:   #B8C0E0  (captions and sources)
Gradients allowed: --night → --violet (135°). Text contrast ≥ 4.5:1.

## Typography
- Display / titles: "Montserrat" ExtraBold, tight tracking (-1%), sizes 44–96 px
- Body: "Inter" Regular/Medium, 18–24 px
- Numbers: Montserrat Bold with tabular figures
- Kicker labels: Inter SemiBold, ALL CAPS, letter-spacing 0.2em, 13 px, --sun
Fallbacks for PowerPoint export: Arial Black (display), Calibri (body).

## Motif
The "red sun" circle from the Bangladesh flag: a solid --sun dot that appears in the kicker label of every slide,
becomes the map pin on the venue slides, and becomes the "We are here" marker on the timeline.
Use it as the one recurring element that travels between slides (Morph/Magic Move).

## Layout grid
16:9, 1920×1080. 12 columns, 96 px outer margins, 24 px gutters.
Editorial asymmetry: one dominant visual (55–65% of the slide) plus one text column. Big numbers are the hero.
Never more than 40 words of body text on a slide; details go in speaker notes.

## Imagery rules
- Prefer REAL uploaded photography (stadiums, Dhaka skyline, Cox's Bazar coast, Sylhet tea hills, crowds).
- Photos get a --night gradient scrim from the text side (0% → 85%), never full darkening.
- Isometric illustrations allowed ONLY for concept diagrams (venue site plan, stadium cross-section),
  in flat --violet/--pitch/--gold colours, and labelled "Concept illustration".
- Do NOT generate fake photorealistic stadiums. If no real photo exists, use the isometric concept style instead.
- Do NOT use official FIFA logos, the World Cup trophy, or FIFA emblems (trademarks). Use "FIFA World Cup™" in text only.

## Motion rules
- Slide-to-slide: Morph (Keynote: Magic Move), 0.8–1.0 s, ease-in-out.
- Within a slide: kinetic typography (title slides in 40 px from the left, 0.4 s); numbers count up (0.8 s);
  cards stagger-fade 0.08 s apart.
- At most 3 build steps per slide. No spins, bounces or 3D flips.
- Morph needs the SAME object (same name) on both slides; name continuing objects with "!!" (e.g. "!!sun", "!!map").

## Sources footer
Every slide with a number has a 12 px --muted source line bottom-left:
"Source: Analysis, Section E · Hosting Country: Bangladesh · <specific reference>".
```

---

## PART B: Deck prompt (paste into the slide-deck chat)

```text
Create a 10-slide, 16:9 presentation using my "Bangladesh 2050 · Bid Design System".
Style: colourful sports-magazine editorial, like a modern Keynote. Dark navy and violet backgrounds,
bold Montserrat titles, giant gold numbers, and real stadium photography that I uploaded.
Story arc: Dream → Stage → Where → Flagship → Regions → Build → Money → Delivery → Legacy → Decision.
Audience: government ministers, a Board of Chief Officers, multinational sponsors and investors, designers and media.
Presenter-led on a big screen, 10–15 minutes. Put the full talk track in each slide's speaker notes.

Use ONLY the data below. Do not invent numbers. Keep the qualifiers ("planning assumption", "expected").
Mark every derived or estimated value as shown. Add the source footer from the design system.

Animation plan (build this exactly):
- Morph/Magic Move between every slide. The red-sun dot "!!sun" persists on every slide.
- 1→2: the cover's giant "2050" shrinks and moves into slide 2's top-left kicker.
- 2→3: the viewer bar chart fades while the "!!sun" dot flies onto the map of Bangladesh.
- 3→4: the map zooms into Dhaka (scale the map 3×, centred on Dhaka) and the Dhaka pin becomes slide 4's pin.
- 4→5: the Dhaka stadium photo shrinks into the first of four thumbnails; three regional photos slide in from the right.
- 6: build the stadium cross-section in 5 clicks (piles → bowl → pitch drainage → modular tier → roof).
- 7: "$7.49bn" counts up from 0; the three partner cards stagger in.
- 8: the "!!sun" marker travels along the timeline from 2026 to 2050 (Morph from slide 7's position).
- 9: the before/after legacy view: the upper tier slides up and fades (Morph between two states).
- 10: the four tests fade in one by one, then the three asks.

SLIDE 1 — COVER (Dream)
Full-bleed real night-stadium photo with a navy-to-violet scrim on the left.
Kicker: "FIFA WORLD CUP™ 2050 · HOSTING PROPOSAL"
Title: "BANGLADESH 2050" (giant; "2050" in gold)
Line: "Four cities. One nation. The world's game."
Small: "Planning proposal, not an approved bid."

SLIDE 2 — THE BIGGEST STAGE ON EARTH (Stage)
Hero number: "5 billion": people watched Qatar 2022.
Column chart, global viewers (billions): 2010 South Africa 3.2 · 2014 Brazil 3.2 · 2018 Russia 3.572 · 2022 Qatar 5.0 · 2026 USA/Canada/Mexico ≈6.0 (expected).
Side panel "Be clear about the money": FIFA revenue per edition (USD bn): 2010 3.655 · 2014 4.826 · 2018 5.357 · 2022 6.314 · 2026 ≈15 (reported/expected).
"FIFA keeps its own surplus (≈$4.49bn in 2022). Bangladesh's gain is visibility, tourism, infrastructure and investment."
Sources: FIFA Financial Report 2010; VOA News (2014 audience); FIFA 2018 audience report; FIFA Annual Report 2022; FIFA 2026 revenue statement.

SLIDE 3 — FOUR CITIES, 240,000 SEATS (Where)
Accurate map of Bangladesh (left 55%) with 4 pins sized by capacity:
1 Dhaka, Purbachal New Town: 85,000 seats · site score 88/100 · national flagship
2 Chattogram, Sagarika–Sitakunda corridor: 65,000 · 81/100 · port and airport hub
3 Cox's Bazar, inland northern outskirts: 45,000 · 74/100 · coastal tourism venue
4 Sylhet, northern/NE growth area: 45,000 · 76/100 · northeast gateway
Footnote: "Pins show approximate candidate areas, not final sites. Scores are preliminary planning assumptions (Analysis §4, §10.2)."

SLIDE 4 — PURBACHAL: THE NATIONAL FLAGSHIP (Flagship)
Right 55%: a real photo of a large stadium (or the Dhaka skyline) with a gold Dhaka pin.
Stats: 85,000 gross seats · 45–55 ha land envelope · 88/100 site score.
Isometric concept site plan: stadium precinct beside MRT Line 1 (planned), expressway/ring road,
a drainage and flood buffer, and access to Hazrat Shahjalal International Airport. Label: "Concept illustration".
Main risk: "Soft alluvial clay and waterlogging, so deep piled foundations and site drainage are needed."
Note: "Hosting the opening match or final depends on the final bid and FIFA's decisions."

SLIDE 5 — THREE REGIONAL HUBS (Regions)
Three photo cards (real photos: Chattogram port/city, Cox's Bazar coastline, Sylhet tea hills):
- Chattogram: 65,000 seats, stays 65,000. Port city, international airport, Dhaka–Chattogram highway. Risk: cyclone winds, storm surge, salt corrosion.
- Cox's Bazar: 45,000 → ≈25,000 after 2050 (removable upper tier). Rail, N1 highway, airport. Risk: cyclones, flooding, salinity.
- Sylhet: 45,000 → ≈20,000–25,000 after 2050. Osmani Airport, road and rail. Risk: seismic activity, flash floods.

SLIDE 6 — ENGINEERED FOR MONSOON, CYCLONE AND SOFT SOIL (Build)
Isometric cut-away stadium with 5 numbered callouts (built one per click):
1 Cyclone-resistant aerodynamic roof · 2 Modular removable upper tier (Cox's Bazar, Sylhet)
3 Permanent lower bowl · 4 SubAir-type vacuum pitch drainage for monsoon rain
5 Deep bored piles, 40–60 m initial concept, for soft alluvial soil
Footer: "Final specifications follow site studies, BNBC 2020 and independent structural review."

SLIDE 7 — THE INVESTMENT CASE (Money)
Hero: "$7.49bn": central (P50) capital estimate for the four-stadium programme, 2026 USD. Not a sanctioned budget.
Three facts: $13,500 per gross seat (Qatar reference class) · +28% risk contingency (average mega-project overrun, Flyvbjerg et al., 2002) · 16% interest during construction (8% × 50% × 4 years).
Small bar chart, contingency scenarios: P10 +10% · P50 +28% · P90 +55% (label P50 = $7.49bn only).
Three partner cards: Government (land, studies, security, legacy fund) · Development and green finance (masterplan, transport links, sustainability) · Sponsors and PPP partners (stadium naming rights, hotel districts, retail, concerts and conventions; PPP Act 2015).
Red note: "Excludes national transport networks, airport expansion, hotel districts and tournament operating costs."

SLIDE 8 — PHASE-GATED DELIVERY: 2026 → 2050 → 2060 (Delivery)
Timeline with 8 gates: 2026 Feasibility · 2030 Sites and delivery authority · 2034 Design · 2036 Finance and tender · 2038 Construction · 2046 Testing · 2050 Kick-off · 2060 Legacy. The red-sun marker sits at 2026: "We are here: Gate 0".
Chain of command: Cabinet/PM's Office → National Steering Committee → BWCDA Central PMO → 4 venue teams (+ an independent engineer and auditor reporting separately).
Top risks: Cost escalation (score 25/25) · Last-mile congestion (20/25) · Land, soil, hotels and legacy use (16/25), each with its control.
Note: "BWCDA is a proposed new statutory body; the dates are a proposed sequence, not a FIFA schedule."

SLIDE 9 — BUILD FOR 2050. RIGHT-SIZE FOR 2060 (Legacy)
Before/after isometric pair: 2050 tournament 45,000 seats → 2060 community ≈25,000 seats (upper tier removed and relocated to regional football academies if certified safe).
Three lessons: South Africa 2010, keep big venues only with regular use · Brazil 2014, avoid underused arenas (Manaus) · Qatar 2022, Stadium 974 showed designs can be dismantled.

SLIDE 10 — GO AHEAD ONLY IF ALL FOUR TESTS PASS (Decision)
Four tests with icons: technically feasible · financially responsible · environmentally and socially acceptable · credible legacy plan.
"Today we ask":
- Government: approve a Gate 0 feasibility study and the legal design of the BWCDA.
- Board of Chief Officers: own the responsibility matrix and the phase-gate controls.
- Sponsors and investors: join early market testing of PPP, naming-rights and hospitality packages.
Background: the cover stadium photo, dimmed.

Quality checks before finishing:
- No text overflow; at most 40 words of body text per slide; one hero accent (red) per slide.
- Every number above appears exactly as given, with its source footer.
- Charts are real, editable charts, not images.
- Export-ready for PowerPoint: keep Morph object names consistent between slides.
```

---

## PART C: Real photos to upload (find, check the licence, then upload)

Search Wikimedia Commons (commons.wikimedia.org) or Unsplash, keep only images whose licence allows reuse, and note the credit for each one.

| File name to use | What to search for | Used on |
|---|---|---|
| `stadium_night.jpg` | "football stadium night floodlights" | Slides 1, 10 |
| `dhaka_skyline.jpg` | "Dhaka skyline" | Slide 4 |
| `bangabandhu_stadium.jpg` | "Bangabandhu National Stadium Dhaka" | Slide 4 (inset, "existing venue") |
| `chattogram_port.jpg` | "Chittagong port" | Slide 5 |
| `coxs_bazar_beach.jpg` | "Cox's Bazar beach" | Slide 5 |
| `sylhet_tea_garden.jpg` | "Sylhet tea garden" | Slide 5 |
| `crowd_fans.jpg` | "football fans crowd Bangladesh" | Slide 2 (background) |

Add a credit line on each slide that uses a photo, e.g. "Photo: <author>, CC BY-SA 4.0, Wikimedia Commons".

Data source: Analysis doc, Section E > Hosting Country > Bangladesh (Md. Rakibul Islam, 2026).
Figures tagged "estimate" or "planning assumption" there are unverified and must keep that label.
