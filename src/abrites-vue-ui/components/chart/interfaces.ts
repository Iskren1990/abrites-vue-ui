import { ChartDataset, ChartOptions } from "chart.js";

export interface ChartProps {
  data: ChartDataset;
  isLoading: boolean;
  missingDataText: string;
  group: string;
  width: number;
  height: number;
  options: ChartOptions;
  nocontrols: boolean;
}
