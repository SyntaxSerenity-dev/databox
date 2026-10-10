<!-- 
# 
#  ███████╗██╗   ██╗███╗   ██╗████████╗ █████╗ ██╗  ██╗███████╗█████╗██████╗ █████╗███╗   ██╗██╗████████╗██╗   ██╗
#  ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝██╔══██╗╚██╗██╔╝██╔════╝██╔══╝██╔══██╗██╔══╝████╗  ██║██║╚══██╔══╝╚██╗ ██╔╝
#  ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║   ███████║ ╚███╔╝ ███████╗█████╗██████╔╝█████╗██╔██╗ ██║██║   ██║    ╚████╔╝ 
#  ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║   ██╔══██║ ██╔██╗ ╚════██║██╔══╝██╔══██╗██╔══╝██║╚██╗██║██║   ██║     ╚██╔╝  
#  ███████║   ██║   ██║ ╚████║   ██║   ██║  ██║██╔╝ ██╗███████║█████╗██║  ██║█████╗██║ ╚████║██║   ██║      ██║   
#  ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚════╝╚═╝  ╚═╝╚════╝╚═╝  ╚═══╝╚═╝   ╚═╝      ╚═╝   
#                                       T R U S T   I N   E V E R Y   L I N E
#                                                   O F   C O D E
# 
# File: README.md
# 
# DESCRIPTION:
#   Guia da pasta docs/ da versão 2.0.0: como abrir os exemplos interativos, estrutura de pastas,
#   catálogo com o propósito de cada página de exemplo e passos para acrescentar um novo exemplo.
#   Documenta também os recursos partilhados (CSS, JS e imagens) que não podem conter comentários.
# 
# DEPENDENCIES:
#   - dist/dataBox.min.js (build da 2.0.0)
#   - jQuery 3.6+
#   - Bootstrap 5.3+
# 
# @package      versions/dataBox-2.0.0-dist/docs
# @category     Documentation (Module README)
# @version      2.0.0
# @since        2026-10-08
# @license      MIT
# @company      DataBox
# @development  company: syntax serenity
# @email        fs.developerfullstack@gmail.com
# @link         https://www.syntaxserenity.co.ao
# @link         https://github.com/SyntaxSerenity-dev/databox
#  
-->
# DataBox 2.0.0 — Exemplos interativos

Esta pasta contém os exemplos da versão 2.0.0, prontos a descarregar e abrir no browser. Cada página mostra o resultado e o código que o produz.

## ▶️ Como abrir

1. Garante que existe o build em `../dist/dataBox.min.js` (pasta `dist/` ao lado de `docs/`).
2. Abre [`examples/index.html`](examples/index.html) no browser. Precisas de ligação à internet para carregar o jQuery, o Bootstrap, o Font Awesome e as fontes.

Se o browser bloquear algum recurso ao abrir por duplo clique, serve a pasta com um servidor local:

```bash
# na pasta dataBox-2.0.0-dist/
python3 -m http.server 8080
# depois abre http://localhost:8080/docs/examples/index.html
```

O exemplo de AJAX usa um servidor simulado no próprio browser (`mock://`), por isso não precisa de backend.

## 🗂️ Estrutura

```text
📁 docs/
├── 📄 README.md                       # Este ficheiro
├── 📁 examples/                       # Uma página HTML por vista ou funcionalidade
│   ├── 📄 index.html                      # Índice gerado a partir do catálogo de exemplos
│   └── 📄 01-tabela.html … 14-estado-idioma.html
└── 📁 assets/                         # Recursos estáticos partilhados
    ├── 📁 css/examples.css                # Estilos dos exemplos
    ├── 📁 js/examples.js                  # ExamplesKit: dados fictícios, servidor simulado, navegação
    └── 📁 img/                            # databox-logo.svg e favicon.svg
```

## 🧪 Catálogo de exemplos

Os ficheiros `.html` chegam ao browser tal e qual, por isso a sua documentação vive aqui (regra de front-end da Syntax Serenity: nada de blocos de documentação dentro de HTML puro). Todas as páginas partilham `@version 2.0.0`, `@since 2026-10-08` e `@author Syntax Serenity Development Team`.

