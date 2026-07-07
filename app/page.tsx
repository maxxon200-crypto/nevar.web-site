import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Servizi from "@/components/sections/Servizi";
import Prezzi from "@/components/sections/Prezzi";
import Metodo from "@/components/sections/Metodo";
import Contatto from "@/components/sections/Contatto";
import HashScroll from "@/components/providers/HashScroll";

export default function Home() {
  return (
    <main id="contenuto">
      <HashScroll />
      <Hero />
      <Manifesto />
      <Servizi />
      <Prezzi />
      <Metodo />
      <Contatto />
    </main>
  );
}
