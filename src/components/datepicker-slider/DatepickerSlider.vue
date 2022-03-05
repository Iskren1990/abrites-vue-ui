<script lang="ts" setup>
import { useEventListener } from "@/composables";
import {
  differenceInSeconds,
  endOfDay,
  endOfToday,
  format,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  startOfDay,
  startOfToday,
  Duration,
  add,
  isWithinInterval,
  Interval,
  sub,
  differenceInDays,
  getHours,
  getMinutes,
  getSeconds,
  getDay,
  intervalToDuration,
} from "date-fns";
import {
  withDefaults,
  defineProps,
  defineEmits,
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";

interface IDatepickerSliderProps {
  selected?: Date[];
  hotkeys?: boolean;
  minDate?: Date;
  maxDate?: Date;
  maxRange?: number;
}

interface Point {
  pageX: number;
  pageY: number;
}

enum RangeSide {
  left,
  right,
}

const props = withDefaults(defineProps<IDatepickerSliderProps>(), {
  selected: () => [],
  hotkeys: false,
});

const emit = defineEmits<{
  (event: "update:selected", val: Date[]): void;
  (event: "drag-end", val: Date[]): void;
  (event: "resize-end", val: Date[]): void;
  (event: "pan-end", val: Date[]): void;
}>();

// Html el refs
const rangeContainer = ref<HTMLDivElement>();
const datesContainer = ref<HTMLDivElement>();

// constants
const draggingBodyClass = "date-slider-dragging";
const resizingBodyClass = "date-slider-resizing";

// checked
const dates = ref<Date[]>([]);
const activeResizeSide = ref<RangeSide>();
const isResizing = ref(false);
const isDragging = ref(false);
const isInteracting = computed(() => isResizing.value || isDragging.value);

const localSelected = ref(props.selected);
const hasValidRange = computed(() => isValidRange(localSelected.value));

const isValidRange = (range: Date[]) =>
  range.length == 2 &&
  isDate(range[0]) &&
  isDate(range[1]) &&
  isBefore(range[0], range[1]);

const hasReachedMaxRange = computed(
  () =>
    props.maxRange != null &&
    hasValidRange &&
    differenceInSeconds(localSelected.value[1], localSelected.value[0]) >=
      props.maxRange
);
const hasReachedMinDate = computed(
  () =>
    props.minDate != null &&
    hasValidRange &&
    (isEqual(localSelected.value[0], props.minDate) ||
      isBefore(localSelected.value[0], props.minDate))
);
const hasReachedMaxDate = computed(
  () =>
    props.maxDate != null &&
    hasValidRange &&
    (isEqual(localSelected.value[1], props.maxDate) ||
      isAfter(localSelected.value[1], props.maxDate))
);

const initialPoint = ref<Point | undefined>();
const initialValue = computed(() =>
  hasValidRange.value ? localSelected.value : defaultValue
);

const defaultValue = [startOfToday(), endOfToday()];

const monthLabel = (date) => format(date, "MMM");
const dayLabel = (date) => format(date, "dd");
const yearLabel = (date) => format(date, "y");

// Listeners
const {
  registerListener: registerHotkeyListener,
  removeListener: removeHotkeyListener,
} = useEventListener(document, "keydown", hotkeyCallback);

const {
  registerListener: registedRefreshListener,
  removeListener: removeRefreshListener,
} = useEventListener(window, "resize", refreshSlider);

const {
  registerListener: registerResizeListener,
  removeListener: removeResizeListener,
} = useEventListener(document, "mousemove", resizeCallback);

const {
  registerListener: registerDragListener,
  removeListener: removeDragListener,
} = useEventListener(document, "mousemove", dragCallback);

const {
  registerListener: registerDragStopListener,
  removeListener: removeDragStopListener,
} = useEventListener(document, "mouseup", stopDragging);

const {
  registerListener: registerResizeStopListener,
  removeListener: removeResizeStopListener,
} = useEventListener(document, "mouseup", stopResizing);

onMounted(() => {
  registedRefreshListener();

  if (props.hotkeys) {
    initHotkeysListener();
  }
  if (!localSelected.value.length) {
    setRange(defaultValue);
  } else {
    refreshSlider();
    setRange(localSelected.value);
  }
});

onUnmounted(() => {
  removeHotkeyListener();
  removeRefreshListener();
  removeResizeListener();
  removeDragListener();
  removeDragStopListener();
  removeResizeStopListener();
});

const setRange = (range: Date[]) => {
  localSelected.value = isValidRange(range) ? range : defaultValue;

  limitCurrentRange();
  refreshSlider();

  emit("update:selected", localSelected.value);
};

const selectDay = (date: Date) => {
  setRange([startOfDay(date), endOfDay(date)]);
};

const panLeft = () => pan(-1);
const panRight = () => pan(1);

const pan = (direction: number) => {
  const rangeWidth = rangeContainer.value?.clientWidth ?? 100;
  const factor = rangeWidth > 100 ? 6 : 4;
  const shiftInSeconds = (rangeWidth / factor) * calcSecondsPerPixel();
  const currentRange = initialValue.value;
  const shift: Duration = {
    seconds: direction * Math.max(Math.trunc(shiftInSeconds), 60),
  };

  setRange([add(currentRange[0], shift), add(currentRange[1], shift)]);

  emit("pan-end", localSelected.value);
};

const isDayInRange = (date: Date) => {
  if (!localSelected.value.length) return false;

  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  const interval: Interval = {
    start: isAfter(localSelected.value[0], localSelected.value[1])
      ? localSelected.value[1]
      : localSelected.value[0],
    end: isAfter(localSelected.value[0], localSelected.value[1])
      ? localSelected.value[0]
      : localSelected.value[1],
  };

  return (
    isWithinInterval(dayStart, interval) ||
    isWithinInterval(dayEnd, interval) ||
    isWithinInterval(localSelected.value[0], { start: dayStart, end: dayEnd })
  );
};

const isDateDisabled = (date: Date) =>
  (props.maxDate && isAfter(date, props.maxDate)) ||
  (props.minDate && isBefore(date, props.minDate));

// ---------------------------------------------------------------------------
// Range resizing
// ---------------------------------------------------------------------------

function startResizing(e: MouseEvent) {
  stopResizing();
  stopDragging();
  if (rangeContainer.value == null) {
    return;
  }

  e.preventDefault();
  e.stopImmediatePropagation();

  document.body.classList.add(resizingBodyClass);

  isResizing.value = true;

  activeResizeSide.value = (e.target as HTMLElement).classList.contains("left")
    ? RangeSide.left
    : RangeSide.right;

  initialPoint.value = { pageX: e.pageX, pageY: e.pageY };

  initResizeListeners();
}

function stopResizing() {
  document.body.classList.remove(resizingBodyClass);

  initialPoint.value = null;
  removeResizeListener();

  if (isResizing.value) {
    isResizing.value = false;
    emit("resize-end", localSelected.value);
  }
}

const initResizeListeners = () => {
  registerResizeStopListener();
  registerResizeListener();
};

// ---------------------------------------------------------------------------
// Dates dragging
// ---------------------------------------------------------------------------

function startDragging(e: MouseEvent) {
  stopResizing();
  stopDragging();

  e.preventDefault();
  e.stopImmediatePropagation();

  document.body.classList.add(draggingBodyClass);

  isDragging.value = true;

  initialPoint.value = { pageX: e.pageX, pageY: e.pageY };

  initDragListeners();
}

function stopDragging() {
  document.body.classList.remove(draggingBodyClass);

  initialPoint.value = null;
  removeDragListener();

  if (isDragging.value) {
    isDragging.value = false;
    emit("drag-end", localSelected.value);
  }
}

const initDragListeners = () => {
  registerDragStopListener();
  registerDragListener();
};

// ---------------------------------------------------------------------------
// Hotkeys
// ---------------------------------------------------------------------------
const initHotkeysListener = () => {
  removeHotkeyListener();
  registerHotkeyListener();
};

// Listeners callbacks
function hotkeyCallback(e: KeyboardEvent) {
  if (
    (e.key != "ArrowLeft" && e.key != "ArrowRight") ||
    (e.target as HTMLElement).tagName == "INPUT"
  ) {
    return;
  }

  e.preventDefault();

  if (e.key != "ArrowLeft") {
    panLeft();
  } else {
    panRight();
  }
}

function refreshSlider() {
  refreshDatesList();

  const dateElPixels = () => {
    const pixelsPerSecond = calcPixelsPerSecond();
    const range = initialValue.value;

    const rangeDiff = differenceInSeconds(range[1], range[0]);
    const rangeWidth = rangeDiff * pixelsPerSecond;

    const startDiff = differenceInSeconds(range[0], dates.value[0]);

    const rangeLeft = Math.floor(startDiff * pixelsPerSecond);

    rangeContainer.value.style.width = `${rangeWidth}px`;
    rangeContainer.value.style.left = `${rangeLeft}px`;

    // ensures that the range container remains centered
    datesContainer.value.scrollTo(
      rangeLeft - datesContainer.value.clientWidth / 2 + rangeWidth / 2,
      0
    );
  };
  nextTick(dateElPixels);
}

function resizeCallback(e: MouseEvent) {
  const secondsPerPixel = calcSecondsPerPixel();
  if (initialPoint.value == null) {
    return;
  }

  const diff = Math.floor(
    (e.pageX - initialPoint.value.pageX) * secondsPerPixel
  );

  // reset innitial point psn to avoid cumulative error
  initialPoint.value.pageX = e.pageX;
  const shift: Duration = { seconds: diff * 2 };

  let newRange: Date[];

  if (activeResizeSide.value == RangeSide.left) {
    newRange = [add(initialValue.value[0], shift), initialValue.value[1]];
  } else {
    newRange = [initialValue.value[0], add(initialValue.value[1], shift)];
  }

  if (!isValidRange(newRange)) {
    return;
  }

  const maxRangeDiff = calcMaxPossibleRangeDiff();
  if (differenceInSeconds(newRange[1], newRange[0]) > maxRangeDiff) {
    return;
  }

  // min && max range reached
  if (
    hasReachedMaxDate.value &&
    hasReachedMinDate.value &&
    differenceInDays(newRange[1], newRange[0]) >=
      differenceInDays(localSelected.value[1], localSelected.value[0])
  ) {
    return;
  }

  setRange(newRange);
}
function dragCallback(e: MouseEvent) {
  const secondsPerPixel = calcSecondsPerPixel();
  if (initialPoint.value == null) {
    return;
  }

  const diff = Math.floor(
    (initialPoint.value.pageX - e.pageX) * secondsPerPixel
  );

  // reset innitial point psn to avoid cumulative error
  initialPoint.value.pageX = e.pageX;
  const shift: Duration = { seconds: diff };

  setRange([
    add(initialValue.value[0], shift),
    add(initialValue.value[1], shift),
  ]);
}
// ---------------------------------------------------------------------------
// Other internal helpers
// ---------------------------------------------------------------------------

const getDateElemWidth = (): number =>
  datesContainer.value?.querySelector(".date")?.clientWidth || 50;

const calcSecondsPerPixel = () => 86400 / getDateElemWidth();

const calcPixelsPerSecond = () => getDateElemWidth() / 86400;

const calcMaxPossibleRangeDiff = (edgesThreshold = 30) => {
  if (datesContainer.value == null) {
    return 1;
  }

  const secondsPerPixel = calcSecondsPerPixel();

  return datesContainer.value.clientWidth * secondsPerPixel - edgesThreshold;
};

const calcRequiredDatesCount = (additionalDays = 3) => {
  if (datesContainer.value == null) {
    return 1;
  }

  const dateElemWidth = getDateElemWidth();

  return (
    Math.ceil(datesContainer.value.clientWidth / dateElemWidth) +
    2 * additionalDays
  );
};

const limitCurrentRange = () => {
  const currentRange = differenceInSeconds(
    localSelected.value[1],
    localSelected.value[0]
  );
  // check interval
  if (props.maxRange != null && currentRange > props.maxRange) {
    if (activeResizeSide.value == RangeSide.left) {
      localSelected.value[0] = sub(localSelected.value[1], {
        seconds: props.maxRange,
      });
    } else {
      localSelected.value[1] = add(localSelected.value[0], {
        seconds: props.maxRange,
      });
    }
  }
  // limit bounds
  if (isAfter(props.minDate, localSelected.value[0])) {
    localSelected.value[1] = add(props.minDate, { seconds: currentRange });
    localSelected.value[0] = props.minDate;
  }
  if (isBefore(props.maxDate, localSelected.value[1])) {
    localSelected.value[0] = sub(props.maxDate, { seconds: currentRange });
    localSelected.value[1] = props.maxDate;
  }
};

const refreshDatesList = () => {
  dates.value = [] as Date[];

  const daysCount = calcRequiredDatesCount();
  const range = localSelected.value.length ? localSelected.value : defaultValue;
  const rangeDaysCount = differenceInDays(range[1], range[0]);
  const daysThreshold = Math.ceil((daysCount - rangeDaysCount) / 2);
  const startDate = sub(range[0], {
    days: daysThreshold,
    hours: getHours(range[0]),
    minutes: getMinutes(range[0]),
    seconds: getSeconds(range[0]),
  });

  new Array(daysCount)
    .fill(1)
    .map((_, ind) => dates.value.push(add(startDate, { days: ind })));
};
</script>

<template>
  <div class="datepicker-slider-host">
    <AbritesButton
      class="slider-button left"
      :continuous="50"
      :disabled="hasReachedMinDate"
      @trigger="panLeft"
    >
      <AbritesIcon small icon="chevron_left"></AbritesIcon>
    </AbritesButton>

    <div class="dates-wrapper">
      <div ref="datesContainer" class="dates" @mousedown="startDragging">
        <div
          v-for="(date, index) of dates"
          :key="index"
          class="date"
          :class="{
            disabled: isDateDisabled(date),
            highlight: isDayInRange(date),
          }"
          @dblclick="selectDay(date)"
        >
          <div class="date-label month">{{ monthLabel(date) }}</div>
          <div class="date-label day">{{ dayLabel(date) }}</div>
          <div class="date-label year">{{ yearLabel(date) }}</div>
          <div class="date-marks">
            <span class="mark"></span>
            <span class="mark"></span>
            <span class="mark highlight"></span>
            <span class="mark"></span>
            <span class="mark"></span>
          </div>
        </div>

        <div
          ref="rangeContainer"
          class="range"
          :class="{
            'max-range-reached': isResizing && hasReachedMaxRange,
            'min-date-reached': isInteracting && hasReachedMinDate,
            'max-date-reached': isInteracting && hasReachedMaxDate,
          }"
        >
          <nav class="range-handle left" @mousedown="startResizing"></nav>
          <nav class="range-handle right" @mousedown="startResizing"></nav>
        </div>
      </div>
    </div>

    <AbritesButton
      class="slider-button right"
      :continuous="50"
      :disabled="hasReachedMaxDate"
      @trigger="panRight"
    >
      <AbritesIcon small icon="chevron_right"></AbritesIcon>
    </AbritesButton>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.datepicker-slider-host {
  @include normalize-host();
  @include shadowize();
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65px;
  width: 100%;
  background: $panel-color;
  border-radius: $border-radius + 1;
}

