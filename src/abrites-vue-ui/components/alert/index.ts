import { App } from "vue";
import AbritesAlert from "./Alert.vue";

AbritesAlert.install = function (Vue: App) {
  Vue.component(AbritesAlert.name, AbritesAlert);
};

export default AbritesAlert;
