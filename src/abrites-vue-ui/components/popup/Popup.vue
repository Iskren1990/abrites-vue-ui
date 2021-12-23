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

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineComponent, onMounted, onUnmounted, ref } from "vue";
export default defineComponent({
  name: "AbritesPopup",
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    popupClass: {
      type: String,
    },
    preventOverlayClose: {
      type: Boolean,
      default: false,
    },
    preventEscClose: {
      type: Boolean,
      default: false,
    },
    noCloseButton: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const popup = ref<HTMLElement | null>(null);
    const holder = ref<HTMLElement | null>(null);
    const closeTimer = ref<number>();
    const isClosing = ref<boolean>(false);
    const outsideClickStarted = ref<boolean>(false);
    const mouseDownListenerRef = ref();
    const mouseUpListenerRef = ref();
    const keyDownListenerRef = ref();
    const isOpen = ref(props.opened);
    const returnProps = {
      isOpen,
      holder,
      popup,
      closeTimer,
      isClosing,
      mouseDownListenerRef,
      outsideClickStarted,
      mouseUpListenerRef,
      keyDownListenerRef,
    };
    const close = ctxWith({ ...returnProps, emit, isOpen });

    keyDownListenerRef.value = setHandlerCtx(keydownListenerFn, {
      ...returnProps,
      close,
    });
    mouseUpListenerRef.value = setHandlerCtx(overlayEventMouseUpListener, {
      ...returnProps,
      close,
    });
    mouseDownListenerRef.value = setHandlerCtx(
      overlayMouseDownListenerFn,
      returnProps
    );

    onMounted(() => {
      holder.value = setHolder(holder.value);
      document.body.appendChild(holder.value);
      holder.value.appendChild(popup.value as HTMLElement);
    });

    onUnmounted(() => {
      document.removeEventListener("mousedown", mouseDownListenerRef.value);
      document.removeEventListener("keydown", keyDownListenerRef.value);
      document.removeEventListener("mouseup", mouseUpListenerRef.value);
      clearTimeout(closeTimer.value);
    });

    return {
      ...returnProps,
      mouseDownListenerRef,
      keyDownListenerRef,
      mouseUpListenerRef,
      close,
    };
  },
  methods: {
    open(): void {
      if (this.isOpen) return;
      this.$emit("beforeOpenCtrl", null);
      clearTimeout(this.closeTimer);
      this.isOpen = true;
      document.body.classList.add("popup-active");
      this.$emit("openCtrl", null);
      this.$emit("deferredCtrl", true);
      this.initKeydownListener();
      this.initOutsideClickListeners();
    },
    initOutsideClickListeners() {
      // detect whether the initial click was outside of the popup content
      document.removeEventListener("mousedown", this.mouseDownListenerRef);
      document.addEventListener("mousedown", this.mouseDownListenerRef);
    },
    initKeydownListener() {
      document.removeEventListener("keydown", this.keyDownListenerRef);
      document.addEventListener("keydown", this.keyDownListenerRef);
    },
  },
});

function setHandlerCtx(
  callback: (e: KeyboardEvent | MouseEvent, ctx: any) => void,
  ctx: any
) {
  const handler = (e: KeyboardEvent | MouseEvent) => callback(e, ctx);
  return handler;
}

function keydownListenerFn(e: KeyboardEvent | MouseEvent, ctx: any) {
  // esc key
  if (
    !ctx.preventEscClose &&
    ctx.isOpen.value &&
    (e as KeyboardEvent).key == "Escape" &&
    e.target?.constructor !== HTMLInputElement &&
    e.target?.constructor !== HTMLSelectElement
  ) {
    ctx.close();
  }
}

function ctxWith(ctx: any) {
  const close = ({ delay = 200 } = {}) => {
    if (!ctx.isOpen.value) return;
    ctx.emit("beforeCloseCtrl", null);
    document.removeEventListener("mousedown", ctx.mouseDownListenerRef.value);
    document.removeEventListener("keydown", ctx.keyDownListenerRef.value);
    document.removeEventListener("mouseup", ctx.mouseUpListenerRef.value);
    ctx.isClosing.value = true;
    clearTimeout(ctx.closeTimer.value);
    ctx.closeTimer = setTimeout(() => {
      ctx.isClosing.value = false;
      ctx.isOpen.value = false;
      document.body.classList.remove("popup-active");
      ctx.emit("closeCtrl", null);
      ctx.emit("deferredCtrl", false);
    }, delay);
  };
  return close;
}

function overlayMouseDownListenerFn(e: Event, ctx: any) {
  if (
    ctx.isOpen.value &&
    !ctx.preventOverlayClose &&
    e.target == ctx.popup.value
  ) {
    ctx.outsideClickStarted.value = true;
  }
  // close the popup if the initial and end click are outside of the popup content
  document.removeEventListener("mouseup", ctx.mouseUpListenerRef.value);
  document.addEventListener("mouseup", ctx.mouseUpListenerRef.value);
}

function overlayEventMouseUpListener(e: Event, ctx: any) {
  if (
    ctx.outsideClickStarted.value &&
    ctx.isOpen.value &&
    !ctx.preventOverlayClose &&
    e.target == ctx.popup.value
  ) {
    ctx.close();
  }

  if (ctx.outsideClickStarted.value) {
    ctx.outsideClickStarted.value = false;
  }
}

function setHolder(holder: HTMLElement | null): HTMLElement {
  const d = document;
  holder =
    holder || (d.body.querySelector(".abrites-popups-holder") as HTMLElement);

  if (holder == null) {
    holder = d.createElement("div");
    holder.classList.add("abrites-popups-holder");
  }
  return holder;
}
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
