{
    function createGuideLine(comp, direction, position, name) {
        var line = comp.layers.addShape();
        line.name = name;

        // Adiciona grupo de forma
        var shapeGroup = line.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        shapeGroup.name = "Guia " + direction;

        // Cria uma forma do tipo Shape
        var pathGroup = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
        var shape = new Shape();

        var halfWidth = comp.width / 2;
        var halfHeight = comp.height / 2;

        if (direction === "VERTICAL") {
            shape.vertices = [[0, -halfHeight], [0, halfHeight]];
        } else {
            shape.vertices = [[-halfWidth, 0], [halfWidth, 0]];
        }

        shape.inTangents = [[0,0],[0,0]];
        shape.outTangents = [[0,0],[0,0]];
        shape.closed = false;

        pathGroup.property("ADBE Vector Shape").setValue(shape);

        // Ajusta posição da linha na composição
        var transform = shapeGroup.property("ADBE Vector Transform Group");
        if (direction === "VERTICAL") {
            transform.property("ADBE Vector Position").setValue([position, comp.height / 2]);
        } else {
            transform.property("ADBE Vector Position").setValue([comp.width / 2, position]);
        }

        // Remove preenchimento
        var fill = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
        fill.enabled = false;

        // Adiciona stroke (linha)
        var stroke = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
        stroke.property("ADBE Vector Stroke Color").setValue([0, 1, 1]); // Cyan
        stroke.property("ADBE Vector Stroke Width").setValue(1);

        // Oculta da renderização
        line.enabled = true;
        line.locked = true;
        line.shy = true;
        line.guideLayer = true;
    }

    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        app.beginUndoGroup("Criar Guias Simuladas");

        // Remove guias antigas
        for (var i = comp.numLayers; i >= 1; i--) {
            var lyr = comp.layer(i);
            if (lyr.name.indexOf("Guia") === 0) lyr.remove();
        }

        // Defina as margens desejadas
        var margemEsquerda = 100;
        var margemDireita = 100;
        var margemTopo = 100;
        var margemBase = 100;

        // Cria as guias simuladas
        createGuideLine(comp, "VERTICAL", margemEsquerda, "Guia Esquerda");
        createGuideLine(comp, "VERTICAL", comp.width - margemDireita, "Guia Direita");
        createGuideLine(comp, "HORIZONTAL", margemTopo, "Guia Topo");
        createGuideLine(comp, "HORIZONTAL", comp.height - margemBase, "Guia Base");

        app.endUndoGroup();
        alert("Guias criadas com sucesso!");
    } else {
        alert("Nenhuma composição ativa.");
    }
}
