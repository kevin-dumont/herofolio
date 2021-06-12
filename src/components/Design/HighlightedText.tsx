import styled from 'styled-components';

import { MEDIA } from '@constants/theme';

const textBg = `
  linear-gradient(1deg, #fff 30%, transparent 31%, transparent 49%, #fff 50%, #fff 75%, transparent 76%) 4px 0 / 90% repeat-y
`;

export const HighlightedText = styled.div`
  position: fixed;
  z-index: 2;
  top: 30px;
  left: 30px;
  font-size: 1.8rem;
  line-height: 35px;
  letter-spacing: 2px;
  color: #333;
  font-weight: bold;
  background: ${textBg};
  width: 360px;
  max-width: 100%;

  ${MEDIA.MAX_S} {
    font-size: 1.6rem;
    top: 15px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    background-position: center;
  }
`;
