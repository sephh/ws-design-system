# Testando o componente

Vamos testar o componente na mesma ordem que fizemos a sua implementação: do mais fácil para o mais difícil.

## Disabled

Para testar o disabled, vamos usar uma extensão do jest que tem alguns helpers interessantes para o contexto de styled-components, o [jest-styled-components](https://www.npmjs.com/package/jest-styled-components).

O Teste fica assim:

```
test('should be disabled', () => {
    const { getByText } = render(
      <Button color={ButtonColor.Primary} disabled>
        Acessar
      </Button>,
      {}
    );
    
    const btn = getByText('Acessar');
    expect(btn).toHaveStyleRule('background-color', defaultTheme.disabled, {
      modifier: ':disabled',
    });
    expect(btn).toHaveStyleRule('color', defaultTheme.textOnDisabled, {
      modifier: ':disabled',
    });
});
```

## Block

A renderização dos nossos testes começou a ficar muito repetitiva, é um indicativo de que devemos refatorar.

Vamos criar uma função de setup:

```
const setup = () => {
    const label = 'Acessar';
    const renderResult = render(
        <Button>
            {label}
        </Button>,
        {}
    );
    const btn = renderResult.getByText(label);

    return {
        ...renderResult,
        btn,
        label
    }
}
```

E reescrever os nossos testes:

```
describe('Button', () => {
  test('should render', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  test('should be disabled', () => {
    const { btn } = setup();

    expect(btn).toHaveStyleRule('background-color', defaultTheme.disabled, {
      modifier: ':disabled',
    });
      expect(btn).toHaveStyleRule('color', defaultTheme.textOnDisabled, {
          modifier: ':disabled',
      });
  });
});
```

Pronto, podemos agora criar o teste de block:

```
test('should be block', () => {
    const { btn, rerender } = setup();
    
    rerender(<Button block />);
    
    expect(btn).toHaveStyleRule('display', 'block');
    expect(btn).toHaveStyleRule('width', '100%');
});
```

## Color

Para as cores, começaremos verificando a cor default:

```
test('should have defaultColors', () => {
    const { btn } = setup();

    expect(btn).toHaveStyleRule('color', defaultColorSchema.fontColor);
    expect(btn).toHaveStyleRule('background-color', defaultColorSchema.bgColor);

    expect(btn).toHaveStyleRule('background-color', defaultColorSchema.hoverBgColor, {
      modifier: ':hover',
    });
    expect(btn).toHaveStyleRule('background-color', defaultColorSchema.hoverBgColor, {
      modifier: ':focus',
    });
    expect(btn).toHaveStyleRule('color', defaultColorSchema.invertedFontColor, {
      modifier: ':active',
    });
    expect(btn).toHaveStyleRule('background-color', defaultColorSchema.activeBgColor, {
      modifier: ':active',
    });
});
```

E agora todas as cores. Como queremos testar as mesmas variáveis do teste anterior, podemos criar uma função para evitar repetição.

```
const assertAboutColors = (btn: Element, schema: ColorMixin) => {
  expect(btn).toHaveStyleRule('color', schema.fontColor);
  expect(btn).toHaveStyleRule('background-color', schema.bgColor);

  expect(btn).toHaveStyleRule('background-color', schema.hoverBgColor, {
    modifier: ':hover',
  });
  expect(btn).toHaveStyleRule('background-color', schema.hoverBgColor, {
    modifier: ':focus',
  });
  expect(btn).toHaveStyleRule('color', schema.invertedFontColor, {
    modifier: ':active',
  });
  expect(btn).toHaveStyleRule('background-color', schema.activeBgColor, {
    modifier: ':active',
  });
}
```

E os testes ficariam assim:

```
test('should have default colors', () => {
    const { btn } = setup();

    assertAboutColors(btn, defaultColorSchema)
});

test('should have correct colors', () => {
    const { btn, rerender } = setup();
    const colors = Object.keys(colorSchema);

    for (let color of colors) {
      const schema = colorSchema[color];
      rerender(<Button color={color as ButtonColor} />);

      assertAboutColors(btn, schema);
    }
});
```
