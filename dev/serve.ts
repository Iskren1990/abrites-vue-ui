import ui from "@/entry";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Highlightjs from "./assets/plugins/vue3-highlight-es";
import "./assets/solarized-light.min.scss";
import "./assets/global.scss";

createApp(App).use(ui).use(router).use(Vue3Highlightjs).mount("#app");
