import { primaryFont } from './typography';
import {blue, gray, green, lemon, lima, red, yellow} from './colors';

export interface ThemeStatus {
  defaultColor: string;
  defaultFontColor: string;
  defaultColorHover: string;
  defaultColorActive: string;
  secondaryColor: string;
  secondaryColorHover: string;
  secondaryColorActive: string;
  warningColor: string;
  warningColorHover: string;
  warningColorActive: string;
  infoColor: string;
  infoColorHover: string;
  infoColorActive: string;
  dangerColor: string;
  dangerColorHover: string;
  dangerColorActive: string;
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
  primaryHoverColor: green[900],
  primaryActiveColor: green['A100'],
  textColorOnPrimary: gray[100],
  textColor: gray[600],
  textColorInverted: gray[100],
  primaryFont: primaryFont,
  disabled: gray[300],
  textOnDisabled: gray[500],
  buttonBorderRadius: '16px',
  status: {
    defaultColor: gray[200],
    defaultFontColor: gray["A200"],
    defaultColorHover: gray[400],
    defaultColorActive: gray[800],
    secondaryColor: lemon[800],
    secondaryColorHover: lemon[900],
    secondaryColorActive: lemon['A100'],
    warningColor: yellow[100],
    warningColorHover: yellow[200],
    warningColorActive: yellow[300],
    dangerColor: red[100],
    dangerColorHover: red[200],
    dangerColorActive: red[300],
    infoColor: blue[100],
    infoColorHover: blue[200],
    infoColorActive: blue[300],
    successColor: lima[100],
    successColorHover: lima[200],
    successColorActive: lima[300],
  },
};


export const darkTheme: Theme = {
  primaryColor: gray['A200'],
  primaryHoverColor: gray[900],
  primaryActiveColor: lemon[300],
  textColorOnPrimary: lemon[200],
  textColor: gray[600],
  textColorInverted: gray[100],
  primaryFont: primaryFont,
  disabled: gray[300],
  textOnDisabled: gray[500],
  buttonBorderRadius: '0',
  status: {
    defaultColor: gray[200],
    defaultFontColor: gray["A200"],
    defaultColorHover: gray[400],
    defaultColorActive: gray[800],
    secondaryColor: gray['A200'],
    secondaryColorHover: gray[900],
    secondaryColorActive: lemon[100],
    warningColor: gray['A200'],
    warningColorHover: gray[900],
    warningColorActive: yellow[100],
    dangerColor: gray['A200'],
    dangerColorHover: gray[900],
    dangerColorActive: red[100],
    infoColor: gray['A200'],
    infoColorHover: gray[900],
    infoColorActive: blue[100],
    successColor: gray['A200'],
    successColorHover: gray[900],
    successColorActive: lima[100],
  },
};
