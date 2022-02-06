<script lang="ts">
import {
  defineComponent,
  withDefaults,
  defineEmits,
  defineProps,
  ref,
  onMounted,
  onUnmounted,
  watchEffect,
} from "vue";
import DropdownController from "./dropdown-controller";

export default defineComponent({ name: "AbritesDropdown" });
</script>

<script lang="ts" setup>
interface IDropdownProps {
  visible?: boolean;
  /// Whether to auto hide the dropdown on dropdown item's click.
  isContentSelectable?: boolean;
  /// Specifies that the dropdown is only progmatically operatable.
  manual?: boolean;
  /// Dropdown toggle handle.
  /// If is not set the component fallbacks to its first parent element.
  handle?: HTMLElement;
}
const props = withDefaults(defineProps<IDropdownProps>(), {
  visible: false,
  isContentSelectable: false,
  manual: false,
});

const isVisible = ref<boolean>(props.visible);
const dropdownRef = ref<HTMLElement | undefined>();
const controller = new DropdownController(dropdownRef, props, isVisible);

const emit = defineEmits<{ (event: "change", state: boolean): void }>();

watchEffect(() => {
  emit("change", isVisible.value);
});
onMounted(controller.mount);
onUnmounted(controller.unmount);
</script>

<template>
  <div
    ref="dropdownRef"
    class="dropdown-host"
    :class="{ visible: isVisible }"
    v-abrites-outside-click="() => (isVisible ? controller.hide : null)"
  >
    <div
      class="dropdown-content"
      @click.prevent="controller.contentClick.bind(this)"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

@mixin dropdown-item-theme($name, $color) {
  &[#{$name}],
  &.#{$name} {
    color: $color;
    &:hover,
    &:focus {
      background: rgba($color, 0.05);
    }
    &:active {
      background: rgba($color, 0.1);
      transition-duration: math.div($transition-speed, 2);
    }
  }
}

.dropdown-host {
  @include normalize-host();
  @include shadowize-floated();
  position: absolute;
  z-index: 1001;
  right: 0;
  top: 100%;
  margin: 5px 0;
  display: none;
  min-width: 120px;
  color: $txt-secondary-color;
  background: lighten($panel-color, 3%);
  border-radius: $border-radius;
  text-align: left;
  font-size: 1rem;
  line-height: 1;
  white-space: nowrap;
  text-transform: none;
  font-weight: normal;
  font-family: inherit;
  cursor: default;
  backface-visibility: hidden;
  &.visible {
    display: block;
  }
  &[bottom],
  &.bottom,
  &[bottom-center],
  &.bottom-center {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
  &[bottom-left],
  &.bottom-left {
    left: 0;
    right: auto;
  }
  &[top],
  &.top,
  &[top-center],
  &.top-center {
    left: 50%;
    right: auto;
    top: auto;
    bottom: 100%;
    transform: translateX(-50%);
  }
  &[top-left],
  &.top-left {
    left: 0;
    right: auto;
    top: auto;
    bottom: 100%;
  }
  &[top-right],
  &.top-right {
    top: auto;
    bottom: 100%;
  }
  &[block],
  &.block {
    width: 100%;
  }
  &[dark],
  &.dark {
    background: $base-color;
  }
  &[padded],
  &.padded {
    > .dropdown-content {
      padding: (math.div($base-spacing, 2));
    }
  }
  &[popover],
  &.popover {
    width: 100%;
    min-width: 320px;
    > .dropdown-content {
      padding: (math.div($base-spacing, 2));
    }
  }

  .dropdown-content {
    border-radius: inherit;
    display: block;
    width: 100%;
  }
}

// floating elements clear fix
.dropdown-content:after {
  content: "";
  display: table;
  width: 100%;
  clear: both;
}

::v-deep(.dropdown-content) {
  div {
    border-radius: inherit;
  }
  hr {
    border: 0;
    height: 1px;
    width: 100%;
    margin: 0;
    display: block;
    background: $border-color;
  }
  .dropdown-item {
    outline: 0;
    display: flex;
    align-items: center;
    padding: 10px 13px;
    min-height: 40px;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    transition: background $transition-speed, color $transition-speed;
    .icon-host {
      font-size: 1.3em;
      margin: 0 8px 0 0 !important;
    }
    &:first-child {
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
    }
    &:last-child {
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
    }
    &:hover,
    &:focus {
      background: $hover-color;
    }
    &:active {
      background: $active-color;
    }

    // styles
    @include dropdown-item-theme("accent", $accent-color);
    @include dropdown-item-theme("success", $success-color);
    @include dropdown-item-theme("danger", $danger-color);
    @include dropdown-item-theme("warning", $warning-color);

    // states
    &.disabled,
    &[disabled] {
      color: $txt-disabled-color;
      background: none;
      pointer-events: none;
    }
  }
}

@keyframes dropdown-entrance {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
