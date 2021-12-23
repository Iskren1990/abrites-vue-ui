import { App } from "vue";
import AbritesTabHeader from "./TabHeader.vue";

AbritesTabHeader.install = function (Vue: App) {
  Vue.component(AbritesTabHeader.name, AbritesTabHeader);
};

export default AbritesTabHeader;
