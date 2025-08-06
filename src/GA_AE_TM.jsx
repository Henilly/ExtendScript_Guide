// GA_AE_2025.jsx - Versão Oficial para AE 2025 
(function () {
    if (typeof app === 'undefined' || !app.project) {
        alert("Abra o After Effects 2025 primeiro");
        return;
    }

    function createSafeGuides() {
        try {
            var comp = app.project.activeItem;

            if (!comp || !comp.numLayers || !(comp instanceof CompItem)) {
                throw new Error("Nenhuma composição válida selecionada");
            }

            while (comp.numGuides > 0) {
                comp.removeGuide(0);
            }

            var guidePositions = {
                vertical: [0.25, 0.5, 0.75],
                horizontal: [0.33, 0.66]
            };

            guidePositions.vertical.forEach(function (pos) {
                comp.addGuide(1, comp.width * pos);
            });

            guidePositions.horizontal.forEach(function (pos) {
                comp.addGuide(2, comp.height * pos);
            });

            return true;
        } catch (e) {
            alert("ERRO: " + e.message + "\nLinha: " + e.line);
            return false;
        }
    }

    var buildUI = function () {
        var win = new Window('palette', 'Ferramentas Gráficas 2025');

        win.orientation = "column";
        win.alignChildren = ["center", "top"];
        win.spacing = 15;
        win.margins = 20;

        var header = win.add("group");
        var headerText = header.add("statictext", undefined, "🛠️ FERRAMENTAS AE 2025");
        headerText.graphics.font = ScriptUI.newFont("Segoe UI", "Bold", 16);

        var body = win.add("group");
        body.orientation = "column";
        body.spacing = 10;

        var btnCreate = body.add("button", undefined, "✨ Criar Guias Automáticas", { name: "create" });
        btnCreate.size = [200, 40];
        btnCreate.onClick = function () {
            if (createSafeGuides()) {
                btnCreate.text = "✅ Guias Criadas!";
                // $.sleep(1500); // ⚠️ Congela UI. Use com cuidado.
                // btnCreate.text = "✨ Criar Guias Automáticas";
            }
        };

        var footer = win.add("group");
        footer.add("statictext", undefined, "v2.0 • AE 2025 • MIT License");

        return win;
    };

    try {
        var mainUI = buildUI();
        mainUI.center();
        mainUI.show();
    } catch (e) {
        alert("Falha ao carregar a interface:\n" + e.toString());
    }
})();
