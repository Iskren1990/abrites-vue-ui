<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import { AbritesMenuItemModel } from "../index";

export default defineComponent({
  name: "AbritesMenu",
  props: {
    items: {
      type: Array as PropType<Array<RouteRecordRaw>>,
    },
  },
  setup(props) {
    const itemToMenuItem = (item: RouteRecordRaw) => {
      return new AbritesMenuItemModel({
        label: item.meta?.title as string,
        url: item.path,
        icon: item.meta?.icon as string,
      });
    };

    return { mappedItems: props.items?.map(itemToMenuItem) };
  },
});
</script>

<template>
  <div class="menu-wrapper">
    <ul>
      <li
        v-for="(item, index) of mappedItems"
        :key="index"
        class="menu-item"
        :class="[
          item.isSeparator && 'separator',
          item.hasChildren && 'has-submenu',
        ]"
      >
        <template v-if="!item.isSeparator">
          <router-link
            v-if="item.isLink"
            class="menu-item-label"
            :to="item.url"
          >
            <AbritesMenuItem :item="item" />
          </router-link>

          <div v-if="!item.isLink" class="menu-item-label host">
            <AbritesMenuItem :item="item" />
          </div>

          <Menu
            v-if="item.hasChildren"
            class="sub-menu"
            :items="item.children"
          ></Menu>
        </template>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

%block {
  display: block;
  width: 100%;
}

.menu-wrapper {
  $icon-width: 24px;
  @extend %block;
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }

  ul {
    @extend %block;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid $border-color;
    li {
      @extend %block;
      padding: 0;
    }
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  .menu-item-label {
    position: relative;
    display: flex;
    min-height: 48px;
    align-items: center;
    text-decoration: none;
    color: $txt-secondary-color;
    font-weight: $txt-bold;
    cursor: pointer;
    outline: 0;
    margin: 0;
    border: 0;
    user-select: none;
    padding: 0 (math.div($base-spacing, 2));
    transition: color 0.1s, background 0.1s;
    ::v-deep(.icon),
    & > ::v-deep(.icon-host) {
      width: $icon-width;
      text-align: center;
      margin-right: (math.div($base-spacing, 2));
      flex-shrink: 0;
    }
    .sub-menu-button {
      flex-shrink: 0;
    }
    &:focus {
      background: $hover-color;
    }
    &:hover {
      color: contrast-color($panel-color);
      background: $hover-color;
    }
    &.router-link-active {
      color: contrast-color($panel-color);
      background: $active-color;
    }
  }

  .menu-item {
    &.router-link-active > .menu-item-label {
      color: contrast-color($accent-color);
      background: $accent-color;
    }
    &.separator:before {
      @extend %block;
      content: "";
      height: 1px;
      background: $border-color;
    }
  }

  // sub menu
  ul ul {
    padding: 0 0 0 ($icon-width + 5);
    display: none;
    .menu-item-label {
      padding: 5px 10px;
      margin: 0;
      min-height: 0;
      background: none;
    }
    .menu-item {
      margin: (math.div($base-spacing, 2)) 0;
      &.router-link-active > .menu-item-label {
        color: $accent-color;
        background: none;
      }
    }
  }
  .menu-item.show-submenu {
    & > ul,
    & > .sub-menu > ul {
      display: block;
    }
    & > .menu-item-label :deep(.submenu-toggle) i {
      transform: rotate(180deg);
    }
    &:not(.router-link-active) > .menu-item-label {
      background: $border-color;
    }
  }

  &[compact],
  &.compact {
    ul li {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>
