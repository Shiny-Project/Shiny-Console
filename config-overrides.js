const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader, injectBabelPlugin } = require("react-app-rewired");
const {
    override,
    fixBabelImports,
    addLessLoader,
    addBabelPlugin,
    addWebpackAlias
} = require("customize-cra");
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = override(
    addBabelPlugin('syntax-dynamic-import'),
    fixBabelImports("import", {
        libraryName: "antd", libraryDirectory: "es", style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
    }),
    addWebpackAlias({
        '@': resolve('src')
    })
);
