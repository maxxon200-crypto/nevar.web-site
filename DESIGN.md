# nevar.web - Design System (rebuild 2026)

Sistema di design dello studio nevar.web. Il sito vende siti web a studi di
architettura e interior design in Italia: struttura problem first, estetica
editoriale sobria, nessun prezzo pubblicato, un solo invito all'azione.
Questo documento è la fonte di verità.

> Regola d'oro: il sito deve sembrare stampato, non generato. Se inizia a
> sembrare un portfolio da creative developer, è sbagliato.

---

## 1. Colori (token)

I token vivono come CSS custom properties in `app/globals.css` (`:root`) e sono
esposti a Tailwind in `tailwind.config.ts`. Unica fonte di verità.

| Token     | Valore    | Uso                                        |
| --------- | --------- | ------------------------------------------ |
| `--paper` | `#F6F5F2` | Bianco caldo, base                         |
| `--mid`   | `#E4E8EB` | Grigio-azzurro medio (sfumatura)           |
| `--deep`  | `#CBD5DA` | Grigio-azzurro profondo (sfumatura)        |
| `--ink`   | `#16191C` | Testo, nero morbido, mai puro              |
| `--muted` | `#556069` | Testo secondario                           |
| `--slate` | `#4E6A78` | Unico accento                              |

Nessun altro colore. L'accento `--slate` compare solo in: parole in corsivo
dei titoli, filetti e puntini, sottolineature al passaggio del mouse, occhielli,
alone del bottone.

Filetti: 1px, sempre `rgba(22,25,28,.12)` (`--line`). Niente ombre dure.

---

## 2. Tipografia

Fetch a build-time e self-host automatico con `next/font/google`
(`app/fonts.ts`). Nessun CDN a runtime. Due famiglie, nient'altro:

| Ruolo   | Font                              | Variabile CSS  | Uso                                    |
| ------- | --------------------------------- | -------------- | -------------------------------------- |
| Display | **Instrument Serif** (400, n+i)   | `--font-serif` | Wordmark, h1/h2/h3, citazioni          |
| Testo   | **Manrope** (400/500/600/700)     | `--font-sans`  | Corpo, menu, etichette, form, bottoni  |

Il corsivo di Instrument Serif è riservato alla parola chiave del titolo,
colorata `--slate` (markup: `<em>` dentro un elemento `.title-*`).

Scala (classi in `globals.css`): `title-hero` (clamp 38-62px, lh 1.06),
`title-xl` (30-42px), `title-lg` (26-34px), `title-md` (22-26px), `quote`
(22-28px), `eyebrow` (Manrope 11px, maiuscolo, tracking .18em, slate).

Regole:

- Mai Inter, mai monospace, mai un terzo font.
- Il serif non si usa mai per il corpo del testo.
- Nessuna scritta sotto i 11px effettivi.

---

## 3. La superficie: sfumatura atmosferica + grana

Questa è l'identità visiva del sito.

- `.surface`: `linear-gradient(168deg, #F6F5F2 0%, #E4E8EB 52%, #CBD5DA 100%)`.
  Si usa su hero e fascia di contatto.
- `.grain::after`: rumore SVG inline (feTurbulence), `opacity .20`,
  `mix-blend-mode: multiply`. Applicata a tutte le sezioni principali; le
  sezioni intermedie sono `--paper` piatto con la sola grana.
- Il contenuto sta sopra la grana: `.grain > *` riceve
  `position: relative; z-index: 3`.
- La stessa grana compare dentro al bottone primario (`.btn-primary::before`,
  blend overlay).

Forme: angoli vivi ovunque (raggio 0), filetti 1px. Le uniche cose curve sono
i bottoni (pillole) e il cerchietto della freccia.

---

## 4. Componenti di azione

