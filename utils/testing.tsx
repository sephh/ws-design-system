import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@styles';

const Providers = ({ children, theme }: any) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

function renderWithProviders(
  ui,
  {
    theme = defaultTheme,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Providers theme={theme}>{children}</Providers>;
  }

  return render(ui, { wrapper: Wrapper as any, ...renderOptions });
}

export * from '@testing-library/react';

export { renderWithProviders };
