<script lang="ts" setup>
import { Preview } from "./shared/index";
import * as Config from "../utils/app-config";

import { ref } from "vue";

const setupFn = () => {
  const term = ref("");
  const selected = ref();

  const listBaseTypeOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];

  const objectOptions = [
    { opt1: "Option 1" },
    { opt2: "Option 2" },
    { opt3: "Option 3" },
    { opt4: "Option 4" },
    { opt5: "Option 5" },
  ];

  return { term, selected, listBaseTypeOptions, objectOptions };
};

const setupPre = () => {
  const singleSelected = ref("Option 2");
  const multipleSelected = ref([{ opt2: "Option 2" }]);
  const disabledSelected = ref([{ opt2: "Option 2" }]);

  const listBaseTypeOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];

  const objectOptions = [
    { opt1: "Option 1" },
    { opt2: "Option 2" },
    { opt3: "Option 3" },
    { opt4: "Option 4" },
    { opt5: "Option 5" },
  ];

  const disabled = [{ opt3: "Option 3" }];

  return {
    disabledSelected,
    disabled,
    singleSelected,
    multipleSelected,
    listBaseTypeOptions,
    objectOptions,
  };
};

const imports = ["import { ref } from 'vue';"];

const htmlSimpleExample = `
  <AbritesSelect
    spaced
    label="Single select"
    :options="objectOptions"
    v-model:value="selected"
  ></AbritesSelect>

  <AbritesSelect
    spaced
    noborder
    label="Single select (no border)"
    :options="listBaseTypeOptions"
  ></AbritesSelect>

  <AbritesSelect
    spaced
    dense
    label="Single select (dense)"
    :options="objectOptions"
  ></AbritesSelect>

  <AbritesSelect
    spaced
    multiple
    label="Multiple select"
    :options="objectOptions"
  ></AbritesSelect>

  <AbritesSelect
    spaced
    multiple
    searchable
    v-model:select="selected"
    v-model:searchTerm="term"
    label="Multiple select + search"
    :options="listBaseTypeOptions"
  ></AbritesSelect>
`;

const htmlStatesExample = `
  <AbritesSelect
    spaced
    label="Hinted select"
    hint="Some hint..."
    :options="objectOptions"
  ></AbritesSelect>

  <AbritesSelect
    spaced
    label="Error select"
    error="Some error..."
    :options="listBaseTypeOptions"
  ></AbritesSelect>

  <AbritesSelect
    spaced
    disabled
    label="Disabled select"
    :options="listBaseTypeOptions"
  ></AbritesSelect>
`;

const htmlPreselectedExample = `

  <AbritesSelect
    spaced
    v-model:select="singleSelected"
    label="Single pre-selected"
    :options="listBaseTypeOptions"
  ></AbritesSelect>

  <AbritesSelect
    spaced
    multiple
    v-model:select="multipleSelected"
    label="Multiple pre-selected"
    :options="objectOptions"
  ></AbritesSelect>

    <AbritesSelect
    spaced
    multiple
    :disabledOptions="disabled"
    v-model:select="multipleSelected"
    label="Disabled pre-selected"
    :options="objectOptions"
  ></AbritesSelect>
`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/select/select.vue`"
      target="_blank"
      rel="noopener"
      >AbritesSelect</a
    >
    <span> &lt;AbritesSelect&gt;&lt;/AbritesSelect&gt; </span>
  </h2>

  <p>
    Single and multiple select field component. Supports <code>v-model</code>.
  </p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>select?</strong>
      <code> Record&lt;string | number | symbol, unknown&gt; | [] | any</code>
      <p>User selected option <code>v-model:select="selected"</code>.</p>
    </li>
    <li>
      <strong>options</strong>
      <code>
        Array&lt;Record&lt;string | number | symbol, unknown&gt; | [] | any&gt;
      </code>
      <p>List of options to select from.</p>
    </li>
    <li>
      <strong>multiple?</strong> <code>boolean</code>
      <p>Allow selecting more than one option.</p>
    </li>
    <li>
      <strong>disabledOptions?</strong>
      <code>
        Array&lt;Record&lt;string | number | symbol, unknown&gt; | [] |
        any&gt;</code
      >
      <p>List of options to mark as disabled.</p>
    </li>
    <li>
      <strong>disabled?</strong> <code>bool</code>
      <p>Disable the select field (default to <code>false</code>).</p>
    </li>
    <li>
      <strong>labelFactory?</strong>
      <code>(option: any): string</code>
      <p>
        Custom option label resolver. If not set,
        <code>option.label</code> is used.
      </p>
    </li>
    <li>
      <strong>label?</strong> <code>string</code>
      <p>Label of the select field.</p>
    </li>
    <li>
      <strong>placeholder?</strong> <code>string</code>
      <p>
        Placeholder of the select field (visible only if there aren't any
        selected options).
      </p>
    </li>
    <li>
      <strong>hint?</strong> <code>string</code>
      <p>Additional text placed below the select field.</p>
    </li>
    <li>
      <strong>searchable?</strong> <code>boolean</code>
      <p>
        Add search input to the options dropdown list (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>toggleSelected?</strong> <code>boolean</code>
      <p>
        Whether to deselect a selected option on click/tap (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>searchPlaceholder?</strong> <code>string</code>
      <p>
        Placeholder text for the search input (default to
        <code>'Search...'</code>).
      </p>
    </li>
    <li>
      <strong>searchTerm?</strong> <code>string</code>
      <p>Search parameter. <code>v-model:searchTerm="term"</code></p>
    </li>
    <li>
      <strong>searchFilter?</strong>
      <code>(searchTerm: string, option: any): boolean</code>
      <p>
        Custom filter function to apply when <code>searchable</code> is enabled.
        The default behavior is to search within each option label (lowercased
        and no spaces).
      </p>
    </li>
    <li>
      <strong>noOptionsFound?</strong> <code>string</code>
      <p>
        Text shown if no options are presented (default to
        <code>'No options found.'</code>).
      </p>
    </li>
    <li>
      <strong>error?</strong> <code>string | string[]</code>
      <p>
        Error message placed below the select field (after <code>hint</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>update:select </strong>
      <code>
        <a
          :href="`${Config.componentsUrl}/components/select/select-option.ts#L1`"
          target="_blank"
          rel="noopener"
          >Array&lt;SelectOption&gt; | SelectOption</a
        >
      </code>
      <p>
        Fired after selection change. Receives the changed
        <code>selected</code> as an argument. Type of emited value depends if
        multiple is true.
      </p>
    </li>
    <li>
      <strong>update:search-term</strong> <code>string</code>
      <p>
        Fired on searchTerm change Receives the changed
        <code>searchTerm</code> as an argument..
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li><code>[dense]</code>, <code>.dense</code></li>
    <li><code>[spaced]</code>, <code>.spaced</code></li>
    <li><code>[noborder]</code>, <code>.noborder</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview
    title="Simple"
    :htmlExample="htmlSimpleExample"
    :scriptExample="`${setupFn}`"
    :setupFn="setupFn"
    :imports="imports"
  />

  <Preview
    title="States"
    :htmlExample="htmlStatesExample"
    :scriptExample="`${setupFn}`"
    :setupFn="setupFn"
    :imports="imports"
  />

  <Preview
    title="Pre-selected"
    :htmlExample="htmlPreselectedExample"
    :scriptExample="`${setupPre}`"
    :setupFn="setupPre"
    :imports="imports"
  />
</template>
