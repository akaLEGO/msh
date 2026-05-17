// Watercolor-style SVG flowers. Soft, organic, layered washes.
// Each flower has its own petal recipe; gradients + filter give the painterly feel.

const FLOWER_DEFS = `
  <filter id="msh-watercolor" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
    <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G" />
  </filter>
  <filter id="msh-softblur"><feGaussianBlur stdDeviation="0.6" /></filter>
  <filter id="msh-bigblur"><feGaussianBlur stdDeviation="6" /></filter>
`;

// Global definitions injected once into the body
function FlowerDefs() {
  React.useEffect(() => {
    if (document.getElementById("msh-flower-defs")) return;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "msh-flower-defs";
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.innerHTML = `<defs>${FLOWER_DEFS}</defs>`;
    document.body.appendChild(svg);
  }, []);
  return null;
}

// Build a tear-drop petal path (used widely)
function petalPath(cx, cy, len, width, angleDeg) {
  const a = (angleDeg - 90) * Math.PI / 180;
  // Petal tip at end of length vector
  const tipX = cx + Math.cos(a) * len;
  const tipY = cy + Math.sin(a) * len;
  // Side control points
  const perpX = -Math.sin(a);
  const perpY = Math.cos(a);
  const midX = cx + Math.cos(a) * len * 0.55;
  const midY = cy + Math.sin(a) * len * 0.55;
  const leftCx = midX + perpX * width;
  const leftCy = midY + perpY * width;
  const rightCx = midX - perpX * width;
  const rightCy = midY - perpY * width;
  return `M ${cx} ${cy} Q ${leftCx} ${leftCy} ${tipX} ${tipY} Q ${rightCx} ${rightCy} ${cx} ${cy} Z`;
}

