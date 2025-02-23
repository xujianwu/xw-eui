<template>
  <component
    :is="tag"
    ref="_ref"
    :type="tag === 'button' ? nativeType : void 0"
    :autofocus="autofocus"
    class="er-button"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`er-button--${type}`]: type,
      [`er-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    @click="(e: MouseEvent)=>useThrottle?handleBtnClickThrottle(e):handleBtnClick(e)"
  >
  <template v-if="loading">
    <slot name="loading">
      <er-icon
        class="loading-icon"
        :icon="loadingIcon ?? 'spinner'"
        :style="iconStyle"
        size="1x"
        spin
      />
    </slot>
    </template>
    <er-icon
      :icon="icon"
      size="1x"
      :style="iconStyle"
      v-if="icon && !loading"
    />
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { type Component, type ComputedRef, type Ref } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance  } from "./types";
import { throttle } from "lodash-es";
import ErIcon from "../Icon/Icon.vue"

defineOptions({
  name: 'ErButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500,
})
const emits = defineEmits<ButtonEmits>();
const slots = defineSlots();
const _ref = ref<HTMLButtonElement>();
  const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));

const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration);

defineExpose<ButtonInstance>({
  ref: _ref
});
</script>

<style scoped>
@import "style.css";
</style>