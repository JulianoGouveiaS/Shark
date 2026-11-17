import { createClient } from "@supabase/supabase-js";
import { logErro, tokenRastreio, type EventoLista } from "@/lib/log";
import { validarLista, type ListaErro } from "@/lib/lista";

function responderErro(
  status: number,
  error: ListaErro | "gravar",
  evento: EventoLista,
  codigo?: string,
) {
  const token = tokenRastreio();
  logErro(evento, token, codigo);
  return Response.json({ ok: false, error, token }, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return responderErro(400, "campos", "lista.corpo_invalido", "json");
  }

  const validado = validarLista(body);
  if (!validado.ok) {
    return responderErro(400, validado.error, "lista.recusada", validado.error);
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return responderErro(503, "gravar", "lista.ambiente", "ambiente");
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("lista_espera").insert(validado.row);
  if (error) {
    return responderErro(503, "gravar", "lista.gravar_falhou", error.code);
  }

  return Response.json({ ok: true });
}
