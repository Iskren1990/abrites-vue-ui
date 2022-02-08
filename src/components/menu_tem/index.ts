import { App } from "vue";
import MenuItem from "./MenuItem.vue";

MenuItem.install = function (Vue: App) {
  Vue.component(MenuItem.name, MenuItem);
};

export default MenuItem;
