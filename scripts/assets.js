// Original illustrations for the v2 deck, rendered SVG -> PNG with sharp
const sharp = require("sharp");
const fs = require("fs");
const tc = require("topojson-client");
const OUT = __dirname + "/assets";
fs.mkdirSync(OUT, { recursive: true });

// deterministic random
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

async function save(name, svg, w, h) {
  await sharp(Buffer.from(svg)).resize(w, h).png().toFile(`${OUT}/${name}.png`);
}

// ---------------------------------------------------------------- stadium render
function stadium({ rxMax = 99999, cxf = 0.5, w = 1600, h = 1000, roof = "#E8EDF5", accent = "#F2C14E", modular = false, backdrop = "city", glow = "#FFE9B0", label = "" }) {
  const cx = w * cxf, cy = h * 0.56, rx = Math.min(w * 0.36, h * 0.58, rxMax), ry = rx * 0.42, wall = h * 0.09;
  const irx = rx * 0.7, iry = ry * 0.7; // roof opening
  let back = "";
  if (backdrop === "city") {
    for (let i = 0; i < 46; i++) {
      const bw = 18 + rnd() * 40, bh = 40 + rnd() * 190, x = i * (w / 46);
      back += `<rect x="${x}" y="${cy - ry - 20 - bh}" width="${bw}" height="${bh + 60}" fill="#0F1E33"/>`;
      for (let k = 0; k < bh / 22; k++) if (rnd() > 0.55) back += `<rect x="${x + 4 + rnd() * (bw - 10)}" y="${cy - ry - 10 - bh + k * 22}" width="4" height="6" fill="#FFD27A" opacity="0.7"/>`;
    }
  } else if (backdrop === "sea") {
    back += `<rect x="0" y="${cy - ry - 70}" width="${w}" height="${h}" fill="#0A2740"/>`;
    for (let i = 0; i < 9; i++) back += `<path d="M0 ${cy - ry - 60 + i * 14} Q ${w / 4} ${cy - ry - 70 + i * 14} ${w / 2} ${cy - ry - 60 + i * 14} T ${w} ${cy - ry - 60 + i * 14}" stroke="#2C6E9C" stroke-opacity="${0.5 - i * 0.04}" fill="none" stroke-width="2"/>`;
    back += `<path d="M0 ${cy - ry - 30} Q ${w * 0.3} ${cy - ry - 55} ${w * 0.6} ${cy - ry - 30} T ${w} ${cy - ry - 35} V ${h} H 0 Z" fill="#0B2A22"/>`;
  } else if (backdrop === "hills") {
    back += `<path d="M0 ${cy - ry - 40} C ${w * 0.15} ${cy - ry - 220} ${w * 0.3} ${cy - ry - 120} ${w * 0.45} ${cy - ry - 190} S ${w * 0.8} ${cy - ry - 110} ${w} ${cy - ry - 210} V ${h} H 0 Z" fill="#0E2B21"/>`;
    back += `<path d="M0 ${cy - ry + 10} C ${w * 0.2} ${cy - ry - 110} ${w * 0.4} ${cy - ry - 40} ${w * 0.6} ${cy - ry - 100} S ${w * 0.9} ${cy - ry - 30} ${w} ${cy - ry - 90} V ${h} H 0 Z" fill="#12392A"/>`;
    for (let r = 0; r < 7; r++) back += `<path d="M0 ${cy - ry - 30 + r * 16} Q ${w / 2} ${cy - ry - 70 + r * 16} ${w} ${cy - ry - 30 + r * 16}" stroke="#1E5A3E" stroke-width="5" fill="none" opacity="0.6"/>`;
  } else if (backdrop === "port") {
    back += `<rect x="0" y="${cy - ry - 60}" width="${w}" height="${h}" fill="#0A2238"/>`;
    for (let i = 0; i < 6; i++) { const x = 80 + i * 260; back += `<path d="M${x} ${cy - ry - 60} v -150 h 70 v 20 h -50 v 130" stroke="#3B4F6E" stroke-width="8" fill="none"/>`; }
    for (let i = 0; i < 30; i++) back += `<rect x="${i * 55}" y="${cy - ry - 95 - (i % 3) * 22}" width="48" height="20" fill="${["#F2475A", "#4FB3FF", "#F2C14E", "#1FBF7A"][i % 4]}" opacity="0.55"/>`;
  }
  // crowd speckles inside bowl
  let crowd = "";
  for (let i = 0; i < 1400; i++) {
    const a = rnd() * Math.PI * 2, t = 0.5 + rnd() * 0.48;
    const x = cx + Math.cos(a) * irx * t * 1.05, y = cy + 8 + Math.sin(a) * iry * t * 1.05;
    const c = ["#F2475A", "#1FBF7A", "#FFFFFF", "#F2C14E", "#4FB3FF"][Math.floor(rnd() * 5)];
    crowd += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.3 + rnd() * 1.6).toFixed(1)}" fill="${c}" opacity="${(0.45 + rnd() * 0.5).toFixed(2)}"/>`;
  }
  // facade ribs
  let ribs = "";
  for (let i = 0; i <= 60; i++) { const a = Math.PI * (i / 60); const x = cx - Math.cos(a) * rx; const y = cy + Math.sin(a) * ry; ribs += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + wall}" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="3"/>`; }
  // pitch (perspective by scaling y)
  const pw = irx * 0.78, ph = pw * 0.62;
  const pitch = `<g transform="translate(${cx},${cy + 8}) scale(1,0.46)">
    <rect x="${-pw / 2}" y="${-ph / 2}" width="${pw}" height="${ph}" fill="#1E9E57"/>
    ${Array.from({ length: 10 }, (_, i) => `<rect x="${-pw / 2 + i * pw / 10}" y="${-ph / 2}" width="${pw / 20}" height="${ph}" fill="#23B063"/>`).join("")}
    <g stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.9"><rect x="${-pw / 2}" y="${-ph / 2}" width="${pw}" height="${ph}"/><line x1="0" y1="${-ph / 2}" x2="0" y2="${ph / 2}"/><circle r="${ph * 0.14}"/>
    <rect x="${-pw / 2}" y="${-ph * 0.3}" width="${pw * 0.15}" height="${ph * 0.6}"/><rect x="${pw / 2 - pw * 0.15}" y="${-ph * 0.3}" width="${pw * 0.15}" height="${ph * 0.6}"/></g></g>`;
  const mod = modular ? `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.84}" ry="${ry * 0.84}" fill="none" stroke="#FF9340" stroke-width="10" stroke-dasharray="26 14"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
<defs>
 <radialGradient id="sky" cx="50%" cy="20%" r="80%"><stop offset="0" stop-color="#16325A"/><stop offset="1" stop-color="#050B18"/></radialGradient>
 <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${glow}" stop-opacity="0.55"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient>
 <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${roof}"/><stop offset="1" stop-color="#6E7A94"/></linearGradient>
 <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A3B5E"/><stop offset="1" stop-color="#0D1528"/></linearGradient>
 <radialGradient id="bowl" cx="50%" cy="50%" r="50%"><stop offset="0.55" stop-color="#1A2440"/><stop offset="1" stop-color="#0B1022"/></radialGradient>
 <clipPath id="open"><ellipse cx="${cx}" cy="${cy}" rx="${irx}" ry="${iry}"/></clipPath>
</defs>
<rect width="${w}" height="${h}" fill="url(#sky)"/>
${back}
<rect y="${cy - ry * 0.3}" width="${w}" height="${h}" fill="#071510" opacity="0.92"/>
<ellipse cx="${cx}" cy="${cy + wall + 25}" rx="${rx * 1.25}" ry="${ry * 1.1}" fill="#000000" opacity="0.45"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx * 1.5}" ry="${ry * 2.2}" fill="url(#glow)"/>
<ellipse cx="${cx}" cy="${cy + wall}" rx="${rx}" ry="${ry}" fill="#0D1528"/>
<rect x="${cx - rx}" y="${cy}" width="${rx * 2}" height="${wall}" fill="url(#wall)"/>
${ribs}
<path d="M ${cx - rx} ${cy + wall * 0.45} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + wall * 0.45}" stroke="${accent}" stroke-width="7" fill="none" opacity="0.9"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#roof)"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${accent}" stroke-width="6"/>
${Array.from({ length: 48 }, (_, i) => { const a = i / 48 * Math.PI * 2; return `<line x1="${cx + Math.cos(a) * irx}" y1="${cy + Math.sin(a) * iry}" x2="${cx + Math.cos(a) * rx}" y2="${cy + Math.sin(a) * ry}" stroke="#5E6B88" stroke-width="2" stroke-opacity="0.6"/>`; }).join("")}
<ellipse cx="${cx}" cy="${cy}" rx="${(rx + irx) / 2}" ry="${(ry + iry) / 2}" fill="none" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="2"/>
${mod}
<g clip-path="url(#open)"><rect width="${w}" height="${h}" fill="url(#bowl)"/>${crowd}${pitch}</g>
<ellipse cx="${cx}" cy="${cy}" rx="${irx}" ry="${iry}" fill="none" stroke="#FFFFFF" stroke-opacity="0.8" stroke-width="3"/>
${[-1, 1].map(s => `<g><line x1="${cx + s * rx * 0.98}" y1="${cy - ry * 1.15}" x2="${cx + s * rx * 0.92}" y2="${cy - 10}" stroke="#AAB4CC" stroke-width="5"/>
<rect x="${cx + s * rx * 0.98 - 34}" y="${cy - ry * 1.15 - 18}" width="68" height="22" rx="4" fill="#FFF6D8"/><ellipse cx="${cx + s * rx * 0.98}" cy="${cy - ry * 1.15 - 6}" rx="120" ry="60" fill="url(#glow)"/></g>`).join("")}
</svg>`;
}

