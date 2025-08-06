// GG_AE_Pro_Fixed.jsx - Versão Corrigida
(function() {
    // Configurações e presets
    var PRESETS = {
        "Padrão": { margins: 1, columns: 3, leftLine: false, rightLine: false },
        "3 Colunas": { margins: 0, columns: 3, leftLine: true, rightLine: true },
        "Filme 16:9": { margins: 2, columns: 0, leftLine: true, rightLine: true }
    };

    var currentConfig = JSON.parse(JSON.stringify(PRESETS["Padrão"]));

    // Funções principais
    function clearAllGuides(comp) {
        while (comp.numGuides > 0) comp.removeGuide(0);
    }

    function createGuides(comp, config) {
        clearAllGuides(comp);
        
        // Guias laterais
        if (config.leftLine) comp.addGuide(1, 0);
        if (config.rightLine) comp.addGuide(1, comp.width);
        
        // Guias de margem
        if (config.margins > 0) {
            comp.addGuide(1, config.margins * 10);
            comp.addGuide(1, comp.width - (config.margins * 10));
        }
        
        // Colunas
        if (config.columns > 0) {
            var colWidth = (comp.width - (config.margins * 20)) / config.columns;
            for (var i = 1; i < config.columns; i++) {
                comp.addGuide(1, (config.margins * 10) + (i * colWidth));
            }
        }
    }

    // Interface
    var win = new Window("palette", "GuideGrid Pro", undefined);
    win.orientation = "column";
    
    // Painel de presets
    var presetGroup = win.add("group");
    presetGroup.add("statictext", undefined, "Preset:");
    var presetDropdown = presetGroup.add("dropdownlist", undefined, Object.keys(PRESETS));
    presetDropdown.selection = 0;
    presetDropdown.onChange = function() {
        currentConfig = JSON.parse(JSON.stringify(PRESETS[this.selection.text]));
        updateUI();
    };
    
    // Controles
    var marginGroup = win.add("group");
    marginGroup.add("statictext", undefined, "Margins:");
    var marginInput = marginGroup.add("edittext", undefined, currentConfig.margins);
    marginInput.preferredSize.width = 40;
    
    var columnsGroup = win.add("group");
    columnsGroup.add("statictext", undefined, "Columns:");
    var columnsInput = columnsGroup.add("edittext", undefined, currentConfig.columns);
    columnsInput.preferredSize.width = 40;
    
    // Linhas laterais
    var sideLinesGroup = win.add("group");
    sideLinesGroup.add("statictext", undefined, "Linhas laterais:");
    var leftCheck = sideLinesGroup.add("checkbox", undefined, "Esquerda");
    var rightCheck = sideLinesGroup.add("checkbox", undefined, "Direita");
    
    // Botões
    var btnGroup = win.add("group");
    var generateBtn = btnGroup.add("button", undefined, "Gerar Grid");
    var clearBtn = btnGroup.add("button", undefined, "Limpar Tudo");
    var saveBtn = btnGroup.add("button", undefined, "Salvar Preset");
    
    function updateUI() {
        marginInput.text = currentConfig.margins;
        columnsInput.text = currentConfig.columns;
        leftCheck.value = currentConfig.leftLine;
        rightCheck.value = currentConfig.rightLine;
    }
    
    generateBtn.onClick = function() {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) {
            alert("Selecione uma composição!");
            return;
        }
        
        currentConfig = {
            margins: parseInt(marginInput.text) || 0,
            columns: parseInt(columnsInput.text) || 0,
            leftLine: leftCheck.value,
            rightLine: rightCheck.value
        };
        
        createGuides(comp, currentConfig);
    };
    
    clearBtn.onClick = function() {
        var comp = app.project.activeItem;
        if (comp && comp instanceof CompItem) clearAllGuides(comp);
    };
    
    saveBtn.onClick = function() {
        var newName = prompt("Nome do novo preset:", "Meu Preset");
        if (newName) {
            PRESETS[newName] = {
                margins: parseInt(marginInput.text) || 0,
                columns: parseInt(columnsInput.text) || 0,
                leftLine: leftCheck.value,
                rightLine: rightCheck.value
            };
            presetDropdown.removeAll();
            for (var key in PRESETS) presetDropdown.add("item", key);
        }
    };
    
    updateUI();
    win.center();
    win.show();
})();
