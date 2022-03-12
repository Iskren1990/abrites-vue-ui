import { App } from "vue";
import AbritesTable from "./Table.vue";

AbritesTable.install = function (Vue: App) {
  Vue.component(AbritesTable.name, AbritesTable);
};

export default AbritesTable;

export type { ITableAction } from "./ITableAction";
export type { ISortData, SortDirection } from "./ISortData";
export type { ITableColumn } from "./ITableColumn";
