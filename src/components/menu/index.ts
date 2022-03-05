import { App } from "vue";
import Menu from "./Menu.vue";

Menu.install = function (Vue: App) {
  Vue.component(Menu.name, Menu);
};

export default Menu;
