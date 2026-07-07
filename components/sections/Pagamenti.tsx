import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import { payment } from "@/data/pricing";
import { owner } from "@/data/site";

export default function Pagamenti() {
  return (
    <section id="pagamenti" className="section pt-0">
      <div className="shell">
        <Reveal>
          <GlassCard className="grid gap-10 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
            {/* Terms */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-teal/70" aria-hidden />
                <span className="label-mono">Pagamenti</span>
              </div>
              <h3 className="display-md mt-5 text-ink">
                Trasparente, senza checkout automatici
              </h3>

              <div className="mt-6 flex flex-wrap gap-2">
                {payment.methods.map((m) => (
                  <span
                    key={m}
                    className="rounded-pill border border-frost/60 bg-white/50 px-4 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft"
                  >
                    {m}
                  </span>
                ))}
              </div>

              <ul className="mt-7 flex flex-col gap-3 text-sm leading-relaxed text-ink-soft">
                <li>{payment.deposit}</li>
                <li>{payment.note}</li>
                <li>{payment.noCheckout}</li>
              </ul>
            </div>

            {/* Fiscal panel */}
            <div className="rounded-card border border-frost/50 bg-white/40 p-6">
              <p className="label-mono">Dati per il pagamento</p>
              <dl className="mt-5 flex flex-col gap-4 font-mono text-sm">
                <div className="flex flex-col gap-1">
                  <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-mute">
                    Intestatario
                  </dt>
                  <dd className="text-ink">{owner.name}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-mute">
                    Codice fiscale
                  </dt>
                  <dd className="text-ink-mute">{owner.codiceFiscale}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-mute">
                    IBAN
                  </dt>
                  <dd className="text-ink-mute">{owner.iban}</dd>
                </div>
              </dl>
              <p className="mt-6 border-t border-frost/40 pt-4 text-xs leading-relaxed text-ink-mute">
                Ricevuta di prestazione occasionale (attività non abituale, senza
                Partita IVA). I campi tra parentesi sono da completare.
              </p>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
