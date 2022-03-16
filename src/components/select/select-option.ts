export class SelectOption {
  key: string | number | never;
  label: string | number | symbol | never;
  constructor(key, label) {
    this.key = key;
    this.label = label;
  }
}

export function singleOption(value, key) {
  if (Object.prototype.toString.call(value) === "[object Object]") {
    const [object] = Object.entries(value);

    return new SelectOption(object[0], object[1]);
  }
  if (Array.isArray(value) && value.length == 2) {
    return new SelectOption(value[0], value[1]);
  }
  return new SelectOption(key, value);
}

export function normalizeOptions(options): SelectOption[] {
  if (Array.isArray(options)) {
    return options.map(singleOption);
  }
  console.error("'options' should be an array!");
}
