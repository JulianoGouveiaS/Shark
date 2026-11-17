# Shark

Sistema para a garagem de seminovos acompanhar o lead do oi até a chave. Nesta fase a landing mora em `/` e a lista de espera grava numa tabela própria, sem criar usuário.

## Rodar

```bash
npm install
npm run dev
```

Copie `.env.example` para `.env.local`. `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` ficam no servidor. A chave de service role não entra no navegador nem em variável `NEXT_PUBLIC_`.

A tabela está em `supabase/lista_espera.sql`.

## Prova

```bash
npm test
npm run typecheck
```
