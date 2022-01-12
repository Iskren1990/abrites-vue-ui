<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/lib/animated_if/AnimatedIf.dart`"
      target="_blank"
      rel="noopener"
      >AbritesAnimatedIf</a
    >
    <span>*abritesAnimatedIf, [abritesAnimatedIf]</span>
  </h2>

  <p>
    Structural component similar to <code>NgIf</code> directive but with slide
    down/up animation.
  </p>

  <abrites-alert warning>
    Styling can be achieved by clases property.</abrites-alert
  >

  <h3 class="section-title" id="inputs">Inputs</h3>

  <ul>
    <li>
      <strong>visible</strong> <code>bool</code>
      <p>
        Main input used to register the directive. If set to true it forces
        rendering the template (default to <code>false</code>).
      </p>
    </li>
    <li>
      <strong>speed</strong> <code>String</code>
      <p>
        Interval in ms for the slide up/down animation (default to
        <code>200</code>).
      </p>
    </li>
    <li>
      <p>
        To pass both simply set them as object
        <code> v-abrites-animated-if="{ visible: true, speed: '300' }" </code>
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <!-- <strong>abritesAnimatedIfEnd</strong> <code>{{`Stream<bool>`}}</code> -->
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

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { Preview } from "./shared/Preview.vue";
import Config from "../utils/app-config";

export default defineComponent({
  name: "AnimatedIfPage",
  components: { Preview },

  data() {
    return {
      Config,
      htmlExample: `
  <div>
    <AbritesButton @trigger="toggle()">Toggle content</AbritesButton>

    <AbritesAmimatedIf :visible="visible" classes="content flex-clear">
  
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>
  
    </AbritesAmimatedIf>
  </div>
  `,
      htmlSpeedExample: `
  <div>
    <AbritesButton @trigger="toggle()">Toggle content</AbritesButton>

    <AbritesAmimatedIf :visible="visible" :speed="4000" classes="content flex-clear">

      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Lorem ipsum dolor sit amet...</p>

    </AbritesAmimatedIf>
  </div>
`,
      codeExample: `,
    setup(props, ctx) {
        const visible = ref(false);
        const toggle = () => {
          visible.value = !visible.value;
        };
        return { toggle, visible };
      },
    `,
      impoirt: ['import { ref } from "vue";'],
      setupFn: function () {
        const visible = ref(false);
        const toggle = () => {
          visible.value = !visible.value;
        };
        return { visible, toggle };
      },
    };
  },
});
</script>
