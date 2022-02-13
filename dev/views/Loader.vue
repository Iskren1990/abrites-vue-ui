<script lang="ts" setup>
import { Preview } from "./shared/index";
import * as Config from "../utils/app-config";

const htmlColorsExample = `
  <AbritesLoader :active="true" />
  <AbritesLoader accent :active="true" />
  <AbritesLoader danger :active="true" />
  <AbritesLoader success :active="true" />
  <AbritesLoader warning :active="true" />
  <AbritesLoader light :active="true" />
  <AbritesLoader dark :active="true" />
`;

const htmlSizesExample = `
  <AbritesLoader large :active="true" />
  <AbritesLoader :active="true" />
  <AbritesLoader small :active="true" />
`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/loader/Loader.vue`"
      target="_blank"
      rel="noopener"
      >AbritesLoader</a
    >
    <span>&lt;AbritesLoader&gt;&lt;/AbritesLoader&gt;</span>
  </h2>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>active</strong> <code>boolean</code>
      <p>
        Whether to activate the spinning animation or not (default to
        <code>false</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li><code>[accent]</code>, <code>.accent</code></li>
    <li><code>[danger]</code>, <code>.danger</code></li>
    <li><code>[success]</code>, <code>.success</code></li>
    <li><code>[warning]</code>, <code>.warning</code></li>
    <li><code>[light]</code>, <code>.light</code></li>
    <li><code>[dark]</code>, <code>.dark</code></li>
    <li><code>[small]</code>, <code>.small</code></li>
    <li><code>[large]</code>, <code>.large</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview title="Colors" :htmlExample="htmlColorsExample" />

  <Preview title="Sizes" :htmlExample="htmlSizesExample" />
</template>
