// Bangladesh 2050 FIFA World Cup bid deck — night-stadium theme
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const React = require("react");
const RDS = require("react-dom/server");
const fa = require("react-icons/fa");
const { applyTheme } = require("/root/.claude/skills/synced/cea9d913-f49b-4ae4-9cbe-02d3f2c5e266_ce37c8f7-a30b-40ea-985e-2c956e1c82e0/pptx/scripts/apply_theme.js");

const HEX = {
  bg: "0A0F24", card: "151D3F", card2: "1D2752", white: "FFFFFF", muted: "C3CBE6",
  gold: "F2C14E", green: "1FBF7A", red: "F2475A", sky: "4FB3FF", orange: "FF9340", violet: "9D8CFF",
};
const THEME = {
  name: "Bangladesh 2050 Night Stadium",
  headFontFace: "Arial",
  bodyFontFace: "Calibri",
  colors: {
    dk1: HEX.bg, lt1: HEX.white, dk2: HEX.card, lt2: HEX.muted,
    accent1: HEX.gold, accent2: HEX.green, accent3: HEX.red, accent4: HEX.sky,
    accent5: HEX.orange, accent6: HEX.violet, hlink: HEX.sky, folHlink: HEX.violet,
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.title = "Bangladesh 2050 FIFA World Cup Bid";
pres.subject = "Stadium Infrastructure & Mega-Project Delivery Strategy";
pres.author = "Md. Rakibul Islam";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const W = 13.333, H = 7.5;

// ---------- background images ----------
async function svgPng(svg, w = 1920, h = 1080) {
  const buf = await sharp(Buffer.from(svg)).resize(w, h).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
const titleBgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
<defs>
 <radialGradient id="g" cx="50%" cy="115%" r="80%"><stop offset="0" stop-color="#0E5A3F"/><stop offset="0.45" stop-color="#0B2236"/><stop offset="1" stop-color="#070B1C"/></radialGradient>
 <radialGradient id="l1" cx="12%" cy="0%" r="45%"><stop offset="0" stop-color="#FFF4D0" stop-opacity="0.55"/><stop offset="1" stop-color="#FFF4D0" stop-opacity="0"/></radialGradient>
 <radialGradient id="l2" cx="88%" cy="0%" r="45%"><stop offset="0" stop-color="#FFF4D0" stop-opacity="0.55"/><stop offset="1" stop-color="#FFF4D0" stop-opacity="0"/></radialGradient>
 <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.18"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
</defs>
<rect width="1920" height="1080" fill="url(#g)"/>
<rect width="1920" height="1080" fill="url(#l1)"/><rect width="1920" height="1080" fill="url(#l2)"/>
<polygon points="200,0 280,0 900,1080 500,1080" fill="url(#beam)"/>
<polygon points="1640,0 1720,0 1420,1080 1020,1080" fill="url(#beam)"/>
<g stroke="#FFFFFF" stroke-opacity="0.10" stroke-width="3" fill="none">
 <ellipse cx="960" cy="1010" rx="900" ry="170"/><line x1="960" y1="840" x2="960" y2="1080"/><ellipse cx="960" cy="1010" rx="160" ry="40"/>
</g>
<g fill="#FFF8DC" opacity="0.9"><circle cx="150" cy="40" r="6"/><circle cx="185" cy="40" r="6"/><circle cx="220" cy="40" r="6"/><circle cx="255" cy="40" r="6"/>
<circle cx="1665" cy="40" r="6"/><circle cx="1700" cy="40" r="6"/><circle cx="1735" cy="40" r="6"/><circle cx="1770" cy="40" r="6"/></g>
</svg>`;
const contentBgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
<defs><radialGradient id="g" cx="85%" cy="-10%" r="90%"><stop offset="0" stop-color="#1A2A5E"/><stop offset="0.6" stop-color="#0C1330"/><stop offset="1" stop-color="#0A0F24"/></radialGradient>
<radialGradient id="gr" cx="0%" cy="110%" r="55%"><stop offset="0" stop-color="#0E5A3F" stop-opacity="0.45"/><stop offset="1" stop-color="#0E5A3F" stop-opacity="0"/></radialGradient></defs>
<rect width="1920" height="1080" fill="url(#g)"/><rect width="1920" height="1080" fill="url(#gr)"/>
<g stroke="#FFFFFF" stroke-opacity="0.035" stroke-width="3" fill="none"><circle cx="1780" cy="980" r="260"/><circle cx="1780" cy="980" r="40"/></g>
</svg>`;
// Bangladesh-flag-inspired emblem: green field, red disc, gold ring
const emblemSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
<circle cx="200" cy="200" r="190" fill="none" stroke="#F2C14E" stroke-width="10"/>
<circle cx="200" cy="200" r="170" fill="#0E6B4A"/><circle cx="185" cy="200" r="80" fill="#F2475A"/>
</svg>`;

async function icon(Comp, color = "#0A0F24", size = 256) {
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color, size }));
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const TITLE_BG = await svgPng(titleBgSvg);
  const CONTENT_BG = await svgPng(contentBgSvg);
  const EMBLEM = await svgPng(emblemSvg, 400, 400);
  const I = {};
  const iconList = { globe: fa.FaGlobeAsia, trophy: fa.FaTrophy, map: fa.FaMapMarkedAlt, gov: fa.FaLandmark, money: fa.FaHandHoldingUsd,
    shield: fa.FaShieldAlt, leaf: fa.FaLeaf, road: fa.FaRoute, chart: fa.FaChartLine, users: fa.FaUsers, hard: fa.FaHardHat,
    cloud: fa.FaCloudShowersHeavy, bolt: fa.FaBolt, wifi: fa.FaWifi, med: fa.FaHeartbeat, hotel: fa.FaHotel, stadium: fa.FaFutbol,
    flag: fa.FaFlagCheckered, cubes: fa.FaCubes, gavel: fa.FaGavel, recycle: fa.FaRecycle, plane: fa.FaPlaneArrival, check: fa.FaCheckCircle,
    handshake: fa.FaHandshake, building: fa.FaBuilding, eye: fa.FaEye, wind: fa.FaWind, water: fa.FaWater, seedling: fa.FaSeedling, tv: fa.FaTv };
  for (const [k, v] of Object.entries(iconList)) I[k] = await icon(v);

  // ---------- layouts ----------
  pres.defineSlideMaster({
    title: "TITLE_DARK",
    background: { data: TITLE_BG },
    objects: [],
  });
  pres.defineSlideMaster({
    title: "CONTENT",
    background: { data: CONTENT_BG },
    margin: [0.5, 0.6, 0.7, 0.6],
    objects: [
      { placeholder: { options: { name: "kicker", type: "body", x: 0.6, y: 0.3, w: 9, h: 0.35, fontSize: 13, bold: true, color: C.accent1, charSpacing: 3, margin: 0, valign: "middle" }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.62, w: 12.1, h: 0.85, fontSize: 30, bold: true, color: C.background1, fontFace: "Arial", margin: 0, valign: "top", align: "left" }, text: "" } },
      { placeholder: { options: { name: "source", type: "body", x: 0.6, y: 6.88, w: 9.6, h: 0.4, fontSize: 10, color: C.background2, margin: 0, valign: "middle" }, text: "" } },
      { text: { text: "BANGLADESH 2050  ·  FIFA WORLD CUP™ HOSTING PROPOSAL", options: { x: 10.0, y: 6.88, w: 2.2, h: 0.4, fontSize: 8, color: C.background2, align: "right", valign: "middle", margin: 0 } } },
    ],
    slideNumber: { x: 12.35, y: 6.93, w: 0.4, h: 0.3, fontSize: 10, color: "F2C14E", align: "right" },
  });

  // ---------- helpers ----------
  const shadow = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 90, opacity: 0.35 });
  function card(s, x, y, w, h, opts = {}) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: opts.fill || C.text2, transparency: opts.transparency ?? 0 },
      line: { color: opts.line || C.text2, width: opts.lineW || 0.75 }, shadow: shadow(), objectName: opts.name || "Card" });
  }
  function iconCircle(s, x, y, d, ic, color = C.accent1, name = "Icon") {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color, width: 0 }, objectName: name + " circle" });
    const p = d * 0.24;
    s.addImage({ data: ic, x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: name, altText: name });
  }
  function T(s, text, o) { s.addText(text, Object.assign({ isTextBox: true, margin: 0, fontSize: 14, color: C.background1, valign: "top" }, o)); }
  let sec = "";
  function content(kicker, title, source) {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: sec });
    s.addText(kicker.toUpperCase(), { placeholder: "kicker" });
    s.addText(title, { placeholder: "title" });
    if (source) s.addText(source, { placeholder: "source" });
    return s;
  }
  function section(t) { sec = t; pres.addSection({ title: t }); }
  const chartBase = () => ({
    catAxisLabelColor: "C3CBE6", valAxisLabelColor: "C3CBE6", catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt",
    catAxisLabelFontSize: 12, valAxisLabelFontSize: 11, dataLabelColor: "FFFFFF", dataLabelFontFace: "+mn-lt", dataLabelFontSize: 12,
    valGridLine: { color: "2A3566", size: 0.5 }, catGridLine: { style: "none" }, catAxisLineShow: false, valAxisLineShow: false,
    titleColor: "FFFFFF", titleFontFace: "+mn-lt", titleFontSize: 14, legendColor: "C3CBE6", legendFontFace: "+mn-lt", legendFontSize: 12,
  });
  const tblHead = (arr, fill = C.accent1) => arr.map(t => ({ text: t, options: { bold: true, color: C.text1, fill: { color: fill }, fontSize: 12, valign: "middle" } }));
  const tblRow = (arr, i, firstBold = true) => arr.map((t, j) => ({ text: t, options: { color: C.background1, bold: firstBold && j === 0, fill: { color: i % 2 ? C.text2 : "1D2752" }, fontSize: 12, valign: "middle" } }));
  const tblOpts = (x, y, w, colW) => ({ x, y, w, colW, border: { type: "solid", pt: 0.5, color: "2A3566" }, fontFace: "Calibri", margin: [0.04, 0.08, 0.04, 0.08], autoPage: false });

  // =====================================================================
  // 1. TITLE
  section("Opening");
  {
    const s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: sec });
    s.addImage({ data: EMBLEM, x: 0.8, y: 1.15, w: 1.25, h: 1.25, objectName: "Bangladesh emblem", altText: "Green circle with red disc, inspired by the Bangladesh flag" });
    T(s, "FIFA WORLD CUP™ 2050  ·  HOSTING PROPOSAL", { x: 2.3, y: 1.35, w: 9, h: 0.4, fontSize: 16, bold: true, color: C.accent1, charSpacing: 4 });
    T(s, "Analysis · Section E · Hosting Country: Bangladesh", { x: 2.3, y: 1.75, w: 9, h: 0.5, fontSize: 18, color: C.background2 });
    T(s, [{ text: "Bangladesh 2050", options: { breakLine: true, color: C.background1 } }, { text: "The Road to the World Cup", options: { color: C.accent1 } }],
      { x: 0.8, y: 2.75, w: 11.5, h: 2.0, fontSize: 54, bold: true, fontFace: "Arial", valign: "top" });
    T(s, "Stadium infrastructure & mega-project delivery strategy: four host hubs, a $7.49bn central capital estimate and a 34-year phase-gated roadmap",
      { x: 0.8, y: 4.85, w: 10.5, h: 0.8, fontSize: 18, color: C.background1 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 5.9, w: 7.9, h: 0.7, rectRadius: 0.1, fill: { color: C.text2, transparency: 25 }, line: { color: C.accent1, width: 1 }, objectName: "Audience pill" });
    T(s, "Prepared for: Government of Bangladesh  ·  Board of Chief Officers  ·  Multinational Sponsor & Investor Partners",
      { x: 1.0, y: 5.9, w: 7.6, h: 0.7, fontSize: 13, color: C.background1, valign: "middle" });
    T(s, "Planning proposal: not an approved bid or a statement of confirmed FIFA 2050 requirements",
      { x: 0.8, y: 6.8, w: 9, h: 0.35, fontSize: 11, italic: true, color: C.background2 });
    s.addNotes("Welcome. Today we present a long-term proposal for Bangladesh to take part in hosting the FIFA World Cup in 2050. It is a planning proposal, not an approved bid. We will cover why the World Cup matters, where Bangladesh would play, what it would cost, who would deliver it, and how risks are controlled.");
  }

  // 2. THE STAGE — global audience
  {
    const s = content("Chapter 1 · Why the World Cup", "Billions watch every World Cup",
      "Sources: FIFA 2010 Financial Report; VOA News (2014 audience); FIFA 2018 audience report; FIFA Annual Report 2022; FIFA 2026 revenue statement. 2026 figures are expected, not final.");
    // stat callouts
    const stats = [["4.19bn", "average global audience per World Cup, 2010–2026", C.accent1], ["$35.15bn", "reported FIFA revenue across the five editions", C.accent2], ["≈6bn", "expected global viewers for 2026 (USA/Mexico/Canada)", C.accent4]];
    stats.forEach((st, i) => {
      const y = 1.75 + i * 1.65;
      card(s, 0.6, y, 4.3, 1.45, { name: "Stat card " + (i + 1) });
      T(s, st[0], { x: 0.85, y: y + 0.12, w: 3.9, h: 0.75, fontSize: 40, bold: true, color: st[2], fontFace: "Arial" });
      T(s, st[1], { x: 0.85, y: y + 0.88, w: 3.9, h: 0.5, fontSize: 14, color: C.background2 });
    });
    card(s, 5.2, 1.75, 7.5, 4.75, { name: "Chart card" });
    s.addChart(pres.charts.BAR, [{ name: "Global viewers (billions)", labels: ["2010 South Africa", "2014 Brazil", "2018 Russia", "2022 Qatar", "2026 USA/MEX/CAN*"], values: [3.2, 3.2, 3.572, 5.0, 6.0] }],
      Object.assign(chartBase(), { x: 5.4, y: 1.9, w: 7.1, h: 4.45, barDir: "col", chartColors: ["4FB3FF", "4FB3FF", "4FB3FF", "F2C14E", "1FBF7A"], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0#\"bn\"",
        showTitle: true, title: "Global viewers per World Cup (billions)", showLegend: false, valAxisHidden: true, valGridLine: { style: "none" }, barGapWidthPct: 55, objectName: "Viewers chart" }));
    s.addNotes("Why the World Cup? Because no other event offers this reach. Over five editions from 2010 to 2026 the average audience was about 4.19 billion, and FIFA reported around 35 billion dollars in revenue. The 2026 figure of about 6 billion viewers is expected, not final.");
  }

  // 3. Money: FIFA revenue vs expense + who captures value
  {
    const s = content("Chapter 1 · Follow the money", "FIFA's surplus is not Bangladesh's benefit",
      "Sources: FIFA financial reports 2010–2022; FIFA 2026 revenue statement. 2022 expenses and surplus are approximate (≈). 2026 budget $8.911bn and ≈$15bn revenue are reported/expected, not final.");
    card(s, 0.6, 1.75, 7.4, 4.85, { name: "Chart card" });
    s.addChart(pres.charts.BAR, [
      { name: "FIFA tournament budget / expenses", labels: ["2010", "2014", "2018", "2022"], values: [1.30, 2.224, 1.824, 1.8] },
      { name: "FIFA revenue", labels: ["2010", "2014", "2018", "2022"], values: [3.655, 4.826, 5.357, 6.314] },
      { name: "Approx. FIFA surplus", labels: ["2010", "2014", "2018", "2022"], values: [2.357, 2.602, 3.533, 4.49] },
    ], Object.assign(chartBase(), { x: 0.8, y: 1.9, w: 7.0, h: 4.55, barDir: "col", chartColors: ["F2475A", "F2C14E", "1FBF7A"], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0", dataLabelFontSize: 10,
      showTitle: true, title: "FIFA finances per edition (USD bn)", showLegend: true, legendPos: "b", valAxisHidden: true, valGridLine: { style: "none" }, barGapWidthPct: 40, objectName: "FIFA finance chart" }));
    const rows = [
      [I.trophy, "FIFA (event organiser)", "Keeps tournament revenue and surplus from broadcasting and sponsorship.", C.accent1],
      [I.gov, "Host government", "Potential tax revenue, plus infrastructure and global visibility.", C.accent4],
      [I.handshake, "Local private firms", "Hospitality, tourism, construction and services demand.", C.accent2],
    ];
    rows.forEach((r, i) => {
      const y = 1.75 + i * 1.65;
      card(s, 8.3, y, 4.4, 1.45, { name: "Value card " + (i + 1) });
      iconCircle(s, 8.5, y + 0.3, 0.8, r[0], r[3], r[1] + " icon");
      T(s, r[1], { x: 9.5, y: y + 0.18, w: 3.05, h: 0.4, fontSize: 16, bold: true });
      T(s, r[2], { x: 9.5, y: y + 0.6, w: 3.05, h: 0.8, fontSize: 13, color: C.background2 });
    });
    s.addNotes("This slide is about honesty for investors. FIFA's revenue and surplus stay with FIFA. The host benefits in different ways: the government through possible tax revenue, infrastructure and global visibility, and private firms through hospitality, tourism and construction. We keep these three apart and never use FIFA's surplus as proof of Bangladesh's gain.");
  }

  // 4. Story map / agenda
  {
    const s = content("Our story today", "Six chapters, one national plan");
    const ch = [
      ["01", "Why the World Cup", "Global reach and who captures value", I.globe, C.accent4],
      ["02", "Where we play", "Four host hubs, FIFA baseline and the gap", I.map, C.accent2],
      ["03", "What it costs", "Cost model, P10–P90 scenarios and funding routes", I.money, C.accent1],
      ["04", "Who delivers", "Governance, BWCDA, RACI and roadmap to 2060", I.gov, C.accent6],
      ["05", "How we de-risk", "Climate engineering, risk register and controls", I.shield, C.accent3],
      ["06", "What we leave behind", "Modular legacy, lessons and recommendations", I.recycle, C.accent5],
    ];
    ch.forEach((c, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 0.6 + col * 4.1, y = 1.8 + row * 2.45;
      card(s, x, y, 3.85, 2.2, { name: "Chapter " + c[0] });
      iconCircle(s, x + 0.25, y + 0.3, 0.85, c[3], c[4], "Chapter " + c[0] + " icon");
      T(s, c[0], { x: x + 2.55, y: y + 0.25, w: 1.1, h: 0.7, fontSize: 36, bold: true, color: c[4], align: "right", fontFace: "Arial" });
      T(s, c[1], { x: x + 0.25, y: y + 1.25, w: 3.4, h: 0.4, fontSize: 18, bold: true });
      T(s, c[2], { x: x + 0.25, y: y + 1.65, w: 3.4, h: 0.5, fontSize: 13, color: C.background2 });
    });
    s.addNotes("Here is the route through today's story, in six chapters.");
  }

  // 5. Executive summary — core strategic direction
  {
    const s = content("Executive summary", "Five choices define the Bangladesh model",
      "Source: Analysis, Section E > Hosting Country > Bangladesh, §1 Executive Summary. Capacities are planning assumptions that require feasibility studies.");
    const items = [
      [I.handshake, "Hosting model", "Regional co-hosting with South or Southeast Asian partners as the main option to assess, with an independent bid kept as the alternative.", C.accent4],
      [I.map, "Four venue hubs", "Dhaka 85,000 · Chattogram 65,000 · Cox's Bazar 45,000 · Sylhet 45,000 gross seats.", C.accent2],
      [I.cubes, "Modular stadiums", "Removable upper tiers at Cox's Bazar and Sylhet; reduce to about 20,000–30,000 seats after the tournament.", C.accent1],
      [I.cloud, "Climate resilience", "Foundations for local soils, cyclone and storm-surge protection, roof weather cover and monsoon-grade pitch drainage.", C.accent5],
      [I.gavel, "Governance & controls", "An accountable delivery body with phase-gate approvals, Earned Value Management, independent assurance and change control.", C.accent6],
    ];
    items.forEach((it, i) => {
      const y = 1.7 + i * 1.0;
      card(s, 0.6, y, 12.1, 0.85, { name: "Summary row " + (i + 1) });
      iconCircle(s, 0.78, y + 0.1, 0.65, it[0], it[3], it[1] + " icon");
      T(s, it[1], { x: 1.65, y, w: 2.7, h: 0.85, fontSize: 17, bold: true, valign: "middle" });
      T(s, it[2], { x: 4.4, y, w: 8.1, h: 0.85, fontSize: 14, color: C.background2, valign: "middle" });
    });
    s.addNotes("Our proposal comes down to five choices. First, co-hosting with regional partners to share costs and risks. Second, four candidate hubs. Third, modular stadiums so we don't build white elephants. Fourth, engineering for Bangladesh's climate. Fifth, strong governance and cost control from day one.");
  }

  // =====================================================================
  section("Where we play");
  // 6. Four hubs map
  {
    const s = content("Chapter 2 · Where we play", "Four host hubs, 240,000 tournament seats",
      "Source: Analysis §4 National venue distribution strategy. Map is schematic (approximate positions, not to scale). Sites and capacities are planning assumptions pending feasibility studies.");
    // schematic map panel
    card(s, 0.6, 1.7, 6.0, 5.0, { name: "Map panel", fill: "0E2A3A" });
    T(s, "BANGLADESH", { x: 0.8, y: 1.85, w: 3, h: 0.4, fontSize: 14, bold: true, color: C.background2, charSpacing: 6 });
    T(s, "Bay of Bengal", { x: 1.0, y: 6.1, w: 3, h: 0.4, fontSize: 13, italic: true, color: C.accent4 });
    // lon 88.0–92.8 -> x 0.9–6.2 ; lat 26.0–20.9 -> y 2.1–6.4
    const px = lon => 0.9 + (lon - 88.0) / 4.8 * 5.3, py = lat => 2.1 + (26.0 - lat) / 5.1 * 4.3;
    const cities = [["Dhaka", 90.40, 23.81, 85, C.accent1], ["Sylhet", 91.87, 24.89, 45, C.accent2], ["Chattogram", 91.78, 22.36, 65, C.accent4], ["Cox's Bazar", 91.98, 21.43, 45, C.accent5]];
    const D = Object.fromEntries(cities.map(c => [c[0], [px(c[1]), py(c[2])]]));
    [["Dhaka", "Sylhet"], ["Dhaka", "Chattogram"], ["Chattogram", "Cox's Bazar"]].forEach(([a, b], i) => {
      const [x1, y1] = D[a], [x2, y2] = D[b];
      s.addShape(pres.shapes.LINE, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1) || 0.01, h: Math.abs(y2 - y1) || 0.01,
        flipH: (x2 < x1) !== (y2 < y1), line: { color: C.background2, width: 1.5, dashType: "dash" }, objectName: "Link " + a + "-" + b });
    });
    cities.forEach(c => {
      const [x, y] = D[c[0]]; const d = 0.25 + c[3] / 85 * 0.35;
      s.addShape(pres.shapes.OVAL, { x: x - d / 2, y: y - d / 2, w: d, h: d, fill: { color: c[4] }, line: { color: C.background1, width: 2 }, objectName: c[0] + " marker" });
      const left = c[0] === "Dhaka";
      T(s, [{ text: c[0], options: { bold: true, breakLine: true } }, { text: c[3] + ",000 seats", options: { color: C.background2, fontSize: 12 } }],
        { x: left ? x - 2.15 : x + 0.35, y: y - 0.3, w: 1.8, h: 0.6, fontSize: 14, align: left ? "right" : "left" });
    });
    // hub cards
    const hubs = [
      ["Dhaka · Purbachal New Town", "National flagship venue & programme coordination hub", "85,000", C.accent1],
      ["Chattogram · Sagarika–Sitakunda corridor", "Southeastern venue; port city with international airport", "65,000", C.accent4],
      ["Cox's Bazar · inland northern outskirts", "Tourism venue linked to the coastal economy", "45,000", C.accent5],
      ["Sylhet · northern / NE growth area", "Northeastern venue & tourism gateway", "45,000", C.accent2],
    ];
    hubs.forEach((h, i) => {
      const y = 1.7 + i * 1.27;
      card(s, 6.9, y, 5.8, 1.12, { name: "Hub card " + (i + 1) });
      T(s, h[2], { x: 7.05, y, w: 1.55, h: 1.12, fontSize: 26, bold: true, color: h[3], valign: "middle", fontFace: "Arial" });
      T(s, h[0], { x: 8.7, y: y + 0.12, w: 3.9, h: 0.4, fontSize: 15, bold: true });
      T(s, h[1], { x: 8.7, y: y + 0.52, w: 3.9, h: 0.55, fontSize: 13, color: C.background2 });
    });
    s.addNotes("These are the four candidate hubs. Dhaka at Purbachal is the 85,000-seat flagship. Chattogram is the southeastern hub at 65,000. Cox's Bazar connects the tournament with coastal tourism, on safer inland land rather than the beachfront. Sylhet is the northeastern gateway. All four are planning assumptions that still need feasibility studies.");
  }

  // 7. Site evaluation scorecard
  {
    const s = content("Chapter 2 · Site evaluation", "Dhaka leads the site scorecard at 88/100",
      "Source: Analysis §10.2 Candidate Host City and Site Evaluation Matrix. Scores, land areas and locations are preliminary planning assumptions, not completed surveys; weights must be documented.");
    card(s, 0.6, 1.7, 4.6, 5.0, { name: "Score chart card" });
    s.addChart(pres.charts.BAR, [{ name: "Preliminary score", labels: ["Dhaka", "Chattogram", "Sylhet", "Cox's Bazar"], values: [88, 81, 76, 74] }],
      Object.assign(chartBase(), { x: 0.75, y: 1.85, w: 4.3, h: 4.7, barDir: "bar", chartColors: ["F2C14E", "4FB3FF", "1FBF7A", "FF9340"], showValue: true, dataLabelPosition: "outEnd",
        showTitle: true, title: "Preliminary score (/100)", showLegend: false, valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 100, valGridLine: { style: "none" }, barGapWidthPct: 45, catAxisOrientation: "maxMin", objectName: "Score chart" }));
    const rows = [
      ["Dhaka", "45–55 ha", "Alluvial clay, settlement, waterlogging", "MRT Line 1, expressway, HSIA, ring road"],
      ["Chattogram", "35–45 ha", "Storm surge, high winds, salt corrosion", "Dhaka–Ctg highway, rail, Shah Amanat Airport"],
      ["Cox's Bazar", "25–35 ha", "Cyclones, flooding, salinity", "Rail link, N1 highway, Cox's Bazar Airport"],
      ["Sylhet", "25–35 ha", "Seismic risk, intense rain, flash floods", "Osmani Airport, Dhaka–Sylhet road & rail"],
    ];
    s.addTable([tblHead(["City", "Land", "Main site risks", "Transport links"]), ...rows.map((r, i) => tblRow(r, i))],
      Object.assign(tblOpts(5.5, 1.7, 7.2, [1.35, 1.05, 2.4, 2.4]), { rowH: [0.45, 0.85, 0.85, 0.85, 0.85] }));
    T(s, "17 evaluation criteria: land, title, zoning, resettlement, EIA, flood resilience, soils, roads, mass transit, airport/rail, utilities, emergency routes, hotels, construction logistics, expansion space, community acceptance, legacy use",
      { x: 5.5, y: 5.75, w: 7.2, h: 0.9, fontSize: 12, italic: true, color: C.background2 });
    s.addNotes("We scored each site on 17 criteria. Dhaka leads at 88 thanks to planned urban growth and transport links, though soft soil is its main risk. Chattogram scores 81, Sylhet 76 and Cox's Bazar 74. These scores are preliminary; a formal model must document the evidence and weights behind them.");
  }

  // 8. FIFA baseline
  {
    const s = content("Chapter 2 · The bar we must clear", "The FIFA bar: a 48-team, 104-match World Cup",
      "Source: Analysis §3.1 Regulatory and technical baselines. Planning assumptions based on the 48-team model; confirm against applicable FIFA documentation for 2050.");
    const caps = [["40,000", "net seats", "Group stage & early knockouts", C.accent4], ["60,000", "net seats", "Semi-finals", C.accent2], ["80,000", "net seats", "Opening match & final", C.accent1]];
    caps.forEach((c, i) => {
      const x = 0.6 + i * 2.55, hgt = 1.6 + i * 0.6, y = 5.0 - hgt + 1.3;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.3, h: hgt, rectRadius: 0.1, fill: { color: c[3] }, line: { color: c[3], width: 0 }, objectName: "Capacity step " + (i + 1) });
      T(s, c[0], { x, y: y + 0.15, w: 2.3, h: 0.6, fontSize: 30, bold: true, color: C.text1, align: "center", fontFace: "Arial" });
      T(s, c[1], { x, y: y + 0.72, w: 2.3, h: 0.3, fontSize: 13, color: C.text1, align: "center" });
      T(s, c[2], { x: x + 0.1, y: y + hgt - 0.65, w: 2.1, h: 0.55, fontSize: 13, bold: true, color: C.text1, align: "center" });
    });
    T(s, "Stadium capacity by match category", { x: 0.6, y: 1.75, w: 7.5, h: 0.4, fontSize: 16, bold: true, color: C.accent1 });
    const reqs = [
      [I.stadium, "Field of play", "105 m × 68 m pitch; auxiliary area of at least 125 m × 85 m"],
      [I.hotel, "Team base camps", "Paired hotel + training sites; 20-minute travel target"],
      [I.shield, "Safety & operations", "Venue Operations Centre, security zones, emergency egress"],
      [I.bolt, "Power & comms", "Redundant power and IT for broadcast, VAR and ticketing; 99.999% target to be validated"],
    ];
    reqs.forEach((r, i) => {
      const y = 1.75 + i * 1.22;
      card(s, 8.4, y, 4.3, 1.07, { name: "Requirement " + (i + 1) });
      iconCircle(s, 8.55, y + 0.2, 0.66, r[0], C.accent1, r[1] + " icon");
      T(s, r[1], { x: 9.35, y: y + 0.1, w: 3.25, h: 0.35, fontSize: 15, bold: true });
      T(s, r[2], { x: 9.35, y: y + 0.45, w: 3.25, h: 0.6, fontSize: 12, color: C.background2 });
    });
    s.addNotes("This is the bar we have to clear, based on the 48-team, 104-match format: 40,000 net seats for group matches, 60,000 for semi-finals and 80,000 for the opening match and final. That is why Dhaka is planned at 85,000 gross seats. We also need standard pitches, team base camps within about 20 minutes, a Venue Operations Centre, and resilient power and communications.");
  }

  // 9. Gap analysis
  {
    const s = content("Chapter 2 · Honest diagnosis", "No existing venue is assumed FIFA-compliant",
      "Source: Analysis §4.1, Table 1 Bangladesh–FIFA Gap Analysis. Current positions require formal technical audits.");
    const rows = [
      ["Stadium network", "Shortage of football-specific, covered, high-capacity stadiums", "Four new venues + co-hosting"],
      ["Pitch & agronomy", "Drainage, turf reinforcement, recovery after heavy rain", "Hybrid turf, root-zone aeration, grow lights"],
      ["Team base camps", "Limited high-end hotels; travel reliability", "Dedicated training sites + paired hotels per hub"],
      ["Urban transport", "Venue access & station-to-stadium links (MRT Line 6 operating)", "Integrate MRT, expressways, buses, park-and-ride"],
      ["Inter-city travel", "Variable travel times; highway congestion", "Rail upgrades, airport capacity, smart scheduling"],
      ["Power", "Grid outage could hit lighting, broadcast, control", "Dual feeds, generators, UPS, solar microgrids"],
      ["Telecoms", "Network congestion during major events", "Distributed antennas, diverse fibre, tested backups"],
      ["Healthcare", "Traffic may delay ambulance transfers", "Medical suites, emergency routes, hospital agreements"],
      ["Worker welfare", "Heat exposure, labour compliance, supply chain", "Enforceable welfare clauses + standards"],
    ];
    s.addTable([tblHead(["Dimension", "Main gap to address", "Proposed 2050 direction"]), ...rows.map((r, i) => tblRow(r, i))],
      Object.assign(tblOpts(0.6, 1.65, 12.1, [2.3, 5.2, 4.6]), { rowH: 0.47 }));
    s.addNotes("Here we are honest about where Bangladesh stands today. Existing venues such as Bangabandhu National Stadium need technical audits before we can count on them. The big gaps are high-capacity football stadiums, drainage, hotels, last-mile transport, power redundancy and network capacity. Each gap is matched with a 2050 direction.");
  }

  // =====================================================================
  section("What it costs");
  // 10. Cost model
  {
    const s = content("Chapter 3 · The investment case", "$13,500 per seat, adjusted for Bangladesh",
      "Source: Analysis §5–5.2. Venue figures here = benchmark × capacity (core construction only, derived for illustration; full venue tables are in the linked model sheets). All values are 2026 USD estimates, not quotations.");
    card(s, 0.6, 1.7, 6.2, 5.0, { name: "Core cost chart card" });
    s.addChart(pres.charts.BAR, [{ name: "Core construction allowance ($M)", labels: ["Dhaka 85k", "Chattogram 65k", "Cox's Bazar 45k", "Sylhet 45k"], values: [1147.5, 877.5, 607.5, 607.5] }],
      Object.assign(chartBase(), { x: 0.75, y: 1.85, w: 5.9, h: 4.0, barDir: "col", chartColors: ["F2C14E", "4FB3FF", "FF9340", "1FBF7A"], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "$#,##0\"M\"",
        showTitle: true, title: "Core stadium construction (USD M, derived)", showLegend: false, valAxisHidden: true, valGridLine: { style: "none" }, barGapWidthPct: 45, objectName: "Core cost chart" }));
    T(s, [{ text: "$3.24bn ", options: { bold: true, color: C.accent1, fontSize: 22 } }, { text: "core construction for 240,000 seats, before land, transport, utilities, financing and contingency", options: { color: C.background2 } }],
      { x: 0.85, y: 5.85, w: 5.8, h: 0.8, fontSize: 13, valign: "middle" });
    const adj = [
      ["−25%", "Local labour vs Qatar comparator rate (labour component only)", C.accent2],
      ["+10%", "Imported technical-equipment premium (not a statutory tariff)", C.accent5],
      ["+15%", "Geotechnical & climate-resilience premium on affected items", C.accent3],
      ["40–60 m", "Preliminary deep bored-pile depth range", C.accent4],
      ["16%", "Interest during construction = 8% × 50% drawdown × 4 years", C.accent6],
    ];
    adj.forEach((a, i) => {
      const y = 1.7 + i * 1.0;
      card(s, 7.1, y, 5.6, 0.85, { name: "Adjustment " + (i + 1) });
      T(s, a[0], { x: 7.25, y, w: 1.6, h: 0.85, fontSize: 22, bold: true, color: a[2], valign: "middle", fontFace: "Arial" });
      T(s, a[1], { x: 8.9, y, w: 3.7, h: 0.85, fontSize: 13, color: C.background1, valign: "middle" });
    });
    s.addNotes("Here is how we cost it. We benchmark against completed Qatar stadiums at 13,500 dollars per gross seat. Multiplying by capacity gives about 3.24 billion dollars of core construction across the four venues. We then adjust for Bangladesh: cheaper labour, a premium on imported equipment, a climate and soil premium, deep piling, and about 16 percent interest during construction. All of these are planning assumptions that need verification.");
  }

  // 11. Budget scenarios
  {
    const s = content("Chapter 3 · Risk-adjusted budget", "Central (P50) budget: about $7.49bn",
      "Source: Analysis §5.2 & §8. P50 $7.49bn as stated in the source. P10 and P90 shown here are derived (P50 ÷ 1.28 × 1.10 / × 1.55); verify against the source model. Flyvbjerg, Holm & Buhl (2002).");
    card(s, 0.6, 1.7, 6.6, 5.0, { name: "Scenario chart card" });
    s.addChart(pres.charts.BAR, [{ name: "Programme total (USD bn)", labels: ["P10 · +10%", "P50 · +28%", "P90 · +55%"], values: [6.44, 7.49, 9.07] }],
      Object.assign(chartBase(), { x: 0.75, y: 1.85, w: 6.3, h: 4.7, barDir: "col", chartColors: ["1FBF7A", "F2C14E", "F2475A"], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "$0.00\"bn\"", dataLabelFontSize: 14,
        showTitle: true, title: "Programme total by contingency scenario (USD bn, 2026)", showLegend: false, valAxisHidden: true, valAxisMinVal: 0, valGridLine: { style: "none" }, barGapWidthPct: 50, objectName: "Scenario chart" }));
    T(s, "Why a 28% contingency? Mega-project evidence", { x: 7.5, y: 1.7, w: 5.2, h: 0.4, fontSize: 16, bold: true, color: C.accent1 });
    const fl = [["28%", "average cost overrun above estimates"], ["86%", "of projects had underestimated costs"], ["39 pp", "standard deviation of overruns"]];
    fl.forEach((f, i) => {
      const x = 7.5 + i * 1.77;
      card(s, x, 2.2, 1.62, 1.55, { name: "Flyvbjerg stat " + (i + 1) });
      T(s, f[0], { x, y: 2.3, w: 1.62, h: 0.6, fontSize: 26, bold: true, color: C.accent3, align: "center", fontFace: "Arial" });
      T(s, f[1], { x: x + 0.1, y: 2.9, w: 1.42, h: 0.8, fontSize: 11, color: C.background2, align: "center" });
    });
    card(s, 7.5, 4.0, 5.2, 2.7, { name: "Excluded card", fill: "2A1530", line: C.accent3 });
    T(s, "Not included in $7.49bn", { x: 7.7, y: 4.1, w: 4.8, h: 0.4, fontSize: 15, bold: true, color: C.accent3 });
    T(s, [
      { text: "National transport networks & airport expansion", options: { bullet: true, breakLine: true } },
      { text: "Accommodation districts & training-site programmes", options: { bullet: true, breakLine: true } },
      { text: "Citywide flood protection; land outside venue envelopes", options: { bullet: true, breakLine: true } },
      { text: "Taxes not captured; tournament operating costs", options: { bullet: true } },
    ], { x: 7.7, y: 4.5, w: 4.85, h: 2.1, fontSize: 13, color: C.background1, paraSpaceAfter: 4 });
    s.addNotes("This is the most important number for investors. The central P50 estimate is about 7.49 billion dollars. It is not a sanctioned budget. The 28 percent contingency follows Flyvbjerg's finding that projects averaged 28 percent above estimate, with 86 percent underestimated. The P10 and P90 values on this chart are derived from the P50 and should be checked against the source model. The total also excludes transport networks, hotels, flood protection and operating costs.");
  }

  // 12. Funding & investor / sponsor opportunities
  {
    const s = content("Chapter 3 · Investment clarity", "Funding routes for government and sponsors",
      "Source: Analysis §11 Table 4 (funding routes), §13.2 (PPP Act 2015, BPPA), §16 Table 1 (revenue sources). Final funding mix requires Ministry of Finance and PPP Authority confirmation.");
    const cols = [
      ["Government & public", C.accent4, I.gov, ["National budget: land, soil & environment studies", "National security budget: VOC, perimeter, policing", "Sovereign / EPC financing: power, water & MEP", "National legacy fund & venue sinking fund"]],
      ["Development & green finance", C.accent2, I.leaf, ["Development finance: masterplan & transport", "Green finance (where available): sustainability package", "IDC planning rate 8% p.a., to be confirmed with lenders", "Debt/equity mix, currency & hedging to be set"]],
      ["Private, PPP & sponsors", C.accent1, I.handshake, ["PPP under the PPP Act 2015: hotels, retail, commercial facilities", "Stadium naming rights & retail concessions", "Concerts, conventions, trade & tourism events", "Professional venue operators via transparent contracts"]],
    ];
    cols.forEach((c, i) => {
      const x = 0.6 + i * 4.1;
      card(s, x, 1.7, 3.85, 4.15, { name: c[0] + " card" });
      iconCircle(s, x + 0.25, 1.9, 0.75, c[2], c[1], c[0] + " icon");
      T(s, c[0], { x: x + 1.15, y: 1.9, w: 2.6, h: 0.75, fontSize: 17, bold: true, color: c[1], valign: "middle" });
      T(s, c[3].map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < c[3].length - 1 } })), { x: x + 0.25, y: 2.85, w: 3.4, h: 2.9, fontSize: 14, color: C.background1, paraSpaceAfter: 8 });
    });
    card(s, 0.6, 6.0, 12.1, 0.72, { name: "Investor safeguard", fill: "13301F", line: C.accent2 });
    iconCircle(s, 0.75, 6.08, 0.56, I.check, C.accent2, "Safeguard icon");
    T(s, "Investor safeguards: transparent e-procurement (BPPA), clear risk allocation in concessions, independent demand forecasts and stress-tested revenue before commitment",
      { x: 1.5, y: 6.0, w: 11.1, h: 0.72, fontSize: 14, valign: "middle" });
    s.addNotes("For our sponsor and investor partners, here is where money comes from and where you fit in. Government covers land, studies and security. Development and green finance support transport and sustainability. The private side, through PPPs under the 2015 Act, covers hotel districts, retail, naming rights and events. Every concession must allocate risk clearly and protect the public balance sheet.");
  }

  // =====================================================================
  section("Who delivers");
  // 13. Governance org chart
  {
    const s = content("Chapter 4 · Who delivers", "One chain of command, Cabinet to venue",
      "Source: Analysis §1 Proposed governance structure; §13.1. BWCDA is a proposed new statutory body requiring an Act of Parliament, not an existing authority.");
    const box = (x, y, w, h, title, sub, color, name) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: C.text2 }, line: { color, width: 2 }, shadow: shadow(), objectName: name });
      T(s, [{ text: title, options: { bold: true, fontSize: 15, breakLine: true } }, { text: sub, options: { fontSize: 12, color: C.background2 } }], { x: x + 0.1, y, w: w - 0.2, h, align: "center", valign: "middle" });
    };
    const vline = (x, y1, y2, n) => s.addShape(pres.shapes.LINE, { x, y: y1, w: 0, h: y2 - y1, line: { color: C.accent1, width: 1.5 }, objectName: n });
    box(4.4, 1.65, 4.5, 0.85, "Level 1 · Cabinet / Prime Minister's Office", "National direction, major policy & funding", C.accent1, "L1");
    vline(6.65, 2.5, 2.8, "c1");
    box(4.4, 2.8, 4.5, 0.85, "Level 2 · National Mega-Project Steering Committee", "Oversight & ministry coordination", C.accent1, "L2");
    vline(6.65, 3.65, 3.95, "c2");
    box(4.4, 3.95, 4.5, 0.85, "Level 3 · BWCDA Central PMO", "Plans, risks, delivery tracking", C.accent1, "L3");
    // independent engineer side box
    box(9.6, 3.95, 3.1, 0.85, "Independent Engineer & Auditor", "Design, cost, schedule & procurement review", C.accent3, "IE");
    s.addShape(pres.shapes.LINE, { x: 8.9, y: 4.375, w: 0.7, h: 0, line: { color: C.accent3, width: 1.5, dashType: "dash" }, objectName: "IE link" });
    // venue teams
    s.addShape(pres.shapes.LINE, { x: 6.65, y: 4.8, w: 0, h: 0.35, line: { color: C.accent1, width: 1.5 }, objectName: "c3" });
    s.addShape(pres.shapes.LINE, { x: 2.05, y: 5.15, w: 9.2, h: 0, line: { color: C.accent1, width: 1.5 }, objectName: "bus" });
    const teams = [["4A · Dhaka", C.accent1], ["4B · Chattogram", C.accent4], ["4C · Cox's Bazar", C.accent5], ["4D · Sylhet", C.accent2]];
    teams.forEach((t, i) => {
      const x = 0.6 + i * 3.07;
      s.addShape(pres.shapes.LINE, { x: x + 1.45, y: 5.15, w: 0, h: 0.3, line: { color: C.accent1, width: 1.5 }, objectName: "drop" + i });
      box(x, 5.45, 2.9, 1.1, t[0] + " Venue Team", "Venue, transport, utilities & local preparation", t[1], "Team " + t[0]);
    });
    // left info
    T(s, "Ministries coordinated", { x: 0.6, y: 1.7, w: 3.5, h: 0.35, fontSize: 14, bold: true, color: C.accent1 });
    T(s, ["Finance", "Youth & Sports", "Housing & Public Works", "Home Affairs", "Foreign Affairs"].map((t, k, a) => ({ text: t, options: { bullet: true, breakLine: k < a.length - 1 } })),
      { x: 0.6, y: 2.1, w: 3.5, h: 2.3, fontSize: 14, color: C.background1, paraSpaceAfter: 4 });
    s.addNotes("Delivery needs one clear chain of command. The Cabinet and Prime Minister's Office set direction. A National Mega-Project Steering Committee coordinates ministries. A proposed Bangladesh World Cup Delivery Authority, BWCDA, runs the central PMO, and four venue teams deliver on the ground. An Independent Engineer and Auditor reports separately to protect independence.");
  }

  // 14. RACI
  {
    const s = content("Chapter 4 · Board of chief officers", "RACI: one accountable owner per decision",
      "Source: Analysis §13.2 Table 1 RACI Responsibility Matrix. R = Responsible, A = Accountable, C = Consulted, I = Informed. Proposed; to be reconciled with law and FIFA roles.");
    const rows = [
      ["National hosting strategy & bid guarantees", "A", "R", "C", "C", "I"],
      ["Site identification & land acquisition", "A", "R", "R", "C / verify", "I"],
      ["Architectural design & safety review", "I", "A", "R", "C / review", "C"],
      ["Tender evaluation & contract award", "I", "A", "R", "C / audit", "I"],
      ["Construction supervision & QC", "I", "A", "R", "Certify", "I / inspect"],
      ["Power, MEP & pitch integration", "I", "A", "R", "Tech verify", "C"],
      ["Security & emergency plans", "C", "A", "R", "Safety review", "C"],
      ["Budget variance & EVM escalation", "A (major)", "R", "C", "Audit", "I"],
      ["Venue acceptance & handover", "I", "A", "R", "Assurance", "Accept / inspect"],
      ["Legacy works & modular reconfiguration", "C", "A", "R", "Assurance", "I"],
    ];
    const colorFor = v => v.startsWith("A") ? "F2C14E" : v.startsWith("R") ? "1FBF7A" : null;
    const body = rows.map((r, i) => r.map((t, j) => {
      const c = j > 0 ? colorFor(t) : null;
      return { text: t, options: { color: c ? C.text1 : C.background1, bold: j === 0 || !!c, align: j ? "center" : "left", fill: { color: c ? c : (i % 2 ? C.text2 : "1D2752") }, fontSize: 12, valign: "middle" } };
    }));
    s.addTable([tblHead(["Workstream / decision", "Central govt", "BWCDA PMO", "Venue teams", "Indep. engineer", "FIFA"]).map((h, j) => (h.options.align = j ? "center" : "left", h)), ...body],
      Object.assign(tblOpts(0.6, 1.65, 12.1, [4.1, 1.5, 1.5, 1.5, 1.7, 1.8]), { rowH: 0.44 }));
    T(s, [{ text: "■ A = Accountable   ", options: { color: C.accent1, bold: true } }, { text: "■ R = Responsible   ", options: { color: C.accent2, bold: true } }, { text: "C = Consulted · I = Informed", options: { color: C.background2 } }],
      { x: 0.6, y: 6.5, w: 8, h: 0.3, fontSize: 12 });
    s.addNotes("For the Board of Chief Officers: this RACI matrix shows who is accountable for each decision. Central government is accountable for the hosting strategy, land and major budget approvals. The BWCDA PMO is accountable for design, tenders, construction and handover. Venue teams carry out the work, and the independent engineer verifies it.");
  }

  // 15. Roadmap
  {
    const s = content("Chapter 4 · Roadmap", "A phase-gated journey: 2026 → 2050 → 2060",
      "Source: Analysis §12 Implementation Roadmap and Phase-Gate Roadmap (T-24 to T+10). Proposed sequence, not a confirmed FIFA schedule; phases overlap.");
    const ph = [
      ["2026–30", "Feasibility & hosting strategy", "Gate 0 · Go / no-go", C.accent4],
      ["2030–34", "Site selection & institutional setup", "Gate 1 · Land & EIA", C.accent4],
      ["2034–37", "Master planning & engineering", "Gate 2 · Design freeze", C.accent6],
      ["2036–38", "Financing & procurement", "Gate 3 · Financial close", C.accent6],
      ["2038–46", "Construction & installation", "Gate 4 · Structure done", C.accent5],
      ["2046–49", "Testing & readiness", "Gate 5 · Inspections", C.accent5],
      ["2049–50", "Tournament delivery", "Gate 6 · Matchday ready", C.accent1],
      ["2050–60", "Post-tournament legacy", "Gate 7 · Handover", C.accent2],
    ];
    const x0 = 0.6, step = 12.1 / 8;
    s.addShape(pres.shapes.LINE, { x: x0 + 0.2, y: 3.35, w: 12.1 - 0.4, h: 0, line: { color: C.background2, width: 2 }, objectName: "Timeline axis" });
    ph.forEach((p, i) => {
      const cx = x0 + step * i + step / 2;
      s.addShape(pres.shapes.OVAL, { x: cx - 0.32, y: 3.03, w: 0.64, h: 0.64, fill: { color: p[3] }, line: { color: C.background1, width: 2 }, objectName: "Gate " + i });
      T(s, String(i + 1), { x: cx - 0.32, y: 3.03, w: 0.64, h: 0.64, fontSize: 18, bold: true, color: C.text1, align: "center", valign: "middle" });
      T(s, p[0], { x: cx - step / 2 + 0.05, y: 2.35, w: step - 0.1, h: 0.45, fontSize: 16, bold: true, color: p[3], align: "center" });
      card(s, cx - step / 2 + 0.06, 3.95, step - 0.12, 2.0, { name: "Phase card " + (i + 1) });
      T(s, p[1], { x: cx - step / 2 + 0.14, y: 4.05, w: step - 0.28, h: 1.1, fontSize: 13, bold: true });
      T(s, p[2], { x: cx - step / 2 + 0.14, y: 5.15, w: step - 0.28, h: 0.7, fontSize: 12, color: p[3] });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.65, w: 3.6, h: 0.5, rectRadius: 0.1, fill: { color: C.accent3 }, line: { color: C.accent3, width: 0 }, objectName: "We are here" });
    T(s, "WE ARE HERE: Gate 0 decision", { x: 0.6, y: 1.65, w: 3.6, h: 0.5, fontSize: 13, bold: true, color: C.background1, align: "center", valign: "middle" });
    T(s, "No phase starts until the previous gate is passed with evidence", { x: 0.6, y: 6.15, w: 12.1, h: 0.4, fontSize: 15, italic: true, color: C.background2, align: "center" });
    s.addNotes("The roadmap runs from 2026 to 2060 in eight phases, each closed by a decision gate. We are at the very start: Gate 0, the business case and partner alignment, which needs a decision between 2026 and 2030. Construction would run from 2038 to 2046, testing until 2049, the tournament in 2050, and a decade of legacy work after it.");
  }

  // =====================================================================
  section("How we de-risk");
  // 16. Climate-resilient engineering
  {
    const s = content("Chapter 5 · Built for Bangladesh", "Engineered for Bangladesh's climate",
      "Source: Analysis §11.2 Climate and disaster-resilient engineering; §5.1. Final specifications must follow site-specific studies, BNBC 2020 and independent structural review.");
    const e = [
      [I.building, "Foundations & soil", "Deep bored piles and pile caps where ground needs them (40–60 m initial concept).", "Verify: geotechnical design & pile-load testing", C.accent6],
      [I.wind, "Coastal wind & cyclones", "Aerodynamic roofs, robust connections, wind-driven-rain protection at Chattogram & Cox's Bazar.", "Verify: BNBC, site wind studies, independent review", C.accent4],
      [I.water, "Pitch drainage", "Hybrid-reinforced turf, root-zone aeration and SubAir-type vacuum drainage.", "Verify: hydraulic modelling & site testing", C.accent2],
      [I.seedling, "Spectator comfort", "Passive shading, reflective roofs, ventilation and targeted cooling where justified.", "Verify: energy, humidity & operating cost", C.accent1],
    ];
    e.forEach((x, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const X = 0.6 + col * 6.15, Y = 1.7 + row * 2.55;
      card(s, X, Y, 5.95, 2.35, { name: x[1] + " card" });
      iconCircle(s, X + 0.25, Y + 0.25, 0.85, x[0], x[4], x[1] + " icon");
      T(s, x[1], { x: X + 1.3, y: Y + 0.3, w: 4.5, h: 0.45, fontSize: 18, bold: true, color: x[4] });
      T(s, x[2], { x: X + 1.3, y: Y + 0.8, w: 4.5, h: 0.9, fontSize: 14 });
      T(s, x[3], { x: X + 1.3, y: Y + 1.75, w: 4.5, h: 0.45, fontSize: 12, italic: true, color: C.background2 });
    });
    s.addNotes("Bangladesh's climate is a design input, not an afterthought. Soft alluvial soils need deep foundations. Coastal venues need cyclone-resistant roofs. Monsoon rain needs high-capacity pitch drainage. And heat and humidity need passive shading and ventilation. Every choice is verified by site studies and the 2020 Bangladesh National Building Code.");
  }

  // 17. Risk heatmap
  {
    const s = content("Chapter 5 · Risk register", "Cost escalation and congestion lead the risks",
      "Source: Analysis §14 Table 4 Programme Risk Register. Score = likelihood × impact (1–5 each). Proposed scoring method, not a matrix prescribed by ISO 31000.");
    const gx = 1.25, gy = 1.75, cw = 0.95, ch = 0.88;
    const cells = { "4,4": ["R-01", "R-04", "R-07", "R-08", "R-10"], "5,5": ["R-02"], "3,5": ["R-03", "R-06", "R-09"], "5,4": ["R-05"] };
    for (let imp = 5; imp >= 1; imp--) for (let lik = 1; lik <= 5; lik++) {
      const sc = imp * lik, x = gx + (lik - 1) * cw, y = gy + (5 - imp) * ch;
      const col = sc >= 20 ? "F2475A" : sc >= 15 ? "FF9340" : sc >= 8 ? "F2C14E" : "1FBF7A";
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: cw - 0.05, h: ch - 0.05, fill: { color: col, transparency: cells[lik + "," + imp] ? 0 : 70 }, line: { color: "0A0F24", width: 0 }, objectName: `Cell L${lik} I${imp}` });
      const ids = cells[lik + "," + imp];
      if (ids) T(s, ids.reduce((a, v, k) => a + v + (k % 2 ? "\n" : "  "), "").trim(), { x: x + 0.03, y, w: cw - 0.11, h: ch - 0.05, fontSize: 10, bold: true, color: C.text1, align: "center", valign: "middle" });
    }
    T(s, "Likelihood →", { x: gx, y: gy + 5 * ch + 0.02, w: 5 * cw, h: 0.3, fontSize: 12, color: C.background2, align: "center" });
    T(s, "Impact →", { x: 0.3, y: gy + 2 * ch, w: 1.2, h: 0.4, fontSize: 12, color: C.background2, rotate: 270, align: "center" });
    const rk = [
      ["R-02", "Mega-project cost escalation", "25", "RCF, risk reserves, independent audits", C.accent3],
      ["R-05", "Last-mile transport congestion", "20", "Mass transit, shuttles, park-and-ride, modelling", C.accent3],
      ["R-01", "Land acquisition & encroachment", "16", "Digital land records, early title fixes", C.accent5],
      ["R-04", "Differential settlement", "16", "Foundations from verified soil data", C.accent5],
      ["R-07", "Pitch waterlogging", "16", "Subsoil drainage, tested turf systems", C.accent5],
      ["R-08", "Shortage of quality hotels", "16", "Demand audit, hotel investment, temp stock", C.accent5],
      ["R-10", "Post-tournament underuse", "16", "Demand-led capacity, removable seats", C.accent5],
      ["R-03/06/09", "Cyclones · grid failure · worker welfare", "15", "Hazard design, backup power, audits", C.accent5],
    ];
    rk.forEach((r, i) => {
      const y = 1.7 + i * 0.6;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.4, y, w: 6.3, h: 0.52, rectRadius: 0.08, fill: { color: C.text2 }, line: { color: C.text2, width: 0 }, objectName: "Risk row " + r[0] });
      s.addShape(pres.shapes.OVAL, { x: 6.48, y: y + 0.05, w: 0.42, h: 0.42, fill: { color: r[4] }, line: { color: r[4], width: 0 }, objectName: "Score " + r[0] });
      T(s, r[2], { x: 6.48, y: y + 0.05, w: 0.42, h: 0.42, fontSize: 12, bold: true, color: C.text1, align: "center", valign: "middle" });
      T(s, [{ text: r[0] + "  ", options: { bold: true, color: r[4] } }, { text: r[1], options: { bold: true } }], { x: 7.0, y, w: 2.95, h: 0.52, fontSize: 12, valign: "middle" });
      T(s, r[3], { x: 9.95, y, w: 2.7, h: 0.52, fontSize: 11, color: C.background2, valign: "middle" });
    });
    s.addNotes("This heat map plots our ten programme risks by likelihood and impact. Two are critical: mega-project cost escalation, which scores 25 out of 25, and last-mile congestion at 20. Five more score 16, including land disputes, soft-soil settlement, waterlogging, hotel shortages and post-tournament underuse. Every risk has a named mitigation and owner.");
  }

  // 18. Controls & operational safety
  {
    const s = content("Chapter 5 · Control & command", "Early cost warnings, one matchday command",
      "Source: Analysis §12 Table 2 EVM metrics; §15 Operational Readiness (VOC). Thresholds are proposed alerts; contingency is never released automatically. 30 failure modes are mapped in §14 Table 5.");
    card(s, 0.6, 1.7, 6.0, 5.0, { name: "EVM card" });
    T(s, "Earned Value Management alerts", { x: 0.85, y: 1.85, w: 5.5, h: 0.4, fontSize: 17, bold: true, color: C.accent1 });
    const lv = [["≥ 0.95", "On track", C.accent2], ["< 0.95", "Yellow alert: review", C.accent1], ["< 0.90", "Red alert: executive cost review", C.accent3]];
    lv.forEach((l, i) => {
      const y = 2.45 + i * 0.78;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.85, y, w: 1.5, h: 0.62, rectRadius: 0.08, fill: { color: l[2] }, line: { color: l[2], width: 0 }, objectName: "EVM level " + i });
      T(s, l[0], { x: 0.85, y, w: 1.5, h: 0.62, fontSize: 18, bold: true, color: C.text1, align: "center", valign: "middle" });
      T(s, l[1], { x: 2.5, y, w: 3.9, h: 0.62, fontSize: 15, valign: "middle" });
    });
    T(s, [
      { text: "SPI = EV ÷ PV  (schedule efficiency)", options: { breakLine: true } },
      { text: "CPI = EV ÷ AC  (cost efficiency)", options: { breakLine: true } },
      { text: "EAC = BAC ÷ CPI  (forecast final cost)" },
    ], { x: 0.85, y: 4.9, w: 5.5, h: 1.2, fontSize: 14, color: C.background2, fontFace: "Courier New", paraSpaceAfter: 4 });
    T(s, "Applies to both SPI and CPI", { x: 0.85, y: 6.15, w: 5.5, h: 0.35, fontSize: 12, italic: true, color: C.background2 });
    card(s, 6.9, 1.7, 5.8, 5.0, { name: "VOC card" });
    T(s, "Venue Operations Centre (VOC)", { x: 7.15, y: 1.85, w: 5.3, h: 0.4, fontSize: 17, bold: true, color: C.accent1 });
    const voc = [
      [I.flag, "Joint Incident Commander", "Major-incident decisions", C.accent1],
      [I.shield, "Police & intelligence", "CCTV, access control, counter-terrorism", C.accent4],
      [I.med, "Fire, rescue & medical", "Evacuation, ambulances, hospitals", C.accent3],
      [I.users, "Stadium ops & Chief Safety Officer", "Crowd movement, matchday safety", C.accent2],
      [I.wifi, "VOC technical team", "PA, backup radio, UPS power", C.accent6],
    ];
    voc.forEach((v, i) => {
      const y = 2.4 + i * 0.84;
      iconCircle(s, 7.15, y, 0.6, v[0], v[3], v[1] + " icon");
      T(s, v[1], { x: 7.95, y: y - 0.04, w: 4.6, h: 0.35, fontSize: 14, bold: true });
      T(s, v[2], { x: 7.95, y: y + 0.3, w: 4.6, h: 0.35, fontSize: 12, color: C.background2 });
    });
    s.addNotes("Two control systems keep the programme safe. On the left, Earned Value Management gives early warning: if the schedule or cost index drops below 0.95 we review, and below 0.90 we hold an executive cost review. On the right, every venue has a Venue Operations Centre bringing police, fire, medical, stadium operations and technical teams under one incident commander.");
  }

  // =====================================================================
  section("What we leave behind");
  // 19. Modular legacy
  {
    const s = content("Chapter 6 · Legacy", "Build for 2050, right-size for 2060",
      "Source: Analysis §11 Tables 1–3; §16 Post-tournament legacy framework. Permanent capacities are subject to independent demand and lifecycle-cost studies.");
    card(s, 0.6, 1.7, 6.3, 5.0, { name: "Legacy chart card" });
    s.addChart(pres.charts.BAR, [
      { name: "Permanent seats (thousands)", labels: ["Dhaka", "Chattogram", "Cox's Bazar", "Sylhet"], values: [85, 65, 25, 22.5] },
      { name: "Removable after tournament", labels: ["Dhaka", "Chattogram", "Cox's Bazar", "Sylhet"], values: [0, 0, 20, 22.5] },
    ], Object.assign(chartBase(), { x: 0.75, y: 1.85, w: 6.0, h: 4.7, barDir: "col", barGrouping: "stacked", chartColors: ["1FBF7A", "F2C14E"], showValue: true, dataLabelPosition: "ctr", dataLabelColor: "0A0F24", dataLabelFormatCode: "0.#;;;",
      showTitle: true, title: "Tournament seats: permanent vs removable (thousands)", showLegend: true, legendPos: "b", valAxisHidden: true, valGridLine: { style: "none" }, barGapWidthPct: 45, objectName: "Legacy chart" }));
    const steps = ["Design separable upper tier", "Build lower bowl + modular seats", "Operate at tournament capacity", "Dismantle after safety inspection", "Relocate to regional academies", "Run at demand-matched size"];
    T(s, "Downsizing process", { x: 7.2, y: 1.7, w: 5.5, h: 0.4, fontSize: 16, bold: true, color: C.accent1 });
    steps.forEach((t, i) => {
      const y = 2.2 + i * 0.6;
      s.addShape(pres.shapes.OVAL, { x: 7.2, y, w: 0.46, h: 0.46, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 }, objectName: "Step " + (i + 1) });
      T(s, String(i + 1), { x: 7.2, y, w: 0.46, h: 0.46, fontSize: 14, bold: true, color: C.text1, align: "center", valign: "middle" });
      T(s, t, { x: 7.8, y, w: 4.9, h: 0.46, fontSize: 14, valign: "middle" });
    });
    card(s, 7.2, 5.85, 5.5, 0.85, { name: "Precedent card", fill: "13301F", line: C.accent2 });
    T(s, "Precedent: Qatar's Stadium 974 was designed for dismantling. Savings and reuse must be proven, not assumed.",
      { x: 7.4, y: 5.85, w: 5.15, h: 0.85, fontSize: 13, valign: "middle" });
    s.addNotes("Legacy is where many hosts failed. Dhaka and Chattogram stay at full size, subject to demand. Cox's Bazar and Sylhet use removable upper tiers. After 2050 they shrink to about 25,000 and 20,000 to 25,000 seats, and the seating moves to regional academies. Sylhet is shown at the midpoint of its range.");
  }

  // 20. Lessons from past hosts
  {
    const s = content("Chapter 6 · Learning from history", "Eight past hosts, eight lessons",
      "Source: Analysis §7 International Benchmarking and Lessons.");
    const L = [
      ["South Africa 2010", "Keep large venues only with a credible plan for regular use", C.accent2],
      ["Brazil 2014", "Transparent procurement and realistic operating forecasts (Manaus)", C.accent1],
      ["Russia 2018", "Long distances make inter-city transport planning critical", C.accent3],
      ["Qatar 2022", "Modular Stadium 974; cooling technology for heat", C.accent6],
      ["USA/CAN/MEX 2026", "Three countries; heavy use of existing stadiums", C.accent4],
      ["MAR/POR/ESP 2030", "Cross-border coordination and clearly divided duties", C.accent5],
      ["Saudi Arabia 2034", "Link construction, finance, governance and operations", C.accent2],
      ["Beijing 2008", "Bird's Nest: landmark venues are costly to sustain", C.accent1],
    ];
    L.forEach((l, i) => {
      const col = i % 4, row = Math.floor(i / 4);
      const x = 0.6 + col * 3.07, y = 1.7 + row * 2.5;
      card(s, x, y, 2.9, 2.3, { name: l[0] + " card" });
      iconCircle(s, x + 0.2, y + 0.22, 0.6, I.trophy, l[2], l[0] + " icon");
      T(s, l[0], { x: x + 0.95, y: y + 0.22, w: 1.85, h: 0.6, fontSize: 15, bold: true, color: l[2], valign: "middle" });
      T(s, l[1], { x: x + 0.2, y: y + 1.0, w: 2.55, h: 1.2, fontSize: 14 });
    });
    s.addNotes("We studied eight past mega-events. South Africa and Beijing warn about expensive venues with no regular use. Brazil shows why transparent procurement matters. Russia shows the transport challenge. Qatar shows modular design. And the 2026 and 2030 tournaments show that co-hosting across countries works, which supports our regional co-hosting strategy.");
  }

  // 21. Recommendations
  {
    const s = content("Our recommendations", "Seven moves for government to approve",
      "Source: Analysis §17 Strategic Recommendations (each sets out why, what, how, who, when, control and evidence).");
    const R = [
      ["Establish a statutory delivery authority (BWCDA)", "PMO, Cabinet Division, Ministry of Law · 2028–30", I.gov],
      ["Resolve land and geotechnical risks early", "Ministry of Land, planning authorities · site-selection phase", I.map],
      ["Design for Bangladesh's climate", "Designers, engineers, agronomists · planning → construction", I.cloud],
      ["Use modular design where it is justified", "BWCDA design team, modular specialists · design phase", I.cubes],
      ["Strengthen cost and schedule controls", "Ministry of Finance, programme CFO · feasibility → commissioning", I.chart],
      ["Improve transport and last-mile connections", "Road & rail agencies, DMTCL, DTCA · master planning", I.road],
      ["Protect workers and apply responsible sourcing", "Ministry of Labour, BWCDA compliance · procurement → operations", I.hard],
    ];
    R.forEach((r, i) => {
      const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4;
      const x = 0.6 + col * 6.15, y = 1.7 + row * 1.25;
      card(s, x, y, 5.95, 1.1, { name: "Recommendation " + (i + 1) });
      T(s, String(i + 1).padStart(2, "0"), { x: x + 0.15, y, w: 0.8, h: 1.1, fontSize: 28, bold: true, color: C.accent1, valign: "middle", fontFace: "Arial" });
      T(s, r[0], { x: x + 1.0, y: y + 0.12, w: 4.8, h: 0.45, fontSize: 15, bold: true });
      T(s, r[1], { x: x + 1.0, y: y + 0.58, w: 4.8, h: 0.45, fontSize: 12, color: C.background2 });
    });
    card(s, 6.75, 5.45, 5.95, 1.1, { name: "Control principle", fill: "13301F", line: C.accent2 });
    iconCircle(s, 6.95, 5.65, 0.7, I.eye, C.accent2, "Control icon");
    T(s, "Each move carries a control: audits, independent review, and no approval without evidence", { x: 7.85, y: 5.45, w: 4.7, h: 1.1, fontSize: 14, valign: "middle" });
    s.addNotes("These are our seven recommendations, each with an owner and a timing. First and most urgent is setting up the delivery authority between 2028 and 2030. Then early land and soil work, climate design, modular venues where justified, strong cost controls, transport integration, and worker protection.");
  }

  // 22. Conclusion — the test + the ask
  {
    const s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: sec });
    T(s, "THE CENTRAL TEST", { x: 0.8, y: 0.6, w: 8, h: 0.4, fontSize: 16, bold: true, color: C.accent1, charSpacing: 4 });
    T(s, "Bangladesh should proceed only if the hosting model passes all four tests", { x: 0.8, y: 1.05, w: 11.7, h: 1.0, fontSize: 32, bold: true, fontFace: "Arial" });
    const tests = [[I.hard, "Technically feasible", C.accent4], [I.money, "Financially responsible", C.accent1], [I.leaf, "Environmentally & socially acceptable", C.accent2], [I.recycle, "Credible legacy plan", C.accent5]];
    tests.forEach((t, i) => {
      const x = 0.8 + i * 2.98;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.35, w: 2.78, h: 1.9, rectRadius: 0.12, fill: { color: C.text2, transparency: 15 }, line: { color: t[2], width: 1.5 }, objectName: t[1] + " card" });
      iconCircle(s, x + 0.99, 2.55, 0.8, t[0], t[2], t[1] + " icon");
      T(s, t[1], { x: x + 0.15, y: 3.45, w: 2.48, h: 0.7, fontSize: 15, bold: true, align: "center" });
    });
    T(s, "Today's ask", { x: 0.8, y: 4.55, w: 6, h: 0.4, fontSize: 18, bold: true, color: C.accent1 });
    const ask = [
      ["Government", "Approve a Gate 0 feasibility study and the BWCDA legal design"],
      ["Board of Chief Officers", "Take ownership of the RACI and the phase-gate controls"],
      ["Sponsors & investors", "Join early market testing of PPP, naming-rights & hospitality packages"],
    ];
    ask.forEach((a, i) => {
      const x = 0.8 + i * 3.98;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 5.05, w: 3.78, h: 1.35, rectRadius: 0.1, fill: { color: C.text2, transparency: 15 }, line: { color: C.text2, width: 0 }, objectName: "Ask " + (i + 1) });
      T(s, a[0], { x: x + 0.2, y: 5.15, w: 3.4, h: 0.4, fontSize: 15, bold: true, color: C.accent1 });
      T(s, a[1], { x: x + 0.2, y: 5.55, w: 3.4, h: 0.8, fontSize: 14 });
    });
    T(s, "Source: Analysis §18 Conclusion. The asks are derived from the Gate 0 phase of the roadmap.", { x: 0.8, y: 6.75, w: 11, h: 0.35, fontSize: 10, color: C.background2 });
    s.addNotes("To close: Bangladesh should go ahead only if the plan is technically feasible, financially responsible, environmentally and socially acceptable, and backed by a credible legacy. Our ask today matches Gate 0. We ask government to approve a feasibility study, the chief officers to own the controls, and sponsors to join early market testing. Thank you.");
  }

  // 23. References
  section("References");
  {
    const s = content("References", "Sources and verification basis");
    const refs = [
      "Flyvbjerg, B., Holm, M. S., & Buhl, S. (2002). Underestimating costs in public works projects: Error or lie? Journal of the American Planning Association, 68(3), 279–295.",
      "FIFA. (n.d.). FIFA Stadium Guidelines; FIFA pitch guidance. FIFA Football Technology / FIFA Publications.",
      "FIFA. (2011). Financial Report 2010. · FIFA. (2023). Annual Report 2022: 2019–2022 revenue. publications.fifa.com",
      "FIFA. (2018). More than half the world watched record-breaking 2018 World Cup [Media release]. inside.fifa.com",
      "FIFA. (n.d.). Gianni Infantino: World Cup USD 15 billion revenue [News]. inside.fifa.com · VOA News. (2015). FIFA reports more than one billion viewers for 2014 World Cup final.",
      "Housing and Building Research Institute. (2021). Bangladesh National Building Code 2020. Bangladesh Gazette.",
      "Arcadis. (n.d.). International Construction Costs [Index]. · Sky News; Sports Business Journal: reported Qatar 2022 stadium costs.",
      "Bangladesh Bank. (2026, October 29). Exchange-rate sheet (USD = BDT 123.99).",
      "Government of Bangladesh. Public-Private Partnership Act 2015; Public Procurement Act & Rules (BPPA).",
      "ILO core labour standards; UN Guiding Principles on Business and Human Rights; ISO 31000, ISO 20121, ISO 19650.",
      "Islam, M. R. (2026). Analysis: Section E, Hosting FIFA World Cup in Bangladesh > Hosting Country > Bangladesh [Unpublished working document].",
    ];
    T(s, refs.map((r, k) => ({ text: r, options: { bullet: true, breakLine: k < refs.length - 1 } })), { x: 0.6, y: 1.65, w: 12.1, h: 4.9, fontSize: 12, color: C.background1, paraSpaceAfter: 5 });
    T(s, "Figures tagged [ESTIMATE] or [PLANNING ASSUMPTION] in the source remain unverified. Publication dates marked n.d. should be confirmed before external distribution.",
      { x: 0.6, y: 6.45, w: 12.1, h: 0.35, fontSize: 11, italic: true, color: C.accent1 });
    s.addNotes("References are listed for verification. All cost figures are planning estimates from the source analysis.");
  }

  const out = "/home/user/ai-research-lab/Bangladesh_2050_FIFA_World_Cup_Bid.pptx";
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("written", out);
})();
