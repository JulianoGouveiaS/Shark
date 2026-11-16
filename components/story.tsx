import { Morning } from "@/components/morning";
import { Reveal } from "@/components/reveal";

const OBJECOES = [
  {
    titulo: "Meu vendedor não preenche sistema.",
    resposta:
      "O oi entra com telefone e origem, em uma tela. Se ninguém registra a resposta, o lead aparece mudo para o dono.",
  },
  {
    titulo: "Já uso planilha e o grupo.",
    resposta:
      "Os dois não dizem quem respondeu, nem quando a avaliação da troca venceu, nem se o carro ainda está no pátio.",
  },
  {
    titulo: "WhatsApp já é meu CRM.",
    resposta:
      "A conversa continua no WhatsApp. O Shark guarda o próximo passo e devolve o texto pronto. API oficial não é desta primeira versão.",
  },
  {
    titulo: "E a FIPE?",
    resposta:
      "Você lança o valor e o dia da consulta. A página mostra a diferença para o preço. Consulta automática fica para depois.",
  },
  {
    titulo: "Meu estoque é consignado.",
    resposta:
      "Próprio e consignado ficam separados. Comissão não entra na conta como se fosse margem de compra.",
  },
  {
    titulo: "Isso é coisa de empresa grande.",
    resposta:
      "Começa na garagem em que o dono ainda atende. A página não publica preço. Quem entra na lista conversa antes.",
  },
  {
    titulo: "E os dados do comprador?",
    resposta:
      "Cada loja vê os próprios dados. A lista desta página não abre conta e não mistura com o movimento da loja.",
  },
  {
    titulo: "Funciona no celular, no pátio?",
    resposta: "O uso do dia é no navegador do celular. App nativo fica para depois.",
  },
];

const PERGUNTAS = [
  {
    pergunta: "O que é o Shark?",
    resposta:
      "O sistema do fio do comprador na garagem de seminovos, com o pátio no mesmo lugar.",
  },
  {
    pergunta: "Substitui o WhatsApp?",
    resposta: "Não. O WhatsApp continua a conversa.",
  },
  {
    pergunta: "Emite nota fiscal?",
    resposta: "Não nesta versão.",
  },
  {
    pergunta: "Publica no Webmotors ou no OLX?",
    resposta: "Não nesta versão. O pátio fica organizado para a venda de hoje.",
  },
  {
    pergunta: "Tem aplicativo?",
    resposta: "O uso é no navegador do celular. App da loja fica para depois.",
  },
  {
    pergunta: "Quanto custa?",
    resposta: "Ainda não há preço nesta página. A lista é uma conversa.",
  },
  {
    pergunta: "Quando posso usar?",
    resposta:
      "Quando a sua garagem for chamada da lista. A página não simula um teste grátis que não existe.",
  },
];

