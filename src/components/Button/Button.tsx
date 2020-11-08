import React from 'react';
import styled from 'styled-components';
import { defaultTheme, Theme } from '@styles';

export enum ButtonColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

export interface ButtonProps {
  disabled?: boolean;
  block?: boolean;
  color?: ButtonColor;
  theme?: Theme;
}

export interface ColorMixin {
  bgColor: string;
  fontColor: string;
  invertedFontColor: string;
  activeBgColor: string;
  hoverBgColor: string;
}

const colorMixin = (colors: ColorMixin) => `
    background-color: ${colors.bgColor};
    color: ${colors.fontColor};

    &:hover, &:focus {
      background-color: ${colors.hoverBgColor};
    }

    &:active {
      background-color: ${colors.activeBgColor};
      color: ${colors.invertedFontColor};
    }
`;

export const defaultColorSchema: (theme: Theme) => ColorMixin = (theme) => ({
  fontColor: theme.status.defaultFontColor,
  bgColor: theme.status.defaultColor,
  hoverBgColor: theme.status.defaultColorHover,
  activeBgColor: theme.status.defaultColorActive,
  invertedFontColor: theme.textColorInverted,
});

export const colorSchema: { [key: string]: (theme:Theme) => ColorMixin } = {
  [ButtonColor.Primary]: (theme) => ({
    bgColor: theme.primaryColor,
    fontColor: theme.textColorOnPrimary,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.primaryActiveColor,
    hoverBgColor: theme.primaryHoverColor,
  }),
  [ButtonColor.Secondary]: (theme) => ({
    bgColor: theme.status.secondaryColor,
    fontColor: theme.textColorInverted,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.status.secondaryColorActive,
    hoverBgColor: theme.status.secondaryColorHover,
  }),
  [ButtonColor.Danger]: (theme) => ({
    bgColor: theme.status.dangerColor,
    fontColor: theme.status.dangerColorActive,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.status.dangerColorActive,
    hoverBgColor: theme.status.dangerColorHover,
  }),
  [ButtonColor.Info]: (theme) => ({
    bgColor: theme.status.infoColor,
    fontColor: theme.status.infoColorActive,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.status.infoColorActive,
    hoverBgColor: theme.status.infoColorHover,
  }),
  [ButtonColor.Success]: (theme) => ({
    bgColor: theme.status.successColor,
    fontColor: theme.status.successColorActive,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.status.successColorActive,
    hoverBgColor: theme.status.successColorHover,
  }),
  [ButtonColor.Warning]: (theme) => ({
    bgColor: theme.status.warningColor,
    fontColor: theme.status.warningColorActive,
    invertedFontColor: theme.textColorInverted,
    activeBgColor: theme.status.warningColorActive,
    hoverBgColor: theme.status.warningColorHover,
  }),
};

const handleColor = (props: ButtonProps) => {
  if (!props.color || !colorSchema[props.color] || !props.theme) {
    return colorMixin(defaultColorSchema(defaultTheme));
  }

  return colorMixin(colorSchema[props.color](props.theme));
};

const handleBlock = ({ block }: ButtonProps) => block && `
  display: block; 
  width: 100%;
`;

export const Button = styled.button<ButtonProps>`
  padding: 8px 12px;
  min-width: 100px;
  cursor: pointer;
  border: 2px solid transparent;
  font-weight: 500;
  transition: background-color 0.2s linear, color 0.2s linear;
  font-family: ${(props) => props.theme.primaryFont};
  border-radius: ${(props) => props.theme.buttonBorderRadius};
  
  ${handleBlock}
  
  ${handleColor}
  
  &:disabled{
    background-color: ${(props) => props.theme.disabled};
    color: ${(props) => props.theme.textOnDisabled};
    cursor: not-allowed;
  }
`;
