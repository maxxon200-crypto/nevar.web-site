import Hero from "@/components/sections/Hero";
import Problema from "@/components/sections/Problema";
import CosaFaccio from "@/components/sections/CosaFaccio";
import Lavori from "@/components/sections/Lavori";
import Metodo from "@/components/sections/Metodo";
import Testimonianza from "@/components/sections/Testimonianza";
import Contatto from "@/components/sections/Contatto";
import HashScroll from "@/components/providers/HashScroll";

export default function Home() {
  return (
    <main id="contenuto">
      <HashScroll />
      <Hero />
      <Problema />
      <CosaFaccio />
      <Lavori />
      <Metodo />
      <Testimonianza />
      <Contatto />
    </main>
  );
}
