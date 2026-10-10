/**
 * ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                                                                   ║
 * ║  ███████╗██╗   ██╗███╗   ██╗████████╗ █████╗ ██╗  ██╗███████╗█████╗██████╗ █████╗███╗   ██╗██╗████████╗██╗   ██╗  ║
 * ║  ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝██╔══██╗╚██╗██╔╝██╔════╝██╔══╝██╔══██╗██╔══╝████╗  ██║██║╚══██╔══╝╚██╗ ██╔╝  ║
 * ║  ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║   ███████║ ╚███╔╝ ███████╗█████╗██████╔╝█████╗██╔██╗ ██║██║   ██║    ╚████╔╝   ║
 * ║  ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║   ██╔══██║ ██╔██╗ ╚════██║██╔══╝██╔══██╗██╔══╝██║╚██╗██║██║   ██║     ╚██╔╝    ║
 * ║  ███████║   ██║   ██║ ╚████║   ██║   ██║  ██║██╔╝ ██╗███████║█████╗██║  ██║█████╗██║ ╚████║██║   ██║      ██║     ║
 * ║  ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚════╝╚═╝  ╚═╝╚════╝╚═╝  ╚═══╝╚═╝   ╚═╝      ╚═╝     ║
 * ║                                       T R U S T   I N   E V E R Y   L I N E                                       ║
 * ║                                                   O F   C O D E                                                   ║
 * ║                                                                                                                   ║
 * ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
 *
 * Class: ExamplesKit
 *
 * DESCRIPTION:
 *   Utilitário das páginas de exemplos do DataBox 2.0.0. Fornece os dados fictícios, o servidor
 *   AJAX simulado, o registo de eventos e a montagem da navegação e do painel de código, para
 *   cada página de exemplo conter apenas o HTML do palco e o código do DataBox que demonstra.
 *
 * DESIGN PATTERN:
 *   Pattern Principal: Module Pattern (IIFE) que expõe um único objeto global, window.ExamplesKit
 *   Padrões Secundários: Catalogue (lista única de exemplos) e Facade (API pública mínima)
 *
 * FEATURES:
 *   Dados fictícios reprodutíveis: employees(), tasks(), generateRows(n)
 *   Servidor AJAX simulado em mock://, sem backend: installMockServer()
 *   Registo de eventos na página: log()
 *   Escape de HTML para templates: esc()
 *   Montagem automática da navegação, do cabeçalho e do painel de código (a partir do <script id="demo">)
 *
 * DEPENDENCIES:
 *   jQuery 3.6+ (apenas para installMockServer)
 *   window.DataBox (apenas verificado, para mostrar aviso se faltar)
 *
 * REQUIREMENTS:
 *   Navegadores com ES2015+ (Object.assign, Array.prototype.findIndex), URLSearchParams e Intl
 *   Deve ser carregado no fim do <body>, depois do <main id="ex-main"> e antes do <script id="demo">
 *
 * @package      docs/assets/js
 * @category     Utility (Examples Support)
 * @version      2.0.0
 * @since        2026-10-08
 * @license      MIT
 * @company      DataBox
 * @development  company: syntax serenity
 * @email        fs.developerfullstack@gmail.com
 * @link         https://www.syntaxserenity.co.ao
 * @link         https://github.com/SyntaxSerenity-dev/databox
 */
