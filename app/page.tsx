import { Cycle } from "@/components/cycle";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import {
  AudienceSection,
  DaySection,
  HouseSection,
  MorningSection,
  ObjectionsSection,
  PatioSection,
  QuestionsSection,
  TradeSection,
} from "@/components/story";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (
    <>
      <div className="shell" id="topo">
        <SiteHeader />
        <main>
          <Hero />
          <DaySection />
          <Cycle />
          <PatioSection />
          <MorningSection />
          <TradeSection />
          <HouseSection />
          <AudienceSection />
          <ObjectionsSection />
          <section className="section" id="lista" aria-labelledby="titulo-lista">
            <h2 id="titulo-lista">Entrar na lista.</h2>
            <p className="lede lede-tight">A conversa vem antes da conta. Sem pagamento nesta página.</p>
            <WaitlistForm />
          </section>
          <QuestionsSection />
        </main>
        <footer className="foot">
          <p className="brand-word">Shark</p>
          <p>O lead da sua garagem, do oi até a chave.</p>
          <p>Feito para garagens de seminovos no Brasil</p>
          <p>2026</p>
        </footer>
      </div>
    </>
  );
}
