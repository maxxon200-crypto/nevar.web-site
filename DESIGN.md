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

Self-host automatico, nessun CDN a runtime (`app/fonts.ts`). Archivo via
`next/font/google`, Geist via il pacchetto ufficiale `geist` (già self-hosted).
Due famiglie, nessun monospace:

| Ruolo         | Font                        | Variabile CSS       | Impostazione                                  |
| ------------- | --------------------------- | ------------------- | --------------------------------------------- |
| Display/Prezzi | **Archivo** (variabile)    | `--font-archivo`    | Expanded: `wght` 800, `font-variation-settings: "wdth" 125` |
| Testo/UI      | **Geist** (variabile)       | `--font-geist-sans` | Corpo `wght` 400, menu ed etichette `wght` 500 |

Archivo è usato per i titoloni e per i prezzi: caricato con l'asse di larghezza
(`axes: ['wdth']`), la larghezza Expanded è forzata via CSS sugli elementi
display e sui prezzi così l'asse non torna mai a "normal". Il corpo,
l'interfaccia, i link di navigazione e le etichette usano **Geist** (corpo 400,
etichette 500).

Regole:

- Mai Inter, Helvetica o neo-grotesque generico.
- Il display Expanded (Archivo wdth 125 / 800) non si usa mai per il corpo del
  testo; oltre ai titoli lo condividono solo i prezzi.
- Il testo di corpo, UI e navigazione è Geist; i titoloni e i prezzi restano
  Archivo.
- Le etichette "da pannello di controllo" (eyebrow, codici, coordinate, campi
  del form, badge, testo dei bottoni) sono in Geist peso 500, maiuscolo e
  spaziato. Nessun monospace.
- Nessuna scritta sotto i 12px effettivi (`.label-mono` parte da 13px).

### Come cambiare font

Tutto passa da `app/fonts.ts` + le tre variabili CSS. Per sostituire il display
con un font a pagamento (es. Monument Extended), importalo e rimappa
`--font-archivo` sugli elementi display in `app/globals.css`; il resto resta
invariato. Il social card (`app/opengraph-image.tsx`) usa ancora file TTF locali
(vedi TODO in fondo).

### Scala tipografica (classi in `globals.css`)

`display-hero` (wordmark/hero), `display-xl` (titoli sezione), `display-lg`,
`display-md`, `label-mono` (eyebrow/etichette in Geist 500), `price-mono`
(prezzi in Archivo Expanded, `wdth` 125, cifre tabulari).
Le classi display e i prezzi impostano sempre `wght` + `wdth` insieme, così la
larghezza non torna mai a "normal".

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

- `components/hero/GlassOrb.tsx`: React Three Fiber. `IcosahedronGeometry`
  (detail 6, letto come sfera liscia) + `MeshTransmissionMaterial` (drei):
  transmission 1, roughness 0.05, ior 1.42, chromaticAberration 0.045,
  distortion + temporalDistortion leggere per il vetro vivo. Il refraction
  background è un gradiente radiale bianco->aqua->teal renderizzato da drei nel
  buffer di rifrazione (senza `transmissionSampler`, altrimenti il gradiente non
  viene mai campionato e la sfera resta grigia). Ambiente freddo costruito con
  `Lightformer` (bianco + teal + cyan), niente HDRI esterno (rete ristretta).
  Animazione in `useFrame`: rotazione lenta Y/X, bob verticale (`Float`),
  parallasse col mouse in lerp.
- `components/hero/GlassStage.tsx`: primo mount solo quando entra in viewport
  (IntersectionObserver) e solo su device capace (WebGL, non reduced-motion, non
  mobile, non low-end = poche core E poca RAM); attivazione differita in idle per
  non toccare l'LCP. Una volta montato il canvas resta montato e mette in pausa
  il frame loop fuori vista (`frameloop`), per non ricompilare il materiale a
  ogni scroll. DPR cap `[1,2]`.
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
  page.tsx            home one-page (Hero, Servizi, Prezzi, Metodo, Contatto)
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
  - `owner.address` -> `[INDIRIZZO - opzionale]` (opzionale, solo Privacy)
  - `site.url` -> dominio di produzione reale (ora `https://nevar.web`)
  - `owner.name` è precompilato con **Rocco Maruotti** (dal brief): conferma.
- I dati di pagamento (IBAN, codice fiscale, metodi) non sono più esposti sul
  sito pubblico: si concordano via email dopo il preventivo.
- Privacy Policy: usa i valori sopra; conferma titolare e indirizzo.
- Email invio form: imposta le env `RESEND_API_KEY` e `CONTACT_FROM` su Vercel
  per l'invio reale. Senza queste, il form usa automaticamente il fallback
  `mailto:` verso `nevar.web@gmail.com` (tutto funziona lo stesso).
- `public/logo.svg`: sostituisci con la versione grafica definitiva.

---

## 11. Font (riassunto)

| Ruolo          | Font        | Note                                   |
| -------------- | ----------- | -------------------------------------- |
| Display/Prezzi | **Archivo** | Expanded, `wght` 800, `wdth` 125       |
| Testo/UI       | **Geist**   | corpo 400, menu ed etichette 500       |

TODO: il social card `app/opengraph-image.tsx` renderizza ancora con file TTF
locali di Space Mono (Satori non supporta gli assi variabili). Facoltativo:
allinearlo ad Archivo / Geist instanziando dei TTF statici.
