# nevar.web - Design System

Sistema di design dello studio nevar.web. Bianco freddo dominante, blu-verde
(teal / aqua / cyan) come luce, riflesso e CTA, mai come campo pieno esteso.
Estetica di riferimento: Apple Liquid Glass, Neko Health, Kubota Future Cube,
Igloo Inc. Questo documento è la fonte di verità: riusalo su altri progetti.

> Regola d'oro: se il sito inizia a sembrare una "dark WebGL demo", è sbagliato.
> Si torna a paper dominante.

---

## 1. Colori (token)

I token vivono come CSS custom properties in `app/globals.css` (`:root`) e sono
esposti a Tailwind in `tailwind.config.ts`. Unica fonte di verità.

| Token          | Valore                     | Uso                                      |
| -------------- | -------------------------- | ---------------------------------------- |
| `--paper`      | `#F4F7F7`                  | Bianco freddo dominante, sfondo          |
| `--paper-pure` | `#FFFFFF`                  | Superfici pure, vetro                    |
| `--ink`        | `#0B1416`                  | Testo, quasi nero freddo                 |
| `--ink-soft`   | `#24343A`                  | Testo secondario                         |
| `--ink-mute`   | `#4D5D66`                  | Didascalie, metadati (AA sopra il wash)  |
| `--teal`       | `#009EC9`                  | Accento/luce/grafica (rif. Neko)         |
| `--teal-text`  | `#0E7391`                  | Teal per testo/link su paper (AA >= 4.5:1) |
| `--aqua`       | `#49C5B6`                  | Accento secondario (rif. Kubota)         |
| `--deep`       | `#2779A7`                  | Blu profondo, profondità e gradienti     |
| `--frost`      | `#B6BAC5`                  | Grigio-azzurro freddo, bordi/vetro (Igloo) |
| `--glass-tint` | `rgba(73,197,182,0.10)`    | Velo vetro                               |

Derivati per il vetro: `--glass-fill`, `--glass-border`, `--glass-specular`,
`--hairline`, `--shadow-cold`.

Ombre: solo morbide e fredde (blu, mai nero duro). Vedi `boxShadow` in Tailwind
(`glass`, `glass-sm`, `lift`, `cta`).

---

## 2. Tipografia

Self-host completo con `next/font/local` (`app/fonts.ts`). Nessun Google Fonts
CDN a runtime. File subsettati a Latin + glifi italiani, formato woff2
(~99 KB totali). Sorgenti e licenze OFL in `app/fonts/licenses/`.

| Ruolo   | Font                      | Variabile CSS      | Note                                    |
| ------- | ------------------------- | ------------------ | --------------------------------------- |
| Display | **Anybody** (variabile)   | `--font-display`   | Wide/technical, usato espanso (wdth 116-130) |
| Body    | **Space Grotesk** (var.)  | `--font-body`      | Peso 300-700                            |
| Mono    | **Space Mono** (400/700)  | `--font-mono`      | Label, numeri, prezzi, coordinate       |

Regole:

- Mai Inter, Helvetica o neo-grotesque generico.
- Il display wide (Anybody) non si usa mai per il corpo del testo.
- Il mono si usa per la microcopy "da pannello di controllo": coordinate,
  timestamp, versioni, prezzi.

### Font a pagamento sostituiti (TODO)

- **Display**: la prima scelta del brief era **Monument Extended** o
  **Right Grotesk Wide** (a pagamento). In assenza di licenza è stato usato il
  fallback gratuito **Anybody** (OFL, con asse di larghezza reale wdth 50-150),
  che rende bene l'estetica wide/strumentazione. **Per sostituirlo**: metti il
  woff2 del font a pagamento in `app/fonts/`, aggiorna il solo `display` in
  `app/fonts.ts`. Nessun'altra modifica necessaria.
- Space Mono e Space Grotesk erano già gratuiti e sono usati come da brief.

### Scala tipografica (classi in `globals.css`)

`display-hero` (wordmark/hero), `display-xl` (titoli sezione), `display-lg`,
`display-md`, `label-mono` (eyebrow), `price-mono` (numeri tabulari).
Le classi display impostano sempre `wght` + `wdth` insieme, così la larghezza
non torna mai a "normal".

---

## 3. Spazio, forme, vetro

- Griglia generosa, molto whitespace, ritmo editoriale svizzero.
- Container: `.shell` (max 1240px, gutter fluido). Sezioni: `.section`.
- Radii: card 24-28px (`rounded-card`, `rounded-card-lg`), pillole 999px.
- Vetro (`.glass`): `backdrop-filter: blur(20px) saturate(140%)`, bordo 1px
  frost a bassa opacità, highlight interno superiore (specular) per il Liquid
  Glass. Variante `.glass-tint` con velo aqua.
- Bottoni: `.btn-primary` (gradiente teal->deep, solo come azione/luce),
  `.btn-ghost` (vetro).

---

## 4. Hero - vetro liquido (WebGL)

- `components/hero/GlassOrb.tsx`: React Three Fiber. `IcosahedronGeometry` ad
  alto dettaglio (detail 6, letto come sfera liscia) + `MeshTransmissionMaterial`
  (drei): transmission 1, roughness 0.05, ior 1.45, chromaticAberration 0.06,
  distortion leggera. Ambiente freddo costruito con `Lightformer` (bianco +
  teal + cyan), niente HDRI esterno. Il refraction background è un gradiente
  radiale bianco->aqua->teal, visibile solo dentro il vetro (la pagina resta
  paper).
