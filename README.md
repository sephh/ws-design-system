# Primeiro Componente

O Objetivo agora é criar nosso primeiro componente e visualizá-lo no storybook.

## Componente Button

Vamos criar um componente usando o StyledComponent:

```
import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
}

export const Button = styled.button<ButtonProps>`
  padding: 8px 12px;
  border-radius: 2px;
  min-width: 100px;
  cursor: pointer;
  transition: background-color 0.2s linear, color 0.2s linear;
`;
```

## Story

Vamos criar a story do botão para que ele possa aparecer no Storybook.

```
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from '@components';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} >
  Botão
</Button>;

export const Primary = Template.bind({});
```