- `.btn-primary`: pillola scura (gradiente 145deg da #2E373E a #0B0E10),
  testo Manrope 700 14.5px, grana interna, cerchietto bianco `.circ` (40px)
  con freccia. In hover: la pillola sale di 2px, il cerchio ruota di -45 gradi
  e prende un alone `rgba(255,255,255,.14)`.
  Markup: `<a class="btn-primary"><span>Testo</span><span class="circ">→</span></a>`
- `.link-secondary`: Manrope 600 13.5px, sottolineatura 2px `--slate` che si
  disegna da sinistra in hover.
- Un solo bottone principale in tutto il sito, ripetuto: "Prenota una
  chiamata". Il submit del form usa lo stesso stile con testo "Invia
  richiesta". Nessun altro invito che compete.

---

## 5. Struttura della home (problem first)

```
Nav        wordmark serif + Lavori · Metodo · Contatto (nessun bottone)
Hero       surface+grain, H1 con keyword corsiva slate, sottotitolo, CTA + link
Problema   3 colonne con filetti verticali: Lento / Fermo / Invisibile
Cosa faccio  H2 + elenco a righe con filetti orizzontali
Lavori     3 casi (Studio Costa, Studio Solito, Zarcola), screenshot 16/10 +
           problema + risultato (bordo sinistro slate). Risultati = TODO reali.
Metodo     Portata del lavoro: Essenziale / Studio / Su misura, SOLO tempi
Testimonianza  citazione serif (TODO reale)
Contatto   surface+grain, due colonne: pitch + email | form
Footer     filetto sopra, riga piccola muted
```

Nessuna cifra in euro visibile sul sito. Le fasce del menu budget nel form
servono a qualificare, non a pubblicare prezzi.

---

## 6. Movimento

- Smooth scroll: **Lenis** integrato col ticker **GSAP** (`SmoothScroll.tsx`).
- Una sola animazione: comparsa in dissolvenza con leggera risalita allo
  scroll (`components/ui/Reveal.tsx`, GSAP + ScrollTrigger).
- REGOLA CRITICA: mai `opacity: 0` come stile di base. Il contenuto è visibile
  per impostazione predefinita; è il JavaScript (gsap.from) ad aggiungere
  l'effetto. Senza JS la pagina resta leggibile.
- `prefers-reduced-motion`: nessuna animazione e nessuna transizione, ovunque
  (media query globale + guardie JS in Reveal e SmoothScroll).

---

## 7. Struttura del repo

```
app/
  layout.tsx          root: metadata, font, JSON-LD, header/footer, provider
  page.tsx            home (Hero, Problema, CosaFaccio, Lavori, Metodo,
                      Testimonianza, Contatto)
  privacy/            Privacy Policy (GDPR)
  cookie-policy/      Cookie Policy
  api/contact/        API route -> email (Resend) con fallback mailto
  sitemap.ts robots.ts manifest.ts icon.svg
components/           sections, layout, ui, cookie, legal, seo, providers
data/                 site (config), content (copy della home)
lib/                  consent, lenis (handle condiviso)
```

---

## 8. Accessibilità, prestazioni e SEO

- `lang="it"`, un solo `<h1>`, contrasto AA (muted 5.9:1, slate 5.3:1 su
  paper), focus visibili slate, skip link, form navigabile da tastiera.
- Niente WebGL, niente framer-motion: obiettivo Lighthouse mobile >= 90.
  La velocità è un argomento di vendita.
- Metadata: titolo "nevar.web · Siti web per studi di architettura e interior
  design | Milano". JSON-LD `ProfessionalService` senza prezzi.

---

## 9. Regole non negoziabili (checklist)

1. Nessuna cifra in euro visibile sul sito (tranne le fasce budget nel form).
2. Zero em dash in tutti i testi (virgole, due punti, parentesi).
3. Solo due font: Instrument Serif e Manrope.
4. Un solo accento: `--slate #4E6A78`. Niente ciano, niente teal.
5. Nessun effetto vetro, nessun 3D, nessuna ombra dura.
6. Mai inventare risultati, numeri o testimonianze: segnaposto con TODO.
7. Mai `opacity: 0` come stile base.
8. Un solo invito all'azione: "Prenota una chiamata".

---

## 10. TODO prima del lancio

- Risultati reali dei tre casi studio (`data/content.ts`, campo `result`).
- Testimonianza reale (`components/sections/Testimonianza.tsx`).
- Screenshot reali dei lavori (segnaposto 16/10 in `Lavori.tsx`).
- Social card (OG image): rimossa quella vecchia (brand teal). Da rifare con
  la nuova identità quando ci sono gli screenshot.
- `data/site.ts` -> `url`: dominio di produzione reale.
- Env `RESEND_API_KEY` e `CONTACT_FROM` su Vercel per l'invio reale del form
  (senza, il form usa il fallback `mailto:`).
