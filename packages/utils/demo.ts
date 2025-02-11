import type {App, Plugin} from "vue";
import { noop, each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

export function makeInstaller(components: Plugin[]) {
  const install = (app: App) => {
    each(components, (c) => {
      app.use(c);
    });
  };
  return install;
};

export function withInstall<T> (component: Plugin) {
  (component as SFCWithInstall<T>).install = (app: App)=>{
    const name = (component as any).name || "UnnamedComponent"
    app.component(name, component as Plugin)
  }

  return component as SFCWithInstall<T>;
}