| Ficheiro | Propósito | Opções e métodos usados |
| --- | --- | --- |
| `01-tabela.html` | Tabela com colunas personalizadas, pesquisa, ordenação e paginação | `views.table.columns`, `render`, `search`, `sorting`, `pagination.limits` |
| `02-cards.html` | Cards com template próprio | `views.card.template`, `columns`, `itemCssClass` |
| `03-lista-detalhes.html` | Lista compacta com linhas expansíveis | `views.list.template`, `views.table.details`, `setView` |
| `04-kanban.html` | Quadro Kanban com drag & drop | `views.kanban.groupBy`, `allowDragDrop`, `columnHeader`, `cardTemplate`, `onKanbanDrop` |
| `05-multiplas-views.html` | As 4 views ativas e alternador por código | `views.*.active`, `setView`, `onViewChanged` |
| `06-pesquisa-filtros.html` | Pesquisa global e por coluna, filtros rápidos, Query Builder | `search.perColumn`, `quickFilters`, `queryBuilder`, `clearSearch`, `onSearch` |
| `07-edicao-inline.html` | Edição de células com 4 tipos de input | `inlineEdit`, `editable`, `editType`, `editOptions`, `onEdit` |
| `08-selecao-acoes.html` | Seleção múltipla e ações em massa | `selection`, `bulkActions`, `updateItem`, `removeItem`, `onSelectionChanged` |
| `09-agrupamento-agregacoes.html` | Linhas agrupadas e totais no rodapé | `rowGroup`, `startRender`, `endRender`, `footer`, `sort` |
| `10-colunas.html` | Colunas visíveis, reordenáveis e fixas | `columnVisibility`, `columnReorder`, `fixedColumns`, `visible` |
| `11-exportacao.html` | Exportação em 5 formatos | `export.*`, `render(…, 'export')` |
| `12-scroll-infinito.html` | 5 000 registos em modo virtual e infinito | `pagination.type`, `scrollSize`, `destroy` |
| `13-ajax-server-side.html` | Pesquisa, ordenação e paginação no servidor (simulado) | `ajax.*`, `serverSide`, `setAjaxParams`, `reload`, `onDataLoaded` |
| `14-estado-idioma.html` | Estado persistente e troca de idioma | `stateSave`, `language`, `clearState`, `onStateSave`, `onStateLoad` |

## 🧰 Recursos partilhados

| Ficheiro | Papel |
| --- | --- |
| `assets/css/examples.css` | Tokens de cor e tipografia (acompanham o site oficial), navegação, palco, painel de código e registo de eventos. |
| `assets/js/examples.js` | Expõe `window.ExamplesKit` e monta a navegação, o cabeçalho, o painel de código (lido do `<script id="demo">` da própria página) e o anterior/seguinte. |
| `assets/img/databox-logo.svg` | Logótipo usado na barra de navegação dos exemplos. |
| `assets/img/favicon.svg` | Ícone do separador do browser. |

### `ExamplesKit`

| Membro | Descrição |
| --- | --- |
| `employees()` | 24 colaboradores fictícios, sempre iguais. |
| `tasks()` | 12 tarefas fictícias em 4 estados, para o Kanban. |
| `generateRows(n)` | `n` colaboradores fictícios (usado com 5 000 no scroll infinito). |
| `esc(valor)` | Escapa o HTML de um valor antes de o usar num template. |
| `log(mensagem)` | Escreve no painel "Registo de eventos" (páginas com `data-log`). |
| `installMockServer({latency})` | Regista o servidor simulado para URLs `mock://…`. |

## ➕ Como acrescentar um exemplo

1. Acrescenta uma entrada ao `CATALOGUE` em `assets/js/examples.js` (id, ficheiro, grupo, ícone, título, frase e tags).
2. Copia uma página existente para `examples/NN-nome.html` e altera `data-example`, o `<title>`, o HTML do palco e o conteúdo de `<script id="demo">`.
3. Acrescenta a linha ao catálogo acima e ao README da raiz.
4. Regista a alteração no `CHANGELOG.md`.

## ⚠️ Dados e segurança

Todos os dados dos exemplos são inventados. Não coloques nos exemplos chaves, URLs internos nem dados reais de utilizadores.

## 🔗 Ligações

- [Referência técnica da v2.0.0](../../../docs/DATABOX_REFERENCE_v2.0.0.md)
- [README do projeto](../../../README.md)
