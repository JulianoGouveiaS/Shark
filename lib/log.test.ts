import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { logErro, tokenRastreio } from "./log.ts";

const linhas: string[] = [];
const original = console.error;

describe("log tokenizado", { concurrency: 1 }, () => {
  afterEach(() => {
    console.error = original;
    linhas.length = 0;
  });

  it("grava token, evento e código estável", () => {
    console.error = (linha: unknown) => {
      linhas.push(String(linha));
    };
    logErro("lista.recusada", "a1b2c3d4e5f6", "whatsapp");
    logErro("lista.gravar_falhou", "a1b2c3d4e5f6", "23505");
    assert.deepEqual(JSON.parse(linhas[0]), {
      token: "a1b2c3d4e5f6",
      evento: "lista.recusada",
      codigo: "whatsapp",
    });
    assert.deepEqual(JSON.parse(linhas[1]), {
      token: "a1b2c3d4e5f6",
      evento: "lista.gravar_falhou",
      codigo: "23505",
    });
  });

  it("não grava telefone, nome nem código solto", () => {
    console.error = (linha: unknown) => {
      linhas.push(String(linha));
    };
    logErro("lista.gravar_falhou", "11987654321", "Mariana");
    logErro("lista.ambiente", "a1b2c3d4e5f6", "11987654321");
    const texto = linhas.join("");
    assert.equal(texto.includes("11987654321"), false);
    assert.equal(texto.includes("Mariana"), false);
    const primeira = JSON.parse(linhas[0]) as { token: string; evento: string; codigo?: string };
    assert.equal(primeira.evento, "lista.gravar_falhou");
    assert.equal(primeira.codigo, undefined);
    assert.match(primeira.token, /^[a-f0-9]{12}$/);
    assert.equal(JSON.parse(linhas[1]).codigo, undefined);
  });

  it("emite um token opaco de 12 hex", () => {
    const token = tokenRastreio();
    assert.match(token, /^[a-f0-9]{12}$/);
    assert.notEqual(token, tokenRastreio());
  });
});
