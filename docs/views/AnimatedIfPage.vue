<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/animatedif/AnimatedIf.vue`"
      target="_blank"
      rel="noopener"
      >AbritesAnimatedIf</a
    >
    <span
      ><code> &lt;AbritesAmimatedIf&gt;&lt;/AbritesAmimatedIf&gt;</code></span
    >
  </h2>

  <h3 class="section-title" id="inputs">Inputs</h3>

  <ul>
    <li>
      <strong>visible</strong> <code>boolean</code>
      <p>
        Main input used to register the directive. If set to true it forces
        rendering the template (default to <code>false</code>).
      </p>
    </li>
    <li>
      <strong>speed?</strong> <code>string</code>
      <p>
        Interval in ms for the slide up/down animation (default to
        <code>200</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <p>
        Fired after slide up/down. Receives the current visibility state as an
        argument.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview
    title="AbritesAnimatedIf"
    :htmlExample="htmlExample"
    :codeExample="codeExample"
    :impoirt="impoirt"
    :setupFn="setupFn"
  />

  <Preview
    title="With Speed"
    :htmlExample="htmlSpeedExample"
    :codeExample="codeExample"
    :impoirt="impoirt"
    :setupFn="setupFn"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Preview } from "./shared/index";
import * as Config from "../utils/app-config";

const htmlExample = `
  <div>
    <AbritesButton @trigger="toggle()">Toggle content</AbritesButton>

    <AbritesAmimatedIf :visible="visible" class="content flex-clear">
  
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>
  
    </AbritesAmimatedIf>
  </div>
  `;
const htmlSpeedExample = `
  <div>
    <AbritesButton @trigger="toggle()">Toggle content</AbritesButton>

    <AbritesAmimatedIf :visible="visible" :speed="4000" class="content flex-clear">

      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>

    </AbritesAmimatedIf>
  </div>
`;
const codeExample = `,
    setup(props, ctx) {
        const visible = ref(false);
        const toggle = () => {
          visible.value = !visible.value;
        };
        return { toggle, visible };
      },
    `;

const impoirt = ['import { ref } from "vue";'];

const setupFn = function () {
  const visible = ref(false);
  const toggle = () => {
    visible.value = !visible.value;
  };
  return { visible, toggle };
};
</script>
