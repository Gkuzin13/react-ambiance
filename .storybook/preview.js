import { themes } from '@storybook/theming';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
  parameters: {
    darkMode: {
      dark: { ...themes.dark, appBg: 'black' },
      current: 'dark',
      stylePreview: true,
    },
  },
};
