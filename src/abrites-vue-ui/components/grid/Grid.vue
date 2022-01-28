<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AbritesGrid",
});
</script>

<template>
  <div class="grid-host">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

@mixin generate-grid($infix: "", $total: 12) {
  @if ($infix != "") {
    $infix: "-#{$infix}";
  }

  @for $i from 1 through $total {
    .col#{$infix}-auto {
      flex: 0 0 auto;
      width: auto;
      max-width: none;
    }
    .col#{$infix}-#{$i} {
      flex: 0 0 (math.div(100%, math.div($total, $i)));
      max-width: (math.div(100%, math.div($total, $i)));
    }
    .offset#{$infix}-#{$i} {
      margin-left: (math.div(100%, math.div($total, $i)));
    }
    .push#{$infix}-#{$i} {
      margin-right: (math.div(100%, math.div($total, $i)));
    }
  }
}

.grid-host {
  @include normalize-host();
  display: flex;
  flex-wrap: wrap;
  width: auto;
  margin-right: -(math.div($base-spacing, 2));
  margin-left: -(math.div($base-spacing, 2));
  &[nogutters],
  &.nogutters {
    margin-right: 0;
    margin-left: 0;
    & > ::v-deep() .col,
    & > ::v-deep() [class*="col-"] {
      padding-right: 0 !important;
      padding-left: 0 !important;
    }
  }
}

.grid-host ::v-deep() {
  .flex-fill,
  .fill {
    flex: 1 1 auto !important;
  }

  [class*="col-"] {
    position: relative;
    width: 100%;
    min-height: 1px;
    box-sizing: border-box;
    padding-right: (math.div($base-spacing, 2));
    padding-left: (math.div($base-spacing, 2));
    &.align-center {
      align-self: center;
    }
    &.align-top {
      align-self: flex-start;
    }
    &.align-bottom {
      align-self: flex-end;
    }
  }

  .col-content {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  @include generate-grid();

  @media (min-width: $grid-sm-breakpoint) {
    @include generate-grid("sm");
  }

  @media (min-width: $grid-md-breakpoint) {
    @include generate-grid("md");
  }

  @media (min-width: $grid-lg-breakpoint) {
    @include generate-grid("lg");
  }
}
</style>
