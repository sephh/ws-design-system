import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from '@components';
import { ButtonColor } from '../src/components/Button/Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    color: {
      control: {
        type: 'select',
        // @ts-ignore
        options: Object.keys(ButtonColor).map(key => ButtonColor[key]),
      },
    },
    block: {
      control: {
        type: 'boolean'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    }
  },
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} >
  Acessar
</Button>;

export const Primary = Template.bind({});

Primary.args = {
  color: ButtonColor.Primary
}


