<script lang="ts">
import {
  defineProps,
  defineEmits,
  withDefaults,
  ref,
  defineComponent,
  inject,
  reactive,
} from "vue";
import { IAccordionParentController } from "../../inteerfaces/Accordion";
export default defineComponent({ name: "AbritesAccordionPanel" });
</script>
<script lang="ts" setup>
interface IProps {
  label?: string;
  hint?: string;
  collapseIcon?: string;
  expandIcon?: string;
  disabled?: boolean;
  noninteractive?: boolean;
  scrollIntoView?: boolean;
  expanded?: boolean;
  animation?: number;
  withAccordeonController?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  collapseIcon: "keyboard_arrow_up",
  expandIcon: "keyboard_arrow_down",
  disabled: false,
  noninteractive: false,
  expanded: false,
  animation: 200,
  withAccordeonController: false,
});

const emit = defineEmits<{
  (e: "changed", changed: boolean): boolean;
  (e: "animationEnd", payload: boolean): boolean;
  (e: "beforeExpand"): boolean;
  (e: "beforeCollapse"): boolean;
}>();

const state = reactive({
  isExpanded: props.expanded,
  isDisabled: props.disabled,
  isNoninteractive: props.noninteractive,
  animationSpeed: props.animation,
  scrollIntoView: props.scrollIntoView,
  toggleIcon: () => (state.isExpanded ? props.collapseIcon : props.expandIcon),
  canInteract: () => !state.isDisabled && !state.isNoninteractive,
  disable: () => (state.isDisabled = true),
  enable: () => (state.isDisabled = false),
  toggle: () => (state.isExpanded ? state.collapse() : state.expand()),
  expand: () => {
    if (state.isExpanded) return;
    emit("beforeExpand");
    state.isExpanded = true;
    emit("changed", state.isExpanded);
  },
  collapse: () => {
    if (!state.isExpanded) return;
    emit("beforeCollapse");
    state.isExpanded = false;
    emit("changed", state.isExpanded);
  },
});

if (props.withAccordeonController) {
  const parentController =
    inject<IAccordionParentController>("parentController");
  parentController?.addChildState(state);
}

const headerElem = ref<HTMLElement | null>();
const contentElem = ref<HTMLElement | null>();

function toggleIfInteractable(event: Event) {
  emit("beforeCollapse");
  if (state.canInteract()) {
    state.toggle();
  }

  event.preventDefault();
}
function onAnimationEndPropagate() {
  headerElem.value?.blur();

  if (state.isExpanded && state.scrollIntoView) {
    contentElem.value?.scrollIntoView();
  }
  emit("animationEnd", state.isExpanded);
}
</script>

<template>
  <div
    class="accordion-panel-host"
    :class="
      (state.isExpanded ? 'expanded' : 'collapsed',
      state.isDisabled ? 'disabled' : '')
    "
  >
    <header
      ref="headerElem"
      :tabindex="0"
      class="panel-header"
      :class="state.isExpanded ? 'expanded' : 'collapsed'"
      @click="toggleIfInteractable($event)"
      @keydown.enter="toggleIfInteractable($event)"
      @keydown.space="toggleIfInteractable($event)"
    >
      <slot name="prefix"></slot>

      <div class="heading">
        <h3 class="title">{{ label }}</h3>
        <div v-if="hint?.length" class="hint">{{ hint }}</div>
      </div>

      <slot name="suffix"></slot>

      <AbritesIcon
        v-if="state.canInteract() && state.toggleIcon().length"
        class="toggle-icon"
        :icon="state.toggleIcon()"
      ></AbritesIcon>
    </header>

    <AbritesAmimatedIf
      :visible="state.isExpanded"
      :speed="state.animationSpeed"
      @animation-state="onAnimationEndPropagate()"
    >
      <div class="panel-content-wrapper">
        <div
          ref="contentElem"
          class="panel-content"
          :class="state.isExpanded ? 'expanded' : 'collapsed'"
        >
          <slot></slot>
        </div>
      </div>
    </AbritesAmimatedIf>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

$accordion-panel-spacing: 20px !default;

.accordion-panel-host {
  @include normalize-host();
  @include shadowize;
  position: relative;
  display: block;
  outline: 0;
  border: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: 1rem;
  color: $txt-secondary-color;
  border-radius: $border-radius;
  background: $panel-color;
  &.disabled {
    pointer-events: none;
    * {
      color: $txt-disabled-color;
    }
  }
}

