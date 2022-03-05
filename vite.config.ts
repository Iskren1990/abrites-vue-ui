import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/entry.ts"),
      name: "AbritesVueUi",
      fileName: (format) => `abrites-vue-ui.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "/src") }],
  },
});
