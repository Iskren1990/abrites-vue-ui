const devPresets = ["@vue/babel-preset-app"];
const buildPresets = [
  [
    "@babel/preset-env",
    // Config for @babel/preset-env
    {
      targets: ["current node", "last 2 versions and > 2%", "ie > 10"],
      // Example: Always transpile optional chaining/nullish coalescing
      include: [/(.*)/],
    },
  ],
  "@babel/preset-typescript",
];
module.exports = {
  presets: process.env.NODE_ENV === "development" ? devPresets : buildPresets,
};
