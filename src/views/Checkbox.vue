<script lang="ts" setup>
import Preview from "../views/shared/Preview.vue";
import Config from "../utils/app-config";

const example = `
  <AbritesCheckbox
    class="card toggle"
    label="Toggle checkbox"
    hint="Card layout hint"
    error="Some error..."
  />
`;

const htmlDefaultExample = `
  <AbritesCheckbox label="Checkbox 1" />

  <AbritesCheckbox label="Checkbox 2" :value="true" />
`;

const htmlStylesExample = `
  <AbritesCheckbox toggle label="Toggle checkbox" />

  <AbritesCheckbox card toggle label="Toggle checkbox" />

  <AbritesCheckbox card label="Card checkbox" hint="Card layout hint" />

  <AbritesCheckbox card inline label="Card checkbox (inline)" hint="Card layout hint" />
`;

const htmlStatesExample = `
  <AbritesCheckbox label="Hint example" hint="Some hint..." />

  <AbritesCheckbox label="Error example" error="Some error..." />

  <AbritesCheckbox label="Disabled example" disabled />
`;
</script>
<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/lib/checkbox/checkbox.dart`"
      target="_blank"
      rel="noopener"
      >AbritesCheckbox</a
    >
    <span>&lt;AbritesCheckbox&gt;&lt;/AbritesCheckbox&gt;</span>
  </h2>

  <p>Renders stylized checkbox input.</p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>value?</strong> <code>boolean</code>
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

  <Preview title="Default" :htmlExample="htmlDefaultExample" />

  <Preview title="Styles" :htmlExample="htmlStylesExample" />

  <Preview title="States" :htmlExample="htmlStatesExample" />
</template>
