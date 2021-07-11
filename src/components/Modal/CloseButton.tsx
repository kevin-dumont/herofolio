import React from 'react';
import styled from 'styled-components';

import { CloseProps, Close } from '@components/Design/Icons/Close';

const Button = styled.button`
  background: none;
  padding: 0;
  border: 0;
  margin: 0;
  position: fixed;
  top: 20px;
  right: 10px;
  cursor: pointer;
`;

export interface CloseButtonProps extends CloseProps {
  onClick: () => any;
  ariaLabel?: string;
}

const CloseButton = ({ onClick, ariaLabel, ...props }: CloseProps) => (
  <Button onClick={onClick} aria-label={ariaLabel || 'close'}>
    <Close {...props} />
  </Button>
);

export default CloseButton;
