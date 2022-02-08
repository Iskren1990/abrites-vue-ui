import { App } from "vue";
import AbritesChart from "./Chart.vue";

AbritesChart.install = function (Vue: App) {
  Vue.component(AbritesChart.name, AbritesChart);
};

export default AbritesChart;
