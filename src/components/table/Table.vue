<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, ref, computed } from "vue";
import { ISortData, SortDirection } from "./ISortData";
import { ITableAction } from "./ITableAction";
import { ITableColumn } from "./ITableColumn";

interface ITableProps {
  items: Array<Record<never, never>>;
  columns?: ITableColumn[];
  actions?: ITableAction[];
  sort?: ISortData;
  loading?: boolean;
  noItemsText?: string;
}

const props = withDefaults(defineProps<ITableProps>(), {
  loading: false,
  noItemsText: "No items to show.",
});

const emit = defineEmits<{ (event: "sort-change", data: ISortData): void }>();

const _sort = ref(props.sort);
const sort = computed({
  get: () => _sort.value,
  set: (newSort) => _setSort(newSort, false),
});

const isLoading = computed(() => props.loading);

const hasActions = computed(() => props.actions?.length);

const isCenterAligned = (tc: ITableColumn) =>
  tc.cssClass?.includes("align-center");

const isRightAligned = (tc: ITableColumn) =>
  tc.cssClass?.includes("align-right");

const isLeftAligned = (tc: ITableColumn) => tc.cssClass?.includes("align-left");

const isColumnSorted = (tc: ITableColumn) => {
  return sort.value && sort.value.key == (tc.sortKey ??= tc.key);
};

const isRoundButton = (a: ITableAction) => a.icon != null && a.icon.length;

const getColumnSortDirection = (tc: ITableColumn): SortDirection =>
  isColumnSorted(tc) ? sort.value?.direction : null;

const toggleSort = (tc: ITableColumn) => {
  if (tc.sortable == false || false) {
    return;
  }

  const direction = getColumnSortDirection(tc);

  if (direction == "asc") {
    _setSort({ key: (tc.sortKey ??= tc.key), direction: "desc" });
  } else if (direction == "desc") {
    _setSort(null);
  } else {
    _setSort({ key: (tc.sortKey ??= tc.key), direction: "asc" });
  }
};

const _setSort = (sort?: ISortData, triggerChange = true) => {
  _sort.value = sort;

  if (triggerChange) {
    emit("sort-change", sort);
  }
};

const deepGet = (map: Record<string, never>, key: string) => {
  return _deepGet(map, key.split(".").reverse());
};

const _deepGet = (item: unknown, keys: string[]) => {
  if (item == null) {
    return null;
  }
  if (!keys.length) {
    return item;
  }
  if (Object.prototype.toString.call(item) === "[object Object]") {
    return _deepGet(item[keys.pop()], keys);
  } else {
    return null;
  }
};
</script>

<template>
  <div class="table-host">
    <AbritesLoader
      class="table-loader"
      v-if="isLoading"
      :active="isLoading"
      accent
      small
    ></AbritesLoader>
    <table :class="{ loading: isLoading }">
      <thead class="responsive-hide">
        <tr>
          <th
            v-for="(column, key) in columns"
            :key="key"
            :class="[
              {
                sortable: column.sortable || true,
                sorted: (column.sortable || true) && isColumnSorted(column),
              },
              column.cssClass,
            ]"
            @click="column.sortable || true ? toggleSort(column) : null"
          >
            <span
              v-if="
                (column.sortable || true) &&
                (isRightAligned(column) || isCenterAligned(column))
              "
              class="sort-handle"
            >
              <AbritesIcon
                class="sort-icon"
                :icon="
                  getColumnSortDirection(column) != 'desc'
                    ? 'arrow_upwards'
                    : 'arrow_downward'
                "
              ></AbritesIcon>
            </span>

            <span class="txt">{{ column.header || column.key }}</span>

            <span
              v-if="(column.sortable || true) && !isLeftAligned(column)"
              class="sort-handle"
            >
              <AbritesIcon
                class="sort-icon"
                :icon="
                  getColumnSortDirection(column) != 'desc'
                    ? 'arrow_upwards'
                    : 'arrow_downward'
                "
              ></AbritesIcon>
            </span>
          </th>

          <th
            v-if="hasActions"
            class="min-width align-right action-column"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!items.length && !isLoading">
          <td colspan="99" class="hinted">{{ noItemsText }}</td>
        </tr>

        <tr v-for="(item, key) in items" :key="key">
          <td
            v-for="column in columns"
            :key="column.key"
            :class="column.cssClass"
          >
            <span class="responsive-header-column">
              {{ column.header }}
            </span>

            <div class="column-content">
              <template v-if="column.content == null">{{
                deepGet(item, column.key)
              }}</template>

              <template v-if="column.content != null">
                <component :is="column.content" :item="item[column.key]" />
              </template>
            </div>
          </td>

          <!-- Actions: -->
          <td v-if="hasActions" class="min-width align-right action-column">
            <div class="action-ctrls">
              <template let-action v-for="(action, key) in actions" :key="key">
                <AbritesButton
                  v-if="action.visible != null ? action.visible!(item) : true"
                  class="action-button"
                  :disabled="action.disabled != null ? action.disabled!(item) : false"
                  :class="[
                    {
                      flat: !action.cssClass,
                    },
                    action.cssClass,
                  ]"
                  :round="isRoundButton(action) ? 'true' : null"
                  v-abrites-tooltip="isRoundButton(action) ? action.label : ''"
                  @trigger="action.trigger != null ? action.trigger!(item) : null"
                >
                  <AbritesIcon
                    v-if="isRoundButton(action)"
                    :icon="action.icon"
                  ></AbritesIcon>
                  <span v-if="!isRoundButton(action)" class="txt">
                    {{ action.label }}
                  </span>
                </AbritesButton>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.table-host {
  @include normalize-host();
  position: relative;
  display: block;
  width: 100%;
  clear: both;
}

