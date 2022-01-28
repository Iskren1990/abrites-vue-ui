import { App } from "vue";
import AbritesDropdown from "./Dropdown.vue";

AbritesDropdown.install = function (Vue: App) {
  Vue.component(AbritesDropdown.name, AbritesDropdown);
};

export default AbritesDropdown;
