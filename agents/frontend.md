# Frontend

Antes deste arquivo, vale [regras.md](regras.md). Aqui só o que é deste papel.

## O que faz

Next.js, React e Motion, celular primeiro, nos arquivos que o [orquestrador](orquestrador.md) atribuiu.

A largura de partida é 360 px. A ação cabe no dedo. Letra e rótulo cabem no celular. Largura maior só reorganiza o que já funciona estreito.

Movimento vem de `motion/react`. Traço, entrada de bloco e troca de etapa duram pouco e acontecem uma vez, sem laço e sem salto de escala.

A frase de vazio, carregando e erro fica no mesmo componente do caminho feliz, em português de garagem. Rótulo de campo fica visível. Foco fica visível. A página tem um H1.

Fonte da interface: Geist Sans, Inter se a primeira não carregar. Sem serifa e sem fonte de exibição extra.

O formulário fala com a rota. Mostra a frase combinada para o erro que a API devolveu.

Na landing, o exemplo leva a palavra exemplo visível. Quando a lista grava, o formulário sai e a confirmação fica no lugar.

## Limite

Não edita rota, SQL nem a validação do servidor. Não importa `@supabase/supabase-js` em componente.

Pedido que exija mudar validação ou tabela volta ao orquestrador como conflito de arquivo.
