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
 * File: dataBox_tree.js
 *
 * DESCRIPTION:
 * Adiciona uma vista "tree" (árvore hierárquica, profundidade ilimitada,
 * * expandir/colapsar, pesquisa que preserva a cadeia de antepassados) ao
 * * DataBox — SEM alterar dataBox.js. Usa o mecanismo de vista customizada
 * * que o próprio core já suporta:
 * *
 * *   views: { <nomeQualquer>: { active: true, renderer: fn(items, $container, instance) } }
 * *
 * * (ver DataBoxInstance.prototype.renderItems, ramo `default`).
 * *
 * * PORQUÊ UM PLUGIN À PARTE E NÃO UM "case 'tree'" DENTRO DO CORE:
 * *   dataBox.js é uma biblioteca partilhada por vários projetos/páginas.
 * *   Mantê-la sem fork evita ter de reaplicar patches sempre que ela for
 * *   atualizada — este ficheiro só precisa de ser copiado para o lado de
 * *   dataBox.js (carregado a seguir, no HTML) em qualquer sistema futuro.
 * *
 * * USO RÁPIDO (dados já aninhados, ex.: endpoint que devolve `filhos`):
 * *
 * *   views: {
 * *       tree: {
 * *           active: true,
 * *           icon: 'fa-diagram-project',   // ícone do botão no alternador de vista
 * *           title: 'Árvore',              // rótulo do botão
 * *           renderer: DataBox.Tree.createRenderer({
 * *               mode: 'nested',           // os itens JÁ vêm com `childrenField`
 * *               idField: 'id',
 * *               childrenField: 'filhos',
 * *               labelField: 'nome',
 * *               iconField: 'icon',
 * *               searchFields: ['nome', 'codigo'],
 * *               badge: node => `<span class="badge-status">${node.estadoLabel}</span>`,
 * *               meta: node => `${node.livros} livro(s)`,
 * *               onSelect: (node, instance) => console.log('selecionado', node)
 * *           })
 * *       }
 * *   }
 * *
 * * USO COM DADOS PLANOS (uma linha por item, com id + parentField — o caso
 * * mais comum vindo de uma tabela `category`/`department`/`comment` etc.):
 * *
 * *   views: {
 * *       tree: {
 * *           active: true,
 * *           icon: 'fa-sitemap',
 * *           title: 'Árvore',
 * *           renderer: DataBox.Tree.createRenderer({
 * *               mode: 'flat',              // default — não precisa de o escrever
 * *               idField: 'id',
 * *               parentField: 'parentId',
 * *               labelField: 'nome',
 * *               searchFields: ['nome', 'codigo']
 * *           })
 * *       }
 * *   }
 * *
 * * RECOMENDADO SEMPRE QUE USAR A VISTA TREE:
 * *   pagination: { type: 'virtual', limit: 100000 }
 * *
 * *   Motivo: tal como a vista Kanban já embutida no core (que também
 * *   agrupa `this.items`, não `this.allItems`), a Tree recebe só a fatia
 * *   já paginada. Uma paginação normal ('paginated', limit: 10) pode
 * *   cortar itens a meio de um ramo. O modo 'flat' desta plugin já
 * *   recupera os ANTEPASSADOS em falta a partir de `instance.allItems`
 * *   (para a árvore nunca aparecer "partida"), mas os IRMÃOS que ficaram
 * *   na página seguinte continuam por mostrar — por isso, com árvores,
 * *   usa sempre paginação virtual com um limite alto (ou desativa a
 * *   paginação visualmente, escondendo o paginador via CSS).
 * *
 * * PESQUISA: o campo de pesquisa global do DataBox já filtra `allItems`
 * * por `search.fields` antes de paginar — funciona tal e qual com esta
 * * plugin, tanto em modo 'flat' (mostra só os ramos com correspondência,
 * * com os antepassados sempre visíveis para dar contexto) como em modo
 * * 'nested' (filtra sub-árvores recursivamente por searchFields).
 * *
 * * FILTROS RÁPIDOS (quickFilters) e ORDENAÇÃO: funcionam tal e qual em
 * * modo 'flat' (aplicados por processClientSide() antes de a plugin
 * * receber os itens). Em modo 'nested' não se aplicam — a estrutura já
 * * vem pronta do servidor, não há um array plano para filtrar/ordenar.
 * *
 * *
 *
 * DEPENDENCIES:
 *   - window.DataBox (dataBox.js): tem de estar carregado antes deste ficheiro — a plugin
 *     regista-se sob `DataBox.Tree` e usa `instance.escapeHtml`/`instance.renderItems`/
 *     `instance.allItems`/`instance.searchTerm` do core
 *
 * REQUIREMENTS:
 *   - dataBox.js carregado antes deste ficheiro (ver DEPENDENCIES)
 *   - Font Awesome (ícones de expandir/colapsar e de nó)
 *
 * @package       dataBox/plugins
 * @category      DataBox View Plugin (Tree)
 * @version       1.0.0
 * @since         2026-08-13
 * @license       Proprietary
 * @development   company: syntax serenity
 * @email         fs.developerfullstack@gmail.com
 * @link          https://www.syntaxserenity.co.ao
