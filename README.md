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
#   Documentação principal do repositório do DataBox: apresenta a biblioteca, mostra como instalar e
#   usar, lista os exemplos e a documentação disponíveis e descreve a estrutura do repositório.
# 
# @package      ./
# @category     Documentation (General Overview)
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
<div align="center">

# DataBox

**Tabelas, cards, listas e Kanban numa só API.**

Biblioteca de visualização de dados flexível e multi-vista, com pesquisa, edição inline, exportação e suporte PT/EN. 

![Versão](https://img.shields.io/badge/vers%C3%A3o-2.0.0-6366f1) ![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-10b981) ![jQuery](https://img.shields.io/badge/jQuery-3.6%2B-0868ac) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3%2B-7952b3) ![Idiomas](https://img.shields.io/badge/idiomas-PT%20%7C%20EN-f59e0b)

</div>

---

> 🚧 **O site de documentação ainda não está online. Chega em breve.**
> Entretanto, tudo o que precisas está neste repositório:
> 📖 [Referência técnica](docs/DATABOX_REFERENCE_v2.0.0.md) · 🧪 [Exemplos interativos](versions/dataBox-2.0.0-dist/docs/examples/index.html) (descarrega o repositório e abre o ficheiro no browser)

---

## ✨ Funcionalidades

| | |
| --- | --- |
| **4 views nativas** | Tabela, cards, lista e Kanban. O utilizador alterna entre elas e o código também (`setView`). |
| **Kanban com drag & drop** | Agrupa por qualquer campo, arrasta cards entre colunas e recebe o evento `onKanbanDrop`. |
| **Pesquisa em 3 níveis** | Global, por coluna e Query Builder com grupos aninhados e lógica AND/OR. Filtros rápidos incluídos. |
| **Edição inline** | Duplo clique numa célula, com inputs de texto, número, data, select e checkbox. |
| **Exportação** | Copiar, CSV, Excel, PDF e impressão. |
| **Grandes volumes** | Paginação clássica, scroll virtual ou infinito, e processamento server-side por AJAX. |
| **Tabelas avançadas** | Row grouping, agregações no rodapé, colunas fixas, visíveis e reordenáveis. |
| **Estado persistente** | Lembra a view, a página, a pesquisa e a ordenação entre visitas. |
| **PT/EN** | Todos os textos da interface em `pt-PT` e `en-US`, e personalizáveis. |

## 📦 Instalação

O DataBox requer **jQuery 3.6+** e **Bootstrap 5.3+**.

### Descarregar

1. Clona ou descarrega este repositório.
2. Usa os ficheiros de [`versions/dataBox-2.0.0-dist/dist/`](versions/dataBox-2.0.0-dist/dist/): `dataBox.js` (legível, útil para depurar) ou `dataBox.min.js` (minificado).

```bash
git clone https://github.com/SyntaxSerenity-dev/databox.git
```

### CDN (jsDelivr, a partir do GitHub)

Fixa sempre uma versão em produção, para evitar alterações inesperadas.

```html
<script src="https://cdn.jsdelivr.net/gh/SyntaxSerenity-dev/databox@v2.0.0/versions/dataBox-2.0.0-dist/dist/dataBox.min.js"></script>
```

> O pacote npm ainda não foi publicado. Quando estiver disponível, esta secção será atualizada.

## 🚀 Início rápido

```html
<!-- Dependências -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- DataBox -->
<script src="dist/dataBox.min.js"></script>

<div id="meus-dados"></div>

<script>
    const db = DataBox.init({
        target: '#meus-dados',
        data: funcionarios,
        views: {
            table: { active: true, columns: [
                { data: 'nome', title: 'Nome' },
                { data: 'departamento', title: 'Departamento' }
            ] },
            card: { active: true },
            kanban: { active: true, groupBy: 'departamento' }
        },
        search: { active: true },
        export: { active: true }
    });

    db.setView('kanban');   // alterna por código
</script>
```

## 🧪 Exemplos

14 páginas interativas, uma por vista ou funcionalidade, em [`versions/dataBox-2.0.0-dist/docs/examples/`](versions/dataBox-2.0.0-dist/docs/examples/index.html). Cada uma mostra o resultado e o código que o produz.

| Exemplo | O que demonstra |
| --- | --- |
| [Tabela](versions/dataBox-2.0.0-dist/docs/examples/01-tabela.html) | Colunas, render, pesquisa, ordenação e paginação |
| [Cards](versions/dataBox-2.0.0-dist/docs/examples/02-cards.html) | Template próprio e grelha configurável |
| [Lista com detalhes](versions/dataBox-2.0.0-dist/docs/examples/03-lista-detalhes.html) | Lista compacta e linhas expansíveis |
| [Kanban](versions/dataBox-2.0.0-dist/docs/examples/04-kanban.html) | Drag & drop e callback `onKanbanDrop` |
| [Várias views](versions/dataBox-2.0.0-dist/docs/examples/05-multiplas-views.html) | Alternador e `setView()` |
| [Pesquisa e filtros](versions/dataBox-2.0.0-dist/docs/examples/06-pesquisa-filtros.html) | Por coluna, filtros rápidos e Query Builder |
| [Edição inline](versions/dataBox-2.0.0-dist/docs/examples/07-edicao-inline.html) | Tipos de input e callback `onEdit` |
| [Seleção e ações em massa](versions/dataBox-2.0.0-dist/docs/examples/08-selecao-acoes.html) | Checkboxes e `bulkActions` |
| [Agrupamento e agregações](versions/dataBox-2.0.0-dist/docs/examples/09-agrupamento-agregacoes.html) | `rowGroup` e rodapé com totais |
| [Colunas](versions/dataBox-2.0.0-dist/docs/examples/10-colunas.html) | Visíveis, reordenáveis e fixas |
| [Exportação](versions/dataBox-2.0.0-dist/docs/examples/11-exportacao.html) | Copy, CSV, Excel, PDF e impressão |
| [Scroll virtual e infinito](versions/dataBox-2.0.0-dist/docs/examples/12-scroll-infinito.html) | 5 000 registos sem paginação |
| [AJAX e server-side](versions/dataBox-2.0.0-dist/docs/examples/13-ajax-server-side.html) | Servidor simulado, sem backend |
| [Estado e idioma](versions/dataBox-2.0.0-dist/docs/examples/14-estado-idioma.html) | `stateSave` e `pt-PT`/`en-US` |

## 📖 Documentação

- [**Referência técnica da v2.0.0**](docs/DATABOX_REFERENCE_v2.0.0.md): todas as opções, callbacks e métodos da API.
- [Guia da pasta `docs/`](versions/dataBox-2.0.0-dist/docs/README.md): como abrir os exemplos e como acrescentar um novo.

## 🆕 Novidades da v2.0.0

- **Novo:** Kanban com drag & drop nativo e callback `onKanbanDrop`.
- **Novo:** virtual scroll bidirecional para listas com milhares de registos.
- **Novo:** row grouping com agregações por grupo.
- **Novo:** edição inline completa, com callback `onEdit`.
- **Melhorado:** o estado persistente guarda também as colunas visíveis e a ordenação.
- **Corrigido:** a paginação já não reinicia ao alternar entre views.
- ⚠️ **Incompatível:** requer jQuery 3.6+ e Bootstrap 5.3+. Confirma as versões do teu projeto antes de atualizar.

## 🗂️ Estrutura do repositório

```text
📁 dataBox/
├── 📁 versions/                       # Todas as versões publicadas, isoladas por pasta
│   ├── 📁 dataBox-1.0.0-dist/         # Versão 1.0.0 — código, build e documentação
│   └── 📁 dataBox-2.0.0-dist/         # Versão 2.0.0 — código, build e documentação
│       ├── 📁 src/                    # Código-fonte (legível, comentado) — onde se desenvolve
│       │   ├── 📄 dataBox.js              # Core: views, ordenação, pesquisa, paginação
│       │   └── 📁 plugins/                # Extensões opcionais
│       ├── 📁 dist/                   # Gerado pelo build — não editar à mão
│       │   ├── 📄 dataBox.js              # Cópia legível do src
│       │   ├── 📄 dataBox.min.js          # Minificado — o usado pelos exemplos e pelo CDN
│       │   └── 📁 plugins/                # Plugins compilados
│       └── 📁 docs/                   # Exemplos interativos
│           ├── 📄 README.md               # Como abrir e estender os exemplos
│           ├── 📁 examples/               # Uma página HTML por vista ou funcionalidade
│           └── 📁 assets/                 # css/, js/ e img/ partilhados pelos exemplos
├── 📁 docs/                           # Documentação de cada versão em Markdown
│   └── 📄 DATABOX_REFERENCE_v2.0.0.md     # Referência técnica da v2.0.0
├── 📄 .gitignore
├── 📄 LICENSE                         # Licença MIT
├── 📄 README.md                       # Este ficheiro
└── 📄 SECURITY.md                     # Política de segurança
```

## 🌐 Compatibilidade

| Requisito | Versão |
| --- | --- |
| jQuery | 3.6 ou superior |
| Bootstrap | 5.3 ou superior |
| Font Awesome | 6.x (opcional, usado nos ícones) |
| Browsers | Versões atuais de Chrome, Edge, Firefox e Safari |

## 🤝 Contribuir e segurança

- Encontraste um erro ou tens uma ideia? Abre uma [issue](https://github.com/SyntaxSerenity-dev/databox/issues).
- Para reportar uma vulnerabilidade, segue a [política de segurança](SECURITY.md) em vez de abrir uma issue pública.
- Se os dados dos templates vierem de utilizadores, escapa o HTML. Ver [Segurança nos templates](docs/DATABOX_REFERENCE_v2.0.0.md#segurança-nos-templates).

## ⚖️ Licença

Distribuído sob a licença **MIT**: podes usar, modificar e distribuir em projetos pessoais e comerciais. Ver [LICENSE](LICENSE).


## 👤 Autor

**Fanilton F. Samuel**

**Syntax Serenity**

- GitHub: [@SyntaxSerenity-dev](https://github.com/SyntaxSerenity-dev)
- E-mail: fs.developerfullstack@gmail.com
- Website: [syntaxserenity.co.ao](https://www.syntaxserenity.co.ao)


---

<div align="center">

**Desenvolvido pela [Syntax Serenity](https://www.syntaxserenity.co.ao)** · *confiança em cada linha de código.*

</div>
