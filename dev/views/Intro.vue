<script lang="ts" setup>
import * as Config from "../utils/app-config";
/*eslint no-useless-escape: 0*/
const htmlLibrariesExamples = `
<!-- REQUIRED: Vue CDN - https://vuejs.org/guide/quick-start.html#without-build-tools -->
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
<\/script>

<!-- REQUIRED: Material icons (consider self hosting to prevent "flickering" - https://google.github.io/material-design-icons/#setup-method-2-self-hosting) -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- OPTIONAL: Leaflet ^1.7.1 (used by AbritesMap) -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css">
<script defer src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"><\/script>

<!-- OPTIONAL: Flatpickr ^4.6.9 (used by AbritesDatepicker, AbritesDatepickerInput) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/flatpickr"><\/script>

<!-- OPTIONAL: Chart.js ^3.7.0 (used by AbritesChart) -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/dygraph/2.1.0/dygraph.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
<script defer src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@next/dist/chartjs-adapter-date-fns.bundle.min.js"><\/script>
<script defer src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8"><\/script>
<!-- ChartJS REQUIRES INSTALLATION: chartjs-plugin-zoom ^1.2.0 (used by AbritesChart) -->

<!-- OPTIONAL: Sortable.js ^1.14.0 (used by AbritesLazyFor) -->
<script defer src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"><\/script>

`;

const vueInstallation = `
# With npm
npm install abrites-vue-ui

# With yarn
yarn add abrites-vue-ui
`;

const abritesVueUiRegistration = `
import { createApp } from "vue";
import App from "./App.vue";
import ui from "abrites-vue-ui";

createApp(App).use(ui).mount("#app");
`;

const cssBaseExample = `
/* assets/styles/styles.scss
----------------------------------------------------------------------------- */
@import "~abrites-vue-ui/dist/style/core.scss

/* MaterialIcons (self hosted) */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url('./fonts/material_icons/MaterialIcons-Regular.eot');
  src: local('Material Icons'), local('MaterialIcons-Regular'),
       url('./fonts/material_icons/MaterialIcons-Regular.woff2') format('woff2'),
       url('./fonts/material_icons/MaterialIcons-Regular.woff') format('woff'),
       url('./fonts/material_icons/MaterialIcons-Regular.ttf') format('truetype');
}

@include base-layout();

// other global styles...
`;

const cssComponentExample = `
/* your-component.scss
----------------------------------------------------------------------------- */
@import "~abrites-vue-ui/dist/style/core.scss

.your-component-host {
  @include normalize-host();

  // other component styles...
}
`;

const cssModifyExample = `
/* your-component.scss
----------------------------------------------------------------------------- */
@import "~abrites-vue-ui/dist/style/core.scss

.your-component-host {
  @include normalize-host();

  .button-host {
    border-radius: 10px;
  }

  ::v-deep(.button-host .button-content) {
    min-height: 50px;
  }
}`;

const inComponentExample = `
<template>
  
  <AbritesButton large>
    <span class="txt">Large</span>
    <AbritesIcon icon="arrow_forward"></AbritesIcon>
  </AbritesButton>

</template>

<script lang="ts" setup>
  \/\/your logic...
<\/script>;

<style>
  \/\/your styles...
<\/style>
`;
</script>

