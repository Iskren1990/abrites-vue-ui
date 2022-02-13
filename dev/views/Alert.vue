<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/alert/Alert.vue`"
      target="_blank"
      rel="noopener"
      >AbritesAlert</a
    >
    <span>{{'<AbritesAlert></AbritesAlert>'}}</span>
  </h2>

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
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>

  <Preview title="Colors Example" :htmlExample="htmlColorsExample"> </Preview>
</template>

<script lang="ts">
import * as Config from "../utils/app-config";
import { Preview } from "./shared";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "AlertPage",
  components: { Preview },
  data() {
    return {
      Config,
      htmlColorsExample: `
    <AbritesAlert>
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAlert>
    
    <AbritesAlert accent>
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAlert>
    
    <AbritesAlert danger>
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAlert>
    
    <AbritesAlert success>
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAlert>
    
    <AbritesAlert warning>
      <p>Lorem ipsum dolor sit amet...</p>
    </AbritesAlert>
`,
    };
  },
});
</script>

<style></style>
