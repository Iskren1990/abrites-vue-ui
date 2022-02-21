<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, computed, ref } from "vue";

import { SelectOption } from "../select/select-option";
import { PaginationData } from "./pagination-data";

interface IPaginationProps {
  paginationData: PaginationData;
  totalItems?: number;
  pageSizeOptions?: number[];
  perPageText?: string;
  ofTotalText?: string;
  urlSyncParam?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IPaginationProps>(), {
  totalItems: 0,
  disabled: false,
  perPageText: "Items per page",
  ofTotalText: "of",

  pageSizeOptions: () => [15, 30, 50],
});

const emit = defineEmits<{
  (emit: "update:pagination-data", data: PaginationData): void;
}>();

const onPageSizeSelectChanged = (selected: SelectOption) => {
  _pageSize.value = selected.label;
  _changeData(1, selected.label as number);
};

const page = () => props.paginationData.page;

const _pageSize = ref(
  props.paginationData.pageSize || props.pageSizeOptions[0]
);
const pageSize = computed({
  get: () => props.paginationData.pageSize || props.pageSizeOptions[0],
  set: onPageSizeSelectChanged,
});
const totalPages = computed(() =>
  props.totalItems == 0 ? 1 : Math.ceil(props.totalItems / pageSize.value)
);

const hasPrevPage = computed(() => page() > 1);
const hasNextPage = computed(() => page() < totalPages.value);
const rangeFrom = computed(() =>
  props.totalItems > 0 ? (page() - 1) * pageSize.value + 1 : 0
);

const rangeTo = computed(() =>
  Math.min(pageSize.value * page(), props.totalItems)
);

const _changeData = (newPage: number, newPageSize?: number) => {
  const newData = new PaginationData(
    newPage || page(),
    newPageSize || pageSize.value
  );
  emit("update:pagination-data", newData);
};

const prevPage = () => _changeData(page() - 1);

const nextPage = () => _changeData(page() + 1);
</script>

<template>
  <div class="pagination-host">
    <div class="per-page">
      <span class="txt">{{ perPageText }}</span>
      <AbritesSelect
        dense
        :disabled="disabled"
        :options="pageSizeOptions"
        v-model:select="pageSize"
      ></AbritesSelect>
    </div>

    <div v-if="totalItems > 0" class="results">
      {{ rangeFrom }} - {{ rangeTo }} {{ ofTotalText }} {{ totalItems }}
    </div>

    <div class="nav-buttons">
      <AbritesButton
        round
        flat
        class="nav-button"
        :disabled="disabled || !hasPrevPage"
        @trigger="prevPage"
      >
        <AbritesIcon icon="chevron_left"></AbritesIcon>
      </AbritesButton>
      <AbritesButton
        round
        flat
        class="nav-button"
        :disabled="disabled || !hasNextPage"
        @trigger="nextPage"
      >
        <AbritesIcon icon="chevron_right"></AbritesIcon>
      </AbritesButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.pagination-host {
  @include normalize-host();
  @include children-spacing($base-spacing);
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 0;
  color: $txt-secondary-color;
  font-size: 0.9em;
  user-select: none;

  // styles
  &[left],
  &.left {
    justify-content: flex-start;
  }
  &[center],
  &.center {
    justify-content: center;
  }

  // states
  &[disabled=""],
  &[disabled="true"] {
    color: $txt-disabled-color;
  }
}

.nav-button {
  margin-left: 5px;
  &:first-child {
    margin-left: 0;
  }
}

.per-page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  .txt {
    margin-right: 10px;
  }
}
</style>
