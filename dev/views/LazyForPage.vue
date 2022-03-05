<script lang="ts" setup>
import * as Config from "../utils/app-config";
import { Preview } from "./shared";

import { ref } from "vue";

const htmlDefaultExample = `
  <AbritesLazyFor @end="alert" :items="list" :maxInitial="10" ref="lazyRef">
    <div v-for="item of lazyRef?.activeItems" :key="item" class="item">
      Example list item {{ item + 1 }}...
    </div>
  </AbritesLazyFor>
`;

const imports = ["import { ref } from 'vue';"];

const setup = () => {
  const list = new Array(200).fill(1).map((_, i) => i);
  const lazyRef = ref();
  const alert = (e: unknown) => window.alert(e);
  return { list, lazyRef, alert };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/lazy-for/LazyFor.vue`"
      target="_blank"
      rel="noopener"
      >AbritesLazyFor</a
    >
    <span>&lt;AbritesLazyFor&gt;&lt;/AbritesLazyFor&gt;</span>
  </h2>
  <p>
    Simple component implementing
    <a
      href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"
      target="_blank"
      rel="noopener"
      ><code>IntersectionObserver</code>.</a
    >
  </p>
  <p>Works with two modes:</p>
  <ul>
    <li>
      <h5>Custom</h5>
      <p>
        On each intersection including the innitial "nextBatch" event is being
        emmited.
      </p>
      <p>One can use it to control what is being rendered.</p>
      <p>
        Component is using that mode by default if no "items" prop is passed.
      </p>
    </li>
    <li>
      <h5>Out Of The Box</h5>
      <p>Requires "items" prop to be passed.</p>
      <p>
        Generates a slice from the provided list to "lazy" iterate over it. The
        next loading batch is triggered when the viewport reaches the last slice
        element.
      </p>
      <p>
        The slice could be accessed via the <code>activeItems</code> component
        getter.
      </p>
      <p>
        Due to the <code>(end)</code> event, the component could be used also as
        a way to implement infinity scroll.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>items?</strong> <code>unknown[]</code>
      <p>List with all items to lazy iterate.</p>
    </li>
    <li>
      <strong>maxInitial?</strong> <code>number</code>
      <p>
        How many items to load on initial rendering (default to <code>0</code>).
        Skip if you want to render all passed items.
      </p>
    </li>
    <li>
      <strong>increment?</strong> <code>number</code>
      <p>
        How many items to reveal per load batch (default to <code>20</code>).
      </p>
    </li>
    <li>
      <strong>intersectionObserverOptions?</strong>
      <code>IntersectionObserverInit</code>
      <p>Object wint the natiwe IntersectionObserver configurations.</p>
    </li>
  </ul>

  <h3 class="section-title" id="events">Events</h3>
  <ul>
    <li>
      <strong>nextBatch</strong> <code>void</code>
      <p>Fired when target/monitored element is in viewport reach.</p>
    </li>
    <li>
      <strong>end</strong> <code>number</code>
      <p>
        Fired when all <code>items</code> are loaded and the user has reached
        the end of the slice. Receives the total loaded items count as an
        argument.
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview
    title="Default"
    :htmlExample="htmlDefaultExample"
    :vueExample="`${setup}`"
    :setupFn="setup"
    :imports="imports"
  />
</template>

<style lang="scss" scoped>
::v-deep() .item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  padding: 10px;
  background: #27282b;
}
</style>
