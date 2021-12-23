import { App } from "vue";
import Search from "./Search.vue";

Search.install = function (Vue: App) {
  Vue.component(Search.name, Search);
};

export default Search;
