import { reactive, ref, Ref, shallowRef, watch, watchEffect } from "vue";
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartOptions,
  registerables,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import ColorHelper from "../../utils/color-helper";
import { _DeepPartialObject } from "chart.js/types/utils";

interface ControlerProps {
  group?: string;
}

// Change any to appropriate
type ChartsSynchronizers = {
  [key: string]: any;
};

interface ChartDataInitProps {
  labels: string[];
  values: [][];
  dateWindow?: number[];
  colors?: string[];
}

export class ChartController {
  private _group: string;
  private _data?: ChartData;
  private _chart?: Chart | null;
  private _options?: ChartOptions;

  constructor({ group: string }: ControlerProps = {}) {
    this._group = this.group || ChartController.defaultGroup;
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
  }

  get group() {
    return this._group || ChartController.defaultGroup;
  }

  get chartInst() {
    return this._chart;
  }

  get isInited() {
    return this._chart != null;
  }

  static defaultGroup = "default";

  private static _instances: ChartController[] = [];
  static chartsSynchronizers: ChartsSynchronizers = new Map();

  initChart(
    chartEl: Ref<HTMLCanvasElement | undefined>,
    chartProps: ChartConfiguration
  ): void {
    this.destroyChart();
    this._data = chartProps.data;

    if (chartEl == null || (!this._data?.datasets.length ?? true)) {
      return;
    }

    this._options = chartProps.options || {};

    // the chart library has different behavior for `undefined`, `null` and `array`
    // if (options.dateWindow?.length ?? true) {
    // (this._data?.dateWindow?.length ?? false)
    // options.dateWindow = this._data?.dateWindow;
    // }

    // ---

    // options.zoomCallback ??= this._zoomCallbackFunc;

    // set defaults
    this._defaultInteraction(this._options);
    this._defaultPlugins(this._options);
    this._axisLineColor(this._options);
    this._options = {
      ...this._options,
      // overwrites the defaults
      ...chartProps.options,
      // responsive: true,
      // animation: false,
    };
    this._options.maintainAspectRatio = false;

    this._defaultDatasetStyle(this._data);

    const chartConfig: ChartConfiguration = {
      type: chartProps.type,
      data: this._data,
      options: this._options,
    };

    this._chart = new Chart(chartEl.value as HTMLCanvasElement, chartConfig);

    // this._chart.options.animation = false;

    // this._chart.options.plugins(
    //      ( dygraph ) => {
    //         if ( !_initedCtrl.isClosed )
    //         {
    //             _initedCtrl.add( dygraph );
    //         }

    //         ChartController.refreshActiveSync( group: group );

    //         _initRangePanListener();
    //      ),
    // );
  }

  private _defaultInteraction(options: ChartOptions): void {
    options.interaction = {
      intersect: false,
      mode: "index",
    };
  }

