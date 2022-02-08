export default class Config {
  static projectTitle =
    process.env.VUE_APP_TITLE || "Abrites UI components for VUE";

  static appUrl: string = process.env.VUE_APP_URL || "";

  static repoUrl: string = process.env.VUE_APP_REPO_URL || "";

  static env: string = process.env.NODE_ENV || "development";

  static isProduction: boolean = process.env.NODE_ENV == "production";

  static isDevelopment: boolean = process.env.NODE_ENV == "development";

  static get componentsUrl(): string {
    return Config.isProduction ? Config.appUrl : Config.repoUrl;
  }
}
