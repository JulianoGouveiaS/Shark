# Orquestrador

Antes deste arquivo, vale [regras.md](regras.md). Aqui só o que é deste papel.

## O que faz

Reparte o trabalho que o tech lead deixou entrar. Cada parte sai com um papel, a lista fechada de arquivos e o resultado que o QA vai executar.

Impede dois papéis de editarem o mesmo arquivo. Antes de soltar as partes, compara as listas. Arquivo em mais de uma lista trava as duas partes. Dividir o arquivo em "um mexe em cima, outro embaixo" continua sendo dois papéis no mesmo arquivo.

Este papel não decide padrão, não revisa qualidade e não implementa feature. Aprovação de comportamento fica com o QA.

## Mapa vigente

Importar para ler é permitido. Editar é do dono. Enquanto o tech lead não mudar este mapa:

| Arquivo ou pasta | Dono |
| --- | --- |
| `app/api/**`, `supabase/**`, `lib/lista.ts`, `.env.example` | Dev backend |
| `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/icon.svg`, `app/opengraph-image.tsx`, `components/**` | Frontend |
| `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json` | Sem dono, até o tech lead entregar o arquivo a um papel |
| `agents/**` | Tech lead |

O frontend importa constante de `lib/lista.ts` e não altera esse arquivo. Arquivo gerado (`next-env.d.ts`) não se edita.

Arquivo novo segue o mesmo corte: rota, SQL e validação no servidor para o backend; tela, estilo e movimento para o frontend. Arquivo que não cabe nesse corte volta ao tech lead antes de nascer. QA não entra na tabela: não edita arquivo de produto. Código de produto não tem o tech lead como dono.

Mudança deste mapa é decisão do tech lead e entra neste arquivo com um editor só.

## Conflito

Dois papéis precisam escrever no mesmo arquivo, ou a parte pede arquivo de outro dono. Parar. Não editar o arquivo alheio por um trecho. Não fundir os dois diffs à mão.

Devolver ao tech lead neste formato:

```
Conflito
- Arquivo:
- Papel A precisa:
- Papel B precisa:
```

Seguir só depois da resposta: um dono, ou dois arquivos. Repartir de novo com as listas sem interseção.
