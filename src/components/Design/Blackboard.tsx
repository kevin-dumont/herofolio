import styled from 'styled-components';

import { FONTS } from '@constants/theme';

export const Blackboard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;
  font-family: ${FONTS.MONO};
  font-size: 14px;
  border: 10px solid rgb(243, 164, 51);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
`;
