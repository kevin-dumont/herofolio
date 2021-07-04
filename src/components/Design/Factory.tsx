import React from 'react';
import styled from 'styled-components';

import { Smoke } from '@components/Design/Smoke';

const cTrans = 'rgba(0,0,0,0)';
const cGray = '#c4c4c4';
const cMidGray = '#A8A8A8';
const cUltraLightGray = '#F1F1F1';
const cLightGray = '#E9E9E9';
const cDarkGray = '#5B5B5B';
const cBlack = '#000';
const cRed = '#C41414';
const cDarkOrange = '#F56E23';
const cLightOrange = '#FF7324';
const cWhite = '#fff';

const factoryWalls = `
linear-gradient(160deg, ${cTrans} 50%, ${cGray} 50.1%) 0 30% / 33.33% 33.33% repeat-x,
linear-gradient(to bottom, ${cTrans} 50%, ${cGray} 50.1%),
linear-gradient(to right, ${cTrans} 33.30%, ${cMidGray} 33.33%, ${cMidGray} 42%, ${cTrans} 42.1%) 0 100% / 100% 73.5% repeat-x,
linear-gradient(to right, ${cTrans} 66.60%, ${cMidGray} 66.66%, ${cMidGray} 75%, ${cTrans} 75.1%) 0 100% / 100% 73.5% repeat-x
`;

const pipe1 = `
radial-gradient(circle at 20px 80%, ${cDarkGray} 20px, ${cTrans} 21px),
linear-gradient(to bottom, ${cDarkGray} 0%, ${cDarkGray} 100%) 0% 100% / 40px 20% no-repeat,
linear-gradient(
  to bottom,
  ${cTrans} calc(80% - 20px),
  ${cDarkGray} calc(80% - 21px),
  ${cDarkGray} calc(80% + 20px),
  ${cTrans} calc(80% + 21px)
) 20px 100% / calc(40% - 20px) 100% no-repeat
`;

const pipe2 = `
radial-gradient(circle at calc(75% - 10px) 80%, ${cDarkGray} 20px, ${cTrans} 21px),
linear-gradient(to bottom, ${cDarkGray} 0%, ${cDarkGray} 100%) 75% 100% / 40px 20% no-repeat
`;

const leftBg = `linear-gradient(to bottom, ${cGray} 0%, ${cGray} 100%) 100% 100% / 60% 40% no-repeat`;

const chimney = (position: number) => `
linear-gradient(to left, ${cLightGray} 50%, ${cWhite} 50.01%) ${position}% 5% / 90px 4% no-repeat,
linear-gradient(to left, ${cLightGray} 50%, ${cWhite} 50.01%) ${position}% 12% / 90px 4% no-repeat,
linear-gradient(to bottom, ${cRed} 0%, ${cRed} 100%) ${position}% 100% / 90px 100% no-repeat
`;

const window = (x: number, y: number) => `
linear-gradient(to bottom, ${cMidGray} 10px, ${cTrans} 11px) ${x}% ${y}% / 4.5% 12% no-repeat,
linear-gradient(to right, ${cTrans} 10px, ${cBlack} 11px, ${cBlack} 100%) ${x}% ${y}% / 4.5% 12% no-repeat,
linear-gradient(to left, ${cMidGray} 0%, ${cMidGray} 100%) ${x}% ${y}% / 4.5% 12% no-repeat
`;

const leftWindows = `
${window(5, 70)}, ${window(5, 90)}, 
${window(14, 70)}, ${window(14, 90)}, 
${window(23, 70)}, ${window(23, 90)}
`;

const rightWindows = `
${window(75, 70)}, ${window(75, 90)}, 
${window(84, 70)}, ${window(84, 90)}, 
${window(93, 70)}, ${window(93, 90)}
`;

