(function guideLinesTool(thisObj) {
    function createUI(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Guia Custom", undefined, { resizeable: true });

        // Título
        win.add("statictext", undefined, "Inserir Margens");

        // Campos de margem
        var group = win.add("group");
        group.orientation = "column";
        group.alignChildren = "left";

        var topMargin = group.add("edittext", undefined, "100");
        var bottomMargin = group.add("edittext", undefined, "100");
        var leftMargin = group.add("edittext", undefined, "100");
        var rightMargin = group.add("edittext", undefined, "100");

        topMargin.characters = bottomMargin.characters = leftMargin.characters = rightMargin.characters = 5;

        // Botão aplicar
        var applyBtn = win.add("button", undefined, "Aplicar Linhas");

        applyBtn.onClick = function () {
            var comp = app.project.activeItem;
            if (!(comp instanceof CompItem)) {
                alert("Selecione uma composição.");
                return;
            }

            app.beginUndoGroup("Aplicar Linhas Guia");

            // Remove linhas antigas
            for (var i = comp.numLayers; i >= 1; i--) {
                var layer = comp.layer(i);
                if (layer.name.indexOf("LinhaGuia") === 0) {
                    layer.remove();
                }
            }

            var top = parseFloat(topMargin.text);
            var bottom = parseFloat(bottomMargin.text);
            var left = parseFloat(leftMargin.text);
            var right = parseFloat(rightMargin.text);

            var w = comp.width;
            var h = comp.height;

            function createLine(x1, y1, x2, y2, name) {
                var line = comp.layers.addShape();
                line.name = "LinhaGuia_" + name;
                var contents = line.property("ADBE Root Vectors Group");
                var shapeGroup = contents.addProperty("ADBE Vector Group");
                var shape = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
                var shapePath = new Shape();
                shapePath.vertices = [[x1, y1], [x2, y2]];
                shapePath.closed = false;
                shape.property("ADBE Vector Shape").setValue(shapePath);

                var stroke = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
                stroke.property("ADBE Vector Stroke Color").setValue([1, 0, 0]);
                stroke.property("ADBE Vector Stroke Width").setValue(2);
            }

            // Linhas horizontais
            createLine(0, top, w, top, "Top");
            createLine(0, h - bottom, w, h - bottom, "Bottom");

            // Linhas verticais
            createLine(left, 0, left, h, "Left");
            createLine(w - right, 0, w - right, h, "Right");

            app.endUndoGroup();
        };

        win.layout.layout(true);
        return win;
    }

    var myPanel = createUI(this);
    if (myPanel instanceof Window) {
        myPanel.center();
        myPanel.show();
    }
})(this);
