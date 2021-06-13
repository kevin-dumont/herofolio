import styled from 'styled-components';

import { FONTS } from '@constants/theme';

export const Frieze = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  margin-top: -40px;
  background-color: #ffffff;
  background-image: linear-gradient(
      to right,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 50%
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 95%, #246ec2 96%);
  background-size: 0 100%, 100% 7px;
  padding: 8px 10px 4px 10px;
  font-family: ${FONTS.CURSIVE};
  font-size: 17px;
  font-weight: bold;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  letter-spacing: 2px;
`;
