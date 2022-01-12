export interface IGeneratedValues {
  seriesCount?: number;
  dateType?: boolean;
  points?: number;
}

export interface IPointData {
  x: number | string;
  y: number | string;
}

export default function generateValues({
  seriesCount = 1,
  dateType = false,
  points = 50,
}: IGeneratedValues = {}): IPointData[][] {
  const random = () => (Math.random() * 100).toFixed(1);

  const chartData = [];
  const xAxix = [];
  for (let point = 0; point < points; point++) xAxix.push(random());
  xAxix.sort((x, y) => Number(x) - Number(y));
  for (let series = 0; series < seriesCount; series++) {
    const lineData: IPointData[] = [];

    for (let i = 0; i < points; i++) {
      const pointData = {
        x: dateType ? Date.now() : xAxix[i],
        y: Number(random()),
      };

      lineData.push(pointData);
    }

    chartData.push(lineData);
  }

  return chartData;
}
