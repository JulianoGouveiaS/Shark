"use client";

import { Toast, type ToastTom } from "@/components/toast";
import { FAIXAS, mascaraWhatsapp, posicaoMascara, UF_NOME, UFS } from "@/lib/lista";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

const ERRO_WHATSAPP = "Coloca o WhatsApp com DDD. É por ali que a gente responde.";
const ERRO_GRAVAR = "Não gravou. Tenta de novo daqui a pouco.";
const ERRO_CAMPOS = "Preenche nome, garagem, cidade, estado e a faixa do pátio.";
const SUCESSO = "Anotado. A próxima mensagem é uma conversa sobre a sua garagem, neste WhatsApp.";

type Aviso = { mensagem: string; tom: ToastTom; token?: string };

function tokenVisivel(valor: unknown): string | undefined {
  return typeof valor === "string" && /^[a-f0-9]{12}$/.test(valor) ? valor : undefined;
}

export function WaitlistForm() {
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [anotado, setAnotado] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const status = useRef<HTMLParagraphElement>(null);
  const campoWhatsapp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!aviso) return;
    const id = window.setTimeout(() => setAviso(null), 7000);
    return () => window.clearTimeout(id);
  }, [aviso]);

  function aoDigitarWhatsapp(event: ChangeEvent<HTMLInputElement>) {
    const campo = event.target;
    const digitosAntes = campo.value.slice(0, campo.selectionStart ?? 0).replace(/\D/g, "").length;
    const mascarado = mascaraWhatsapp(campo.value);
    const posicao = posicaoMascara(mascarado, digitosAntes);
    setWhatsapp(mascarado);
    window.requestAnimationFrame(() => {
      campoWhatsapp.current?.setSelectionRange(posicao, posicao);
    });
  }

  function mostrar(mensagem: string, tom: ToastTom, token?: string) {
    setErro(tom === "erro" ? mensagem : null);
    setAviso({ mensagem, tom, token });
  }

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;
    setErro(null);
    setAviso(null);
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
          whatsapp,
          faixa: dados.get("faixa"),
        }),
      });
      const corpo = (await resposta.json()) as { ok?: boolean; error?: string; token?: string };
      if (corpo.ok) {
        setAnotado(true);
        setAviso({ mensagem: SUCESSO, tom: "ok" });
        window.setTimeout(() => status.current?.focus(), 0);
        return;
      }
      const token = tokenVisivel(corpo.token);
      if (corpo.error === "whatsapp") mostrar(ERRO_WHATSAPP, "erro", token);
      else if (corpo.error === "campos") mostrar(ERRO_CAMPOS, "erro", token);
      else mostrar(ERRO_GRAVAR, "erro", token);
    } catch {
      mostrar(ERRO_GRAVAR, "erro");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      {aviso ? (
        <Toast mensagem={aviso.mensagem} tom={aviso.tom} token={aviso.token} onFechar={() => setAviso(null)} />
      ) : null}
      {anotado ? (
        <p className="success" role="status" tabIndex={-1} ref={status}>
          {SUCESSO}
        </p>
      ) : (
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
              ref={campoWhatsapp}
              id="whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              spellCheck={false}
              placeholder="(19) 99999-9999"
              value={whatsapp}
              onChange={aoDigitarWhatsapp}
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
      )}
    </>
  );
}
