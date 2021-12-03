import React, { FC } from 'react';
import styled from 'styled-components';

import { FONTS } from '@constants/theme';
import { BrickBg } from '@components/Design/BrickBg';

export const CaseSquare = styled(BrickBg)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  color: #fff;

  @media screen and (max-height: 600px) {
    width: 40px;
    height: 40px;
  }
`;

const Position = styled.div`
  text-align: center;
  transition: transform 0.2s ease;
  transition-delay: 0.15s;
  cursor: pointer;
`;

const Text = styled.div`
  font-family: ${FONTS.MONO};
  position: absolute;
  margin-top: -2.2rem;
  color: #b42e25;
  text-shadow: 0px 1px 0px #fff;
  font-size: 1.6rem;
  font-weight: bold;
  margin-left: 25px;
  width: 1px;
  display: flex;
  justify-content: center;
`;

const Case: FC = ({ children }) => (
  <Position>
    <Text>{children}</Text>
    <CaseSquare />
  </Position>
);

export default Case;
