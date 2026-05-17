// FlowerApp — the main shell that wires screens together. One per artboard.

const { useState: useStateA } = React;

function FlowerApp({ theme }) {
  const [screen, setScreen] = useStateA("welcome");
  const [pathId, setPathId] = useStateA(null);
  const [flower, setFlower] = useStateA(null);
  const [order, setOrder] = useStateA(null);

  const go = (s) => setScreen(s);

  const goPath = (pid) => {
    setPathId(pid);
    if (pid === "birthmonth") setScreen("birthmonth");
    else if (pid === "occasion") setScreen("occasion");
    else setScreen("quiz"); // mood, love, quiz
  };

  // From welcome carousel — straight to lore for that flower
  const pickFlowerDirect = (k) => {
    setFlower(k);
    setScreen("lore");
  };

  const onQuizDone = (flowerKey) => {
    setFlower(flowerKey);
    setScreen("reveal");
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      background: theme.bgGrad,
      display: "flex", flexDirection: "column",
      fontFamily: theme.bodyFont,
      color: theme.ink,
      position: "relative",
      overflow: "hidden",
      paddingTop: "max(env(safe-area-inset-top), 12px)",
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      <FlowerDefs />

      {screen === "welcome" && <WelcomeScreen theme={theme}
        onStartQuiz={() => go("paths")}
        onPickFlower={pickFlowerDirect} />}

      {screen === "paths" && <PathsScreen theme={theme}
        onPick={goPath} onBack={() => go("welcome")} />}

      {screen === "quiz" && <QuizScreen theme={theme} pathId={pathId}
        onComplete={onQuizDone} onBack={() => go("paths")} />}

      {screen === "birthmonth" && <BirthMonthScreen theme={theme}
        onPick={(flowerKey) => { setFlower(flowerKey); go("reveal"); }}
        onBack={() => go("paths")} />}

      {screen === "occasion" && <OccasionScreen theme={theme}
        onPick={(flowerKey) => { setFlower(flowerKey); go("reveal"); }}
        onBack={() => go("paths")} />}

      {screen === "reveal" && flower && <RevealScreen theme={theme} flowerKey={flower}
        onContinue={() => go("lore")} />}

      {screen === "lore" && flower && <LoreScreen theme={theme} flowerKey={flower}
        onShop={() => go("shop")} onShare={() => go("share")}
        onBack={() => go("welcome")} />}

      {screen === "shop" && flower && <ShopScreen theme={theme} flowerKey={flower}
        onBack={() => go("lore")} onShare={() => go("share")}
        onCheckout={(o) => { setOrder(o); go("checkout"); }} />}

      {screen === "checkout" && flower && <CheckoutScreen theme={theme} flowerKey={flower}
        order={order} onBack={() => go("shop")} />}

      {screen === "share" && flower && <ShareScreen theme={theme} flowerKey={flower}
        onBack={() => go("lore")} />}
    </div>
  );
}

// ── Birth month picker ───────────────────────────────────────────

const BIRTH_MONTHS = [
  { en: "Jan", th: "ม.ค.", flower: "ranunculus" },
  { en: "Feb", th: "ก.พ.", flower: "iris" },
  { en: "Mar", th: "มี.ค.", flower: "jasmine" },
  { en: "Apr", th: "เม.ย.", flower: "peony" },
  { en: "May", th: "พ.ค.", flower: "lotus" },
  { en: "Jun", th: "มิ.ย.", flower: "ranunculus" },
  { en: "Jul", th: "ก.ค.", flower: "lotus" },
  { en: "Aug", th: "ส.ค.", flower: "sunflower" },
  { en: "Sep", th: "ก.ย.", flower: "marigold" },
  { en: "Oct", th: "ต.ค.", flower: "marigold" },
  { en: "Nov", th: "พ.ย.", flower: "anemone" },
  { en: "Dec", th: "ธ.ค.", flower: "peony" },
];

