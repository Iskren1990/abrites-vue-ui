<script lang="ts" setup>
import { Preview } from "./shared/index";
import * as Config from "../utils/app-config";

const htmlColorsExample = `
<AbritesTag>Default tag</AbritesTag>
<AbritesTag accent>Accent tag</AbritesTag>
<AbritesTag danger>Danger tag</AbritesTag>
<AbritesTag success>Success tag</AbritesTag>
<AbritesTag warning>Warning tag</AbritesTag>
<AbritesTag light>Light tag</AbritesTag>
<AbritesTag dark>Dark tag</AbritesTag>
`;

const htmlSizesExample = `
<AbritesTag large>Large</AbritesTag>
<AbritesTag>Default</AbritesTag>
<AbritesTag small>Small</AbritesTag>
`;

const htmlMinWidthExample = `
<AbritesTag wide accent>Wide</AbritesTag>
<AbritesTag wider danger>Wider</AbritesTag>
`;

const htmlIconsExample = `
<!-- large size -->
<div class="flex-clear">
  <AbritesTag large>
    <AbritesIcon icon="mail"></AbritesIcon>
    <span class="txt">Large 1</span>
  </AbritesTag>

  <AbritesTag large>
    <span class="txt">Large 2</span>
    <AbritesIcon icon="done"></AbritesIcon>
  </AbritesTag>

  <AbritesTag large>
    <AbritesIcon icon="vpn_key"></AbritesIcon>
    <span class="txt">Large 3</span>
    <AbritesIcon icon="lock"></AbritesIcon>
  </AbritesTag>
</div>

<!-- default size -->
<div class="flex-clear">
  <AbritesTag>
    <AbritesIcon icon="mail"></AbritesIcon>
    <span class="txt">Default 1</span>
  </AbritesTag>

  <AbritesTag>
    <span class="txt">Default 2</span>
    <AbritesIcon icon="done"></AbritesIcon>
  </AbritesTag>

  <AbritesTag>
    <AbritesIcon icon="vpn_key"></AbritesIcon>
    <span class="txt">Default 3</span>
    <AbritesIcon icon="lock"></AbritesIcon>
  </AbritesTag>
</div>

<!-- small size -->
<div class="flex-clear">
  <AbritesTag small>
    <AbritesIcon icon="mail"></AbritesIcon>
    <span class="txt">Small 1</span>
  </AbritesTag>

  <AbritesTag small>
    <span class="txt">Small 2</span>
    <AbritesIcon icon="done"></AbritesIcon>
  </AbritesTag>

  <AbritesTag small>
    <AbritesIcon icon="vpn_key"></AbritesIcon>
    <span class="txt">Small 3</span>
    <AbritesIcon icon="lock"></AbritesIcon>
  </AbritesTag>
</div>
`;

const htmlButtonsExample = `
<!-- large size -->
<div class="flex-clear">
  <AbritesTag large>
    <AbritesButton>
      <AbritesIcon icon="mail"></AbritesIcon>
    </AbritesButton>
    <span class="txt">Large 1</span>
  </AbritesTag>

  <AbritesTag large>
    <span class="txt">Large 2</span>
    <AbritesButton>
      <AbritesIcon icon="arrow_forward"></AbritesIcon>
    </AbritesButton>
  </AbritesTag>

  <AbritesTag large>
    <AbritesButton danger>
      <AbritesIcon icon="remove"></AbritesIcon>
    </AbritesButton>
    <span class="txt">Large 3</span>
    <AbritesButton success>
      <AbritesIcon icon="add"></AbritesIcon>
    </AbritesButton>
  </AbritesTag>
</div>

<!-- default size -->
<div class="flex-clear">
  <AbritesTag>
    <AbritesButton>
      <AbritesIcon icon="mail"></AbritesIcon>
    </AbritesButton>
    <span class="txt">Default 1</span>
  </AbritesTag>

  <AbritesTag>
    <span class="txt">Default 2</span>
    <AbritesButton>
      <AbritesIcon icon="arrow_forward"></AbritesIcon>
    </AbritesButton>
  </AbritesTag>

  <AbritesTag>
    <AbritesButton danger>
      <AbritesIcon icon="remove"></AbritesIcon>
    </AbritesButton>
    <span class="txt">Default 3</span>
    <AbritesButton success>
      <AbritesIcon icon="add"></AbritesIcon>
    </AbritesButton>
  </AbritesTag>
</div>

<!-- small size -->
<div class="flex-clear">
  <AbritesTag small>
    <AbritesButton>
      <AbritesIcon icon="mail"></AbritesIcon>
    </AbritesButton>
    <span class="txt">Small 1</span>
  </AbritesTag>

  <AbritesTag small>
    <span class="txt">Small 2</span>
    <AbritesButton>
      <AbritesIcon icon="arrow_forward"></AbritesIcon>
    </AbritesButton>
  </AbritesTag>

  <AbritesTag small>
    <AbritesButton danger>
      <AbritesIcon icon="remove"></AbritesIcon>
    </AbritesButton>
    <span class="txt">Small 3</span>
    <AbritesButton success>
      <AbritesIcon icon="add"></AbritesIcon>
    </AbritesButton>
  </AbritesTag>
</div>
`;

const htmlFontSizeExample = `
<AbritesTag lowercase>Lower Case</AbritesTag>
<AbritesTag notransform>Not Transformed</AbritesTag>
<AbritesTag >Default</AbritesTag>
`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/tag/Tag.vue`"
      target="_blank"
      rel="noopener"
      >AbritesTag</a
    >
    <span>&lt;AbritesTag&gt;&lt;/AbritesTag&gt;</span>
  </h2>

  <h3 class="section-title" id="slots">Slots</h3>
  <p>The following slots (aka. <code>slot</code>) are available:</p>
  <ul>
    <li>
      <strong>default selector (v-slot:default)</strong>
      <p>The tag content.</p>
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
    <li><code>[small]</code>, <code>.small</code></li>
    <li><code>[large]</code>, <code>.large</code></li>
    <li><code>[wide]</code>, <code>.wide</code></li>
    <li><code>[wider]</code>, <code>.wider</code></li>
    <li><code>[notransform]</code>, <code>.notransform</code></li>
    <li><code>[lowercase]</code>, <code>.lowercase</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview title="Colors" :htmlExample="htmlColorsExample"> </Preview>

  <Preview title="Min width" :htmlExample="htmlMinWidthExample"> </Preview>

  <Preview title="Sizes" :htmlExample="htmlSizesExample"> </Preview>

  <Preview title="With icon(s)" :htmlExample="htmlIconsExample"> </Preview>

  <Preview title="With button(s)" :htmlExample="htmlButtonsExample"> </Preview>

  <Preview title="Font Size" :htmlExample="htmlFontSizeExample"> </Preview>
</template>
