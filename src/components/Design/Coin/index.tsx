import React, { memo } from 'react';
import styled, { keyframes, css } from 'styled-components';

import { FadeOut } from '@components/Design/FadeOut';

export interface CoinProps {
  taken: boolean;
}

export interface CoinUiProps {
  taken: boolean;
}

const SIZE = '40px';
const FONT_SIZE = '28px';
const WIDTH = '4px';
const COLOR = '#ffd600';
const INNER_COLOR = '#ceae0c';
const SPEED = '2s';

const rotate = keyframes`
  0% {
    transform: rotateY(90deg) translate3d(0, -10px, 0);
  }
  50% {
    transform: rotateY(270deg) translate3d(0, -20px, 0);
  }
  100% {
    transform: rotateY(450deg) translate3d(0, -10px, 0);
  }
`;

const hideEffect = keyframes`
  95% {
    transform: rotateY(1080deg) translate3d(0, -200px, 0) scale(1);
  }
  100% {
    transform: rotateY(1080deg) translate3d(0, -200px, 0) scale(0);
  }
`;

const CoinUi = styled.div<CoinUiProps>`
  font-size: ${FONT_SIZE};
  font-weight: bold;
  width: ${WIDTH};
  height: ${SIZE};
  background: ${INNER_COLOR};
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform-style: preserve-3d;
  transform: rotateY(90deg) translate3d(0, -15px, 0);
  animation: ${rotate} ${SPEED} infinite linear;
  pointer-events: none;

  ${({ taken }) =>
    taken &&
    css`
      animation: ${hideEffect} 0.5s ease forwards;
    `}

  .side,
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: ${SIZE};
    height: ${SIZE};
    overflow: hidden;
    background: ${INNER_COLOR};
    border-radius: 50%;
    right: calc(-${SIZE} / 2 + ${WIDTH});
    text-align: center;
    line-height: calc(${SIZE} - 2px);
    color: ${COLOR};
    transform: rotateY(-90deg);
    backface-visibility: hidden;
  }

  .heads,
  .tails {
    box-shadow: inset 0 0 0 6px ${COLOR};
  }

  .tails,
  &:after {
    left: calc(-${SIZE} / 2 + ${WIDTH});
    transform: rotateY(90deg);
  }

  &:before,
  &:after {
    background: ${INNER_COLOR};
    backface-visibility: hidden;
    transform: rotateY(90deg);
  }

  &:after {
    transform: rotateY(-90deg);
  }
`;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
  top: 0;
  transition: all 0.5s ease;
`;

const Coin = ({ taken }: CoinProps) => (
  <Wrapper>
    <CoinUi taken={taken}>
      <div className="side heads">$</div>
      <div className="side tails">$</div>
    </CoinUi>
  </Wrapper>
);

export default Coin;
