// Polyfill para Object.keys() compatível com ExtendScript
function getObjectKeys(obj) {
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
}

// Exemplo de objeto com presets
var presets = {
    "Safe Title": { left: 10, right: 10, top: 10, bottom: 10 },
    "Instagram Square": { left: 0, right: 0, top: 0, bottom: 0 },
    "Custom": { left: 100, right: 100, top: 50, bottom: 50 }
};

// Criar interface simples para escolher preset
var win = new Window("palette", "Presets de Guias", undefined);
win.orientation = "column";
win.alignChildren = "left";

// Lista de presets
var dropdown = win.add("dropdownlist", undefined, getObjectKeys(presets));
dropdown.selection = 0;

// Botão para aplicar
var btn = win.add("button", undefined, "Aplicar");

btn.onClick = function () {
    var presetName = dropdown.selection.text;
    var guides = presets[presetName];

    // Aqui você insere o código que realmente cria as guias no After Effects
    alert("Preset selecionado: " + presetName + 
        "\nLeft: " + guides.left + 
        "\nRight: " + guides.right +
        "\nTop: " + guides.top +
        "\nBottom: " + guides.bottom);
};

win.center();
win.show();
