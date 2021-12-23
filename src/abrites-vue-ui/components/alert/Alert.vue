<template>
  <div class="alert-host">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AbritesAlert",
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

@mixin alert-theme($name, $color) {
  &[#{$name}],
  &.#{$name} {
    background: rgba($color, 0.1);
    color: $color;
  }
}

.alert-host {
  @include normalize-host();
  display: block;
  width: 100%;
  margin: $base-spacing 0;
  padding: 13px 15px;
  font-size: 1rem;
  line-height: 1.6em;
  border-radius: $border-radius;
  color: $txt-secondary-color;
  background: rgba(#fff, 0.05);
  &:first-child,
  & > ::v-deep() :first-child {
    margin-top: 0;
  }
  &:last-child,
  & > ::v-deep() :last-child {
    margin-bottom: 0;
  }

  @include alert-theme("accent", $accent-color);
  @include alert-theme("danger", $danger-color);
  @include alert-theme("success", $success-color);
  @include alert-theme("warning", $warning-color);
}
</style>
