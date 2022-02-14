<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from "vue";

interface ILazyForProps {
  label: string;
  hint?: string;
  disabled?: boolean;
  animate?: boolean;
  active?: boolean;
}

const props = withDefaults(defineProps<ILazyForProps>(), {
  disabled: false,
  animate: false,
  active: false,
});
const emit = defineEmits<{ (event: "trigger"): void }>();
</script>

<template>
  <div class="list-item-host">
    <div
      class="item-content"
      :class="{
        active,
        disabled,
      }"
      tabindex="0"
      @click="disabled || emit('trigger')"
      @keydown.enter="disabled || emit('trigger')"
      @keydown.space="disabled || emit('trigger')"
    >
      <slot name="beforeContent"></slot>

      <div class="content">
        <span class="label">{{ label }}</span>
        <span v-if="hint?.length" class="hint">{{ hint }}</span>
      </div>

      <slot name="afterContent"></slot>

      <nav class="ctrls" @keydown.enter="$event.stopImmediatePropagation()">
        <slot></slot>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.list-item-host {
  @include normalize-host();
  outline: 0;
  border: 0;
  margin: 1px 0;
  padding: 0;
  display: block;
  width: 100%;
  font-size: 1rem;
  line-height: 1.4em;
  user-select: none;
  text-decoration: none;
  color: $txt-secondary-color;
  &[animate],
  &.animate {
    animation: list-item-entrance ($transition-speed * 2);
  }
  &[spaced],
  &.spaced {
    margin-top: (math.div($base-spacing, 2));
    margin-bottom: (math.div($base-spacing, 2));
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  &[shadowized],
  &.shadowized {
    @include shadowize();
  }
}

.item-content {
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 45px;
  border-radius: $border-radius;
  padding: 8px 13px;
  transition: background $transition-speed, color $transition-speed;
  @include children-spacing(10px);

  .content {
    flex-grow: 1;
  }
  .label,
  .hint {
    display: block;
    width: 100%;
  }
  .hint {
    color: $txt-hint-color;
    font-size: 0.95em;
  }
  .ctrls {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    white-space: nowrap;
    @include children-spacing(10px);
  }

  // states
  &:focus,
  &:hover,
  &:active {
    color: $txt-primary-color;
    background: $hover-color;
  }
  &:active {
    background: $active-color;
  }
  &.active {
    color: $accent-color;
    background: $hover-color;
    box-shadow: inset 2px 0px 0px $accent-color;
  }
  &.disabled {
    cursor: default;
    color: $txt-disabled-color;
    background: none;
    box-shadow: inset 2px 0px 0px $hover-color;
    pointer-events: none;
    .ctrls {
      opacity: 0.5;
    }
  }

  // large layout
  .list-item-host[large] &,
  .list-item-host.large & {
    padding: 10px 15px;
    .label {
      margin: 3px 0;
      font-size: 1.1em;
      font-weight: $txt-bold;
    }
  }
}

@keyframes list-item-entrance {
  0% {
    opacity: 0;
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