.table-loader {
  position: absolute;
  z-index: 2;
  top: -2px;
  right: 0;
}

table {
  @include shadowize();
  font-size: inherit;
  width: 100%;
  border: 0;
  border-collapse: collapse;
  vertical-align: top;
  border-radius: $border-radius;
  margin-bottom: math.div($base-spacing, 2);
  transition: opacity $transition-speed;
  thead,
  tbody,
  tr,
  td {
    border-radius: inherit;
  }
  td,
  th {
    text-align: left;
    padding: 15px 20px;
    vertical-align: inherit;
    color: $txt-primary-color;
    box-sizing: border-box;
    border-bottom: 1px solid $border-color;
  }
  th {
    color: $txt-secondary-color;
    font-size: 0.9rem;
    line-height: 16px;
    font-weight: $txt-bold;
    text-transform: uppercase;
    vertical-align: middle;
    user-select: none;
    .txt,
    .sort-handle {
      display: inline-block;
      vertical-align: top;
    }
    .sort-handle {
      margin-left: 5px;
      margin-top: -2px;
      opacity: 0;
      transform: translateY(5px);
      transition: opacity 0.2s, transform 0.2s;
      font-size: 1.3em;
      .icon-host,
      i {
        font-size: inherit;
      }
    }
    &.sortable {
      cursor: pointer;
    }
    &:hover,
    &.sorted {
      .sort-handle {
        opacity: 0.5;
        transform: scale(1);
      }
    }
    &.sorted {
      color: $accent-color;
      .sort-handle {
        opacity: 1;
      }
    }
  }
  > :last-child > tr:last-child > td {
    border-bottom: 0;
  }
  > tbody > tr {
    transition: box-shadow 0.2s;
    &:hover {
      background: rgba($hover-color, 0.01);
    }
  }
  > thead > tr:last-child > th {
    box-shadow: 0px 2px 0px 0px $accent-color;
    &:first-child {
      border-top-left-radius: inherit;
    }
    &:last-child {
      border-top-right-radius: inherit;
    }
  }

  .responsive-header-column {
    display: none;
  }

  // column helper classes
  // ('.responsive-hide' also could be used to hide a column under responsive view)
  .hinted {
    color: $txt-hint-color;
  }
  .min-width {
    width: 1%;
    white-space: nowrap;
  }
  .max-width {
    width: 99%;
  }
  .align-right {
    text-align: right;
  }
  .align-left {
    text-align: left;
  }
  .align-center {
    text-align: center;
  }
  .total {
    @extend .min-width;
    @extend .align-right;
  }
  td.total {
    font-weight: $txt-bold;
    font-size: 1.3em;
  }
  td.emphasize {
    font-weight: $txt-bold;
  }
  .action-ctrls {
    margin: -3px 0;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    .action-button,
    .button-host {
      display: inline-block;
      vertical-align: top;
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  // styles
  :host(.striped) &,
  .table-host[striped] &,
  :host(.striped-light) &,
  .table-host[striped-light] & {
    box-shadow: none;
    > tbody > tr {
      background: none;
      transition: box-shadow 0.2s;
      > td {
        border: 0;
        &:first-child {
          border-top-left-radius: $border-radius;
          border-bottom-left-radius: $border-radius;
        }
        &:last-child {
          border-top-right-radius: $border-radius;
          border-bottom-right-radius: $border-radius;
        }
      }
      &:nth-child(even) > td {
        background: $panel-color;
      }
    }
  }
  :host(.striped-light) &,
  .table-host[striped-light] & {
    background: none;
    > tbody > tr:nth-child(even) > td {
      background: $hover-color;
    }
  }

  // states
  &.loading {
    opacity: 0.5;
    pointer-events: none;
  }

  // responsive
  @media screen and (max-width: 800px) {
    display: block;
    width: 100%;
    tbody,
    tbody tr,
    tbody th,
    tbody td {
      display: block;
      width: 100%;
      text-align: left;
      height: auto;
      min-height: 0;
      border: 0;
    }
    tbody td,
    tbody th {
      height: auto;
      padding-top: 8px;
      padding-bottom: 8px;
      &:first-child {
        padding-top: (math.div($base-spacing, 2));
      }
      &:last-child {
        padding-bottom: (math.div($base-spacing, 2));
      }
    }
    tbody tr {
      border-bottom: 1px solid $border-color;
      &:last-child {
        border-bottom: 0;
      }
    }
    .action-ctrls {
      display: flex;
      width: 100%;
      justify-content: center;
    }
    .responsive-hide {
      display: none !important;
    }
    .responsive-header-column,
    .column-content {
      display: inline-block;
      vertical-align: middle;
    }
    .responsive-header-column {
      margin-right: 10px;
      font-weight: $txt-bold;
      font-size: 0.9rem;
      text-transform: uppercase;
      color: $txt-secondary-color;
    }
  }
}
</style>
