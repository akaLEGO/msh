# Ms.H — Flower Match

Bilingual (TH + EN) flower-match prototype for Ms.H, a Bangkok florist concept.

Pure static site. Babel Standalone transforms the `.jsx` modules in the browser, so there's no build step. Open `index.html` directly or serve the directory with any static host.

## Structure

- `index.html` — entry. Loads React, ReactDOM, Babel Standalone, then the modules below.
- `data.jsx` — flower catalogue, quiz, paths, days, zodiac, products.
- `themes.jsx` — three visual themes (editorial / twilight / garden).
- `flowers.jsx` — watercolor SVG flower components.
- `ios-frame.jsx` — iOS 26 (Liquid Glass) device frame.
- `screens1.jsx`, `screens2.jsx`, `app.jsx` — screens + shell.

## Flow

Welcome → Paths → (Quiz · Birth month · Occasion) → Reveal → Lore → Shop / Share
