import { computed, ref } from "vue";
import {
  SelectOption,
  normalizeOptions,
} from "../components/select/select-option";
export function useBaseSelect<T>(props: IBaseSelect, emits) {
  const options = computed(() => normalizeOptions(props.options));

  const _selected = ref<SelectOption[]>([]);
  const selected = computed({
    get: () => _selected.value,
    set: (val) => {
      !props.multiple && clearSelection();

      _selected.value.push(...val);
    },
  });

  const hasSelected = computed(() => {
    return !!_selected.value?.length;
  });

  const selectOption = (option) => {
    if (
      option == null ||
      isOptionSelected(option) ||
      isOptionDisabled(option)
    ) {
      return;
    }

    selected.value = [option];

    emits(
      "update:select",
      props.multiple ? _selected.value.map((x) => x.label) : _selected.value[0]
    );
  };

  const deselectOption = (option) => {
    if (
      option == null ||
      !isOptionSelected(option) ||
      isOptionDisabled(option)
    ) {
      return;
    }

    const currentSelected = _selected.value;

    _selected.value = currentSelected.filter((x) => x != option);
  };

  const toggleOption = (option) =>
    isOptionSelected(option) ? deselectOption(option) : selectOption(option);

  const clearSelection = () => {
    _selected.value = [];
  };

  const _disabledOptions = ref(props.disabledOptions || []);
  const isOptionDisabled = (option) => _disabledOptions.value?.includes(option);

  const isOptionSelected = (option) => {
    return _selected.value?.includes(option);
  };

  const renderOptionLabel = (
    option: SelectOption
  ): string | number | symbol | unknown => {
    if (option == undefined) {
      return "Default Label";
    }
    return props.labelFactory != null
      ? props.labelFactory(option)
      : option.label;
  };

  return {
    options,
    selected,
    hasSelected,
    isOptionSelected,
    isOptionDisabled,
    renderOptionLabel,
    deselectOption,
    toggleOption,
    selectOption,
    normalizeOptions,
  };
}
// Props in IBaseSelect should be removed from Select.vue and RadioList.vue onde Vue suports interface import in setup fn.
export interface IBaseSelect {
  select?: string | number | symbol;
  options: Array<Record<string | number | symbol, unknown> | [] | string>;
  multiple?: boolean;
  disabledOptions?: Array<
    Record<string | number | symbol, unknown> | [] | string
  >;
  disabled?: boolean;
  labelFactory?: (option) => string;
}
