import { App } from "vue";
import AbritesTag from "./Tag.vue";

AbritesTag.install = function (Vue: App) {
  Vue.component(AbritesTag.name, AbritesTag);
};

export default AbritesTag;