export function DaySection() {
  return (
      <section className="section" aria-labelledby="titulo-dia">
        <h2 id="titulo-dia">O dia sem o Shark.</h2>
        <div className="cards-3">
          {[
            "O WhatsApp tem dezenas de conversas e o carro já vendido ainda está na boca da equipe.",
            "A troca foi avaliada de manhã. À tarde ninguém acha o valor.",
            "O financiamento está na mesa há dias, sem banco e sem status, e o comprador sumiu.",
          ].map((cena, indice) => (
            <Reveal key={cena} index={indice}>
              <article className="card scene">
                <p>{cena}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="cut-line">Planilha não escuta o WhatsApp. Grupo da loja não é pátio.</p>
      </section>
  );
}

export function PatioSection() {
  return (
      <section className="section" aria-labelledby="titulo-juntos">
        <h2 id="titulo-juntos">Pátio e lead juntos.</h2>
        <div className="cards-2">
          <Reveal index={0}>
            <article className="card">
              <span className="pill">exemplo</span>
              <h3>Carro</h3>
              <p>18 dias no pátio</p>
              <p className="price price-small">R$ 62.900</p>
              <p>FIPE informada R$ 64.200</p>
              <p>Próprio · reservado para a Mariana</p>
            </article>
          </Reveal>
          <Reveal index={1}>
            <article className="card">
              <span className="pill">exemplo</span>
              <h3>Lead</h3>
              <p>Proposta · desde as 10:12</p>
              <p>Vendedor da garagem exemplo</p>
              <p>Falta o aceite do número.</p>
            </article>
          </Reveal>
        </div>
        <p className="cut-line">
          Carro sem lead é pátio. Lead sem carro é desejo. Os dois se encontram na reserva e na
          proposta.
        </p>
      </section>
  );
}

export function MorningSection() {
  return (
      <section className="section" aria-labelledby="titulo-manha">
        <h2 id="titulo-manha">O que você abre no celular.</h2>
        <Morning />
        <p className="cut-line">
          Venda e lead no mesmo lugar. O carro parado e o comprador mudo aparecem antes do fim do
          mês.
        </p>
      </section>
  );
}

export function TradeSection() {
  return (
      <section className="section" aria-labelledby="titulo-mesa">
        <h2 id="titulo-mesa">Troca, mesa e documento.</h2>
        <div className="cards-3">
          <Reveal index={0}>
            <article className="card">
              <h3>Troca</h3>
              <p>Gol 2014 por R$ 28.000. A avaliação vale 48 horas.</p>
            </article>
          </Reveal>
          <Reveal index={1}>
            <article className="card">
              <h3>Crédito</h3>
              <p>O segundo banco aprovou. O Shark acompanha o status. Não aprova.</p>
            </article>
          </Reveal>
          <Reveal index={2}>
            <article className="card">
              <h3>Checklist</h3>
              <p>A chave só sai com o papel crítico e o pagamento combinado registrados.</p>
            </article>
          </Reveal>
        </div>
        <p className="cut-line">
          O Shark não é banco e não é despachante. Ele não deixa a venda se perder entre os           dois.
        </p>
      </section>
  );
}

export function HouseSection() {
  return (
      <section className="section" aria-labelledby="titulo-casa">
        <h2 id="titulo-casa">Quem levou o carro fica na casa.</h2>
        <Reveal>
          <div className="prose">
            <p>
              No dia seguinte você pergunta se ficou certo. No sétimo dia, se o documento não está
              pendente, você pede a indicação. O indicado entra com o nome de quem indicou.
            </p>
            <p className="example-note">
              Exemplo: a irmã da Mariana entrou como indicação, ligada a ela.
            </p>
          </div>
        </Reveal>
      </section>
  );
}

export function AudienceSection() {
  return (
      <section className="section" aria-labelledby="titulo-quem">
        <h2 id="titulo-quem">Para quem é.</h2>
        <div className="cards-2">
          <article className="card">
            <h3>Cabe agora</h3>
            <ul>
              <li>Garagem de seminovos com o dono no WhatsApp.</li>
              <li>Pátio que ainda cabe na cabeça de uma pessoa.</li>
              <li>Troca, consignação, financiamento ou despachante no dia.</li>
            </ul>
          </article>
          <article className="card">
            <h3>Fica fora</h3>
            <ul>
              <li>Concessionária de zero-quilômetro.</li>
              <li>Locadora.</li>
              <li>Classificado.</li>
              <li>Oficina sem venda de carro.</li>
            </ul>
          </article>
        </div>
      </section>
  );
}

export function ObjectionsSection() {
  return (
      <section className="section" aria-labelledby="titulo-objecoes">
        <h2 id="titulo-objecoes">O que costuma travar.</h2>
        <div className="accordion">
          {OBJECOES.map((item) => (
            <details key={item.titulo}>
              <summary>{item.titulo}</summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </section>
  );
}

export function QuestionsSection() {
  return (
      <section className="section" aria-labelledby="titulo-perguntas">
        <h2 id="titulo-perguntas">Perguntas objetivas.</h2>
        <div className="accordion">
          {PERGUNTAS.map((item) => (
            <details key={item.pergunta}>
              <summary>{item.pergunta}</summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </section>
  );
}