*/
(function ($) {
 'use strict';

 if (!window.DataBox) {
     console.error('DataBox Tree Plugin: carregar dataBox.js antes deste ficheiro.');
     return;
 }

 const DEFAULTS = {
     mode: 'flat',                 // 'flat' (id + parentField) | 'nested' (childrenField já preenchido)
     idField: 'id',
     parentField: 'parentId',
     childrenField: 'children',
     labelField: 'name',
     iconField: null,              // ex.: 'icon' → classes fontawesome por nó
     defaultIcon: 'fas fa-circle-dot',
     searchFields: null,           // null = usa labelField; ou array de campos, ex.: ['nome','codigo']
     indentRem: 1.25,
     expandedByDefault: 'roots',   // 'all' | 'roots' | 'none' | número (profundidade)
     badge: null,                  // fn(node) => html, ex.: um badge de estado
     meta: null,                   // fn(node) => html, ex.: contagem de filhos
     actions: null,                // fn(node) => html, ex.: botões de ação por linha
     onSelect: null,               // fn(node, instance) — chamado ao clicar num nó
     rowClass: null,               // fn(node) => string de classes extra na linha
     emptyMessage: 'Nenhum item encontrado.'
 };

 /* ============================================
 ESTADO POR INSTÂNCIA — cada DataBoxInstance que usa
 esta plugin ganha o seu próprio conjunto de nós
 abertos/selecionado, para sobreviver a re-renders
 (pesquisa, filtros, mudança de página).
 ============================================ */

 /**
     * FUNCTION PURPOSE: Obtém (criando se necessário) o estado privado de UI da árvore para uma instância do DataBox.
     *
     * DESCRIPTION:
     *    - Guarda os nós abertos/fechados explicitamente pelo utilizador e o nó atualmente selecionado
     *    - O estado vive diretamente na instância (`instance._treeState`), sobrevivendo a re-renders (pesquisa, filtros, mudança de página)
     *
     * @function   treeState
     * @param  {Object}  instance  Instância do DataBox devolvida por DataBox.init()
     * @returns {Object} Estado da árvore: `{ openIds, closedIds, baseline, selectedId }`
     *
     * @since     2026-08-13
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 function treeState(instance) {
     if (!instance._treeState) {
         instance._treeState = {
             openIds: new Set(),    // nós que o utilizador abriu explicitamente (toggle)
             closedIds: new Set(),  // nós que o utilizador fechou explicitamente (toggle)
             baseline: null,        // 'all' | 'none' | null — definido por expandAll()/collapseAll()
             selectedId: null
         };
     }
     return instance._treeState;
 } 

 /**
     * FUNCTION PURPOSE: Escapa texto para inserção segura em HTML, delegando no escape do core do DataBox quando disponível.
     *
     * DESCRIPTION:
     *    - Usa `instance.escapeHtml()` do core, se existir
     *    - Faz fallback para uma conversão simples em String quando o core não expõe esse método
     *
     * @function   escapeHtml
     * @param  {Object}  instance  Instância do DataBox (fornece o método `escapeHtml`, se existir)
     * @param  {*}       text      Valor a escapar
     * @returns {String} Texto seguro para inserção em HTML
     *
     * @since     2026-08-13
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 function escapeHtml(instance, text) {
     return typeof instance.escapeHtml === 'function' ? instance.escapeHtml(text) : String(text == null ? '' : text);
 }

 /* ============================================
 MODO 'flat' — reconstrói a árvore a partir de uma
 lista plana (idField/parentField), recuperando
 antepassados em falta a partir de instance.allItems
 quando a paginação cortou algum (ver nota no
 cabeçalho do ficheiro).
 ============================================ */

 /**
     * FUNCTION PURPOSE: Reconstrói a árvore hierárquica a partir de uma lista plana (idField/parentField).
     *
     * DESCRIPTION:
     *    - Recupera antepassados em falta a partir de `instance.allItems`, para a árvore nunca aparecer "partida" quando a paginação cortou algum ramo
     *    - Ordena os filhos de cada nó alfabeticamente pelo `labelField`, usando Intl.Collator('pt-PT')
     *
     * BUSINESS LOGIC:
     *    1. Indexa todos os itens (allItems, se disponível) por id
     *    2. Para cada item recebido, sobe a cadeia de pais e marca todos os ids a desenhar
     *    3. Agrupa os ids a desenhar pelo seu pai (ou '__root__' quando não tem pai desenhado)
     *    4. Constrói recursivamente a árvore final, ordenando os filhos em cada nível
     *
     * @function   buildFromFlat
     * @param  {Array}   items     Itens já paginados/filtrados que o DataBox está a mostrar
     * @param  {Object}  instance  Instância do DataBox (fornece `allItems`, para recuperar antepassados em falta)
     * @param  {Object}  opts      Opções da plugin (idField, parentField, childrenField, labelField)
     * @returns {Array} Lista de nós raiz, cada um já com `opts.childrenField` preenchido recursivamente
     *
     * @since     2026-08-13
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 function buildFromFlat(items, instance, opts) {
     const byId = new Map();
     (instance.allItems || items).forEach(item => byId.set(item[opts.idField], item)); 
     // IDs a desenhar = os itens recebidos + todos os seus antepassados
     const idsToRender = new Set();
     items.forEach(item => {
         let current = item;
         while (current) {
             const id = current[opts.idField];
             if (idsToRender.has(id)) break;
             idsToRender.add(id);
             const parentId = current[opts.parentField];
             current = (parentId !== null && parentId !== undefined) ? byId.get(parentId) : null;
         }
     }); 
     const childrenOf = new Map();
     idsToRender.forEach(id => {
         const item = byId.get(id);
         if (!item) return;
         const parentId = item[opts.parentField];
         const key = (parentId !== null && parentId !== undefined && idsToRender.has(parentId)) ? parentId : '__root__';
         if (!childrenOf.has(key)) childrenOf.set(key, []);
         childrenOf.get(key).push(item);
     }); 
     const collator = new Intl.Collator('pt-PT');
     const build = (key) => {
         const kids = (childrenOf.get(key) || []).slice()
             .sort((a, b) => collator.compare(String(a[opts.labelField] || ''), String(b[opts.labelField] || '')));
         return kids.map(item => {
             const node = Object.assign({}, item);
             node[opts.childrenField] = build(item[opts.idField]);
             return node;
         });
     }; 
     return build('__root__');
 } 

 /* ============================================
 MODO 'nested' — os itens já vêm em árvore (ex.:
 endpoint que devolve `filhos` já aninhados, como
 CategoryController::arvore()). Só filtra por
 pesquisa, recursivamente, se houver termo.
 ============================================ */

 /**
     * FUNCTION PURPOSE: Filtra recursivamente uma árvore já aninhada (modo 'nested'), mantendo ramos com correspondência na pesquisa.
     *
     * DESCRIPTION:
     *    - Um nó é mantido se ele próprio corresponder ao termo, ou se algum descendente corresponder
     *    - Sem termo de pesquisa, devolve a árvore original sem alterações
     *
     * @function   filterNested
     * @param  {Array}   nodes  Nós de topo da árvore já aninhada
     * @param  {String}  term   Termo de pesquisa (minúsculas), ou vazio/nulo para não filtrar
     * @param  {Object}  opts   Opções da plugin (searchFields, labelField, childrenField)
     * @returns {Array} Árvore filtrada, preservando apenas os ramos com correspondência
     *
     * @since     2026-08-13
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 function filterNested(nodes, term, opts) {
     if (!term) return nodes;
     const fields = opts.searchFields || [opts.labelField];
     const matches = (node) => fields.some(f => String(node[f] ?? '').toLowerCase().includes(term));
     const walk = (list) => list.reduce((acc, node) => {
         const kids = walk(node[opts.childrenField] || []);
         if (matches(node) || kids.length) {
             acc.push(Object.assign({}, node, { [opts.childrenField]: kids }));
         }
         return acc;
     }, []);
     return walk(nodes);
 } 

 /* ============================================
 RENDERIZAÇÃO
 ============================================ */
 
 /**
     * FUNCTION PURPOSE: Decide se um nó deve começar expandido, combinando pesquisa ativa, ações explícitas do utilizador e a configuração default.
     *
     * DESCRIPTION:
     *    - Durante uma pesquisa ativa, força todos os nós abertos, para dar contexto aos resultados
     *    - Fora de pesquisa, respeita por ordem de prioridade: fecho/abertura explícita do utilizador → expandAll()/collapseAll() → `expandedByDefault` da configuração
     *
     * @function   shouldBeOpen
     * @param  {Object}   node             Nó a avaliar
     * @param  {Number}   depth            Profundidade do nó na árvore (raiz = 0)
     * @param  {Object}   state            Estado de UI da árvore (treeState)
     * @param  {Object}   opts             Opções da plugin (expandedByDefault, idField)
     * @param  {Boolean}  hasSearchTerm    Se há atualmente um termo de pesquisa ativo
     * @returns {Boolean} Se o nó deve ser desenhado expandido
     *
     * @since     2026-08-13
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 function shouldBeOpen(node, depth, state, opts, hasSearchTerm) {
     const id = node[opts.idField];
     if (hasSearchTerm) return true;        // pesquisa: mostra tudo aberto para dar contexto
     if (state.closedIds.has(id)) return false; // o utilizador fechou este nó explicitamente
     if (state.openIds.has(id)) return true;    // o utilizador abriu este nó explicitamente
     if (state.baseline === 'all') return true;   // expandAll() foi chamado
     if (state.baseline === 'none') return false; // collapseAll() foi chamado
     if (opts.expandedByDefault === 'all') return true;
     if (opts.expandedByDefault === 'roots') return depth === 0;
     if (typeof opts.expandedByDefault === 'number') return depth < opts.expandedByDefault;
     return false;
 } 

 /**
     * FUNCTION PURPOSE: Renderiza recursivamente um nó da árvore (e os seus filhos, se expandido) como um <li> com toggle, ícone, badge, meta e ações.
     *
     * DESCRIPTION:
     *    - Liga o clique no toggle para expandir/colapsar (sem propagar para a seleção da linha)
     *    - Liga o clique na linha para selecionar o nó e invocar `opts.onSelect`, se definido
     *    - Aplica indentação visual proporcional à profundidade (`opts.indentRem`)
     *
     * DEPENDENCIES:
     *    - shouldBeOpen(), escapeHtml(), renderNode() (recursão para os filhos)
     *
     * @function   renderNode
     * @param  {Object}   node           Nó a renderizar
     * @param  {Number}   depth          Profundidade do nó (raiz = 0)
     * @param  {Object}   instance       Instância do DataBox
     * @param  {Object}   opts           Opções da plugin
     * @param  {Object}   state          Estado de UI da árvore (treeState)
     * @param  {Boolean}  hasSearchTerm  Se há atualmente um termo de pesquisa ativo
     * @returns {jQuery} Elemento <li> pronto a inserir na árvore (já com os seus filhos, se aplicável)
     *
     * @since     2026-08-13
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 function renderNode(node, depth, instance, opts, state, hasSearchTerm) {
     const id = node[opts.idField];
     const children = node[opts.childrenField] || [];
     const isOpen = shouldBeOpen(node, depth, state, opts, hasSearchTerm);
     const isSelected = state.selectedId === id; 
     const $li = $('<li class="databox-tree-node"></li>').attr('data-tree-id', id);
     const extraClass = typeof opts.rowClass === 'function' ? (opts.rowClass(node) || '') : ''; 
     const $row = $(`
         <div class="databox-tree-row d-flex align-items-center gap-2 ${isSelected ? 'selected' : ''} ${extraClass}"
              style="padding-left:${depth * opts.indentRem}rem" data-tree-id="${id}">
             <button type="button" class="databox-tree-toggle ${children.length ? '' : 'is-leaf'}" aria-label="Expandir/colapsar">
                 <i class="fas ${children.length ? (isOpen ? 'fa-chevron-down' : 'fa-chevron-right') : 'fa-circle'}"></i>
             </button>
             ${opts.iconField ? `<span class="databox-tree-icon"><i class="${node[opts.iconField] || opts.defaultIcon}"></i></span>` : ''}
             <span class="databox-tree-label flex-fill">${escapeHtml(instance, node[opts.labelField])}</span>
             ${typeof opts.badge === 'function' ? (opts.badge(node) || '') : ''}
             ${typeof opts.meta === 'function' ? `<span class="databox-tree-meta text-muted small">${opts.meta(node) || ''}</span>` : ''}
             ${typeof opts.actions === 'function' ? `<span class="databox-tree-actions">${opts.actions(node) || ''}</span>` : ''}
         </div>
     `); 
     $row.find('.databox-tree-toggle').on('click', function (e) {
         e.stopPropagation();
         if (!children.length) return;
         if (isOpen) {
             state.closedIds.add(id);
             state.openIds.delete(id);
         } else {
             state.openIds.add(id);
             state.closedIds.delete(id);
         }
         instance.renderItems();
     }); 
     $row.on('click', function () {
         state.selectedId = id;
         if (typeof opts.onSelect === 'function') opts.onSelect(node, instance);
         instance.renderItems();
     }); 
     $li.append($row); 
     if (children.length && isOpen) {
         const $ul = $('<ul class="databox-tree-children list-unstyled"></ul>');
         children.forEach(child => $ul.append(renderNode(child, depth + 1, instance, opts, state, hasSearchTerm)));
         $li.append($ul);
     } 
     return $li;
 } 

 /* ============================================
 API PÚBLICA DA PLUGIN
 ============================================ */
 window.DataBox.Tree = {
     version: '1.0.0', 
     /**
         * FUNCTION PURPOSE: Cria a função de renderização da vista 'tree', pronta a atribuir a `views.<nome>.renderer` no DataBox.
         *
         * DESCRIPTION:
         *    - Suporta modo 'flat' (reconstrói a árvore a partir de idField/parentField) e modo 'nested' (árvore já vem pronta do servidor)
         *    - O estado de expansão/seleção é mantido por instância (treeState), sobrevivendo a re-renders
         *    - Mostra `opts.emptyMessage` quando não há nós a desenhar (ex.: pesquisa sem resultados)
         *
         * DEPENDENCIES:
         *    - buildFromFlat(), filterNested(), renderNode(), treeState()
         *
         * @function   createRenderer
         * @param  {Object}  options  Configuração da árvore — ver DEFAULTS no topo do ficheiro (mode, idField, parentField, childrenField, labelField, iconField, searchFields, indentRem, expandedByDefault, badge, meta, actions, onSelect, rowClass, emptyMessage)
         * @returns {Function} Função `(items, $container, instance) => void`, compatível com `views.<nome>.renderer` do core
         *
         * @since     2026-08-13
         * @version   1.0.0
         * @author    Syntax Serenity Development Team
     */
     createRenderer(options) {
         const opts = Object.assign({}, DEFAULTS, options || {}); 
         return function (items, $container, instance) {
             const state = treeState(instance);
             const term = (instance.searchTerm || '').trim().toLowerCase(); 
             let roots;
             if (opts.mode === 'nested') {
                 roots = filterNested(items, term, opts);
             } else {
                 roots = buildFromFlat(items, instance, opts);
             } 
             $container.empty(); 
             if (!roots.length) {
                 $container.html(`
                     <div class="text-center py-5">
                         <i class="fas fa-search fa-3x text-muted mb-3"></i>
                         <p class="text-muted">${opts.emptyMessage}</p>
                     </div>
                 `);
                 return;
             } 
             const $root = $('<ul class="databox-tree-root list-unstyled mb-0"></ul>');
             roots.forEach(node => $root.append(renderNode(node, 0, instance, opts, state, !!term)));
             $container.append($root);
         };
     }, 

     /**
         * FUNCTION PURPOSE: API pública: expande todos os nós da árvore desta instância.
         *
         * DESCRIPTION:
         *    - Define a baseline do estado como 'all' e limpa quaisquer overrides individuais de abrir/fechar
         *    - Pensada para ligar a um botão externo 'Expandir tudo' na toolbar da página anfitriã
         *    - Força a re-renderização imediata via `instance.renderItems()`
         *
         * @function   expandAll
         * @param  {Object}  instance  Instância devolvida por DataBox.init()
         *
         * @since     2026-08-13
         * @version   1.0.0
         * @author    Syntax Serenity Development Team
     */
     expandAll(instance) {
         const state = treeState(instance);
         state.baseline = 'all';
         state.openIds.clear();
         state.closedIds.clear();
         instance.renderItems();
     }, 

     /**
         * FUNCTION PURPOSE: API pública: colapsa todos os nós da árvore desta instância.
         *
         * DESCRIPTION:
         *    - Define a baseline do estado como 'none' e limpa quaisquer overrides individuais de abrir/fechar
         *    - Pensada para ligar a um botão externo 'Colapsar tudo' na toolbar da página anfitriã
         *    - Força a re-renderização imediata via `instance.renderItems()`
         *
         * @function   collapseAll
         * @param  {Object}  instance  Instância devolvida por DataBox.init()
         *
         * @since     2026-08-13
         * @version   1.0.0
         * @author    Syntax Serenity Development Team
     */
     collapseAll(instance) {
         const state = treeState(instance);
         state.baseline = 'none';
         state.openIds.clear();
         state.closedIds.clear();
         instance.renderItems();
     }, 

     /**
         * FUNCTION PURPOSE: API pública: obtém o id do nó atualmente selecionado na árvore.
         *
         * DESCRIPTION:
         *    - Lê o estado de UI da árvore desta instância (treeState)
         *
         * @function   getSelected
         * @param  {Object}  instance  Instância devolvida por DataBox.init()
         * @returns {*} Id do nó selecionado, ou `null` se nenhum estiver selecionado
         *
         * @since     2026-08-13
         * @version   1.0.0
         * @author    Syntax Serenity Development Team
     */
     getSelected(instance) {
         return treeState(instance).selectedId;
     }
 };
})(jQuery);