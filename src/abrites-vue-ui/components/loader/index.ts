import { App } from "vue";
import Loader from "./Loader.vue";

Loader.install = function (Vue: App) {
  Vue.component(Loader.name, Loader);
};

export default Loader;
