import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button as ButtonComponent, ButtonProps, ButtonColor } from '@components';

const colorOptions = Object.keys(ButtonColor)
    // @ts-ignore
    .map(key => ButtonColor[key])
    .filter(x => !(parseInt(x) >= 0))

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['nenhum', ...colorOptions]
      }
    },
    disabled: { control: 'boolean' },
    block: { control: 'boolean' }
  }
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => (
    <ButtonComponent {...args}>Acessar</ButtonComponent>
);

export const Button = Template.bind({});
