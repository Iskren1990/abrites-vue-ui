<template>
  <div class="app-sidebar" ref="drawer-host">
    <div class="drawer-wrapper" ref="drawer-wrapper">
      <slot></slot>
    </div>
    <div class="drawer-overlay" @click="hide({})"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
let animation = new Animation();
let isAnimating = ref(null as boolean | null);

export default defineComponent({
  name: "AbritesDrawer",
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      animationSpeed: 200,
      isHidden: true,
    };
  },
  computed: {
    storageKey: function () {
      return `${this.name}_drawer`;
    },
    host: function () {
      return this.$refs[`drawer-host`] as HTMLElement;
    },
    wrapper: function () {
      return this.$refs[`drawer-wrapper`] as HTMLElement;
    },
  },
  watch: {
    isHidden: function () {
      this.setHiddenAttribute();
      this.refreshGlobalIndicator();
    },
    isAnimating: function () {
      if (isAnimating.value) {
        this.$el.parentNode.setAttribute("animating", true);
      } else {
        this.$el.parentNode.removeAttribute("animating", true);
      }
      this.refreshGlobalIndicator();
    },
  },
  mounted: function (): void {
    this.setHiddenAttribute();
    this.setStateFromStorage();
    this.refreshGlobalIndicator();
  },
  methods: {
    setHiddenAttribute(): void {
      if (this.isHidden) {
        this.host.setAttribute("hidden", "");
      } else {
        this.host.removeAttribute("hidden");
      }
    },
    setStateFromStorage(): void {
      if (window.localStorage.getItem(this.storageKey) == null) {
        return; // no stored state
      }
      if (window.localStorage[this.storageKey] == "hidden") {
        this.hide({ withAnimation: false });
      } else {
        this.show({ withAnimation: false });
      }
    },
    refreshGlobalIndicator(): void {
      if (this.isHidden) {
        document.body.classList.remove("drawer-active");
      } else {
        document.body.classList.add("drawer-active");
      }
    },
    _saveCurrentState(): void {
      window.localStorage[this.storageKey] = this.isHidden
        ? "hidden"
        : "visible";
    },
    toggle({ withAnimation = true } = {}): void {
      this.isHidden
        ? this.show({ withAnimation })
        : this.hide({ withAnimation });
    },
    show({ withAnimation = true }): void {
      if (!this.isHidden) {
        return;
      }

      this.isHidden = false;

      if (withAnimation) {
        this._animate();
      }

      this._saveCurrentState();
    },
    hide({ withAnimation = true }): void {
      if (this.isHidden) {
        return;
      }
      this.isHidden = true;

      if (withAnimation) {
        this._animate();
      }
      this._saveCurrentState();
    },
    _animate(): void {
      this.host.setAttribute("animating", "true");

      if (animation != null && animation.playState != "idle") {
        animation.reverse();
      } else {
        let cssWidth = window
          .getComputedStyle(this.wrapper)
          .getPropertyValue("width");

        cssWidth = cssWidth.length > 3 ? cssWidth : "250px";

        // prevents content wrapping
        this.wrapper.style.width = cssWidth;
        animation.cancel();
        animation = this.host.animate(
          [
            { width: this.isHidden ? cssWidth : "0" },
            { width: this.isHidden ? "0" : cssWidth },
          ],
          {
            duration: this.animationSpeed,
            easing: "ease",
          }
        );

        animation.onfinish = () => {
          this.host.removeAttribute("animating");
          // trigger resize event so that js plugins (eg.charts) could refresh their instances
          new Promise(() => this.$emit("resize"));
          this.$emit("resize");
          // emit Vue event
        };
      }
    },
  },
});
</script>

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
