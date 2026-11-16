import { createClient } from "@supabase/supabase-js";
import { validarLista } from "@/lib/lista";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "campos" }, { status: 400 });
  }

  const validado = validarLista(body);
  if (!validado.ok) {
    return Response.json(validado, { status: 400 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return Response.json({ ok: false, error: "gravar" }, { status: 503 });
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("lista_espera").insert(validado.row);
  if (error) {
    return Response.json({ ok: false, error: "gravar" }, { status: 503 });
  }

  return Response.json({ ok: true });
}
