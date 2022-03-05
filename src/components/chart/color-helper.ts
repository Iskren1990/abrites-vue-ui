export default class ColorHelper {
  /// Commonly used app colors.
  static appColors = [
    "#fedd17",
    "#5c44ef",
    "#ee1289",
    "#00b0eb",
    "#4adeac",
    "#d0ff14",
    "#fa5050",
    "#fbceb1",
    "#c13232",
    "#ff73bd",
    "#c5e0dc",
    "#556270",
    "#7fffd4",
  ];

  /// Returns a color from the predefined app colors list based on its index (rotational).
  static getColor(index = 0) {
    if (index >= this.appColors.length) {
      return this.appColors[index % this.appColors.length];
    }

    return this.appColors[index];
  }

  static getNextColor(color: string) {
    return ColorHelper.getColor(ColorHelper.appColors.indexOf(color) + 1);
  }

  /// Returns a color from the predefined app colors list based on its index (rotational).
  static getRandomColor(): string {
    const randomInteger = Math.floor(
      Math.random() * (this.appColors.length - 1)
    );

    return this.appColors[randomInteger];
  }

  /// Checks if [val] is valid CSS color string.
  static isColor(val: string) {
    try {
      const dummyEl = document.createElement("div");
      const dummyStyle = dummyEl.style;

      dummyStyle.color = val;

      return dummyStyle.color == val;
    } catch (_) {
      return false;
    }
  }

  /// Converts hex color string into rgba.
  static hexToRgba(hex: string, alpha = 1) {
    const parsedHex = Number.parseInt(hex?.substring(1) ?? "", 16);

    if (parsedHex == null) {
      return "rgba(0,0,0,1)";
    }

    const r = (parsedHex >> 16) & 255;
    const g = (parsedHex >> 8) & 255;
    const b = parsedHex & 255;

    return `rgba(${r},${g},${b},${alpha})`;
  }
}
