<script lang="ts" setup>
import {
  withDefaults,
  defineProps,
  computed,
  onUnmounted,
} from "@vue/runtime-core";
import { onMounted, watch, shallowRef, ref } from "vue";
import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
  CoreScaleOptions,
  Point,
  Scale,
  UpdateMode,
} from "chart.js";
import { ChartController } from "./chart-controller";

type PanAmount = number | Partial<Point>;
interface IPanControllerArgs {
  pan?: PanAmount;
  scales?: Scale<CoreScaleOptions>[];
  mode?: UpdateMode;
}

interface IChartProps {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
  isLoading?: boolean;
  missingDataText?: string;
  group?: string;
  width?: number;
  height?: number;
  nocontrols?: boolean;
  isStartRangeReached?: boolean;
  isEndRangeReached?: boolean;
}

const props = withDefaults(defineProps<IChartProps>(), {
  isLoading: false,
  missingDataText: "No data to show",
  height: 350,
  width: 100,
  nocontrols: false,
});

const chart = new ChartController({ group: props.group });
const isInited = ref(false);
const chartEl = shallowRef<HTMLCanvasElement>();

const chartProps = computed<ChartConfiguration>(() => ({
  type: props.type,
  data: props.data,
  options: props.options,
}));

const resetZoom = (mode?: UpdateMode) => {
  chart.chartInst.resetZoom(mode);
};
const panPrev = ({ pan = 10, scales, mode }: IPanControllerArgs = {}) => {
  chart.chartInst.pan(pan, scales, mode);
};
const panNext = ({ pan = -10, scales, mode }: IPanControllerArgs = {}) => {
  chart.chartInst.pan(pan, scales, mode);
};

watch(
  () => props.data,
  () => {
    chart.updateChart();
  },
  { deep: true }
);

onMounted(() => {
  chart.initChart(chartEl, chartProps.value);
  isInited.value = chart.isInited;
});

onUnmounted(() => chart.destroyChart());
</script>

<template>
  <div class="chart-host" :class="props.isLoading && 'loading'">
    <div class="chart-container">
      <canvas class="chart" ref="chartEl"></canvas>
    </div>
    <AbritesLoader
      class="chart-loader"
      :active="props.isLoading"
    ></AbritesLoader>

    <div v-if="!props.isLoading && !isInited" class="chart-hint">
      <h6>{{ props.missingDataText }}</h6>
    </div>
    <div v-if="!props.nocontrols && !props.isLoading" class="chart-ctrls">
      <AbritesButton
        class="ctrl-btn pan-btn-prev dark small"
        v-abrites-tooltip="{
          abritesTooltip: 'Scroll left (Shift + Drag)',
          abritesTooltipPosition: 'bottom',
        }"
        :disabled="props.isStartRangeReached"
        @trigger="panPrev()"
      >
        <AbritesIcon icon="arrow_back"></AbritesIcon>
      </AbritesButton>

      <AbritesButton
        class="ctrl-btn reset-btn dark small"
        @trigger="resetZoom"
        v-if="!props.nocontrols && !props.isLoading && chart.isZoomed.value"
        >Reset zoom</AbritesButton
      >
      <AbritesButton
        class="ctrl-btn pan-btn-prev dark small"
        v-abrites-tooltip="{
          abritesTooltip: 'Scroll right (Shift + Drag)',
          abritesTooltipPosition: 'bottom-right',
        }"
        :disabled="props.isEndRangeReached"
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

  .chart-container ::v-deep() {
    > canvas {
      width: 100% !important;
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
