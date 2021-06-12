import styled, { keyframes } from 'styled-components';

const SIZE = '300px';
const SIZE_SM = '250px';

export interface SunProps {
  color?: string;
  opacity?: number;
}

const bounce = keyframes`
  0% {
    transform: scale(1)
  }
  50% {
    transform: scale(1.2)
  }
  100% {
    transform: scale(1)
  }
`;

export const Sun = styled.div<SunProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    position: absolute;
    content: '';
    min-width: calc(${SIZE} / 1.8);
    min-height: calc(${SIZE} / 1.8);
    max-width: calc(${SIZE} / 1.8);
    max-height: calc(${SIZE} / 1.8);
    background: ${({ color }) => color || '#ffd600'};
    border-radius: 100%;

    @media screen and (max-height: 600px) {
      min-width: calc(${SIZE_SM} / 1.8);
      min-height: calc(${SIZE_SM} / 1.8);
      max-width: calc(${SIZE_SM} / 1.8);
      max-height: calc(${SIZE_SM} / 1.8);
    }
  }

  &::after {
    position: absolute;
    opacity: ${({ opacity }) => (opacity !== undefined ? opacity : 1)};
    transition: opacity 0.5s ease;
    content: '';
    min-width: ${SIZE};
    min-height: ${SIZE};
    max-width: ${SIZE};
    max-height: ${SIZE};
    background: rgba(255, 214, 0, 0.4);
    border-radius: 100%;
    animation: ${bounce} 6s infinite ease-in-out;
    transform-origin: center;

    @media screen and (max-height: 600px) {
      min-width: ${SIZE_SM};
      min-height: ${SIZE_SM};
      max-width: ${SIZE_SM};
      max-height: ${SIZE_SM};
    }
  }
`;
