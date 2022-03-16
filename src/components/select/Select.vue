<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable vue/no-side-effects-in-computed-properties */

import { InputError, useErrorFormating } from "../../composables";
import { useBaseSelect } from "../../composables";
import { computed, defineProps, ref, withDefaults, defineEmits } from "vue";
import { normalizeOptions, SelectOption, singleOption } from "./select-option";

// Props in IBaseSelect should be removed from Select.vue and RadioList.vue onde Vue suports interface import in setup fn.
interface ISelectProps {
  // extends IBaseSelect interface
  select?: Record<string | number, unknown> | [] | any | string | number;
  options: Array<Record<string | number, unknown> | [] | any | string | number>;
  multiple?: boolean;
  disabledOptions?: Array<
    Record<string | number, unknown> | [] | any | string | number
  >;
  disabled?: boolean;
  labelFactory?: (option) => string;
  // component specific options
  label?: string;
  placeholder?: string;
  hint?: string;
  searchable?: boolean;
  toggleSelected?: boolean;
  searchPlaceholder?: string;
  searchTerm?: string;
  searchFilter?: (searchTerm: string, option) => boolean;
  noOptionsFound?: string;
  error?: InputError;
}

const props = withDefaults(defineProps<ISelectProps>(), {
  options: () => [],
  multple: false,
  disabledOptions: () => [],
  disabled: false,
  placeholder: "Select...",
  searchTerm: "",
  searchable: false,
  toggleSelected: false,
  searchPlaceholder: "Search...",
  noOptionsFound: "No options found :(",
});

const emit = defineEmits<{
  (event: "update:search-term", value: string): void;
  (event: "update:select", value): void;
}>();

const {
  options: internalOptions,
  selected,
  hasSelected,
  isOptionSelected,
  isOptionDisabled,
  renderOptionLabel,
  deselectOption,
  toggleOption,
  selectOption,
} = useBaseSelect(props, emit);

const { errors, hasError } = useErrorFormating(props.error);

const _host = ref<HTMLInputElement>();
const isActive = ref(false);
const term = computed({
  get: () => props.searchTerm,
  set: (val) => emit("update:search-term", val),
});

// expand select menu
const activate = () => {
  if (isActive.value) {
    return; // already activated
  }

  isActive.value = true;

  _host.value.querySelector(".option.selected")?.scrollIntoView();
};

// close select menu
const deactivate = () => {
  if (!isActive.value) {
    return; // already deactivated
  }
  isActive.value = false;
};

const baseDeactivate = (callback: () => void) => {
  callback();
  deactivate();
};

const toggle = () => (isActive.value ? deactivate() : activate());

const processSelected = () => {
  if (Array.isArray(props.select)) {
    const normalizedSelected = normalizeOptions(props.select);
    const selectedInOptions = normalizedSelected.filter((x) =>
      internalOptions.value.find((y) => y.key == x.key)
    );
    selectedInOptions.forEach(selectOption);
  } else {
    selectOption(
      internalOptions.value.find(
        (x) => x.label == singleOption(props.select, props.select).label
      )
    );
  }
};

// set innitial selected if any
props.select && processSelected();

const _filteredOptions = ref<SelectOption[]>(internalOptions.value);
const filteredOptions = computed({
  get: () => {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    filteredOptions.value = [];
    return _filteredOptions.value;
  },
  set: (value) => {
    // is searchable is passed and if we have search term
    if (!props.searchable || term.value.length == 0) {
      _filteredOptions.value = internalOptions.value;
    }

    _filteredOptions.value = internalOptions.value.filter(filterConditions);
  },
});

// on search input condition
function filterConditions(value) {
  // custom filter
  if (props.searchFilter && props.searchFilter(term.value, value)) {
    return value;
  } else {
    // default filter
    const label = (value as SelectOption).label;
    const exp = /[ \-_:]/gi;
    const normalizedSearchTerm = term.value.toLowerCase().replaceAll(exp, "");
    const optionLabel = label.toString().toLowerCase().replaceAll(exp, "");

    if (optionLabel?.includes(normalizedSearchTerm)) {
      return label;
    }
  }
  return false;
}
</script>

