<script lang="ts" setup>
import {
  defineProps,
  withDefaults,
  defineEmits,
  defineExpose,
  ref,
  computed,
  watch,
} from "vue";

let animation = new Animation();

interface IDrawerProps {
  animationSpeed?: number;
  hidden: boolean;
}

const props = withDefaults(defineProps<IDrawerProps>(), {
  animationSpeed: 200,
  hidden: true,
});

const emit = defineEmits<{
  (event: "resize"): void;
  (event: "drawer-change", value: boolean): void;
}>();

const hiddenRef = ref(props.hidden);
const isHidden = computed({
  get: () => hiddenRef.value,
  set: (val: boolean) => {
    hiddenRef.value = val;
  },
});

const drawerHost = ref();
const drawerWrapper = ref();

const host = computed(() => drawerHost.value as HTMLElement);
const wrapper = computed(() => drawerWrapper.value as HTMLElement);

watch(isHidden, () => {
  refreshGlobalIndicator();
  if (isHidden.value == true) {
    hide({ withAnimation: false });
  } else {
    show({ withAnimation: false });
  }
});

function refreshGlobalIndicator() {
  if (isHidden.value) {
    document.body.classList.remove("drawer-active");
  } else {
    document.body.classList.add("drawer-active");
  }
}

function toggle({ withAnimation = true } = {}) {
  isHidden.value ? show({ withAnimation }) : hide({ withAnimation });
}

function show({ withAnimation = true }) {
  if (!isHidden.value) {
    return;
  }

  isHidden.value = false;

  if (withAnimation) {
    _animate();
    return;
  }
  emit("drawer-change", isHidden.value);
}

function hide({ withAnimation = true }) {
  if (isHidden.value) {
    return;
  }
  isHidden.value = true;

  if (withAnimation) {
    _animate();
    return;
  }

  emit("drawer-change", isHidden.value);
}

function _animate() {
  host.value.setAttribute("animating", "true");

  if (animation != null && animation.playState != "idle") {
    animation.reverse();
  } else {
    let cssWidth = window
      .getComputedStyle(wrapper.value)
      .getPropertyValue("width");

    cssWidth = cssWidth.length > 3 ? cssWidth : "250px";

    // prevents content wrapping
    wrapper.value.style.width = cssWidth;
    animation.cancel();
    animation = host.value.animate(
      [
        { width: isHidden.value ? cssWidth : "0" },
        { width: isHidden.value ? "0" : cssWidth },
      ],
      {
        duration: props.animationSpeed,
        easing: "ease",
      }
    );

    animation.onfinish = () => {
      host.value.removeAttribute("animating");
      // trigger resize event so that js plugins (eg.charts) could refresh their instances
      new Promise(() => emit("resize"));
      emit("resize");

      emit("drawer-change", isHidden.value);
    };
  }
}

defineExpose({ hide, show, toggle });
</script>

<template>
  <div class="app-sidebar" :hidden="isHidden ? true : null" ref="drawerHost">
    <div class="drawer-wrapper" ref="drawerWrapper">
      <slot></slot>
    </div>
    <div class="drawer-overlay" @click="hide({})"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.app-sidebar {
  @include normalize-host();
  display: block;
  width: $drawer-width;
  height: 100vh;
  color: $txt-secondary-color;
  &.app-sidebar[hidden]:not([animating="true"]) {
    display: none;
  }
  &[animating="true"] {
    overflow: hidden;
    // prevent animation flickering
    &:not([hidden]) {
      width: 0;
    }
  }

  ::v-deep() {
    .drawer-header,
    .drawer-content,
    .drawer-footer {
      width: 100%;
    }
    .drawer-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      background: $panel-color;
    }

    .drawer-header {
      align-self: flex-start;
      text-align: center;
      padding: $base-spacing (math.div($base-spacing, 2));
      text-align: center;
      a,
      img,
      svg,
      .logo {
        display: inline-block;
        vertical-align: top;
        text-decoration: none;
        border: 0;
      }
      .logo {
        width: auto;
        height: 60px;
      }
    }

    .drawer-content {
      flex-grow: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .drawer-footer {
      align-self: flex-end;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      color: $txt-secondary-color;
      padding: math.div($base-spacing, 2);
      color: inherit;
      border-top: 1px solid $border-color;
      .user-info {
        flex-grow: 1;
        .txt {
          display: block;
          margin: 5px 0;
          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
        .txt-primary {
          color: $accent-color;
        }
        .txt-secondary {
          font-size: 0.9em;
        }
      }
      .dropdown-handle {
        position: relative;
        flex-shrink: 1;
      }
    }
  }

  .drawer-overlay {
    outline: 0;
    position: fixed;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
    background: $overlay-color;
  }

  @media screen and (max-width: $drawer-breakpoint) {
    position: fixed !important;
    z-index: 999 !important;
    left: 0;
    top: 0;
    bottom: 0;
    .drawer-overlay {
      display: block;
    }
    .drawer-wrapper {
      z-index: 1;
      position: relative;
    }
  }
}
</style>
