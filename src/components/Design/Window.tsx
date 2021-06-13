import styled from 'styled-components';

import { FONTS } from '@constants/theme';

export const Window = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  background-color: #79d4ff;
  background-image: linear-gradient(
    140deg,
    #79d4ff 22%,
    #9cdcfa 22.1%,
    #79d4ff 54%,
    #79d4ff 55%,
    #9cdcfa 55.1%,
    #79d4ff 80%
  );
  color: #fff;
  font-family: ${FONTS.MONO};
  border: 10px solid #e6af39;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 5px);
    height: 10px;
    width: 100%;
    background-color: #e6af39;
  }

  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 100%;
    background-color: #e6af39;
  }
`;
