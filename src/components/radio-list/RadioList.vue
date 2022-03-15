<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBaseSelect, useErrorFormating } from "../../composables";
import { defineProps, defineEmits } from "vue";
interface IRadioistProps {
  // extends IBaseSelect interface
  select?:
    | Record<string | number | symbol, unknown>
    | []
    | any
    | string
    | number;
  options: Array<
    Record<string | number | symbol, unknown> | [] | any | string | number
  >;
  multiple?: boolean;
  disabledOptions?: Array<
    Record<string | number | symbol, unknown> | [] | any | string | number
  >;
  disabled?: boolean;
  labelFactory?: (option) => string;
  // component specific options
  label?: string;
  hint?: string;
  error?: string | string[];
}
const props = defineProps<IRadioistProps>();
const emit = defineEmits<{
  (event: "update:select", value): void;
}>();

const {
  options,
  isOptionDisabled,
  isOptionSelected,
  toggleOption,
  selectOption,
  renderOptionLabel,
} = useBaseSelect(props, emit);

const { errors, hasError } = useErrorFormating(props.error);

const uniqueId = performance.now().toString() + Math.random();
</script>

<template>
  <div class="radio-list-host" :class="{ 'has-hint': hint }">
    <div v-if="label" class="legend">{{ label }}</div>

    <div v-if="options.length" class="field-content">
      <div v-for="(option, index) of options" :key="index" class="field">
        <input
          :id="uniqueId + '_' + index.toString()"
          :name="uniqueId"
          :type="multiple ? 'checkbox' : 'radio'"
          :disabled="disabled || isOptionDisabled(option)"
          :checked="isOptionSelected(option)"
          @change="multiple ? toggleOption(option) : selectOption(option)"
        />
        <label :for="uniqueId + '_' + index.toString()"
          >{{ renderOptionLabel(option) }}&nbsp;</label
        >
      </div>
    </div>

    <div v-if="hint" class="help help-hint">{{ hint }}</div>

    <div v-if="hasError" class="help help-error">{{ errors }}</div>
  </div>
</template>

<style lang="scss">
@use "sass:math";
@import "../../styles/core";

@include toggle-field-elem(".field");

.radio-list-host {
  @include normalize-host();
  position: relative;
  display: block;
  width: 100%;

  @include help-block-elem();

  .legend {
    display: block;
    font-size: inherit;
    line-height: 1;
    margin: 0 0 10px;
    font-size: 0.95em;
    color: $txt-secondary-color;
  }
  .field-content {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 100%;
  }
  .field {
    width: 100%;
    margin: (math.div($base-spacing, 2)) 0;
    min-height: 18px;
    &:first-child {
      margin-top: 5px;
    }
    &:last-child {
      margin-bottom: 5px;
    }
  }

  // spaced layout
  &[spaced],
  &.spaced {
    margin: 0 0 $base-spacing;
  }

  // inline layout
  &[inline],
  &.inline {
    width: auto;
    display: inline-block;
    vertical-align: middle;
    .field {
      float: left;
      width: auto;
      margin: 5px 0 10px 5px;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  // dense layout
  &[dense],
  &.dense {
    .field {
      margin: 5px 0;
    }
  }

  // buttoned layout
  &[buttoned],
  &.buttoned {
    width: 100%;
    .legend {
      margin: 0 0 10px;
    }
    .field-content {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      width: 100%;
      background: none;
      border-radius: $border-radius;
      @include shadowize();
    }
    .field {
      flex-grow: 1;
      flex-basis: 0;
      margin: 0 0 0 -1px; // simulate border-collapse
      label {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        padding: 11px;
        text-align: center;
        border-radius: 0;
        font-weight: $txt-bold;
        text-transform: uppercase;
        font-size: 0.9em;
        border: 1px solid $field-border-color;
        transition: color $transition-speed, background $transition-speed;
        &:before,
        &:after {
          content: none;
          display: none;
        }
        &:hover {
          background: $hover-color;
        }
        &:active {
          background: $active-color;
          transition-duration: 0.1s;
        }
      }
      input:focus ~ label {
        background: $hover-color;
      }
      input:checked ~ label {
        color: $accent-color;
        border-color: $accent-color;
      }
      input:disabled ~ label {
        opacity: 1;
        color: $txt-disabled-color;
      }
      &:first-child {
        margin-left: 0;
        label {
          border-top-left-radius: $border-radius;
          border-bottom-left-radius: $border-radius;
        }
      }
      &:last-child label {
        border-top-right-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
      }
    }
    // buttoned dense
    &[dense],
    &.dense {
      .field label {
        padding: 6.5px;
      }
    }
    // buttoned inline
    &[inline],
    &.inline {
      width: auto;
      display: inline-flex;
      align-items: center;
      .legend {
        display: inline-block;
        width: auto;
        margin: 0 10px 0 0;
      }
      .field-content {
        display: inline-flex;
        width: auto;
        .field {
          flex-basis: auto;
        }
      }
    }
  }
}
</style>
