<script lang="ts" setup>
import { Preview } from "./shared/index";
import * as Config from "../utils/app-config";

const setup = () => {
  const options = [
    { opt1: "Option 1" },
    { opt2: "Option 2" },
    { opt3: "Option 3" },
  ];
  return { options };
};

const htmlDefaultExample = `
  <AbritesRadioList
    spaced
    label="Single select"
    :options="options"
  />

  <AbritesRadioList
    spaced
    inline
    label="Single select (inline)"
    :options="options"
  />

  <AbritesRadioList
    spaced
    multiple
    label="Multiple select"
    :options="options"
  />

  <AbritesRadioList
    spaced
    inline
    multiple
    label="Multiple select (inline)"
    :options="options"
  />
`;

const htmlStylesExample = `
  <AbritesRadioList
    spaced
    toggle
    label="Toggle"
    :options="options"
  />

  <AbritesRadioList
    spaced
    toggle
    dense
    label="Toggle (dense)"
    :options="options"
  />

  <AbritesRadioList
    spaced
    toggle
    inline
    label="Toggle (inline)"
    :options="options"
  />

  <AbritesRadioList
    spaced
    buttoned
    label="Buttoned"
    :options="options"
  />

  <AbritesRadioList
    spaced
    buttoned
    dense
    label="Buttoned (dense)"
    :options="options"
  />

  <AbritesRadioList
    spaced
    buttoned
    inline
    label="Buttoned (inline)"
    :options="options"
  />
`;

const htmlStatesExample = `
  <AbritesRadioList
    spaced
    label="Hinted list"
    hint="Some hint..."
    :options="options"
  />

  <AbritesRadioList
    spaced
    label="Error list"
    error="Some error..."
    :options="options"
  />

  <AbritesRadioList
    spaced
    card
    disabled
    label="Disabled list"
    :options="options"
  />
`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/radio-list/RadioList.vue`"
      target="_blank"
      rel="noopener"
      >AbritesRadioList</a
    >
    <span>&lt;abrites-radio-list&gt;&lt;/abrites-radio-list&gt;</span>
  </h2>

  <p>
    Single and multiple radio list component. Supports <code>v-model</code>.
  </p>

  <p>
    This component is very similar and share most of it inputs with
    <router-link to="/select">AbritesSelect</router-link>.
  </p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>select?</strong> <code>string | number | symbol</code>
      <p>User selected option <code>v-model:select="selected"</code>.</p>
    </li>
    <li>
      <strong>options</strong>
      <code>
        Array&lt;Record&lt;string | number | symbol, unknown&gt; | [] |
        string&gt;
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
        string&gt;</code
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
        Array&lt;Record&lt;string | number | symbol, unknown&gt; | [] |
        string&gt;
      </code>
      <p>
        Fired after selection change. Receives the changed
        <code>selected</code> as an argument.
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
    <li><code>[inline]</code>, <code>.inline</code></li>
    <li><code>[toggle]</code>, <code>.toggle</code></li>
    <li><code>[buttoned]</code>, <code>.buttoned</code></li>
    <li><code>[spaced]</code>, <code>.spaced</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview
    title="Default"
    :htmlExample="htmlDefaultExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
  />
  <Preview
    title="Styles"
    :htmlExample="htmlStylesExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
  />
  <Preview
    title="States"
    :htmlExample="htmlStatesExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
  />
</template>
