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
# File: DATABOX_REFERENCE_v2.0.0.md
# 
# DESCRIPTION:
#   Referência técnica da API do DataBox 2.0.0: instalação, opções de configuração por tabela,
#   funcionalidades, callbacks e métodos públicos, com exemplos de código e ligações para os
#   exemplos interativos. Substitui o site de documentação enquanto este não está online.
# 
# DEPENDENCIES:
#   - jQuery 3.6+
#   - Bootstrap 5.3+
# 
# @package      docs
# @category     Documentation (API Reference)
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
# DataBox — Referência Técnica

![Versão](https://img.shields.io/badge/vers%C3%A3o-2.0.0-6366f1) ![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-10b981)

Referência completa da API do **DataBox v2.0.0**, a biblioteca JavaScript que reúne tabelas, cards, listas e Kanban numa só API. Este documento corresponde ao conteúdo da página de documentação do site e serve de documentação oficial enquanto o site não está online.

> 💡 **Aprende por exemplos:** cada secção tem uma página interativa em [`versions/dataBox-2.0.0-dist/docs/examples/`](../versions/dataBox-2.0.0-dist/docs/examples/index.html). Descarrega o repositório e abre o `index.html` no browser.

> ✨ **Novo na v2.0.0** — Kanban com drag & drop nativo, virtual scroll bidirecional, row grouping com agregações e edição inline completa.

---

## 📋 Índice

- [Instalação](#instalação)
- [Primeiros passos](#primeiros-passos)
- **Configuração:** [Views](#views) · [Colunas](#colunas) · [Paginação](#paginação) · [Pesquisa](#pesquisa) · [Ordenação](#ordenação) · [Exportação](#exportação) · [Seleção e ações em massa](#seleção-e-ações-em-massa) · [AJAX e server-side](#ajax-e-server-side)
- **Funcionalidades:** [Query Builder](#query-builder) · [Filtros rápidos](#filtros-rápidos) · [Row Details](#row-details) · [Row Grouping](#row-grouping) · [Edição inline](#edição-inline) · [Colunas visíveis e reordenar](#colunas-visíveis-e-reordenar) · [Colunas fixas](#colunas-fixas) · [Agregações no rodapé](#agregações-no-rodapé) · [Virtual e infinite scroll](#virtual-e-infinite-scroll) · [Kanban com drag and drop](#kanban-com-drag-and-drop)
- **Avançado:** [Estado persistente](#estado-persistente) · [Internacionalização](#internacionalização) · [Callbacks](#callbacks)
- **API:** [API pública](#api-pública)
- [Segurança nos templates](#segurança-nos-templates)

**Legenda das tabelas:** `Tipo` é o tipo JavaScript esperado, `Padrão` é o valor usado quando a opção é omitida e **obrigatório** assinala opções sem as quais a funcionalidade não funciona.

---

## Instalação

O DataBox requer **jQuery** (v3.6+) e **Bootstrap 5** (v5.3+) para o funcionamento completo da interface. Não tem outras dependências obrigatórias.

### Via CDN

```html
<!-- CSS Bootstrap 5 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- CSS Font Awesome (opcional mas recomendado) -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- DataBox -->
<script src="dataBox.js"></script>
```

O ficheiro do DataBox está em [`versions/dataBox-2.0.0-dist/dist/`](../versions/dataBox-2.0.0-dist/dist/) (`dataBox.js` legível e `dataBox.min.js` minificado). Para carregar diretamente do GitHub através do jsDelivr, fixa sempre uma versão:

```html
<script src="https://cdn.jsdelivr.net/gh/SyntaxSerenity-dev/databox@v2.0.0/versions/dataBox-2.0.0-dist/dist/dataBox.min.js"></script>
```

### Estrutura mínima de HTML

```html
<div id="meus-dados"></div>
```

---

## Primeiros passos

A inicialização é feita através do objeto global `DataBox`, invocando o método `init()` com um objeto de configuração.

```javascript
const db = DataBox.init({
    target: '#meus-dados',
    data: [
        { id: 1, nome: "Ana Silva", email: "ana@email.pt", departamento: "TI" },
        { id: 2, nome: "Bruno Costa", email: "bruno@email.pt", departamento: "RH" },
        { id: 3, nome: "Carla Mendes", email: "carla@email.pt", departamento: "Financeiro" }
    ],
    views: {
        table: { active: true },
        card: { active: true }
    },
    search: { active: true },
    pagination: { limit: 10 }
});
```

> ✅ **Resultado:** uma tabela completa com pesquisa global, ordenação, paginação e botões para alternar entre tabela e cards, com uma única chamada.

Exemplo: [`01-tabela.html`](../versions/dataBox-2.0.0-dist/docs/examples/01-tabela.html)

---

## Configuração

### Views

O DataBox suporta 4 views nativas: `table`, `card`, `list` e `kanban`. Podes ativar várias em simultâneo e o utilizador alterna entre elas através de botões na interface.

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `views.table.active` | `boolean` | `false` | Ativa a view de tabela. |
| `views.table.columns` | `Array` | `[]` | Definição das colunas (**obrigatório** para tabela). |
| `views.table.cssClass` | `string` | `table-striped…` | Classes CSS da tabela (lista de classes Bootstrap que começa por `table-striped`). |
| `views.table.responsive` | `boolean` | `true` | Envolve a tabela num contentor responsivo. |
| `views.table.sortable` | `boolean` | `true` | Permite ordenação por colunas. |
| `views.table.details` | `function` | `null` | Função que renderiza os detalhes expandidos. |
| `views.table.columnVisibility` | `boolean` | `false` | Permite mostrar/esconder colunas. |
| `views.table.columnReorder` | `boolean` | `false` | Permite reordenar colunas por drag & drop. |
| `views.table.fixedColumns` | `object` | `{left:0,right:0}` | Número de colunas fixas à esquerda/direita. |
| `views.table.footer` | `boolean` | `false` | Ativa agregações no rodapé. |
| `views.table.inlineEdit` | `boolean` | `false` | Ativa a edição inline de células. |
| `views.card.active` | `boolean` | `true` | Ativa a view de cards. |
| `views.card.template` | `function` | `null` | Função template de cada card. |
| `views.card.columns` | `number` | `3` | Número de colunas da grelha. |
| `views.card.itemCssClass` | `string` | — | Classes CSS de cada item da grelha (ex.: `'col-md-4 mb-3'`). |
| `views.list.active` | `boolean` | `false` | Ativa a view de lista. |
| `views.list.template` | `function` | `null` | Função template de cada item. |
| `views.kanban.active` | `boolean` | `false` | Ativa a view Kanban. |
| `views.kanban.groupBy` | `string` | `''` | Campo usado para agrupar em colunas (**obrigatório**). |
| `views.kanban.allowDragDrop` | `boolean` | `false` | Permite arrastar cards entre colunas. |
| `views.kanban.cardTemplate` | `function` | `null` | Template personalizado dos cards. |

> ⚠️ A view de cards vem **ativa por defeito**. Para uma tabela sem cards, define `card: { active: false }`.

#### Exemplo: view de cards

```javascript
views: {
    card: {
        active: true,
        columns: 4,
        itemCssClass: 'col-md-3 mb-3',
        template: function(item, index, instance) {
            return `<div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${item.nome}</h5>
                    <p class="card-text">${item.email}</p>
                    <span class="badge bg-primary">${item.departamento}</span>
                </div>
            </div>`;
        }
    }
}
```

Exemplos: [`02-cards.html`](../versions/dataBox-2.0.0-dist/docs/examples/02-cards.html) · [`05-multiplas-views.html`](../versions/dataBox-2.0.0-dist/docs/examples/05-multiplas-views.html)

### Colunas

A configuração de colunas é o coração da view de tabela. Cada coluna é um objeto com propriedades que controlam o comportamento, a apresentação e a interação.

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `data` | `string` | — | Chave do campo nos dados (**obrigatório**; suporta notação ponto: `'endereco.cidade'`). |
| `title` | `string` | valor de `data` | Título exibido no cabeçalho. |
| `render` | `function` | `null` | `function(valor, item, tipo)` — `tipo` pode ser `'display'` ou `'export'`. |
| `className` | `string` | `''` | Classes CSS da célula. |
| `visible` | `boolean` | `true` | Coluna visível por defeito. |
| `orderable` | `boolean` | `true` | Permite ordenação nesta coluna. |
| `searchable` | `boolean` | `true` | Inclui esta coluna na pesquisa global. |
| `editable` | `boolean` | `false` | Permite edição inline. |
| `editType` | `string` | `'text'` | Tipo de input: `text`, `number`, `date`, `select`, `checkbox`. |
| `editOptions` | `Array` | `[]` | Opções para `editType: 'select'`, no formato `{value, label}`. |
| `footer` | `string \| object \| function` | `null` | Agregação no rodapé. |

#### Renderizadores personalizados

```javascript
{
    data: 'salario',
    title: 'Salário',
    render: function(valor, item, tipo) {
        if (tipo === 'export') return valor + ' EUR';
        return `<span class="text-success fw-bold">${valor.toLocaleString('pt-PT')} €</span>`;
    }
}
```

### Paginação

Três modos: paginada (clássica), `virtual` (scroll com reciclagem de DOM) e `infinite` (scroll com *append*).

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `pagination.type` | `string` | `'paginated'` | `paginated`, `virtual` ou `infinite`. |
| `pagination.limit` | `number` | `10` | Registos por página/lote. |
| `pagination.limits` | `Array` | `[10,25,50,100]` | Opções do seletor de limite. |
| `pagination.limiter` | `boolean` | `true` | Mostra o seletor "Mostrar X registos". |
| `pagination.maxButtons` | `number` | `5` | Máximo de botões numéricos visíveis. |
| `pagination.showFirstLast` | `boolean` | `true` | Botões "Primeiro" e "Último". |
| `pagination.showInfo` | `boolean` | `true` | Texto "A mostrar X a Y de Z". |
| `pagination.scrollDirection` | `string` | `'vertical'` | `vertical` ou `horizontal` (virtual/infinite). |
| `pagination.scrollSize` | `string \| null` | `null` | Altura/largura máxima do contentor. |

### Pesquisa

Três níveis: global (toolbar), por coluna (inputs no cabeçalho) e avançada ([Query Builder](#query-builder)).

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `search.active` | `boolean` | `true` | Ativa a pesquisa. |
| `search.global` | `boolean` | `true` | Input de pesquisa global na toolbar. |
| `search.perColumn` | `boolean` | `false` | Inputs de pesquisa por coluna. |
| `search.debounce` | `number` | `300` | Tempo de *debounce* em ms. |
| `search.placeholder` | `string \| null` | `null` | Placeholder do input global. |
| `search.fields` | `Array` | `[]` | Campos a pesquisar (vazio = todos). |

Exemplo: [`06-pesquisa-filtros.html`](../versions/dataBox-2.0.0-dist/docs/examples/06-pesquisa-filtros.html)

### Ordenação

Ordenação multi-coluna: clique simples para ordenar por uma coluna, **Shift+clique** para acrescentar colunas à ordenação.

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `sorting.active` | `boolean` | `true` | Ativa a ordenação. |
| `sorting.multiColumn` | `boolean` | `true` | Permite ordenação multi-coluna. |
| `sorting.serverSide` | `boolean` | `false` | Ordenação delegada ao servidor. |

```javascript
db.sort('nome', 'asc');   // Ordena por nome ascendente
db.clearSort();           // Limpa todas as ordenações
```

### Exportação

Exporta os dados filtrados (ou todos) para 5 formatos. O dropdown de exportação aparece automaticamente na toolbar.

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `export.active` | `boolean` | `false` | Ativa a exportação. |
| `export.buttons` | `Array` | `['copy','csv','excel','pdf','print']` | Botões disponíveis. |
| `export.filename` | `string` | `'databox-export'` | Nome do ficheiro (sem extensão). |
| `export.title` | `string \| null` | `null` | Título no PDF/impressão. |
| `export.orientation` | `string` | `'portrait'` | `portrait` ou `landscape`. |
| `export.pageSize` | `string` | `'A4'` | Tamanho de página do PDF. |

Exemplo: [`11-exportacao.html`](../versions/dataBox-2.0.0-dist/docs/examples/11-exportacao.html)

### Seleção e ações em massa

Seleciona registos individualmente ou em massa e executa ações sobre o conjunto selecionado.

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `selection.active` | `boolean` | `false` | Ativa a seleção. |
| `selection.mode` | `string` | `'single'` | `single` ou `multi`. |
| `selection.checkbox` | `boolean` | `true` | Mostra a coluna de checkboxes. |
| `bulkActions.active` | `boolean` | `false` | Ativa as ações em massa. |
| `bulkActions.actions` | `Array` | `[]` | Lista de ações disponíveis. |

```javascript
bulkActions: {
    active: true,
    actions: [
        {
            label: 'Eliminar',
            icon: 'fa-trash',
            class: 'btn-danger',
            action: function(items, ids, instance) {
                if (confirm('Eliminar ' + ids.length + ' registos?')) {
                    // Chamar a API para eliminar
                    instance.reload();
                }
            }
        }
    ]
}
```

Exemplo: [`08-selecao-acoes.html`](../versions/dataBox-2.0.0-dist/docs/examples/08-selecao-acoes.html)

### AJAX e server-side

O DataBox suporta processamento *client-side* (dados em memória) e *server-side* (dados processados no servidor). O formato de resposta segue a convenção do DataTables.

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `ajax.url` | `string` | `''` | URL do endpoint. |
| `ajax.method` | `string` | `'GET'` | Método HTTP. |
| `ajax.dataType` | `string` | `'json'` | Tipo de dados esperado. |
| `ajax.headers` | `object` | `{}` | Cabeçalhos HTTP personalizados. |
| `ajax.params` | `object` | `{}` | Parâmetros extra enviados. |
| `ajax.serverSide` | `boolean` | `false` | Ativa o processamento server-side. |
| `ajax.beforeSend` | `function` | `null` | `function(xhr, params)` |
| `ajax.success` | `function` | `null` | `function(response, instance)` |
| `ajax.error` | `function` | `null` | `function(xhr, status, error)` |
| `ajax.complete` | `function` | `null` | `function(xhr, instance)` |

#### Formato de resposta server-side

```javascript
{
    data: [ /* array de objetos */ ],
    recordsTotal: 1000,     // Total de registos sem filtrar
    recordsFiltered: 150    // Total após filtros
}
```

Exemplo: [`13-ajax-server-side.html`](../versions/dataBox-2.0.0-dist/docs/examples/13-ajax-server-side.html) (servidor simulado no browser, sem backend).

---

## Funcionalidades

### Query Builder

Interface visual para construir pesquisas complexas com grupos aninhados, operadores avançados e lógica AND/OR.

```javascript
queryBuilder: {
    active: true,
    columns: [   // Colunas disponíveis no builder
        { data: 'nome', title: 'Nome' },
        { data: 'salario', title: 'Salário' }
    ]
}
```

#### Operadores disponíveis

- `equals` / `notEquals` — igual / diferente
- `contains` — contém substring
- `startsWith` / `endsWith` — começa / termina com
- `greaterThan` / `lessThan` / `greaterOrEqual` / `lessOrEqual` — comparadores numéricos
- `isEmpty` / `isNotEmpty` — vazio / não vazio
- `between` — entre dois valores (separados por vírgula)

### Filtros rápidos

Filtros pré-configurados que aparecem acima da tabela como dropdowns, botões ou inputs de data.

```javascript
quickFilters: {
    active: true,
    filters: [
        {
            type: 'dropdown',   // 'dropdown' | 'buttons' | 'date'
            field: 'departamento',
            label: 'Departamento',
            options: [
                { value: 'TI', label: 'Tecnologia' },
                { value: 'RH', label: 'Recursos Humanos' }
            ]
        }
    ]
}
```

### Row Details

Expande uma linha para mostrar informação adicional. Funciona em todas as views (tabela, card, lista).

```javascript
views: {
    table: {
        active: true,
        details: function(item, instance) {
            return `<div class="row">
                <div class="col-md-6"><strong>Morada:</strong> ${item.morada || 'N/A'}</div>
                <div class="col-md-6"><strong>Telefone:</strong> ${item.telefone || 'N/A'}</div>
            </div>`;
        }
    }
}
```

Exemplo: [`03-lista-detalhes.html`](../versions/dataBox-2.0.0-dist/docs/examples/03-lista-detalhes.html)

### Row Grouping

Agrupa linhas por um campo, com cabeçalhos e rodapés personalizáveis. Suporta colapsar/expandir grupos.

```javascript
rowGroup: {
    active: true,
    dataSrc: 'departamento',       // Campo para agrupar
    collapse: true,                // Permite colapsar grupos
    startRender: function(groupName, rows, instance) {
        // HTML do cabeçalho do grupo (opcional)
    },
    endRender: function(groupName, rows, instance) {
        // HTML do rodapé do grupo (opcional)
    }
}
```

Exemplo: [`09-agrupamento-agregacoes.html`](../versions/dataBox-2.0.0-dist/docs/examples/09-agrupamento-agregacoes.html)

### Edição inline

Edita células diretamente com duplo clique. Suporta validação via callbacks e vários tipos de input.

```javascript
views: {
    table: {
        inlineEdit: true,
        columns: [
            {
                data: 'estado',
                editable: true,
                editType: 'select',
                editOptions: [
                    { value: 'ativo', label: 'Ativo' },
                    { value: 'inativo', label: 'Inativo' }
                ]
            }
        ]
    }
}
```

#### Callback de edição

```javascript
callbacks: {
    onEdit: function(newValue, oldValue, item, column, instance) {
        // Enviar a alteração para o servidor
        fetch('/api/atualizar', {
            method: 'POST',
            body: JSON.stringify({ id: item.id, campo: column.data, valor: newValue })
        });
    }
}
```

Exemplo: [`07-edicao-inline.html`](../versions/dataBox-2.0.0-dist/docs/examples/07-edicao-inline.html)

### Colunas visíveis e reordenar

Permite ao utilizador mostrar/esconder colunas e reordená-las por drag & drop. O estado é guardado automaticamente se `stateSave` estiver ativo.

```javascript
views: {
    table: {
        columnVisibility: true,   // Dropdown para mostrar/esconder
        columnReorder: true       // Drag & drop de colunas
    }
}
```

### Colunas fixas

Fixa colunas à esquerda e/ou à direita durante o scroll horizontal. Usa `position: sticky` para desempenho nativo.

```javascript
views: {
    table: {
        fixedColumns: {
            left: 2,    // Primeiras 2 colunas fixas
            right: 1    // Última coluna fixa
        }
    }
}
```

Exemplo: [`10-colunas.html`](../versions/dataBox-2.0.0-dist/docs/examples/10-colunas.html)

### Agregações no rodapé

Calcula sumários automaticamente no rodapé da tabela: soma, média, contagem, mínimo e máximo. Requer `views.table.footer: true`.

```javascript
{
    data: 'salario',
    title: 'Salário',
    footer: {
        type: 'sum',                  // 'sum' | 'avg' | 'count' | 'min' | 'max'
        prefix: 'Total: ',
        suffix: ' €',
        locale: 'pt-PT',
        format: function(valor, items, col, instance) {
            return 'Total: ' + valor.toLocaleString('pt-PT') + ' €';
        }
    }
}
```

### Virtual e infinite scroll

Para grandes volumes de dados, evita a paginação tradicional usando scroll contínuo. O modo `virtual` recicla elementos DOM; o `infinite` faz *append*.

```javascript
pagination: {
    type: 'infinite',             // 'paginated' | 'virtual' | 'infinite'
    limit: 20,
    scrollDirection: 'vertical',  // 'vertical' | 'horizontal'
    scrollSize: '600px'           // Altura máxima do contentor
}
```

Exemplo: [`12-scroll-infinito.html`](../versions/dataBox-2.0.0-dist/docs/examples/12-scroll-infinito.html)

### Kanban com drag and drop

Organiza dados em colunas com arrastar e largar nativo. Atualiza os dados automaticamente e dispara o callback `onKanbanDrop`.

```javascript
views: {
    kanban: {
        active: true,
        groupBy: 'estado',            // Campo que define as colunas
        allowDragDrop: true,
        columnHeader: function(groupName, count, instance) {
            return `<div class="d-flex justify-content-between">
                <strong>${groupName}</strong>
                <span class="badge bg-primary">${count}</span>
            </div>`;
        }
    }
}
```

Exemplo: [`04-kanban.html`](../versions/dataBox-2.0.0-dist/docs/examples/04-kanban.html)

---

## Avançado

### Estado persistente

Guarda automaticamente a view atual, a página, a ordenação, a pesquisa, as colunas visíveis, a reordenação e os detalhes expandidos. Restaura tudo na visita seguinte.

```javascript
stateSave: {
    active: true,
    duration: 7200,               // Tempo em segundos (2 h)
    storage: 'localStorage',      // 'localStorage' | 'sessionStorage'
    saveCallback: function(key, state, instance) {
        // Personalizar onde guardar (ex.: backend)
    },
    loadCallback: function(key, state, instance) {
        // Personalizar o carregamento
    }
}
```

### Internacionalização

Suporte nativo para Português (`pt-PT`) e Inglês (`en-US`). Todos os textos da interface são configuráveis.

```javascript
language: 'pt-PT'   // 'pt-PT' | 'en-US'
```

#### Textos personalizáveis (excerto)

| Chave | pt-PT | en-US |
| --- | --- | --- |
| `search` | Pesquisar... | Search... |
| `info` | A mostrar _START_ a _END_ de _TOTAL_ registros | Showing _START_ to _END_ of _TOTAL_ entries |
| `emptyTable` | Nenhum registro encontrado | No data available |
| `buttons.copy` | Copiar | Copy |
| `queryBuilder.title` | Pesquisa Avançada | Advanced Search |

Exemplo: [`14-estado-idioma.html`](../versions/dataBox-2.0.0-dist/docs/examples/14-estado-idioma.html)

### Callbacks

Eventos disponíveis para interagir com o ciclo de vida do DataBox. Passam-se dentro de `callbacks: { ... }`.

| Callback | Argumentos | Disparado quando… |
| --- | --- | --- |
| `onInitialized` | `(instance)` | A instância é inicializada. |
| `onDataLoaded` | `(data, instance)` | Os dados são carregados (AJAX ou client-side). |
| `onViewChanged` | `(viewName, instance)` | A view muda. |
| `onPageChanged` | `(page, instance)` | A página muda. |
| `onSearch` | `(term, instance)` | Uma pesquisa é executada. |
| `onSort` | `(sortColumns, instance)` | A ordenação muda. |
| `onRowClick` | `(item, $element, event)` | Há clique num item. |
| `onSelectionChanged` | `(ids, items)` | A seleção muda. |
| `onRowExpand` | `(item, index, instance)` | Os detalhes são expandidos. |
| `onRowCollapse` | `(item, index, instance)` | Os detalhes são colapsados. |
| `onColumnReorder` | `(columnOrder, instance)` | As colunas são reordenadas. |
| `onColumnVisibility` | `(colData, visible, instance)` | A visibilidade de uma coluna muda. |
| `onEdit` | `(newVal, oldVal, item, col, instance)` | Uma célula é editada. |
| `onKanbanDrop` | `(item, oldGroup, newGroup, instance)` | Um card é movido no Kanban. |
| `onBulkAction` | `(actionLabel, items, ids, instance)` | Uma ação em massa é executada. |
| `onError` | `(xhr, status, error)` | Ocorre um erro de AJAX. |
| `onStateSave` | `(state, instance)` | O estado é guardado. |
| `onStateLoad` | `(state, instance)` | O estado é carregado. |

---

## API

### API pública

Métodos disponíveis após a inicialização, para controlo programático.

| Método | Retorno | Descrição |
| --- | --- | --- |
| `setView(view)` | `this` | Altera a view ativa. |
| `search(term)` | `this` | Define a pesquisa global e recarrega. |
| `clearSearch()` | `this` | Limpa todas as pesquisas e filtros. |
| `setPage(page)` | `this` | Vai para a página indicada. |
| `reload()` | `this` | Recarrega os dados a partir da página 1. |
| `sort(column, direction)` | `this` | Ordena por coluna. |
| `clearSort()` | `this` | Limpa as ordenações. |
| `getData()` | `Array` | Devolve os itens da página atual. |
| `getAllData()` | `Array` | Devolve todos os itens (client-side). |
| `getTotalItems()` | `number` | Total de registos filtrados. |
| `getCurrentPage()` | `number` | Página atual. |
| `getTotalPages()` | `number` | Total de páginas. |
| `getSelectedItems()` | `Array` | Itens selecionados. |
| `getSelectedIds()` | `Array` | IDs dos itens selecionados. |
| `clearSelection()` | `this` | Limpa a seleção. |
| `addItem(item)` | `this` | Adiciona um item e recarrega. |
| `removeItem(id \| fn)` | `this` | Remove item(s) e recarrega. |
| `updateItem(id, updates)` | `this` | Atualiza um item e recarrega. |
| `setAjaxParams(params)` | `this` | Atualiza os parâmetros AJAX. |
| `clearState()` | `this` | Limpa o estado guardado. |
| `destroy()` | `void` | Destrói a instância e limpa o DOM. |

#### DataBox global

```javascript
DataBox.getInstance('meus-dados');   // Obtém a instância por ID
DataBox.destroy('meus-dados');       // Destrói a instância por ID
```

> 💡 Todos os métodos que devolvem `this` suportam *chaining*: `db.search('Ana').setPage(1).setView('card')`.

---

## Segurança nos templates

Os templates (`render`, `template`, `details`, `startRender`, `endRender`, `columnHeader`, `cardTemplate`) devolvem **HTML**. Se os dados vierem de utilizadores ou de uma API que não controlas, **escapa os valores** antes de os interpolares, para evitar XSS:

```javascript
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

template: (item) => `<h5 class="card-title">${esc(item.nome)}</h5>`
```

Os exemplos do repositório usam este padrão (`ExamplesKit.esc`).

---

**© Syntax Serenity** · [www.syntaxserenity.co.ao](https://www.syntaxserenity.co.ao) · *confiança em cada linha de código.*
