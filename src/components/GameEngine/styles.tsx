import styled, { keyframes, css } from "styled-components";

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

/////// GAME ELEMENTS

export interface GameContainerProps {
  width: number;
  height: number;
  background?: string;
}

export const GameContainer = styled.div.attrs(
  ({ ...style }: GameContainerProps) => ({
    style,
  })
)<GameContainerProps>`
  transition: background 0.5s ease;
  position: fixed;
  overflow: hidden;
`;

export interface PlanProps {
  left: number;
  zIndex?: number;
}

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

export interface GameElementProps {
  width: number;
  height: number;
  left: number;
  bottom?: number;
  top?: number;
  zIndex?: number;
  transition?: string;
}

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
      ${
        width !== undefined &&
        css`
          width: ${width}px;
        `
      }

      ${
        height !== undefined &&
        css`
          height: ${height}px;
        `
      }

      ${
        top !== undefined &&
        css`
          top: ${top}px;
        `
      }

      ${
        bottom !== undefined &&
        css`
          bottom: ${bottom}px;
        `
      }

      ${
        transition &&
        css`
          transition: ${transition};
        `
      }

      ${
        zIndex &&
        css`
          z-index: ${zIndex};
        `
      }
    `}
`;
