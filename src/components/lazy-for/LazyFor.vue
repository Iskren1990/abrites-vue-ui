<script lang="ts" setup>
import {
  onMounted,
  onUnmounted,
  defineProps,
  ref,
  defineEmits,
  withDefaults,
  defineExpose,
  watch,
  computed,
} from "vue";

interface ILazyForProps {
  items?: unknown[];
  maxInitial?: number;
  increment?: number;
  // eslint-disable-next-line no-undef
  intersectionObserverOptions?: IntersectionObserverInit;
}
const props = withDefaults(defineProps<ILazyForProps>(), {
  increment: 20,
  maxInitial: 0,
});
const _items = ref<unknown[]>(props.items || []);
const _maxInitial = ref<number>(props.maxInitial);
const _activeCount = ref<number>(0);
const _lastEndCount = ref<number>(0);

const emit = defineEmits<{
  (event: "nextBatch"): void;
  (event: "end", totalLoaded?: number): void;
}>();

const min = (numOne: number, numTwo: number) =>
  [numOne, numTwo].sort((a, b) => a - b)[0];

const resetCounters = () => {
  if (_maxInitial.value > 0 && _items.value.length > 0) {
    _activeCount.value = min(_items.value.length, _maxInitial.value);
  } else {
    _activeCount.value = _items.value.length;
  }
  _lastEndCount.value = 0;
};

watch(() => [props.maxInitial, props.items], resetCounters);

// trget El to monitor
const target = ref<HTMLElement>();
onMounted(() => {
  resetCounters();
  observer.observe(target.value as HTMLElement);
});
onUnmounted(() => {
  observer.disconnect();
});

const _refreshObserver = () => {
  observer.unobserve(target.value as HTMLElement);
  observer.observe(target.value as HTMLElement);
};

// emits event on target reach, in case of custom sollution
const customHandledIntersesctionFn = () => emit("nextBatch");

// OOTB sollution, on each target reach ads "interval" count items to activeItems array
// Fires "end" event when all items from list have been added
const inturnallyHandledIntersection = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => {
  if (!entries.length) {
    return;
  }

  const entry = entries.pop() as IntersectionObserverEntry;
  if (!entry.isIntersecting) {
    return;
  }

  if (_activeCount.value == _items.value.length) {
    if (_lastEndCount.value != _activeCount.value) {
      // store last notified end count to prevent duplicated calls
      _lastEndCount.value = _activeCount.value;
      emit("end", _lastEndCount.value);
    }

    return;
  }

  _activeCount.value = _items.value.length
    ? min(_items.value.length, _activeCount.value + props.increment)
    : 0;

  _refreshObserver();
};

const intersectCallback =
  props.items == undefined
    ? customHandledIntersesctionFn
    : inturnallyHandledIntersection;

const observer = new IntersectionObserver(
  intersectCallback,
  props.intersectionObserverOptions
);

const activeItems = computed<unknown[]>(() =>
  _items.value.length
    ? _items.value.slice(0, min(_items.value.length, _activeCount.value))
    : []
);

defineExpose({ activeItems });
</script>

<template>
  <div class="lazy-for-host">
    <slot />
    <div ref="target" class="sentinel"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.lazy-for-host {
  @include normalize-host();
  display: block;
  width: 100%;
}
.sentinel {
  display: block;
  width: 1px;
  height: 1px;
}
</style>
