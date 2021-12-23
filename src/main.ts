import ui from "./abrites-vue-ui/entry";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue3Highlightjs from "./assets/plugins/vue3-highlight-es";
import "./assets/solarized-light.min.scss";
import "./assets/global.scss";

createApp(App)
  .use(ui)
  .use(store)
  .use(router)
  .use(Vue3Highlightjs)
  .mount("#app");
