import { render } from '@testing-library/react';

const Providers = ({ children }: any) => {
  return children;
};

const customRender = (ui: any, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender };
