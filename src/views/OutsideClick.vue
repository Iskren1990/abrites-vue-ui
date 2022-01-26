<script lang="ts" setup>
import { ref } from "vue";
import Config from "../utils/app-config";
import { Preview } from "./shared/Preview.vue";

const htmlExample = `
  <span v-abrites-outside-click="onOutsideClick" class="container">
    Outside clicked {{ count }}
  </span>
  `;

const imports = ["import { ref } from 'vue';"];

const setup = () => {
  const count = ref(0);
  const onOutsideClick = () => {
    count.value++;
  };

  return { count, onOutsideClick };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/directives/OutsideClick.ts`"
      target="_blank"
      rel="noopener"
      >AbritesOutsideClick</a
    >
    <span>v-abrites-outside-click</span>
  </h2>

  <p>
    Directive to execute a callback when the user click/tap outside of a
    container.
  </p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>v-abrites-outside-click</strong> <code>() => any</code>
      <p>
        Callback to execute. To prevent unnecessary calls it is recommended to
        use it with a ternary condition (eg. `v-abrites-outside-click="isTrue ?
        myCallback : null"`).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview
    :htmlExample="htmlExample"
    :vueExample="setup"
    :setupFn="setup"
    :imports="imports"
  />
</template>

<style lang="scss" scoped>
::v-deep() .container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: red;
  min-width: 300px;
  min-height: 300px;
  color: #fff;
  width: unset;
}
</style>
