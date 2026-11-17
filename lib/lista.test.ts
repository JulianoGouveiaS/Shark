import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mascaraWhatsapp, posicaoMascara, validarLista, whatsappComDdd } from "./lista.ts";

const valido = {
  nome: "Mariana",
  garagem: "Garagem do exemplo",
  cidade: "Campinas",
  uf: "sp",
  whatsapp: "(19) 98888-7777",
  faixa: "até 15",
};

describe("whatsappComDdd", () => {
  it("aceita 11 dígitos com máscara", () => {
    assert.equal(whatsappComDdd("(19) 98888-7777"), "19988887777");
  });

  it("aceita 10 dígitos e o prefixo 55", () => {
    assert.equal(whatsappComDdd("1933334444"), "1933334444");
    assert.equal(whatsappComDdd("+55 19 98888-7777"), "19988887777");
    assert.equal(whatsappComDdd("551933334444"), "1933334444");
  });

  it("recusa número sem DDD e DDD abaixo de 11", () => {
    assert.equal(whatsappComDdd("988887777"), null);
    assert.equal(whatsappComDdd("10988887777"), null);
    assert.equal(whatsappComDdd(""), null);
    assert.equal(whatsappComDdd("19"), null);
  });
});

describe("mascaraWhatsapp", () => {
  it("formata celular e fixo e ignora o que não é dígito", () => {
    assert.equal(mascaraWhatsapp(""), "");
    assert.equal(mascaraWhatsapp("19"), "(19");
    assert.equal(mascaraWhatsapp("19988887777"), "(19) 98888-7777");
    assert.equal(mascaraWhatsapp("1933334444"), "(19) 3333-4444");
    assert.equal(mascaraWhatsapp("+55 (19) 98888-7777"), "(19) 98888-7777");
    assert.equal(mascaraWhatsapp("Mariana 19988887777"), "(19) 98888-7777");
  });

  it("não passa de 11 dígitos nacionais", () => {
    assert.equal(mascaraWhatsapp("199888877771234"), "(19) 98888-7777");
  });

  it("devolve a posição depois dos mesmos dígitos", () => {
    assert.equal(posicaoMascara("(19) 98888-7777", 0), 0);
    assert.equal(posicaoMascara("(19) 98888-7777", 2), 3);
    assert.equal(posicaoMascara("(19) 98888-7777", 3), 6);
  });
});

describe("validarLista", () => {
  it("devolve a linha estreita, com WhatsApp só em dígitos", () => {
    const resultado = validarLista({ ...valido, email: "a@b.c", observacao: "não entra" });
    assert.equal(resultado.ok, true);
    if (!resultado.ok) return;
    assert.deepEqual(resultado.row, {
      nome: "Mariana",
      garagem: "Garagem do exemplo",
      cidade: "Campinas",
      uf: "SP",
      whatsapp: "19988887777",
      faixa_patio: "até 15",
    });
  });

  it("limpa espaço e caractere de controle", () => {
    const resultado = validarLista({ ...valido, nome: "  Ana\u0000  Souza  " });
    assert.equal(resultado.ok, true);
    if (!resultado.ok) return;
    assert.equal(resultado.row.nome, "Ana Souza");
  });

  it("separa WhatsApp inválido de campo inválido", () => {
    assert.deepEqual(validarLista({ ...valido, whatsapp: "988887777" }), {
      ok: false,
      error: "whatsapp",
    });
    assert.deepEqual(validarLista({ ...valido, uf: "XX" }), { ok: false, error: "campos" });
    assert.deepEqual(validarLista({ ...valido, faixa: "ate 15" }), { ok: false, error: "campos" });
    assert.deepEqual(validarLista({ ...valido, nome: "A" }), { ok: false, error: "campos" });
    assert.deepEqual(validarLista(null), { ok: false, error: "campos" });
  });

  it("recusa nome além do limite", () => {
    assert.deepEqual(validarLista({ ...valido, nome: "A".repeat(81) }), {
      ok: false,
      error: "campos",
    });
  });
});
