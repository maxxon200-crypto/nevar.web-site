# nevar.web

Sito dello studio **nevar.web** - Milano. Siti web per studi di architettura e
interior design. Struttura problem first, estetica editoriale sobria (carta
calda, grigio-azzurri, grana di stampa), nessun prezzo pubblicato, un solo
invito all'azione: "Prenota una chiamata".

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** con design token custom (vedi `DESIGN.md`)
- **GSAP** + **Lenis** (una sola animazione di reveal e smooth scroll)
- **next/font/google** self-hosted a build time: Instrument Serif + Manrope
- Deploy: **Vercel**. Nessun backend: form via API route + fallback `mailto:`.

## Avvio

```bash
npm install
npm run dev      # http://localhost:3000
```

Build di produzione:

```bash
npm run build
npm run start
```

## Configurazione email del form (opzionale)

Il form di contatto invia a `nevar.web@gmail.com` tramite API route
(`app/api/contact/route.ts`). Per l'invio reale imposta su Vercel:

- `RESEND_API_KEY` - chiave API [Resend](https://resend.com)
- `CONTACT_FROM` - mittente verificato, es. `nevar.web <ciao@tuodominio.it>`

Senza queste variabili il form ricade automaticamente sul `mailto:`
precompilato: continua a funzionare, apre l'app email dell'utente.

## Documentazione

- `DESIGN.md` - design system, token, tipografia, regole non negoziabili e
  **TODO prima del lancio** (risultati dei casi studio, testimonianza,
  screenshot dei lavori).

## Deploy su Vercel

1. Importa il repository su Vercel (preset Next.js, zero config).
2. (Opzionale) imposta le env del form.
3. Aggiorna `site.url` in `data/site.ts` con il dominio di produzione.
