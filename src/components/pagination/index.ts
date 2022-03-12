import { App } from "vue";
import AbritesPagination from "./Pagination.vue";

AbritesPagination.install = function (Vue: App) {
  Vue.component(AbritesPagination.name, AbritesPagination);
};

export default AbritesPagination;

export { PaginationData } from "./pagination-data";
