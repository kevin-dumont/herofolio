import React from 'react';
import styled from 'styled-components';

interface DeskProps {
  perspectiveOrigin: string;
  scale: string;
}

const trans = 'rgba(0, 0, 0, 0)';
const deskC = '#e6af39';
const deskCDark = '#bb8d2a';
const deskSC = '#8b6312';
const chairSC = '#463108';
const chairC = '#c99a37';
const chairCDark = '#af862c';

const Desk = styled.div<DeskProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  perspective: 50em;
  perspective-origin: ${(p) => p.perspectiveOrigin};
  transform: scale(${(p) => p.scale});

  &::before {
    content: ' ';
    top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 8px;
    background: ${deskC};
    border-bottom: 10px solid ${deskCDark};
    position: absolute;
    transform: rotateX(50deg);
    z-index: 1;
  }

  &::after {
    content: ' ';
    margin-top: 30px;
    width: 100%;
    height: 100px;
    border-radius: 8px;
    background: linear-gradient(
        90deg,
        ${trans} 9.5%,
        ${deskSC} 10%,
        ${deskSC} 13.5%,
        ${trans} 14%,
        ${trans} 89.5%,
        ${deskSC} 90%,
        ${deskSC} 93.5%,
        ${trans} 94%
      ),
      linear-gradient(
          90deg,
          ${trans} 14.5%,
          ${deskSC} 15%,
          ${deskSC} 18.5%,
          ${trans} 19%,
          ${trans} 84.5%,
          ${deskSC} 85%,
          ${deskSC} 88.5%,
          ${trans} 89%
        )
        no-repeat 0 0 / 100% 90%;

    position: absolute;
  }
`;

const chairTop = `
  linear-gradient(
    to bottom,
    ${trans} 5%,
    ${chairC} 5.1%,
    ${chairC} 30%,
    ${trans} 30.1%
  )
  no-repeat top center / 45% 100%,
  linear-gradient(
    to bottom,
    ${trans} 10%,
    ${chairC} 10.1%,
    ${chairC} 25%,
    ${trans} 25.1%
  )
  no-repeat top center / 52% 100%,
  radial-gradient(10% 10% at 29% 10%, ${chairC} 50%, ${trans} 50.1%),
  radial-gradient(10% 10% at 71% 10%, ${chairC} 50%, ${trans} 50.1%),
  radial-gradient(10% 10% at 29% 25%, ${chairC} 50%, ${trans} 50.1%),
  radial-gradient(10% 10% at 71% 25%, ${chairC} 50%, ${trans} 50.1%)
`;

const chairSticks = `
  linear-gradient(
    90deg,
    ${trans} 30%,
    ${chairSC} 30.1%,
    ${chairSC} 34%,
    ${trans} 34.1%,
    ${trans} 65.8%,
    ${chairSC} 65.9%,
    ${chairSC} 69.9%,
    ${trans} 70%
  ) no-repeat 100% 20% / 100% 45%,
  linear-gradient(
    275deg,
    ${trans} 67%,
    ${chairSC} 67.1%,
    ${chairSC} 71%,
    ${trans} 71.1%
  ) no-repeat 20% 100% / 100% 45%,
  linear-gradient(
    85deg,
    ${trans} 67%,
    ${chairSC} 67.1%,
    ${chairSC} 71%,
    ${trans} 71.1%
  ) no-repeat 20% 100% / 100% 45%,
  linear-gradient(
    to bottom,
    ${chairSC} 0%,
    ${chairSC} 10%,
    ${trans} 10.1%
  ) no-repeat 50% 100% / 40% 44%
`;

const chairSticks2 = `
  linear-gradient(
    90deg,
    ${trans} 33.5%,
    ${chairSC} 33.6%,
    ${chairSC} 38%,
    ${trans} 38.1%,
    ${trans} 62.3%,
    ${chairSC} 62.4%,
    ${chairSC} 66.4%,
    ${trans} 66.5%
  ) no-repeat 100% 90% / 100% 40%
`;

interface ChairProps {
  scale: string;
}

const Chair = styled.div<ChairProps>`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  min-height: 130px;
  transform: scale(${(p) => p.scale});
  background: ${chairSticks2}, ${chairTop};

  &::before {
    content: ' ';
    top: 45%;
    left: 25%;
    width: 50%;
    height: 15%;
    border-radius: 4px;
    background: ${chairCDark};
    position: absolute;
    transform: rotateX(50deg);
    display: block;
    z-index: 0;
  }

  &::after {
    content: ' ';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: ${chairSticks};
    z-index: 0;
  }
`;

interface ShadowProps {
  scale: string;
}

const Shadow = styled.div<ShadowProps>`
  width: 100%;
  height: 150%;
  transform: scale(${(p) => p.scale});
  background: radial-gradient(
    100% 20% at 50% 65%,
    rgba(0, 0, 0, 0.3) 0%,
    ${trans} 50%
  );
`;

export interface StudentDeskProps {
  perspectiveOrigin?: string;
  scale?: string;
}

export const StudentDesk = ({
  perspectiveOrigin = '50%',
  scale = '1',
}: StudentDeskProps) => (
  <>
    <Desk perspectiveOrigin={perspectiveOrigin} scale={scale} />
    <Chair scale={scale} />
    <Shadow scale={scale} />
  </>
);