(function (window, document) {
    'use strict';

    /**
     * CONSTANT: REPO_URL
     * PURPOSE: URL base do repositório oficial do DataBox no GitHub
     * USAGE: Ligações da barra de navegação das páginas de exemplo
     * @var string
     */
    var REPO_URL = 'https://github.com/SyntaxSerenity-dev/databox';

    /**
     * CONSTANT: REFERENCE_URL
     * PURPOSE: URL da referência técnica em Markdown (enquanto o site oficial não está online)
     * USAGE: Ligação "Referência" da barra de navegação. `HEAD` resolve para o ramo por defeito.
     * @var string
     */
    var REFERENCE_URL = REPO_URL + '/blob/HEAD/docs/DATABOX_REFERENCE_v2.0.0.md';

    /**
     * CONSTANT: CATALOGUE
     * PURPOSE: Lista ordenada de todos os exemplos — fonte única de títulos, descrições e ordem
     * USAGE: Gera o índice (index.html), o cabeçalho de cada página e a navegação anterior/seguinte
     *
     * Estrutura de cada entrada:
     * - 'id'    : valor de <body data-example="..."> na página correspondente
     * - 'file'  : nome do ficheiro HTML dentro de docs/examples/
     * - 'group' : secção do índice onde o exemplo aparece
     * - 'icon'  : classe Font Awesome 6 (estilo solid)
     * - 'title' / 'lead' : título e frase de contexto mostrados no topo da página
     * - 'tags'  : opções/métodos do DataBox que o exemplo demonstra
     *
     * @var Array<{id:string,file:string,group:string,icon:string,title:string,lead:string,tags:string[]}>
     */
    var CATALOGUE = [
        { id: 'tabela', file: '01-tabela.html', group: 'Vistas', icon: 'fa-table', title: 'Tabela',
          lead: 'Colunas personalizadas, pesquisa global, ordenação multi-coluna e paginação com uma única chamada a DataBox.init().',
          tags: ['views.table', 'columns', 'render', 'pagination'] },
        { id: 'cards', file: '02-cards.html', group: 'Vistas', icon: 'fa-id-card', title: 'Cards personalizados',
          lead: 'Cada registo desenhado com o teu próprio template HTML, numa grelha com o número de colunas à escolha.',
          tags: ['views.card', 'template', 'columns', 'itemCssClass'] },
        { id: 'lista-detalhes', file: '03-lista-detalhes.html', group: 'Vistas', icon: 'fa-list', title: 'Lista com detalhes',
          lead: 'Lista compacta com template próprio e uma área de detalhes que se expande em cada linha.',
          tags: ['views.list', 'template', 'details', 'setView'] },
        { id: 'kanban', file: '04-kanban.html', group: 'Vistas', icon: 'fa-table-columns', title: 'Kanban com drag & drop',
          lead: 'Agrupa os registos em colunas por um campo e deixa arrastar os cards entre colunas. Cada movimento aparece no registo de eventos.',
          tags: ['views.kanban', 'groupBy', 'allowDragDrop', 'onKanbanDrop'] },
        { id: 'multiplas-views', file: '05-multiplas-views.html', group: 'Vistas', icon: 'fa-layer-group', title: 'Várias views com alternador',
          lead: 'Ativa as quatro views ao mesmo tempo. O utilizador alterna na interface e o código pode fazer o mesmo com setView().',
          tags: ['table', 'card', 'list', 'kanban', 'setView', 'onViewChanged'] },
        { id: 'pesquisa-filtros', file: '06-pesquisa-filtros.html', group: 'Pesquisa e filtros', icon: 'fa-magnifying-glass', title: 'Pesquisa e filtros',
          lead: 'Pesquisa global e por coluna, filtros rápidos e o Query Builder para condições avançadas com AND/OR.',
          tags: ['search', 'perColumn', 'quickFilters', 'queryBuilder', 'clearSearch'] },
        { id: 'edicao-inline', file: '07-edicao-inline.html', group: 'Edição e seleção', icon: 'fa-pen-to-square', title: 'Edição inline',
          lead: 'Duplo clique numa célula para a editar. Cada coluna escolhe o tipo de input e o callback onEdit recebe o valor novo e o antigo.',
          tags: ['inlineEdit', 'editable', 'editType', 'onEdit'] },
        { id: 'selecao-acoes', file: '08-selecao-acoes.html', group: 'Edição e seleção', icon: 'fa-square-check', title: 'Seleção e ações em massa',
          lead: 'Seleciona vários registos com checkboxes e executa ações sobre o conjunto: alterar estado ou eliminar.',
          tags: ['selection', 'bulkActions', 'updateItem', 'removeItem', 'onSelectionChanged'] },
        { id: 'agrupamento-agregacoes', file: '09-agrupamento-agregacoes.html', group: 'Colunas, grupos e exportação', icon: 'fa-object-group', title: 'Agrupamento e agregações',
          lead: 'Linhas agrupadas por departamento, com cabeçalho e rodapé de grupo, e totais calculados no rodapé da tabela.',
          tags: ['rowGroup', 'startRender', 'endRender', 'footer', 'sum', 'avg', 'count'] },
        { id: 'colunas', file: '10-colunas.html', group: 'Colunas, grupos e exportação', icon: 'fa-table-list', title: 'Colunas visíveis, ordem e fixas',
          lead: 'Mostra e esconde colunas, reordena-as por drag & drop e fixa as extremidades durante o scroll horizontal.',
          tags: ['columnVisibility', 'columnReorder', 'fixedColumns', 'visible'] },
        { id: 'exportacao', file: '11-exportacao.html', group: 'Colunas, grupos e exportação', icon: 'fa-file-export', title: 'Exportação',
          lead: 'Copiar, CSV, Excel, PDF e impressão a partir dos dados filtrados, com um render próprio para a exportação.',
          tags: ['export', 'buttons', 'filename', 'orientation', "render('export')"] },
        { id: 'scroll-infinito', file: '12-scroll-infinito.html', group: 'Desempenho, dados e estado', icon: 'fa-infinity', title: 'Scroll virtual e infinito',
          lead: '5 000 registos sem paginação clássica. Compara o modo virtual (recicla o DOM) com o infinito (acrescenta lotes).',
          tags: ['pagination.type', 'virtual', 'infinite', 'scrollSize'] },
        { id: 'ajax-server-side', file: '13-ajax-server-side.html', group: 'Desempenho, dados e estado', icon: 'fa-cloud-arrow-down', title: 'AJAX e server-side',
          lead: 'Pesquisa, ordenação e paginação delegadas a um servidor. Aqui o servidor é simulado no browser, por isso funciona sem backend.',
          tags: ['ajax', 'serverSide', 'setAjaxParams', 'reload', 'onDataLoaded'] },
        { id: 'estado-idioma', file: '14-estado-idioma.html', group: 'Desempenho, dados e estado', icon: 'fa-language', title: 'Estado persistente e idioma',
          lead: 'A tabela lembra a página, a pesquisa e a ordenação entre visitas, e todos os textos mudam entre pt-PT e en-US.',
          tags: ['stateSave', 'language', 'clearState', 'onStateSave'] }
    ];

    /**
     * CONSTANT: pendingLog
     * PURPOSE: Guarda mensagens de log emitidas antes de o painel de registo existir
     * USAGE: Preenchido por ExamplesKit.log() e descarregado por mountChrome()
     * @var string[]
     */
    var pendingLog = [];

    /**
     * Cache do conjunto de dados de exemplo, para devolver sempre a mesma referência.
     * @var Array|null $employeesCache
     * @example employeesCache = generateRows(24)
     */
    var employeesCache = null;

    /**
     * Indica se o servidor simulado já foi registado no jQuery (evita registos duplicados).
     * @var boolean $mockInstalled
     */
    var mockInstalled = false;

    /**
     * FUNCTION PURPOSE: Escapa caracteres especiais de HTML num valor antes de o inserir num template
     *
     * DESCRIPTION:
     *    - Converte & < > " ' nas entidades HTML correspondentes
     *    - Aceita qualquer tipo; null/undefined tornam-se string vazia
     *
     * ERROR HANDLING:
     *    - Valor nulo ou indefinido → devolve ''
     *
     * @function   esc
     * @param  mixed   $value  Valor a escapar (texto, número, null)
     * @return string  Texto seguro para interpolar em HTML
     *
     * @since     2026-10-08
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
     */
    function esc(value) {
        if (value === null || value === undefined) { return ''; }
        return String(value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    }

    /**
     * FUNCTION PURPOSE: Gera registos de colaboradores fictícios, sempre iguais para o mesmo `count`
     *
     * DESCRIPTION:
     *    - Usa um gerador pseudo-aleatório com semente fixa (mulberry32), por isso a tabela
     *      tem o mesmo conteúdo em cada visita e as capturas de ecrã são reprodutíveis
     *    - Todos os dados são inventados: nomes, e-mails (domínio example.com) e salários
     *
     * BUSINESS LOGIC:
     *    1. Inicializa o gerador com a semente fixa
     *    2. Combina nome próprio e apelido por índice, garantindo 60 pares únicos
     *    3. Sorteia departamento, cargo, cidade, estado, salário e data de admissão
     *    4. Devolve o array de objetos com o esquema descrito abaixo
     *
     * ERROR HANDLING:
     *    - `count` inválido ou menor que 1 → devolve array vazio
     *
     * @function   generateRows
     * @param  number  $count  Quantidade de registos a gerar
     * @return Array<{id:number,nome:string,email:string,departamento:string,cargo:string,
     *                cidade:string,salario:number,estado:string,admissao:string}>
     *
     * @since     2026-10-08
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
     */
    function generateRows(count) {
        var total = parseInt(count, 10);
        if (!total || total < 1) { return []; }

        var seed = 20261008;
        var rand = function () {
            seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
            var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        var pick = function (list) { return list[Math.floor(rand() * list.length)]; };
        var slug = function (text) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); };

        var first = ['Ana', 'Bruno', 'Carla', 'Diogo', 'Eva', 'Fábio', 'Graça', 'Hugo', 'Inês', 'João',
                     'Kátia', 'Luís', 'Marta', 'Nuno', 'Olga', 'Paulo', 'Rita', 'Sérgio', 'Teresa', 'Vasco'];
        var last = ['Silva', 'Costa', 'Mendes', 'Ferreira', 'Santos', 'Pereira', 'Gomes', 'Martins', 'Rocha', 'Lopes', 'Carvalho', 'Neves'];
        var roles = {
            'TI': ['Developer', 'DevOps', 'Analista de sistemas'],
            'RH': ['Técnica de RH', 'Recrutador'],
            'Financeiro': ['Contabilista', 'Controller'],
            'Marketing': ['Designer', 'Gestor de conteúdo'],
            'Operações': ['Coordenador', 'Analista de logística']
        };
        var departments = Object.keys(roles);
        var cities = ['Luanda', 'Benguela', 'Huambo', 'Lobito', 'Lubango'];
        var states = ['ativo', 'ativo', 'ativo', 'ferias', 'inativo'];
        var from = Date.UTC(2018, 0, 1), span = Date.UTC(2026, 5, 30) - from;

        var rows = [];
        for (var i = 0; i < total; i++) {
            var name = first[i % first.length] + ' ' + last[i % last.length];
            var dept = pick(departments);
            rows.push({
                id: i + 1,
                nome: name,
                email: slug(name).replace(' ', '.') + '@example.com',
                departamento: dept,
                cargo: pick(roles[dept]),
                cidade: pick(cities),
                salario: 600 + Math.floor(rand() * 58) * 50,
                estado: pick(states),
                admissao: new Date(from + Math.floor(rand() * span)).toISOString().slice(0, 10)
            });
        }
        return rows;
    }

    /**
     * FUNCTION PURPOSE: Devolve os 24 colaboradores de exemplo usados na maioria das páginas
     *
     * DESCRIPTION:
     *    - Gera o conjunto uma só vez e reutiliza-o nas chamadas seguintes
     *    - Devolve uma cópia superficial para que `addItem`/`removeItem` não alterem a origem
     *
     * @function   employees
     * @return Array  Ver esquema em generateRows()
     *
     * @since     2026-10-08
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
     */
    function employees() {
        if (!employeesCache) { employeesCache = generateRows(24); }
        return employeesCache.map(function (row) { return Object.assign({}, row); });
    }

    /**
     * FUNCTION PURPOSE: Devolve 12 tarefas de exemplo, distribuídas por 4 estados, para o Kanban
     *
     * DESCRIPTION:
     *    - O campo `estado` define as colunas do quadro: Por fazer, Em curso, Em revisão, Concluído
     *    - Os títulos são genéricos e não refletem nenhum projeto real
     *
     * @function   tasks
     * @return Array<{id:number,titulo:string,responsavel:string,prioridade:string,estado:string}>
     *
     * @since     2026-10-08
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
     */
    function tasks() {
        var T = 'Por fazer', C = 'Em curso', R = 'Em revisão', D = 'Concluído';
        return [
            { id: 1,  titulo: 'Desenhar o ecrã de login',        responsavel: 'Ana Silva',    prioridade: 'alta',  estado: T },
            { id: 2,  titulo: 'Definir o modelo de dados',       responsavel: 'Bruno Costa',  prioridade: 'alta',  estado: T },
            { id: 3,  titulo: 'Escrever o guia de instalação',   responsavel: 'Carla Mendes', prioridade: 'baixa', estado: T },
            { id: 4,  titulo: 'Implementar a pesquisa global',   responsavel: 'Diogo Ferreira', prioridade: 'média', estado: C },
            { id: 5,  titulo: 'Ligar a exportação para Excel',   responsavel: 'Eva Santos',   prioridade: 'média', estado: C },
            { id: 6,  titulo: 'Rever as cores do tema escuro',   responsavel: 'Fábio Pereira', prioridade: 'baixa', estado: C },
            { id: 7,  titulo: 'Testar o scroll virtual',         responsavel: 'Graça Gomes',  prioridade: 'alta',  estado: R },
            { id: 8,  titulo: 'Validar a edição inline',         responsavel: 'Hugo Martins', prioridade: 'média', estado: R },
            { id: 9,  titulo: 'Atualizar o changelog',           responsavel: 'Inês Rocha',   prioridade: 'baixa', estado: R },
            { id: 10, titulo: 'Publicar a versão 2.0.0',         responsavel: 'João Lopes',   prioridade: 'alta',  estado: D },
            { id: 11, titulo: 'Corrigir a paginação nas views',  responsavel: 'Kátia Carvalho', prioridade: 'média', estado: D },
            { id: 12, titulo: 'Criar as páginas de exemplos',    responsavel: 'Luís Neves',   prioridade: 'média', estado: D }
        ];
    }

    /**
     * FUNCTION PURPOSE: Acrescenta uma linha ao painel "Registo de eventos" da página
     *
     * DESCRIPTION:
     *    - Mostra a hora e a mensagem, com a entrada mais recente no topo
     *    - Mantém no máximo 40 linhas para o painel não crescer indefinidamente
     *    - Se o painel ainda não existir, guarda a mensagem e mostra-a quando ele for criado
     *
     * ERROR HANDLING:
     *    - Painel ausente (página sem `data-log`) → a mensagem vai apenas para a consola
     *
     * @function   log
     * @param  string  $message  Texto do evento (inserido como texto, nunca como HTML)
     * @return void
     *
     * @since     2026-10-08
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
     */
    function log(message) {
        var panel = document.getElementById('ex-log');
        if (!panel) {
            pendingLog.push(String(message));
            if (typeof console !== 'undefined') { console.log('[DataBox exemplo]', message); }
            return;
        }
        var empty = panel.querySelector('.ex-log__empty');
        if (empty) { empty.remove(); }
        var item = document.createElement('div');
        item.className = 'ex-log__item';
        var time = document.createElement('time');
        time.textContent = new Date().toLocaleTimeString('pt-PT');
        item.appendChild(time);
        item.appendChild(document.createTextNode(String(message)));
        panel.insertBefore(item, panel.firstChild);
        while (panel.children.length > 40) { panel.removeChild(panel.lastChild); }
    }

    /**
     * FUNCTION PURPOSE: Regista no jQuery um "servidor" que responde a pedidos AJAX para `mock://...`
     *
     * DESCRIPTION:
     *    - Intercepta, via $.ajaxTransport, apenas URLs com o esquema `mock://`; todos os outros
     *      pedidos seguem o caminho normal do jQuery
     *    - Aplica pesquisa, filtro por departamento, ordenação e paginação a 240 registos gerados
     *      localmente e responde no formato `{ draw, data, recordsTotal, recordsFiltered }`
     *    - Lê os parâmetros segundo a convenção DataTables (start, length, search[value],
     *      order[0][column], columns[n][data]), com alternativas `page`/`limit`/`search`
     *
     * BUSINESS LOGIC:
     *    1. Junta os parâmetros da query string e do corpo do pedido
     *    2. Filtra por texto de pesquisa e por `departamento`
     *    3. Ordena pela coluna e direção pedidas, se existirem
     *    4. Corta a página pedida (start/length) e devolve o JSON após a latência simulada
     *
     * ERROR HANDLING:
     *    - jQuery ausente → lança Error com instrução para carregar o jQuery antes de examples.js
     *    - Chamadas repetidas → ignoradas (o transporte regista-se uma só vez)
     *
     * DEPENDENCIES:
     *    - jQuery 3.6+ ($.ajaxTransport)
     *    - generateRows(): origem dos registos
     *
     * @function   installMockServer
     * @param  {latency?: number}  $options  Latência simulada em ms (padrão: 300)
     * @return void
     * @throws Error  Quando o jQuery não está disponível
     *
     * @since     2026-10-08
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
     */
    function installMockServer(options) {
        var $ = window.jQuery;
        if (!$ || !$.ajaxTransport) { throw new Error('installMockServer: carrega o jQuery antes de examples.js.'); }
        if (mockInstalled) { return; }
        mockInstalled = true;

        var latency = (options && options.latency) || 300;
        var dataset = generateRows(240);

        $.ajaxTransport('+*', function (settings) {
            if (!/^mock:\/\//.test(settings.url)) { return; }
            return {
                send: function (headers, complete) {
                    var payload = answer(settings.url, settings.data);
                    window.setTimeout(function () {
                        complete(200, 'OK', { text: JSON.stringify(payload) }, 'Content-Type: application/json');
                    }, latency);
                },
                abort: function () {}
            };
        });

        function answer(url, body) {
            var query = (url.split('?')[1] || '') + '&' + (typeof body === 'string' ? body : '');
            var params = new URLSearchParams(query);
            var read = function () {
                for (var i = 0; i < arguments.length; i++) {
                    var value = params.get(arguments[i]);
                    if (value !== null && value !== '') { return value; }
                }
                return '';
            };

            var limit = parseInt(read('length', 'limit'), 10) || 10;
            var start = read('start') !== '' ? parseInt(read('start'), 10)
                                              : ((parseInt(read('page'), 10) || 1) - 1) * limit;
            var term = read('search[value]', 'search', 'q').toLowerCase();
            var dept = read('departamento');

            var rows = dataset.filter(function (row) {
                if (dept && row.departamento !== dept) { return false; }
                return !term || [row.nome, row.email, row.departamento, row.cargo, row.cidade]
                    .join(' ').toLowerCase().indexOf(term) !== -1;
            });

            var column = read('order[0][column]');
            var field = column !== '' ? read('columns[' + column + '][data]') : '';
            if (field) {
                var factor = read('order[0][dir]') === 'desc' ? -1 : 1;
                rows.sort(function (a, b) {
                    var x = a[field], y = b[field];
                    return (typeof x === 'number' ? x - y : String(x).localeCompare(String(y), 'pt')) * factor;
                });
            }

            return {
                draw: parseInt(read('draw'), 10) || 0,
                data: rows.slice(start, start + limit),
                recordsTotal: dataset.length,
                recordsFiltered: rows.length
            };
        }
    }

    /**
     * FUNCTION PURPOSE: Constrói à volta do conteúdo da página a barra de navegação, o cabeçalho,
     *                   o painel de código e a navegação anterior/seguinte
     *
     * DESCRIPTION:
     *    - Lê `<body data-example="...">` para saber qual entrada do CATALOGUE desenha
     *    - Cria tudo à volta do palco sem o mover, para o DataBox poder renderizar
     *      no elemento original antes ou depois deste código
     *    - No índice, gera a grelha de exemplos agrupada por secção
     *
     * BUSINESS LOGIC:
     *    1. Localiza a entrada do catálogo e o elemento <main id="ex-main">
     *    2. Insere a barra de navegação no início do <body>
     *    3. Insere o cabeçalho (título, frase e tags) no início do <main>
     *    4. Se a página tem `data-log`, acrescenta o painel de registo e descarrega mensagens pendentes
     *    5. Acrescenta o painel de código (preenchido quando o DOM termina de carregar)
     *    6. Acrescenta a navegação anterior/seguinte
     *    7. Se jQuery ou DataBox faltarem, mostra um aviso com a causa provável
     *
     * ERROR HANDLING:
     *    - `data-example` sem entrada no catálogo → não faz nada
     *    - Biblioteca em falta → aviso visível na página (em vez de falha silenciosa)
     *
     * DEPENDENCIES:
     *    - CATALOGUE, REPO_URL, REFERENCE_URL, esc(), log(), showSource()
     *
     * @function   mountChrome
     * @return void
     *
     * @since     2026-10-08
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
     */
    function mountChrome() {
        var id = document.body.getAttribute('data-example');
        var main = document.getElementById('ex-main');
        var isIndex = id === 'index';
        var index = CATALOGUE.findIndex(function (item) { return item.id === id; });
        if (!main || (!isIndex && index < 0)) { return; }
        var entry = CATALOGUE[index];

        var nav = document.createElement('header');
        nav.className = 'ex-nav';
        nav.innerHTML =
            '<div class="container ex-nav__in">' +
            '<a class="ex-brand" href="index.html"><img src="../assets/img/databox-logo.svg" alt="DataBox" height="26"><span>Exemplos</span></a>' +
            '<nav class="ex-nav__links" aria-label="Principal">' +
            '<a href="index.html">Todos os exemplos</a>' +
            '<a href="' + REFERENCE_URL + '" target="_blank" rel="noopener">Referência</a>' +
            '<a href="' + REPO_URL + '" target="_blank" rel="noopener" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>' +
            '</nav></div>';
        document.body.insertBefore(nav, document.body.firstChild);

        var hero = document.createElement('div');
        hero.className = 'ex-hero';

        if (isIndex) {
            hero.innerHTML = '<h1>Exemplos do DataBox</h1><p>' + CATALOGUE.length +
                ' páginas, uma por vista ou funcionalidade. Cada uma mostra o resultado e o código que o produz.</p>';
            main.appendChild(hero);
            var groups = [];
            CATALOGUE.forEach(function (item) { if (groups.indexOf(item.group) < 0) { groups.push(item.group); } });
            groups.forEach(function (group) {
                var section = document.createElement('section');
                section.className = 'ex-group';
                section.innerHTML = '<h2>' + esc(group) + '</h2><div class="ex-grid">' +
                    CATALOGUE.filter(function (item) { return item.group === group; }).map(function (item) {
                        return '<a class="ex-tile" href="' + item.file + '"><i class="fa-solid ' + item.icon + '"></i>' +
                               '<strong>' + esc(item.title) + '</strong><span>' + esc(item.lead) + '</span></a>';
                    }).join('') + '</div>';
                main.appendChild(section);
            });
            return;
        }

        document.title = entry.title + ' — Exemplos DataBox';
        hero.innerHTML = '<h1>' + esc(entry.title) + '</h1><p>' + esc(entry.lead) + '</p><div class="ex-tags">' +
            entry.tags.map(function (tag) { return '<span class="ex-tag">' + esc(tag) + '</span>'; }).join('') + '</div>';
        main.insertBefore(hero, main.firstChild);

        if (main.hasAttribute('data-log')) {
            var wrap = document.createElement('section');
            wrap.className = 'ex-log-wrap';
            wrap.innerHTML = '<h2>Registo de eventos</h2><div class="ex-log" id="ex-log" aria-live="polite">' +
                '<div class="ex-log__empty">Interage com o exemplo para veres os callbacks aqui.</div></div>';
            main.appendChild(wrap);
            pendingLog.splice(0).forEach(log);
        }

        var source = document.createElement('section');
        source.className = 'ex-source';
        source.innerHTML = '<div class="ex-source__bar"><span>JavaScript</span>' +
            '<button type="button" class="ex-source__copy">Copiar</button></div><pre id="ex-source"></pre>';
        main.appendChild(source);

        var prev = CATALOGUE[index - 1], next = CATALOGUE[index + 1];
        var pager = document.createElement('nav');
        pager.className = 'ex-pager';
        pager.setAttribute('aria-label', 'Exemplos anteriores e seguintes');
        pager.innerHTML = (prev ? '<a href="' + prev.file + '">&larr; ' + esc(prev.title) + '</a>' : '<span></span>') +
                          (next ? '<a href="' + next.file + '">' + esc(next.title) + ' &rarr;</a>' : '<span></span>');
        main.appendChild(pager);

        if (!window.jQuery || !window.DataBox) {
            var alert = document.createElement('div');
            alert.className = 'ex-alert';
            alert.setAttribute('role', 'alert');
            alert.innerHTML = '<strong>Não foi possível carregar o DataBox.</strong> Confirma que existe ' +
                '<code>dist/dataBox.min.js</code> ao lado da pasta <code>docs/</code> (ver <code>docs/README.md</code>) ' +
                'e que tens ligação à internet para o jQuery e o Bootstrap.';
            main.insertBefore(alert, main.querySelector('.ex-stage'));
        }
    }

    /**
     * FUNCTION PURPOSE: Mostra no painel de código o texto do `<script id="demo">` da própria página
     *
     * DESCRIPTION:
     *    - O código que corre é exatamente o código que se vê, sem duplicação a manter
     *    - Remove a indentação comum e as linhas em branco do início e do fim
     *    - O botão "Copiar" usa a Clipboard API quando disponível
     *
     * ERROR HANDLING:
     *    - Página sem `#demo` ou sem `#ex-source` → não faz nada
     *    - Clipboard API indisponível ou recusada → o botão mostra "Seleciona e copia"
     *
     * @function   showSource
     * @return void
     *
     * @since     2026-10-08
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
     */
    function showSource() {
        var script = document.getElementById('demo');
        var target = document.getElementById('ex-source');
        if (!script || !target) { return; }

        var lines = script.textContent.replace(/\r/g, '').split('\n');
        while (lines.length && !lines[0].trim()) { lines.shift(); }
        while (lines.length && !lines[lines.length - 1].trim()) { lines.pop(); }
        var indent = Math.min.apply(null, lines.filter(function (l) { return l.trim(); })
            .map(function (l) { return l.match(/^\s*/)[0].length; }));
        var code = lines.map(function (l) { return l.slice(indent); }).join('\n');
        target.textContent = code;

        var button = document.querySelector('.ex-source__copy');
        if (!button) { return; }
        button.addEventListener('click', function () {
            var done = function (label) { button.textContent = label; window.setTimeout(function () { button.textContent = 'Copiar'; }, 1600); };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(code).then(function () { done('Copiado'); }, function () { done('Seleciona e copia'); });
            } else { done('Seleciona e copia'); }
        });
    }

    /**
     * Espaço de nomes público usado pelas páginas de exemplo.
     * @var Object ExamplesKit
     */
    window.ExamplesKit = {
        esc: esc,
        employees: employees,
        tasks: tasks,
        generateRows: generateRows,
        log: log,
        installMockServer: installMockServer
    };

    // O chrome é montado já (este script está no fim do <body>, depois do <main>);
    // o código-fonte só depois do DOM completo, porque o <script id="demo"> vem a seguir.
    mountChrome();
    document.addEventListener('DOMContentLoaded', showSource);
})(window, document);
