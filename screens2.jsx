// Lore, Shop, Share Card screens + the main FlowerApp shell.

const { useState: useState2, useEffect: useEffect2, useMemo: useMemo2, useRef: useRef2 } = React;

// ── Lore — flower meaning, fortune, pairings, friend match ──────

function LoreScreen({ theme, flowerKey, onShop, onShare, onBack }) {
  const f = FLOWERS[flowerKey];
  const matchPct = useMemo2(() => 78 + Math.floor(Math.random() * 18), [flowerKey]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      {theme.stars && <StarField count={Math.floor(theme.starDensity * 0.5)} color={theme.starColor} w={400} h={800} seed={17} />}

      <Header theme={theme} onBack={onBack} />

      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px", position: "relative", zIndex: 2 }}>
        {/* Hero card */}
        <div style={{
          background: `linear-gradient(160deg, ${f.hex}, ${f.petal}55)`,
          border: `1px solid ${theme.line}`,
          borderRadius: theme.radius,
          padding: "20px 20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: theme.cardShadow,
          marginBottom: 18,
        }}>
          <div style={{ flexShrink: 0 }}>
            <Flower flower={flowerKey} size={110} theme={theme} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: f.center, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>
              YOUR MATCH · {matchPct}%
            </div>
            <div style={{ fontFamily: theme.titleFont, fontSize: 26, fontWeight: theme.titleWeight, color: "#1a1a2e", lineHeight: 1, marginTop: 4 }}>
              {f.en}
            </div>
            <div style={{ fontFamily: theme.thaiFont, fontSize: 15, color: "#3a2a3a", marginTop: 2 }}>
              {f.th}
            </div>
            <div style={{ marginTop: 8, height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${matchPct}%`, height: "100%", background: f.center }} />
            </div>
          </div>
        </div>

        {/* The lore */}
        <Section theme={theme} en="THE STORY" th="เรื่องราว">
          <div style={{ fontFamily: theme.titleFont, fontSize: 18, fontStyle: "italic", color: theme.ink, lineHeight: 1.45 }}>
            {f.lore_en}
          </div>
          <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, lineHeight: 1.55, marginTop: 8 }}>
            {f.lore_th}
          </div>
        </Section>

        {/* A note from your bloom */}
        <Section theme={theme} en="A NOTE FROM YOUR BLOOM" th="ข้อความจากดอกไม้คุณ" gold>
          <div style={{
            padding: "16px 18px",
            background: `linear-gradient(135deg, ${theme.accent}1a, ${theme.accent}05)`,
            border: `1px solid ${theme.accent}40`,
            borderRadius: theme.radius * 0.7,
          }}>
            <div style={{ fontFamily: theme.titleFont, fontSize: 17, color: theme.ink, fontStyle: "italic", lineHeight: 1.4 }}>
              "{f.fortune_en}"
            </div>
            <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, lineHeight: 1.5, marginTop: 8 }}>
              "{f.fortune_th}"
            </div>
          </div>
        </Section>

        {/* Pairs well with */}
        <Section theme={theme} en="PAIRS WELL WITH" th="เข้ากันดีกับ">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {f.pair_en.split(",").map((p, i) => (
              <div key={i} style={{
                padding: "7px 12px",
                background: theme.surfaceAlt,
                borderRadius: theme.pillRadius,
                fontFamily: theme.bodyFont,
                fontSize: 12,
                color: theme.ink,
              }}>{p.trim()}</div>
            ))}
          </div>
          <div style={{ fontFamily: theme.thaiFont, fontSize: 12.5, color: theme.inkSoft, marginTop: 8 }}>
            {f.pair_th}
          </div>
        </Section>

        {/* Friend match */}
        <Section theme={theme} en="COMPARE WITH A FRIEND" th="เทียบกับเพื่อน">
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 16px",
            background: theme.card,
            border: `1px dashed ${theme.line}`,
            borderRadius: theme.radius * 0.7,
          }}>
            <div style={{ display: "flex", alignItems: "center", marginRight: 4 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: f.hex, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${theme.surface}` }}>
                <Flower flower={flowerKey} size={30} theme={theme} animate={false} />
              </div>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: theme.surfaceAlt, marginLeft: -10, border: `2px dashed ${theme.inkMuted}`, display: "flex", alignItems: "center", justifyContent: "center", color: theme.inkMuted, fontSize: 18 }}>+</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: theme.bodyFont, fontSize: 13, fontWeight: 500, color: theme.ink }}>Send to a friend</div>
              <div style={{ fontFamily: theme.thaiFont, fontSize: 11.5, color: theme.inkMuted, marginTop: 1 }}>ชวนเพื่อนทำ ดูว่าดอกไม้คุณเข้ากันมั้ย</div>
            </div>
            <div style={{ color: theme.accent, fontSize: 18 }}>›</div>
          </div>
        </Section>
      </div>

      <div style={{ padding: "12px 24px 40px", display: "flex", gap: 10, background: `linear-gradient(to top, ${theme.bg} 80%, ${theme.bg}00)`, position: "relative", zIndex: 2 }}>
        <GhostBtn theme={theme} onClick={onShare} style={{ flex: 1 }}>
          ↗ Share
        </GhostBtn>
        <PrimaryBtn theme={theme} onClick={onShop} style={{ flex: 2 }}>
          Get my flower · สั่งช่อนี้
        </PrimaryBtn>
      </div>
    </div>
  );
}

