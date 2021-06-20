import styled from 'styled-components';

const cTrans = 'rgba(0,0,0,0)';
const cGray = '#c4c4c4';
const cMidGray = '#A8A8A8';
const cUltraLightGray = '#F1F1F1';
const cLightGray = '#E9E9E9';
const cDarkGray = '#5B5B5B';
const cBlack = '#000';
const cRed = '#C41414';
const cWhite = '#fff';

const grayMainBg = `
linear-gradient(165deg, ${cTrans} 50%, ${cGray} 50.1%) 0 30% / 33.33% 33.33% repeat-x,
linear-gradient(to bottom, ${cTrans} 50%, ${cGray} 50.1%)
`;

const pipe1 = `
radial-gradient(circle at 20px 80%, ${cDarkGray} 20px, ${cTrans} 20px),
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
radial-gradient(circle at calc(75% - 10px) 80%, ${cDarkGray} 20px, ${cTrans} 20px),
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
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% 70% / 23% 30px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% calc(70% + 30px) / 23% 30px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% calc(70% + 60px) / 23% 30px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% calc(70% + 90px) / 23% 30px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% calc(70% + 120px) / 23% 30px no-repeat,
linear-gradient(to bottom, ${cUltraLightGray} 95%, ${cMidGray} 95.01%) 50% calc(70% + 150px) / 23% 30px no-repeat,
linear-gradient(to bottom, ${cRed} 0%, ${cRed} 100%) 50% 100% / 26% calc(30px * 7) no-repeat
`;

export const Factory = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: ${door}, ${leftWindows}, ${rightWindows}, ${grayMainBg},
    ${chimney(10)};

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    height: 100%;
    width: calc(20% + 30px);
    left: -20%;
    background: ${pipe1}, ${pipe2}, ${leftBg}, ${chimney(100)};
  }
`;
