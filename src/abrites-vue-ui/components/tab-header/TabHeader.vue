<template>
  <div class="tab-header">
    <div
      v-for="(label, i) in labels"
      :key="i"
      class="tab-item"
      :class="{ active: activeIndex == i }"
      @click.prevent="changeActiveIndexAndHandleEvent(i, $event)"
      @keydown.enter="changeActiveIndexAndHandleEvent(i, $event)"
      @keydown.space="changeActiveIndexAndHandleEvent(i, $event)"
    >
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
export default defineComponent({
  name: "AbritesTabHeader",
  props: {
    labels: {
      type: Array as PropType<string[]>,
    },
    active: {
      type: Number,
    },
  },
  setup(props, ctx) {
    let activeIndex = ref(props.active);

    const changeActiveIndexAndHandleEvent = (index: number, event: Event) => {
      event.preventDefault();

      activeIndex.value = index;
      ctx.emit("change", activeIndex.value);
      (event.target as HTMLElement)?.blur();
    };

    return { changeActiveIndexAndHandleEvent, activeIndex };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.tab-header {
  @include normalize-host();
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  font-size: 1rem;
  border-bottom: 1px solid $border-color;
  .tab-item {
    flex-shrink: 1;
    outline: 0;
    position: relative;
    padding: (math.div($base-spacing, 2)) $base-spacing;
    line-height: 1.5em;
    font-size: 1.1em;
    font-weight: $txt-bold;
    min-width: 160px;
    color: inherit;
    cursor: pointer;
    user-select: none;
    text-align: center;
    text-transform: uppercase;
    color: $txt-secondary-color;
    transition: background $transition-speed, color $transition-speed;
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: $accent-color;
      transform: rotateY(90deg);
      transition: transform $transition-speed;
    }
    &:hover,
    &:focus {
      color: $txt-primary-color;
    }
    &:focus {
      background: rgba(#fff, 0.05);
    }
    &:active {
      color: $txt-primary-color;
      background: rgba(#fff, 0.05);
    }
    &.active {
      color: $accent-color;
      &:after {
        transform: rotateY(0deg);
      }
    }
  }

  &[left],
  &.left,
  [left] > &,
  .left > & {
    justify-content: flex-start;
  }
  &[center],
  &.center,
  [center] > &,
  .center > & {
    justify-content: center;
  }
  &[right],
  &.right,
  [right] > &,
  .right > & {
    justify-content: flex-end;
  }
  &[stretched],
  &.stretched,
  [stretched] > &,
  .stretched > & {
    .tab-item {
      flex: 1;
    }
  }
}
</style>
