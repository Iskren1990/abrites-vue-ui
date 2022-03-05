import { App } from "vue";
import AbritesSelect from "./Select.vue";

AbritesSelect.install = function (Vue: App) {
  Vue.component(AbritesSelect.name, AbritesSelect);
};

export default AbritesSelect;
