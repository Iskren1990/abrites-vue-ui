<script lang="ts">
import {
  withDefaults,
  defineProps,
  defineComponent,
  reactive,
  computed,
  onBeforeMount,
} from "@vue/runtime-core";
import { onMounted, watch, shallowRef } from "vue";
import { ChartConfiguration, ChartData, ChartOptions } from "chart.js";
export default defineComponent({ name: "AbritesChart" });
import { ChartController } from "./chart-controller";
</script>

<script lang="ts" setup>
interface ChartProps {
  data: ChartData;
  isLoading?: boolean;
  missingDataText?: string;
  group?: string;
  width?: number;
  height?: number;
  options?: ChartOptions;
  nocontrols?: boolean;
}

const props = withDefaults(defineProps<ChartProps>(), {
  isLoading: false,
  missingDataText: "No data to show",
  height: 350,
  width: 100,
  nocontrols: false,
});

// implement and delete
const hasRangeSelector = false;
const isZoomed = true;
const isStartRangeReached = false;
const isEndRangeReached = false;

const chartProps: ChartConfiguration = {
  type: "line",
  data: props.data,
  // options: props.options,
};
const chart = new ChartController({ group: props.group });
const reff = reactive(chartProps.data.datasets[0].data);
setInterval(() => console.log(reff.length), 2000);
watch(
  () => reff,
  () => {
    console.log("h", chartProps);
    const [data1, data2] = props.data.datasets;
    if (JSON.stringify(data1.data) !== JSON.stringify(data2.data)) {
      console.log("equal", JSON.stringify(data1), JSON.stringify(data2));

      chart?.updateChart();
    }
  },
  {
    deep: true,
    onTrigger(e) {
      debugger;
    },
  }
);

const chartEl = shallowRef<HTMLCanvasElement>();

onMounted(() => {
  console.log("mount");

  chart.initChart(chartEl, chartProps);
});

// const isInited = computed(() => _chart != null);
const isInited = true;

const resetZoom = () => {
  console.log("hello");
};
const panPrev = () => {
  console.log("hello");
};
const panNext = () => {
  console.log("hello");
};
</script>

<template>
  <div class="chart-host">
    <div class="chart-container">
      <canvas
        class="chart"
        ref="chartEl"
        :class="{ 'range-selector': hasRangeSelector }"
      ></canvas>
    </div>
    <AbritesLoader
      class="chart-loader"
      :active="props.isLoading"
    ></AbritesLoader>

    <div v-if="!props.isLoading && !isInited" class="chart-hint">
      <h6>{{ props.missingDataText }}</h6>
    </div>
    <div v-if="!props.nocontrols && isZoomed" class="chart-ctrls">
      <AbritesButton
        dark
        small
        class="ctrl-btn pan-btn-prev"
        v-abrites-tooltip="{
          abritesTooltip: 'Scroll left (Shift + Drag)',
          abritesTooltipPosition: 'bottom',
        }"
        :continuous="150"
        :disabled="isStartRangeReached"
        @trigger="panPrev()"
      >
        <AbritesIcon icon="arrow_back"></AbritesIcon>
      </AbritesButton>

      <AbritesButton dark small class="ctrl-btn reset-btn" @trigger="resetZoom"
        >Reset zoom</AbritesButton
      >
      <AbritesButton
        dark
        small
        class="ctrl-btn pan-btn-prev"
        v-abrites-tooltip="{
          abritesTooltip: 'Scroll right (Shift + Drag)',
          abritesTooltipPosition: 'bottom-right',
        }"
        :continuous="150"
        :disabled="isEndRangeReached"
        @trigger="panNext()"
      >
        <AbritesIcon icon="arrow_forward"></AbritesIcon>
      </AbritesButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

.chart-host {
  @include normalize-host();
  position: relative;
  display: block;
  width: 100%;
  height: 350px;
  padding: 0;
  margin: 0;
  color: $txt-secondary-color;
  &.loading {
    .chart-container {
      pointer-events: none;
    }
  }
}

.chart-container {
  position: relative;
  margin: auto;
  outline: 0;
  z-index: 0;
  width: 100% !important;
  height: 350px;
  user-select: none;

  // dygraph styles
  ::v-deep(.chart-container) {
    > canvas {
      width: 100% !important;
    }
    .dygraph-axis-label {
      color: $txt-secondary-color;
    }
    .dygraph-axis-label-x {
      margin-top: 12px;
    }
    .dygraph-axis-label-y {
      width: 120%;
      float: right;
      font-size: 0.96rem;
      overflow-wrap: break-word;
    }
    .dygraph-rangesel-bgcanvas,
    .dygraph-rangesel-fgcanvas {
      border-radius: $border-radius;
    }
    .dygraph-legend {
      @include shadowize();
      z-index: 8;
      left: auto !important; // overwrite inline styles
      right: 5px;
      padding: 10px;
      width: auto;
      min-width: 220px;
      color: $txt-primary-color;
      font-size: 0.95rem;
      overflow-wrap: break-word;
      background: rgba($base-color, 0.9);
      border-radius: $border-radius;
      pointer-events: none;
      .name {
        font-weight: bold;
      }
      .date {
        color: $txt-secondary-color;
        margin: 0 0 3px;
      }
      &:empty {
        display: none;
      }
      & > :first-child {
        margin-top: 0;
      }
      & > :last-child {
        margin-bottom: 0;
      }
    }
  }
}

.chart-loader {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // additional offset to ensure that it will not overlap with the xAxis
  margin-top: -30px;
  font-size: 1.6em;
}

.chart-hint {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 0;
  width: 100%;
  color: $txt-hint-color;
  text-align: center;
  transform: translateY(-50%);
}

.chart-ctrls {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  bottom: 50px;
  right: 5px;
  transform: translateY(5px);
  visibility: hidden;
  opacity: 0;
  transition: transform $transition-speed, visibility $transition-speed,
    opacity $transition-speed;
  @include children-spacing(5px);
  .chart-host:hover & {
    transform: translateY(0px);
    visibility: visible;
    opacity: 1;
  }

  .chart.range-selector ~ & {
    margin-bottom: 40px;
  }
}
</style>
