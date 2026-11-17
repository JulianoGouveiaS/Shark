# Regras comuns

Todo papel lê este arquivo antes do próprio. Tech lead, orquestrador, dev backend, frontend e QA seguem o que está aqui. O arquivo do papel só acrescenta a parte dele. Regra que vale para todos não se copia para o papel.

## Código que entra

O código entra limpo, performático e no nível de quem já mantém o sistema em produção.

Limpo: um nome por fato, função com um motivo para mudar, leitura de cima para baixo. Comentário só quando a restrição não cabe no código. Código morto, flag sem leitor e abstração de um uso só ficam de fora.

Performático: a tela abre no celular, em 4G, no pátio. Trabalho pesado não roda no render. Consulta não fica dentro de componente visual. Animação não continua enquanto a pessoa lê. A mesma lista não se busca duas vezes no mesmo carregamento.

Nível sênior: o caso inválido, o vazio, o carregando e a falha nascem junto com o caminho feliz. Erro engolido, `any` para destravar e conserto adiado ficam de fora. `npm run typecheck` passa.

Boas práticas neste repositório:

- A validação que protege o dado roda no servidor. A checagem no navegador só antecipa a frase.
- Segredo fica no servidor. `SUPABASE_SERVICE_ROLE_KEY` não vai para código de navegador nem para variável `NEXT_PUBLIC_`.
- Dinheiro persistido é inteiro, em centavos de real. A tela mostra reais em `pt-BR`. Dinheiro, telefone, placa e data têm uma função de formato cada.
- Data e hora usam o fuso `America/Sao_Paulo`.
- Telefone fica guardado com DDD, só os dígitos nacionais, 10 ou 11.
- Uma loja não lê dado de outra. A lista de espera não é tabela de loja e não cria usuário.
- Texto de interface em português do Brasil, com as palavras da garagem: lojista, vendedor, comprador, lead, clientela, veículo, anúncio, fio, pátio, troca, consignado. "Cliente" sozinho não se usa. "Pipeline", "opportunity" e "deal" não se usam.
- O idioma do código segue o arquivo que está sendo editado.
- `prefers-reduced-motion` mostra o estado final, sem desenhar traço e sem contar número.
- Cor, marca e frase travada da landing permanecem as do plano.
- Pacote, serviço ou fonte nova não entra sem decisão do tech lead.
- Mudança entra por pull request para a `main`. Não usar force push, nem `--force`, nem `--force-with-lease`.

## SOLID

Os cinco valem em todo módulo. Antes de abrir o pull request, conferir os cinco no diff. Código que quebra um deles não entra.

### Uma responsabilidade

Cada módulo, tipo e função muda por um motivo só. Validar a lista é uma função. Gravar é a rota. Mostrar a frase é o formulário. Margem do carro próprio é uma conta. Comissão de consignado é outra. Quem precisa das duas chama as duas. Não junta.

### Aberto para extensão

O caso novo que o plano já separou entra por trás do contrato existente. Quem chama permanece. Próprio e consignado são dois valores: quem mostra os dois não soma num campo só e não reescreve o pátio. Status novo de checklist entra no tipo do checklist. Não se abre extensão para um caso único que ninguém pediu.

### Substituição

Quem substitui um tipo cumpre o contrato do tipo. Um substituto de teste devolve o mesmo formato da rota, inclusive a falha. WhatsApp sem DDD continua inválido no substituto. Status reservado não se passa no lugar de disponível para quem vai vender o carro. Função que alarga o retorno e deixa de fora um campo obrigatório não substitui a original.

### Interface pequena

Quem chama depende só do que usa. Componente recebe o que renderiza, não a linha inteira do banco e não a conexão com o Supabase. Leitura de painel não recebe função de mover etapa. Papel de vendedor não recebe a consulta de custo de compra.

### Dependência invertida

A regra de negócio depende de fato e de contrato, não de tela nem de conexão com o banco. A rota chama a validação. A validação não importa a rota nem o Supabase. O portão da etapa olha o fato (visita aconteceu, proposta aceita), não um componente. Trocar o lugar da gravação não reescreve a regra.

## O que fica de fora do produto

- Chatbot, inbox, resposta automática e qualquer agente que converse com o lojista ou com o comprador. Os papéis deste diretório são a engenharia. O produto não tem conversa com agente.
- Preço de assinatura, plano ou mensalidade. Número do exemplo didático (o Onix, a manhã) só aparece com a palavra exemplo visível.
- Depoimento, número de garagens, CNPJ, endereço, credencial, pacote de portal e homologação inventados.
- API oficial do WhatsApp nesta fase. O produto gera o texto e abre o WhatsApp.
- Reanimated, Expo e React Native neste app web. Movimento na web é Motion (`motion/react`).
- Foto de CNH, de DUT, de cartão e senha de banco.
- Etapa avançada sem o fato da venda.
- Fase que ainda não chegou, encaixada na fase atual.