  private _defaultPlugins(options: ChartOptions): void {
    options.plugins = {
      tooltip: {
        enabled: true,
        position: "myCustomPositioner",
        usePointStyle: true,
      },
      zoom: {
        zoom: {
          drag: {
            enabled: true,
          },
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    };
  }

  private _axisLineColor(options: ChartOptions): void {
    options.scales = {
      x: {
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    };
  }

  private _defaultDatasetStyle(dataset: ChartData) {
    dataset.datasets.forEach((data) => {
      const randomColor = ColorHelper.getRandomColor();
      data.data.fill = data.data.fill || false;
      data.label = data.label || "";
      data.borderColor = data.borderColor || randomColor;

      // data.pointBackgroundColor = data.pointBackgroundColor || randomColor;
      // pointBackgroundColor: ColorHelper.getRandomColor(),
    });
  }

  destroyChart(): void {
    if (this._chart == null) {
      return; // nothing to destroy
    }

    const needResync = ChartController.chartsSynchronizers[this.group] != null;
    ChartController.unsyncInited({ group: this.group });

    this._chart.destroy();
    this._chart = null;

    if (needResync) {
      // ChartController.syncInited( { group: this.group, resetZoom: false } );
    }
  }

  static _addInstance(inst: ChartController): void {
    if (this._instances.includes(inst)) {
      return; // already added
    }

    const needResync = ChartController.chartsSynchronizers[inst.group] != null;
    ChartController.unsyncInited({ group: inst.group });

    ChartController._instances.push(inst);

    if (needResync) {
      // ChartController.syncInited( { group: inst.group, resetZoom: false } );
    }
  }

  // static syncInited( { group = this.defaultGroup, resetZoom = true }: { group?: string, resetZoom?: boolean; } ): void {
  //     const groupInstances = ChartController.instancesByGroup( group )
  //         .filter( ( inst ) => inst.chartInst != null );

  //     if ( !groupInstances.length )
  //     {
  //         return;
  //     }

  //     ChartController.unsyncInited( { group: group } ); // reset

  //     const charts =
  //         groupInstances.map( ( inst ) => inst.chartInst );

  //     if ( resetZoom )
  //     {
  //         charts.forEach( ( chart ) => chart.resetZoom() );
  //     } else if ( hasZoomedCharts( { group } ) )
  //     {
  //         applyLargestDateWindowToGroup( { group } );
  //     }

  //     this.chartsSynchronizers[group] = DygraphSynchronize(
  //         charts,
  //         DygraphSynchronizeOptions( range: false ),
  //     );
  // }

  static unsyncInited({
    group = this.defaultGroup,
  }: { group?: string } = {}): void {
    this.chartsSynchronizers[group]?.detach();
    this.chartsSynchronizers[group] = null;
  }

  static instancesByGroup(group: string): ChartController[] {
    return ChartController._instances.filter((inst) => inst.group == group);
  }

  set data(val: ChartData) {
    // if (ListHelper.deepEqual(_data?.labels, val?.labels) &&
    //     ListHelper.deepEqual(_data?.dateWindow, val?.dateWindow) &&
    //     ListHelper.deepEqual(_data?.values, val?.values)) {
    //   return; // no change
    // }

    this._data = val;
    console.log(this._data);

    if (this._data.datasets.length == 0) {
      // cannot plot empty data sets
      this.destroyChart();
      return;
    }

    if (this._chart != null) {
      //   const updateOptions = DygraphOptions(
      //     file: _normalizeDataValues(this._data.values),
      //     labels: this._data.labels,
      //     colors: this._data.colors ??
      //         this._generateSeriesColors(this._data.labels.slice(1)),
      //   );
      //   if (ChartController.chartsSynchronizers[this.group] != null &&
      //       (this._data.dateWindow?.length == 0 || true) && !this.isZoomed) {
      //     // explicitly reset the date window for synced charts in order to allow live data updates
      //     updateOptions.dateWindow = null;
      //   } else if (this._data.dateWindow == null) {
      //     // keep current chart date window...
      //   } else if (this._data.dateWindow.length == 0) {
      //     updateOptions.dateWindow = null;
      //   } else {
      //     updateOptions.dateWindow = this._data.dateWindow;
      //   }
      //   this.updateChartOptions(updateOptions);
      // } else {
      //   this.initChart();
      // }
    }
  }
  updateChartOptions({
    newOptions,
    blockRedraw,
  }: {
    newOptions: ChartOptions;
    blockRedraw?: boolean;
  }): void {
    if (this._chart != null) {
      this._chart.options = { ...this._chart.options, ...newOptions };
      //   this._chart.updateOptions(newOptions, blockRedraw);
    }
  }

  updateChart(): void {
    if (this._chart != null) {
      this._chart.update();
      //   this._chart.updateOptions(newOptions, blockRedraw);
    }
  }
}

Tooltip.positioners.myCustomPositioner = function (elements, eventPosition) {
  return {
    x: 0,
    y: 0,
    // You may also include xAlign and yAlign to override those tooltip options.
  };
};

declare module "chart.js" {
  interface TooltipPositionerMap {
    myCustomPositioner: TooltipPositionerFunction<ChartType>;
  }
}
