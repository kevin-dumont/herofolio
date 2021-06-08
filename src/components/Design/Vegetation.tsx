import styled, { css } from "styled-components";

export interface CommonProps {
  left?: number;
  right?: number;
}

export type TreeProps = CommonProps & {
  scale?: number;
  rotate?: number;
  pale?: boolean;
};

export type BamboosProps = CommonProps & {
  rotate?: number;
  scale?: number;
  zIndex?: number;
};

export type FlowerProps = CommonProps & {
  zIndex?: number;
  bottom?: number;
  color: string;
  rodColor?: string;
};

const trunk = "#674120";
const green = "#3f7d3b";
const paleGreen = "#489044";
const palePaleGreen = "#54ab4f";

export const Common = styled.div<CommonProps>`
  ${({ left }) =>
    typeof left === "number" &&
    css`
      left: ${left}px;
    `};

  ${({ right }) =>
    typeof right === "number" &&
    css`
      right: ${right}px;
    `};
`;

const treeGradients = `
  radial-gradient(20px 280px at 50% 100%, ${trunk} 49.7%, ${trunk}00 50%),
  radial-gradient(100px 60px at 50% 120px, ${paleGreen} 49.5%, ${paleGreen}00 50%),
  radial-gradient(160px 120px at 50% 100px, ${green} 49.5%, ${green}00 50%)
`;

const paleTreeGradients = `
  radial-gradient(20px 280px at 50% 100%, ${trunk} 49.7%, ${trunk}00 50%),
  radial-gradient(100px 60px at 50% 120px, ${palePaleGreen} 49.5%, ${palePaleGreen}00 50%),
  radial-gradient(160px 120px at 50% 100px, ${paleGreen} 49.5%, ${paleGreen}00 50%)
`;

export const Tree = styled(Common)<TreeProps>`
  width: 200px;
  height: 250px;
  bottom: 0;
  position: absolute;
  transform-origin: bottom;

  ${({ scale, rotate, pale }) => css`
    background: ${pale ? paleTreeGradients : treeGradients};
    transform: scale(${scale || 1}) rotate(${rotate || 0}deg);
  `}
`;

export const Bamboos = styled(Common)<BamboosProps>`
  width: 10px;
  height: 250px;
  bottom: -10px;
  position: absolute;
  transform-origin: bottom;
  background: linear-gradient(to bottom, ${palePaleGreen} 90%, ${green} 91%) 0 0 /
    10px 20px;

  ${({ zIndex }) =>
    typeof zIndex === "number" &&
    css`
      z-index: ${zIndex};
    `};

  ${({ scale, rotate }) => css`
    transform: scale(${scale || 1}) rotate(${rotate || 0}deg);
  `}

  &:before,
  &:after {
    content: "";
    display: block;
    width: 10px;
    bottom: 0;
    position: absolute;
    transform-origin: bottom;
    background: linear-gradient(to bottom, ${palePaleGreen} 90%, ${green} 91%) 0
      0 / 10px 20px;
  }

  &:before {
    height: 230px;
    left: -18px;
    transform: rotate(-2deg);
  }

  &:after {
    height: 220px;
    right: -10px;
    transform: rotate(3deg);
  }
`;

const flowerPetals = (color: string) => `
  -7px -7px 0 ${color},
  -10px 0px 0 ${color},
  -7px 7px 0 ${color},
  0 10px 0 ${color},
  7px 7px 0 ${color},
  10px 0px 0 ${color},
  7px -7px 0 ${color},
  0 -10px 0 ${color}
`;

export const Flower = styled(Common)<FlowerProps>`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  position: absolute;
  transform-origin: bottom;
  background: #ffd600;
  box-shadow: ${({ color }) => flowerPetals(color)};
  z-index: ${({ zIndex }) => zIndex || 0};

  ${({ bottom }) =>
    typeof bottom === "number" &&
    css`
      bottom: ${bottom + 30}px;

      &:after {
        height: ${bottom + 30}px;
      }
    `};

  &:before {
    content: "";
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    left: 10px;
    top: 30px;
    background-color: ${({ rodColor }) => rodColor || "#3f7d3b"};
    border-radius: 100% 0 100% 0;
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 2px;
    left: 10px;
    top: 30px;
    background-color: ${({ rodColor }) => rodColor || "#3f7d3b"};
  }
`;
