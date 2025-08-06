// Criar a janela
var win = new Window("palette", "Preset Instagram Square", undefined);
win.orientation = "column";
win.alignChildren = ["fill", "top"];
win.spacing = 10;
win.margins = 16;

// Botão topo para fechar (ícone simples de 'X')
var btnClose = win.add("button", undefined, "✕");
btnClose.alignment = "right";
btnClose.onClick = function() {
    win.close();
}

// Grupo para inputs de margens
var grpMargins = win.add("group");
grpMargins.orientation = "row";
grpMargins.alignChildren = "left";
grpMargins.spacing = 10;

grpMargins.add("statictext", undefined, "Left:");
var inputLeft = grpMargins.add("edittext", undefined, "0");
inputLeft.characters = 5;

grpMargins.add("statictext", undefined, "Right:");
var inputRight = grpMargins.add("edittext", undefined, "0");
inputRight.characters = 5;

grpMargins.add("statictext", undefined, "Top:");
var inputTop = grpMargins.add("edittext", undefined, "0");
inputTop.characters = 5;

grpMargins.add("statictext", undefined, "Bottom:");
var inputBottom = grpMargins.add("edittext", undefined, "0");
inputBottom.characters = 5;

// Grupo para nome do preset e botões
var grpPreset = win.add("group");
grpPreset.orientation = "row";
grpPreset.alignChildren = "left";
grpPreset.spacing = 10;

grpPreset.add("statictext", undefined, "Nome do Preset:");
var inputPresetName = grpPreset.add("edittext", undefined, "Instagram Square");
inputPresetName.characters = 15;

var btnSave = grpPreset.add("button", undefined, "Salvar Preset");
var btnApply = grpPreset.add("button", undefined, "Aplicar");

// Função para salvar preset (aqui só alerta, pode expandir para salvar arquivo)
btnSave.onClick = function() {
    var name = inputPresetName.text;
    var left = parseInt(inputLeft.text);
    var right = parseInt(inputRight.text);
    var top = parseInt(inputTop.text);
    var bottom = parseInt(inputBottom.text);
    
    if(isNaN(left) || isNaN(right) || isNaN(top) || isNaN(bottom)){
        alert("Valores de margem devem ser números.");
        return;
    }
    
    alert("Preset '" + name + "' salvo com margens:\nLeft: " + left + "\nRight: " + right + "\nTop: " + top + "\nBottom: " + bottom);
}

// Função para aplicar margens como linhas guias na composição ativa
btnApply.onClick = function() {
    var left = parseInt(inputLeft.text);
    var right = parseInt(inputRight.text);
    var top = parseInt(inputTop.text);
    var bottom = parseInt(inputBottom.text);

    if(isNaN(left) || isNaN(right) || isNaN(top) || isNaN(bottom)){
        alert("Valores de margem devem ser números.");
        return;
    }

    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("Abra uma composição antes de aplicar as margens.");
        return;
    }

    app.beginUndoGroup("Aplicar Margens Guia");

    // Limpar guias existentes
    comp.guides = [];

    // Criar guias verticais (Left e Right)
    if(left > 0) {
        comp.guides.push(comp.createGuide("VERTICAL", left));
    }
    if(right > 0) {
        var posRight = comp.width - right;
        comp.guides.push(comp.createGuide("VERTICAL", posRight));
    }

    // Criar guias horizontais (Top e Bottom)
    if(top > 0) {
        comp.guides.push(comp.createGuide("HORIZONTAL", top));
    }
    if(bottom > 0) {
        var posBottom = comp.height - bottom;
        comp.guides.push(comp.createGuide("HORIZONTAL", posBottom));
    }

    app.endUndoGroup();

    alert("Guias aplicadas:\nLeft: " + left + "\nRight: " + right + "\nTop: " + top + "\nBottom: " + bottom);
};

// Mostrar a janela
win.center();
win.show();
