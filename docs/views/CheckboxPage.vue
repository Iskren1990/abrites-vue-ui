<script lang="ts" setup>
import { Preview } from "./shared";
import * as Config from "../utils/app-config";
import { ref } from "vue";

const htmlDefaultExample = `
  <AbritesCheckbox label="Checkbox 1" v-model:checkbox="checkbox1"/>

  <AbritesCheckbox label="Checkbox 2" v-model:checkbox="checkbox2" />
`;

const htmlStylesExample = `
  <AbritesCheckbox toggle label="Toggle checkbox" v-model:checkbox="toggleCheckbox"/>

  <AbritesCheckbox card toggle label="Toggle checkbox" v-model:checkbox="cardToggleCheckbox"/>

  <AbritesCheckbox card label="Card checkbox" hint="Card layout hint" v-model:checkbox="hintedCheckbox"/>

  <AbritesCheckbox card inline label="Card checkbox (inline)" hint="Card layout hint" v-model:checkbox="inlineCheckbox"/>
`;

const htmlStatesExample = `
  <AbritesCheckbox label="Hint example" hint="Some hint..." v-model:checkbox="hintedCheckbox"/>

  <AbritesCheckbox label="Error example" error="Some error..." v-model:checkbox="erroredCheckbox"/>

  <AbritesCheckbox label="Disabled example" disabled v-model:checkbox="disabledCheckbox"/>
`;

const defaultFn = () => {
  const checkbox1 = ref();
  const checkbox2 = ref(true);
  return { checkbox1, checkbox2 };
};
const stylestFn = () => {
  const toggleCheckbox = ref();
  const cardToggleCheckbox = ref();
  const hintedCheckbox = ref();
  const inlineCheckbox = ref();
  return {
    toggleCheckbox,
    cardToggleCheckbox,
    hintedCheckbox,
    inlineCheckbox,
  };
};
const statesFn = () => {
  const hintedCheckbox = ref();
  const erroredCheckbox = ref();
  const disabledCheckbox = ref();
  return { hintedCheckbox, erroredCheckbox, disabledCheckbox };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/checkbox/Checkbox.vue`"
      target="_blank"
      rel="noopener"
      >AbritesCheckbox</a
    >
    <span>&lt;AbritesCheckbox&gt;&lt;/AbritesCheckbox&gt;</span>
  </h2>

  <p>Renders stylized checkbox input. Supports v-model.</p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>checkbox?</strong> <code>boolean</code>
      <p>The select state of the checkbox (default to <code>false</code>).</p>
    </li>
    <li>
      <strong>label?</strong> <code>string</code>
      <p>Label of the input field.</p>
    </li>
    <li>
      <strong>hint?</strong> <code>string</code>
      <p>Additional text placed right after the checkbox label.</p>
    </li>
    <li>
      <strong>error?</strong> <code>string | string[]</code>
      <p>Error message of the input field.</p>
    </li>
    <li>
      <strong>disabled?</strong> <code>boolean</code>
      <p>Mark the field as disabled.</p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>@update:checkbox</strong> <code>boolean</code>
      <p>
        Fired on checkbox value change. Receives the new input checkbox state as
        an argument.
      </p>
    </li>
    <li>
      <strong>@blur</strong>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li><code>[toggle]</code>, <code>.toggle</code></li>
    <li><code>[card]</code>, <code>.card</code></li>
    <li><code>[inline]</code>, <code>.inline</code></li>
    <li><code>[spaced]</code>, <code>.spaced</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview
    title="Default"
    :htmlExample="htmlDefaultExample"
    :scriptExample="`${defaultFn}`"
    :setupFn="defaultFn"
  />

  <Preview
    title="Styles"
    :htmlExample="htmlStylesExample"
    :scriptExample="`${stylestFn}`"
    :setupFn="stylestFn"
  />

  <Preview
    title="States"
    :htmlExample="htmlStatesExample"
    :scriptExample="`${statesFn}`"
    :setupFn="statesFn"
  />
</template>