function Flower({ flower, size = 200, theme, animate = true }) {
  const f = FLOWERS[flower];
  if (!f) return null;

  const cx = size / 2;
  const cy = size / 2;

  const id = React.useId();
  const gradId = `g-${flower}-${id.replace(/:/g, "")}`;
  const centerGradId = `c-${flower}-${id.replace(/:/g, "")}`;

  const style = animate ? { animation: "msh-bob 6s ease-in-out infinite", overflow: "visible" } : { overflow: "visible" };

  // Soft tonal range per flower
  const tone = f.tone || {
    deep: f.center,
    mid: f.petal,
    light: f.hex,
    edge: shadeLighten(f.petal, 0.25),
  };

  const wash = theme?.useWatercolor !== false;

  const renderFlower = () => {
    switch (f.shape) {
      // ── Jasmine: 5-petal blossoms in a cluster ─────────────
      case "cluster": {
        const blossoms = [
          { px: cx, py: cy - size * 0.05, r: 0.34 },
          { px: cx - size * 0.21, py: cy + size * 0.12, r: 0.27 },
          { px: cx + size * 0.22, py: cy + size * 0.11, r: 0.28 },
          { px: cx - size * 0.04, py: cy + size * 0.27, r: 0.22 },
        ];
        return (
          <g filter={wash ? "url(#msh-watercolor)" : undefined}>
            {blossoms.map((b, i) => (
              <g key={i}>
                {[0, 72, 144, 216, 288].map((a, j) => (
                  <path key={j}
                    d={petalPath(b.px, b.py, size * b.r, size * b.r * 0.5, a)}
                    fill={`url(#${gradId})`} opacity="0.92" />
                ))}
                <circle cx={b.px} cy={b.py} r={size * b.r * 0.18} fill={tone.deep} opacity="0.85" />
              </g>
            ))}
          </g>
        );
      }

      // ── Peony / Ranunculus: layered ruffled bloom ─────────
      case "ruffle": {
        const layers = [
          { n: 11, r: 0.34, len: 0.22, w: 0.14, off: 0, op: 0.85 },
          { n: 9,  r: 0.22, len: 0.18, w: 0.12, off: 20, op: 0.92 },
          { n: 7,  r: 0.12, len: 0.14, w: 0.1,  off: 40, op: 1 },
          { n: 5,  r: 0.05, len: 0.08, w: 0.08, off: 0, op: 1 },
        ];
        return (
          <g filter={wash ? "url(#msh-watercolor)" : undefined}>
            {layers.map((L, li) => (
              <g key={li}>
                {[...Array(L.n)].map((_, i) => {
                  const angle = (i / L.n) * 360 + L.off;
                  const ar = (angle - 90) * Math.PI / 180;
                  const px = cx + Math.cos(ar) * size * L.r;
                  const py = cy + Math.sin(ar) * size * L.r;
                  return (
                    <ellipse key={i}
                      cx={px} cy={py}
                      rx={size * L.w} ry={size * L.len}
                      fill={li === layers.length - 1 ? tone.deep : `url(#${gradId})`}
                      opacity={L.op}
                      transform={`rotate(${angle} ${px} ${py})`} />
                  );
                })}
              </g>
            ))}
          </g>
        );
      }

      // ── Sunflower / Marigold: ray petals + textured disc ──
      case "ray": {
        const n = flower === "marigold" ? 18 : 14;
        return (
          <g filter={wash ? "url(#msh-watercolor)" : undefined}>
            {/* Outer ring */}
            {[...Array(n)].map((_, i) => {
              const angle = (i / n) * 360;
              return (
                <path key={"o" + i}
                  d={petalPath(cx, cy, size * 0.42, size * 0.07, angle)}
                  fill={`url(#${gradId})`} opacity="0.9" />
              );
            })}
            {/* Inner ring offset */}
            {[...Array(n)].map((_, i) => {
              const angle = (i / n) * 360 + 360 / (n * 2);
              return (
                <path key={"i" + i}
                  d={petalPath(cx, cy, size * 0.32, size * 0.06, angle)}
                  fill={`url(#${gradId})`} opacity="0.8" />
              );
            })}
            <circle cx={cx} cy={cy} r={size * 0.16} fill={`url(#${centerGradId})`} />
            {/* Disc stippling */}
            {[...Array(20)].map((_, i) => {
              const ang = (i * 137.5) * Math.PI / 180;
              const r = Math.sqrt(i / 20) * size * 0.14;
              return <circle key={i}
                cx={cx + Math.cos(ang) * r} cy={cy + Math.sin(ang) * r}
                r={size * 0.012} fill={tone.deep} opacity="0.5" />;
            })}
          </g>
        );
      }

      // ── Anemone: ring of round petals with dark heart ─────
      case "single": {
        return (
          <g filter={wash ? "url(#msh-watercolor)" : undefined}>
            {[...Array(7)].map((_, i) => {
              const angle = (i / 7) * 360;
              return (
                <path key={i}
                  d={petalPath(cx, cy, size * 0.36, size * 0.13, angle)}
                  fill={`url(#${gradId})`} opacity="0.92" />
              );
            })}
            <circle cx={cx} cy={cy} r={size * 0.14} fill={tone.deep} />
            {[...Array(12)].map((_, i) => {
              const ang = (i / 12) * Math.PI * 2;
              return <circle key={i}
                cx={cx + Math.cos(ang) * size * 0.1}
                cy={cy + Math.sin(ang) * size * 0.1}
                r={size * 0.015} fill={tone.mid} opacity="0.5" />;
            })}
          </g>
        );
      }

      // ── Lotus: pointed layered petals ─────────────────────
      case "lotus": {
        return (
          <g filter={wash ? "url(#msh-watercolor)" : undefined}>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * 360;
              return (
                <path key={"o" + i}
                  d={petalPath(cx, cy, size * 0.4, size * 0.09, angle)}
                  fill={`url(#${gradId})`} opacity="0.75" />
              );
            })}
            {[...Array(6)].map((_, i) => {
              const angle = (i / 6) * 360 + 30;
              return (
                <path key={"i" + i}
                  d={petalPath(cx, cy, size * 0.28, size * 0.08, angle)}
                  fill={`url(#${gradId})`} opacity="0.95" />
              );
            })}
            <circle cx={cx} cy={cy - size * 0.02} r={size * 0.08} fill={tone.deep} opacity="0.7" />
          </g>
        );
      }

      // ── Iris: 3 falls + 3 standards ───────────────────────
      case "iris": {
        return (
          <g filter={wash ? "url(#msh-watercolor)" : undefined}>
            {/* Standards (upper petals) */}
            {[0, 120, 240].map((a, i) => (
              <path key={"s" + i}
                d={petalPath(cx, cy, size * 0.38, size * 0.14, a)}
                fill={`url(#${gradId})`} opacity="0.95" />
            ))}
            {/* Falls (lower petals) — wider */}
            {[60, 180, 300].map((a, i) => (
              <path key={"f" + i}
                d={petalPath(cx, cy, size * 0.32, size * 0.16, a)}
                fill={`url(#${gradId})`} opacity="0.7" />
            ))}
            {/* Yellow beard center */}
            <circle cx={cx} cy={cy} r={size * 0.06} fill={tone.deep} />
          </g>
        );
      }

      default:
        return <circle cx={cx} cy={cy} r={size * 0.3} fill={tone.mid} />;
    }
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ ...style, filter: "drop-shadow(0 6px 18px rgba(60, 30, 40, 0.12))" }}>
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={tone.deep} stopOpacity="1" />
          <stop offset="55%" stopColor={tone.mid} stopOpacity="1" />
          <stop offset="100%" stopColor={tone.edge} stopOpacity="0.85" />
        </radialGradient>
        <radialGradient id={centerGradId} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={tone.deep} stopOpacity="1" />
          <stop offset="100%" stopColor={shadeDarken(tone.deep, 0.3)} stopOpacity="1" />
        </radialGradient>
      </defs>
      {/* Soft halo */}
      <ellipse cx={cx} cy={cy} rx={size * 0.45} ry={size * 0.42} fill={tone.light} opacity="0.35" filter="url(#msh-bigblur)" />
      {renderFlower()}
    </svg>
  );
}

