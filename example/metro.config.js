const path = require('path');
const root = path.resolve(__dirname, '..');

module.exports = {
  projectRoot: __dirname,
  watchFolders: [root],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
