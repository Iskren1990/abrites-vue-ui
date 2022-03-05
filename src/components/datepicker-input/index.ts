import { App } from "vue";
import AbritesDatepickerInput from "./DatepickerInput.vue";

AbritesDatepickerInput.install = function (Vue: App) {
  Vue.component(AbritesDatepickerInput.name, AbritesDatepickerInput);
};

export default AbritesDatepickerInput;
