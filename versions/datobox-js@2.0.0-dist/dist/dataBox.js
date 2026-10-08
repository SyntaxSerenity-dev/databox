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
 * ║                                              O F   C O D E                                                        ║
 * ║                                                                                                                   ║
 * ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
 *
 * File: dataBox.js
 *
 * DESCRIPTION:
 *   Biblioteca principal (core) da plataforma dataBox.co.ao — implementa a
 *   visualização e gestão de conjuntos de dados em múltiplos formatos (cartões,
 *   tabela, lista, kanban), com pesquisa, filtros, ordenação, paginação,
 *   seleção, edição inline e exportação, tudo configurável através de um único
 *   objeto de configuração passado a `DataBox.init()`. É o ficheiro que
 *   qualquer sistema cliente carrega para obter a biblioteca dataBox; plugins
 *   (ex.: dataBox_tree.js) estendem-na sem a modificar, através do mecanismo
 *   de vistas customizadas (`views.<nome>.renderer`).
 *
 * FEATURES:
 *   - Vistas: card, tabela, lista, kanban e vistas customizadas plugáveis
 *   - Client-side e server-side (paginação/pesquisa/ordenação no servidor)
 *   - Pesquisa global/por coluna, Query Builder e filtros rápidos
 *   - Seleção com ações em massa, edição inline, drag & drop, exportação e persistência de estado
 *
 * @package       assets/js
 * @category      UI Library (Data Grid)
 * @version       2.0.0
 * @since         2026-09-25
 * @license       Proprietary
 * @development   company: syntax serenity
 * @email         fs.developerfullstack@gmail.com
 * @link          https://www.syntaxserenity.co.ao
