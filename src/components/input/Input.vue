<script lang="ts" setup>
import { useErrorFormating } from "../../composables/useErrorFormating";
import { useIsSlotInited } from "../../composables/useIsSlotInited";
import {
  withDefaults,
  defineProps,
  defineExpose,
  useSlots,
  toRefs,
  ref,
} from "vue";

interface IInputProps {
  value: number | string;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string | string[];
  type?: string;
  step?: number;
  min?: number;
  max?: number;
  rows?: number;
  tabindex?: number;
  autofocus?: boolean;
  autocomplete?: string;
  readonly?: boolean;
  disabled?: boolean;
}
const props = withDefaults(defineProps<IInputProps>(), {
  type: "text",
  rows: 1,
  autofocus: false,
  readonly: false,
  disabled: false,
  error: "",
});

const {
  value,
  label,
  placeholder,
  hint,
  type,
  step,
  min,
  max,
  rows,
  tabindex,
  autofocus: isAutofocus,
  autocomplete,
  readonly: isReadonly,
  disabled: isDisabled,
  error,
} = toRefs(props);

const slots = useSlots();

const hasPrefix = useIsSlotInited(slots.prefix);
const hasSuffix = useIsSlotInited(slots.suffix);
const { errors, hasError } = useErrorFormating(error.value);

const uniqueId = performance.now().toString();

const inputElem = ref();

const handleInput = (event: Event) => (event.target as HTMLInputElement).value;

const focus = () => inputElem.value && inputElem.value.focus();

defineExpose({ focus });
</script>

<template>
  <div class="input-host">
    <div
      class="field-wrapper"
      :class="{
        disabled: isDisabled,
        'has-error': hasError,
        'activate-label': placeholder || hasPrefix || hasSuffix,
      }"
    >
      <div class="field-content">
        <input
          v-if="rows <= 1"
          ref="inputElem"
          :type="type"
          :id="uniqueId"
          :tabindex="tabindex"
          :readonly="isReadonly"
          :disabled="isDisabled"
          :placeholder="placeholder || ' '"
          :step="step"
          :autofocus="isAutofocus"
          :autocomplete="autocomplete"
          :minlength="type != 'number' ? min : undefined"
          :maxlength="type != 'number' ? max : undefined"
          :min="type == 'number' ? min : undefined"
          :max="type == 'number' ? max : undefined"
          :value="value"
          @input.prevent="$emit(`update:${type}`, handleInput($event))"
          @blur="$emit('blur')"
        />

        <textarea
          v-if="type != 'number' && rows > 1"
          ref="inputElem"
          :id="uniqueId"
          :rows="rows"
          :tabindex="tabindex"
          :readonly="isReadonly"
          :disabled="isDisabled"
          :placeholder="placeholder || ' '"
          :autofocus="isAutofocus"
          :autocomplete="autocomplete"
          :minlength="min"
          :maxlength="max"
          :value="value"
          @input.prevent="$emit(`update:${type}`, handleInput($event))"
          @blur="$emit('blur')"
        ></textarea>

        <label class="label" :for="uniqueId">{{ label }}</label>

        <label :for="uniqueId" class="addon addon-prefix" ref="prefixWrapper"
          ><slot name="prefix"></slot
        ></label>
        <label :for="uniqueId" class="addon addon-suffix" ref="suffixWrapper"
          ><slot name="suffix"></slot
        ></label>

        <span class="border-bar"></span>
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

@mixin inactive-label() {
  top: 50%;
  font-size: 1em;
}

@mixin active-label() {
  top: 0px;
  font-size: 0.85em;
}

.input-host {
  @include normalize-host();
  display: block;
  width: 100%;
  font-size: inherit;
  color: $txt-primary-color;
  text-align: left;
  // child margin fix
  &:before {
    content: "";
    display: table;
    clear: both;
  }
  &[dense] %field,
  &.dense %field {
    min-height: 25px;
  }
  &[spaced],
  &.spaced {
    margin: 0 0 $base-spacing;
  }
}

%field {
  outline: 0;
  border: 0;
  margin: 0;
  padding: 0;
  width: 200px;
  font-size: 1em;
  line-height: inherit;
  font-family: inherit;
  background: inherit;
  color: $txt-primary-color;
  height: auto;
  min-height: $field-height;
  transition: color $transition-speed;
  overflow: hidden;
  text-overflow: ellipsis;
  &::placeholder {
    color: $txt-hint-color;
  }
  &[readonly] {
    cursor: default;
    user-select: none;
  }
}