<template>
  <div ref="_host" class="select-host">
    <div
      class="select-wrapper"
      :class="{
        active: isActive,
        disabled,
        'has-error': hasError,
      }"
      @keydown.enter.stop="activate()"
      @keydown.esc.stop="deactivate()"
      tabindex="0"
    >
      <div
        class="select-field"
        v-abrites-outside-click="() => (isActive ? deactivate : null)"
      >
        <div class="field-content" @click="toggle()">
          <span v-if="label?.length" class="field-label">
            {{ label }}
          </span>

          <div class="selected-label">
            <template v-if="hasSelected">
              <span v-if="!multiple" class="txt txt-single">
                {{ renderOptionLabel(selected[0]) }}
              </span>

              <div v-if="multiple" class="multiple-selected-list">
                <div
                  v-for="option in selected"
                  :key="option.label"
                  class="item"
                >
                  <span class="txt">{{ renderOptionLabel(option) }}</span>
                  <span
                    class="close"
                    @click.stop="baseDeactivate(() => deselectOption(option))"
                    >close
                  </span>
                </div>
              </div>
            </template>

            <span v-if="!hasSelected && placeholder.length" class="placeholder">
              {{ placeholder }}
            </span>
          </div>
        </div>
        <div v-if="isActive" class="select-dropdown">
          <div v-if="searchable" class="options-search">
            <AbritesSearch
              type="search"
              class="search"
              :placeholder="searchPlaceholder"
              v-model:term="term"
              :debounceTime="0"
            />
          </div>
          <div class="options-list">
            <div
              v-for="option in filteredOptions"
              :key="option.key"
              tabindex="0"
              class="option"
              :class="{
                disabled: disabled || isOptionDisabled(option),
                selected: isOptionSelected(option),
              }"
              @click.stop="
                toggleSelected
                  ? toggleOption(option)
                  : baseDeactivate(() => selectOption(option))
              "
              @keydown.enter.stop="
                toggleSelected
                  ? toggleOption(option)
                  : baseDeactivate(() => selectOption(option))
              "
            >
              {{ renderOptionLabel(option) }}
            </div>
            <div
              v-if="!filteredOptions?.length && noOptionsFound.length"
              class="option disabled"
            >
              {{ noOptionsFound }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="hint?.length" class="help help-hint">
        {{ hint }}
      </div>
      <div v-if="hasError" class="help help-error">{{ errors }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.select-host {
  @include normalize-host();
  display: block;
  width: 100%;
  font-size: inherit;
  color: $txt-primary-color;
  text-align: left;
  &:before {
    // clear blocks helper
    content: "";
    display: table;
    width: 100%;
  }
  &[spaced] {
    margin: 0 0 $base-spacing;
  }
}

.select-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  font-size: 1em;
  margin: 5px 0;
  outline: 0;

  @include help-block-elem();

  // field
  .select-field {
    position: relative;
    outline: 0;
    width: 100%;
    user-select: none;
    color: $txt-secondary-color;
    .field-content {
      outline: 0;
      position: relative;
      display: flex;
      width: 100%;
      padding: 0 25px 0 0;
      cursor: pointer;
      color: inherit;
      min-height: $field-height;
      border-bottom: 1px solid $field-border-color;
    }
    .field-label {
      position: absolute;
      width: 100%;
      left: 0;
      top: -6px;
      font-size: 0.85em;
      color: inherit;
      transition: color $transition-speed;
    }
    .selected-label {
      align-self: flex-end;
      flex-grow: 1;
      padding: 7px 0 9px;
      max-width: 100%;
      color: $txt-primary-color;
      .placeholder {
        color: $txt-hint-color;
      }
      .txt-single {
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
      }
    }
    &:before {
      // active border
      content: "";
      display: block;
      position: absolute;
      right: auto;
      top: auto;
      left: 0;
      bottom: 0px;
      width: 100%;
      height: 2px;
      background: $accent-color;
      transform: rotateY(90deg);
      transition: transform (1.2 * $transition-speed);
    }
    &:after {
      // dropdown arrow
      $size: 5px;
      content: "";
      position: absolute;
      right: 5px;
      top: 50%;
      pointer-events: none;
      border-left: $size solid transparent;
      border-right: $size solid transparent;
      border-top: $size solid $txt-hint-color;
      transition: transform $transition-speed;
    }
  }

  // multiple select items
  .multiple-selected-list {
    display: flex;
    flex-wrap: wrap;
    white-space: normal;
    margin-bottom: -2px;
    .item {
      position: relative;
      padding: 0 25px 0 5px;
      margin: 5px 5px 0 0;
      border-radius: $border-radius;
      white-space: nowrap;
      user-select: none;
      line-height: 20px;
      font-size: 0.9em;
      background: $border-color;
      color: $txt-primary-color;
      @include shadowize();
      .close {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 20px;
        line-height: inherit;
        display: block;
        text-align: center;
        font-family: "Material Icons";
        font-weight: normal;
        font-size: inherit;
        color: inherit;
        cursor: pointer;
        color: $txt-secondary-color;
        border-left: 1px solid darken($border-color, 0.2);
        transition: color $transition-speed;
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
        &:hover {
          color: $danger-color;
        }
      }
    }
  }

  // options filter
  .options-search {
    display: block;
    width: 100%;
    border-bottom: 1px solid $border-color;
    .search {
      display: block;
      width: 100%;
      outline: 0;
      border: 0;
      padding: 13px 10px;
      font-family: inherit;
      font-size: inherit;
      background: $panel-color;
      color: $txt-secondary-color;
      &::placeholder {
        color: $txt-hint-color;
      }
      &:focus {
        color: $txt-secondary-color;
      }
    }
  }

  // dropdown options
  .options-list {
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 220px;
    user-select: none;
    font-size: inherit;
    line-height: 1;
    border-radius: inherit;
    .option {
      outline: 0;
      position: relative;
      padding: 13px 10px;
      cursor: pointer;
      border-left: 2px solid transparent;
      transition: background $transition-speed, border $transition-speed;
      &:not(.disabled):hover,
      &:not(.disabled):focus {
        background: $hover-color;
      }
      &:not(.disabled):active {
        background: $active-color;
        transition-duration: 0.1s;
      }
      &.disabled {
        cursor: initial;
        pointer-events: none;
        color: $txt-secondary-color;
        opacity: 0.3;
      }
      &.selected {
        color: $accent-color;
        background: $hover-color;
        border-left-color: $accent-color;
        &:not(.disabled):hover,
        &:not(.disabled):focus {
          background: $active-color;
        }
      }
    }
  }
  .select-dropdown {
    position: absolute;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    margin-top: -5px;
    background: $panel-color;
    border-radius: $border-radius;
    opacity: 0;
    visibility: hidden;
    transform: translateY(5px);
    transition: opacity $transition-speed, visibility $transition-speed,
      transform $transition-speed;
    animation: select-dropdown-show $transition-speed;
    @include shadowize-floated();
  }

  // focus state
  &:focus,
  &.active {
    .select-field {
      &:before {
        transform: rotate(0deg);
      }
      .field-label {
        color: $accent-color;
      }
    }
  }

  // active state
  &.active {
    .select-field {
      &:after {
        transform: rotate(180deg);
      }
    }
    .select-dropdown {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }

  // error state
  &.has-error {
    .select-field {
      border-bottom-color: $danger-color;
      &:before {
        background: $danger-color;
      }
      .field-label {
        color: $danger-color;
      }
    }
  }

  // disabled state
  &.disabled {
    pointer-events: none;
    .select-field {
      color: $txt-disabled-color;
      &:after {
        border-top-color: $txt-disabled-color;
      }
      * {
        color: inherit;
      }
      .field-content {
        border-bottom-color: rgba($field-border-color, 0.08);
      }
    }
  }

  // compact/dense layout
  .select-host[dense] &,
  :host(.dense) & {
    .select-field .field-content {
      min-height: 25px;
    }
    .options-list .option {
      padding: 10px;
    }
  }

  // hide select field border
  .select-host[noborder] &,
  :host(.noborder) & {
    .select-field:before {
      display: none;
    }
    .select-field .field-content {
      border-bottom-color: transparent;
    }
  }

  // horizontal label layout
  .select-host[horizontalLabel] &,
  :host(.horizontalLabel) &,
  .select-host[horizontal-label] &,
  :host(.horizontal-label) & {
    .select-field .field-label {
      position: relative;
      top: auto;
      white-space: nowrap;
      align-self: flex-end;
      width: auto;
      padding: 0px 0 9px;
      margin-right: 7px;
    }
  }
}

@keyframes select-dropdown-show {
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
