<script lang="ts" setup>
import {
  defineProps,
  toRefs,
  unref,
  watch,
  Teleport as teleport_,
  TeleportProps,
  VNodeProps,
} from "vue";
import {
  useSnackbarMessageQueue,
  SnackbarErrorMessage,
  SnackbarInfoMessage,
  SnackbarMessageModelProps,
  SnackbarSuccessMessage,
  SnackbarWarningMessage,
  SnackbarMessageTypeEnum,
} from "../../composables/useSnackbarMessageQueue";

const { messages, addMessage, removeMessage } = useSnackbarMessageQueue();
const props = defineProps<{
  error?: SnackbarMessageModelProps;
  info?: SnackbarMessageModelProps;
  warning?: SnackbarMessageModelProps;
  success?: SnackbarMessageModelProps;
  teleportTo?: string;
}>();
const { error, success, info, warning } = toRefs(props);

watch(
  () => info?.value,
  () => info?.value && addMessage(new SnackbarInfoMessage(unref(info.value)))
);
watch(
  () => success?.value,
  () => {
    success?.value &&
      addMessage(new SnackbarSuccessMessage(unref(success.value)));
  }
);
watch(
  () => warning?.value,
  () =>
    warning?.value &&
    addMessage(new SnackbarWarningMessage(unref(warning.value)))
);
watch(
  () => error?.value,
  () => error?.value && addMessage(new SnackbarErrorMessage(unref(error.value)))
);

const Teleport = teleport_ as {
  new (): {
    $props: VNodeProps & TeleportProps;
  };
};
</script>

<template>
  <component :is="Teleport" :to="teleportTo || 'body'">
    <div attrs class="snackbar-host" v-bind="$attrs">
      <div
        v-for="(message, index) of messages"
        :key="index"
        class="snackbar"
        :class="{
          closing: message.isRemoving,
          info: message.type == SnackbarMessageTypeEnum.info,
          danger: message.type == SnackbarMessageTypeEnum.error,
          warning: message.type == SnackbarMessageTypeEnum.warning,
          success: message.type == SnackbarMessageTypeEnum.success,
        }"
      >
        <div class="snackbar-txt">
          {{ message.text }}
        </div>

        <AbritesButton
          v-if="message.action != undefined"
          flat
          class="snackbar-action"
          :class="{
            light: message.type == SnackbarMessageTypeEnum.info,
            danger: message.type == SnackbarMessageTypeEnum.error,
            warning: message.type == SnackbarMessageTypeEnum.warning,
            success: message.type == SnackbarMessageTypeEnum.success,
          }"
          @trigger="message.action?.callback(message)"
        >
          {{ message.action.label }}
        </AbritesButton>

        <AbritesButton
          class="flat round small light faded"
          @trigger="removeMessage(message.id)"
        >
          <AbritesIcon icon="close"></AbritesIcon>
        </AbritesButton>
      </div>
    </div>
  </component>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

$snackbar-width: 420px !default;

@mixin snackbar-theme($name, $color) {
  &.#{$name} {
    &:before {
      background: rgba($color, 0.05);
    }
    .snackbar-txt {
      color: $color;
    }
  }
}

.snackbar-host {
  @include normalize-host();
  position: fixed;
  display: block;
  z-index: 9999;
  font-size: 1rem;
  width: $snackbar-width;
  margin: 0;

  // default position
  // &[bottom-left], &.bottom-left
  left: $base-spacing;
  bottom: (math.div($base-spacing, 2));

  &[bottom],
  &.bottom,
  &[bottom-center],
  &.bottom-center {
    left: 50%;
    margin-left: -(math.div($snackbar-width, 2)) !important;
  }
  &[bottom-right],
  &.bottom-right {
    left: auto;
    right: $base-spacing;
  }
  &[top],
  &.top,
  &[top-center],
  &.top-center {
    top: (math.div($base-spacing, 2));
    bottom: auto;
    left: 50%;
    margin-left: -(math.div($snackbar-width, 2)) !important;
  }
  &[top-left],
  &.top-left {
    top: (math.div($base-spacing, 2));
    bottom: auto;
  }
  &[top-right],
  &.top-right {
    top: (math.div($base-spacing, 2));
    bottom: auto;
    left: auto;
    right: $base-spacing;
  }
}

.snackbar {
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 50px;
  padding: 10px 12px;
  line-height: 1.6rem;
  font-weight: $txt-bold;
  margin: (math.div($base-spacing, 2)) 0;
  border-radius: $border-radius;
  background: $panel-color;
  animation: snackbar-show 0.4s;
  @include shadowize-floated();
  &:before {
    // transparent background layer
    content: "";
    display: block;
    border-radius: inherit;
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: $panel-color;
  }
  & > * {
    position: relative;
    z-index: 1;
  }
  .snackbar-txt {
    flex-grow: 1;
    color: $txt-secondary-color;
  }
  .snackbar-action {
    flex-shrink: 0;
    margin: -5px 0 -5px 5px;
    white-space: nowrap !important;
  }

  // themes
  @include snackbar-theme("danger", $danger-color);
  @include snackbar-theme("success", $success-color);
  @include snackbar-theme("warning", $warning-color);

  // states
  &.closing {
    pointer-events: none;
    animation: snackbar-hide 0.3s forwards;
  }
}

@keyframes snackbar-show {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes snackbar-hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
