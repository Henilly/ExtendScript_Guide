// GA_AE_Presets.jsx - Ferramentas Gráficas com Presets de Guias (AE 2025)
(function () {
    // Segurança: verifica se o After está aberto
    if (typeof app === 'undefined' || !app.project) {
        alert("Abra o After Effects antes de executar o script.");
        return;
    }

    // Presets personalizáveis
    var guidePresets = {
        "Reels": {
            vertical: [0.06, 0.73, 0.94],
            horizontal: [0.14, 0.70, 1.00]
        },
        "Grade Centralizada": {
            vertical: [0.25, 0.5, 0.75],
            horizontal: [0.33, 0.66]
        },
        "YouTube Safe Area": {
            vertical: [0.1, 0.9],
            horizontal: [0.05, 0.95]
        }
    };

    // Aplica guias com base no preset escolhido
    function applyGuidePreset(presetName, comp) {
        if (!guidePresets[presetName]) {
            throw new Error("Preset não encontrado");
        }

        var preset = guidePresets[presetName];

        while (comp.numGuides > 0) {
            comp.removeGuide(0);
        }

        for (var i = 0; i < preset.vertical.length; i++) {
            comp.addGuide(1, comp.width * preset.vertical[i]);
        }

        for (var j = 0; j < preset.horizontal.length; j++) {
            comp.addGuide(2, comp.height * preset.horizontal[j]);
        }
    }

    // Interface principal
    var buildUI = function () {
        var win = new Window('palette', 'Ferramentas Gráficas 2025');

        win.orientation = "column";
        win.alignChildren = ["center", "top"];
        win.spacing = 15;
        win.margins = 20;

        // Cabeçalho
        var header = win.add("group");
        var headerText = header.add("statictext", undefined, "📐 GUIAS PERSONALIZADAS");
        headerText.graphics.font = ScriptUI.newFont("Segoe UI", "Bold", 16);

        // Dropdown de presets
        var dropdownGroup = win.add("group");
        dropdownGroup.add("statictext", undefined, "Selecionar Preset:");
        var dropdown = dropdownGroup.add("dropdownlist", undefined, Object.keys(guidePresets));
        dropdown.selection = 0;

        // Botão de aplicar guias
        var btnApply = win.add("button", undefined, "✨ Aplicar Guias");
        btnApply.size = [180, 30];

        btnApply.onClick = function () {
            var comp = app.project.activeItem;
            if (!comp || !(comp instanceof CompItem)) {
                alert("Nenhuma composição válida selecionada");
                return;
            }

            try {
                var selected = dropdown.selection.text;
                applyGuidePreset(selected, comp);
                btnApply.text = "✅ Aplicado: " + selected;
            } catch (e) {
                alert("Erro: " + e.message);
            }
        };

        return win;
    };

    // Inicializa interface
    try {
        var mainUI = buildUI();
        mainUI.center();
        mainUI.show();
    } catch (e) {
        alert("Falha ao carregar a interface:\n" + e.toString());
    }
})();
