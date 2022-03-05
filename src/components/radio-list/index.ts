import { App } from "vue";
import RadioList from "./RadioList.vue";

RadioList.install = function (Vue: App) {
  Vue.component(RadioList.name, RadioList);
};

export default RadioList;
