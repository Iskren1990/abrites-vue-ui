<template>
  <div class="tab-panel-host">
    <div v-if="isActive" class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
interface ITabsProvider {
  activeTabIndex: number;
  tabs: VNode<RendererNode, RendererElement>[];
}

import {
  defineComponent,
  inject,
  PropType,
  ref,
  RendererElement,
  RendererNode,
  VNode,
  watchEffect,
} from "vue";
export default defineComponent({
  name: "AbritesTabPanel",
  props: {
    label: {
      type: String,
      default: "",
    },
    active: {
      type: String as PropType<boolean | string>,
      default: "0",
    },
  },
  setup(props) {
    const isActive = ref(false);
    const tabsState = inject<ITabsProvider>("TabsProvider");
    const tabIndex = tabsState?.tabs.findIndex(
      (x) => x.props?.label == props.label
    );

    /// Monitors the injected state for activeTabIndex change
    /// sers the active status of the current component to true
    /// if the activeTabIndex is equal to current tab index @tabIndex
    watchEffect(() => {
      isActive.value = tabIndex == tabsState?.activeTabIndex;
    });

    return { isActive, tabsState };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/core";

.tab-panel-host {
  @include normalize-host();
  display: block;
  outline: 0;
  border: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: 1rem;

  .panel-content {
    position: relative;
    display: block;
    width: 100%;
    margin: $base-spacing 0;
    animation: tab-panel-show ($transition-speed * 1.5);
  }
  &[padded],
  &.padded {
    .panel-content {
      margin-top: 0;
      padding: $base-spacing;
      background: $panel-color;
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
      @include shadowize;
    }
  }
}

@keyframes tab-panel-show {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
