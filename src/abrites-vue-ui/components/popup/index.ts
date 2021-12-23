import { App } from "vue";
import AbritesPopup from "./Popup.vue";

AbritesPopup.install = function (Vue: App) {
  Vue.component(AbritesPopup.name, AbritesPopup);
};

export default AbritesPopup;
