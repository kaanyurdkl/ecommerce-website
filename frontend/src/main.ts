import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@fortawesome/fontawesome-free/css/all.css";

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
