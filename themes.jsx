// Three visual variations — all flower-forward and beauty-led.
// Replaces the old moonlit dark direction with an Editorial White florist style.

const THEMES = {
  // V1 — Editorial White: gallery florist. Inspired by hi-end botanical packaging.
  editorial: {
    name: "Editorial White",
    nameTH: "ไวท์ บรรณาธิการ",

    bg: "#fafaf7",
    bgGrad: "linear-gradient(180deg, #ffffff 0%, #faf8f3 100%)",
    surface: "#ffffff",
    surfaceAlt: "#f4f0e8",
    card: "#ffffff",

    ink: "#1a1814",
    inkSoft: "#5a5046",
    inkMuted: "#a8a094",

    accent: "#1a1814",   // ink as primary
    accent2: "#c46a3a",  // warm terracotta highlight
    accent3: "#7a8f5a",  // botanical green
    line: "rgba(26,24,20,0.08)",

    titleFont: '"Cormorant Garamond", serif',
    bodyFont: '"Plus Jakarta Sans", sans-serif',
    thaiFont: '"IBM Plex Sans Thai", sans-serif',
    titleWeight: 500,

    stars: false,
    starColor: "#c0b8a8",
    starDensity: 0,
    glow: "0 0 0 rgba(0,0,0,0)",
    cardShadow: "0 8px 24px rgba(60,40,20,0.06)",

    radius: 14,
    pillRadius: 999,
    buttonBg: "#1a1814",
    buttonInk: "#ffffff",

    statusDark: false,
    stem: "#7a8f5a",
    useWatercolor: true,
  },
  twilight: {
    name: "Pastel Twilight",
    nameTH: "ฟ้าสางหวานๆ",

    bg: "#fef6f3",
    bgGrad: "linear-gradient(180deg, #fef4ed 0%, #f9ecf2 55%, #efe7f5 100%)",
    surface: "#ffffff",
    surfaceAlt: "#fdf3f5",
    card: "#ffffff",

    ink: "#3a2440",
    inkSoft: "#7a5a7d",
    inkMuted: "#b59bb8",

    accent: "#c46a3a",
    accent2: "#e8a4c4",
    accent3: "#9a7ec7",
    line: "rgba(58,36,64,0.08)",

    titleFont: '"Fraunces", serif',
    bodyFont: '"Plus Jakarta Sans", sans-serif',
    thaiFont: '"IBM Plex Sans Thai", sans-serif',
    titleWeight: 500,

    stars: true,
    starColor: "#c46a3a",
    starDensity: 10,
    glow: "0 0 60px rgba(232,164,196,0.4)",
    cardShadow: "0 14px 36px rgba(154,126,199,0.14)",

    radius: 24,
    pillRadius: 999,
    buttonBg: "#3a2440",
    buttonInk: "#fef3f1",

    statusDark: false,
    stem: "#9a8b7a",
    useWatercolor: true,
  },

  // V3 — Garden Botanical: green ink, cream paper, herbarium feel
  garden: {
    name: "Garden Botanical",
    nameTH: "สวนพฤกษ์",

    bg: "#f4f1e8",
    bgGrad: "linear-gradient(180deg, #f7f3e8 0%, #ece6d3 100%)",
    surface: "#ffffff",
    surfaceAlt: "#ece6d3",
    card: "#fcfaf3",

    ink: "#2a3018",
    inkSoft: "#5a6238",
    inkMuted: "#a09878",

    accent: "#4a5a28",   // forest green
    accent2: "#c46a3a",  // terracotta seal
    accent3: "#8a7a4a",  // bronze
    line: "rgba(42,48,24,0.12)",

    titleFont: '"DM Serif Display", serif',
    bodyFont: '"Plus Jakarta Sans", sans-serif',
    thaiFont: '"Sarabun", sans-serif',
    titleWeight: 400,

    stars: false,
    starColor: "#a09878",
    starDensity: 0,
    glow: "0 0 30px rgba(74,90,40,0.15)",
    cardShadow: "0 8px 24px rgba(74,90,40,0.08)",

    radius: 8,
    pillRadius: 4,
    buttonBg: "#2a3018",
    buttonInk: "#f4f1e8",

    statusDark: false,
    stem: "#4a5a28",
    useWatercolor: true,
  },
};

window.THEMES = THEMES;
