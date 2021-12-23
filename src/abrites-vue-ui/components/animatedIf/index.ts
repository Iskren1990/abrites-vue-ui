import { App } from "vue";
import AbritesAmimatedIf from "./AnimatedIf.vue";

AbritesAmimatedIf.install = function (Vue: App) {
  Vue.component(AbritesAmimatedIf.name, AbritesAmimatedIf);
};

export default AbritesAmimatedIf;
