## Configuration (Markdown)
```javascript
// Inicialização de plugins
gulaConfig.registerPlugin('grids', './src/GG_AE.jsx');
---

### 2. **Ponto de Entrada do Sistema**  
Local: No arquivo principal que inicializa a aplicação (provavelmente `Application` ou `main.jsx` no seu checklist):

```javascript
// main.jsx ou Application.jsx
#include "ip.js/2.0.zip.json" // Carrega configurações

function initGulaPlugins() {
  // Registra todos os plugins definidos na configuração
  if (gulaConfig.plugins) {
    for (var pluginName in gulaConfig.plugins) {
      if (gulaConfig.plugins[pluginName].active) {
        gulaConfig.registerPlugin(
          pluginName, 
          gulaConfig.plugins[pluginName].path
        );
      }
    }
  }
}

initGulaPlugins(); // Executa na inicialização
