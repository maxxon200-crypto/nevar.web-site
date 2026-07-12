import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";
import EmailLink from "@/components/ui/EmailLink";
import { owner, site, lastUpdated } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali di nevar.web, ai sensi del Regolamento UE 2016/679 (GDPR).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      updated={lastUpdated}
      intro="Come tratto i tuoi dati personali quando visiti questo sito o mi scrivi. In chiaro, senza legalese inutile, nel rispetto del Regolamento UE 2016/679 (GDPR)."
    >
      <h2>1. Titolare del trattamento</h2>
      <p>
        Il titolare del trattamento è <strong>{owner.name}</strong>, persona
        fisica che opera come studio con il nome {site.name}, senza Partita IVA
        (attività non abituale).
      </p>
      <ul>
        <li>
          Email: <EmailLink>{site.email}</EmailLink>
        </li>
        {!owner.address.startsWith("[") ? (
          <li>Indirizzo: {owner.address}</li>
        ) : null}
      </ul>
      <p>
        Per qualsiasi domanda sulla privacy o per esercitare i tuoi diritti puoi
        scrivere all'indirizzo email qui sopra.
      </p>

      <h2>2. Quali dati raccolgo</h2>
      <h3>Dati che fornisci tu</h3>
      <p>
        Quando compili il form di contatto, o quando mi scrivi via email,
        raccolgo i dati che mi comunichi: nome, studio di appartenenza,
        indirizzo email, budget indicativo e il contenuto del messaggio.
      </p>
      <h3>Dati raccolti automaticamente</h3>
      <p>
        Come qualsiasi sito, durante la navigazione vengono trattati alcuni dati
        tecnici necessari al funzionamento e alla sicurezza: indirizzo IP, tipo
        di browser e dispositivo, data e ora della richiesta, pagine visitate.
        Questi dati sono generati dai sistemi del fornitore di hosting e servono
        a erogare il servizio, non a profilarti.
      </p>

      <h2>3. Perché tratto questi dati (finalità e base giuridica)</h2>
      <ul>
        <li>
          <strong>Rispondere alle tue richieste</strong> e fornirti un
          preventivo: base giuridica sono le misure precontrattuali richieste da
          te e il legittimo interesse a gestire i contatti (art. 6, par. 1,
          lett. b e f del GDPR).
        </li>
        <li>
          <strong>Garantire la sicurezza e il funzionamento del sito</strong>:
          legittimo interesse a mantenere il servizio protetto e integro (art.
          6, par. 1, lett. f).
        </li>
        <li>
          <strong>Adempiere a obblighi di legge</strong>, quando previsti (art.
          6, par. 1, lett. c).
        </li>
      </ul>
      <p>
        Il conferimento dei dati del form è libero, ma senza nome, email e
        messaggio non posso rispondere alla tua richiesta.
      </p>

      <h2>4. Come e con quali strumenti</h2>
      <p>
        Il trattamento avviene con strumenti informatici, adottando misure
        adeguate a proteggere i dati. Per erogare il servizio mi appoggio a
        fornitori affidabili:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> come fornitore di hosting e distribuzione
          del sito.
        </li>
        <li>
          <strong>Servizio di posta elettronica</strong> (Google e, se
          configurato, Resend Inc. come provider di invio email) per ricevere e
          gestire i messaggi del form.
        </li>
      </ul>
      <p>
        Questi soggetti trattano i dati per mio conto in qualità di responsabili
        del trattamento, oppure come titolari autonomi per le rispettive
        finalità tecniche.
      </p>

      <h2>5. Per quanto tempo conservo i dati</h2>
      <ul>
        <li>
          Dati dei messaggi di contatto: per il tempo necessario a gestire la
          richiesta e l'eventuale rapporto che ne deriva, e comunque non oltre
          24 mesi dall'ultimo contatto, salvo obblighi di legge diversi.
        </li>
        <li>
          Dati tecnici di navigazione e log: per il tempo tecnico necessario
          alla sicurezza, in genere pochi giorni o settimane a seconda del
          fornitore.
        </li>
      </ul>

      <h2>6. A chi comunico i dati</h2>
      <p>
        I tuoi dati non vengono diffusi né venduti. Possono essere trattati dai
        fornitori indicati al punto 4 (hosting e posta elettronica) e, se
        strettamente necessario, comunicati ad autorità competenti in presenza
        di obblighi di legge.
      </p>

      <h2>7. Trasferimenti fuori dall'Unione Europea</h2>
      <p>
        Alcuni fornitori (ad esempio Vercel, Google e, se configurato, Resend
        Inc.) possono trattare i dati anche su server situati fuori dall'Unione
        Europea, in particolare negli Stati Uniti. In questi casi il trasferimento avviene sulla base di
        garanzie adeguate previste dal GDPR, come le clausole contrattuali
        standard approvate dalla Commissione Europea o decisioni di adeguatezza
        applicabili.
      </p>

      <h2>8. I tuoi diritti</h2>
      <p>
        In qualsiasi momento, e gratuitamente, puoi esercitare i diritti
        previsti dagli articoli da 15 a 22 del GDPR:
      </p>
      <ul>
        <li>accesso ai tuoi dati e copia degli stessi;</li>
        <li>rettifica dei dati inesatti o incompleti;</li>
        <li>cancellazione dei dati (diritto all'oblio);</li>
        <li>limitazione del trattamento;</li>
        <li>opposizione al trattamento basato sul legittimo interesse;</li>
        <li>portabilità dei dati che hai fornito;</li>
        <li>
          revoca del consenso, dove il trattamento si basa su di esso, senza
          pregiudicare i trattamenti già effettuati.
        </li>
      </ul>
      <p>
        Per esercitarli scrivi a <EmailLink>{site.email}</EmailLink>.
        Ricevuta la richiesta, rispondo senza ingiustificato ritardo e comunque
        entro un mese.
      </p>

      <h2>9. Reclamo all'autorità di controllo</h2>
      <p>
        Se ritieni che il trattamento dei tuoi dati violi la normativa, hai il
        diritto di proporre reclamo al Garante per la protezione dei dati
        personali (
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">
          www.garanteprivacy.it
        </a>
        ) o all'autorità di controllo dello Stato in cui risiedi.
      </p>

      <h2>10. Cookie</h2>
      <p>
        Questo sito utilizza esclusivamente cookie tecnici necessari al
        funzionamento. Per i dettagli consulta la{" "}
        <a href="/cookie-policy">Cookie Policy</a>.
      </p>

      <h2>11. Modifiche a questa informativa</h2>
      <p>
        Posso aggiornare questa informativa nel tempo, ad esempio se cambiano i
        servizi o gli strumenti utilizzati. La data in alto indica sempre
        l'ultima versione. Ti invito a consultarla periodicamente.
      </p>
    </LegalShell>
  );
}