<template>
  <p>
    Abrites Vue UI offers custom components, directives and composables for Vue
    3 with Type Sctipt support.
  </p>

  <h3 class="section-title">Prerequisites</h3>
  <p>
    The following 3rd party libraries need to be loaded at the top of your main
    html template.
  </p>
  <AbritesAlert info
    >Or install / import them from the pre-provided styles:</AbritesAlert
  >
  <pre
    v-highlightjs
  ><code class="language-html">{{ htmlLibrariesExamples }}</code></pre>

  <h3 class="section-title">Installation</h3>
  <p>Currently Abrites Vue Ui supports only local installation.</p>
  <ul>
    <li>
      <p>Install Abrites Vue Ui as dependancy:</p>
      <pre
        v-highlightjs
      ><code class="language-html">{{ vueInstallation }}</code></pre>
    </li>
    <li>
      <p>
        Register the library in your <code>app.js</code>/<code>server.ts</code>
      </p>
      <pre
        v-highlightjs
      ><code class="language-javascript">{{ abritesVueUiRegistration }}</code></pre>
    </li>
  </ul>

  <h3 class="section-title">General use and recommendations</h3>
  <h5>Layout</h5>
  <p>
    Abrites Vue UI doesn't have predefined layout view because it is easy to
    build one with modern CSS/Sass and most applications don't have single
    layout structure (eg. login, profile, admin dashboard, etc.).
  </p>

  <h5>Styling</h5>
  <p>
    Advanced module bundler usage. Webpack support prepending the scss modules
    with tilde paths (~) when importing from a scss file.
  </p>
  <ul>
    <li>
      Webpack configuration to load CSS files
      <a
        href="https://webpack.js.org/guides/asset-management/#loading-css"
        target="_blank"
        rel="noopener"
        >official guide</a
      >
    </li>
    <li>
      Webpack Loader for SASS/SCSS files
      <a
        href="https://webpack.js.org/loaders/sass-loader/"
        target="_blank"
        rel="noopener"
        >official guide</a
      >
    </li>
  </ul>
  <p>
    In order to preserve the consistent look and feel, you may want to add
    <code>@import "~abrites-vue-ui/dist/style/core.scss</code> at the top of
    each of your components Sass file, so that you could access the Abrites Vue
    UI
    <a
      :href="`${Config.componentsUrl}/styles/_vars.scss`"
      target="_blank"
      rel="noopener"
      >global variables</a
    >
    and
    <a
      :href="`${Config.componentsUrl}/styles/_mixins.scss`"
      target="_blank"
      rel="noopener"
      >mixins</a
    >.
  </p>
  <p>
    Here is an example for the global app styles (usually
    <code>assest/styles/styles.scss</code>):
  </p>
  <pre
    v-highlightjs
  ><code class="m-b-30 language-css">{{ cssBaseExample }}</code></pre>
  <p>Here is an example for an app component styles:</p>
  <pre
    v-highlightjs
  ><code class="m-b-30 language-css">{{ cssComponentExample }}</code></pre>

  <p>
    Sometimes you may need to customize an Abrites Vue UI component from your
    external app component. Due to view encapsulation, if the change is not
    applicable directly to the <code>.host</code> element (or its slot
    children), you will need to use <code>::v-deep</code>
    <strong>but don't overuse it as it is deemed as bad practice</strong>:
  </p>

  <pre
    v-highlightjs
  ><code class="m-b-30 language-css"> {{ cssModifyExample }} </code></pre>

  <p>
    The example presents global component registration hence no importing is
    required upon usage:
  </p>

  <pre
    v-highlightjs
  ><code class="m-b-30 language-javascript"> {{ inComponentExample }} </code></pre>

  <h5>Components</h5>
  <AbritesAlert class="m-t-0 m-b-50">
    <h5>
      Detailed documentation and examples how to use the Abrites Vue UI
      components directives and composables could be accessed through the
      sidebar menu on the left.
    </h5>
  </AbritesAlert>

  <h3 class="section-title">
    Reporting Issues
    <span class="icon-git">
      <a href="https://github.com/Iskren1990/abrites-vue-ui/issues"
        ><svg
          aria-hidden="true"
          height="20"
          viewBox="0 0 16 16"
          version="1.1"
          width="20"
          data-view-component="true"
        >
          <path
            fill-rule="evenodd"
            fill="#fff"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path></svg></a
    ></span>
  </h3>
  <p>
    The issue list of this repo is exclusively for bug reports and feature
    requests.
  </p>
  <p>Before reporting an issue:</p>
  <ul>
    <li>
      Try to reproduce with the latest version in a codepen or repository that
      can be cloned to produce the expected behavior.
    </li>
    <li>Make sure that the reproduction is MINIMAL and concise.</li>
    <li>
      When writing an issue please provide as much detail as possible. Note that
      “reproduction steps” should be a series of actions another developer
      should take after clicking your reproduction link, not a recollection of
      how you discovered the bug.
    </li>
  </ul>
</template>

<style>
.icon-git {
  margin-left: 5px;
}
</style>
