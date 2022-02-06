<script lang="ts">
import {
  withDefaults,
  computed,
  defineEmits,
  defineComponent,
  defineProps,
  ref,
} from "vue";

export default defineComponent({ name: "AbritesButton" });
</script>

<script lang="ts" setup>
interface IButtonProps {
  submit?: boolean;
  disabled?: boolean;
  loading?: boolean;
  link?: string;
  continuous?: number;
  continuousDelay?: number;
}
const props = withDefaults(defineProps<IButtonProps>(), {
  submit: false,
  disabled: false,
  loading: false,
  link: "",
  continuousDelay: 300,
});

const emit = defineEmits<{
  (event: "trigger", value: Event): void;
}>();
const trigger = (e: Event) => emit("trigger", e);
const isRouterLink = computed(() => props.link);
const isContinuous = computed(
  () => props.continuous != null && props.continuous > 0
);
const isDisabled = computed(() => props.disabled);
const isLoading = computed(() => props.loading);
const isSubmit = computed(() => props.submit);

const continuousDelayTimer = ref(0);
const continuousPeriodicTimer = ref(0);

function continuousTrigger(e: Event) {
  cancelContinuousTrigger();

  trigger(e);

  continuousDelayTimer.value = setTimeout(
    () =>
      (continuousPeriodicTimer.value = setInterval(
        () => trigger(e),
        props.continuous
      )),
    props.continuousDelay
  );
}

function cancelContinuousTrigger() {
  clearTimeout(continuousDelayTimer.value);
  clearInterval(continuousPeriodicTimer.value);
}

function prventDefaultAndStopPropagtion(event: Event) {
  event.stopPropagation();
}
</script>

<template>
  <div class="button-host">
    <a
      v-if="isRouterLink"
      class="button"
      :href="link"
      :class="(isDisabled || isLoading) && disabled"
      @click.prevent="prventDefaultAndStopPropagtion"
    >
      <div class="button-content">
        <AbritesLoader v-if="isLoading" class="active" />
      </div>
    </a>

    <button
      v-if="!isRouterLink"
      class="button"
      :type="isSubmit ? 'submit' : 'button'"
      :disabled="isDisabled || isLoading"
      @click="!isContinuous && trigger($event)"
      @mousedown="isContinuous && continuousTrigger($event)"
      @mouseleave="isContinuous && cancelContinuousTrigger()"
      @mouseup="isContinuous && cancelContinuousTrigger()"
      @keydown.enter="trigger"
      @keydown.space="trigger"
    >
      <div class="button-content">
        <AbritesLoader v-if="isLoading" class="active" />
        <slot v-if="!isLoading" />
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

