import { App } from "vue";
import AbritesLazyFor from "./LazyFor.vue";

AbritesLazyFor.install = function (Vue: App) {
  Vue.component(AbritesLazyFor.name, AbritesLazyFor);
};

export default AbritesLazyFor;
