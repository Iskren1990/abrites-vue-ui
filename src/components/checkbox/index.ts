import { App } from "vue";
import AbritesCheckbox from "./Checkbox.vue";

AbritesCheckbox.install = function (Vue: App) {
  Vue.component(AbritesCheckbox.name, AbritesCheckbox);
};

export default AbritesCheckbox;
