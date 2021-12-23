import { App } from "vue";
import AbritesGrid from "./Grid.vue";

AbritesGrid.install = function (Vue: App) {
  Vue.component(AbritesGrid.name, AbritesGrid);
};

export default AbritesGrid;
