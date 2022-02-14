<script lang="ts" setup>
import { defineProps } from "vue";
import MenuItemModel from "./MenuItemModel";

const props = defineProps<{
  item: MenuItemModel;
}>();

function toggleSubmenuClass(event: Event) {
  (event.currentTarget as Element)
    ?.closest(".has-submenu")
    ?.classList.toggle("show-submenu");
}
</script>

<template>
  <AbritesIcon
    v-if="props.item?.icon != null"
    :icon="props.item?.icon || ''"
  ></AbritesIcon>
  <span v-if="props.item?.label != null" class="txt">{{
    props.item.label
  }}</span>

  <AbritesButton
    flat
    round
    small
    v-if="props.item?.hasChildren"
    class="submenu-toggle"
    @trigger.prevent="toggleSubmenuClass"
  >
    <AbritesIcon :icon="'arrow_drop_down'"></AbritesIcon>
  </AbritesButton>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

$icon-width: 24px;

::v-deep(.icon) {
  width: $icon-width;
  text-align: center;
  margin-right: (math.div($base-spacing, 2));
  flex-shrink: 0;
}
.txt {
  flex-grow: 1;
}
</style>
