import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '@styles';

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

export const defaultColorSchema: ColorMixin = {
  fontColor: defaultTheme.status.defaultFontColor,
  bgColor: defaultTheme.status.defaultColor,
  hoverBgColor: defaultTheme.status.defaultColorHover,
  activeBgColor: defaultTheme.status.defaultColorActive,
  invertedFontColor: defaultTheme.textColorInverted,
};

export const colorSchema: { [key: string]: ColorMixin } = {
  [ButtonColor.Primary]: {
    bgColor: defaultTheme.primaryColor,
    fontColor: defaultTheme.textColorOnPrimary,
    invertedFontColor: defaultTheme.textColorOnPrimary,
    activeBgColor: defaultTheme.primaryActiveColor,
    hoverBgColor: defaultTheme.primaryHoverColor,
  },
  [ButtonColor.Secondary]: {
    bgColor: defaultTheme.status.secondaryColor,
    fontColor: defaultTheme.textColorInverted,
    invertedFontColor: defaultTheme.textColorInverted,
    activeBgColor: defaultTheme.status.secondaryColorActive,
    hoverBgColor: defaultTheme.status.secondaryColorHover,
  },
  [ButtonColor.Danger]: {
    bgColor: defaultTheme.status.dangerColor,
    fontColor: defaultTheme.status.dangerColorActive,
    invertedFontColor: defaultTheme.textColorInverted,
    activeBgColor: defaultTheme.status.dangerColorActive,
    hoverBgColor: defaultTheme.status.dangerColorHover,
  },
  [ButtonColor.Info]: {
    bgColor: defaultTheme.status.infoColor,
    fontColor: defaultTheme.status.infoColorActive,
    invertedFontColor: defaultTheme.textColorInverted,
    activeBgColor: defaultTheme.status.infoColorActive,
    hoverBgColor: defaultTheme.status.infoColorHover,
  },
  [ButtonColor.Success]: {
    bgColor: defaultTheme.status.successColor,
    fontColor: defaultTheme.status.successColorActive,
    invertedFontColor: defaultTheme.textColorInverted,
    activeBgColor: defaultTheme.status.successColorActive,
    hoverBgColor: defaultTheme.status.successColorHover,
  },
  [ButtonColor.Warning]: {
    bgColor: defaultTheme.status.warningColor,
    fontColor: defaultTheme.status.warningColorActive,
    invertedFontColor: defaultTheme.textColorInverted,
    activeBgColor: defaultTheme.status.warningColorActive,
    hoverBgColor: defaultTheme.status.warningColorHover,
  },
};

const handleColor = (props: ButtonProps) => {
  if (!props.color || !colorSchema[props.color]) {
    return colorMixin(defaultColorSchema);
  }

  return colorMixin(colorSchema[props.color]);
};

const handleBlock = ({ block }: ButtonProps) => block && `
  display: block; 
  width: 100%;
`;

export const Button = styled.button<ButtonProps>`
  padding: 8px 12px;
  border-radius: 16px;
  min-width: 100px;
  cursor: pointer;
  border: 2px solid transparent;
  font-weight: 500;
  transition: background-color 0.2s linear, color 0.2s linear;
  font-family: ${defaultTheme.primaryFont};
  
  ${handleBlock}
  
  ${handleColor}
  
  &:disabled{
    background-color: ${defaultTheme.disabled};
    color: ${defaultTheme.textOnDisabled};
    cursor: not-allowed;
  }
`;