*/
(function($) {
 'use strict';
   
 // ============================================================
 // CONSTANTES E CONFIGURAÇÕES GLOBAIS
 // ============================================================
 const DEFAULT_LANGUAGE = {
     'pt-PT': {
         search: 'Pesquisar...',
         searchGlobal: 'Pesquisa global',
         searchColumn: 'Pesquisar na coluna',
         lengthMenu: 'Mostrar _MENU_ registros',
         info: 'A mostrar _START_ a _END_ de _TOTAL_ registros',
         infoEmpty: 'A mostrar 0 a 0 de 0 registros',
         infoFiltered: '(filtrado de _MAX_ registros no total)',
         loading: 'A carregar...',
         emptyTable: 'Nenhum registro encontrado',
         zeroRecords: 'Nenhum registro correspondente encontrado',
         paginate: {
             first: 'Primeiro',
             previous: 'Anterior',
             next: 'Seguinte',
             last: 'Último'
         },
         buttons: {
             copy: 'Copiar',
             csv: 'CSV',
             excel: 'Excel',
             pdf: 'PDF',
             print: 'Imprimir'
         },
         sort: {
             asc: 'Ordenação crescente ativa',
             desc: 'Ordenação decrescente ativa',
             none: 'Clique para ordenar'
         },
         queryBuilder: {
             title: 'Pesquisa Avançada',
             addCondition: 'Adicionar Condição',
             addGroup: 'Adicionar Grupo',
             remove: 'Remover',
             where: 'Onde',
             and: 'E',
             or: 'OU',
             operators: {
                 equals: 'é igual a',
                 notEquals: 'é diferente de',
                 contains: 'contém',
                 startsWith: 'começa com',
                 endsWith: 'termina com',
                 greaterThan: 'maior que',
                 lessThan: 'menor que',
                 greaterOrEqual: 'maior ou igual a',
                 lessOrEqual: 'menor ou igual a',
                 isEmpty: 'está vazio',
                 isNotEmpty: 'não está vazio',
                 between: 'entre',
                 notBetween: 'não está entre'
             }
         },
         quickFilters: 'Filtros Rápidos',
         apply: 'Aplicar',
         reset: 'Limpar',
         close: 'Fechar',
         bulkActions: {
             selected: '_COUNT_ selecionado(s)',
             selectAll: 'Selecionar todos',
             clear: 'Limpar seleção'
         },
         rowDetails: {
             expand: 'Expandir detalhes',
             collapse: 'Colapsar detalhes'
         },
         columns: {
             title: 'Colunas',
             visibility: 'Visibilidade',
             reorder: 'Reordenar'
         },
         editing: {
             save: 'Guardar',
             cancel: 'Cancelar',
             edit: 'Editar'
         },
         kanban: {
             addCard: 'Adicionar cartão',
             moveTo: 'Mover para'
         },
         loadingMore: 'A carregar mais...',
         noMoreData: 'Não há mais registros'
     },
     'en-US': {
         search: 'Search...',
         searchGlobal: 'Global search',
         searchColumn: 'Search column',
         lengthMenu: 'Show _MENU_ entries',
         info: 'Showing _START_ to _END_ of _TOTAL_ entries',
         infoEmpty: 'Showing 0 to 0 of 0 entries',
         infoFiltered: '(filtered from _MAX_ total entries)',
         loading: 'Loading...',
         emptyTable: 'No data available',
         zeroRecords: 'No matching records found',
         paginate: {
             first: 'First',
             previous: 'Previous',
             next: 'Next',
             last: 'Last'
         },
         buttons: {
             copy: 'Copy',
             csv: 'CSV',
             excel: 'Excel',
             pdf: 'PDF',
             print: 'Print'
         },
         sort: {
             asc: 'Ascending sort active',
             desc: 'Descending sort active',
             none: 'Click to sort'
         },
         queryBuilder: {
             title: 'Advanced Search',
             addCondition: 'Add Condition',
             addGroup: 'Add Group',
             remove: 'Remove',
             where: 'Where',
             and: 'AND',
             or: 'OR',
             operators: {
                 equals: 'equals',
                 notEquals: 'does not equal',
                 contains: 'contains',
                 startsWith: 'starts with',
                 endsWith: 'ends with',
                 greaterThan: 'greater than',
                 lessThan: 'less than',
                 greaterOrEqual: 'greater or equal',
                 lessOrEqual: 'less or equal',
                 isEmpty: 'is empty',
                 isNotEmpty: 'is not empty',
                 between: 'between',
                 notBetween: 'not between'
             }
         },
         quickFilters: 'Quick Filters',
         apply: 'Apply',
         reset: 'Reset',
         close: 'Close',
         bulkActions: {
             selected: '_COUNT_ selected',
             selectAll: 'Select all',
             clear: 'Clear selection'
         },
         rowDetails: {
             expand: 'Expand details',
             collapse: 'Collapse details'
         },
         columns: {
             title: 'Columns',
             visibility: 'Visibility',
             reorder: 'Reorder'
         },
         editing: {
             save: 'Save',
             cancel: 'Cancel',
             edit: 'Edit'
         },
         kanban: {
             addCard: 'Add card',
             moveTo: 'Move to'
         },
         loadingMore: 'Loading more...',
         noMoreData: 'No more records'
     }
 };
 
 const SORT_DIRECTIONS = ['none', 'asc', 'desc'];
 
 // ============================================================
 // NAMESPACE GLOBAL
 // ============================================================
 window.DataBox = {
     instances: {},
     version: '2.0.0', 
   
     /**
         * FUNCTION PURPOSE: Cria (ou substitui) uma instância do DataBox ligada a um elemento alvo.
         *
         * DESCRIPTION:
         *    - Se já existir uma instância ativa para o mesmo alvo, destrói-a primeiro (destroy())
         *    - Regista a nova instância em `DataBox.instances`, indexada pelo id do alvo (sem '#')
         *    - Chama `instance.initialize()` antes de devolver a instância já pronta a usar
         *
         * ERROR HANDLING:
         *    - `config` ausente ou sem `config.target` → regista erro na consola e devolve `null`
         *
         * DEPENDENCIES:
         *    - DataBoxInstance (construtor da classe interna)
         *
         * @function   init
         * @param  {Object}  config  Configuração da instância (ver Class: DataBoxInstance) — `target` é obrigatório
         * @returns {Object|null} A instância criada, ou `null` em caso de configuração inválida
         *
         * @since     2026-09-25
         * @version   2.0.0
         * @author    Syntax Serenity Development Team
     */
     init: function(config) {
         if (!config || !config.target) {
             console.error('DataBox: Nenhum elemento alvo especificado');
             return null;
         } 
         const targetId = config.target.replace('#', ''); 
         // Destruir instância anterior se existir
         if (this.instances[targetId]) {
             this.instances[targetId].destroy();
         } 
         const instance = new DataBoxInstance(targetId, config);
         this.instances[targetId] = instance;
         instance.initialize(); 
         return instance;
     },
   
     /**
         * FUNCTION PURPOSE: Obtém uma instância do DataBox já criada, pelo id do elemento alvo.
         *
         * DESCRIPTION:
         *    - Consulta o registo interno `DataBox.instances`
         *    - Não cria uma nova instância — devolve `null` se ainda não existir nenhuma para esse id
         *
         * @function   getInstance
         * @param  {String}  id  Id do elemento alvo (sem '#')
         * @returns {Object|null} A instância correspondente, ou `null` se não encontrada
         *
         * @since     2026-09-25
         * @version   2.0.0
         * @author    Syntax Serenity Development Team
     */
     getInstance: function(id) {
         return this.instances[id] || null;
     }, 

     /**
         * FUNCTION PURPOSE: Destrói e desregista a instância do DataBox associada a um elemento alvo.
         *
         * DESCRIPTION:
         *    - Chama `instance.destroy()` para limpar eventos, DOM e timers
         *    - Remove a entrada correspondente de `DataBox.instances`
         *
         * @function   destroy
         * @param  {String}  id  Id do elemento alvo (sem '#') cuja instância deve ser destruída
         *
         * @since     2026-09-25
         * @version   2.0.0
         * @author    Syntax Serenity Development Team
     */
     destroy: function(id) {
         if (this.instances[id]) {
             this.instances[id].destroy();
             delete this.instances[id];
         }
     }
 }; 
   
 // ============================================================
 // CLASSE PRINCIPAL
 // ============================================================
   
 /**
     * Class: DataBoxInstance
     *
     * DESCRIPTION:
     *   Representa uma instância viva do DataBox ligada a um elemento alvo do DOM.
     *   Concentra todo o estado (dados, página, vista, pesquisa, ordenação, filtros,
     *   seleção, colunas visíveis/ordenadas) e o comportamento (renderização,
     *   paginação, exportação, edição inline, drag & drop) de uma tabela/grid de
     *   dados configurável. É criada e devolvida por `DataBox.init()` — nunca deve
     *   ser instanciada diretamente pelo consumidor da biblioteca.
     *
     * DESIGN PATTERN:
     *   - Pattern Principal: Prototype — todos os métodos vivem em
     *     DataBoxInstance.prototype, partilhados por todas as instâncias
     *   - Padrões Secundários: Strategy (cada `view` — card/table/list/kanban/custom —
     *     tem a sua própria função de renderização, incluindo vistas plugáveis via
     *     `views.<nome>.renderer`); Observer (sistema de callbacks/eventos: onSearch,
     *     onSort, onSelectionChanged, etc.)
     *
     * FEATURES:
     *   - Múltiplas vistas (card, tabela, lista, kanban) e vistas customizadas plugáveis
     *   - Modo client-side ou server-side (paginação/pesquisa/ordenação feitas no servidor)
     *   - Pesquisa global, pesquisa por coluna e Query Builder (condições e grupos AND/OR)
     *   - Filtros rápidos, ordenação multi-coluna, row grouping e rodapé com agregações
     *   - Seleção single/multiple com ações em massa, edição inline e drag & drop (colunas e kanban)
     *   - Exportação (clipboard, CSV, Excel, PDF, impressão) e persistência de estado (localStorage/sessionStorage)
     *   - Paginação clássica, virtual ou infinita (scroll)
     *
     * DEPENDENCIES:
     *   - jQuery: manipulação de DOM e eventos delegados em toda a instância
     *   - Bootstrap 5 (classes utilitárias e componentes: modal, dropdown, pagination)
     *   - Font Awesome: ícones usados em botões, cabeçalhos e indicadores
     *
     * REQUIREMENTS:
     *   - jQuery e Bootstrap 5 (JS) carregados antes deste ficheiro
     *   - Um elemento no DOM com o id passado em `config.target`
     *
     * @package       assets/js
     * @category      UI Library (Data Grid)
     * @version       2.0.0
     * @since         2026-09-25
     * @license       Proprietary
     * @development   company: syntax serenity
     * @email         fs.developerfullstack@gmail.com
     * @link          https://www.syntaxserenity.co.ao
 */
 function DataBoxInstance(id, config) {
     this.id = id; 
   
     // Merge profundo das configurações
     this.config = this.deepMerge({
         ajax: {
             url: '',
             method: 'GET',
             dataType: 'json',
             headers: {},
             params: {},
             serverSide: false,
             beforeSend: null,
             success: null,
             error: null,
             complete: null
         },
         views: {
             card: {
                 active: true,
                 template: null,
                 columns: 3,
                 cssClass: 'row',
                 itemCssClass: 'col-md-4 mb-3'
             },
             table: {
                 active: false,
                 columns: [],
                 cssClass: 'table table-striped table-hover',
                 responsive: true,
                 sortable: true,
                 details: null,           // Função para renderizar detalhes expandidos
                 columnVisibility: false,  // Mostrar/esconder colunas
                 columnReorder: false,     // Permitir drag & drop de colunas
                 fixedColumns: {
                     left: 0,
                     right: 0
                 },
                 footer: false,            // Agregações no rodapé
                 inlineEdit: false         // Edição inline
             },
             list: {
                 active: false,
                 template: null,
                 cssClass: 'list-group',
                 itemCssClass: 'list-group-item',
                 details: null
             },
             kanban: {
                 active: false,
                 groupBy: '',              // Campo para agrupar em colunas
                 columnHeader: null,       // Função para cabeçalho da coluna
                 cardTemplate: null,       // Template do card no kanban
                 allowDragDrop: false,     // Permitir arrastar entre colunas
                 cssClass: 'row',
                 columnCssClass: 'col-md-4',
                 columnItemCssClass: 'col-12 mb-3'
             }
         },
         pagination: {
             limit: 10,
             limiter: true,
             limits: [10, 25, 50, 100],
             maxButtons: 5,
             showFirstLast: true,
             showInfo: true,
             type: 'paginated',     // 'paginated' | 'virtual' | 'infinite'
             scrollDirection: 'vertical',  // 'vertical' | 'horizontal' (usado em type: 'virtual'/'infinite')
             scrollSize: null              // altura máx. (vertical) ou largura máx. (horizontal); null = usa o default
         },
         language: 'pt-PT',
         search: {
             active: true,
             global: true,
             perColumn: false,
             debounce: 300,
             placeholder: null,
             fields: []
         },
         sorting: {
             active: true,
             multiColumn: true,
             serverSide: false
         },
         export: {
             active: false,
             buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
             filename: 'databox-export',
             title: null,
             orientation: 'portrait',
             pageSize: 'A4'
         },
         queryBuilder: {
             active: false,
             columns: []
         },
         quickFilters: {
             active: false,
             filters: []
         },
         emptyState: {
             message: null,
             icon: 'fas fa-search',
             action: null
         },
         selection: {
             active: false,
             mode: 'single',
             checkbox: true
         },
         bulkActions: {
             active: false,
             actions: []
         },
         rowGroup: {
             active: false,
             dataSrc: '',
             startRender: null,
             endRender: null,
             collapse: true
         },
         stateSave: {
             active: false,
             duration: 7200,
             storage: 'localStorage',  // 'localStorage' | 'sessionStorage'
             saveCallback: null,
             loadCallback: null
         },
         callbacks: {
             onInitialized: null,
             onDataLoaded: null,
             onViewChanged: null,
             onPageChanged: null,
             onSearch: null,
             onSort: null,
             onRowClick: null,
             onSelectionChanged: null,
             onError: null,
             onStateSave: null,
             onStateLoad: null,
             onBulkAction: null,
             onRowExpand: null,
             onRowCollapse: null,
             onColumnReorder: null,
             onColumnVisibility: null,
             onEdit: null,
             onKanbanDrop: null
         },
         cssFramework: 'bootstrap5'
     }, config || {});
   
     // Estado interno
     this.currentView = this.getDefaultView();
     this.currentPage = 1;
     this.totalPages = 0;
     this.totalItems = 0;
     this.items = [];
     this.allItems = [];
     this.searchTerm = '';
     this.columnSearch = {};
     this.sortColumns = [];
     this.queryBuilderRules = null;
     this.activeQuickFilters = {};
     this.selectedItems = new Set();
     this.isLoading = false;
     this.lang = this.getLanguage(); 
        
     // State saving
     this.stateKey = 'databox_' + this.id; 
        
     // Row details
     this.expandedRows = new Set(); 

     // Column visibility/reorder
     this.columnOrder = [];
     this.columnVisibility = {}; 

     // Virtual/Infinite scroll
     this.virtualOffset = 0;
     this.isLoadingMore = false;
     this.hasMoreData = true; 

     // Kanban
     this.kanbanColumns = []; 

     // Row grouping
     this.groupedData = {}; 

     // Elementos DOM
     this.$target = $('#' + id);
     this.$wrapper = null;
     this.$toolbar = null;
     this.$filterContainer = null;
     this.$headerContainer = null;
     this.$bodyContainer = null;
     this.$paginationContainer = null;
     this.$infoContainer = null;
     this.$exportContainer = null;
     this.$queryBuilderModal = null;
     this.$bulkActionsBar = null;
     this.$columnDropdown = null; 

     // Timers
     this.searchDebounceTimer = null;
     this.columnSearchTimers = {};
 } 
   
 // ============================================================
 // UTILITÁRIOS
 // ============================================================

 /**
     * FUNCTION PURPOSE: Faz um merge profundo (deep merge) de duas configurações, sem mutar os objetos originais.
     *
     * DESCRIPTION:
     *    - Percorre cada chave de `source` e copia-a para uma cópia rasa de `target`
     *    - Quando o valor é um objeto simples (não array), o merge é aplicado recursivamente
     *    - Valores primitivos, arrays e funções em `source` substituem diretamente o valor de `target`
     *
     * DEPENDENCIES:
     *    - this.deepMerge(): chamada recursivamente para sub-objetos
     *
     * @function   deepMerge
     * @param  {Object}  target  Objeto base (ex.: configuração default do DataBox)
     * @param  {Object}  source  Objeto com os valores a sobrepor (ex.: configuração do utilizador)
     * @returns {Object} Novo objeto resultante do merge, sem alterar `target` nem `source`
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.deepMerge = function(target, source) {
     const output = Object.assign({}, target);
     if (!source) return output; 
     for (const key in source) {
         if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
             output[key] = this.deepMerge(target[key] || {}, source[key]);
         } else {
             output[key] = source[key];
         }
     }
     return output;
 };
   
 /**
     * FUNCTION PURPOSE: Obtém o dicionário de traduções ativo para esta instância.
     *
     * DESCRIPTION:
     *    - Lê `config.language` (ex.: 'pt-PT', 'en-US')
     *    - Faz fallback para 'pt-PT' quando o idioma configurado não existe em DEFAULT_LANGUAGE
     *
     * @function   getLanguage
     * @returns {Object} Objeto com todas as strings de interface traduzidas
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getLanguage = function() {
     const lang = this.config.language || 'pt-PT';
     return DEFAULT_LANGUAGE[lang] || DEFAULT_LANGUAGE['pt-PT'];
 };
   
 /**
     * FUNCTION PURPOSE: Escapa texto para inserção segura em HTML, prevenindo XSS.
     *
     * DESCRIPTION:
     *    - Usa `textContent`/`innerHTML` do browser para converter caracteres especiais em entidades HTML
     *    - Trata `null`/`undefined` devolvendo string vazia em vez de lançar erro
     *
     * @function   escapeHtml
     * @param  {*}  text  Valor a escapar (convertido para String antes do escape)
     * @returns {String} Texto seguro para inserção em HTML
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.escapeHtml = function(text) {
     if (text === null || text === undefined) return '';
     const div = document.createElement('div');
     div.textContent = String(text);
     return div.innerHTML;
 }; 
   
 /**
     * FUNCTION PURPOSE: Lê um valor de um objeto a partir de um caminho em notação de ponto (ex.: 'user.address.city').
     *
     * DESCRIPTION:
     *    - Divide o `path` por '.' e percorre o objeto propriedade a propriedade
     *    - Devolve `null` assim que encontra um nível inexistente, sem lançar erro
     *
     * @function   getNestedValue
     * @param  {Object}  obj   Objeto de origem
     * @param  {String}  path  Caminho em notação de ponto (ex.: 'endereco.cidade')
     * @returns {*} Valor encontrado, ou `null` se o caminho não existir
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getNestedValue = function(obj, path) {
     return path.split('.').reduce((current, part) => {
         return current && current[part] !== undefined ? current[part] : null;
     }, obj);
 };
   
 /**
     * FUNCTION PURPOSE: Gera um identificador único e curto, usado internamente onde não há um id de negócio disponível.
     *
     * DESCRIPTION:
     *    - Combina o prefixo 'dbx_' com uma fatia aleatória em base36
     *    - Não garante unicidade absoluta (é aleatório, não sequencial) — suficiente para uso em atributos DOM
     *
     * @function   uniqueId
     * @returns {String} Identificador no formato 'dbx_xxxxxxxxx'
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.uniqueId = function() {
     return 'dbx_' + Math.random().toString(36).substr(2, 9);
 };
   
 // ============================================================
 // INICIALIZAÇÃO
 // ============================================================
   
 /**
     * FUNCTION PURPOSE: Ponto de entrada da instância — monta a estrutura DOM, liga eventos e carrega os dados iniciais.
     *
     * DESCRIPTION:
     *    - Valida que o elemento alvo (`this.$target`) existe antes de prosseguir
     *    - Cria a estrutura visual (toolbar, header, body, paginação), o modal do query builder e os listeners de eventos
     *    - Restaura o estado guardado (vista, página, filtros) se `stateSave.active` estiver ligado
     *    - Termina por carregar os dados e disparar o callback `onInitialized`
     *
     * BUSINESS LOGIC:
     *    1. Valida o elemento alvo
     *    2. configProxy() — normaliza callbacks vindos da raiz da config para config.callbacks
     *    3. Monta elementos customizados (data-box-filter/header) e a estrutura DOM própria
     *    4. initBulkActions() — criada incondicionalmente aqui (e não em setView()), para a barra
     *       de seleção já existir mesmo que o utilizador nunca troque de vista
     *    5. Liga eventos, cria o modal do query builder
     *    6. Restaura estado guardado (se ativo) e a visibilidade de colunas
     *    7. loadData() e dispara onInitialized
     *
     * ERROR HANDLING:
     *    - Elemento alvo (#id) não encontrado no DOM → regista erro na consola e aborta a inicialização
     *
     * @function   initialize
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.initialize = function() {
     if (this.$target.length === 0) {
         console.error('DataBox: Elemento alvo #' + this.id + ' não encontrado');
         return;
     } 
     this.configProxy(); 
     this.$target.addClass('dataBox').attr('data-databox-id', this.id); 
     this.setupCustomElements();
     this.createStructure();

     this.initBulkActions();
     this.setupEvents();
     this.createQueryBuilderModal(); 

     // Carregar estado salvo se ativo
     if (this.config.stateSave.active) {
         this.loadState();
     } 
     // Inicializar colunas visíveis
     this.initColumnVisibility(); 
     this.loadData();
     this.triggerCallback('onInitialized', this);
 }; 
   
 /**
     * FUNCTION PURPOSE: Deteta e liga elementos customizados fornecidos pela página ([data-box-filter], [data-box-header]).
     *
     * DESCRIPTION:
     *    - Permite à página anfitriã fornecer os seus próprios containers de filtro/cabeçalho em vez dos gerados pela biblioteca
     *    - Remove qualquer [data-box-body] pré-existente, pois esse container é sempre criado pela biblioteca
     *
     * @function   setupCustomElements
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.setupCustomElements = function() {
     this.$filterContainer = this.$target.find('[data-box-filter]');
     this.hasCustomFilter = this.$filterContainer.length > 0; 
     this.$headerContainer = this.$target.find('[data-box-header]');
     this.hasCustomHeader = this.$headerContainer.length > 0; 
     this.$target.find('[data-box-body]').remove();
 };
   
 /**
     * FUNCTION PURPOSE: Determina qual vista (card/table/list/kanban/...) deve estar ativa ao iniciar a instância.
     *
     * DESCRIPTION:
     *    - Se `stateSave.active`, tenta recuperar a última vista usada a partir do estado guardado
     *    - Caso contrário, devolve a primeira vista marcada como `active: true` em `config.views`
     *    - Assume 'card' como último recurso, se nenhuma vista estiver ativa
     *
     * @function   getDefaultView
     * @returns {String} Nome da vista inicial (ex.: 'card', 'table')
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getDefaultView = function() {
     // Verificar se há estado salvo com view
     if (this.config.stateSave.active) {
         const saved = this.loadStateRaw();
         if (saved && saved.currentView) return saved.currentView;
     } 
     const views = this.config.views;
     for (const viewName in views) {
         if (views[viewName] && views[viewName].active) {
             return viewName;
         }
     }
     return 'card';
 };
   
 // ============================================================
 // ESTRUTURA DOM
 // ============================================================
   
 /**
     * FUNCTION PURPOSE: Constrói toda a estrutura DOM do DataBox (toolbar, filtro, cabeçalho, corpo e paginação).
     *
     * DESCRIPTION:
     *    - Monta wrapper, toolbar e containers de filtro/cabeçalho, reaproveitando os customizados se existirem
     *    - Adiciona condicionalmente botões de exportação, query builder, filtros rápidos, pesquisa e alternador de vistas
     *    - Monta o dropdown de visibilidade/reorder de colunas quando a vista tabela o exigir
     *
     * DEPENDENCIES:
     *    - renderExportButtons(), renderQuickFilters(), renderViewButtons(), renderColumnDropdown()
     *
     * @function   createStructure
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.createStructure = function() {
     this.$wrapper = $('<div class="dataBox-wrapper"></div>'); 
     this.$toolbar = $('<div class="dataBox-toolbar d-flex flex-wrap align-items-center justify-content-between mb-3"></div>'); 
     if (!this.hasCustomFilter) {
         this.$filterContainer = $('<div class="dataBox-filter flex-grow-1 me-3"></div>');
     } 
     if (this.config.export.active) {
         this.$exportContainer = $('<div class="dataBox-export btn-group me-2"></div>');
         this.renderExportButtons();
         this.$toolbar.append(this.$exportContainer);
     } 
     if (this.config.queryBuilder.active) {
         const $qbBtn = $(`
             <button type="button" class="btn btn-outline-primary btn-sm me-2" data-action="query-builder">
                 <i class="fas fa-sliders-h"></i> ${this.lang.queryBuilder.title}
             </button>
         `);
         this.$toolbar.append($qbBtn);
     } 
     if (this.config.quickFilters.active && this.config.quickFilters.filters.length > 0) {
         this.renderQuickFilters();
     } 
     if (this.config.search.active && !this.hasCustomFilter) {
         const placeholder = this.config.search.placeholder || this.lang.search;
         const $searchGroup = $(`
             <div class="dataBox-search input-group" style="max-width: 300px;">
                 <span class="input-group-text"><i class="fas fa-search"></i></span>
                 <input type="text" class="form-control form-control-sm" placeholder="${placeholder}" data-action="global-search">
             </div>
         `);
         this.$filterContainer.append($searchGroup);
     } 
     if (!this.hasCustomHeader) {
         this.$headerContainer = $('<div class="dataBox-header d-flex align-items-center mb-3"></div>');
     } 
     this.renderViewButtons(); 
     // Column visibility dropdown (para tabela)
     const tableConfig = this.config.views.table;
     if (tableConfig && tableConfig.active && (tableConfig.columnVisibility || tableConfig.columnReorder)) {
         this.renderColumnDropdown();
     } 
     this.$bodyContainer = $('<div class="dataBox-body" data-box-body></div>'); 
     this.$paginationContainer = $('<div class="dataBox-pagination mt-3"></div>'); 
     if (this.$filterContainer.children().length > 0) {
         this.$toolbar.prepend(this.$filterContainer);
     } 
     this.$wrapper
         .append(this.$toolbar)
         .append(this.$headerContainer)
         .append(this.$bodyContainer)
         .append(this.$paginationContainer); 
     this.$target.append(this.$wrapper);
 };
   
 /**
     * FUNCTION PURPOSE: Desenha o grupo de botões para alternar entre as vistas ativas (card, table, list, kanban, custom).
     *
     * DESCRIPTION:
     *    - Itera `config.views` e cria um botão por cada vista com `active: true`
     *    - O botão da vista corrente é destacado com a classe 'btn-primary active'
     *    - O grupo só é inserido no DOM quando há mais do que uma vista ativa (não faz sentido alternar entre uma só)
     *
     * @function   renderViewButtons
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderViewButtons = function() {
     const views = this.config.views;
     const $viewGroup = $('<div class="dataBox-view-buttons btn-group btn-group-sm"></div>');
     const icons = { card: 'fa-th-large', table: 'fa-table', list: 'fa-list', kanban: 'fa-columns' };
     const labels = { card: 'Cards', table: 'Tabela', list: 'Lista', kanban: 'Kanban' };
     let hasMultipleViews = 0; 
     for (const viewName in views) {
         if (views[viewName] && views[viewName].active) {
             hasMultipleViews++;
             const isActive = viewName === this.currentView;
             const icon = views[viewName].icon || icons[viewName] || 'fa-circle';
             const label = views[viewName].title || labels[viewName] || viewName;
             $viewGroup.append(`
                 <button type="button" class="btn ${isActive ? 'btn-primary active' : 'btn-outline-secondary'}"
                         data-view="${viewName}" title="${label}">
                     <i class="fas ${icon}"></i>
                     <span class="d-none d-md-inline ms-1">${label}</span>
                 </button>
             `);
         }
     } 
     if (hasMultipleViews > 1) {
         this.$headerContainer.append($viewGroup);
     }
 };
   
 // ============================================================
 // COLUNAS - VISIBILIDADE & REORDER
 // ============================================================
 
 /**
     * FUNCTION PURPOSE: Inicializa as estruturas internas de ordem e visibilidade de colunas a partir da configuração da vista tabela.
     *
     * DESCRIPTION:
     *    - Preenche `this.columnOrder` com a ordem original das colunas definidas em `views.table.columns`
     *    - Preenche `this.columnVisibility` a partir da flag `col.visible` de cada coluna (default: visível)
     *
     * @function   initColumnVisibility
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.initColumnVisibility = function() {
     const tableConfig = this.config.views.table;
     if (!tableConfig) return;
     const columns = tableConfig.columns || [];
     columns.forEach((col, idx) => {
         this.columnOrder[idx] = col.data;
         this.columnVisibility[col.data] = col.visible !== false;
     });
 };
   
 /**
     * FUNCTION PURPOSE: Constrói o dropdown de gestão de colunas (mostrar/esconder e, opcionalmente, reordenar por drag & drop).
     *
     * DESCRIPTION:
     *    - Gera uma checkbox por coluna, refletindo o estado atual de `this.columnVisibility`
     *    - Ao alterar uma checkbox, atualiza `columnVisibility`, re-renderiza os itens e dispara `onColumnVisibility`
     *    - Quando `columnReorder` está ativo, ativa também o drag & drop das colunas via setupColumnDragDrop()
     *
     * DEPENDENCIES:
     *    - setupColumnDragDrop(): liga os handlers de arrastar/largar quando columnReorder está ativo
     *
     * @function   renderColumnDropdown
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderColumnDropdown = function() {
     const self = this;
     const columns = this.config.views.table.columns || [];
     const tableConfig = this.config.views.table; 
     this.$columnDropdown = $(`
         <div class="dropdown ms-2">
             <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                 <i class="fas fa-columns"></i> ${this.lang.columns.title}
             </button>
             <div class="dropdown-menu p-3" style="min-width: 250px; max-height: 400px; overflow-y: auto;">
                 <h6 class="dropdown-header">${tableConfig.columnVisibility ? this.lang.columns.visibility : ''}</h6>
                 <div class="databox-column-list">
                     ${columns.map((col, idx) => `
                         <div class="form-check databox-column-item" draggable="${tableConfig.columnReorder}"
                              data-column-idx="${idx}" data-column-data="${col.data}">
                             ${tableConfig.columnReorder ? '<i class="fas fa-grip-vertical text-muted me-2" style="cursor: grab;"></i>' : ''}
                             <input class="form-check-input" type="checkbox"
                                    id="colvis_${this.id}_${idx}" value="${col.data}"
                                    ${this.columnVisibility[col.data] !== false ? 'checked' : ''}>
                             <label class="form-check-label" for="colvis_${this.id}_${idx}">
                                 ${col.title || col.data}
                             </label>
                         </div>
                     `).join('')}
                 </div>
             </div>
         </div>
     `); 
     this.$headerContainer.append(this.$columnDropdown); 
     // Toggle visibilidade
     this.$columnDropdown.on('change', '.form-check-input', function() {
         const colData = $(this).val();
         self.columnVisibility[colData] = $(this).is(':checked');
         self.renderItems();
         self.triggerCallback('onColumnVisibility', colData, self.columnVisibility[colData], self);
     }); 
     // Drag & drop reordenar
     if (tableConfig.columnReorder) {
         this.setupColumnDragDrop();
     }
 };
   
 /**
     * FUNCTION PURPOSE: Liga os eventos HTML5 de drag & drop que permitem reordenar as colunas da tabela pelo dropdown de colunas.
     *
     * DESCRIPTION:
     *    - dragstart/dragend: marca visualmente o item a ser arrastado
     *    - dragover: permite o drop, sinalizando a operação como 'move'
     *    - drop: recalcula `this.columnOrder`, move o elemento no DOM, re-renderiza os itens e dispara `onColumnReorder`
     *
     * @function   setupColumnDragDrop
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.setupColumnDragDrop = function() {
     const self = this;
     let draggedEl = null; 
     this.$columnDropdown.on('dragstart', '.databox-column-item', function(e) {
         draggedEl = this;
         $(this).addClass('dragging');
         e.originalEvent.dataTransfer.effectAllowed = 'move';
     }); 
     this.$columnDropdown.on('dragend', '.databox-column-item', function() {
         $(this).removeClass('dragging');
         draggedEl = null;
     }); 
     this.$columnDropdown.on('dragover', '.databox-column-item', function(e) {
         e.preventDefault();
         e.originalEvent.dataTransfer.dropEffect = 'move';
     }); 
     this.$columnDropdown.on('drop', '.databox-column-item', function(e) {
         e.preventDefault();
         if (!draggedEl || draggedEl === this) return; 
         const $list = self.$columnDropdown.find('.databox-column-list');
         const $items = $list.find('.databox-column-item');
         const fromIdx = $(draggedEl).data('column-idx');
         const toIdx = $(this).data('column-idx'); 
         // Reordenar columnOrder
         const [moved] = self.columnOrder.splice(fromIdx, 1);
         self.columnOrder.splice(toIdx, 0, moved); 
         // Mover o elemento DOM
         $(draggedEl).insertBefore(this); 
         // Atualizar indices
         $list.find('.databox-column-item').each(function(i) {
             $(this).attr('data-column-idx', i);
         }); 
         self.renderItems();
         self.triggerCallback('onColumnReorder', self.columnOrder, self);
     });
 };
   
 /**
     * FUNCTION PURPOSE: Devolve as colunas da tabela na ordem atual definida por `this.columnOrder`.
     *
     * DESCRIPTION:
     *    - Se ainda não há uma ordem customizada definida, devolve as colunas na ordem original da configuração
     *    - Mapeia cada id em `columnOrder` para a definição de coluna correspondente, ignorando ids sem correspondência
     *
     * @function   getOrderedColumns
     * @returns {Array} Lista de definições de coluna, na ordem em que devem ser desenhadas
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getOrderedColumns = function() {
     const columns = this.config.views.table.columns || [];
     if (this.columnOrder.length === 0) return columns; 
     return this.columnOrder
         .map(data => columns.find(c => c.data === data))
         .filter(Boolean);
 }; 
   
 /**
     * FUNCTION PURPOSE: Devolve apenas as colunas atualmente visíveis, já na ordem correta.
     *
     * DESCRIPTION:
     *    - Parte de getOrderedColumns() e filtra pelas colunas marcadas como visíveis em `this.columnVisibility`
     *
     * DEPENDENCIES:
     *    - getOrderedColumns(): fornece a ordem base antes do filtro de visibilidade
     *
     * @function   getVisibleColumns
     * @returns {Array} Lista de definições de coluna visíveis, na ordem correta
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getVisibleColumns = function() {
     return this.getOrderedColumns().filter(col => this.columnVisibility[col.data] !== false);
 }; 
   
 // ============================================================
 // BOTÕES DE EXPORTAÇÃO
 // ============================================================
   
 /**
     * FUNCTION PURPOSE: Monta o dropdown de exportação (copiar, CSV, Excel, PDF, imprimir) de acordo com `config.export.buttons`.
     *
     * DESCRIPTION:
     *    - Gera apenas os botões cujo tipo esteja incluído em `config.export.buttons`
     *    - Cada botão está ligado à respetiva ação de exportação (exportToCSV, exportToPDF, etc.)
     *
     * DEPENDENCIES:
     *    - exportToClipboard(), exportToCSV(), exportToExcel(), exportToPDF(), printData()
     *
     * @function   renderExportButtons
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderExportButtons = function() {
     const buttons = this.config.export.buttons;
     const self = this; 
     const $dropdown = $(`
         <div class="dropdown">
             <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                 <i class="fas fa-download"></i> Exportar
             </button>
             <ul class="dropdown-menu"></ul>
         </div>
     `); 
     const $menu = $dropdown.find('.dropdown-menu'); 
     const buttonConfig = {
         copy: { icon: 'fa-copy', label: this.lang.buttons.copy, action: () => this.exportToClipboard() },
         csv: { icon: 'fa-file-csv', label: this.lang.buttons.csv, action: () => this.exportToCSV() },
         excel: { icon: 'fa-file-excel', label: this.lang.buttons.excel, action: () => this.exportToExcel() },
         pdf: { icon: 'fa-file-pdf', label: this.lang.buttons.pdf, action: () => this.exportToPDF() },
         print: { icon: 'fa-print', label: this.lang.buttons.print, action: () => this.printData() }
     }; 
     buttons.forEach(btn => {
         const cfg = buttonConfig[btn];
         if (cfg) {
             $menu.append(`
                 <li><a class="dropdown-item" href="#" data-export="${btn}">
                     <i class="fas ${cfg.icon} me-2"></i>${cfg.label}
                 </a></li>
             `);
         }
     }); 
     this.$exportContainer.append($dropdown); 
     this.$exportContainer.on('click', '[data-export]', function(e) {
         e.preventDefault();
         const type = $(this).data('export');
         if (buttonConfig[type]) {
             buttonConfig[type].action();
         }
     });
 };
   
 /**
     * FUNCTION PURPOSE: Copia os dados atualmente filtrados para a área de transferência, em formato tabular separado por tabs.
     *
     * DESCRIPTION:
     *    - Usa getExportData() para obter os dados já formatados (com render de colunas aplicado)
     *    - Constrói uma string com cabeçalhos + linhas separados por tab e quebras de linha
     *
     * ERROR HANDLING:
     *    - navigator.clipboard indisponível ou permissão negada → mostra aviso via showToast() como fallback
     *
     * @function   exportToClipboard
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.exportToClipboard = function() {
     const data = this.getExportData();
     if (data.length === 0) return; 
     const headers = Object.keys(data[0]);
     const csv = [
         headers.join('\t'),
         ...data.map(row => headers.map(h => row[h] !== undefined ? row[h] : '').join('\t'))
     ].join('\n'); 
     navigator.clipboard.writeText(csv).then(() => {
         this.showToast(this.lang.buttons.copy + ' - Concluído!');
     }).catch(() => {
         const $textarea = $('<textarea>').val(csv).appendTo('body').select();
         document.execCommand('copy');
         $textarea.remove();
         this.showToast(this.lang.buttons.copy + ' - Concluído!');
     });
 };
 
 /**
     * FUNCTION PURPOSE: Exporta os dados filtrados para um ficheiro .csv e inicia o download no browser.
     *
     * DESCRIPTION:
     *    - Usa getExportData() para obter os dados já formatados (com render de colunas aplicado)
     *    - Escapa vírgulas e aspas de cada célula para produzir um CSV válido
     *
     * DEPENDENCIES:
     *    - getExportData(), downloadBlob()
     *
     * @function   exportToCSV
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.exportToCSV = function() {
     const data = this.getExportData();
     if (data.length === 0) return; 
     const headers = Object.keys(data[0]);
     const escapeCSV = (val) => {
         if (val === null || val === undefined) return '';
         const str = String(val);
         if (str.includes(',') || str.includes('"') || str.includes('\n')) {
             return '"' + str.replace(/"/g, '""') + '"';
         }
         return str;
     }; 
     const csv = [
         headers.map(escapeCSV).join(','),
         ...data.map(row => headers.map(h => escapeCSV(row[h])).join(','))
     ].join('\n'); 
     const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
     this.downloadBlob(blob, this.config.export.filename + '.csv');
 };
 
 /**
     * FUNCTION PURPOSE: Exporta os dados filtrados para um ficheiro compatível com Excel (HTML de tabela com extensão .xls).
     *
     * DESCRIPTION:
     *    - Usa getExportData() para obter os dados já formatados
     *    - Gera uma tabela HTML simples, que o Excel interpreta corretamente ao abrir
     *
     * DEPENDENCIES:
     *    - getExportData(), downloadBlob()
     *
     * @function   exportToExcel
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.exportToExcel = function() {
     const data = this.getExportData();
     if (data.length === 0) return; 
     const headers = Object.keys(data[0]);
     const escapeXML = (str) => {
         return String(str || '').replace(/[&<>"']/g, (m) => ({
             '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
         })[m]);
     }; 
     let xml = '<?xml version="1.0" encoding="UTF-8"?>';
     xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet">';
     xml += '<Worksheet ss:Name="Dados"><Table>'; 
     xml += '<Row>' + headers.map(h => `<Cell><Data ss:Type="String">${escapeXML(h)}</Data></Cell>`).join('') + '</Row>'; 
     data.forEach(row => {
         xml += '<Row>' + headers.map(h => {
             const val = row[h];
             const type = typeof val === 'number' ? 'Number' : 'String';
             return `<Cell><Data ss:Type="${type}">${escapeXML(val)}</Data></Cell>`;
         }).join('') + '</Row>';
     }); 
     xml += '</Table></Worksheet></Workbook>'; 
     const blob = new Blob([xml], { type: 'application/vnd.ms-excel' });
     this.downloadBlob(blob, this.config.export.filename + '.xls');
 };
 
 /**
     * FUNCTION PURPOSE: Gera uma versão imprimível dos dados filtrados, orientada à exportação em PDF via diálogo de impressão do browser.
     *
     * DESCRIPTION:
     *    - Abre uma nova janela com uma tabela HTML estilizada para impressão (respeitando orientação e tamanho de página configurados)
     *    - Dispara `window.print()` automaticamente ao carregar a nova janela
     *
     * ERROR HANDLING:
     *    - Sem dados a exportar (data.length === 0) → sai sem abrir a janela de impressão
     *
     * @function   exportToPDF
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.exportToPDF = function() {
     const data = this.getExportData();
     if (data.length === 0) return; 
     const headers = Object.keys(data[0]);
     const title = this.config.export.title || 'DataBox Export';
     const orientation = this.config.export.orientation === 'landscape' ? 'landscape' : 'portrait'; 
     const printWindow = window.open('', '_blank');
     printWindow.document.write(`
         <!DOCTYPE html>
         <html>
         <head>
             <title>${title}</title>
             <style>
                 @page { size: ${this.config.export.pageSize || 'A4'} ${orientation}; margin: 1cm; }
                 body { font-family: Arial, sans-serif; font-size: 10pt; }
                 h2 { text-align: center; margin-bottom: 20px; }
                 table { width: 100%; border-collapse: collapse; }
                 th, td { border: 1px solid #333; padding: 6px; text-align: left; }
                 th { background-color: #f0f0f0; font-weight: bold; }
                 tr:nth-child(even) { background-color: #f9f9f9; }
             </style>
         </head>
         <body>
             <h2>${title}</h2>
             <table>
                 <thead>
                     <tr>${headers.map(h => `<th>${this.escapeHtml(h)}</th>`).join('')}</tr>
                 </thead>
                 <tbody>
                     ${data.map(row =>
                         '<tr>' + headers.map(h => `<td>${this.escapeHtml(row[h])}</td>`).join('') + '</tr>'
                     ).join('')}
                 </tbody>
             </table>
             <script>window.onload = function() { window.print(); };</script>
         </body>
         </html>
     `);
     printWindow.document.close();
 };
   
 /**
     * FUNCTION PURPOSE: Abre uma janela com os dados filtrados formatados para impressão direta (sem passar por PDF).
     *
     * DESCRIPTION:
     *    - Semelhante a exportToPDF(), mas com botões de 'Imprimir'/'Fechar' visíveis na própria janela
     *
     * ERROR HANDLING:
     *    - Sem dados a exportar (data.length === 0) → sai sem abrir a janela
     *
     * @function   printData
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.printData = function() {
     const data = this.getExportData();
     if (data.length === 0) return; 
     const headers = Object.keys(data[0]);
     const title = this.config.export.title || 'DataBox'; 
     const printWindow = window.open('', '_blank');
     printWindow.document.write(`
         <!DOCTYPE html>
         <html>
         <head>
             <title>${title}</title>
             <style>
                 body { font-family: Arial, sans-serif; }
                 h2 { text-align: center; }
                 table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                 th, td { border: 1px solid #ccc; padding: 8px; }
                 th { background: #eee; }
                 @media print { .no-print { display: none; } }
             </style>
         </head>
         <body>
             <div class="no-print" style="text-align:center; padding: 20px;">
                 <button onclick="window.print()">Imprimir</button>
                 <button onclick="window.close()">Fechar</button>
             </div>
             <h2>${title}</h2>
             <table>
                 <thead><tr>${headers.map(h => `<th>${this.escapeHtml(h)}</th>`).join('')}</tr></thead>
                 <tbody>
                     ${data.map(row =>
                         '<tr>' + headers.map(h => `<td>${this.escapeHtml(row[h])}</td>`).join('') + '</tr>'
                     ).join('')}
                 </tbody>
             </table>
         </body>
         </html>
     `);
     printWindow.document.close();
 };
   
 /**
     * FUNCTION PURPOSE: Prepara os dados atuais (filtrados) no formato tabular usado por todas as rotinas de exportação.
     *
     * DESCRIPTION:
     *    - Em server-side usa `this.items` (página atual); em client-side usa getAllFilteredData() (todos os itens filtrados)
     *    - Quando a vista tem colunas definidas, aplica o `render` de cada coluna e usa o título da coluna como cabeçalho
     *    - Sem colunas definidas, achata cada item num objeto simples (serializando sub-objetos em JSON)
     *
     * DEPENDENCIES:
     *    - getAllFilteredData(), getNestedValue()
     *
     * @function   getExportData
     * @returns {Array<Object>} Linhas prontas para CSV/Excel/PDF/impressão/clipboard
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getExportData = function() {
     // Usar todos os itens filtrados (não apenas a página atual)
     const data = this.config.ajax.serverSide ? this.items : this.getAllFilteredData();
     const viewConfig = this.config.views[this.currentView];
     const columns = viewConfig.columns || []; 
     if (columns.length === 0) {
         return data.map(item => {
             const flat = {};
             for (const key in item) {
                 flat[key] = typeof item[key] === 'object' ? JSON.stringify(item[key]) : item[key];
             }
             return flat;
         });
     } 
     return data.map(item => {
         const row = {};
         columns.forEach(col => {
             const val = this.getNestedValue(item, col.data);
             if (col.render && typeof col.render === 'function') {
                 const rendered = col.render(val, item, 'export');
                 row[col.title || col.data] = typeof rendered === 'string'
                     ? rendered.replace(/<[^>]*>/g, '')
                     : (val !== undefined ? val : '');
             } else {
                 row[col.title || col.data] = val !== undefined ? val : '';
             }
         });
         return row;
     });
 };
   
 /**
     * FUNCTION PURPOSE: Aplica, sobre `this.allItems`, todos os filtros ativos (pesquisa global, por coluna, filtros rápidos e query builder).
     *
     * DESCRIPTION:
     *    - Usada pela exportação (client-side) para obter o conjunto completo filtrado, sem paginação
     *    - Aplica os filtros na mesma ordem que processClientSide(): pesquisa global → por coluna → filtros rápidos → query builder
     *
     * DEPENDENCIES:
     *    - getNestedValue(), evaluateQBRules()
     *
     * @function   getAllFilteredData
     * @returns {Array} Itens de `allItems` que sobrevivem a todos os filtros ativos
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getAllFilteredData = function() {
     let data = [...this.allItems]; 
     if (this.searchTerm) {
         const term = this.searchTerm.toLowerCase();
         const fields = this.config.search.fields.length > 0
             ? this.config.search.fields
             : (this.config.views.table.columns || []).map(c => c.data); 
         data = data.filter(item => {
             return fields.some(field => {
                 const val = this.getNestedValue(item, field);
                 return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
             });
         });
     } 
     for (const col in this.columnSearch) {
         const term = this.columnSearch[col].toLowerCase();
         if (term) {
             data = data.filter(item => {
                 const val = this.getNestedValue(item, col);
                 return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
             });
         }
     } 
     const qf = this.config.quickFilters.filters;
     for (const idx in this.activeQuickFilters) {
         const value = this.activeQuickFilters[idx];
         const filter = qf[idx];
         if (value && filter && filter.field) {
             data = data.filter(item => {
                 const val = this.getNestedValue(item, filter.field);
                 return String(val) === String(value);
             });
         }
     } 
     if (this.queryBuilderRules && this.queryBuilderRules.length > 0) {
         data = data.filter(item => this.evaluateQBRules(item, this.queryBuilderRules, 'AND'));
     } 
     return data;
 }; 
   
 /**
     * FUNCTION PURPOSE: Dispara o download de um ficheiro no browser a partir de um Blob.
     *
     * DESCRIPTION:
     *    - Cria uma URL de objeto temporária, um link <a download> invisível e simula o clique
     *    - Liberta a URL de objeto (`revokeObjectURL`) logo após o clique, para não reter memória
     *
     * @function   downloadBlob
     * @param  {Blob}    blob      Conteúdo binário a descarregar
     * @param  {String}  filename  Nome sugerido para o ficheiro
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.downloadBlob = function(blob, filename) {
     const url = URL.createObjectURL(blob);
     const $a = $('<a>').attr({ href: url, download: filename }).appendTo('body');
     $a[0].click();
     $a.remove();
     URL.revokeObjectURL(url);
 };
   
 /**
     * FUNCTION PURPOSE: Mostra uma notificação flutuante temporária (toast) no canto superior direito do ecrã.
     *
     * DESCRIPTION:
     *    - Usada como feedback rápido de ações (ex.: fallback de erro ao copiar para a área de transferência)
     *    - Remove-se automaticamente do DOM após 3 segundos, com um fade out
     *
     * @function   showToast
     * @param  {String}  message  Texto (HTML permitido) a mostrar na notificação
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.showToast = function(message) {
     const $toast = $(`
         <div class="databox-toast alert alert-success position-fixed"
              style="top: 20px; right: 20px; z-index: 9999;">
             ${message}
         </div>
     `).appendTo('body');
     setTimeout(() => $toast.fadeOut(() => $toast.remove()), 3000);
 };
   
 // ============================================================
 // QUERY BUILDER (PESQUISA COMPLEXA)
 // ============================================================

 /**
     * FUNCTION PURPOSE: Constrói o modal Bootstrap do Query Builder (pesquisa avançada por condições e grupos).
     *
     * DESCRIPTION:
     *    - Sai imediatamente se `config.queryBuilder.active` for falso — o modal nunca é criado nesse caso
     *    - Usa as colunas configuradas em `queryBuilder.columns`, ou as colunas da vista tabela como fallback
     *    - Liga os botões de adicionar condição/grupo, aplicar, limpar e remover linhas de regra
     *
     * DEPENDENCIES:
     *    - addQBCondition(), addQBGroup(), buildQBRules(), loadData()
     *
     * @function   createQueryBuilderModal
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.createQueryBuilderModal = function() {
     if (!this.config.queryBuilder.active) return; 
     const modalId = 'databox-qb-' + this.id;
     const columns = this.config.queryBuilder.columns.length > 0
         ? this.config.queryBuilder.columns
         : (this.config.views.table.columns || []); 
     this.$queryBuilderModal = $(`
         <div class="modal fade" id="${modalId}" tabindex="-1">
             <div class="modal-dialog modal-lg">
                 <div class="modal-content">
                     <div class="modal-header">
                         <h5 class="modal-title"><i class="fas fa-sliders-h"></i> ${this.lang.queryBuilder.title}</h5>
                         <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                     </div>
                     <div class="modal-body">
                         <div class="dataBox-query-builder" data-qb-root>
                             <div class="qb-rules-container" data-qb-rules></div>
                             <button type="button" class="btn btn-outline-primary btn-sm mt-2" data-qb-add-condition>
                                 <i class="fas fa-plus"></i> ${this.lang.queryBuilder.addCondition}
                             </button>
                             <button type="button" class="btn btn-outline-secondary btn-sm mt-2 ms-2" data-qb-add-group>
                                 <i class="fas fa-folder-plus"></i> ${this.lang.queryBuilder.addGroup}
                             </button>
                         </div>
                     </div>
                     <div class="modal-footer">
                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${this.lang.close}</button>
                         <button type="button" class="btn btn-outline-danger" data-qb-reset>${this.lang.reset}</button>
                         <button type="button" class="btn btn-primary" data-qb-apply>${this.lang.apply}</button>
                     </div>
                 </div>
             </div>
         </div>
     `); 
     $('body').append(this.$queryBuilderModal); 
     const self = this; 
     this.$queryBuilderModal.on('click', '[data-qb-add-condition]', function() {
         self.addQBCondition(self.$queryBuilderModal.find('[data-qb-rules]'), columns);
     }); 
     this.$queryBuilderModal.on('click', '[data-qb-add-group]', function() {
         self.addQBGroup(self.$queryBuilderModal.find('[data-qb-rules]'), columns);
     }); 
     this.$queryBuilderModal.on('click', '[data-qb-remove]', function() {
         $(this).closest('[data-qb-item]').remove();
     }); 
     this.$queryBuilderModal.on('click', '[data-qb-apply]', function() {
         self.queryBuilderRules = self.buildQBRules();
         self.currentPage = 1;
         self.loadData();
         self.$queryBuilderModal.modal('hide');
     }); 
     this.$queryBuilderModal.on('click', '[data-qb-reset]', function() {
         self.$queryBuilderModal.find('[data-qb-rules]').empty();
         self.queryBuilderRules = null;
         self.currentPage = 1;
         self.loadData();
         self.$queryBuilderModal.modal('hide');
     }); 
     this.addQBCondition(this.$queryBuilderModal.find('[data-qb-rules]'), columns);
 };
   
 /**
     * FUNCTION PURPOSE: Adiciona, dentro do container indicado, uma linha de condição do query builder (campo + operador + valor).
     *
     * DESCRIPTION:
     *    - Gera as opções de campo a partir das colunas fornecidas e as opções de operador a partir das traduções ativas
     *    - A linha inclui um botão para se remover a si própria
     *
     * @function   addQBCondition
     * @param  {jQuery}  $container  Container onde a linha de condição é inserida
     * @param  {Array}   columns     Colunas disponíveis para escolher como campo da condição
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.addQBCondition = function($container, columns) {
     const operators = this.lang.queryBuilder.operators;
     const $condition = $(`
         <div class="qb-condition mb-2 p-2 border rounded" data-qb-item="condition">
             <div class="row g-2 align-items-center">
                 <div class="col-md-3">
                     <select class="form-select form-select-sm" data-qb-field>
                         ${columns.map(col =>
                             `<option value="${col.data}">${col.title || col.data}</option>`
                         ).join('')}
                     </select>
                 </div>
                 <div class="col-md-3">
                     <select class="form-select form-select-sm" data-qb-operator>
                         <option value="equals">${operators.equals}</option>
                         <option value="notEquals">${operators.notEquals}</option>
                         <option value="contains">${operators.contains}</option>
                         <option value="startsWith">${operators.startsWith}</option>
                         <option value="endsWith">${operators.endsWith}</option>
                         <option value="greaterThan">${operators.greaterThan}</option>
                         <option value="lessThan">${operators.lessThan}</option>
                         <option value="greaterOrEqual">${operators.greaterOrEqual}</option>
                         <option value="lessOrEqual">${operators.lessOrEqual}</option>
                         <option value="isEmpty">${operators.isEmpty}</option>
                         <option value="isNotEmpty">${operators.isNotEmpty}</option>
                         <option value="between">${operators.between}</option>
                     </select>
                 </div>
                 <div class="col-md-5">
                     <input type="text" class="form-control form-control-sm" data-qb-value placeholder="Valor...">
                 </div>
                 <div class="col-md-1 text-end">
                     <button type="button" class="btn btn-outline-danger btn-sm" data-qb-remove>
                         <i class="fas fa-times"></i>
                     </button>
                 </div>
             </div>
         </div>
     `);
     $container.append($condition);
 }; 
   
 /**
     * FUNCTION PURPOSE: Adiciona um grupo de condições (com lógica AND/OR própria) dentro do container indicado do query builder.
     *
     * DESCRIPTION:
     *    - Um grupo pode conter as suas próprias condições e sub-grupos, permitindo regras aninhadas
     *    - Já nasce com uma condição inicial, via addQBCondition()
     *
     * DEPENDENCIES:
     *    - addQBCondition(): cria a condição inicial dentro do novo grupo
     *
     * @function   addQBGroup
     * @param  {jQuery}  $container  Container onde o grupo é inserido
     * @param  {Array}   columns     Colunas disponíveis para as condições do grupo
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.addQBGroup = function($container, columns) {
     const $group = $(`
         <div class="qb-group mb-2 p-3 border rounded bg-light" data-qb-item="group">
             <div class="d-flex align-items-center mb-2">
                 <select class="form-select form-select-sm me-2" style="width: auto;" data-qb-logic>
                     <option value="AND">${this.lang.queryBuilder.and}</option>
                     <option value="OR">${this.lang.queryBuilder.or}</option>
                 </select>
                 <button type="button" class="btn btn-outline-primary btn-sm me-2" data-qb-add-condition>
                     <i class="fas fa-plus"></i> ${this.lang.queryBuilder.addCondition}
                 </button>
                 <button type="button" class="btn btn-outline-secondary btn-sm me-2" data-qb-add-group>
                     <i class="fas fa-folder-plus"></i> ${this.lang.queryBuilder.addGroup}
                 </button>
                 <button type="button" class="btn btn-outline-danger btn-sm ms-auto" data-qb-remove>
                     <i class="fas fa-times"></i>
                 </button>
             </div>
             <div class="qb-rules-container ps-3" data-qb-rules></div>
         </div>
     `);
     $container.append($group);
     this.addQBCondition($group.find('> [data-qb-rules]'), columns);
 }; 
 
 /**
     * FUNCTION PURPOSE: Lê o estado atual do modal do query builder e converte-o numa árvore de regras serializável.
     *
     * DESCRIPTION:
     *    - Percorre recursivamente condições e grupos, na ordem em que aparecem no DOM
     *    - Ignora condições sem campo/operador selecionado
     *
     * @function   buildQBRules
     * @returns {Array} Árvore de regras no formato `{ type: 'condition'|'group', ... }`, consumida por evaluateQBRules()
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.buildQBRules = function() {
     const self = this; 
     function parseRules($container) {
         const rules = [];
         $container.children('[data-qb-item]').each(function() {
             const $item = $(this);
             const type = $item.data('qb-item'); 
             if (type === 'condition') {
                 const field = $item.find('[data-qb-field]').val();
                 const operator = $item.find('[data-qb-operator]').val();
                 const value = $item.find('[data-qb-value]').val(); 
                 if (field && operator) {
                     rules.push({ type: 'condition', field, operator, value });
                 }
             } else if (type === 'group') {
                 const logic = $item.find('> [data-qb-logic]').val() || 'AND';
                 const subRules = parseRules($item.find('> [data-qb-rules]'));
                 if (subRules.length > 0) {
                     rules.push({ type: 'group', logic, rules: subRules });
                 }
             }
         });
         return rules;
     } 
     return parseRules(this.$queryBuilderModal.find('[data-qb-root] > [data-qb-rules]'));
 };
   
 // ============================================================
 // FILTROS RÁPIDOS
 // ============================================================
   
 /**
     * FUNCTION PURPOSE: Desenha os botões/selects de filtros rápidos configurados em `config.quickFilters.filters`.
     *
     * DESCRIPTION:
     *    - Cada filtro rápido é ligado a um campo de dados e a uma lista de valores possíveis
     *    - Ao selecionar um valor, atualiza `this.activeQuickFilters` e recarrega os dados (currentPage volta a 1)
     *
     * @function   renderQuickFilters
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderQuickFilters = function() {
     const filters = this.config.quickFilters.filters;
     const $container = $('<div class="dataBox-quick-filters mb-3"></div>');
     const self = this; 
     filters.forEach((filter, index) => {
         if (filter.type === 'dropdown') {
             const $select = $(`
                 <select class="form-select form-select-sm d-inline-block w-auto me-2" data-quick-filter="${index}">
                     <option value="">${filter.label || 'Todos'}</option>
                     ${(filter.options || []).map(opt =>
                         `<option value="${opt.value}">${opt.label}</option>`
                     ).join('')}
                 </select>
             `);
             $container.append($select);
         } else if (filter.type === 'buttons') {
             const $group = $('<div class="btn-group btn-group-sm me-2"></div>');
             $group.append(`<button type="button" class="btn btn-outline-secondary active" data-quick-filter="${index}" value="">${filter.label || 'Todos'}</button>`);
             (filter.options || []).forEach(opt => {
                 $group.append(`<button type="button" class="btn btn-outline-secondary" data-quick-filter="${index}" value="${opt.value}">${opt.label}</button>`);
             });
             $container.append($group);
         } else if (filter.type === 'date') {
             $container.append(`
                 <input type="date" class="form-control form-control-sm d-inline-block w-auto me-2"
                        data-quick-filter="${index}" placeholder="${filter.label || ''}">
             `);
         }
     }); 
     $container.on('change', '[data-quick-filter]', function() {
         const idx = $(this).data('quick-filter');
         const value = $(this).val();
         self.activeQuickFilters[idx] = value;
         self.currentPage = 1;
         self.loadData();
     }); 
     $container.on('click', '[data-quick-filter]', function() {
         const $btn = $(this);
         const idx = $btn.data('quick-filter');
         const value = $btn.val(); 
         $btn.siblings().removeClass('active');
         $btn.addClass('active'); 
         self.activeQuickFilters[idx] = value;
         self.currentPage = 1;
         self.loadData();
     }); 
     this.$target.find('.dataBox-quick-filters').remove();
     this.$toolbar.after($container);
 };
 
 // ============================================================
 // EVENTOS
 // ============================================================
   
 /**
     * FUNCTION PURPOSE: Liga, num único ponto, todos os event listeners delegados da instância (toolbar, seleção, scroll virtual, etc.).
     *
     * DESCRIPTION:
     *    - Usa delegação de eventos (bind no wrapper/body, não em cada elemento) para sobreviver a re-renders
     *    - Cobre pesquisa global/por coluna, troca de vista, seleção individual e global, e scroll infinito/virtual quando aplicável
     *
     * DEPENDENCIES:
     *    - toggleSelection(), setupVirtualScroll()
     *
     * @function   setupEvents
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.setupEvents = function() {
     const self = this; 
     // Botões de visualização
     this.$headerContainer.on('click', '[data-view]', function(e) {
         e.preventDefault();
         const view = $(this).data('view');
         self.setView(view);
     }); 
     // Pesquisa global com debounce
     if (this.config.search.active) {
         this.$wrapper.on('input', '[data-action="global-search"]', function() {
             const val = $(this).val();
             clearTimeout(self.searchDebounceTimer);
             self.searchDebounceTimer = setTimeout(() => {
                 self.searchTerm = val;
                 self.currentPage = 1;
                 self.loadData();
             }, self.config.search.debounce);
         });
     } 
     // Query builder button
     this.$toolbar.on('click', '[data-action="query-builder"]', function() {
         const modalId = 'databox-qb-' + self.id;
         const modalEl = document.getElementById(modalId);
         if (modalEl && typeof bootstrap !== 'undefined') {
             bootstrap.Modal.getOrCreateInstance(modalEl).show();
         } else if (modalEl && typeof $ !== 'undefined') {
             $(modalEl).modal('show');
         }
     }); 

     // Evento de clique em items (row click)
     this.$bodyContainer.on('click', '[data-databox-item]', function(e) {
         const $itemEl = $(this);
         const index = $itemEl.data('databox-index');
         const item = self.items[index];
         if (!item) return; 
 
         self.triggerCallback('onRowClick', item, $itemEl, e); 
 
         if (!self.config.selection.active) return; 
 
         const hasExplicitTrigger = $itemEl.find('[data-databox-checkbox], [data-databox-select]').length > 0; 
 
         if (hasExplicitTrigger) {
             if ($(e.target).closest('[data-databox-select]').length) {
                 self.toggleSelection(item, $itemEl);
             }
             return;
         } 

         if ($(e.target).closest('a, button, input, select, textarea, label, [data-bs-toggle], .dropdown-menu, [data-no-select]').length) {
             return;
         } 
 
         self.toggleSelection(item, $itemEl);
     }); 

     // Checkbox de seleção global
     this.$wrapper.on('change', '[data-databox-select-all]', function() {
         const checked = $(this).is(':checked');
         self.items.forEach((item, idx) => {
             const id = self.getItemId(item, idx);
             if (checked) {
                 self.selectedItems.add(id);
             } else {
                 self.selectedItems.delete(id);
             }
         });
         self.$bodyContainer.find('[data-databox-checkbox]').prop('checked', checked);
         self.$bodyContainer.find('[data-databox-item]').toggleClass('selected active', checked);
         self.updateBulkActionsBar();
         self.triggerCallback('onSelectionChanged', Array.from(self.selectedItems), self.getSelectedItems());
     }); 

     // Checkbox individual
     this.$bodyContainer.on('change', '[data-databox-checkbox]', function() {
         const $itemEl = $(this).closest('[data-databox-item]');
         const index = $itemEl.data('databox-index');
         const item = self.items[index];
         if (item) {
             const id = self.getItemId(item, index);
             const checked = $(this).is(':checked');
             if (checked) {
                 self.selectedItems.add(id);
             } else {
                 self.selectedItems.delete(id);
             }
             $itemEl.toggleClass('selected active', checked);
         }
         self.updateBulkActionsBar();
         self.triggerCallback('onSelectionChanged', Array.from(self.selectedItems), self.getSelectedItems());
     }); 

     // Virtual/Infinite scroll
     if (this.config.pagination.type === 'virtual' || this.config.pagination.type === 'infinite') {
         this.setupVirtualScroll();
     }
 };
   
 // ============================================================
 // STATE SAVING (Persistência de Estado)
 // ============================================================

 /**
     * FUNCTION PURPOSE: Devolve o objeto Web Storage (localStorage ou sessionStorage) configurado para persistir o estado.
     *
     * DESCRIPTION:
     *    - Lê `config.stateSave.storage` para decidir entre 'localStorage' e 'sessionStorage'
     *
     * @function   getStorage
     * @returns {Storage} localStorage ou sessionStorage, conforme configurado
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getStorage = function() {
     return this.config.stateSave.storage === 'sessionStorage' ? sessionStorage : localStorage;
 }; 
   
 /**
     * FUNCTION PURPOSE: Lê e valida o estado bruto guardado no storage, sem o aplicar à instância.
     *
     * DESCRIPTION:
     *    - Devolve `null` quando `stateSave` está inativo, quando não há estado guardado, ou quando o JSON é inválido
     *    - Descarta e remove o estado se já ultrapassou `stateSave.duration` (expirado)
     *
     * ERROR HANDLING:
     *    - JSON corrompido ou storage indisponível → captura a exceção e devolve `null`
     *
     * @function   loadStateRaw
     * @returns {Object|null} Estado guardado (ainda válido), ou `null`
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.loadStateRaw = function() {
     if (!this.config.stateSave.active) return null;
     try {
         const raw = this.getStorage().getItem(this.stateKey);
         if (!raw) return null;
         const state = JSON.parse(raw);
         const now = Date.now() / 1000;
         if (state._timestamp && (now - state._timestamp) > this.config.stateSave.duration) {
             this.getStorage().removeItem(this.stateKey);
             return null;
         }
         return state;
     } catch (e) {
         return null;
     }
 };
 
 /**
     * FUNCTION PURPOSE: Aplica à instância o estado previamente guardado (página, vista, pesquisa, ordenação, filtros, colunas).
     *
     * DESCRIPTION:
     *    - Se `stateSave.loadCallback` (ou `callbacks.onStateLoad`) estiver definido, delega nele e não aplica o default
     *    - Caso contrário, restaura cada propriedade apenas se presente no estado guardado, preservando os defaults nos restantes campos
     *
     * DEPENDENCIES:
     *    - loadStateRaw()
     *
     * @function   loadState
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.loadState = function() {
     if (!this.config.stateSave.active) return; 
     const state = this.loadStateRaw();
     if (!state) return; 
     if (this.config.stateSave.loadCallback && typeof this.config.stateSave.loadCallback === 'function') {
         this.config.stateSave.loadCallback(this.stateKey, state, this);
         return;
     } 
     if (this.config.callbacks.onStateLoad && typeof this.config.callbacks.onStateLoad === 'function') {
         this.config.callbacks.onStateLoad(state, this);
         return;
     } 
     if (state.currentPage) this.currentPage = state.currentPage;
     if (state.currentView && this.config.views[state.currentView]) this.currentView = state.currentView;
     if (state.searchTerm) this.searchTerm = state.searchTerm;
     if (state.columnSearch) this.columnSearch = state.columnSearch;
     if (state.sortColumns) this.sortColumns = state.sortColumns;
     if (state.queryBuilderRules) this.queryBuilderRules = state.queryBuilderRules;
     if (state.activeQuickFilters) this.activeQuickFilters = state.activeQuickFilters;
     if (state.columnOrder) this.columnOrder = state.columnOrder;
     if (state.columnVisibility) this.columnVisibility = state.columnVisibility;
     if (state.expandedRows) this.expandedRows = new Set(state.expandedRows);
 };
   
 /**
     * FUNCTION PURPOSE: Persiste o estado atual da instância (página, vista, pesquisa, ordenação, filtros, colunas, linhas expandidas).
     *
     * DESCRIPTION:
     *    - Se `stateSave.saveCallback` estiver definido, delega nele a persistência (útil para guardar no servidor)
     *    - Caso contrário, serializa o estado em JSON e grava no storage escolhido, sob a chave `this.stateKey`
     *
     * ERROR HANDLING:
     *    - Storage cheio ou indisponível → regista aviso na consola, sem interromper o fluxo da aplicação
     *
     * @function   saveState
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.saveState = function() {
     if (!this.config.stateSave.active) return; 
     const state = {
         _timestamp: Date.now() / 1000,
         currentPage: this.currentPage,
         currentView: this.currentView,
         searchTerm: this.searchTerm,
         columnSearch: this.columnSearch,
         sortColumns: this.sortColumns,
         queryBuilderRules: this.queryBuilderRules,
         activeQuickFilters: this.activeQuickFilters,
         columnOrder: this.columnOrder,
         columnVisibility: this.columnVisibility,
         expandedRows: Array.from(this.expandedRows)
     }; 
     if (this.config.stateSave.saveCallback && typeof this.config.stateSave.saveCallback === 'function') {
         this.config.stateSave.saveCallback(this.stateKey, state, this);
         return;
     } 
     this.triggerCallback('onStateSave', state, this); 
     try {
         this.getStorage().setItem(this.stateKey, JSON.stringify(state));
     } catch (e) {
         console.warn('DataBox: Não foi possível salvar o estado', e);
     }
 };
   
 /**
     * FUNCTION PURPOSE: Remove o estado guardado desta instância do storage configurado.
     *
     * DESCRIPTION:
     *    - Útil para expor um botão de 'repor vista' na página anfitriã
     *
     * ERROR HANDLING:
     *    - Storage indisponível → falha silenciosamente (sem lançar exceção)
     *
     * @function   clearState
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.clearState = function() {
     try {
         this.getStorage().removeItem(this.stateKey);
     } catch (e) {}
     return this;
 };
   
 // ============================================================
 // BULK ACTIONS (Ações em Massa)
 // ============================================================
   
 /**
     * FUNCTION PURPOSE: Cria a barra de ações em massa (contagem de selecionados + botões de ação) quando `bulkActions.active` está ligado.
     *
     * DESCRIPTION:
     *    - Gera um botão por ação definida em `config.bulkActions.actions`
     *    - Ao clicar numa ação, invoca a função configurada com os itens/ids selecionados e dispara `onBulkAction`
     *    - Fica escondida (`d-none`) até haver pelo menos um item selecionado — ver updateBulkActionsBar()
     *
     * DEPENDENCIES:
     *    - getSelectedItems(), clearSelection()
     *
     * @function   initBulkActions
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.initBulkActions = function() {
     if (!this.config.bulkActions.active) return; 
     this.$bulkActionsBar = $(`
         <div class="dataBox-bulk-actions alert alert-info d-none align-items-center justify-content-between mb-3">
             <div class="d-flex align-items-center">
                 <span class="me-3 fw-bold" data-bulk-count></span>
                 <div class="btn-group btn-group-sm" data-bulk-buttons></div>
             </div>
             <button type="button" class="btn btn-sm btn-outline-dark" data-bulk-clear>
                 <i class="fas fa-times"></i>
             </button>
         </div>
     `); 
     const $btnContainer = this.$bulkActionsBar.find('[data-bulk-buttons]');
     const actions = this.config.bulkActions.actions || []; 
     actions.forEach((action, idx) => {
         const icon = action.icon ? `<i class="fas ${action.icon}"></i> ` : '';
         $btnContainer.append(`
             <button type="button" class="btn btn-sm ${action.class || 'btn-primary'}" data-bulk-action="${idx}">
                 ${icon}${action.label}
             </button>
         `);
     }); 
     this.$toolbar.after(this.$bulkActionsBar); 
     const self = this;
     this.$bulkActionsBar.on('click', '[data-bulk-action]', function() {
         const idx = $(this).data('bulk-action');
         const action = actions[idx];
         if (action && typeof action.action === 'function') {
             const selectedItems = self.getSelectedItems();
             const selectedIds = Array.from(self.selectedItems);
             action.action(selectedItems, selectedIds, self);
             self.triggerCallback('onBulkAction', action.label, selectedItems, selectedIds, self);
         }
     }); 
     this.$bulkActionsBar.on('click', '[data-bulk-clear]', function() {
         self.clearSelection();
     });
 };
   
 /**
     * FUNCTION PURPOSE: Atualiza a visibilidade e a contagem da barra de ações em massa consoante a seleção atual.
     *
     * DESCRIPTION:
     *    - Sai em silêncio se a barra ainda não tiver sido criada (`this.$bulkActionsBar` nulo)
     *    - Mostra a barra e atualiza o texto de contagem quando há itens selecionados; esconde-a quando a seleção fica vazia
     *
     * @function   updateBulkActionsBar
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.updateBulkActionsBar = function() {
     if (!this.$bulkActionsBar) return; 
     const count = this.selectedItems.size;
     if (count > 0) {
         this.$bulkActionsBar.removeClass('d-none').addClass('d-flex');
         const text = this.lang.bulkActions.selected.replace('_COUNT_', count);
         this.$bulkActionsBar.find('[data-bulk-count]').text(text);
     } else {
         this.$bulkActionsBar.addClass('d-none').removeClass('d-flex');
     }
 }; 
   
 // ============================================================
 // VIRTUAL / INFINITE SCROLL
 // ============================================================ 

 /**
     * FUNCTION PURPOSE: Liga o listener de scroll (vertical ou horizontal) que despoleta o carregamento de mais dados perto do fim.
     *
     * DESCRIPTION:
     *    - Aplica overflow e um tamanho máximo (altura ou largura, conforme `scrollDirection`) ao container do corpo
     *    - Usa um debounce de 100ms sobre o evento 'scroll' para não disparar loadMoreData() em excesso
     *    - Só é ligado quando `pagination.type` é 'virtual' ou 'infinite'
     *
     * DEPENDENCIES:
     *    - loadMoreData()
     *
     * @function   setupVirtualScroll
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.setupVirtualScroll = function() {
     const self = this;
     const direction = this.config.pagination.scrollDirection === 'horizontal' ? 'horizontal' : 'vertical';
     const isHorizontal = direction === 'horizontal';
 
     const defaultSize = (this.config.pagination.type === 'virtual' || this.config.pagination.type === 'infinite')
         ? (isHorizontal ? '100%' : '600px')
         : null;
     const sizeValue = this.config.pagination.scrollSize || defaultSize;
 
     const $scrollContainer = this.$bodyContainer.css(
         isHorizontal
             ? { 'overflow-x': 'auto', 'overflow-y': 'hidden' }
             : { 'overflow-x': 'hidden', 'overflow-y': 'auto' }
     );
 
     if (sizeValue) {
         $scrollContainer.css(isHorizontal ? 'max-width' : 'max-height', sizeValue);
     }
 
     if (isHorizontal) {
         $scrollContainer.addClass('dataBox-scroll-horizontal');
     }
 
     let scrollTimer;
     $scrollContainer.on('scroll', function() {
         clearTimeout(scrollTimer);
         scrollTimer = setTimeout(() => {
             if (isHorizontal) {
                 const scrollLeft = $scrollContainer.scrollLeft();
                 const scrollWidth = $scrollContainer[0].scrollWidth;
                 const clientWidth = $scrollContainer[0].clientWidth;
                 if (scrollLeft + clientWidth >= scrollWidth - (self.config.pagination.threshold || 200)) {
                     self.loadMoreData();
                 }
             } else {
                 const scrollTop = $scrollContainer.scrollTop();
                 const scrollHeight = $scrollContainer[0].scrollHeight;
                 const clientHeight = $scrollContainer[0].clientHeight;
                 if (scrollTop + clientHeight >= scrollHeight - (self.config.pagination.threshold || 200)) {
                     self.loadMoreData();
                 }
             }
         }, 100);
     });
 };
   
 /**
     * FUNCTION PURPOSE: Carrega a página seguinte de dados e acrescenta-a (append) à lista já renderizada, para scroll virtual/infinito.
     *
     * DESCRIPTION:
     *    - Sai imediatamente se já houver um carregamento em curso ou se não houver mais dados (`hasMoreData` falso)
     *    - Em modo server-side, faz um pedido AJAX pela página seguinte e concatena a resposta a `this.items`
     *    - Em modo client-side, avança `currentPage` e delega em processClientSide(true) para recalcular a fatia visível
     *
     * ERROR HANDLING:
     *    - Pedido AJAX falha → esconde o indicador 'a carregar mais' e mantém `isLoadingMore` consistente
     *
     * @function   loadMoreData
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.loadMoreData = function() {
     if (this.isLoadingMore || !this.hasMoreData) return; 
     if (this.config.ajax.serverSide) {
         this.isLoadingMore = true;
         this.showLoadingMore(); 
         const nextPage = this.currentPage + 1;
         const params = Object.assign({}, this.config.ajax.params, {
             start: (nextPage - 1) * this.config.pagination.limit,
             length: this.config.pagination.limit,
             search: { value: this.searchTerm, regex: false },
             order: this.sortColumns.map(s => ({ column: s.column, dir: s.direction })),
             queryBuilder: this.queryBuilderRules
         }); 
         const self = this;
         $.ajax({
             url: this.config.ajax.url,
             method: this.config.ajax.method,
             data: this.config.ajax.method === 'GET' ? params : JSON.stringify(params),
             contentType: this.config.ajax.method === 'GET' ? undefined : 'application/json',
             headers: this.config.ajax.headers,
             dataType: this.config.ajax.dataType,
             success: function(response) {
                 let data = [];
                 if (response.data && Array.isArray(response.data)) {
                     data = response.data;
                 } else if (Array.isArray(response)) {
                     data = response;
                 } 
                 if (data.length === 0) {
                     self.hasMoreData = false;
                 } else {
                     self.currentPage = nextPage;
                     self.items = self.items.concat(data);
                     self.renderItems(true);
                 }
                 self.isLoadingMore = false;
                 self.hideLoadingMore();
             },
             error: function() {
                 self.isLoadingMore = false;
                 self.hideLoadingMore();
             }
         });
     } else {
         // Client-side infinite scroll
         const totalFiltered = this.getAllFilteredData().length;
         if (this.items.length >= totalFiltered) {
             this.hasMoreData = false;
             return;
         } 
         this.isLoadingMore = true;
         this.currentPage++;
         this.processClientSide(true);
         this.isLoadingMore = false;
     }
 };
   
 /**
     * FUNCTION PURPOSE: Mostra o indicador de 'a carregar mais...' no fundo da lista, durante o scroll infinito/virtual.
     *
     * DESCRIPTION:
     *    - Não duplica o indicador se já estiver presente no DOM
     *
     * @function   showLoadingMore
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.showLoadingMore = function() {
     if (this.$bodyContainer.find('.dataBox-loading-more').length === 0) {
         this.$bodyContainer.append(`
             <div class="dataBox-loading-more text-center py-3 text-muted">
                 <div class="spinner-border spinner-border-sm me-2"></div>
                 ${this.lang.loadingMore}
             </div>
         `);
     }
 }; 
   
 /**
     * FUNCTION PURPOSE: Remove o indicador de 'a carregar mais...' do fundo da lista.
     *
     * DESCRIPTION:
     *    - Chamado sempre que um carregamento adicional (loadMoreData) termina, com sucesso ou erro
     *
     * @function   hideLoadingMore
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.hideLoadingMore = function() {
     this.$bodyContainer.find('.dataBox-loading-more').remove();
 };
   
 // ============================================================
 // CARREGAMENTO DE DADOS
 // ============================================================
   
 /**
     * FUNCTION PURPOSE: Ponto único de entrada para (re)carregar dados, delegando para o modo server-side ou client-side conforme configurado.
     *
     * DESCRIPTION:
     *    - Mostra o indicador de loading antes de despoletar o carregamento
     *    - Decide entre loadServerData() e loadClientData() a partir de `config.ajax.serverSide`
     *
     * DEPENDENCIES:
     *    - loadServerData(), loadClientData(), showLoading()
     *
     * @function   loadData
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.loadData = function() {
     const self = this; 
     if (this.config.ajax.serverSide) {
         this.loadServerData();
     } else if (this.config.ajax.url) {
         this.loadClientData();
     } else {
         if (this.config.data && Array.isArray(this.config.data)) {
             this.allItems = [...this.config.data];
             this.processClientSide();
         }
     }
 };
   
 /**
     * FUNCTION PURPOSE: Faz o pedido AJAX ao endpoint configurado, no modo server-side (o próprio servidor pagina/pesquisa/ordena).
     *
     * DESCRIPTION:
     *    - Monta o payload com paginação, pesquisa global, pesquisa por coluna, ordenação, colunas, query builder e filtros rápidos
     *    - Invoca `config.ajax.beforeSend`/`success`/`error`/`complete` quando definidos, ou os defaults (processServerResponse, mensagem de erro)
     *
     * ERROR HANDLING:
     *    - Pedido AJAX falha → regista o erro na consola, dispara `onError` e mostra uma mensagem de erro no corpo,
     *      a menos que `config.ajax.error` esteja definido, caso em que a página assume o tratamento
     *
     * DEPENDENCIES:
     *    - processServerResponse()
     *
     * @function   loadServerData
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.loadServerData = function() {
     const self = this;
     this.showLoading(); 
     const order = this.sortColumns.map(s => ({
         column: s.column,
         dir: s.direction
     })); 
     const params = Object.assign({}, this.config.ajax.params, {
         draw: Date.now(),
         start: (this.currentPage - 1) * this.config.pagination.limit,
         length: this.config.pagination.limit,
         search: {
             value: this.searchTerm,
             regex: false
         },
         order: order,
         columns: (this.config.views.table.columns || []).map(col => ({
             data: col.data,
             name: col.name || col.data,
             searchable: col.searchable !== false,
             orderable: col.orderable !== false
         })),
         columnSearch: this.columnSearch,
         queryBuilder: this.queryBuilderRules,
         quickFilters: this.activeQuickFilters
     }); 
     $.ajax({
         url: this.config.ajax.url,
         method: this.config.ajax.method,
         data: this.config.ajax.method === 'GET' ? params : JSON.stringify(params),
         contentType: this.config.ajax.method === 'GET' ? undefined : 'application/json',
         headers: this.config.ajax.headers,
         dataType: this.config.ajax.dataType,
         beforeSend: (xhr) => {
             if (typeof this.config.ajax.beforeSend === 'function') {
                 this.config.ajax.beforeSend(xhr, params);
             }
         },
         success: (response) => {
             if (typeof this.config.ajax.success === 'function') {
                 this.config.ajax.success(response, this);
             } else {
                 this.processServerResponse(response);
             }
         },
         error: (xhr, status, error) => {
             console.error('DataBox: Erro ao carregar dados', error);
             this.triggerCallback('onError', xhr, status, error);
             if (typeof this.config.ajax.error === 'function') {
                 this.config.ajax.error(xhr, status, error);
             } else {
                 this.$bodyContainer.html(`
                     <div class="alert alert-danger">
                         <i class="fas fa-exclamation-triangle"></i>
                         Erro ao carregar dados: ${this.escapeHtml(error)}
                     </div>
                 `);
                 this.hideLoading();
             }
         },
         complete: (xhr) => {
             if (typeof this.config.ajax.complete === 'function') {
                 this.config.ajax.complete(xhr, this);
             }
         }
     });
 }; 
   
 /**
     * FUNCTION PURPOSE: Carrega os dados uma única vez do servidor (modo client-side) e delega o resto (filtro/ordenação/paginação) ao browser.
     *
     * DESCRIPTION:
     *    - Se `this.allItems` já tiver dados, não repete o pedido AJAX — apenas reprocessa (processClientSide())
     *    - Aceita várias formas de resposta: array simples, `{ data: [...] }` ou `{ data: { items: [...] } }`
     *
     * ERROR HANDLING:
     *    - Pedido AJAX falha → dispara `onError` e mostra uma mensagem de erro no corpo do DataBox
     *
     * DEPENDENCIES:
     *    - processClientSide()
     *
     * @function   loadClientData
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.loadClientData = function() {
     const self = this; 
     if (this.allItems.length > 0) {
         this.processClientSide();
         return;
     } 
     this.showLoading(); 
     $.ajax({
         url: this.config.ajax.url,
         method: this.config.ajax.method,
         data: this.config.ajax.params,
         headers: this.config.ajax.headers,
         dataType: this.config.ajax.dataType,
         success: (response) => {
             let data = [];
             if (response.data && Array.isArray(response.data)) {
                 data = response.data;
             } else if (response.data && response.data.items && Array.isArray(response.data.items)) {
                 data = response.data.items;
             } else if (Array.isArray(response)) {
                 data = response;
             } 
             this.allItems = data;
             this.processClientSide(); 
             if (typeof this.config.callbacks.onDataLoaded === 'function') {
                 this.config.callbacks.onDataLoaded(data, this);
             }
         },
         error: (xhr, status, error) => {
             this.triggerCallback('onError', xhr, status, error);
             this.$bodyContainer.html(`
                 <div class="alert alert-danger">
                     <i class="fas fa-exclamation-triangle"></i>
                     Erro ao carregar dados: ${this.escapeHtml(error)}
                 </div>
             `);
             this.hideLoading();
         }
     });
 }; 
   
 /**
     * FUNCTION PURPOSE: Aplica, inteiramente no browser, pesquisa, filtros, ordenação e paginação sobre `this.allItems`.
     *
     * DESCRIPTION:
     *    - Aplica sequencialmente: pesquisa global → pesquisa por coluna → filtros rápidos → query builder
     *    - Ordena o resultado conforme `this.sortColumns` (comparação numérica ou alfabética, conforme o tipo do valor)
     *    - Corta o resultado em `this.items`: por página (paginação normal) ou por limite acumulado (virtual/infinito)
     *    - Termina por re-renderizar itens e paginação, atualizar a info e guardar o estado
     *
     * BUSINESS LOGIC:
     *    1. Copia `allItems` para não mutar a fonte original
     *    2. Aplica pesquisa global (campos configurados ou colunas da tabela)
     *    3. Aplica pesquisa por coluna (this.columnSearch)
     *    4. Aplica filtros rápidos ativos (this.activeQuickFilters)
     *    5. Aplica as regras do query builder, se existirem
     *    6. Calcula this.totalItems a partir do resultado filtrado
     *    7. Ordena por this.sortColumns (multi-coluna, com prioridade pela ordem do array)
     *    8. Corta a fatia visível (paginada, ou acumulada em virtual/infinite) para this.items
     *    9. Re-renderiza, atualiza paginação/info, esconde loading e guarda o estado
     *
     * DEPENDENCIES:
     *    - getNestedValue(), evaluateQBRules(), renderItems(), renderPagination(), updateInfo(), saveState()
     *
     * @function   processClientSide
     * @param  {Boolean}  [append]  Quando `true`, acrescenta ao conjunto já renderizado em vez de o substituir (scroll infinito/virtual)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.processClientSide = function(append) {
     let data = [...this.allItems]; 
     // Aplicar pesquisa global
     if (this.searchTerm) {
         const term = this.searchTerm.toLowerCase();
         const fields = this.config.search.fields.length > 0
             ? this.config.search.fields
             : (this.config.views.table.columns || []).map(c => c.data); 
         data = data.filter(item => {
             return fields.some(field => {
                 const val = this.getNestedValue(item, field);
                 return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
             });
         });
     } 
     // Aplicar pesquisa por coluna
     for (const col in this.columnSearch) {
         const term = this.columnSearch[col].toLowerCase();
         if (term) {
             data = data.filter(item => {
                 const val = this.getNestedValue(item, col);
                 return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
             });
         }
     } 
     // Aplicar filtros rápidos
     const qf = this.config.quickFilters.filters;
     for (const idx in this.activeQuickFilters) {
         const value = this.activeQuickFilters[idx];
         const filter = qf[idx];
         if (value && filter && filter.field) {
             data = data.filter(item => {
                 const val = this.getNestedValue(item, filter.field);
                 return String(val) === String(value);
             });
         }
     } 
     // Aplicar query builder
     if (this.queryBuilderRules && this.queryBuilderRules.length > 0) {
         data = data.filter(item => this.evaluateQBRules(item, this.queryBuilderRules, 'AND'));
     } 
     // Total filtrado
     this.totalItems = data.length; 
     // Aplicar ordenação
     if (this.sortColumns.length > 0) {
         data.sort((a, b) => {
             for (const sort of this.sortColumns) {
                 const aVal = this.getNestedValue(a, sort.column);
                 const bVal = this.getNestedValue(b, sort.column); 
                 let cmp = 0;
                 if (typeof aVal === 'number' && typeof bVal === 'number') {
                     cmp = aVal - bVal;
                 } else {
                     cmp = String(aVal || '').localeCompare(String(bVal || ''));
                 } 
                 if (cmp !== 0) {
                     return sort.direction === 'asc' ? cmp : -cmp;
                 }
             }
             return 0;
         });
     } 
     if (this.config.pagination.type === 'virtual' || this.config.pagination.type === 'infinite') {
         const limit = this.config.pagination.limit * this.currentPage;
         this.items = data.slice(0, limit);
         this.hasMoreData = data.length > limit;
     } else {
         this.totalPages = Math.ceil(this.totalItems / this.config.pagination.limit) || 1;
         const start = (this.currentPage - 1) * this.config.pagination.limit;
         this.items = data.slice(start, start + this.config.pagination.limit);
     } 
     this.renderItems(append);
     this.renderPagination();
     this.updateInfo();
     this.hideLoading(); 
     this.triggerCallback('onDataLoaded', this.items, this); 
     // Salvar estado
     this.saveState();
 };
   
 /**
     * FUNCTION PURPOSE: Avalia recursivamente uma árvore de regras do query builder (condições e grupos) contra um item.
     *
     * DESCRIPTION:
     *    - Cada regra do tipo 'group' é avaliada recursivamente com a sua própria lógica (AND/OR)
     *    - Cada regra do tipo 'condition' é avaliada por evaluateQBCondition()
     *    - A combinação final usa `.some()` para 'OR' e `.every()` para 'AND'
     *
     * DEPENDENCIES:
     *    - evaluateQBCondition()
     *
     * @function   evaluateQBRules
     * @param  {Object}  item   Item de dados a testar
     * @param  {Array}   rules  Lista de regras (condições e/ou grupos)
     * @param  {String}  logic  Lógica de combinação entre as regras: 'AND' ou 'OR'
     * @returns {Boolean} Se o item satisfaz o conjunto de regras
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.evaluateQBRules = function(item, rules, logic) {
     const results = rules.map(rule => {
         if (rule.type === 'group') {
             return this.evaluateQBRules(item, rule.rules, rule.logic);
         }
         return this.evaluateQBCondition(item, rule);
     }); 
     if (logic === 'OR') {
         return results.some(r => r);
     }
     return results.every(r => r);
 };
   
 /**
     * FUNCTION PURPOSE: Avalia uma única condição do query builder (campo + operador + valor) contra um item.
     *
     * DESCRIPTION:
     *    - Comparações de texto (equals, contains, startsWith, ...) são feitas de forma case-insensitive
     *    - Comparações numéricas (greaterThan, between, ...) convertem os valores com `Number()`
     *
     * @function   evaluateQBCondition
     * @param  {Object}  item       Item de dados a testar
     * @param  {Object}  condition  Condição no formato `{ field, operator, value }`
     * @returns {Boolean} Se o valor do campo satisfaz o operador e o valor da condição
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.evaluateQBCondition = function(item, condition) {
     const val = this.getNestedValue(item, condition.field);
     const strVal = String(val || '').toLowerCase();
     const strCond = String(condition.value || '').toLowerCase(); 
     switch (condition.operator) {
         case 'equals': return strVal === strCond;
         case 'notEquals': return strVal !== strCond;
         case 'contains': return strVal.includes(strCond);
         case 'startsWith': return strVal.startsWith(strCond);
         case 'endsWith': return strVal.endsWith(strCond);
         case 'greaterThan': return Number(val) > Number(condition.value);
         case 'lessThan': return Number(val) < Number(condition.value);
         case 'greaterOrEqual': return Number(val) >= Number(condition.value);
         case 'lessOrEqual': return Number(val) <= Number(condition.value);
         case 'isEmpty': return !val || String(val).trim() === '';
         case 'isNotEmpty': return !!val && String(val).trim() !== '';
         case 'between': {
             const parts = String(condition.value).split(',').map(Number);
             return Number(val) >= parts[0] && Number(val) <= parts[1];
         }
         default: return true;
     }
 };
   
 /**
     * FUNCTION PURPOSE: Normaliza e aplica a resposta do servidor (modo server-side) ao estado da instância.
     *
     * DESCRIPTION:
     *    - Aceita várias formas de resposta: array simples, formato DataTables (`recordsTotal`/`recordsFiltered`) ou `{ data: { items, pagination } }`
     *    - Atualiza `this.items`, `this.totalItems` e `this.totalPages`, depois re-renderiza tudo
     *
     * DEPENDENCIES:
     *    - renderItems(), renderPagination(), updateInfo(), saveState()
     *
     * @function   processServerResponse
     * @param  {Object|Array}  response  Resposta crua devolvida pelo endpoint AJAX
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.processServerResponse = function(response) {
     let data = [];
     let total = 0;
     let filtered = 0; 
     if (response.data && Array.isArray(response.data)) {
         data = response.data;
         total = response.recordsTotal || data.length;
         filtered = response.recordsFiltered || total;
     } else if (response.data && response.data.items && Array.isArray(response.data.items)) {
         data = response.data.items;
         total = response.data.pagination?.total || response.recordsTotal || data.length;
         filtered = response.recordsFiltered || total;
     } else if (Array.isArray(response)) {
         data = response;
         total = data.length;
         filtered = total;
     } 
     this.items = data;
     this.totalItems = filtered;
     this.totalPages = Math.ceil(this.totalItems / this.config.pagination.limit) || 1; 
     this.renderItems();
     this.renderPagination();
     this.updateInfo();
     this.hideLoading(); 
     this.triggerCallback('onDataLoaded', this.items, this); 
     this.saveState();
 };
   
 // ============================================================
 // RENDERIZAÇÃO PRINCIPAL
 // ============================================================

 /**
     * FUNCTION PURPOSE: Despacha a renderização dos itens atuais para a função da vista corrente (card/table/list/kanban/custom).
     *
     * DESCRIPTION:
     *    - Mostra o estado vazio configurado (`emptyState`) quando não há itens e não se trata de um append
     *    - Vistas customizadas (não nativas) são suportadas via `viewConfig.renderer(items, $container, instance)` — mecanismo usado pela plugin de árvore
     *
     * ERROR HANDLING:
     *    - Nome de vista desconhecido e sem `renderer` customizado → regista erro na consola
     *
     * @function   renderItems
     * @param  {Boolean}  [append]  Quando `true`, acrescenta aos itens já no DOM em vez de os substituir
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderItems = function(append) {
     if (!append) {
         this.$bodyContainer.empty();
     } 
     if (!this.items || this.items.length === 0) {
         if (!append) {
             const msg = this.config.emptyState.message || this.lang.emptyTable;
             const icon = this.config.emptyState.icon;
             this.$bodyContainer.html(`
                 <div class="text-center py-5">
                     <i class="${icon} fa-3x text-muted mb-3"></i>
                     <p class="text-muted">${msg}</p>
                 </div>
             `);
         }
         return;
     } 
     const viewConfig = this.config.views[this.currentView]; 
     switch (this.currentView) {
         case 'card':
             this.renderCardView(viewConfig, append);
             break;
         case 'table':
             this.renderTableView(viewConfig, append);
             break;
         case 'list':
             this.renderListView(viewConfig, append);
             break;
         case 'kanban':
             this.renderKanbanView(viewConfig);
             break;
         default:
             if (viewConfig && typeof viewConfig.renderer === 'function') {
                 viewConfig.renderer(this.items, this.$bodyContainer, this);
             } else {
                 console.error('DataBox: Visualização não suportada: ' + this.currentView);
             }
     }
 };
   
 // ============================================================
 // CARD VIEW
 // ============================================================

 /**
     * FUNCTION PURPOSE: Renderiza os itens atuais como cartões (grid de cards Bootstrap).
     *
     * DESCRIPTION:
     *    - Usa `viewConfig.template(item, index, instance)` quando fornecido; caso contrário usa um cartão default com nome/descrição
     *    - Suporta 'row details' (expandir/colapsar detalhes de um card) quando `viewConfig.details` está definido
     *    - Em modo `append`, ignora índices já presentes no DOM para não duplicar cartões
     *
     * @function   renderCardView
     * @param  {Object}   viewConfig  Configuração da vista 'card' (template, colunas, classes CSS, details)
     * @param  {Boolean}  [append]    Quando `true`, acrescenta aos cartões já renderizados
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderCardView = function(viewConfig, append) {
     const template = viewConfig.template;
     const columns = viewConfig.columns || 3;
     const colClass = viewConfig.itemCssClass || ('col-md-' + (12 / columns)); 
     let $container;
     if (append) {
         $container = this.$bodyContainer.find('.dataBox-card-container').first();
     }
     if (!$container || $container.length === 0) {
         $container = $('<div class="dataBox-card-container ' + (viewConfig.cssClass || 'row') + '"></div>');
         this.$bodyContainer.append($container);
     } 
     this.items.forEach((item, index) => {
         if (append && $container.find(`[data-databox-index="${index}"]`).length > 0) return; 
         const $col = $('<div class="' + colClass + '"></div>'); 
         if (template && typeof template === 'function') {
             const html = template(item, index, this);
             $col.html(html);
         } else {
             $col.html(`
                 <div class="card h-100" data-databox-item data-databox-index="${index}">
                     <div class="card-body">
                         <h5 class="card-title">${this.escapeHtml(item.name || item.title || item.id || 'Item')}</h5>
                         <p class="card-text text-muted">${this.escapeHtml(item.description || '')}</p>
                     </div>
                 </div>
             `);
         } 
         // Row details para cards
         if (viewConfig.details && typeof viewConfig.details === 'function') {
             const itemId = this.getItemId(item, index);
             const isExpanded = this.expandedRows.has(itemId);
             const $detailsToggle = $('<div class="text-center py-1 text-primary" style="cursor: pointer;"></div>');
             $detailsToggle.html(`<small><i class="fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}"></i> ${isExpanded ? this.lang.rowDetails.collapse : this.lang.rowDetails.expand}</small>`); 
             $detailsToggle.on('click', (e) => {
                 e.stopPropagation();
                 const $card = $col.find('.card');
                 const $details = $card.find('.card-details'); 
                 if ($details.length > 0) {
                     $details.remove();
                     this.expandedRows.delete(itemId);
                     $detailsToggle.html(`<small><i class="fas fa-chevron-down"></i> ${this.lang.rowDetails.expand}</small>`);
                 } else {
                     const detailsHtml = viewConfig.details(item, this);
                     $card.append(`<div class="card-details border-top p-3 bg-light">${detailsHtml}</div>`);
                     this.expandedRows.add(itemId);
                     $detailsToggle.html(`<small><i class="fas fa-chevron-up"></i> ${this.lang.rowDetails.collapse}</small>`);
                 }
             }); 
             $col.find('.card').append($detailsToggle);
         } 
         $container.append($col);
     });
 }; 
 
 // ============================================================
 // TABLE VIEW (com Row Details, Inline Edit, Fixed Columns, Footer, Row Grouping)
 // ============================================================ 

 /**
     * FUNCTION PURPOSE: Renderiza os itens atuais como tabela HTML, com cabeçalho, pesquisa por coluna, rodapé e linhas de dados.
     *
     * DESCRIPTION:
     *    - Desenha o cabeçalho com suporte a ordenação por clique (single e multi-coluna com Shift+clique)
     *    - Desenha a linha de pesquisa por coluna quando `config.search.perColumn` está ativo, com debounce configurável
     *    - Desenha o rodapé com agregações (soma, média, contagem, min, max) quando `viewConfig.footer` está ativo
     *    - Delega as linhas de dados a renderGroupedRows() (com row grouping) ou renderDataRows() (sem agrupamento)
     *
     * BUSINESS LOGIC:
     *    1. Monta a tabela e o cabeçalho, com ícones e handlers de ordenação por coluna ordenável
     *    2. Adiciona a linha de pesquisa por coluna, se ativa
     *    3. Adiciona o rodapé de agregações, se configurado
     *    4. Renderiza as linhas de dados (agrupadas ou não)
     *    5. Substitui (ou acrescenta a) a tabela existente no corpo do DataBox
     *
     * DEPENDENCIES:
     *    - handleSort(), calculateFooter(), renderGroupedRows(), renderDataRows()
     *
     * @function   renderTableView
     * @param  {Object}   viewConfig  Configuração da vista 'table' (colunas, ordenação, rodapé, colunas fixas, etc.)
     * @param  {Boolean}  [append]    Quando `true`, acrescenta à tabela já renderizada
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderTableView = function(viewConfig, append) {
     const allColumns = this.getVisibleColumns();
     if (!allColumns || allColumns.length === 0) {
         console.error('DataBox: Colunas não definidas para visualização de tabela');
         return;
     } 
     const tableClass = viewConfig.cssClass || 'table table-striped table-hover';
     const sortable = viewConfig.sortable !== false && this.config.sorting.active;
     const self = this; 
     const fixedLeft = viewConfig.fixedColumns?.left || 0;
     const fixedRight = viewConfig.fixedColumns?.right || 0;
     const hasFixed = fixedLeft > 0 || fixedRight > 0; 
     // Determinar colunas visíveis e fixas
     let columns = allColumns;
     const selectionColumn = this.config.selection.active && this.config.selection.checkbox;
     const detailsColumn = viewConfig.details && typeof viewConfig.details === 'function'; 
     const $wrapper = viewConfig.responsive
         ? $('<div class="table-responsive" style="' + (hasFixed ? 'position: relative;' : '') + '"></div>')
         : $('<div style="' + (hasFixed ? 'position: relative;' : '') + '"></div>'); 
     const $table = $('<table class="' + tableClass + '"></table>');
     const $thead = $('<thead></thead>');
     const $tbody = $('<tbody></tbody>');
     const $tfoot = viewConfig.footer ? $('<tfoot></tfoot>') : null; 
     // ========== CABEÇALHO ==========
     const $headerRow = $('<tr></tr>'); 
     // Expandir/colapsar detalhes
     if (detailsColumn) {
         $headerRow.append('<th style="width: 30px;"></th>');
     } 
     // Checkbox global
     if (selectionColumn) {
         $headerRow.append(`
             <th style="width: 40px;">
                 <input type="checkbox" data-databox-select-all>
             </th>
         `);
     } 
     columns.forEach((column, colIdx) => {
         const isSortable = sortable && column.orderable !== false;
         const sortState = isSortable ? self.getSortState(column.data) : null;
         let sortIcon = '';
         let sortClass = '';
     
         if (sortState === 'asc') {
             sortIcon = ' <i class="fas fa-sort-up"></i>';
             sortClass = ' sorting_asc';
         } else if (sortState === 'desc') {
             sortIcon = ' <i class="fas fa-sort-down"></i>';
             sortClass = ' sorting_desc';
         } else if (isSortable) {
             sortClass = ' sorting';
         }
     
         let fixedClass = '';
         const styleProps = [];
     
         if (hasFixed) {
             if (colIdx < fixedLeft) {
                 fixedClass = ' position-sticky';
                 styleProps.push(`left: ${colIdx * 100}px`, 'z-index: 10', 'background: inherit');
             } else if (colIdx >= columns.length - fixedRight) {
                 fixedClass = ' position-sticky';
                 styleProps.push(`right: ${(columns.length - 1 - colIdx) * 100}px`, 'z-index: 10', 'background: inherit');
             }
         }
     
         if (isSortable) {
             styleProps.push('cursor: pointer');
         }
     
         const styleAttr = styleProps.length > 0 ? `style="${styleProps.join('; ')}"` : '';
     
         const th = $(`<th class="${sortClass}${fixedClass}" ${styleAttr}>
             ${column.title}${sortIcon}
         </th>`);
     
         if (isSortable) {
             th.on('click', function(e) {
                 self.handleSort(column.data, e.shiftKey);
             });
         }
     
         $headerRow.append(th);
     }); 
     $thead.append($headerRow); 
     // ========== LINHA DE PESQUISA POR COLUNA ==========
     if (this.config.search.perColumn) {
         const $filterRow = $('<tr></tr>'); 
         if (detailsColumn) $filterRow.append('<th></th>');
         if (selectionColumn) $filterRow.append('<th></th>'); 
         columns.forEach(column => {
             if (column.searchable !== false) {
                 const val = this.columnSearch[column.data] || '';
                 $filterRow.append(`
                     <th>
                         <input type="text" class="form-control form-control-sm"
                                placeholder="${this.lang.searchColumn}..."
                                data-column-search="${column.data}"
                                value="${this.escapeHtml(val)}">
                     </th>
                 `);
             } else {
                 $filterRow.append('<th></th>');
             }
         }); 
         $thead.append($filterRow); 
         $filterRow.find('[data-column-search]').on('input', function() {
             const col = $(this).data('column-search');
             const val = $(this).val();
             clearTimeout(self.columnSearchTimers[col]);
             self.columnSearchTimers[col] = setTimeout(() => {
                 self.columnSearch[col] = val;
                 self.currentPage = 1;
                 self.loadData();
             }, self.config.search.debounce);
         });
     } 
     // ========== RODAPÉ COM AGREGAÇÕES ==========
     if ($tfoot && viewConfig.footer) {
         const $footerRow = $('<tr class="table-group-divider fw-bold"></tr>');
         if (detailsColumn) $footerRow.append('<td></td>');
         if (selectionColumn) $footerRow.append('<td></td>'); 
         columns.forEach(column => {
             let content = '';
             if (column.footer) {
                 if (typeof column.footer === 'function') {
                     content = column.footer(this.items, this);
                 } else if (typeof column.footer === 'string') {
                     const rawValue = this.calculateFooter(column.footer, column.data);
                     content = typeof rawValue === 'number' ? rawValue.toLocaleString() : rawValue;
                 } else if (typeof column.footer === 'object' && column.footer.type) {
                     const rawValue = this.calculateFooter(column.footer.type, column.data);
         
                     if (typeof column.footer.format === 'function') {
                         content = column.footer.format(rawValue, this.items, column, this);
                     } else {
                         const formattedNumber = typeof rawValue === 'number'
                             ? rawValue.toLocaleString(column.footer.locale || undefined, column.footer.numberFormat || undefined)
                             : rawValue;
                         content = `${column.footer.prefix || ''}${formattedNumber}${column.footer.suffix || ''}`;
                     }
                 }
             }
             $footerRow.append(`<td>${content}</td>`);
         });
         $tfoot.append($footerRow);
     } 
     // ========== LINHAS DE DADOS COM ROW GROUPING ==========
     if (this.config.rowGroup.active && this.config.rowGroup.dataSrc) {
         this.renderGroupedRows($tbody, columns, viewConfig, selectionColumn, detailsColumn);
     } else {
         this.renderDataRows($tbody, this.items, columns, viewConfig, selectionColumn, detailsColumn);
     } 
     $table.append($thead).append($tbody);
     if ($tfoot) $table.append($tfoot);
     $wrapper.append($table); 
     if (append) {
         this.$bodyContainer.find('.table-responsive, .table-container').append($wrapper.children());
     } else {
         const $existing = this.$bodyContainer.find('.table-responsive, .table-container');
         if ($existing.length > 0) $existing.remove();
         this.$bodyContainer.append($wrapper);
     }
 };
 
 /**
     * FUNCTION PURPOSE: Agrupa as linhas da tabela por um campo (`rowGroup.dataSrc`) e desenha um cabeçalho de grupo colapsável por cada valor.
     *
     * DESCRIPTION:
     *    - Usa `rowGroup.startRender`/`endRender` quando fornecidos; caso contrário desenha um cabeçalho default com contagem
     *    - Quando `rowGroup.collapse` está ativo, o cabeçalho do grupo alterna a visibilidade das suas linhas ao clicar
     *
     * DEPENDENCIES:
     *    - getNestedValue(), renderDataRows()
     *
     * @function   renderGroupedRows
     * @param  {jQuery}   $tbody           Elemento <tbody> onde os grupos são inseridos
     * @param  {Array}    columns          Colunas visíveis a desenhar em cada linha
     * @param  {Object}   viewConfig       Configuração da vista 'table'
     * @param  {Boolean}  selectionColumn  Se deve reservar uma coluna para checkboxes de seleção
     * @param  {Boolean}  detailsColumn    Se deve reservar uma coluna para o toggle de detalhes
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderGroupedRows = function($tbody, columns, viewConfig, selectionColumn, detailsColumn) {
     const groupField = this.config.rowGroup.dataSrc;
     const groups = {}; 
     this.items.forEach((item, index) => {
         const groupVal = this.getNestedValue(item, groupField) || 'Sem grupo';
         if (!groups[groupVal]) groups[groupVal] = [];
         groups[groupVal].push({ item, index });
     }); 
     for (const groupName in groups) {
         const rows = groups[groupName]; 
         // Cabeçalho do grupo
         if (this.config.rowGroup.startRender && typeof this.config.rowGroup.startRender === 'function') {
             const $groupHeader = $(this.config.rowGroup.startRender(groupName, rows.map(r => r.item), this));
             $tbody.append($groupHeader);
         } else {
             const colspan = columns.length + (selectionColumn ? 1 : 0) + (detailsColumn ? 1 : 0);
             const $groupRow = $(`
                 <tr class="table-secondary">
                     <td colspan="${colspan}">
                         <strong><i class="fas fa-folder me-2"></i>${this.escapeHtml(groupName)}</strong>
                         <span class="badge bg-secondary ms-2">${rows.length}</span>
                     </td>
                 </tr>
             `); 
             if (this.config.rowGroup.collapse) {
                 $groupRow.css('cursor', 'pointer');
                 $groupRow.on('click', function() {
                     const $icon = $(this).find('.fa-folder, .fa-folder-open');
                     const isCollapsed = $icon.hasClass('fa-folder');
                     $icon.toggleClass('fa-folder fa-folder-open');
                     rows.forEach(({ index }) => {
                         $tbody.find(`tr[data-databox-index="${index}"]`).toggle();
                     });
                 });
             } 
             $tbody.append($groupRow);
         } 
         this.renderDataRows($tbody, rows.map(r => r.item), columns, viewConfig, selectionColumn, detailsColumn, true); 
         // Rodapé do grupo
         if (this.config.rowGroup.endRender && typeof this.config.rowGroup.endRender === 'function') {
             const $groupFooter = $(this.config.rowGroup.endRender(groupName, rows.map(r => r.item), this));
             $tbody.append($groupFooter);
         }
     }
 }; 
 
 /**
     * FUNCTION PURPOSE: Desenha as linhas <tr> de dados da tabela, incluindo seleção, edição inline, detalhes expansíveis e colunas fixas.
     *
     * DESCRIPTION:
     *    - Cada linha reflete o estado de seleção atual (`this.selectedItems`) e liga o handler de expandir/colapsar detalhes
     *    - Colunas com `editable: true` ficam clicáveis para iniciar edição inline (startInlineEdit)
     *    - Suporta `fixedColumns.left`/`right`, aplicando `position: sticky` às colunas indicadas
     *
     * DEPENDENCIES:
     *    - getItemId(), toggleRowDetails(), startInlineEdit(), getNestedValue()
     *
     * @function   renderDataRows
     * @param  {jQuery}   $tbody           Elemento <tbody> onde as linhas são inseridas
     * @param  {Array}    items            Itens a desenhar (pode ser um subconjunto, quando chamado a partir de um grupo)
     * @param  {Array}    columns          Colunas visíveis a desenhar em cada linha
     * @param  {Object}   viewConfig       Configuração da vista 'table'
     * @param  {Boolean}  selectionColumn  Se deve desenhar a coluna de checkbox de seleção
     * @param  {Boolean}  detailsColumn    Se deve desenhar a coluna de toggle de detalhes
     * @param  {Boolean}  [isGrouped]      Se as linhas pertencem a um grupo (afeta apenas metadados visuais)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderDataRows = function($tbody, items, columns, viewConfig, selectionColumn, detailsColumn, isGrouped) {
     const self = this;
     const fixedLeft = viewConfig.fixedColumns?.left || 0;
     const fixedRight = viewConfig.fixedColumns?.right || 0;
     const hasFixed = fixedLeft > 0 || fixedRight > 0; 
     items.forEach((item, index) => {
         const globalIndex = this.items.indexOf(item);
         const itemId = this.getItemId(item, globalIndex);
         const $row = $('<tr data-databox-item data-databox-index="' + globalIndex + '"></tr>'); 
         if (this.selectedItems.has(itemId)) {
             $row.addClass('selected active');
         } 
         // Expandir/colapsar detalhes
         if (detailsColumn) {
             const isExpanded = this.expandedRows.has(itemId);
             const $toggle = $(`<td style="width: 30px; cursor: pointer;" class="details-toggle">
                 <i class="fas ${isExpanded ? 'fa-minus-circle' : 'fa-plus-circle'} text-primary"></i>
             </td>`);
             $toggle.on('click', function(e) {
                 e.stopPropagation();
                 self.toggleRowDetails(item, globalIndex, $row, viewConfig);
             });
             $row.append($toggle);
         } 
         // Checkbox
         if (selectionColumn) {
             const checked = this.selectedItems.has(itemId) ? 'checked' : '';
             $row.append(`<td style="width: 40px;"><input type="checkbox" data-databox-checkbox ${checked}></td>`);
         } 
         columns.forEach((column, colIdx) => {
             let cellContent = '';
             const rawValue = this.getNestedValue(item, column.data); 
             if (column.render && typeof column.render === 'function') {
                 cellContent = column.render(rawValue, item, 'display');
             } else {
                 cellContent = rawValue !== undefined && rawValue !== null
                     ? this.escapeHtml(rawValue)
                     : '';
             } 
             // Inline editing
             const canEdit = viewConfig.inlineEdit && column.editable;
             let fixedStyle = '';
             let fixedClass = ''; 
             if (hasFixed) {
                 if (colIdx < fixedLeft) {
                     fixedClass = ' position-sticky';
                     fixedStyle = `left: ${colIdx * 100}px; z-index: 5; background: inherit;`;
                 } else if (colIdx >= columns.length - fixedRight) {
                     fixedClass = ' position-sticky';
                     fixedStyle = `right: ${(columns.length - 1 - colIdx) * 100}px; z-index: 5; background: inherit;`;
                 }
             } 
             const tdClass = (column.className || '') + fixedClass; 
             if (canEdit) {
                 const editType = column.editType || 'text';
                 const $cell = $(`<td class="${tdClass}" style="${fixedStyle}" data-editable="true" data-edit-type="${editType}" data-edit-field="${column.data}">
                     <span class="edit-display">${cellContent}</span>
                     <span class="edit-controls d-none">
                         <button class="btn btn-sm btn-link text-success p-0 me-1" data-edit-save><i class="fas fa-check"></i></button>
                         <button class="btn btn-sm btn-link text-danger p-0" data-edit-cancel><i class="fas fa-times"></i></button>
                     </span>
                 </td>`); 
                 $cell.on('dblclick', function() {
                     self.startInlineEdit($cell, item, column, rawValue);
                 }); 
                 $cell.on('click', '[data-edit-save]', function(e) {
                     e.stopPropagation();
                     self.saveInlineEdit($cell, item, column);
                 }); 
                 $cell.on('click', '[data-edit-cancel]', function(e) {
                     e.stopPropagation();
                     self.cancelInlineEdit($cell, cellContent);
                 }); 
                 $row.append($cell);
             } else {
                 $row.append(`<td class="${tdClass}" style="${fixedStyle}">${cellContent}</td>`);
             }
         }); 
         $tbody.append($row); 
         // Row details expandidos
         if (detailsColumn && this.expandedRows.has(itemId)) {
             const detailsHtml = viewConfig.details(item, this);
             const colspan = columns.length + (selectionColumn ? 1 : 0) + (detailsColumn ? 1 : 0);
             const $detailsRow = $(`<tr class="table-light" data-details-row="${globalIndex}">
                 <td colspan="${colspan}">${detailsHtml}</td>
             </tr>`);
             $tbody.append($detailsRow);
         }
     });
 }; 
   
 /**
     * FUNCTION PURPOSE: Expande ou colapsa a linha de detalhes associada a uma linha da tabela.
     *
     * DESCRIPTION:
     *    - Se já existir uma linha de detalhes a seguir à linha atual, remove-a (colapsa)
     *    - Caso contrário, gera o HTML de detalhes via `viewConfig.details(item, instance)` e insere-o numa nova linha
     *    - Dispara `onRowExpand`/`onRowCollapse` conforme a ação
     *
     * @function   toggleRowDetails
     * @param  {Object}  item        Item cujos detalhes se está a alternar
     * @param  {Number}  index       Índice do item em `this.items`
     * @param  {jQuery}  $row        Linha <tr> principal do item
     * @param  {Object}  viewConfig  Configuração da vista 'table' (fornece a função `details`)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.toggleRowDetails = function(item, index, $row, viewConfig) {
     const itemId = this.getItemId(item, index);
     const $toggle = $row.find('.details-toggle i');
     const $next = $row.next(); 
     if ($next.is('[data-details-row]')) {
         $next.remove();
         this.expandedRows.delete(itemId);
         $toggle.removeClass('fa-minus-circle').addClass('fa-plus-circle');
         this.triggerCallback('onRowCollapse', item, index, this);
     } else {
         const detailsHtml = viewConfig.details(item, this);
         const colspan = this.getVisibleColumns().length +
             (this.config.selection.active && this.config.selection.checkbox ? 1 : 0) +
             (viewConfig.details ? 1 : 0);
         const $detailsRow = $(`<tr class="table-light" data-details-row="${index}">
             <td colspan="${colspan}">${detailsHtml}</td>
         </tr>`);
         $row.after($detailsRow);
         this.expandedRows.add(itemId);
         $toggle.removeClass('fa-plus-circle').addClass('fa-minus-circle');
         this.triggerCallback('onRowExpand', item, index, this);
     }
 }; 
   
 // ============================================================
 // INLINE EDITING
 // ============================================================

 /**
     * FUNCTION PURPOSE: Substitui o conteúdo de uma célula pelo respetivo input de edição (texto, número, data, select ou checkbox).
     *
     * DESCRIPTION:
     *    - O tipo de input é determinado por `column.editType` (default: 'text')
     *    - Liga Enter para guardar (saveInlineEdit) e Escape para cancelar (cancelInlineEdit)
     *
     * DEPENDENCIES:
     *    - saveInlineEdit(), cancelInlineEdit()
     *
     * @function   startInlineEdit
     * @param  {jQuery}  $cell         Célula da tabela a colocar em edição
     * @param  {Object}  item          Item de dados correspondente à linha
     * @param  {Object}  column        Definição da coluna (fornece `editType`, `editOptions`, `data`)
     * @param  {*}       currentValue  Valor atual do campo, usado para pré-preencher o input
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.startInlineEdit = function($cell, item, column, currentValue) {
     const editType = column.editType || 'text';
     const field = column.data;
     let $input; 
     const val = currentValue !== undefined && currentValue !== null ? this.escapeHtml(currentValue) : ''; 
     switch (editType) {
         case 'select':
             $input = $('<select class="form-select form-select-sm"></select>');
             (column.editOptions || []).forEach(opt => {
                 const selected = String(currentValue) === String(opt.value) ? 'selected' : '';
                 $input.append(`<option value="${opt.value}" ${selected}>${opt.label}</option>`);
             });
             break;
         case 'checkbox':
             $input = $(`<input type="checkbox" ${currentValue ? 'checked' : ''}>`);
             break;
         case 'date':
             $input = $(`<input type="date" class="form-control form-control-sm" value="${val}">`);
             break;
         case 'number':
             $input = $(`<input type="number" class="form-control form-control-sm" value="${val}">`);
             break;
         default:
             $input = $(`<input type="text" class="form-control form-control-sm" value="${val}">`);
     } 
     const $display = $cell.find('.edit-display');
     const $controls = $cell.find('.edit-controls'); 
     $display.addClass('d-none');
     $controls.removeClass('d-none');
     $cell.find('.inline-edit-input').remove();
     $cell.prepend($input.addClass('inline-edit-input')); 
     if (editType !== 'checkbox') {
         $input.focus().select();
     } 
     $input.on('keypress', (e) => {
         if (e.which === 13) this.saveInlineEdit($cell, item, column);
         if (e.which === 27) this.cancelInlineEdit($cell, $display.html());
     });
 };
   
 /**
     * FUNCTION PURPOSE: Confirma a edição inline: lê o valor do input, atualiza o item e volta ao modo de exibição.
     *
     * DESCRIPTION:
     *    - Dispara `onEdit` e o `column.onEdit` (se definido) com o valor novo e o antigo
     *    - Re-renderiza a célula usando `column.render`, se definido, ou o valor escapado em texto simples
     *
     * DEPENDENCIES:
     *    - updateItemData()
     *
     * @function   saveInlineEdit
     * @param  {jQuery}  $cell   Célula em edição
     * @param  {Object}  item    Item de dados a atualizar
     * @param  {Object}  column  Definição da coluna que está a ser editada
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.saveInlineEdit = function($cell, item, column) {
     const editType = $cell.data('edit-type');
     const $input = $cell.find('.inline-edit-input');
     let newValue; 
     if (editType === 'checkbox') {
         newValue = $input.is(':checked');
     } else {
         newValue = $input.val();
     } 
     const oldValue = this.getNestedValue(item, column.data);
     const itemId = this.getItemId(item); 
     this.triggerCallback('onEdit', newValue, oldValue, item, column, this); 
     if (column.onEdit && typeof column.onEdit === 'function') {
         column.onEdit(newValue, oldValue, item, column);
     } 
     // Atualizar o item
     this.updateItemData(item, column.data, newValue); 
     // Re-renderizar célula
     const $display = $cell.find('.edit-display');
     const $controls = $cell.find('.edit-controls'); 
     if (column.render && typeof column.render === 'function') {
         $display.html(column.render(newValue, item, 'display'));
     } else {
         $display.html(this.escapeHtml(newValue));
     } 
     $input.remove();
     $display.removeClass('d-none');
     $controls.addClass('d-none');
 }; 
   
 /**
     * FUNCTION PURPOSE: Cancela a edição inline em curso, repondo o conteúdo original da célula sem guardar alterações.
     *
     * DESCRIPTION:
     *    - Remove o input de edição e restaura o HTML de exibição fornecido
     *
     * @function   cancelInlineEdit
     * @param  {jQuery}  $cell            Célula em edição
     * @param  {String}  originalContent  HTML original da célula, a repor
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.cancelInlineEdit = function($cell, originalContent) {
     const $input = $cell.find('.inline-edit-input');
     const $display = $cell.find('.edit-display');
     const $controls = $cell.find('.edit-controls'); 
     $input.remove();
     $display.html(originalContent).removeClass('d-none');
     $controls.addClass('d-none');
 };
   
 /**
     * FUNCTION PURPOSE: Atualiza um valor num item de dados, a partir de um caminho em notação de ponto (suporta campos aninhados).
     *
     * DESCRIPTION:
     *    - Percorre o caminho até ao penúltimo segmento e atribui o valor final na última propriedade
     *    - Muta o item diretamente (não devolve uma cópia) — usada após edição inline e drop no kanban
     *
     * @function   updateItemData
     * @param  {Object}  item   Item de dados a atualizar
     * @param  {String}  path   Caminho em notação de ponto até ao campo (ex.: 'endereco.cidade')
     * @param  {*}       value  Novo valor a atribuir
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.updateItemData = function(item, path, value) {
     const parts = path.split('.');
     let current = item;
     for (let i = 0; i < parts.length - 1; i++) {
         current = current[parts[i]];
     }
     current[parts[parts.length - 1]] = value;
 };
   
 // ============================================================
 // FOOTER COM AGREGAÇÕES
 // ============================================================

 /**
     * FUNCTION PURPOSE: Calcula uma agregação (soma, média, contagem, mínimo ou máximo) sobre um campo dos itens da página atual.
     *
     * DESCRIPTION:
     *    - Os valores não numéricos são tratados como 0 antes da agregação
     *    - Opera apenas sobre `this.items` (página atual), não sobre o conjunto total filtrado
     *
     * @function   calculateFooter
     * @param  {String}  aggregation  Tipo de agregação: 'sum' | 'avg' | 'count' | 'min' | 'max'
     * @param  {String}  field        Campo (notação de ponto) sobre o qual agregar
     * @returns {Number|String} Resultado da agregação, ou string vazia para um tipo desconhecido
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.calculateFooter = function(aggregation, field) {
     const values = this.items.map(item => {
         const val = this.getNestedValue(item, field);
         return Number(val) || 0;
     }); 
     switch (aggregation) {
         case 'sum':
             return values.reduce((a, b) => a + b, 0);
         case 'avg':
             return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
         case 'count':
             return values.length;
         case 'min':
             return values.length ? Math.min(...values) : 0;
         case 'max':
             return values.length ? Math.max(...values) : 0;
         default:
             return '';
     }
 };
 
 // ============================================================
 // LIST VIEW
 // ============================================================

 /**
     * FUNCTION PURPOSE: Renderiza os itens atuais como uma lista (list-group Bootstrap).
     *
     * DESCRIPTION:
     *    - Usa `viewConfig.template(item, index, instance)` quando fornecido; caso contrário usa um item default com nome/descrição
     *    - Suporta 'row details' (expandir/colapsar detalhes) tal como a vista card
     *    - Em modo `append`, ignora índices já presentes no DOM para não duplicar itens
     *
     * @function   renderListView
     * @param  {Object}   viewConfig  Configuração da vista 'list' (template, classes CSS, details)
     * @param  {Boolean}  [append]    Quando `true`, acrescenta aos itens já renderizados
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderListView = function(viewConfig, append) {
     const template = viewConfig.template;
     const listClass = viewConfig.cssClass || 'list-group';
     const itemClass = viewConfig.itemCssClass || 'list-group-item';
     let $list; 
     if (append) {
         $list = this.$bodyContainer.find('.dataBox-list-container').first();
     }
     if (!$list || $list.length === 0) {
         $list = $('<div class="' + listClass + ' dataBox-list-container"></div>');
         this.$bodyContainer.append($list);
     } 
     this.items.forEach((item, index) => {
         if (append && $list.find(`[data-databox-index="${index}"]`).length > 0) return; 
         const $item = $('<div class="' + itemClass + '" data-databox-item data-databox-index="' + index + '"></div>'); 
         if (template && typeof template === 'function') {
             $item.html(template(item, index, this));
         } else {
             $item.html(`
                 <div class="d-flex w-100 justify-content-between">
                     <h5 class="mb-1">${this.escapeHtml(item.name || item.title || item.id || 'Item')}</h5>
                 </div>
                 <p class="mb-1">${this.escapeHtml(item.description || '')}</p>
             `);
         } 
         // Row details para lista
         if (viewConfig.details && typeof viewConfig.details === 'function') {
             const itemId = this.getItemId(item, index);
             const isExpanded = this.expandedRows.has(itemId);
             const $detailsToggle = $('<div class="text-primary mt-1" style="cursor: pointer;"></div>');
             $detailsToggle.html(`<small><i class="fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}"></i> ${isExpanded ? this.lang.rowDetails.collapse : this.lang.rowDetails.expand}</small>`); 
             $detailsToggle.on('click', (e) => {
                 e.stopPropagation();
                 const $details = $item.find('.list-details');
                 if ($details.length > 0) {
                     $details.remove();
                     this.expandedRows.delete(itemId);
                     $detailsToggle.html(`<small><i class="fas fa-chevron-down"></i> ${this.lang.rowDetails.expand}</small>`);
                 } else {
                     const detailsHtml = viewConfig.details(item, this);
                     $item.append(`<div class="list-details border-top mt-2 pt-2">${detailsHtml}</div>`);
                     this.expandedRows.add(itemId);
                     $detailsToggle.html(`<small><i class="fas fa-chevron-up"></i> ${this.lang.rowDetails.collapse}</small>`);
                 }
             }); 
             $item.append($detailsToggle);
         } 
         $list.append($item);
     });
 };
   
 // ============================================================
 // KANBAN VIEW
 // ============================================================

 /**
     * FUNCTION PURPOSE: Renderiza os itens atuais como quadro Kanban, agrupados por `viewConfig.groupBy`, com colunas ordenadas alfabeticamente.
     *
     * DESCRIPTION:
     *    - Exige `viewConfig.groupBy` — regista erro e aborta se não estiver definido
     *    - Cada coluna usa `columnHeader`/`cardTemplate` customizados quando fornecidos, ou um cabeçalho/cartão default
     *    - Ativa drag & drop entre colunas via setupKanbanDragDrop() quando `allowDragDrop` está ligado
     *
     * ERROR HANDLING:
     *    - `viewConfig.groupBy` não definido → regista erro na consola e sai sem renderizar
     *
     * DEPENDENCIES:
     *    - getNestedValue(), setupKanbanDragDrop()
     *
     * @function   renderKanbanView
     * @param  {Object}  viewConfig  Configuração da vista 'kanban' (groupBy, templates, classes CSS)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderKanbanView = function(viewConfig) {
     const groupBy = viewConfig.groupBy;
     if (!groupBy) {
         console.error('DataBox: groupBy é obrigatório para a view Kanban');
         return;
     } 
     const self = this;
     const groups = {};
     const allValues = new Set(); 
     this.items.forEach((item, index) => {
         const groupVal = this.getNestedValue(item, groupBy) || 'Sem grupo';
         allValues.add(groupVal);
         if (!groups[groupVal]) groups[groupVal] = [];
         groups[groupVal].push({ item, index });
     }); 
     // Ordenar grupos
     const sortedGroups = Array.from(allValues).sort(); 
     const $container = $('<div class="' + (viewConfig.cssClass || 'row flex-nowrap overflow-auto pb-3') + '" style="min-height: 500px;"></div>'); 
     sortedGroups.forEach((groupName, colIdx) => {
         const rows = groups[groupName] || [];
         const colClass = viewConfig.columnCssClass || 'col-md-3';
         const itemColClass = viewConfig.columnItemCssClass || 'col-12 mb-2'; 
         let headerHtml;
         if (viewConfig.columnHeader && typeof viewConfig.columnHeader === 'function') {
             headerHtml = viewConfig.columnHeader(groupName, rows.length, this);
         } else {
             headerHtml = `
                 <div class="d-flex align-items-center justify-content-between">
                     <strong>${this.escapeHtml(groupName)}</strong>
                     <span class="badge bg-secondary">${rows.length}</span>
                 </div>
             `;
         } 
         const $column = $(`
             <div class="${colClass}" data-kanban-column="${this.escapeHtml(groupName)}">
                 <div class="card border-0 shadow-sm">
                     <div class="card-header bg-light">${headerHtml}</div>
                     <div class="card-body kanban-dropzone p-2" style="min-height: 200px; background: #f8f9fa;">
                     </div>
                 </div>
             </div>
         `); 
         const $dropzone = $column.find('.kanban-dropzone'); 
         rows.forEach(({ item, index }) => {
             const $card = $('<div class="card mb-2 shadow-sm kanban-card" draggable="' + (viewConfig.allowDragDrop ? 'true' : 'false') + '" data-databox-item data-databox-index="' + index + '"></div>'); 
             if (viewConfig.cardTemplate && typeof viewConfig.cardTemplate === 'function') {
                 $card.html(viewConfig.cardTemplate(item, index, this));
             } else {
                 $card.html(`
                     <div class="card-body p-2">
                         <strong>${this.escapeHtml(item.name || item.title || item.id || 'Item')}</strong>
                         <p class="small text-muted mb-0">${this.escapeHtml(item.description || '')}</p>
                     </div>
                 `);
             } 
             $dropzone.append($card);
         }); 
         // Drag & drop
         if (viewConfig.allowDragDrop) {
             this.setupKanbanDragDrop($dropzone, $column);
         } 
         $container.append($column);
     }); 
     this.$bodyContainer.append($container);
 }; 
 
 /**
     * FUNCTION PURPOSE: Liga os eventos HTML5 de drag & drop que permitem mover um cartão do Kanban entre colunas (grupos).
     *
     * DESCRIPTION:
     *    - Ao largar um cartão numa coluna diferente, atualiza o campo `groupBy` do item via updateItemData()
     *    - Dispara `onKanbanDrop` apenas quando o grupo de destino é realmente diferente do atual
     *
     * DEPENDENCIES:
     *    - getNestedValue(), updateItemData()
     *
     * @function   setupKanbanDragDrop
     * @param  {jQuery}  $dropzone  Área de largar da coluna (onde os cartões são desenhados)
     * @param  {jQuery}  $column    Elemento da coluna, usado para identificar o grupo de destino
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.setupKanbanDragDrop = function($dropzone, $column) {
     const self = this; 
     $dropzone.on('dragstart', '.kanban-card', function(e) {
         $(this).addClass('dragging');
         e.originalEvent.dataTransfer.effectAllowed = 'move';
         e.originalEvent.dataTransfer.setData('text/plain', $(this).data('databox-index'));
     }); 
     $dropzone.on('dragend', '.kanban-card', function() {
         $(this).removeClass('dragging');
         $('.kanban-dropzone').removeClass('drag-over');
     }); 
     $dropzone.on('dragover', function(e) {
         e.preventDefault();
         e.originalEvent.dataTransfer.dropEffect = 'move';
         $(this).addClass('drag-over');
     }); 
     $dropzone.on('dragleave', function() {
         $(this).removeClass('drag-over');
     }); 
     $dropzone.on('drop', function(e) {
         e.preventDefault();
         $(this).removeClass('drag-over'); 
         const index = parseInt(e.originalEvent.dataTransfer.getData('text/plain'));
         const item = self.items[index];
         if (!item) return; 
         const newGroup = $column.data('kanban-column');
         const groupBy = self.config.views.kanban.groupBy;
         const oldValue = self.getNestedValue(item, groupBy); 
         if (String(oldValue) !== String(newGroup)) {
             // Mover visualmente
             const $card = self.$bodyContainer.find(`.kanban-card[data-databox-index="${index}"]`);
             $(this).append($card); 
             // Atualizar dados
             self.updateItemData(item, groupBy, newGroup); 
             self.triggerCallback('onKanbanDrop', item, oldValue, newGroup, self);
         }
     });
 }; 
 
 // ============================================================
 // ORDENAÇÃO (SORTING)
 // ============================================================ 

 /**
     * FUNCTION PURPOSE: Devolve o estado de ordenação atual de uma coluna.
     *
     * DESCRIPTION:
     *    - Usada pelo cabeçalho da tabela para escolher o ícone de ordenação a mostrar
     *
     * @function   getSortState
     * @param  {String}  column  Nome do campo/coluna
     * @returns {String} 'asc' | 'desc' | 'none'
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getSortState = function(column) {
     const sort = this.sortColumns.find(s => s.column === column);
     return sort ? sort.direction : 'none';
 }; 
   
 /**
     * FUNCTION PURPOSE: Processa um clique de ordenação numa coluna, alternando entre ascendente → descendente → sem ordenação.
     *
     * DESCRIPTION:
     *    - Com Shift premido (ou `multiColumn` sempre ativo), acumula a coluna às já ordenadas (ordenação multi-coluna)
     *    - Sem Shift, substitui a ordenação atual por uma ordenação de coluna única
     *    - Reinicia a página atual para 1 antes de aplicar a nova ordenação
     *
     * ERROR HANDLING:
     *    - `config.sorting.active` desligado → sai sem qualquer efeito
     *
     * DEPENDENCIES:
     *    - applySort()
     *
     * @function   handleSort
     * @param  {String}   column  Nome do campo/coluna clicada
     * @param  {Boolean}  multi   Se o clique pediu ordenação multi-coluna (ex.: Shift+clique)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.handleSort = function(column, multi) {
     if (!this.config.sorting.active) return; 
     const existingIndex = this.sortColumns.findIndex(s => s.column === column);
     let newDirection = 'asc'; 
     if (existingIndex >= 0) {
         const current = this.sortColumns[existingIndex].direction;
         if (current === 'asc') newDirection = 'desc';
         else if (current === 'desc') {
             this.sortColumns.splice(existingIndex, 1);
             this.applySort();
             return;
         }
         this.sortColumns[existingIndex].direction = newDirection;
     } else {
         if (!multi || !this.config.sorting.multiColumn) {
             this.sortColumns = [];
         }
         this.sortColumns.push({ column, direction: newDirection });
     } 
     this.currentPage = 1;
     this.applySort();
 };
   
 /**
     * FUNCTION PURPOSE: Aplica a ordenação atual (`this.sortColumns`), recarregando os dados no modo apropriado.
     *
     * DESCRIPTION:
     *    - Dispara `onSort` com uma cópia do estado de ordenação, antes de recarregar
     *    - Em server-side delega em loadData() (o servidor ordena); em client-side delega em processClientSide()
     *
     * DEPENDENCIES:
     *    - loadData(), processClientSide()
     *
     * @function   applySort
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.applySort = function() {
     this.triggerCallback('onSort', [...this.sortColumns], this); 
     if (this.config.ajax.serverSide) {
         this.loadData();
     } else {
         this.processClientSide();
     }
 }; 
   
 /**
     * FUNCTION PURPOSE: API pública: define programaticamente a ordenação por uma única coluna.
     *
     * DESCRIPTION:
     *    - Substitui qualquer ordenação multi-coluna existente por esta única regra
     *
     * DEPENDENCIES:
     *    - applySort()
     *
     * @function   sort
     * @param  {String}  column       Nome do campo/coluna a ordenar
     * @param  {String}  [direction]  'asc' ou 'desc' (default: 'asc')
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.sort = function(column, direction) {
     this.sortColumns = [{ column, direction: direction || 'asc' }];
     this.currentPage = 1;
     this.applySort();
     return this;
 };
   
 /**
     * FUNCTION PURPOSE: API pública: remove toda a ordenação ativa e recarrega os dados na ordem original.
     *
     * DESCRIPTION:
     *    - Esvazia `this.sortColumns` e reinicia a página atual para 1
     *    - Delega em applySort() para recarregar os dados já sem ordenação
     *
     * DEPENDENCIES:
     *    - applySort()
     *
     * @function   clearSort
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.clearSort = function() {
     this.sortColumns = [];
     this.currentPage = 1;
     this.applySort();
     return this;
 };
   
 // ============================================================
 // PAGINAÇÃO
 // ============================================================
 
 /**
     * FUNCTION PURPOSE: Desenha a barra de paginação (info, seletor de limite, navegação por página e 'ir para').
     *
     * DESCRIPTION:
     *    - Em modo virtual/infinite não desenha controlos de página — mostra apenas a mensagem de 'sem mais dados', quando aplicável
     *    - Calcula uma janela de botões de página centrada na página atual, limitada por `pagination.maxButtons`
     *    - Liga os handlers de clique de página, alteração de limite por página e o campo 'ir para página'
     *
     * @function   renderPagination
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.renderPagination = function() {
     this.$paginationContainer.empty(); 
     if (this.config.pagination.type === 'virtual' || this.config.pagination.type === 'infinite') {
         if (!this.hasMoreData && this.totalItems > 0) {
             this.$paginationContainer.html(`
                 <div class="text-center text-muted small py-2">${this.lang.noMoreData}</div>
             `);
         }
         return;
     }
 
     const self = this;
     const showInfo = this.config.pagination.showInfo;
     const showLimiter = this.config.pagination.limiter;
     const showControls = this.totalPages > 1;
     
     // Se não há nada para mostrar, não cria a linha
     if (!showInfo && !showControls && !showLimiter) return;
     
     const maxButtons = this.config.pagination.maxButtons;
     const showFirstLast = this.config.pagination.showFirstLast;
     const $wrapper = $('<div class="d-flex align-items-center justify-content-between flex-wrap"></div>');
     
     if (showInfo) {
         const start = this.totalItems > 0 ? (this.currentPage - 1) * this.config.pagination.limit + 1 : 0;
         const end = Math.min(start + this.config.pagination.limit - 1, this.totalItems);
         const info = this.totalItems > 0
             ? this.lang.info.replace('_START_', start).replace('_END_', end).replace('_TOTAL_', this.totalItems)
             : this.lang.infoEmpty;
         $wrapper.append(`<div class="dataBox-info text-muted small me-3">${info}</div>`);
     }
     
     // Limiter ("Mostrar X registros") é construído fora do "showControls",
     // para sobreviver mesmo quando há apenas 1 página
     let $limiter = null;
     if (showLimiter) {
         const options = this.config.pagination.limits || [10, 25, 50, 100];
         const label = this.lang.lengthMenu.replace('_MENU_', `
             <select class="form-select form-select-sm d-inline-block w-auto mx-1" data-action="change-limit">
                 ${options.map(opt => `<option value="${opt}" ${this.config.pagination.limit === opt ? 'selected' : ''}>${opt}</option>`).join('')}
             </select>
         `);
         $limiter = $('<div class="dataBox-length ms-3">' + label + '</div>');
     }
     
     let $nav = null;
     
     if (showControls) {
         $nav = $('<nav></nav>');
         const $ul = $('<ul class="pagination pagination-sm mb-0"></ul>'); 
         if (showFirstLast) {
             $ul.append(`
                 <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                     <a class="page-link" href="#" data-page="1" title="${this.lang.paginate.first}">
                         <i class="fas fa-angle-double-left"></i>
                     </a>
                 </li>
             `);
         } 
         $ul.append(`
             <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                 <a class="page-link" href="#" data-page="${this.currentPage - 1}" title="${this.lang.paginate.previous}">
                     <i class="fas fa-angle-left"></i>
                 </a>
             </li>
         `); 
         let startPage = Math.max(1, this.currentPage - Math.floor(maxButtons / 2));
         let endPage = Math.min(this.totalPages, startPage + maxButtons - 1); 
         if (endPage - startPage + 1 < maxButtons) {
             startPage = Math.max(1, endPage - maxButtons + 1);
         } 
         if (startPage > 1) {
             $ul.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
         } 
         for (let i = startPage; i <= endPage; i++) {
             $ul.append(`
                 <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                     <a class="page-link" href="#" data-page="${i}">${i}</a>
                 </li>
             `);
         } 
         if (endPage < this.totalPages) {
             $ul.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
         } 
         $ul.append(`
             <li class="page-item ${this.currentPage === this.totalPages ? 'disabled' : ''}">
                 <a class="page-link" href="#" data-page="${this.currentPage + 1}" title="${this.lang.paginate.next}">
                     <i class="fas fa-angle-right"></i>
                 </a>
             </li>
         `); 
         if (showFirstLast) {
             $ul.append(`
                 <li class="page-item ${this.currentPage === this.totalPages ? 'disabled' : ''}">
                     <a class="page-link" href="#" data-page="${this.totalPages}" title="${this.lang.paginate.last}">
                         <i class="fas fa-angle-double-right"></i>
                     </a>
                 </li>
             `);
         } 
         $nav.append($ul);
     }
     
     const $rightSide = $('<div class="d-flex align-items-center"></div>');
     if ($nav) $rightSide.append($nav);
     if ($limiter) $rightSide.append($limiter);
     if (showControls) {
         const $goTo = $(`
             <div class="dataBox-goto ms-3 d-flex align-items-center">
                 <span class="small text-muted me-2">Ir para:</span>
                 <input type="number" class="form-control form-control-sm" style="width: 60px;"
                        min="1" max="${this.totalPages}" data-action="goto-page">
             </div>
         `);
         $rightSide.append($goTo);
     }
     
     if ($rightSide.children().length > 0) $wrapper.append($rightSide);
     
     this.$paginationContainer.append($wrapper);
 
     this.$paginationContainer.find('[data-page]').on('click', function(e) {
         e.preventDefault();
         const page = parseInt($(this).data('page'));
         if (page >= 1 && page <= self.totalPages && page !== self.currentPage) {
             self.currentPage = page;
             self.loadData();
             self.triggerCallback('onPageChanged', page, self);
         }
     }); 
     this.$paginationContainer.find('[data-action="change-limit"]').on('change', function() {
         self.config.pagination.limit = parseInt($(this).val());
         self.currentPage = 1;
         self.loadData();
     }); 
     this.$paginationContainer.find('[data-action="goto-page"]').on('keypress', function(e) {
         if (e.which === 13) {
             const page = parseInt($(this).val());
             if (page >= 1 && page <= self.totalPages) {
                 self.currentPage = page;
                 self.loadData();
                 self.triggerCallback('onPageChanged', page, self);
             }
         }
     });
 }; 
   
 /**
     * FUNCTION PURPOSE: Atualiza o texto informativo ('A mostrar X a Y de Z registos') num container de info customizado da página anfitriã.
     *
     * DESCRIPTION:
     *    - Sai em silêncio se não existir um container de info customizado (`this.$infoContainer`)
     *
     * @function   updateInfo
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.updateInfo = function() {
     if (!this.$infoContainer) return;
     const start = this.totalItems > 0 ? (this.currentPage - 1) * this.config.pagination.limit + 1 : 0;
     const end = Math.min(start + this.config.pagination.limit - 1, this.totalItems);
     const info = this.totalItems > 0
         ? this.lang.info.replace('_START_', start).replace('_END_', end).replace('_TOTAL_', this.totalItems)
         : this.lang.infoEmpty;
     this.$infoContainer.text(info);
 };
   
 // ============================================================
 // SELEÇÃO
 // ============================================================

 /**
     * FUNCTION PURPOSE: Obtém o identificador de um item, usado como chave no conjunto de itens selecionados.
     *
     * DESCRIPTION:
     *    - Usa `item.id` quando disponível; caso contrário usa o índice do item como identificador de recurso
     *
     * @function   getItemId
     * @param  {Object}  item     Item de dados
     * @param  {Number}  [index]  Índice do item, usado como fallback quando não há `item.id`
     * @returns {*} Identificador do item (valor de `item.id`, ou o índice)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getItemId = function(item, index) {
     return item.id !== undefined ? item.id : index;
 };
   
 /**
     * FUNCTION PURPOSE: Alterna a seleção de um item, respeitando o modo configurado (`selection.mode`: 'single' ou 'multiple').
     *
     * DESCRIPTION:
     *    - Em modo 'single', limpa qualquer seleção anterior antes de selecionar o item clicado
     *    - Em modo 'multiple', adiciona/remove apenas o item clicado ao conjunto de selecionados
     *    - Sincroniza a classe visual ('selected active') e o estado da checkbox do item afetado
     *
     * DEPENDENCIES:
     *    - getItemId(), updateBulkActionsBar()
     *
     * @function   toggleSelection
     * @param  {Object}  item  Item cuja seleção está a ser alternada
     * @param  {jQuery}  $el   Elemento DOM do item, para sincronizar a classe/checkbox visual
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.toggleSelection = function(item, $el) {
     const id = this.getItemId(item); 
     if (this.config.selection.mode === 'single') {
         this.selectedItems.clear();
         this.selectedItems.add(id);
         this.$bodyContainer.find('[data-databox-item]').removeClass('selected active');
         this.$bodyContainer.find('[data-databox-checkbox]').prop('checked', false);
         if ($el) {
             $el.addClass('selected active');
             $el.find('[data-databox-checkbox]').prop('checked', true);
         }
     } else {
         if (this.selectedItems.has(id)) {
             this.selectedItems.delete(id);
             if ($el) {
                 $el.removeClass('selected active');
                 $el.find('[data-databox-checkbox]').prop('checked', false);
             }
         } else {
             this.selectedItems.add(id);
             if ($el) {
                 $el.addClass('selected active');
                 $el.find('[data-databox-checkbox]').prop('checked', true);
             }
         }
     } 
     this.updateBulkActionsBar();
     this.triggerCallback('onSelectionChanged', Array.from(this.selectedItems), this.getSelectedItems());
 };
   
 /**
     * FUNCTION PURPOSE: Devolve os itens de dados atualmente selecionados (não apenas os seus ids).
     *
     * DESCRIPTION:
     *    - Filtra `this.items` (página atual) pelos ids presentes em `this.selectedItems`
     *
     * DEPENDENCIES:
     *    - getItemId()
     *
     * @function   getSelectedItems
     * @returns {Array} Itens de dados atualmente selecionados
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getSelectedItems = function() {
     return this.items.filter((item, idx) => {
         const id = this.getItemId(item, idx);
         return this.selectedItems.has(id);
     });
 }; 
   
 /**
     * FUNCTION PURPOSE: Devolve apenas os identificadores dos itens atualmente selecionados.
     *
     * DESCRIPTION:
     *    - Útil quando a página anfitriã só precisa dos ids para uma ação em massa (ex.: pedido AJAX de eliminação)
     *
     * @function   getSelectedIds
     * @returns {Array} Lista de identificadores selecionados
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getSelectedIds = function() {
      return Array.from(this.selectedItems);
 };
   
 /**
     * FUNCTION PURPOSE: API pública: limpa toda a seleção atual, na estrutura de dados e na interface.
     *
     * DESCRIPTION:
     *    - Remove a classe visual de selecionado e desmarca todas as checkboxes (incluindo a de 'selecionar tudo')
     *    - Dispara `onSelectionChanged` com listas vazias, para a página anfitriã atualizar a sua própria interface
     *
     * DEPENDENCIES:
     *    - updateBulkActionsBar()
     *
     * @function   clearSelection
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.clearSelection = function() {
      this.selectedItems.clear();
      this.$bodyContainer.find('[data-databox-item]').removeClass('selected active');
      this.$bodyContainer.find('[data-databox-checkbox]').prop('checked', false);
      this.$wrapper.find('[data-databox-select-all]').prop('checked', false);
      this.updateBulkActionsBar();
      this.triggerCallback('onSelectionChanged', [], []);
      return this;
 };
   
 // ============================================================
 // LOADING
 // ============================================================

 /**
     * FUNCTION PURPOSE: Mostra a sobreposição visual de carregamento (spinner) sobre o corpo do DataBox.
     *
     * DESCRIPTION:
     *    - Remove qualquer sobreposição anterior antes de inserir uma nova, evitando duplicação
     *
     * @function   showLoading
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.showLoading = function() {
     this.isLoading = true;
     this.$bodyContainer.addClass('position-relative');
     this.$bodyContainer.find('.dataBox-loading-overlay').remove();
     this.$bodyContainer.append(`
         <div class="dataBox-loading-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
              style="background: rgba(255,255,255,0.8); z-index: 10;">
             <div class="spinner-border text-primary mb-2" role="status">
                 <span class="visually-hidden">${this.lang.loading}</span>
             </div>
             <span class="text-muted small">${this.lang.loading}</span>
         </div>
     `);
 }; 
   
 /**
     * FUNCTION PURPOSE: Remove a sobreposição visual de carregamento do corpo do DataBox.
     *
     * DESCRIPTION:
     *    - Chamada sempre que um carregamento de dados (server-side ou client-side) termina
     *
     * @function   hideLoading
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.hideLoading = function() {
     this.isLoading = false;
     this.$bodyContainer.find('.dataBox-loading-overlay').remove();
 };
   
 // ============================================================
 // API PÚBLICA
 // ============================================================

 /**
     * FUNCTION PURPOSE: API pública: troca a vista ativa (card/table/list/kanban/custom) e re-renderiza os dados nessa vista.
     *
     * DESCRIPTION:
     *    - Ignora o pedido, com aviso na consola, se a vista indicada não estiver marcada como `active` na configuração
     *    - Reinicia a página atual para 1 e atualiza visualmente o botão da vista selecionada
     *    - Garante que a barra de ações em massa existe, caso ainda não tenha sido criada
     *
     * DEPENDENCIES:
     *    - initBulkActions(), renderItems(), renderPagination(), saveState()
     *
     * @function   setView
     * @param  {String}  view  Nome da vista a ativar (ex.: 'card', 'table', 'kanban', ou uma vista customizada)
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.setView = function(view) {
     if (!this.config.views[view] || !this.config.views[view].active) {
         console.warn('DataBox: Visualização "' + view + '" não está ativa');
         return this;
     } 
     this.currentView = view;
     this.currentPage = 1; 
     this.$headerContainer.find('[data-view]')
         .removeClass('btn-primary active')
         .addClass('btn-outline-secondary');
     this.$headerContainer.find(`[data-view="${view}"]`)
         .removeClass('btn-outline-secondary')
         .addClass('btn-primary active'); 
     // Re-inicializar bulk actions se necessário
     if (this.config.bulkActions.active && !this.$bulkActionsBar) {
         this.initBulkActions();
     } 
     this.renderItems();
     this.renderPagination();
     this.saveState();
     this.triggerCallback('onViewChanged', view, this);
     return this;
 };
   
 /**
     * FUNCTION PURPOSE: API pública: aplica um termo de pesquisa global e recarrega os dados.
     *
     * DESCRIPTION:
     *    - Reinicia a página atual para 1 antes de recarregar
     *    - Dispara `onSearch` com o termo aplicado
     *
     * DEPENDENCIES:
     *    - loadData()
     *
     * @function   search
     * @param  {String}  term  Termo de pesquisa global a aplicar
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.search = function(term) {
     this.searchTerm = term;
     this.currentPage = 1;
     this.loadData();
     this.triggerCallback('onSearch', term, this);
     return this;
 };
   
 /**
     * FUNCTION PURPOSE: API pública: remove pesquisa global, pesquisa por coluna, filtros rápidos e regras do query builder, tudo de uma vez.
     *
     * DESCRIPTION:
     *    - Limpa também os campos de input correspondentes na interface (pesquisa global e por coluna)
     *    - Reinicia a página atual para 1 antes de recarregar
     *
     * DEPENDENCIES:
     *    - loadData()
     *
     * @function   clearSearch
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.clearSearch = function() {
     this.searchTerm = '';
     this.columnSearch = {};
     this.queryBuilderRules = null;
     this.activeQuickFilters = {};
     this.currentPage = 1;
     this.$wrapper.find('[data-action="global-search"]').val('');
     this.$wrapper.find('[data-column-search]').val('');
     this.loadData();
     return this;
 }; 
   
 /**
     * FUNCTION PURPOSE: API pública: navega para uma página específica, se estiver dentro do intervalo válido.
     *
     * DESCRIPTION:
     *    - Ignora silenciosamente pedidos de página fora do intervalo `[1, totalPages]`
     *    - Dispara `onPageChanged` após o carregamento ser despoletado
     *
     * DEPENDENCIES:
     *    - loadData()
     *
     * @function   setPage
     * @param  {Number}  page  Número da página de destino (1-indexed)
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.setPage = function(page) {
     if (page >= 1 && page <= this.totalPages) {
         this.currentPage = page;
         this.loadData();
         this.triggerCallback('onPageChanged', page, this);
     }
     return this;
 };
   
 /**
     * FUNCTION PURPOSE: API pública: recarrega os dados a partir da primeira página, mantendo os filtros e ordenação atuais.
     *
     * DESCRIPTION:
     *    - Útil para atualizar a lista após uma ação externa (ex.: criação de um novo registo)
     *
     * DEPENDENCIES:
     *    - loadData()
     *
     * @function   reload
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.reload = function() {
     this.currentPage = 1;
     this.loadData();
     return this;
 }; 
   
 /**
     * FUNCTION PURPOSE: API pública: define/mescla parâmetros adicionais a enviar em todos os pedidos AJAX subsequentes.
     *
     * DESCRIPTION:
     *    - Faz merge raso (`Object.assign`) com os parâmetros já existentes em `config.ajax.params`
     *    - Não recarrega os dados automaticamente — a página anfitriã deve chamar reload() a seguir, se necessário
     *
     * @function   setAjaxParams
     * @param  {Object}  params  Parâmetros a mesclar em `config.ajax.params`
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.setAjaxParams = function(params) {
     this.config.ajax.params = Object.assign({}, this.config.ajax.params, params);
     return this;
 }; 
   
 /**
     * FUNCTION PURPOSE: API pública: devolve os itens da página/fatia atualmente renderizada.
     *
     * DESCRIPTION:
     *    - Reflete `this.items`, já filtrado, ordenado e paginado
     *
     * @function   getData
     * @returns {Array} Itens atualmente visíveis
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getData = function() {
     return this.items;
 }; 
   
 /**
     * FUNCTION PURPOSE: API pública: devolve todos os itens carregados (client-side), antes de qualquer filtro/paginação.
     *
     * DESCRIPTION:
     *    - Em modo server-side, não representa o conjunto total (o servidor só devolve a página pedida)
     *
     * @function   getAllData
     * @returns {Array} Todos os itens carregados em `this.allItems`
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getAllData = function() {
     return this.allItems;
 }; 
   
 /**
     * FUNCTION PURPOSE: API pública: devolve o número total de itens após filtros (mas sem paginação).
     *
     * DESCRIPTION:
     *    - Útil para construir contadores ou indicadores na página anfitriã
     *
     * @function   getTotalItems
     * @returns {Number} Total de itens filtrados
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getTotalItems = function() {
     return this.totalItems;
 }; 
   
 /**
     * FUNCTION PURPOSE: API pública: devolve o número da página atual.
     *
     * DESCRIPTION:
     *    - Reflete `this.currentPage`, 1-indexed
     *
     * @function   getCurrentPage
     * @returns {Number} Página atual
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getCurrentPage = function() {
     return this.currentPage;
 };
    
 /**
     * FUNCTION PURPOSE: API pública: devolve o número total de páginas disponíveis, dado o total de itens filtrados e o limite por página.
     *
     * DESCRIPTION:
     *    - Reflete `this.totalPages`, recalculado a cada carregamento de dados
     *
     * @function   getTotalPages
     * @returns {Number} Total de páginas
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.getTotalPages = function() {
     return this.totalPages;
 };
   
 /**
     * FUNCTION PURPOSE: API pública: adiciona um novo item ao conjunto de dados (client-side) e reprocessa a vista.
     *
     * DESCRIPTION:
     *    - Acrescenta o item a `this.allItems` e delega em processClientSide() para refletir filtros/ordenação/paginação atuais
     *
     * DEPENDENCIES:
     *    - processClientSide()
     *
     * @function   addItem
     * @param  {Object}  item  Novo item de dados a adicionar
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.addItem = function(item) {
     this.allItems.push(item);
     this.processClientSide();
     return this;
 };
   
 /**
     * FUNCTION PURPOSE: API pública: remove um ou mais itens do conjunto de dados (client-side), por predicado ou por identificador.
     *
     * DESCRIPTION:
     *    - Aceita uma função predicado (`item => boolean`) para remoção condicional, ou um valor de id direto
     *    - Reprocessa a vista após a remoção, via processClientSide()
     *
     * DEPENDENCIES:
     *    - getItemId(), processClientSide()
     *
     * @function   removeItem
     * @param  {Function|*}  predicate  Função `(item) => boolean` que devolve `true` para os itens a remover, ou um id direto
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.removeItem = function(predicate) {
     if (typeof predicate === 'function') {
         this.allItems = this.allItems.filter(item => !predicate(item));
     } else {
         this.allItems = this.allItems.filter(item => this.getItemId(item) !== predicate);
     }
     this.processClientSide();
     return this;
 };
   
 /**
     * FUNCTION PURPOSE: API pública: atualiza (merge raso) um item existente no conjunto de dados (client-side), por identificador.
     *
     * DESCRIPTION:
     *    - Localiza o item por `getItemId()` e mescla `updates` sobre os seus campos atuais
     *    - Reprocessa a vista após a atualização, via processClientSide()
     *
     * DEPENDENCIES:
     *    - getItemId(), processClientSide()
     *
     * @function   updateItem
     * @param  {*}       id       Identificador do item a atualizar
     * @param  {Object}  updates  Campos a sobrepor no item encontrado
     * @returns {Object} A própria instância, para permitir encadeamento (chaining)
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.updateItem = function(id, updates) {
     const idx = this.allItems.findIndex(item => this.getItemId(item) === id);
     if (idx >= 0) {
         this.allItems[idx] = Object.assign({}, this.allItems[idx], updates);
         this.processClientSide();
     }
     return this;
 };
   
 /**
     * FUNCTION PURPOSE: API pública: destrói a instância, removendo listeners, elementos DOM criados e timers pendentes.
     *
     * DESCRIPTION:
     *    - Remove o modal do query builder do DOM, se existir
     *    - Desliga todos os eventos ligados ao alvo e ao wrapper, e limpa o conteúdo/atributos do elemento alvo
     *    - Cancela o debounce de pesquisa global e todos os debounces de pesquisa por coluna
     *
     * @function   destroy
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.destroy = function() {
     if (this.$queryBuilderModal) {
         this.$queryBuilderModal.remove();
     } 
     this.$target.off();
     this.$wrapper.off(); 
     this.$target.empty().removeClass('dataBox').removeAttr('data-databox-id'); 
     clearTimeout(this.searchDebounceTimer);
     for (const col in this.columnSearchTimers) {
         clearTimeout(this.columnSearchTimers[col]);
     }
 };
   
 // ============================================================
 // CALLBACKS
 // ============================================================

 /**
     * FUNCTION PURPOSE: Invoca, se existir, o callback configurado com o nome indicado, passando-lhe os argumentos restantes.
     *
     * DESCRIPTION:
     *    - Procura primeiro em `config.callbacks[name]`, depois em `config[name]` (compatibilidade com configuração plana)
     *    - Não faz nada se não houver nenhuma função configurada com esse nome
     *
     * @function   triggerCallback
     * @param  {String}  name  Nome do callback a invocar (ex.: 'onDataLoaded', 'onSelectionChanged')
     * @param  {...*}    args  Argumentos adicionais repassados ao callback
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.triggerCallback = function(name) {
     const callback = this.config.callbacks[name] || this.config[name];
     if (typeof callback === 'function') {
         const args = Array.prototype.slice.call(arguments, 1);
         callback.apply(this, args);
     }
 };
   
 /**
     * FUNCTION PURPOSE: Normaliza callbacks definidos diretamente na raiz da configuração para dentro de `config.callbacks`.
     *
     * DESCRIPTION:
     *    - Permite ao utilizador da biblioteca escrever `onInitialized` na raiz da config, além de dentro de `callbacks`
     *    - Só copia quando o callback ainda não existir em `config.callbacks`, para não sobrepor uma configuração explícita
     *
     * @function   configProxy
     *
     * @since     2026-09-25
     * @version   2.0.0
     * @author    Syntax Serenity Development Team
 */
 DataBoxInstance.prototype.configProxy = function() {
     const self = this;
     ['onInitialized', 'onDataLoaded', 'onViewChanged', 'onPageChanged',
      'onSearch', 'onSort', 'onRowClick', 'onSelectionChanged', 'onError'].forEach(name => {
         if (self.config[name] && typeof self.config[name] === 'function' && !self.config.callbacks[name]) {
             self.config.callbacks[name] = self.config[name];
         }
     });
 };
   
 DataBoxInstance.prototype.initialize = (function(original) {
     return function() {
         this.configProxy();
         original.call(this);
     };
 })(DataBoxInstance.prototype.initialize);
   
})(jQuery);
