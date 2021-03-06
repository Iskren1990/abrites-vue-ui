<script lang="ts" setup>
import { ref } from "vue";
import { Preview } from "./shared/index";
import * as Config from "../utils/app-config";

const simpleSetupFn = () => {
  const itemsList = ref(new Array(5).fill(0).map((_, ind) => ind.toString()));
  return { itemsList };
};

const handleSetupFn = () => {
  const itemsList = ref(new Array(5).fill(0).map((_, ind) => ind.toString()));
  const options = {
    handle: ".dragable-handle",
  };
  return { itemsList, options };
};

const cancelSetupFn = () => {
  const itemsList = ref(new Array(5).fill(0).map((_, ind) => ind.toString()));
  const options = { filter: ".nodrag" };
  return { itemsList, options };
};

const simpleHtmlExample = `
  <div class="container">
    <div v-abrites-dnd="{ itemsList }">
      <div v-for="item in itemsList" :key="item" class="item">
        Item {{ item }}
      </div>
    </div>

    <p>List: {{ itemsList }}</p>
  </div>
`;

const handleHtmlExample = `
  <div class="container">
    <ul class="with-handle" v-abrites-dnd="{ itemsList, options }">
      <li v-for="item in itemsList" :key="item" class="item">
        <AbritesButton flat round  class="dragable-handle"><AbritesIcon icon="drag_handle"></AbritesIcon></AbritesButton>
        <div class="txt">Item {{item}}</div>
      </li>
    </ul>

    <p>List: {{ itemsList }}</p>
  </div>
`;

const cancelHtmlExample = `
  <div class="container">
    <div v-abrites-dnd="{ itemsList, options }">
      <div v-for="item in itemsList" :key="item" class="item">
        <div class="txt">Item {{item}}</div>

        <AbritesButton class="nodrag">This button shouldn't be draggable</AbritesButton>
      </div>
    </div>

    <p>List: {{ itemsList }}</p>
  </div>
`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/directives/DnD.ts`"
      target="_blank"
      rel="noopener"
      >AbritesDnD</a
    >
    <span>v-abrites-dnd</span>
  </h2>

  <p>Drag &amp; Drop list sorting directive.</p>
  <abrites-alert warning>
    <p>
      This component depends on
      <a :href="'https://github.com/SortableJS/Sortable'">SortableJS package</a
      >.
    </p>
    <p>
      <a :href="'http://sortablejs.github.io/Sortable/'">Examples</a>
    </p>
  </abrites-alert>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>itemsList</strong> <code>&lt;any&gt;[]</code>
      <p>Array elements to sort.</p>
    </li>
    <li>
      <strong>options</strong> <code>SortableOptions</code>
      <p>SortableJS options object. Default properties:</p>
      <ul>
        <li>forceFallback: true</li>
        <li>animation: 150</li>
      </ul>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview
    title="Simple"
    :htmlExample="simpleHtmlExample"
    :scriptExample="`${simpleSetupFn}`"
    :setupFn="simpleSetupFn"
  />

  <Preview
    title="With handle"
    :htmlExample="handleHtmlExample"
    :scriptExample="`${handleSetupFn}`"
    :setupFn="handleSetupFn"
  />
  <Preview
    title="With cancel"
    :htmlExample="cancelHtmlExample"
    :scriptExample="`${cancelSetupFn}`"
    :setupFn="cancelSetupFn"
  />
</template>

<style lang="scss" scoped>
::v-deep(.container) {
  position: relative;
  display: block;
  width: 100%;

  .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    margin: 10px 0;
    padding: 10px;
    background: #27282b;

    .txt {
      margin: 0 30px;
    }
    .txt:first-child {
      margin-left: 0;
    }
    .txt:last-child {
      margin-right: 0;
    }
  }
  .with-handle {
    padding: 0;
  }
}
</style>
