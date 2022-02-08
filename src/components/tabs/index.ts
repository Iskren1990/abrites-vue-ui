import { App } from "vue";
import AbritesTabs from "./Tabs.vue";

AbritesTabs.install = function (Vue: App) {
  Vue.component(AbritesTabs.name, AbritesTabs);
};
export default AbritesTabs;
