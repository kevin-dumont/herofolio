import styled, { keyframes } from 'styled-components';

import { FONTS } from '@constants/theme';
import { get3dTextShadow } from '@services/helpers';

const commandsHelperAnimate = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
`;

export const CommandsHelper = styled.div`
  font-family: ${FONTS.MONO};
  color: #fff;
  text-shadow: ${get3dTextShadow('#58402a', 2)};
  animation: infinite 0.7s ease ${commandsHelperAnimate};
  transform-origin: center;
  text-align: center;
  padding: 0 12px;
  display: flex;
  align-items: center;
`;
