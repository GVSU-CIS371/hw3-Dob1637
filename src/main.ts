import { createApp } from "vue";
import "./styles/mug.scss";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import App from "./App.vue";
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

createApp(App).use(pinia).mount("#app");
