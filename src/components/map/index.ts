import { App } from "vue";
import AbritesMap from "./Map.vue";

AbritesMap.install = function (Vue: App) {
  Vue.component(AbritesMap.name, AbritesMap);
};

export default AbritesMap;
