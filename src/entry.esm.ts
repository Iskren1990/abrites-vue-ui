import { App, Plugin } from "vue";
// Import vue components
import * as components from "./components/index";
import * as directives from "./directives/index";

// install function executed by Vue.use()
const install: Exclude<Plugin["install"], undefined> =
  function installAbritesVueUi(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
    Object.values(directives).forEach((directive) => {
      app.directive(directive.name, directive.directive);
    });
  };

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from "./components/index";
export * from "./directives/index";
export * from "./composables/index";
export * from "./components/helpers";
