<template>
  <AbritesGrid>
    <div class="col-lg-4">
      <h2 class="component-title" id="tabs-selector">
        <a
          :href="`${Config.componentsUrl}/lib/tabs/Tabs.vue`"
          target="_blank"
          rel="noopener"
          >AbritesTabs</a
        >
        <span>{{'<abrites-tabs></abrites-tabs>'}}</span>
      </h2>

      <p>This is the main wrapper tabs component.</p>
      <p>
        Expects
        <code>{{'<abrites-tab-panel></abrites-tab-panel>'}}</code> children.
        <br />
        It will auto generate tabs header items from each tab panel label.
      </p>

      <h3 class="section-title" id="tabs-events">Vue Events</h3>
      <ul>
        <li>
          <strong>change</strong> <code>{{ "String" }}</code>
          <p>
            Fired after the active tab has changed.
            <code>TabChangeEvent</code> contains the previous and current active
            tab index.
          </p>
          <p>
            <code
              >emit("change", state.oldActiveTab, state.activeTabIndex);</code
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="col-lg-4">
      <h2 class="component-title" id="tab-panel-selector">
        <a
          :href="`${Config.componentsUrl}/lib/tab-panel/TabPanel.vue`"
          target="_blank"
          rel="noopener"
          >AbritesTabPanel</a
        >
        <span>{{'<abrites-tab-panel></abrites-tab-panel>'}}</span>
      </h2>

      <p>
        Represents single tab content panel. Usually this is defined as child
        slot in <code>AbritesTabs</code>.
      </p>

      <h3 class="section-title" id="tabs-panel-inputs">Inputs</h3>
      <ul>
        <li>
          <strong>label</strong> <code>String</code>
          <p>Label of the panel (usually displayed only as tooltip).</p>
        </li>
        <li>
          <strong>active</strong> <code>{{ "Boolean" }}</code>
          <p>Activates/show the tab panel (default to <code>false</code>).</p>
        </li>
      </ul>

      <h3 class="section-title" id="tabs-panel-events">Events</h3>
      <ul>
        <li>
          <strong>change</strong> <code>{{ "String" }}</code>
          <p>
            Fired after the tab panel active state has changed. Contains the
            current active tab index.
          </p>
        </li>
      </ul>

      <h3 class="section-title" id="tabs-panel-styling">Styling</h3>
      <p>
        The following attributes and/or classes could be used to customize the
        panel style:
      </p>
      <ul>
        <li><code>[padded]</code>, <code>.padded</code></li>
      </ul>
    </div>
    <div class="col-lg-4">
      <h2 class="component-title" id="tabs-header-selector">
        <a
          :href="`${Config.componentsUrl}/lib/tab-header/TabHeader.vue`"
          target="_blank"
          rel="noopener"
          >AbritesTabsHeader</a
        >

        <span>{{'<abrites-tabs-header></abrites-tabs-header>'}}</span>
      </h2>

      <p>
        Represents the tabs bar navigation. Usually this is is auto initialized
        by <code>AbritesTabs</code>.
      </p>

      <h3 class="section-title" id="tabs-header-inputs">Inputs</h3>
      <ul>
        <li>
          <strong>labels</strong> <code>{{ "String[]" }}</code>
          <p>The labels of the header items.</p>
        </li>
        <li>
          <strong>active</strong> <code>int</code>
          <p>
            The index of the active header item (default to <code>0</code>).
          </p>
        </li>
      </ul>

      <h3 class="section-title" id="tabs-header-events">Events</h3>
      <ul>
        <li>
          <strong>change</strong> <code>{{ "String" }}</code>
          <p>
            Fired after the active header item has changed. Receives the active
            item index as argument.
          </p>
        </li>
      </ul>
      <h3 class="section-title" id="tabs-panel-styling">Styling</h3>
      <p>
        The following attributes and/or classes could be used to customize the
        header style (could be set also on the first parent):
      </p>
      <ul>
        <li><code>[left]</code>, <code>.left</code></li>
        <li><code>[right]</code>, <code>.right</code></li>
        <li><code>[center]</code>, <code>.center</code></li>
        <li><code>[stretched]</code>, <code>.stretched</code></li>
      </ul>
    </div>
  </AbritesGrid>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview title="Default" :htmlExample="htmlDefaultExample"></Preview>

  <Preview title="Title" :htmlExample="htmlTitleExample"> </Preview>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Preview from "./shared/Preview.vue";
import Config from "../utils/app-config";

export default defineComponent({
  name: "Tabs",
  components: { Preview },
  data() {
    return {
      Config,
      htmlDefaultExample: `    
    <AbritesTabs>
      <AbritesTabPanel label="Tab 1">Tab 1 content...</AbritesTabPanel>
      <AbritesTabPanel label="Tab 2" active>Tab 2 content...</AbritesTabPanel>
      <AbritesTabPanel label="Test 3">Tab 3 content...</AbritesTabPanel>
    </AbritesTabs>

    <AbritesTabs right>
      <AbritesTabPanel label="Tab 1">Tab 1 content...</AbritesTabPanel>
      <AbritesTabPanel label="Tab 2">Tab 2 content...</AbritesTabPanel>
      <AbritesTabPanel label="Test 3" active="2">Tab 3 content...</AbritesTabPanel>
    </AbritesTabs>

    <AbritesTabs center>
      <AbritesTabPanel label="Tab 1">Tab 1 content...</AbritesTabPanel>
      <AbritesTabPanel label="Tab 2">Tab 2 content...</AbritesTabPanel>
      <AbritesTabPanel label="Test 3">Tab 3 content...</AbritesTabPanel>
    </AbritesTabs>

    <AbritesTabs stretched>
      <AbritesTabPanel label="Tab 1">Tab 1 content...</AbritesTabPanel>
      <AbritesTabPanel label="Tab 2">Tab 2 content...</AbritesTabPanel>
      <AbritesTabPanel label="Test 3">Tab 3 content...</AbritesTabPanel>
    </AbritesTabs>
    `,
      htmlTitleExample: `
    <AbritesTabs>
      <AbritesTabPanel class="padded" label="Tab 1">Tab 1 content...</AbritesTabPanel>
      <AbritesTabPanel class="padded" label="Tab 2">Tab 2 content...</AbritesTabPanel>
      <AbritesTabPanel class="padded" label="Test 3">Tab 3 content...</AbritesTabPanel>
    </AbritesTabs>

    <AbritesTabs right>
      <AbritesTabPanel padded label="Tab 1">Tab 1 content...</AbritesTabPanel>
      <AbritesTabPanel padded label="Tab 2">Tab 2 content...</AbritesTabPanel>
      <AbritesTabPanel padded label="Test 3">Tab 3 content...</AbritesTabPanel>
    </AbritesTabs>

    <AbritesTabs center>
      <AbritesTabPanel padded label="Tab 1">Tab 1 content...</AbritesTabPanel>
      <AbritesTabPanel padded label="Tab 2">Tab 2 content...</AbritesTabPanel>
      <AbritesTabPanel padded label="Test 3">Tab 3 content...</AbritesTabPanel>
    </AbritesTabs>

    <AbritesTabs stretched>
      <AbritesTabPanel padded label="Tab 1">Tab 1 content...</AbritesTabPanel>
      <AbritesTabPanel padded label="Tab 2">Tab 2 content...</AbritesTabPanel>
      <AbritesTabPanel padded label="Test 3">Tab 3 content...</AbritesTabPanel>
    </AbritesTabs>`,
    };
  },
});
</script>
