// Gula Grid Generator v1.0 - ExtendScript for AE
(function(gula) {
  if (!gula.plugins) gula.plugins = {};
  
  gula.plugins.grids = {
    create: function(config) {
      var comp = app.project.activeItem;
      if (!comp || !(comp instanceof CompItem)) return false;
      
      // Implementação do grid aqui (usar o código anterior)
      alert("Grid Generator ativado para " + comp.name);
      return true;
    }
  };
  
  // Auto-inicialização se no contexto do AE
  if (typeof app !== 'undefined' && app.project) {
    gula.plugins.grids.create();
  }
})(this.$gula || (this.$gula = {}));
