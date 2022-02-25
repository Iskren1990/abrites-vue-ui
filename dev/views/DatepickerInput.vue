<script lang="ts" setup>
import { ref } from "vue";
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
import { IDatepickerPreset } from "@/components/datepicker/IDatepickerPreset";

const selected = ref();

const htmlDateExample = `
  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    autoApply 
    label="Single (date only)" 
  />

  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    range 
    label="Range (date only)" 
  />
`;

const htmlDateTimeExample = `
  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    time 
    label="Single (date + time)" 
  />

  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    range 
    time 
    label="Range (date + time)" 
  />
`;

const htmlMultipleMonthsExample = `
  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    range 
    :months="2" 
    label="2 months" 
  />

  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    range 
    :months="3" 
    label="3 months" 
  />

  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    range 
    :months="4" 
    label="4 months" 
  />
`;

const htmlPositionsExample = `
  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    label="Bottom-left" 
    dropdownPosition="bottom-left" 
  />

  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    label="Bottom-center" 
    dropdownPosition="bottom-center" 
  />

  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    label="Bottom-right" 
    dropdownPosition="bottom-right" 
  />

  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    label="Top-left" 
    dropdownPosition="top-left" 
  />

  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    label="Top-center" 
    dropdownPosition="top-center" 
  />

  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    label="Top-right" 
    dropdownPosition="top-right" 
  />
`;

const htmlStatesExample = `
  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    label="Hinted input" 
    hint="Some hint..." 
  />

  <AbritesDatepickerInput 
    spaced 
    clearOnCancel 
    label="Error input" 
    error="Some error..." 
  />

  <AbritesDatepickerInput 
    spaced 
    disabled 
    label="Disabled input" 
  />
`;

const htmlPresetsExample = `
  <AbritesDatepickerInput 
    clearOnCancel 
    range 
    :presets="presets"
    @update:selected="updateVal"
    @applied="applied"
    @canceled="cancel"
  />
`;

const imports = [
  "import { endOfMonth, endOfToday, endOfWeek } from 'date-fns'",
  "import { startOfMonth, startOfToday, startOfWeek } from 'date-fns'",
  "import { ref } from 'vue';",
];

const script = () => {
  const selected = ref();

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

  return { presets, selected, updateVal, applied, cancel };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/datepicker-input/DatepickerInput.vue`"
      target="_blank"
      rel="noopener"
      >AbritesDatepickerInput</a
    >
    <span>&lt;AbritesDatepickerInput&gt;&lt;/AbritesDatepickerInput&gt;</span>
  </h2>

  <p>Datepicker input component. Supports <code>v-model</code>.</p>

  <AbritesAlert warning>
    This component depends on
    <a href="https://flatpickr.js.org" target="_blank" rel="noopener"
      >Flatpickr</a
    >
    to be loaded in the <code>head</code> section of your html template.
  </AbritesAlert>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>selected?</strong> <code>Date[]</code>
      <p>
        The selected date or list of dates (if <code>range</code> is enabled).
      </p>
    </li>
    <li>
      <strong>presets?</strong> <code>IDatepickerPreset[]</code>
      <p>
        <a
          :href="`${Config.componentsUrl}/components/datepicker/IDatepickerPreset.vue`"
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
      <p>Text for the apply button.</p>
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
    <li>
      <strong>label?</strong> <code>string</code>
      <p>Label of the input field.</p>
    </li>
    <li>
      <strong>placeholder?</strong> <code>Date | Date[] | string</code>
      <p>
        Placeholder of the input field (visible only when
        <code>selected</code> is empty).
      </p>
    </li>
    <li>
      <strong>hint?</strong> <code>string</code>
      <p>Additional text placed below the input field.</p>
    </li>
    <li>
      <strong>error?</strong> <code>string</code>
      <p>Error message of the input field.</p>
    </li>
    <li>
      <strong>tabindex?</strong> <code>number</code>
      <p>Number for the sequential keyboard/focus navigation.</p>
    </li>
    <li>
      <strong>dropdownPosition?</strong> <code>string</code>
      <p>
        The positions of the datepicker dropdown. Valid values are:
        <code>top-center</code>, <code>top-right</code>, <code>top-left</code>,
        <code>bottom-center</code>, <code>bottom-right</code> (default),
        <code>bottom-left</code>.
      </p>
    </li>
    <li>
      <strong>disabled?</strong> <code>boolean</code>
      <p>Disable the input field (default to <code>false</code>).</p>
    </li>
    <li>
      <strong>displayValueFormat?</strong> <code>string</code>
      <p>
        Date format, displayed in the input field (default to
        <code>dd MMM yyyy, HH:mm</code>).
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
    <li>
      <strong>dropdown-change</strong> <code>boolean</code>
      <p>
        Fired on datepicker dropdown visibility changes. Receives the current
        dropdown visibility state as an argument.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li><code>[spaced] </code>, <code>.spaced</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview title="Single" :htmlExample="htmlDateExample" />

  <Preview title="With time" :htmlExample="htmlDateTimeExample" />

  <Preview title="Multiple months" :htmlExample="htmlMultipleMonthsExample" />

  <Preview title="Dropdown positions" :htmlExample="htmlPositionsExample" />

  <Preview title="States" :htmlExample="htmlStatesExample" />

  <Preview
    title="Presets"
    :htmlExample="htmlPresetsExample"
    :scriptExample="`${script}`"
    :setupFn="script"
    :imports="imports"
  />
</template>
