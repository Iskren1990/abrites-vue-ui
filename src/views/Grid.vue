<script lang="ts" setup>
import { Preview } from "./shared/Preview.vue";
import Config from "../utils/app-config";

const htmlGuttersExample = `
  <AbritesGrid>
    <div class="col-6">
      <div class="content">col-6 content</div>
    </div>
    <div class="col-3">
      <div class="content">col-3 content</div>
    </div>
    <div class="col-3">
      <div class="content">col-3 content</div>
    </div>
  </AbritesGrid>

  <AbritesGrid>
    <div class="col-sm-6">
      <div class="content">(responsive) col-sm-6 content</div>
    </div>
    <div class="col-sm-3">
      <div class="content">(responsive) col-sm-3 content</div>
    </div>
    <div class="col-sm-3">
      <div class="content">(responsive) col-sm-3 content</div>
    </div>
  </AbritesGrid>

  <AbritesGrid>
    <div class="col-md-6">
      <div class="content">(responsive) col-md-6 content</div>
    </div>
    <div class="col-md-3">
      <div class="content">(responsive) col-md-3 content</div>
    </div>
    <div class="col-md-3">
      <div class="content">(responsive) col-md-3 content</div>
    </div>
  </AbritesGrid>

  <AbritesGrid>
    <div class="col-lg-6">
      <div class="content">(responsive) col-lg-6 content</div>
    </div>
    <div class="col-lg-3">
      <div class="content">(responsive) col-lg-3 content</div>
    </div>
    <div class="col-lg-3">
      <div class="content">(responsive) col-lg-3 content</div>
    </div>
  </AbritesGrid>

  <AbritesGrid>
    <div class="col-4 push-2">
      <div class="content">col-4 push-2 content</div>
    </div>
    <div class="col-4">
      <div class="content">col-4 push-2 content</div>
    </div>
  </AbritesGrid>

  <AbritesGrid>
    <div class="col-8 offset-2">
      <div class="content">offset-2 col-8 content</div>
    </div>
  </AbritesGrid>
`;

const htmlNoGuttersExample = `
  <AbritesGrid nogutters>
    <div class="col-6">
      <div class="content">col-6 content</div>
    </div>
    <div class="col-3">
      <div class="content">col-3 content</div>
    </div>
    <div class="col-3">
      <div class="content">col-3 content</div>
    </div>
  </AbritesGrid>

  <AbritesGrid nogutters>
    <div class="col-sm-6">
      <div class="content">(responsive) col-sm-6 content</div>
    </div>
    <div class="col-sm-3">
      <div class="content">(responsive) col-sm-3 content</div>
    </div>
    <div class="col-sm-3">
      <div class="content">(responsive) col-sm-3 content</div>
    </div>
  </AbritesGrid>

  <AbritesGrid nogutters>
    <div class="col-md-6">
      <div class="content">(responsive) col-md-6 content</div>
    </div>
    <div class="col-md-3">
      <div class="content">(responsive) col-md-3 content</div>
    </div>
    <div class="col-md-3">
      <div class="content">(responsive) col-md-3 content</div>
    </div>
  </AbritesGrid>

  <AbritesGrid nogutters>
    <div class="col-lg-6">
      <div class="content">(responsive) col-lg-6 content</div>
    </div>
    <div class="col-lg-3">
      <div class="content">(responsive) col-lg-3 content</div>
    </div>
    <div class="col-lg-3">
      <div class="content">(responsive) col-lg-3 content</div>
    </div>
  </AbritesGrid>

  <AbritesGrid nogutters>
    <div class="col-4 push-2">
      <div class="content">col-4 push-2 content</div>
    </div>
    <div class="col-4">
      <div class="content">col-4 push-2 content</div>
    </div>
  </AbritesGrid>

  <AbritesGrid nogutters>
    <div class="col-8 offset-2">
      <div class="content">offset-2 col-8 content</div>
    </div>
  </AbritesGrid>
`;
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/grid/grid.vue`"
      target="_blank"
      rel="noopener"
      >AbritesGrid</a
    >
    <span>&lt;AbritesGrid&gt;&lt;/AbritesGrid&gt;</span>
  </h2>

  <p>Simple grid component inspired by the Bootstrap 12 columns grid system.</p>

  <p>
    The following "columns" selectors are supported (different responsive
    breakpoints <code>sm</code>, <code>md</code>, <code>lg</code> could be
    combined and set on the same element):
  </p>
  <ul>
    <li>
      <code>.col-auto</code>, <code>.col-sm-auto</code>,
      <code>.col-md-auto</code>, <code>.col-lg-auto</code>
      <p>Auto column sizing.</p>
    </li>
    <li>
      <code>.col-NUMBER</code>, <code>.col-sm-NUMBER</code>,
      <code>.col-md-NUMBER</code>, <code>.col-lg-NUMBER</code>
      <p>Fixed (1-12) column sizing.</p>
    </li>
    <li>
      <code>.offset-NUMBER</code>, <code>.offset-sm-NUMBER</code>,
      <code>.offset-md-NUMBER</code>, <code>.offset-lg-NUMBER</code>
      <p>Move column to right (aka. margin-left) by fixed size (1-12).</p>
    </li>
    <li>
      <code>.push-NUMBER</code>, <code>.push-sm-NUMBER</code>,
      <code>.push-md-NUMBER</code>, <code>.push-lg-NUMBER</code>
      <p>Move column to left (aka. margin-right) by fixed size (1-12).</p>
    </li>
  </ul>

  <p>
    To remove the gutters between the columns you could set the
    <code>[nogutters]</code> attribute (or <code>.nogutters</code> class).
  </p>
  <h3 class="section-title" id="examples">Examples</h3>

  <Preview title="With gutters (default)" :htmlExample="htmlGuttersExample" />

  <Preview title="Without gutters" :htmlExample="htmlNoGuttersExample" />
</template>

<style scoped>
::v-deep(.grid-host) {
  margin: 5px 0;
  width: 100%;
}
::v-deep(.content) {
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
}
</style>
