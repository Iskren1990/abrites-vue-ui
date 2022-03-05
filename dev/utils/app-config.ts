const appUrl: string = process.env.VUE_APP_URL || "";

const repoUrl: string = process.env.VUE_APP_REPO_URL || "";

const env: string = process.env.NODE_ENV || "development";

const isProduction: boolean = process.env.NODE_ENV == "production";

const isDevelopment: boolean = process.env.NODE_ENV == "development";

export const projectTitle =
  process.env.VUE_APP_TITLE || "Abrites UI components for VUE";

export const componentsUrl: string = isProduction ? appUrl : repoUrl;
