import { App } from "vue";
import AbritesConfirmation from "./Confirmation.vue";

AbritesConfirmation.install = function (Vue: App) {
  Vue.component(AbritesConfirmation.name, AbritesConfirmation);
};

export default AbritesConfirmation;
