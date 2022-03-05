import { App } from "vue";
import AbritesDatepickerSlider from "./DatepickerSlider.vue";

AbritesDatepickerSlider.install = function (Vue: App) {
  Vue.component(AbritesDatepickerSlider.name, AbritesDatepickerSlider);
};

export default AbritesDatepickerSlider;
