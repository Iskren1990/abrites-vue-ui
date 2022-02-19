<script lang="ts" setup>
import {
  withDefaults,
  defineProps,
  defineEmits,
  computed,
  onMounted,
  watch,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import { SelectOption } from "../select/select-option";
import { PaginationData } from "./pagination-data";

interface IPaginationProps {
  paginationData: PaginationData;
  totalItems?: number;
  pageSizeOptions?: number[];
  perPageText?: string;
  ofTotalText?: string;
  urlSync?: boolean;
  urlSyncParam?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IPaginationProps>(), {
  totalItems: 0,
  disabled: false,
  perPageText: "Items per page",
  ofTotalText: "of",
  urlSync: false,
  urlSyncParam: "page",
  pageSizeOptions: () => [15, 30, 50],
});

const emit = defineEmits<{
  (emit: "update:pagination-data", data: PaginationData): void;
}>();

const router = useRouter();

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

const _syncComponentWithUrl = () => {
  if (!props.urlSync) {
    return;
  }

  const params = router.currentRoute.value.query;
  const syncParams = params[props.urlSyncParam] as string;

  if (!syncParams?.length) {
    return;
  }
  const tempData = PaginationData.fromString(syncParams ?? props.urlSyncParam);

  emit("update:pagination-data", tempData);
};

onMounted(_syncComponentWithUrl);
watch(
  () => props.paginationData,
  () => _syncUrlWithComponent()
);

const _syncUrlWithComponent = () => {
  if (!props.urlSync) {
    return;
  }
  const currentRouteName = router.currentRoute.value.name;
  const query = router.currentRoute.value.query;
  const currentHash = router.currentRoute.value.hash;

  function toObj(key, value) {
    const obj = {};
    obj[key] = value;
    return obj;
  }

  router.push({
    name: currentRouteName,
    query: {
      ...query,
      ...toObj(props.urlSyncParam, props.paginationData.toString()),
    },
    hash: currentHash,
  });
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
