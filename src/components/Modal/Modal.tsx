import React from 'react';
import { Fade, Modal as MaterialModal, ModalProps as MaterialModalProps } from '@material-ui/core';
import styled from 'styled-components';
import { gray, textFont, typeScale, white } from '@styles';
import { SizeEnum } from '@models';

export interface ModalProps extends MaterialModalProps {
  size: SizeEnum
  title: string;
}

const ModalHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${gray[300]};
  font-size: ${typeScale.header4};
  font-family: ${props => props.theme.primaryFont};
  color: ${(props) => props.theme.primaryColor};
`;

const ModalBody = styled.div`
  padding: 15px;
`;

const containerWidth = {
  [SizeEnum.ExtraSmall]: '200px',
  [SizeEnum.Small]: '320px',
  [SizeEnum.Medium]: '500px',
  [SizeEnum.Large]: '800px',
  [SizeEnum.ExtraLarge]: '1200px'
};

const handleContainerSize = ({ size }) => {
  return `width: ${size ? containerWidth[size] : containerWidth[SizeEnum.Medium]}`;
};

const ModalContainer = styled.div<{ size: SizeEnum }>`
  border-radius: 4px;
  background-color: ${white};
  font-family: ${props => props.theme.textFont};
  font-size: ${typeScale.paragraph};
  outline: 0;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50px);
  ${handleContainerSize}
`;

export const Modal: React.FC<ModalProps> = ({ children, open, title, size, ...props }) => {
  return (
    <MaterialModal {...props} open={open}>

      <Fade in={open}>
        <ModalContainer size={size}>

          {!!(title) && <ModalHeader>{title}</ModalHeader>}

          <ModalBody>
            {children}
          </ModalBody>

        </ModalContainer>
      </Fade>


    </MaterialModal>
  );
};
