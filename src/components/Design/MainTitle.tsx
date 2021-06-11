import React from 'react';
import styled from 'styled-components';

import { MEDIA, FONTS } from '@constants/constants';
import { get3dTextShadow } from '@services/helpers';
import { Flower } from '@components/Design/Vegetation';

export const Title = styled.div`
  font-size: 86px;
  font-weight: 800;
  letter-spacing: -5px;
  color: #fd4f5e;
  text-shadow: ${get3dTextShadow('#ce3744', 15)};
  line-height: 62px;
  text-align: center;

  ${MEDIA.MAX_S} {
    font-size: 56px;
    line-height: 40px;
  }

  span {
    font-size: 96px;
    display: block;

    ${MEDIA.MAX_S} {
      font-size: 60px;
      line-height: 40px;
    }
  }
`;

export const Presents = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(63% - 8px);
  right: 30px;
  font-size: 20px;
  color: #fff;
  text-shadow: ${get3dTextShadow('#AAA', 3)};

  ${MEDIA.MAX_S} {
    height: 144px;
    right: 50px;
    font-size: 16px;
  }
`;

export const Subtitle = styled.div`
  position: relative;
  z-index: 2;
  font-size: 108px;
  font-weight: 800;
  letter-spacing: -5px;
  color: #ffd600;
  text-shadow: ${get3dTextShadow('#ceae0c', 15)};
  line-height: 62px;
  text-align: center;

  ${MEDIA.MAX_S} {
    font-size: 76px;
    line-height: 40px;
  }
`;

export const TitleContainer = styled.h1`
  width: 550px;
  height: 210px;
  position: absolute;
  font-family: ${FONTS.DEFAULT};
  text-transform: uppercase;
  bottom: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 8px;

  ${MEDIA.MAX_S} {
    width: 380px;
    height: 144px;
    padding: 0 10px;
  }
`;

export const MainTitle = () => (
  <TitleContainer>
    <Flower
      zIndex={0}
      bottom={20}
      color="#ffffff"
      rodColor="#4ca446"
      left={-25}
    />
    <Flower zIndex={0} bottom={50} color="#fd4f5e" left={30} />
    <Flower zIndex={-1} bottom={120} color="#ce3744" left={120} />
    <Flower
      zIndex={0}
      bottom={70}
      color="#ffffff"
      right={40}
      rodColor="#4ca446"
    />
    <Flower
      zIndex={0}
      bottom={20}
      color="#ffffff"
      rodColor="#4ca446"
      left={-25}
    />
    <Flower
      zIndex={1}
      bottom={0}
      color="#ce3744"
      right={-20}
      rodColor="#4ca446"
    />
    <Title>
      Kevin
      <span>Dumont</span>
    </Title>
    <Presents>presents</Presents>
    <Subtitle>Herofolio</Subtitle>
  </TitleContainer>
);
