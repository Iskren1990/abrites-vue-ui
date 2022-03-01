<script lang="ts" setup>
import { Preview } from "./shared";
import * as Config from "../utils/app-config";
import { ref } from "vue";
import { startOfWeek, endOfWeek } from "date-fns";

const htmlSliderExample = `
  <AbritesDatepickerSlider hotkeys v-model:selected="range" />
  
  <p>Range: {{ range }}</p>
`;

const htmlRangeExample = `
  <AbritesDatepickerSlider :maxRange="760800" hotkeys v-model:selected="range" />

  <p>Range: {{ range }}</p>
`;

const htmlMinMaxRangeExample = `
  <AbritesDatepickerSlider :minDate="startOfWeek(Date.now())" :maxDate="endOfWeek(Date.now())" hotkeys v-model:selected="range" />

  <p>Range: {{ range }}</p>
`;
const imports = [
  "import { ref } from 'vue';",
  "import { startOfWeek, endOfWeek } from 'date-fns';",
];

const setup = () => {
  const range = ref([]);
  return { range, startOfWeek, endOfWeek };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/datepicker-slider/DatepickerSlider.vue`"
      target="_blank"
      rel="noopener"
      >AbritesDatepickerSlider</a
    >
    <span>&lt;AbritesDatepickerSlider&gt;&lt;AbritesDatepickerSlider&gt;</span>
  </h2>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>selected?</strong> <code>Date[]</code>
      <p>Selected dates range.</p>
    </li>
    <li>
      <strong>hotkeys?</strong> <code>boolean</code>
      <p>
        Enable keyboard shortcuts, eg. navigating with the arrow keys (default
        to <code>false</code>).
      </p>
    </li>
    <li>
      <strong>minDate?</strong> <code>Date</code>
      <p>Min valid range date.</p>
    </li>
    <li>
      <strong>maxDate?</strong> <code>Date</code>
      <p>Max valid range date.</p>
    </li>
    <li>
      <strong>maxRange?</strong> <code>number</code>
      <p>
        Maximum duration interval of the selected range in
        <strong>seconds</strong>.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>@update:selected</strong> <code>Date[]</code>
      <p>
        Fired after <code>selected</code> change. Receives the changed
        <code>value</code> as an argument.
      </p>
    </li>
    <li>
      <strong>@drag-end</strong> <code>Date[]</code>
      <p>
        Fired after drag end. Receives the changed <code>value</code> as an
        argument.
      </p>
    </li>
    <li>
      <strong>@resize-end</strong> <code>Date[]</code>
      <p>
        Fired after resize end. Receives the changed <code>value</code> as an
        argument.
      </p>
    </li>
    <li>
      <strong>@pan-end</strong> <code>Date[]</code>
      <p>
        Fired after dates panning (eg. using the arrows). Receives the changed
        <code>value</code> as an argument.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview
    title="Default"
    :htmlExample="htmlSliderExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />

  <Preview
    title="With range"
    :htmlExample="htmlRangeExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />

  <Preview
    title="With date limitation"
    :htmlExample="htmlMinMaxRangeExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
</template>
