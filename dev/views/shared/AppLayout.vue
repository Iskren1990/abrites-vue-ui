<template>
  <AbritesDrawer
    :hidden="isHidden"
    @drawer-change="updateStorageState"
    ref="drawer"
  >
    <div class="drawer-header">
      <AbritesSearch
        v-model:term="searchTerm"
        class="expanded"
        placeholder="Search..."
      ></AbritesSearch>
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
      <h1 class="app-title">{{ $route.meta.title }}</h1>
    </header>

    <div class="app-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { RouteRecordRaw } from "vue-router";
import { routes } from "../../router";
import { AbritesDrawer, useStorageState } from "@/entry.esm";

const { isHidden, updateStorageState } = useStorageState("navbar");
const searchTerm = ref("");
const drawer = ref();
const routeItems = ref<RouteRecordRaw[]>(routes);

watch(
  searchTerm,
  () =>
    (routeItems.value = routes.filter((x) =>
      (x.meta.title as string)
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase())
    ))
);
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
