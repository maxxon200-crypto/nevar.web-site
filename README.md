# nevar.web

Sito personale dello studio **nevar.web** - Milano. Design e sviluppo di siti
web e app su misura. Estetica Liquid Glass: bianco freddo dominante, accenti
teal / aqua / cyan, hero in vetro liquido WebGL.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** con design token custom
- **React Three Fiber** + **@react-three/drei** (hero in vetro)
- **GSAP** + **Lenis** (smooth scroll e reveal), **Framer Motion** (micro-interazioni)
- **next/font/local** (font self-hosted, niente Google Fonts CDN)
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

- `DESIGN.md` - design system, token, tipografia, decisioni, **placeholder da
  completare** e font a pagamento sostituiti.

## Deploy su Vercel

1. Importa il repository su Vercel (preset Next.js, zero config).
2. (Opzionale) imposta le env del form.
3. Aggiorna `site.url` in `data/site.ts` con il dominio di produzione.