// ---------------------------------------------------------------- cover hero (wide)
function cover() {
  const w = 2400, h = 1350;
  const st = stadium({ w, h, cxf: 0.66, rxMax: 640, backdrop: "city", accent: "#F2C14E" });
  return st.replace("</svg>", `<defs><linearGradient id="fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#040C09" stop-opacity="0.97"/><stop offset="0.35" stop-color="#040C09" stop-opacity="0.8"/><stop offset="0.6" stop-color="#040C09" stop-opacity="0"/></linearGradient>
<linearGradient id="fb" x1="0" y1="0" x2="0" y2="1"><stop offset="0.7" stop-color="#040C09" stop-opacity="0"/><stop offset="1" stop-color="#040C09" stop-opacity="0.9"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#fade)"/><rect width="${w}" height="${h}" fill="url(#fb)"/></svg>`);
}

// ---------------------------------------------------------------- background
const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs>
<radialGradient id="a" cx="100%" cy="0%" r="90%"><stop offset="0" stop-color="#0F3B2C"/><stop offset="0.55" stop-color="#071712"/><stop offset="1" stop-color="#040C09"/></radialGradient>
<radialGradient id="b" cx="0%" cy="100%" r="60%"><stop offset="0" stop-color="#3A0F18" stop-opacity="0.35"/><stop offset="1" stop-color="#3A0F18" stop-opacity="0"/></radialGradient></defs>
<rect width="1920" height="1080" fill="url(#a)"/><rect width="1920" height="1080" fill="url(#b)"/></svg>`;

// ---------------------------------------------------------------- Bangladesh map
function mapSvg() {
  const topo = require("world-atlas/countries-10m.json");
  const fc = tc.feature(topo, topo.objects.countries);
  const L0 = 86.6, L1 = 93.6, A0 = 20.2, A1 = 27.0; // extent
  const k = Math.cos((23.6 * Math.PI) / 180);
  const W = 1400, H = Math.round(W * ((A1 - A0) / ((L1 - L0) * k)));
  const P = ([lon, lat]) => [((lon - L0) / (L1 - L0)) * W, ((A1 - lat) / (A1 - A0)) * H];
  const path = g => (g.type === "Polygon" ? [g.coordinates] : g.coordinates).map(poly => poly.map(r => "M" + r.map(p => P(p).map(v => v.toFixed(1)).join(",")).join("L") + "Z").join("")).join("");
  let neigh = "", bdP = "";
  for (const f of fc.features) {
    if (!f.geometry) continue;
    const n = f.properties.name;
    if (n === "Bangladesh") bdP = path(f.geometry);
    else if (["India", "Myanmar", "Bhutan", "Nepal", "China"].includes(n)) neigh += `<path d="${path(f.geometry)}" fill="#0E2A21" stroke="#1F4A3A" stroke-width="2"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs><radialGradient id="sea" cx="50%" cy="100%" r="80%"><stop offset="0" stop-color="#0B2C46"/><stop offset="1" stop-color="#06131F"/></radialGradient>
