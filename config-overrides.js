const {
    override,
    fixBabelImports,
    addLessLoader,
    addBabelPlugin,
    addWebpackAlias,
    adjustStyleLoaders,
} = require("customize-cra");
const path = require("path");

function resolve(dir) {
    return path.join(__dirname, ".", dir);
}

module.exports = override(
    addBabelPlugin("syntax-dynamic-import"),
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
        },
    }),
    // https://github.com/arackaf/customize-cra/issues/315
    adjustStyleLoaders(({ use: [, , postcss] }) => {
        const postcssOptions = postcss.options;
        postcss.options = { postcssOptions };
    }),
    addWebpackAlias({
        "@": resolve("src"),
    }),
    (config) => {
        config.module.rules[0].exclude = path.resolve(
            __dirname,
            "node_modules"
        );
        config.devtool =
            config.mode === "development" ? "cheap-module-source-map" : false;
        return config;
    }
);
