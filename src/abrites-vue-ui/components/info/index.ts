import { App } from "vue";
import AbritesInfo from "./Info.vue";

AbritesInfo.install = function (Vue: App) {
  Vue.component(AbritesInfo.name, AbritesInfo);
};

export default AbritesInfo;
