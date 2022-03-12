export type IDatepickerPreset = {
  label: string;
  trigger?: () => Date[];
  autoApply?: boolean;
};
