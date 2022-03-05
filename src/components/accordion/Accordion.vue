<script lang="ts" setup>
import {
  reactive,
  watchEffect,
  provide,
  defineEmits,
  defineProps,
  withDefaults,
  defineExpose,
} from "@vue/runtime-core";
import { ref } from "vue";
import { IAccordionPanelState } from "../../inteerfaces/Accordion";

interface IAccordionProps {
  multiple?: boolean;
  stepped?: boolean;
}
const props = withDefaults(defineProps<IAccordionProps>(), {
  multiple: false,
  stepped: false,
});

const panels = ref<IAccordionPanelState[]>([]);

const parentController = reactive({
  addChildState: (state: IAccordionPanelState) => panels.value.push(state),
});

const emit =
  defineEmits<{ (event: "change", activeIndexes: number[]): void }>();

provide("parentController", parentController);

// monkeypatch of expand(), sets pannels activity if stepped == true
watchEffect(
  () => {
    panels.value.map(monkeyPatchedExpand);
    if (props.stepped) {
      const index = getLastActivePanelIndex();
      activateStep(index);
    }
  },
  { flush: "post" }
);

function expandedPanelIndexes() {
  const indexes: number[] = [];
  panels.value.map((panel, i) => panel.isExpanded && indexes.push(i));

  return indexes;
}

function getLastActivePanelIndex() {
  return expandedPanelIndexes().length
    ? expandedPanelIndexes()[expandedPanelIndexes().length - 1]
    : 0;
}

const areAllPanelsExpanded = () =>
  panels.value.filter((panel) => panel.isDisabled).length ==
  expandedPanelIndexes().length;

const areAllPanelsCollapsed = () => expandedPanelIndexes().length == 0;

function collapseAll() {
  expandedPanelIndexes().forEach(collapsePanel);
}

function collapsePanel(index: number) {
  if (index < 0 || index >= panels.value.length || !panels.value.length) {
    return;
  }

  panels.value[index].collapse();
  emitChange();
}

function togglePanel(index: number) {
  expandedPanelIndexes()[index] ? collapsePanel(index) : expandPanel(index);
}

function expandPanel(index: number, { enable = false } = {}) {
  if (index < 0 || index >= panels.value.length || !panels.value.length) {
    return;
  }

  if (enable && panels.value[index].isDisabled) {
    panels.value[index].enable();
  }
  panels.value[index].expand();
  emitChange();
}

function enablePrevPanels(index: number) {
  if (index <= 0 || index >= panels.value.length) {
    return;
  }

  panels.value.map((panel, i) => i < index && panel.enable());
}

function expandAll() {
  if (!props.multiple && !props.stepped) {
    return;
  }
  panels.value.map((x, i) => x.isDisabled && expandPanel(i));
}

function disableNextPanels(index: number) {
  panels.value.map((panel, i) => i > index && panel.disable());
}

function activateStep(index: number) {
  enablePrevPanels(index);
  disableNextPanels(index);
}

function nextStep() {
  let targetIndex = 0;
  const lastExpandedIndex = expandedPanelIndexes().length - 1;

  if (lastExpandedIndex >= 0) {
    targetIndex = expandedPanelIndexes()[lastExpandedIndex] + 1;
  }

  expandPanel(targetIndex, { enable: true });
}

function prevStep() {
  var targetIndex = 0;
  const lastExpandedIndex = expandedPanelIndexes().length - 1;
  if (lastExpandedIndex >= 0) {
    targetIndex = expandedPanelIndexes()[lastExpandedIndex] - 1;
  }

  expandPanel(targetIndex, { enable: true });
}

function emitChange() {
  emit("change", expandedPanelIndexes());
}

// events can not be transmited from slots hence beforeExpand event is not received
// to overcome this expand() is apended with collapse all
function monkeyPatchedExpand(childState: IAccordionPanelState) {
  let oldExpand = childState.expand.bind(childState);
  childState.expand = function () {
    if (!props.multiple) {
      collapseAll();
    }
    oldExpand();
  };
}

defineExpose({
  nextStep,
  prevStep,
  expandAll,
  areAllPanelsExpanded,
  areAllPanelsCollapsed,
  togglePanel,
});
</script>

<template>
  <div ref="parent" class="accordeon-host">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.accordeon-host {
  @include normalize-host();
  position: relative;
  display: block;
  width: 100%;
  outline: 0;
  padding: 0;

  ::v-deep() .accordion-panel-host {
    margin: 1px 0;
    transition: margin $transition-speed;
    &.expanded {
      margin: (math.div($base-spacing, 2)) 0;
    }
    &,
    &.expanded {
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &[spaced],
  &.spaced {
    ::v-deep() .accordion-panel-host {
      margin: (math.div($base-spacing, 2)) 0;
      &.expanded {
        margin: $base-spacing 0;
      }
      &,
      &.expanded {
        &:first-child {
          margin-top: 0;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
