import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";
import CookiePrefsButton from "@/components/cookie/CookiePrefsButton";
import EmailLink from "@/components/ui/EmailLink";
import { site, lastUpdated } from "@/data/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa sui cookie di nevar.web: solo cookie tecnici necessari, nessuna profilazione.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalShell
      title="Cookie Policy"
      updated={lastUpdated}
      intro="Quali cookie e strumenti simili usa questo sito, e come gestirli. In breve: solo tecnici, nessuna profilazione."
    >
      <h2>1. Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti salvano sul tuo
        dispositivo per farlo funzionare, ricordare le tue scelte o raccogliere
        statistiche. Esistono strumenti simili, come lo spazio di archiviazione
        locale del browser (local storage), che questo sito usa in modo
        limitato e solo per finalità tecniche.
      </p>

      <h2>2. Cookie tecnici (necessari)</h2>
      <p>
        Sono indispensabili per il corretto funzionamento del sito e, secondo le
        Linee guida del Garante, <strong>non richiedono il tuo consenso</strong>
        . Su questo sito riguardano:
      </p>
      <ul>
        <li>
          <strong>Memoria della scelta cookie</strong>: la tua preferenza viene
          salvata nel local storage del browser (chiave{" "}
          <span className="placeholder">nevar-consent-v1</span>) così da non
          mostrarti di nuovo il banner a ogni visita.
        </li>
        <li>
          <strong>Cookie tecnici del fornitore di hosting</strong>: la
          piattaforma di distribuzione (Vercel) può impostare cookie tecnici per
          bilanciamento del carico e sicurezza.
        </li>
      </ul>

      <h2>3. Cookie di statistica e profilazione</h2>
      <p>
        Al momento questo sito <strong>non utilizza</strong> cookie analitici,
        di statistica o di profilazione, né strumenti di terze parti come Google
        Analytics, pixel pubblicitari o social widget. Di conseguenza non viene
        richiesto alcun consenso per finalità di questo tipo, perché non
        esistono.
      </p>
      <p>
        Se in futuro dovessi introdurre strumenti di statistica o di terze
        parti, verranno attivati solo dopo il tuo consenso esplicito, prestato
        tramite il banner, e questa pagina sarà aggiornata di conseguenza.
      </p>

      <h2>4. Come gestire le preferenze</h2>
      <p>
        Puoi rivedere o modificare in qualsiasi momento la tua scelta tramite il
        pannello dedicato:
      </p>
      <p>
        <CookiePrefsButton className="btn-small" />
      </p>
      <p>
        Puoi inoltre gestire e cancellare i cookie tecnici direttamente dalle
        impostazioni del tuo browser. La disattivazione dei cookie tecnici
        potrebbe però compromettere alcune funzioni del sito.
      </p>

      <h2>5. Titolare e contatti</h2>
      <p>
        Il titolare del trattamento è indicato nella{" "}
        <a href="/privacy">Privacy Policy</a>. Per qualsiasi richiesta scrivi a{" "}
        <EmailLink>{site.email}</EmailLink>.
      </p>

      <h2>6. Aggiornamenti</h2>
      <p>
        Questa cookie policy può essere aggiornata nel tempo. La data in alto
        indica sempre la versione più recente.
      </p>
    </LegalShell>
  );
}