.slider-button {
  position: relative;
  z-index: 2;
  width: auto;
  height: 100%;
  ::v-deep(.button) {
    box-shadow: none;
    .button-content {
      padding: 5px;
    }
  }
  &.left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &.right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.date {
  $marks-height: 10px;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 70px;
  height: 100%;
  padding: 7px 5px ($marks-height + 2);
  margin: 0;
  text-align: center;
  user-select: none;
  color: $txt-secondary-color;
  box-shadow: inset 1px 0px 0px $border-color;
  &:first-child {
    box-shadow: none;
  }
  .date-label {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1;
    white-space: nowrap;
    transition: color $transition-speed;
    &.month {
      font-size: 0.8em;
      text-transform: uppercase;
    }
    &.year {
      font-size: 0.85em;
    }
    &.day {
      flex-grow: 1;
      font-weight: $txt-bold;
      font-size: 1.15em;
    }
  }
  .date-marks {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    width: 100%;
    height: $marks-height;
    .mark {
      display: block;
      width: 1px;
      height: 60%;
      background: $border-color;
      &.highlight {
        height: 100%;
        background: $field-border-color;
      }
    }
  }

  // variants
  &.highlight {
    .date-label.day {
      color: $txt-primary-color;
    }
  }
  &.disabled {
    color: $txt-disabled-color;
    .date-label.day {
      color: inherit;
    }
    .date-marks {
      opacity: 0.5;
    }
  }
}

.dates {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  scroll-behavior: auto;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}

.dates-wrapper {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // edges
  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    width: 0;
    height: 100%;
    box-shadow: 0 0 15px 15px darken($panel-color, 2%);
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
}

.range {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 1px;
  height: 100%;
  min-width: 2px;
  user-select: none;
  border-radius: $border-radius;
  background: rgba($accent-color, 0.05);
  border: 1px solid $accent-color;
  transition: border $transition-speed, background $transition-speed;
  pointer-events: none;
  .range-handle {
    $width: 6px;
    $height: 25px;
    display: block;
    outline: 0;
    position: absolute;
    top: 50%;
    width: $width;
    height: $height;
    margin-top: -(math.div($height, 2));
    border-radius: $border-radius;
    background: darken($accent-color, 5%);
    transition: background $transition-speed;
    pointer-events: auto;
    cursor: col-resize;
    &.left {
      left: -(math.div($width, 2));
    }
    &.right {
      right: -(math.div($width, 2));
    }
    &:hover,
    &:focus,
    &:active {
      background: darken($accent-color, 15%);
    }
  }
  &.max-range-reached {
    border-color: $danger-color;
    .range-handle {
      background: $danger-color;
    }
  }
  &.min-date-reached {
    .range-handle.left {
      background: $danger-color;
    }
  }
  &.max-date-reached {
    .range-handle.right {
      background: $danger-color;
    }
  }
}

::v-deep() body.date-slider-resizing {
  cursor: col-resize;
  .dates,
  .dates:active {
    cursor: inherit;
  }
}
::v-deep() body.date-slider-dragging {
  cursor: grabbing;
}
</style>
