var win = new Window("palette", "Guia Simulada", undefined);
win.orientation = "column";

win.add("statictext", undefined, "Margens (px)");

var g = win.add("group");
g.orientation = "row";
g.add("statictext", undefined, "Esquerda:");
var margemEsq = g.add("edittext", undefined, "100");
margemEsq.characters = 5;

g.add("statictext", undefined, "Direita:");
var margemDir = g.add("edittext", undefined, "100");
margemDir.characters = 5;

g.add("statictext", undefined, "Topo:");
var margemTopo = g.add("edittext", undefined, "100");
margemTopo.characters = 5;

g.add("statictext", undefined, "Base:");
var margemBase = g.add("edittext", undefined, "100");
margemBase.characters = 5;

var btn = win.add("button", undefined, "Criar Guias");

btn.onClick = function () {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert("Nenhuma composição ativa.");
        return;
    }

    app.beginUndoGroup("Criar Guias");

    function criarLinha(pos, horizontal) {
        var layer = comp.layers.addShape();
        var shapeGroup = layer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        var pathGroup = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
        var shape = new Shape();

        if (horizontal) {
            shape.vertices = [[0, 0], [comp.width, 0]];
        } else {
            shape.vertices = [[0, 0], [0, comp.height]];
        }

        shape.closed = false;
        shape.inTangents = [[0, 0], [0, 0]];
        shape.outTangents = [[0, 0], [0, 0]];
        pathGroup.property("ADBE Vector Shape").setValue(shape);

        shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke")
            .property("ADBE Vector Stroke Width").setValue(1);

        var transform = shapeGroup.property("ADBE Vector Transform Group");
        transform.property("ADBE Vector Position").setValue(horizontal ? [0, pos] : [pos, 0]);

        layer.shy = true;
        layer.locked = true;
        layer.guideLayer = true;
    }

    criarLinha(parseInt(margemEsq.text), false);                     // Vertical esquerda
    criarLinha(comp.width - parseInt(margemDir.text), false);       // Vertical direita
    criarLinha(parseInt(margemTopo.text), true);                    // Horizontal topo
    criarLinha(comp.height - parseInt(margemBase.text), true);      // Horizontal base

    app.endUndoGroup();
};

win.center();
win.show();
