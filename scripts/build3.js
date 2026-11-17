// Bangladesh 2050 — v3: colourful editorial + Morph transitions
// Persistent Morph objects on every slide: "!!band" (violet block), "!!sun" (red disc), "!!tag" (2050 mark)
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const fs = require("fs");
const React = require("react");
const RDS = require("react-dom/server");
const fa = require("react-icons/fa");
const { applyTheme } = require("/root/.claude/skills/synced/cea9d913-f49b-4ae4-9cbe-02d3f2c5e266_ce37c8f7-a30b-40ea-985e-2c956e1c82e0/pptx/scripts/apply_theme.js");

const A = __dirname + "/assets/";
const HEX = { navy: "0B1440", card: "18215C", white: "FFFFFF", muted: "BFC6EA", violet: "5B2BD6", yellow: "FFC83D", green: "00C27A", red: "F42A41", sky: "3FC1FF", orange: "FF8A3D" };
const THEME = { name: "Bangladesh 2050 Editorial", headFontFace: "Arial", bodyFontFace: "Calibri",
  colors: { dk1: HEX.navy, lt1: HEX.white, dk2: HEX.card, lt2: HEX.muted, accent1: HEX.yellow, accent2: HEX.green, accent3: HEX.red, accent4: HEX.sky, accent5: HEX.orange, accent6: HEX.violet, hlink: HEX.sky, folHlink: HEX.violet } };

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Bangladesh 2050: Four Cities, One World Cup";
pres.author = "Md. Rakibul Islam";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const W = 13.333, H = 7.5;
const img = f => "image/png;base64," + fs.readFileSync(A + f).toString("base64");
async function icon(Comp) {
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color: "#FFFFFF", size: 256 }));
  return "image/png;base64," + (await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer()).toString("base64");
}

