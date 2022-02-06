<script lang="ts" setup>
import { Preview } from "./shared/Preview.vue";
import Config from "../utils/app-config";
import { ref } from "vue";

const htmlVariantsExample = `
<AbritesButton>
  <span class="txt">Default</span>
  <AbritesDropdown bottom-left>
    <a :href="'#'" class="dropdown-item">Item 1</a>
    <a :href="'#'" class="dropdown-item">Item 2</a>
    <a :href="'#'" class="dropdown-item">Item 3</a>
  </AbritesDropdown>
</AbritesButton>

<AbritesButton>
  <span class="txt">Dark</span>
  <AbritesDropdown dark bottom-left>
    <a :href="'#'" class="dropdown-item">Item 1</a>
    <a :href="'#'" class="dropdown-item">Item 2</a>
    <a :href="'#'" class="dropdown-item">Item 3</a>
  </AbritesDropdown>
</AbritesButton>

<AbritesButton>
  <span class="txt">Popover</span>
  <AbritesDropdown popover bottom-left>
    <a :href="'#'" class="dropdown-item">Item 1</a>
    <a :href="'#'" class="dropdown-item">Item 2</a>
    <a :href="'#'" class="dropdown-item">Item 3</a>
  </AbritesDropdown>
</AbritesButton>
`;

const htmlPositionsExample = `
<!-- bottom positions -->
<AbritesButton>
  <span class="txt">Bottom-left dropdown</span>
  <AbritesDropdown bottom-left>
    <a :href="'#'" class="dropdown-item">Item 1</a>
    <a :href="'#'" class="dropdown-item">Item 2</a>
    <a :href="'#'" class="dropdown-item">Item 3</a>
  </AbritesDropdown>
</AbritesButton>

<AbritesButton>
  <span class="txt">bottom-center dropdown</span>
  <AbritesDropdown bottom>
    <a :href="'#'" class="dropdown-item">Item 1</a>
    <a :href="'#'" class="dropdown-item">Item 2</a>
    <a :href="'#'" class="dropdown-item">Item 3</a>
  </AbritesDropdown>
</AbritesButton>

<AbritesButton>
  <span class="txt">bottom-right dropdown</span>
  <AbritesDropdown bottom-right>
    <a :href="'#'" class="dropdown-item">Item 1</a>
    <a :href="'#'" class="dropdown-item">Item 2</a>
    <a :href="'#'" class="dropdown-item">Item 3</a>
  </AbritesDropdown>
</AbritesButton>

<AbritesButton>
  <span class="txt">bottom-block dropdown</span>
  <AbritesDropdown bottom block>
    <a :href="'#'" class="dropdown-item">Item 1</a>
    <a :href="'#'" class="dropdown-item">Item 2</a>
    <a :href="'#'" class="dropdown-item">Item 3</a>
  </AbritesDropdown>
</AbritesButton>

<div class="flex-clear"></div>

<!-- top positions -->
<AbritesButton>
  <span class="txt">top-left dropdown</span>
  <AbritesDropdown top-left>
    <div class="dropdown-item">Item 1</div>
    <div class="dropdown-item">Item 2</div>
    <div class="dropdown-item">Item 3</div>
  </AbritesDropdown>
</AbritesButton>

<AbritesButton>
  <span class="txt">top-center dropdown</span>
  <AbritesDropdown top>
    <div class="dropdown-item">Item 1</div>
    <div class="dropdown-item">Item 2</div>
    <div class="dropdown-item">Item 3</div>
  </AbritesDropdown>
</AbritesButton>

<AbritesButton>
  <span class="txt">top-right dropdown</span>
  <AbritesDropdown top-right>
    <div class="dropdown-item">Item 1</div>
    <div class="dropdown-item">Item 2</div>
    <div class="dropdown-item">Item 3</div>
  </AbritesDropdown>
</AbritesButton>

<AbritesButton>
  <span class="txt">top-block dropdown</span>
  <AbritesDropdown top block>
    <div class="dropdown-item">Item 1</div>
    <div class="dropdown-item">Item 2</div>
    <div class="dropdown-item">Item 3</div>
  </AbritesDropdown>
</AbritesButton>
`;

const htmlIconsExample = `
<AbritesButton>
  <span class="txt">Children with icons</span>
  <AbritesDropdown block>
    <div class="dropdown-item"><AbritesIcon icon="mail"></AbritesIcon>Item 1</div>
    <div class="dropdown-item"><AbritesIcon icon="lock"></AbritesIcon>Item 1</div>
    <div class="dropdown-item"><AbritesIcon icon="backup"></AbritesIcon>Item 3</div>
  </AbritesDropdown>
</AbritesButton>
`;

