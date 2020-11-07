# Variações do Componente

Agora vamos aplicar alguns estados diferentes nos nosso componente.

## CSS global no Storybook

Antes, vamos mudar a font dos componentes apresentados pelo Storybook. 

Criaremos o arquivo `preview-head.html` e adicionaremos a nossa tag de estilo com a font desejada.

```
<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap');
</style>
```

E atualizaremos o estilo do nosso botão:

```
font-weight: 500;
transition: background-color 0.2s linear, color 0.2s linear;
```

## Disabled

O primeiro estado vai ser bem fácil, é apenas a indicação de que o nosso botão está desabilitado.

Vamos atualizar a interface ButtonProps, para adicionar essa propriedade:

```
export interface ButtonProps {
  disabled?: boolean;
}
```

Agora basta adicionar esse trecho de código, no componente:

```
&:disabled{
    background-color: ${defaultTheme.disabled};
    color: ${defaultTheme.textOnDisabled};
    cursor: not-allowed;
}
```

## Block

Agora se o botão tiver a propriedade block como true, ele terá o tamanho do seu container;

Precisamos atualizar novamente a nossa interface de propriedades:

```
export interface ButtonProps {
  disabled?: boolean;
  block?: boolean;
}
```

E poderíamos atingir o nosso objeto assim:

```
${props => props.block && `
    display: block;
    width: 100%;
`}
```

Porém, gosto de separar em funções a maior parte das situações que requerem lógica ou precisam acessar diretamente as propriedades do componente.

```
const handleBlock = ({ block }: ButtonProps) => block && `
  display: block; 
  width: 100%;
`;
``` 

## Color

Vamos definir 6 estilos de cores e mais 1 fallback, parece bem trabalhoso, veremos.

Primeiro atualizamos a nossa interface e adicionamos um enum para guardar os possíveis valores.

```
export enum ButtonColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}
```

```
export interface ButtonProps {
  color?: ButtonColor;
  block?: boolean;
  disabled?: boolean;
}
```

Todas as cores terão variação de estado como hover, focus, active e idle. 

Para idle vamos alterar background e color, para hover e focus, o background e para active outro background e color.

Poderíamos criar um estilo para cada um deles, mas podemos utilizar os poderes adquiridos com a ferramenta.

Vamos criar um "mixin", para fazer uma relaxa com os preprocessadores de CSS:

```
interface ColorMixin {
  bgColor: string;
  fontColor: string;
  invertedFontColor: string;
  activeBgColor: string;
  hoverBgColor: string;
}

const colorMixin = (colors: ColorMixin) => `
    background-color: ${colors.bgColor};
    color: ${colors.fontColor};

    &:hover, &:focus {
      background-color: ${colors.hoverBgColor};
    }

    &:active {
      background-color: ${colors.activeBgColor};
      color: ${colors.invertedFontColor};
    }
`;
```

E precisamos definir os nossos esquemas de cores:

```
export const defaultColorSchema: ColorMixin = {
  fontColor: defaultTheme.status.defaultFontColor,
  bgColor: defaultTheme.status.defaultColor,
  hoverBgColor: defaultTheme.status.defaultColorHover,
  activeBgColor: defaultTheme.status.defaultColorActive,
  invertedFontColor: defaultTheme.textColorInverted,
};

export const colorSchema: { [key: string]: ColorMixin } = {
  [ButtonColor.Primary]: {
    bgColor: defaultTheme.primaryColor,
    fontColor: defaultTheme.textColorOnPrimary,
    invertedFontColor: defaultTheme.textColorOnPrimary,
    activeBgColor: defaultTheme.primaryActiveColor,
    hoverBgColor: defaultTheme.primaryHoverColor,
  },
  [ButtonColor.Secondary]: {
    bgColor: defaultTheme.status.secondaryColor,
    fontColor: defaultTheme.textColorInverted,
    invertedFontColor: defaultTheme.textColorInverted,
    activeBgColor: defaultTheme.status.secondaryColorActive,
    hoverBgColor: defaultTheme.status.secondaryColorHover,
  },
  [ButtonColor.Danger]: {
    bgColor: defaultTheme.status.dangerColor,
    fontColor: defaultTheme.status.dangerColorActive,
    invertedFontColor: defaultTheme.textColorInverted,
    activeBgColor: defaultTheme.status.dangerColorActive,
    hoverBgColor: defaultTheme.status.dangerColorHover,
  },
  [ButtonColor.Info]: {
    bgColor: defaultTheme.status.infoColor,
    fontColor: defaultTheme.status.infoColorActive,
    invertedFontColor: defaultTheme.textColorInverted,
    activeBgColor: defaultTheme.status.infoColorActive,
    hoverBgColor: defaultTheme.status.infoColorHover,
  },
  [ButtonColor.Success]: {
    bgColor: defaultTheme.status.successColor,
    fontColor: defaultTheme.status.successColorActive,
    invertedFontColor: defaultTheme.textColorInverted,
    activeBgColor: defaultTheme.status.successColorActive,
    hoverBgColor: defaultTheme.status.successColorHover,
  },
  [ButtonColor.Warning]: {
    bgColor: defaultTheme.status.warningColor,
    fontColor: defaultTheme.status.warningColorActive,
    invertedFontColor: defaultTheme.textColorInverted,
    activeBgColor: defaultTheme.status.warningColorActive,
    hoverBgColor: defaultTheme.status.warningColorHover,
  },
};
```

Assim como fizemos no block, vamos criar uma função para gerenciar todas as possibilidades:

```
const handleColor = (props: ButtonProps) => {
  if (!props.color || !colorSchema[props.color]) {
    return colorMixin(defaultColorSchema);
  }

  return colorMixin(colorSchema[props.color]);
};
```

Agora é só colocar a função no componente e testar:

```
${handleBlock}
```
