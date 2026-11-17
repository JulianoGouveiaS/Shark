"use client";

import { motion, useReducedMotion } from "motion/react";

export type ToastTom = "ok" | "erro";

export function Toast({
  mensagem,
  tom,
  token,
  onFechar,
}: {
  mensagem: string;
  tom: ToastTom;
  token?: string;
  onFechar: () => void;
}) {
  const reduzir = useReducedMotion();
  const corpo = (
    <div className={`toast toast-${tom}`} role={tom === "erro" ? "alert" : "status"}>
      <p>{mensagem}</p>
      {token ? <p className="toast-token">Código {token}</p> : null}
      <button type="button" className="toast-fechar" onClick={onFechar}>
        Fechar
      </button>
    </div>
  );

  if (reduzir) return <div className="toast-slot">{corpo}</div>;

  return (
    <motion.div
      className="toast-slot"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {corpo}
    </motion.div>
  );
}
