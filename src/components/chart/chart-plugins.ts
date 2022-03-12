import { ChartController } from "./chart-controller";
import { Chart, Plugin, Tooltip } from "chart.js";

Tooltip.positioners.topLeftPositioner = function (elements, eventPosition) {
  return {
    x: 0,
    y: 0,
  };
};

declare module "chart.js" {
  interface PluginOptionsByType<TType extends ChartType> {
    sync: SyncOptions;
    crosshair: CrosshairOptions;
  }
  interface TooltipPositionerMap {
    topLeftPositioner: TooltipPositionerFunction<ChartType>;
  }
}

interface SyncOptions {
  group: string;
}

interface CrosshairOptions {
  color: string;
  lineWidth: number;
}

export const chartSynchronyser: Plugin = {
  id: "afterDatasetsDraw",
  beforeEvent(chart: Chart, { event }) {
    // removes datapoints and tooltip
    if (event.type == "mouseout") {
      ChartController.instancesByGroup(
        chart.options.plugins?.sync?.group || ""
      ).forEach((inst) => {
        inst.chartInst.setActiveElements([]);
        inst.chartInst.tooltip?.setActiveElements([], { x: 0, y: 0 });
        inst.chartInst.update();
      });
    }
  },
  afterDraw: function (chart: Chart) {
    const tt = chart.tooltip;

    if (tt && tt.dataPoints?.length > 0 && tt.opacity == 1) {
      // draws vertical line based on the active points
      drawCrosshair(chart);

      // current instance active points
      const activeDatasetPoints = tt.dataPoints.map((activePoint) => {
        return {
          datasetIndex: activePoint.datasetIndex,
          index: activePoint.dataIndex,
        };
      });

      // sets active points for each chart instances from the same group
      ChartController.instancesByGroup(
        chart.options.plugins?.sync?.group || ""
      ).forEach((inst) => {
        if (!inst.chartInst || inst.chartInst.id == chart.id) return;

        const changed = inst.chartInst.getActiveElements();
        if (
          !activeDatasetPoints ||
          (changed.length && changed[0].index == activeDatasetPoints[0].index)
        )
          return;
        inst.chartInst.setActiveElements(activeDatasetPoints);

        const instActivePoint = inst.chartInst.getActiveElements();

        const x = instActivePoint[0].element?.x;
        const y = instActivePoint[0].element?.y;
        const eventPsn = {
          x,
          y,
        };
        inst.chartInst.tooltip?.setActiveElements(
          activeDatasetPoints,
          eventPsn
        );

        inst.chartInst.update();
      });
    }
  },
};

function drawCrosshair(chart: Chart) {
  if (!chart.tooltip) return;
  const activePoint = chart.tooltip?.dataPoints[0];
  const ctx = chart.ctx;
  const y_axis = chart.scales.y;
  const x = activePoint.element.x;
  const topY = y_axis.top;
  const bottomY = y_axis.bottom;
  // draw line
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, topY);
  ctx.lineTo(x, bottomY);
  ctx.lineWidth = chart.options.plugins?.crosshair?.lineWidth || 1;
  ctx.strokeStyle = chart.options.plugins?.crosshair?.color || "rgb(204,65,65)";
  ctx.stroke();
  ctx.restore();
}