input:-webkit-autofill {
  transition: background-color 9999s;
  transition-delay: 9999s;
  -webkit-transition: background-color 9999s;
  -webkit-transition-delay: 9999s;
  -webkit-text-fill-color: $txt-primary-color;
  background-clip: content-box;
}

input,
textarea,
select {
  @extend %field;
}
input[type="color"] {
  -webkit-appearance: none;
  border: none;
  height: 20px;
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: none;
    border-radius: $border-radius;
  }
}

textarea {
  resize: none;
  resize: vertical;
  line-height: 1.3em;
}
select {
  padding-left: 0;
  padding-right: 0;
  option {
    color: initial;
  }
}

.field-wrapper {
  position: relative;
  display: block;
  width: 100%;
  margin: 5px 0;

  @include help-block-elem;

  .field-content {
    position: relative;
    width: inherit;
    display: flex;
    align-items: flex-end;
    margin: 5px 0;
  }
  .border-bar {
    position: absolute;
    top: auto;
    right: auto;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    background: $field-border-color;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: -50%;
      width: 100%;
      height: 200%;
      background: $accent-color;
      transform: rotateY(90deg);
      transition: transform (1.2 * $transition-speed);
    }
  }
  %field {
    order: 2;
    width: 100%;
    padding: 10px 0 7px;
  }
  .addon {
    white-space: nowrap;
    flex-shrink: 0;
    padding-bottom: 7px;
    line-height: 22px;
    color: $txt-secondary-color;
    transition: color $transition-speed;
    user-select: none;
    &:empty {
      display: none;
    }
    &.addon-prefix {
      padding-right: 7px;
      order: 1;
    }
    &.addon-suffix {
      padding-left: 7px;
      order: 3;
    }
    ::v-deep(.loader-host) {
      margin: 0;
    }
    ::v-deep(.icon-host:not([small]):not([large])),
    ::v-deep(.icon-host:not(.small):not(.large)) {
      font-size: 1.4em;
    }
  }
  .label {
    position: absolute;
    left: 0;
    top: 50%;
    padding: 0;
    margin: -9px 0 0;
    width: auto;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: auto;
    font-size: 1em;
    line-height: 20px;
    color: inherit;
    pointer-events: none;
    color: $txt-secondary-color;
    transition: top $transition-speed, color $transition-speed,
      font-size $transition-speed;
    @include active-label();
  }
  %field:placeholder-shown ~ .label {
    flex-shrink: 0;
    @include inactive-label();
  }
  %field:not(:placeholder-shown) ~ .addon,
  %field:-webkit-autofill ~ .addon {
    color: $txt-primary-color;
  }
  %field:-webkit-autofill ~ .label,
  :host(.focus) & %field ~ .label,
  %field:focus ~ .label {
    @include active-label();
  }
  :host(.focus) & %field ~ .label,
  %field:focus ~ .label {
    color: $accent-color;
  }
  :host(.focus) & %field ~ .border-bar:before,
  %field:focus ~ .border-bar:before {
    transform: rotateY(0deg);
  }
  textarea {
    padding-top: 0;
    margin-top: 15px;
    &:placeholder-shown ~ .label {
      top: 22px;
    }
    & ~ .label,
    &:focus ~ .label {
      top: 0px;
    }
    & ~ .addon {
      align-self: flex-start;
      padding-bottom: 0;
      padding-top: 16px;
    }
  }

  // force label active state
  &.activate-label %field ~ .label {
    @include active-label();
  }

  // error state
  &.has-error {
    .addon,
    .label,
    %field:focus ~ .label {
      color: $danger-color;
    }
    .border-bar,
    .border-bar:before {
      background: $danger-color;
    }
  }

  // disabled state
  &.disabled {
    .field-content {
      .addon,
      .label,
      %field,
      %field::placeholder {
        color: $txt-disabled-color;
      }
    }
    .border-bar {
      opacity: 0.4;
    }
  }

  // "plain" style
  .input-host[noborder] &,
  :host(.noborder) &,
  &[noborder],
  &.noborder {
    .border-bar {
      visibility: hidden;
    }
  }
}
</style>
