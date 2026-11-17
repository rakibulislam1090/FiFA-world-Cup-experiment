// Bangladesh 2050 — 10-slide story deck (v2, cinematic)
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const fs = require("fs");
const React = require("react");
const RDS = require("react-dom/server");
const fa = require("react-icons/fa");
const { applyTheme } = require("/root/.claude/skills/synced/cea9d913-f49b-4ae4-9cbe-02d3f2c5e266_ce37c8f7-a30b-40ea-985e-2c956e1c82e0/pptx/scripts/apply_theme.js");

const A = __dirname + "/assets/";
const HEX = { bg: "040C09", card: "0E2219", white: "FFFFFF", muted: "B9C7C0", gold: "FFC23D", green: "1FBF7A", red: "F42A41", sky: "4FB3FF", orange: "FF9340", violet: "9D8CFF" };
const THEME = {
  name: "Bangladesh 2050 Cinematic",
  headFontFace: "Arial", bodyFontFace: "Calibri",
  colors: { dk1: HEX.bg, lt1: HEX.white, dk2: HEX.card, lt2: HEX.muted, accent1: HEX.gold, accent2: HEX.green, accent3: HEX.red, accent4: HEX.sky, accent5: HEX.orange, accent6: HEX.violet, hlink: HEX.sky, folHlink: HEX.violet },
};
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Bangladesh 2050: Four Cities, One World Cup";
pres.author = "Md. Rakibul Islam";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const img = f => "image/png;base64," + fs.readFileSync(A + f).toString("base64");
async function icon(Comp, color = "#FFFFFF") {
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color, size: 256 }));
  return "image/png;base64," + (await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer()).toString("base64");
}

