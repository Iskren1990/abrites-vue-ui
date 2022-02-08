import { App } from "vue";
import AbritesButton from "./Button.vue";

AbritesButton.install = function (Vue: App) {
  Vue.component(AbritesButton.name, AbritesButton);
};

export default AbritesButton;
