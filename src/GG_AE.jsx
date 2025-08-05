// ip.js/2.0.zip.json (exemplo)
{
  "plugins": {
    "grids": {
      "active": true,
      "path": "./src/GG_AE.jsx",
      "config": {
        "defaultMargins": { "top": 50, "bottom": 50, "left": 50, "right": 50 },
        "debugMode": false
      }
    }
  }
}
// GG_AE.jsx (no final do arquivo)
if (typeof gulaVisualizable !== 'undefined') {
  gulaVisualizable.registerPreview('grids', function(comp) {
    // Gera uma pré-visualização do grid para o painel "Visualizable"
    return generateGridPreview(comp); // Implemente esta função separadamente
  });
}
