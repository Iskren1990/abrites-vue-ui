<script lang="ts" setup>
import { add, isAfter, isBefore, sub } from "date-fns";
import flatpicker from "flatpickr";
import { Options } from "flatpickr/dist/types/options";

import {
  ref,
  defineProps,
  withDefaults,
  defineEmits,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";
import { IDatepickerPreset } from "./IDatepickerPreset";

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
}

const props = withDefaults(defineProps<IDatepickerPorps>(), {
  selected: () => [],
  autoApply: false,
  clearOnCancel: false,
  cancelText: "Cancel",
  applyText: "Apply",
  time: false,
  range: false,
  months: 1,
});

const emit = defineEmits<{
  (event: "update:selected", value: Date[]): void;
  (event: "applied", range: Date[]): void;
  (event: "canceled"): void;
}>();

// Common datepicker computed props
// Once vue implements interface imports export common props in composable
const hasPresets = computed(() => props.presets?.length);
const enableRange = computed(() => props.range);
const enableTime = computed(() => props.time);

const canApply = ref(false);
const expectedDatesCount = computed(() => (enableRange.value ? 2 : 1));

/// template refs
// calendar ref
const calendarElem = ref<HTMLInputElement>();

// time range refs
const timeFromElem = ref<HTMLDivElement>();
const timeToElem = ref<HTMLDivElement>();

// calendar flatpickr Instance
const calendarPickerInst = ref<flatpicker.Instance>();

// time range flatpickr Instances
const timeFromPickerInst = ref<flatpicker.Instance>();
const timeToPickerInst = ref<flatpicker.Instance>();

const initCalendar = () => {
  calendarPickerInst.value?.destroy();
  const config: Options = {
    inline: true,
    mode: enableRange.value ? "range" : "single",
    enableTime: enableTime.value && !enableRange.value,
    time_24hr: true,
    minDate: props.minDate,
    maxDate: props.maxDate,
    showMonths: props.months,
    onValueUpdate: () => updateAllowedPickersMaxRange(),
    onChange: () => {
      extractPickersDate();
      props.autoApply && apply();
    },
    locale: {
      firstDayOfWeek: 1,
    },
  };

  calendarPickerInst.value = flatpicker(calendarElem.value, config);
};

const initTimeRangeComponents = () => {
  timeFromPickerInst.value?.destroy();
  timeToPickerInst.value?.destroy();
  if (
    !enableTime.value ||
    !enableRange.value ||
    timeFromElem.value == null ||
    timeToElem.value == null
  ) {
    return;
  }
  const fromConfig: Options = {
    inline: true,
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    defaultDate: "00:00",
    onChange: () => props.autoApply && apply(),
  };
  const toConfig: Options = {
    inline: true,
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    defaultDate: "23:59",
    onChange: () => props.autoApply && apply(),
  };

  timeFromPickerInst.value = flatpicker(timeFromElem.value, fromConfig);
  timeToPickerInst.value = flatpicker(timeToElem.value, toConfig);
};

const syncPickersWithValue = () => {
  const copy = props.selected || [];

  calendarPickerInst.value.setDate(copy);

  alignMonths();
  updateAllowedPickersMaxRange();

  if (enableRange.value && copy.length) {
    timeFromPickerInst.value?.setDate(copy.shift());
    timeToPickerInst.value?.setDate(copy.pop());
  }
};

const updateAllowedPickersMaxRange = () => {
  if (calendarPickerInst.value == null) {
    return;
  }

  // limit allowed range selection
  if (
    props.maxRange != null &&
    calendarPickerInst.value.selectedDates?.length == 1
  ) {
    const selected = calendarPickerInst.value.selectedDates[0];

    const timeFrom = timeFromPickerInst.value?.selectedDates[0];
    const timeTo = timeToPickerInst.value.selectedDates[0];

    let beforeLimit = add(selected, {
      hours: timeTo?.getHours() ?? 23,
      minutes: timeTo?.getMinutes() ?? 59,
      seconds: timeTo?.getSeconds() ?? 59,
    });

    beforeLimit = sub(beforeLimit, { seconds: props.maxRange });

    let afterLimit = add(selected, {
      hours: timeFrom?.getHours() ?? 0,
      minutes: timeFrom?.getMinutes() ?? 0,
      seconds: timeFrom?.getSeconds() ?? 0,
    });

    afterLimit = add(afterLimit, {
      seconds: props.maxRange,
    });

    const newMinDate =
      props.minDate != null && isAfter(props.minDate, beforeLimit)
        ? props.minDate
        : beforeLimit;

    const newMaxDate =
      props.maxDate != null && isBefore(props.maxDate, afterLimit)
        ? props.maxDate
        : afterLimit;

    // update picker options
    calendarPickerInst.value.set("minDate", newMinDate);
    calendarPickerInst.value.set("maxDate", newMaxDate);
  } else {
    // reset to default range selection limits (if changes were previously made)
    const activeMinDate = calendarPickerInst.value.config.minDate;

    const activeMaxDate = calendarPickerInst.value.config.maxDate;

    if (activeMinDate != props.minDate) {
      calendarPickerInst.value.set("minDate", props.minDate);
    }

    if (activeMaxDate != props.maxDate) {
      calendarPickerInst.value.set("maxDate", props.maxDate);
    }
  }
};

