import { defineComponent } from "vue";
import { isFunction } from "lodash-es";

export const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [String, Object, Function],
      required: true,
    },
  },
  /**
   * 设置组件的渲染逻辑
   * 此函数接收一个属性对象作为参数，并返回一个渲染函数
   * 主要用于根据props中的vNode属性动态确定组件的渲染方式
   * 
   * @param props 组件的属性对象，包含vNode属性
   *              vNode属性可以是一个函数或React元素
   *              如果是函数，则调用该函数以获取要渲染的React元素
   *              如果是React元素，则直接返回该元素
   * @returns 返回一个函数，该函数在调用时会根据vNode的类型来渲染组件
   */
  setup(props) {
    // 返回一个函数，用于根据vNode的类型来渲染组件
    return () => (isFunction(props.vNode) ? props.vNode() : props.vNode);
  },
});

export const typeIconMap = new Map([
  ["info", "circle-info"],
  ["success", "check-circle"],
  ["warning", "circle-exclamation"],
  ["danger", "circle-xmark"],
  ["error", "circle-xmark"],
]);

export * from "./install";
export * from "./error";
export * from "./style";
