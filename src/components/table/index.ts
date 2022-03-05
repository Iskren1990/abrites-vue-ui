import { App } from "vue";
import AbritesTable from "./Table.vue";
import { ISortData, SortDirection } from "./ISortData";
import { ITableAction } from "./ITableAction";
import { ITableColumn } from "./ITableColumn";

AbritesTable.install = function (Vue: App) {
  Vue.component(AbritesTable.name, AbritesTable);
};

export default AbritesTable;

export * from "./ISortData";
export * from "./ITableAction";
export * from "./ITableColumn";
