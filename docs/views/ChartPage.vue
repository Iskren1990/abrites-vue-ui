<script lang="ts" setup>
import generateValues, {
  PointData,
} from "../composables/useGeneratedChartValues";
import { computed, Ref, ref } from "@vue/reactivity";
import { ChartType } from "chart.js";
import { Preview } from "./shared";
import * as Config from "../utils/app-config";
import { onUnmounted } from "@vue/runtime-core";

const htmlDefaultExample = `
  <AbritesChart 
    :data="chartData" 
    :options="chartOptions" 
    :group="'time'" 
    :type="type" 
  />
`;

const vueDefaultExample = function () {
  let datasetData: Ref<PointData[][]> = ref<PointData[][]>(
    generateValues({ seriesCount: 2, dateType: true, points: 1 })
  );

  let b = ref();

  const type: ChartType = "line";
  const chartData = computed(() => {
    return {
      datasets: [
        {
          label: "First Dataset",
          data: datasetData.value[0],
        },
        {
          label: "Second Dataset",
          data: datasetData.value[1],
        },
      ],
    };
  });

  const chartOptions = {
    scales: {
      x: {
        type: "time",
      },
    },
  };

  const intervalRef = setInterval(() => {
    datasetData.value.map(
      (e) =>
        (e[e.length] = generateValues({
          seriesCount: 2,
          dateType: true,
          points: 1,
        })[0][0])
    );
  }, 6000);

  onUnmounted(() => clearInterval(intervalRef));

  return { chartData, chartOptions, type };
};

const htmlLoadingExample = `
  <AbritesChart 
    :data="chartData" 
    :group="'htmlLoadingExample'" 
    :isLoading="isLoading" 
    :type="type"
  />
`;

const vueLoadingExample = () => {
  let datasetData: Ref<PointData[][]> = ref(generateValues());

  const type: ChartType = "line";
  const chartData = computed(() => {
    return {
      datasets: [
        {
          label: "First Dataset",
          data: datasetData.value[0],
        },
      ],
    };
  });

  let isLoading = ref(false);
  const intervalRef = setInterval(() => {
    isLoading.value = !isLoading.value;
  }, 3000);

  onUnmounted(() => clearInterval(intervalRef));

  return { chartData, isLoading, type };
};

const htmlSyncExample = `
  <AbritesGrid>
    <div class="col-lg-6">
      <AbritesChart 
        :data="chartDataOne" 
        :group="'mine'" 
        :type="type"
      />
    </div>
    <div class="col-lg-6">
      <AbritesChart 
        :data="chartDataTwo" 
        :group="'mine'" 
        :type="type"
      />
    </div>
  </AbritesGrid>
  <AbritesChart 
    :data="chartDataThree" 
    :group="'mine'" 
    :type="type"
  />
`;

const vueSyncExample = () => {
  let datasetDataOne: Ref<PointData[][]> = ref(generateValues());
  let datasetDataTwo: Ref<PointData[][]> = ref(generateValues());
  let datasetDataThree: Ref<PointData[][]> = ref(generateValues());

  const type: ChartType = "line";
  const chartDataOne = computed(() => {
    return {
      datasets: [
        {
          label: "First Dataset",
          data: datasetDataOne.value[0],
        },
      ],
    };
  });

  const chartDataTwo = computed(() => {
    return {
      datasets: [
        {
          label: "First Dataset",
          data: datasetDataTwo.value[0],
        },
      ],
    };
  });

  const chartDataThree = computed(() => {
    return {
      datasets: [
        {
          label: "First Dataset",
          data: datasetDataThree.value[0],
        },
      ],
    };
  });

  return { chartDataOne, chartDataTwo, chartDataThree, type };
};

const htmlBubleExample = `
  <AbritesChart 
    :data="chartData" 
    :type="type" 
    nocontrols
  />
`;

const vueBubleExample = () => {
  let datasetData: Ref<PointData[][]> = ref(generateValues());

  const type: ChartType = "bubble";
  const chartData = computed(() => {
    return {
      datasets: [
        {
          label: "First Dataset",
          data: datasetData.value[0],
        },
      ],
    };
  });

  return { chartData, type };
};

const htmlSteppedExample = `
  <AbritesChart 
    :data="chartData" 
    :options="chartOptions" 
    :type="type" 
    nocontrols 
  />
`;

const vueSteppedExample = () => {
  let datasetData: Ref<PointData[][]> = ref(
    generateValues({ dateType: true, points: 1 })
  );

  const type: ChartType = "line";
  const chartData = computed(() => {
    return {
      datasets: [
        {
          label: "First Dataset",
          data: datasetData.value[0],
          // stepped: true,
          stepped: "middle",
        },
      ],
    };
  });

  const chartOptions = {
    scales: {
      x: {
        type: "time",
      },
    },
    elements: {
      point: {
        pointRadius: 3,
      },
    },
  };

  const intervalRef = setInterval(() => {
    datasetData.value.map(
      (e) =>
        (e[e.length] = generateValues({
          seriesCount: 2,
          dateType: true,
          points: 1,
        })[0][0])
    );
  }, 3000);

  onUnmounted(() => clearInterval(intervalRef));

  return { chartData, chartOptions, type };
};
</script>

