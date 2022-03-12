import { App } from "vue";
import AbritesDatepicker from "./Datepicker.vue";

AbritesDatepicker.install = function (Vue: App) {
  Vue.component(AbritesDatepicker.name, AbritesDatepicker);
};

export default AbritesDatepicker;

export type { IDatepickerPreset } from "./IDatepickerPreset";
