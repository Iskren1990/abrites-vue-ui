import { App } from "vue";
import AbritesAccordion from "./Accordion.vue";

AbritesAccordion.install = function (Vue: App) {
  Vue.component(AbritesAccordion.name, AbritesAccordion);
};

export default AbritesAccordion;

export type {
  IAccordionPanelState,
  IAccordionParentController,
} from "./Accordion";
