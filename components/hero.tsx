import { SharkMark } from "@/components/shark-mark";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="promessa">
      <div className="hero-copy">
        <SharkMark animate className="hero-mark" />
        <h1 id="promessa">O lead da sua garagem, do oi até a chave.</h1>
        <p className="lede">
          Shark é o sistema para quem vende seminovo no Brasil. Pátio, WhatsApp, troca,
          financiamento e documento no mesmo fio — para você ver o que está vendendo e o
          que está parado.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#lista">
            Quero na minha garagem
          </a>
          <a className="btn btn-ghost" href="#ciclo">
            Ver o ciclo
          </a>
        </div>
        <p className="cut">
          Feito para garagem pequena e loja de seminovos. Concessionária de zero-quilômetro
          fica fora.
        </p>
      </div>
      <article className="example-card">
        <div className="example-top">
          <span className="pill">exemplo</span>
          <span className="days">18 dias no pátio</span>
        </div>
        <p className="example-title">Chevrolet Onix 1.0 2020/2021</p>
        <p className="muted">Prata · 68.000 km · próprio</p>
        <p className="price">R$ 62.900</p>
        <p className="delta">R$ 1.300 abaixo da FIPE informada</p>
        <p className="fine">FIPE informada R$ 64.200 · consulta em 2 de novembro de 2026</p>
        <p className="lead-line">Mariana · OLX · WhatsApp · tem troca</p>
        <p className="fine">Garagem exemplo em Campinas</p>
      </article>
    </section>
  );
}
