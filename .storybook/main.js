/*
 * .storybook/main.js
 * https://medium.com/@annycarolinegnr/storybook-with-react-typescript-1c15a1cbc26a
 * Copyright (c) 2021 PredictiveUX
 */
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs'
  ]
}
