var comp = app.project.activeItem;
if(comp instanceof CompItem){
    app.beginUndoGroup("Testar Guias");
    comp.guides = [];
    var g1 = comp.createGuide("VERTICAL", 100);
    var g2 = comp.createGuide("HORIZONTAL", 100);
    comp.guides = [g1, g2];
    app.endUndoGroup();
    alert("Guias criadas na posição 100 px!");
} else {
    alert("Abra uma composição ativa e execute novamente.");
}