<linearGradient id="bd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0F7A52"/><stop offset="1" stop-color="#0A5A3D"/></linearGradient>
<filter id="sh"><feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000" flood-opacity="0.6"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#sea)"/>${neigh}
<path d="${bdP}" fill="url(#bd)" stroke="#7FE0B4" stroke-width="3" filter="url(#sh)"/>
<text x="${W * 0.18}" y="${H * 0.95}" fill="#4FB3FF" fill-opacity="0.55" font-family="Arial" font-style="italic" font-size="40" letter-spacing="10">BAY OF BENGAL</text>
<text x="${W * 0.06}" y="${H * 0.30}" fill="#FFFFFF" fill-opacity="0.22" font-family="Arial" font-size="34" letter-spacing="8">INDIA</text>
<text x="${W * 0.80}" y="${H * 0.70}" fill="#FFFFFF" fill-opacity="0.22" font-family="Arial" font-size="26" letter-spacing="4">MYANMAR</text>
</svg>`;
  return { svg, W, H, L0, L1, A0, A1 };
}

// ---------------------------------------------------------------- cross-section
function section({ w = 1800, h = 900, modular = true, removed = false, simple = false }) {
  const g = h * 0.62; // ground line
  const cx = w / 2;
  let piles = "";
  for (const x of [w * 0.12, w * 0.2, w * 0.28, w * 0.72, w * 0.8, w * 0.88]) piles += `<rect x="${x - 7}" y="${g}" width="14" height="${h * 0.33}" fill="#8C96AE"/>`;
  const tier = (s) => {
    // lower bowl stepped
    let d = `M ${cx + s * w * 0.27} ${g} `; const steps = 8;
    for (let i = 0; i < steps; i++) { const x = cx + s * (w * 0.27 + i * w * 0.022); const y = g - (i + 1) * h * 0.028; d += `L ${x} ${y} L ${x + s * w * 0.022} ${y} `; }
    d += `L ${cx + s * w * 0.27 + s * steps * w * 0.022} ${g} Z`;
    return `<path d="${d}" fill="#2E4A7A" stroke="#4FB3FF" stroke-width="2"/>`;
  };
  const upper = (s) => {
    const x0 = cx + s * w * 0.40, y0 = g - h * 0.25; let d = `M ${x0} ${y0} `;
    for (let i = 0; i < 6; i++) { const x = x0 + s * i * w * 0.018, y = y0 - (i + 1) * h * 0.03; d += `L ${x} ${y} L ${x + s * w * 0.018} ${y} `; }
    d += `L ${x0 + s * 6 * w * 0.018} ${y0} Z`;
    return removed ? `<path d="${d}" fill="none" stroke="#FF9340" stroke-width="3" stroke-dasharray="12 10" opacity="0.6"/>` :
      `<path d="${d}" fill="#FF9340" fill-opacity="0.85" stroke="#FFC08A" stroke-width="2"/>`;
  };
  const roof = (s) => `<path d="M ${cx + s * w * 0.50} ${g - h * 0.52} Q ${cx + s * w * 0.40} ${g - h * 0.62} ${cx + s * w * 0.25} ${g - h * 0.52}" stroke="#E8EDF5" stroke-width="12" fill="none"/>
     <line x1="${cx + s * w * 0.50}" y1="${g - h * 0.52}" x2="${cx + s * w * 0.50}" y2="${g}" stroke="#8C96AE" stroke-width="12"/>`;
  let rain = "";
  if (!simple) for (let i = 0; i < 40; i++) { const x = rnd() * w, y = rnd() * h * 0.25; rain += `<line x1="${x}" y1="${y}" x2="${x - 8}" y2="${y + 26}" stroke="#4FB3FF" stroke-opacity="0.5" stroke-width="2"/>`; }
  let wind = "";
  if (!simple) for (let i = 0; i < 3; i++) wind += `<path d="M ${w * 0.01} ${h * 0.08 + i * 30} q 60 -20 120 0 t 120 0" stroke="#C3CBE6" stroke-width="4" fill="none" stroke-opacity="0.7"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