- `components/hero/GlassStage.tsx`: monta il canvas solo in viewport
  (IntersectionObserver), solo su device capace (WebGL, non reduced-motion, non
  low-end/mobile), attivazione differita in idle per non toccare l'LCP. DPR
  cap `[1,2]`.
- Fallback: `components/hero/HeroPoster.tsx`, poster SVG statico (bianco freddo
  + orb teal), usato su mobile/low-end/reduced-motion e come stato di
  caricamento. Su device capaci ma di default a poster, un pulsante "Attiva
  effetto vetro" abilita il WebGL su interazione.

Se l'effetto vetro fa scendere Lighthouse mobile sotto 85, il default resta il
poster statico.

---

## 5. Motion

- Smooth scroll: **Lenis** integrato con il ticker **GSAP** (`SmoothScroll.tsx`).
  Disattivato del tutto con `prefers-reduced-motion`.
- Reveal on scroll: `components/ui/Reveal.tsx`. La transizione è in CSS
  (`.reveal` / `.is-in`); il trigger è un IntersectionObserver (robusto,
  indipendente dalla libreria di scroll, con failsafe che rivela comunque il
  contenuto). Lo stato nascosto si applica solo con JS attivo (`html.js`),
  quindi senza JS tutto è visibile.
- Micro-interazioni UI: **Framer Motion** (menu mobile, `Magnetic` per la CTA,
  banner cookie). Reduced motion rispettato ovunque.

Easing condiviso: `cubic-bezier(0.22, 1, 0.36, 1)` (CSS e JS, `lib/motion.ts`).

---

## 6. Struttura

```
app/
  layout.tsx          root: metadata, font, JSON-LD, header/footer, providers
  page.tsx            home one-page (Hero, Manifesto, Servizi, Prezzi,
                      Pagamenti, Metodo, Contatto)
  privacy/            Privacy Policy (GDPR)
  cookie-policy/      Cookie Policy
  api/contact/        API route -> email (Resend) con fallback mailto
  opengraph-image.tsx OG dinamico (Space Mono)
  sitemap.ts robots.ts manifest.ts icon.svg
components/           hero, sections, layout, ui, cookie, legal, seo, providers
data/                 site, services, pricing, method (contenuti tipizzati)
lib/                  motion, consent, hook media query
public/logo.svg       slot logo (vedi sotto)
```

---

## 7. Logo

Il logo in-site è il wordmark testuale `components/ui/Logo.tsx` (nevar in ink,
`.web` in teal, font display). È già pronto e non richiede file esterni.

Slot grafico: `public/logo.svg`. Sostituiscilo con la tua versione Canva
(blu-verde + bianco) per usarla in OG ed embed. Per usarla anche nell'header,
sostituisci `<Logo />` con `<img src="/logo.svg" alt="nevar.web" />`
(una riga). L'attuale wordmark testuale resta come fallback.

---

## 8. Accessibilità e SEO

- `lang="it"`, metadata Next completi, Open Graph, Twitter card, favicon.
- JSON-LD `ProfessionalService` (`components/seo/JsonLd.tsx`).
- Skip link, focus visibili, contrasto AA, navigazione da tastiera, `alt`
  sensati, `prefers-reduced-motion` rispettato.
- `sitemap.xml`, `robots.txt` generati.

---

## 9. Regole non negoziabili (checklist)

1. Mai Inter / Helvetica / neo-grotesque generico.
2. Zero em dash in tutti i testi (virgole, due punti, parentesi).
3. Niente look template/AI: niente gradienti viola SaaS, niente blob casuali,
   niente emoji nei titoli, niente stock look.
4. Bianco freddo dominante, blu-verde come luce/accento.
5. Performance prima di tutto: sotto Lighthouse mobile 85, degrada al poster.
6. Contenuti in italiano, tono sicuro ed essenziale.

---

## 10. Placeholder da completare (prima del deploy)

Cerca questi valori e completali:

- `data/site.ts`
  - `owner.codiceFiscale` -> `[CODICE FISCALE]`
  - `owner.iban` -> `[IBAN]`
  - `owner.address` -> `[INDIRIZZO - opzionale]` (opzionale)
  - `site.url` -> dominio di produzione reale (ora `https://nevar.web`)
  - `owner.name` è precompilato con **Rocco Maruotti** (dal brief): conferma.
- Privacy Policy: usa i valori sopra; conferma titolare e indirizzo.
- Email invio form: imposta le env `RESEND_API_KEY` e `CONTACT_FROM` su Vercel
  per l'invio reale. Senza queste, il form usa automaticamente il fallback
  `mailto:` verso `nevar.web@gmail.com` (tutto funziona lo stesso).
- `public/logo.svg`: sostituisci con la versione grafica definitiva.

---

## 11. Font a pagamento eventualmente sostituiti (riassunto)

| Ruolo   | Prima scelta (a pagamento)        | Usato (gratuito, OFL) |
| ------- | --------------------------------- | --------------------- |
| Display | Monument Extended / Right Grotesk Wide | **Anybody**      |
| Mono    | (gratuito già nel brief)          | Space Mono            |
| Body    | (gratuito già nel brief)          | Space Grotesk         |
