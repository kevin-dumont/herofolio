import styled, { css, keyframes } from "styled-components";

const camel = "#e5c56c";
const shoes = "#7c5e5e";
const beige = "#ffe1af";
const gray = "#808080";

const hat = `
  radial-gradient(7px 7px at calc(50% + 33px) 22px, ${gray} 49%, ${gray}00 50%) no-repeat,
  linear-gradient(29deg, ${gray} 60%, ${gray}00 62%) calc(50% + 20px) 5px / 27px 20px no-repeat,
  radial-gradient(50px 50px at calc(50% - 5px) 25px, ${gray} 49%, ${gray}00 50%) 0px 0px / 100% 25px no-repeat
`;

const head = `
  radial-gradient(8px 8px at 50% 38px, ${beige} 49%, ${beige}00 50%) -8px,
  radial-gradient(8px 8px at 50% 38px, ${beige} 49%, ${beige}00 50%) 8px,
  radial-gradient(10px 10px at 50% 35px, black 48%, #00000000 50%) -8px,
  radial-gradient(10px 10px at 50% 35px, black 48%, #00000000 50%) 8px,
  linear-gradient(to bottom, ${beige} 100%, ${beige} 100%) 50% 10px / 30px 34px no-repeat,
  radial-gradient(30px 30px at 50% 42px, white 49%, #ffffff00 50%),
  radial-gradient(50px 50px at 50% 38px, ${beige} 48%, ${beige}00 50%),
  linear-gradient(black 48%, black 50%) 50% 22px / 52px 18px no-repeat
`;

const body = `
  radial-gradient(50px 60px at 50% 30px, ${camel} 49%, ${camel}00 50%) 0 60px / 100% no-repeat
`;

const unanimatedHandsAndFeet = `
  radial-gradient(30px 30px at calc(50% - 15px) calc(50% + 15px), ${shoes} 49%, ${shoes}00 50%),
  radial-gradient(30px 30px at calc(50% + 15px) calc(50% + 15px), ${shoes} 49%, ${shoes}00 50%),
  radial-gradient(20px 20px at calc(50% - 40px) calc(50% + 15px), ${beige} 49%, ${beige}00 50%),
  radial-gradient(20px 20px at calc(50% + 40px) calc(50% + 15px), ${beige} 49%, ${beige}00 50%)
`;

const jumpingHandsAndFeet = `
  radial-gradient(30px 30px at calc(50% + 10px) calc(50%), ${shoes} 49%, ${shoes}00 50%) calc(50% + 30px) 110px / 30px 30px no-repeat,
  radial-gradient(30px 30px at calc(50% - 10px) calc(50%), ${shoes} 49%, ${shoes}00 50%) calc(50% - 30px) 110px / 30px 30px no-repeat,
  radial-gradient(20px 20px at calc(50% - 40px) calc(50% - 20px), ${beige} 49%, ${beige}00 50%),
  radial-gradient(20px 20px at calc(50% + 40px) calc(50% - 20px), ${beige} 49%, ${beige}00 50%)
`;

const walk = keyframes`
  0% {
    background-position: 0 105px, 0 105px, 0 0, 0 0;
  }
  33% {
    background-position: 0 90px, 0 110px, 0 10px, 0 -10px;
  }
  66% {
    background-position: 0 110px, 0 90px, 0 -10px, 0 10px;
  }
  100% {
    background-position: 0 105px, 0 105px, 0 0, 0 0;
  }
`;

export interface HeroProps {
  isWalking: boolean;
  isJumping: boolean;
  jumpHeight: number;
  show: boolean;
}

const appearHero = keyframes`
  0% {
    transform: translate3d(0, -100vh, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const appearHeroMobile = keyframes`
  0% {
    transform: scale(0.8) translate3d(0, -100vh, 0);
  }
  100% {
    transform: scale(0.8) translate3d(0, 0, 0);
  }
`;

export const Hero = styled.div<HeroProps>`
  width: 100px;
  height: 150px;
  position: absolute;
  bottom: 0;
  background-repeat: no-repeat;
  background: ${hat}, ${head}, ${body};
  transform-origin: bottom;
  transition: all 0.25s ease-in-out;
  transform: translate3d(0, 0, 0);

  @media screen and (max-height: 600px) {
    transform: scale(0.8) translate3d(0, 0, 0);
  }

  ${({ show }) =>
    show &&
    css`
      animation: ${appearHero} 0.8s ease;

      @media screen and (max-height: 600px) {
        animation: ${appearHeroMobile} 0.8s ease;
      }
    `}

  ${({ isJumping, jumpHeight }) =>
    isJumping &&
    css`
      transform: translate3d(0, ${-jumpHeight}px, 0);

      @media screen and (max-height: 600px) {
        transform: scale(0.8) translate3d(0, ${-jumpHeight}px, 0);
      }
    `}

  &:before {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: ${unanimatedHandsAndFeet};
    background-position: 0 105px, 0 105px, 0 0, 0 0;
    background-size: 100% 60px, 100% 60px, 100% 100%, 100% 100%;
    background-repeat: no-repeat;

    ${({ isJumping }) =>
      isJumping &&
      css`
        background: ${jumpingHandsAndFeet};
      `}

    ${({ isWalking, isJumping }) =>
      isWalking &&
      !isJumping &&
      css`
        animation: 0.4s ${walk} linear infinite;
      `}
  }
`;
