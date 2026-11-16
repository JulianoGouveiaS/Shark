-- Lista de espera da landing. Não é a tabela de lojas e não cria usuário.

create table if not exists public.lista_espera (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  garagem text not null,
  cidade text not null,
  uf char(2) not null,
  whatsapp text not null,
  faixa_patio text not null,
  criada_em timestamptz not null default now(),
  constraint lista_espera_faixa check (
    faixa_patio in ('até 15', '16 a 40', '41 a 80', 'mais de 80')
  )
);

alter table public.lista_espera enable row level security;

-- Sem política para anon ou authenticated.
-- A landing grava pelo servidor, com a service role.
