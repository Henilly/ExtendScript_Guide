/*
 * GG_AE.jsx - GuideGrid for After Effects (Open Source)
 * Licença: MIT
 * Repositório: https://github.com/seu-usuario/Gula_ExtendScript
 * Versão: 1.0
 */

(function() {
    // Configurações padrão
    var DEFAULT_CONFIG = {
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
        columns: { count: 3, gutter: 20 },
        rows: { count: 2, gutter: 20 },
        guideColor: [1.0, 0.2, 0.2] // Vermelho (RGB)
    };

    // Remove todas as guias existentes
    function clearGuides(comp) {
        while (comp.numGuides > 0) comp.removeGuide(0);
    }

    // Cria guias de grid
    function createGrid(comp, config) {
        clearGuides(comp);
        
        // Guias verticais (colunas)
        var colWidth = (comp.width - config.margins.left - config.margins.right - 
                       (config.columns.gutter * (config.columns.count - 1))) / config.columns.count;
        
        for (var i = 0; i <= config.columns.count; i++) {
            var posX = config.margins.left + (i * (colWidth + config.columns.gutter));
            comp.addGuide(1, posX); // 1 = vertical
        }

        // Guias horizontais (linhas)
        var rowHeight = (comp.height - config.margins.top - config.margins.bottom - 
                        (config.rows.gutter * (config.rows.count - 1))) / config.rows.count;
        
        for (var j = 0; j <= config.rows.count; j++) {
            var posY = config.margins.top + (j * (rowHeight + config.rows.gutter));
            comp.addGuide(2, posY); // 2 = horizontal
        }
    }

    // Interface do usuário
    function buildUI() {
        var win = new Window("palette", "GuideGrid AE", undefined, {resizeable: true});
        win.orientation = "column";
        
        // Margins
        var marginsGroup = win.add("group");
        marginsGroup.add("statictext", undefined, "Margins:");
        var topInput = marginsGroup.add("edittext", undefined, DEFAULT_CONFIG.margins.top);
        topInput.preferredSize.width = 40;
        
        // Columns
        var colsGroup = win.add("group");
        colsGroup.add("statictext", undefined, "Columns:");
        var colsCount = colsGroup.add("edittext", undefined, DEFAULT_CONFIG.columns.count);
        colsCount.preferredSize.width = 40;
        
        // Botão de ação
        var btn = win.add("button", undefined, "Generate Grid");
        btn.onClick = function() {
            var comp = app.project.activeItem;
            if (!comp || !(comp instanceof CompItem)) {
                alert("Selecione uma composição primeiro!");
                return;
            }
            
            createGrid(comp, {
                margins: {
                    top: parseInt(topInput.text) || 0,
                    bottom: parseInt(topInput.text) || 0,
                    left: 50,
                    right: 50
                },
                columns: {
                    count: parseInt(colsCount.text) || 3,
                    gutter: 20
                },
                rows: {
                    count: 2,
                    gutter: 20
                }
            });
        };
        
        return win;
    }

    // Inicialização
    var ui = buildUI();
    ui.show();
})();
