import React from 'react';
import { render } from '@utils/testing';
import { Button } from '@components';
import { ButtonColor, colorSchema } from '../Button';
import { defaultTheme } from '@styles';

const setup = () => {
  const label = 'Picles';
  const renderResult = render(
    <Button color={ButtonColor.Primary} disabled>
      {label}
    </Button>,
    {}
  );
  const btn = renderResult.getByText(label);
  return {
    ...renderResult,
    label,
    btn,
  };
};

describe('Button', () => {
  test('should render', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  test('should disable', () => {
    const { btn } = setup();

    expect(btn).toBeDisabled();
    expect(btn).toHaveStyleRule('background-color', defaultTheme.disabled, {
      modifier: ':disabled',
    });
    expect(btn).toHaveStyleRule('color', defaultTheme.textOnDisabled, {
      modifier: ':disabled',
    });
  });

  test('should block', () => {
    const { btn, rerender } = setup();

    rerender(<Button block={true} />);

    expect(btn).toHaveStyleRule('display', 'block');
    expect(btn).toHaveStyleRule('width', '100%');
  });

  test('should have correct colors', () => {
    const { btn, rerender } = setup();
    const colors = Object.keys(colorSchema);

    for (let color of colors) {
      const schema = colorSchema[color];
      rerender(<Button color={color as ButtonColor} />);

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
  });
});
