const appUrl: string | boolean = import.meta.env.VUE_APP_URL;

const repoUrl: string | boolean = import.meta.env.VUE_APP_REPO_URL;

const env: string | boolean = import.meta.env.NODE_ENV || "development";

const isProduction: boolean = import.meta.env.NODE_ENV == "production";

const isDevelopment: boolean = import.meta.env.NODE_ENV == "development";

export const projectTitle =
  import.meta.env.VUE_APP_TITLE || "Abrites UI components for VUE";

export const componentsUrl: string | boolean = isProduction ? appUrl : repoUrl;
