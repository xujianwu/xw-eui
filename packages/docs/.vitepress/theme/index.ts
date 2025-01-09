import DefaultTheme from "vitepress/theme";
import { type App } from "vue";
import XjwEUI from "xw-eui";
import { ElementPlusContainer } from "@vitepress-preview/component";

import "@vitepress-preview/component/style.css";
// import "xw-eui/dist/index.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(XjwEUI);
  },
};