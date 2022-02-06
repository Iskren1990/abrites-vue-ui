<script lang="ts">
import {
  Component,
  defineComponent,
  onBeforeMount,
  provide,
  reactive,
  ref,
  RendererElement,
  RendererNode,
  VNode,
} from "vue";
interface TabProps {
  label: string;
  active: boolean;
}
export default defineComponent({
  name: "AbritesTabs",
  setup(_, { slots, emit }) {
    const tabLabels = ref<string[]>([]);

    // Sets the innitial state
    const state = reactive({
      oldActiveTab: 0,
      activeTabIndex: 0,
      tabs: [] as VNode<RendererNode, RendererElement>[],
    });

    const setActiveTab = (index: number): void => {
      const rule1 = index < 0;
      const rule2 = index >= state.tabs.length;
      const rule3 = state.activeTabIndex == index;

      if (rule1 || rule2 || rule3) return;

      state.oldActiveTab = state.activeTabIndex;
      emit("change", state.oldActiveTab, state.activeTabIndex);
      state.activeTabIndex = index;
    };

    // Filters through the passed components to distinguish the valid ones --> <AbritesTabPanel>
    // Sets the TabHeader names
    // Sets default active Tab
    onBeforeMount(() => {
      if (slots.default) {
        state.tabs = slots.default().filter((child) => {
          return (child.type as Component).name === "AbritesTabPanel";
        });
        state.tabs.forEach((child, i) => {
          const childProps = child.props as TabProps;
          tabLabels.value.push(childProps.label);
          if (childProps.active != null) state.activeTabIndex = i;
        });
      }
    });

    // registers the state so that it could be available in the child component
    provide("TabsProvider", state);

    return {
      tabLabels,
      setActiveTab,
      state,
    };
  },
});
</script>

<template>
  <div class="tabs-host">
    <AbritesTabHeader
      :labels="tabLabels"
      :active="state.activeTabIndex"
      @change="setActiveTab"
    ></AbritesTabHeader>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.tabs-host {
  @include normalize-host();
  display: block;
  width: 100%;
  font-size: 1rem;
}
</style>