// Stem-on flower for vase / poster shots. Renders stem + leaves + flower
// as one inline SVG (avoids SVG-in-SVG nesting issues).
function FlowerWithStem({ flower, size = 220, theme, stemHeight = 1.4, animate = true }) {
  const f = FLOWERS[flower];
  if (!f) return null;

  return (
    <div style={{
      position: "relative",
      width: size,
      height: size * stemHeight,
      animation: animate ? "msh-bob 6s ease-in-out infinite" : "",
    }}>
      {/* Stem + leaves SVG behind */}
      <Stem flower={flower} size={size} stemHeight={stemHeight} theme={theme} />
      {/* Flower head on top */}
      <div style={{ position: "absolute", top: 0, left: 0, width: size, height: size }}>
        <Flower flower={flower} size={size} theme={theme} animate={false} />
      </div>
    </div>
  );
}

function Stem({ flower, size, stemHeight, theme }) {
  const W = size;
  const H = size * stemHeight;
  const headY = size * 0.5;
  const stemStart = headY + size * 0.18;
  const stemEnd = H - 12;
  const cx = W / 2;
  const stem = theme?.stem || "#7a8f5a";
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}>
      <path d={`M ${cx} ${stemStart} Q ${cx - 6} ${(stemStart + stemEnd) / 2}, ${cx + 2} ${stemEnd}`}
        stroke={stem} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
      <ellipse cx={cx - 18} cy={stemStart + (stemEnd - stemStart) * 0.4}
        rx="24" ry="8" fill={stem} opacity="0.75"
        transform={`rotate(-30 ${cx - 18} ${stemStart + (stemEnd - stemStart) * 0.4})`} />
      <ellipse cx={cx + 16} cy={stemStart + (stemEnd - stemStart) * 0.65}
        rx="20" ry="7" fill={stem} opacity="0.65"
        transform={`rotate(35 ${cx + 16} ${stemStart + (stemEnd - stemStart) * 0.65})`} />
    </svg>
  );
}

// Simple shade helpers
function shadeLighten(hex, amt) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const f = (ch) => Math.min(255, Math.round(ch + (255 - ch) * amt));
  const h = (n) => n.toString(16).padStart(2, "0");
  return `#${h(f(r))}${h(f(g))}${h(f(b))}`;
}
function shadeDarken(hex, amt) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const f = (ch) => Math.max(0, Math.round(ch * (1 - amt)));
  const h = (n) => n.toString(16).padStart(2, "0");
  return `#${h(f(r))}${h(f(g))}${h(f(b))}`;
}

// Constellation stars background ornament
function StarField({ count = 24, color = "#e8c97a", w = 360, h = 700, seed = 1 }) {
  const rand = (i) => {
    const x = Math.sin((i + 1) * seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = rand(i) * w;
    const y = rand(i + 100) * h;
    const r = 0.6 + rand(i + 200) * 1.6;
    const op = 0.3 + rand(i + 300) * 0.6;
    stars.push({ x, y, r, op, big: rand(i + 400) > 0.85 });
  }
  return (
    <svg width={w} height={h} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {stars.map((s, i) => (
        s.big ? (
          <g key={i} opacity={s.op}>
            <circle cx={s.x} cy={s.y} r={s.r * 1.4} fill={color} />
            <path d={`M ${s.x - s.r * 3} ${s.y} L ${s.x + s.r * 3} ${s.y} M ${s.x} ${s.y - s.r * 3} L ${s.x} ${s.y + s.r * 3}`}
              stroke={color} strokeWidth="0.4" opacity="0.5" />
          </g>
        ) : (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={color} opacity={s.op} />
        )
      ))}
    </svg>
  );
}

Object.assign(window, { Flower, FlowerWithStem, FlowerDefs, StarField, shadeLighten, shadeDarken });
