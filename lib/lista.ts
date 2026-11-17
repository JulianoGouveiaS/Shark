export const UFS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

export const UF_NOME: Record<(typeof UFS)[number], string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

export const FAIXAS = ["até 15", "16 a 40", "41 a 80", "mais de 80"] as const;

export type FaixaPatio = (typeof FAIXAS)[number];

export type ListaRow = {
  nome: string;
  garagem: string;
  cidade: string;
  uf: (typeof UFS)[number];
  whatsapp: string;
  faixa_patio: FaixaPatio;
};

export type ListaErro = "campos" | "whatsapp";

const LIMITE = 80;

function texto(valor: unknown): string {
  if (typeof valor !== "string") return "";
  return valor.replace(/[\u0000-\u001F\u007F]/g, "").trim().replace(/\s+/g, " ");
}

function digitosNacionais(valor: unknown): string {
  const digitos = texto(valor).replace(/\D/g, "");
  if (digitos.startsWith("55") && (digitos.length === 12 || digitos.length === 13)) {
    return digitos.slice(2);
  }
  return digitos;
}

export function whatsappComDdd(valor: unknown): string | null {
  const nacional = digitosNacionais(valor);
  if (nacional.length !== 10 && nacional.length !== 11) return null;
  const ddd = Number(nacional.slice(0, 2));
  if (!Number.isInteger(ddd) || ddd < 11 || ddd > 99) return null;
  return nacional;
}

export function mascaraWhatsapp(valor: string): string {
  const digitos = digitosNacionais(valor).slice(0, 11);
  if (digitos.length === 0) return "";
  const ddd = digitos.slice(0, 2);
  const resto = digitos.slice(2);
  if (resto.length === 0) return `(${ddd}`;
  if (digitos.length > 10) return `(${ddd}) ${resto.slice(0, 5)}-${resto.slice(5)}`;
  if (resto.length <= 4) return `(${ddd}) ${resto}`;
  return `(${ddd}) ${resto.slice(0, 4)}-${resto.slice(4)}`;
}

export function posicaoMascara(mascarado: string, digitosAntes: number): number {
  if (digitosAntes <= 0) return 0;
  let vistos = 0;
  for (let i = 0; i < mascarado.length; i += 1) {
    const codigo = mascarado.charCodeAt(i);
    if (codigo >= 48 && codigo <= 57) vistos += 1;
    if (vistos >= digitosAntes) return i + 1;
  }
  return mascarado.length;
}

export function validarLista(body: unknown): { ok: true; row: ListaRow } | { ok: false; error: ListaErro } {
  const origem = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const nome = texto(origem.nome);
  const garagem = texto(origem.garagem);
  const cidade = texto(origem.cidade);
  const uf = texto(origem.uf).toUpperCase();
  const faixa = texto(origem.faixa);
  const camposOk =
    nome.length > 1 &&
    nome.length <= LIMITE &&
    garagem.length > 1 &&
    garagem.length <= LIMITE &&
    cidade.length > 1 &&
    cidade.length <= LIMITE &&
    (UFS as readonly string[]).includes(uf) &&
    (FAIXAS as readonly string[]).includes(faixa);

  if (!camposOk) return { ok: false, error: "campos" };

  const whatsapp = whatsappComDdd(origem.whatsapp);
  if (!whatsapp) return { ok: false, error: "whatsapp" };

  return {
    ok: true,
    row: {
      nome,
      garagem,
      cidade,
      uf: uf as ListaRow["uf"],
      whatsapp,
      faixa_patio: faixa as FaixaPatio,
    },
  };
}