const extractPickersDate = () => {
  if (
    calendarPickerInst.value?.selectedDates?.length != expectedDatesCount.value
  ) {
    canApply.value = false;
    return; // invalid date selection
  }

  const calendarDates = [...calendarPickerInst.value.selectedDates];

  if (!enableRange.value) {
    canApply.value = 1 == expectedDatesCount.value;
    setValue([calendarDates[0]]);
    return;
  }

  let dateFrom = calendarDates.shift();
  let dateTo = calendarDates.pop();

  // apply 'From' time
  if (timeFromPickerInst.value?.selectedDates?.length) {
    const timeFromDate = timeFromPickerInst.value.selectedDates[0];

    dateFrom = add(dateFrom, {
      hours: timeFromDate.getHours(),
      minutes: timeFromDate.getMinutes(),
      seconds: timeFromDate.getSeconds(),
    });
  }

  // apply 'To' time
  if (timeToPickerInst.value?.selectedDates.length) {
    const timeToDate = timeToPickerInst.value.selectedDates[0];

    dateTo = add(dateTo, {
      hours: timeToDate.getHours(),
      minutes: timeToDate.getMinutes(),
      seconds: timeToDate.getSeconds(),
    });
  }
  const fromToInterval = dateTo?.getTime() - dateFrom?.getTime();
  // usually happen when the same day is picked and `from` time is after `to`
  // the selected range duration is more than the allowed [maxRange]
  if (
    isAfter(dateFrom, dateTo) ||
    (props.maxRange != null && fromToInterval > props.maxRange)
  ) {
    canApply.value = false;
    return; // invalid date selection
  }
  canApply.value = 2 == expectedDatesCount.value;
  setValue([dateFrom, dateTo]);
  return;
};

const setValue = (val: Date[]) => emit("update:selected", val);

const apply = () => {
  emit("applied", props.selected);
};

const cancel = () => {
  setValue([] as Date[]);
  emit("canceled");
};

const selectPreset = (preset: IDatepickerPreset) => {
  if (preset.trigger == null) {
    return;
  }
  const result = preset.trigger();
  setValue(result);

  (preset.autoApply || true) && apply();
};

// Ensures that the today/range end month is always placed on the most right side.
const alignMonths = () => {
  if (props.months > 1) {
    calendarPickerInst.value.changeMonth(-(props.months - 1));
  }
};

// Life Cycle Hooks
onMounted(() => {
  initCalendar();
  initTimeRangeComponents();
  syncPickersWithValue();
});

watch(() => props.selected, syncPickersWithValue);

onBeforeUnmount(() => {
  // destroy all flatpicker instances
  calendarPickerInst.value?.destroy();
  timeFromPickerInst.value?.destroy();
  timeToPickerInst.value?.destroy();
});
</script>

<template>
  <div
    class="datepicker-host"
    :class="{ 'with-time': time, range: range }"
    :months="months"
  >
    <div v-if="hasPresets" class="presets">
      <AbritesButton
        v-for="preset of presets"
        :key="preset.label"
        small
        @trigger="selectPreset(preset)"
        >{{ preset.label }}</AbritesButton
      >
    </div>

    <div ref="calendarElem"></div>
    <div v-if="enableRange && enableTime" class="time-range">
      <div ref="timeFromElem" class="time-field time-from"></div>
      <div ref="timeToElem" class="time-field time-to"></div>
    </div>

    <div v-if="!autoApply || true" class="buttons-group">
      <AbritesButton
        v-if="cancelText.length"
        flat
        block
        light
        @trigger="cancel"
        >{{ cancelText }}</AbritesButton
      >
      <AbritesButton flat block accent :disabled="!canApply" @trigger="apply">
        {{ applyText }}
      </AbritesButton>
    </div>
  </div>
</template>

<style>
@import "../../../node_modules/flatpickr/dist/flatpickr.min.css";
</style>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/flatpickr";

$base-calendar-width: 360px;

.datepicker-host {
  @include normalize-host();
  position: relative;
  display: block;
  max-width: 100%;
  padding: 5px;
  border-radius: $border-radius;
  background: $panel-color;

  width: $base-calendar-width;
  @for $i from 2 through 6 {
    &[months="#{$i}"] {
      width: $base-calendar-width + (200 * $i);
    }
  }

  &[block],
  &.block {
    width: 100%;
  }

  ::v-deep(.flatpickr-calendar) {
    max-width: 100%;
    padding-bottom: 6px;
    border-bottom: 1px solid $border-color;
  }
  &.with-time ::v-deep(.flatpickr-calendar) {
    padding-bottom: 0;
    &.rangeMode {
      border-bottom: 0;
    }
  }
  & > ::v-deep(:last-child) {
    border-bottom: 0 !important;
  }
}

.presets {
  $spacing: 8px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: math.div($spacing, 2);
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  border-radius: $border-radius;
  > * {
    width: 50%;
    flex-grow: 1;
    flex-basis: 0;
    margin: math.div($spacing, 2);
  }
}

.buttons-group {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

.time-range {
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin-top: 5px;
  .delimiter {
    margin: 0 5px;
    align-self: center;
    color: $txt-hint-color;
    text-transform: uppercase;
    font-size: 0.9em;
  }
  .time-field {
    flex-basis: 0;
    flex-grow: 1;
  }
  &:last-child ::v-deep(.flatpickr-calendar) {
    border-bottom: 0;
  }
}
</style>
