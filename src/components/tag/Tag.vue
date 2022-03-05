<script lang="ts" setup></script>

<template>
  <div class="tag-host">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

$tag-spacing: 8px !default;
$small-tag-spacing: (math.div($tag-spacing, 2)) !default;
$large-tag-spacing: ($tag-spacing * 1.5) !default;

@mixin label-theme($name, $color) {
  &[#{$name}],
  &.#{$name} {
    background: $color;
    color: contrast-color($color);
  }
}

.tag-host {
  @include normalize-host();
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  margin: 0 $tag-spacing;
  padding: 0 $tag-spacing;
  min-height: 21px;
  font-size: 0.9rem;
  line-height: 1;
  font-weight: $txt-bold;
  text-align: center;
  white-space: nowrap;
  text-transform: uppercase;
  border-radius: 20px;
  color: inherit;
  background: rgba(#fff, 0.05);
  transition: background $transition-speed;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  @include label-theme("accent", $accent-color);
  @include label-theme("danger", $danger-color);
  @include label-theme("success", $success-color);
  @include label-theme("warning", $warning-color);
  @include label-theme("light", $txt-secondary-color);
  @include label-theme("dark", $base-color);

  ::v-deep() {
    .icon-host:not([small]):not([large]) {
      font-size: 1.35em !important;
    }
    .button-host {
      border-radius: 20px !important;
      .button-content {
        padding: 4px !important;
        min-height: 100% !important;
      }
    }
    .button-host:first-child {
      margin-left: -$tag-spacing;
    }
    .button-host:last-child {
      margin-right: -$tag-spacing;
    }
    .txt {
      width: 100%;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .txt ~ .icon-host,
    .txt ~ .button-host,
    .icon-host ~ .txt,
    .button-host ~ .txt {
      margin-left: $tag-spacing;
    }
  }

  &[hint],
  &.hint {
    color: $txt-secondary-color;
  }
  &[wide],
  &.wide {
    min-width: 75px;
  }
  &[wider],
  &.wider {
    min-width: 140px;
  }
  &[large],
  &.large {
    min-height: 26px;
    font-size: 1rem;
    padding: 0 $large-tag-spacing;
    ::v-deep() {
      .button-host:first-child {
        margin-left: -$large-tag-spacing;
      }
      .button-host:last-child {
        margin-right: -$large-tag-spacing;
      }
    }
  }
  &[small],
  &.small {
    min-height: 18px;
    font-size: 0.8rem;
    padding: 0 $small-tag-spacing;
    ::v-deep() {
      .button-host:first-child {
        margin-left: -$small-tag-spacing;
      }
      .button-host:last-child {
        margin-right: -$small-tag-spacing;
      }
      .icon-host:not([small]):not([large]) {
        font-size: 1.1em !important;
      }
      .txt ~ .icon-host,
      .txt ~ .button-host,
      .icon-host ~ .txt,
      .button-host ~ .txt {
        margin-left: $small-tag-spacing;
      }
    }
  }

  &[notransform],
  &.notransform {
    text-transform: none;
  }
  &[lowercase],
  &.lowercase {
    text-transform: lowercase;
  }
}
</style>
