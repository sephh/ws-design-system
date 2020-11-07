import React from 'react';
import { render } from '@utils/testing';
import { Button } from '@components';
import { ButtonColor } from '../Button';

describe('Button', () => {
  test('should render', () => {
    const { container } = render(
        <Button color={ButtonColor.Primary} disabled>
          Acessar
        </Button>,
        {}
    );
    expect(container).toBeInTheDocument();
  });
});
