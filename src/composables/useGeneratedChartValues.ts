export interface IGeneratedValues {
  seriesCount?: number;
  dateType?: boolean;
  points?: number;
}

export class PointData {
  x: number | string;
  y: number | string;

  constructor(dateType: boolean) {
    const random = () => (Math.random() * 100).toFixed(1);
    this.x = dateType ? Date.now() : random();
    this.y = Number(random());
  }
}

const generateValues = ({
  seriesCount = 1,
  dateType = false,
  points = 50,
}: IGeneratedValues = {}): PointData[][] =>
  new Array(seriesCount).fill([]).map(() =>
    new Array(points)
      .fill({})
      .map(() => new PointData(dateType))
      .sort((x, y) => Number(x.x) - Number(y.x))
  );
export default generateValues;