function BirthMonthScreen({ theme, onPick, onBack }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <Header theme={theme} onBack={onBack} />

      <div style={{ padding: "12px 24px 16px" }}>
        <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: theme.inkMuted, letterSpacing: 2.5, textTransform: "uppercase" }}>
          Birth month · เดือนเกิด
        </div>
        <div style={{ fontFamily: theme.titleFont, fontSize: 28, fontWeight: theme.titleWeight, color: theme.ink, lineHeight: 1.05, marginTop: 8, letterSpacing: -0.5, fontStyle: "italic" }}>
          Which month is yours?
        </div>
        <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, marginTop: 3 }}>
          คุณเกิดเดือนอะไร?
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 22px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {BIRTH_MONTHS.map((m, i) => {
            const f = FLOWERS[m.flower];
            return (
              <button key={i} onClick={() => onPick(m.flower)} style={{
                padding: "12px 8px 10px",
                background: theme.card,
                border: `1px solid ${theme.line}`,
                borderRadius: theme.radius,
                cursor: "pointer", textAlign: "center",
                boxShadow: theme.cardShadow,
                transition: "all .15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.accent2 || theme.accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.line; e.currentTarget.style.transform = ""; }}
              >
                <div style={{ width: 44, height: 44, margin: "0 auto", borderRadius: 22, background: f.hex, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Flower flower={m.flower} size={38} theme={theme} animate={false} />
                </div>
                <div style={{ fontFamily: theme.titleFont, fontSize: 13, fontStyle: "italic", color: theme.ink, marginTop: 6, fontWeight: 500 }}>{m.en}</div>
                <div style={{ fontFamily: theme.thaiFont, fontSize: 10, color: theme.inkSoft }}>{m.th}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Occasion picker ──────────────────────────────────────────────

const OCCASIONS = [
  { id: "gift",     en: "Just a gift",     th: "ให้เปล่าๆ",     flower: "ranunculus", note_en: "No occasion. Just because.", note_th: "ไม่ต้องมีโอกาส ให้เพราะอยากให้" },
  { id: "sorry",    en: "I'm sorry",       th: "ขอโทษ",         flower: "lotus",      note_en: "A fresh start, in flower form.", note_th: "ขอเริ่มต้นใหม่ ในรูปดอกไม้" },
  { id: "thanks",   en: "Thank you",       th: "ขอบคุณ",        flower: "jasmine",    note_en: "For everything you do quietly.", note_th: "สำหรับทุกอย่างที่คุณทำเงียบๆ" },
  { id: "congrats", en: "Congratulations", th: "ยินดีด้วย",     flower: "peony",      note_en: "You did it. Bloom loudly.", note_th: "คุณทำได้แล้ว — บานให้สุด" },
  { id: "sympathy", en: "Thinking of you", th: "คิดถึงนะ",      flower: "iris",       note_en: "Sitting with you, in the quiet.", note_th: "อยู่ข้างๆ คุณนะ ในความเงียบนี้" },
  { id: "welcome",  en: "Welcome home",    th: "ยินดีต้อนรับ",   flower: "marigold",   note_en: "May this place hold you well.", note_th: "ขอให้บ้านนี้โอบคุณไว้" },
  { id: "love",     en: "I love you",      th: "รักนะ",         flower: "peony",      note_en: "Big feelings, soft delivery.", note_th: "หัวใจฟูฟ่อง ส่งแบบนุ่มๆ" },
  { id: "cheer",    en: "Cheer up",        th: "สู้ๆ นะ",        flower: "sunflower",  note_en: "The sun is rooting for you.", note_th: "แสงแดดเชียร์คุณอยู่" },
];

function OccasionScreen({ theme, onPick, onBack }) {
  const [hover, setHover] = useStateA(null);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <Header theme={theme} onBack={onBack} />

      <div style={{ padding: "12px 24px 16px" }}>
        <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: theme.inkMuted, letterSpacing: 2.5, textTransform: "uppercase" }}>
          By occasion · ตามโอกาส
        </div>
        <div style={{ fontFamily: theme.titleFont, fontSize: 28, fontWeight: theme.titleWeight, color: theme.ink, lineHeight: 1.05, marginTop: 8, letterSpacing: -0.5, fontStyle: "italic" }}>
          What's the moment?
        </div>
        <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, marginTop: 3 }}>
          ดอกไม้นี้สำหรับโอกาสไหน?
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 22px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {OCCASIONS.map((o) => {
            const f = FLOWERS[o.flower];
            const isHover = hover === o.id;
            return (
              <button key={o.id} onClick={() => onPick(o.flower)}
                onMouseEnter={() => setHover(o.id)} onMouseLeave={() => setHover(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 14px",
                  background: theme.card,
                  border: `1px solid ${isHover ? theme.accent2 || theme.accent : theme.line}`,
                  borderRadius: theme.radius,
                  cursor: "pointer", textAlign: "left",
                  boxShadow: theme.cardShadow,
                  transition: "all .15s",
                  transform: isHover ? "translateY(-2px)" : "",
                }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: f.hex, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Flower flower={o.flower} size={38} theme={theme} animate={false} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                    <div style={{ fontFamily: theme.titleFont, fontSize: 16, fontStyle: "italic", color: theme.ink, fontWeight: 500 }}>{o.en}</div>
                    <div style={{ fontFamily: theme.thaiFont, fontSize: 12, color: theme.inkSoft }}>· {o.th}</div>
                  </div>
                  <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, marginTop: 2, fontStyle: "italic" }}>
                    {o.note_en}
                  </div>
                </div>
                <div style={{ color: theme.inkMuted, fontSize: 16 }}>›</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.FlowerApp = FlowerApp;
window.BIRTH_MONTHS = BIRTH_MONTHS;
window.OCCASIONS = OCCASIONS;
