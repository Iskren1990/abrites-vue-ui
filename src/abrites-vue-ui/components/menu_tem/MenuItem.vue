<script lang="ts">
import { defineComponent, defineProps } from "vue";
export default defineComponent({ name: "AbritesMenuItem" });
</script>

<script lang="ts" setup>
import MenuItemModel from "./MenuItemModel";

defineProps({
  item: MenuItemModel,
});

function toggleSubmenuClass(event: Event) {
  (event.currentTarget as Element)
    ?.closest(".has-submenu")
    ?.classList.toggle("show-submenu");
}
</script>

<template>
  <AbritesIcon v-if="item?.icon != null" :icon="item.icon"></AbritesIcon>
  <span v-if="item?.label != null" class="txt">{{ item.label }}</span>

  <AbritesButton
    flat
    round
    small
    v-if="item?.hasChildren"
    class="submenu-toggle"
    @trigger="toggleSubmenuClass"
  >
    <AbritesIcon icon="arrow_drop_down"></AbritesIcon>
  </AbritesButton>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

$icon-width: 24px;

.icon {
  width: $icon-width;
  text-align: center;
  margin-right: (math.div($base-spacing, 2));
  flex-shrink: 0;
}
.txt {
  flex-grow: 1;
}
</style>
