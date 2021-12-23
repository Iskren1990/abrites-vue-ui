import { App } from "vue";
import AbritesTabPanel from "./TabPanel.vue";

AbritesTabPanel.install = function (Vue: App) {
  Vue.component(AbritesTabPanel.name, AbritesTabPanel);
};

export default AbritesTabPanel;
