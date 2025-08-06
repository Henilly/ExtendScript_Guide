// GA_AE_2025.jsx - Versão Oficial para AE 2025
(function() {
    // 1. VERIFICAÇÃO INICIAL
    if (typeof app === 'undefined' || !app.project) {
        alert("Abra o After Effects 2025 primeiro");
        return;
    }

    // 2. FUNÇÃO PRINCIPAL À PROVA DE FALHAS
    function createSafeGuides() {
        try {
            var comp = app.project.activeItem;
            
            // Verificação tripla de composição
            if (!comp || !comp.numLayers || !(comp instanceof CompItem)) {
                throw new Error("Nenhuma composição válida selecionada");
            }

            // Limpeza segura de guias
            while (comp.numGuides > 0) {
                comp.removeGuide(0);
            }

            // Criação de guias com valores absolutos
            var guidePositions = {
                vertical: [0.25, 0.5, 0.75],  // 25%, 50%, 75%
                horizontal: [0.33, 0.66]       // 33%, 66%
            };

            // Adiciona guias verticais
            guidePositions.vertical.forEach(function(pos) {
                comp.addGuide(1, comp.width * pos); // 1 = vertical
            });

            // Adiciona guias horizontais
            guidePositions.horizontal.forEach(function(pos) {
                comp.addGuide(2, comp.height * pos); // 2 = horizontal
            });

            return true;
        } catch(e) {
            alert("ERRO: " + e.message + "\nLinha: " + e.line);
            return false;
        }
    }

    // 3. INTERFACE À PROVA DE FUTURO
    var buildUI = function() {
        var win = new Window('palette', 'Ferramentas Gráficas 2025', undefined, {
            borderless: true,
            resizeable: true
        });

        // Design moderno
        win.graphics.font = ScriptUI.newFont("Segoe UI", "Bold", 12);
        win.orientation = "column";
        win.alignChildren = ["center", "top"];
        win.spacing = 15;
        win.margins = 20;

        // Cabeçalho
        var header = win.add("group");
        header.add("statictext", undefined, "🛠️ FERRAMENTAS AE 2025")
              .graphics.font = ScriptUI.newFont("Segoe UI", "Bold", 16);

        // Corpo
        var body = win.add("group");
        body.orientation = "column";
        body.spacing = 10;

        // Botão principal
        var btnCreate = body.add(
            "button", 
            undefined, 
            "✨ Criar Guias Automáticas", 
            {name: "create"}
        );
        btnCreate.size = [200, 40];
        btnCreate.onClick = function() {
            if (createSafeGuides()) {
                btnCreate.text = "✅ Guias Criadas!";
                setTimeout(function() { 
                    btnCreate.text = "✨ Criar Guias Automáticas"; 
                }, 2000);
            }
        };

        // Rodapé
        var footer = win.add("group");
        footer.add("statictext", undefined, "v2.0 • AE 2025 • MIT License");

        return win;
    };

    // 4. INICIALIZAÇÃO SEGURA
    try {
        var mainUI = buildUI();
        mainUI.center();
        mainUI.show();
    } catch(e) {
        alert("Falha ao carregar a interface:\n" + e.toString());
    }
})();
