(function(){

    // Memória simples para presets na sessão
    var presets = {};

    // Função para criar guias na comp a partir de array [{type:"VERTICAL",pos:100},...]
    function applyGuides(comp, guidesArr) {
        if (!(comp instanceof CompItem)) {
            alert("Abra uma composição antes de aplicar as guias.");
            return false;
        }
        app.beginUndoGroup("Aplicar Guias");
        comp.guides = [];
        var arr = [];
        for(var i=0; i<guidesArr.length; i++) {
            var g = guidesArr[i];
            if(g.type === "VERTICAL") {
                arr.push(comp.createGuide("VERTICAL", g.pos));
            } else if(g.type === "HORIZONTAL") {
                arr.push(comp.createGuide("HORIZONTAL", g.pos));
            }
        }
        comp.guides = arr;
        app.endUndoGroup();
        return true;
    }

    // Função para limpar todas as guias da composição ativa
    function clearGuides(comp) {
        if (!(comp instanceof CompItem)) {
            alert("Abra uma composição antes de limpar as guias.");
            return false;
        }
        app.beginUndoGroup("Limpar Guias");
        comp.guides = [];
        app.endUndoGroup();
        return true;
    }

    // Criar a janela principal
    var win = new Window("palette", "Guias Flexíveis", undefined);
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 10;
    win.margins = 12;
    win.minimumSize = [400, 350];

    // Menu topo para escolher aba
    var menuGroup = win.add("group");
    menuGroup.orientation = "row";
    menuGroup.alignChildren = ["fill", "center"];

    var btnMargens = menuGroup.add("button", undefined, "Margens");
    var btnCustom = menuGroup.add("button", undefined, "Custom");
    var btnPresets = menuGroup.add("button", undefined, "Presets");
    var btnClear = menuGroup.add("button", undefined, "Limpar Guias");
    btnClear.alignment = "right";

    // Grupos de conteúdo (abas simuladas)
    var panelMargens = win.add("group");
    panelMargens.orientation = "column";
    panelMargens.visible = true;

    var panelCustom = win.add("group");
    panelCustom.orientation = "column";
    panelCustom.visible = false;

    var panelPresets = win.add("group");
    panelPresets.orientation = "column";
    panelPresets.visible = false;

    // --- Painel Margens ---

    var grpMargins = panelMargens.add("group");
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

    var btnApplyMargins = panelMargens.add("button", undefined, "Aplicar Margens");

    btnApplyMargins.onClick = function(){
        var left = parseInt(inputLeft.text);
        var right = parseInt(inputRight.text);
        var top = parseInt(inputTop.text);
        var bottom = parseInt(inputBottom.text);

        if([left,right,top,bottom].some(function(v){ return isNaN(v) || v<0; })) {
            alert("Insira valores numéricos positivos para margens.");
            return;
        }

        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("Abra uma composição ativa para aplicar as margens.");
            return;
        }

        var guidesArr = [];
        if(left > 0) guidesArr.push({type:"VERTICAL", pos:left});
        if(right > 0) guidesArr.push({type:"VERTICAL", pos:comp.width - right});
        if(top > 0) guidesArr.push({type:"HORIZONTAL", pos:top});
        if(bottom > 0) guidesArr.push({type:"HORIZONTAL", pos:comp.height - bottom});

        if(applyGuides(comp, guidesArr)){
            alert("Guias de margens aplicadas!");
        }
    };

    // --- Painel Custom ---

    panelCustom.add("statictext", undefined, "Digite as guias no formato:\nVERTICAL:100,HORIZONTAL:200,...");

    var inputCustom = panelCustom.add("edittext", undefined, "", {multiline:true});
    inputCustom.preferredSize = [380, 100];

    var btnApplyCustom = panelCustom.add("button", undefined, "Aplicar Guias Custom");

    btnApplyCustom.onClick = function(){
        var rawText = inputCustom.text.trim();
        if(!rawText){
            alert("Digite as coordenadas para as guias.");
            return;
        }

        // Parse do texto em formato "VERTICAL:100,HORIZONTAL:200"
        var parts = rawText.split(",");
        var guidesArr = [];
        for(var i=0; i<parts.length; i++) {
            var p = parts[i].trim();
            var m = p.match(/(VERTICAL|HORIZONTAL)\s*:\s*(\d+)/i);
            if(m && m.length == 3){
                guidesArr.push({type:m[1].toUpperCase(), pos:parseInt(m[2])});
            } else {
                alert("Formato inválido em: " + p);
                return;
            }
        }

        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("Abra uma composição ativa para aplicar as guias.");
            return;
        }

        if(applyGuides(comp, guidesArr)){
            alert("Guias custom aplicadas!");
        }
    };

    // --- Painel Presets ---

    var txtNoPresets = panelPresets.add("statictext", undefined, "Nenhum preset salvo.", {multiline:true});
    txtNoPresets.alignment = ["fill", "top"];

    var grpPresetList = panelPresets.add("group");
    grpPresetList.orientation = "column";
    grpPresetList.alignChildren = ["fill", "top"];
    grpPresetList.spacing = 5;
    grpPresetList.preferredSize = [380, 150];

    var grpPresetActions = panelPresets.add("group");
    grpPresetActions.orientation = "row";
    grpPresetActions.alignChildren = ["fill", "center"];

    var inputPresetName = grpPresetActions.add("edittext", undefined, "");
    inputPresetName.characters = 20;
    var btnSavePreset = grpPresetActions.add("button", undefined, "Salvar Preset");

    btnSavePreset.onClick = function(){
        var name = inputPresetName.text.trim();
        if(!name){
            alert("Digite um nome para o preset.");
            return;
        }

        // Definir os dados do preset baseado na aba atual:
        var currentPanel = getCurrentPanel();
        var presetData = null;

        if(currentPanel === panelMargens){
            var left = parseInt(inputLeft.text);
            var right = parseInt(inputRight.text);
            var top = parseInt(inputTop.text);
            var bottom = parseInt(inputBottom.text);
            if([left,right,top,bottom].some(function(v){ return isNaN(v) || v<0; })) {
                alert("Insira valores numéricos positivos para margens.");
                return;
            }
            presetData = {
                type: "margens",
                data: {left:left, right:right, top:top, bottom:bottom}
            };
        } else if(currentPanel === panelCustom){
            var txt = inputCustom.text.trim();
            if(!txt){
                alert("Insira dados para o preset custom.");
                return;
            }
            presetData = {
                type: "custom",
                data: txt
            };
        } else {
            alert("Selecione a aba Margens ou Custom para salvar o preset.");
            return;
        }

        presets[name] = presetData;
        alert("Preset '" + name + "' salvo.");
        inputPresetName.text = "";
        updatePresetList();
    };

    function updatePresetList(){
        // Limpar a lista
        grpPresetList.removeAll();

        var keys = Object.keys(presets);
        if(keys.length === 0){
            txtNoPresets.visible = true;
            return;
        }
        txtNoPresets.visible = false;

        for(var i=0; i<keys.length; i++){
            (function(){
                var key = keys[i];
                var preset = presets[key];
                var group = grpPresetList.add("group");
                group.orientation = "row";
                group.alignChildren = ["fill", "center"];
                group.spacing = 10;

                var label = group.add("statictext", undefined, key);
                label.characters = 20;

                var btnApply = group.add("button", undefined, "Aplicar");
                btnApply.onClick = function(){
                    var comp = app.project.activeItem;
                    if(!(comp instanceof CompItem)){
                        alert("Abra uma composição ativa para aplicar o preset.");
                        return;
                    }
                    if(preset.type === "margens"){
                        var d = preset.data;
                        var guidesArr = [];
                        if(d.left > 0) guidesArr.push({type:"VERTICAL", pos:d.left});
                        if(d.right > 0) guidesArr.push({type:"VERTICAL", pos:comp.width - d.right});
                        if(d.top > 0) guidesArr.push({type:"HORIZONTAL", pos:d.top});
                        if(d.bottom > 0) guidesArr.push({type:"HORIZONTAL", pos:comp.height - d.bottom});
                        if(applyGuides(comp, guidesArr)){
                            alert("Preset '" + key + "' aplicado.");
                        }
                    } else if(preset.type === "custom"){
                        var rawText = preset.data;
                        var parts = rawText.split(",");
                        var guidesArr = [];
                        for(var j=0; j<parts.length; j++) {
                            var p = parts[j].trim();
                            var m = p.match(/(VERTICAL|HORIZONTAL)\s*:\s*(\d+)/i);
                            if(m && m.length == 3){
                                guidesArr.push({type:m[1].toUpperCase(), pos:parseInt(m[2])});
                            }
                        }
                        if(applyGuides(comp, guidesArr)){
                            alert("Preset '" + key + "' aplicado.");
                        }
                    }
                };

                var btnDelete = group.add("button", undefined, "Apagar");
                btnDelete.onClick = function(){
                    if(confirm("Apagar preset '" + key + "'?")){
                        delete presets[key];
                        updatePresetList();
                    }
                };
            })();
        }
        grpPresetList.layout.layout(true);
    }

    // Função para retornar a aba ativa
    function getCurrentPanel(){
        if(panelMargens.visible) return panelMargens;
        if(panelCustom.visible) return panelCustom;
        if(panelPresets.visible) return panelPresets;
        return null;
    }

    // Botões topo para trocar abas
    btnMargens.onClick = function(){
        panelMargens.visible = true;
        panelCustom.visible = false;
        panelPresets.visible = false;
    };
    btnCustom.onClick = function(){
        panelMargens.visible = false;
        panelCustom.visible = true;
        panelPresets.visible = false;
    };
    btnPresets.onClick = function(){
        panelMargens.visible = false;
        panelCustom.visible = false;
        panelPresets.visible = true;
        updatePresetList();
    };

    // Botão limpar guias
    btnClear.onClick = function(){
        var comp = app.project.activeItem;
        if(!(comp instanceof CompItem)){
            alert("Abra uma composição ativa para limpar as guias.");
            return;
        }
        if(clearGuides(comp)){
            alert("Guias limpas.");
        }
    };

    // Mostrar janela
    win.center();
    win.show();

})();
