import ui from "../src/entry";
import { createApp } from "vue/dist/vue.esm-bundler.js";
import App from "./App.vue";
import router from "./router";
import Vue3Highlightjs from "./assets/plugins/vue3-highlight-es";
import "./assets/global.scss";

createApp(App).use(ui).use(router).use(Vue3Highlightjs).mount("#app");
