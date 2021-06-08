import React from "react";
import styled, { keyframes, css } from "styled-components";
import { FadeOut } from "./FadeOut";

interface WrapperProps {
  width: number;
  height: number;
  left: number;
}

export interface CoinProps {
  left: number;
  width: number;
  height: number;
  taken: boolean;
}

export interface CoinUiProps {
  taken: boolean;
}

const size = "40px";
const fontSize = "28px";
const width = "4px";
const color = "#ffd600";
const speed = "2s";
const innerCoin = "#ceae0c";

const rotate = keyframes`
  0% {
    transform: rotateY(90deg) translate3d(0, -10px, 0);
  }
  50% {
    transform: rotateY(270deg) translate3d(0, -20px, 0);
  }
  100% {
    transform: rotateY(450deg) translate3d(0, -10px, 0);
  }
`;

const hideEffect = keyframes`
  100% {
    transform: rotateY(1080deg) translate3d(0, -200px, 0);
  }
`;

const CoinUi = styled.div<CoinUiProps>`
  font-size: ${fontSize};
  font-weight: bold;
  width: ${width};
  height: ${size};
  background: ${innerCoin};
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform-style: preserve-3d;
  transform: rotateY(90deg) translate3d(0, -15px, 0);
  animation: ${rotate} ${speed} infinite linear;
  pointer-events: none;

  ${({ taken }) =>
    taken &&
    css`
      animation: ${hideEffect} 0.5s ease;
    `}

  .side,
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: ${size};
    height: ${size};
    overflow: hidden;
    background: ${innerCoin};
    border-radius: 50%;
    right: calc(-${size} / 2 + ${width});
    text-align: center;
    line-height: calc(${size} - 2px);
    color: ${color};
    transform: rotateY(-90deg);
    backface-visibility: hidden;
  }

  .heads,
  .tails {
    box-shadow: inset 0 0 0 6px ${color};
  }

  .tails,
  &:after {
    left: calc(-${size} / 2 + ${width});
    transform: rotateY(90deg);
  }

  &:before,
  &:after {
    background: ${innerCoin};
    backface-visibility: hidden;
    transform: rotateY(90deg);
  }

  &:after {
    transform: rotateY(-90deg);
  }
`;

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
  top: 0;
  transition: all 0.5s ease;
  width: ${(props) => props.width}px;
  left: ${(props) => props.left}px;
`;

const Coin = ({ left, width, height, taken }: CoinProps) => {
  return (
    <Wrapper width={width} height={height} left={left}>
      <FadeOut duration="0.5s" hide={taken}>
        <CoinUi taken={taken}>
          <div className="side heads">$</div>
          <div className="side tails">$</div>
        </CoinUi>
      </FadeOut>
    </Wrapper>
  );
};

export default Coin;
