<script lang="ts">
import useBaseErrorValidation from "@/abrites-vue-ui/composables/useBaseErrorValidation";
import {
  defineComponent,
  withDefaults,
  defineProps,
  defineEmits,
  toRefs,
} from "vue";

export default defineComponent({ name: "AbritesCheckbox" });
</script>

<script lang="ts" setup>
interface ICheckboxProps {
  value?: boolean;
  label?: string;
  hint?: string;
  error?: string | string[];
  disabled?: boolean;
}

const props = withDefaults(defineProps<ICheckboxProps>(), {
  value: false,
  error: "",
});

const { value, error, disabled } = toRefs(props);
const uniqueId = performance.now().toString();
const { errors, hasError } = useBaseErrorValidation(error);

const emit = defineEmits<{
  (event: "update:checkbox", checked: boolean): void;
}>();

const writeValue = (checkbox: boolean): void => {
  emit("update:checkbox", checkbox);
};
</script>

<template>
  <div class="checkbox-host" :class="hasError && 'has-error'">
    <div class="field-content">
      <input
        type="checkbox"
        :id="uniqueId"
        :disabled="disabled"
        :checked="value"
        @change.prevent="writeValue(!value)"
      />

      <label :for="uniqueId">
        <div class="label-content">
          <div class="txt txt-primary">{{ label }}</div>
          <div v-if="hint?.length" class="txt txt-secondary">
            {{ hint }}
          </div>
        </div>
      </label>

      <AbritesIcon
        v-if="hint?.length"
        icon="info"
        v-abrites-tooltip="hint"
        class="help-icon"
      ></AbritesIcon>
    </div>

    <div v-if="hasError" class="help help-error">
      {{ errors }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

@include toggle-field-elem();

.checkbox-host {
  @include normalize-host();
  position: relative;
  display: block;
  width: 100%;
  margin: 5px 0;

  @include help-block-elem();

  &[inline],
  &.inline {
    width: auto;
    display: inline-block;
    vertical-align: middle;
  }

  &[spaced],
  &.spaced {
    margin: 0 0 $base-spacing;
  }

  // hide plain hint in favour of .help-icon
  .field-content label .txt-secondary {
    display: none;
  }

  &[card],
  &.card {
    .field-content {
      label {
        @include shadowize();
        width: 100%;
        display: flex;
        align-items: center;
        border-radius: $border-radius;
        background: $panel-color;
        padding: math.div($base-spacing, 2);
        transition: background $transition-speed;
        &:before,
        &:after {
          left: auto;
          top: auto;
        }
        &:before {
          position: relative;
          margin: 0 (math.div($base-spacing, 2)) 0 0;
        }
        .txt {
          display: block;
          width: 100%;
          transition: color $transition-speed;
        }
        .txt-primary {
          font-weight: bold;
        }
        .txt-secondary {
          font-size: 0.9em;
          font-weight: normal;
          color: $txt-hint-color;
          margin-top: 5px;
        }
        &:hover,
        &:focus {
          background: $hover-color;
        }
        &:active {
          background: $active-color;
          transition-duration: math.div($transition-speed, 2);
        }
      }
      input:checked ~ label {
        .txt-primary {
          color: $accent-color;
        }
      }

      // hide tooltip hint
      .help-icon {
        display: none;
      }
    }
  }
}
</style>
