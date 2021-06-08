import React from 'react';
import styled from 'styled-components';

export interface CloseIconProps {
  size?: number;
}

export interface CloseIconWithColorsProps extends CloseIconProps {
  color?: string;
}

const CloseInconContainer = styled.i<CloseIconProps>`
  height: ${({ size }) => (size ? `${size}rem` : '2.4rem')};
  width: ${({ size }) => (size ? `${size}rem` : '2.4rem')};
  display: block;
  overflow: hidden;
`;

const CloseIcon = styled.i<CloseIconWithColorsProps>`
  transform: rotate(45deg);
  display: block;
  height: ${({ size }) => (size ? `${size}rem` : '2.4rem')};
  width: ${({ size }) => (size ? `${size}rem` : '2.4rem')};

  &:before,
  &:after {
    content: ' ';
    position: absolute;
    background-color: ${({ color }) => color || '#306f8a'};
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }

  &:before {
    width: ${({ size }) => (size ? `${size}rem` : '2.4rem')};
    height: 0.2rem;
  }

  &:after {
    height: ${({ size }) => (size ? `${size}rem` : '2.4rem')};
    width: 0.2rem;
  }
`;

export interface CloseProps {
  color?: string;
  [key: string]: any;
}

export const Close = ({ color, size, ...props }: CloseProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CloseInconContainer {...props} size={size}>
    <CloseIcon color={color} size={size} />
  </CloseInconContainer>
);
