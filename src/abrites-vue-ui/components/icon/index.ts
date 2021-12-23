import { App } from "vue";
import AbritesIcon from "./Icon.vue";

AbritesIcon.install = function (Vue: App) {
  Vue.component(AbritesIcon.name, AbritesIcon);
};

export default AbritesIcon;
