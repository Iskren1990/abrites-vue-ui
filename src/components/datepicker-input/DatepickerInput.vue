/* eslint-disable vue/no-mutating-props */
<script lang="ts" setup>
import { format } from "date-fns";
import {
  withDefaults,
  defineProps,
  defineEmits,
  computed,
  ref,
  unref,
} from "vue";
import { AbritesDropdown } from "..";
import { IDatepickerPreset } from "../datepicker/IDatepickerPreset";

interface IDatepickerPorps {
  // common datepicker props
  selected?: Date[];
  presets?: IDatepickerPreset[]; //List<DatepickerPreset>?
  autoApply?: boolean;
  clearOnCancel?: boolean;
  cancelText?: string;
  applyText?: string;
  minDate?: Date;
  maxDate?: Date;
  /// Maximum duration in miliseconds of a selected range (this is checked only when [enableRange] is `true`)
  maxRange?: number;
  time?: boolean;
  range?: boolean;
  months?: number;
  // component specific
  label?: string;
  placeholder?: Date | Date[] | string;
  hint?: string;
  error?: string | string[];
  tabindex?: number;
  format?: string;
  dropdownPosition?: string;
  disabled?: boolean;
  displayValueFormat?: string;
}

const props = withDefaults(defineProps<IDatepickerPorps>(), {
  selected: () => [] as Date[],
  dropdownPosition: "bottom-right",
  disabled: false,
  displayValueFormat: "dd MMM yyyy, HH:mm",
});

const emit = defineEmits<{
  (event: "update:selected", value: Date[]): void;
  (event: "applied", range: Date[]): void;
  (event: "canceled"): void;
  (event: "dropdown-change", state: boolean): void;
}>();

const inputSelected = ref(props.selected);

// Common datepicker computed props
// Once vue implements interface imports export common props in composable
const enableRange = computed(() => props.range);
const enableTime = computed(() => props.time);

const dropdown = ref<InstanceType<typeof AbritesDropdown>>();
const datepickerInput = ref<InstanceType<typeof AbritesDropdown>>();

const isActive = computed(() => dropdown.value?.isVisible);
const hasMultipleMonths = computed(() => props.months > 1);

const displayValue = ref<string | Date[] | Date>("");

const controller = computed(() => dropdown.value?.controller);

const setValue = (val: Date[]) => {
  emit("update:selected", val);
  if (!val.length) {
    displayValue.value = "";
    return; // no change
  }

  displayValue.value = val
    ?.map((date) => format(date, props.displayValueFormat))
    .join("\u00A0\u00A0\u00A0—\u00A0\u00A0\u00A0");
};

const apply = (val: Date[]) => {
  dropdown.value.controller.hide();
  emit("applied", inputSelected.value);
};

const canceled = () => {
  setValue([]);
  dropdown.value.controller.hide();
  emit("canceled");
};
</script>

<template>
  <div
    class="datepicker-input-host"
    :class="{ 'multi-month': hasMultipleMonths, active: controller?.isVisible }"
    v-abrites-outside-click="() => (isActive ? controller?.hide : null)"
  >
    <div class="field-wrapper">
      <AbritesInput
        ref="datepickerInput"
        readonly
        class="datepicker-input"
        :tabindex="tabindex"
        :disabled="disabled"
        :label="label"
        :hint="hint"
        :error="error"
        :placeholder="placeholder"
        :value="displayValue"
        @keydown.space="controller?.toggle"
        @keydown.enter="controller?.toggle"
        :class="{ focus: isActive }"
      >
        <template v-slot:suffix>
          <div class="datepicker-toggle">
            <AbritesIcon icon="date_range"></AbritesIcon>
          </div>
        </template>
      </AbritesInput>
      <div
        class="picker-dropdown-wrapper"
        :class="[{ active: isActive }, dropdownPosition]"
        @click.stop="$event.stopPropagation()"
      >
        <AbritesDropdown
          ref="dropdown"
          manual
          contentSelectable
          :handle="datepickerInput?.$el"
          class="picker-dropdown"
          @change="emit('dropdown-change', $event)"
        >
          <AbritesDatepicker
            v-if="isActive"
            v-model:selected="inputSelected"
            :presets="presets"
            :autoApply="autoApply"
            :clearOnCancel="clearOnCancel"
            :cancelText="cancelText"
            :applyText="applyText"
            :minDate="minDate"
            :maxDate="maxDate"
            :maxRange="maxRange"
            :time="enableTime"
            :range="enableRange"
            :months="months"
            @update:selected="setValue"
            @applied="apply"
            @canceled="canceled"
          ></AbritesDatepicker>
        </AbritesDropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:math";
@import "../../styles/core";

.datepicker-input-host {
  @include normalize-host();
  position: relative;
  display: block;
  width: 100%;
  outline: 0;
  user-select: none;

  &[spaced],
  &.spaced {
    margin: 0 0 $base-spacing;
  }

  .picker-dropdown-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    min-width: 320px;
    background: none;
    pointer-events: none;
    display: none;
    .picker-dropdown {
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: auto;
      top: auto;
      bottom: auto;
      right: auto;
      left: auto;
      margin: 0;
      max-width: 100%;
      pointer-events: auto;
      background: $panel-color;
    }

    // positions
    &.bottom-left {
      top: 100%;
      text-align: left;
    }
    &.bottom-right {
      top: 100%;
      text-align: right;
    }
    &.bottom-center {
      top: 100%;
      text-align: center;
    }
    &.top-left {
      bottom: 100%;
      text-align: left;
    }
    &.top-right {
      bottom: 100%;
      text-align: right;
    }
    &.top-center {
      bottom: 100%;
      text-align: center;
    }
  }
  &.active .picker-dropdown-wrapper {
    display: block;
  }

  .datepicker-input {
    ::v-deep() {
      input:not([disabled]) {
        cursor: pointer;
      }
      label.addon-suffix {
        pointer-events: none; /* prevent firing refocus events */
      }
    }
    .datepicker-toggle {
      cursor: pointer;
      color: $txt-secondary-color;
      opacity: 0.5;
      transition: opacity $transition-speed;
    }
  }
  &:hover .datepicker-input .datepicker-toggle,
  &.active .datepicker-input .datepicker-toggle {
    opacity: 1;
  }
}
</style>
