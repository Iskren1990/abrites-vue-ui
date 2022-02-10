<template>
  <div
    ref="popup"
    tabindex="0"
    class="popup-container"
    v-bind="{ active: isOpen, closing: isClosing }"
  >
    <div v-if="isOpen" class="popup" :class="popupClass">
      <AbritesButton
        v-if="!noCloseButton"
        round
        flat
        light
        class="popup-close-button"
        @trigger="close()"
      >
        <AbritesIcon icon="close"></AbritesIcon>
      </AbritesButton>

      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  defineEmits,
  defineProps,
  defineExpose,
  withDefaults,
  onMounted,
  onUnmounted,
  ref,
} from "vue";

interface IPopupProps {
  opened?: boolean;
  popupClass?: string;
  preventOverlayClose?: boolean;
  preventEscClose?: boolean;
  noCloseButton?: boolean;
}

const props = withDefaults(defineProps<IPopupProps>(), {
  opened: false,
  preventOverlayClose: false,
  preventEscClose: false,
  noCloseButton: false,
});
const emit = defineEmits<{
  (event: "beforeOpenCtrl", value): void;
  (event: "openCtrl", value): void;
  (event: "deferredCtrl", value: boolean): void;
  (event: "beforeCloseCtrl", value): void;
  (event: "closeCtrl", value): void;
  (event: "beforeCloseCtrl", value): void;
}>();

const popup = ref<HTMLElement | null>(null);
const holder = ref<HTMLElement | null>(null);
const closeTimer = ref<number>();
const isClosing = ref<boolean>(false);
const outsideClickStarted = ref<boolean>(false);
const isOpen = ref(props.opened);

const keyDownListenerRef = (e: KeyboardEvent | MouseEvent) => {
  // esc key
  if (
    !props.preventEscClose &&
    isOpen.value &&
    (e as KeyboardEvent).key == "Escape" &&
    e.target?.constructor !== HTMLInputElement &&
    e.target?.constructor !== HTMLSelectElement
  ) {
    close();
  }
};
const mouseUpListenerRef = (e: Event) => {
  if (
    outsideClickStarted.value &&
    isOpen.value &&
    !props.preventOverlayClose &&
    e.target == popup.value
  ) {
    close();
  }

  if (outsideClickStarted.value) {
    outsideClickStarted.value = false;
  }
};
const mouseDownListenerRef = (e: Event) => {
  if (isOpen.value && !props.preventOverlayClose && e.target == popup.value) {
    outsideClickStarted.value = true;
  }
  // close the popup if the initial and end click are outside of the popup content
  document.removeEventListener("mouseup", mouseUpListenerRef);
  document.addEventListener("mouseup", mouseUpListenerRef);
};

onMounted(() => {
  holder.value = setHolder(holder.value);
  document.body.appendChild(holder.value);
  holder.value.appendChild(popup.value as HTMLElement);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", mouseDownListenerRef);
  document.removeEventListener("keydown", keyDownListenerRef);
  document.removeEventListener("mouseup", mouseUpListenerRef);
  window.clearTimeout(closeTimer.value);
});

function open() {
  if (isOpen.value) return;
  emit("beforeOpenCtrl", null);
  window.clearTimeout(closeTimer.value);
  isOpen.value = true;
  document.body.classList.add("popup-active");
  emit("openCtrl", null);
  emit("deferredCtrl", true);
  initKeydownListener();
  initOutsideClickListeners();
}

function close({ delay = 200 } = {}) {
  if (!isOpen.value) return;
  emit("beforeCloseCtrl", null);
  document.removeEventListener("mousedown", mouseDownListenerRef);
  document.removeEventListener("keydown", keyDownListenerRef);
  document.removeEventListener("mouseup", mouseUpListenerRef);
  isClosing.value = true;
  window.clearTimeout(closeTimer.value);
  closeTimer.value = window.setTimeout(() => {
    isClosing.value = false;
    isOpen.value = false;
    document.body.classList.remove("popup-active");
    emit("closeCtrl", null);
    emit("deferredCtrl", false);
  }, delay);
}

function initOutsideClickListeners() {
  // detect whether the initial click was outside of the popup content
  document.removeEventListener("mousedown", mouseDownListenerRef);
  document.addEventListener("mousedown", mouseDownListenerRef);
}
function initKeydownListener() {
  document.removeEventListener("keydown", keyDownListenerRef);
  document.addEventListener("keydown", keyDownListenerRef);
}

function setHolder(holder: HTMLElement | null) {
  const d = document;
  holder =
    holder || (d.body.querySelector(".abrites-popups-holder") as HTMLElement);

  if (holder == null) {
    holder = d.createElement("div");
    holder.classList.add("abrites-popups-holder");
  }
  return holder;
}

defineExpose({ open, close });
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