const door = `
linear-gradient(to bottom, ${cDarkGray} 0%, ${cDarkGray} 100.0%) 50% 60% / 30% 40px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% 70% / 23% 30px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% calc(70% + 30px) / 23% 30px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% calc(70% + 60px) / 23% 30px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% calc(70% + 90px) / 23% 30px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% calc(70% + 120px) / 23% 30px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% calc(70% + 150px) / 23% 30px no-repeat,
linear-gradient(to bottom, ${cMidGray} 0%, ${cMidGray} 100%) 50% 100% / 26% calc(30px * 7) no-repeat
`;

const rightWall = `
linear-gradient(to right, ${cTrans} 0, ${cMidGray} 0, ${cMidGray} 21.5%, ${cTrans} 21.6%) 0 100% / 100% 73.5% repeat-x
`;

const container = `
linear-gradient(to bottom, ${cTrans} 80%, ${cDarkGray} 80.01%, ${cDarkGray} 86%, ${cTrans} 86.1%) 35% 100% / 40% 45% no-repeat,
linear-gradient(90deg, ${cTrans} 50%, ${cDarkGray} 50.2%, ${cDarkGray} 58%, ${cTrans} 58.2%) 22% 100% / 55% 15% no-repeat,
linear-gradient(260deg, ${cTrans} 10%, ${cDarkGray} 10.2%, ${cDarkGray} 18%, ${cTrans} 18.2%) 26% 100% / 55% 15% no-repeat,
linear-gradient(100deg, ${cTrans} 32%, ${cDarkGray} 32.2%, ${cDarkGray} 40%, ${cTrans} 40.2%) 0% 100% / 55% 15% no-repeat,
linear-gradient(to bottom, ${cTrans} 64%, ${cDarkGray} 64.01%, ${cDarkGray} 72%, ${cTrans} 72.1%) 28% 100% / 55% 45% no-repeat,
linear-gradient(to bottom, ${cTrans} 25%, ${cDarkOrange} 25.01%, ${cDarkOrange} 30%, ${cTrans} 30.1%, ${cTrans} 37%, ${cDarkOrange} 37.01%, ${cDarkOrange} 42%, ${cTrans} 42.1%) 58.5% 100% / 15% 45% no-repeat,
linear-gradient(to bottom, ${cTrans} 25%, ${cLightOrange} 25.01%, ${cLightOrange} 30%, ${cTrans} 30.1%, ${cTrans} 37%, ${cLightOrange} 37.01%, ${cLightOrange} 42%, ${cTrans} 42.1%) 29.5% 100% / 49.8% 45% no-repeat,
linear-gradient(56deg, ${cUltraLightGray} 66.5%, ${cTrans} 66.6%) 44% 75% / 10% 36% no-repeat,
linear-gradient(25deg, ${cLightGray} 70%, ${cTrans} 70.1%) 52.6% 75% / 25% 36% no-repeat,
linear-gradient(335deg, ${cUltraLightGray} 70%, ${cTrans} 70.1%) 20% 75% / 25% 36% no-repeat
`;

export const FactoryWithoutSmoke = styled.div`
  position: absolute;
  height: 500px;
  bottom: 0;
  width: 100%;
  background: ${door}, ${leftWindows}, ${rightWindows}, ${factoryWalls},
    ${chimney(10)};

  &:before,
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    height: 100%;
  }

  &::before {
    width: calc(20% + 30px);
    left: -20%;
    background: ${pipe1}, ${pipe2}, ${leftBg}, ${chimney(100)};
  }

  &::after {
    width: 40%;
    right: -40%;
    background: ${container}, ${rightWall};
  }
`;

const FactorySmoke1 = styled(Smoke)`
  top: -95%;
  left: -13px;
  height: 100%;
  width: 100px;
  z-index: -2;
`;

const FactorySmoke2 = styled(Smoke)`
  top: -95%;
  left: 120px;
  height: 100%;
  width: 100px;
  z-index: -2;
`;

export const Factory = () => (
  <>
    <FactoryWithoutSmoke>
      <FactorySmoke2 />
      <FactorySmoke1 />
    </FactoryWithoutSmoke>
  </>
);
