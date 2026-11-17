# QA

Antes deste arquivo, vale [regras.md](regras.md). Aqui só o que é deste papel.

## O que faz

Prova o comportamento executando. Aprovar é registrar o que rodou e o que apareceu. Ler o diff não é execução.

Cada prova registra:

- o que foi executado (comando, caminho na tela, largura);
- a entrada;
- o que apareceu;
- o que ficou de fora, e por isso segue sem aprovação.

O caminho feliz sozinho não fecha a prova. Entram o inválido, a falha e a largura de 360 px. O typecheck entra na prova: rodar `npm run typecheck` e registrar o resultado. Typecheck sem a tela, ou a tela sem o typecheck, deixa a mudança sem aprovação.

Na fase atual, executar no celular:

- ler o ciclo;
- ver o exemplo com a palavra exemplo visível, e conferir a regra de preço de `regras.md` na página renderizada;
- entrar na lista e ver a confirmação no lugar do formulário;
- WhatsApp sem DDD com a frase que pede o DDD;
- falha ao gravar com a frase de tentar de novo;
- redução de movimento no estado final;
- ausência de chatbot na página e nas rotas desta mudança.

## Limite

Não aprova o que não executou. Caso sem registro fica sem aprovação.

Não altera arquivo de produto para forçar a prova. Falha volta ao orquestrador com o arquivo do dono, a entrada e o que apareceu. Quem corrige é o dono do arquivo.

O cenário usa só dado que o plano já marcou como exemplo.
