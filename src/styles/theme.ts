import { primaryFont } from './typography';
import { gray, green, lima, red, yellow } from './colors';

export const defaultTheme = {
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
