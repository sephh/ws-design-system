import React from 'react';
import { render } from '@utils/testing';
import { Button } from '../Button';

describe('Button', () => {
  test('should render', () => {
    const { container } = render(<Button />, {});
    expect(container).toBeTruthy();
  });
});
