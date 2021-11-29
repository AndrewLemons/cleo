import { createApp } from "vue";

import App from "./App.vue";
import Router from "./router";

import "./styles.scss";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/fontawesome";

createApp(App).use(Router).mount("#app");
