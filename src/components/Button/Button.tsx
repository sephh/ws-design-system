import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
}

export const Button = styled.button<ButtonProps>`
  padding: 8px 12px;
  border-radius: 16px;
  min-width: 100px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: background-color 0.2s linear, color 0.2s linear;
`;