function Section({ theme, en, th, gold, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: gold ? theme.accent2 || theme.accent : theme.inkMuted, letterSpacing: 2, fontWeight: 600 }}>
          {en}
        </div>
        <div style={{ fontFamily: theme.thaiFont, fontSize: 11, color: theme.inkMuted, marginTop: 2 }}>
          {th}
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Shop ─────────────────────────────────────────────────────────

function ShopScreen({ theme, flowerKey, onBack, onShare, onCheckout }) {
  const f = FLOWERS[flowerKey];
  const [picked, setPicked] = useState2("bouquet");
  const [isGift, setIsGift] = useState2(false);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <Header theme={theme} onBack={onBack} />

      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, letterSpacing: 1.5, textTransform: "uppercase" }}>
            Bring it home · เอากลับบ้าน
          </div>
          <div style={{ fontFamily: theme.titleFont, fontSize: 26, fontWeight: theme.titleWeight, color: theme.ink, marginTop: 4, letterSpacing: -0.4 }}>
            Your {f.en}, four ways
          </div>
          <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, marginTop: 2 }}>
            ดอก{f.th}ของคุณ — เลือกได้ 4 แบบ
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {Object.entries(PRODUCTS).map(([key, p]) => {
            const isPicked = picked === key;
            return (
              <button key={key} onClick={() => setPicked(key)} style={{
                background: theme.card,
                border: `1.5px solid ${isPicked ? theme.accent : theme.line}`,
                borderRadius: theme.radius,
                padding: "14px 12px 12px",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: isPicked ? theme.glow : theme.cardShadow,
                transition: "all .2s",
                position: "relative",
              }}>
                <div style={{
                  height: 90, borderRadius: theme.radius * 0.5,
                  background: `linear-gradient(160deg, ${f.hex}, ${f.petal}66)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 10,
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Vessel hint by product type */}
                  <ProductVessel theme={theme} flowerKey={flowerKey} kind={key} />
                  {isPicked && (
                    <div style={{ position: "absolute", top: 6, right: 6, width: 20, height: 20, borderRadius: 10, background: theme.accent, color: theme.buttonInk, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>✓</div>
                  )}
                </div>
                <div style={{ fontFamily: theme.bodyFont, fontSize: 13, fontWeight: 600, color: theme.ink }}>{p.en}</div>
                <div style={{ fontFamily: theme.thaiFont, fontSize: 11.5, color: theme.inkSoft, marginTop: 1 }}>{p.th}</div>
                <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, marginTop: 4, lineHeight: 1.35 }}>{p.sub_en}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 8 }}>
                  <div style={{ fontFamily: theme.titleFont, fontSize: 18, color: theme.ink, fontWeight: 600 }}>฿{p.price.toLocaleString()}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Gift toggle */}
        <div style={{ marginTop: 16, padding: "14px 16px", background: theme.card, border: `1px solid ${theme.line}`, borderRadius: theme.radius * 0.7, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 22 }}>🎁</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: theme.bodyFont, fontSize: 13, fontWeight: 500, color: theme.ink }}>Send as a gift</div>
            <div style={{ fontFamily: theme.thaiFont, fontSize: 11.5, color: theme.inkSoft, marginTop: 1 }}>ส่งเป็นของขวัญพร้อมข้อความ</div>
          </div>
          <button onClick={() => setIsGift(!isGift)} style={{
            width: 44, height: 26, borderRadius: 13,
            background: isGift ? theme.accent : theme.line,
            border: "none", cursor: "pointer", position: "relative",
            transition: "all .2s",
          }}>
            <div style={{
              position: "absolute", top: 3, left: isGift ? 21 : 3,
              width: 20, height: 20, borderRadius: 10,
              background: "#fff", transition: "all .2s",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }} />
          </button>
        </div>

        {isGift && (
          <div style={{ marginTop: 8, padding: "12px 14px", background: `${theme.accent}10`, border: `1px dashed ${theme.accent}66`, borderRadius: theme.radius * 0.5 }}>
            <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, letterSpacing: 1, textTransform: "uppercase" }}>
              Handwritten card · การ์ดเขียนมือ
            </div>
            <div style={{ fontFamily: theme.titleFont, fontSize: 14, color: theme.ink, fontStyle: "italic", marginTop: 4, lineHeight: 1.4 }}>
              "Saw a {f.en.toLowerCase()} and thought of you — Ms.H reading it as quiet devotion. Hope it finds you soft."
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "12px 24px 40px", background: `linear-gradient(to top, ${theme.bg} 80%, ${theme.bg}00)` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted }}>Total · รวม</div>
            <div style={{ fontFamily: theme.titleFont, fontSize: 22, fontWeight: 600, color: theme.ink }}>
              ฿{PRODUCTS[picked].price.toLocaleString()}
            </div>
          </div>
          <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, textAlign: "right" }}>
            Free delivery in BKK<br />
            <span style={{ fontFamily: theme.thaiFont }}>ส่งฟรีในกรุงเทพ</span>
          </div>
        </div>
        <PrimaryBtn theme={theme} full onClick={() => onCheckout && onCheckout({ product: picked, isGift })}>
          Checkout · ดำเนินการสั่งซื้อ →
        </PrimaryBtn>
      </div>
    </div>
  );
}

// Simplified vessel illustration for product cards
function ProductVessel({ theme, flowerKey, kind }) {
  const f = FLOWERS[flowerKey];
  if (kind === "bouquet") {
    return (
      <div style={{ position: "relative" }}>
        <Flower flower={flowerKey} size={70} theme={theme} animate={false} />
        <div style={{
          position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
          width: 50, height: 14, borderRadius: "0 0 4px 4px",
          background: theme.statusDark ? "#3a2a4a" : "#d4b896",
        }} />
      </div>
    );
  }
  if (kind === "jar") {
    return (
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Flower flower={flowerKey} size={48} theme={theme} animate={false} />
        <div style={{
          width: 38, height: 26, marginTop: -6,
          background: "rgba(180,200,220,0.55)",
          border: `1.5px solid rgba(255,255,255,0.5)`,
          borderRadius: "4px 4px 12px 12px",
        }} />
      </div>
    );
  }
  if (kind === "posy") {
    return <Flower flower={flowerKey} size={55} theme={theme} animate={false} />;
  }
  if (kind === "dried") {
    return (
      <div style={{ position: "relative", filter: "saturate(0.6) brightness(0.92)" }}>
        <Flower flower={flowerKey} size={60} theme={theme} animate={false} />
      </div>
    );
  }
  return null;
}

// ── Share Card (IG square) ───────────────────────────────────────

function ShareScreen({ theme, flowerKey, onBack }) {
  const f = FLOWERS[flowerKey];
  const [copied, setCopied] = useState2(false);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      {theme.stars && <StarField count={Math.floor(theme.starDensity * 0.5)} color={theme.starColor} w={400} h={800} seed={23} />}

      <Header theme={theme} onBack={onBack} />

      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 14, position: "relative", zIndex: 2 }}>
        <div>
          <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, letterSpacing: 1.5, textTransform: "uppercase" }}>
            Share · แชร์
          </div>
          <div style={{ fontFamily: theme.titleFont, fontSize: 24, fontWeight: theme.titleWeight, color: theme.ink, marginTop: 4, letterSpacing: -0.3 }}>
            Make it shareable
          </div>
          <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, marginTop: 2 }}>
            เก็บลง IG ส่งให้เพื่อน
          </div>
        </div>

        {/* The actual square card */}
        <div style={{
          aspectRatio: "1 / 1",
          width: "100%",
          borderRadius: theme.radius,
          overflow: "hidden",
          position: "relative",
          background: `linear-gradient(140deg, ${f.hex} 0%, ${f.petal}66 100%)`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}>
          {/* Decoration */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 70% 30%, ${theme.accent}44, transparent 50%)` }} />
          {theme.stars && <StarField count={12} color={theme.accent} w={300} h={300} seed={29} />}

          {/* Watermark + date */}
          <div style={{ position: "absolute", top: 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: theme.titleFont, fontSize: 13, color: "#1a1a2e", letterSpacing: 2, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: 3, background: f.center }} />
              MS<span style={{ color: f.center }}>.</span>H
            </div>
            <div style={{ fontFamily: theme.bodyFont, fontSize: 9.5, color: "#1a1a2e99", letterSpacing: 1 }}>
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()}
            </div>
          </div>

          {/* Center flower */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Flower flower={flowerKey} size={150} theme={theme} animate={false} />
            <div style={{ marginTop: 4, textAlign: "center", padding: "0 20px" }}>
              <div style={{ fontFamily: theme.bodyFont, fontSize: 9, color: "#1a1a2eaa", letterSpacing: 2, textTransform: "uppercase" }}>
                I am a
              </div>
              <div style={{ fontFamily: theme.titleFont, fontSize: 36, fontWeight: theme.titleWeight, color: "#1a1a2e", lineHeight: 1, marginTop: 2, letterSpacing: -0.5 }}>
                {f.en}
              </div>
              <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: "#1a1a2ecc", marginTop: 2 }}>
                {f.th} · {f.tagline_th}
              </div>
            </div>
          </div>

          {/* Bottom quote */}
          <div style={{ position: "absolute", bottom: 16, left: 18, right: 18, textAlign: "center" }}>
            <div style={{ fontFamily: theme.titleFont, fontSize: 12, fontStyle: "italic", color: "#1a1a2ecc", lineHeight: 1.3 }}>
              "{f.fortune_en}"
            </div>
          </div>
        </div>

        {/* AR row */}
        <div style={{
          padding: "12px 14px", background: theme.card,
          border: `1px solid ${theme.line}`, borderRadius: theme.radius * 0.7,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 19, background: `${theme.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>◉</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: theme.bodyFont, fontSize: 13, fontWeight: 500, color: theme.ink }}>Try the AR filter</div>
            <div style={{ fontFamily: theme.thaiFont, fontSize: 11.5, color: theme.inkSoft }}>ฟิลเตอร์ AR ดอก{f.th} ใส่กล้องได้</div>
          </div>
          <div style={{ color: theme.accent, fontSize: 18 }}>›</div>
        </div>
      </div>

      <div style={{ padding: "8px 24px 40px", display: "flex", gap: 10, position: "relative", zIndex: 2 }}>
        <GhostBtn theme={theme} onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }} style={{ flex: 1 }}>
          {copied ? "Copied ✓" : "Copy link"}
        </GhostBtn>
        <PrimaryBtn theme={theme} onClick={onBack} style={{ flex: 1.4 }}>
          Save image · เซฟรูป
        </PrimaryBtn>
      </div>
    </div>
  );
}

// ── Checkout · contact-based order completion ────────────────────
// Florist takes orders via LINE, not a card-charging checkout.
// This screen summarises the order and routes to LINE / Instagram / map.

const MSH_CONTACT = {
  lineId: "@ms.h.florist",
  lineUrl: "https://line.me/R/ti/p/%40ms.h.florist",
  ig: "ms.h_flowerhouse",
  igUrl: "https://www.instagram.com/ms.h_flowerhouse/",
  city_en: "Bangkok",
  city_th: "กรุงเทพฯ",
};

function CheckoutScreen({ theme, flowerKey, order, onBack }) {
  const f = FLOWERS[flowerKey];
  const p = PRODUCTS[order?.product || "bouquet"];
  const isGift = !!order?.isGift;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      {theme.stars && <StarField count={Math.floor(theme.starDensity * 0.5)} color={theme.starColor} w={400} h={800} seed={31} />}

      <Header theme={theme} onBack={onBack} />

      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, letterSpacing: 1.5, textTransform: "uppercase" }}>
            Almost yours · ใกล้ได้แล้ว
          </div>
          <div style={{ fontFamily: theme.titleFont, fontSize: 26, fontWeight: theme.titleWeight, color: theme.ink, marginTop: 4, letterSpacing: -0.4, fontStyle: "italic" }}>
            Confirm on LINE
          </div>
          <div style={{ fontFamily: theme.thaiFont, fontSize: 14, color: theme.inkSoft, marginTop: 2 }}>
            ปิดยอดสั่งซื้อทาง LINE
          </div>
        </div>

        {/* Order summary */}
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.line}`,
          borderRadius: theme.radius,
          padding: "14px 16px",
          boxShadow: theme.cardShadow,
          marginBottom: 14,
        }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{
              width: 84, height: 84, borderRadius: theme.radius * 0.6, flexShrink: 0,
              background: `linear-gradient(160deg, ${f.hex}, ${f.petal}66)`,
              display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            }}>
              <Flower flower={flowerKey} size={68} theme={theme} animate={false} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: theme.inkMuted, letterSpacing: 1.5, textTransform: "uppercase" }}>
                Your order · รายการ
              </div>
              <div style={{ fontFamily: theme.titleFont, fontSize: 19, fontWeight: theme.titleWeight, color: theme.ink, fontStyle: "italic", lineHeight: 1.1, marginTop: 3 }}>
                {p.en} <span style={{ fontFamily: theme.bodyFont, fontStyle: "normal", fontSize: 13, color: theme.inkMuted }}>· {f.en}</span>
              </div>
              <div style={{ fontFamily: theme.thaiFont, fontSize: 12.5, color: theme.inkSoft, marginTop: 2 }}>
                {p.th} · ดอก{f.th}
              </div>
              <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, marginTop: 4 }}>
                {p.sub_en}
              </div>
            </div>
          </div>
          <div style={{ height: 1, background: theme.line, margin: "12px 0" }} />
          <Row label_en="Subtotal" label_th="ราคา" value={`฿${p.price.toLocaleString()}`} theme={theme} />
          <Row label_en="Gift wrap + card" label_th="ห่อของขวัญ + การ์ด" value={isGift ? "Included" : "—"} muted={!isGift} theme={theme} />
          <Row label_en="Delivery (BKK)" label_th="จัดส่งในกรุงเทพฯ" value="Free" theme={theme} />
          <div style={{ height: 1, background: theme.line, margin: "10px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, textTransform: "uppercase", letterSpacing: 1 }}>Total · รวม</div>
            </div>
            <div style={{ fontFamily: theme.titleFont, fontSize: 24, color: theme.ink, fontWeight: 600 }}>
              ฿{p.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div style={{
          padding: "12px 14px",
          background: `${theme.accent2 || theme.accent}10`,
          border: `1px dashed ${theme.accent2 || theme.accent}55`,
          borderRadius: theme.radius * 0.6,
          marginBottom: 16,
        }}>
          <div style={{ fontFamily: theme.bodyFont, fontSize: 11, color: theme.inkMuted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>
            How to order · ขั้นตอน
          </div>
          <div style={{ fontFamily: theme.titleFont, fontSize: 14, color: theme.ink, fontStyle: "italic", marginTop: 6, lineHeight: 1.45 }}>
            Tap "Order on LINE" — we'll confirm the bouquet, schedule delivery, and send a QR for payment.
          </div>
          <div style={{ fontFamily: theme.thaiFont, fontSize: 12.5, color: theme.inkSoft, marginTop: 4, lineHeight: 1.55 }}>
            กดปุ่ม "สั่งซื้อทาง LINE" — เราจะคอนเฟิร์มช่อ นัดเวลาส่ง และส่ง QR ให้โอนเงินค่ะ
          </div>
        </div>

        {/* From our shop · IG */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: theme.inkMuted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>
                From our shop · จากร้าน
              </div>
              <div style={{ fontFamily: theme.thaiFont, fontSize: 11, color: theme.inkMuted, marginTop: 2 }}>
                @{MSH_CONTACT.ig}
              </div>
            </div>
            <a href={MSH_CONTACT.igUrl} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: theme.bodyFont, fontSize: 11, color: theme.accent2 || theme.accent, fontWeight: 600, textDecoration: "none",
            }}>
              See all →
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {[flowerKey, ...FLOWER_KEYS.filter((k) => k !== flowerKey).slice(0, 3)].map((k) => {
              const ff = FLOWERS[k];
              return (
                <a key={k} href={MSH_CONTACT.igUrl} target="_blank" rel="noopener noreferrer" style={{
                  aspectRatio: "1 / 1",
                  background: `linear-gradient(160deg, ${ff.hex}, ${ff.petal}66)`,
                  borderRadius: theme.radius * 0.5,
                  border: `1px solid ${theme.line}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden", textDecoration: "none",
                }}>
                  <Flower flower={k} size={56} theme={theme} animate={false} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact card */}
        <div style={{
          padding: "12px 14px",
          background: theme.card,
          border: `1px solid ${theme.line}`,
          borderRadius: theme.radius * 0.6,
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <ContactRow theme={theme} icon="📍" en={`${MSH_CONTACT.city_en} · pickup or delivery`} th={`${MSH_CONTACT.city_th} · มารับเองหรือส่งถึงที่`} />
          <div style={{ height: 1, background: theme.line }} />
          <ContactRow theme={theme} icon="💌" en={`LINE ${MSH_CONTACT.lineId}`} th="แอดไลน์มาสั่งได้เลย" link={MSH_CONTACT.lineUrl} />
          <div style={{ height: 1, background: theme.line }} />
          <ContactRow theme={theme} icon="📷" en={`Instagram @${MSH_CONTACT.ig}`} th="ดูช่อจริงจาก IG" link={MSH_CONTACT.igUrl} />
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ padding: "12px 24px 40px", display: "flex", flexDirection: "column", gap: 8, background: `linear-gradient(to top, ${theme.bg} 80%, ${theme.bg}00)`, position: "relative", zIndex: 2 }}>
        <a href={MSH_CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          width: "100%", padding: "16px 24px",
          borderRadius: theme.pillRadius,
          background: "#06C755",
          color: "#fff", textDecoration: "none",
          fontFamily: theme.bodyFont, fontSize: 14, fontWeight: 600, letterSpacing: 0.3,
          boxShadow: theme.cardShadow,
        }}>
          <LineIcon size={18} />
          Order on LINE · สั่งทาง LINE
        </a>
        <a href={MSH_CONTACT.igUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          width: "100%", padding: "12px 22px",
          borderRadius: theme.pillRadius,
          background: "transparent",
          color: theme.ink, textDecoration: "none",
          border: `1px solid ${theme.line}`,
          fontFamily: theme.bodyFont, fontSize: 13, fontWeight: 500,
        }}>
          DM us on Instagram · ทักทาง IG
        </a>
      </div>
    </div>
  );
}

function Row({ label_en, label_th, value, muted, theme }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 6 }}>
      <div>
        <div style={{ fontFamily: theme.bodyFont, fontSize: 12.5, color: theme.inkSoft }}>{label_en}</div>
        <div style={{ fontFamily: theme.thaiFont, fontSize: 11, color: theme.inkMuted }}>{label_th}</div>
      </div>
      <div style={{ fontFamily: theme.bodyFont, fontSize: 13, color: muted ? theme.inkMuted : theme.ink, fontWeight: muted ? 400 : 500 }}>
        {value}
      </div>
    </div>
  );
}

function ContactRow({ theme, icon, en, th, link }) {
  const body = (
    <>
      <div style={{ fontSize: 18, width: 26, textAlign: "center", flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: theme.bodyFont, fontSize: 13, color: theme.ink, fontWeight: 500 }}>{en}</div>
        <div style={{ fontFamily: theme.thaiFont, fontSize: 11.5, color: theme.inkSoft }}>{th}</div>
      </div>
      {link && <div style={{ color: theme.accent2 || theme.accent, fontSize: 16 }}>›</div>}
    </>
  );
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" style={{
        display: "flex", alignItems: "center", gap: 4,
        padding: "4px 0", textDecoration: "none", color: "inherit",
      }}>
        {body}
      </a>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 0" }}>
      {body}
    </div>
  );
}

function LineIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d="M19.365 9.863a.629.629 0 110 1.257h-1.755v1.126h1.755a.629.629 0 110 1.257h-2.384a.628.628 0 01-.628-.628V8.108c0-.346.282-.629.628-.629h2.384a.629.629 0 110 1.258h-1.755v1.126h1.755zm-3.855 3.012a.629.629 0 01-1.131.379l-2.443-3.328v3.077a.629.629 0 01-1.257 0V8.108a.628.628 0 01.628-.629c.196 0 .379.097.494.244l2.452 3.339V8.108a.629.629 0 011.257 0v4.767zm-5.741 0a.629.629 0 11-1.258 0V8.108a.629.629 0 111.258 0v4.767zm-2.512 0a.628.628 0 01-.628.628H4.245a.628.628 0 01-.628-.628V8.108a.629.629 0 111.257 0v4.139h1.755a.628.628 0 01.628.628zM24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.815 4.271 8.846 10.04 9.612.391.084.923.258 1.058.592.122.302.08.776.039 1.083l-.171 1.025c-.053.302-.241 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967C23.165 14.347 24 12.434 24 10.314"/>
    </svg>
  );
}

Object.assign(window, { LoreScreen, ShopScreen, ShareScreen, CheckoutScreen, Section, MSH_CONTACT });
