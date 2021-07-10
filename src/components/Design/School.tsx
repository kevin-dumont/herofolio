import React from 'react';
import styled, { css } from 'styled-components';

import { MEDIA } from '@constants/theme';
import { Clock } from '@components/Design/Clock';
import { Window } from '@components/Design/Window';

const redRoof = '#dd3d08';
const schoolColor1 = '#ffae00';
const schoolColor2 = '#ffa703';
const schoolColor3 = '#f88807';
const schoolRooftop1 = '#f5631a';
const schoolRooftop2 = '#ec450d';
const schoolGroundColor1 = '#ce800a';
const schoolGroundColor2 = '#be770c';
const schoolGroundColor3 = '#b16f0d';
const doorColor1 = '#d14702';
const doorColor2 = '#ad3b02';
const doorColor3 = '#943303';
const clockColor = '#ce0707';
const behindBellColor = '#4b2800';

const SchoolContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 380px;
  bottom: 0;
  transform-origin: center bottom;

  ${MEDIA.MAX_M} {
    transform: scale(0.7);
  }
`;

const BottomCenter = styled.div`
  width: 54.5%;
  position: absolute;
  left: 22.5%;
  bottom: 0;
  top: 0;
`;

type RoofProps = {
  angle: number;
  top: number;
  right?: number;
  left?: number;
  width: number;
  position: 'left' | 'right';
};

const Roof = styled.div<RoofProps>`
  height: 25px;
  border-radius: 4px;
  background: ${redRoof};
  z-index: 1;
  position: absolute;

  ${({ width, angle, top, right, left, position }) => css`
    transform: rotate(${angle}deg);
    transform-origin: ${position === 'left' ? 'right' : 'left'};
    top: ${top}px;
    width: ${width}px;

    ${left !== undefined &&
    css`
      left: ${left}px;
    `}

    ${right !== undefined &&
    css`
      right: ${right}px;
    `}
  `}
`;

export const Door = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 130px;
  height: 200px;
  border: 20px solid ${doorColor1};
  box-shadow: inset 5px 5px 0 5px rgba(0, 0, 0, 0.1);
  border-bottom: none;
  background: ${doorColor2};
  border-radius: 10px 10px 0 0;

  ${MEDIA.MAX_S} {
    transform: scale(0.8);
    transform-origin: bottom;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 5px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    background-color: ${doorColor3};
  }
`;

type SchoolBgProps = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  variant?: 'normal' | 'shadowed' | 'overshadowed';
};

const SchoolBg = styled.div<SchoolBgProps>`
  position: absolute;

  ${({ top, left, bottom, right, variant = 'normal' }) => css`
    background-color: ${(variant === 'shadowed' && schoolColor2) ||
    (variant === 'overshadowed' && schoolColor3) ||
    schoolColor1};
    top: ${top || 0};
    left: ${left || 0};
    bottom: ${bottom || 0};
    right: ${right || 0};
  `}
`;

const Ground = styled.div<SchoolBgProps>`
  position: absolute;
  z-index: 2;
  background: ${schoolGroundColor1};
  height: 30px;
  bottom: 0;
  width: 100%;
  border-radius: 4px 4px 0 0;

  &:before {
    content: '';
    display: block;
    position: absolute;
    background: ${schoolGroundColor2};
    height: 15px;
    bottom: 15px;
    width: 200px;
    left: calc(50% - 100px);
    border-radius: 4px 4px 0 0;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    background: ${schoolGroundColor3};
    height: 15px;
    bottom: 0;
    width: 220px;
    left: calc(50% - 110px);
    border-radius: 4px 4px 0 0;
  }
`;

const SchoolRooftop = styled.div<SchoolBgProps>`
  position: absolute;
  width: 48%;
  top: -250px;
  border: 200px solid transparent;
  border-bottom-color: ${schoolRooftop1};

  &:before {
    position: absolute;
    content: '';
    display: block;
    width: calc(100% + 50px);
    margin-left: -25px;
    height: 20px;
    border-radius: 6px;
    background: ${schoolRooftop2};
  }

  &:after {
    position: absolute;
    content: '';
    display: block;
    width: calc(200% + 40px);
    bottom: -230px;
    margin-left: calc(-50% - 20px);
    height: 30px;
    border-radius: 6px;
    background: ${schoolRooftop2};
  }
`;

const Bell = styled.div`
  position: absolute;
  z-index: 1;
  width: 60px;
  height: 70px;
  top: -90px;
  left: calc(50% - 30px);
  border-radius: 70px 70px 10px 10px;
  background: ${behindBellColor};

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        30px 30px at center,
        ${schoolColor1} 49%,
        ${schoolColor1}00 50%
      ),
      linear-gradient(to bottom, ${schoolColor1} 50%, ${schoolColor1}00 50.01%)
        50% 0% / 3px 42px no-repeat,
      linear-gradient(to bottom, ${schoolColor1} 50%, ${schoolColor1}00 50.01%)
        50% 90% / 30px 30px no-repeat,
      radial-gradient(
        8px 8px at calc(50% - 15px) 67%,
        ${schoolColor1} 49%,
        ${schoolColor1}00 50%
      ),
      radial-gradient(
        8px 8px at calc(50% + 15px) 67%,
        ${schoolColor1} 49%,
        ${schoolColor1}00 50%
      ),
      radial-gradient(
        10px 10px at 50% 75%,
        ${schoolColor3} 49%,
        ${schoolColor3}00 50%
      );
  }
`;

const School = () => (
  <SchoolContainer>
    <SchoolBg
      variant="shadowed"
      top="150px"
      right="10px"
      left="10px"
      bottom="0px"
    />
    <SchoolBg
      variant="overshadowed"
      top="150px"
      right="10px"
      left="10px"
      bottom="185px"
    />
    <SchoolRooftop />
    <Bell />
    <Door />

    {/* Top center of the house */}
    <Roof width={110} angle={34} position="right" top={-154} right={288} />
    <Roof width={110} angle={-34} position="left" top={-154} left={288} />

    <SchoolBg
      top="-140px"
      right="375px"
      left="375px"
      bottom="calc(100% - 25px)"
    />
    <SchoolBg top="-115px" right="355px" left="355px" bottom="0" />
    <SchoolBg top="-105px" right="320px" left="320px" bottom="0px" />

    {/* Bottom center of the house */}
    <BottomCenter>
      <Roof width={220} angle={34} position="right" top={-5} right={0} />
      <Roof width={220} angle={-34} position="left" top={-5} left={0} />

      <SchoolBg top="70px" right="110px" left="110px" bottom="0px" />
      <SchoolBg top="82px" right="90px" left="90px" bottom="0px" />
      <SchoolBg top="94px" right="70px" left="70px" bottom="0px" />

      <Clock
        style={{
          marginTop: 60,
          marginLeft: 0,
          left: 'calc(50% - 40px)',
          borderColor: clockColor,
        }}
      />
    </BottomCenter>

    <Window
      style={{
        width: '70px',
        height: '70px',
        bottom: '18%',
        left: '10%',
      }}
    />

    <Window
      style={{
        width: '70px',
        height: '70px',
        bottom: '18%',
        right: '10%',
      }}
    />

    <Ground />
  </SchoolContainer>
);

export default School;
