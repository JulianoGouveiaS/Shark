"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const PASSOS = [
  { id: "Chegou", frase: "Resposta às 10:19, dentro dos 15 minutos." },
  { id: "Qualificou", frase: "Tem troca, quer financiar, quer o carro no fim de semana." },
  { id: "No carro", frase: "Onix ligado ao lead." },
  { id: "Visita", frase: "Visita marcada." },
  { id: "Proposta", frase: "Gol a R$ 28.000, válido por 48 h." },
  { id: "Crédito", frase: "O segundo banco aprovou." },
  { id: "Papel", frase: "Checklist fechado." },
  { id: "Entrega", frase: "A chave sai." },
  { id: "Indicação", frase: "A irmã entrou como indicação." },
] as const;

const TOUR = ["Chegou", "No carro", "Proposta", "Crédito"] as const;

export function Cycle() {
  const reduzir = useReducedMotion();
  const raiz = useRef<HTMLElement>(null);
  const [visto, setVisto] = useState(false);
  const [indice, setIndice] = useState(0);
  const [parado, setParado] = useState(false);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) setVisto(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visto || reduzir) return;
    const sequencia = [...TOUR, ...TOUR];
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      if (i >= sequencia.length) {
        setParado(true);
        window.clearInterval(id);
        return;
      }
      setIndice(i);
    }, 2400);
    return () => window.clearInterval(id);
  }, [visto, reduzir]);

  const ativo = reduzir || parado ? "Proposta" : TOUR[indice % TOUR.length];

  return (
    <section className="section" id="ciclo" ref={raiz} aria-labelledby="titulo-ciclo">
      <h2 id="titulo-ciclo">Do oi até a chave.</h2>
      <div className="cycle-axis" aria-hidden="true">
        {visto ? (
          <motion.span
            className="cycle-stroke"
            initial={reduzir ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={reduzir ? { duration: 0 } : { duration: 0.9, ease: "easeOut" }}
          />
        ) : (
          <span className="cycle-stroke cycle-stroke-wait" />
        )}
      </div>
      <ol className="cycle">
        {PASSOS.map((passo, ordem) => (
          <li key={passo.id} className={passo.id === ativo ? "is-active" : undefined}>
            <span className="cycle-index">{ordem + 1}</span>
            <span className="cycle-name">{passo.id}</span>
            <span className="cycle-phrase">{passo.frase}</span>
          </li>
        ))}
      </ol>
      <p className="example-note">Exemplo da Mariana e do Onix. Não é depoimento.</p>
    </section>
  );
}
