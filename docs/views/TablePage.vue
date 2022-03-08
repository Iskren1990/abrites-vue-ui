<script lang="ts" setup>
import { ITableAction } from "../../src/components/table";
import { ITableColumn } from "../../src/components/table";
import { ISortData } from "../../src/components/table";
import * as Config from "../utils/app-config";
import { Preview } from "./shared";

const htmlSimpleExample = `
  <AbritesTable 
    :items="items" 
    :columns="columns" 
  />
`;

const htmlStripedExample = `
  <AbritesTable 
    striped 
    :items="items" 
    :columns="columns"
  />

  <AbritesTable 
    striped-light 
    :items="items" 
    :columns="columns"
  />
`;

const htmlLoadingExample = `
  <AbritesTable 
    loading 
    :items="items" 
    :columns="columns"
  />
`;

const htmlActionsExample = `
  <AbritesTable
    :items="items"
    :columns="columns"
    :actions="actions"
  />
`;

const htmlCustomColumnsExample = `
  <AbritesTable 
    :items="items" 
    :columns="customColumns"
  />
`;

const setup = () => {
  const items: Array<Record<never, never>> = [
    { code: "RC1", name: "Item 1", description: "Lorem ipsum..." },
    { code: "RC2", name: "Item 2", description: "Lorem ipsum..." },
    { code: "RC3", name: "Item 3", description: "Lorem ipsum..." },
  ];

  const columns: ITableColumn[] = [
    { key: "code", header: "ID", cssClass: "min-width" },
    { key: "name" },
    { key: "description", sortable: false },
  ];

  const customColumns: ITableColumn[] = [
    { key: "code", header: "ID", cssClass: "min-width" },
    { key: "name" },
    {
      key: "description",
      sortable: false,
      content: {
        props: ["item"],
        template: `<p>Custom column: {{ item }}</p> <AbritesButton> Button </AbritesButton>`,
      },
    },
  ];

  const actions: ITableAction[] = [
    {
      label: "Text button",
      trigger: (item) => {
        console.log("Edit called...");
      },
    },
    {
      label: "Icon button",
      cssClass: "accent block",
      icon: "delete",
      trigger: (item) => {
        console.log("Delete called...");
      },
    },
  ];

  const sort = (sort: ISortData) => {
    console.log(sort);
  };
  return { items, columns, customColumns, actions, sort };
};

const imports = [
  "import { ITableAction } from '@/components/table';",
  "import { ITableColumn } from '@/components/table';",
  "import { ISortData } from '@/components/table';",
];
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/table/Table.vue`"
      target="_blank"
      rel="noopener"
      >AbritesTable</a
    >
    <span>&lt;AbritesTable&gt;&lt;/AbritesTable&gt;</span>
  </h2>

  <h3 class="section-title" id="inputs">Inputs <code>ITableProps</code></h3>
  <ul>
    <li>
      <strong>items</strong>
      <code>Array&lt;Record&lt;never, never&gt;&gt;</code>
      <p>
        Table items to render, where each first level child is a separate row.
      </p>
    </li>
    <li>
      <strong>columns?</strong> <code>ITableColumn[]</code>
      <p>
        List of column definitions. Check
        <a
          :href="`${Config.componentsUrl}/components/table/ITableColumn.ts`"
          target="_blank"
          rel="noopener"
          >ITableColumn</a
        >
        for all supported options.
        <AbritesAlert accent :style="'margin: 0'">
          If Column.content is passed as prop you must adhere to:
          <a
            href="https://vuejs.org/guide/scaling-up/tooling.html#project-scaffolding"
            >In-Browser Template Compilation</a
          >
        </AbritesAlert>
      </p>
    </li>
    <li>
      <strong>actions?</strong> <code>ITableAction[]</code>
      <p>
        List of action definitions (aka. buttons). Check
        <a
          :href="`${Config.componentsUrl}/components/table/ITableAction.ts`"
          target="_blank"
          rel="noopener"
          >ITableAction</a
        >
        for all supported options.
      </p>
    </li>
    <li>
      <strong>sort?</strong> <code>ISortData</code>
      <p>
        Specify the current table sorting model. Check
        <a
          :href="`${Config.componentsUrl}/components/table/ISortData.ts`"
          target="_blank"
          rel="noopener"
          >ISortData</a
        >
        for all supported options.
      </p>
    </li>
    <li>
      <strong>loading?</strong> <code>boolean</code>
      <p>
        Add a loading indicator to the table (default to <code>false</code>).
      </p>
    </li>
    <li>
      <strong>noItemsText?</strong> <code>string</code>
      <p>
        Text that is displayed when there are no <code>items</code> provided
        (default to <code>'No items to show.'</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>sort-change</strong> <code>ISortData</code>
      <p>
        Fired after table sort change. Receives the new
        <a
          :href="`${Config.componentsUrl}/components/table/ISortData.vue`"
          target="_blank"
          rel="noopener"
          >ISortData</a
        >
        model as an argument.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview
    title="Simple"
    :htmlExample="htmlSimpleExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
  <Preview
    title="Striped"
    :htmlExample="htmlStripedExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
  <Preview
    title="Loading"
    :htmlExample="htmlLoadingExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
  <Preview
    title="With actions"
    :htmlExample="htmlActionsExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
  <Preview
    title="Custom columns content"
    :htmlExample="htmlCustomColumnsExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
</template>
