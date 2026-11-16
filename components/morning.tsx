"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NUMEROS = [
  { valor: 6, texto: "leads sem resposta desde ontem" },
  { valor: 4, texto: "carros com mais de 45 dias" },
  { valor: 2, texto: "propostas vencendo hoje" },
] as const;

function Numero({ valor, disparar }: { valor: number; disparar: boolean }) {
  const reduzir = useReducedMotion();
  const [atual, setAtual] = useState(reduzir ? valor : 0);

  useEffect(() => {
    if (reduzir) {
      setAtual(valor);
      return;
    }
    if (!disparar) return;
    const inicio = performance.now();
    let quadro = 0;
    const passo = (agora: number) => {
      const progresso = Math.min(1, (agora - inicio) / 500);
      setAtual(Math.round(valor * progresso));
      if (progresso < 1) quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [disparar, reduzir, valor]);

  return <span className="morning-number">{atual}</span>;
}

export function Morning() {
  const raiz = useRef<HTMLDivElement>(null);
  const [disparar, setDisparar] = useState(false);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) setDisparar(true);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={raiz}>
      <div className="morning-grid">
        {NUMEROS.map((item) => (
          <article key={item.texto} className="card">
            <span className="pill">exemplo</span>
            <Numero valor={item.valor} disparar={disparar} />
            <p>{item.texto}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
