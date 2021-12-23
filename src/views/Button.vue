<script lang="ts" setup>
import { Preview } from "./shared/Preview.vue";

const filledExample = `
  <AbritesButton>Default</AbritesButton>
  <AbritesButton accent>Accent</AbritesButton>
  <AbritesButton danger>Danger</AbritesButton>
  <AbritesButton success>Success</AbritesButton>
  <AbritesButton warning>Warning</AbritesButton>
  <AbritesButton light>Light</AbritesButton>
  <AbritesButton dark>Dark</AbritesButton>
  <!-- icons -->
  <AbritesButton>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton accent>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton danger>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton success>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton warning>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton light>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton dark>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
`;

const flatExample = `
  <AbritesButton flat>Default</AbritesButton>
  <AbritesButton flat accent>Accent</AbritesButton>
  <AbritesButton flat danger>Danger</AbritesButton>
  <AbritesButton flat success>Success</AbritesButton>
  <AbritesButton flat warning>Warning</AbritesButton>
  <AbritesButton flat light>Light</AbritesButton>
  <AbritesButton flat dark>Dark</AbritesButton>
  <!-- icons -->
  <AbritesButton flat>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton flat accent>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton flat danger>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton flat success>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton flat warning>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton flat light>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton flat dark>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
`;

const roundFilledExample = `
  <AbritesButton round>Default</AbritesButton>
  <AbritesButton round accent>Accent</AbritesButton>
  <AbritesButton round danger>Danger</AbritesButton>
  <AbritesButton round success>Success</AbritesButton>
  <AbritesButton round warning>Warning</AbritesButton>
  <AbritesButton round light>Light</AbritesButton>
  <AbritesButton round dark>Dark</AbritesButton>
  <!-- icons -->
  <AbritesButton round>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round accent>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round danger>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round success>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round warning>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round light>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round dark>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
`;

const roundFlatExample = `
  <AbritesButton round flat>Default</AbritesButton>
  <AbritesButton round flat accent>Accent</AbritesButton>
  <AbritesButton round flat danger>Danger</AbritesButton>
  <AbritesButton round flat success>Success</AbritesButton>
  <AbritesButton round flat warning>Warning</AbritesButton>
  <AbritesButton round flat light>Light</AbritesButton>
  <AbritesButton round flat dark>Dark</AbritesButton>
  <!-- icons -->
  <AbritesButton round flat>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round flat accent>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round flat danger>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round flat success>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round flat warning>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round flat light>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round flat dark>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
`;

const textAndIconExample = `
  <AbritesButton large>
    <span class="txt">Large</span>
    <AbritesIcon icon="arrow_forward"></AbritesIcon>
  </AbritesButton>
  <AbritesButton>
    <AbritesIcon icon="arrow_back"></AbritesIcon>
    <span class="txt">Default</span>
  </AbritesButton>
  <AbritesButton small>
    <AbritesIcon icon="lock"></AbritesIcon>
    <span class="txt">Small</span>
  </AbritesButton>
  <!-- round -->
  <AbritesButton round large>
    <span class="txt">Large</span>
    <AbritesIcon icon="arrow_forward"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round>
    <AbritesIcon icon="arrow_back"></AbritesIcon>
    <span class="txt">Default</span>
  </AbritesButton>
  <AbritesButton round small>
    <AbritesIcon icon="lock"></AbritesIcon>
    <span class="txt">Small</span>
  </AbritesButton>
`;

const fadedExample = `
  <AbritesButton faded large>Large</AbritesButton>
  <AbritesButton faded>Default</AbritesButton>
  <AbritesButton faded small>Small</AbritesButton>
  <!-- icons -->
  <AbritesButton faded round large>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton faded round>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton faded round small>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
`;

const disabledExample = `
  <AbritesButton disabled large>Large</AbritesButton>
  <AbritesButton disabled>Default</AbritesButton>
  <AbritesButton disabled small>Small</AbritesButton>
  <!-- icons -->
  <AbritesButton disabled round large>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton disabled round>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton disabled round small>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
`;

const sizesExample = `
  <AbritesButton large>Large</AbritesButton>
  <AbritesButton>Default</AbritesButton>
  <AbritesButton small>Small</AbritesButton>
  <!-- icons -->
  <AbritesButton round large>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton round small>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
`;

