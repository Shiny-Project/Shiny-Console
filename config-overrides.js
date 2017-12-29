const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader, injectBabelPlugin } = require("react-app-rewired");
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = function override(config, env) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@': resolve('src')
    }

    config = injectBabelPlugin('syntax-dynamic-import', config);

    const tsLoader = getLoader(
        config.module.rules,
        rule =>
            rule.loader &&
            typeof rule.loader === 'string' &&
            rule.loader.includes('ts-loader')
    );

    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css',
            })]
        })
    };

    return config;
}