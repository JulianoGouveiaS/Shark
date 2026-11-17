export const EVENTOS_LISTA = [
  "lista.corpo_invalido",
  "lista.recusada",
  "lista.ambiente",
  "lista.gravar_falhou",
] as const;

export type EventoLista = (typeof EVENTOS_LISTA)[number];

const CODIGOS = new Set(["json", "campos", "whatsapp", "ambiente", "gravar"]);

export function tokenRastreio(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

function codigoSeguro(codigo: string | undefined): string | undefined {
  if (!codigo) return undefined;
  if (CODIGOS.has(codigo)) return codigo;
  if (/^[0-9A-Z]{5}$/.test(codigo)) return codigo;
  if (/^PGRST[0-9]{3}$/.test(codigo)) return codigo;
  return undefined;
}

export function logErro(evento: EventoLista, token: string, codigo?: string): void {
  const seguro = /^[a-f0-9]{12}$/.test(token) ? token : tokenRastreio();
  const linha: { token: string; evento: EventoLista; codigo?: string } = {
    token: seguro,
    evento,
  };
  const codigoOk = codigoSeguro(codigo);
  if (codigoOk) linha.codigo = codigoOk;
  console.error(JSON.stringify(linha));
}
