const { mergeConfig } = require('vite');
const { resolve } = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, options) {
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: '@',
            replacement: resolve(__dirname, '../src'),
          },
        ],
      },
    };
  },
  features: {
    storyStoreV7: true,
  },
};
