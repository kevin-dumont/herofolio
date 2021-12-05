import styled from 'styled-components';

import { MEDIA } from '@constants/theme';

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
