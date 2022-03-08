<script lang="ts" setup>
import { Preview } from "./shared";
import * as Config from "../utils/app-config";
import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";

import { IDatepickerPreset } from "../../src/components/datepicker/IDatepickerPreset";
import { ref } from "vue";

const htmlSingleExample = `
  <AbritesDatepicker />
`;

const htmlRangeExample = `
  <AbritesDatepicker range />
`;

const htmlTimeExample = `
  <AbritesDatepicker time />

  <p class="flex-clear">Range with time:</p>

  <AbritesDatepicker range time />
`;

const htmlMonthsExample = `
  <AbritesDatepicker range :months="2" />

  <div class="flex-clear"></div>

  <AbritesDatepicker range :months="3" />

  <div class="flex-clear"></div>

  <AbritesDatepicker range :months="4" />
`;

const htmlBlockExample = `
  <AbritesDatepicker block :months="3" />
`;

const htmlPresetsExample = `
  <AbritesDatepicker 
    clearOnCancel 
    range 
    v-model:selected="selected" 
    @update:selected="updateVal" 
    @applied="applied" 
    @cancel="cancel" 
    :presets="presets"
  />
`;

const imports = [
  "import { endOfMonth, endOfToday, endOfWeek } from 'date-fns'",
  "import { startOfMonth, startOfToday, startOfWeek } from 'date-fns'",
  "import { ref } from 'vue';",
];

const script = () => {
  const presets: IDatepickerPreset[] = [
    {
      label: "Today",
      trigger: () => [startOfToday(), endOfToday()],
    },
    {
      label: "This week",
      trigger: () => [startOfWeek(Date.now()), endOfWeek(Date.now())],
    },
    {
      label: "This month",
      trigger: () => [startOfMonth(Date.now()), endOfMonth(Date.now())],
    },
  ];

  const updateVal = (val) => console.log("updateVal", val);
  const applied = (val) => console.log("applied", val);
  const cancel = (val) => console.log("cancel", val);
  const selected = ref();
  return { presets, selected, updateVal, applied, cancel };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/datepicker/Datepicker.vue`"
      target="_blank"
      rel="noopener"
      >AbritesDatepicker</a
    >
    <span>&lt;AbritesDatepicker&gt;&lt;/AbritesDatepicker&gt;</span>
  </h2>

  <p>Inline datepicker component. Supports v-model.</p>
  <p>
    You may want to check also
    <router-link to="datepicker-input">Datepicker Input</router-link>.
  </p>

  <AbritesAlert warning>
    This component depends on
    <a href="https://flatpickr.js.org" target="_blank" rel="noopener"
      >Flatpickr</a
    >.
  </AbritesAlert>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>selected?</strong> <code>Date[]</code>
      <p>List of selected date(s) (default to <code>[]</code>).</p>
    </li>
    <li>
      <strong>presets?</strong> <code>IDatepickerPreset[]</code>
      <p>
        <a
          :href="`${Config.componentsUrl}/componnets/datepicker/IDatepickerPreset.ts`"
          target="_blank"
          rel="noopener"
          >IDatepickerPreset</a
        >
        options displayed above the calendar.
      </p>
    </li>
    <li>
      <strong>autoApply?</strong> <code>boolean</code>
      <p>
        Auto apply date(s) selection on date click/tap (default to
        <code>false</code>). This option hides the cancel and apply buttons.
      </p>
    </li>
    <li>
      <strong>clearOnCancel?</strong> <code>boolean</code>
      <p>
        Whether to clear the selected date(s) on cancel button click/tap
        (default to <code>false</code>).
      </p>
    </li>
    <li>
      <strong>cancelText?</strong> <code>string</code>
      <p>Text for the cancel button (default to <code>'Cancel'</code>).</p>
    </li>
    <li>
      <strong>applyText?</strong> <code>string</code>
      <p>Text for the apply button (default to <code>'Apply'</code>).</p>
    </li>
    <li>
      <strong>minDate?</strong> <code>Date</code>
      <p>Min valid selectable date.</p>
    </li>
    <li>
      <strong>maxDate?</strong> <code>Date</code>
      <p>Max valid selectable date.</p>
    </li>
    <li>
      <strong>maxRange?</strong> <code>number</code>
      <p>
        Maximum duration of a selected date range (this is checked only when
        <code>range</code> is enabled).
      </p>
    </li>
    <li>
      <strong>time?</strong> <code>boolean</code>
      <p>
        Show a time picker below the calendar (default to <code>false</code>).
      </p>
    </li>
    <li>
      <strong>range?</strong> <code>boolean</code>
      <p>Allow selecting dates range (default to <code>false</code>).</p>
    </li>
    <li>
      <strong>months?</strong> <code>number</code>
      <p>
        The number of maximum expanded calendar months (default to
        <code>1</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>update:selected</strong> <code>Date[]</code>
      <p>
        Fired after <code>selected</code> change. Receives the updated
        <code>value</code> as an argument.
      </p>
    </li>
    <li>
      <strong>applied</strong> <code>Date[]</code>
      <p>
        Fired on selected datepicker date(s) apply. Receives the selected
        date(s) as an argument.
      </p>
    </li>
    <li>
      <strong>canceled</strong> <code>void</code>
      <p>Fired on cancel button click/tap.</p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li><code>[block]</code>, <code>.block</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview title="Single" :htmlExample="htmlSingleExample" />

  <Preview title="Range" :htmlExample="htmlRangeExample" />

  <Preview title="With time" :htmlExample="htmlTimeExample" />

  <Preview title="Multiple months" :htmlExample="htmlMonthsExample" />

  <Preview title="Block" :htmlExample="htmlBlockExample" />

  <Preview
    title="Presets"
    :htmlExample="htmlPresetsExample"
    :scriptExample="`${script}`"
    :setupFn="script"
    :imports="imports"
  />
</template>
