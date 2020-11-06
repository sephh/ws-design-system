import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '@styles';

export interface ButtonProps {
  color: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

interface ColorMixin {
    bgColor: string;
    fontColor: string;
    activeBgColor: string;
    activeFontColor: string;
    hoverBgColor: string;
    hoverFontColor: string;
    focusBgColor: string;
    disabledBgColor: string;
    disabledFontColor: string;
}

const colorMixin = (colors: ColorMixin) => `
    background-color: ${colors.bgColor};
    color: ${colors.fontColor};
    border: 2px solid transparent;
    
    &:disabled {
      background-color: ${colors.disabledBgColor};
      color: ${colors.disabledFontColor};
      cursor: not-allowed;
    }
    
    &:hover {
      background-color: ${colors.hoverBgColor};
      color: ${colors.hoverFontColor};
    }
    
    &:focus {
      outline: 2px solid ${colors.hoverBgColor};
      outline-offset: 1px;
    }
    
    &:active {
      background-color: ${colors.activeBgColor};
      border-color: ${colors.activeBgColor};
      color: ${colors.activeFontColor};
    }
`;

const handleColor = (props: ButtonProps) => {
  switch (props.color) {
      case 'primary':
        return colorMixin({
            bgColor: defaultTheme.primaryColor,
            fontColor: defaultTheme.textColorOnPrimary,
            activeBgColor: defaultTheme.primaryActiveColor,
            activeFontColor: defaultTheme.textColorOnPrimary,
            hoverBgColor: defaultTheme.primaryHoverColor,
            hoverFontColor: defaultTheme.textColorOnPrimary,
            focusBgColor: defaultTheme.primaryHoverColor,
            disabledBgColor: defaultTheme.disabled,
            disabledFontColor: defaultTheme.textOnDisabled,
        });
    default:
      return '';
  }
};

export const Button = styled.button<ButtonProps>`
  padding: 8px 12px;
  border-radius: 16px;
  min-width: 100px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: background-color 0.2s linear, color 0.2s linear;

  ${handleColor}
`;
