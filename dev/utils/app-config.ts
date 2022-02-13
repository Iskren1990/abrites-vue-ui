export const projectTitle =
  process.env.VUE_APP_TITLE || "Abrites UI components for VUE";

export const appUrl: string = process.env.VUE_APP_URL || "";

export const repoUrl: string = process.env.VUE_APP_REPO_URL || "";

export const env: string = process.env.NODE_ENV || "development";

export const isProduction: boolean = process.env.NODE_ENV == "production";

export const isDevelopment: boolean = process.env.NODE_ENV == "development";

export const componentsUrl: string = isProduction ? appUrl : repoUrl;
