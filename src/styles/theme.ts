import { primaryFont } from './typography';
import { gray, green, lima, red, yellow } from './colors';

export interface ThemeStatus {
  warningColor: string;
  warningColorHover: string;
  warningColorActive: string;
  errorColor: string;
  errorColorHover: string;
  errorColorActive: string;
  successColor: string;
  successColorHover: string;
  successColorActive: string;
}

export interface Theme{
  primaryColor: string;
  primaryHoverColor: string;
  primaryActiveColor: string;
  textColorOnPrimary: string;
  textColor: string;
  textColorInverted: string;
  primaryFont: string;
  disabled: string;
  textOnDisabled: string;
  buttonBorderRadius: string;
  status: ThemeStatus;
}

export const defaultTheme: Theme = {
  primaryColor: green[800],
  primaryHoverColor: green[700],
  primaryActiveColor: green[500],
  textColorOnPrimary: gray[100],
  textColor: gray[600],
  textColorInverted: gray[100],
  primaryFont: primaryFont,
  disabled: gray[400],
  textOnDisabled: gray[300],
  buttonBorderRadius: '16px',
  status: {
    warningColor: yellow[100],
    warningColorHover: yellow[200],
    warningColorActive: yellow[300],
    errorColor: red[100],
    errorColorHover: red[200],
    errorColorActive: red[300],
    successColor: lima[100],
    successColorHover: lima[200],
    successColorActive: lima[300],
  },
};
