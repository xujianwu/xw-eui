import { createApp } from 'vue'
import App from './App.vue'
import XjwEUI from "xw-eui";

const app = createApp(App);
app.use(XjwEUI);
app.mount("#app");
