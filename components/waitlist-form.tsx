"use client";

import { FAIXAS, UF_NOME, UFS } from "@/lib/lista";
import { useRef, useState, type FormEvent } from "react";

const ERRO_WHATSAPP = "Coloca o WhatsApp com DDD. É por ali que a gente responde.";
const ERRO_GRAVAR = "Não gravou. Tenta de novo daqui a pouco.";
const ERRO_CAMPOS = "Preenche nome, garagem, cidade, estado e a faixa do pátio.";
const SUCESSO = "Anotado. A próxima mensagem é uma conversa sobre a sua garagem, neste WhatsApp.";

export function WaitlistForm() {
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [anotado, setAnotado] = useState(false);
  const status = useRef<HTMLParagraphElement>(null);

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;
    setErro(null);
    setEnviando(true);
    const dados = new FormData(event.currentTarget);
    try {
      const resposta = await fetch("/api/lista", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nome: dados.get("nome"),
          garagem: dados.get("garagem"),
          cidade: dados.get("cidade"),
          uf: dados.get("uf"),
          whatsapp: dados.get("whatsapp"),
          faixa: dados.get("faixa"),
        }),
      });
      const corpo = (await resposta.json()) as { ok: boolean; error?: string };
      if (corpo.ok) {
        setAnotado(true);
        window.setTimeout(() => status.current?.focus(), 0);
        return;
      }
      if (corpo.error === "whatsapp") setErro(ERRO_WHATSAPP);
      else if (corpo.error === "campos") setErro(ERRO_CAMPOS);
      else setErro(ERRO_GRAVAR);
    } catch {
      setErro(ERRO_GRAVAR);
    } finally {
      setEnviando(false);
    }
  }

  if (anotado) {
    return (
      <p className="success" role="status" tabIndex={-1} ref={status}>
        {SUCESSO}
      </p>
    );
  }

  return (
    <form className="lista-form" onSubmit={enviar} noValidate>
      <div className="field">
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" autoComplete="name" required maxLength={80} />
      </div>
      <div className="field">
        <label htmlFor="garagem">Nome da garagem</label>
        <input id="garagem" name="garagem" autoComplete="organization" required maxLength={80} />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cidade">Cidade</label>
          <input id="cidade" name="cidade" autoComplete="address-level2" required maxLength={80} />
        </div>
        <div className="field">
          <label htmlFor="uf">UF</label>
          <select id="uf" name="uf" required defaultValue="">
            <option value="" disabled>
              Estado
            </option>
            {UFS.map((uf) => (
              <option key={uf} value={uf}>
                {uf} — {UF_NOME[uf]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="whatsapp">WhatsApp</label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-invalid={erro === ERRO_WHATSAPP}
          aria-describedby={erro ? "lista-erro" : undefined}
        />
      </div>
      <div className="field">
        <label htmlFor="faixa">Carros no pátio</label>
        <select id="faixa" name="faixa" required defaultValue="">
          <option value="" disabled>
            Faixa
          </option>
          {FAIXAS.map((faixa) => (
            <option key={faixa} value={faixa}>
              {faixa}
            </option>
          ))}
        </select>
      </div>
      {erro ? (
        <p className="form-error" id="lista-erro" role="alert">
          {erro}
        </p>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={enviando}>
        {enviando ? "Anotando…" : "Entrar na lista"}
      </button>
      <p className="micro">Sem enxurrada de anúncio. Uma conversa sobre a sua garagem.</p>
    </form>
  );
}
