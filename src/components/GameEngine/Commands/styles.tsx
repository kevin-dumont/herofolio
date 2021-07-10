import styled, { css } from 'styled-components';

import type {
  ArrowContainerProps,
  ArrowProps,
} from '@components/GameEngine/Commands/types';

export const COMMANDS_COLOR = 'rgba(255, 255, 255, 0.65)';

export const CommandsWrapper = styled.div`
  position: fixed;
  z-index: 15;
  bottom: 10px;
  right: 10px;
  width: 150px;
  height: 150px;
`;

export const ArrowContainer = styled.div<ArrowContainerProps>`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  user-select: none;

  ${({ direction }) =>
    direction === 'down' &&
    css`
      left: calc(50% - 25px);
      bottom: 0;
    `}

  ${({ direction }) =>
    direction === 'up' &&
    css`
      left: calc(50% - 25px);
      top: 0;
    `}

  ${({ direction }) =>
    direction === 'left' &&
    css`
      top: calc(50% - 25px);
      left: 0;
    `}

  ${({ direction }) =>
    direction === 'right' &&
    css`
      top: calc(50% - 25px);
      right: 0;
    `};
`;
export const Arrow = styled.div<ArrowProps>`
  height: 0;
  width: 0;
  border: 25px solid transparent;
  user-select: none;

  ${({ direction }) =>
    direction === 'down' &&
    css`
      border-top-color: ${COMMANDS_COLOR};
      margin-top: 25px;
    `}

  ${({ direction }) =>
    direction === 'up' &&
    css`
      border-bottom-color: ${COMMANDS_COLOR};
      margin-bottom: 25px;
    `}

  ${({ direction }) =>
    direction === 'left' &&
    css`
      border-right-color: ${COMMANDS_COLOR};
      margin-right: 25px;
    `}

  ${({ direction }) =>
    direction === 'right' &&
    css`
      border-left-color: ${COMMANDS_COLOR};
      margin-left: 25px;
    `};
`;
export const Circle = styled.div`
  position: absolute;
  height: 36px;
  width: 36px;
  background: ${COMMANDS_COLOR};
  top: calc(50% - 18px);
  left: calc(50% - 18px);
  border-radius: 50%;
  box-sizing: border-box;
  user-select: none;
`;
