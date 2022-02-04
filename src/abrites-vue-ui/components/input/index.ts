import { App } from "vue";
import AbritesInput from "./Input.vue";

AbritesInput.install = function (Vue: App) {
  Vue.component(AbritesInput.name, AbritesInput);
};

export default AbritesInput;
