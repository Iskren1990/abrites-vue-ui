<script lang="ts" setup>
import Config from "../utils/app-config";
import { Preview } from "./shared/Preview.vue";
const htmlExample = `
  <AbritesButton v-abrites-tooltip="{
    abritesTooltip:'Lorem ipsum dolor...', 
    abritesTooltipPosition:'top'
    }">
    top aligned tooltip
  </AbritesButton>

  <AbritesButton v-abrites-tooltip="{
    abritesTooltip:'Lorem ipsum dolor...', 
    abritesTooltipDelay: 2000}">
    bottom aligned tooltip
  </AbritesButton>

  <AbritesButton v-abrites-tooltip="{
    abritesTooltip:'Lorem ipsum dolor...', 
    abritesTooltipPosition:'right'
    }">
    right aligned tooltip
  </AbritesButton>

  <AbritesButton v-abrites-tooltip="{
    abritesTooltip:'Lorem ipsum dolor...', 
    abritesTooltipPosition:'left'
    }">  
    left aligned tooltip
  </AbritesButton>

  <AbritesButton v-abrites-tooltip="{
    abritesTooltip:'Lorem ipsum dolor...', 
    abritesTooltipPosition:'top-left'
    }">
    top-left aligned tooltip
  </AbritesButton>

  <AbritesButton v-abrites-tooltip="{
    abritesTooltip:'Lorem ipsum dolor...', 
    abritesTooltipPosition:'top-right'
    }">
    top-right aligned tooltip
  </AbritesButton>

  <AbritesButton v-abrites-tooltip="{
    abritesTooltip:'Lorem ipsum dolor...', 
    abritesTooltipPosition:'bottom-left'
    }">
    bottom-left aligned tooltip
  </AbritesButton>

  <AbritesButton v-abrites-tooltip="{
    abritesTooltip:'Lorem ipsum dolor...', 
    abritesTooltipPosition:'bottom-right'
    }">
    bottom-right aligned tooltip
  </AbritesButton>

  <AbritesButton v-abrites-tooltip="{
    abritesTooltip:'Lorem ipsum dolor...', 
    abritesTooltipDelay: 2000}">
    2sec delayed tooltip
  </AbritesButton>
`;
</script>

<template>
  <div>Tooltips</div>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/lib/tooltip/tooltip.dart`"
      target="_blank"
      rel="noopener"
      >AbritesTooltip</a
    >
    <span>[v-abrites-tooltip]</span>
  </h2>

  <p>
    Simple tooltip directive that could be attached to any element (including
    components).
  </p>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>abritesTooltip</strong> <code>string</code>
      <p>Tooltip content (html tags are encoded).</p>
    </li>
    <li>
      <strong>abritesTooltipPosition</strong> <code>string</code>
      <p>
        Tooltip position. Valid values are <code>top</code>,
        <code>bottom</code> (default), <code>right</code>, <code>left</code>,
        <code>top-left</code>, <code>top-right</code>, <code>bottom-left</code>,
        <code>bottom-right</code>.
      </p>
    </li>
    <li>
      <strong>abritesTooltipDelay</strong> <code>number</code>
      <p>
        Delay interval in ms before showing the tooltip (default to
        <code>300</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="styling">Examples</h3>
  <Preview title="Random" :htmlExample="htmlExample" />
</template>

<style></style>
