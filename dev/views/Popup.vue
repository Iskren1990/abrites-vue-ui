<script lang="ts" setup>
import { Preview } from "./shared/index";
import * as Config from "../utils/app-config";
import { ref } from "vue";

const htmlSizesExample = `
<AbritesButton @trigger="largeSizePopup.open()">Large size popup</AbritesButton>
<AbritesButton @trigger="defaultSizePopup.open()">Default size popup</AbritesButton>
<AbritesButton @trigger="smallSizePopup.open()">Small size popup</AbritesButton>

<AbritesPopup ref="largeSizePopup" popupClass="large">
  <div class="popup-header">My popup title</div>
  <div class="popup-content">
    <p>Lorem ipsum dolor sit amet...</p>
  </div>
  <div class="popup-footer">
    <AbritesButton flat light @trigger="largeSizePopup.close()">Close</AbritesButton>
  </div>
</AbritesPopup>

<AbritesPopup ref="defaultSizePopup">
  <div class="popup-header">My popup title</div>
  <div class="popup-content">
    <p>Lorem ipsum dolor sit amet...</p>
  </div>
  <div class="popup-footer">
    <AbritesButton flat light @trigger="defaultSizePopup.close()">Close</AbritesButton>
  </div>
</AbritesPopup>

<AbritesPopup ref="smallSizePopup" popupClass="small">
  <div class="popup-header">My popup title</div>
  <div class="popup-content">
    <p>Lorem ipsum dolor sit amet...</p>
  </div>
  <div class="popup-footer">
    <AbritesButton flat light @trigger="smallSizePopup.close()">Close</AbritesButton>
  </div>
</AbritesPopup>
`;

const deferredExample = `
<AbritesButton @trigger="deferredPopup.open()">With deferred content</AbritesButton>

<AbritesPopup ref="deferredPopup">
    <div class="popup-header">My popup title</div>
    <div class="popup-content">
      <div class="scroll-content">
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
      </div>
    </div>
    <div class="popup-footer">
      <AbritesButton flat light @trigger="deferredPopup.close()">Close</AbritesButton>
      <AbritesButton accent>Some action</AbritesButton>
    </div>
</AbritesPopup>
`;

const imports = ["import { ref } from 'vue';"];

const sizeFn = () => {
  const smallSizePopup = ref();
  const defaultSizePopup = ref();
  const largeSizePopup = ref();
  return { smallSizePopup, defaultSizePopup, largeSizePopup };
};

const defferedFn = () => {
  const deferredPopup = ref();
  return { deferredPopup };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/popup/Popup.vue`"
      target="_blank"
      rel="noopener"
      >AbritesPopup</a
    >
    <span>&lt;AbritesPopup&gt;&lt;/AbritesPopup&gt;</span>
  </h2>

  <p>
    Simple dropdown toggle component, that is absolute positioned to its closest
    parent. Usually used as a child of
    <code>&lt;abrites-button&gt;&lt;/abrites-button&gt;</code>.
  </p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>opened?</strong> <code>boolean</code>
      <p>Open/close state of the popup (default to <code>false</code>).</p>
    </li>
    <li>
      <strong>preventOverlayClose?</strong> <code>boolean</code>
      <p>
        Prevent closing the popup by overlay click/tap (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>preventEscClose?</strong> <code>boolean</code>
      <p>
        Prevent closing the popup by esc key press (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>noCloseButton?</strong> <code>boolean</code>
      <p>
        Hide the close <code>X</code> button from the popup header (default to
        <code>false</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="slots">Exposed Methods</h3>

  <ul>
    <li>
      <strong>open</strong>
      <p>Opens the popup.</p>
    </li>
    <li>
      <strong>close</strong> <code>{ delay = 200 } = {}</code>
      <p>
        Close the popup, optional argument "delay" in miliseconds (default to
        <code>200</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>beforeOpenCtrl</strong>
      <p>Fired right before the popup open procedure.</p>
    </li>
    <li>
      <strong>openCtrl</strong>
      <p>Fired after the popup open procedure.</p>
    </li>
    <li>
      <strong>beforeCloseCtrl</strong>
      <p>Fired right before the popup close procedure.</p>
    </li>
    <li>
      <strong>closeCtrl</strong>
      <p>Fired after the popup close procedure.</p>
    </li>
  </ul>

  <h3 class="section-title" id="slots">Slots</h3>
  <p>
    The content of the popup is up to the user. However the following predefined
    container elements could be used:
  </p>
  <ul>
    <li>
      <code>&lt;div class="popup-header"&gt;...&lt;/div&gt;</code>
    </li>
    <li>
      <code>&lt;div class="popup-content"&gt;...&lt;/div&gt;</code>
    </li>
    <li>
      <code>&lt;div class="popup-footer"&gt;...&lt;/div&gt;</code>
      <p>
        Footer elements are usually buttons and by default they are aligned to
        the right side of the popup. Optionally you can combine
        <code>.popup-footer</code> with the following classes:
      </p>
      <ul>
        <li>
          <code>.dense</code> (<code>class="popup-footer dense"</code>) - sets
          smaller padding (could be used with flat button styles for visual
          alignment with the content)
        </li>
        <li>
          <code>.nogutter</code> (<code>class="popup-footer nogutter"</code>) -
          removes all padding and makes all buttons to have equal width (could
          be used with Yes/No/Confirmation popups)
        </li>
      </ul>
    </li>
  </ul>

  <h3 class="section-title" id="slots">Style</h3>

  <li>
    <p>
      Optional css class to add to the popup container. The following predefined
      classes could be used: <code>.small</code> and
      <code>.large</code>
    </p>
    <p>
      <code
        >&lt;AbritesPopup class="class1, class2
        ..."&gt;&lt;/AbritesPopup&gt;</code
      >
    </p>
  </li>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview
    title="Sizes"
    :htmlExample="htmlSizesExample"
    :scriptExample="`${sizeFn}`"
    :setupFn="sizeFn"
    :imports="imports"
  >
  </Preview>

  <Preview
    title="Deferred content"
    :htmlExample="deferredExample"
    :scriptExample="`${defferedFn}`"
    :setupFn="defferedFn"
    :imports="imports"
  >
  </Preview>
</template>
