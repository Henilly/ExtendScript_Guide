// GA_AE_TM.jsx - Versão Estável
(function() {
    // Verificação básica do ambiente
    if (typeof app === 'undefined' || !app.project) {
        alert("Execute este script no After Effects");
        return;
    }

    // Função principal
    function createGuides() {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) {
            alert("Selecione uma composição ativa!");
            return;
        }

        try {
            // Limpa guias existentes
            while (comp.numGuides > 0) comp.removeGuide(0);
            
            // Adiciona guias básicas (personalize conforme necessidade)
            comp.addGuide(1, comp.width * 0.25); // Vertical 25%
            comp.addGuide(1, comp.width * 0.75); // Vertical 75%
            comp.addGuide(2, comp.height * 0.33); // Horizontal 33%
            
            alert("Guias criadas com sucesso!");
        } catch(e) {
            alert("Erro:\n" + e.toString());
        }
    }

    // Interface minimalista e garantida
    var win = new Window("palette", "Graphical AE Tools", undefined, {borderless: true});
    
    // Grupo principal
    var mainGroup = win.add("group");
    mainGroup.orientation = "column";
    mainGroup.alignChildren = ["center", "top"];
    mainGroup.spacing = 10;
    mainGroup.margins = 15;

    // Título
    var title = mainGroup.add("statictext", undefined, "FERRAMENTAS GRÁFICAS");
    title.graphics.font = ScriptUI.newFont("Arial", "BOLD", 16);

    // Botões
    var btnGroup = mainGroup.add("group");
    btnGroup.spacing = 10;
    
    var createBtn = btnGroup.add("button", undefined, "Criar Guias");
    createBtn.size = [120, 30];
    createBtn.onClick = createGuides;
    
    var clearBtn = btnGroup.add("button", undefined, "Limpar Tudo");
    clearBtn.size = [120, 30];
    clearBtn.onClick = function() {
        var comp = app.project.activeItem;
        if (comp && comp instanceof CompItem)) {
            while (comp.numGuides > 0) comp.removeGuide(0);
            alert("Guias removidas!");
        }
    };

    // Exibição
    win.center();
    win.show();
})();