(async () => {
  const I = {};
  for (const [k, v] of Object.entries({ gov: fa.FaLandmark, leaf: fa.FaLeaf, hand: fa.FaHandshake, hard: fa.FaHardHat, money: fa.FaCoins, recycle: fa.FaRecycle, users: fa.FaUsers, globe: fa.FaGlobeAsia }))
    I[k] = await icon(v);

  pres.defineSlideMaster({ title: "EDITORIAL", background: { data: img("bg3.png") }, objects: [],
    slideNumber: { x: 12.45, y: 7.05, w: 0.4, h: 0.3, fontSize: 10, color: "FFC83D", align: "right" } });
  pres.defineSlideMaster({ title: "PHOTO", background: { color: HEX.navy }, objects: [] });

  // ---------- helpers ----------
  const T = (s, text, o) => s.addText(text, Object.assign({ isTextBox: true, margin: 0, fontSize: 16, color: C.background1, valign: "top" }, o));
  const shadow = () => ({ type: "outer", color: "000000", blur: 12, offset: 4, angle: 90, opacity: 0.45 });
  const disc = (s, x, y, d, color, name) => s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color, width: 0 }, objectName: name });
  const card = (s, x, y, w, h, name, fill = C.text2) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: fill, width: 0 }, shadow: shadow(), objectName: name });
  const iconDisc = (s, x, y, d, ic, color, name) => { disc(s, x, y, d, color, name + " disc"); const p = d * 0.25; s.addImage({ data: ic, x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: name, altText: name }); };
  // persistent morph actors
  const band = (s, x, y, w, h) => s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.accent6 }, line: { color: C.accent6, width: 0 }, objectName: "!!band" });
  const sun = (s, x, y, d = 0.26) => disc(s, x, y, d, C.accent3, "!!sun");
  const tag = (s, x = 10.2, y = 0.38, w = 2.6, align = "right", size = 11) =>
    T(s, "BANGLADESH 2050", { x, y, w, h: 0.3, fontSize: size, bold: true, color: C.accent1, charSpacing: 3, align, valign: "middle", objectName: "!!tag" });
  const kicker = (s, text, x = 0.6, y = 0.42) => { sun(s, x, y + 0.02); T(s, text.toUpperCase(), { x: x + 0.38, y, w: 7, h: 0.3, fontSize: 12, bold: true, color: C.accent1, charSpacing: 4, valign: "middle" }); };
  const title = (s, text, x = 0.6, y = 0.8, w = 12, size = 34) => T(s, text, { x, y, w, h: 0.8, fontSize: size, bold: true, fontFace: "Arial" });
  const src = (s, text, x = 0.6, w = 11.6) => T(s, text, { x, y: 7.03, w, h: 0.32, fontSize: 9, color: C.background2, valign: "middle" });
  let sec = "";
  const section = t => { sec = t; pres.addSection({ title: t }); };
  const slide = (master = "EDITORIAL") => pres.addSlide({ masterName: master, sectionTitle: sec });

  // =========================================== 1 COVER
  section("Act 1 · The dream");
  {
    const s = slide("PHOTO");
    s.addImage({ data: img("cover.png"), x: 0, y: 0, w: W, h: H, objectName: "Cover stadium", altText: "Illustration of a floodlit football stadium at night with a city skyline" });
    band(s, 0, 0, 0.32, H);
    sun(s, 0.8, 1.28, 0.42);
    T(s, "FIFA WORLD CUP™ 2050  ·  HOSTING PROPOSAL", { x: 1.38, y: 1.28, w: 7, h: 0.42, fontSize: 14, bold: true, color: C.accent1, charSpacing: 4, valign: "middle" });
    T(s, "BANGLADESH", { x: 0.75, y: 1.95, w: 9, h: 1.05, fontSize: 68, bold: true, fontFace: "Arial" });
    T(s, "2050", { x: 0.75, y: 2.95, w: 6.5, h: 1.75, fontSize: 120, bold: true, fontFace: "Arial", color: C.accent1, objectName: "!!tag" });
    T(s, "Four cities. One nation. The world's game.", { x: 0.8, y: 4.85, w: 7.5, h: 0.5, fontSize: 24 });
    T(s, "Government of Bangladesh  ·  Board of Chief Officers  ·  Sponsor & investor partners", { x: 0.8, y: 5.6, w: 8, h: 0.35, fontSize: 13, color: C.background2 });
    T(s, "Planning proposal, not an approved bid. Source: Analysis, Section E > Hosting Country > Bangladesh.", { x: 0.8, y: 6.8, w: 9, h: 0.3, fontSize: 10, italic: true, color: C.background2 });
    s.addNotes("Imagine the opening whistle of the 2050 World Cup in Dhaka. This is a planning proposal, not an approved bid. In ten slides: why the World Cup, where Bangladesh would play, how we build, what it costs, how we deliver, and what stays behind.");
  }

  // =========================================== 2 STAGE
  {
    const s = slide();
    band(s, 0, 0, 5.4, H);
    kicker(s, "Why the World Cup");
    tag(s);
    T(s, "The biggest stage on Earth", { x: 0.6, y: 0.85, w: 4.5, h: 1.3, fontSize: 34, bold: true, fontFace: "Arial" });
    T(s, "5 billion", { x: 0.6, y: 2.35, w: 4.7, h: 1.15, fontSize: 72, bold: true, color: C.accent1, fontFace: "Arial" });
    T(s, "people watched Qatar 2022. About 6 billion are expected for 2026.", { x: 0.6, y: 3.5, w: 4.4, h: 0.8, fontSize: 18 });
    T(s, [{ text: "Be clear about the money. ", options: { bold: true, color: C.accent1 } },
      { text: "FIFA keeps its own surplus (≈$4.49bn in 2022). Bangladesh's gain is different: visibility, tourism, infrastructure and investment." }],
      { x: 0.6, y: 4.6, w: 4.4, h: 1.6, fontSize: 15 });
    s.addChart(pres.charts.BAR, [{ name: "Viewers (bn)", labels: ["2010", "2014", "2018", "2022", "2026*"], values: [3.2, 3.2, 3.572, 5.0, 6.0] }], {
      x: 5.9, y: 1.2, w: 6.9, h: 4.3, barDir: "col", chartColors: ["3FC1FF", "3FC1FF", "3FC1FF", "FFC83D", "00C27A"], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0#\"bn\"",
      dataLabelColor: "FFFFFF", dataLabelFontFace: "+mn-lt", dataLabelFontSize: 14, catAxisLabelColor: "BFC6EA", catAxisLabelFontFace: "+mn-lt", catAxisLabelFontSize: 14, valAxisHidden: true,
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, catAxisLineShow: false, showLegend: false, barGapWidthPct: 35,
      showTitle: true, title: "Global viewers per World Cup (billions)", titleColor: "FFFFFF", titleFontFace: "+mn-lt", titleFontSize: 14, objectName: "Viewers chart" });
    [[I.globe, "Visibility & tourism", C.accent4], [I.hard, "Lasting infrastructure", C.accent2], [I.hand, "Investment & local business", C.accent1]].forEach((r, i) => {
      const x = 5.9 + i * 2.35;
      iconDisc(s, x, 5.75, 0.55, r[0], r[2], r[1] + " icon");
      T(s, r[1], { x: x + 0.65, y: 5.75, w: 1.6, h: 0.55, fontSize: 13, bold: true, valign: "middle" });
    });
    src(s, "Sources: FIFA 2018 audience report; FIFA Annual Report 2022; FIFA 2026 revenue statement. *2026 expected, not final.", 5.9, 6.3);
    s.addNotes("Five billion people watched Qatar 2022, and about six billion are expected for 2026. But be clear: FIFA keeps its own surplus, about 4.5 billion dollars in 2022. Bangladesh's gain comes from visibility, tourism, infrastructure and investment.");
  }

  // =========================================== 3 MAP
  section("Act 2 · Where we play");
  const M = JSON.parse(fs.readFileSync(A + "map.json"));
  const mapW = H * M.W / M.H;
  const fx = lon => (lon - M.L0) / (M.L1 - M.L0), fy = lat => (M.A1 - lat) / (M.A1 - M.A0);
  const cities = [
    ["1", "Dhaka", "Purbachal New Town", "85,000", 90.50, 23.84, C.accent3, "Flagship · score 88/100"],
    ["2", "Chattogram", "Sagarika–Sitakunda corridor", "65,000", 91.74, 22.45, C.accent4, "Port & airport hub · 81/100"],
    ["3", "Cox's Bazar", "Inland northern outskirts", "45,000", 92.02, 21.45, C.accent5, "Coastal tourism · 74/100"],
    ["4", "Sylhet", "Northern / NE growth area", "45,000", 91.87, 24.90, C.accent2, "Northeast gateway · 76/100"],
  ];
  {
    const s = slide();
    s.addImage({ data: img("map3.png"), x: 0, y: 0, w: mapW, h: H, objectName: "!!map", altText: "Map of Bangladesh with neighbouring countries and the Bay of Bengal" });
    band(s, 7.3, 0, W - 7.3, H);
    tag(s);
    cities.forEach((c, i) => {
      const x = fx(c[4]) * mapW, y = fy(c[5]) * H;
      const d = 0.42;
      s.addShape(pres.shapes.OVAL, { x: x - 0.45, y: y - 0.45, w: 0.9, h: 0.9, fill: { color: c[6], transparency: 70 }, line: { color: c[6], width: 1 }, objectName: c[1] + " halo" });
      if (i === 0) sun(s, x - d / 2, y - d / 2, d); else disc(s, x - d / 2, y - d / 2, d, c[6], c[1] + " pin");
      T(s, c[0], { x: x - d / 2, y: y - d / 2, w: d, h: d, fontSize: 13, bold: true, color: i === 0 ? C.background1 : C.text1, align: "center", valign: "middle" });
    });
    T(s, "WHERE WE PLAY", { x: 7.8, y: 0.42, w: 5, h: 0.3, fontSize: 12, bold: true, color: C.accent1, charSpacing: 4, valign: "middle" });
    T(s, "Four cities, 240,000 seats", { x: 7.8, y: 0.8, w: 5.3, h: 0.7, fontSize: 28, bold: true, fontFace: "Arial" });
    cities.forEach((c, i) => {
      const y = 1.95 + i * 1.16;
      s.addShape(pres.shapes.LINE, { x: 7.8, y: y - 0.12, w: 5.0, h: 0, line: { color: C.background1, width: 0.75, transparency: 60 }, objectName: "Rule " + i });
      T(s, c[0], { x: 7.8, y, w: 0.5, h: 0.9, fontSize: 30, bold: true, color: C.accent1, fontFace: "Arial" });
      T(s, [{ text: c[1], options: { bold: true, fontSize: 19, breakLine: true } }, { text: c[2], options: { fontSize: 13, color: C.background2 } }], { x: 8.35, y, w: 2.6, h: 0.9 });
      T(s, [{ text: c[3], options: { bold: true, fontSize: 24, breakLine: true, fontFace: "Arial" } }, { text: c[7], options: { fontSize: 11, color: C.background2 } }], { x: 10.6, y, w: 2.25, h: 0.9, align: "right" });
    });
    T(s, "Pins mark approximate candidate areas, not final sites. Scores are preliminary planning assumptions. Source: Analysis §4, §10.2. Basemap: Natural Earth.",
      { x: 7.8, y: 6.6, w: 4.6, h: 0.6, fontSize: 9, color: C.background2 });
    s.addNotes("Four candidate host cities across the country. Dhaka at Purbachal is the 85,000-seat flagship. Chattogram is the port and airport hub. Cox's Bazar connects the World Cup to coastal tourism. Sylhet is the gateway to the northeast. Together, 240,000 tournament seats.");
  }

  // =========================================== 4 DHAKA (map zooms in)
  {
    const s = slide("PHOTO");
    const k = 3.2, DX = 3.0, DY = 2.75;
    const mw = mapW * k, mh = H * k;
    s.addImage({ data: img("map3.png"), x: DX - fx(90.50) * mw, y: DY - fy(23.84) * mh, w: mw, h: mh, objectName: "!!map", altText: "Map of Bangladesh zoomed in on Dhaka" });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: H, fill: { color: C.text1, transparency: 35 }, line: { color: C.text1, width: 0 }, objectName: "Dim overlay" });
    sun(s, DX - 0.25, DY - 0.25, 0.5);
    T(s, "Purbachal", { x: DX + 0.4, y: DY - 0.22, w: 2, h: 0.45, fontSize: 16, bold: true, valign: "middle" });
    T(s, "HOST CITY 01 · DHAKA", { x: 0.6, y: 0.42, w: 6, h: 0.3, fontSize: 12, bold: true, color: C.accent1, charSpacing: 4, valign: "middle" });
    tag(s);
    T(s, "Purbachal: the national flagship", { x: 0.6, y: 0.8, w: 5.6, h: 1.2, fontSize: 32, bold: true, fontFace: "Arial" });
    T(s, [{ text: "Main risk: ", options: { bold: true, color: C.accent3 } }, { text: "soft alluvial clay and waterlogging, so deep piled foundations and site drainage are needed." }],
      { x: 0.6, y: 3.7, w: 5.2, h: 0.9, fontSize: 15 });
    T(s, "Hosting the opening match or final depends on the final bid and FIFA's decisions.", { x: 0.6, y: 4.75, w: 5.2, h: 0.6, fontSize: 12, italic: true, color: C.background2 });
    card(s, 6.6, 0.95, 6.15, 4.4, "Stadium frame", C.text2);
    s.addImage({ data: img("st_dhaka.png"), x: 6.7, y: 1.05, w: 5.95, h: 4.2, sizing: { type: "cover", w: 5.95, h: 4.2 }, objectName: "Dhaka stadium concept", altText: "Concept illustration of an 85,000-seat stadium with Dhaka skyline" });
    band(s, 0, 5.75, W, H - 5.75);
    [["85,000", "gross seats"], ["45–55 ha", "land envelope"], ["88/100", "site score"], ["MRT · Expressway · HSIA", "planned links"]].forEach((v, i) => {
      const x = 0.6 + i * 2.75, w = i === 3 ? 4.0 : 2.6;
      T(s, v[0], { x, y: 5.95, w, h: 0.6, fontSize: i === 3 ? 20 : 30, bold: true, color: C.accent1, fontFace: "Arial", valign: "middle" });
      T(s, v[1], { x, y: 6.55, w, h: 0.3, fontSize: 13 });
    });
    T(s, "Source: Analysis §4, §6.1, §10.2. Stadium is a concept illustration, not a design.", { x: 0.6, y: 7.03, w: 10, h: 0.32, fontSize: 9, color: C.background1 });
    s.addNotes("We zoom into Dhaka. Our flagship is Purbachal New Town: 85,000 gross seats on 45 to 55 hectares, scoring 88 out of 100, planned to connect with MRT Line 1, the expressway and Hazrat Shahjalal International Airport. The main challenge is soft alluvial clay and waterlogging. Whether it hosts the opening or final depends on FIFA.");
  }

  // =========================================== 5 REGIONS
  {
    const s = slide();
    band(s, 0, 0, W, 1.6);
    kicker(s, "Host cities 02–04");
    tag(s);
    title(s, "Three regional hubs, each with its own story", 0.6, 0.78, 11.5, 30);
    const hubs = [
      ["st_ctg.png", "Chattogram", "65,000", "Stays 65,000", "Port city, international airport, Dhaka–Ctg highway", "Cyclone winds, storm surge, salt corrosion", C.accent4],
      ["st_cox.png", "Cox's Bazar", "45,000", "→ ≈25,000 after 2050", "Coastal tourism capital; rail, N1 highway, airport", "Cyclones, flooding, salinity", C.accent5],
      ["st_syl.png", "Sylhet", "45,000", "→ ≈20,000–25,000", "Tea-garden gateway; Osmani Airport, road & rail", "Seismic risk, flash floods", C.accent2],
    ];
    hubs.forEach((h, i) => {
      const x = 0.6 + i * 4.12, w = 3.88;
      card(s, x, 1.95, w, 4.9, h[1] + " card");
      s.addImage({ data: img(h[0]), x: x + 0.1, y: 2.05, w: w - 0.2, h: 2.1, sizing: { type: "cover", w: w - 0.2, h: 2.1 }, objectName: h[1] + " stadium", altText: h[1] + " stadium concept illustration" });
      T(s, h[1], { x: x + 0.25, y: 4.3, w: 2.2, h: 0.45, fontSize: 20, bold: true });
      T(s, h[2], { x: x + 2.0, y: 4.3, w: 1.65, h: 0.45, fontSize: 22, bold: true, color: h[6], align: "right", fontFace: "Arial" });
      T(s, h[3], { x: x + 0.25, y: 4.78, w: w - 0.5, h: 0.32, fontSize: 13, bold: true, color: h[6] });
      T(s, h[4], { x: x + 0.25, y: 5.18, w: w - 0.5, h: 0.7, fontSize: 14 });
      T(s, [{ text: "Risk: ", options: { bold: true, color: C.accent3 } }, { text: h[5], options: { color: C.background2 } }], { x: x + 0.25, y: 6.0, w: w - 0.5, h: 0.7, fontSize: 13 });
    });
    src(s, "Source: Analysis §4, §6.2–6.4, §16. Illustrations are concepts; post-tournament capacities are subject to demand studies.");
    s.addNotes("Three regional hubs. Chattogram at 65,000 uses the port and airport but must resist cyclone winds and salt air. Cox's Bazar at 45,000 puts the World Cup next to the world's longest natural sea beach. Sylhet at 45,000 is the tea-country gateway. The orange dashed ring is a removable upper tier: after 2050 these venues shrink to match demand.");
  }

  // =========================================== 6 ENGINEERING
  section("Act 3 · How we build it");
  {
    const s = slide();
    band(s, 9.55, 0, W - 9.55, H);
    tag(s);
    kicker(s, "Built for Bangladesh");
    title(s, "Engineered for monsoon, cyclone & soft soil", 0.6, 0.8, 8.8, 27);
    const ix = 0.5, iy = 2.0, iw = 8.8, ih = iw / 2;
    s.addImage({ data: img("section.png"), x: ix, y: iy, w: iw, h: ih, objectName: "Stadium cross-section", altText: "Cross-section of a stadium showing roof, modular upper tier, lower bowl, drained pitch and deep piles" });
    const call = [
      ["1", "Cyclone-resistant roof", "Aerodynamic form, wind-load engineering", ix + iw * 0.1, iy + ih * 0.06, C.background1],
      ["2", "Modular upper tier", "Removable seats at Cox's Bazar & Sylhet", ix + iw * 0.885, iy + ih * 0.28, C.accent5],
      ["3", "Permanent lower bowl", "Stays in use after the tournament", ix + iw * 0.27, iy + ih * 0.55, C.accent4],
      ["4", "SubAir-type pitch drainage", "Vacuum drainage for monsoon rain", ix + iw * 0.5, iy + ih * 0.66, C.accent2],
      ["5", "Deep piles, 40–60 m", "Initial concept for soft alluvial soil", ix + iw * 0.12, iy + ih * 0.85, C.accent1],
    ];
    call.forEach((c, i) => {
      disc(s, c[3] - 0.2, c[4] - 0.2, 0.4, c[5], "Marker " + c[0]);
      T(s, c[0], { x: c[3] - 0.2, y: c[4] - 0.2, w: 0.4, h: 0.4, fontSize: 14, bold: true, color: C.text1, align: "center", valign: "middle" });
      const y = 0.9 + i * 1.2;
      disc(s, 9.95, y, 0.46, c[5], "List marker " + c[0]);
      T(s, c[0], { x: 9.95, y, w: 0.46, h: 0.46, fontSize: 15, bold: true, color: C.text1, align: "center", valign: "middle" });
      T(s, [{ text: c[1], options: { bold: true, breakLine: true } }, { text: c[2], options: { fontSize: 12, color: C.background1 } }], { x: 10.55, y: y - 0.05, w: 2.5, h: 1.0, fontSize: 15 });
    });
    src(s, "Source: Analysis §5.1, §11.2. Final specifications follow site studies, BNBC 2020 and independent review. Schematic, not to scale.", 0.6, 8.7);
    s.addNotes("How we build for Bangladesh. One: a cyclone-resistant, aerodynamic roof. Two: a removable modular upper tier. Three: a permanent lower bowl. Four: vacuum-assisted pitch drainage for monsoon rain. Five: deep bored piles, 40 to 60 metres as an initial concept, for soft river soils.");
  }

  // =========================================== 7 INVESTMENT
  {
    const s = slide();
    band(s, 0, 0, 6.0, H);
    kicker(s, "The investment");
    tag(s);
    T(s, "$7.49bn", { x: 0.6, y: 1.0, w: 5.3, h: 1.4, fontSize: 84, bold: true, color: C.accent1, fontFace: "Arial" });
    T(s, "central (P50) capital estimate for the four-stadium programme, 2026 USD. Not a sanctioned budget.", { x: 0.6, y: 2.45, w: 5.0, h: 0.9, fontSize: 17 });
    [["$13,500", "benchmark per gross seat (Qatar reference class)"], ["+28%", "risk contingency: average mega-project overrun (Flyvbjerg et al., 2002)"], ["16%", "interest during construction (8% × 50% × 4 yrs)"]].forEach((v, i) => {
      const y = 3.6 + i * 0.85;
      T(s, v[0], { x: 0.6, y, w: 1.6, h: 0.7, fontSize: 24, bold: true, color: C.accent2, fontFace: "Arial", valign: "middle" });
      T(s, v[1], { x: 2.25, y, w: 3.5, h: 0.7, fontSize: 13, valign: "middle" });
    });
    T(s, "Excludes national transport networks, airport expansion, hotel districts and tournament operating costs.", { x: 0.6, y: 6.25, w: 5.1, h: 0.6, fontSize: 12, italic: true, color: C.background1 });
    title(s, "Where partners fit", 6.6, 0.8, 6.2, 30);
    [[I.gov, "Government", "Land, site studies, security, national legacy fund", C.accent4],
     [I.leaf, "Development & green finance", "Masterplan, transport links, sustainability package", C.accent2],
     [I.hand, "Sponsors & PPP partners", "Stadium naming rights, hotel districts, retail, concerts & conventions", C.accent1]].forEach((p, i) => {
      const y = 1.85 + i * 1.4;
      card(s, 6.6, y, 6.15, 1.2, p[1] + " card");
      iconDisc(s, 6.82, y + 0.25, 0.7, p[0], p[3], p[1] + " icon");
      T(s, [{ text: p[1], options: { bold: true, fontSize: 18, breakLine: true, color: p[3] } }, { text: p[2], options: { fontSize: 14 } }], { x: 7.7, y: y + 0.1, w: 4.9, h: 1.0, valign: "middle" });
    });
    T(s, "Safeguards: transparent e-procurement (BPPA) and clear PPP risk allocation (PPP Act 2015).", { x: 6.6, y: 6.1, w: 6.1, h: 0.6, fontSize: 13, color: C.background2 });
    src(s, "Source: Analysis §5, §5.2, §8, §11 Table 4, §13.2, §16.", 6.6, 5.5);
    s.addNotes("The central estimate is about 7.49 billion dollars for the four stadiums: a Qatar benchmark of 13,500 dollars per seat, a 28 percent risk contingency based on mega-project evidence, and interest during construction. It is not a sanctioned budget and excludes national transport, airports and hotels. Partners fit as government, development and green finance, and sponsors through PPPs, naming rights, hotels and events.");
  }

  // =========================================== 8 DELIVERY
  section("Act 4 · How we deliver");
  {
    const s = slide();
    T(s, "DISCIPLINE", { x: 0.6, y: 0.42, w: 5, h: 0.3, fontSize: 12, bold: true, color: C.accent1, charSpacing: 4, valign: "middle" });
    tag(s);
    title(s, "Phase-gated delivery: 2026 → 2050 → 2060", 0.6, 0.8, 12, 32);
    band(s, 0, 2.25, W, 1.35);
    const ph = [["2026", "Feasibility"], ["2030", "Sites & authority"], ["2034", "Design"], ["2036", "Finance"], ["2038", "Construction"], ["2046", "Testing"], ["2050", "Kick-off"], ["2060", "Legacy"]];
    const x0 = 1.0, x1 = 12.3, y = 2.72;
    s.addShape(pres.shapes.LINE, { x: x0, y: y + 0.17, w: x1 - x0, h: 0, line: { color: C.background1, width: 2 }, objectName: "Timeline" });
    ph.forEach((p, i) => {
      const x = x0 + (x1 - x0) * i / 7;
      if (i === 0) sun(s, x - 0.25, y - 0.08, 0.5);
      else disc(s, x - 0.17, y, 0.34, p[0] === "2050" ? C.accent1 : C.background1, "Gate " + i);
      T(s, p[0], { x: x - 0.7, y: y + 0.38, w: 1.4, h: 0.4, fontSize: 16, bold: true, color: p[0] === "2050" ? C.accent1 : C.background1, align: "center", fontFace: "Arial" });
      T(s, p[1], { x: x - 0.8, y: 3.7, w: 1.6, h: 0.35, fontSize: 13, align: "center", color: C.background2 });
    });
    T(s, "▲ We are here: Gate 0", { x: 0.45, y: 4.1, w: 2.6, h: 0.3, fontSize: 12, bold: true, color: C.accent3 });
    T(s, "One chain of command", { x: 0.6, y: 4.6, w: 6, h: 0.4, fontSize: 18, bold: true });
    ["Cabinet / PMO", "Steering Committee", "BWCDA Central PMO", "4 Venue Teams"].forEach((c, i) => {
      const x = 0.6 + i * 1.62;
      card(s, x, 5.1, 1.42, 1.0, c);
      T(s, c, { x: x + 0.08, y: 5.1, w: 1.26, h: 1.0, fontSize: 13, bold: true, align: "center", valign: "middle" });
      if (i < 3) T(s, "›", { x: x + 1.42, y: 5.1, w: 0.2, h: 1.0, fontSize: 22, bold: true, color: C.accent1, align: "center", valign: "middle" });
    });
    T(s, "+ Independent Engineer & Auditor reporting separately", { x: 0.6, y: 6.25, w: 6.3, h: 0.35, fontSize: 13, italic: true, color: C.background2 });
    T(s, "Top risks, actively controlled", { x: 7.3, y: 4.6, w: 5.4, h: 0.4, fontSize: 18, bold: true });
    [["25", "Cost escalation", "Reference-class budgets; EVM alerts at CPI < 0.95 / 0.90", C.accent3], ["20", "Last-mile congestion", "Mass transit, shuttles, park-and-ride, traffic trials", C.accent3], ["16", "Land, soil, hotels, legacy use", "Early title checks, geotech, demand audits", C.accent5]].forEach((r, i) => {
      const yy = 5.1 + i * 0.62;
      disc(s, 7.3, yy, 0.5, r[3], "Risk " + r[0]);
      T(s, r[0], { x: 7.3, y: yy, w: 0.5, h: 0.5, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle" });
      T(s, [{ text: r[1] + "  ", options: { bold: true } }, { text: r[2], options: { fontSize: 12, color: C.background2 } }], { x: 7.95, y: yy, w: 4.8, h: 0.5, fontSize: 14, valign: "middle" });
    });
    src(s, "Source: Analysis §1, §12, §14. Proposed sequence, not a FIFA schedule. BWCDA is a proposed new statutory body. Risk score = likelihood × impact.");
    s.addNotes("Delivery follows a phase-gated path. We are at Gate 0: feasibility. Sites and the delivery authority from 2030, design from 2034, finance from 2036, construction from 2038, testing from 2046, kick-off in 2050, legacy until 2060. One chain of command with an independent engineer. Top risks: cost escalation scored 25 and last-mile congestion scored 20, each with a named control.");
  }

  // =========================================== 9 LEGACY
  section("Act 5 · What stays behind");
  {
    const s = slide();
    kicker(s, "Legacy");
    tag(s);
    title(s, "Build for 2050. Right-size for 2060", 0.6, 0.8, 12, 34);
    card(s, 0.6, 1.7, 5.7, 3.4, "Before card");
    s.addImage({ data: img("sec_before.png"), x: 0.75, y: 2.3, w: 5.4, h: 2.7, objectName: "Tournament configuration", altText: "Stadium section with orange modular upper tier installed" });
    T(s, [{ text: "2050 · Tournament  ", options: { bold: true, color: C.accent5 } }, { text: "45,000 seats", options: { bold: true } }], { x: 0.85, y: 1.82, w: 5.3, h: 0.4, fontSize: 18 });
    T(s, "➜", { x: 6.3, y: 3.0, w: 0.75, h: 0.7, fontSize: 36, bold: true, color: C.accent1, align: "center", valign: "middle" });
    card(s, 7.05, 1.7, 5.7, 3.4, "After card");
    s.addImage({ data: img("sec_after.png"), x: 7.2, y: 2.3, w: 5.4, h: 2.7, objectName: "Legacy configuration", altText: "Same stadium section with upper tier removed, shown as dashed outline" });
    T(s, [{ text: "2060 · Community  ", options: { bold: true, color: C.accent2 } }, { text: "≈25,000 seats", options: { bold: true } }], { x: 7.3, y: 1.82, w: 5.3, h: 0.4, fontSize: 18 });
    band(s, 0, 5.35, W, H - 5.35);
    T(s, "Upper-tier seats and frames move to regional football academies, if they are certified safe.", { x: 0.6, y: 5.5, w: 12.1, h: 0.4, fontSize: 16, bold: true });
    [["South Africa 2010", "Keep big venues only with regular use"], ["Brazil 2014", "Avoid underused arenas like Manaus"], ["Qatar 2022", "Stadium 974 proved designs can be dismantled"]].forEach((l, i) => {
      T(s, [{ text: l[0] + "  ", options: { bold: true, color: C.accent1 } }, { text: l[1] }], { x: 0.6 + i * 4.1, y: 6.05, w: 3.9, h: 0.7, fontSize: 14 });
    });
    T(s, "Source: Analysis §7, §11, §16. Reuse and savings must be proven by studies. Schematic, not to scale.", { x: 0.6, y: 7.03, w: 11, h: 0.32, fontSize: 9, color: C.background1 });
    s.addNotes("Legacy is where many hosts failed. Our answer: at Cox's Bazar and Sylhet the orange upper tier is removable. A 45,000-seat tournament venue becomes about 25,000 seats for community football, and certified components move to regional academies. Qatar's Stadium 974 shows it can be done, but the savings must be proven.");
  }

  // =========================================== 10 CLOSE
  {
    const s = slide("PHOTO");
    band(s, 0, 0, W, H);
    sun(s, 0.8, 0.62, 0.3);
    T(s, "THE DECISION", { x: 1.25, y: 0.6, w: 5, h: 0.34, fontSize: 13, bold: true, color: C.accent1, charSpacing: 4, valign: "middle" });
    tag(s);
    T(s, "Go ahead only if all four tests pass", { x: 0.8, y: 1.05, w: 11.8, h: 0.8, fontSize: 36, bold: true, fontFace: "Arial" });
    [["Technically feasible", I.hard, C.accent4], ["Financially responsible", I.money, C.accent1], ["Environmentally & socially acceptable", I.leaf, C.accent2], ["Credible legacy plan", I.recycle, C.accent5]].forEach((t, i) => {
      const x = 0.8 + i * 3.0;
      iconDisc(s, x, 2.15, 0.75, t[1], t[2], t[0] + " icon");
      T(s, t[0], { x: x + 0.9, y: 2.15, w: 1.95, h: 0.75, fontSize: 15, bold: true, valign: "middle" });
    });
    T(s, "Today we ask", { x: 0.8, y: 3.35, w: 6, h: 0.45, fontSize: 20, bold: true, color: C.accent1 });
    [["Government", "Approve a Gate 0 feasibility study and the legal design of the delivery authority (BWCDA)", I.gov],
     ["Board of Chief Officers", "Own the responsibility matrix and the phase-gate controls", I.users],
     ["Sponsors & investors", "Join early market testing of PPP, naming-rights and hospitality packages", I.hand]].forEach((a, i) => {
      const x = 0.8 + i * 4.0;
      card(s, x, 3.95, 3.75, 2.3, a[0] + " ask", C.text1);
      iconDisc(s, x + 0.25, 4.15, 0.6, a[2], C.accent3, a[0] + " icon");
      T(s, a[0], { x: x + 1.0, y: 4.15, w: 2.6, h: 0.6, fontSize: 17, bold: true, valign: "middle" });
      T(s, a[1], { x: x + 0.25, y: 4.9, w: 3.3, h: 1.25, fontSize: 15 });
    });
    T(s, "Source: Analysis §17–18. The asks follow from the Gate 0 phase of the roadmap.", { x: 0.8, y: 6.85, w: 10, h: 0.3, fontSize: 9, color: C.background1 });
    s.addNotes("We go ahead only if the plan is technically feasible, financially responsible, environmentally and socially acceptable, and has a credible legacy. Today we ask: government approves a Gate 0 feasibility study, the chief officers own the controls, and sponsors join early market testing. Thank you.");
  }

  // =========================================== APPENDIX
  section("Appendix");
  {
    const s = slide();
    kicker(s, "Appendix");
    tag(s);
    title(s, "References");
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
    T(s, "Stadium and map visuals are original concept artwork, not site designs. Dates marked n.d. should be confirmed before external distribution.", { x: 0.6, y: 6.5, w: 12.1, h: 0.4, fontSize: 11, italic: true, color: C.accent1 });
  }

  const out = process.argv[2];
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("written", out);
})();
