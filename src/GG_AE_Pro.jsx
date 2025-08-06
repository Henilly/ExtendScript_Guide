// GG_AE_Compatible.jsx - Versão 100% compatível
(function() {
    // Polyfill para JSON se não existir (para versões antigas do AE)
    if (typeof JSON === 'undefined') {
        JSON = {
            parse: function(str) {
                return eval("(" + str + ")");
            },
            stringify: function(obj) {
                var parts = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        parts.push('"' + key + '":' + obj[key]);
                    }
                }
                return "{" + parts.join(",") + "}";
            }
        };
    }

    // Configurações e presets (formato simplificado)
    var PRESETS = {
        "Padrão": { margins: 1, columns: 3, leftLine: 0, rightLine: 0 },
        "3 Colunas": { margins: 0, columns: 3, leftLine: 1, rightLine: 1 }
    };

    // Clona presets sem usar JSON (método manual)
    function clonePreset(presetName) {
        var original = PRESETS[presetName];
        return {
            margins: original.margins,
            columns: original.columns,
            leftLine: original.leftLine,
            rightLine: original.rightLine
        };
    }

    var currentConfig = clonePreset("Padrão");

    // ... (restante do código original mantido, EXCETO quaisquer outros usos de JSON)
    // Use clonePreset() em vez de JSON.parse(JSON.stringify())

    // Função para criar guias (exemplo simplificado)
    function createGuides(comp) {
        while (comp.numGuides > 0) comp.removeGuide(0);
        
        if (currentConfig.leftLine) comp.addGuide(1, 0);
        if (currentConfig.rightLine) comp.addGuide(1, comp.width);
        
        alert("Grid criado com sucesso!");
    }

    // Interface básica
    var win = new Window("palette", "GuideGrid AE", undefined);
    win.add("statictext", undefined, "Use os botões abaixo:");
    
    var btnGroup = win.add("group");
    var btnCreate = btnGroup.add("button", undefined, "Criar Guias");
    btnCreate.onClick = function() {
        var comp = app.project.activeItem;
        if (comp && comp instanceof CompItem) {
            createGuides(comp);
        } else {
            alert("Selecione uma composição!");
        }
    };
    
    win.center();
    win.show();
})();
