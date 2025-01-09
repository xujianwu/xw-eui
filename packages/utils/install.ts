import type { App, Plugin, Directive } from "vue";
import { noop,each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

/**
 * 创建一个安装器函数，用于统一安装多个插件到Vue应用中
 * 这个函数的主要作用是简化多个插件的安装过程，通过遍历插件数组，
 * 逐个调用每个插件的安装方法，将它们应用到Vue应用实例中
 * 
 * @param components 插件数组，包含了一系列待安装的Vue插件
 * @returns 返回一个安装函数，该函数接受一个Vue应用实例作为参数，
 * 并将所有传入的插件安装到该实例中
 */
export function makeInstaller(components: Plugin[]) {
  /**
   * 安装函数，负责将所有传入的插件安装到指定的Vue应用实例中
   * 
   * @param app Vue应用实例，表示一个Vue应用的实例对象
   */
  const install = (app: App) =>
    each(components, (c) => {
      // 遍历每个插件，并调用其安装方法，将其添加到Vue应用中
      app.use(c);
    });

  // 返回安装函数，以便外部调用并完成插件的批量安装
  return install;
}

/**
 * 为组件添加安装方法的高阶组件函数
 * 
 * 此函数用于包装一个组件，使其具有一个install方法，便于在Vue应用中注册该组件
 * 它解决了在不同模块中重复注册同一组件的问题，通过此函数包装后，组件可以自动注册
 * 
 * @param component 要包装的组件实例
 * @returns 返回包装后的组件实例，其包含一个install方法
 */
export const withInstall = <T>(component: T) => {
  // 定义安装方法，当应用使用该组件时，可以通过app.use()方法进行注册
  (component as SFCWithInstall<T>).install = (app: App) => {
    // 获取组件的名称，如果没有名称，则默认为'UnnamedComponent'
    const name = (component as any)?.name || "UnnamedComponent";
    // 在应用中注册组件，使组件可以在整个应用范围内使用
    app.component(name, component as SFCWithInstall<T>);
  };
  // 返回包装后的组件，此时的组件已经包含了一个install方法
  return component as SFCWithInstall<T>;
};

/**
 * 为给定的函数添加安装方法，使其能够在Vue应用中方便地进行全局安装和使用
 * 
 * @template T 函数的类型
 * @param {T} fn 需要添加安装方法的函数
 * @param {string} name 函数的全局名称
 * @returns {SFCWithInstall<T>} 添加了安装方法的函数
 */
export const withInstallFunction = <T>(fn: T, name: string) => {
  // 定义安装方法，当应用使用该函数时，会在全局属性中添加该函数
  (fn as SFCWithInstall<T>).install = (app: App) => {
    app.config.globalProperties[name] = fn;
  };
  // 返回添加了安装方法的函数
  return fn as SFCWithInstall<T>;
};

/**
 * 为指令添加安装方法，使其可以按需引入
 * @template T 指令的类型
 * @param {T} directive 要添加安装方法的指令
 * @param {string} name 指令的名称
 * @returns {SFCWithInstall<T>} 返回添加了安装方法的指令
 */
export const withInstallDirective = <T extends Directive>(
  directive: T,
  name: string
): SFCWithInstall<T> => {
  // 定义安装方法，当应用使用该指令时，可以通过app.install方法进行安装
  (directive as SFCWithInstall<T>).install = (app: App) => {
    app.directive(name, directive);
  };
  return directive as SFCWithInstall<T>;
};

/**
 * 为组件添加一个空操作安装方法
 * 
 * 此函数用于给一个组件添加一个空操作（noop）的安装方法，使得该组件可以在不执行任何操作的情况下被“安装”
 * 这在某些情况下，比如测试或者创建高度自定义的组件时，当不需要实际安装组件到 Vue 实例时，会非常有用
 * 
 * @param component 要添加空操作安装方法的组件
 * @returns 返回添加了空操作安装方法的组件
 */
export const withNoopInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = noop;
  return component as SFCWithInstall<T>;
};
