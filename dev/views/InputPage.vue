<script lang="ts" setup>
import { Preview } from "./shared";
import * as Config from "../utils/app-config";

const htmlSimpleExample = `
  <AbritesInput label="Input" spaced value=""/>

  <AbritesInput label="Input (no border)" noborder spaced value=""/>

  <AbritesInput label="Input (dense)" dense spaced value=""/>

  <AbritesInput label="Textarea" :rows="2" spaced value=""/>
`;

const htmlStatesExample = `
  <AbritesInput
    label="Hinted input"
    value="Some value"
    hint="Some hint..."
    spaced
  />

  <AbritesInput
    label="Error input"
    value="Some value"
    error="Some error..."
    spaced
  />

  <AbritesInput label="Readonly input" value="Some value" readonly spaced />

  <AbritesInput label="Disabled input" value="Some value" disabled spaced />
`;

const htmlTypesExample = `
  <AbritesInput label="Password input" type="password" spaced value=""/>

  <AbritesInput label="Number input" type="number" spaced value=""/>

  <AbritesInput label="Color input" type="color" spaced value=""/>
`;

const htmlSlotsExample = `
 <AbritesInput label="With prefix (text)" spaced value="">
    <template v-slot:prefix>$</template>
  </AbritesInput>

  <AbritesInput
    label="With prefix (icon)"
    placeholder="My placeholder..."
    spaced
    value=""
  >
    <template v-slot:prefix>
      <AbritesIcon icon="mail" />
    </template>
  </AbritesInput>

  <AbritesInput label="With suffix (text)" spaced value="">
    <template v-slot:suffix>
      <div>€</div>
    </template>
  </AbritesInput>

  <AbritesInput
    label="With suffix (icon)"
    placeholder="My placeholder..."
    spaced
    value=""
  >
    <template v-slot:suffix>
      <div>
        <AbritesIcon icon="check" success />
      </div>
    </template>
  </AbritesInput>

  <AbritesInput
    label="With prefix and suffix"
    placeholder="My placeholder..."
    spaced
    value=""
  >
    <template v-slot:prefix>RC-</template>
    <template v-slot:suffix>
      <div>
        <AbritesIcon icon="lock" />
      </div>
    </template>
  </AbritesInput>
`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/input/Input.vue`"
      target="_blank"
      rel="noopener"
      >AbritesInput</a
    >
    <span>&lt;abrites-input&gt;&lt;/abrites-input&gt;</span>
  </h2>

  <p>Renders stylized input or textarea. Supports <code>v-model</code>.</p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>value</strong> <code>number | string</code>
      <p>
        Value of the input field. Regretvully vue does not sypport generics.
      </p>
    </li>
    <li>
      <strong>label?</strong> <code>string</code>
      <p>Label of the input field.</p>
    </li>
    <li>
      <strong>placeholder?</strong> <code>string</code>
      <p>
        Placeholder of the input field (visible only when <code>value</code> is
        empty).
      </p>
    </li>
    <li>
      <strong>hint?</strong> <code>string</code>
      <p>Additional text placed below the input field.</p>
    </li>
    <li>
      <strong>error?</strong> <code>string | string[]</code>
      <p>Error message of the input field.</p>
    </li>
    <li>
      <strong>type?</strong> <code>string</code>
      <p>
        Type of the input field, eg. <code>'text'</code>, <code>'email'</code>,
        etc. (default to <code>'text'</code>). Check the
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#%3Cinput%3E_types"
          target="_blank"
          rel="noopener"
          >html5 specification</a
        >
        for list of supported values. <br />
        This is ignored if <code>rows</code> > 1.
      </p>
    </li>
    <li>
      <strong>step?</strong> <code>number</code>
      <p>
        Specify the granularity that the value must adhere for numeric input
        types. Works only with the following input types:
        <code>'date'</code>, <code>'month'</code>, <code>'week'</code>,
        <code>'time'</code>, <code>'number'</code>, <code>'range'</code>.
      </p>
    </li>
    <li>
      <strong>min?</strong> <code>number</code>
      <p>
        Specify <code>[minlength]</code> or <code>min</code> attribute value
        depending on the input type.
      </p>
    </li>
    <li>
      <strong>max?</strong> <code>number</code>
      <p>
        Specify <code>[maxlength]</code> or <code>max</code> attribute value
        depending on the input type.
      </p>
    </li>
    <li>
      <strong>rows?</strong> <code>number</code>
      <p>
        Set to largen than <code>1</code> to render multiline input, aka.
        textarea (default to <code>1</code>).
      </p>
    </li>
    <li>
      <strong>tabindex?</strong> <code>number</code>
      <p>Number for the sequential keyboard/focus navigation.</p>
    </li>
    <li>
      <strong>autofocus?</strong> <code>boolean</code>
      <p>Set the <code>[autofocus]</code> attribute of the input field.</p>
    </li>
    <li>
      <strong>autocomplete?</strong> <code>string</code>
      <p>Set the <code>[autocomplete]</code> attribute of the input field.</p>
    </li>
    <li>
      <strong>readonly?</strong> <code>boolean</code>
      <p>Mark the input field as readonly (default to <code>false</code>).</p>
    </li>
    <li>
      <strong>disabled?</strong> <code>boolean</code>
      <p>Disable the input field (default to <code>false</code>).</p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>@update:${type}</strong> <code>number | string</code>
      <p>
        Fired on input value change. Receives the new input value as an
        argument.
      </p>
    </li>
    <li>
      <strong>blur</strong> <code>Event</code>
      <p>Fired on input blur/focusout.</p>
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
    <li><code>[dense]</code>, <code>.dense</code></li>
    <li><code>[spaced]</code>, <code>.spaced</code></li>
    <li><code>[noborder]</code>, <code>.noborder</code></li>
  </ul>
  <h3 class="section-title" id="examples">Examples</h3>

  <Preview title="Default" :htmlExample="htmlSimpleExample" />

  <Preview title="Default" :htmlExample="htmlStatesExample" />

  <Preview title="Default" :htmlExample="htmlTypesExample" />

  <Preview title="Default" :htmlExample="htmlSlotsExample" />
</template>
