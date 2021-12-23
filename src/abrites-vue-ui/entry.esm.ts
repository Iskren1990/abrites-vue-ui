import { App, Plugin } from "vue";
// Import vue components
import * as components from "./components/index";

// install function executed by Vue.use()
const install: Exclude<Plugin["install"], undefined> =
  function installAbritesVueUi(app: App) {
    Object.values(components).forEach((component) => {
      app.component(component.name, component);
    });
  };

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from "./components/index";
