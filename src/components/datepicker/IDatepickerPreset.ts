export interface IDatepickerPreset {
  label: string;
  trigger?: () => Date[];
  autoApply?: boolean;
}
