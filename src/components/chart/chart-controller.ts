import { ref, Ref } from "vue";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns";
import { ColorHelper } from "./color-helper";
import {
  ChartData,
  ChartOptions,
  Chart,
  registerables,
  ChartConfiguration,
  ScaleOptionsByType,
  PluginOptionsByType,
  ChartTypeRegistry,
} from "chart.js";
import { chartSynchronyser } from "./chart-plugins";
import { ZoomPluginOptions } from "chartjs-plugin-zoom/types/options";

interface ChartControllerProps {
  group?: string;
}

export class ChartController {
  static defaultGroup = "default";
  private static _instances: ChartController[] = [];

  private _group: string;
  private _data?: ChartData;
  private _chart?: Chart | null;
  private _options: ChartOptions = {};
  isZoomed: Ref<boolean> = ref(false);

  constructor({ group }: ChartControllerProps = {}) {
    this._group = group || ChartController.defaultGroup;
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
    Chart.register(chartSynchronyser);
    this._globalDefaults();
  }

  get group() {
    return this._group || ChartController.defaultGroup;
  }

  get chartInst() {
    return this._chart as Chart;
  }

  get isInited() {
    return this._chart != null;
  }

  initChart(
    chartRef: Ref<HTMLCanvasElement | undefined>,
    chartProps: ChartConfiguration
  ): void {
    this.destroyChart();
    this._data = chartProps.data;

    if (chartRef.value == null || (!this._data?.datasets.length ?? true)) {
      return;
    }

    this._options = chartProps.options || {};

    // set defaults
    this._defaultDatasetStyle();
    this._defaultPlugins();
    this._timeAxisDefaults();

    const chartConfig: ChartConfiguration = {
      type: chartProps.type,
      data: this._data,
      options: this._options,
    };
    this._chart = new Chart(chartRef.value, chartConfig);

    // add the inited chart contrller instance to chart store
    ChartController._addInstance(this);
  }

  private _globalDefaults() {
    // performance improvement
    Chart.defaults.animation = false;
    Chart.defaults.datasets.line.pointRadius = 0;

    // crosshair requirement
    Chart.defaults.hover.mode = "index";
    Chart.defaults.hover.intersect = false;
    Chart.defaults.interaction.mode = "index";
    Chart.defaults.interaction.intersect = false;

    // stylization
    Chart.defaults.maintainAspectRatio = false;
    Chart.defaults.scale.grid.color = "rgba(255,255,255,0.1)";
    Chart.defaults.elements.line.borderWidth = 1;
    Chart.defaults.datasets.line.pointHoverRadius = 2;

    // tooltip
    Chart.defaults.plugins.tooltip.enabled = true;
    Chart.defaults.plugins.tooltip.position = "topLeftPositioner";
    Chart.defaults.plugins.tooltip.usePointStyle = true;
  }

  private _defaultPlugins() {
    type PluginOptions = PluginOptionsByType<keyof ChartTypeRegistry>;
    // zoom plugin missbehaves if type: "category"
    !this._options.scales && (this._options.scales = { x: { type: "linear" } });

    !this._options.plugins && (this._options.plugins = <PluginOptions>{});
    !this._options.plugins.sync &&
      (this._options.plugins.sync = { group: this.group });

    const zoom: ZoomPluginOptions = {
      //  cares for dragging of the map
      pan: {
        enabled: true,
        mode: "x",
        onPan: () => this.updateChartInstancesScale(),
      },
      // zoom in/out plugin
      zoom: {
        onZoom: () => this.updateChartInstancesScale(),
        onZoomComplete: () => this.updateChartInstancesScale(),
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "x",
      },
    };

    !this._options.plugins.zoom && (this._options.plugins.zoom = zoom);
  }

  private _timeAxisDefaults() {
    Object.keys(this._options.scales || {}).forEach((scale) => {
      if (
        this._options.scales &&
        ((this._options.scales[scale] as ScaleOptionsByType)?.type == "time" ||
          (this._options.scales[scale] as ScaleOptionsByType)?.type ==
            "timeseries")
      ) {
        const defaultProps = {
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            major: {
              enabled: true,
            },
          },
        };
        this._options.scales[scale] = Object.assign(
          defaultProps,
          this._options.scales[scale]
        );

        // disabling parsing increases chart update performance
        // downside is that data should be passed processed
        const datasetLineOption = {
          line: {
            parsing: false,
          },
        };
        this._options.datasets = Object.assign(
          datasetLineOption,
          this._options.datasets
        );
      }
    });
  }

  private _defaultDatasetStyle() {
    if (this._data == undefined) return;
    this._data.datasets.forEach((data) => {
      const randomColor = ColorHelper.getRandomColor();
      data.label = data.label || "";
      data.borderColor = data.borderColor || randomColor;
      data.backgroundColor = data.backgroundColor || randomColor;
      data.hoverBackgroundColor = data.hoverBackgroundColor || randomColor;
    });
  }

  destroyChart() {
    if (this._chart == null) {
      return; // nothing to destroy
    }

    ChartController._instances = ChartController._instances.filter(
      (inst) => inst._chart?.id !== this._chart?.id
    );
    const leftChartsInGroup = ChartController._instances.findIndex(
      (x) => x.group == this.group
    );

    this._chart.destroy();
    this._chart = null;
  }

  private static _addInstance(chart: ChartController) {
    const isAdded = this._instances.find(
      (inst) => inst.chartInst.id === chart.chartInst.id
    );
    if (isAdded) {
      return; // already added
    }
    ChartController._instances.push(chart);
  }

  static instancesByGroup(group: string): ChartController[] {
    // avoid interacting with default group charts
    if (group === "default") return [];
    return ChartController._instances.filter((inst) => inst.group == group);
  }

  updateChartOptions({ newOptions }: { newOptions: ChartOptions }) {
    if (this.chartInst != null) {
      this.chartInst.options = { ...this.chartInst.options, ...newOptions };
      this.chartInst.update();
    }
  }

  updateChartInstancesScale() {
    this.isZoomed.value = this.chartInst.isZoomedOrPanned();

    const min = this.chartInst.scales.x.min;
    const max = this.chartInst.scales.x.max;

    ChartController.instancesByGroup(this._group).forEach((instance) => {
      // avoid rewriting of zoom plugin chart pre-zoom state
      if (this.chartInst.id === instance.chartInst.id) return;
      instance.isZoomed.value = this.chartInst.isZoomedOrPanned();

      instance.chartInst.options?.scales?.x == undefined
        ? null
        : (instance.chartInst.options.scales.x.min = min);
      instance.chartInst.options?.scales?.x == undefined
        ? null
        : (instance.chartInst.options.scales.x.max = max);
      instance.chartInst.update();
    });
  }

  updateChart() {
    if (this._chart != null) {
      this._chart.update();
    }
  }
}
