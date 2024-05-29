/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
 const jsoMetroPlugin = require("obfuscator-io-metro-plugin")(
  {
    // for these option look javascript-obfuscator library options from  above url
    compact: false,
    sourceMap: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    shuffleStringArray: true,
    splitStrings: true,
    stringArrayThreshold: 1,
  },
  {
    runInDev: false /* optional */,
    logObfuscatedFiles: true /* optional generated files will be located at ./.jso */,
    sourceMapLocation:
      "./index.android.bundle.map" /* optional  only works if sourceMap: true in obfuscation option */,
  }
);
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  ...jsoMetroPlugin,
};
