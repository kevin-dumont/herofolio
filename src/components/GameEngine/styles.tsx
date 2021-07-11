import styled, { keyframes, css } from 'styled-components';

import {
  ArrowContainerProps,
  ArrowProps,
  GameContainerProps,
  GameElementProps,
  PlanProps,
} from '@components/GameEngine/types';
import { COMMANDS_COLOR } from '@components/GameEngine/constants';

const phoneAnimation = keyframes`
0% {
  opacity: 0;
  transform: rotate(0deg);
}
20% {
  opacity: 1;
  transform: rotate(0deg);
}
60% {
  transform: rotate(-90deg);
  opacity: 1;
}
70% {
  transform: rotate(-90deg);
  opacity: 1;
}
100% {
  transform: rotate(-90deg);
  opacity: 0;
}
`;

export const PhoneRotate = styled.div`
  width: 40px;
  height: 70px;
  border: 2px solid #333;
  border-top-width: 6px;
  border-bottom-width: 10px;
  border-radius: 5px;
  animation: infinite ${phoneAnimation} 1.8s ease;
`;

export const PhoneRotateText = styled.div`
  margin-top: 20px;
  text-align: center;
`;
export const GameContainer = styled.div.attrs(
  ({ ...style }: GameContainerProps) => ({
    style,
  })
)<GameContainerProps>`
  transition: background 0.5s ease;
  position: fixed;
  overflow: hidden;
`;

export const Plan = styled.div.attrs(({ left }: PlanProps) => ({
  style: {
    transform: `translate3d(${left}px, 0, 0)`,
  },
}))<PlanProps>`
  position: absolute;
  transition: transform 0.2s linear;
  height: 100%;
  width: 100%;

  ${({ zIndex }) =>
    zIndex !== undefined &&
    css`
      z-index: ${zIndex};
    `}
`;

export const GameElement = styled.div.attrs(({ left }: GameElementProps) => ({
  style: {
    transform: `translate3d(calc(${left}px), 0, 0)`,
  },
}))<GameElementProps>`
  transition: transform 0.2s linear 0s;
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0;
  backface-visibility: hidden;
  pointer-events: none;

  ${({ width, height, top, bottom, transition, zIndex }) =>
    css`
      ${width !== undefined &&
      css`
        width: ${width}px;
      `}

      ${height !== undefined &&
      css`
        height: ${height}px;
      `}

      ${top !== undefined &&
      css`
        top: ${top}px;
      `}

      ${bottom !== undefined &&
      css`
        bottom: ${bottom}px;
      `}

      ${transition &&
      css`
        transition: ${transition};
      `}

      ${zIndex &&
      css`
        z-index: ${zIndex};
      `}
    `}
`;

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
