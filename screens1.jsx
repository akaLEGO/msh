// Screen components for the Ms.H flower match prototype.
// Flower-forward, beauty-led, bilingual TH + EN.

const { useState, useEffect, useMemo, useRef } = React;

// ── Reusable bits ────────────────────────────────────────────────

function Pill({ children, theme, active, onClick, big }) {
  const styles = {
    padding: big ? "14px 22px" : "10px 16px",
    borderRadius: theme.pillRadius,
    background: active ? theme.buttonBg : "transparent",
    color: active ? theme.buttonInk : theme.ink,
    border: `1px solid ${active ? theme.buttonBg : theme.line}`,
    fontFamily: theme.bodyFont,
    fontSize: big ? 15 : 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all .2s",
    whiteSpace: "nowrap",
  };
  return <button style={styles} onClick={onClick}>{children}</button>;
}

function PrimaryBtn({ children, theme, onClick, full, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: full ? "100%" : "auto",
      padding: "16px 28px",
      borderRadius: theme.pillRadius,
      background: theme.buttonBg,
      color: theme.buttonInk,
      border: "none",
      fontFamily: theme.bodyFont,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 0.3,
      cursor: "pointer",
      boxShadow: theme.cardShadow,
      transition: "transform .15s",
      ...style,
    }}
      onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
      onMouseUp={(e) => e.currentTarget.style.transform = ""}
      onMouseLeave={(e) => e.currentTarget.style.transform = ""}
    >{children}</button>
  );
}

function GhostBtn({ children, theme, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      padding: "12px 22px",
      borderRadius: theme.pillRadius,
      background: "transparent",
      color: theme.ink,
      border: `1px solid ${theme.line}`,
      fontFamily: theme.bodyFont,
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer",
      ...style,
    }}>{children}</button>
  );
}

function Header({ theme, onBack, step, total, rightSlot }) {
  return (
    <div style={{ padding: "4px 22px 0", display: "flex", alignItems: "center", justifyContent: "space-between", height: 36 }}>
      {onBack ? (
        <button onClick={onBack} style={{
          width: 34, height: 34, borderRadius: 17, background: "transparent",
          border: `1px solid ${theme.line}`, color: theme.ink, cursor: "pointer", fontSize: 13,
        }}>←</button>
      ) : <div style={{ width: 34 }} />}
      {step != null && total != null && (
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[...Array(total)].map((_, i) => (
            <div key={i} style={{
              width: i === step ? 18 : 5, height: 5, borderRadius: 3,
              background: i <= step ? theme.accent : theme.line,
              transition: "all .3s",
            }} />
          ))}
        </div>
      )}
      {rightSlot || <div style={{ width: 34 }} />}
    </div>
  );
}

// Tiny logo / wordmark
function MsHMark({ theme, size = 14, withCo }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ fontFamily: theme.titleFont, fontSize: size, color: theme.ink, letterSpacing: 0, fontStyle: "italic", fontWeight: 500 }}>
        Ms<span style={{ color: theme.accent2 || theme.accent }}>.</span>H
      </div>
      {withCo && (
        <div style={{ fontFamily: theme.bodyFont, fontSize: 9, color: theme.inkMuted, letterSpacing: 2, paddingLeft: 6, borderLeft: `1px solid ${theme.line}` }}>
          BANGKOK FLORIST
        </div>
      )}
    </div>
  );
}

// Tiny basket icon
function BasketIcon({ theme, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M3 7h14l-1.5 9.5a1 1 0 01-1 0.85h-9a1 1 0 01-1-0.85L3 7z" stroke={theme.ink} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7 7V5a3 3 0 016 0v2" stroke={theme.ink} strokeWidth="1.3" />
    </svg>
  );
}

// ── HOME / Welcome — flower-forward gallery ─────────────────────

