import { App } from "vue";
import AbritesDrawer from "./Drawer.vue";

AbritesDrawer.install = function (Vue: App) {
  Vue.component(AbritesDrawer.name, AbritesDrawer);
};

export default AbritesDrawer;
