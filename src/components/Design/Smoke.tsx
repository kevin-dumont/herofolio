import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const getSmokeAnimation = (x: number, y: number) => keyframes`
	0% {
    transform: scale(0) translate(0, 0)
  }
	70% {
    opacity: 1;
  }
	100% { 
    transform: scale(1) translate(${x}px, ${y}px);
    opacity: 0;
  }
`;

const CloudContainer = styled.div`
  position: absolute;
`;

type CloudProps = {
  animationDelay: number;
  x: number;
  y: number;
};

const Cloud = styled.div<CloudProps>`
  display: block;
  position: absolute;
  bottom: -35px;
  margin-left: -20px;
  height: 100px;
  width: 100px;
  border-radius: 100px;
  background: #fff;
  left: -14px;
  transform: scale(0);
  transform-origin: center;

  ${({ animationDelay, x, y }) => css`
    animation: ${getSmokeAnimation(x, y)} 10s ${animationDelay}s infinite linear;
  `}
`;

export type SmokeProps = {
  className?: string;
};

export function Smoke({ className }: SmokeProps) {
  return (
    <CloudContainer className={className}>
      {[...Array(20).keys()].map((key, i) => (
        <Cloud
          key={key}
          animationDelay={key / 1.8}
          x={
            (i % 4 === 0 && -280) ||
            (i % 3 === 0 && -360) ||
            (i % 2 === 0 && -240) ||
            -220
          }
          y={
            (i % 4 === 0 && -220) ||
            (i % 3 === 0 && -240) ||
            (i % 2 === 0 && -260) ||
            -280
          }
        />
      ))}
    </CloudContainer>
  );
}
