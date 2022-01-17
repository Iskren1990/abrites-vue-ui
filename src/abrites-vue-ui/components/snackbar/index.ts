import { App } from "vue";
import AbritesSnackbar from "./Snackbar.vue";

AbritesSnackbar.install = function (Vue: App) {
  Vue.component(AbritesSnackbar.name, AbritesSnackbar);
};

export default AbritesSnackbar;
