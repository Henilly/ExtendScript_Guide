// Em USA-ME.md ou ip.js/2.0.zip.json
{
  "plugins": {
    "gridGenerator": {
      "active": true,
      "path": "./src/GG_AE.jsx",
      "defaultPresets": ["3-col", "golden-ratio"]
    }
  }
}
## ExtendScript Integration
```javascript
// Carregue o grid generator via eval()
#include "src/GG_AE.jsx"
## ExtendScript Integration
```javascript
// Carregue o grid generator via eval()
#include "src/GG_AE.jsx"
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
