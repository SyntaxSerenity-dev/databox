# Arquitetura do Repositório — DataBox

Este ficheiro documenta a estrutura de pastas usada neste repositório, para
servir de referência ao criar/organizar bibliotecas JS de portfólio
semelhantes (padrão Syntax Serenity).

```
dataBox/
├── 📁 versions/                       # Todas as versões publicadas, isoladas por pasta
│   │
│   ├── 📁 dataBox-1.0.0-dist/         # Versão 1.0.0 — autónoma, com código, build e documentação
│   │   ├── 📁 src/                    # Código-fonte original (legível, comentado) — onde se desenvolve
│   │   │   ├── 📄 dataBox.js              # Core: tabela, cartões, kanban, ordenação, pesquisa, paginação
│   │   │   └── 📁 plugins/                # Extensões opcionais (ex.: exportação, SearchBuilder, SearchPanes)
│   │   │
│   │   ├── 📁 dist/                   # Ficheiros gerados pelo build — não editar à mão
│   │   │   ├── 📄 dataBox.js              # Cópia legível do src, útil para depurar via CDN
│   │   │   ├── 📄 dataBox.min.js          # Versão minificada (terser) — a usada pelos exemplos e pelo CDN
│   │   │   └── 📁 plugins/                # Plugins já compilados/minificados
│   │   │
│   │   └── 📁 docs/                   # Site oficial: demonstração + documentação da API
│   │       ├── 📁 examples/               # Uma página HTML por vista ou funcionalidade
│   │       └── 📁 assets/                 # Recursos estáticos do site
│   │           ├── 📁 css/                    # Estilos da documentação e dos exemplos
│   │           └── 📁 img/                    # Imagens, ícones e capturas de ecrã
│   │
│   └── 📁 dataBox-2.0.0-dist/         # Versão 2.0.0 — mesma organização da 1.0.0
│       ├── 📁 src/                    # Código-fonte da 2.0.0
│       │   ├── 📄 dataBox.js
│       │   └── 📁 plugins/
│       ├── 📁 dist/                   # Build da 2.0.0 (dataBox.js, dataBox.min.js, plugins/)
│       └── 📁 docs/                   # Documentação e exemplos da 2.0.0 (examples/, assets/)
│
├── 📄 .gitignore                      # Ficheiros ignorados pelo Git (node_modules, logs, temporários)
├── 📄 CHANGELOG.md                    # Histórico de alterações por versão (formato Keep a Changelog)
├── 📄 LICENSE                         # Licença MIT
├── 📄 package.json                    # Metadados do projeto e script de build (terser)
├── 📄 README.md                       # Apresentação, instalação e uso rápido (página inicial do repo)
└── 📄 STRUCTURE.md                    # Este ficheiro: mapa das pastas e ficheiros do repositório
```

## Porquê separar `src/` de `dist/`

- **`src/`** é o código-fonte legível, com comentários — é aqui que se edita.
- **`dist/`** são os ficheiros prontos a consumir (minificados) — é **daqui**
  que as páginas de exemplo e o CDN (jsDelivr) vão buscar o ficheiro, nunca
  do `src/`.
- É o mesmo padrão usado por bibliotecas como Bootstrap, jQuery, etc.

## Porquê `docs/` e não `demo/` ou `site/`

Chamando a pasta `docs/`, o **GitHub Pages** pode ser ativado diretamente a
partir dela:

> Settings → Pages → Branch: `main` → Folder: `/docs`

O GitHub aloja a página oficial automaticamente em:
`https://syntaxserenity-dev.github.io/<nome-do-repo>/`

— sem precisar de servidor externo.

## Como gerar os ficheiros `dist/` (build)

```bash
npm install          # instala o terser (devDependency)
npm run build         # gera dist/dataBox.min.js e dist/plugins/*.min.js
```

O script está definido em `package.json` → `scripts.build`, e usa o `terser`
para minificar mantendo os comentários de `@license` e `@version`.

## Como servir o JS direto do GitHub (produção)

**Não usar** `raw.githubusercontent.com` — não tem `Content-Type` correto
para JS e não é pensado para servir ficheiros em produção.

**Usar o jsDelivr** (CDN gratuito, espelha qualquer repositório público):

```html
<!-- Sempre a última versão da branch main -->
<script src="https://cdn.jsdelivr.net/gh/<user>/<repo>@main/dist/dataBox.min.js"></script>

<!-- Fixado a uma versão/tag específica (recomendado em produção) -->
<script src="https://cdn.jsdelivr.net/gh/<user>/<repo>@v2.0.0/dist/dataBox.min.js"></script>
```

Para a versão com tag funcionar, é preciso criar tags/releases no GitHub:

```bash
git tag v2.0.0
git push --tags
```

## Checklist ao criar um novo projeto de biblioteca

- [ ] Criar repositório público, nome em kebab-case
- [ ] Descrição curta com emoji (padrão dos outros repositórios)
- [ ] Estrutura `src/` + `dist/` + `docs/`
- [ ] `README.md`, `LICENSE` (MIT), `CHANGELOG.md`, `.gitignore`, `package.json`
- [ ] Corrigir cabeçalho do(s) ficheiro(s) `.js`: `@license`, `@package`, `@author`, `@link` (GitHub)
- [ ] Gerar `dist/*.min.js` via `npm run build`
- [ ] Ativar GitHub Pages a partir de `/docs`
- [ ] Criar tag de versão (`git tag vX.Y.Z && git push --tags`)
- [ ] Adicionar ao "Destaques" do LinkedIn depois de publicado
