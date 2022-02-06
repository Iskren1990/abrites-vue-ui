<script lang="ts">
import { defineComponent, defineProps } from "vue";

export default defineComponent({ name: "AbritesInfo" });
</script>

<script lang="ts" setup>
interface IInfoProps {
  prop: string;
  value: string;
}

const props = defineProps<IInfoProps>();
</script>

<template>
  <div class="info-host">
    <slot name="prefix"></slot>
    <div class="content">
      <div class="key">{{ props.prop }}</div>
      <div class="value">{{ props.value }}</div>
    </div>
    <slot name="suffix"></slot>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.info-host {
  @include normalize-host();
  @include children-spacing(10px);
  display: flex;
  align-items: center;
  width: 100%;
  margin: (math.div($base-spacing, 2)) 0;
  &[spaced],
  &.spaced {
    margin: $base-spacing 0;
  }
}

.content {
  display: block;
  max-width: 100%;
}

.key {
  display: block;
  width: 100%;
  line-height: 1;
  font-size: 0.9em;
  font-weight: normal;
  color: $txt-hint-color;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.value {
  display: block;
  width: 100%;
  font-size: 1.1em;
  font-weight: $txt-bold;
  color: $txt-secondary-color;
  word-break: break-word;
}

.key ~ .value {
  margin-top: 8px;
}
</style>
