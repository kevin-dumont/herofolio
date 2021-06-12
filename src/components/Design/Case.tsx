import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { FONTS } from '@constants/theme';
import { BrickBg } from '@components/Design/BrickBg';

interface PositionProps {
  isJumping: boolean;
  jumpHeight: number;
}

export const CaseSquare = styled(BrickBg)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  color: #fff;

  @media screen and (max-height: 600px) {
    width: 40px;
    height: 40px;
  }
`;

const Position = styled.div<PositionProps>`
  text-align: center;
  transition: transform 0.2s ease;
  transition-delay: 0.15s;
  cursor: pointer;

  ${({ isJumping, jumpHeight }) =>
    isJumping &&
    css`
      transform: translate3d(0, -${jumpHeight}px, 0);
    `}
`;

const Text = styled.div`
  font-family: ${FONTS.MONO};
  position: absolute;
  margin-top: -2.2rem;
  color: #b42e25;
  text-shadow: 0px 1px 0px #fff;
  font-size: 1.6rem;
  font-weight: bold;
  margin-left: 25px;
  width: 1px;
  display: flex;
  justify-content: center;
`;

export interface CaseProps {
  children: ReactNode;
  isJumping: boolean;
  jumpHeight: number;
  onClick: () => any;
}

const Case = ({ children, onClick, isJumping, jumpHeight }: CaseProps) => (
  <Position onClick={onClick} jumpHeight={jumpHeight} isJumping={isJumping}>
    <Text>{children}</Text>
    <CaseSquare />
  </Position>
);

export default Case;
