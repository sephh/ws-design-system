import React from 'react';
import { render } from '@utils/testing';
import {Button, ColorMixin, colorSchema, defaultColorSchema, ButtonColor} from '@components';
import { defaultTheme } from '@styles';

const setup = () => {
  const label = 'Acessar';
  const renderResult = render(<Button>{label}</Button>, {});
  const btn = renderResult.getByText(label);

  return {
    ...renderResult,
    btn,
    label,
  };
};

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

  test('should be block', () => {
    const { btn, rerender } = setup();

    rerender(<Button block />);

    expect(btn).toHaveStyleRule('display', 'block');
    expect(btn).toHaveStyleRule('width', '100%');
  });

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
});
