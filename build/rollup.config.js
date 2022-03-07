// rollup.config.js
import fs from "fs";
import path from "path";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import PostCSS from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import ttypescript from "ttypescript";
import typescript from "rollup-plugin-typescript2";
import minimist from "minimist";
import copy from "rollup-plugin-copy";

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
  .readFileSync("./.browserslistrc")
  .toString()
  .split("\n")
  .filter((entry) => entry && entry.substring(0, 2) !== "ie");

// Extract babel preset-env config, to combine with esbrowserslist
// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelPresetEnvConfig = require("../babel.config").presets.filter(
  (entry) => entry[0] === "@babel/preset-env"
)[0][1];

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, "..");

const baseConfig = {
  input: "src/entry.ts",
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: "@",
            replacement: `${path.resolve(projectRoot, "src")}`,
          },
        ],
      }),
    ],
    replace: {
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    vue: {
      preprocessStyles: true,
    },
    postVue: [
      copy({
        targets: [
          {
            src: "src/styles/_functions.scss",
            dest: "dist/style",
            rename: "_functions.scss",
          },
          {
            src: "src/styles/_mdc_functions.scss",
            dest: "dist/style",
            rename: "_mdc_functions.scss",
          },
          {
            src: "src/styles/_mixins.scss",
            dest: "dist/style",
            rename: "_mixins.scss",
          },
          {
            src: "src/styles/_vars.scss",
            dest: "dist/style",
            rename: "_vars.scss",
          },
          {
            src: "src/styles/core.scss",
            dest: "dist/style",
            rename: "core.scss",
          },
        ],
      }),
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      }),
      // Process only `<style module>` blocks.
      PostCSS({
        modules: {
          generateScopedName: "[local]___[hash:base64:5]",
        },
        include: /&module=.*\.css$/,
      }),
      // Process all `<style>` blocks except `<style module>`.
      PostCSS({ include: /(?<!&module=.*)\.css$/ }),
      commonjs(),
    ],
    babel: {
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      babelHelpers: "bundled",
    },
  },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  "vue",
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: "Vue",
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === "es") {
  const esConfig = {
    ...baseConfig,
    input: "src/entry.esm.ts",
    external,
    output: {
      file: "dist/abrites-vue-ui.esm.js",
      format: "esm",
      exports: "named",
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      // Only use typescript for declarations - babel will
      // do actual js transformations
      typescript({
        tsconfig: "../tsconfig.json",
        typescript: ttypescript,
        useTsconfigDeclarationDir: true,
        emitDeclarationOnly: true,
      }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            "@babel/preset-env",
            {
              ...babelPresetEnvConfig,
              targets: esbrowserslist,
            },
          ],
        ],
      }),
    ],
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === "cjs") {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/abrites-vue-ui.ssr.js",
      format: "cjs",
      name: "AbritesVueUi",
      exports: "auto",
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
    ],
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === "iife") {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/abrites-vue-ui.min.js",
      format: "iife",
      name: "AbritesVueUi",
      exports: "auto",
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;