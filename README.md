# Temas

Agora vamos permitir que o nosso componente use diversos temas.

Para isso adicionamos um novo tema no arquivo `src/styles/theme.ts` o `darkTheme`.

Precisamos configurar o nosso componente para usar temas e a troca de tema fica a cargo do StyledComponents que já tem um provider para que possamos fazer a mudança.

## ThemeProvider

Para fazer essa mudança de temas basta ter o ThemeProvider "abraçando" os componentes, aos quais quer refletir o estilo, e passar um objeto com tokens ou variáveis na propriedade theme.

Como não temos uma aplicação, vamos usar o decorator do storybook para adicionar o provider em todos os componentes daquele Meta.

```
export default {
    title: 'Components/Button',
    component: ButtonComponent,
    decorators: [(Story, context) => {
    const theme = themeMap[context.args.themeKey] || defaultTheme;
    delete context.args.themeKey;
    return <ThemeProvider theme={theme}>
      {Story()}
    </ThemeProvider>;
    }],
    ...
```

Precisamos de um map para os temas, pois o controlador só aceita string como valor.

```
import { darkTheme, defaultTheme } from '../src/styles';

const themeMap = {
  default: defaultTheme,
  dark: darkTheme
};
```

No `argTypes` do Meta precisamos adicionar o controlador `themeKey` para que possamos mudar de tema.

```
export default {
 ...
 argTypes: {
     ...
     themeKey: {
       name: 'nome do tema',
       description: 'Essa prop não é do componente. Ela só permite que você visualize os temas disponíveis.',
       control: {
         type: 'select',
         options: Object.keys(themeMap)
       },
       defaultValue: 'default'
     }
    ...
```

## Tema no Componente

Vamos adicionar a prop `theme` no ButtonProps por motivo de documentação.

```
export interface ButtonProps {
  disabled?: boolean;
  block?: boolean;
  color?: ButtonColor;
  theme?: Theme;
}
```

Os nossos esquemas de cores precisam considerar a mudança de temas, então vamos transformá-los em funções:

```
export const defaultColorSchema: (theme: Theme) => ColorMixin = (theme) => ({
  fontColor: theme.status.defaultFontColor,
  bgColor: theme.status.defaultColor,
  hoverBgColor: theme.status.defaultColorHover,
  activeBgColor: theme.status.defaultColorActive,
  invertedFontColor: theme.textColorInverted,
});

export const colorSchema: { [key: string]: (theme:Theme) => ColorMixin } = {
  [ButtonColor.Primary]: (theme) => ({
    bgColor: theme.primaryColor,
    fontColor: theme.textColorOnPrimary,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.primaryActiveColor,
    hoverBgColor: theme.primaryHoverColor,
  }),
  [ButtonColor.Secondary]: (theme) => ({
    bgColor: theme.status.secondaryColor,
    fontColor: theme.textColorInverted,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.status.secondaryColorActive,
    hoverBgColor: theme.status.secondaryColorHover,
  }),
  [ButtonColor.Danger]: (theme) => ({
    bgColor: theme.status.dangerColor,
    fontColor: theme.status.dangerColorActive,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.status.dangerColorActive,
    hoverBgColor: theme.status.dangerColorHover,
  }),
  [ButtonColor.Info]: (theme) => ({
    bgColor: theme.status.infoColor,
    fontColor: theme.status.infoColorActive,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.status.infoColorActive,
    hoverBgColor: theme.status.infoColorHover,
  }),
  [ButtonColor.Success]: (theme) => ({
    bgColor: theme.status.successColor,
    fontColor: theme.status.successColorActive,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.status.successColorActive,
    hoverBgColor: theme.status.successColorHover,
  }),
  [ButtonColor.Warning]: (theme) => ({
    bgColor: theme.status.warningColor,
    fontColor: theme.status.warningColorActive,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.status.warningColorActive,
    hoverBgColor: theme.status.warningColorHover,
  }),
};
```

A nossa função que gerencia a mudança de cor precisa ser atualizada, também.

```
const handleColor = (props: ButtonProps) => {
  if (!props.color || !colorSchema[props.color] || !props.theme) {
    return colorMixin(defaultColorSchema(defaultTheme));
  }

  return colorMixin(colorSchema[props.color](props.theme));
};
```

Agora só faltam as propriedades dinâmicas do nosso estilo:

```
export const Button = styled.button<ButtonProps>`
  padding: 8px 12px;
  min-width: 100px;
  cursor: pointer;
  border: 2px solid transparent;
  font-weight: 500;
  transition: background-color 0.2s linear, color 0.2s linear;
  font-family: ${(props) => props.theme.primaryFont};
  border-radius: ${(props) => props.theme.buttonBorderRadius};
  
  ${handleBlock}
  
  ${handleColor}
  
  &:disabled{
    background-color: ${(props) => props.theme.disabled};
    color: ${(props) => props.theme.textOnDisabled};
    cursor: not-allowed;
  }
`;
```

## Testes

Agora temos um provider para temas e precisamos levar isso em consideração nos nossos testes, também.

Primeiro vamos criar um helper para renderizar nos testes os componetes com o provider. 

No arquivo `utils/testing.tsx` criaremos o helper:

```
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@styles';

const Providers = ({ children, theme }: any) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

function renderWithProviders(
  ui,
  {
    theme = defaultTheme,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Providers theme={theme}>{children}</Providers>;
  }

  return render(ui, { wrapper: Wrapper as any, ...renderOptions });
}

export * from '@testing-library/react';

export { renderWithProviders };
```

Agora no teste do botão atualizaremos a nossa função de setup.

```
const setup = ({ theme = defaultTheme } = {}) => {
  const label = 'Acessar';
  const renderResult = renderWithProviders(<Button>{label}</Button>, { theme });
  const btn = renderResult.getByText(label);

  return {
    ...renderResult,
    btn,
    label,
    theme
  };
};
```

Todos os nossos testes que dependem de tema precisam ser atualizados:

```
test('should be disabled', () => {
    const { btn, theme } = setup();

    expect(btn).toHaveStyleRule('background-color', theme.disabled, {
      modifier: ':disabled'
    });
    expect(btn).toHaveStyleRule('color', theme.textOnDisabled, {
      modifier: ':disabled'
    });
});

test('should have default colors', () => {
    const { btn, theme } = setup();

    assertAboutColors(btn, defaultColorSchema(theme));
});

test('should have correct colors', () => {
    const { btn, rerender, theme } = setup();
    const colors = Object.keys(colorSchema);

    for (let color of colors) {
      const schema = colorSchema[color];
      rerender(<Button color={color as ButtonColor} />);

      assertAboutColors(btn, schema(theme));
    }
});
```
