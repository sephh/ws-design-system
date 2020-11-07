import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button as ButtonComponent, ButtonProps } from '@components';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <ButtonComponent {...args}>Acessar</ButtonComponent>
);

export const Button = Template.bind({});