<template>
  <h2 class="component-title" id="selector">
    <a
      :href="`${Config.componentsUrl}/components/chart/Chart.vue`"
      target="_blank"
      rel="noopener"
      >AbritesChart</a
    >
    <span>&lt;abrites-chart&gt;&lt;/abrites-chart&gt;</span>
  </h2>

  <p>Chart component with synchronization support for line charts.</p>
  <abrites-alert warning>
    <p>
      This component depends on
      <a :href="'https://www.chartjs.org/'">Chart.js package</a>.
    </p>
    <p>It also requires:</p>
    <ul>
      <li>
        <a :href="'https://github.com/chartjs/chartjs-adapter-date-fns'"
          >chartjs-adapter-date-fns</a
        >
      </li>
      <li>
        <a :href="'https://date-fns.org/'">date-fns</a>
      </li>
      <li>
        <a :href="'https://www.chartjs.org/chartjs-plugin-zoom'"
          >chartjs-plugin-zoom</a
        >
      </li>
    </ul>
  </abrites-alert>

  <h3 class="section-title" id="inputs">Inputs</h3>
  <ul>
    <li>
      <strong>type</strong> <code>ChartType</code>
      <p>Chart type to load.</p>
    </li>
    <li>
      <strong>data</strong> <code>ChartData</code>
      <p>Chart data to load.</p>
    </li>
    <li>
      <strong>options?</strong> <code>ChartOptions</code>
      <p>Options of the underlaying chart instance.</p>
    </li>
    <li>
      <strong>isLoading?</strong> <code>bolean</code>
      <p>Show loading data indicator (default to <code>false</code>).</p>
    </li>
    <li>
      <strong>missingDataText?</strong> <code>string</code>
      <p>
        Text shown if no data is presented (default to
        <code>'No data to show'</code>).
      </p>
    </li>
    <li>
      <strong>group?</strong> <code>string</code>
      <p>Name of the chart sync group (default to <code>'default'</code>).</p>
    </li>
    <li>
      <strong>width?</strong> <code>number</code>
      <p>
        Width in px of the chart container. If not set, defaults to 100% of the
        parent width.
      </p>
    </li>
    <li>
      <strong>height?</strong> <code>number</code>
      <p>Height in px of the chart container (default to <code>350</code>)</p>
    </li>
    <li>
      <strong>nocontrols?</strong> <code>boolean</code>
      <p>
        Whether to hide the chart pan and zoom controls (default to
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>isStartRangeReached?</strong> <code>boolean</code>
      <p>
        Gives access to disable the pan button
        <code>false</code>).
      </p>
    </li>
    <li>
      <strong>isEndRangeReached?</strong> <code>boolean</code>
      <p>
        Gives access to disable the pan button
        <code>false</code>).
      </p>
    </li>
  </ul>

  <h3 class="section-title" id="synchronization">Synchronization</h3>
  <p>Synchronization is enabled by default for all charts within one group.</p>

  <h3 class="section-title" id="events">Interface</h3>
  <ul>
    <li>
      <strong>resetZoom(mode?)</strong>
      <code>function(mode?: UpdateMode): void</code>
      <p>Resets the zoom of all charts within a group.</p>
    </li>
    <li>
      <strong>panPrev({ pan? = 10, scales?, mode? })</strong>
      <code
        >function({ pan = 10, scales, mode }: PanControllerArgs = {}):
        void</code
      >
      <p>Left pan.</p>
    </li>
    <li>
      <strong>panNext({ pan? = -10, scales?, mode? })</strong>
      <code
        >function({ pan = -10, scales, mode }: PanControllerArgs = {}):
        void</code
      >
      <p>Right pan.</p>
    </li>
    <li>
      <strong>chart</strong>
      <code
        >class ChartController({ group }?: ChartControllerProps):
        ChartController</code
      >
      <p>Resets the Chart Controller class.</p>
      <p>Interface</p>
      <ul>
        <li>
          <strong>get group()</strong>
          <code>: string</code>
          <p>Current chart instnce group.</p>
        </li>
        <li>
          <strong>get chartInst()</strong>
          <code>: Chart</code>
          <p>Current chart instance</p>
        </li>
        <li>
          <strong>get isInited()</strong>
          <code>: boolean</code>
          <p>Represents the inited state of the chart instance</p>
        </li>
        <li>
          <strong>static defaultGroup = "default";</strong>
          <p></p>
        </li>
        <li>
          <strong>initChart(chartRef, chartProps) </strong>
          <code
            >: ( chartRef: Ref&lt;HTMLCanvasElement | undefined&gt;, chartProps:
            ChartConfiguration ): void</code
          >
          <p>
            Inits the chart instance sets default options and adds it to the
            static Chart Controller list.
          </p>
        </li>
        <li>
          <strong>destroyChart</strong>
          <code>function(): void</code>
          <p>Destroys the chart instance</p>
        </li>
        <li>
          <strong>static instancesByGroup(group)</strong>
          <code>(group: string): ChartController[]</code>
          <p>
            Returns the registered chart instances filtered by group, excluding
            default group.
          </p>
        </li>
        <li>
          <strong>updateChartInstancesScale()</strong>
          <code>: void</code>
          <p>
            Updates all chart instances from a group with the zoom/pan
            parameteres of the initiator map.
          </p>
        </li>
        <li>
          <strong>updateChartOptions({ newOptions }): void</strong>
          <code>({ newOptions: ChartOptions }): void</code>
          <p>Shalow overwrite of the chart options with the provided.</p>
          <p>Chart instance can be used for single option change or removal.</p>
        </li>
        <li>
          <strong>updateChart()</strong>
          <code>: void</code>
          <p>Invokes chart update method if the chart is inited.</p>
        </li>
      </ul>
    </li>
  </ul>

  <h3 class="section-title" id="inputs">Predefined Options</h3>
  <p>Performance</p>
  <ul>
    <pre v-highlightjs>
    <code class="language-javascript">
      Chart.defaults.animation = false;
      // crosshair requirement
      Chart.defaults.datasets.line.pointRadius = 0;
      Chart.defaults.hover.mode = "index";
      Chart.defaults.hover.intersect = false;
      Chart.defaults.interaction.mode = "index";
    </code>
    </pre>
  </ul>
  <p>Stylization</p>
  <ul>
    <pre v-highlightjs><code class="language-javascript">
      Chart.defaults.interaction.intersect = false;
      Chart.defaults.maintainAspectRatio = false;
      Chart.defaults.scale.grid.color = "rgba(255,255,255,0.1)";
      Chart.defaults.elements.line.borderWidth = 1;
    </code></pre>
  </ul>
  <p>Tooltip</p>
  <ul>
    <pre v-highlightjs><code class="language-javascript">
      Chart.defaults.datasets.line.pointHoverRadius = 2;
      Chart.defaults.plugins.tooltip.enabled = true;
      Chart.defaults.plugins.tooltip.position = "topLeftPositioner";
      Chart.defaults.plugins.tooltip.usePointStyle = true;
    </code></pre>
  </ul>
  <p>Plugins</p>
  <ul style="list-style: none">
    <li>
      <p>Zoom</p>
      <pre v-highlightjs>
        <code class="language-javascript" >
        {
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
      }
        </code>
      </pre>
      <p>
        To remove the zoom option assign empty object to the property name with
        the "options".
      </p>
    </li>
    <li>
      <p>Time/Timescale Axis</p>
      <pre v-highlightjs>
        <code class="language-javascript">
      options.scales[scale].type == "time";
      options.scales[scale].type == "timescale";
      
        {
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            major: {
              enabled: true,
            },
          },
        }
        </code>
      </pre>
    </li>
    <li>
      <p>Data Parsing</p>
      <pre v-highlightjs><code class="language-javascript">
      options.datasets;
        {
          line: {
            parsing: false,
          },
        }
      </code></pre>
      <p>Increases perfrmance for large amount of points.</p>
    </li>
    <li>
      <p>Sync</p>
      <pre v-highlightjs><code class="language-javascript">
      options.plugins.sync.group;
      </code></pre>
      <p>The group of the chart instance.</p>
    </li>
    <li>
      <p>Crosshair Style</p>
      <pre v-highlightjs><code class="language-javascript">
        color: string;
        lineWidth: number;
      </code></pre>
      <p>Color and width of the line.</p>
    </li>
  </ul>

  <h3 class="section-title" id="examples">Examples</h3>
  <Preview
    title="Default"
    :htmlExample="htmlDefaultExample"
    :scriptExample="`${vueDefaultExample}`"
    :setupFn="vueDefaultExample"
  />
  <Preview
    title="Loading State"
    :htmlExample="htmlLoadingExample"
    :scriptExample="`${vueLoadingExample}`"
    :setupFn="vueLoadingExample"
  />
  <Preview
    title="Synchronization"
    :htmlExample="htmlSyncExample"
    :scriptExample="`${vueSyncExample}`"
    :setupFn="vueSyncExample"
  />
  <Preview
    title="Bubbles Chart"
    :htmlExample="htmlBubleExample"
    :scriptExample="`${vueBubleExample}`"
    :setupFn="vueBubleExample"
  />
  <Preview
    title="Stepped Chart"
    :htmlExample="htmlSteppedExample"
    :scriptExample="`${vueSteppedExample}`"
    :setupFn="vueSteppedExample"
  />
  <!-- <Preview title="Custom options"  :htmlExample="htmlOptionsExample" :scriptExample="vueOptionsExample" /> -->
</template>

<style lang="scss" scoped>
::v-deep(.grid-host) {
  margin: 5px 0;
  width: 100%;
}
</style>
