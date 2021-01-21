const {removeModuleScopePlugin, override, babelInclude, addWebpackAlias} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),
  addWebpackAlias({

    ["app-types"]: path.resolve(__dirname, "../app-types")

  }),
  babelInclude([
    path.resolve("src"),
    path.resolve("../app-types")
  ])
);