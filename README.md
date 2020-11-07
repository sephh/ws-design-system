# Setup

A primeira coisa que precisamos fazer é instalar e configurar o Storybook.

Então vamos lá.

## Storybook

Usaremos o CLI do storybook para instalá-lo.

```
npx sb init
```

Mova a pasta stories para a raiz e atualize o `./storybook/main`.

```
module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
```

Vamos evitar paths absolutos gigantescos configurando o paths do tsconfig.

Para isso precisamos instalar a devDependency `tsconfig-paths-webpack-plugin`:

```
npm install --save-dev tsconfig-paths-webpack-plugin
```

Atualizar o `./storybook/main.js`:

```
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json')
      }),
    ];

    // Return the altered config
    return config;
  },
}
```

No `tsconfig.json` adicione o path @components.

```
{
  "compilerOptions": {
    ...
    "paths": {
      ...
      "@components": [
        "src/components"
      ]
    },
    ...
```
