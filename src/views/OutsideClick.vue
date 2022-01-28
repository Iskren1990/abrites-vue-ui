<script lang="ts" setup>
import { onUnmounted, ref } from "vue";
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

const htmlConditionExample = `
  <div v-abrites-outside-click="() => (isActive ? onOutsideClick : null)" class="container">
    <div>
      Outside clicked {{ count }}
    </div>
    <div>
      Is directive callback active {{ isActive }}
    </div>
  </div>
  `;

const setupWithCondition = () => {
  const isActive = ref(false);
  const interval = setInterval(() => (isActive.value = !isActive.value), 3000);
  const count = ref(0);
  const onOutsideClick = () => {
    count.value++;
  };

  onUnmounted(() => clearInterval(interval));

  return { count, onOutsideClick, isActive };
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
        use it with a function expresion (eg. `v-abrites-outside-click="() =>
        isTrue ? myCallback : null"`).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview
    title="Default"
    :htmlExample="htmlExample"
    :scriptExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />

  <Preview
    title="Conditional"
    :htmlExample="htmlConditionExample"
    :scriptExample="`${setupWithCondition}`"
    :setupFn="setupWithCondition"
    :imports="imports"
  />
</template>

<style lang="scss" scoped>
::v-deep() .container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background: rgb(255, 0, 0);
  min-width: 300px;
  min-height: 300px;
  color: #000000;
  width: unset;
}
</style>