@mixin button-theme($name, $color) {
  .button-host[#{$name}]:not([flat]):not(.flat)
    &:not([disabled]):not(.disabled),
  .button-host.#{$name}:not([flat]):not(.flat)
    &:not([disabled]):not(.disabled) {
    background: $color;
    color: contrast-color($color);
    @if (lightness($color) > 50) {
      &:hover,
      &:focus {
        background: darken($color, 10%);
      }
      &:active {
        background: darken($color, 15%);
      }
    } @else {
      &:hover,
      &:focus {
        background: lighten($color, 7%);
      }
      &:active {
        background: lighten($color, 12%);
      }
    }
  }
  .button-host[#{$name}] &:not([disabled]):not(.disabled),
  .button-host.#{$name} &:not([disabled]):not(.disabled) {
    color: $color;
    &:hover,
    &:focus {
      background: rgba($color, 0.07);
    }
    &:active {
      background: rgba($color, 0.12);
    }
  }
}

.button-host {
  @include normalize-host();
  position: relative;
  outline: 0;
  padding: 0;
  width: auto;
  font-size: 1rem;
  display: inline-block;
  vertical-align: top;
  font-family: inherit;
  background: none;
  border-radius: $border-radius;
  transition: opacity $transition-speed;

  &[block],
  &.block {
    display: block;
    width: 100%;
  }
  &[round],
  &.round {
    border-radius: $button-height;
    &[small],
    &.small {
      border-radius: $button-height-small;
    }
    &[large],
    &.large {
      border-radius: $button-height-large;
    }
    .button {
      border-radius: inherit;
    }
  }
  &[left],
  &.left {
    float: left;
  }
  &[right],
  &.right {
    float: right;
  }
  &[fixed],
  &.fixed {
    position: fixed;
    z-index: 100;
    bottom: $base-spacing;
    right: $base-spacing;
  }
  &[faded],
  &.faded {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
  &.disabled {
    pointer-events: none;
  }

  .buttons-group:not(.round) & {
    border-radius: 0;
    margin-left: 1px;
    &:first-child {
      margin-left: 0;
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }
    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
  .buttons-group.block & {
    flex: 1 0;
  }
  .buttons-group.round & {
    border-radius: 40px;
    margin-left: 5px;
  }
}

.button {
  position: relative;
  z-index: auto;
  outline: 0;
  border: 0;
  margin: 0;
  user-select: none;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  color: inherit;
  text-align: center;
  line-height: 1;
  font-size: 1em;
  font-weight: $txt-bold;
  font-family: inherit;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: inherit;
  background: $hover-color;
  transition: background $transition-speed, box-shadow $transition-speed;
  @include shadowize();
  &::-moz-focus-inner {
    border: 0;
  }
  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: 0;
    font-size: 1.7em;
    transform: translate(-50%, -50%);
  }
  .button-content {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: $button-height;
    padding: 5px (math.div($base-spacing, 2));
    align-items: center;
    justify-content: center;
    transition: transform $transition-speed, opacity $transition-speed;
    ::v-deep() > * {
      margin-left: 8px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    ::v-deep(.dropdown-host) {
      margin-left: 0;
      margin-right: 0;
    }
  }
  &:hover,
  &:focus {
    background: rgba(#fff, 0.1);
  }
  &:active {
    background: rgba(#fff, 0.15);
    transition-duration: (math.div($transition-speed, 2));
  }
  .button-host[flat] &,
  .button-host.flat & {
    box-shadow: none;
    background: transparent;
    &:hover,
    &:focus {
      background: $hover-color;
    }
    &:active {
      background: $active-color;
    }
  }
  &.disabled,
  &[disabled],
  .button-host[disabled] &,
  .button-host[loading] & {
    cursor: default;
    color: $txt-disabled-color;
    box-shadow: none;
  }
  .button-host[flat] &[disabled],
  .button-host.flat &.disabled {
    background: none;
  }
  .button-host:not([flat]) &[disabled],
  .button-host:not(.button-host[flat]) &.disabled,
  .button-host[disabled]:not([flat]) &,
  .button-host[loading]:not([flat]) & {
    background: $disabled-color;
  }
  .button-host[loading] & {
    .button-content {
      opacity: 0;
      transform: scale(0.8);
    }
  }

  // styles
  @include button-theme("accent", $accent-color);
  @include button-theme("danger", $danger-color);
  @include button-theme("success", $success-color);
  @include button-theme("warning", $warning-color);
  @include button-theme("light", $txt-secondary-color);
  @include button-theme("dark", $base-color);

  .button-host[justified] &,
  .button-host.justified & {
    .button-content {
      justify-content: space-between;
      ::ng-deep abrites-icon {
        margin: 0;
      }
    }
  }

  .button-host[wide] &,
  .button-host.wide & {
    min-width: 110px;
  }
  .button-host[wider] &,
  .button-host.wider & {
    min-width: 140px;
  }
  .button-host[small] &,
  .button-host.small & {
    font-size: 0.9em;
    .button-content {
      min-height: $button-height-small;
      padding-left: 10px;
      padding-right: 10px;
      ::v-deep(*) {
        margin-left: 5px;
        &:first-child {
          margin-left: 0;
        }
      }
      ::v-deep(.icon-host:not([small]):not([large])) {
        font-size: 1.3em;
      }
    }
  }
  .button-host[large] &,
  .button-host.large & {
    font-size: 1.1em;
    .button-content {
      min-height: $button-height-large;
      padding-left: $base-spacing;
      padding-right: $base-spacing;
      ::v-deep(.icon-host:not([small]):not([large])) {
        font-size: 1.85em;
      }
    }
  }
  .button-host[round] &,
  .button-host.round & {
    width: auto;
    .button-content {
      padding: 0 8px;
      min-width: $button-height;
      height: $button-height;
    }
  }
  .button-host[round][small] &,
  .button-host.round.small & {
    .button-content {
      padding: 0 6px;
      min-width: $button-height-small;
      height: $button-height-small;
    }
  }
  .button-host[round][large] &,
  .button-host.round.large & {
    .button-content {
      padding: 0 10px;
      min-width: $button-height-large;
      height: $button-height-large;
    }
  }
}
</style>

<style lang="scss">
@import "../../styles/core";

.buttons-group {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &.block {
    width: 100%;
  }
  .round {
    padding: 4px 5px;
    border-radius: 40px;
    @include children-spacing(5px);
    background: rgba(darken($base-color, 1%), 0.9);
  }
  .disabled {
    opacity: 0.5;
    pointer-events: none;
    box-shadow: none;
  }
}
</style>
