import { App } from "vue";
import AbritesAccordionPanel from "./AccordionPanel.vue";

AbritesAccordionPanel.install = function (Vue: App) {
  Vue.component(AbritesAccordionPanel.name, AbritesAccordionPanel);
};

export default AbritesAccordionPanel;