$popup-spacing: $base-spacing !default;
$popup-animation-speed: 0.25s !default;
$popup-base-width: 550px !default;
$popup-small-width: 350px !default;
$popup-large-width: 850px !default;

@mixin full-width-popup() {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  margin: 0;
  border-radius: 0;
  ::v-deep() {
    & > form,
    & > div:not(.popup-header):not(.popup-footer):not(.popup-content) {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      width: 100%;
      min-height: 100vh;
    }
    hr {
      margin: (math.div($base-spacing, 2)) 0;
    }
    .popup-header {
      margin-bottom: math.div($base-spacing, 2);
    }
    .popup-footer {
      margin-top: math.div($base-spacing, 2);
    }
    .popup-content {
      flex-grow: 1;
      margin: (math.div($base-spacing, 2)) 0;
    }
  }
}

.popup {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  z-index: 1;
  padding: 0;
  width: $popup-base-width;
  min-height: 100px;
  max-width: 100%;
  margin: $popup-spacing 0 ($popup-spacing * 2);
  font-size: 1em;
  text-align: left;
  color: $txt-secondary-color;
  border-radius: $border-radius;
  background: $panel-color;
  @include shadowize;

  // close handle
  .popup-close-button {
    position: absolute;
    z-index: 1;
    top: math.div($popup-spacing, 2);
    right: math.div($popup-spacing, 2);
  }

  ::v-deep() {
    .popup-header,
    .popup-footer,
    .popup-content {
      width: 100%;
      padding: 0 $popup-spacing;
      margin: $popup-spacing 0;
      border-radius: inherit;
    }
    .popup-header,
    .popup-footer {
      @include children-spacing();
      display: flex;
      width: 100%;
      align-items: center;
      .title {
        margin-top: 0;
        margin-bottom: 0;
      }
      .ctrls {
        @include children-spacing(10px);
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
      }
      .flex-fill {
        flex-grow: 1;
      }
      .no-shrink {
        white-space: nowrap;
        flex-shrink: 0;
      }
    }

    // header
    .popup-header {
      @include h3(false);
      flex-wrap: wrap;
      color: $txt-secondary-color;
    }
    .popup-close-button ~ .popup-header {
      padding-right: $popup-spacing * 2;
    }

    // content
    .popup-content {
      display: block;
      .scroll-content {
        max-height: 450px;
        overflow: auto;
        width: auto;
        padding-right: $base-spacing;
        margin-right: -$base-spacing;
      }
    }

    // footer
    .popup-footer {
      justify-content: flex-end;
      &.dense {
        padding-left: (math.div($popup-spacing, 2));
        padding-right: (math.div($popup-spacing, 2));
        margin-bottom: (math.div($popup-spacing, 2));
      }
      &.no-gutter {
        padding-left: 0;
        padding-right: 0;
        margin-bottom: 0;
        border-top: 1px solid $border-color;
        > * {
          flex: 1;
          margin: 0;
          &:first-child,
          &:first-child .button {
            border-bottom-left-radius: inherit;
          }
          &:last-child,
          &:last-child .button {
            border-bottom-right-radius: inherit;
          }
        }
      }
    }
    .popup-content .popup-footer {
      padding-left: 0;
      padding-right: 0;
    }
  }

  // layouts
  &.small {
    width: $popup-small-width;
  }
  &.large {
    width: $popup-large-width;
  }

  // responsive
  @media screen and (max-width: $popup-base-width) {
    &:not(.small):not(.large) {
      @include full-width-popup();
    }
  }
  @media screen and (max-width: $popup-small-width) {
    &.small {
      @include full-width-popup();
    }
  }
  @media screen and (max-width: $popup-large-width) {
    &.large {
      @include full-width-popup();
    }
  }
}

.popup-container {
  @include normalize-host();
  display: none;
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  background: $overlay-color;

  // vertical align helper
  &:before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 100%;
  }

  // active state
  &[active="true"],
  &.active {
    display: block;
    animation: popup-overlay-show $popup-animation-speed;
    .popup {
      animation: popup-show $popup-animation-speed;
    }
  }
  &.closing {
    animation: popup-overlay-hide $popup-animation-speed forwards;
    .popup {
      animation: popup-hide $popup-animation-speed forwards;
    }
  }
}

@keyframes popup-overlay-show {
  0% {
    background: transparent;
  }
  100% {
    background: $overlay-color;
  }
}

@keyframes popup-overlay-hide {
  0% {
    background: $overlay-color;
  }
  100% {
    background: transparent;
  }
}

@keyframes popup-show {
  0% {
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, -15px, 0);
  }
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0px, 0);
  }
}

@keyframes popup-hide {
  0% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0px, 0);
  }
  100% {
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, 15px, 0);
  }
}
</style>
