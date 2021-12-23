<template>
  <AbritesDrawer ref="drawer">
    <div class="drawer-header">
      <AbritesSearch class="expanded" placeholder="Search..."></AbritesSearch>
    </div>
    <div class="drawer-content">
      <AbritesMenu :items="routeItems" />
    </div>
  </AbritesDrawer>
  <div class="app-body">
    <header class="app-header">
      <AbritesButton flat round class="menu-toggle" @trigger="drawer.toggle()">
        <AbritesIcon icon="menu"></AbritesIcon>
      </AbritesButton>
      <h1 class="app-title">{{ pageTitle }}</h1>
    </header>

    <div class="app-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { routes } from "../../router";

export default defineComponent({
  props: {
    title: {
      type: String,
      // required: true,
    },
  },
  setup() {
    const routeItems = reactive<RouteRecordRaw[]>(routes);
    const drawer = ref();
    const pageTitle = "Hardcoded Title";

    return { pageTitle, drawer, routeItems };
  },
});
</script>

<style lang="scss">
@use "sass:math";
@import "../../assets/global";

#app {
  @include normalize-host();
  display: flex !important;
  width: 100%;
  min-height: 100vh;
}

.app-sidebar {
  flex-grow: 0;
  flex-shrink: 0;
}

.app-body {
  box-sizing: border-box;
  flex-grow: 1;
  padding: (math.div($base-spacing, 2)) $base-spacing;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.app-header {
  @include children-spacing();
  display: flex;
  width: 100%;
  align-items: center;
  .menu-toggle {
    margin-left: -10px;
  }
}
</style>