const minWidthExample = `
  <AbritesButton wide>
    <span class="txt">Wide</span>
    <AbritesIcon icon="arrow_forward"></AbritesIcon>
  </AbritesButton>
  <AbritesButton wider>
    <span class="txt">Wider</span>
    <AbritesIcon icon="arrow_forward"></AbritesIcon>
  </AbritesButton>
  <AbritesButton block>
    <span class="txt">Block</span>
    <AbritesIcon icon="arrow_forward"></AbritesIcon>
  </AbritesButton>
`;

const loadingExample = `
  <AbritesButton loading large>Large</AbritesButton>
  <AbritesButton loading>Default</AbritesButton>
  <AbritesButton loading small>Small</AbritesButton>
  <!-- icons -->
  <AbritesButton loading round large>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton loading round>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
  <AbritesButton loading round small>
    <AbritesIcon icon="mail"></AbritesIcon>
  </AbritesButton>
`;

const buttonsGroupExample = `
  <div class="buttons-group">
    <AbritesButton>Button 1</AbritesButton>
    <AbritesButton>Button 2</AbritesButton>
    <AbritesButton>Button 3</AbritesButton>
  </div>

  <div class="buttons-group round">
    <AbritesButton>Button 1</AbritesButton>
    <AbritesButton>Button 2</AbritesButton>
    <AbritesButton>Button 3</AbritesButton>
  </div>

  <div class="buttons-group disabled">
    <AbritesButton>Button 1</AbritesButton>
    <AbritesButton>Button 2</AbritesButton>
    <AbritesButton>Button 3</AbritesButton>
  </div>

  <div class="buttons-group block">
    <AbritesButton>Button 1</AbritesButton>
    <AbritesButton>Button 2</AbritesButton>
    <AbritesButton>Button 3</AbritesButton>
  </div>
`;
</script>

<template>
  <div>Button</div>
  <h2 class="component-title" id="selector">
    <a
      href="${Config.componentsUrl}/lib/button/button:scriptExample target="
      _blank
      rel="noopener"
      >AbritesButton</a
    >
    <span>{{ `<AbritesButton></AbritesButton>` }}</span>
  </h2>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>submit</strong> <code>boolean</code>
      <p>
        Whether clicking on the button should submit a form (equivalent to
        <code>{{`<button type="submit"></button>`}}</code>) (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>disabled</strong> <code>boolean</code>
      <p>
        Mark the button as disabled. This will disable also all pointer events
        (default to <code>false</code>).
      </p>
    </li>
    <li>
      <strong>loading</strong> <code>boolean</code>
      <p>
        Display a spinning loader on top of the button content (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>link</strong> <code>string</code>
      <p>
        Will render <code>{{`<a :href="link"></a>`}}</code> tag with the input
        value. The trigger callback will be ignored.
      </p>
    </li>
    <li>
      <strong>continuous</strong> <code>boolean</code>
      <p>Periodic call the button trigger callback on mouse hold.</p>
    </li>
    <li>
      <strong>continuousDelay</strong> <code>number</code>
      <p>
        Interval in ms between each <code>continuous</code> periodic call
        (default to <code>300</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>trigger</strong> <code>Event</code>
      <p>
        Fired when the button is activated via click, tap, enter/space key
        press. This is ignored if the <code>link</code> property is set.
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
    <li><code>[faded]</code>, <code>.faded</code></li>
    <li><code>[round]</code>, <code>.round</code></li>
    <li><code>[flat]</code>, <code>.flat</code></li>
    <li><code>[small]</code>, <code>.small</code></li>
    <li><code>[large]</code>, <code>.large</code></li>
    <li><code>[wide]</code>, <code>.wide</code></li>
    <li><code>[wider]</code>, <code>.wider</code></li>
    <li><code>[block]</code>, <code>.block</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview title="Filled (default)" :htmlExample="filledExample"> </Preview>

  <Preview title="Flat" :htmlExample="flatExample"> </Preview>

  <Preview title="Round Filled" :htmlExample="roundFilledExample"> </Preview>

  <Preview title="Round Flat" :htmlExample="roundFlatExample"> </Preview>

  <Preview title="Sizes" :htmlExample="sizesExample"> </Preview>

  <Preview title="Loading" :htmlExample="loadingExample"> </Preview>

  <Preview title="Faded" :htmlExample="fadedExample"> </Preview>

  <Preview title="Disabled" :htmlExample="disabledExample"> </Preview>

  <Preview title="Text and Icon" :htmlExample="textAndIconExample"> </Preview>

  <Preview title="Min width" :htmlExample="minWidthExample"> </Preview>

  <Preview title="Buttons group" :htmlExample="buttonsGroupExample"> </Preview>
</template>

<style></style>
