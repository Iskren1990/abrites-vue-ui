<script lang="ts" setup>
import { ref } from "vue";
import { Preview } from "./shared";
import * as Config from "../utils/app-config";
import { AbritesDrawer, useStorageState } from "@/entry.esm";

const htmlExample = `
    <AbritesDrawer :hidden="isHidden" @drawer-change="updateStorageState" ref="drawer">
      <div class="drawer-header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" alt="logo" width="100" />
      </div>

      <div class="drawer-content">
        <AbritesMenu :items="menuItem"></AbritesMenu>
      </div>

      <div class="drawer-footer">
        <AbritesButton class="block">Some button</AbritesButton>
      </div>
    </AbritesDrawer>

    <!-- controls -->
    <div class="buttons-group">
      <AbritesButton @trigger="drawer.hide({})">Hide</AbritesButton>
      <AbritesButton @trigger="drawer.toggle()">Toggle</AbritesButton>
      <AbritesButton @trigger="drawer.show({})">Show</AbritesButton>
    </div>
`;
const vueExample = `
    script() {
      const menuItem: Array<RouteRecordRaw> = [
        {
          path: "/",
          meta: {
            title: "Menu item 1",
               icon: "backup"
          },
        },
        {
          path: "/",
          meta: {
            title: "Menu item 2",
               icon: "account_balance"
          },
        },
        { /* separator */ },
        {
          path: "/",
          meta: {
            title: "Menu item 3",
               icon: "lock"
          },
        },
        {
          path: "/",
          meta: {
            title: "Menu item 4",
               icon: "mail"
          },
        },
        

      return { menuItem };
    }`;
const imports = [
  `import { ref } from "vue"`,
  `import { AbritesDrawer, useStorageState } from "@/entry.esm";`,
];

const setupFn = function script() {
  const drawer = ref<typeof AbritesDrawer>();
  const menuItem = [
    {
      path: "/",
      meta: {
        title: "Menu item 1",
        icon: "backup",
      },
    },
    {
      path: "/",
      meta: {
        title: "Menu item 2",
        icon: "account_balance",
      },
    },
    {
      /* separator */
    },
    {
      path: "/",
      meta: {
        title: "Menu item 3",
        icon: "lock",
      },
    },
    {
      path: "/",
      meta: {
        title: "Menu item 4",
        icon: "mail",
      },
    },
  ];

  const { isHidden, updateStorageState } = useStorageState("view");
  return { menuItem, drawer, isHidden, updateStorageState };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/drawer/Drawer.vue`"
      target="_blank"
      rel="noopener"
      >AbritesDrawer</a
    >
    <span>{{'<AbritesDrawer></AbritesDrawer>'}}</span>
  </h2>

  <p>
    Generic sidebar component. Usually used together with
    <code>
      <router-link class="menu-item-label" :to="'/menu'">
        {{'<AbritesMenu></AbritesMenu>'}}
      </router-link>
    </code>
    .
  </p>

  <p>
    <code>useStorageState</code> composable helper could be used as local
    storage state management.
  </p>

  <p>
    <code>
      const { isHidden, updateStorageState } = useStorageState("view");
    </code>
  </p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>animation?</strong> <code>number</code>
      <p>
        Interval in ms for the show/hide animation (default to
        <code>200</code>).
      </p>
    </li>
    <li>
      <strong>hidden?</strong> <code>boolen</code>
      <p>Hide the drawer.</p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>drawer-change</strong> <code>{{ "boolean" }}</code>
      <p>
        Fired when the drawer visibility changes. Receives the new state as an
        argument.
      </p>
    </li>
    <li>
      <strong>resize</strong> <code>void</code>
      <p>
        Resize event so that js plugins (eg.charts) could refresh their
        instances
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>You could make use of the following supporting container elements:</p>
  <ul>
    <li>
      <code>
        {{ `
        <div class="drawer-header">...</div>
        ` }}
      </code>
    </li>
    <li>
      <code>
        {{`
        <div class="drawer-content">...</div>
        `}}
      </code>
    </li>
    <li>
      <code>
        {{`
        <div class="drawer-footer">...</div>
        `}}
      </code>
    </li>
  </ul>
  <p>
    To set different custom drawer width just change the css width property, eg.
    <code>style="width: 500px"</code>
  </p>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview
    top
    title="Default"
    :htmlExample="htmlExample"
    :scriptExample="vueExample"
    :setupFn="setupFn"
    :imports="imports"
  ></Preview>
</template>