.panel-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  outline: 0;
  border: 0;
  margin: 0;
  min-height: 52px;
  padding: 5px $accordion-panel-spacing;
  cursor: pointer;
  border-radius: inherit;
  user-select: none;
  color: $txt-secondary-color;
  transition: background $transition-speed, color $transition-speed,
    border-radius $transition-speed, min-height $transition-speed;
  @include children-spacing();
  .heading {
    flex-grow: 1;
  }
  ::v-deep() [prefix],
  ::v-deep() [suffix] {
    display: inline-flex;
    align-items: center;
    @include children-spacing(10px);
  }
  .title {
    display: block;
    width: 100%;
    margin: 0;
    color: inherit;
    line-height: 1;
    font-size: 1.1em;
    font-weight: $txt-bold;
  }
  .hint {
    display: block;
    width: 100%;
    color: inherit;
    line-height: 1;
    margin-top: 5px;
    font-size: 0.9em;
    font-weight: normal;
    opacity: 0.5;
  }
  .toggle-icon {
    color: $txt-secondary-color;
  }

  // states
  .accordion-panel-host:not(.noninteractive) &:hover,
  .accordion-panel-host:not(.noninteractive) &:focus,
  &.expanded {
    color: $txt-primary-color;
    background: $hover-color;
  }
  .accordion-panel-host:not(.noninteractive) &:active {
    background: $active-color;
    transition-duration: math.div($transition-speed, 2);
  }
  &.expanded {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .accordion-panel-host .noninteractive & {
    cursor: default;
    .toggle-icon {
      display: none;
    }
  }
}

.panel-content {
  display: block;
  width: 100%;
  padding: $accordion-panel-spacing;
  border-radius: inherit;

  ::v-deep() & > :first-child {
    margin-top: 0;
  }
  ::v-deep() & > :last-child {
    margin-bottom: 0;
  }
  ::v-deep() .panel-footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: $accordion-panel-spacing 0 0;
    > * {
      margin-left: (math.div($base-spacing, 2));
      &:first-child {
        margin-left: 0;
      }
    }
    .flex-fill,
    .fill {
      flex: 1 1 auto;
    }
  }
}

// nopadding content style
.accordion-panel-host .nopadding .panel-content,
.accordion-panel-host[nopadding] .panel-content {
  padding: 0;
}

// spaced style
.accordion-panel-host[spaced],
.accordion-panel-host .spaced {
  margin: 5px 0;
  &.expanded {
    margin: (math.div($base-spacing, 2)) 0;
  }
}

// dark style
.accordion-panel-host[dark],
.accordion-panel-host .dark {
  background: $base-color;
  &:not(.noninteractive) .panel-header:hover,
  &:not(.noninteractive) .panel-header:focus,
  &:not(.noninteractive) .panel-header.expanded {
    background: lighten($base-color, 1%);
  }
}

// light style
.accordion-panel-host[light],
.accordion-panel-host .light {
  background: $hover-color;
}

// no shadow style
.accordion-panel-host[noshadow],
.accordion-panel-host .noshadow {
  box-shadow: none;
}

// flat style
.accordion-panel-host[flat],
.accordion-panel-host .flat {
  box-shadow: none;
  border-radius: 0;
  margin: 1px 0;
  border: 0;
  border-top: 1px solid $hover-color;
  background: none;
  transition: background $transition-speed, margin $transition-speed;
  &:first-child {
    border-top-color: transparent;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }
  &:last-child {
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
  }
  .panel-header {
    padding-left: 0;
    padding-right: 0;
    background: none !important;
    transition: color $transition-speed, padding $transition-speed;
  }
  .panel-content {
    background: none;
    padding: 5px (math.div($base-spacing, 2)) (math.div($base-spacing, 2));
  }
  &.expanded {
    margin: 5px 0;
    background: $panel-color;
    border-radius: $border-radius;
    border-top-color: transparent;
    & + .accordion-panel-host {
      border-top-color: transparent;
    }
    .panel-header {
      padding-left: (math.div($base-spacing, 2));
      padding-right: (math.div($base-spacing, 2));
    }
  }
  // flat dark style
  &[dark],
  &.dark {
    &.expanded {
      background: $base-color;
    }
  }
}
</style>
