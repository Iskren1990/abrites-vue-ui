<script lang="ts" setup>
import { Preview } from "./shared/index";
import * as Config from "../utils/app-config";
import MenuItemModel from "../../src/components/menu-item/MenuItemModel";

const setupFn = () => {
  const menuItems = [
    new MenuItemModel({
      label: "Menu Item 1",
      icon: "home",
      url: "/test",
      children: [
        new MenuItemModel({ label: "Menu Item 1-1", url: "/test" }),
        new MenuItemModel({ label: "Menu Item 1-2", url: "/test" }),
        new MenuItemModel({
          label: "Menu Item 1-3",
          url: "/test",
          children: [
            new MenuItemModel({ label: "Menu Item 1-1", url: "/test" }),
            new MenuItemModel({ label: "Menu Item 1-2", url: "/test" }),
            new MenuItemModel({
              label: "Menu Item 1-3",
              url: "/test",
              children: [
                new MenuItemModel({ label: "Menu Item 1-1", url: "/test" }),
                new MenuItemModel({ label: "Menu Item 1-2", url: "/test" }),
                new MenuItemModel({ label: "Menu Item 1-3", url: "/test" }),
              ],
            }),
          ],
        }),
      ],
    }),
    new MenuItemModel({ label: "Menu Item 2", icon: "mail" }),
    new MenuItemModel(/* separator */ {}),
    new MenuItemModel({ label: "Lorem ipsum", icon: "explore" }),
    new MenuItemModel({ label: "Without icon 1" }),
    new MenuItemModel({ label: "Without icon 2" }),
  ];

  return { menuItems };
};

const htmlDefaultExample = `
  <AbritesMenu :items="menuItems"></AbritesMenu>
`;

const htmlCompactExample = `
<AbritesMenu compact :items="menuItems"></AbritesMenu>
`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/menu/Menu.vue`"
      target="_blank"
      rel="noopener"
      >AbritesMenu</a
    >
    <span>&lt;abrites-menu&gt;&lt;/abrites-menu&gt;</span>
  </h2>

  <p>Simple tree menu list component.</p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>items</strong> <code>&lt;MenuItemModel&gt;[]</code>
      <p>
        <a
          :href="`${Config.componentsUrl}/lib/menu/MenuItemModel.vue`"
          target="_blank"
          rel="noopener"
          >MenuItemModel</a
        >
        instances list.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li><code>[compact]</code>, <code>.compact</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview
    title="Default"
    :htmlExample="htmlDefaultExample"
    :scriptExample="`${setupFn}`"
    :setupFn="setupFn"
  />

  <Preview
    title="Compact"
    :htmlExample="htmlCompactExample"
    :scriptExample="`${setupFn}`"
    :setupFn="setupFn"
  />
</template>