<rect width="${w}" height="${h}" fill="none"/>
${rain}${wind}
<rect x="0" y="${g}" width="${w}" height="${h - g}" fill="#3A2A1C"/>
${Array.from({ length: 5 }, (_, i) => `<line x1="0" y1="${g + 20 + i * 45}" x2="${w}" y2="${g + 20 + i * 45}" stroke="#5A4430" stroke-width="2" stroke-dasharray="20 14"/>`).join("")}
${piles}
<rect x="${w * 0.27}" y="${g - 14}" width="${w * 0.46}" height="14" fill="#1FBF7A"/>
<rect x="${w * 0.27}" y="${g}" width="${w * 0.46}" height="34" fill="#4FB3FF" fill-opacity="0.35"/>
${Array.from({ length: 22 }, (_, i) => `<circle cx="${w * 0.28 + i * w * 0.021}" cy="${g + 17}" r="5" fill="#4FB3FF"/>`).join("")}
${tier(-1)}${tier(1)}${modular ? upper(-1) + upper(1) : ""}${roof(-1)}${roof(1)}
</svg>`;
}

// ---------------------------------------------------------------- Dhaka concept site plan
function sitePlan() {
  const w = 1200, h = 900;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
<rect width="${w}" height="${h}" fill="#0A1A14"/>
${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${h}" stroke="#12291F" stroke-width="2"/>`).join("")}
${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="${w}" y2="${i * 100}" stroke="#12291F" stroke-width="2"/>`).join("")}
<path d="M -20 700 C 200 640 330 760 520 700 S 900 600 1220 660" stroke="#1E5D8C" stroke-width="44" fill="none" opacity="0.9"/>
<path d="M 0 230 L 1200 120" stroke="#5A6785" stroke-width="30"/><path d="M 0 230 L 1200 120" stroke="#C3CBE6" stroke-width="3" stroke-dasharray="24 18"/>
<path d="M 160 900 L 360 0" stroke="#F2475A" stroke-width="12"/>
${[[227, 600], [271, 400], [316, 200]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="#FFFFFF" stroke="#F2475A" stroke-width="8"/>`).join("")}
<rect x="470" y="270" width="520" height="360" rx="30" fill="#0F3B2C" stroke="#1FBF7A" stroke-width="4" stroke-dasharray="16 10"/>
<ellipse cx="730" cy="450" rx="190" ry="140" fill="#E8EDF5"/><ellipse cx="730" cy="450" rx="190" ry="140" fill="none" stroke="#F2C14E" stroke-width="10"/>
<ellipse cx="730" cy="450" rx="118" ry="86" fill="#1A2440"/><rect x="668" y="410" width="124" height="80" fill="#1E9E57"/>
<rect x="520" y="300" width="70" height="50" rx="6" fill="#4FB3FF" opacity="0.8"/><rect x="880" y="560" width="80" height="45" rx="6" fill="#9D8CFF" opacity="0.8"/>
<path d="M 271 400 C 360 420 420 440 540 450" stroke="#F2C14E" stroke-width="6" stroke-dasharray="10 10" fill="none"/>
<path d="M 1180 60 l -60 10 l 30 -45" stroke="#FFFFFF" stroke-width="6" fill="none"/>
</svg>`;
}

(async () => {
  await save("bg", bg, 1920, 1080);
  await save("cover", cover(), 2400, 1350);
  seed = 11; await save("st_dhaka", stadium({ backdrop: "city", accent: "#F2C14E" }), 1600, 1000);
  seed = 21; await save("st_ctg", stadium({ backdrop: "port", accent: "#4FB3FF", roof: "#DDE6F2" }), 1600, 1000);
  seed = 31; await save("st_cox", stadium({ backdrop: "sea", accent: "#FF9340", modular: true }), 1600, 1000);
  seed = 41; await save("st_syl", stadium({ backdrop: "hills", accent: "#1FBF7A", modular: true }), 1600, 1000);
  seed = 5; await save("section", section({}), 1800, 900);
  seed = 6; await save("sec_before", section({ simple: true }), 1800, 900);
  seed = 6; await save("sec_after", section({ simple: true, removed: true }), 1800, 900);
  await save("siteplan", sitePlan(), 1200, 900);
  const m = mapSvg(); await save("map", m.svg, m.W, m.H);
  fs.writeFileSync(`${OUT}/map.json`, JSON.stringify({ W: m.W, H: m.H, L0: m.L0, L1: m.L1, A0: m.A0, A1: m.A1 }));
  console.log("assets done", m.W, m.H);
})();
