<script lang="ts" setup>
import * as Config from "../utils/app-config";
import { Preview } from "./shared";
import { ref } from "vue";

const imports = ["import { ref } from 'vue';"];
const setupFn = () => {
  const searchVal = ref("");
  return { searchVal };
};

const htmlDefaultExample = `
  <AbritesSearch large placeholder="Large search..."></AbritesSearch>

  <AbritesSearch placeholder="Default search..."></AbritesSearch>

  <AbritesSearch small placeholder="Small search..."></AbritesSearch>

  <div class="flex-clear"></div>

  <AbritesSearch expanded large placeholder="Large expanded search..."></AbritesSearch>

  <AbritesSearch expanded placeholder="Default expanded search..."></AbritesSearch>

  <AbritesSearch expanded small placeholder="Small expanded search..."></AbritesSearch>
`;

const htmlDisabledExample = `
  <AbritesSearch disabled large placeholder="Large search..."></AbritesSearch>

  <AbritesSearch disabled placeholder="Default search..."></AbritesSearch>

  <AbritesSearch disabled small placeholder="Small search..."></AbritesSearch>

  <div class="flex-clear"></div>

  <AbritesSearch disabled expanded large placeholder="Large expanded search..."></AbritesSearch>

  <AbritesSearch disabled expanded placeholder="Default expanded search..."></AbritesSearch>

  <AbritesSearch disabled expanded small placeholder="Small expanded search..."></AbritesSearch>
`;

const htmlBlockExample = `
  <AbritesSearch block large placeholder="Large search..."></AbritesSearch>
  
  <div class="flex-clear"></div>
  
  <AbritesSearch block placeholder="Default search..."></AbritesSearch>
  
  <div class="flex-clear"></div>
  
  <AbritesSearch block small placeholder="Small search..."></AbritesSearch>
  
  <div class="flex-clear"></div>
  
  <AbritesSearch block expanded large placeholder="Large expanded search..."></AbritesSearch>
  
  <div class="flex-clear"></div>
  
  <AbritesSearch block expanded placeholder="Default expanded search..."></AbritesSearch>
  
  <div class="flex-clear"></div>
  
  <AbritesSearch block expanded small placeholder="Small expanded search..."></AbritesSearch>
`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/search/Search.vue`"
      target="_blank"
      rel="noopener"
      >AbritesSearch</a
    >
    <span>&lt;AbritesSearch&gt;&lt;/AbritesSearch&gt;</span>
  </h2>
  <p>Search component supporting <code>v-model</code>.</p>
  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>term?</strong> <code>string</code>
      <p>Search value.</p>
    </li>
    <li>
      <strong>placeholder?</strong> <code>string</code>
      <p>Search input placeholder.</p>
    </li>
    <li>
      <strong>expanded?</strong> <code>boolean</code>
      <p>
        Keep the search input expanded (default to <code>false</code>, aka.
        expand only on focus).
      </p>
    </li>
    <li>
      <strong>disabled?</strong> <code>boolean</code>
      <p>Mark the component as disabled (default to <code>false</code>).</p>
    </li>
    <li>
      <strong>debounce?</strong> <code>number</code>
      <p>
        Change events debounce interval in ms (default to <code>200</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>update:term</strong> <code>string</code>
      <p>Fired when the search input value has changed.</p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li><code>[small]</code>, <code>.small</code></li>
    <li><code>[large]</code>, <code>.large</code></li>
    <li><code>[block]</code>, <code>.block</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview
    title="Default"
    :htmlExample="htmlDefaultExample"
    :scriptExample="`${setupFn}`"
    :setupFn="setupFn"
    :imports="imports"
  >
  </Preview>

  <Preview
    title="Block"
    :htmlExample="htmlBlockExample"
    :scriptExample="`${setupFn}`"
    :setupFn="setupFn"
    :imports="imports"
  >
  </Preview>

  <Preview
    title="Disabled"
    :htmlExample="htmlDisabledExample"
    :scriptExample="`${setupFn}`"
    :setupFn="setupFn"
    :imports="imports"
  >
  </Preview>
</template>
