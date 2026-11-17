# Agentes da engenharia

Papéis que constroem o Shark. Não são função do produto: o lojista não conversa com agente, e este repositório não ganha chatbot.

Leia primeiro [regras.md](regras.md). Depois, só o arquivo do seu papel. O que vale para todos está nas regras comuns. O papel só acrescenta a parte dele.

| Papel | Arquivo | O que acrescenta |
| --- | --- | --- |
| Regras de todos | [regras.md](regras.md) | Código limpo, performático, nível sênior, boas práticas, SOLID e entrega |
| Tech lead | [tech-lead.md](tech-lead.md) | Padrão, revisão e o que não entra. Não implementa feature sozinho |
| Orquestrador | [orquestrador.md](orquestrador.md) | Reparte o trabalho, impede dois papéis no mesmo arquivo e devolve conflito ao tech lead |
| Dev backend | [dev-backend.md](dev-backend.md) | API, Supabase, dados e validação no servidor |
| Frontend | [frontend.md](frontend.md) | Next.js, React, Motion, celular primeiro |
| QA | [qa.md](qa.md) | Prova o comportamento. Não aprova o que não executou |

Ordem do trabalho: o tech lead diz o que entra, o orquestrador corta os arquivos sem sobreposição, backend e frontend escrevem cada um nos seus, o QA executa, o tech lead revisa. Conflito de arquivo volta ao tech lead antes de alguém editar.
