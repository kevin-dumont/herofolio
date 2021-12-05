import styled, { keyframes } from 'styled-components';

import { MEDIA, FONTS } from '@constants/theme';
import { get3dTextShadow } from '@services/helpers';

export const ModalRight = styled.div`
  padding: 30px;
  overflow: auto;

  h2 {
    margin-top: 0;
    font-size: 2rem;
  }

  p {
    line-height: 2.6rem;
    font-family: 'Montserrat', sans-serif;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  max-height: 377px;

  img {
    ${MEDIA.MAX_S} {
      display: none;
    }
  }
`;
