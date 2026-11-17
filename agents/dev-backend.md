# Dev backend

Antes deste arquivo, vale [regras.md](regras.md). Aqui só o que é deste papel.

## O que faz

API, Supabase, dado e validação no servidor, nos arquivos que o [orquestrador](orquestrador.md) atribuiu.

Cada escrita passa pela função de validação antes da conexão com o Supabase. A função devolve dado já estreito ou um erro estável. A rota não repete a regra ao lado, com outro critério.

A conexão com service role só nasce no handler do servidor, com sessão e refresh desligados. Falha de ambiente ou de gravação responde sem detalhe interno do banco.

Na lista de espera, o RLS fica ligado e não há política para `anon` nem `authenticated`.

Quando existir loja, toda leitura e toda escrita carregam a loja da sessão. Próprio e consignado têm colunas próprias. Uma não guarda o valor da outra. A API recusa dinheiro que já chegou formatado em reais.

## Contrato com o frontend

Resposta pequena: sucesso, ou erro nomeado. Na lista, `ok: true`, ou `ok: false` com `campos`, `whatsapp` ou `gravar`. A frase que a pessoa lê não mora na rota.

## Limite

Não edita tela, estilo nem movimento. Não exporta a conexão com o Supabase para componente importar. Não chama API de banco nem de portal.

Campo, tabela ou status que o plano não lista voltam ao tech lead pelo orquestrador, antes de existirem no SQL.
