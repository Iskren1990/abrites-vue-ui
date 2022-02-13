<script lang="ts" setup>
import { Preview } from "./shared/index";
import * as Config from "../utils/app-config";

const htmlDefaultExample = `
  <div>
    <AbritesInfo prop="Key 1" value="Value 1"></AbritesInfo>

    <AbritesInfo spaced prop="Key 2 - spaced" value="Value 2"></AbritesInfo>

    <AbritesInfo prop="Key 3" value="Value 3"></AbritesInfo>

    <AbritesInfo prop="Key 4" value="Value 4"></AbritesInfo>
  </div>
`;

const htmlSlotsExample = `
  <div>
    <AbritesInfo prop="Prefix example" value="Lorem ipsum dolor sit amet">

      <template v-slot:prefix>

        <AbritesIcon icon="drive_eta"></AbritesIcon>

      </template>

    </AbritesInfo>

    <AbritesInfo spaced prop="Suffix example" value="Lorem ipsum dolor sit amet">

      <template v-slot:suffix>

        <AbritesIcon icon="arrow_forward"></AbritesIcon>

      </template>

    </AbritesInfo>

    <AbritesInfo prop="Prefix + Suffix example" value="Lorem ipsum dolor sit amet">

      <template #prefix>

        <AbritesIcon icon="drive_eta"></AbritesIcon>

      </template>

      <template #suffix>

        <AbritesIcon icon="arrow_forward"></AbritesIcon>

      </template>

    </AbritesInfo>
  </div>
`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/info/Info.vue`"
      target="_blank"
      rel="noopener"
      >AbritesInfo</a
    >
    <span>&lt;AbritesInfo&gt;&lt;/AbritesInfo&gt;</span>
  </h2>

  <p>Simple stylized data row.</p>
  <p>
    Based on Vue named slots:
    <a
      :href="`https://v3.vuejs.org/guide/component-slots.html#named-slots`"
      target="_blank"
      rel="noopener"
      >https://v3.vuejs.org/guide/component-slots.html#named-slots</a
    >
  </p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>prop</strong> <code>string</code>
      <p>Key/Name of the data row.</p>
    </li>
    <li>
      <strong>value</strong> <code>string</code>
      <p>Value/Content of the data row.</p>
    </li>
  </ul>

  <h3 class="section-title" id="slots">Slots</h3>
  <p>The following slots (aka. <code>slot</code>) are available:</p>
  <ul>
    <li>
      <code>v-slot:prefix || #prefix</code>
      <p>
        Content that is positioned before the default one. Usually used for
        icons, buttons and other control elements.
      </p>
    </li>
    <li>
      <code>v-slot:suffix || #suffix</code>
      <p>
        Content that is positioned after the default one. Usually used for
        icons, buttons and other control elements.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li><code>[spaced]</code>, <code>.spaced</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview title="Default" :htmlExample="htmlDefaultExample" />

  <Preview title="Slots" :htmlExample="htmlSlotsExample" />
</template>

<style></style>
