<template>
  <div class="search-host" :class="hasValue ? 'has-value' : ''">
    <input
      ref="searchInput"
      type="text"
      class="search-field"
      :class="isDisabled && 'disabled'"
      :placeholder="placeholder"
      @input="updateValue($event.target.value, { debounce })"
    />

    <div class="search-show-handle">
      <AbritesIcon icon="search"></AbritesIcon>
    </div>

    <div class="search-clear-handle" @click="clear({ debounce })">
      <AbritesIcon class="small" icon="clear"></AbritesIcon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "AbritesSearch",
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    isExpanded: {
      type: Boolean,
      default: (): boolean => false,
    },
    debounceTime: {
      type: Number,
      default: (): number => 200,
    },
  },
  setup(props, context) {
    const debounceTimer = ref(props.debounceTime);
    const isDisabled = ref(false);
    const searchInput = ref();
    const hasValue = ref();

    const updateValue = (newValue: string, { debounce = true }) => {
      hasValue.value = newValue.length;
      searchInput.value.value = newValue;
      clearTimeout(debounceTimer.value);
      if (debounce) {
        debounceTimer.value = setTimeout(
          () => context.emit("searchValueChange", newValue),
          props.debounceTime
        );
      } else {
        context.emit("searchValueChange", newValue);
      }
    };

    const setDisabled = (val: boolean) => {
      isDisabled.value = val;
      isDisabled.value && searchInput.value.blur();
    };

    const clear = ({ debounce = false }) => {
      updateValue("", { debounce });

      searchInput.value.blur();
    };

    return {
      isDisabled,
      setDisabled,
      clear,
      updateValue,
      searchInput,
      hasValue,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

@mixin set-search-size(
  $name,
  $collapsed-size,
  $expanded-size,
  $font-size: 1rem,
  $icon-size: 1.7em
) {
  &[#{$name}],
  &.#{$name} {
    width: $collapsed-size;
    height: $collapsed-size;

    .search-show-handle,
    .search-clear-handle {
      width: $collapsed-size;
    }
    .icon {
      font-size: 24px;
      text-align: center;
      margin-right: (math.div($base-spacing, 2));
      flex-shrink: 0;
    }
    .search-field {
      background: red !important;
      font-size: $font-size;
      padding-left: $collapsed-size + 5px;
    }

    // active state
    &:focus-within,
    &.has-value,
    &.expanded {
      width: $expanded-size;
    }
  }
}

.search-host {
  @include normalize-host();
  position: relative;
  display: inline-block;
  vertical-align: top;
  max-width: 100%;
  font-size: 1rem;
  width: $field-height;
  height: $field-height;
  overflow: hidden;
  background: $hover-color;
  color: $txt-secondary-color;
  border-radius: $field-height;
  transition: width $transition-speed, background $transition-speed,
    box-shadow $transition-speed;

  @include set-search-size("large", $field-height-large, 350px, 1.1em, 1.8em);
  @include set-search-size("small", $field-height-small, 250px, 0.9em, 1.4em);

  // states
  &:hover,
  &:focus-within {
    background: $active-color;
  }
  &:focus-within {
    color: $txt-primary-color;
    @include shadowize();
  }
  &:focus-within,
  &.has-value,
  &.expanded {
    width: 300px;
    &[block],
    &.block {
      width: 100%;
    }
  }
  &[disabled]:not([disabled="false"]),
  &.disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}

.search-field {
  display: block;
  outline: 0;
  border: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0px ($field-height + 5);
  line-height: 1;
  user-select: none;
  font-size: 1rem;
  color: inherit;
  background: none;
  border-radius: inherit;
  cursor: pointer;
}

.search-show-handle {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: $field-height;
  height: 100%;
  pointer-events: none;
  color: inherit;
  user-select: none;
  transition: color $transition-speed;
}

.search-clear-handle {
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  display: none;
  justify-content: center;
  align-items: center;
  width: $field-height;
  height: 100%;
  color: $txt-disabled-color;
  user-select: none;
  cursor: pointer;
  transition: color $transition-speed;
  &:focus,
  &:hover {
    color: $txt-secondary-color;
  }
  &:active {
    color: $txt-primary-color;
  }

  .has-value & {
    display: inline-flex;
  }
}
</style>
