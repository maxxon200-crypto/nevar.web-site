import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Servizi from "@/components/sections/Servizi";
import Prezzi from "@/components/sections/Prezzi";
import Pagamenti from "@/components/sections/Pagamenti";
import Metodo from "@/components/sections/Metodo";
import Contatto from "@/components/sections/Contatto";

export default function Home() {
  return (
    <main id="contenuto">
      <Hero />
      <Manifesto />
      <Servizi />
      <Prezzi />
      <Pagamenti />
      <Metodo />
      <Contatto />
    </main>
  );
}
