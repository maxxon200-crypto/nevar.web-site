/** Process steps shown as glass cards in the "Metodo" section. */

export type Step = {
  n: string;
  tag: string; // mono label
  title: string;
  body: string;
};

export const method: Step[] = [
  {
    n: "01",
    tag: "FASE 01",
    title: "Ascolto",
    body: "Partiamo dall'attività, non dal template. Capisco cosa vendi, a chi, e cosa deve succedere quando qualcuno arriva sul sito.",
  },
  {
    n: "02",
    tag: "FASE 02",
    title: "Design",
    body: "Disegno struttura, ritmo e identità visiva. Ti mostro direzioni concrete, non moodboard vaghe: vedi il sito prima che esista.",
  },
  {
    n: "03",
    tag: "FASE 03",
    title: "Sviluppo",
    body: "Costruisco a mano, con attenzione a velocità, accessibilità e dettaglio. Niente costruttori generici, solo codice pulito.",
  },
  {
    n: "04",
    tag: "FASE 04",
    title: "Lancio",
    body: "Pubblicazione, controlli finali, misurazione. E se vuoi, con Nevar Care il sito resta seguito nel tempo.",
  },
];
