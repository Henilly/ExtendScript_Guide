{
    // Função para criar uma "linha guia" com shape layer
    function createGuideLine(comp, direction, position, name) {
        var line = comp.layers.addShape();
        line.name = name;

        // Adiciona grupo de forma
        var shapeGroup = line.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");

        // Adiciona forma de retângulo (linha vertical ou horizontal)
        var pathGroup = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
        var rect = pathGroup.property("ADBE Vector Shape");

        // Define tamanho e posição da forma
        var size = (direction === "VERTICAL") ? [1, comp.height] : [comp.width, 1];
        var pos = (direction === "VERTICAL") ? [position, comp.height / 2] : [comp.width / 2, position];

        rect.setValue({
            size: size,
            position: [0, 0]
        });

        // Posiciona a linha
        var transform = shapeGroup.property("ADBE Vector Transform Group");
        transform.property("ADBE Vector Position").setValue(pos);

        // Remove preenchimento (fill)
        var fill = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
        fill.enabled = false;

        // Aplica stroke (linha) com cor ciano
        var stroke = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
        stroke.property("ADBE Vector Stroke Color").setValue([0, 1, 1]); // Cyan
        stroke.property("ADBE Vector Stroke Width").setValue(1);

        // Configura como guia: não renderiza, trava, oculta
        line.enabled = true;
        line.locked = true;
        line.shy = true;
        line.guideLayer = true;
    }

    // Verifica se uma composição está ativa
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        app.beginUndoGroup("Criar Guias Simuladas");

        // Apaga guias anteriores (shape layers com nome começando com "Guia")
        for (var i = comp.numLayers; i >= 1; i--) {
            var lyr = comp.layer(i);
            if (lyr.name.indexOf("Guia") === 0) lyr.remove();
        }

        // Define margens — você pode personalizar essas variáveis:
        var margemEsquerda = 100;
        var margemDireita = 100;
        var margemTopo = 100;
        var margemBase = 100;

        // Cria as 4 linhas guias simuladas
        createGuideLine(comp, "VERTICAL", margemEsquerda, "Guia Esquerda");
        createGuideLine(comp, "VERTICAL", comp.width - margemDireita, "Guia Direita");
        createGuideLine(comp, "HORIZONTAL", margemTopo, "Guia Topo");
        createGuideLine(comp, "HORIZONTAL", comp.height - margemBase, "Guia Base");

        app.endUndoGroup();
        alert("Guias simuladas criadas com sucesso!");
    } else {
        alert("Nenhuma composição ativa.");
    }
}
