export default class Config {
  static projectTitle =
    process.env.VUE_APP_TITLE || "Abrites UI components for VUE";

  static appUrl: string = process.env.VUE_APP_URL || "http://127.0.0.1";

  static env: string = process.env.NODE_ENV || "development";

  static isProduction: boolean = process.env.NODE_ENV == "production";

  static isDevelopment: boolean = process.env.NODE_ENV == "development";

  static get componentsUrl(): string {
    return this.isProduction
      ? this.appUrl
      : `${this.appUrl}:${window.location.port}`;
  }
}