const htmlChildrenStylesExample = `
<AbritesButton>
  <span class="txt">Simple children styles</span>
  <AbritesDropdown block>
    <div class="dropdown-item">Default style</div>
    <div class="dropdown-item accent">Accent style</div>
    <div class="dropdown-item danger">Danger style</div>
    <div class="dropdown-item warning">Warning style</div>
    <hr />
    <div class="dropdown-item disabled">Disabled style</div>
  </AbritesDropdown>
</AbritesButton>

<AbritesButton>
  <span class="txt">Children with icons styles</span>
  <AbritesDropdown block>
    <div class="dropdown-item"><AbritesIcon icon="mail"></AbritesIcon>Default style</div>
    <div class="dropdown-item accent"><AbritesIcon icon="lock"></AbritesIcon>Accent style</div>
    <div class="dropdown-item danger"><AbritesIcon icon="backup"></AbritesIcon>Danger style</div>
    <div class="dropdown-item warning"><AbritesIcon icon="folder"></AbritesIcon>Warning style</div>
    <hr />
    <div class="dropdown-item disabled"><AbritesIcon icon="do_not_disturb"></AbritesIcon>Disabled style</div>
  </AbritesDropdown>
</AbritesButton>
`;

const htmlHandleExample = `
<strong ref="myHandle" class="txt">Toggle dropdown</strong>

<div class="flex-clear container">
  <p>Lorem ipsum dolor sit amet...</p>
  <p>Lorem ipsum dolor sit amet...</p>
  <p>Lorem ipsum dolor sit amet...</p>

  <AbritesDropdown bottom-left :handle="myHandle">
    <div class="dropdown-item">Item 1</div>
    <div class="dropdown-item">Item 1</div>
    <div class="dropdown-item">Item 3</div>
  </AbritesDropdown>
</div>
`;

const imports = ['import { ref } from "vue";'];

const scriptHandleExample = () => {
  const myHandle = ref<HTMLElement | undefined>();
  return { myHandle };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/lib/dropdown/dropdown.dart`"
      target="_blank"
      rel="noopener"
      >AbritesDropdown</a
    >
    <span>&lt;AbritesDropdown&gt;&lt;/AbritesDropdown&gt;</span>
  </h2>

  <p>
    Simple dropdown toggle component, that is absolute positioned to its closest
    parent. Usually used as a child of
    <code>&lt;AbritesButton&gt;&lt;/AbritesButton&gt;</code>.
  </p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>visible?</strong> <code>boolean</code>
      <p>Show/hide the dropdown (default to <code>false</code>).</p>
    </li>
    <li>
      <strong>contentSelectable?</strong> <code>boolean</code>
      <p>
        Keep the dropdown open on dropdown item's click/tab (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>manual?</strong> <code>boolean</code>
      <p>
        Specify that the dropdown is only progmatically operatable, eg. by
        manually calling the instances show/hide methods (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>handle?</strong> <code>HTMLElement</code>
      <p>
        Dropdown toggle handle. If not set, the component fallbacks to its first
        parent element. This is ignored if <code>manual</code> is set.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>change</strong> <code>boolean</code>
      <p>
        Fired on dropdown visibility change. Receives the new visibility state
        as an argument.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="slots">Slots</h3>
  <p>
    The content of the dropdown is up to the user, but you could add
    <code>.dropdown-item</code> class to the dropdown children (usually
    <code>&lt;div&gt;</code> or <code>&lt;a&gt;</code> tag) to make use of the
    predefined styles.
  </p>
  <p>
    Additionally, it is possible to combine <code>.dropdown-item</code> with the
    following attributes and/or classes:
  </p>
  <ul>
    <li><code>[accent]</code>, <code>.accent</code></li>
    <li><code>[success]</code>, <code>.success</code></li>
    <li><code>[danger]</code>, <code>.danger</code></li>
    <li><code>[warning]</code>, <code>.warning</code></li>
    <li><code>[disabled]</code>, <code>.disabled</code></li>
  </ul>
  <p>
    To visualy separate dropdown items you could add
    <code>&lt;hr /&gt;</code>
    element.
  </p>

  <h3 class="section-title" id="styling">Styling</h3>
  <p>
    The following attributes and/or classes could be used to customize the
    component style:
  </p>
  <ul>
    <li>
      <code>[top]</code>, <code>[top-center]</code>, <code>.top</code>,
      <code>.top-center</code>
    </li>
    <li><code>[top-right]</code>, <code>.top-right</code></li>
    <li><code>[top-left]</code>, <code>.top-left</code></li>
    <li>
      <code>[bottom]</code>, <code>[bottom-center]</code>, <code>.bottom</code>,
      <code>.bottom-center</code>
    </li>
    <li><code>[bottom-right]</code>, <code>.bottom-right</code> (default)</li>
    <li><code>[bottom-left]</code>, <code>.bottom-left</code></li>
    <li><code>[block]</code>, <code>.block</code></li>
    <li><code>[dark]</code>, <code>.dark</code></li>
    <li><code>[popover]</code>, <code>.popover</code></li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview title="Styles" :htmlExample="htmlVariantsExample" />

  <Preview title="Positions" :htmlExample="htmlPositionsExample" />

  <Preview title="With icons" :htmlExample="htmlIconsExample" />

  <Preview title="Children styles" :htmlExample="htmlChildrenStylesExample" />

  <Preview
    title="Custom handle"
    :htmlExample="htmlHandleExample"
    :scriptExample="`${scriptHandleExample}`"
    :setupFn="scriptHandleExample"
    :imports="imports"
  />
</template>

<style>
.container {
  position: relative;
}
</style>