function WelcomeScreen({ theme, onStartQuiz, onPickFlower }) {
  // Highlight three "today's blooms" — rotating set
  const featured = ["peony", "ranunculus", "iris"];
  const [hero, setHero] = useState(0);
  const heroFlower = featured[hero];
  const f = FLOWERS[heroFlower];

  // Auto-rotate hero every 4.5s
  useEffect(() => {
    const t = setInterval(() => setHero((h) => (h + 1) % featured.length), 4500);
    return () => clearInterval(t);
  }, []);

  const allFlowers = FLOWER_KEYS;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      {theme.stars && <StarField count={theme.starDensity} color={theme.starColor} w={400} h={800} seed={3} />}

      {/* Header */}
      <div style={{ padding: "4px 22px 0", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 3 }}>
        <MsHMark theme={theme} size={20} withCo />
        <button style={{ width: 34, height: 34, borderRadius: 17, border: `1px solid ${theme.line}`, background: theme.surface, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BasketIcon theme={theme} size={16} />
        </button>
      </div>

      {/* Date + editorial caption */}
      <div style={{ padding: "20px 24px 4px", display: "flex", flexDirection: "column", gap: 2, position: "relative", zIndex: 3 }}>
        <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: theme.inkMuted, letterSpacing: 2.5, textTransform: "uppercase" }}>
          № {String(new Date().getDate()).padStart(2, "0")} · {new Date().toLocaleDateString("en-US", { month: "long" }).toUpperCase()}
        </div>
        <div style={{ fontFamily: theme.titleFont, fontSize: 32, fontWeight: theme.titleWeight, color: theme.ink, lineHeight: 1.05, letterSpacing: -0.6, fontStyle: "italic", marginTop: 6 }}>
          Today's bloom
        </div>
        <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, marginTop: 1 }}>
          ดอกไม้ของวันนี้
        </div>
      </div>

      {/* Hero flower card */}
      <div style={{ flex: 1, padding: "8px 22px 0", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 3, minHeight: 0 }}>
        <div style={{
          flex: 1,
          background: `linear-gradient(165deg, ${f.hex} 0%, ${shadeLighten(f.petal, 0.5)} 100%)`,
          borderRadius: theme.radius,
          padding: "20px 22px 22px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.line}`,
          transition: "background .8s",
        }}>
          {/* Number/index pill */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 2 }}>
            <div style={{
              padding: "4px 10px", borderRadius: 999,
              background: "rgba(255,255,255,0.55)", border: "1px solid rgba(0,0,0,0.06)",
              fontFamily: theme.bodyFont, fontSize: 10, color: "#1a1a1a", letterSpacing: 1.5,
            }}>№ {String(hero + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}</div>
            <div style={{ display: "flex", gap: 4 }}>
              {featured.map((_, i) => (
                <button key={i} onClick={() => setHero(i)} style={{
                  width: i === hero ? 16 : 5, height: 5, borderRadius: 3,
                  background: i === hero ? "#1a1a1a" : "rgba(0,0,0,0.2)",
                  border: "none", cursor: "pointer", padding: 0, transition: "all .3s",
                }} />
              ))}
            </div>
          </div>

          {/* Flower art — anchored to bottom, stem grows up from base */}
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative", minHeight: 0, marginBottom: 10 }}>
            <FlowerWithStem flower={heroFlower} size={220} stemHeight={1.8} theme={theme} />
          </div>

          {/* Name + tagline */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <div style={{ fontFamily: theme.titleFont, fontSize: 30, fontWeight: theme.titleWeight, color: "#1a1a1a", lineHeight: 1, letterSpacing: -0.5, fontStyle: "italic", whiteSpace: "nowrap" }}>
                {f.en}
              </div>
              <div style={{ fontFamily: theme.thaiFont, fontSize: 16, color: "#1a1a1aaa", whiteSpace: "nowrap" }}>
                · {f.th}
              </div>
            </div>
            <div style={{ fontFamily: theme.titleFont, fontSize: 13, fontStyle: "italic", color: "#1a1a1aaa", marginTop: 4, lineHeight: 1.3 }}>
              "{f.tagline_en}"
            </div>
            <div style={{ fontFamily: theme.thaiFont, fontSize: 12, color: "#1a1a1a88", lineHeight: 1.3 }}>
              {f.tagline_th}
            </div>
          </div>
        </div>
      </div>

      {/* Flower carousel — pick by sight */}
      <div style={{ padding: "16px 0 0", position: "relative", zIndex: 3 }}>
        <div style={{ padding: "0 24px 8px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: theme.inkMuted, letterSpacing: 2, textTransform: "uppercase" }}>
              Pick by sight · เลือกตามใจ
            </div>
          </div>
          <button onClick={onStartQuiz} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: theme.bodyFont, fontSize: 11, color: theme.accent2 || theme.accent, fontWeight: 600,
          }}>
            Find my match →
          </button>
        </div>
        <div className="phone-scroll" style={{ display: "flex", gap: 10, overflowX: "auto", padding: "4px 24px 16px", scrollSnapType: "x mandatory" }}>
          {allFlowers.map((k) => {
            const ff = FLOWERS[k];
            return (
              <button key={k} onClick={() => onPickFlower(k)} style={{
                flex: "0 0 auto",
                width: 80, height: 92,
                background: `linear-gradient(160deg, ${ff.hex}, ${shadeLighten(ff.petal, 0.5)})`,
                borderRadius: theme.radius * 0.65,
                border: `1px solid ${theme.line}`,
                cursor: "pointer", padding: "8px 6px 6px",
                display: "flex", flexDirection: "column", alignItems: "center",
                scrollSnapAlign: "start",
                transition: "transform .15s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = ""}
              >
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Flower flower={k} size={58} theme={theme} animate={false} />
                </div>
                <div style={{ fontFamily: theme.titleFont, fontSize: 11, color: "#1a1a1acc", fontStyle: "italic", marginTop: 2 }}>{ff.en}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Path Picker — secondary screen for the "reading" ────────────

function PathsScreen({ theme, onPick, onBack }) {
  const today = new Date();
  const todayLabel = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      {theme.stars && <StarField count={Math.floor(theme.starDensity * 0.5)} color={theme.starColor} w={400} h={800} seed={5} />}

      <Header theme={theme} onBack={onBack} />

      <div style={{ padding: "12px 24px 16px", position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: theme.inkMuted, letterSpacing: 2.5, textTransform: "uppercase" }}>
          {todayLabel}
        </div>
        <div style={{ fontFamily: theme.titleFont, fontSize: 30, fontWeight: theme.titleWeight, color: theme.ink, lineHeight: 1.05, marginTop: 8, letterSpacing: -0.6, fontStyle: "italic" }}>
          How can we match you?
        </div>
        <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, marginTop: 3 }}>
          หาดอกไม้ที่ใช่ยังไงดี?
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 22px 24px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PATHS.map((p) => (
            <button key={p.id} onClick={() => onPick(p.id)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px",
                background: theme.card,
                border: `1px solid ${theme.line}`,
                borderRadius: theme.radius,
                cursor: "pointer", textAlign: "left",
                boxShadow: theme.cardShadow,
                transition: "all .15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = theme.accent2 || theme.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = theme.line; }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 20,
                background: theme.surfaceAlt,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: theme.titleFont, fontSize: 18, color: theme.accent2 || theme.accent,
                flexShrink: 0,
              }}>{p.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: theme.titleFont, fontSize: 17, fontStyle: "italic", color: theme.ink, fontWeight: 500, lineHeight: 1.1 }}>
                  {p.en} <span style={{ fontFamily: theme.thaiFont, fontStyle: "normal", fontSize: 12, color: theme.inkSoft, fontWeight: 400 }}>· {p.th}</span>
                </div>
                <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, marginTop: 4 }}>
                  {p.sub_en}
                </div>
              </div>
              <div style={{ color: theme.inkMuted, fontSize: 16 }}>›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────

function QuizScreen({ theme, pathId, onComplete, onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [picking, setPicking] = useState(null);

  const path = PATHS.find((p) => p.id === pathId);
  const q = QUIZ[step];

  const handlePick = (opt) => {
    setPicking(opt.flower);
    setTimeout(() => {
      const next = [...answers, opt.flower];
      setPicking(null);
      if (step < QUIZ.length - 1) {
        setStep(step + 1);
        setAnswers(next);
      } else {
        const counts = {};
        next.forEach((f) => { counts[f] = (counts[f] || 0) + 1; });
        const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        onComplete(winner);
      }
    }, 380);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {theme.stars && <StarField count={Math.floor(theme.starDensity * 0.4)} color={theme.starColor} w={400} h={800} seed={step + 7} />}

      <Header theme={theme} onBack={onBack} step={step} total={QUIZ.length} />

      <div style={{ padding: "16px 24px 8px", position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: theme.inkMuted, letterSpacing: 2.5, textTransform: "uppercase" }}>
          {path?.en} · Q{step + 1}/{QUIZ.length}
        </div>
        <div style={{ fontFamily: theme.titleFont, fontSize: 26, fontWeight: theme.titleWeight, color: theme.ink, lineHeight: 1.15, marginTop: 8, letterSpacing: -0.5, fontStyle: "italic" }}>
          {q.en}
        </div>
        <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, marginTop: 3 }}>
          {q.th}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 22px 28px", display: "flex", flexDirection: "column", gap: 8, position: "relative", zIndex: 2 }}>
        {q.options.map((opt, i) => {
          const flower = FLOWERS[opt.flower];
          const isPicking = picking === opt.flower;
          return (
            <button key={i} onClick={() => handlePick(opt)} disabled={picking !== null}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "12px 14px",
                background: theme.card,
                border: `1px solid ${isPicking ? (theme.accent2 || theme.accent) : theme.line}`,
                borderRadius: theme.radius,
                cursor: picking ? "default" : "pointer",
                textAlign: "left",
                boxShadow: isPicking ? `0 0 30px ${flower.petal}66` : theme.cardShadow,
                transform: isPicking ? "scale(1.02)" : "",
                opacity: picking && !isPicking ? 0.35 : 1,
                transition: "all .25s",
              }}
            >
              <div style={{ width: 46, height: 46, borderRadius: 23, background: flower.hex, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <Flower flower={opt.flower} size={42} theme={theme} animate={false} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: theme.titleFont, fontSize: 16, fontWeight: 500, color: theme.ink, fontStyle: "italic" }}>{opt.en}</div>
                <div style={{ fontFamily: theme.thaiFont, fontSize: 12, color: theme.inkSoft, marginTop: 1 }}>{opt.th}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Reveal ───────────────────────────────────────────────────────

function RevealScreen({ theme, flowerKey, onContinue }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(t);
  }, []);

  const f = FLOWERS[flowerKey];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
      background: `radial-gradient(ellipse at center, ${f.hex} 0%, transparent 70%)` }}>
      {theme.stars && <StarField count={theme.starDensity} color={theme.starColor} w={400} h={800} seed={11} />}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 28px", gap: 16, position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: theme.inkMuted, letterSpacing: 2.5, textTransform: "uppercase", opacity: revealed ? 1 : 0, transition: "opacity 1s", textAlign: "center" }}>
          You are<br /><span style={{ fontFamily: theme.thaiFont, textTransform: "none", fontSize: 11, letterSpacing: 0 }}>คุณคือ…</span>
        </div>

        <div style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scale(1)" : "scale(0.7)",
          transition: "all 1.2s cubic-bezier(.2,.8,.2,1)",
        }}>
          <FlowerWithStem flower={flowerKey} size={210} stemHeight={1.5} theme={theme} />
        </div>

        <div style={{ textAlign: "center", opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(20px)", transition: "all 1.4s .2s" }}>
          <div style={{ fontFamily: theme.titleFont, fontSize: 52, fontWeight: theme.titleWeight, color: theme.ink, lineHeight: 1, letterSpacing: -1.2, fontStyle: "italic" }}>
            {f.en}
          </div>
          <div style={{ fontFamily: theme.thaiFont, fontSize: 22, color: theme.inkSoft, marginTop: 4 }}>
            {f.th}
          </div>
        </div>

        <div style={{ textAlign: "center", maxWidth: 280, opacity: revealed ? 1 : 0, transition: "opacity 1.4s .5s" }}>
          <div style={{ fontFamily: theme.titleFont, fontSize: 17, fontStyle: "italic", color: theme.accent2 || theme.accent, lineHeight: 1.3 }}>
            "{f.tagline_en}"
          </div>
          <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, marginTop: 6 }}>
            {f.tagline_th}
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px 44px", opacity: revealed ? 1 : 0, transition: "opacity 1s .8s", position: "relative", zIndex: 2 }}>
        <PrimaryBtn theme={theme} full onClick={onContinue}>
          Read my flower · อ่านดอกไม้ของฉัน
        </PrimaryBtn>
      </div>
    </div>
  );
}

Object.assign(window, {
  Pill, PrimaryBtn, GhostBtn, Header, MsHMark, BasketIcon,
  WelcomeScreen, PathsScreen, QuizScreen, RevealScreen,
});
