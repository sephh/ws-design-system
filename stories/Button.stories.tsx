import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Story, Meta } from '@storybook/react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY
} from '@storybook/addon-docs/blocks';

import { Button as ButtonComponent, ButtonProps, ButtonColor } from '@components';
import { darkTheme, defaultTheme } from '../src/styles';

const colorOptions = Object.keys(ButtonColor)
  // @ts-ignore
  .map(key => ButtonColor[key])
  .filter(x => !(parseInt(x) >= 0));

const themeMap = {
  default: defaultTheme,
  dark: darkTheme
};

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
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['default', ...colorOptions]
      },
      defaultValue: 'default'
    },
    disabled: { control: 'boolean' },
    block: { control: 'boolean' },
    themeKey: {
      name: 'nome do tema',
      description: 'Essa prop não é do componente. Ela só permite que você visualize os temas disponíveis.',
      control: {
        type: 'select',
        options: Object.keys(themeMap)
      },
      defaultValue: 'default'
    },
    ref: {
      table: {
        disable: true
      }
    },
    theme: {
      table: {
        disable: true
      }
    },
    as: {
      table: {
        disable: true
      }
    },
    forwardedAs: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => (
  <ButtonComponent {...args}>Acessar</ButtonComponent>
);

export const Button = Template.bind({});

export const DefaultTheme = () => <ThemeProvider theme={defaultTheme}>
  <ButtonComponent>Default</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Primary}>Primary</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Secondary}>Secondary</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Danger}>Danger</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Success}>Success</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Warning}>Warning</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Info}>Info</ButtonComponent>
</ThemeProvider>;

export const DarkTheme = () => <ThemeProvider theme={darkTheme}>
  <ButtonComponent>Default</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Primary}>Primary</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Secondary}>Secondary</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Danger}>Danger</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Success}>Success</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Warning}>Warning</ButtonComponent> {' '}
  <ButtonComponent color={ButtonColor.Info}>Info</ButtonComponent>
</ThemeProvider>;