(async () => {
  const I = {};
  for (const [k, v] of Object.entries({ gov: fa.FaLandmark, leaf: fa.FaLeaf, hand: fa.FaHandshake, hard: fa.FaHardHat, money: fa.FaCoins, recycle: fa.FaRecycle, users: fa.FaUsers, globe: fa.FaGlobeAsia, plane: fa.FaPlaneArrival, hotel: fa.FaHotel, tv: fa.FaTv, star: fa.FaStar }))
    I[k] = await icon(v);

  pres.defineSlideMaster({ title: "FULL", background: { color: HEX.bg }, objects: [] });
  pres.defineSlideMaster({
    title: "STORY",
    background: { data: img("bg.png") },
    objects: [
      { placeholder: { options: { name: "kicker", type: "body", x: 0.95, y: 0.45, w: 8, h: 0.3, fontSize: 12, bold: true, color: C.accent3, charSpacing: 4, margin: 0, valign: "middle" }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.8, w: 12.1, h: 0.75, fontSize: 36, bold: true, color: C.background1, fontFace: "Arial", margin: 0, align: "left", valign: "top" }, text: "" } },
      { placeholder: { options: { name: "source", type: "body", x: 0.6, y: 7.0, w: 11.2, h: 0.3, fontSize: 9, color: C.background2, margin: 0, valign: "middle" }, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 7.0, w: 0.45, h: 0.3, fontSize: 10, color: "FFC23D", align: "right" },
  });

  const T = (s, text, o) => s.addText(text, Object.assign({ isTextBox: true, margin: 0, fontSize: 16, color: C.background1, valign: "top" }, o));
  const disc = (s, x, y, d, color, name) => s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color, width: 0 }, objectName: name });
  const shadow = () => ({ type: "outer", color: "000000", blur: 12, offset: 4, angle: 90, opacity: 0.45 });
  const card = (s, x, y, w, h, name, o = {}) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.14, fill: { color: o.fill || C.text2, transparency: o.tr ?? 0 }, line: { color: o.line || C.text2, width: o.lw || 0 }, shadow: shadow(), objectName: name });
  const iconDisc = (s, x, y, d, ic, color, name) => { disc(s, x, y, d, color, name + " disc"); const p = d * 0.25; s.addImage({ data: ic, x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: name, altText: name }); };
  let sec = "";
  const section = t => { sec = t; pres.addSection({ title: t }); };
  function story(kicker, title, source) {
    const s = pres.addSlide({ masterName: "STORY", sectionTitle: sec });
    disc(s, 0.6, 0.48, 0.24, C.accent3, "Kicker sun");
    s.addText(kicker.toUpperCase(), { placeholder: "kicker" });
    s.addText(title, { placeholder: "title" });
    if (source) s.addText(source, { placeholder: "source" });
    return s;
  }

  // ===================================================== 1 COVER
  section("Act 1 · The dream");
  {
    const s = pres.addSlide({ masterName: "FULL", sectionTitle: sec });
    s.addImage({ data: img("cover.png"), x: 0, y: 0, w: 13.333, h: 7.5, objectName: "Cover stadium", altText: "Illustration of a floodlit football stadium at night with a city skyline" });
    disc(s, 0.8, 1.35, 0.42, C.accent3, "Cover sun");
    T(s, "FIFA WORLD CUP™ 2050  ·  HOSTING PROPOSAL", { x: 1.4, y: 1.35, w: 7, h: 0.42, fontSize: 14, bold: true, color: C.accent1, charSpacing: 4, valign: "middle" });
    T(s, [{ text: "BANGLADESH", options: { breakLine: true } }, { text: "2050", options: { color: C.accent1 } }], { x: 0.8, y: 1.95, w: 9.0, h: 2.5, fontSize: 68, bold: true, fontFace: "Arial" });
    T(s, "Four cities. One nation. The world's game.", { x: 0.8, y: 4.6, w: 7, h: 0.5, fontSize: 24, color: C.background1 });
    T(s, "Government of Bangladesh  ·  Board of Chief Officers  ·  Sponsor & investor partners", { x: 0.8, y: 5.6, w: 7.5, h: 0.35, fontSize: 13, color: C.background2 });
    T(s, "Planning proposal, not an approved bid. Source: Analysis, Section E > Hosting Country > Bangladesh.", { x: 0.8, y: 6.75, w: 9, h: 0.3, fontSize: 10, italic: true, color: C.background2 });
    s.addNotes("Imagine the opening whistle of the 2050 World Cup in Dhaka. This is a planning proposal, not an approved bid. In the next ten slides: why the World Cup, where Bangladesh would play, how we build it, what it costs, how we deliver it, and what stays behind for the next generation.");
  }

  // ===================================================== 2 THE STAGE
  {
    const s = story("Why the World Cup", "The biggest stage on Earth",
      "Sources: FIFA 2018 audience report; FIFA Annual Report 2022; FIFA 2026 revenue statement. 2026 figures are expected, not final. 2022 surplus is approximate.");
    T(s, "5 billion", { x: 0.6, y: 1.9, w: 7, h: 1.4, fontSize: 96, bold: true, color: C.accent1, fontFace: "Arial" });
    T(s, "people watched Qatar 2022. Around 6 billion are expected for 2026.", { x: 0.6, y: 3.3, w: 6.6, h: 0.8, fontSize: 22 });
    s.addChart(pres.charts.BAR, [{ name: "Viewers (bn)", labels: ["2010", "2014", "2018", "2022", "2026*"], values: [3.2, 3.2, 3.57, 5.0, 6.0] }], {
      x: 0.5, y: 4.25, w: 6.6, h: 2.5, barDir: "col", chartColors: ["2E5E4B", "2E5E4B", "2E5E4B", "FFC23D", "1FBF7A"], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0#\"bn\"",
      dataLabelColor: "FFFFFF", dataLabelFontFace: "+mn-lt", dataLabelFontSize: 13, catAxisLabelColor: "B9C7C0", catAxisLabelFontFace: "+mn-lt", catAxisLabelFontSize: 13, valAxisHidden: true,
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, catAxisLineShow: false, showLegend: false, barGapWidthPct: 35, objectName: "Viewers chart" });
    card(s, 7.7, 1.9, 5.0, 4.85, "Value card");
    T(s, "Be clear about the money", { x: 8.05, y: 2.15, w: 4.4, h: 0.4, fontSize: 18, bold: true, color: C.accent1 });
    T(s, [{ text: "FIFA keeps its own surplus ", options: { bold: true } }, { text: "(≈$4.49bn in 2022) from broadcasting and sponsorship.", options: { color: C.background2 } }], { x: 8.05, y: 2.7, w: 4.4, h: 1.0, fontSize: 16 });
    T(s, "Bangladesh's gain is different:", { x: 8.05, y: 3.85, w: 4.4, h: 0.4, fontSize: 16, bold: true });
    [[I.globe, "Global visibility & tourism", C.accent4], [I.hard, "Lasting infrastructure", C.accent2], [I.hand, "Investment & local business", C.accent1]].forEach((r, i) => {
      const y = 4.4 + i * 0.72;
      iconDisc(s, 8.05, y, 0.52, r[0], r[2], r[1] + " icon");
      T(s, r[1], { x: 8.75, y, w: 3.8, h: 0.52, fontSize: 16, valign: "middle" });
    });
    s.addNotes("Five billion people watched Qatar 2022, and about six billion are expected for 2026. But be clear about the money: FIFA keeps its surplus, about 4.5 billion dollars in 2022. Bangladesh's gain comes from global visibility, tourism, lasting infrastructure and private investment.");
  }

  // ===================================================== 3 MAP
  section("Act 2 · Where we play");
  {
    const s = pres.addSlide({ masterName: "STORY", sectionTitle: sec });
    const M = JSON.parse(fs.readFileSync(A + "map.json"));
    const mh = 7.5, mw = mh * M.W / M.H, mx = 0, my = 0;
    s.addImage({ data: img("map.png"), x: mx, y: my, w: mw, h: mh, objectName: "Bangladesh map", altText: "Map of Bangladesh with neighbouring countries and the Bay of Bengal" });
    const P = (lon, lat) => [mx + (lon - M.L0) / (M.L1 - M.L0) * mw, my + (M.A1 - lat) / (M.A1 - M.A0) * mh];
    const cities = [
      ["1", "Dhaka", "Purbachal New Town", 85, 90.50, 23.84, C.accent1, "Flagship venue · score 88/100", "left"],
      ["2", "Chattogram", "Outer metro, Sagarika–Sitakunda", 65, 91.74, 22.45, C.accent4, "Port & airport hub · 81/100", "left"],
      ["3", "Cox's Bazar", "Inland northern outskirts", 45, 92.02, 21.45, C.accent5, "Coastal tourism venue · 74/100", "left"],
      ["4", "Sylhet", "Northern / NE growth area", 45, 91.87, 24.90, C.accent2, "Northeast gateway · 76/100", "right"],
    ];
    cities.forEach(c => {
      const [x, y] = P(c[4], c[5]); const d = 0.28 + c[3] / 85 * 0.32;
      s.addShape(pres.shapes.OVAL, { x: x - d, y: y - d, w: d * 2, h: d * 2, fill: { color: c[6], transparency: 75 }, line: { color: c[6], width: 1 }, objectName: c[1] + " halo" });
      s.addShape(pres.shapes.OVAL, { x: x - 0.17, y: y - 0.17, w: 0.34, h: 0.34, fill: { color: c[6] }, line: { color: C.background1, width: 2 }, objectName: c[1] + " pin" });
      T(s, c[0], { x: x - 0.17, y: y - 0.17, w: 0.34, h: 0.34, fontSize: 12, bold: true, color: C.text1, align: "center", valign: "middle" });
    });
    // right panel text
    disc(s, 7.25, 0.62, 0.24, C.accent3, "Kicker sun");
    T(s, "WHERE WE PLAY", { x: 7.6, y: 0.6, w: 5, h: 0.3, fontSize: 12, bold: true, color: C.accent3, charSpacing: 4, valign: "middle" });
    T(s, "Four cities, 240,000 seats", { x: 7.25, y: 0.95, w: 5.6, h: 0.7, fontSize: 32, bold: true, fontFace: "Arial" });
    cities.forEach((c, i) => {
      const y = 1.95 + i * 1.18;
      card(s, 7.25, y, 5.5, 1.02, c[1] + " card");
      disc(s, 7.42, y + 0.29, 0.44, c[6], c[1] + " number");
      T(s, c[0], { x: 7.42, y: y + 0.29, w: 0.44, h: 0.44, fontSize: 16, bold: true, color: C.text1, align: "center", valign: "middle" });
      T(s, [{ text: c[1], options: { bold: true, fontSize: 18, breakLine: true } }, { text: c[2], options: { fontSize: 13, color: C.background2 } }], { x: 8.02, y: y + 0.12, w: 2.6, h: 0.8, valign: "middle" });
      T(s, [{ text: c[3] + ",000", options: { bold: true, fontSize: 24, color: c[6], breakLine: true, fontFace: "Arial" } }, { text: c[7], options: { fontSize: 11, color: C.background2 } }], { x: 10.5, y: y + 0.1, w: 2.1, h: 0.85, align: "right", valign: "middle" });
    });
    T(s, "Pins mark approximate candidate areas, not final sites. Scores are preliminary planning assumptions. Source: Analysis §4, §10.2. Basemap: Natural Earth (public domain).",
      { x: 7.25, y: 6.75, w: 5.0, h: 0.5, fontSize: 9, color: C.background2 });
    s.addNotes("Here is the map. Four candidate host cities spread across the country. Dhaka at Purbachal is the 85,000-seat flagship. Chattogram is the port and airport hub. Cox's Bazar links the tournament to coastal tourism. Sylhet is the gateway to the northeast. Together they give 240,000 tournament seats. Halo size shows capacity.");
  }

  // ===================================================== 4 DHAKA SPOTLIGHT
  {
    const s = pres.addSlide({ masterName: "STORY", sectionTitle: sec });
    s.addImage({ data: img("st_dhaka.png"), x: 5.9, y: 0, w: 7.433, h: 7.5, sizing: { type: "cover", w: 7.433, h: 7.5 }, objectName: "Dhaka stadium concept", altText: "Concept illustration of an 85,000-seat stadium with Dhaka skyline" });
    disc(s, 0.6, 0.48, 0.24, C.accent3, "Kicker sun");
    T(s, "HOST CITY 01 · DHAKA", { x: 0.95, y: 0.45, w: 5, h: 0.3, fontSize: 12, bold: true, color: C.accent3, charSpacing: 4, valign: "middle" });
    T(s, "Purbachal: the national flagship", { x: 0.6, y: 0.8, w: 5.2, h: 1.2, fontSize: 32, bold: true, fontFace: "Arial" });
    const st = [["85,000", "gross seats"], ["45–55 ha", "land envelope"], ["88/100", "site score"]];
    st.forEach((v, i) => { const x = 0.6 + i * 1.75; T(s, v[0], { x, y: 2.1, w: 1.7, h: 0.55, fontSize: 24, bold: true, color: C.accent1, fontFace: "Arial" }); T(s, v[1], { x, y: 2.65, w: 1.7, h: 0.3, fontSize: 13, color: C.background2 }); });
    card(s, 0.6, 3.15, 5.0, 2.85, "Site plan card");
    s.addImage({ data: img("siteplan.png"), x: 0.75, y: 3.3, w: 2.95, h: 2.21, objectName: "Purbachal concept site plan", altText: "Schematic site plan: stadium precinct beside MRT line, expressway and waterway" });
    [["F42A41", "MRT Line 1 (planned)"], ["C3CBE6", "Expressway / ring road"], ["1E5D8C", "Drainage & flood buffer"], ["FFC23D", "Stadium precinct"]].forEach((l, i) => {
      s.addShape(pres.shapes.RECTANGLE, { x: 3.85, y: 3.42 + i * 0.5, w: 0.22, h: 0.22, fill: { color: l[0] }, line: { color: l[0], width: 0 }, objectName: "Legend " + l[1] });
      T(s, l[1], { x: 4.15, y: 3.36 + i * 0.5, w: 1.4, h: 0.4, fontSize: 11, color: C.background1 });
    });
    T(s, "Concept illustration, not a site survey. HSIA airport access via expressway.", { x: 0.75, y: 5.58, w: 4.75, h: 0.35, fontSize: 10, italic: true, color: C.background2 });
    T(s, [{ text: "Main risk: ", options: { bold: true, color: C.accent3 } }, { text: "soft alluvial clay and waterlogging, so deep piled foundations and site drainage are needed." }], { x: 0.6, y: 6.15, w: 5.1, h: 0.7, fontSize: 14 });
    T(s, "Source: Analysis §4, §6.1, §10.2. Hosting the opening or final depends on the final bid and FIFA's decisions.", { x: 0.6, y: 7.0, w: 5.3, h: 0.3, fontSize: 9, color: C.background2 });
    s.addNotes("Our flagship is Purbachal New Town in Dhaka: 85,000 gross seats on 45 to 55 hectares, scoring 88 out of 100. It is planned to connect with MRT Line 1, the expressway and Hazrat Shahjalal International Airport. The main challenge is soft alluvial clay and waterlogging, which need deep piled foundations. Whether it hosts the opening or final depends on FIFA.");
  }

  // ===================================================== 5 REGIONAL HUBS
  {
    const s = story("Host cities 02–04", "Three regional hubs, each with its own story",
      "Source: Analysis §4, §6.2–6.4, §16. Illustrations are concepts. Post-tournament capacities are subject to demand studies.");
    const hubs = [
      ["st_ctg.png", "Chattogram", "65,000", "Stays 65,000", "Port city, international airport, Dhaka–Ctg highway", "Cyclone winds, storm surge, salt corrosion", C.accent4],
      ["st_cox.png", "Cox's Bazar", "45,000", "→ ≈25,000 after 2050", "Coastal tourism capital; rail, N1 highway, airport", "Cyclones, flooding, salinity", C.accent5],
      ["st_syl.png", "Sylhet", "45,000", "→ ≈20,000–25,000", "Tea-garden gateway; Osmani Airport, road & rail", "Seismic risk, flash floods", C.accent2],
    ];
    hubs.forEach((h, i) => {
      const x = 0.6 + i * 4.12, w = 3.88;
      card(s, x, 1.75, w, 5.05, h[1] + " card");
      s.addImage({ data: img(h[0]), x: x + 0.1, y: 1.85, w: w - 0.2, h: 2.2, sizing: { type: "cover", w: w - 0.2, h: 2.2 }, rounding: false, objectName: h[1] + " stadium", altText: h[1] + " stadium concept illustration" });
      T(s, h[1], { x: x + 0.25, y: 4.2, w: 2.2, h: 0.45, fontSize: 20, bold: true });
      T(s, h[2], { x: x + 2.0, y: 4.2, w: 1.65, h: 0.45, fontSize: 20, bold: true, color: h[6], align: "right", fontFace: "Arial" });
      T(s, h[3], { x: x + 0.25, y: 4.68, w: w - 0.5, h: 0.32, fontSize: 13, bold: true, color: h[6] });
      T(s, h[4], { x: x + 0.25, y: 5.1, w: w - 0.5, h: 0.7, fontSize: 14 });
      T(s, [{ text: "Risk: ", options: { bold: true, color: C.accent3 } }, { text: h[5], options: { color: C.background2 } }], { x: x + 0.25, y: 5.95, w: w - 0.5, h: 0.65, fontSize: 13 });
    });
    s.addNotes("Our three regional hubs. Chattogram, at 65,000 seats, uses the port and airport but must resist cyclone winds and salt air. Cox's Bazar, at 45,000, puts the World Cup next to the world's longest natural sea beach on safer inland land. Sylhet, at 45,000, is the tea-country gateway. The orange dashed ring marks a removable upper tier: after 2050 these two venues shrink to match local demand.");
  }

  // ===================================================== 6 ENGINEERING
  section("Act 3 · How we build it");
  {
    const s = story("Built for Bangladesh", "Engineered for monsoon, cyclone and soft soil",
      "Source: Analysis §5.1, §11.2. Pile depths, roof loads and drainage rates must come from site studies, BNBC 2020 and independent structural review. Schematic, not to scale.");
    const ix = 2.6, iy = 1.95, iw = 8.1, ih = iw / 2;
    s.addImage({ data: img("section.png"), x: ix, y: iy, w: iw, h: ih, objectName: "Stadium cross-section", altText: "Cross-section of a stadium showing roof, modular upper tier, lower bowl, drained pitch and deep piles" });
    const call = [
      ["1", "Cyclone-resistant roof", "Aerodynamic form and wind-load engineering", ix + iw * 0.1, iy + ih * 0.06, 0.6, 1.75, C.background1, "left"],
      ["2", "Modular upper tier", "Removable seats at Cox's Bazar & Sylhet", ix + iw * 0.885, iy + ih * 0.28, 11.55, 2.0, C.accent5, "right"],
      ["3", "Permanent lower bowl", "Stays in use after the tournament", ix + iw * 0.27, iy + ih * 0.55, 0.6, 3.75, C.accent4, "left"],
      ["4", "SubAir-type pitch drainage", "Vacuum drainage & root-zone aeration for monsoon rain", ix + iw * 0.5, iy + ih * 0.66, 11.55, 3.85, C.accent2, "right"],
      ["5", "Deep piles, 40–60 m", "Foundations for soft alluvial soils", ix + iw * 0.12, iy + ih * 0.85, 0.6, 5.6, C.accent1, "left"],
    ];
    call.forEach(c => {
      disc(s, c[3] - 0.2, c[4] - 0.2, 0.4, c[7], "Marker " + c[0]);
      T(s, c[0], { x: c[3] - 0.2, y: c[4] - 0.2, w: 0.4, h: 0.4, fontSize: 14, bold: true, color: C.text1, align: "center", valign: "middle" });
      const left = c[8] === "left";
      T(s, [{ text: c[0] + "  " + c[1], options: { bold: true, color: c[7], breakLine: true } }, { text: c[2], options: { fontSize: 12, color: C.background2 } }],
        { x: left ? 0.5 : 10.85, y: c[6], w: 2.0, h: 1.0, fontSize: 13, align: left ? "left" : "right" });
    });
    s.addNotes("This is how we build for Bangladesh. One: a cyclone-resistant, aerodynamic roof. Two: a modular upper tier that can be removed after the tournament. Three: a permanent lower bowl. Four: a vacuum-assisted pitch drainage system that clears monsoon rain. Five: deep bored piles, 40 to 60 metres as an initial concept, for soft river soils. Final specifications come from site studies and the national building code.");
  }

  // ===================================================== 7 INVESTMENT
  {
    const s = story("The investment", "The investment case, and where partners fit",
      "Source: Analysis §5, §5.2, §8, §11 Table 4, §13.2, §16. P50 includes a 28% contingency (Flyvbjerg, Holm & Buhl, 2002). Not a sanctioned budget.");
    T(s, "$7.49bn", { x: 0.6, y: 1.85, w: 5.6, h: 1.3, fontSize: 88, bold: true, color: C.accent1, fontFace: "Arial" });
    T(s, "central (P50) capital estimate for the four-stadium programme, 2026 USD", { x: 0.6, y: 3.15, w: 5.4, h: 0.7, fontSize: 18 });
    [["$13,500", "benchmark per gross seat (Qatar reference class)"], ["+28%", "risk contingency: the average mega-project overrun"], ["16%", "interest during construction (8% × 50% × 4 yrs)"]].forEach((v, i) => {
      const y = 4.1 + i * 0.75;
      T(s, v[0], { x: 0.6, y, w: 1.6, h: 0.6, fontSize: 22, bold: true, color: C.accent2, fontFace: "Arial", valign: "middle" });
      T(s, v[1], { x: 2.25, y, w: 3.9, h: 0.6, fontSize: 14, color: C.background2, valign: "middle" });
    });
    T(s, "Excludes national transport networks, airport expansion, hotel districts and tournament operating costs.", { x: 0.6, y: 6.35, w: 5.6, h: 0.55, fontSize: 12, italic: true, color: C.accent3 });
    const P = [
      [I.gov, "Government", "Land, site studies, security, national legacy fund", C.accent4],
      [I.leaf, "Development & green finance", "Masterplan, transport links, sustainability package", C.accent2],
      [I.hand, "Sponsors & PPP partners", "Stadium naming rights, hotel districts, retail, concerts & conventions", C.accent1],
    ];
    T(s, "Where partners fit", { x: 6.8, y: 1.85, w: 5.9, h: 0.4, fontSize: 18, bold: true });
    P.forEach((p, i) => {
      const y = 2.4 + i * 1.3;
      card(s, 6.8, y, 5.9, 1.12, p[1] + " card");
      iconDisc(s, 7.0, y + 0.23, 0.66, p[0], p[3], p[1] + " icon");
      T(s, [{ text: p[1], options: { bold: true, fontSize: 17, breakLine: true, color: p[3] } }, { text: p[2], options: { fontSize: 14, color: C.background1 } }], { x: 7.85, y: y + 0.1, w: 4.7, h: 0.92, valign: "middle" });
    });
    card(s, 6.8, 6.3, 5.9, 0.6, "Safeguard", { fill: "0F3B2C", line: C.accent2, lw: 1 });
    T(s, "Safeguards: transparent e-procurement, clear PPP risk allocation (PPP Act 2015)", { x: 7.0, y: 6.3, w: 5.6, h: 0.6, fontSize: 13, valign: "middle" });
    s.addNotes("The central estimate is about 7.49 billion dollars for the four stadiums. It is built from a Qatar benchmark of 13,500 dollars per seat, a 28 percent risk contingency based on mega-project evidence, and interest during construction. It is not a sanctioned budget and it excludes national transport, airports and hotels. Partners fit in three ways: government, development and green finance, and sponsors through PPPs, naming rights, hotels and events.");
  }

  // ===================================================== 8 DELIVERY
  section("Act 4 · How we deliver");
  {
    const s = story("Discipline", "Phase-gated delivery: 2026 → 2050 → 2060",
      "Source: Analysis §1, §12, §14. Proposed sequence, not a confirmed FIFA schedule. BWCDA is a proposed new statutory body. Risk score = likelihood × impact.");
    const ph = [["2026", "Feasibility"], ["2030", "Sites & authority"], ["2034", "Design"], ["2036", "Finance & tender"], ["2038", "Construction"], ["2046", "Testing"], ["2050", "Kick-off"], ["2060", "Legacy"]];
    const x0 = 0.9, x1 = 12.4, y = 2.85;
    s.addShape(pres.shapes.LINE, { x: x0, y, w: x1 - x0, h: 0, line: { color: C.background2, width: 2 }, objectName: "Timeline" });
    ph.forEach((p, i) => {
      const x = x0 + (x1 - x0) * i / 7; const hot = p[0] === "2050";
      const d = hot ? 0.6 : 0.36;
      disc(s, x - d / 2, y - d / 2, d, hot ? C.accent3 : (i === 0 ? C.accent1 : C.text2), "Gate " + i);
      if (!hot) s.addShape(pres.shapes.OVAL, { x: x - d / 2, y: y - d / 2, w: d, h: d, fill: { color: i === 0 ? C.accent1 : C.text2 }, line: { color: i === 0 ? C.accent1 : C.background2, width: 1.5 }, objectName: "Gate ring " + i });
      T(s, p[0], { x: x - 0.75, y: y - 1.0, w: 1.5, h: 0.4, fontSize: 18, bold: true, color: hot ? C.accent3 : C.accent1, align: "center", fontFace: "Arial" });
      T(s, p[1], { x: x - 0.8, y: y + 0.45, w: 1.6, h: 0.5, fontSize: 13, align: "center", color: C.background1 });
    });
    T(s, "◀ We are here: Gate 0", { x: 0.55, y: 3.65, w: 2.5, h: 0.3, fontSize: 12, bold: true, color: C.accent1 });
    // governance chain
    T(s, "One chain of command", { x: 0.6, y: 4.1, w: 6, h: 0.4, fontSize: 18, bold: true });
    const chain = [["Cabinet / PMO", C.accent1], ["Steering Committee", C.accent1], ["BWCDA Central PMO", C.accent1], ["4 Venue Teams", C.accent2]];
    chain.forEach((c, i) => {
      const x = 0.6 + i * 1.62;
      card(s, x, 4.6, 1.42, 1.0, c[0], { line: c[1], lw: 1.5 });
      T(s, c[0], { x: x + 0.08, y: 4.6, w: 1.26, h: 1.0, fontSize: 13, bold: true, align: "center", valign: "middle" });
      if (i < 3) T(s, "›", { x: x + 1.42, y: 4.6, w: 0.2, h: 1.0, fontSize: 22, bold: true, color: C.accent1, align: "center", valign: "middle" });
    });
    T(s, "+ Independent Engineer & Auditor reporting separately", { x: 0.6, y: 5.75, w: 6.3, h: 0.35, fontSize: 13, italic: true, color: C.background2 });
    // top risks
    T(s, "Top risks, actively controlled", { x: 7.3, y: 4.1, w: 5.4, h: 0.4, fontSize: 18, bold: true });
    [["25", "Cost escalation", "Reference-class budgets, EVM alerts at CPI < 0.95 / 0.90", C.accent3], ["20", "Last-mile congestion", "Mass transit, shuttles, park-and-ride, traffic trials", C.accent3], ["16", "Land, soil, hotels, legacy use", "Early title checks, geotech, demand audits", C.accent5]].forEach((r, i) => {
      const yy = 4.6 + i * 0.72;
      disc(s, 7.3, yy, 0.56, r[3], "Risk score " + r[0]);
      T(s, r[0], { x: 7.3, y: yy, w: 0.56, h: 0.56, fontSize: 15, bold: true, color: C.text1, align: "center", valign: "middle" });
      T(s, [{ text: r[1], options: { bold: true, breakLine: true } }, { text: r[2], options: { fontSize: 12, color: C.background2 } }], { x: 8.0, y: yy - 0.04, w: 4.7, h: 0.66, fontSize: 15, valign: "middle" });
    });
    s.addNotes("Delivery follows a phase-gated path. We are at Gate 0 now: feasibility. Sites and the delivery authority follow from 2030, design from 2034, finance from 2036, construction from 2038, testing from 2046, kick-off in 2050, and legacy until 2060. One chain of command runs from Cabinet to four venue teams, with an independent engineer. The top risks are cost escalation, scored 25, and last-mile congestion, scored 20, each with a named control.");
  }

  // ===================================================== 9 LEGACY
  section("Act 5 · What stays behind");
  {
    const s = story("Legacy", "Build for 2050. Right-size for 2060",
      "Source: Analysis §11 Tables 1–3, §7, §16. Reuse and savings must be proven by engineering and demand studies, not assumed. Schematic, not to scale.");
    card(s, 0.6, 1.75, 5.6, 3.6, "Before card");
    s.addImage({ data: img("sec_before.png"), x: 0.75, y: 2.4, w: 5.3, h: 2.65, objectName: "Tournament configuration", altText: "Stadium section with orange modular upper tier installed" });
    T(s, [{ text: "2050 · Tournament  ", options: { bold: true, color: C.accent5 } }, { text: "45,000 seats", options: { bold: true } }], { x: 0.85, y: 1.9, w: 5.2, h: 0.4, fontSize: 18 });
    T(s, "➜", { x: 6.25, y: 3.2, w: 0.85, h: 0.7, fontSize: 36, bold: true, color: C.accent1, align: "center", valign: "middle" });
    card(s, 7.1, 1.75, 5.6, 3.6, "After card");
    s.addImage({ data: img("sec_after.png"), x: 7.25, y: 2.4, w: 5.3, h: 2.65, objectName: "Legacy configuration", altText: "Same stadium section with upper tier removed, shown as dashed outline" });
    T(s, [{ text: "2060 · Community  ", options: { bold: true, color: C.accent2 } }, { text: "≈25,000 seats", options: { bold: true } }], { x: 7.35, y: 1.9, w: 5.2, h: 0.4, fontSize: 18 });
    const L = [["South Africa 2010", "Keep big venues only with regular use"], ["Brazil 2014", "Avoid underused arenas like Manaus"], ["Qatar 2022", "Stadium 974 proved designs can be dismantled"]];
    T(s, "Upper-tier seats and frames move to regional football academies, if they are certified safe.", { x: 0.6, y: 5.5, w: 12.1, h: 0.4, fontSize: 16, bold: true });
    L.forEach((l, i) => {
      const x = 0.6 + i * 4.1;
      card(s, x, 6.0, 3.9, 0.85, l[0] + " lesson");
      T(s, [{ text: l[0] + "  ", options: { bold: true, color: C.accent1 } }, { text: l[1], options: { color: C.background1 } }], { x: x + 0.2, y: 6.0, w: 3.55, h: 0.85, fontSize: 13, valign: "middle" });
    });
    s.addNotes("Legacy is where many hosts failed. South Africa and Brazil were left with stadiums too big for regular use. Our answer: at Cox's Bazar and Sylhet the orange upper tier is removable. A 45,000-seat tournament venue becomes about 25,000 seats for community football, and certified components move to regional academies. Qatar's Stadium 974 shows this can be done, but we must prove the savings.");
  }

  // ===================================================== 10 CLOSE
  {
    const s = pres.addSlide({ masterName: "FULL", sectionTitle: sec });
    s.addImage({ data: img("cover.png"), x: 0, y: 0, w: 13.333, h: 7.5, transparency: 55, objectName: "Closing stadium", altText: "Dimmed stadium illustration" });
    disc(s, 0.8, 0.62, 0.3, C.accent3, "Close sun");
    T(s, "THE DECISION", { x: 1.25, y: 0.6, w: 5, h: 0.34, fontSize: 13, bold: true, color: C.accent3, charSpacing: 4, valign: "middle" });
    T(s, "Go ahead only if all four tests pass", { x: 0.8, y: 1.05, w: 11.8, h: 0.75, fontSize: 34, bold: true, fontFace: "Arial" });
    [["Technically feasible", I.hard, C.accent4], ["Financially responsible", I.money, C.accent1], ["Environmentally & socially acceptable", I.leaf, C.accent2], ["Credible legacy plan", I.recycle, C.accent5]].forEach((t, i) => {
      const x = 0.8 + i * 3.0;
      iconDisc(s, x, 2.15, 0.75, t[1], t[2], t[0] + " icon");
      T(s, t[0], { x: x + 0.9, y: 2.15, w: 1.95, h: 0.75, fontSize: 15, bold: true, valign: "middle" });
    });
    T(s, "Today we ask", { x: 0.8, y: 3.4, w: 6, h: 0.45, fontSize: 20, bold: true, color: C.accent1 });
    [["Government", "Approve a Gate 0 feasibility study and the legal design of the delivery authority (BWCDA)", I.gov],
     ["Board of Chief Officers", "Own the responsibility matrix and the phase-gate controls", I.users],
     ["Sponsors & investors", "Join early market testing of PPP, naming-rights and hospitality packages", I.hand]].forEach((a, i) => {
      const x = 0.8 + i * 4.0;
      card(s, x, 4.0, 3.75, 2.2, a[0] + " ask");
      iconDisc(s, x + 0.25, 4.2, 0.6, a[2], C.accent3, a[0] + " icon");
      T(s, a[0], { x: x + 1.0, y: 4.2, w: 2.6, h: 0.6, fontSize: 17, bold: true, valign: "middle" });
      T(s, a[1], { x: x + 0.25, y: 4.95, w: 3.3, h: 1.15, fontSize: 15 });
    });
    T(s, "Source: Analysis §17–18. The asks follow from the Gate 0 phase of the roadmap.", { x: 0.8, y: 6.85, w: 10, h: 0.3, fontSize: 9, color: C.background2 });
    s.addNotes("The decision rule is simple: we go ahead only if the plan is technically feasible, financially responsible, environmentally and socially acceptable, and has a credible legacy. Today we ask three things: the government approves a Gate 0 feasibility study, the chief officers own the controls, and sponsors join early market testing. Thank you.");
  }

  // ===================================================== APPENDIX REFS
  section("Appendix");
  {
    const s = story("Appendix", "References");
    const refs = [
      "Flyvbjerg, B., Holm, M. S., & Buhl, S. (2002). Underestimating costs in public works projects: Error or lie? Journal of the American Planning Association, 68(3), 279–295.",
      "FIFA. (n.d.). FIFA Stadium Guidelines; pitch guidance. FIFA Football Technology / FIFA Publications.",
      "FIFA. (2018). More than half the world watched record-breaking 2018 World Cup [Media release]. inside.fifa.com",
      "FIFA. (2023). Annual Report 2022: 2019–2022 revenue. publications.fifa.com · FIFA. (n.d.). World Cup USD 15 billion revenue statement. inside.fifa.com",
      "Housing and Building Research Institute. (2021). Bangladesh National Building Code 2020. Bangladesh Gazette.",
      "Arcadis. (n.d.). International Construction Costs. · Sky News; Sports Business Journal: reported Qatar 2022 stadium costs.",
      "Government of Bangladesh. Public-Private Partnership Act 2015; Public Procurement Act and Rules (BPPA).",
      "Natural Earth. (n.d.). Admin 0 – Countries, 1:10m [Public-domain map data], via world-atlas 2.0.2.",
      "Islam, M. R. (2026). Analysis: Section E, Hosting FIFA World Cup in Bangladesh > Hosting Country > Bangladesh [Unpublished working document].",
    ];
    T(s, refs.map((r, k) => ({ text: r, options: { bullet: true, breakLine: k < refs.length - 1 } })), { x: 0.6, y: 1.8, w: 12.1, h: 4.6, fontSize: 13, paraSpaceAfter: 6 });
    T(s, "All stadium and map illustrations are original concept artwork, not site designs. Dates marked n.d. should be confirmed before external distribution.", { x: 0.6, y: 6.5, w: 12.1, h: 0.4, fontSize: 11, italic: true, color: C.accent1 });
  }

  const out = "/home/user/ai-research-lab/Bangladesh_2050_FIFA_Story_10_Slides.pptx";
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("written", out);
})();
