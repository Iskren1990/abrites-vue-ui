<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AbritesIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="icon-host">
    <i class="icon material-icons">{{ icon }}</i>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

@mixin icon-theme($name, $color) {
  &[#{$name}],
  &.#{$name} {
    color: $color;
  }
}

.icon-host {
  outline: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font-size: 24px;
  width: 1em;
  line-height: 1;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  &[small],
  &.small {
    font-size: $icon-size-small;
  }
  &[large],
  &.large {
    font-size: $icon-size-large;
  }
  &[rotate-90],
  &.rotate-90 {
    transform: rotate(90deg);
  }
  &[rotate-180],
  &.rotate-180 {
    transform: rotate(180deg);
  }
  &[rotate-270],
  &.rotate-270 {
    transform: rotate(270deg);
  }
  &[faded],
  &.faded {
    opacity: 0.5;
  }

  @include icon-theme("accent", $accent-color);
  @include icon-theme("danger", $danger-color);
  @include icon-theme("success", $success-color);
  @include icon-theme("warning", $warning-color);
  @include icon-theme("hint", $txt-hint-color);
  @include icon-theme("light", $txt-secondary-color);
  @include icon-theme("dark", $base-color);
}

:host(.icon) {
  font-size: 24px !important;
}

.icon {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: inherit;
  display: inline-block;
  vertical-align: top;
  line-height: inherit;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  color: inherit;
  width: inherit;
  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;
  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;
  /* Support for IE. */
  font-feature-settings: "liga";
}
</style>
