import styled, { css } from 'styled-components';

interface FadeOutType {
  hide: boolean;
  duration: string;
}

export const FadeOut = styled.div<FadeOutType>`
  opacity: 1;
  pointer-events: none;
  transition: opacity ${(p) => p.duration} ease;

  ${({ hide }) =>
    hide &&
    css`
      opacity: 0;
    `}
`;
