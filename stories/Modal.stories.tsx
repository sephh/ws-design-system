import React, { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonColor, Modal as ModalComponent, ModalProps } from '@components';
import { defaultTheme } from '../src/styles';
import { ThemeProvider } from 'styled-components';

export default {
  title: 'Components/Modal',
  component: ModalComponent,
  decorators: [(Story, context) => {
    return <ThemeProvider theme={defaultTheme}>
      {Story()}
    </ThemeProvider>;
  }]
} as Meta;

const Template: Story<ModalProps> = (args: ModalProps) => {
  const [open, setOpen] = useState(args.open);

  useEffect(() => {
    setOpen(args.open);
  }, [args.open]);

  return <>
    <ModalComponent
      {...args}
      open={open}
      onClose={() => setOpen(false)}
    >
      <div>
        Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.
        Interagi no mé, cursus quis, vehicula ac nisi. Cevadis im ampola pa arma uma pindureta. Mauris nec dolor in eros
        commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.
      </div>
    </ModalComponent>

    <Button
      color={ButtonColor.Primary}
      onClick={() => setOpen(true)}
    >
      Abrir
    </Button>
  </>;
};

export const Modal = Template.bind({});

Modal.args = {
  open: false,
  title: 'Mussum Ipsum'
};
